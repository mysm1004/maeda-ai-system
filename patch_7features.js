// 7大機能パッチ
// schema.js + server.js を一括更新
// Feature 3: 優先度, Feature 4: 並列処理, Feature 2: 粒度承認,
// Feature 1: ダッシュボード, Feature 5: 品質スコア, Feature 6: A/Bテスト, Feature 7: 競合モニタリング

var fs = require('fs');

// ============================================
// 1. schema.js 変更
// ============================================
var schemaFile = '/home/ubuntu/kabeuchi-system/src/db/schema.js';
var schema = fs.readFileSync(schemaFile, 'utf8');

if (schema.indexOf('quality_scores') === -1) {
  var returnDb = '  return db;';
  var newTables = '';
  newTables += '  // Feature 3: 優先度\n';
  newTables += '  try { db.exec("ALTER TABLE sessions ADD COLUMN priority INTEGER DEFAULT 5"); } catch(e) {}\n';
  newTables += '  try { db.exec("ALTER TABLE sessions ADD COLUMN deadline TEXT"); } catch(e) {}\n';
  newTables += '\n';
  newTables += '  // Feature 5: 品質スコア\n';
  newTables += '  db.exec("CREATE TABLE IF NOT EXISTS quality_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, output_queue_id INTEGER, session_id INTEGER, pattern TEXT, score_appeal INTEGER, score_differentiation INTEGER, score_format INTEGER, score_impact INTEGER, total_score INTEGER, improvement_points TEXT, scored_at DATETIME DEFAULT CURRENT_TIMESTAMP)");\n';
  newTables += '\n';
  newTables += '  // Feature 6: A/Bテスト\n';
  newTables += '  db.exec("CREATE TABLE IF NOT EXISTS ab_tests (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id INTEGER, name TEXT, variant_a_queue_id INTEGER, variant_b_queue_id INTEGER, comparison_result TEXT, winner TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");\n';
  newTables += '\n';
  newTables += '  // Feature 7: 競合モニタリング\n';
  newTables += '  db.exec("CREATE TABLE IF NOT EXISTS competitors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, url TEXT NOT NULL, check_type TEXT DEFAULT \'lp\', last_content_hash TEXT, last_checked_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");\n';
  newTables += '  db.exec("CREATE TABLE IF NOT EXISTS competitor_changes (id INTEGER PRIMARY KEY AUTOINCREMENT, competitor_id INTEGER, change_summary TEXT, old_hash TEXT, new_hash TEXT, detected_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (competitor_id) REFERENCES competitors(id))");\n';
  newTables += '\n';

  schema = schema.replace(returnDb, newTables + returnDb);
  fs.writeFileSync(schemaFile, schema, 'utf8');
  console.log('[schema] 7機能テーブル追加完了');
} else {
  console.log('[schema] 既に追加済み');
}

// ============================================
// 2. server.js 変更
// ============================================
var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');

if (server.indexOf('crypto') === -1) {
  // 2a. crypto require追加
  server = server.replace(
    "var Anthropic = require('@anthropic-ai/sdk');",
    "var Anthropic = require('@anthropic-ai/sdk');\nvar crypto = require('crypto');"
  );
  console.log('[server] crypto require追加');
}

// 2b. processLineCommand 全置換
var cmdStart = 'async function processLineCommand(text, userId) {';
var cmdEnd = '\n\n// LINE返信';
var cmdStartIdx = server.indexOf(cmdStart);
var cmdEndIdx = server.indexOf(cmdEnd, cmdStartIdx);

if (cmdStartIdx >= 0 && cmdEndIdx >= 0 && server.indexOf('一覧') === -1) {
  var newCmd = '';
  newCmd += 'async function processLineCommand(text, userId) {\n';
  newCmd += '  var t = text.trim();\n';
  newCmd += '\n';
  newCmd += '  // 承認\n';
  newCmd += '  if (t === \'承認\' || t === \'OK\' || t === \'ok\') {\n';
  newCmd += '    var latest = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();\n';
  newCmd += '    if (latest) {\n';
  newCmd += '      db.prepare(\'INSERT INTO decisions (session_id, decision) VALUES (?,?)\').run(latest.id, \'approved\');\n';
  newCmd += '      return \'承認しました（セッション: \' + latest.title + \'）\';\n';
  newCmd += '    }\n';
  newCmd += '    return \'アクティブなセッションがありません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 却下\n';
  newCmd += '  if (t.startsWith(\'却下\') || t.startsWith(\'NG\')) {\n';
  newCmd += '    var comment = t.replace(/^(却下|NG)\\s*/, \'\');\n';
  newCmd += '    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();\n';
  newCmd += '    if (latest2) {\n';
  newCmd += '      db.prepare(\'INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)\').run(latest2.id, \'rejected\', comment || null);\n';
  newCmd += '      return \'却下しました\' + (comment ? \'（理由: \' + comment + \'）\' : \'\');\n';
  newCmd += '    }\n';
  newCmd += '    return \'アクティブなセッションがありません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 一覧（Feature 1）\n';
  newCmd += '  if (t === \'一覧\' || t === \'リスト\' || t === \'プロジェクト\') {\n';
  newCmd += '    var all = db.prepare("SELECT * FROM sessions WHERE status IN (\'active\',\'sleep\') ORDER BY priority ASC, updated_at DESC").all();\n';
  newCmd += '    if (all.length === 0) return \'アクティブなプロジェクトなし\';\n';
  newCmd += '    return \'プロジェクト一覧\\n\\n\' + all.map(function(s) {\n';
  newCmd += '      var pri = s.priority || 5;\n';
  newCmd += '      var star = pri <= 3 ? \'[優先\' + pri + \'] \' : \'\';\n';
  newCmd += '      var dl = s.deadline ? \' 〆\' + s.deadline : \'\';\n';
  newCmd += '      return star + s.title + \' → Phase\' + s.phase + \' Step\' + s.current_round + \' (\' + s.status + \')\' + dl;\n';
  newCmd += '    }).join(\'\\n\');\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 状態確認（優先度付き）\n';
  newCmd += '  if (t === \'状態\' || t === \'ステータス\') {\n';
  newCmd += '    var sessions = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY priority ASC, updated_at DESC LIMIT 5").all();\n';
  newCmd += '    if (sessions.length === 0) return \'アクティブなセッションなし\';\n';
  newCmd += '    return sessions.map(function(s) {\n';
  newCmd += '      var pri = s.priority || 5;\n';
  newCmd += '      var star = pri <= 3 ? \'[優先\' + pri + \'] \' : \'\';\n';
  newCmd += '      return star + \'[\' + s.id + \'] \' + s.title + \' (Phase\' + s.phase + \' Step\' + s.current_round + \')\';\n';
  newCmd += '    }).join(\'\\n\');\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 優先度設定（Feature 3）: 「優先 セッションID 優先度」\n';
  newCmd += '  var priMatch = t.match(/^優先\\s+(\\d+)\\s+(\\d+)$/);\n';
  newCmd += '  if (priMatch) {\n';
  newCmd += '    var priSid = parseInt(priMatch[1]);\n';
  newCmd += '    var priVal = parseInt(priMatch[2]);\n';
  newCmd += '    db.prepare(\'UPDATE sessions SET priority = ? WHERE id = ?\').run(priVal, priSid);\n';
  newCmd += '    return \'セッション\' + priSid + \'の優先度を\' + priVal + \'に設定しました\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 最優先設定（Feature 3）: 「〇〇を最優先」\n';
  newCmd += '  var topPriMatch = t.match(/(.+)(を最優先|を優先|最優先にして)/);\n';
  newCmd += '  if (topPriMatch) {\n';
  newCmd += '    var keyword = topPriMatch[1].trim();\n';
  newCmd += '    var found = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = \'active\' LIMIT 1").get(\'%\' + keyword + \'%\');\n';
  newCmd += '    if (found) {\n';
  newCmd += '      db.prepare(\'UPDATE sessions SET priority = 1 WHERE id = ?\').run(found.id);\n';
  newCmd += '      return \'「\' + found.title + \'」を最優先(1)に設定しました\';\n';
  newCmd += '    }\n';
  newCmd += '    return \'「\' + keyword + \'」に該当するセッションが見つかりません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 締め切り設定（Feature 3）: 「〇〇は来週」「〇〇は急がない」\n';
  newCmd += '  var deadlineMatch = t.match(/(.+)(は来週|は今月中|は急がない)/);\n';
  newCmd += '  if (deadlineMatch) {\n';
  newCmd += '    var dKeyword = deadlineMatch[1].trim();\n';
  newCmd += '    var dFound = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = \'active\' LIMIT 1").get(\'%\' + dKeyword + \'%\');\n';
  newCmd += '    if (dFound) {\n';
  newCmd += '      if (t.indexOf(\'来週\') >= 0) {\n';
  newCmd += '        var nextWeek = new Date(Date.now() + 7 * 86400000);\n';
  newCmd += '        var dl = nextWeek.toISOString().split(\'T\')[0];\n';
  newCmd += '        db.prepare(\'UPDATE sessions SET deadline = ? WHERE id = ?\').run(dl, dFound.id);\n';
  newCmd += '        return \'「\' + dFound.title + \'」の期限を\' + dl + \'に設定しました\';\n';
  newCmd += '      } else if (t.indexOf(\'今月中\') >= 0) {\n';
  newCmd += '        var now = new Date();\n';
  newCmd += '        var eom = now.getFullYear() + \'-\' + String(now.getMonth() + 1).padStart(2, \'0\') + \'-\' + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();\n';
  newCmd += '        db.prepare(\'UPDATE sessions SET deadline = ? WHERE id = ?\').run(eom, dFound.id);\n';
  newCmd += '        return \'「\' + dFound.title + \'」の期限を\' + eom + \'に設定しました\';\n';
  newCmd += '      } else if (t.indexOf(\'急がない\') >= 0) {\n';
  newCmd += '        db.prepare(\'UPDATE sessions SET priority = 8 WHERE id = ?\').run(dFound.id);\n';
  newCmd += '        return \'「\' + dFound.title + \'」の優先度を下げました(8)\';\n';
  newCmd += '      }\n';
  newCmd += '    }\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // フェーズ承認（Feature 2）: 「フェーズ1承認」\n';
  newCmd += '  var phaseApproveMatch = t.match(/フェーズ(\\d+)(承認|OK|進めて)/i);\n';
  newCmd += '  if (phaseApproveMatch) {\n';
  newCmd += '    var paSidMatch = t.match(/セッション(\\d+)/);\n';
  newCmd += '    var paSid = paSidMatch ? parseInt(paSidMatch[1]) : null;\n';
  newCmd += '    var paPhase = parseInt(phaseApproveMatch[1]);\n';
  newCmd += '    var paSession = paSid\n';
  newCmd += '      ? db.prepare(\'SELECT * FROM sessions WHERE id = ?\').get(paSid)\n';
  newCmd += '      : db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n';
  newCmd += '    if (paSession) {\n';
  newCmd += '      var nextPhase = paPhase + 1;\n';
  newCmd += '      db.prepare(\'UPDATE sessions SET phase = ?, current_round = 0 WHERE id = ?\').run(nextPhase, paSession.id);\n';
  newCmd += '      db.prepare(\'INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)\').run(paSession.id, \'approved\', \'Phase\' + paPhase + \'承認→Phase\' + nextPhase + \'開始\');\n';
  newCmd += '      return \'「\' + paSession.title + \'」Phase\' + paPhase + \'承認。Phase\' + nextPhase + \'に進みます。\';\n';
  newCmd += '    }\n';
  newCmd += '    return \'セッションが見つかりません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // ステップやり直し（Feature 2）: 「ステップ3やり直し」\n';
  newCmd += '  var stepRedoMatch = t.match(/ステップ(\\d+)(やり直し|再実行|リトライ)/);\n';
  newCmd += '  if (stepRedoMatch) {\n';
  newCmd += '    var srSidMatch = t.match(/セッション(\\d+)/);\n';
  newCmd += '    var srSid = srSidMatch ? parseInt(srSidMatch[1]) : null;\n';
  newCmd += '    var srStep = parseInt(stepRedoMatch[1]);\n';
  newCmd += '    var srSession = srSid\n';
  newCmd += '      ? db.prepare(\'SELECT * FROM sessions WHERE id = ?\').get(srSid)\n';
  newCmd += '      : db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n';
  newCmd += '    if (srSession) {\n';
  newCmd += '      engine.clearStep(srSession.id, srStep);\n';
  newCmd += '      return \'「\' + srSession.title + \'」のStep\' + srStep + \'をクリアしました。再実行します。\';\n';
  newCmd += '    }\n';
  newCmd += '    return \'セッションが見つかりません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // パターン採用（Feature 2）: 「パターンA採用」\n';
  newCmd += '  var patternMatch = t.match(/パターン([A-Da-d])(採用|承認|で決定|にして)/);\n';
  newCmd += '  if (patternMatch) {\n';
  newCmd += '    var pat = patternMatch[1].toUpperCase();\n';
  newCmd += '    var latestQueue = db.prepare("SELECT * FROM output_queue WHERE status = \'awaiting_approval\' ORDER BY created_at DESC LIMIT 1").get();\n';
  newCmd += '    if (latestQueue) {\n';
  newCmd += '      var caseId = outputGen.approveOutput(latestQueue.id, pat);\n';
  newCmd += '      return \'パターン\' + pat + \'を採用しました（case_library ID: \' + caseId + \'）\';\n';
  newCmd += '    }\n';
  newCmd += '    return \'承認待ちのアウトプットがありません\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 競合追加（Feature 7）: 「競合追加 URL」\n';
  newCmd += '  var compMatch = t.match(/^競合追加\\s+(.+)/);\n';
  newCmd += '  if (compMatch) {\n';
  newCmd += '    var compUrl = compMatch[1].trim();\n';
  newCmd += '    var compName = compUrl.replace(/https?:\\/\\//, \'\').split(\'/\')[0];\n';
  newCmd += '    db.prepare(\'INSERT INTO competitors (name, url) VALUES (?,?)\').run(compName, compUrl);\n';
  newCmd += '    return \'競合「\' + compName + \'」を登録しました。週次で自動チェックします。\';\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // 保留中の質問があれば回答として処理\n';
  newCmd += '  var pending = lineQA.getPendingQuestion();\n';
  newCmd += '  if (pending) {\n';
  newCmd += '    lineQA.resolveAnswer(pending.id, t);\n';
  newCmd += '    return \'回答受付しました。処理を再開します。\\n\\nQ: \' + pending.question.substring(0, 80) + \'\\nA: \' + t;\n';
  newCmd += '  }\n';
  newCmd += '\n';
  newCmd += '  // スマートQ&A（Claudeがプロジェクト参照して回答）\n';
  newCmd += '  try {\n';
  newCmd += '    console.log(\'[Smart QA] 質問処理開始: \' + t.substring(0, 50));\n';
  newCmd += '    var answer = await lineQA.handleSmartQA(t, userId);\n';
  newCmd += '    return answer;\n';
  newCmd += '  } catch (err) {\n';
  newCmd += '    console.error(\'[Smart QA Error]\', err.message);\n';
  newCmd += '    db.prepare(\'INSERT INTO voice_memos (text) VALUES (?)\').run(t);\n';
  newCmd += '    return \'メモ保存しました: 「\' + t.substring(0, 30) + \'...」\';\n';
  newCmd += '  }\n';
  newCmd += '}';

  server = server.substring(0, cmdStartIdx) + newCmd + server.substring(cmdEndIdx);
  console.log('[server] processLineCommand 7機能対応に更新');
} else {
  console.log('[server] processLineCommand 既に更新済み');
}

// 2c. runSleepMode 全置換（並列処理対応）
var sleepStart = 'async function runSleepMode() {';
var sleepEnd = '\n\n// ============================================\n// 朝サマリー（7時LINE送信）';
var sleepStartIdx = server.indexOf(sleepStart);
var sleepEndIdx = server.indexOf(sleepEnd, sleepStartIdx);

if (sleepStartIdx >= 0 && sleepEndIdx >= 0 && server.indexOf('concurrency') === -1) {
  var newSleep = '';
  newSleep += 'async function runSleepMode() {\n';
  newSleep += '  console.log(\'[就寝モード] 開始 \' + new Date().toISOString());\n';
  newSleep += '  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n';
  newSleep += '\n';
  newSleep += '  // 全アクティブセッションを優先度順に取得（上限5件）\n';
  newSleep += '  var activeSessions = db.prepare("SELECT * FROM sessions WHERE status = \'active\' AND updated_at > datetime(\'now\', \'-48 hours\') ORDER BY priority ASC, updated_at DESC LIMIT 5").all();\n';
  newSleep += '\n';
  newSleep += '  if (activeSessions.length > 0) {\n';
  newSleep += '    console.log(\'[就寝モード] アクティブセッション: \' + activeSessions.length + \'件\');\n';
  newSleep += '    // 並列処理（最大3件同時）\n';
  newSleep += '    var concurrency = 3;\n';
  newSleep += '    var results = [];\n';
  newSleep += '    for (var batch = 0; batch < activeSessions.length; batch += concurrency) {\n';
  newSleep += '      var chunk = activeSessions.slice(batch, batch + concurrency);\n';
  newSleep += '      var promises = chunk.map(function(sess) {\n';
  newSleep += '        return (async function(s) {\n';
  newSleep += '          try {\n';
  newSleep += '            console.log(\'[就寝モード] 処理開始: \' + s.title + \' (優先度:\' + (s.priority || 5) + \')\');\n';
  newSleep += '            db.prepare("UPDATE sessions SET status = \'sleep\' WHERE id = ?").run(s.id);\n';
  newSleep += '            db.prepare(\'INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)\').run(s.id, \'sleep_start\');\n';
  newSleep += '            var lr = db.prepare(\'SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?\').get(s.id, \'user\');\n';
  newSleep += '            var startRound = (lr && lr.mr ? lr.mr : 0) + 1;\n';
  newSleep += '            for (var r = startRound; r <= 8; r++) {\n';
  newSleep += '              try {\n';
  newSleep += '                await engine.runStep(s.id, s.topic, r, s.research_data, true);\n';
  newSleep += '                console.log(\'[就寝モード] セッション\' + s.id + \' ステップ\' + r + \'完了\');\n';
  newSleep += '              } catch (err) {\n';
  newSleep += '                console.error(\'[就寝モード] ステップ\' + r + \'エラー:\', err.message);\n';
  newSleep += '                db.prepare(\'INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)\').run(s.id, \'error_step_\' + r, err.message);\n';
  newSleep += '                break;\n';
  newSleep += '              }\n';
  newSleep += '            }\n';
  newSleep += '            var cr = db.prepare(\'SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?\').get(s.id, \'user\');\n';
  newSleep += '            if (cr && cr.mr >= 8) {\n';
  newSleep += '              try { await engine.generateFinalSummary(s.id); console.log(\'[就寝モード] 最終統合完了 セッション\' + s.id); }\n';
  newSleep += '              catch (err) { console.error(\'[就寝モード] 最終統合エラー:\', err.message); }\n';
  newSleep += '            }\n';
  newSleep += '            db.prepare("UPDATE sessions SET status = \'active\' WHERE id = ?").run(s.id);\n';
  newSleep += '            db.prepare(\'INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)\').run(s.id, \'sleep_end\', \'完了\');\n';
  newSleep += '            return { id: s.id, title: s.title, status: \'完了\' };\n';
  newSleep += '          } catch (err) {\n';
  newSleep += '            console.error(\'[就寝モード] セッション\' + s.id + \'全体エラー:\', err.message);\n';
  newSleep += '            db.prepare("UPDATE sessions SET status = \'active\' WHERE id = ?").run(s.id);\n';
  newSleep += '            return { id: s.id, title: s.title, status: \'エラー: \' + err.message };\n';
  newSleep += '          }\n';
  newSleep += '        })(sess);\n';
  newSleep += '      });\n';
  newSleep += '      var batchResults = await Promise.all(promises);\n';
  newSleep += '      results = results.concat(batchResults);\n';
  newSleep += '    }\n';
  newSleep += '    global._sleepResults = results;\n';
  newSleep += '  } else {\n';
  newSleep += '    // 指示なし：新規事業アイデアを市場調査\n';
  newSleep += '    console.log(\'[就寝モード] 本日の指示なし → 新規事業アイデア調査開始\');\n';
  newSleep += '    try {\n';
  newSleep += '      var researchResult = await anthropic.messages.create({\n';
  newSleep += '        model: \'claude-sonnet-4-20250514\', max_tokens: 8000,\n';
  newSleep += '        system: \'あなたは法律事務所の経営コンサルタントです。東京新橋にある「前田法律事務所（東京新橋法律事務所）」の新規事業アイデアを提案してください。\\n\\n前田法律事務所の特徴:\\n- 代表弁護士: 前田\\n- 所在地: 東京都港区新橋\\n- 既存事業: 交通事故、企業法務、死後事務委任、高齢者見守り\\n- 強み: AI活用、テクノロジー活用、賃貸保証会社との連携\\n- ターゲット: 中小企業、単身高齢者、不動産管理会社\\n\\n以下の観点で分析してください:\\n1. 市場調査（市場規模、成長率、トレンド）\\n2. 競合分析（主要プレイヤー、差別化ポイント）\\n3. 収益性分析（単価、想定件数、粗利率）\\n4. 実現可能性（既存リソースの活用度、初期投資、立ち上げ期間）\\n\\n必ず3案を提案し、各案について向こう3年分のPL（損益計算書）を作成してください。最も実現可能性が高い案を推奨し、その理由を述べてください。\',\n';
  newSleep += '        messages: [{ role: \'user\', content: \'前田法律事務所（東京新橋法律事務所）向けの新規事業アイデアを3案、市場調査・競合分析・3年PLつきで提案してください。\' }]\n';
  newSleep += '      });\n';
  newSleep += '      var ideas = researchResult.content[0].text;\n';
  newSleep += '      db.prepare(\'INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)\').run(0, \'new_biz_research\', ideas);\n';
  newSleep += '      var ts = Date.now();\n';
  newSleep += '      var htmlName = \'biz_ideas_\' + ts + \'.html\';\n';
  newSleep += '      var outputDir = pathMod.join(__dirname, \'public/outputs\');\n';
  newSleep += '      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });\n';
  newSleep += '      var htmlContent = ideas.replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');\n';
  newSleep += '      htmlContent = htmlContent.replace(/^### (.+)$/gm, \'<h3>$1</h3>\');\n';
  newSleep += '      htmlContent = htmlContent.replace(/^## (.+)$/gm, \'<h2>$1</h2>\');\n';
  newSleep += '      htmlContent = htmlContent.replace(/^# (.+)$/gm, \'<h1>$1</h1>\');\n';
  newSleep += '      htmlContent = htmlContent.replace(/\\*\\*(.+?)\\*\\*/g, \'<strong>$1</strong>\');\n';
  newSleep += '      htmlContent = htmlContent.replace(/\\|(.+)\\|/g, function(m) { return \'<code>\' + m + \'</code>\'; });\n';
  newSleep += '      htmlContent = htmlContent.replace(/\\n/g, \'<br>\');\n';
  newSleep += '      var fullHtml = \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>新規事業アイデア</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f5f5f5;color:#333;line-height:1.8;padding:16px;max-width:800px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:8px;margin:20px 0 16px}h2{font-size:18px;color:#16213e;margin:16px 0 10px;padding:8px 12px;background:#e8eaf6;border-radius:4px}h3{font-size:16px;color:#0d47a1;margin:12px 0 8px}strong{color:#1a1a2e}code{display:block;background:#fff;padding:8px;margin:4px 0;border-radius:4px;font-size:13px;overflow-x:auto;white-space:pre}.content{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.meta{font-size:12px;color:#888;text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid #ddd}</style></head><body><h1>新規事業アイデア提案</h1><div class="content">\' + htmlContent + \'</div><div class="meta">前田法律事務所 AIシステム | 自動調査 | \' + new Date().toLocaleString(\'ja-JP\', {timeZone:\'Asia/Tokyo\'}) + \'</div></body></html>\';\n';
  newSleep += '      fs.writeFileSync(pathMod.join(outputDir, htmlName), fullHtml, \'utf8\');\n';
  newSleep += '      global._sleepBizIdeas = { text: ideas, htmlUrl: \'https://176-32-87-118.sslip.io/outputs/\' + htmlName };\n';
  newSleep += '    } catch (err) {\n';
  newSleep += '      console.error(\'[就寝モード] 新規事業調査エラー:\', err.message);\n';
  newSleep += '      db.prepare(\'INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)\').run(0, \'new_biz_error\', err.message);\n';
  newSleep += '    }\n';
  newSleep += '  }\n';
  newSleep += '  console.log(\'[就寝モード] 完了 \' + new Date().toISOString());\n';
  newSleep += '}';

  server = server.substring(0, sleepStartIdx) + newSleep + server.substring(sleepEndIdx);
  console.log('[server] runSleepMode 並列処理対応に更新');
} else {
  console.log('[server] runSleepMode 既に更新済み');
}

// 2d. sendMorningSummary 全置換（全セッション報告対応）
var morningStart = 'async function sendMorningSummary() {';
var morningEnd = '\n\n// ============================================\n// 週次レポート（月曜7時）';
var morningStartIdx = server.indexOf(morningStart);
var morningEndIdx = server.indexOf(morningEnd, morningStartIdx);

if (morningStartIdx >= 0 && morningEndIdx >= 0 && server.indexOf('_sleepResults') === -1) {
  var newMorning = '';
  newMorning += 'async function sendMorningSummary() {\n';
  newMorning += '  console.log(\'[朝サマリー] 生成開始\');\n';
  newMorning += '  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n';
  newMorning += '  var msg = \'おはようございます、前田さん\\n\';\n';
  newMorning += '\n';
  newMorning += '  // 就寝中に処理したセッション結果\n';
  newMorning += '  if (global._sleepResults && global._sleepResults.length > 0) {\n';
  newMorning += '    msg += \'\\n【就寝中の処理結果: \' + global._sleepResults.length + \'件】\\n\';\n';
  newMorning += '    global._sleepResults.forEach(function(r) {\n';
  newMorning += '      msg += \'・\' + r.title + \' → \' + r.status + \'\\n\';\n';
  newMorning += '    });\n';
  newMorning += '    // 各セッションの議論サマリー\n';
  newMorning += '    var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime(\'now\', \'-12 hours\') ORDER BY session_id, created_at ASC").all();\n';
  newMorning += '    if (sleepLogs.length > 0) {\n';
  newMorning += '      var logText = sleepLogs.map(function(l) { return \'[S\' + l.session_id + \' \' + l.role_label + \'] \' + l.content.substring(0, 200); }).join(\'\\n---\\n\');\n';
  newMorning += '      try {\n';
  newMorning += '        var r = await anthropic.messages.create({\n';
  newMorning += '          model: \'claude-sonnet-4-20250514\', max_tokens: 2000,\n';
  newMorning += '          system: \'就寝中に複数プロジェクトが並列処理されました。各プロジェクトの進捗・重要ポイントを簡潔にまとめてください。\',\n';
  newMorning += '          messages: [{ role: \'user\', content: logText.substring(0, 10000) }]\n';
  newMorning += '        });\n';
  newMorning += '        msg += \'\\n\' + r.content[0].text;\n';
  newMorning += '      } catch(e) { console.error(\'[朝サマリー] 要約エラー:\', e.message); }\n';
  newMorning += '    }\n';
  newMorning += '    global._sleepResults = null;\n';
  newMorning += '  } else if (global._sleepBizIdeas) {\n';
  newMorning += '    try {\n';
  newMorning += '      var r2 = await anthropic.messages.create({\n';
  newMorning += '        model: \'claude-sonnet-4-20250514\', max_tokens: 2000,\n';
  newMorning += '        system: \'新規事業アイデア分析をLINE通知用に簡潔にまとめてください。各案のタイトル、市場規模、3年後の営業利益を箇条書きで。推奨案を明示。\',\n';
  newMorning += '        messages: [{ role: \'user\', content: global._sleepBizIdeas.text + \'\\n\\nHTML URL: \' + global._sleepBizIdeas.htmlUrl }]\n';
  newMorning += '      });\n';
  newMorning += '      msg += \'\\n【新規事業アイデア（自動調査）】\\n\\n\' + r2.content[0].text;\n';
  newMorning += '      msg += \'\\n\\n詳細はこちら:\\n\' + global._sleepBizIdeas.htmlUrl;\n';
  newMorning += '      global._sleepBizIdeas = null;\n';
  newMorning += '    } catch(e) { console.error(\'[朝サマリー] 新規事業要約エラー:\', e.message); }\n';
  newMorning += '  } else {\n';
  newMorning += '    console.log(\'[朝サマリー] 就寝中ログも新規事業アイデアもなし\');\n';
  newMorning += '    return;\n';
  newMorning += '  }\n';
  newMorning += '\n';
  newMorning += '  // 全セッション進捗サマリー\n';
  newMorning += '  var allSess = db.prepare("SELECT * FROM sessions WHERE status IN (\'active\',\'sleep\') ORDER BY priority ASC").all();\n';
  newMorning += '  if (allSess.length > 0) {\n';
  newMorning += '    msg += \'\\n\\n【プロジェクト進捗一覧】\\n\';\n';
  newMorning += '    allSess.forEach(function(s) {\n';
  newMorning += '      var pri = s.priority || 5;\n';
  newMorning += '      var star = pri <= 3 ? \'[優先\' + pri + \'] \' : \'\';\n';
  newMorning += '      var dl = s.deadline ? \' 〆\' + s.deadline : \'\';\n';
  newMorning += '      msg += star + s.title + \' → Phase\' + s.phase + \' Step\' + s.current_round + dl + \'\\n\';\n';
  newMorning += '    });\n';
  newMorning += '  }\n';
  newMorning += '\n';
  newMorning += '  // 未承認アウトプットキュー\n';
  newMorning += '  var pendingOut = db.prepare("SELECT * FROM output_queue WHERE status = \'awaiting_approval\'").all();\n';
  newMorning += '  if (pendingOut.length > 0) {\n';
  newMorning += '    msg += \'\\n【承認待ちアウトプット: \' + pendingOut.length + \'件】\\n\' +\n';
  newMorning += '      pendingOut.map(function(p) { return \'・\' + p.output_type + \'（推奨: パターン\' + p.recommended_pattern + \'）\'; }).join(\'\\n\') +\n';
  newMorning += '      \'\\n→ 「承認」「パターンA採用」「却下 理由」で返信\';\n';
  newMorning += '  }\n';
  newMorning += '\n';
  newMorning += '  await sendLine(msg);\n';
  newMorning += '  console.log(\'[朝サマリー] 送信完了\');\n';
  newMorning += '}';

  server = server.substring(0, morningStartIdx) + newMorning + server.substring(morningEndIdx);
  console.log('[server] sendMorningSummary 全セッション報告対応に更新');
} else {
  console.log('[server] sendMorningSummary 既に更新済み');
}

// 2e. 新エンドポイント追加（ヘルスチェックの前）
var healthCheck = '// ============================================\n// ヘルスチェック';
if (server.indexOf('/dashboard') === -1) {
  var newEndpoints = '';

  // ダッシュボードHTML
  newEndpoints += '// ============================================\n';
  newEndpoints += '// ダッシュボード（Feature 1）\n';
  newEndpoints += '// ============================================\n';
  newEndpoints += '\n';
  newEndpoints += 'app.get(\'/dashboard\', function(req, res) {\n';
  newEndpoints += '  var sessions = db.prepare("SELECT * FROM sessions ORDER BY priority ASC, updated_at DESC LIMIT 20").all();\n';
  newEndpoints += '  var pendingOutputs = db.prepare("SELECT oq.*, s.title as session_title FROM output_queue oq LEFT JOIN sessions s ON oq.session_id = s.id WHERE oq.status = \'awaiting_approval\' ORDER BY oq.created_at DESC").all();\n';
  newEndpoints += '  var recentQA = db.prepare("SELECT * FROM pending_questions WHERE status = \'answered\' ORDER BY answered_at DESC LIMIT 10").all();\n';
  newEndpoints += '  var qualityScores = db.prepare("SELECT qs.*, s.title as session_title FROM quality_scores qs LEFT JOIN sessions s ON qs.session_id = s.id ORDER BY qs.scored_at DESC LIMIT 10").all();\n';
  newEndpoints += '\n';
  newEndpoints += '  var sessHTML = sessions.map(function(s) {\n';
  newEndpoints += '    var pri = s.priority || 5;\n';
  newEndpoints += '    var priClass = pri <= 2 ? \'high\' : pri <= 4 ? \'mid\' : \'low\';\n';
  newEndpoints += '    var dl = s.deadline ? \'<span class="deadline">〆\' + s.deadline + \'</span>\' : \'\';\n';
  newEndpoints += '    var phaseLabel = [\'壁打ち\',\'訴求設計\',\'アウトプット\'][s.phase - 1] || \'Phase\' + s.phase;\n';
  newEndpoints += '    return \'<div class="card \' + priClass + \'"><div class="card-header"><span class="pri">優先\' + pri + \'</span><span class="status">\' + s.status + \'</span></div><h3>\' + s.title + \'</h3><p>\' + phaseLabel + \' Step\' + s.current_round + \' \' + dl + \'</p></div>\';\n';
  newEndpoints += '  }).join(\'\');\n';
  newEndpoints += '\n';
  newEndpoints += '  var pendHTML = pendingOutputs.map(function(p) {\n';
  newEndpoints += '    return \'<div class="card pending"><h3>\' + (p.session_title || \'Session\' + p.session_id) + \'</h3><p>\' + p.output_type + \' 推奨: パターン\' + p.recommended_pattern + \'</p></div>\';\n';
  newEndpoints += '  }).join(\'\') || \'<p>なし</p>\';\n';
  newEndpoints += '\n';
  newEndpoints += '  var qaHTML = recentQA.map(function(q) {\n';
  newEndpoints += '    return \'<div class="qa"><strong>Q:</strong> \' + q.question.substring(0, 80) + \'<br><strong>A:</strong> \' + (q.answer || \'\').substring(0, 100) + \'</div>\';\n';
  newEndpoints += '  }).join(\'\') || \'<p>なし</p>\';\n';
  newEndpoints += '\n';
  newEndpoints += '  var scoreHTML = qualityScores.map(function(qs) {\n';
  newEndpoints += '    return \'<div class="card score"><h3>\' + (qs.session_title || \'Session\' + qs.session_id) + \' パターン\' + qs.pattern + \'</h3><p>訴求\' + qs.score_appeal + \' 差別\' + qs.score_differentiation + \' 体裁\' + qs.score_format + \' 衝撃\' + qs.score_impact + \' = \' + qs.total_score + \'/40</p></div>\';\n';
  newEndpoints += '  }).join(\'\') || \'<p>なし</p>\';\n';
  newEndpoints += '\n';
  newEndpoints += '  var now = new Date().toLocaleString(\'ja-JP\', {timeZone:\'Asia/Tokyo\'});\n';
  newEndpoints += '  var html = \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>前田AI ダッシュボード</title>\';\n';
  newEndpoints += '  html += \'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f0f2f5;color:#333;padding:12px}h1{font-size:18px;color:#1a1a2e;padding:12px 0;border-bottom:2px solid #16213e;margin-bottom:16px}h2{font-size:16px;color:#16213e;margin:20px 0 12px;padding:8px;background:#e8eaf6;border-radius:4px}.card{background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,.1);border-left:4px solid #ccc}.card.high{border-left-color:#e53935}.card.mid{border-left-color:#fb8c00}.card.low{border-left-color:#43a047}.card.pending{border-left-color:#1e88e5}.card.score{border-left-color:#8e24aa}.card-header{display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px}.pri{color:#e53935;font-weight:bold}.status{color:#666}.deadline{color:#e53935;font-size:13px;font-weight:bold}h3{font-size:15px;margin-bottom:4px}p{font-size:13px;color:#555}.qa{background:#fff;padding:10px;margin-bottom:8px;border-radius:6px;font-size:13px;box-shadow:0 1px 2px rgba(0,0,0,.08)}.meta{font-size:11px;color:#999;text-align:center;margin-top:20px;padding:12px}button{background:#16213e;color:#fff;border:none;padding:8px 16px;border-radius:4px;font-size:14px;margin-top:12px;cursor:pointer}</style>\';\n';
  newEndpoints += '  html += \'<script>setTimeout(function(){location.reload()},30000)</script>\';\n';
  newEndpoints += '  html += \'</head><body>\';\n';
  newEndpoints += '  html += \'<h1>前田法律事務所 AIダッシュボード</h1>\';\n';
  newEndpoints += '  html += \'<h2>プロジェクト一覧 (\' + sessions.length + \')</h2>\' + sessHTML;\n';
  newEndpoints += '  html += \'<h2>承認待ちアウトプット</h2>\' + pendHTML;\n';
  newEndpoints += '  html += \'<h2>品質スコア</h2>\' + scoreHTML;\n';
  newEndpoints += '  html += \'<h2>最近のQ&A</h2>\' + qaHTML;\n';
  newEndpoints += '  html += \'<div class="meta">最終更新: \' + now + \' (30秒自動更新)</div>\';\n';
  newEndpoints += '  html += \'</body></html>\';\n';
  newEndpoints += '  res.send(html);\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';

  // 優先度APIエンドポイント
  newEndpoints += '// 優先度API（Feature 3）\n';
  newEndpoints += 'app.put(\'/api/session/:id/priority\', function(req, res) {\n';
  newEndpoints += '  var id = req.params.id;\n';
  newEndpoints += '  var body = req.body;\n';
  newEndpoints += '  if (body.priority !== undefined) db.prepare(\'UPDATE sessions SET priority = ? WHERE id = ?\').run(body.priority, id);\n';
  newEndpoints += '  if (body.deadline !== undefined) db.prepare(\'UPDATE sessions SET deadline = ? WHERE id = ?\').run(body.deadline, id);\n';
  newEndpoints += '  res.json({ success: true });\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';

  // 品質スコアAPI（Feature 5）
  newEndpoints += '// 品質スコアAPI（Feature 5）\n';
  newEndpoints += 'app.get(\'/api/quality/:sessionId\', function(req, res) {\n';
  newEndpoints += '  res.json(db.prepare(\'SELECT * FROM quality_scores WHERE session_id = ? ORDER BY scored_at DESC\').all(req.params.sessionId));\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';

  // A/Bテストエンドポイント（Feature 6）
  newEndpoints += '// A/Bテスト（Feature 6）\n';
  newEndpoints += 'app.post(\'/api/ab/create\', async function(req, res) {\n';
  newEndpoints += '  try {\n';
  newEndpoints += '    var body = req.body;\n';
  newEndpoints += '    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: \'sessionId, outputType必須\' });\n';
  newEndpoints += '    // バリアントA\n';
  newEndpoints += '    var resultA = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});\n';
  newEndpoints += '    var queueA = db.prepare(\'SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1\').get(body.sessionId);\n';
  newEndpoints += '    // バリアントB\n';
  newEndpoints += '    var resultB = await outputGen.generateFull(body.sessionId, body.outputType, Object.assign({}, body.params || {}, { variant: \'B\' }));\n';
  newEndpoints += '    var queueB = db.prepare(\'SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1\').get(body.sessionId);\n';
  newEndpoints += '    // A/Bテスト保存\n';
  newEndpoints += '    var abResult = db.prepare(\'INSERT INTO ab_tests (session_id, name, variant_a_queue_id, variant_b_queue_id) VALUES (?,?,?,?)\').run(body.sessionId, body.outputType + \' A/B\', queueA ? queueA.id : null, queueB ? queueB.id : null);\n';
  newEndpoints += '    res.json({ abTestId: abResult.lastInsertRowid, variantA: resultA, variantB: resultB });\n';
  newEndpoints += '  } catch (err) { res.status(500).json({ error: err.message }); }\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';
  newEndpoints += 'app.get(\'/api/ab/:id\', function(req, res) {\n';
  newEndpoints += '  var ab = db.prepare(\'SELECT * FROM ab_tests WHERE id = ?\').get(req.params.id);\n';
  newEndpoints += '  if (!ab) return res.status(404).json({ error: \'A/Bテスト未発見\' });\n';
  newEndpoints += '  var qA = ab.variant_a_queue_id ? db.prepare(\'SELECT * FROM output_queue WHERE id = ?\').get(ab.variant_a_queue_id) : null;\n';
  newEndpoints += '  var qB = ab.variant_b_queue_id ? db.prepare(\'SELECT * FROM output_queue WHERE id = ?\').get(ab.variant_b_queue_id) : null;\n';
  newEndpoints += '  // HTML比較ビュー\n';
  newEndpoints += '  var pA = qA && qA.patterns ? JSON.parse(qA.patterns) : [];\n';
  newEndpoints += '  var pB = qB && qB.patterns ? JSON.parse(qB.patterns) : [];\n';
  newEndpoints += '  var recA = qA ? qA.recommended_pattern : \'?\';\n';
  newEndpoints += '  var recB = qB ? qB.recommended_pattern : \'?\';\n';
  newEndpoints += '  var contentA = pA.length > 0 ? (pA[0].content || JSON.stringify(pA[0])).substring(0, 2000) : \'データなし\';\n';
  newEndpoints += '  var contentB = pB.length > 0 ? (pB[0].content || JSON.stringify(pB[0])).substring(0, 2000) : \'データなし\';\n';
  newEndpoints += '  contentA = contentA.replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\').replace(/\\n/g, \'<br>\');\n';
  newEndpoints += '  contentB = contentB.replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\').replace(/\\n/g, \'<br>\');\n';
  newEndpoints += '  var html = \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A/B比較</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f5f5f5;padding:12px}h1{font-size:18px;margin-bottom:16px}.compare{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:600px){.compare{grid-template-columns:1fr}}.variant{background:#fff;padding:12px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1)}.variant h2{font-size:15px;margin-bottom:8px;padding:6px;border-radius:4px}.variant.a h2{background:#e3f2fd;color:#1565c0}.variant.b h2{background:#fce4ec;color:#c62828}.content{font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word}</style></head><body>\';\n';
  newEndpoints += '  html += \'<h1>A/Bテスト比較 #\' + ab.id + \'</h1>\';\n';
  newEndpoints += '  html += \'<div class="compare"><div class="variant a"><h2>バリアントA (推奨:\' + recA + \')</h2><div class="content">\' + contentA + \'</div></div>\';\n';
  newEndpoints += '  html += \'<div class="variant b"><h2>バリアントB (推奨:\' + recB + \')</h2><div class="content">\' + contentB + \'</div></div></div>\';\n';
  newEndpoints += '  if (ab.comparison_result) html += \'<div style="margin-top:16px;background:#fff;padding:12px;border-radius:8px"><h2 style="font-size:15px;margin-bottom:8px">比較分析</h2><p style="font-size:13px;white-space:pre-wrap">\' + ab.comparison_result.replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\').replace(/\\n/g, \'<br>\') + \'</p></div>\';\n';
  newEndpoints += '  html += \'</body></html>\';\n';
  newEndpoints += '  res.send(html);\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';
  newEndpoints += 'app.post(\'/api/ab/compare/:id\', async function(req, res) {\n';
  newEndpoints += '  try {\n';
  newEndpoints += '    var ab = db.prepare(\'SELECT * FROM ab_tests WHERE id = ?\').get(req.params.id);\n';
  newEndpoints += '    if (!ab) return res.status(404).json({ error: \'A/Bテスト未発見\' });\n';
  newEndpoints += '    var qA = ab.variant_a_queue_id ? db.prepare(\'SELECT * FROM output_queue WHERE id = ?\').get(ab.variant_a_queue_id) : null;\n';
  newEndpoints += '    var qB = ab.variant_b_queue_id ? db.prepare(\'SELECT * FROM output_queue WHERE id = ?\').get(ab.variant_b_queue_id) : null;\n';
  newEndpoints += '    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n';
  newEndpoints += '    var r = await anthropic.messages.create({\n';
  newEndpoints += '      model: \'claude-sonnet-4-20250514\', max_tokens: 2000,\n';
  newEndpoints += '      system: \'2つのアウトプットバリアントを比較分析してください。訴求力・差別化・読みやすさ・インパクトで比較し、勝者と理由を明示。\',\n';
  newEndpoints += '      messages: [{ role: \'user\', content: \'バリアントA:\\n\' + (qA ? (qA.patterns || \'\').substring(0, 3000) : \'なし\') + \'\\n\\nバリアントB:\\n\' + (qB ? (qB.patterns || \'\').substring(0, 3000) : \'なし\') }]\n';
  newEndpoints += '    });\n';
  newEndpoints += '    var comparison = r.content[0].text;\n';
  newEndpoints += '    db.prepare(\'UPDATE ab_tests SET comparison_result = ? WHERE id = ?\').run(comparison, ab.id);\n';
  newEndpoints += '    res.json({ comparison: comparison });\n';
  newEndpoints += '  } catch (err) { res.status(500).json({ error: err.message }); }\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';

  // 競合モニタリングAPI（Feature 7）
  newEndpoints += '// 競合モニタリング（Feature 7）\n';
  newEndpoints += 'app.get(\'/api/competitors\', function(req, res) {\n';
  newEndpoints += '  res.json(db.prepare(\'SELECT * FROM competitors ORDER BY created_at DESC\').all());\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';
  newEndpoints += 'app.post(\'/api/competitors\', function(req, res) {\n';
  newEndpoints += '  var body = req.body;\n';
  newEndpoints += '  if (!body.url) return res.status(400).json({ error: \'url必須\' });\n';
  newEndpoints += '  var name = body.name || body.url.replace(/https?:\\/\\//, \'\').split(\'/\')[0];\n';
  newEndpoints += '  db.prepare(\'INSERT INTO competitors (name, url, check_type) VALUES (?,?,?)\').run(name, body.url, body.checkType || \'lp\');\n';
  newEndpoints += '  res.json({ success: true });\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';
  newEndpoints += 'app.get(\'/api/competitors/changes\', function(req, res) {\n';
  newEndpoints += '  res.json(db.prepare(\'SELECT cc.*, c.name, c.url FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id ORDER BY cc.detected_at DESC LIMIT 20\').all());\n';
  newEndpoints += '});\n';
  newEndpoints += '\n';

  server = server.replace(healthCheck, newEndpoints + healthCheck);
  console.log('[server] 新エンドポイント追加完了');
} else {
  console.log('[server] エンドポイント既に追加済み');
}

// 2f. 競合チェックcron + 週次レポート更新
var weeklyReportCron = "// 毎週月曜7時（JST）週次レポート";
if (server.indexOf('checkCompetitors') === -1) {
  var competitorCron = '';
  competitorCron += '// 毎週日曜23時（JST）競合チェック（Feature 7）\n';
  competitorCron += 'cron.schedule(\'0 23 * * 0\', function() { checkCompetitors().catch(function(e) { console.error(e); }); }, { timezone: \'Asia/Tokyo\' });\n';
  competitorCron += '\n';
  competitorCron += 'async function checkCompetitors() {\n';
  competitorCron += '  console.log(\'[競合チェック] 開始\');\n';
  competitorCron += '  var comps = db.prepare(\'SELECT * FROM competitors\').all();\n';
  competitorCron += '  for (var i = 0; i < comps.length; i++) {\n';
  competitorCron += '    var comp = comps[i];\n';
  competitorCron += '    try {\n';
  competitorCron += '      var content = await fetchUrl(comp.url);\n';
  competitorCron += '      var hash = crypto.createHash(\'md5\').update(content).digest(\'hex\');\n';
  competitorCron += '      if (comp.last_content_hash && comp.last_content_hash !== hash) {\n';
  competitorCron += '        db.prepare(\'INSERT INTO competitor_changes (competitor_id, old_hash, new_hash, change_summary) VALUES (?,?,?,?)\').run(comp.id, comp.last_content_hash, hash, \'変更検知\');\n';
  competitorCron += '        await sendLine(\'[競合変更検知] \' + comp.name + \' (\' + comp.url + \') のページが更新されました。\');\n';
  competitorCron += '        console.log(\'[競合チェック] 変更検知: \' + comp.name);\n';
  competitorCron += '      }\n';
  competitorCron += '      db.prepare(\'UPDATE competitors SET last_content_hash = ?, last_checked_at = CURRENT_TIMESTAMP WHERE id = ?\').run(hash, comp.id);\n';
  competitorCron += '    } catch (err) {\n';
  competitorCron += '      console.error(\'[競合チェック] \' + comp.name + \' エラー:\', err.message);\n';
  competitorCron += '    }\n';
  competitorCron += '  }\n';
  competitorCron += '  console.log(\'[競合チェック] 完了\');\n';
  competitorCron += '}\n';
  competitorCron += '\n';
  competitorCron += 'function fetchUrl(url) {\n';
  competitorCron += '  return new Promise(function(resolve, reject) {\n';
  competitorCron += '    var mod = url.startsWith(\'https\') ? https : require(\'http\');\n';
  competitorCron += '    mod.get(url, { headers: { \'User-Agent\': \'Mozilla/5.0\' } }, function(res) {\n';
  competitorCron += '      var data = \'\';\n';
  competitorCron += '      res.on(\'data\', function(c) { data += c; });\n';
  competitorCron += '      res.on(\'end\', function() { resolve(data); });\n';
  competitorCron += '    }).on(\'error\', function(e) { reject(e); });\n';
  competitorCron += '  });\n';
  competitorCron += '}\n';
  competitorCron += '\n';

  server = server.replace(weeklyReportCron, competitorCron + weeklyReportCron);
  console.log('[server] 競合チェックcron追加完了');
}

// 2g. 週次レポートに競合動向セクション追加
var weeklyReportFunc = 'async function sendWeeklyReport() {';
if (server.indexOf('competitor_changes') === -1 || server.indexOf('競合動向') === -1) {
  // 週次レポートの最後（sendLine前）に競合動向追加
  var weeklyLineSend = "  await sendLine('【週次レポート】\\n\\n' + report);";
  var weeklyWithComp = "  // 競合動向\n  var compChanges = db.prepare(\"SELECT cc.*, c.name FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id WHERE cc.detected_at > datetime('now', '-7 days')\").all();\n  if (compChanges.length > 0) {\n    report += '\\n\\n【競合動向】\\n' + compChanges.map(function(cc) { return '・' + cc.name + ': ' + cc.change_summary; }).join('\\n');\n  }\n\n  await sendLine('【週次レポート】\\n\\n' + report);";
  if (server.indexOf(weeklyLineSend) >= 0) {
    server = server.replace(weeklyLineSend, weeklyWithComp);
    console.log('[server] 週次レポートに競合動向追加');
  }
}

fs.writeFileSync(serverFile, server, 'utf8');
console.log('\npatch_7features.js 適用完了');
