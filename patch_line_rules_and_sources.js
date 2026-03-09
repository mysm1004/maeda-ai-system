// patch_line_rules_and_sources.js
// 【1】LINEからの指示解釈ルール変更
// 【2】法的根拠・裏取りのソース制限
var fs = require('fs');

// ============================================
// Part A: server.js の processLineCommand を改修
// ============================================
var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');
var fixes = 0;

// --------------------------------------------------------
// A-1. processLineCommand の冒頭に「スマート指示解釈」を追加
//      IDやプロジェクト名 + フェーズ指示を自動判定して即実行
// --------------------------------------------------------
var oldFuncStart = "async function processLineCommand(text, userId) {\n  var t = text.trim();\n\n  // 承認";
if (server.indexOf(oldFuncStart) >= 0 && server.indexOf('resolveSmartInstruction') === -1) {
  var smartBlock = "async function processLineCommand(text, userId) {\n" +
"  var t = text.trim();\n\n" +
"  // =======================================\n" +
"  // スマート指示解釈（短い指示でも即実行）\n" +
"  // =======================================\n" +
"  var smartResult = resolveSmartInstruction(t);\n" +
"  if (smartResult) return smartResult;\n\n" +
"  // 「違う」で直前の解釈を修正\n" +
"  if (t === '違う' || t.startsWith('違う。') || t.startsWith('違う、') || t === 'ちがう') {\n" +
"    global._lastSmartInterpretation = null;\n" +
"    return '了解しました。改めてご指示ください。\\n例: 「ID3 フェーズ2へ」「残業代でフェーズ1」「交通事故 LP作って」';\n" +
"  }\n\n" +
"  // 承認";

  server = server.replace(oldFuncStart, smartBlock);
  fixes++;
  console.log('[Fix A-1] processLineCommand冒頭にスマート指示解釈追加');
} else {
  console.log('[Fix A-1] スキップ');
}

// --------------------------------------------------------
// A-2. resolveSmartInstruction 関数を processLineCommand の直前に挿入
// --------------------------------------------------------
var insertPoint = "async function processLineCommand(text, userId) {";
if (server.indexOf(insertPoint) >= 0 && server.indexOf('function resolveSmartInstruction') === -1) {
  var resolveFunc = "\n// ============================================\n" +
"// スマート指示解釈: 短い指示から意図を推測して即実行\n" +
"// ============================================\n" +
"function resolveSmartInstruction(t) {\n" +
"  var allSessions = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep','completed') ORDER BY updated_at DESC LIMIT 20\").all();\n" +
"  if (allSessions.length === 0) return null;\n\n" +
"  // ID指定: 「ID3」「ID3続けて」「ID3 フェーズ2へ」\n" +
"  var idMatch = t.match(/(?:ID|id|ＩＤ)\\s*(\\d+)/i);\n" +
"  var targetSession = null;\n" +
"  var remainingText = t;\n\n" +
"  if (idMatch) {\n" +
"    var sid = parseInt(idMatch[1]);\n" +
"    targetSession = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);\n" +
"    remainingText = t.replace(idMatch[0], '').trim();\n" +
"  }\n\n" +
"  // プロジェクト名キーワードでマッチ\n" +
"  if (!targetSession) {\n" +
"    for (var i = 0; i < allSessions.length; i++) {\n" +
"      var s = allSessions[i];\n" +
"      var titleWords = s.title.replace(/[\\s　]/g, '').toLowerCase();\n" +
"      var tLower = t.replace(/[\\s　]/g, '').toLowerCase();\n" +
"      // タイトルの主要キーワード（3文字以上）がメッセージに含まれるか\n" +
"      var keywords = s.title.split(/[\\s　・×/]/g).filter(function(w) { return w.length >= 2; });\n" +
"      for (var k = 0; k < keywords.length; k++) {\n" +
"        if (tLower.indexOf(keywords[k].toLowerCase()) >= 0) {\n" +
"          targetSession = s;\n" +
"          break;\n" +
"        }\n" +
"      }\n" +
"      if (targetSession) break;\n" +
"    }\n" +
"  }\n\n" +
"  // フェーズ指示を検出\n" +
"  var phaseMatch = t.match(/フェーズ\\s*(\\d+)|phase\\s*(\\d+)/i);\n" +
"  var phaseNum = phaseMatch ? parseInt(phaseMatch[1] || phaseMatch[2]) : null;\n\n" +
"  // 「続けて」「続き」「再開」\n" +
"  var isContinue = /続けて|続き|再開|進めて|やって|開始|始めて|スタート/.test(t);\n" +
"  // 「〜へ」「〜に進む」\n" +
"  var isAdvance = /へ$|に進む|に進めて|に移行|開始して/.test(t);\n\n" +
"  // セッション特定なし → null（通常フロー）\n" +
"  if (!targetSession && !phaseNum && !isContinue) return null;\n\n" +
"  // セッションが特定できない場合は直近を使用\n" +
"  if (!targetSession) {\n" +
"    targetSession = allSessions[0]; // 直近更新のセッション\n" +
"  }\n\n" +
"  // フェーズ指示 + セッション特定 → 即実行\n" +
"  if (phaseNum && targetSession) {\n" +
"    return executePhaseAction(targetSession, phaseNum, isAdvance, isContinue);\n" +
"  }\n\n" +
"  // セッション特定 + 続行指示\n" +
"  if (targetSession && isContinue) {\n" +
"    return executePhaseAction(targetSession, targetSession.phase, false, true);\n" +
"  }\n\n" +
"  // セッション特定のみ（フェーズ指示なし）→ 現在フェーズを続行と解釈\n" +
"  if (targetSession && idMatch) {\n" +
"    return executePhaseAction(targetSession, targetSession.phase, false, true);\n" +
"  }\n\n" +
"  return null; // 通常フローへ\n" +
"}\n\n" +
"function executePhaseAction(session, phaseNum, isAdvance, isContinue) {\n" +
"  var phaseLabelsExec = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};\n" +
"  var prefix = '「' + session.title + '」Phase' + phaseNum + '(' + (phaseLabelsExec[phaseNum] || '') + ') ';\n\n" +
"  // 現在フェーズと異なる場合 → フェーズ変更して実行\n" +
"  if (session.phase !== phaseNum && isAdvance) {\n" +
"    db.prepare('UPDATE sessions SET phase = ?, current_round = 0, status = ? WHERE id = ?').run(phaseNum, 'active', session.id);\n" +
"    prefix = '「' + session.title + '」をPhase' + phaseNum + 'に進めて' + (phaseLabelsExec[phaseNum] || '') + 'を ';\n" +
"  }\n\n" +
"  // セッション状態をactiveに\n" +
"  db.prepare(\"UPDATE sessions SET status = 'active', updated_at = datetime('now') WHERE id = ?\").run(session.id);\n\n" +
"  global._lastSmartInterpretation = { sessionId: session.id, phase: phaseNum };\n\n" +
"  switch (phaseNum) {\n" +
"    case 1:\n" +
"      // Phase1壁打ち続行\n" +
"      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(session.id, 'user');\n" +
"      var nextRound = (lr && lr.mr ? lr.mr : 0) + 1;\n" +
"      if (nextRound > 8) {\n" +
"        return prefix + '全8ステップ完了済みです。「フェーズ2へ」で次フェーズに進めます。';\n" +
"      }\n" +
"      // 非同期で壁打ち実行\n" +
"      (async function() {\n" +
"        try {\n" +
"          for (var r = nextRound; r <= 8; r++) {\n" +
"            await engine.runStep(session.id, session.topic, r, session.research_data, false);\n" +
"            if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');\n" +
"          }\n" +
"          var summary = await engine.generateFinalSummary(session.id);\n" +
"          try {\n" +
"            var report = await engine.generatePhase1Report(session.id);\n" +
"            var reportUrl = generatePhase1ReportHTML(report, session.id);\n" +
"            var reportText = formatPhase1ReportText(report);\n" +
"            await sendLine(reportText + '\\n\\n詳細レポート:\\n' + reportUrl);\n" +
"          } catch(e) { console.error('[Phase1Report]', e.message); }\n" +
"          advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n" +
"        } catch(err) {\n" +
"          console.error('[Smart Phase1]', err.message);\n" +
"          await sendLine('Phase1エラー: ' + err.message);\n" +
"        }\n" +
"      })();\n" +
"      return prefix + '開始します（Step' + nextRound + '/8から）';\n\n" +
"    case 2:\n" +
"    case 3:\n" +
"      return prefix + '実行します。\\nLINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';\n\n" +
"    case 4:\n" +
"      listGen.generateFull(session.id, false).then(function() {\n" +
"        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[Phase4]', e); sendLine('Phase4エラー: ' + e.message); });\n" +
"      return prefix + '開始します。';\n\n" +
"    case 5:\n" +
"      adDesigner.generateFull(session.id, false).then(function() {\n" +
"        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[Phase5]', e); sendLine('Phase5エラー: ' + e.message); });\n" +
"      return prefix + '開始します。';\n\n" +
"    case 6:\n" +
"      mediaOptimizer.generateFull(session.id, false).then(function() {\n" +
"        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[Phase6]', e); sendLine('Phase6エラー: ' + e.message); });\n" +
"      return prefix + '開始します。';\n\n" +
"    default:\n" +
"      return prefix + 'は不明なフェーズです。';\n" +
"  }\n" +
"}\n\n";

  server = server.replace(insertPoint, resolveFunc + insertPoint);
  fixes++;
  console.log('[Fix A-2] resolveSmartInstruction + executePhaseAction 関数追加');
} else {
  console.log('[Fix A-2] スキップ');
}

// --------------------------------------------------------
// A-3. SmartQAのシステムプロンプトを改修
//      「指示解釈→即実行」「確認質問最小限」「推測で動く」ルール追加
// --------------------------------------------------------
var oldSmartQAPrompt = "あなたは前田法律事務所の専属AIアシスタントです。前田弁護士からのLINE質問に、現在のプロジェクト状況・過去の議論・記憶DBを踏まえて簡潔に回答してください。\\n\\n注意:\\n- LINEで読みやすい簡潔な回答（300文字以内推奨）\\n- 該当セッションIDがあれば明示\\n- 不明な場合は正直に「情報が不足しています」と言う\\n- 法律事務所としての品位を保つ";
if (server.indexOf(oldSmartQAPrompt) >= 0) {
  // server.jsの中のSmartQA呼び出し部分のプロンプトを差し替え
  // ただしSmartQAのsystem promptはline-qa.jsにある
  console.log('[Fix A-3] server.js内のSmartQAプロンプトはline-qa.jsで改修（後述）');
} else {
  console.log('[Fix A-3] スキップ（server.js内にSmartQAプロンプトなし→line-qa.jsで対応）');
}

// --------------------------------------------------------
// A-4. 「〇〇作って」「〇〇について壁打ち」等の自然言語指示も即実行に
//      SmartQA到達前にoutputType推測を追加
// --------------------------------------------------------
var oldSmartQASection = "  // スマートQ&A（Claudeがプロジェクト参照して回答）\n  try {\n    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));";
if (server.indexOf(oldSmartQASection) >= 0 && server.indexOf('detectOutputRequest') === -1) {
  var outputDetect = "  // アウトプット生成指示の自然言語検出\n" +
"  var outputDetected = detectOutputRequest(t);\n" +
"  if (outputDetected) return outputDetected;\n\n" +
"  // 壁打ち開始指示の検出\n" +
"  var topicMatch = t.match(/(.+?)(?:について壁打ち|で壁打ち|壁打ちして|について議論|を検討)/);\n" +
"  if (topicMatch) {\n" +
"    var topic = topicMatch[1].trim();\n" +
"    (async function() {\n" +
"      try {\n" +
"        var sid = engine.createSession(topic, topic);\n" +
"        var research = await engine.runResearch(topic);\n" +
"        db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);\n" +
"        await sendLine('「' + topic + '」と解釈して壁打ち開始します（ID:' + sid + '）');\n" +
"        for (var r = 1; r <= 8; r++) {\n" +
"          await engine.runStep(sid, topic, r, research, false);\n" +
"          if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');\n" +
"        }\n" +
"        var summary = await engine.generateFinalSummary(sid);\n" +
"        try {\n" +
"          var report = await engine.generatePhase1Report(sid);\n" +
"          var reportUrl = generatePhase1ReportHTML(report, sid);\n" +
"          var reportText = formatPhase1ReportText(report);\n" +
"          await sendLine(reportText + '\\n\\n詳細レポート:\\n' + reportUrl);\n" +
"        } catch(e) { console.error(e); }\n" +
"        advanceToNextPhase(sid, false).catch(function(e) { console.error(e); });\n" +
"      } catch(err) {\n" +
"        console.error('[壁打ち自動開始]', err.message);\n" +
"        await sendLine('壁打ちエラー: ' + err.message);\n" +
"      }\n" +
"    })();\n" +
"    return '「' + topic + '」について壁打ち開始します。';\n" +
"  }\n\n" +
"  // スマートQ&A（Claudeがプロジェクト参照して回答）\n  try {\n    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));";

  server = server.replace(oldSmartQASection, outputDetect);
  fixes++;
  console.log('[Fix A-4] アウトプット指示・壁打ち自然言語検出追加');
} else {
  console.log('[Fix A-4] スキップ');
}

// --------------------------------------------------------
// A-5. detectOutputRequest 関数追加（processLineCommandの直前）
// --------------------------------------------------------
if (server.indexOf('function detectOutputRequest') === -1) {
  var detectFunc = "\n// ============================================\n" +
"// アウトプット指示検出: 「LP作って」「提案書お願い」等\n" +
"// ============================================\n" +
"function detectOutputRequest(t) {\n" +
"  var outputMap = {\n" +
"    'lp': /LP|ランディング|ＬＰ/i,\n" +
"    'proposal': /提案書|企画書/,\n" +
"    'dm': /^DM|ダイレクトメール|ＤＭ/i,\n" +
"    'sales_script': /営業トーク|セールススクリプト|電話スクリプト|テレアポ/,\n" +
"    'blog': /ブログ|記事/,\n" +
"    'sns_post': /SNS|インスタ|ツイート/i,\n" +
"    'banner': /バナー|広告画像/,\n" +
"    'press_release': /プレスリリース|PR/,\n" +
"    'newsletter': /ニュースレター|メルマガ/,\n" +
"    'seo_article': /SEO|検索対策/i,\n" +
"    'youtube_script': /YouTube|動画|ユーチューブ/i,\n" +
"    'seminar': /セミナー|ウェビナー/,\n" +
"    'company_profile': /会社案内|事務所案内/,\n" +
"    'legal_content': /法律コンテンツ|リーガル/,\n" +
"    'fax': /FAX|ファックス|ＦＡＸ/i,\n" +
"    'email': /営業メール|メール文/\n" +
"  };\n\n" +
"  // 「〇〇作って」「〇〇お願い」「〇〇生成」等のパターン\n" +
"  var actionPattern = /作って|お願い|生成|作成|出力|書いて|頼む|よろしく|ちょうだい/;\n" +
"  if (!actionPattern.test(t)) return null;\n\n" +
"  var detectedType = null;\n" +
"  var typeKeys = Object.keys(outputMap);\n" +
"  for (var i = 0; i < typeKeys.length; i++) {\n" +
"    if (outputMap[typeKeys[i]].test(t)) {\n" +
"      detectedType = typeKeys[i];\n" +
"      break;\n" +
"    }\n" +
"  }\n" +
"  if (!detectedType) return null;\n\n" +
"  // セッション特定（ID指定 or キーワード or 直近）\n" +
"  var idMatch = t.match(/(?:ID|id)\\s*(\\d+)/i);\n" +
"  var session = null;\n" +
"  if (idMatch) {\n" +
"    session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(parseInt(idMatch[1]));\n" +
"  }\n" +
"  if (!session) {\n" +
"    // 直近のPhase1完了済みセッションを使用\n" +
"    session = db.prepare(\"SELECT * FROM sessions WHERE phase >= 1 AND status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"  }\n" +
"  if (!session) return null;\n\n" +
"  var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', press_release:'プレスリリース', newsletter:'ニュースレター', seo_article:'SEO記事', youtube_script:'YouTube台本', seminar:'セミナー資料', company_profile:'会社案内', legal_content:'法律コンテンツ', fax:'FAX DM', email:'営業メール'};\n\n" +
"  // 非同期でアウトプット生成\n" +
"  outputGen.generateFull(session.id, detectedType, {}).then(function(result) {\n" +
"    // HTML生成 + LINE通知\n" +
"    var htmlFile = generateOutputHTML(result, detectedType, session.id);\n" +
"    sendLine('【アウトプット完了】' + (typeLabels[detectedType] || detectedType) + '\\nセッション: ' + session.title + '\\n推奨: パターン' + (result.recommended || 'A') + '\\n\\n確認: https://176-32-87-118.sslip.io/outputs/' + htmlFile + '\\n\\n「パターンA採用」等で承認してください');\n" +
"  }).catch(function(e) {\n" +
"    console.error('[output detect]', e);\n" +
"    sendLine('アウトプット生成エラー: ' + e.message);\n" +
"  });\n\n" +
"  return '「' + session.title + '」の' + (typeLabels[detectedType] || detectedType) + 'と解釈して生成開始します。';\n" +
"}\n\n";

  // resolveSmartInstructionの前に挿入
  var insertBefore = "// ============================================\n// スマート指示解釈";
  if (server.indexOf(insertBefore) >= 0) {
    server = server.replace(insertBefore, detectFunc + insertBefore);
    fixes++;
    console.log('[Fix A-5] detectOutputRequest 関数追加');
  } else {
    console.log('[Fix A-5] スキップ（挿入位置不明）');
  }
} else {
  console.log('[Fix A-5] スキップ（既に存在）');
}

fs.writeFileSync(serverFile, server, 'utf8');
console.log('[Part A] server.js改修完了: ' + fixes + '件');

// ============================================
// Part B: line-qa.js の SmartQA システムプロンプト改修
// ============================================
var lineQAFile = '/home/ubuntu/kabeuchi-system/src/services/line-qa.js';
var lineQA = fs.readFileSync(lineQAFile, 'utf8');
var fixesB = 0;

var oldQAPrompt = "system: 'あなたは前田法律事務所の専属AIアシスタントです。前田弁護士からのLINE質問に、現在のプロジェクト状況・過去の議論・記憶DBを踏まえて簡潔に回答してください。\\n\\n注意:\\n- LINEで読みやすい簡潔な回答（300文字以内推奨）\\n- 該当セッションIDがあれば明示\\n- 不明な場合は正直に「情報が不足しています」と言う\\n- 法律事務所としての品位を保つ'";

if (lineQA.indexOf(oldQAPrompt) >= 0) {
  var newQAPrompt = "system: 'あなたは前田法律事務所の専属AIアシスタントです。前田弁護士からのLINE質問に即座に対応してください。\\n\\n【行動原則】\\n- 確認質問は最小限。曖昧な指示は推測で動き「〇〇と解釈して進めます」と一言添えるだけ\\n- プロジェクト名やIDとフェーズが含まれていれば即実行の指示と判断\\n- 複数プロジェクト進行中でも、メッセージに最も関連するプロジェクトを自動判断\\n- 短い指示（「フェーズ1開始」「ID4続けて」等）でも即動く\\n- 「違う」と返信されたら即修正する\\n\\n【法的根拠の引用ルール】\\n法的根拠を述べる際は以下のソースのみ使用:\\n- 国の機関: 法務省・厚生労働省・国税庁・裁判所・内閣府等の公式サイト\\n- 裁判所: 判例データベース・裁判所ウェブサイト\\n- 行政機関: 各省庁・都道府県・市区町村の公式サイト\\n- 弁護士・法律事務所の公式サイト（弁護士資格保有者が執筆）\\n- 法律専門家による学術論文・法律雑誌\\n- 日弁連・各弁護士会の公式見解\\n\\n使用禁止: 事業会社サイト、行政書士・司法書士サイト、まとめサイト・ブログ、Wikipedia、信頼性不明サイト\\nソース引用時は出典（URL・資料名・発行機関）を明記。裏取りできない情報は「未確認」と明示。\\n\\n【回答形式】\\n- LINEで読みやすい簡潔な回答\\n- 該当セッションIDがあれば明示\\n- 法律事務所としての品位を保つ'";

  lineQA = lineQA.replace(oldQAPrompt, newQAPrompt);
  fixesB++;
  console.log('[Fix B-1] SmartQA systemプロンプト改修');
} else {
  console.log('[Fix B-1] スキップ（パターン不一致）');
}

fs.writeFileSync(lineQAFile, lineQA, 'utf8');
console.log('[Part B] line-qa.js改修完了: ' + fixesB + '件');

// ============================================
// Part C: discussion-engine.js の全AIプロンプトにソース制限ルール注入
// ============================================
var engineFile = '/home/ubuntu/kabeuchi-system/src/services/discussion-engine.js';
var engine = fs.readFileSync(engineFile, 'utf8');
var fixesC = 0;

// runResearchのシステムプロンプトにソース制限を追加
var oldResearchPrompt = "system: 'あなたはマーケティングリサーチの専門家です。事務所資料と過去案件を参照しつつ事前調査レポートを作成してください。'";
if (engine.indexOf(oldResearchPrompt) >= 0) {
  var newResearchPrompt = "system: 'あなたはマーケティングリサーチの専門家です。事務所資料と過去案件を参照しつつ事前調査レポートを作成してください。\\n\\n【法的根拠の引用ルール】法的根拠を述べる際は信頼できるソースのみ使用すること。使用可能: 法務省・厚生労働省・国税庁・裁判所・内閣府等の国の機関、裁判所判例DB、各省庁・自治体公式サイト、弁護士・法律事務所の公式サイト、法律専門家の学術論文、日弁連・弁護士会の公式見解。使用禁止: 事業会社サイト、行政書士・司法書士サイト、まとめサイト・ブログ・個人サイト、Wikipedia。ソース引用時は出典（URL・資料名・発行機関）を明記。裏取りできない情報は「未確認」と明示。'";
  engine = engine.replace(oldResearchPrompt, newResearchPrompt);
  fixesC++;
  console.log('[Fix C-1] runResearch プロンプトにソース制限追加');
}

// 最終統合のシステムプロンプトにソース制限を追加
var oldFinalPrompt = "system: 'あなたは最終統合者です。全批判を受け止め穴を全て潰した最強のアイデアを提示してください。各批判に対する具体的解決策を必ず示すこと。前田さんの好み: ' + JSON.stringify(memory)";
if (engine.indexOf(oldFinalPrompt) >= 0) {
  var newFinalPrompt = "system: 'あなたは最終統合者です。全批判を受け止め穴を全て潰した最強のアイデアを提示してください。各批判に対する具体的解決策を必ず示すこと。\\n\\n【法的根拠の引用ルール】法的根拠を述べる際は信頼できるソースのみ使用。使用可能: 国の機関（法務省・厚労省・国税庁・裁判所等）、裁判所判例DB、行政機関公式サイト、弁護士の公式サイト、法律学術論文、日弁連公式見解。使用禁止: 事業会社サイト、行政書士・司法書士サイト、まとめサイト、Wikipedia。ソース引用時は出典明記。裏取り不可情報は「未確認」と明示。\\n\\n前田さんの好み: ' + JSON.stringify(memory)";
  engine = engine.replace(oldFinalPrompt, newFinalPrompt);
  fixesC++;
  console.log('[Fix C-2] 最終統合プロンプトにソース制限追加');
}

// Phase1レポート生成のシステムプロンプトにソース制限追加
var oldReportPrompt = "必ず以下のJSON形式で出力してください:";
if (engine.indexOf(oldReportPrompt) >= 0 && engine.indexOf('裏取りできない情報は「未確認」') === -1) {
  var newReportPrompt = "【法的根拠の引用ルール】法的根拠は国の機関・裁判所・弁護士サイト・学術論文・日弁連のみ引用可。事業会社・行政書士・まとめサイト・Wikipedia禁止。出典明記。裏取りできない情報は「未確認」と明示。\\n\\n必ず以下のJSON形式で出力してください:";
  engine = engine.replace(oldReportPrompt, newReportPrompt);
  fixesC++;
  console.log('[Fix C-3] Phase1レポートプロンプトにソース制限追加');
}

fs.writeFileSync(engineFile, engine, 'utf8');
console.log('[Part C] discussion-engine.js改修完了: ' + fixesC + '件');

// ============================================
// Part D: output-generator.js のAIプロンプトにソース制限追加
// ============================================
var outputGenFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var outputGen = fs.readFileSync(outputGenFile, 'utf8');
var fixesD = 0;

// _getTypeInstructions or メインプロンプトにソース制限を追加
// generateFull内の最初のClaude呼び出し（Phase2 Step1）のsystemプロンプトを探す
var oldOutputSystem = "あなたは前田法律事務所の";
var sourceRule = "\\n\\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所・内閣府等）、裁判所判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社サイト・行政書士・司法書士サイト・まとめサイト・ブログ・Wikipedia使用禁止。ソース引用時は出典（URL・資料名・発行機関）を明記。裏取りできない情報は「未確認」と明示。";

// output-generator.js内の主要systemプロンプトにソース制限を追加
// 「法律事務所としての品位」のような既存のプロンプト末尾を探してソース制限を追加
var oldOutputQuality = "法律事務所としての品位を保ち";
if (outputGen.indexOf(oldOutputQuality) >= 0 && outputGen.indexOf('裏取りできない情報は「未確認」') === -1) {
  outputGen = outputGen.replace(oldOutputQuality, "法律事務所としての品位を保ち" + sourceRule);
  fixesD++;
  console.log('[Fix D-1] output-generator.js メインプロンプトにソース制限追加');
} else {
  // 別のアプローチ: 全Claude呼び出しに共通ルールを付与
  // _getQualityRulesがあればそこに追加
  if (outputGen.indexOf('_getQualityRules') >= 0 && outputGen.indexOf('裏取りできない情報は「未確認」') === -1) {
    var oldQualityFunc = 'OutputGenerator.prototype._getQualityRules = function()';
    if (outputGen.indexOf(oldQualityFunc) >= 0) {
      var oldQualityReturn = "return rules;";
      // 最初のreturn rules;の前にソース制限を追加
      outputGen = outputGen.replace(
        oldQualityReturn,
        "rules += '\\n\\n【法的根拠の引用ルール】法的根拠は国の機関・裁判所・弁護士公式サイト・学術論文・日弁連のみ引用可。事業会社・行政書士・まとめサイト・Wikipedia禁止。出典明記。裏取り不可は「未確認」と明示。';\n  " + oldQualityReturn
      );
      fixesD++;
      console.log('[Fix D-1b] _getQualityRules にソース制限追加');
    }
  }
}

fs.writeFileSync(outputGenFile, outputGen, 'utf8');
console.log('[Part D] output-generator.js改修完了: ' + fixesD + '件');

// ============================================
// Part E: list-generator.js / ad-designer.js / media-optimizer.js にもソース制限追加
// ============================================
var serviceFiles = [
  { path: '/home/ubuntu/kabeuchi-system/src/services/list-generator.js', name: 'list-generator.js' },
  { path: '/home/ubuntu/kabeuchi-system/src/services/ad-designer.js', name: 'ad-designer.js' },
  { path: '/home/ubuntu/kabeuchi-system/src/services/media-optimizer.js', name: 'media-optimizer.js' }
];

var fixesE = 0;
for (var i = 0; i < serviceFiles.length; i++) {
  var sf = serviceFiles[i];
  var code = fs.readFileSync(sf.path, 'utf8');
  if (code.indexOf('裏取りできない情報は「未確認」') === -1) {
    // 法律事務所のAIを示すプロンプト部分を検索
    var lawOfficePattern = '前田法律事務所の';
    var firstOccurrence = code.indexOf(lawOfficePattern);
    if (firstOccurrence >= 0) {
      // 最初のsystemBaseの行末にソース制限を追加
      var systemBasePattern = "var systemBase = ";
      var sbIdx = code.indexOf(systemBasePattern);
      if (sbIdx >= 0) {
        // systemBaseの最後の';'の前にソース制限を追加
        var afterSB = code.indexOf("';", sbIdx);
        if (afterSB >= 0) {
          // 既にsourceRuleと同じ内容がなければ追加
          var insertRule = "\\n\\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所等）、判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社・行政書士・司法書士・まとめサイト・Wikipedia使用禁止。出典明記。裏取り不可は「未確認」と明示。";
          code = code.substring(0, afterSB) + insertRule + code.substring(afterSB);
          fs.writeFileSync(sf.path, code, 'utf8');
          fixesE++;
          console.log('[Fix E] ' + sf.name + ' にソース制限追加');
        }
      }
    }
  } else {
    console.log('[Fix E] ' + sf.name + ' スキップ（既に存在）');
  }
}
console.log('[Part E] Phase4/5/6サービスファイル改修完了: ' + fixesE + '件');

console.log('\n============================');
console.log('patch_line_rules_and_sources.js 完了');
console.log('  server.js: ' + fixes + '件');
console.log('  line-qa.js: ' + fixesB + '件');
console.log('  discussion-engine.js: ' + fixesC + '件');
console.log('  output-generator.js: ' + fixesD + '件');
console.log('  Phase4/5/6サービス: ' + fixesE + '件');
console.log('============================');
