var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');

var ROUND_THEMES = [
  { num: 1, theme: 'ターゲットの解像度を上げる', focus: 'ペルソナ設定・ニーズ深掘り・検索キーワード・口コミ表現' },
  { num: 2, theme: '市場規模・競合を分析する', focus: '市場データ・競合LP/広告分析・ポジショニング' },
  { num: 3, theme: '差別化ポイントを磨く', focus: '独自の強み・USP・他社にない価値' },
  { num: 4, theme: 'マネタイズの穴を突く', focus: '価格設定・収益モデル・LTV・コスト構造' },
  { num: 5, theme: '最大のリスクを潰す', focus: 'リスク分析・法的リスク・実現可能性・失敗パターン' },
  { num: 6, theme: '訴求メッセージに落とし込む', focus: 'キャッチコピー・訴求ポイント・感情設計・CTA' }
];

function DiscussionEngine(db) {
  this.db = db;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// 事前調査を実行
DiscussionEngine.prototype.runResearch = async function(topic) {
  var officeDocs = this._getOfficeDocs();
  var memory = this._getMemoryForContext();
  var similarCases = this._getSimilarCases(topic);

  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
    system: 'あなたはマーケティングリサーチの専門家です。以下の事務所資料と過去案件を参照しつつ、テーマに関する事前調査レポートを作成してください。',
    messages: [{ role: 'user', content: 'テーマ: ' + topic +
      '\n\n【事務所資料】\n' + (officeDocs || 'なし') +
      '\n\n【類似過去案件】\n' + (similarCases || 'なし') +
      '\n\n【前田さんの好み・傾向】\n' + JSON.stringify(memory) +
      '\n\n以下を調査してレポートにまとめてください：\n1. 想定される競合の上位LP・広告の傾向\n2. 業界最新トレンド\n3. 類似サービスの成功・失敗パターン\n4. ターゲット層の検索キーワード・口コミ表現\n5. 差別化の機会' }]
  });
  return res.content[0].text;
};

// 1ラウンド実行（4役）
DiscussionEngine.prototype.runRound = async function(sessionId, topic, roundNum, research, isSleep) {
  var rt = ROUND_THEMES[roundNum - 1] || { theme: '自由議論', focus: '' };
  var history = this._getHistory(sessionId);
  var memory = this._getMemoryForContext();
  var officeDocs = this._getOfficeDocsSummary();
  var sm = isSleep ? 1 : 0;

  var baseCtx = '【テーマ】' + topic +
    '\n【ラウンド' + roundNum + '】' + rt.theme +
    '\n【フォーカス】' + rt.focus +
    '\n【事前調査】' + (research || '未実施') +
    '\n【事務所資料要約】' + (officeDocs || 'なし') +
    '\n【前田さんの記憶DB】' + JSON.stringify(memory);

  var prevLogs = history.slice(-8).map(function(h) { return '[' + h.role_label + '] ' + h.content; }).join('\n---\n');
  if (prevLogs) baseCtx += '\n\n【これまでの議論】\n' + prevLogs;

  // Claude A（構築役・楽観論者）
  var draft = await this._callClaudeA(baseCtx, rt);
  this._saveLog(sessionId, 1, roundNum, rt.theme, 'claude_a', 'Claude A（構築役）', draft, sm);

  // Claude B（破壊役・悪魔の代弁者）
  var critique = await this._callClaudeB(baseCtx, draft, rt);
  this._saveLog(sessionId, 1, roundNum, rt.theme, 'claude_b', 'Claude B（破壊役）', critique, sm);

  // ChatGPT（市場役）
  var market = await this._callChatGPT(baseCtx, draft, critique, rt);
  this._saveLog(sessionId, 1, roundNum, rt.theme, 'chatgpt', 'ChatGPT（市場役）', market, sm);

  // 前田フィルター統合
  var synthesis = await this._synthesize(baseCtx, draft, critique, market, rt, memory);
  this._saveLog(sessionId, 1, roundNum, rt.theme, 'synthesis', '統合（前田フィルター適用）', synthesis, sm);

  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(roundNum, sessionId);

  return { round: roundNum, theme: rt.theme, draft: draft, critique: critique, market: market, synthesis: synthesis, sessionId: sessionId };
};

// 全ラウンド完了後の最終統合
DiscussionEngine.prototype.generateFinalSummary = async function(sessionId) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var allLogs = this._getHistory(sessionId);
  var memory = this._getMemoryForContext();

  var logSummary = allLogs.filter(function(l) { return l.role === 'synthesis'; })
    .map(function(l) { return '[R' + l.round_number + ' ' + l.round_theme + ']\n' + l.content; }).join('\n\n===\n\n');

  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたは全ラウンドの議論を統合して最終戦略をまとめる統括者です。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: 'テーマ: ' + session.topic +
      '\n\n全ラウンドの統合結果:\n' + logSummary +
      '\n\n以下をJSON形式で出力してください:\n' +
      '{\n  "target_definition": "ターゲット定義（具体的人物像）",\n' +
      '  "appeal_points": ["訴求ポイント1（最優先）", "訴求ポイント2", "訴求ポイント3"],\n' +
      '  "catchcopy": ["コピー案1", "コピー案2", "コピー案3", "コピー案4", "コピー案5"],\n' +
      '  "output_plan": "推奨アウトプット構成案"\n}' }]
  });

  var text = res.content[0].text;
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      var parsed = JSON.parse(jsonMatch[0]);
      this.db.prepare('UPDATE sessions SET phase = 2, target_definition = ?, appeal_points = ?, catchcopy = ?, output_plan = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(parsed.target_definition, JSON.stringify(parsed.appeal_points), JSON.stringify(parsed.catchcopy), parsed.output_plan, sessionId);
    } catch(e) {}
  }
  return text;
};

// セッション作成
DiscussionEngine.prototype.createSession = function(title, topic) {
  var r = this.db.prepare('INSERT INTO sessions (title, topic) VALUES (?, ?)').run(title, topic);
  return r.lastInsertRowid;
};

// Claude A: 楽観的構築役
DiscussionEngine.prototype._callClaudeA = async function(ctx, rt) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 2500,
    system: 'あなたは「Claude A（構築役）」。アイデアを最大限に発展させる楽観論者。可能性を広げ、具体的で実行可能な提案をする。事務所資料の実績・数字を積極的に活用する。',
    messages: [{ role: 'user', content: ctx + '\n\nこのラウンドのテーマ「' + rt.theme + '」について、最大限にアイデアを発展させてください。' }]
  });
  return res.content[0].text;
};

// Claude B: 容赦ない破壊役
DiscussionEngine.prototype._callClaudeB = async function(ctx, draft, rt) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 2500,
    system: 'あなたは「Claude B（破壊役）」。容赦なく穴を突く悪魔の代弁者。「絶対失敗する」レベルで厳しく批判する。甘い分析は許さない。法的リスクにも敏感。ただし建設的な代替案も必ず出す。',
    messages: [{ role: 'user', content: ctx + '\n\nClaude Aの提案:\n' + draft + '\n\n「絶対失敗する」視点で容赦なく批判してください。' }]
  });
  return res.content[0].text;
};

// ChatGPT: 市場・データ役
DiscussionEngine.prototype._callChatGPT = async function(ctx, draft, critique, rt) {
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 2500,
    messages: [
      { role: 'system', content: 'あなたは「ChatGPT（市場役）」。競合・トレンド・顧客心理の専門家。必ずデータと事例で語る。他業界の成功事例も積極的に引用する。' },
      { role: 'user', content: ctx + '\n\nClaude A:\n' + draft + '\n\nClaude B:\n' + critique + '\n\n市場データ・競合分析・顧客心理の観点から意見してください。' }
    ]
  });
  return res.choices[0].message.content;
};

// 統合（前田フィルター適用）
DiscussionEngine.prototype._synthesize = async function(ctx, draft, critique, market, rt, memory) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
    system: '全意見を統合し、前田さんの過去の判断傾向を織り込んで最終見解をまとめてください。前田さんの記憶DB: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: 'ラウンド「' + rt.theme + '」の全意見:\n\nClaude A（構築役）:\n' + draft + '\n\nClaude B（破壊役）:\n' + critique + '\n\nChatGPT（市場役）:\n' + market +
      '\n\n全意見を統合し、前田さんの好み・判断傾向を考慮した最終見解をまとめてください。このラウンドの結論と次ラウンドへの課題も明記。' }]
  });
  return res.content[0].text;
};

// ヘルパー
DiscussionEngine.prototype._getHistory = function(sid) {
  return this.db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC').all(sid);
};

DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
  var g = {};
  rows.forEach(function(r) {
    var cat = r.category + (r.subcategory ? '/' + r.subcategory : '');
    if (!g[cat]) g[cat] = {};
    g[cat][r.key] = r.value;
  });
  return g;
};

DiscussionEngine.prototype._getOfficeDocs = function() {
  var fs = require('fs');
  var path = require('path');
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
  if (!fs.existsSync(dir)) return null;
  var files = fs.readdirSync(dir).filter(function(f) { return f.endsWith('.txt') || f.endsWith('.md'); });
  var contents = files.map(function(f) {
    try { return '【' + f + '】\n' + fs.readFileSync(path.join(dir, f), 'utf8').substring(0, 2000); }
    catch(e) { return ''; }
  });
  return contents.join('\n\n') || null;
};

DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var docs = this._getOfficeDocs();
  return docs ? docs.substring(0, 1500) : null;
};

DiscussionEngine.prototype._getSimilarCases = function(topic) {
  var cases = this.db.prepare("SELECT title, output_type, description, tone, tags FROM case_library ORDER BY created_at DESC LIMIT 10").all();
  if (cases.length === 0) return null;
  return cases.map(function(c) { return '[' + c.output_type + '] ' + c.title + ': ' + (c.description || ''); }).join('\n');
};

DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
};

module.exports = DiscussionEngine;
