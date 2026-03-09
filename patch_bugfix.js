// バグフィックスパッチ
// 6件のバグを修正
var fs = require('fs');

// ============================================
// 1. schema.js: CREATE INDEX を try/catch で保護
// ============================================
var schemaFile = '/home/ubuntu/kabeuchi-system/src/db/schema.js';
var schema = fs.readFileSync(schemaFile, 'utf8');
var fixes = 0;

// idx_logs_phase の CREATE INDEX を try/catch で保護
var oldIndex = 'db.exec("CREATE INDEX IF NOT EXISTS idx_logs_phase ON discussion_logs(session_id, phase, round_number)");';
if (schema.indexOf(oldIndex) >= 0 && schema.indexOf('try { db.exec("CREATE INDEX IF NOT EXISTS idx_logs_phase') === -1) {
  var newIndex = 'try { db.exec("CREATE INDEX IF NOT EXISTS idx_logs_phase ON discussion_logs(session_id, phase, round_number)"); } catch(e) {}';
  schema = schema.replace(oldIndex, newIndex);
  fixes++;
  console.log('[Fix 1] schema.js: CREATE INDEX idx_logs_phase を try/catch で保護');
} else {
  console.log('[Fix 1] スキップ（既に修正済み or パターン不一致）');
}

fs.writeFileSync(schemaFile, schema, 'utf8');

// ============================================
// 2-6. server.js の修正
// ============================================
var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');

// Fix 2: 週次レポート - 競合動向をDB保存前に組み立てる
var oldWeekly = "db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);\n  // 競合動向";
if (server.indexOf(oldWeekly) >= 0) {
  // 競合動向セクションをDB保存前に移動
  // まず旧コードブロックを特定
  var oldWeeklyBlock = "db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);\n  // 競合動向\n  var compChanges = db.prepare(\"SELECT cc.*, c.name FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id WHERE cc.detected_at > datetime('now', '-7 days')\").all();\n  if (compChanges.length > 0) {\n    report += '\\n\\n【競合動向】\\n' + compChanges.map(function(cc) { return '・' + cc.name + ': ' + cc.change_summary; }).join('\\n');\n  }\n\n  await sendLine('【週次レポート】\\n\\n' + report);";

  if (server.indexOf(oldWeeklyBlock) >= 0) {
    var newWeeklyBlock = "// 競合動向をレポートに追加（DB保存前）\n  var compChanges = db.prepare(\"SELECT cc.*, c.name FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id WHERE cc.detected_at > datetime('now', '-7 days')\").all();\n  if (compChanges.length > 0) {\n    report += '\\n\\n【競合動向】\\n' + compChanges.map(function(cc) { return '・' + cc.name + ': ' + cc.change_summary; }).join('\\n');\n  }\n  db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);\n\n  await sendLine('【週次レポート】\\n\\n' + report);";
    server = server.replace(oldWeeklyBlock, newWeeklyBlock);
    fixes++;
    console.log('[Fix 2] server.js: 週次レポート競合動向をDB保存前に移動');
  } else {
    console.log('[Fix 2] スキップ（ブロックパターン不一致）');
  }
} else {
  console.log('[Fix 2] スキップ（パターン不一致）');
}

// Fix 3: fetchUrl にリダイレクト対応を追加
var oldFetchUrl = "function fetchUrl(url) {\n  return new Promise(function(resolve, reject) {\n    var mod = url.startsWith('https') ? https : require('http');\n    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(res) {\n      var data = '';\n      res.on('data', function(c) { data += c; });\n      res.on('end', function() { resolve(data); });\n    }).on('error', function(e) { reject(e); });\n  });\n}";

if (server.indexOf(oldFetchUrl) >= 0) {
  var newFetchUrl = "function fetchUrl(url, maxRedirects) {\n  if (maxRedirects === undefined) maxRedirects = 5;\n  return new Promise(function(resolve, reject) {\n    var mod = url.startsWith('https') ? https : require('http');\n    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(res) {\n      // リダイレクト対応\n      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) && res.headers.location && maxRedirects > 0) {\n        var redirectUrl = res.headers.location;\n        if (redirectUrl.startsWith('/')) redirectUrl = (url.startsWith('https') ? 'https' : 'http') + '://' + require('url').parse(url).host + redirectUrl;\n        fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);\n        return;\n      }\n      var data = '';\n      res.on('data', function(c) { data += c; });\n      res.on('end', function() { resolve(data); });\n    }).on('error', function(e) { reject(e); });\n  });\n}";
  server = server.replace(oldFetchUrl, newFetchUrl);
  fixes++;
  console.log('[Fix 3] server.js: fetchUrl にリダイレクト対応追加（最大5回）');
} else {
  console.log('[Fix 3] スキップ（パターン不一致）');
}

// Fix 4: approveOutput エンドポイントで outputType を正しく取得
var oldApprove = "if (body.pattern) prefLearner.learnFromPatternChoice(null, body.pattern, body.outputType);";
if (server.indexOf(oldApprove) >= 0) {
  // queueItem から output_type を取得するように修正
  var newApprove = "var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);\n  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);";
  server = server.replace(oldApprove, newApprove);
  fixes++;
  console.log('[Fix 4] server.js: approveOutput エンドポイントの outputType 取得修正');
} else {
  console.log('[Fix 4] スキップ（パターン不一致）');
}

// Fix 5: コメント修正「全6ラウンド完了」→「全8ステップ完了」
var oldComment = '// 全6ラウンド完了 → 最終統合';
if (server.indexOf(oldComment) >= 0) {
  server = server.replace(oldComment, '// 全8ステップ完了 → 最終統合');
  fixes++;
  console.log('[Fix 5] server.js: コメント「全6ラウンド完了」→「全8ステップ完了」');
} else {
  console.log('[Fix 5] スキップ（既に修正済み or パターン不一致）');
}

// Fix 6: try/catch インデント修正（sleep mode）
var oldSleepTry = "            if (cr && cr.mr >= 8) {\n              try {\n              await engine.generateFinalSummary(s.id);\n              console.log('[就寝モード] 最終統合完了 セッション' + s.id);\n              // 就寝モード Phase1レポート生成\n              var sleepReport = await engine.generatePhase1Report(s.id);\n              var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);\n              global._phase1Reports = global._phase1Reports || [];\n              global._phase1Reports.push({ title: s.title, url: sleepReportUrl });\n            }\n              catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }\n            }";

if (server.indexOf(oldSleepTry) >= 0) {
  var newSleepTry = "            if (cr && cr.mr >= 8) {\n              try {\n                await engine.generateFinalSummary(s.id);\n                console.log('[就寝モード] 最終統合完了 セッション' + s.id);\n                // 就寝モード Phase1レポート生成\n                var sleepReport = await engine.generatePhase1Report(s.id);\n                var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);\n                global._phase1Reports = global._phase1Reports || [];\n                global._phase1Reports.push({ title: s.title, url: sleepReportUrl });\n              } catch (err) {\n                console.error('[就寝モード] 最終統合エラー:', err.message);\n              }\n            }";
  server = server.replace(oldSleepTry, newSleepTry);
  fixes++;
  console.log('[Fix 6] server.js: 就寝モード try/catch インデント修正');
} else {
  console.log('[Fix 6] スキップ（パターン不一致）');
}

fs.writeFileSync(serverFile, server, 'utf8');

console.log('\n============================');
console.log('patch_bugfix.js 完了: ' + fixes + '件修正');
console.log('============================');
