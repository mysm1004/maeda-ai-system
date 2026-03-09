// patch_ad_media.js
// Phase 5: ad-designer.js + Phase 6: media-optimizer.js をデプロイ
var fs = require('fs');

// ============================================
// Phase 5: ad-designer.js（広告配信設計、5ステップ）
// ============================================
var adDesignerFile = '/home/ubuntu/kabeuchi-system/src/services/ad-designer.js';

var adCode = `// ad-designer.js
// Phase 5: 広告配信設計エンジン（5ステップ）
var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');
var fs = require('fs');
var path = require('path');

var PHASE5_STEPS = [
  { num: 1, ai: 'claude', label: '初期設計', desc: 'エリア/時間帯/KW/入札/広告文の初期設計' },
  { num: 2, ai: 'chatgpt', label: '別視点設計', desc: 'ChatGPTによる別視点での設計提案' },
  { num: 3, ai: 'claude', label: '設計批判', desc: '穴/無駄/機会損失を指摘' },
  { num: 4, ai: 'chatgpt', label: '競合視点批判', desc: '競合視点での批判' },
  { num: 5, ai: 'claude', label: '統合・最終設計', desc: 'Google/Meta入稿形式で出力' }
];

function AdDesigner(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA;
  this.sendLine = sendLineFn;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Phase1結論取得
AdDesigner.prototype._getPhase1Context = function(session) {
  var sections = ['target_definition', 'appeal_points', 'catchcopy', 'output_plan', 'research_data'];
  var ctx = '';
  for (var i = 0; i < sections.length; i++) {
    if (session[sections[i]]) {
      ctx += '【' + sections[i] + '】\\n' + session[sections[i]] + '\\n\\n';
    }
  }
  var step8 = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND phase = 1 AND round_number = 8 ORDER BY id DESC LIMIT 1").get(session.id);
  if (step8) ctx += '【Phase1最終統合】\\n' + step8.content + '\\n\\n';
  return ctx;
};

// Phase2訴求取得
AdDesigner.prototype._getPhase2Appeal = function(sessionId) {
  var logs = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND phase = 2 ORDER BY round_number DESC LIMIT 1").all(sessionId);
  return logs.map(function(l) { return l.content; }).join('\\n');
};

// ステップ履歴取得
AdDesigner.prototype._getHistory = function(sessionId) {
  var logs = this.db.prepare("SELECT round_number, role_label, content FROM discussion_logs WHERE session_id = ? AND phase = 5 ORDER BY round_number, id").all(sessionId);
  return logs.map(function(l) { return 'Step' + l.round_number + ' [' + l.role_label + ']:\\n' + l.content; }).join('\\n\\n---\\n\\n');
};

// ログ保存
AdDesigner.prototype._saveLog = function(sessionId, stepNum, role, roleLabel, content, isSleep) {
  this.db.prepare("INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode, created_at) VALUES (?, 5, ?, ?, ?, ?, ?, ?, datetime('now'))").run(sessionId, stepNum, PHASE5_STEPS[stepNum - 1].label, role, roleLabel, content, isSleep ? 1 : 0);
};

// ad_designs レコード取得or作成
AdDesigner.prototype._getOrCreateAdDesign = function(sessionId) {
  var existing = this.db.prepare("SELECT * FROM ad_designs WHERE session_id = ? ORDER BY id DESC LIMIT 1").get(sessionId);
  if (existing) return existing;
  this.db.prepare("INSERT INTO ad_designs (session_id, status, created_at) VALUES (?, 'in_progress', datetime('now'))").run(sessionId);
  return this.db.prepare("SELECT * FROM ad_designs WHERE session_id = ? ORDER BY id DESC LIMIT 1").get(sessionId);
};

// Claude API
AdDesigner.prototype._callClaude = function(systemPrompt, userPrompt) {
  return this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  }).then(function(res) { return res.content[0].text; });
};

// ChatGPT API
AdDesigner.prototype._callChatGPT = function(systemPrompt, userPrompt) {
  return this.openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 8000,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  }).then(function(res) { return res.choices[0].message.content; });
};

// ステップ完了更新
AdDesigner.prototype._updateStep = function(sessionId, stepNum) {
  this.db.prepare("UPDATE ad_designs SET step_completed = ?, updated_at = datetime('now') WHERE session_id = ?").run(stepNum, sessionId);
  this.db.prepare("UPDATE sessions SET current_round = ?, phase = 5, status = 'active', updated_at = datetime('now') WHERE id = ?").run(stepNum, sessionId);
};

// 個別ステップ実行
AdDesigner.prototype.runStep = function(sessionId, stepNum, isSleep) {
  var self = this;
  var session = self.db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId);
  if (!session) return Promise.reject(new Error('セッション不在: ' + sessionId));

  var phase1Ctx = self._getPhase1Context(session);
  var phase2Appeal = self._getPhase2Appeal(sessionId);
  var history = self._getHistory(sessionId);

  console.log('[Phase5] Step' + stepNum + ' 開始: ' + PHASE5_STEPS[stepNum - 1].label);

  var systemBase = '你は前田法律事務所の広告配信設計AIです。\\n' +
    '【Phase1結論】\\n' + phase1Ctx + '\\n' +
    '【Phase2訴求設計】\\n' + phase2Appeal;

  switch (stepNum) {
    case 1:
      return self._callClaude(
        systemBase,
        '以下の情報に基づき、Google広告とMeta広告(Facebook/Instagram)の配信設計を行ってください。\\n\\n' +
        '出力項目:\\n' +
        '1. ターゲティング設計（エリア/年齢/性別/興味関心/行動）\\n' +
        '2. 配信時間帯・曜日の最適化\\n' +
        '3. キーワード設計（Google検索広告用、マッチタイプ別）\\n' +
        '4. 入札戦略（目標CPA/予算配分）\\n' +
        '5. 広告文・クリエイティブ案（見出し/説明文/CTA）\\n' +
        '6. ランディングページ要件\\n\\n' +
        'JSON形式で出力:\\n' +
        '{ "google_ads": { "keywords": [...], "ad_copies": [...], "targeting": {...}, "bidding": {...} },\\n' +
        '  "meta_ads": { "audiences": [...], "creatives": [...], "placements": [...], "budget": {...} },\\n' +
        '  "schedule": {...}, "estimated_performance": {...} }'
      ).then(function(result) {
        self._saveLog(sessionId, 1, 'claude_a', 'Claude（初期設計）', result, isSleep);
        self._updateStep(sessionId, 1);
        return result;
      });

    case 2:
      return self._callChatGPT(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        'Claudeの広告配信設計を確認し、別の視点から設計提案をしてください。\\n' +
        '1. Claudeが見落としているターゲット層\\n' +
        '2. より効果的なキーワード戦略\\n' +
        '3. 競合が使っていない広告フォーマット\\n' +
        '4. 予算効率を高める配信テクニック\\n' +
        '5. A/Bテスト計画\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 2, 'chatgpt', 'ChatGPT（別視点設計）', result, isSleep);
        self._updateStep(sessionId, 2);
        return result;
      });

    case 3:
      return self._callClaude(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        '両AIの設計案を批判的に分析してください。\\n' +
        '1. 穴: カバーできていないチャネル/セグメント\\n' +
        '2. 無駄: ROIが低くなりそうな設定\\n' +
        '3. 機会損失: 活用すべきだが見落としている機能\\n' +
        '4. リスク: 広告審査落ち/アカウント停止の可能性\\n' +
        '5. 法律事務所特有の広告規制への対応\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 3, 'claude_b', 'Claude（設計批判）', result, isSleep);
        self._updateStep(sessionId, 3);
        return result;
      });

    case 4:
      return self._callChatGPT(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        '広告設計を競合視点で批判してください。\\n' +
        '1. 同じエリアの競合法律事務所の広告傾向\\n' +
        '2. 入札競争で不利になるキーワード\\n' +
        '3. 差別化できるクリエイティブ戦略\\n' +
        '4. 競合が手薄な時間帯/プレースメント\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 4, 'chatgpt', 'ChatGPT（競合視点批判）', result, isSleep);
        self._updateStep(sessionId, 4);
        return result;
      });

    case 5:
      return self._callClaude(
        systemBase + '\\n【全ステップの結果】\\n' + history,
        '全4ステップの設計・批判を統合し、最終的な広告配信設計を確定してください。\\n\\n' +
        '以下の2フォーマットで出力:\\n\\n' +
        '【Google広告CSV入稿形式】\\n' +
        'Campaign, Ad Group, Keyword, Match Type, Max CPC, Headline 1, Headline 2, Description\\n' +
        '（全キーワード分のCSVデータ）\\n\\n' +
        '【Meta広告JSON形式】\\n' +
        '{ "campaigns": [{ "name": "...", "objective": "...", "budget": N, "audiences": [...], "creatives": [...] }] }\\n\\n' +
        '【設計サマリー】\\n' +
        '・想定月額予算\\n' +
        '・想定CPA\\n' +
        '・想定コンバージョン数\\n' +
        '・主要KPI目標'
      ).then(function(result) {
        self._saveLog(sessionId, 5, 'claude_a', 'Claude（最終設計）', result, isSleep);

        // ad_designs 更新
        self.db.prepare("UPDATE ad_designs SET step_completed = 5, final_design = ?, status = 'completed', updated_at = datetime('now') WHERE session_id = ?").run(result, sessionId);
        self._updateStep(sessionId, 5);

        // HTMLレポート生成
        var htmlPath = self._generateHTML(sessionId, session.title, result);

        // LINE通知
        var msg = '【Phase5完了】広告配信設計\\n' +
          'セッション: ' + session.title + '\\n' +
          'Google広告 + Meta広告の入稿データ生成完了\\n\\n' +
          'レポート: https://176-32-87-118.sslip.io/' + htmlPath.replace('/home/ubuntu/kabeuchi-system/public/', '');
        self.sendLine(msg);

        return result;
      });

    default:
      return Promise.reject(new Error('無効なステップ番号: ' + stepNum));
  }
};

// HTMLレポート生成
AdDesigner.prototype._generateHTML = function(sessionId, title, content) {
  var marked = require('marked');
  var outputDir = '/home/ubuntu/kabeuchi-system/public/outputs';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  var fileName = 'ad_design_' + sessionId + '_' + Date.now() + '.html';
  var filePath = path.join(outputDir, fileName);

  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>広告設計 - ' + (title || '') + '</title>' +
    '<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px;background:#f5f5f5}' +
    '.card{background:#fff;border-radius:8px;padding:20px;margin:15px 0;box-shadow:0 2px 8px rgba(0,0,0,.1)}' +
    'h1{color:#1a73e8}h2{color:#333;border-bottom:2px solid #1a73e8;padding-bottom:8px}' +
    'pre{background:#f8f8f8;padding:15px;border-radius:4px;overflow-x:auto;font-size:13px}' +
    'table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}' +
    'th{background:#1a73e8;color:#fff}</style></head><body>' +
    '<h1>広告配信設計レポート</h1><p>セッション: ' + (title || sessionId) + '</p>' +
    '<div class="card">' + marked.parse(content.replace(/</g, '&lt;').replace(/>/g, '&gt;')) + '</div>' +
    '<p style="text-align:center;color:#888;margin-top:30px">前田法律事務所 AI壁打ちシステム Phase5</p>' +
    '</body></html>';

  fs.writeFileSync(filePath, html, 'utf8');

  // DB更新
  this.db.prepare("UPDATE ad_designs SET html_path = ? WHERE session_id = ?").run(filePath, sessionId);
  console.log('[Phase5] HTMLレポート生成: ' + filePath);
  return filePath;
};

// 全ステップ一括実行
AdDesigner.prototype.generateFull = function(sessionId, isSleep) {
  var self = this;
  var adDesign = self._getOrCreateAdDesign(sessionId);
  var startStep = (adDesign.step_completed || 0) + 1;

  console.log('[Phase5] 全ステップ実行開始 (session=' + sessionId + ', startStep=' + startStep + ')');
  self.sendLine('【Phase5開始】広告配信設計\\nステップ' + startStep + '/5から実行します');

  self.db.prepare("UPDATE sessions SET phase = 5, status = 'active', updated_at = datetime('now') WHERE id = ?").run(sessionId);

  var chain = Promise.resolve();
  for (var s = startStep; s <= 5; s++) {
    (function(step) {
      chain = chain.then(function() {
        return self.runStep(sessionId, step, isSleep);
      }).then(function(result) {
        if (step < 5) {
          self.sendLine('[Phase5] Step' + step + '/5 完了: ' + PHASE5_STEPS[step - 1].label);
        }
        return result;
      });
    })(s);
  }

  return chain.then(function(result) {
    console.log('[Phase5] 全ステップ完了 (session=' + sessionId + ')');
    return result;
  }).catch(function(err) {
    console.error('[Phase5] エラー:', err.message);
    self.sendLine('【Phase5エラー】' + err.message);
    throw err;
  });
};

module.exports = AdDesigner;
`;

fs.writeFileSync(adDesignerFile, adCode, 'utf8');
console.log('[Phase5] ad-designer.js 作成完了');

// ============================================
// Phase 6: media-optimizer.js（メディア最適化、6ステップ）
// ============================================
var mediaOptFile = '/home/ubuntu/kabeuchi-system/src/services/media-optimizer.js';

var mediaCode = `// media-optimizer.js
// Phase 6: メディア最適化エンジン（6ステップ）
var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');
var fs = require('fs');
var path = require('path');

var PHASE6_STEPS = [
  { num: 1, ai: 'claude', label: 'リスト属性分析', desc: '業種/エリア/規模の分布を分析' },
  { num: 2, ai: 'chatgpt', label: 'エリア別競合分析', desc: 'エリア×属性別に競合分析' },
  { num: 3, ai: 'claude', label: 'メディア最適化', desc: 'Phase3出力をリスト属性に合わせて調整' },
  { num: 4, ai: 'claude', label: '最適化批判', desc: '最適化結果の批判的分析' },
  { num: 5, ai: 'chatgpt', label: '競合視点批判', desc: '競合視点での批判' },
  { num: 6, ai: 'claude', label: '統合・最終メディア', desc: '最終メディア生成 + 品質スコア4軸採点' }
];

var MEDIA_TYPES = ['lp', 'dm', 'fax', 'phone_script', 'email', 'proposal'];

function MediaOptimizer(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA;
  this.sendLine = sendLineFn;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Phase1結論取得
MediaOptimizer.prototype._getPhase1Context = function(session) {
  var sections = ['target_definition', 'appeal_points', 'catchcopy', 'output_plan', 'research_data'];
  var ctx = '';
  for (var i = 0; i < sections.length; i++) {
    if (session[sections[i]]) ctx += '【' + sections[i] + '】\\n' + session[sections[i]] + '\\n\\n';
  }
  return ctx;
};

// Phase3出力取得
MediaOptimizer.prototype._getPhase3Outputs = function(sessionId) {
  // case_libraryから承認済み出力を取得
  var cases = this.db.prepare("SELECT output_type, pattern, content, design_doc FROM case_library WHERE session_id = ? ORDER BY id DESC").all(sessionId);
  if (cases.length > 0) {
    return cases.map(function(c) { return '【' + c.output_type + ' (パターン' + c.pattern + ')】\\n' + (c.content || c.design_doc || ''); }).join('\\n\\n');
  }
  // output_queueからも取得
  var queues = this.db.prepare("SELECT output_type, patterns, design_doc FROM output_queue WHERE session_id = ? ORDER BY id DESC").all(sessionId);
  return queues.map(function(q) { return '【' + q.output_type + '】\\n' + (q.design_doc || ''); }).join('\\n\\n');
};

// Phase4リスト属性集計
MediaOptimizer.prototype._getListAnalytics = function(sessionId) {
  var entries = this.db.prepare("SELECT * FROM list_entries WHERE session_id = ? AND status = 'active'").all(sessionId);
  if (entries.length === 0) return '（リストデータなし）';

  // 業種分布
  var industries = {};
  var areas = {};
  var methods = {};
  var ranks = { A: 0, B: 0, C: 0 };

  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (e.industry) industries[e.industry] = (industries[e.industry] || 0) + 1;
    if (e.area) areas[e.area] = (areas[e.area] || 0) + 1;
    if (e.approach_method) methods[e.approach_method] = (methods[e.approach_method] || 0) + 1;
    if (e.rank) ranks[e.rank] = (ranks[e.rank] || 0) + 1;
  }

  return '【リスト属性分析】\\n' +
    '総数: ' + entries.length + '件 (A:' + ranks.A + ' B:' + ranks.B + ' C:' + ranks.C + ')\\n' +
    '業種分布: ' + JSON.stringify(industries) + '\\n' +
    'エリア分布: ' + JSON.stringify(areas) + '\\n' +
    'アプローチ方法: ' + JSON.stringify(methods);
};

// ステップ履歴取得
MediaOptimizer.prototype._getHistory = function(sessionId, mediaType) {
  var query = "SELECT round_number, role_label, content FROM discussion_logs WHERE session_id = ? AND phase = 6";
  var params = [sessionId];
  if (mediaType) {
    query += " AND round_theme LIKE ?";
    params.push('%' + mediaType + '%');
  }
  query += " ORDER BY round_number, id";
  var logs = this.db.prepare(query).all.apply(this.db.prepare(query), params);
  return logs.map(function(l) { return 'Step' + l.round_number + ' [' + l.role_label + ']:\\n' + l.content; }).join('\\n\\n---\\n\\n');
};

// ログ保存
MediaOptimizer.prototype._saveLog = function(sessionId, stepNum, role, roleLabel, content, isSleep, mediaType) {
  var theme = PHASE6_STEPS[stepNum - 1].label + (mediaType ? ' (' + mediaType + ')' : '');
  this.db.prepare("INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode, created_at) VALUES (?, 6, ?, ?, ?, ?, ?, ?, datetime('now'))").run(sessionId, stepNum, theme, role, roleLabel, content, isSleep ? 1 : 0);
};

// media_optimizations レコード取得or作成
MediaOptimizer.prototype._getOrCreateOptimization = function(sessionId, mediaType) {
  var existing = this.db.prepare("SELECT * FROM media_optimizations WHERE session_id = ? AND media_type = ? ORDER BY id DESC LIMIT 1").get(sessionId, mediaType);
  if (existing) return existing;
  this.db.prepare("INSERT INTO media_optimizations (session_id, media_type, status, created_at) VALUES (?, ?, 'in_progress', datetime('now'))").run(sessionId, mediaType);
  return this.db.prepare("SELECT * FROM media_optimizations WHERE session_id = ? AND media_type = ? ORDER BY id DESC LIMIT 1").get(sessionId, mediaType);
};

// Claude API
MediaOptimizer.prototype._callClaude = function(systemPrompt, userPrompt) {
  return this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  }).then(function(res) { return res.content[0].text; });
};

// ChatGPT API
MediaOptimizer.prototype._callChatGPT = function(systemPrompt, userPrompt) {
  return this.openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 8000,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  }).then(function(res) { return res.choices[0].message.content; });
};

// ステップ完了更新
MediaOptimizer.prototype._updateStep = function(sessionId, stepNum, mediaType) {
  this.db.prepare("UPDATE media_optimizations SET step_completed = ?, updated_at = datetime('now') WHERE session_id = ? AND media_type = ?").run(stepNum, sessionId, mediaType);
  this.db.prepare("UPDATE sessions SET current_round = ?, phase = 6, status = 'active', updated_at = datetime('now') WHERE id = ?").run(stepNum, sessionId);
};

// 個別ステップ実行
MediaOptimizer.prototype.runStep = function(sessionId, stepNum, mediaType, isSleep) {
  var self = this;
  var session = self.db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId);
  if (!session) return Promise.reject(new Error('セッション不在: ' + sessionId));

  var phase1Ctx = self._getPhase1Context(session);
  var phase3Outputs = self._getPhase3Outputs(sessionId);
  var listAnalytics = self._getListAnalytics(sessionId);
  var history = self._getHistory(sessionId, mediaType);

  console.log('[Phase6] Step' + stepNum + ' 開始: ' + PHASE6_STEPS[stepNum - 1].label + ' (' + mediaType + ')');

  var mediaLabel = { lp: 'ランディングページ', dm: 'DM', fax: 'FAX DM', phone_script: '電話スクリプト', email: '営業メール', proposal: '提案書' };

  var systemBase = '你は前田法律事務所のメディア最適化AIです。\\n' +
    '【最適化対象メディア】' + (mediaLabel[mediaType] || mediaType) + '\\n' +
    '【Phase1結論】\\n' + phase1Ctx + '\\n' +
    '【Phase3出力（元メディア）】\\n' + phase3Outputs + '\\n' +
    '【Phase4リスト属性】\\n' + listAnalytics;

  switch (stepNum) {
    case 1:
      return self._callClaude(
        systemBase,
        'Phase4の営業リスト属性を詳細分析してください。\\n' +
        '1. 業種別分布と各業種の特徴\\n' +
        '2. エリア別分布と地域特性\\n' +
        '3. 規模別分布（従業員数）\\n' +
        '4. アプローチ方法別の最適メディア\\n' +
        '5. メディア最適化の方向性提案\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 1, 'claude_a', 'Claude（リスト属性分析）', result, isSleep, mediaType);
        self._updateStep(sessionId, 1, mediaType);
        return result;
      });

    case 2:
      return self._callChatGPT(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        'エリア×属性別に競合分析をしてください。\\n' +
        '1. 各エリアでの競合法律事務所のメディア戦略\\n' +
        '2. 業種別に効果的なメディアフォーマット\\n' +
        '3. 競合が使っていないアプローチ\\n' +
        '4. エリア特性に合わせたカスタマイズポイント\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 2, 'chatgpt', 'ChatGPT（エリア別競合分析）', result, isSleep, mediaType);
        self._updateStep(sessionId, 2, mediaType);
        return result;
      });

    case 3:
      return self._callClaude(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        'Phase3で生成した' + (mediaLabel[mediaType] || mediaType) + 'をリスト属性に合わせて最適化してください。\\n\\n' +
        '最適化ポイント:\\n' +
        '1. 業種別カスタマイズ（業種固有の課題/用語/事例）\\n' +
        '2. エリア別カスタマイズ（地域名/地域特性/地元感）\\n' +
        '3. 規模別カスタマイズ（大企業向け/中小向け/個人向け）\\n' +
        '4. アプローチ方法に合わせたフォーマット調整\\n' +
        '5. ランク別の訴求強度調整（Aランク=より積極的）\\n\\n' +
        '最適化後の' + (mediaLabel[mediaType] || mediaType) + 'の全文を出力してください。'
      ).then(function(result) {
        self._saveLog(sessionId, 3, 'claude_a', 'Claude（メディア最適化）', result, isSleep, mediaType);
        self._updateStep(sessionId, 3, mediaType);
        return result;
      });

    case 4:
      return self._callClaude(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        '最適化結果を批判的に分析してください。\\n' +
        '1. カスタマイズが表面的すぎないか？\\n' +
        '2. ターゲットに響かない表現はないか？\\n' +
        '3. 法律事務所としての品位は保たれているか？\\n' +
        '4. アクション喚起は適切か？\\n' +
        '5. 情報過多/不足はないか？\\n' +
        '改善提案をJSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 4, 'claude_b', 'Claude（最適化批判）', result, isSleep, mediaType);
        self._updateStep(sessionId, 4, mediaType);
        return result;
      });

    case 5:
      return self._callChatGPT(
        systemBase + '\\n【前ステップの結果】\\n' + history,
        '最適化されたメディアを競合視点で批判してください。\\n' +
        '1. 競合と比較して弱い点\\n' +
        '2. 差別化不足の箇所\\n' +
        '3. 競合が使っている効果的な要素で欠けているもの\\n' +
        '4. 受け手（ターゲット）の心理的障壁\\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 5, 'chatgpt', 'ChatGPT（競合視点批判）', result, isSleep, mediaType);
        self._updateStep(sessionId, 5, mediaType);
        return result;
      });

    case 6:
      return self._callClaude(
        systemBase + '\\n【全ステップの結果】\\n' + history,
        '全5ステップの分析・最適化・批判を統合し、最終的な' + (mediaLabel[mediaType] || mediaType) + 'を生成してください。\\n\\n' +
        '出力:\\n' +
        '1. 最終版メディア全文\\n' +
        '2. 品質スコア（4軸各100点満点）:\\n' +
        '   - appeal_score: 訴求力\\n' +
        '   - differentiation_score: 差別化\\n' +
        '   - format_score: フォーマット適切性\\n' +
        '   - impact_score: 行動喚起力\\n' +
        '3. 最適化前後の改善ポイントサマリー\\n\\n' +
        'JSON形式: { "final_media": "...", "quality_scores": { "appeal": N, "differentiation": N, "format": N, "impact": N }, "improvements": [...] }'
      ).then(function(result) {
        self._saveLog(sessionId, 6, 'claude_a', 'Claude（最終メディア生成）', result, isSleep, mediaType);

        // 品質スコア抽出
        var scores = { appeal: 0, differentiation: 0, format: 0, impact: 0 };
        try {
          var scoreMatch = result.match(/"quality_scores"\\s*:\\s*\\{([^}]+)\\}/);
          if (scoreMatch) {
            var scoreObj = JSON.parse('{' + scoreMatch[1] + '}');
            scores = scoreObj;
          }
        } catch(e) {}

        var totalScore = Math.round(((scores.appeal || 0) + (scores.differentiation || 0) + (scores.format || 0) + (scores.impact || 0)) / 4);

        // DB更新
        self.db.prepare("UPDATE media_optimizations SET step_completed = 6, final_media = ?, quality_score = ?, status = 'completed', updated_at = datetime('now') WHERE session_id = ? AND media_type = ?").run(result, totalScore, sessionId, mediaType);
        self._updateStep(sessionId, 6, mediaType);

        // HTMLプレビュー生成
        var htmlPath = self._generateHTML(sessionId, session.title, mediaType, result, scores);

        // LINE通知
        var msg = '【Phase6完了】' + (mediaLabel[mediaType] || mediaType) + ' 最適化\\n' +
          'セッション: ' + session.title + '\\n' +
          '品質スコア: ' + totalScore + '/100\\n' +
          '(訴求:' + (scores.appeal || 0) + ' 差別化:' + (scores.differentiation || 0) + ' 形式:' + (scores.format || 0) + ' 行動喚起:' + (scores.impact || 0) + ')\\n\\n' +
          'プレビュー: https://176-32-87-118.sslip.io/' + htmlPath.replace('/home/ubuntu/kabeuchi-system/public/', '');
        self.sendLine(msg);

        return result;
      });

    default:
      return Promise.reject(new Error('無効なステップ番号: ' + stepNum));
  }
};

// HTMLプレビュー生成
MediaOptimizer.prototype._generateHTML = function(sessionId, title, mediaType, content, scores) {
  var marked = require('marked');
  var outputDir = '/home/ubuntu/kabeuchi-system/public/outputs';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  var fileName = 'media_' + mediaType + '_' + sessionId + '_' + Date.now() + '.html';
  var filePath = path.join(outputDir, fileName);

  var mediaLabel = { lp: 'ランディングページ', dm: 'DM', fax: 'FAX DM', phone_script: '電話スクリプト', email: '営業メール', proposal: '提案書' };
  var totalScore = Math.round(((scores.appeal || 0) + (scores.differentiation || 0) + (scores.format || 0) + (scores.impact || 0)) / 4);

  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + (mediaLabel[mediaType] || mediaType) + '最適化 - ' + (title || '') + '</title>' +
    '<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px;background:#f5f5f5}' +
    '.card{background:#fff;border-radius:8px;padding:20px;margin:15px 0;box-shadow:0 2px 8px rgba(0,0,0,.1)}' +
    'h1{color:#2e7d32}h2{color:#333;border-bottom:2px solid #2e7d32;padding-bottom:8px}' +
    '.score{display:inline-block;padding:5px 15px;border-radius:20px;font-weight:bold;color:#fff;' +
    'background:' + (totalScore >= 80 ? '#2e7d32' : totalScore >= 60 ? '#f9a825' : '#c62828') + '}' +
    '.score-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:15px 0}' +
    '.score-item{background:#f8f8f8;padding:10px;border-radius:4px;text-align:center}' +
    'pre{background:#f8f8f8;padding:15px;border-radius:4px;overflow-x:auto;font-size:13px;white-space:pre-wrap}</style></head><body>' +
    '<h1>' + (mediaLabel[mediaType] || mediaType) + ' 最適化レポート</h1>' +
    '<p>セッション: ' + (title || sessionId) + '</p>' +
    '<div class="card"><h2>品質スコア <span class="score">' + totalScore + '/100</span></h2>' +
    '<div class="score-grid">' +
    '<div class="score-item">訴求力<br><strong>' + (scores.appeal || 0) + '</strong></div>' +
    '<div class="score-item">差別化<br><strong>' + (scores.differentiation || 0) + '</strong></div>' +
    '<div class="score-item">形式<br><strong>' + (scores.format || 0) + '</strong></div>' +
    '<div class="score-item">行動喚起<br><strong>' + (scores.impact || 0) + '</strong></div>' +
    '</div></div>' +
    '<div class="card"><h2>最適化結果</h2>' + marked.parse(content.replace(/</g, '&lt;').replace(/>/g, '&gt;')) + '</div>' +
    '<p style="text-align:center;color:#888;margin-top:30px">前田法律事務所 AI壁打ちシステム Phase6</p>' +
    '</body></html>';

  fs.writeFileSync(filePath, html, 'utf8');
  this.db.prepare("UPDATE media_optimizations SET html_path = ? WHERE session_id = ? AND media_type = ?").run(filePath, sessionId, mediaType);
  console.log('[Phase6] HTMLプレビュー生成: ' + filePath);
  return filePath;
};

// 全ステップ一括実行（1メディアタイプ分）
MediaOptimizer.prototype.generateForMedia = function(sessionId, mediaType, isSleep) {
  var self = this;
  var opt = self._getOrCreateOptimization(sessionId, mediaType);
  var startStep = (opt.step_completed || 0) + 1;

  var mediaLabel = { lp: 'ランディングページ', dm: 'DM', fax: 'FAX DM', phone_script: '電話スクリプト', email: '営業メール', proposal: '提案書' };
  console.log('[Phase6] ' + (mediaLabel[mediaType] || mediaType) + ' 最適化開始 (session=' + sessionId + ')');

  var chain = Promise.resolve();
  for (var s = startStep; s <= 6; s++) {
    (function(step) {
      chain = chain.then(function() {
        return self.runStep(sessionId, step, mediaType, isSleep);
      });
    })(s);
  }
  return chain;
};

// 全メディアタイプ一括実行
MediaOptimizer.prototype.generateFull = function(sessionId, isSleep) {
  var self = this;
  console.log('[Phase6] 全メディア最適化開始 (session=' + sessionId + ')');
  self.sendLine('【Phase6開始】メディア最適化\\n対象メディア: LP, DM, FAX, 電話, メール, 提案書');

  self.db.prepare("UPDATE sessions SET phase = 6, status = 'active', updated_at = datetime('now') WHERE id = ?").run(sessionId);

  // Phase3で生成済みのメディアタイプを確認
  var existingOutputs = self.db.prepare("SELECT DISTINCT output_type FROM case_library WHERE session_id = ? UNION SELECT DISTINCT output_type FROM output_queue WHERE session_id = ?").all(sessionId, sessionId);
  var outputTypes = existingOutputs.map(function(o) { return o.output_type; });

  // 対応メディアタイプのみ処理
  var targetMediaTypes = [];
  for (var i = 0; i < MEDIA_TYPES.length; i++) {
    if (outputTypes.indexOf(MEDIA_TYPES[i]) >= 0) {
      targetMediaTypes.push(MEDIA_TYPES[i]);
    }
  }
  // Phase3出力がない場合はデフォルトでLP/DM/FAXを最適化
  if (targetMediaTypes.length === 0) {
    targetMediaTypes = ['lp', 'dm', 'fax'];
  }

  var chain = Promise.resolve();
  for (var j = 0; j < targetMediaTypes.length; j++) {
    (function(mt) {
      chain = chain.then(function() {
        return self.generateForMedia(sessionId, mt, isSleep);
      });
    })(targetMediaTypes[j]);
  }

  return chain.then(function() {
    console.log('[Phase6] 全メディア最適化完了 (session=' + sessionId + ')');
    self.sendLine('【Phase6完了】全メディアの最適化が完了しました');
    return 'completed';
  }).catch(function(err) {
    console.error('[Phase6] エラー:', err.message);
    self.sendLine('【Phase6エラー】' + err.message);
    throw err;
  });
};

module.exports = MediaOptimizer;
`;

fs.writeFileSync(mediaOptFile, mediaCode, 'utf8');
console.log('[Phase6] media-optimizer.js 作成完了');

console.log('\n============================');
console.log('patch_ad_media.js 完了: 2ファイル作成');
console.log('============================');
