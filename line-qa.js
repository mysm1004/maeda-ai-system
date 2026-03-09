var Anthropic = require('@anthropic-ai/sdk');
var EventEmitter = require('events');

function LineQA(db) {
  this.db = db;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.emitter = new EventEmitter();
  this.emitter.setMaxListeners(20);
}

// ============================================
// エンジンからの質問送信＆回答待機
// ============================================
LineQA.prototype.askUserViaLine = function(options) {
  var self = this;
  var timeoutMs = options.timeoutMs || 1800000; // 30分
  var timeoutAt = new Date(Date.now() + timeoutMs).toISOString();

  // DB保存
  var result = self.db.prepare(
    'INSERT INTO pending_questions (session_id, source, question, context, engine_type, engine_step, timeout_at) VALUES (?,?,?,?,?,?,?)'
  ).run(
    options.sessionId || null,
    options.engineType ? ('engine_' + options.engineType) : 'engine',
    options.question,
    JSON.stringify(options.context || {}),
    options.engineType || null,
    options.engineStep || null,
    timeoutAt
  );
  var questionId = result.lastInsertRowid;

  // LINE送信
  var lineMsg = '[確認依頼]\n' + options.question;
  if (options.sessionId) lineMsg += '\n\nセッションID: ' + options.sessionId;
  lineMsg += '\n\n回答をそのまま返信してください。';
  options.pushLineFn(lineMsg);

  console.log('[LineQA] 質問送信 ID:' + questionId + ' step:' + (options.engineStep || ''));

  // Promise: 回答 or タイムアウト
  return new Promise(function(resolve, reject) {
    var eventName = 'answer_' + questionId;
    var timer = null;

    var onAnswer = function(answer) {
      if (timer) clearTimeout(timer);
      resolve(answer);
    };
    self.emitter.once(eventName, onAnswer);

    timer = setTimeout(function() {
      self.emitter.removeListener(eventName, onAnswer);
      self.db.prepare("UPDATE pending_questions SET status = 'timeout' WHERE id = ?").run(questionId);
      console.log('[LineQA] タイムアウト ID:' + questionId);
      resolve(null); // rejectではなくnullで返す（エンジンはデフォルト続行）
    }, timeoutMs);
  });
};

// ============================================
// 回答受付（webhook → ここ → Promise解決）
// ============================================
LineQA.prototype.resolveAnswer = function(questionId, answerText) {
  // DB更新
  this.db.prepare("UPDATE pending_questions SET answer = ?, status = 'answered', answered_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(answerText, questionId);

  // EventEmitterでPromise解決
  this.emitter.emit('answer_' + questionId, answerText);

  // memory_dbに自動保存
  var q = this.db.prepare('SELECT * FROM pending_questions WHERE id = ?').get(questionId);
  if (q) {
    this.db.prepare('INSERT INTO memory_db (category, subcategory, key, value, confidence, source_session_id, source_type) VALUES (?,?,?,?,?,?,?)')
      .run('line_qa', q.engine_type || 'general', q.question.substring(0, 100), answerText.substring(0, 500), 0.8, q.session_id, 'line_qa');
  }

  console.log('[LineQA] 回答受付 ID:' + questionId);
  return q;
};

// ============================================
// 保留中の質問を取得
// ============================================
LineQA.prototype.getPendingQuestion = function() {
  return this.db.prepare("SELECT * FROM pending_questions WHERE status = 'pending' AND timeout_at > datetime('now') ORDER BY created_at ASC LIMIT 1").get();
};

// ============================================
// スマートQ&A（前田さんの自由質問に回答）
// ============================================
LineQA.prototype.handleSmartQA = async function(text, userId) {
  var self = this;

  // コンテキスト収集
  var recentSessions = self.db.prepare("SELECT id, title, topic, phase, current_round, status FROM sessions ORDER BY updated_at DESC LIMIT 10").all();
  var recentLogs = self.db.prepare("SELECT session_id, role_label, content FROM discussion_logs ORDER BY created_at DESC LIMIT 15").all();
  var memory = self.db.prepare("SELECT category, key, value FROM memory_db ORDER BY confidence DESC LIMIT 20").all();
  var pendingOutputs = self.db.prepare("SELECT output_type, session_id, recommended_pattern FROM output_queue WHERE status = 'awaiting_approval'").all();
  var recentQA = self.db.prepare("SELECT question, answer FROM pending_questions WHERE status = 'answered' ORDER BY answered_at DESC LIMIT 5").all();

  var contextStr = '【セッション一覧】\n' +
    recentSessions.map(function(s) { return '[ID:' + s.id + '] ' + s.title + ' (Phase' + s.phase + ', Step' + s.current_round + ', ' + s.status + ')'; }).join('\n') +
    '\n\n【最近の議論（抜粋）】\n' +
    recentLogs.map(function(l) { return '[S' + l.session_id + ' ' + l.role_label + '] ' + l.content.substring(0, 150); }).join('\n') +
    '\n\n【記憶DB】\n' + JSON.stringify(memory) +
    '\n\n【承認待ち】\n' +
    pendingOutputs.map(function(p) { return p.output_type + ' (session ' + p.session_id + ', 推奨:' + p.recommended_pattern + ')'; }).join('\n') +
    '\n\n【最近のQ&A】\n' +
    recentQA.map(function(qa) { return 'Q: ' + qa.question + '\nA: ' + qa.answer; }).join('\n---\n');

  var res = await self.anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: 'あなたは前田法律事務所の専属AIアシスタントです。前田弁護士からのLINE質問に、現在のプロジェクト状況・過去の議論・記憶DBを踏まえて簡潔に回答してください。\n\n注意:\n- LINEで読みやすい簡潔な回答（300文字以内推奨）\n- 該当セッションIDがあれば明示\n- 不明な場合は正直に「情報が不足しています」と言う\n- 法律事務所としての品位を保つ',
    messages: [{ role: 'user', content: '【前田さんの質問】\n' + text + '\n\n' + contextStr }]
  });
  var answer = res.content[0].text;

  // Q&A履歴保存
  self.db.prepare('INSERT INTO pending_questions (session_id, source, question, answer, status, answered_at) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)')
    .run(null, 'user_line_qa', text, answer, 'answered');

  // memory_db保存
  self.db.prepare('INSERT INTO memory_db (category, subcategory, key, value, confidence, source_type) VALUES (?,?,?,?,?,?)')
    .run('line_qa', 'user_question', text.substring(0, 100), answer.substring(0, 500), 0.6, 'line_qa');

  return answer;
};

module.exports = LineQA;
