// ad-designer.js
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
      ctx += '【' + sections[i] + '】\n' + session[sections[i]] + '\n\n';
    }
  }
  var step8 = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND phase = 1 AND round_number = 8 ORDER BY id DESC LIMIT 1").get(session.id);
  if (step8) ctx += '【Phase1最終統合】\n' + step8.content + '\n\n';
  return ctx;
};

// Phase2訴求取得
AdDesigner.prototype._getPhase2Appeal = function(sessionId) {
  var logs = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND phase = 2 ORDER BY round_number DESC LIMIT 1").all(sessionId);
  return logs.map(function(l) { return l.content; }).join('\n');
};

// ステップ履歴取得
AdDesigner.prototype._getHistory = function(sessionId) {
  var logs = this.db.prepare("SELECT round_number, role_label, content FROM discussion_logs WHERE session_id = ? AND phase = 5 ORDER BY round_number, id").all(sessionId);
  return logs.map(function(l) { return 'Step' + l.round_number + ' [' + l.role_label + ']:\n' + l.content; }).join('\n\n---\n\n');
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
AdDesigner.prototype._callClaude = function(system, user) {
  var self = this;
  var maxRetries = 3;
  function attempt(retryCount) {
    return self.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 4000,
      system: system,
      messages: [{ role: 'user', content: user }]
    }).then(function(r) { return r.content[0].text; })
    .catch(function(err) {
      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {
        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');
        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });
      }
      if (self.sendLine) self.sendLine('[Claude API] 3回失敗: ' + err.message);
      throw err;
    });
  }
  return attempt(0);
};

// ChatGPT API
AdDesigner.prototype._callChatGPT = function(system, user) {
  var self = this;
  var maxRetries = 3;
  function attempt(retryCount) {
    return self.openai.chat.completions.create({
      model: 'gpt-5.4', max_completion_tokens: 4000,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
    }).then(function(r) { return r.choices[0].message.content; })
    .catch(function(err) {
      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {
        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');
        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });
      }
      if (self.sendLine) self.sendLine('[ChatGPT API] 3回失敗: ' + err.message);
      throw err;
    });
  }
  return attempt(0);
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

  var systemBase = '你は前田法律事務所の広告配信設計AIです。\n' +
    '【Phase1結論】\n' + phase1Ctx + '\n' +
    '【Phase2訴求設計】\n' + phase2Appeal;

  switch (stepNum) {
    case 1:
      return self._callClaude(
        systemBase,
        '以下の情報に基づき、Google広告とMeta広告(Facebook/Instagram)の配信設計を行ってください。\n\n' +
        '出力項目:\n' +
        '1. ターゲティング設計（エリア/年齢/性別/興味関心/行動）\n' +
        '2. 配信時間帯・曜日の最適化\n' +
        '3. キーワード設計（Google検索広告用、マッチタイプ別）\n' +
        '4. 入札戦略（目標CPA/予算配分）\n' +
        '5. 広告文・クリエイティブ案（見出し/説明文/CTA）\n' +
        '6. ランディングページ要件\n\n' +
        'JSON形式で出力:\n' +
        '{ "google_ads": { "keywords": [...], "ad_copies": [...], "targeting": {...}, "bidding": {...} },\n' +
        '  "meta_ads": { "audiences": [...], "creatives": [...], "placements": [...], "budget": {...} },\n' +
        '  "schedule": {...}, "estimated_performance": {...} }'
      ).then(function(result) {
        self._saveLog(sessionId, 1, 'claude_a', 'Claude（初期設計）', result, isSleep);
        self._updateStep(sessionId, 1);
        return result;
      });

    case 2:
      return self._callChatGPT(
        systemBase + '\n【前ステップの結果】\n' + history,
        'Claudeの広告配信設計を確認し、別の視点から設計提案をしてください。\n' +
        '1. Claudeが見落としているターゲット層\n' +
        '2. より効果的なキーワード戦略\n' +
        '3. 競合が使っていない広告フォーマット\n' +
        '4. 予算効率を高める配信テクニック\n' +
        '5. A/Bテスト計画\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 2, 'chatgpt', 'ChatGPT（別視点設計）', result, isSleep);
        self._updateStep(sessionId, 2);
        return result;
      });

    case 3:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        '両AIの設計案を批判的に分析してください。\n' +
        '1. 穴: カバーできていないチャネル/セグメント\n' +
        '2. 無駄: ROIが低くなりそうな設定\n' +
        '3. 機会損失: 活用すべきだが見落としている機能\n' +
        '4. リスク: 広告審査落ち/アカウント停止の可能性\n' +
        '5. 法律事務所特有の広告規制への対応\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 3, 'claude_b', 'Claude（設計批判）', result, isSleep);
        self._updateStep(sessionId, 3);
        return result;
      });

    case 4:
      return self._callChatGPT(
        systemBase + '\n【前ステップの結果】\n' + history,
        '広告設計を競合視点で批判してください。\n' +
        '1. 同じエリアの競合法律事務所の広告傾向\n' +
        '2. 入札競争で不利になるキーワード\n' +
        '3. 差別化できるクリエイティブ戦略\n' +
        '4. 競合が手薄な時間帯/プレースメント\n' +
        'JSON形式で出力'
      ).then(function(result) {
        self._saveLog(sessionId, 4, 'chatgpt', 'ChatGPT（競合視点批判）', result, isSleep);
        self._updateStep(sessionId, 4);
        return result;
      });

    case 5:
      return self._callClaude(
        systemBase + '\n【全ステップの結果】\n' + history,
        '全4ステップの設計・批判を統合し、最終的な広告配信設計を確定してください。\n\n' +
        '以下の2フォーマットで出力:\n\n' +
        '【Google広告CSV入稿形式】\n' +
        'Campaign, Ad Group, Keyword, Match Type, Max CPC, Headline 1, Headline 2, Description\n' +
        '（全キーワード分のCSVデータ）\n\n' +
        '【Meta広告JSON形式】\n' +
        '{ "campaigns": [{ "name": "...", "objective": "...", "budget": N, "audiences": [...], "creatives": [...] }] }\n\n' +
        '【設計サマリー】\n' +
        '・想定月額予算\n' +
        '・想定CPA\n' +
        '・想定コンバージョン数\n' +
        '・主要KPI目標'
      ).then(function(result) {
        self._saveLog(sessionId, 5, 'claude_a', 'Claude（最終設計）', result, isSleep);

        // ad_designs 更新
        self.db.prepare("UPDATE ad_designs SET step_completed = 5, final_design = ?, status = 'completed', updated_at = datetime('now') WHERE session_id = ?").run(result, sessionId);
        self._updateStep(sessionId, 5);

        // HTMLレポート生成
        var htmlPath = self._generateHTML(sessionId, session.title, result);

        // LINE通知
        var msg = '【Phase5完了】広告配信設計\n' +
          'セッション: ' + session.title + '\n' +
          'Google広告 + Meta広告の入稿データ生成完了\n\n' +
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
  var outputDir = '/home/ubuntu/kabeuchi-system/public/outputs\n\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所等）、判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社・行政書士・司法書士・まとめサイト・Wikipedia使用禁止。出典明記。裏取り不可は「未確認」と明示。';
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
  self.sendLine('【Phase5開始】広告配信設計\nステップ' + startStep + '/5から実行します');

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
