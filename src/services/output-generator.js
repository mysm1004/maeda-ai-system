var Anthropic = require('@anthropic-ai/sdk');

var PATTERNS = {
  A: { name: 'PASONA型', desc: '問題→共感→解決→提案→行動' },
  B: { name: 'ベネフィット直球型', desc: '最大の価値を冒頭で提示' },
  C: { name: 'ストーリー型', desc: '物語で感情を動かす' },
  D: { name: '恐怖訴求型', desc: '失わないために行動させる' }
};

function OutputGenerator(db) {
  this.db = db;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// ステップ1: 設計書作成
OutputGenerator.prototype.createDesignDoc = async function(sessionId, outputType, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType);
  var officeDocs = this._getOfficeDocs();
  var similarCases = this._getSimilarOutputs(outputType);

  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 2000,
    system: '設計書を作成するコピーライティングディレクター。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: '【アウトプット種別】' + outputType +
      '\n【セッション】' + (session ? session.topic : '') +
      '\n【ターゲット】' + (session ? session.target_definition || '' : '') +
      '\n【訴求ポイント】' + (session ? session.appeal_points || '' : '') +
      '\n【追加指示】' + JSON.stringify(params) +
      '\n【事務所資料】' + (officeDocs || 'なし') +
      '\n【類似過去案件】' + (similarCases || 'なし') +
      '\n\n以下の設計書を作成:\n1. 読者の具体的な人物像\n2. 感情の流れ（不安→共感→希望→信頼→行動）\n3. 最重要ベネフィット1つ・サブベネフィット3つ\n4. 競合との差別化ポイント\n5. 推奨訴求パターン（PASONA/ベネフィット直球/ストーリー/恐怖訴求）\n6. 品質基準チェックリスト' }]
  });
  return res.content[0].text;
};

// ステップ2: 4パターン同時生成
OutputGenerator.prototype.generatePatterns = async function(sessionId, outputType, designDoc, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType);
  var officeDocs = this._getOfficeDocs();

  var basePrompt = '【設計書】\n' + designDoc +
    '\n【事務所資料】' + (officeDocs || 'なし') +
    '\n【セッション情報】' + (session ? session.topic + ' / ' + (session.target_definition || '') : '') +
    '\n【前田さんの好み】' + JSON.stringify(memory) +
    '\n【追加指示】' + JSON.stringify(params);

  var qualityRules = '\n\n品質基準:\n- 抽象的な表現を使わない（必ず具体的な数字・事例）\n- 「弊社は〜」で始まる文章は使わない\n- 読者の言葉（検索キーワード・口コミ表現）を使う\n- 事務所資料の実績・数字を必ず参照する\n- CTAは明確で行動しやすくする';

  var typeInstructions = this._getTypeInstructions(outputType);

  // 4パターン並行生成
  var results = await Promise.all(Object.keys(PATTERNS).map(async function(key) {
    var p = PATTERNS[key];
    var r = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 4000,
      system: 'あなたはトップコピーライターです。「' + p.name + '（' + p.desc + '）」のパターンで書いてください。' + qualityRules,
      messages: [{ role: 'user', content: basePrompt + '\n\n' + typeInstructions + '\n\nパターン「' + p.name + '」で生成してください。' }]
    });
    return { pattern: key, name: p.name, desc: p.desc, content: r.content[0].text };
  }.bind(this)));

  return results;
};

// ステップ3: 自己批評・改善
OutputGenerator.prototype.critiqueAndImprove = async function(patterns, designDoc, outputType) {
  var memory = this._getMemory(outputType);

  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
    system: 'あなたはClaude B批評役。容赦なく品質チェックし、改善点を指摘する。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: '【設計書】\n' + designDoc +
      '\n\n【4パターン】\n' + patternsText +
      '\n\n以下をチェック・指摘:\n1. 読者がつまずく箇所\n2. 競合と同じ表現を使っていないか\n3. ベネフィットが具体的か（数字・事例）\n4. CTAは明確か\n5. 前田さんの好みに合っているか\n6. 事務所資料の情報を使えているか\n7. 最も推奨するパターンとその理由\n\nJSON形式: {"critique":"批評","recommended":"A|B|C|D","reason":"理由"}' }]
  });

  var text = res.content[0].text;
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  var parsed = null;
  if (jsonMatch) { try { parsed = JSON.parse(jsonMatch[0]); } catch(e) {} }

  return {
    critique: parsed ? parsed.critique : text,
    recommended: parsed ? parsed.recommended : 'A',
    reason: parsed ? parsed.reason : ''
  };
};

// 全プロセス一括実行
OutputGenerator.prototype.generateFull = async function(sessionId, outputType, params) {
  // Step1: 設計書
  var designDoc = await this.createDesignDoc(sessionId, outputType, params);
  // Step2: 4パターン生成
  var patterns = await this.generatePatterns(sessionId, outputType, designDoc, params);
  // Step3: 自己批評
  var review = await this.critiqueAndImprove(patterns, designDoc, outputType);

  // DB保存
  this.db.prepare('INSERT INTO output_queue (session_id, output_type, params, design_doc, patterns, critique, recommended_pattern, status) VALUES (?,?,?,?,?,?,?,?)')
    .run(sessionId, outputType, JSON.stringify(params), designDoc, JSON.stringify(patterns), JSON.stringify(review), review.recommended, 'awaiting_approval');

  return { designDoc: designDoc, patterns: patterns, review: review };
};

// 承認後に案件ライブラリに保存
OutputGenerator.prototype.approveOutput = function(queueId, patternChosen, filePath, deployUrl) {
  var item = this.db.prepare('SELECT * FROM output_queue WHERE id = ?').get(queueId);
  if (!item) return null;
  var patterns = JSON.parse(item.patterns);
  var chosen = patterns.find(function(p) { return p.pattern === patternChosen; }) || patterns[0];

  var caseId = this.db.prepare('INSERT INTO case_library (session_id, output_type, title, content, pattern, design_doc, status, file_path, deploy_url, approved_at) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)')
    .run(item.session_id, item.output_type, item.output_type + '_' + Date.now(), chosen.content, patternChosen, item.design_doc, 'approved', filePath || null, deployUrl || null)
    .lastInsertRowid;

  this.db.prepare('UPDATE output_queue SET status = ? WHERE id = ?').run('approved', queueId);
  return caseId;
};

// アウトプット種別ごとの指示
OutputGenerator.prototype._getTypeInstructions = function(type) {
  var map = {
    'lp': 'レスポンシブHTML/CSSでLP全体を生成。セクション: ファーストビュー→悩み共感→解決策→実績/証拠→サービス詳細→料金→FAQ→CTA。',
    'banner': '複数サイズ（300x250, 728x90, 1200x628）のHTML/SVGバナーを生成。',
    'sns_post': 'X(Twitter)・Instagram・Facebook・LinkedIn用の投稿文を各1つ生成。ハッシュタグ付き。',
    'blog': 'SEO最適化記事。H1/H2/H3構成、メタディスクリプション、内部リンク候補を含む。3000文字以上。',
    'youtube_script': 'YouTube動画台本。フック→本題→CTA構成。タイムスタンプ付き。',
    'press_release': 'プレスリリース。5W1H形式。配信先メディア候補も記載。',
    'newsletter': 'メルマガ。件名5案+本文。開封率を意識した構成。',
    'seo_design': 'SEOキーワード設計。検索意図分析・キーワードマップ・優先順位表。',
    'seo_article': 'SEO記事。構成案→本文→メタ情報まで一括。schema.org構造化データ付き。',
    'aio_content': 'AI検索回答に選ばれるFAQ/構造化コンテンツ。',
    'proposal': '提案書。目次→概要→課題分析→提案内容→実績→スケジュール→費用。',
    'dm': 'DM/手紙/営業メール。件名+本文。',
    'sales_script': '営業トーク台本・FAQ集。場面別の対応スクリプト。',
    'company_profile': '会社概要・サービス資料。',
    'legal_content': '法律解説コンテンツ。一般向け・わかりやすい表現。',
    'seminar': 'セミナー資料。スライド構成・台本。'
  };
  return map[type] || '指定された種別のコンテンツを高品質で生成してください。';
};

OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
    rows = this.db.prepare("SELECT category, key, value FROM memory_db WHERE output_type = ? OR output_type IS NULL ORDER BY confidence DESC LIMIT 20").all(outputType);
  } else {
    rows = this.db.prepare("SELECT category, key, value FROM memory_db ORDER BY confidence DESC LIMIT 20").all();
  }
  var g = {};
  rows.forEach(function(r) { if (!g[r.category]) g[r.category] = {}; g[r.category][r.key] = r.value; });
  return g;
};

OutputGenerator.prototype._getOfficeDocs = function() {
  var fs = require('fs');
  var path = require('path');
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
  if (!fs.existsSync(dir)) return null;
  var files = fs.readdirSync(dir).filter(function(f) { return f.endsWith('.txt') || f.endsWith('.md'); });
  return files.map(function(f) {
    try { return '【' + f + '】\n' + fs.readFileSync(path.join(dir, f), 'utf8').substring(0, 1500); }
    catch(e) { return ''; }
  }).join('\n') || null;
};

OutputGenerator.prototype._getSimilarOutputs = function(type) {
  var cases = this.db.prepare("SELECT title, description, tone, pattern FROM case_library WHERE output_type = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 5").all(type);
  if (cases.length === 0) return null;
  return cases.map(function(c) { return c.title + '(' + c.pattern + '): ' + (c.description || ''); }).join('\n');
};

module.exports = OutputGenerator;
