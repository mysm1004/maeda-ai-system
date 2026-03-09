// patch_server_phase456.js
// server.js に Phase 4/5/6 エンジン統合 + フェーズ遷移 + APIエンドポイント + LINEコマンド
var fs = require('fs');

var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');
var fixes = 0;

// ============================================
// 1. require + インスタンス追加
// ============================================
var oldRequire = "var LineQA = require('./services/line-qa');";
if (server.indexOf(oldRequire) >= 0 && server.indexOf("require('./services/list-generator')") === -1) {
  var newRequire = "var LineQA = require('./services/line-qa');\nvar ListGenerator = require('./services/list-generator');\nvar AdDesigner = require('./services/ad-designer');\nvar MediaOptimizer = require('./services/media-optimizer');";
  server = server.replace(oldRequire, newRequire);
  fixes++;
  console.log('[Fix 1] require追加: ListGenerator, AdDesigner, MediaOptimizer');
} else {
  console.log('[Fix 1] スキップ（既に追加済み or パターン不一致）');
}

// インスタンス生成追加
var oldInstance = "var outputGen = new OutputGenerator(db, lineQA, sendLine);";
if (server.indexOf(oldInstance) >= 0 && server.indexOf("new ListGenerator(") === -1) {
  var newInstance = "var outputGen = new OutputGenerator(db, lineQA, sendLine);\nvar listGen = new ListGenerator(db, lineQA, sendLine);\nvar adDesigner = new AdDesigner(db, lineQA, sendLine);\nvar mediaOptimizer = new MediaOptimizer(db, lineQA, sendLine);";
  server = server.replace(oldInstance, newInstance);
  fixes++;
  console.log('[Fix 1b] インスタンス追加: listGen, adDesigner, mediaOptimizer');
} else {
  console.log('[Fix 1b] スキップ');
}

// ============================================
// 2. セッション作成時のプラン選択 + Phase1完了時の自動進行
// ============================================
// POST /api/discussion の新規セッション作成直後にphase_plan設定を追加
var oldSessionCreate = "      // 事前調査実行\n      var research = await engine.runResearch(body.topic);\n      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);";
if (server.indexOf(oldSessionCreate) >= 0 && server.indexOf('planPattern') === -1) {
  var newSessionCreate = "      // フェーズプラン設定\n      var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };\n      var phasePlan = planMap[body.planPattern] || body.phasePlan || '1,2,3,4,5,6';\n      var listCount = body.listCount || 100;\n      db.prepare('UPDATE sessions SET phase_plan = ?, list_count = ? WHERE id = ?').run(phasePlan, listCount, sid);\n\n      // 事前調査実行\n      var research = await engine.runResearch(body.topic);\n      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);";
  server = server.replace(oldSessionCreate, newSessionCreate);
  fixes++;
  console.log('[Fix 2] セッション作成にphase_plan/listCount追加');
} else {
  console.log('[Fix 2] スキップ');
}

// Phase1完了時に自動進行を追加
var oldPhase1Complete = "      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。Phase2に進む準備ができました。' });";
if (server.indexOf(oldPhase1Complete) >= 0 && server.indexOf('advanceToNextPhase') === -1) {
  var newPhase1Complete = "      // フェーズ自動進行\n      advanceToNextPhase(sid, false).catch(function(e) { console.error('[Phase進行エラー]', e.message); });\n      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。次フェーズに進む準備ができました。' });";
  server = server.replace(oldPhase1Complete, newPhase1Complete);
  fixes++;
  console.log('[Fix 2b] Phase1完了時の自動進行追加');
} else {
  console.log('[Fix 2b] スキップ');
}

// ============================================
// 3. フェーズ遷移マネージャー + Phase 4/5/6 APIエンドポイント
//    (アウトプット承認の後に追加)
// ============================================
var oldOutputQueue = "// アウトプットキュー一覧\napp.get('/api/output/queue', function(req, res) {\n  var status = req.query.status || 'awaiting_approval';\n  res.json(db.prepare('SELECT * FROM output_queue WHERE status = ? ORDER BY created_at DESC').all(status));\n});";

if (server.indexOf(oldOutputQueue) >= 0 && server.indexOf('getNextPhase') === -1) {
  var phase456Block = oldOutputQueue + "\n\n" +
"// ============================================\n" +
"// フェーズ遷移マネージャー\n" +
"// ============================================\n\n" +
"function getNextPhase(session) {\n" +
"  var plan = (session.phase_plan || '1,2,3,4,5,6').split(',').map(Number);\n" +
"  var idx = plan.indexOf(session.phase);\n" +
"  return (idx >= 0 && idx < plan.length - 1) ? plan[idx + 1] : null;\n" +
"}\n\n" +
"async function advanceToNextPhase(sessionId, isSleep) {\n" +
"  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);\n" +
"  if (!session) return;\n" +
"  var nextPhase = getNextPhase(session);\n" +
"  if (!nextPhase) {\n" +
"    await sendLine('【全フェーズ完了】セッション「' + session.title + '」の全フェーズが完了しました。');\n" +
"    db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(sessionId);\n" +
"    return;\n" +
"  }\n\n" +
"  if (!isSleep) {\n" +
"    // LINEで確認\n" +
"    var phaseLabels = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};\n" +
"    var question = '【フェーズ進行確認】\\nセッション: ' + session.title + '\\n現在: Phase' + session.phase + ' (' + (phaseLabels[session.phase] || '') + ')\\n次: Phase' + nextPhase + ' (' + (phaseLabels[nextPhase] || '') + ')\\n\\n「進む」→次フェーズ開始\\n「スキップ」→その次のフェーズへ\\n「完了」→このセッションを完了';\n" +
"    var answer = await lineQA.askUserViaLine(question, 'phase_advance', 0, 60);\n" +
"    if (!answer || answer === '完了' || answer === 'このフェーズで完了') {\n" +
"      db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(sessionId);\n" +
"      await sendLine('セッション「' + session.title + '」を完了しました。');\n" +
"      return;\n" +
"    }\n" +
"    if (answer === 'スキップ' || answer.indexOf('スキップ') >= 0) {\n" +
"      // phase_planから次フェーズを除去して再帰\n" +
"      var plan = (session.phase_plan || '1,2,3,4,5,6').split(',').map(Number);\n" +
"      plan = plan.filter(function(p) { return p !== nextPhase; });\n" +
"      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan.join(','), sessionId);\n" +
"      await sendLine('Phase' + nextPhase + 'をスキップしました。');\n" +
"      return advanceToNextPhase(sessionId, false);\n" +
"    }\n" +
"  }\n\n" +
"  // 次フェーズ起動\n" +
"  console.log('[フェーズ進行] Session' + sessionId + ': Phase' + session.phase + ' → Phase' + nextPhase);\n" +
"  db.prepare('UPDATE sessions SET phase = ?, current_round = 0 WHERE id = ?').run(nextPhase, sessionId);\n\n" +
"  switch (nextPhase) {\n" +
"    case 2:\n" +
"    case 3:\n" +
"      // Phase2/3はoutputGen.generateFullで処理（outputTypeが必要なので通知のみ）\n" +
"      await sendLine('Phase' + nextPhase + 'に進みました。LINEで「LP作って」等のコマンドでアウトプット生成を開始してください。');\n" +
"      break;\n" +
"    case 4:\n" +
"      listGen.generateFull(sessionId, isSleep).then(function() {\n" +
"        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase4→次]', e.message); });\n" +
"      }).catch(function(e) { console.error('[Phase4]', e.message); });\n" +
"      break;\n" +
"    case 5:\n" +
"      adDesigner.generateFull(sessionId, isSleep).then(function() {\n" +
"        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase5→次]', e.message); });\n" +
"      }).catch(function(e) { console.error('[Phase5]', e.message); });\n" +
"      break;\n" +
"    case 6:\n" +
"      mediaOptimizer.generateFull(sessionId, isSleep).then(function() {\n" +
"        advanceToNextPhase(sessionId, isSleep).catch(function(e) { console.error('[Phase6→次]', e.message); });\n" +
"      }).catch(function(e) { console.error('[Phase6]', e.message); });\n" +
"      break;\n" +
"    default:\n" +
"      await sendLine('Phase' + nextPhase + 'に進みました。');\n" +
"  }\n" +
"}\n\n" +
"// ============================================\n" +
"// Phase 4: 営業リスト API\n" +
"// ============================================\n\n" +
"app.post('/api/list/generate', async function(req, res) {\n" +
"  try {\n" +
"    var body = req.body;\n" +
"    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });\n" +
"    res.json({ status: 'started', sessionId: body.sessionId });\n" +
"    listGen.generateFull(body.sessionId, false).then(function() {\n" +
"      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });\n" +
"    }).catch(function(e) { console.error('[list/generate]', e); });\n" +
"  } catch (err) { res.status(500).json({ error: err.message }); }\n" +
"});\n\n" +
"app.get('/api/list/:sessionId', function(req, res) {\n" +
"  var entries = db.prepare('SELECT * FROM list_entries WHERE session_id = ? AND status = ? ORDER BY rank ASC, priority_score DESC').all(req.params.sessionId, 'active');\n" +
"  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);\n" +
"  res.json({ salesList: salesList, entries: entries, count: entries.length });\n" +
"});\n\n" +
"app.get('/api/list/:sessionId/excel', function(req, res) {\n" +
"  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? AND excel_path IS NOT NULL ORDER BY id DESC LIMIT 1').get(req.params.sessionId);\n" +
"  if (!salesList || !salesList.excel_path) return res.status(404).json({ error: 'Excel未生成' });\n" +
"  var pathMod2 = require('path');\n" +
"  res.download(salesList.excel_path, pathMod2.basename(salesList.excel_path));\n" +
"});\n\n" +
"app.post('/api/list/sample-check', function(req, res) {\n" +
"  var body = req.body;\n" +
"  if (!body.sessionId || !body.feedback) return res.status(400).json({ error: 'sessionId, feedback必須' });\n" +
"  // pending_questionsのlist_sample_checkを解決\n" +
"  var pending = db.prepare(\"SELECT * FROM pending_questions WHERE engine_type = 'list_sample_check' AND status = 'pending' ORDER BY id DESC LIMIT 1\").get();\n" +
"  if (pending) lineQA.resolveAnswer(pending.id, body.feedback);\n" +
"  res.json({ success: true });\n" +
"});\n\n" +
"// ============================================\n" +
"// Phase 5: 広告設計 API\n" +
"// ============================================\n\n" +
"app.post('/api/ad/generate', async function(req, res) {\n" +
"  try {\n" +
"    var body = req.body;\n" +
"    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });\n" +
"    res.json({ status: 'started', sessionId: body.sessionId });\n" +
"    adDesigner.generateFull(body.sessionId, false).then(function() {\n" +
"      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });\n" +
"    }).catch(function(e) { console.error('[ad/generate]', e); });\n" +
"  } catch (err) { res.status(500).json({ error: err.message }); }\n" +
"});\n\n" +
"app.get('/api/ad/:sessionId', function(req, res) {\n" +
"  var adDesign = db.prepare('SELECT * FROM ad_designs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);\n" +
"  if (!adDesign) return res.status(404).json({ error: '広告設計未生成' });\n" +
"  res.json(adDesign);\n" +
"});\n\n" +
"// ============================================\n" +
"// Phase 6: メディア最適化 API\n" +
"// ============================================\n\n" +
"app.post('/api/media/optimize', async function(req, res) {\n" +
"  try {\n" +
"    var body = req.body;\n" +
"    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });\n" +
"    res.json({ status: 'started', sessionId: body.sessionId });\n" +
"    mediaOptimizer.generateFull(body.sessionId, false).then(function() {\n" +
"      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });\n" +
"    }).catch(function(e) { console.error('[media/optimize]', e); });\n" +
"  } catch (err) { res.status(500).json({ error: err.message }); }\n" +
"});\n\n" +
"app.get('/api/media/:sessionId', function(req, res) {\n" +
"  var opts = db.prepare('SELECT * FROM media_optimizations WHERE session_id = ? ORDER BY id DESC').all(req.params.sessionId);\n" +
"  res.json(opts);\n" +
"});\n\n" +
"// ============================================\n" +
"// フェーズプラン管理 API\n" +
"// ============================================\n\n" +
"app.post('/api/session/phase-plan', function(req, res) {\n" +
"  var body = req.body;\n" +
"  if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });\n" +
"  var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };\n" +
"  var plan = planMap[body.planPattern] || body.phasePlan;\n" +
"  if (!plan) return res.status(400).json({ error: 'planPattern or phasePlan必須' });\n" +
"  db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan, body.sessionId);\n" +
"  if (body.listCount) db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(body.listCount, body.sessionId);\n" +
"  res.json({ success: true, phase_plan: plan });\n" +
"});\n\n" +
"app.post('/api/session/phase-advance', async function(req, res) {\n" +
"  try {\n" +
"    var body = req.body;\n" +
"    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });\n" +
"    res.json({ status: 'advancing', sessionId: body.sessionId });\n" +
"    advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });\n" +
"  } catch (err) { res.status(500).json({ error: err.message }); }\n" +
"});";

  server = server.replace(oldOutputQueue, phase456Block);
  fixes++;
  console.log('[Fix 3] フェーズ遷移 + Phase4/5/6 APIエンドポイント追加');
} else {
  console.log('[Fix 3] スキップ');
}

// ============================================
// 4. processLineCommand に Phase 4/5/6 コマンド追加
// ============================================
var oldSmartQA = "  // スマートQ&A（Claudeがプロジェクト参照して回答）\n  try {\n    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));";
if (server.indexOf(oldSmartQA) >= 0 && server.indexOf("'フェーズ4'") === -1) {
  var newLineCommands = "  // Phase 4/5/6 コマンド\n" +
"  if (t === 'フェーズ4' || t === 'リスト作成' || t === '営業リスト') {\n" +
"    var ls = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (ls) {\n" +
"      listGen.generateFull(ls.id, false).then(function() {\n" +
"        advanceToNextPhase(ls.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[LINE Phase4]', e); sendLine('Phase4エラー: ' + e.message); });\n" +
"      return 'Phase4（営業リスト作成）を開始します。セッション: ' + ls.title;\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  if (t === 'フェーズ5' || t === '広告設計') {\n" +
"    var as = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (as) {\n" +
"      adDesigner.generateFull(as.id, false).then(function() {\n" +
"        advanceToNextPhase(as.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[LINE Phase5]', e); sendLine('Phase5エラー: ' + e.message); });\n" +
"      return 'Phase5（広告配信設計）を開始します。セッション: ' + as.title;\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  if (t === 'フェーズ6' || t === 'メディア最適化') {\n" +
"    var ms = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (ms) {\n" +
"      mediaOptimizer.generateFull(ms.id, false).then(function() {\n" +
"        advanceToNextPhase(ms.id, false).catch(function(e) { console.error(e); });\n" +
"      }).catch(function(e) { console.error('[LINE Phase6]', e); sendLine('Phase6エラー: ' + e.message); });\n" +
"      return 'Phase6（メディア最適化）を開始します。セッション: ' + ms.title;\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // フェーズスキップ\n" +
"  var skipMatch = t.match(/フェーズ(\\d+)スキップ/);\n" +
"  if (skipMatch) {\n" +
"    var skipPhase = parseInt(skipMatch[1]);\n" +
"    var ss = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (ss) {\n" +
"      var plan = (ss.phase_plan || '1,2,3,4,5,6').split(',').map(Number).filter(function(p) { return p !== skipPhase; });\n" +
"      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan.join(','), ss.id);\n" +
"      return 'Phase' + skipPhase + 'をスキップしました。現在のプラン: ' + plan.join('→');\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // フェーズ追加（やっぱりリストも）\n" +
"  if (t.indexOf('やっぱりリスト') >= 0 || t.indexOf('やっぱり広告') >= 0 || t.indexOf('やっぱりメディア') >= 0) {\n" +
"    var addPhase = t.indexOf('リスト') >= 0 ? 4 : t.indexOf('広告') >= 0 ? 5 : 6;\n" +
"    var as2 = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (as2) {\n" +
"      var plan2 = (as2.phase_plan || '1,2,3,4,5,6').split(',').map(Number);\n" +
"      if (plan2.indexOf(addPhase) === -1) {\n" +
"        plan2.push(addPhase);\n" +
"        plan2.sort(function(a,b) { return a - b; });\n" +
"        db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan2.join(','), as2.id);\n" +
"        return 'Phase' + addPhase + 'を追加しました。プラン: ' + plan2.join('→');\n" +
"      }\n" +
"      return 'Phase' + addPhase + 'は既にプランに含まれています';\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // リスト確認\n" +
"  var listCheckMatch = t.match(/リスト確認\\s*(\\d+)/);\n" +
"  if (listCheckMatch || t === 'リスト確認') {\n" +
"    var lcSid = listCheckMatch ? parseInt(listCheckMatch[1]) : null;\n" +
"    var lcSession = lcSid ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(lcSid) : db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (lcSession) {\n" +
"      var aCount = db.prepare(\"SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'A' AND status = 'active'\").get(lcSession.id);\n" +
"      var bCount = db.prepare(\"SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'B' AND status = 'active'\").get(lcSession.id);\n" +
"      var cCount = db.prepare(\"SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'C' AND status = 'active'\").get(lcSession.id);\n" +
"      return 'リスト状況 (' + lcSession.title + ')\\nAランク: ' + aCount.cnt + '件\\nBランク: ' + bCount.cnt + '件\\nCランク: ' + cCount.cnt + '件\\n合計: ' + (aCount.cnt + bCount.cnt + cCount.cnt) + '件';\n" +
"    }\n" +
"    return 'セッションが見つかりません';\n" +
"  }\n\n" +
"  // 次のフェーズへ\n" +
"  if (t === '次のフェーズへ' || t === '次フェーズ' || t === '進む') {\n" +
"    var ns = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (ns) {\n" +
"      advanceToNextPhase(ns.id, false).catch(function(e) { console.error(e); });\n" +
"      return '次のフェーズへ進行します。';\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // このフェーズで完了\n" +
"  if (t === 'このフェーズで完了' || t === '完了') {\n" +
"    var cs = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (cs) {\n" +
"      db.prepare(\"UPDATE sessions SET status = 'completed' WHERE id = ?\").run(cs.id);\n" +
"      return 'セッション「' + cs.title + '」を完了しました。';\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // リスト件数変更\n" +
"  var listCountMatch = t.match(/リスト\\s*(\\d+)件/);\n" +
"  if (listCountMatch) {\n" +
"    var newCount = parseInt(listCountMatch[1]);\n" +
"    var lcs = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (lcs) {\n" +
"      db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(newCount, lcs.id);\n" +
"      return 'リスト目標件数を' + newCount + '件に変更しました。';\n" +
"    }\n" +
"    return 'アクティブなセッションがありません';\n" +
"  }\n\n" +
"  // ゴール変更\n" +
"  var goalMatch = t.match(/ゴール変更\\s*パターン([A-Fa-f])/);\n" +
"  if (goalMatch) {\n" +
"    var pattern = goalMatch[1].toUpperCase();\n" +
"    var planMap2 = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };\n" +
"    var gs = db.prepare(\"SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1\").get();\n" +
"    if (gs && planMap2[pattern]) {\n" +
"      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(planMap2[pattern], gs.id);\n" +
"      return 'ゴールをパターン' + pattern + '(' + planMap2[pattern].split(',').join('→') + ')に変更しました。';\n" +
"    }\n" +
"    return 'セッションが見つからないか、パターンが不正です';\n" +
"  }\n\n" +
"  // スマートQ&A（Claudeがプロジェクト参照して回答）\n  try {\n    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));";

  server = server.replace(oldSmartQA, newLineCommands);
  fixes++;
  console.log('[Fix 4] processLineCommand: Phase4/5/6 LINEコマンド追加');
} else {
  console.log('[Fix 4] スキップ');
}

// ============================================
// 5. 就寝モード拡張: Phase1完了後にphase_planの次フェーズへ自動進行
// ============================================
var oldSleepPhase1Done = "            if (cr && cr.mr >= 8) {\n              try {\n                await engine.generateFinalSummary(s.id);\n                console.log('[就寝モード] 最終統合完了 セッション' + s.id);\n                // 就寝モード Phase1レポート生成\n                var sleepReport = await engine.generatePhase1Report(s.id);\n                var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);\n                global._phase1Reports = global._phase1Reports || [];\n                global._phase1Reports.push({ title: s.title, url: sleepReportUrl });\n              } catch (err) {\n                console.error('[就寝モード] 最終統合エラー:', err.message);\n              }\n            }";

if (server.indexOf(oldSleepPhase1Done) >= 0 && server.indexOf('就寝モード Phase4/5/6 自動進行') === -1) {
  var newSleepPhase1Done = "            if (cr && cr.mr >= 8) {\n              try {\n                await engine.generateFinalSummary(s.id);\n                console.log('[就寝モード] 最終統合完了 セッション' + s.id);\n                // 就寝モード Phase1レポート生成\n                var sleepReport = await engine.generatePhase1Report(s.id);\n                var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);\n                global._phase1Reports = global._phase1Reports || [];\n                global._phase1Reports.push({ title: s.title, url: sleepReportUrl });\n                // 就寝モード Phase4/5/6 自動進行\n                await advanceToNextPhase(s.id, true);\n              } catch (err) {\n                console.error('[就寝モード] 最終統合エラー:', err.message);\n              }\n            }";
  server = server.replace(oldSleepPhase1Done, newSleepPhase1Done);
  fixes++;
  console.log('[Fix 5] 就寝モード: Phase1完了後の自動進行追加');
} else {
  console.log('[Fix 5] スキップ');
}

// ============================================
// 6. 朝サマリー拡張: Phase4/5/6進捗を含める
// ============================================
var oldMorningSummary = "      msg += star + s.title + ' → Phase' + s.phase + ' Step' + s.current_round + dl + '\\n';";
if (server.indexOf(oldMorningSummary) >= 0 && server.indexOf('list_entries') === -1) {
  var newMorningSummary = "      var phaseLabels2 = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット', 4:'営業リスト', 5:'広告設計', 6:'メディア最適化'};\n" +
"      var phLabel = phaseLabels2[s.phase] || 'Phase' + s.phase;\n" +
"      msg += star + s.title + ' → ' + phLabel + ' Step' + s.current_round + dl + '\\n';\n" +
"      // Phase4リスト状況\n" +
"      if (s.phase >= 4) {\n" +
"        var le = db.prepare(\"SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND status = 'active'\").get(s.id);\n" +
"        if (le && le.cnt > 0) msg += '  └ リスト: ' + le.cnt + '件\\n';\n" +
"      }";
  server = server.replace(oldMorningSummary, newMorningSummary);
  fixes++;
  console.log('[Fix 6] 朝サマリー: Phase4/5/6進捗追加');
} else {
  console.log('[Fix 6] スキップ');
}

// ============================================
// 7. ダッシュボード拡張: フェーズラベル
// ============================================
var oldDashPhase = "    var phaseLabel = ['壁打ち','訴求設計','アウトプット'][s.phase - 1] || 'Phase' + s.phase;";
if (server.indexOf(oldDashPhase) >= 0) {
  var newDashPhase = "    var phaseLabel = ['壁打ち','訴求設計','アウトプット','営業リスト','広告設計','メディア最適化'][s.phase - 1] || 'Phase' + s.phase;";
  server = server.replace(oldDashPhase, newDashPhase);
  fixes++;
  console.log('[Fix 7] ダッシュボード: Phase4/5/6ラベル追加');
} else {
  console.log('[Fix 7] スキップ');
}

// ============================================
// 8. ヘルスチェック拡張
// ============================================
var oldHealth = "    sessions: sessionCount.cnt,\n    cases: caseCount.cnt";
if (server.indexOf(oldHealth) >= 0 && server.indexOf('listEntries') === -1) {
  var newHealth = "    sessions: sessionCount.cnt,\n    cases: caseCount.cnt,\n    listEntries: db.prepare('SELECT COUNT(*) as cnt FROM list_entries').get().cnt,\n    adDesigns: db.prepare('SELECT COUNT(*) as cnt FROM ad_designs').get().cnt,\n    mediaOptimizations: db.prepare('SELECT COUNT(*) as cnt FROM media_optimizations').get().cnt";
  server = server.replace(oldHealth, newHealth);
  fixes++;
  console.log('[Fix 8] ヘルスチェック: Phase4/5/6カウント追加');
} else {
  console.log('[Fix 8] スキップ');
}

fs.writeFileSync(serverFile, server, 'utf8');

console.log('\n============================');
console.log('patch_server_phase456.js 完了: ' + fixes + '件修正');
console.log('============================');
