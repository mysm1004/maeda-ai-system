var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// v2.0仕様: Phase1は8ステップ。Claude5回、GPT-5.4が3回
var PHASE1_STEPS = [
  { num: 1, name: '市場・競合調査（Claude）', ai: 'claude', role: '市場調査の専門家' },
  { num: 2, name: '市場・競合調査（ChatGPT）', ai: 'chatgpt', role: '検証・補完役' },
  { num: 3, name: '顧客ニーズ深掘り（Claude）', ai: 'claude', role: '消費者心理の専門家' },
  { num: 4, name: '顧客ニーズ深掘り（ChatGPT）', ai: 'chatgpt', role: '消費者行動分析' },
  { num: 5, name: '構築・アイデア拡張（Claude）', ai: 'claude', role: '事業戦略の天才' },
  { num: 6, name: '批判・対抗（Claude）', ai: 'claude', role: '悪魔の代弁者' },
  { num: 7, name: 'さらなる批判（ChatGPT）', ai: 'chatgpt', role: '競合の戦略コンサル' },
  { num: 8, name: '最終案の統合（Claude）', ai: 'claude', role: '最終統合者' }
];

// v2.0仕様: Claude = claude-sonnet-4-20250514（Opusは LINE SmartQAのみ）
var CLAUDE_MODEL = 'claude-sonnet-4-20250514';

=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
var PHASE1_STEPS = [
  { num: 1, name: '市場・競合調査（Claude）', ai: 'claude', role: 'Web検索で競合LP・料金・強み・弱みを網羅収集' },
  { num: 2, name: '市場・競合調査（ChatGPT）', ai: 'chatgpt', role: 'Claudeの見落とし補完・別視点追加' },
  { num: 3, name: '顧客ニーズ深掘り（Claude）', ai: 'claude', role: 'ターゲットの不安・欲求・言葉を徹底分析' },
  { num: 4, name: '顧客ニーズ深掘り（ChatGPT）', ai: 'chatgpt', role: '異なる顧客像・ニーズを対抗提示' },
  { num: 5, name: '構築・アイデア拡張（Claude）', ai: 'claude', role: 'ステップ1-4を統合してアイデアを最大限に膨らませる。異業種事例も投入' },
  { num: 6, name: '批判・対抗（Claude）', ai: 'claude', role: '悪魔の代弁者。なぜ失敗するかを徹底的に突く' },
  { num: 7, name: 'さらなる批判（ChatGPT）', ai: 'chatgpt', role: '競合代理人視点で競合ならこう潰すを提示' },
  { num: 8, name: '最終案の統合（Claude）', ai: 'claude', role: '全批判を受けて穴を全て潰し最強のアイデアに昇華' }
];

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
function DiscussionEngine(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA || null;
  this.sendLineFn = sendLineFn || null;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  // Claude APIクレジット切れ時、GPT-5.4にフォールバックするラッパー
  var originalCreate = this.anthropic.messages.create.bind(this.anthropic.messages);
  var openai = this.openai;
  this.anthropic.messages.create = async function(params) {
    try {
      return await originalCreate(params);
    } catch (e) {
      if (e.status === 400 && e.message && e.message.indexOf('credit') !== -1) {
        console.error('[Claude→GPT-5.4 fallback] クレジット不足:', e.message);
        var msgs = [];
        if (params.system) msgs.push({ role: 'system', content: params.system });
        msgs = msgs.concat(params.messages);
        var gptRes = await openai.chat.completions.create({
          model: 'gpt-5.4', max_completion_tokens: Math.max(params.max_tokens || 4000, 16000), messages: msgs
        });
        var fallbackText = (gptRes.choices[0].message.content || gptRes.choices[0].message.refusal || '（フォールバック応答なし）') +
          '\n\n※Claude APIクレジット不足のためGPT-5.4で代替生成';
        // Anthropic API互換レスポンス形式で返す
        return { content: [{ type: 'text', text: fallbackText }] };
      }
      throw e;
    }
  };
}

// セッション作成（v2.0: project_id追加、total_rounds=8）
DiscussionEngine.prototype.createSession = function(title, topic, projectId) {
  var r = this.db.prepare('INSERT INTO sessions (title, topic, total_rounds, project_id, last_operated_at) VALUES (?, ?, 8, ?, CURRENT_TIMESTAMP)').run(title, topic, projectId || null);
  // active_projectsのcurrent_session_idを更新
  if (projectId) {
    this.db.prepare('UPDATE active_projects SET current_session_id = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(r.lastInsertRowid, projectId);
  }
  return r.lastInsertRowid;
};

// 事前調査（v2.0: claude-sonnet-4-20250514, max_tokens: 3000, 事務所HP全クロール, 事務所資料3000文字）
DiscussionEngine.prototype.runResearch = async function(topic, projectId) {
  var officeDocs = this._getOfficeDocs();
  var memory = this._getMemoryForContext(projectId);
  var similarCases = this._getSimilarCases(topic);

  var systemPrompt = '【最重要】調査対象テーマ：「' + topic + '」。' +
    (projectId ? 'project_id: ' + projectId + '。' : '') +
    'このテーマのみを調査してください。memory_dbや他プロジェクトの別テーマに絶対に引っ張られないこと。\n\n' +
    'あなたはマーケティングリサーチの専門家です。「' + topic + '」の事前調査レポートを作成してください。';

  var res = await this.anthropic.messages.create({
    model: CLAUDE_MODEL, max_tokens: 3000,
    system: systemPrompt,
    messages: [{ role: 'user', content: '★★★ 調査テーマ：「' + topic + '」★★★\n※他のテーマの情報は無視すること\n\nテーマ: ' + topic +
      '\n\n【事務所資料】\n' + (officeDocs || 'なし') +
      '\n\n【事務所HP】https://tslaw.or.jp/ の情報も参考にしてください' +
      '\n\n【類似過去案件】\n' + (similarCases || 'なし') +
      '\n\n【前田さんの好み】\n' + JSON.stringify(memory) +
      '\n\n調査項目：\n1. 競合LP・広告の傾向\n2. 業界トレンド\n3. 成功・失敗パターン\n4. 検索キーワード・口コミ表現\n5. 差別化の機会\n6. 市場規模・成長率\n7. 参入障壁' }]
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

// セッション作成
DiscussionEngine.prototype.createSession = function(title, topic) {
  var r = this.db.prepare('INSERT INTO sessions (title, topic, total_rounds) VALUES (?, ?, 8)').run(title, topic);
  return r.lastInsertRowid;
};

// 事前調査
DiscussionEngine.prototype.runResearch = async function(topic) {
  var officeDocs = this._getOfficeDocs();
  var memory = this._getMemoryForContext();
  var similarCases = this._getSimilarCases(topic);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
    system: '【最重要】調査対象テーマ：「' + topic + '」\nこのテーマのみを調査してください。過去案件や記憶DBに別テーマの情報があっても、それに引っ張られず「' + topic + '」だけを分析すること。\n\nあなたはマーケティングリサーチの専門家です。「' + topic + '」の事前調査レポートを作成してください。',
    messages: [{ role: 'user', content: '★★★ 調査テーマ：「' + topic + '」★★★\n※他のテーマの情報は無視すること\n\nテーマ: ' + topic +
      '\n\n【事務所資料】\n' + (officeDocs || 'なし') +
      '\n\n【類似過去案件】\n' + (similarCases || 'なし') +
      '\n\n【前田さんの好み】\n' + JSON.stringify(memory) +
      '\n\n調査項目：\n1. 競合LP・広告の傾向\n2. 業界トレンド\n3. 成功・失敗パターン\n4. 検索キーワード・口コミ表現\n5. 差別化の機会' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
  return res.content[0].text;
};

// Phase1: 1ステップ実行
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
DiscussionEngine.prototype.runStep = async function(sessionId, topic, stepNum, research, isSleep, projectId) {
  var step = PHASE1_STEPS[stepNum - 1];
  if (!step) throw new Error('Invalid step: ' + stepNum);
  var history = this._getHistory(sessionId);
  var memory = this._getMemoryForContext(projectId);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
DiscussionEngine.prototype.runStep = async function(sessionId, topic, stepNum, research, isSleep) {
  var step = PHASE1_STEPS[stepNum - 1];
  if (!step) throw new Error('Invalid step: ' + stepNum);
  var history = this._getHistory(sessionId);
  var memory = this._getMemoryForContext();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var officeDocs = this._getOfficeDocsSummary();
  var sm = isSleep ? 1 : 0;

  var prevResults = history.filter(function(h) { return h.role !== 'user'; })
    .map(function(h) { return '【Step' + h.round_number + ': ' + h.round_theme + '】\n' + h.content; }).join('\n\n===\n\n');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  // v2.0仕様: テーマ固定ルール強制挿入 + project_id
  var baseCtx = '【最重要】分析対象テーマ：「' + topic + '」。' +
    (projectId ? 'project_id: ' + projectId + '。' : '') +
    'このテーマのみを分析すること。memory_dbや他プロジェクトの別テーマに絶対に引っ張られないこと。\n\n' +
    '【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
=======
  var baseCtx = '★★★ 分析テーマ：「' + topic + '」 ★★★\n※以下の記憶DBや事務所資料に別テーマの情報があっても、上記テーマのみを分析すること。\n\n【テーマ】' + topic + '\n【事前調査】' + (research || '未実施') +
>>>>>>> Stashed changes
    '\n【事務所資料要約】' + (officeDocs || 'なし') + '\n【前田さんの記憶DB】' + JSON.stringify(memory);
  if (prevResults) baseCtx += '\n\n【これまでの結果】\n' + prevResults;

  var result;
  switch (stepNum) {
    case 1: result = await this._step1(baseCtx, topic); break;
    case 2: result = await this._step2(baseCtx, topic, history); break;
    case 3: result = await this._step3(baseCtx, topic, history); break;
    case 4: result = await this._step4(baseCtx, topic, history); break;
    case 5:
      result = await this._step5(baseCtx, topic, history);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      // v2.1: Step5方向性確認スキップ（自動で最有望案を選択して続行）
      console.log('[Discussion] Step5: 方向性確認スキップ（自動続行モード）');
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      // Step5後: 方向性確認（非就寝モード時）
      if (this.lineQA && this.sendLineFn && !isSleep) {
        try {
          var dirCheck = await this._checkNeedsConfirmation(result, topic);
          if (dirCheck.needsConfirmation) {
            var userDir = await this.lineQA.askUserViaLine({
              sessionId: sessionId, question: dirCheck.question,
              context: { step: 5, topic: topic }, engineType: 'discussion',
              engineStep: 'phase1_step5', pushLineFn: this.sendLineFn
            });
            if (userDir) result += '\n\n【前田さんの方向性指示】\n' + userDir;
          }
        } catch (e) { console.log('[Discussion] Step5確認スキップ:', e.message); }
      }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      break;
    case 6: result = await this._step6(baseCtx, topic, history); break;
    case 7: result = await this._step7(baseCtx, topic, history); break;
    case 8: result = await this._step8(baseCtx, topic, history, memory, sessionId); break;
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm, projectId);
  this.db.prepare('UPDATE sessions SET current_round = ?, last_operated_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
=======
  this._saveLog(sessionId, 1, stepNum, step.name, step.ai === 'claude' ? 'claude' : 'chatgpt', step.name, result, sm);
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(stepNum, sessionId);
>>>>>>> Stashed changes
  return { step: stepNum, totalSteps: 8, name: step.name, ai: step.ai, content: result, sessionId: sessionId };
};

// 旧互換
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep, projectId) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep, projectId);
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype.runRound = function(sessionId, topic, roundNum, research, isSleep) {
  return this.runStep(sessionId, topic, roundNum, research, isSleep);
>>>>>>> Stashed changes
};

// Step1: 市場・競合調査（Claude）
DiscussionEngine.prototype._step1 = async function(ctx, topic) {
  var res = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 4000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関する競合のLP・料金体系・強み・弱みを徹底的に分析してください。具体的な競合名と数字を出すこと。',
    messages: [{ role: 'user', content: ctx + '\n\n以下を網羅調査：\n1. 競合サービスのリスト（名称・URL・特徴）\n2. 各競合の料金体系・価格帯\n3. 各競合LPの構成・訴求ポイント\n4. 各競合の強み・弱み\n5. 市場規模（TAM/SAM/SOM）\n6. 市場の成長率・トレンド\n7. 参入障壁\n8. 業界の課題・ペインポイント' }]
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step2: 市場・競合調査（ChatGPT / GPT-5.4）
DiscussionEngine.prototype._step2 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-5.4', max_completion_tokens: 16000,
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// Step2: 市場・競合調査（ChatGPT）
=======
// Step2: 市場・競合調査（ChatGPT）
>>>>>>> Stashed changes
DiscussionEngine.prototype._step2 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関するClaudeの調査を検証し、見落とし・別視点を補完してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの調査結果】\n' + s1 + '\n\n実行事項：\n1. 見落とし競合\n2. 料金データ補完・修正\n3. 海外の類似サービス\n4. 過大評価の指摘\n5. 市場規模の別推定\n6. 最新トレンド・ニュース' }
    ]
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return res.choices[0].message.content || res.choices[0].message.refusal || '（GPT-5.4応答なし）';
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 4000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関する競合のLP・料金体系・強み・弱みを徹底的に分析してください。具体的な競合名と数字を出すこと。',
    messages: [{ role: 'user', content: ctx + '\n\n以下を網羅調査：\n1. 競合サービスのリスト（名称・URL・特徴）\n2. 各競合の料金体系・価格帯\n3. 各競合LPの構成・訴求ポイント\n4. 各競合の強み・弱み\n5. 市場規模（TAM/SAM/SOM）\n6. 市場の成長率・トレンド\n7. 参入障壁\n8. 業界の課題・ペインポイント' }]
  });
  return res.content[0].text;
};

// Step2: 市場・競合調査（ChatGPT）
DiscussionEngine.prototype._step2 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関するClaudeの調査を検証し、見落とし・別視点を補完してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの調査結果】\n' + s1 + '\n\n実行事項：\n1. 見落とし競合\n2. 料金データ補完・修正\n3. 海外の類似サービス\n4. 過大評価の指摘\n5. 市場規模の別推定\n6. 最新トレンド・ニュース' }
    ]
  });
  return res.choices[0].message.content;
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者心理の専門家です。「' + topic + '」のターゲットの不安・欲求・使う言葉を深層心理まで掘り下げてください。',
    messages: [{ role: 'user', content: ctx + '\n\n徹底分析：\n1. ペルソナ3人以上\n2. 顕在・潜在ニーズ\n3. 購入を阻む不安トップ5\n4. 検索キーワード20個以上\n5. リアルな口コミ表現15個以上\n6. 買わない理由トップ5と克服法\n7. 感情の流れ（認知→検討→決定→後悔防止）\n8. 情報収集チャネル\n9. 決定トリガー\n10. 競合を選ぶ理由と奪い返す方法' }]
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step4: 顧客ニーズ深掘り（ChatGPT / GPT-5.4）
DiscussionEngine.prototype._step4 = async function(ctx, topic, history) {
  var s3 = this._getStepResult(history, 3);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-5.4', max_completion_tokens: 16000,
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// Step4: 顧客ニーズ深掘り（ChatGPT）
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
=======
// Step4: 顧客ニーズ深掘り（ChatGPT）
>>>>>>> Stashed changes
DiscussionEngine.prototype._step4 = async function(ctx, topic, history) {
  var s3 = this._getStepResult(history, 3);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者行動分析の専門家です。「' + topic + '」に関するClaudeの分析を検証し、全く異なる顧客像やニーズを対抗提示してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの顧客分析】\n' + s3 + '\n\n実行：\n1. 想定外の顧客セグメント\n2. 見落とし心理的障壁\n3. 別角度ペルソナ\n4. 購買決定の別モデル\n5. SNS・Q&Aでの声\n6. Claudeへの反論と代替仮説' }
    ]
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return res.choices[0].message.content || res.choices[0].message.refusal || '（GPT-5.4応答なし）';
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
>>>>>>> Stashed changes
=======
  return res.choices[0].message.content;
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関する競合のLP・料金体系・強み・弱みを徹底的に分析してください。具体的な競合名と数字を出すこと。',
    messages: [{ role: 'user', content: ctx + '\n\n以下を網羅調査：\n1. 競合サービスのリスト（名称・URL・特徴）\n2. 各競合の料金体系・価格帯\n3. 各競合LPの構成・訴求ポイント\n4. 各競合の強み・弱み\n5. 市場規模（TAM/SAM/SOM）\n6. 市場の成長率・トレンド\n7. 参入障壁\n8. 業界の課題・ペインポイント' }]
  });
  return res.content[0].text;
};

// Step2: 市場・競合調査（ChatGPT）
DiscussionEngine.prototype._step2 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関するClaudeの調査を検証し、見落とし・別視点を補完してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの調査結果】\n' + s1 + '\n\n実行事項：\n1. 見落とし競合\n2. 料金データ補完・修正\n3. 海外の類似サービス\n4. 過大評価の指摘\n5. 市場規模の別推定\n6. 最新トレンド・ニュース' }
    ]
  });
  return res.choices[0].message.content;
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
>>>>>>> Stashed changes
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者心理の専門家です。「' + topic + '」のターゲットの不安・欲求・使う言葉を深層心理まで掘り下げてください。',
    messages: [{ role: 'user', content: ctx + '\n\n徹底分析：\n1. ペルソナ3人以上\n2. 顕在・潜在ニーズ\n3. 購入を阻む不安トップ5\n4. 検索キーワード20個以上\n5. リアルな口コミ表現15個以上\n6. 買わない理由トップ5と克服法\n7. 感情の流れ（認知→検討→決定→後悔防止）\n8. 情報収集チャネル\n9. 決定トリガー\n10. 競合を選ぶ理由と奪い返す方法' }]
  });
  return res.content[0].text;
};

// Step4: 顧客ニーズ深掘り（ChatGPT）
DiscussionEngine.prototype._step4 = async function(ctx, topic, history) {
  var s3 = this._getStepResult(history, 3);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者行動分析の専門家です。「' + topic + '」に関するClaudeの分析を検証し、全く異なる顧客像やニーズを対抗提示してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの顧客分析】\n' + s3 + '\n\n実行：\n1. 想定外の顧客セグメント\n2. 見落とし心理的障壁\n3. 別角度ペルソナ\n4. 購買決定の別モデル\n5. SNS・Q&Aでの声\n6. Claudeへの反論と代替仮説' }
    ]
  });
  return res.choices[0].message.content;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  return res.choices[0].message.content;
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関する競合のLP・料金体系・強み・弱みを徹底的に分析してください。具体的な競合名と数字を出すこと。',
    messages: [{ role: 'user', content: ctx + '\n\n以下を網羅調査：\n1. 競合サービスのリスト（名称・URL・特徴）\n2. 各競合の料金体系・価格帯\n3. 各競合LPの構成・訴求ポイント\n4. 各競合の強み・弱み\n5. 市場規模（TAM/SAM/SOM）\n6. 市場の成長率・トレンド\n7. 参入障壁\n8. 業界の課題・ペインポイント' }]
=======
  return res.choices[0].message.content;
=======
>>>>>>> Stashed changes
};

// Step5: 構築・アイデア拡張（Claude）
DiscussionEngine.prototype._step5 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var s2 = this._getStepResult(history, 2);
  var s3 = this._getStepResult(history, 3);
  var s4 = this._getStepResult(history, 4);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは事業戦略の天才です。「' + topic + '」に関する全調査結果を統合し、アイデアを最大限に膨らませてください。異業種の成功事例も積極投入。',
    messages: [{ role: 'user', content: ctx +
      '\n\n【Step1: 市場調査Claude】\n' + s1 + '\n\n【Step2: 市場調査GPT】\n' + s2 +
      '\n\n【Step3: 顧客ニーズClaude】\n' + s3 + '\n\n【Step4: 顧客ニーズGPT】\n' + s4 +
      '\n\n実行：\n1. 全調査の統合サマリー\n2. 最有望戦略3案\n3. 各案の差別化ポイント\n4. 異業種成功事例の応用3つ以上\n5. テクノロジー活用の可能性\n6. 収益モデル設計\n7. 実行ロードマップ（3ヶ月・6ヶ月・1年）\n8. 最推奨案と理由' }]
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step2: 市場・競合調査（ChatGPT）
DiscussionEngine.prototype._step2 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは市場調査の専門家です。「' + topic + '」に関するClaudeの調査を検証し、見落とし・別視点を補完してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの調査結果】\n' + s1 + '\n\n実行事項：\n1. 見落とし競合\n2. 料金データ補完・修正\n3. 海外の類似サービス\n4. 過大評価の指摘\n5. 市場規模の別推定\n6. 最新トレンド・ニュース' }
    ]
  });
  return res.choices[0].message.content;
};

// Step3: 顧客ニーズ深掘り（Claude）
DiscussionEngine.prototype._step3 = async function(ctx, topic, history) {
  var res = await this.anthropic.messages.create({
>>>>>>> Stashed changes
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者心理の専門家です。「' + topic + '」のターゲットの不安・欲求・使う言葉を深層心理まで掘り下げてください。',
    messages: [{ role: 'user', content: ctx + '\n\n徹底分析：\n1. ペルソナ3人以上\n2. 顕在・潜在ニーズ\n3. 購入を阻む不安トップ5\n4. 検索キーワード20個以上\n5. リアルな口コミ表現15個以上\n6. 買わない理由トップ5と克服法\n7. 感情の流れ（認知→検討→決定→後悔防止）\n8. 情報収集チャネル\n9. 決定トリガー\n10. 競合を選ぶ理由と奪い返す方法' }]
=======
=======
>>>>>>> Stashed changes
// Step6: 批判・対抗（Claude）
DiscussionEngine.prototype._step6 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは容赦ない悪魔の代弁者です。「' + topic + '」について、なぜ失敗するかを徹底的に突いてください。甘い見通し・楽観的数字・見落としリスクを全て指摘。ただし建設的提案も必ず添えること。',
    messages: [{ role: 'user', content: ctx + '\n\n【Step5: アイデア拡張】\n' + s5 +
      '\n\n批判観点：\n1. 市場規模が楽観的すぎないか\n2. 競合の反撃シナリオ\n3. 法的リスク（弁護士法・景表法・個情法等）\n4. オペレーション破綻ポイント\n5. 顧客獲得コストの現実性\n6. やらない理由トップ5\n7. 類似事業の失敗パターン\n8. 前田事務所のリソースで可能か\n9. 3年後に市場が変わる可能性\n10. 致命的欠陥と回避策' }]
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step4: 顧客ニーズ深掘り（ChatGPT）
DiscussionEngine.prototype._step4 = async function(ctx, topic, history) {
  var s3 = this._getStepResult(history, 3);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは消費者行動分析の専門家です。「' + topic + '」に関するClaudeの分析を検証し、全く異なる顧客像やニーズを対抗提示してください。' },
      { role: 'user', content: ctx + '\n\n【Claudeの顧客分析】\n' + s3 + '\n\n実行：\n1. 想定外の顧客セグメント\n2. 見落とし心理的障壁\n3. 別角度ペルソナ\n4. 購買決定の別モデル\n5. SNS・Q&Aでの声\n6. Claudeへの反論と代替仮説' }
    ]
  });
  return res.choices[0].message.content;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

// Step5: 構築・アイデア拡張（Claude）
DiscussionEngine.prototype._step5 = async function(ctx, topic, history) {
  var s1 = this._getStepResult(history, 1);
  var s2 = this._getStepResult(history, 2);
  var s3 = this._getStepResult(history, 3);
  var s4 = this._getStepResult(history, 4);
  var res = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 5000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは事業戦略の天才です。「' + topic + '」に関する全調査結果を統合し、アイデアを最大限に膨らませてください。異業種の成功事例も積極投入。',
    messages: [{ role: 'user', content: ctx +
      '\n\n【Step1: 市場調査Claude】\n' + s1 + '\n\n【Step2: 市場調査GPT】\n' + s2 +
      '\n\n【Step3: 顧客ニーズClaude】\n' + s3 + '\n\n【Step4: 顧客ニーズGPT】\n' + s4 +
      '\n\n実行：\n1. 全調査の統合サマリー\n2. 最有望戦略3案\n3. 各案の差別化ポイント\n4. 異業種成功事例の応用3つ以上\n5. テクノロジー活用の可能性\n6. 収益モデル設計\n7. 実行ロードマップ（3ヶ月・6ヶ月・1年）\n8. 最推奨案と理由' }]
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step6: 批判・対抗（Claude）- 悪魔の代弁者
DiscussionEngine.prototype._step6 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var res = await this.anthropic.messages.create({
    model: CLAUDE_MODEL, max_tokens: 4000,
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// Step6: 批判・対抗（Claude）
DiscussionEngine.prototype._step6 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは容赦ない悪魔の代弁者です。「' + topic + '」について、なぜ失敗するかを徹底的に突いてください。甘い見通し・楽観的数字・見落としリスクを全て指摘。ただし建設的提案も必ず添えること。',
    messages: [{ role: 'user', content: ctx + '\n\n【Step5: アイデア拡張】\n' + s5 +
      '\n\n批判観点：\n1. 市場規模が楽観的すぎないか\n2. 競合の反撃シナリオ\n3. 法的リスク（弁護士法・景表法・個情法等）\n4. オペレーション破綻ポイント\n5. 顧客獲得コストの現実性\n6. やらない理由トップ5\n7. 類似事業の失敗パターン\n8. 前田事務所のリソースで可能か\n9. 3年後に市場が変わる可能性\n10. 致命的欠陥と回避策' }]
  });
  return res.content[0].text;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Step7: さらなる批判（ChatGPT / GPT-5.4）- 競合の戦略コンサル
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
>>>>>>> Stashed changes
DiscussionEngine.prototype._step7 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var res = await this.openai.chat.completions.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: 'gpt-5.4', max_completion_tokens: 16000,
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは容赦ない悪魔の代弁者です。「' + topic + '」について、なぜ失敗するかを徹底的に突いてください。甘い見通し・楽観的数字・見落としリスクを全て指摘。ただし建設的提案も必ず添えること。',
    messages: [{ role: 'user', content: ctx + '\n\n【Step5: アイデア拡張】\n' + s5 +
      '\n\n批判観点：\n1. 市場規模が楽観的すぎないか\n2. 競合の反撃シナリオ\n3. 法的リスク（弁護士法・景表法・個情法等）\n4. オペレーション破綻ポイント\n5. 顧客獲得コストの現実性\n6. やらない理由トップ5\n7. 類似事業の失敗パターン\n8. 前田事務所のリソースで可能か\n9. 3年後に市場が変わる可能性\n10. 致命的欠陥と回避策' }]
  });
  return res.content[0].text;
};

// Step7: さらなる批判（ChatGPT）
DiscussionEngine.prototype._step7 = async function(ctx, topic, history) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは競合企業の戦略コンサルタントです。「' + topic + '」に関する前田法律事務所の戦略を見て「競合ならどう潰すか」を徹底提示してください。' },
      { role: 'user', content: ctx + '\n\n【前田事務所のアイデア】\n' + s5 + '\n\n【Claude批判】\n' + s6 +
        '\n\n競合代理人として：\n1. 競合の対抗戦略\n2. 価格で潰す方法\n3. マーケで潰す方法\n4. サービス品質で潰す方法\n5. Claude批判の見落とし\n6. 最も脆弱なポイント\n7. 競合が先手で仕掛ける施策' }
    ]
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return res.choices[0].message.content || res.choices[0].message.refusal || '（GPT-5.4応答なし）';
};

// Step8: 最終統合（Claude）
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  return res.choices[0].message.content;
};

// Step8: 批判を乗り越えた最終案の統合（Claude）
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
DiscussionEngine.prototype._step8 = async function(ctx, topic, history, memory, sessionId) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var s7 = this._getStepResult(history, 7);
  var res = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 5000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
    model: 'gpt-4o', max_tokens: 4000,
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは競合企業の戦略コンサルタントです。「' + topic + '」に関する前田法律事務所の戦略を見て「競合ならどう潰すか」を徹底提示してください。' },
      { role: 'user', content: ctx + '\n\n【前田事務所のアイデア】\n' + s5 + '\n\n【Claude批判】\n' + s6 +
        '\n\n競合代理人として：\n1. 競合の対抗戦略\n2. 価格で潰す方法\n3. マーケで潰す方法\n4. サービス品質で潰す方法\n5. Claude批判の見落とし\n6. 最も脆弱なポイント\n7. 競合が先手で仕掛ける施策' }
    ]
  });
  return res.choices[0].message.content;
=======
    model: 'gpt-4o', max_tokens: 4000,
=======
>>>>>>> Stashed changes
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは競合企業の戦略コンサルタントです。「' + topic + '」に関する前田法律事務所の戦略を見て「競合ならどう潰すか」を徹底提示してください。' },
      { role: 'user', content: ctx + '\n\n【前田事務所のアイデア】\n' + s5 + '\n\n【Claude批判】\n' + s6 +
        '\n\n競合代理人として：\n1. 競合の対抗戦略\n2. 価格で潰す方法\n3. マーケで潰す方法\n4. サービス品質で潰す方法\n5. Claude批判の見落とし\n6. 最も脆弱なポイント\n7. 競合が先手で仕掛ける施策' }
    ]
  });
  return res.choices[0].message.content;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
};

// Step8: 批判を乗り越えた最終案の統合（Claude）
DiscussionEngine.prototype._step8 = async function(ctx, topic, history, memory, sessionId) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var s7 = this._getStepResult(history, 7);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは最終統合者です。「' + topic + '」に関する全批判を受け止め穴を全て潰した最強のアイデアを提示してください。各批判に対する具体的解決策を必ず示すこと。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: ctx +
      '\n\n【Step5: アイデア拡張】\n' + s5 + '\n\n【Step6: 批判Claude】\n' + s6 + '\n\n【Step7: 批判GPT/競合視点】\n' + s7 +
      '\n\n実行：\n1. 各批判への具体的解決策（全批判に1つずつ回答）\n2. 修正した最終アイデア\n3. ターゲット定義（最終版）\n4. 差別化ポイント（端的に3つ）\n5. 勝てる理由（端的に）\n6. 収益モデル（最終版）\n7. リスク対策マトリクス\n8. 実行優先順位\n\nフェーズ2に渡す結論としてJSON出力：\n{\n  "target_definition": "ターゲット定義",\n  "appeal_points": ["訴求1", "訴求2", "訴求3"],\n  "differentiation": ["差別化1", "差別化2", "差別化3"],\n  "winning_reason": "勝てる理由",\n  "revenue_model": "収益モデル概要",\n  "catchcopy": ["コピー案1", "コピー案2", "コピー案3"]\n}' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
=======
>>>>>>> Stashed changes
=======
// Step7: さらなる批判（ChatGPT）
DiscussionEngine.prototype._step7 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
=======
// Step7: さらなる批判（ChatGPT）
DiscussionEngine.prototype._step7 = async function(ctx, topic, history) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
>>>>>>> Stashed changes
  var res = await this.openai.chat.completions.create({
    model: 'gpt-4o', max_tokens: 4000,
    messages: [
      { role: 'system', content: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは競合企業の戦略コンサルタントです。「' + topic + '」に関する前田法律事務所の戦略を見て「競合ならどう潰すか」を徹底提示してください。' },
      { role: 'user', content: ctx + '\n\n【前田事務所のアイデア】\n' + s5 + '\n\n【Claude批判】\n' + s6 +
        '\n\n競合代理人として：\n1. 競合の対抗戦略\n2. 価格で潰す方法\n3. マーケで潰す方法\n4. サービス品質で潰す方法\n5. Claude批判の見落とし\n6. 最も脆弱なポイント\n7. 競合が先手で仕掛ける施策' }
    ]
  });
  return res.choices[0].message.content;
};

// Step8: 批判を乗り越えた最終案の統合（Claude）
DiscussionEngine.prototype._step8 = async function(ctx, topic, history, memory, sessionId) {
  var s5 = this._getStepResult(history, 5);
  var s6 = this._getStepResult(history, 6);
  var s7 = this._getStepResult(history, 7);
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 5000,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: '【最重要】分析対象テーマ：「' + topic + '」\nこのテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。\n\nあなたは最終統合者です。「' + topic + '」に関する全批判を受け止め穴を全て潰した最強のアイデアを提示してください。各批判に対する具体的解決策を必ず示すこと。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: ctx +
      '\n\n【Step5: アイデア拡張】\n' + s5 + '\n\n【Step6: 批判Claude】\n' + s6 + '\n\n【Step7: 批判GPT/競合視点】\n' + s7 +
      '\n\n実行：\n1. 各批判への具体的解決策（全批判に1つずつ回答）\n2. 修正した最終アイデア\n3. ターゲット定義（最終版）\n4. 差別化ポイント（端的に3つ）\n5. 勝てる理由（端的に）\n6. 収益モデル（最終版）\n7. リスク対策マトリクス\n8. 実行優先順位\n\nフェーズ2に渡す結論としてJSON出力：\n{\n  "target_definition": "ターゲット定義",\n  "appeal_points": ["訴求1", "訴求2", "訴求3"],\n  "differentiation": ["差別化1", "差別化2", "差別化3"],\n  "winning_reason": "勝てる理由",\n  "revenue_model": "収益モデル概要",\n  "catchcopy": ["コピー案1", "コピー案2", "コピー案3"]\n}' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
  var text = res.content[0].text;
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      var parsed = JSON.parse(jsonMatch[0]);
      this.db.prepare('UPDATE sessions SET phase = 2, target_definition = ?, appeal_points = ?, catchcopy = ?, output_plan = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(parsed.target_definition, JSON.stringify(parsed.appeal_points), JSON.stringify(parsed.catchcopy), (parsed.winning_reason || '') + ' | ' + (parsed.revenue_model || ''), sessionId);
    } catch(e) {
      console.error('[Phase1統合] JSON解析エラー:', e.message);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      // v2.1: JSON解析失敗時もLINE確認スキップ（自動再試行）
      console.log('[Discussion] Step8 JSON解析失敗、テキストからの自動抽出を試行');
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      // LINE確認で手動入力を求める
      if (this.lineQA && this.sendLineFn) {
        try {
          var manual = await this.lineQA.askUserViaLine({
            sessionId: sessionId,
            question: 'Phase1最終統合でデータ抽出に失敗しました。以下を簡潔に教えてください:\n1. メインターゲット\n2. 訴求ポイント（3つ）\n3. キャッチコピー案',
            context: { step: 8, error: e.message }, engineType: 'discussion',
            engineStep: 'phase1_step8_json', pushLineFn: this.sendLineFn
          });
          if (manual) text += '\n\n【前田さんの手動指示】\n' + manual;
        } catch(e2) { console.log('[Discussion] Step8確認タイムアウト'); }
      }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
  }
  return text;
};

// 最終統合（旧互換）
DiscussionEngine.prototype.generateFinalSummary = async function(sessionId) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var history = this._getHistory(sessionId);
  var s8 = history.filter(function(h) { return h.round_number === 8; });
  if (s8.length > 0) return s8[s8.length - 1].content;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return this._step8('【テーマ】' + session.topic, session.topic, history, this._getMemoryForContext(session.project_id), sessionId);
};

// Phase1完了レポート（v2.0: claude-sonnet-4-20250514, max_tokens: 6000）
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  return this._step8('【テーマ】' + session.topic, session.topic, history, this._getMemoryForContext(), sessionId);
};

// フェーズ1完了レポート生成
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
DiscussionEngine.prototype.generatePhase1Report = async function(sessionId) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var history = this._getHistory(sessionId);
  var allResults = '';
  for (var i = 1; i <= 8; i++) {
    var stepData = history.filter(function(h) { return h.round_number === i && h.role !== 'user'; });
    if (stepData.length > 0) {
      allResults += '【Step' + i + ': ' + (stepData[stepData.length - 1].round_theme || '') + '】\n' + stepData[stepData.length - 1].content.substring(0, 3000) + '\n\n';
    }
  }

  var res = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 6000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 6000,
>>>>>>> Stashed changes
    system: 'あなたは前田法律事務所の専属AIアシスタントです。8ステップの壁打ち結果を分析し、以下の6セクションで構造化レポートを作成してください。\n\n各セクションは端的かつ明確に、根拠データや具体的数字を必ず含めてください。抽象的な表現は避け、意思決定に使える品質で出力してください。\n\n必ず以下のJSON形式で出力してください:\n{\n  "target": "ターゲット像・選定理由・その合理性",\n  "market": "市場規模・競合の強み弱み・自社のポジション・根拠データ",\n  "service": "サービスの具体的内容・差別化ポイント・競合に勝てる根拠",\n  "revenue": "想定単価・月間件数・月商・年商・主なコストと利益",\n  "challenges": "実現上の課題・リスク・解決すべき問題",\n  "discussion": "壁打ちで出た主要論点・立てた仮説・その根拠"\n}',
    messages: [{ role: 'user', content: '【テーマ】' + session.topic + '\n\n【壁打ち全8ステップの結果】\n' + allResults }]
  });

  var text = res.content[0].text;
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      var report = JSON.parse(jsonMatch[0]);
      report.topic = session.topic;
      report.title = session.title;
      report.sessionId = sessionId;
      return report;
    } catch(e) {
      console.error('[Phase1Report] JSON解析エラー:', e.message);
    }
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return { topic: session.topic, title: session.title, sessionId: sessionId, target: '', market: '', service: '', revenue: '', challenges: '', discussion: '', raw: text };
};

// ステップクリア
DiscussionEngine.prototype.clearStep = function(sessionId, stepNum) {
  this.db.prepare('DELETE FROM discussion_logs WHERE session_id = ? AND round_number = ? AND role != ?').run(sessionId, stepNum, 'user');
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // フォールバック: テキストをそのまま返す
  return { topic: session.topic, title: session.title, sessionId: sessionId, target: '', market: '', service: '', revenue: '', challenges: '', discussion: '', raw: text };
};

// ステップクリア（やり直し用, Feature 2）
DiscussionEngine.prototype.clearStep = function(sessionId, stepNum) {
  this.db.prepare('DELETE FROM discussion_logs WHERE session_id = ? AND round_number = ? AND role != ?').run(sessionId, stepNum, 'user');
  // current_roundをstepNum-1に戻す
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var prevStep = stepNum > 1 ? stepNum - 1 : 0;
  this.db.prepare('UPDATE sessions SET current_round = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(prevStep, sessionId);
  console.log('[DiscussionEngine] Step' + stepNum + 'クリア完了 (session:' + sessionId + ')');
};

// ===== ヘルパー =====

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
DiscussionEngine.prototype._checkNeedsConfirmation = async function(stepResult, topic) {
  var res = await this.anthropic.messages.create({
    model: CLAUDE_MODEL, max_tokens: 500,
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// Step5後: 方向性確認が必要か判定
DiscussionEngine.prototype._checkNeedsConfirmation = async function(stepResult, topic) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 500,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: '議論結果を分析し、前田さんに方向性確認が必要か判定してください。複数の大きく異なる戦略案がある場合のみtrueにしてください。',
    messages: [{ role: 'user', content: '以下の議論結果に、方向性が大きく異なる複数案がありますか？\n\n' + stepResult.substring(0, 2000) + '\n\nJSON形式: {"needsConfirmation": true/false, "question": "前田さんへの質問文（false時は空）"}' }]
  });
  try {
    var m = res.content[0].text.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : { needsConfirmation: false, question: '' };
  } catch(e) { return { needsConfirmation: false, question: '' }; }
};

DiscussionEngine.prototype._getStepResult = function(history, stepNum) {
  var s = history.filter(function(h) { return h.round_number === stepNum && h.role !== 'user'; });
  return s.length > 0 ? s[s.length - 1].content : '（未実行）';
};

DiscussionEngine.prototype._getHistory = function(sid) {
  return this.db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC').all(sid);
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// v2.0仕様: project_idでフィルタ + グローバル、confidence順上位30件
DiscussionEngine.prototype._getMemoryForContext = function(projectId) {
  var rows;
  if (projectId) {
    rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db WHERE (project_id = ? OR project_id IS NULL) ORDER BY confidence DESC LIMIT 30').all(projectId);
  } else {
    rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
  }
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getMemoryForContext = function() {
  var rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  var dir = path.join(__dirname, 'data', 'office-docs');
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
=======
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
>>>>>>> Stashed changes
  if (!fs.existsSync(dir)) return null;
  var result = [];
  this._readDir(dir, result);
  return result.join('\n\n') || null;
};

DiscussionEngine.prototype._readDir = function(dir, result) {
  var fs = require('fs');
  var path = require('path');
  try {
    var items = fs.readdirSync(dir);
    for (var i = 0; i < items.length; i++) {
      var full = path.join(dir, items[i]);
      var stat = fs.statSync(full);
      if (stat.isDirectory()) this._readDir(full, result);
      else if (items[i].endsWith('.txt') || items[i].endsWith('.md')) {
        try { result.push('【' + items[i] + '】\n' + fs.readFileSync(full, 'utf8').substring(0, 2000)); } catch(e) {}
      }
    }
  } catch(e) {}
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// v2.0仕様: 事務所資料文字数制限 1500→3000に拡張
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 3000) : null;
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._getOfficeDocsSummary = function() {
  var d = this._getOfficeDocs();
  return d ? d.substring(0, 1500) : null;
>>>>>>> Stashed changes
};

DiscussionEngine.prototype._getSimilarCases = function(topic) {
  var c = this.db.prepare("SELECT title, output_type, description FROM case_library ORDER BY created_at DESC LIMIT 10").all();
  if (c.length === 0) return null;
  return c.map(function(x) { return '[' + x.output_type + '] ' + x.title; }).join('\n');
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm, projectId) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?,?)')
    .run(sid, projectId || null, phase, round, theme, role, label, content, sm);
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
=======
DiscussionEngine.prototype._saveLog = function(sid, phase, round, theme, role, label, content, sm) {
  this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?)')
    .run(sid, phase, round, theme, role, label, content, sm);
>>>>>>> Stashed changes
};

module.exports = DiscussionEngine;
