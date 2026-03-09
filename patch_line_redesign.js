// patch_line_redesign.js - LINE設計根本見直し
// 設計原則:
// 1. LINEには前田さんへの返答だけ送る（内部メッセージ禁止）
// 2. 指示を受けたら即実行（承認ループ廃止）
// 3. 進捗報告は統一フォーマット（開始/完了/エラー）
// 4. 確認はプロジェクト特定不可の場合のみ
// 5. フェーズは指示分だけ動く（自走禁止）

var fs = require('fs');
var fixCount = 0;

// ============================================
// Fix 1: output-generator.js - 承認ループ廃止
// ============================================
var ogFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var og = fs.readFileSync(ogFile, 'utf8');

// 1a: Phase2 Step4後の訴求確認 → 廃止（確認なしで続行）
var oldAppealConfirm = og.match(/\/\/ Phase2 Step4後: 訴求の確認[\s\S]*?catch\(e\) \{ console\.log\('\[OutputGen\] 訴求確認スキップ:', e\.message\); \}\n  \}/);
if (oldAppealConfirm) {
  og = og.replace(oldAppealConfirm[0], '// Phase2 Step4: 確認なしで続行（即実行原則）');
  fixCount++;
  console.log('[Fix 1a] output-generator.js: 訴求確認ループ廃止');
} else {
  console.log('[Fix 1a] スキップ（パターン不一致）');
}

// 1b: Phase3 Step4後の品質チェック警告 → 廃止（ログのみ）
var oldQcConfirm = og.match(/\/\/ Phase3 Step4後: 品質不合格時の確認[\s\S]*?catch\(e\) \{ console\.log\('\[OutputGen\] 品質確認スキップ:', e\.message\); \}\n  \}/);
if (oldQcConfirm) {
  og = og.replace(oldQcConfirm[0], '// Phase3 Step4: 品質チェック結果はログのみ（確認不要）\n  if (p3s4.indexOf(\'不合格\') !== -1) { console.log(\'[OutputGen] 品質チェック要改善あり、続行\'); }');
  fixCount++;
  console.log('[Fix 1b] output-generator.js: 品質チェック確認ループ廃止');
} else {
  console.log('[Fix 1b] スキップ（パターン不一致）');
}

// 1c: スコア通知の簡素化
var oldScoreMsg = "this.sendLineFn(scoreMsg);";
if (og.indexOf(oldScoreMsg) >= 0) {
  // スコア通知はそのまま残す（完了時の有用な情報）
  console.log('[Fix 1c] output-generator.js: スコア通知は維持');
}

fs.writeFileSync(ogFile, og, 'utf8');

// ============================================
// Fix 2: server.js - 全面的にLINEメッセージ改修
// ============================================
var svFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var sv = fs.readFileSync(svFile, 'utf8');

// 2a: advanceToNextPhase の通知をシンプルに
var oldAdvanceMsg = "  await sendLine('ID:' + sessionId + ' ' + session.title + ' ' + (phaseLabels[session.phase] || 'Phase'+session.phase) + '完了。次に進みますか？\\n\\n次: Phase' + nextPhase + '(' + (phaseLabels[nextPhase] || '') + ')\\n「ID:' + sessionId + ' フェーズ' + nextPhase + '」で開始');";
var newAdvanceMsg = "  await sendLine('ID:' + sessionId + ' ' + session.title + ' Phase' + session.phase + '(' + (phaseLabels[session.phase] || '') + ') 完了。');";
if (sv.indexOf(oldAdvanceMsg) >= 0) {
  sv = sv.replace(oldAdvanceMsg, newAdvanceMsg);
  fixCount++;
  console.log('[Fix 2a] server.js: advanceToNextPhase通知シンプル化');
}

// 2b: 承認ハンドラ - 「OK」「進めて」で即実行
var oldApproval = "  // 承認\n  if (t === '承認' || t === 'OK' || t === 'ok') {\n    // まず承認待ちアウトプットがあるか確認\n    var awaitingOutput = db.prepare(\"SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1\").get();\n    if (awaitingOutput) {\n      var recPat = awaitingOutput.recommended_pattern || 'A';\n      var caseId = outputGen.approveOutput(awaitingOutput.id, recPat);\n      return 'パターン' + recPat + '（推奨）を採用しました。case_library ID: ' + caseId;\n    }\n    // 保留中の質問があれば回答として処理\n    var pendingQ = lineQA.getPendingQuestion();\n    if (pendingQ) {\n      lineQA.resolveAnswer(pendingQ.id, t);\n      return '承認を受け付けました。処理を再開します。';\n    }\n    var latest = db.prepare(\"SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1\").get();\n    if (latest) {\n      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');\n      return '承認しました（セッション: ' + latest.title + '）';\n    }\n    return 'アクティブなセッションがありません';\n  }";

var newApproval = "  // 承認・OK・進めて → 即実行\n  if (t === '承認' || t === 'OK' || t === 'ok' || t === '進めて' || t === 'はい' || t === 'お願い' || t === 'お願いします' || t === '頼む') {\n    // 保留中の質問があれば回答\n    var pendingQ = lineQA.getPendingQuestion();\n    if (pendingQ) {\n      lineQA.resolveAnswer(pendingQ.id, t);\n      return '了解。処理を再開します。';\n    }\n    // 承認待ちアウトプットがあれば採用\n    var awaitingOutput = db.prepare(\"SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1\").get();\n    if (awaitingOutput) {\n      var recPat = awaitingOutput.recommended_pattern || 'A';\n      var awSession = db.prepare('SELECT * FROM sessions WHERE id = ?').get(awaitingOutput.session_id);\n      var caseId = outputGen.approveOutput(awaitingOutput.id, recPat);\n      return 'ID:' + awaitingOutput.session_id + ' パターン' + recPat + '採用。';\n    }\n    return '了解。';\n  }";

if (sv.indexOf(oldApproval) >= 0) {
  sv = sv.replace(oldApproval, newApproval);
  fixCount++;
  console.log('[Fix 2b] server.js: 承認ハンドラ即実行化');
} else {
  console.log('[Fix 2b] スキップ（パターン不一致）');
}

// 2c: 保留質問の回答メッセージをシンプルに
var oldPendingReply = "    return '回答受付しました。処理を再開します。\\n\\nQ: ' + pending.question.substring(0, 80) + '\\nA: ' + t;";
var newPendingReply = "    return '了解。処理を再開します。';";
if (sv.indexOf(oldPendingReply) >= 0) {
  sv = sv.replace(oldPendingReply, newPendingReply);
  fixCount++;
  console.log('[Fix 2c] server.js: 保留質問回答シンプル化');
}

// 2d: detectOutputRequestの完了通知をシンプルに
var oldOutputComplete = "    sendLine('【アウトプット完了】' + (typeLabels[detectedType] || detectedType) + '\\nセッション: ' + session.title + '\\n推奨: パターン' + (result.recommended || 'A') + '\\n\\n確認: https://176-32-87-118.sslip.io/outputs/' + htmlFile + '\\n\\n「パターンA採用」等で承認してください');";
var newOutputComplete = "    sendLine('ID:' + session.id + ' ' + (typeLabels[detectedType] || detectedType) + '生成 完了。\\nURL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);";
if (sv.indexOf(oldOutputComplete) >= 0) {
  sv = sv.replace(oldOutputComplete, newOutputComplete);
  fixCount++;
  console.log('[Fix 2d] server.js: アウトプット完了通知シンプル化');
}

// 2e: アウトプットエラー通知をシンプルに
var oldOutputError = "    sendLine('アウトプット生成エラー: ' + e.message);";
var newOutputError = "    sendLine('ID:' + session.id + ' ' + (typeLabels[detectedType] || detectedType) + '生成 エラー。' + e.message);";
if (sv.indexOf(oldOutputError) >= 0) {
  sv = sv.replace(oldOutputError, newOutputError);
  fixCount++;
  console.log('[Fix 2e] server.js: アウトプットエラー通知シンプル化');
}

// 2f: Phase1 Step完了通知をシンプルに（executePhaseAction内）
var oldStep = "if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');";
var newStep = "if (r < 8) await sendLine('ID:' + session.id + ' Phase1 Step' + r + '/8 完了');";
if (sv.indexOf(oldStep) >= 0) {
  // 2箇所あるので両方置換
  sv = sv.split(oldStep).join(newStep);
  fixCount++;
  console.log('[Fix 2f] server.js: Phase1ステップ通知にID追加');
}

// 2g: Phase1エラー通知
var oldP1Err = "await sendLine('Phase1エラー: ' + err.message);";
var newP1Err = "await sendLine('ID:' + session.id + ' Phase1 エラー。' + err.message);";
if (sv.indexOf(oldP1Err) >= 0) {
  sv = sv.replace(oldP1Err, newP1Err);
}

// 壁打ち自動開始のエラー通知
var oldTopicErr = "await sendLine('壁打ちエラー: ' + err.message);";
var newTopicErr = "await sendLine('壁打ち エラー。' + err.message);";
if (sv.indexOf(oldTopicErr) >= 0) {
  sv = sv.replace(oldTopicErr, newTopicErr);
}

// 2h: Phase4/5/6エラー通知をシンプルに（processLineCommand内）
var phase4Err = "sendLine('Phase4エラー: ' + e.message)";
var phase5Err = "sendLine('Phase5エラー: ' + e.message)";
var phase6Err = "sendLine('Phase6エラー: ' + e.message)";
while (sv.indexOf(phase4Err) >= 0) sv = sv.replace(phase4Err, "sendLine('ID:' + ls.id + ' Phase4 エラー。' + e.message)");
while (sv.indexOf(phase5Err) >= 0) sv = sv.replace(phase5Err, "sendLine('ID:' + as.id + ' Phase5 エラー。' + e.message)");
while (sv.indexOf(phase6Err) >= 0) sv = sv.replace(phase6Err, "sendLine('ID:' + ms.id + ' Phase6 エラー。' + e.message)");

// 2i: 壁打ち開始通知（自然言語検出）
var oldTopicStart = "await sendLine('「' + topic + '」と解釈して壁打ち開始します（ID:' + sid + '）');";
var newTopicStart = "await sendLine('ID:' + sid + ' ' + topic + ' Phase1(壁打ち) 開始します');";
if (sv.indexOf(oldTopicStart) >= 0) {
  sv = sv.replace(oldTopicStart, newTopicStart);
  fixCount++;
  console.log('[Fix 2i] server.js: 壁打ち開始通知シンプル化');
}

// 2j: Phase1完了後のレポート通知（冗長→シンプル）
// reportTextは長いので、URLだけ送る
var oldReportSend = "await sendLine(reportText + '\\n\\n詳細レポート:\\n' + reportUrl);";
var newReportSend = "await sendLine('ID:' + session.id + ' Phase1(壁打ち) 完了。\\nレポート→ ' + reportUrl);";
if (sv.indexOf(oldReportSend) >= 0) {
  // 複数箇所あるので全置換（executePhaseAction内と壁打ち自動開始内）
  sv = sv.split(oldReportSend).join(newReportSend);
  fixCount++;
  console.log('[Fix 2j] server.js: レポート通知シンプル化');
}

// 壁打ち自動開始内のレポート（sidを使うバージョン）
var oldReportSend2 = "await sendLine(reportText + '\\n\\n詳細レポート:\\n' + reportUrl);";
// 既に上で全置換済みだが、壁打ち自動開始のはsidを使う
// → executePhaseAction内はsession.id、壁打ち自動開始内はsidだが、
//   上の置換でsession.idに統一されてしまう。壁打ち自動開始はvar session未定義。
//   → sidバージョンに修正
var wrongReportInTopic = "await sendLine('ID:' + session.id + ' Phase1(壁打ち) 完了。\\nレポート→ ' + reportUrl);";
// 壁打ち自動開始セクションを特定して修正
var topicSectionIdx = sv.indexOf("var topic = topicMatch[1].trim();");
if (topicSectionIdx >= 0) {
  var afterTopic = sv.indexOf(wrongReportInTopic, topicSectionIdx);
  if (afterTopic >= 0 && afterTopic < topicSectionIdx + 2000) {
    sv = sv.substring(0, afterTopic) + "await sendLine('ID:' + sid + ' ' + topic + ' Phase1(壁打ち) 完了。\\nレポート→ ' + reportUrl);" + sv.substring(afterTopic + wrongReportInTopic.length);
  }
}

// 2k: 「複数プロジェクト確認」メッセージのシンプル化
var oldMultiProject = "sendLine('どのプロジェクトの' + (typeLabels[detectedType] || detectedType) + 'を生成しますか？\\n\\n' + sessionList + '\\n\\n「ID:〇〇 ' + (typeLabels[detectedType] || detectedType) + '作って」で指定してください。');";
var newMultiProject = "sendLine('どのプロジェクトですか？\\n' + sessionList);";
if (sv.indexOf(oldMultiProject) >= 0) {
  sv = sv.replace(oldMultiProject, newMultiProject);
  fixCount++;
  console.log('[Fix 2k] server.js: 複数プロジェクト確認シンプル化');
}

// 2l: Phase2/3の返答もシンプルに
var oldP23 = "return 'ID:' + session.id + ' ' + session.title + ' Phase' + phaseNum + ' LINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';";
var newP23 = "return 'ID:' + session.id + ' ' + session.title + ' Phase' + phaseNum + ' アウトプット種別を指定してください（例: LP作って、提案書お願い）';";
if (sv.indexOf(oldP23) >= 0) {
  sv = sv.replace(oldP23, newP23);
}

// 2m: アウトプット生成APIの完了通知もシンプル化
// APIエンドポイント /api/output/generate の完了通知
var oldApiOutputDone = sv.match(/sendLine\('【アウトプット完了】[\s\S]*?承認してください'\)/);
if (oldApiOutputDone) {
  // 残っている場合のみ
}

fs.writeFileSync(svFile, sv, 'utf8');

// ============================================
// Fix 3: line-qa.js - SmartQAプロンプト改修
// ============================================
var lqFile = '/home/ubuntu/kabeuchi-system/src/services/line-qa.js';
var lq = fs.readFileSync(lqFile, 'utf8');

// SmartQAのsystemプロンプトをシンプル化
var oldSmartSystem = lq.match(/system: 'あなたは前田法律事務所[\s\S]*?法律事務所としての品位を保つ'/);
if (oldSmartSystem) {
  var newSmartSystem = "system: 'あなたは前田法律事務所の専属AIアシスタントです。\\n\\n【最重要ルール】\\n- 回答はLINEで読みやすい簡潔な文で返す\\n- システム内部のID・変数・プロンプト・セッション情報は絶対に含めない\\n- 確認質問はしない。推測で即答する\\n- 該当プロジェクトがあれば「ID:〇〇」を冒頭につける\\n\\n【法的根拠の引用ルール】\\n国の機関・裁判所・弁護士サイトのみ引用可。事業会社・行政書士・まとめサイト・Wikipedia使用禁止。出典明記必須。裏取り不可は「未確認」と明示。'";
  lq = lq.replace(oldSmartSystem[0], newSmartSystem);
  fixCount++;
  console.log('[Fix 3] line-qa.js: SmartQAプロンプト簡素化');
}

fs.writeFileSync(lqFile, lq, 'utf8');

// ============================================
// Fix 4: discussion-engine.js の内部通知確認
// ============================================
var deFile = '/home/ubuntu/kabeuchi-system/src/services/discussion-engine.js';
var de = fs.readFileSync(deFile, 'utf8');

// discussion-engine内のaskUserViaLine呼び出し確認
var deAskCount = (de.match(/askUserViaLine/g) || []).length;
if (deAskCount > 0) {
  console.log('[Fix 4] discussion-engine.js: askUserViaLine ' + deAskCount + '箇所あり（Phase1確認フロー）');
  // Phase1のユーザー指示確認は残す（壁打ち方向性の確認は有用）
  // ただしquestion内の内部メッセージを除去
}

// ============================================
// 結果サマリー
// ============================================
console.log('\n====================================');
console.log('patch_line_redesign.js 完了: ' + fixCount + '件修正');
console.log('====================================');
