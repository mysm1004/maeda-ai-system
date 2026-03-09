function PreferenceLearner(db) {
  this.db = db;
}

// 承認/却下から学習
PreferenceLearner.prototype.learnFromDecision = function(sessionId, decision, comment, content, outputType) {
  if (decision === 'approved') {
    this._extractAndStore(content, 'approved_style', sessionId, outputType);
    if (comment) this._extractAndStore(comment, 'approval_reason', sessionId, outputType);
    this._boostRelatedMemories(content, 0.1);
  } else if (decision === 'rejected') {
    if (comment) this._extractAndStore(comment, 'rejection_reason', sessionId, outputType);
    this._penalizeRelatedMemories(content, 0.1);
  }
};

// パターン選択から学習
PreferenceLearner.prototype.learnFromPatternChoice = function(sessionId, patternChosen, outputType) {
  this.addPreference('pattern_preference', outputType || 'general', patternChosen, sessionId, 'pattern_choice', outputType);
  // パターン選択回数を集計して信頼度を上げる
  var count = this.db.prepare("SELECT COUNT(*) as cnt FROM memory_db WHERE category = 'pattern_preference' AND value = ?").get(patternChosen);
  if (count && count.cnt > 1) {
    this.db.prepare("UPDATE memory_db SET confidence = MIN(1.0, confidence + 0.05) WHERE category = 'pattern_preference' AND value = ?").run(patternChosen);
  }
};

// 汎用好み追加
PreferenceLearner.prototype.addPreference = function(category, key, value, sessionId, sourceType, outputType) {
  var existing = this.db.prepare('SELECT * FROM memory_db WHERE category = ? AND key = ?').get(category, key);
  if (existing) {
    this.db.prepare('UPDATE memory_db SET value = ?, confidence = MIN(1.0, confidence + 0.1), source_session_id = ?, source_type = ?, output_type = COALESCE(?, output_type), updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(value, sessionId || null, sourceType || null, outputType || null, existing.id);
  } else {
    this.db.prepare('INSERT INTO memory_db (category, key, value, confidence, source_session_id, source_type, output_type) VALUES (?,?,?,0.5,?,?,?)')
      .run(category, key, value, sessionId || null, sourceType || null, outputType || null);
  }
};

// サブカテゴリ付き好み追加
PreferenceLearner.prototype.addPreferenceWithSub = function(category, subcategory, key, value, sessionId, sourceType, outputType) {
  var existing = this.db.prepare('SELECT * FROM memory_db WHERE category = ? AND subcategory = ? AND key = ?').get(category, subcategory, key);
  if (existing) {
    this.db.prepare('UPDATE memory_db SET value = ?, confidence = MIN(1.0, confidence + 0.1), source_session_id = ?, source_type = ?, output_type = COALESCE(?, output_type), updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(value, sessionId || null, sourceType || null, outputType || null, existing.id);
  } else {
    this.db.prepare('INSERT INTO memory_db (category, subcategory, key, value, confidence, source_session_id, source_type, output_type) VALUES (?,?,?,?,0.5,?,?,?)')
      .run(category, subcategory, key, value, sessionId || null, sourceType || null, outputType || null);
  }
};

// 全好み取得
PreferenceLearner.prototype.getAll = function() {
  return this.db.prepare('SELECT * FROM memory_db ORDER BY confidence DESC, updated_at DESC').all();
};

// カテゴリ別取得
PreferenceLearner.prototype.getByCategory = function(category) {
  return this.db.prepare('SELECT * FROM memory_db WHERE category = ? ORDER BY confidence DESC').all(category);
};

// アウトプット種別別取得
PreferenceLearner.prototype.getByOutputType = function(outputType) {
  return this.db.prepare("SELECT * FROM memory_db WHERE output_type = ? OR output_type IS NULL ORDER BY confidence DESC LIMIT 20").all(outputType);
};

// 内部: コンテンツから特徴を抽出して保存
PreferenceLearner.prototype._extractAndStore = function(content, sourceType, sessionId, outputType) {
  // トーンの特徴
  if (content.indexOf('フォーマル') !== -1 || content.indexOf('丁寧') !== -1) {
    this.addPreference('tone', 'formality', 'formal', sessionId, sourceType, outputType);
  }
  if (content.indexOf('カジュアル') !== -1 || content.indexOf('親しみ') !== -1) {
    this.addPreference('tone', 'formality', 'casual', sessionId, sourceType, outputType);
  }
  // 数字・データ重視
  if (content.match(/\d+%/) || content.match(/\d+件/) || content.match(/\d+万/)) {
    this.addPreference('style', 'data_driven', 'true', sessionId, sourceType, outputType);
  }
  // CTA傾向
  if (content.indexOf('無料相談') !== -1) {
    this.addPreference('cta', 'preferred', '無料相談', sessionId, sourceType, outputType);
  }
  if (content.indexOf('LINE') !== -1) {
    this.addPreference('cta', 'channel', 'LINE', sessionId, sourceType, outputType);
  }
};

// 関連メモリの信頼度を上げる
PreferenceLearner.prototype._boostRelatedMemories = function(content, amount) {
  var keywords = content.substring(0, 200).match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]{2,}/g) || [];
  keywords.slice(0, 5).forEach(function(kw) {
    this.db.prepare("UPDATE memory_db SET confidence = MIN(1.0, confidence + ?) WHERE value LIKE ? OR key LIKE ?")
      .run(amount, '%' + kw + '%', '%' + kw + '%');
  }.bind(this));
};

// 関連メモリの信頼度を下げる
PreferenceLearner.prototype._penalizeRelatedMemories = function(content, amount) {
  var keywords = content.substring(0, 200).match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]{2,}/g) || [];
  keywords.slice(0, 5).forEach(function(kw) {
    this.db.prepare("UPDATE memory_db SET confidence = MAX(0.0, confidence - ?) WHERE value LIKE ? OR key LIKE ?")
      .run(amount, '%' + kw + '%', '%' + kw + '%');
  }.bind(this));
};

module.exports = PreferenceLearner;
