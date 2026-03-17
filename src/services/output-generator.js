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

// 個別API呼び出しリトライ（レート制限時30秒待機、最大3回）
async function _apiRetry(fn, label) {
  for (var attempt = 0; attempt < 3; attempt++) {
    try {
      return await fn();
    } catch(err) {
      if (attempt < 2 && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0) || (err.message && err.message.indexOf('overloaded') >= 0))) {
        console.log('[' + label + '] レート制限/過負荷 リトライ' + (attempt+1) + '/3 30秒待機');
        await new Promise(function(r) { setTimeout(r, 30000); });
        continue;
      }
      throw err;
    }
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
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
var PATTERNS = {
  A: { name: 'PASONA型', desc: '問題→共感→解決→提案→行動' },
  B: { name: 'ベネフィット直球型', desc: '最大の価値を冒頭で提示' },
  C: { name: 'ストーリー型', desc: '物語で感情を動かす' },
  D: { name: '恐怖訴求型', desc: '失わないために行動させる' }
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
// v2.0仕様: Claude = claude-sonnet-4-20250514（Opusは LINE SmartQAのみ）
var CLAUDE_MODEL = 'claude-sonnet-4-20250514';

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
var PHASE2_STEPS = [
  { num: 1, name: '訴求パターン生成（Claude）', ai: 'claude', role: 'Phase1結論から4〜6個の訴求角度を生成' },
  { num: 2, name: '訴求批判（Claude）', ai: 'claude', role: '悪魔の代弁者で各訴求を容赦なく批判' },
  { num: 3, name: '訴求批判（ChatGPT）', ai: 'chatgpt', role: '消費者視点・別角度で批判補完' },
  { num: 4, name: '絞り込み（Claude）', ai: 'claude', role: '全批判を踏まえ最強の訴求2案に絞る' },
  { num: 5, name: 'コピーライティング（Claude）', ai: 'claude', role: '絞り込んだ訴求をキャッチコピー・本文に落とし込む' },
  { num: 6, name: '最終訴求の統合（Claude）', ai: 'claude', role: '最終訴求をPhase3用に整理・確定' }
];

var PHASE3_STEPS = [
  { num: 1, name: '初稿生成（Claude）', ai: 'claude', role: '4パターン同時生成' },
  { num: 2, name: 'コンテンツチェック（Claude）', ai: 'claude', role: '批評・改善点指摘' },
  { num: 3, name: 'コンテンツチェック（ChatGPT）', ai: 'chatgpt', role: '別視点でのチェック・見落とし補完' },
  { num: 4, name: '品質チェック（Claude）', ai: 'claude', role: '品質基準・数字・具体性チェック' },
  { num: 5, name: 'インパクトチェック（Claude）', ai: 'claude', role: '読者の反応予測・改善' },
  { num: 6, name: 'モバイルチェック（Claude）', ai: 'claude', role: 'スマホ表示・可読性チェック' },
  { num: 7, name: '最終版生成 + 納品（Claude）', ai: 'claude', role: '全チェック反映の最終版 + LINE通知' }
];

function OutputGenerator(db, lineQA, sendLineFn) {
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
        return { content: [{ type: 'text', text: fallbackText }] };
      }
      throw e;
    }
  };
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
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

// ============================================
// Phase 2: 訴求の磨き込み（6ステップ）
// ============================================

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
OutputGenerator.prototype._phase2_step1 = async function(sessionId, outputType, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);
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
// Phase2 Step1: 訴求パターン生成（Claude）
OutputGenerator.prototype._phase2_step1 = async function(sessionId, outputType, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  var officeDocs = this._getOfficeDocs();
  var p1conclusion = this._getPhase1Conclusion(session);

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
    model: CLAUDE_MODEL, max_tokens: 4000,
    system: '【最重要】分析対象テーマ：「' + (session ? session.topic : '') + '」。' +
      (session && session.project_id ? 'project_id: ' + session.project_id + '。' : '') +
      'このテーマのみを分析すること。\n\n' +
      'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 4000,
    system: 'あなたはトップコピーライティングディレクターです。Phase1で固まったアイデアを元に、最も効果的な訴求角度を複数生成してください。前田さんの好み: ' + JSON.stringify(memory),
>>>>>>> Stashed changes
    messages: [{ role: 'user', content: '【Phase1の結論】\n' + p1conclusion +
      '\n\n【アウトプット種別】' + outputType +
      '\n【事務所資料】' + (officeDocs || 'なし') +
      '\n【追加指示】' + JSON.stringify(params) +
      '\n\n以下を生成してください：\n' +
      '1. メインターゲットの心理状態（認知前→検討中→行動直前）\n' +
      '2. 訴求角度を4〜6パターン生成：\n' +
      '   - 各パターンの名前と概要\n' +
      '   - そのパターンが刺さる理由\n' +
      '   - 仮キャッチコピー\n' +
      '   - 想定される反応\n' +
      '3. 各パターンの優先順位と理由\n' +
      '4. 訴求で使える事務所の実績・数字\n' +
      '5. 競合が使っていない訴求角度' }]
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
OutputGenerator.prototype._phase2_step2 = async function(sessionId, outputType, step1Result) {
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
// Phase2 Step2: 訴求批判（Claude）
OutputGenerator.prototype._phase2_step2 = async function(sessionId, outputType, step1Result) {
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
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: 'あなたは容赦ない広告批評家です。各訴求の弱点・甘さ・見落としを徹底的に突いてください。ただし建設的な改善提案も必ず添えること。',
    messages: [{ role: 'user', content: '【Step1: 訴求パターン】\n' + step1Result +
      '\n\n各訴求について以下を批判：\n' +
      '1. そのコピーで本当に手が止まるか？スクロールされないか？\n' +
      '2. 競合も同じこと言っていないか？\n' +
      '3. ベネフィットが曖昧・抽象的ではないか？\n' +
      '4. ターゲットの本音とズレていないか？\n' +
      '5. 法律事務所としての信頼を損なわないか？\n' +
      '6. 「だから何？」テスト（So what?）に耐えるか？\n' +
      '7. 行動喚起が弱くないか？\n' +
      '8. 各訴求の致命的な弱点とその克服案' }]
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
OutputGenerator.prototype._phase2_step3 = async function(sessionId, outputType, step1Result, step2Result) {
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
// Phase2 Step3: 訴求批判（ChatGPT）
OutputGenerator.prototype._phase2_step3 = async function(sessionId, outputType, step1Result, step2Result) {
  var res = await this.openai.chat.completions.create({
    model: 'gpt-5.4', max_completion_tokens: 4000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    messages: [
      { role: 'system', content: 'あなたは実際の消費者代表です。法律事務所の広告を見る一般人の視点で、各訴求が本当に響くか率直に評価してください。' },
      { role: 'user', content: '【訴求パターン】\n' + step1Result +
        '\n\n【Claude批判】\n' + step2Result +
        '\n\n一般消費者として率直に：\n' +
        '1. どの訴求に一番興味を持つ？なぜ？\n' +
        '2. どれが一番胡散臭い？なぜ？\n' +
        '3. 「弁護士に相談しよう」と思えるものはどれ？\n' +
        '4. Claude批判の見落とし・反論\n' +
        '5. SNSでシェアしたくなるものは？\n' +
        '6. 競合のLPと比べてどうか？\n' +
        '7. 改善の具体的提案' }
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
  return res.choices[0].message.content || res.choices[0].message.refusal || '（GPT-5.4応答なし）';
};

OutputGenerator.prototype._phase2_step4 = async function(sessionId, outputType, step1Result, step2Result, step3Result) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);
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
  return res.choices[0].message.content;
};

// Phase2 Step4: 絞り込み（Claude）
OutputGenerator.prototype._phase2_step4 = async function(sessionId, outputType, step1Result, step2Result, step3Result) {
  var memory = this._getMemory(outputType);
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
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    system: 'あなたは訴求戦略の最終決定者です。全批判を踏まえ最強の訴求2案に絞ってください。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: '【Step1: 訴求パターン】\n' + step1Result +
      '\n\n【Step2: Claude批判】\n' + step2Result +
      '\n\n【Step3: ChatGPT/消費者批判】\n' + step3Result +
      '\n\n実行：\n' +
      '1. 全批判の要約と重要度ランク\n' +
      '2. 各訴求の生存判定（生き残り理由 or 脱落理由）\n' +
      '3. 最強の訴求2案を選定\n' +
      '4. 選定理由（批判にどう耐えたか）\n' +
      '5. 2案それぞれの強化ポイント\n' +
      '6. メイン訴求とサブ訴求の使い分け方針' }]
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
OutputGenerator.prototype._phase2_step5 = async function(sessionId, outputType, step4Result, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);
  var typeInst = this._getTypeInstructions(outputType);

  var res = await this.anthropic.messages.create({
    model: CLAUDE_MODEL, max_tokens: 5000,
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
// Phase2 Step5: コピーライティング（Claude）
OutputGenerator.prototype._phase2_step5 = async function(sessionId, outputType, step4Result, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType);
  var typeInst = this._getTypeInstructions(outputType);

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    system: 'あなたは日本トップクラスのコピーライターです。訴求をキャッチコピー・ボディコピー・CTAに落とし込んでください。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: '【絞り込まれた訴求2案】\n' + step4Result +
      '\n\n【アウトプット種別】' + outputType +
      '\n【種別指示】' + typeInst +
      '\n【セッション】' + (session ? session.topic : '') +
      '\n\n各訴求に対して以下を生成：\n' +
      '1. メインキャッチコピー（3案ずつ）\n' +
      '2. サブキャッチ（各1案）\n' +
      '3. リード文（30文字以内の一行要約）\n' +
      '4. ボディコピー構成案\n' +
      '5. CTA文言（3案ずつ）\n' +
      '6. 見出し群（H2/H3構成）\n' +
      '7. 最推奨の組み合わせ' }]
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
OutputGenerator.prototype._phase2_step6 = async function(sessionId, outputType, step4Result, step5Result) {
  var res = await this.anthropic.messages.create({
    model: CLAUDE_MODEL, max_tokens: 3000,
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
// Phase2 Step6: 最終訴求の統合（Claude）
OutputGenerator.prototype._phase2_step6 = async function(sessionId, outputType, step4Result, step5Result) {
  var res = await this.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    system: 'あなたは最終統合者です。Phase3のアウトプット生成に渡す最終訴求設計書を作成してください。',
    messages: [{ role: 'user', content: '【絞り込み結果】\n' + step4Result +
      '\n\n【コピーライティング結果】\n' + step5Result +
      '\n\nPhase3用に以下をJSON形式で整理：\n' +
      '{\n' +
      '  "main_appeal": "メイン訴求の概要",\n' +
      '  "sub_appeal": "サブ訴求の概要",\n' +
      '  "main_catchcopy": "最終メインキャッチコピー",\n' +
      '  "sub_catchcopy": "サブキャッチコピー",\n' +
      '  "lead_text": "リード文",\n' +
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      '  "body_structure": ["セクション1", "セクション2"],\n' +
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
=======
      '  "body_structure": ["セクション1", "セクション2", ...],\n' +
>>>>>>> Stashed changes
      '  "cta_text": "CTA文言",\n' +
      '  "tone": "トーン&マナーの指示",\n' +
      '  "key_numbers": ["使うべき数字1", "数字2"],\n' +
      '  "ng_words": ["使ってはいけない表現1", "表現2"],\n' +
      '  "quality_checklist": ["チェック項目1", "チェック項目2"]\n' +
      '}' }]
  });
  return res.content[0].text;
};

// ============================================
// Phase 3: アウトプット生成・磨き込み（7ステップ）
// ============================================

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
OutputGenerator.prototype._phase3_step1 = async function(sessionId, outputType, phase2Final, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);
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
// Phase3 Step1: 初稿生成（Claude）- 4パターン同時
OutputGenerator.prototype._phase3_step1 = async function(sessionId, outputType, phase2Final, params) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  var officeDocs = this._getOfficeDocs();
  var typeInst = this._getTypeInstructions(outputType);
  var qualityRules = this._getQualityRules();

  var basePrompt = '【Phase2最終訴求設計書】\n' + phase2Final +
    '\n【事務所資料】' + (officeDocs || 'なし') +
    '\n【セッション情報】' + (session ? session.topic + ' / ' + (session.target_definition || '') : '') +
    '\n【前田さんの好み】' + JSON.stringify(memory) +
    '\n【追加指示】' + JSON.stringify(params) +
    '\n【種別指示】' + typeInst;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // v2.0仕様: 4パターンをPromise.allで並行生成
  var self = this;
  var keys = Object.keys(PATTERNS);
  var promises = keys.map(function(key) {
    var p = PATTERNS[key];
    console.log('[Phase3] Step1: パターン' + key + '（' + p.name + '）生成中...');
    return self.anthropic.messages.create({
      model: CLAUDE_MODEL, max_tokens: 5000,
      system: '【最重要】分析対象テーマ：「' + (session ? session.topic : '') + '」。このテーマのみ。\n\n' +
        'あなたはトップコピーライターです。「' + p.name + '（' + p.desc + '）」のパターンで、Phase2の訴求設計書に基づいて最高品質のコンテンツを生成してください。' +
        'HTML系アウトプット（LP、バナー等）の場合は、必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。' +
        'CSSは全て<style>タグ内にインライン記述。外部ファイル参照禁止。bodyにdisplay:noneやvisibility:hiddenを設定しない。' + qualityRules,
      messages: [{ role: 'user', content: basePrompt + '\n\nパターン「' + p.name + '」で生成してください。設計書のキャッチコピー・構成を活かしつつ、このパターンの特性を最大限発揮すること。' }]
    }).then(function(r) {
      return { pattern: key, name: p.name, desc: p.desc, content: r.content[0].text };
    });
  });

  return Promise.all(promises);
};

OutputGenerator.prototype._phase3_step2 = async function(patterns, phase2Final, outputType, sessionId) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);
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
  // 4パターン並行生成
  var results = await Promise.all(Object.keys(PATTERNS).map(async function(key) {
    var p = PATTERNS[key];
    var r = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 16000,
      system: 'あなたはトップコピーライターです。「' + p.name + '（' + p.desc + '）」のパターンで、Phase2の訴求設計書に基づいて最高品質のコンテンツを生成してください。HTML系アウトプット（LP、バナー等）の場合は、必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。CSS・JSは全てインライン（<style>・<script>タグ内）。外部ファイル参照禁止。' + qualityRules,
      messages: [{ role: 'user', content: basePrompt + '\n\nパターン「' + p.name + '」で生成してください。設計書のキャッチコピー・構成を活かしつつ、このパターンの特性を最大限発揮すること。' }]
    });
    return { pattern: key, name: p.name, desc: p.desc, content: r.content[0].text };
  }.bind(this)));

  return results;
};

// Phase3 Step2: コンテンツチェック（Claude）
OutputGenerator.prototype._phase3_step2 = async function(patterns, phase2Final, outputType) {
  var memory = this._getMemory(outputType);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

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
    system: 'あなたはClaude批評役。Phase2の訴求設計書に照らし合わせ、各パターンを容赦なくチェックしてください。前田さんの好み: ' + JSON.stringify(memory),
    messages: [{ role: 'user', content: '【Phase2設計書】\n' + phase2Final +
      '\n\n【4パターン】\n' + patternsText +
      '\n\n各パターンをチェック：\n' +
      '1. 設計書のキャッチコピー・訴求を正しく反映しているか\n' +
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      '2. 論理に穴がないか\n' +
      '3. 競合と同じ表現を使っていないか\n' +
      '4. ベネフィットが具体的か\n' +
      '5. 事務所資料の情報を使えているか\n' +
      '6. 各パターンの改善指示\n' +
      '7. 現時点での推奨パターンとその理由' }]
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
      '2. 読者がつまずく箇所はないか\n' +
      '3. 競合と同じ表現を使っていないか\n' +
      '4. ベネフィットが具体的か（数字・事例）\n' +
      '5. CTAは明確か\n' +
      '6. 前田さんの好みに合っているか\n' +
      '7. 事務所資料の情報を使えているか\n' +
      '8. 各パターンの改善指示（具体的に何をどう変えるか）\n' +
      '9. 現時点での推奨パターンとその理由' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
=======
// Phase3 Step3: コンテンツチェック（ChatGPT）
>>>>>>> Stashed changes
OutputGenerator.prototype._phase3_step3 = async function(patterns, phase2Final, step2Result) {
  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。' },
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
=======
    model: 'gpt-5.4', max_completion_tokens: 4000,
    messages: [
      { role: 'system', content: 'あなたは一般消費者の代表です。法律事務所のコンテンツを見た率直な感想と改善点を述べてください。Claudeの批評も検証してください。' },
>>>>>>> Stashed changes
      { role: 'user', content: '【4パターン】\n' + patternsText +
        '\n\n【Claudeの批評】\n' + step2Result +
        '\n\n率直にチェック：\n' +
        '1. どれが一番「相談しよう」と思えるか\n' +
        '2. 読んでいて退屈な部分はどこか\n' +
        '3. 信頼できると感じるか、胡散臭いと感じるか\n' +
        '4. Claude批評の見落とし\n' +
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        '5. 改善提案' }
    ]
  });
  return res.choices[0].message.content || res.choices[0].message.refusal || '（GPT-5.4応答なし）';
};

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
        '5. 実際のユーザー行動予測\n' +
        '6. 各パターンの具体的改善提案' }
    ]
  });
  return res.choices[0].message.content;
};

// Phase3 Step4: 品質チェック（Claude）
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
OutputGenerator.prototype._phase3_step4 = async function(patterns, step2Result, step3Result, outputType) {
  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

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
    system: 'あなたは品質管理の専門家です。アウトプットの品質基準を厳密にチェックしてください。',
    messages: [{ role: 'user', content: '【4パターン】\n' + patternsText +
      '\n\n【Claude批評】\n' + step2Result +
      '\n\n【ChatGPT批評】\n' + step3Result +
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      '\n\n品質基準チェック：\n' +
      '1. 法的表現の適切性\n' +
      '2. 数字・実績データの正確性（架空の数字は使用禁止）\n' +
      '3. 事務所情報ファイルの情報を使用しているか\n' +
      '4. 品質スコア（訴求力/差別化/体裁/インパクト 各10点 = 40点満点）\n' +
      '5. 合格/不合格判定（28点以上で合格）\n' +
      '6. 不合格の場合の具体的改善指示' }]
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
      '\n\n品質基準チェック（全パターンに対して）：\n' +
      '1. 抽象的な表現がないか（「安心」「信頼」等の具体性チェック）\n' +
      '2. 数字・実績データの正確性\n' +
      '3. 法的表現の適切性（弁護士法・景表法準拠）\n' +
      '4. 「弊社は〜」等の主語チェック\n' +
      '5. 読者の言葉（口コミ表現・検索キーワード）使用度\n' +
      '6. CTA到達率予測\n' +
      '7. SEO観点（見出し構成・キーワード配置）\n' +
      '8. 文字数・レイアウトの適切性\n' +
      '9. 各パターンの品質スコア（100点満点）\n' +
      '10. 合格/不合格判定と不合格の場合の改善指示' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step5: インパクトチェック（Claude）
>>>>>>> Stashed changes
OutputGenerator.prototype._phase3_step5 = async function(patterns, step4Result) {
  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

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
    model: CLAUDE_MODEL, max_tokens: 3000,
    system: 'あなたは広告効果測定の専門家です。各パターンの実際の反応を予測し、インパクトを評価してください。\n\nLP品質基準：ファーストビューで強いインパクトを出すことを最優先。AI生成っぽくないデザイン。実素材使用。',
    messages: [{ role: 'user', content: '【4パターン】\n' + patternsText +
      '\n\n【品質チェック結果】\n' + step4Result +
      '\n\nインパクト予測：\n' +
      '1. 各パターンの予測CTR/CVR\n' +
      '2. ファーストビュー3秒テスト\n' +
      '3. 感情の揺さぶり度（1-10）\n' +
      '4. 最終推奨パターンとその理由' }]
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
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
    system: 'あなたは広告効果測定の専門家です。各パターンの実際の反応を予測し、インパクトを評価してください。',
    messages: [{ role: 'user', content: '【4パターン】\n' + patternsText +
      '\n\n【品質チェック結果】\n' + step4Result +
      '\n\nインパクト予測：\n' +
      '1. 各パターンの予測CTR（クリック率）\n' +
      '2. 各パターンの予測CVR（コンバージョン率）\n' +
      '3. ファーストビューの「3秒テスト」（3秒で伝わるか）\n' +
      '4. スクロール到達率予測\n' +
      '5. 感情の揺さぶり度（1-10）\n' +
      '6. 記憶への残りやすさ（1-10）\n' +
      '7. シェアされやすさ（1-10）\n' +
      '8. 最終推奨パターンとその理由' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
=======
// Phase3 Step6: モバイルチェック（Claude）
>>>>>>> Stashed changes
OutputGenerator.prototype._phase3_step6 = async function(patterns, outputType) {
  var patternsText = patterns.map(function(p) {
    return '【パターン' + p.pattern + ': ' + p.name + '】\n' + p.content;
  }).join('\n\n========\n\n');

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
    model: CLAUDE_MODEL, max_tokens: 3000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 3000,
>>>>>>> Stashed changes
    system: 'あなたはUI/UXの専門家です。スマートフォンでの表示・可読性を徹底チェックしてください。',
    messages: [{ role: 'user', content: '【アウトプット種別】' + outputType +
      '\n\n【4パターン】\n' + patternsText +
      '\n\nモバイルチェック：\n' +
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      '1. 1行の文字数\n2. 段落の長さ\n3. CTAボタンのタップしやすさ\n4. フォントサイズの適切性\n5. 改善指示（具体的）' }]
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
      '1. 1行の文字数（スマホで折り返し発生しないか）\n' +
      '2. 段落の長さ（スクロール疲れしないか）\n' +
      '3. CTAボタンのタップしやすさ\n' +
      '4. 画像・図表のスマホ表示\n' +
      '5. 読み込み速度への影響\n' +
      '6. フォントサイズの適切性\n' +
      '7. 改善指示（具体的）' }]
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
// v2.0仕様: Step7は4パターンを並行生成
OutputGenerator.prototype._phase3_step7 = async function(patterns, phase2Final, step2Result, step3Result, step4Result, step5Result, step6Result, outputType, sessionId) {
  var session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  var memory = this._getMemory(outputType, sessionId, session ? session.project_id : null);

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
// Phase3 Step7: 最終版生成（Claude）
OutputGenerator.prototype._phase3_step7 = async function(patterns, phase2Final, step2Result, step3Result, step4Result, step5Result, step6Result, outputType) {
  var memory = this._getMemory(outputType);

  // 全チェック結果を統合して最終改善指示を作成
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  var allFeedback = '【Claude批評】\n' + step2Result +
    '\n\n【ChatGPT批評】\n' + step3Result +
    '\n\n【品質チェック】\n' + step4Result +
    '\n\n【インパクトチェック】\n' + step5Result +
    '\n\n【モバイルチェック】\n' + step6Result;

  // 推奨パターン特定
  var recommendRes = await this.anthropic.messages.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    model: CLAUDE_MODEL, max_tokens: 1000,
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
=======
    model: 'claude-sonnet-4-20250514', max_tokens: 1000,
>>>>>>> Stashed changes
    system: '全チェック結果を分析し、最終推奨パターンを決定してください。',
    messages: [{ role: 'user', content: allFeedback +
      '\n\nJSON形式で回答：{"recommended":"A|B|C|D","reason":"推奨理由","critique":"全体批評要約"}' }]
  });
  var recText = recommendRes.content[0].text;
  var recJson = null;
  var jsonMatch = recText.match(/\{[\s\S]*\}/);
  if (jsonMatch) { try { recJson = JSON.parse(jsonMatch[0]); } catch(e) {} }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // v2.0仕様: 4パターンをPromise.allで並行生成
  var self = this;
  var promises = patterns.map(function(p) {
    console.log('[Phase3] Step7: パターン' + p.pattern + ' 最終版生成中...');
    return self.anthropic.messages.create({
      model: CLAUDE_MODEL, max_tokens: 5000,
      system: '【最重要】分析対象テーマ：「' + (session ? session.topic : '') + '」。このテーマのみ。\n\n' +
        'あなたは最終仕上げ担当のトップコピーライターです。全チェック結果を反映し最高品質の最終版を生成してください。' +
        'HTML系アウトプットは必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイル。CSSは全て<style>タグ内。外部ファイル参照禁止。bodyにdisplay:noneやvisibility:hiddenを設定しない。' +
        '前田さんの好み: ' + JSON.stringify(memory),
      messages: [{ role: 'user', content: '【元のパターン' + p.pattern + ': ' + p.name + '】\n' + p.content +
        '\n\n【全チェックからの改善指示】\n' + allFeedback +
        '\n\n全ての指摘を反映した最終版を生成してください。' }]
    }).then(function(r) {
      return { pattern: p.pattern, name: p.name, desc: p.desc, content: r.content[0].text };
    });
  });

  var finalPatterns = await Promise.all(promises);

  return {
    patterns: finalPatterns,
    recommended: recJson ? recJson.recommended : 'B',
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
  // 4パターン最終改善版を並行生成
  var finalPatterns = await Promise.all(patterns.map(async function(p) {
    var r = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 16000,
      system: 'あなたは最終仕上げ担当のトップコピーライターです。全チェック結果を反映し最高品質の最終版を生成してください。HTML系アウトプット（LP、バナー等）の場合は、必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。CSS・JSは全てインライン（<style>・<script>タグ内）。外部ファイル参照禁止。前田さんの好み: ' + JSON.stringify(memory),
      messages: [{ role: 'user', content: '【元のパターン' + p.pattern + ': ' + p.name + '】\n' + p.content +
        '\n\n【全チェックからの改善指示】\n' + allFeedback +
        '\n\n全ての指摘を反映した最終版を生成してください。改善点を必ず全て反映すること。' }]
    });
    return { pattern: p.pattern, name: p.name, desc: p.desc, content: r.content[0].text };
  }.bind(this)));

  return {
    patterns: finalPatterns,
    recommended: recJson ? recJson.recommended : 'A',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    reason: recJson ? recJson.reason : '',
    critique: recJson ? recJson.critique : ''
  };
};

// ============================================
// 全プロセス一括実行（Phase2 + Phase3）
// ============================================

OutputGenerator.prototype.generateFull = async function(sessionId, outputType, params) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  console.log('[OutputGen] ===== Phase2+3開始: session=' + sessionId + ' type=' + outputType + ' =====');

  // Phase 2
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
  // API呼び出し自動リトライ（初回だけラップ）
  if (!this._retryWrapped) {
    this._retryWrapped = true;
    var origA = this.anthropic.messages.create.bind(this.anthropic.messages);
    this.anthropic.messages.create = function(opts) { return _apiRetry(function() { return origA(opts); }, 'Claude'); };
    if (this.openai) {
      var origO = this.openai.chat.completions.create.bind(this.openai.chat.completions);
      this.openai.chat.completions.create = function(opts) { return _apiRetry(function() { return origO(opts); }, 'ChatGPT'); };
    }
  }
  console.log('[OutputGen] ===== Phase2+3開始: session=' + sessionId + ' type=' + outputType + ' =====');

  // ----- Phase 2: 訴求の磨き込み -----
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  console.log('[Phase2] Step1: 訴求パターン生成...');
  var p2s1 = await this._phase2_step1(sessionId, outputType, params);
  this._saveOutputLog(sessionId, 2, 1, 'Phase2-訴求パターン生成', p2s1);

  console.log('[Phase2] Step2: 訴求批判（Claude）...');
  var p2s2 = await this._phase2_step2(sessionId, outputType, p2s1);
  this._saveOutputLog(sessionId, 2, 2, 'Phase2-訴求批判Claude', p2s2);

  console.log('[Phase2] Step3: 訴求批判（ChatGPT）...');
  var p2s3 = await this._phase2_step3(sessionId, outputType, p2s1, p2s2);
  this._saveOutputLog(sessionId, 2, 3, 'Phase2-訴求批判ChatGPT', p2s3);

  console.log('[Phase2] Step4: 絞り込み...');
  var p2s4 = await this._phase2_step4(sessionId, outputType, p2s1, p2s2, p2s3);
  this._saveOutputLog(sessionId, 2, 4, 'Phase2-絞り込み', p2s4);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // v2.1: 訴求確認スキップ（スコア上位2案を自動選択して続行）
  console.log('[OutputGen] Phase2 Step4: 訴求確認スキップ（自動続行モード）');
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes
=======
  // Phase2 Step4: 確認なしで続行
>>>>>>> Stashed changes

  console.log('[Phase2] Step5: コピーライティング...');
  var p2s5 = await this._phase2_step5(sessionId, outputType, p2s4, params);
  this._saveOutputLog(sessionId, 2, 5, 'Phase2-コピーライティング', p2s5);

  console.log('[Phase2] Step6: 最終訴求統合...');
  var p2s6 = await this._phase2_step6(sessionId, outputType, p2s4, p2s5);
  this._saveOutputLog(sessionId, 2, 6, 'Phase2-最終訴求統合', p2s6);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  this.db.prepare('UPDATE sessions SET phase = 3, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(sessionId);

  // Phase 3
  console.log('[Phase3] Step1: 初稿生成（4パターン並行）...');
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
  // Phase2結果をセッションに保存
  this.db.prepare('UPDATE sessions SET phase = 3, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(sessionId);

  // ----- Phase 3: アウトプット生成・磨き込み -----
  console.log('[Phase3] Step1: 初稿生成（4パターン）...');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  var patterns = await this._phase3_step1(sessionId, outputType, p2s6, params);
  this._saveOutputLog(sessionId, 3, 1, 'Phase3-初稿生成', JSON.stringify(patterns.map(function(p) { return p.pattern + ':' + p.name; })));

  console.log('[Phase3] Step2: コンテンツチェック（Claude）...');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType, sessionId);
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
=======
  var p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
>>>>>>> Stashed changes
  this._saveOutputLog(sessionId, 3, 2, 'Phase3-チェックClaude', p3s2);

  console.log('[Phase3] Step3: コンテンツチェック（ChatGPT）...');
  var p3s3 = await this._phase3_step3(patterns, p2s6, p3s2);
  this._saveOutputLog(sessionId, 3, 3, 'Phase3-チェックChatGPT', p3s3);

  console.log('[Phase3] Step4: 品質チェック...');
  var p3s4 = await this._phase3_step4(patterns, p3s2, p3s3, outputType);
  this._saveOutputLog(sessionId, 3, 4, 'Phase3-品質チェック', p3s4);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // v2.1: 品質不合格時は確認なしで自動修正→再チェック（最大3回）
  var autoFixAttempts = 0;
  while ((p3s4.indexOf('\u4e0d\u5408\u683c') !== -1 || p3s4.indexOf('\u8981\u6539\u5584') !== -1) && autoFixAttempts < 3) {
    autoFixAttempts++;
    console.log('[OutputGen] Phase3 Step4: \u54c1\u8cea\u4e0d\u5408\u683c\u2192\u81ea\u52d5\u4fee\u6b63\u8a66\u884c ' + autoFixAttempts + '/3');
    patterns = await this._phase3_step1(sessionId, outputType, p2s6 + '\n\n[\u54c1\u8cea\u6539\u5584\u6307\u793a]' + p3s4, params);
    this._saveOutputLog(sessionId, 3, 1, 'Phase3-\u81ea\u52d5\u4fee\u6b63' + autoFixAttempts, '\u81ea\u52d5\u4fee\u6b63\u8a66\u884c' + autoFixAttempts);
    p3s2 = await this._phase3_step2(patterns, p2s6, outputType, sessionId);
    p3s3 = await this._phase3_step3(patterns, p2s6, p3s2);
    p3s4 = await this._phase3_step4(patterns, p3s2, p3s3, outputType);
    this._saveOutputLog(sessionId, 3, 4, 'Phase3-\u518d\u30c1\u30a7\u30c3\u30af' + autoFixAttempts, p3s4);
  }
  if (autoFixAttempts > 0) console.log('[OutputGen] \u81ea\u52d5\u4fee\u6b63' + autoFixAttempts + '\u56de\u5b8c\u4e86');
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
  // Phase3 Step4: 品質不合格時→自動修正→再チェック（最大3回）
  var qualityRetry = 0;
  while (qualityRetry < 3 && (p3s4.indexOf('不合格') !== -1 || p3s4.indexOf('要改善') !== -1)) {
    qualityRetry++;
    console.log('[Phase3] 品質不合格→自動修正 リトライ' + qualityRetry + '/3');
    // 不合格パターンをStep4の指摘に基づいて自動修正
    var fixedPatterns = await Promise.all(patterns.map(async function(p) {
      var fixRes = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 16000,
        system: '品質チェックで不合格になったコンテンツを修正してください。指摘された問題点を全て解消し、合格基準を満たす最終版を出力してください。元の訴求力・構成は維持しつつ、品質基準のみ改善すること。HTML系アウトプットの場合は必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。CSS・JSは全てインライン。外部ファイル参照禁止。',
        messages: [{ role: 'user', content: '【元のパターン' + p.pattern + ': ' + p.name + '】\n' + p.content + '\n\n【品質チェック結果（不合格箇所）】\n' + p3s4 + '\n\n上記の指摘を全て反映した修正版を出力してください。' }]
      });
      return { pattern: p.pattern, name: p.name, desc: p.desc, content: fixRes.content[0].text };
    }.bind(this)));
    patterns = fixedPatterns;
    this._saveOutputLog(sessionId, 3, 4, 'Phase3-自動修正(リトライ' + qualityRetry + ')', JSON.stringify(patterns.map(function(p) { return p.pattern; })));
    // 再チェック
    p3s2 = await this._phase3_step2(patterns, p2s6, outputType);
    p3s3 = await this._phase3_step3(patterns, p2s6, p3s2);
    p3s4 = await this._phase3_step4(patterns, p3s2, p3s3, outputType);
    this._saveOutputLog(sessionId, 3, 4, 'Phase3-再品質チェック(リトライ' + qualityRetry + ')', p3s4.substring(0, 300));
    console.log('[Phase3] 品質再チェック リトライ' + qualityRetry + ' 結果: ' + (p3s4.indexOf('不合格') === -1 && p3s4.indexOf('要改善') === -1 ? '合格' : '不合格'));
  }
  if (qualityRetry > 0) {
    console.log('[Phase3] 品質修正完了: ' + qualityRetry + '回のリトライ後' + (p3s4.indexOf('不合格') === -1 ? '合格' : '続行'));
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
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  console.log('[Phase3] Step5: インパクトチェック...');
  var p3s5 = await this._phase3_step5(patterns, p3s4);
  this._saveOutputLog(sessionId, 3, 5, 'Phase3-インパクトチェック', p3s5);

  console.log('[Phase3] Step6: モバイルチェック...');
  var p3s6 = await this._phase3_step6(patterns, outputType);
  this._saveOutputLog(sessionId, 3, 6, 'Phase3-モバイルチェック', p3s6);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  console.log('[Phase3] Step7: 最終版生成（4パターン並行）...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType, sessionId);
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
=======
  console.log('[Phase3] Step7: 最終版生成...');
  var finalResult = await this._phase3_step7(patterns, p2s6, p3s2, p3s3, p3s4, p3s5, p3s6, outputType);
>>>>>>> Stashed changes
  this._saveOutputLog(sessionId, 3, 7, 'Phase3-最終版生成', '推奨:' + finalResult.recommended);

  console.log('[OutputGen] ===== 全13ステップ完了 =====');

  // DB保存
  this.db.prepare('INSERT INTO output_queue (session_id, output_type, params, design_doc, patterns, critique, recommended_pattern, status) VALUES (?,?,?,?,?,?,?,?)')
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    .run(sessionId, outputType, JSON.stringify(params), p2s6, JSON.stringify(finalResult.patterns), JSON.stringify({ critique: finalResult.critique, reason: finalResult.reason }), finalResult.recommended, 'awaiting_approval');

  // v2.1: 品質スコアリング + 自動承認判定
  var queueRow = this.db.prepare('SELECT id FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(sessionId);
  var autoApproved = false;
  if (queueRow) {
    try {
      var scoreResult = await this.scoreOutput(sessionId, queueRow.id);
      var totalScore = scoreResult && scoreResult.total ? scoreResult.total : 0;
      var grade = totalScore >= 32 ? 'A' : totalScore >= 28 ? 'B' : 'C';

      if (grade === 'A') {
        // A: 自動承認（通知なし）
        this.approveOutput(queueRow.id, finalResult.recommended);
        this.db.prepare('UPDATE output_queue SET status = ? WHERE id = ?').run('auto_approved_A', queueRow.id);
        autoApproved = true;
        console.log('[AutoApprove] Grade A (' + totalScore + ') -> auto approved');
        if (this.sendLineFn) await this.sendLineFn('[Phase3完了] ' + outputType + ' Grade A (' + totalScore + '/40) 自動承認済');
      } else if (grade === 'B') {
        // B: 自動承認+LINE通知
        this.approveOutput(queueRow.id, finalResult.recommended);
        this.db.prepare('UPDATE output_queue SET status = ? WHERE id = ?').run('auto_approved_B', queueRow.id);
        autoApproved = true;
        console.log('[AutoApprove] Grade B (' + totalScore + ') -> auto approved with notification');
        if (this.sendLineFn) await this.sendLineFn('[Phase3完了] ' + outputType + ' Grade B (' + totalScore + '/40) 自動承認済\nパターン: ' + finalResult.recommended);
      } else {
        // C: 前田さんに確認
        console.log('[AutoApprove] Grade C (' + totalScore + ') -> needs manual approval');
        if (this.sendLineFn) await this.sendLineFn('[要確認] ' + outputType + ' Grade C (' + totalScore + '/40)\n品質基準未達のため承認をお願いします\nID: ' + queueRow.id);
      }
    } catch (err) {
      console.error('[品質スコア] エラー:', err.message);
      // スコアリング失敗時はデフォルトで自動承認
      this.approveOutput(queueRow.id, finalResult.recommended);
      this.db.prepare('UPDATE output_queue SET status = ? WHERE id = ?').run('auto_approved_default', queueRow.id);
      autoApproved = true;
      if (this.sendLineFn) await this.sendLineFn('[Phase3完了] ' + outputType + ' 自動承認済（スコア算出失敗）');
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
    .run(sessionId, outputType, JSON.stringify(params), p2s6, JSON.stringify(finalResult.patterns), JSON.stringify({ critique: finalResult.critique, reason: finalResult.reason }), finalResult.recommended, 'completed');

  // 品質スコアリング（Feature 5）
  var queueRow = this.db.prepare('SELECT id FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(sessionId);
  if (queueRow) {
    try {
      console.log('[品質スコア] 自動採点開始...');
      await this.scoreOutput(sessionId, queueRow.id);
      console.log('[品質スコア] 自動採点完了');
    } catch (err) {
      console.error('[品質スコア] エラー:', err.message);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    }
  }

  return {
    designDoc: p2s6,
    patterns: finalResult.patterns,
    review: { critique: finalResult.critique, recommended: finalResult.recommended, reason: finalResult.reason }
  };
};

// ============================================
// 承認・案件ライブラリ保存
// ============================================

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

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// 品質スコアリング（v2.0: 4軸 x 10点 = 40点満点）
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
=======
// 品質スコアリング（Feature 5）
>>>>>>> Stashed changes
// ============================================

OutputGenerator.prototype.scoreOutput = async function(sessionId, queueId) {
  var item = this.db.prepare('SELECT * FROM output_queue WHERE id = ?').get(queueId);
  if (!item || !item.patterns) return null;
  var patterns = JSON.parse(item.patterns);
  var scores = [];

  for (var i = 0; i < patterns.length; i++) {
    var p = patterns[i];
    var content = p.content || (typeof p === 'string' ? p : JSON.stringify(p));
    try {
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
        model: CLAUDE_MODEL, max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか。ファーストビュー重視・AI感排除・実素材使用も評価）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点：\n\n' + content.substring(0, 3000) + '\n\nJSON: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善1文"}' }]
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
=======
        model: 'claude-sonnet-4-20250514', max_tokens: 800,
        system: 'アウトプットの品質を4軸で採点してください。各軸1-10点。JSON形式で回答。\n\n軸:\n- appeal: 訴求力（読者の心を動かせるか）\n- differentiation: 差別化（競合と明確に違うか）\n- format: 体裁（読みやすさ、構成、デザイン）\n- impact: インパクト（記憶に残るか、行動を促すか）',
        messages: [{ role: 'user', content: '以下のアウトプット（パターン' + p.pattern + '）を採点してください。\n\n' + content.substring(0, 3000) + '\n\nJSON形式: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善ポイント1文"}' }]
>>>>>>> Stashed changes
      });
      var m = res.content[0].text.match(/\{[\s\S]*\}/);
      if (m) {
        var s = JSON.parse(m[0]);
        var total = (s.appeal || 0) + (s.differentiation || 0) + (s.format || 0) + (s.impact || 0);
        this.db.prepare('INSERT INTO quality_scores (output_queue_id, session_id, pattern, score_appeal, score_differentiation, score_format, score_impact, total_score, improvement_points) VALUES (?,?,?,?,?,?,?,?,?)')
          .run(queueId, sessionId, p.pattern || String.fromCharCode(65 + i), s.appeal || 0, s.differentiation || 0, s.format || 0, s.impact || 0, total, s.improvement || '');
        scores.push({ pattern: p.pattern || String.fromCharCode(65 + i), appeal: s.appeal, differentiation: s.differentiation, format: s.format, impact: s.impact, total: total, improvement: s.improvement });
      }
    } catch (err) {
      console.error('[品質スコア] パターン' + (p.pattern || i) + 'エラー:', err.message);
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
  if (this.sendLineFn && scores.length > 0) {
    var gradeMap = function(t) { return t >= 36 ? 'S' : t >= 32 ? 'A' : t >= 28 ? 'B' : t >= 24 ? 'C' : 'D'; };
    var scoreMsg = '品質スコア完了\n';
    scores.forEach(function(sc) {
      scoreMsg += sc.pattern + ': ' + sc.total + '/40(' + gradeMap(sc.total) + ')\n';
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
  // LINE通知
  if (this.sendLineFn && scores.length > 0) {
    var gradeMap = function(t) { return t >= 36 ? 'S' : t >= 32 ? 'A' : t >= 28 ? 'B' : t >= 24 ? 'C' : 'D\n\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所等）、裁判所判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社サイト・行政書士・司法書士サイト・まとめサイト・ブログ・Wikipedia使用禁止。ソース引用時は出典（URL・資料名・発行機関）を明記。裏取りできない情報は「未確認」と明示。'; };
    var scoreMsg = '[品質スコア] セッション' + sessionId + '\n\n';
    scores.forEach(function(sc) {
      scoreMsg += 'パターン' + sc.pattern + ': 訴求' + sc.appeal + '/差別' + sc.differentiation + '/体裁' + sc.format + '/衝撃' + sc.impact + ' = ' + sc.total + '/40 (' + gradeMap(sc.total) + ')\n';
      if (sc.improvement) scoreMsg += '  改善: ' + sc.improvement + '\n';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    });
    this.sendLineFn(scoreMsg);
  }

  return scores;
};

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// ヘルパー
// ============================================

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
// ヘルパー関数
// ============================================

// Phase1の結論を取得
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
OutputGenerator.prototype._getPhase1Conclusion = function(session) {
  if (!session) return '（セッション情報なし）';
  var parts = [];
  if (session.topic) parts.push('テーマ: ' + session.topic);
  if (session.target_definition) parts.push('ターゲット: ' + session.target_definition);
  if (session.appeal_points) parts.push('訴求ポイント: ' + session.appeal_points);
  if (session.catchcopy) parts.push('キャッチコピー案: ' + session.catchcopy);
  if (session.output_plan) parts.push('戦略: ' + session.output_plan);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  var step8 = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND round_number = 8 ORDER BY created_at DESC LIMIT 1").get(session.id);
  if (step8) parts.push('\n【Phase1最終統合結果】\n' + step8.content);
  return parts.join('\n') || '（Phase1結論なし）';
};

OutputGenerator.prototype._getQualityRules = function() {
  return '\n\n品質基準:\n' +
    '- 架空の実績・数字は一切使用禁止。事務所HP・事務所情報ファイルに基づく情報のみ\n' +
    '- ファーストビューのインパクトを最優先事項とする\n' +
    '- 安っぽい・AI感のあるデザインは不合格\n' +
    '- キャッチコピーは複数案を出してから最良を選ぶ\n' +
    '- 事務所実写真（弁護士写真フォルダ）を優先使用\n' +
    '- CTAは明確で行動しやすくする\n' +
    '- 法的に問題のある表現を使わない\n' +
    '- スマートフォンでの可読性を考慮する\n' +
    '- 恐怖訴求型（パターンD）は効果低い傾向あり。使用は慎重に';
};

OutputGenerator.prototype._saveOutputLog = function(sessionId, phase, step, label, content) {
  try {
    var session = this.db.prepare('SELECT project_id FROM sessions WHERE id = ?').get(sessionId);
    this.db.prepare('INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,?,0)')
      .run(sessionId, session ? session.project_id : null, phase, step, label, 'system', label, typeof content === 'string' ? content : JSON.stringify(content));
  } catch(e) { console.error('[OutputLog保存エラー]', e.message); }
};

OutputGenerator.prototype._getTypeInstructions = function(type) {
  var map = {
    'lp': '完全な単一HTMLファイルでLP全体を生成。CSSは全て<style>タグ内にインライン記述（外部CSS参照禁止）。JavaScriptも全て<script>タグ内にインライン記述（外部JS参照禁止）。画像はSVGインラインまたはCSS背景のみ使用。bodyやコンテナにdisplay:noneやvisibility:hiddenを設定しない。<!DOCTYPE html>から</html>まで完結。セクション: ファーストビュー→悩み共感→解決策→実績→サービス詳細→料金→FAQ→CTA。レスポンシブ対応必須。<meta charset="UTF-8">必須。',
    'banner': '完全な単一HTMLファイルで複数サイズのHTML/SVGバナーを生成。CSSは全て<style>タグ内。外部参照禁止。',
    'sns_post': 'X・Instagram・Facebook・LinkedIn用の投稿文を各1つ。ハッシュタグ付き。',
    'blog': 'SEO最適化記事。H1/H2/H3構成、メタディスクリプション、内部リンク候補。3000文字以上。',
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

  // Phase1のStep8結果も取得
  var step8 = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND round_number = 8 ORDER BY created_at DESC LIMIT 1").get(session.id);
  if (step8) parts.push('\n【Phase1最終統合結果】\n' + step8.content);

  return parts.join('\n') || '（Phase1結論なし）';
};

// 品質ルール
OutputGenerator.prototype._getQualityRules = function() {
  return '\n\n品質基準:\n' +
    '- 抽象的な表現を使わない（必ず具体的な数字・事例）\n' +
    '- 「弊社は〜」で始まる文章は使わない\n' +
    '- 読者の言葉（検索キーワード・口コミ表現）を使う\n' +
    '- 事務所資料の実績・数字を必ず参照する\n' +
    '- CTAは明確で行動しやすくする\n' +
    '- 法的に問題のある表現を使わない\n' +
    '- スマートフォンでの可読性を考慮する';
};

// アウトプットログ保存
OutputGenerator.prototype._saveOutputLog = function(sessionId, phase, step, label, content) {
  try {
    this.db.prepare('INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode) VALUES (?,?,?,?,?,?,?,0)')
      .run(sessionId, phase, step, label, 'system', label, typeof content === 'string' ? content : JSON.stringify(content));
  } catch(e) { console.error('[OutputLog保存エラー]', e.message); }
};

// アウトプット種別ごとの指示
OutputGenerator.prototype._getTypeInstructions = function(type) {
  var map = {
    'lp': '完全な単一HTMLファイルでLP全体を生成。CSSは全て<style>タグ内にインライン記述（外部CSS参照禁止）。JavaScriptも全て<script>タグ内にインライン記述（外部JS参照禁止）。画像はSVGインラインまたはCSS背景のみ使用（外部画像URL禁止）。bodyやコンテナにdisplay:noneやvisibility:hiddenを設定しない。<!DOCTYPE html>から</html>まで完結すること。セクション: ファーストビュー→悩み共感→解決策→実績/証拠→サービス詳細→料金→FAQ→CTA。レスポンシブ対応必須。',
    'banner': '複数サイズ（300x250, 728x90, 1200x628）のHTML/SVGバナーを生成。',
    'sns_post': 'X(Twitter)・Instagram・Facebook・LinkedIn用の投稿文を各1つ生成。ハッシュタグ付き。',
    'blog': 'SEO最適化記事。H1/H2/H3構成、メタディスクリプション、内部リンク候補を含む。3000文字以上。',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
    'youtube_script': 'YouTube動画台本。フック→本題→CTA構成。タイムスタンプ付き。',
    'press_release': 'プレスリリース。5W1H形式。配信先メディア候補も記載。',
    'newsletter': 'メルマガ。件名5案+本文。開封率を意識した構成。',
    'seo_design': 'SEOキーワード設計。検索意図分析・キーワードマップ・優先順位表。',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    'seo_article': 'SEO記事。構成案→本文→メタ情報まで一括。schema.org付き。',
    'aio_content': 'AI検索回答に選ばれるFAQ/構造化コンテンツ。',
    'proposal': '提案書。目次→概要→課題分析→提案内容→実績→スケジュール→費用。',
    'dm': '完全な単一HTMLファイルでDM生成。CSSは全て<style>タグ内。外部参照禁止。<meta charset="UTF-8">必須。印刷向けレイアウト。',
    'sales_script': '営業トーク台本・FAQ集。場面別の対応スクリプト。',
    'company_profile': '会社概要・サービス資料。',
    'legal_content': '法律解説コンテンツ。一般向け・わかりやすい表現。',
    'seminar': 'セミナー資料。スライド構成・台本。',
    'fax': '完全な単一HTMLファイルでFAXを生成。CSSは全て<style>タグ内。外部参照禁止。<meta charset="UTF-8">必須。A4白黒印刷向けレイアウト。'
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
    'seo_article': 'SEO記事。構成案→本文→メタ情報まで一括。schema.org構造化データ付き。',
    'aio_content': 'AI検索回答に選ばれるFAQ/構造化コンテンツ。',
    'proposal': '提案書。目次→概要→課題分析→提案内容→実績→スケジュール→費用。',
    'dm': 'DM/手紙/営業メール。件名+本文。',
    'sales_script': '営業トーク台本・FAQ集。場面別の対応スクリプト。',
    'company_profile': '会社概要・サービス資料。',
    'legal_content': '法律解説コンテンツ。一般向け・わかりやすい表現。',
    'seminar': 'セミナー資料。スライド構成・台本。'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  };
  return map[type] || '指定された種別のコンテンツを高品質で生成してください。';
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
// v2.0: project_idでフィルタリング
OutputGenerator.prototype._getMemory = function(outputType, sessionId, projectId) {
  var rows;
  if (projectId) {
    rows = this.db.prepare("SELECT category, key, value FROM memory_db WHERE (project_id = ? OR project_id IS NULL) AND (output_type = ? OR output_type IS NULL) ORDER BY confidence DESC LIMIT 30").all(projectId, outputType || '');
  } else if (outputType) {
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
=======
OutputGenerator.prototype._getMemory = function(outputType) {
  var rows;
  if (outputType) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
  if (!fs.existsSync(dir)) return null;
  var result = [];
  this._readDir(dir, result);
  // v2.0: 3000文字まで
  var combined = result.join('\n\n');
  return combined ? combined.substring(0, 3000) : null;
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
  var dir = path.join(__dirname, '..', '..', 'data', 'office-docs');
  if (!fs.existsSync(dir)) return null;
  var result = [];
  this._readDir(dir, result);
  return result.join('\n\n') || null;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
};

OutputGenerator.prototype._readDir = function(dir, result) {
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
OutputGenerator.prototype._getSimilarOutputs = function(type) {
  var cases = this.db.prepare("SELECT title, description, tone, pattern FROM case_library WHERE output_type = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 5").all(type);
  if (cases.length === 0) return null;
  return cases.map(function(c) { return c.title + '(' + c.pattern + '): ' + (c.description || ''); }).join('\n');
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
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
module.exports = OutputGenerator;
