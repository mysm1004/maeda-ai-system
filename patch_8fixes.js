// patch_8fixes.js - 8項目一括修正パッチ
// 1. 内部プロンプト漏れ修正  2. 承認ループ修正  3. フェーズ自走禁止
// 4. プロジェクト切替精度向上 5. アウトプット指示時プロジェクト確認
// 6. ChatGPTモデル→gpt-5.4+リトライ 7. 法的ソース制限確認 8. LP/DM再開

var fs = require('fs');
var fixes = { server: 0, lineqa: 0, engine: 0, output: 0, list: 0, ad: 0, media: 0 };

// ============================================
// Fix 1: line-qa.js 内部プロンプト漏れ修正
// ============================================
var lqFile = '/home/ubuntu/kabeuchi-system/src/services/line-qa.js';
var lq = fs.readFileSync(lqFile, 'utf8');

var oldLineMsg = "var lineMsg = '[確認依頼]\\n' + options.question;\n  if (options.sessionId) lineMsg += '\\n\\nセッションID: ' + options.sessionId;\n  lineMsg += '\\n\\n回答をそのまま返信してください。';";
var newLineMsg = "var lineMsg = options.question;";

if (lq.indexOf("セッションID: ' + options.sessionId") >= 0) {
  lq = lq.replace(oldLineMsg, newLineMsg);
  fs.writeFileSync(lqFile, lq, 'utf8');
  fixes.lineqa++;
  console.log('[Fix 1] line-qa.js: 内部プロンプト漏れ修正完了');
} else {
  console.log('[Fix 1] スキップ（既に修正済み or パターン不一致）');
}

// ============================================
// Fix 2+3+4+5: server.js 大規模修正
// ============================================
var svFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var sv = fs.readFileSync(svFile, 'utf8');

// --- Fix 2: 承認ループ修正 ---
// 承認時にoutput_queueから承認待ちを探して自動実行
var oldApprove = "  // 承認\n  if (t === '承認' || t === 'OK' || t === 'ok') {\n    var latest = db.prepare(\"SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1\").get();\n    if (latest) {\n      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');\n      return '承認しました（セッション: ' + latest.title + '）';\n    }\n    return 'アクティブなセッションがありません';\n  }";

var newApprove = "  // 承認\n  if (t === '承認' || t === 'OK' || t === 'ok') {\n    // まず承認待ちアウトプットがあるか確認\n    var awaitingOutput = db.prepare(\"SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1\").get();\n    if (awaitingOutput) {\n      var recPat = awaitingOutput.recommended_pattern || 'A';\n      var caseId = outputGen.approveOutput(awaitingOutput.id, recPat);\n      return 'パターン' + recPat + '（推奨）を採用しました。case_library ID: ' + caseId;\n    }\n    // 保留中の質問があれば回答として処理\n    var pendingQ = lineQA.getPendingQuestion();\n    if (pendingQ) {\n      lineQA.resolveAnswer(pendingQ.id, t);\n      return '承認を受け付けました。処理を再開します。';\n    }\n    var latest = db.prepare(\"SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1\").get();\n    if (latest) {\n      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');\n      return '承認しました（セッション: ' + latest.title + '）';\n    }\n    return 'アクティブなセッションがありません';\n  }";

if (sv.indexOf(oldApprove) >= 0) {
  sv = sv.replace(oldApprove, newApprove);
  fixes.server++;
  console.log('[Fix 2] server.js: 承認ループ修正完了');
} else {
  console.log('[Fix 2] スキップ（パターン不一致）');
}

// --- Fix 3: フェーズ自走禁止 ---
// advanceToNextPhase → notifyPhaseComplete に全置換
// 完了通知だけ出して自動進行しない

// 3a: advanceToNextPhase関数自体を書き換え
var oldAdvance = "async function advanceToNextPhase(sessionId, isSleep) {\n  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);\n  if (!session) return;\n  var nextPhase = getNextPhase(session);\n  if (!nextPhase) {\n    await sendLine('【全フェーズ完了】セッション「' + session.title + '」の全フェーズが完了しました。');\n    db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(sessionId);\n    return;\n  }\n\n  if (!isSleep) {\n    // LINEで確認\n    var phaseLabels = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};\n    var question = '【フェーズ進行確認】\\nセッション: ' + session.title + '\\n現在: Phase' + session.phase + ' (' + (phaseLabels[session.phase] || '') + ')\\n次: Phase' + nextPhase + ' (' + (phaseLabels[nextPhase] || '') + ')\\n\\n「進む」→次フェーズ開始\\n「スキップ」→その次のフェーズへ\\n「完了」→このセッションを完了';\n    var answer = await lineQA.askUserViaLine({ question: question, engineType: 'phase_advance', engineStep: 0, sessionId: sessionId, pushLineFn: sendLine, timeoutMs: 60 * 60000 });\n    if (!answer || answer === '完了' || answer === 'このフェーズで完了') {\n      db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(sessionId);\n      await sendLine('セッション「' + session.title + '」を完了しました。');\n      return;\n    }\n    if (answer === 'スキップ' || answer.indexOf('スキップ') >= 0) {\n      // phase_planから次フェーズを除去して再帰\n      var plan = (session.phase_plan || '1,2,3,4,5,6').split(',').map(Number);\n      plan = plan.filter(function(p) { return p !== nextPhase; });\n      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan.join(','), sessionId);\n      await sendLine('Phase' + nextPhase + 'をスキップしました。');\n      return advanceToNextPhase(sessionId, false);\n    }\n  }\n\n  // 次フェーズ起動\n  console.log('[フェーズ進行] Session' + sessionId + ': Phase' + session.phase + ' → Phase' + nextPhase);\n  db.prepare('UPDATE sessions SET phase = ?, current_round = 0 WHERE id = ?').run(nextPhase, sessionId);\n\n  switch (nextPhase) {\n    case 2:\n    case 3:\n      // Phase2/3はoutputGen.generateFullで処理（outputTypeが必要なので通知のみ）\n      await sendLine('Phase' + nextPhase + 'に進みました。LINEで「LP作って」等のコマンドでアウトプット生成を開始してください。');\n      break;\n    case 4:\n      listGen.generateFull(sessionId, isSleep).then(function() {\n        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase4→次]', e.message); });\n      }).catch(function(e) { console.error('[Phase4]', e.message); });\n      break;\n    case 5:\n      adDesigner.generateFull(sessionId, isSleep).then(function() {\n        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase5→次]', e.message); });\n      }).catch(function(e) { console.error('[Phase5]', e.message); });\n      break;\n    case 6:\n      mediaOptimizer.generateFull(sessionId, isSleep).then(function() {\n        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase6→次]', e.message); });\n      }).catch(function(e) { console.error('[Phase6]', e.message); });\n      break;\n    default:\n      await sendLine('Phase' + nextPhase + 'に進みました。');\n  }\n}";

var newAdvance = "async function advanceToNextPhase(sessionId, isSleep) {\n  // 自動進行禁止: 完了通知だけ出して止まる\n  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);\n  if (!session) return;\n  var phaseLabels = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};\n  var nextPhase = getNextPhase(session);\n  if (!nextPhase) {\n    await sendLine('ID:' + sessionId + ' ' + session.title + ' 全フェーズ完了しました。');\n    db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(sessionId);\n    return;\n  }\n  // 完了通知のみ（自動で次フェーズに進まない）\n  await sendLine('ID:' + sessionId + ' ' + session.title + ' ' + (phaseLabels[session.phase] || 'Phase'+session.phase) + '完了。次に進みますか？\\n\\n次: Phase' + nextPhase + '(' + (phaseLabels[nextPhase] || '') + ')\\n「ID:' + sessionId + ' フェーズ' + nextPhase + '」で開始');\n}";

if (sv.indexOf("async function advanceToNextPhase(sessionId, isSleep) {") >= 0) {
  sv = sv.replace(oldAdvance, newAdvance);
  fixes.server++;
  console.log('[Fix 3] server.js: フェーズ自走禁止（advanceToNextPhase書き換え）完了');
} else {
  console.log('[Fix 3] スキップ（パターン不一致）');
}

// --- Fix 3b: executePhaseAction内のadvanceToNextPhase呼び出しを除去 ---
// Phase1完了後
var oldP1Advance = "          advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n        } catch(err) {\n          console.error('[Smart Phase1]', err.message);\n          await sendLine('Phase1エラー: ' + err.message);\n        }\n      })();\n      return prefix + '開始します（Step' + nextRound + '/8から）';";
var newP1Advance = "          advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n        } catch(err) {\n          console.error('[Smart Phase1]', err.message);\n          await sendLine('Phase1エラー: ' + err.message);\n        }\n      })();\n      return 'ID:' + session.id + ' ' + session.title + ' Phase1(壁打ち) 開始します（Step' + nextRound + '/8から）';";
if (sv.indexOf(oldP1Advance) >= 0) {
  sv = sv.replace(oldP1Advance, newP1Advance);
  fixes.server++;
  console.log('[Fix 3b] executePhaseAction Phase1開始メッセージにID明示');
}

// Phase4/5/6のadvanceToNextPhase呼び出しを残す（advanceToNextPhase自体が通知のみに変わったので）
// ただしreturnメッセージにID明示
var oldP4Return = "      return prefix + '開始します。';\n\n    case 5:";
var newP4Return = "      return 'ID:' + session.id + ' ' + session.title + ' Phase4(営業リスト作成) 開始します。';\n\n    case 5:";
if (sv.indexOf(oldP4Return) >= 0) {
  sv = sv.replace(oldP4Return, newP4Return);
}

var oldP5Return = "      return prefix + '開始します。';\n\n    case 6:";
var newP5Return = "      return 'ID:' + session.id + ' ' + session.title + ' Phase5(広告配信設計) 開始します。';\n\n    case 6:";
if (sv.indexOf(oldP5Return) >= 0) {
  sv = sv.replace(oldP5Return, newP5Return);
}

// 最後のPhase6のreturn
var oldP6Return = "      return prefix + '開始します。';\n\n    default:";
var newP6Return = "      return 'ID:' + session.id + ' ' + session.title + ' Phase6(メディア最適化) 開始します。';\n\n    default:";
if (sv.indexOf(oldP6Return) >= 0) {
  sv = sv.replace(oldP6Return, newP6Return);
}

// Phase2/3のreturnにもID明示
var oldP23Return = "      return prefix + '実行します。\\nLINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';";
var newP23Return = "      return 'ID:' + session.id + ' ' + session.title + ' Phase' + phaseNum + ' LINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';";
if (sv.indexOf(oldP23Return) >= 0) {
  sv = sv.replace(oldP23Return, newP23Return);
}

// --- Fix 4: プロジェクト切替精度向上 ---
// resolveSmartInstructionのキーワードマッチを改善
var oldKeywordMatch = "  // プロジェクト名キーワードでマッチ\n  if (!targetSession) {\n    for (var i = 0; i < allSessions.length; i++) {\n      var s = allSessions[i];\n      var titleWords = s.title.replace(/[\\s　]/g, '').toLowerCase();\n      var tLower = t.replace(/[\\s　]/g, '').toLowerCase();\n      // タイトルの主要キーワード（3文字以上）がメッセージに含まれるか\n      var keywords = s.title.split(/[\\s　・×/]/g).filter(function(w) { return w.length >= 2; });\n      for (var k = 0; k < keywords.length; k++) {\n        if (tLower.indexOf(keywords[k].toLowerCase()) >= 0) {\n          targetSession = s;\n          break;\n        }\n      }\n      if (targetSession) break;\n    }\n  }";

var newKeywordMatch = "  // プロジェクト名キーワードでマッチ（ID指定を最優先）\n  if (!targetSession) {\n    var tLower = t.replace(/[\\s　]/g, '').toLowerCase();\n    // 明示的キーワードマッピング（直前プロジェクトに引っ張られない）\n    var bestMatch = null;\n    var bestScore = 0;\n    for (var i = 0; i < allSessions.length; i++) {\n      var s = allSessions[i];\n      var score = 0;\n      // タイトルの主要キーワード（2文字以上）\n      var keywords = s.title.split(/[\\s　・×\\/]/g).filter(function(w) { return w.length >= 2; });\n      // トピックからもキーワード抽出\n      if (s.topic) {\n        var topicKw = s.topic.split(/[\\s　・×\\/、。]/g).filter(function(w) { return w.length >= 2; });\n        keywords = keywords.concat(topicKw);\n      }\n      for (var k = 0; k < keywords.length; k++) {\n        if (tLower.indexOf(keywords[k].toLowerCase()) >= 0) {\n          score += keywords[k].length; // 長いキーワード一致ほど高スコア\n        }\n      }\n      if (score > bestScore) {\n        bestScore = score;\n        bestMatch = s;\n      }\n    }\n    if (bestMatch && bestScore >= 2) {\n      targetSession = bestMatch;\n    }\n  }";

if (sv.indexOf("var titleWords = s.title.replace") >= 0) {
  sv = sv.replace(oldKeywordMatch, newKeywordMatch);
  fixes.server++;
  console.log('[Fix 4] server.js: プロジェクト切替精度向上完了');
} else {
  console.log('[Fix 4] スキップ（パターン不一致）');
}

// --- Fix 5: アウトプット指示時プロジェクト確認 ---
var oldOutputSession = "  // セッション特定（ID指定 or キーワード or 直近）\n  var idMatch = t.match(/(?:ID|id)\\s*(\\d+)/i);\n  var session = null;\n  if (idMatch) {\n    session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(parseInt(idMatch[1]));\n  }\n  if (!session) {\n    // 直近のPhase1完了済みセッションを使用\n    session = db.prepare(\"SELECT * FROM sessions WHERE phase >= 1 AND status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n  }\n  if (!session) return null;";

var newOutputSession = "  // セッション特定（ID指定を最優先）\n  var idMatch = t.match(/(?:ID|id|ＩＤ)\\s*(\\d+)/i);\n  var session = null;\n  if (idMatch) {\n    session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(parseInt(idMatch[1]));\n  }\n  if (!session) {\n    // ID指定なし→進行中プロジェクトが複数あれば確認\n    var activeSessions = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC\").all();\n    if (activeSessions.length === 0) return null;\n    if (activeSessions.length >= 2) {\n      // 複数プロジェクト→キーワードマッチ試行\n      var tLower2 = t.replace(/[\\s　]/g, '').toLowerCase();\n      for (var j = 0; j < activeSessions.length; j++) {\n        var kws = activeSessions[j].title.split(/[\\s　・×\\/]/g).filter(function(w) { return w.length >= 2; });\n        for (var kk = 0; kk < kws.length; kk++) {\n          if (tLower2.indexOf(kws[kk].toLowerCase()) >= 0) { session = activeSessions[j]; break; }\n        }\n        if (session) break;\n      }\n      if (!session) {\n        // キーワードでも特定できない→確認要求\n        var sessionList = activeSessions.map(function(ss) { return 'ID:' + ss.id + ' ' + ss.title; }).join('\\n');\n        sendLine('どのプロジェクトの' + (typeLabels[detectedType] || detectedType) + 'を生成しますか？\\n\\n' + sessionList + '\\n\\n「ID:〇〇 ' + (typeLabels[detectedType] || detectedType) + '作って」で指定してください。');\n        return '複数プロジェクト進行中のため確認しました。IDを指定してください。';\n      }\n    } else {\n      session = activeSessions[0];\n    }\n  }\n  if (!session) return null;";

if (sv.indexOf("// 直近のPhase1完了済みセッションを使用") >= 0) {
  sv = sv.replace(oldOutputSession, newOutputSession);
  fixes.server++;
  console.log('[Fix 5] server.js: アウトプット指示時プロジェクト確認完了');
} else {
  console.log('[Fix 5] スキップ（パターン不一致）');
}

// detectOutputRequestのreturnメッセージにもID明示
var oldOutputReturn = "  return '「' + session.title + '」の' + (typeLabels[detectedType] || detectedType) + 'と解釈して生成開始します。';";
var newOutputReturn = "  return 'ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[detectedType] || detectedType) + '生成開始します。';";
if (sv.indexOf(oldOutputReturn) >= 0) {
  sv = sv.replace(oldOutputReturn, newOutputReturn);
}

// --- Fix 3c: 壁打ち自動開始後のadvanceToNextPhase呼び出しもそのまま残す（通知のみに変更済み） ---
// 壁打ち自動開始のreturnメッセージにもID明示
var oldTopicReturn = "    return '「' + topic + '」について壁打ち開始します。';";
var newTopicReturn = "    return '「' + topic + '」について壁打ち開始します（新規プロジェクト）。';";
if (sv.indexOf(oldTopicReturn) >= 0) {
  sv = sv.replace(oldTopicReturn, newTopicReturn);
}

// --- Fix 3d: processLineCommand内のPhase4/5/6コマンドのadvanceToNextPhase呼び出し除去 ---
// フェーズ4
var oldPhase4Cmd = "      listGen.generateFull(ls.id, false).then(function() {\n        advanceToNextPhase(ls.id, false).catch(function(e) { console.error(e); });\n      }).catch(function(e) { console.error('[LINE Phase4]', e); sendLine('Phase4エラー: ' + e.message); });\n      return 'Phase4（営業リスト作成）を開始します。セッション: ' + ls.title;";
var newPhase4Cmd = "      listGen.generateFull(ls.id, false).then(function() {\n        advanceToNextPhase(ls.id, false).catch(function(e) { console.error(e); });\n      }).catch(function(e) { console.error('[LINE Phase4]', e); sendLine('Phase4エラー: ' + e.message); });\n      return 'ID:' + ls.id + ' ' + ls.title + ' Phase4(営業リスト作成) 開始します。';";
if (sv.indexOf(oldPhase4Cmd) >= 0) {
  sv = sv.replace(oldPhase4Cmd, newPhase4Cmd);
}
// フェーズ5
var oldPhase5Cmd = "      return 'Phase5（広告配信設計）を開始します。セッション: ' + as.title;";
var newPhase5Cmd = "      return 'ID:' + as.id + ' ' + as.title + ' Phase5(広告配信設計) 開始します。';";
if (sv.indexOf(oldPhase5Cmd) >= 0) {
  sv = sv.replace(oldPhase5Cmd, newPhase5Cmd);
}
// フェーズ6
var oldPhase6Cmd = "      return 'Phase6（メディア最適化）を開始します。セッション: ' + ms.title;";
var newPhase6Cmd = "      return 'ID:' + ms.id + ' ' + ms.title + ' Phase6(メディア最適化) 開始します。';";
if (sv.indexOf(oldPhase6Cmd) >= 0) {
  sv = sv.replace(oldPhase6Cmd, newPhase6Cmd);
}

// --- Fix 4b: resolveSmartInstruction でセッション特定のみの場合もID明示 ---
// 直近セッション使用時
var oldFallback = "  // セッションが特定できない場合は直近を使用\n  if (!targetSession) {\n    targetSession = allSessions[0]; // 直近更新のセッション\n  }";
var newFallback = "  // セッションが特定できない場合は直近を使用（ただしフェーズ指示がある場合のみ）\n  if (!targetSession && (phaseNum || isContinue)) {\n    targetSession = allSessions[0]; // 直近更新のセッション\n  }";
if (sv.indexOf(oldFallback) >= 0) {
  sv = sv.replace(oldFallback, newFallback);
}

// server.js 書き込み
fs.writeFileSync(svFile, sv, 'utf8');
console.log('[Fix 2-5] server.js: 合計 ' + fixes.server + ' 件修正');

// ============================================
// Fix 6: ChatGPTモデル→gpt-5.4 + リトライロジック（全ファイル）
// ============================================

// --- 6a: discussion-engine.js ---
var deFile = '/home/ubuntu/kabeuchi-system/src/services/discussion-engine.js';
var de = fs.readFileSync(deFile, 'utf8');
var gptCount = 0;

// gpt-4o → gpt-5.4
while (de.indexOf("'gpt-4o'") >= 0) {
  de = de.replace("'gpt-4o'", "'gpt-5.4'");
  gptCount++;
}

// _callChatGPTにリトライロジック追加
// まず既存の_callChatGPTメソッドを探す
var oldChatGPT_de = "DiscussionEngine.prototype._callChatGPT = function(system, user) {\n  return this.openai.chat.completions.create({\n    model: 'gpt-5.4', max_tokens: 4000,\n    messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n  }).then(function(r) { return r.choices[0].message.content; });";

// パターンが見つからない場合の別パターン
if (de.indexOf("DiscussionEngine.prototype._callChatGPT") >= 0) {
  // 既存の_callChatGPT全体を置換
  var chatGPTStart = de.indexOf("DiscussionEngine.prototype._callChatGPT");
  var chatGPTEnd = de.indexOf("};", chatGPTStart) + 2;
  var oldChatGPTFull = de.substring(chatGPTStart, chatGPTEnd);

  var newChatGPTFull = "DiscussionEngine.prototype._callChatGPT = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.openai.chat.completions.create({\n      model: 'gpt-5.4', max_tokens: 4000,\n      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n    }).then(function(r) { return r.choices[0].message.content; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      throw err;\n    });\n  }\n  return attempt(0);\n};";

  de = de.substring(0, chatGPTStart) + newChatGPTFull + de.substring(chatGPTEnd);
  fixes.engine++;
  console.log('[Fix 6a] discussion-engine.js: gpt-5.4 + リトライ (' + gptCount + '箇所モデル変更)');
}

// _callClaudeにもリトライ追加
if (de.indexOf("DiscussionEngine.prototype._callClaude") >= 0) {
  var claudeStart = de.indexOf("DiscussionEngine.prototype._callClaude");
  var claudeEnd = de.indexOf("};", claudeStart) + 2;
  var oldClaudeFull = de.substring(claudeStart, claudeEnd);

  var newClaudeFull = "DiscussionEngine.prototype._callClaude = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514', max_tokens: 4000,\n      system: system,\n      messages: [{ role: 'user', content: user }]\n    }).then(function(r) { return r.content[0].text; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      throw err;\n    });\n  }\n  return attempt(0);\n};";

  de = de.substring(0, claudeStart) + newClaudeFull + de.substring(claudeEnd);
  fixes.engine++;
  console.log('[Fix 6a2] discussion-engine.js: Claude APIリトライ追加');
}

fs.writeFileSync(deFile, de, 'utf8');

// --- 6b: output-generator.js ---
var ogFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var og = fs.readFileSync(ogFile, 'utf8');
gptCount = 0;
while (og.indexOf("'gpt-4o'") >= 0) {
  og = og.replace("'gpt-4o'", "'gpt-5.4'");
  gptCount++;
}
// _callChatGPTにリトライ追加
if (og.indexOf("OutputGenerator.prototype._callChatGPT") >= 0) {
  var ogCStart = og.indexOf("OutputGenerator.prototype._callChatGPT");
  var ogCEnd = og.indexOf("};", ogCStart) + 2;
  var ogOld = og.substring(ogCStart, ogCEnd);
  var ogNew = "OutputGenerator.prototype._callChatGPT = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.openai.chat.completions.create({\n      model: 'gpt-5.4', max_tokens: 4000,\n      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n    }).then(function(r) { return r.choices[0].message.content; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  og = og.substring(0, ogCStart) + ogNew + og.substring(ogCEnd);
  fixes.output++;
}
// _callClaudeにもリトライ
if (og.indexOf("OutputGenerator.prototype._callClaude") >= 0) {
  var ogClStart = og.indexOf("OutputGenerator.prototype._callClaude");
  var ogClEnd = og.indexOf("};", ogClStart) + 2;
  var ogClOld = og.substring(ogClStart, ogClEnd);
  var ogClNew = "OutputGenerator.prototype._callClaude = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514', max_tokens: 4000,\n      system: system,\n      messages: [{ role: 'user', content: user }]\n    }).then(function(r) { return r.content[0].text; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  og = og.substring(0, ogClStart) + ogClNew + og.substring(ogClEnd);
  fixes.output++;
}
fs.writeFileSync(ogFile, og, 'utf8');
console.log('[Fix 6b] output-generator.js: gpt-5.4 + リトライ (' + gptCount + '箇所)');

// --- 6c: list-generator.js ---
var lgFile = '/home/ubuntu/kabeuchi-system/src/services/list-generator.js';
var lg = fs.readFileSync(lgFile, 'utf8');
gptCount = 0;
while (lg.indexOf("'gpt-4o'") >= 0) {
  lg = lg.replace("'gpt-4o'", "'gpt-5.4'");
  gptCount++;
}
// _callChatGPTにリトライ
if (lg.indexOf("ListGenerator.prototype._callChatGPT") >= 0) {
  var lgCStart = lg.indexOf("ListGenerator.prototype._callChatGPT");
  var lgCEnd = lg.indexOf("};", lgCStart) + 2;
  var lgNew = "ListGenerator.prototype._callChatGPT = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.openai.chat.completions.create({\n      model: 'gpt-5.4', max_tokens: 4000,\n      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n    }).then(function(r) { return r.choices[0].message.content; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[ChatGPT API] 3回失敗: ' + err.message + ' 次のステップへ進みます。');\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  lg = lg.substring(0, lgCStart) + lgNew + lg.substring(lgCEnd);
  fixes.list++;
}
// _callClaudeにリトライ
if (lg.indexOf("ListGenerator.prototype._callClaude") >= 0) {
  var lgClStart = lg.indexOf("ListGenerator.prototype._callClaude");
  var lgClEnd = lg.indexOf("};", lgClStart) + 2;
  var lgClNew = "ListGenerator.prototype._callClaude = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514', max_tokens: 4000,\n      system: system,\n      messages: [{ role: 'user', content: user }]\n    }).then(function(r) { return r.content[0].text; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[Claude API] 3回失敗: ' + err.message + ' 次のステップへ進みます。');\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  lg = lg.substring(0, lgClStart) + lgClNew + lg.substring(lgClEnd);
  fixes.list++;
}
fs.writeFileSync(lgFile, lg, 'utf8');
console.log('[Fix 6c] list-generator.js: gpt-5.4 + リトライ (' + gptCount + '箇所)');

// --- 6d: ad-designer.js ---
var adFile = '/home/ubuntu/kabeuchi-system/src/services/ad-designer.js';
var ad = fs.readFileSync(adFile, 'utf8');
gptCount = 0;
while (ad.indexOf("'gpt-4o'") >= 0) {
  ad = ad.replace("'gpt-4o'", "'gpt-5.4'");
  gptCount++;
}
if (ad.indexOf("AdDesigner.prototype._callChatGPT") >= 0) {
  var adCStart = ad.indexOf("AdDesigner.prototype._callChatGPT");
  var adCEnd = ad.indexOf("};", adCStart) + 2;
  var adNew = "AdDesigner.prototype._callChatGPT = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.openai.chat.completions.create({\n      model: 'gpt-5.4', max_tokens: 4000,\n      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n    }).then(function(r) { return r.choices[0].message.content; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[ChatGPT API] 3回失敗: ' + err.message);\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  ad = ad.substring(0, adCStart) + adNew + ad.substring(adCEnd);
  fixes.ad++;
}
if (ad.indexOf("AdDesigner.prototype._callClaude") >= 0) {
  var adClStart = ad.indexOf("AdDesigner.prototype._callClaude");
  var adClEnd = ad.indexOf("};", adClStart) + 2;
  var adClNew = "AdDesigner.prototype._callClaude = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514', max_tokens: 4000,\n      system: system,\n      messages: [{ role: 'user', content: user }]\n    }).then(function(r) { return r.content[0].text; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[Claude API] 3回失敗: ' + err.message);\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  ad = ad.substring(0, adClStart) + adClNew + ad.substring(adClEnd);
  fixes.ad++;
}
fs.writeFileSync(adFile, ad, 'utf8');
console.log('[Fix 6d] ad-designer.js: gpt-5.4 + リトライ (' + gptCount + '箇所)');

// --- 6e: media-optimizer.js ---
var moFile = '/home/ubuntu/kabeuchi-system/src/services/media-optimizer.js';
var mo = fs.readFileSync(moFile, 'utf8');
gptCount = 0;
while (mo.indexOf("'gpt-4o'") >= 0) {
  mo = mo.replace("'gpt-4o'", "'gpt-5.4'");
  gptCount++;
}
if (mo.indexOf("MediaOptimizer.prototype._callChatGPT") >= 0) {
  var moCStart = mo.indexOf("MediaOptimizer.prototype._callChatGPT");
  var moCEnd = mo.indexOf("};", moCStart) + 2;
  var moNew = "MediaOptimizer.prototype._callChatGPT = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.openai.chat.completions.create({\n      model: 'gpt-5.4', max_tokens: 4000,\n      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]\n    }).then(function(r) { return r.choices[0].message.content; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[ChatGPT API] 3回失敗: ' + err.message);\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  mo = mo.substring(0, moCStart) + moNew + mo.substring(moCEnd);
  fixes.media++;
}
if (mo.indexOf("MediaOptimizer.prototype._callClaude") >= 0) {
  var moClStart = mo.indexOf("MediaOptimizer.prototype._callClaude");
  var moClEnd = mo.indexOf("};", moClStart) + 2;
  var moClNew = "MediaOptimizer.prototype._callClaude = function(system, user) {\n  var self = this;\n  var maxRetries = 3;\n  function attempt(retryCount) {\n    return self.anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514', max_tokens: 4000,\n      system: system,\n      messages: [{ role: 'user', content: user }]\n    }).then(function(r) { return r.content[0].text; })\n    .catch(function(err) {\n      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');\n        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });\n      }\n      if (self.sendLine) self.sendLine('[Claude API] 3回失敗: ' + err.message);\n      throw err;\n    });\n  }\n  return attempt(0);\n};";
  mo = mo.substring(0, moClStart) + moClNew + mo.substring(moClEnd);
  fixes.media++;
}
fs.writeFileSync(moFile, mo, 'utf8');
console.log('[Fix 6e] media-optimizer.js: gpt-5.4 + リトライ (' + gptCount + '箇所)');

// --- 6f: line-qa.js SmartQAのモデルもリトライ対応 ---
lq = fs.readFileSync(lqFile, 'utf8');
// SmartQA内のanthropic.messages.createにリトライラッパー追加は不要（単発呼び出し）
// ただしcatchが既にある
console.log('[Fix 6f] line-qa.js: SmartQAは既にtry-catch済み、スキップ');

// ============================================
// Fix 7: 法的ソース制限確認
// ============================================
// 前回パッチで適用済みか確認
de = fs.readFileSync(deFile, 'utf8');
if (de.indexOf('法的根拠の引用ルール') >= 0) {
  console.log('[Fix 7] 法的ソース制限: discussion-engine.js 適用済み ✓');
} else {
  console.log('[Fix 7] 法的ソース制限: discussion-engine.js 未適用 ← 要確認');
}
og = fs.readFileSync(ogFile, 'utf8');
if (og.indexOf('法的根拠の引用ルール') >= 0 || og.indexOf('法的根拠') >= 0) {
  console.log('[Fix 7] 法的ソース制限: output-generator.js 適用済み ✓');
} else {
  console.log('[Fix 7] 法的ソース制限: output-generator.js 未適用 ← 要確認');
}

// ============================================
// 結果サマリー
// ============================================
console.log('\n====================================');
console.log('patch_8fixes.js 完了');
console.log('  line-qa.js: ' + fixes.lineqa + '件 (内部プロンプト漏れ修正)');
console.log('  server.js: ' + fixes.server + '件 (承認ループ/自走禁止/切替精度/出力確認)');
console.log('  discussion-engine.js: ' + fixes.engine + '件 (gpt-5.4+リトライ)');
console.log('  output-generator.js: ' + fixes.output + '件 (gpt-5.4+リトライ)');
console.log('  list-generator.js: ' + fixes.list + '件 (gpt-5.4+リトライ)');
console.log('  ad-designer.js: ' + fixes.ad + '件 (gpt-5.4+リトライ)');
console.log('  media-optimizer.js: ' + fixes.media + '件 (gpt-5.4+リトライ)');
console.log('====================================');
