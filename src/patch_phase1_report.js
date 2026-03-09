// Phase1完了レポート機能パッチ
// server.js にHTMLレポート生成 + LINE通知を追加
var fs = require('fs');

var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');

// 1. generatePhase1ReportHTML 関数を追加（generateOutputHTML の前）
var outputHTMLMarker = '// ============================================\n// HTML出力生成 + LINE通知';
if (server.indexOf('generatePhase1ReportHTML') === -1) {
  var reportFunc = '';
  reportFunc += '// ============================================\n';
  reportFunc += '// Phase1完了レポートHTML生成\n';
  reportFunc += '// ============================================\n';
  reportFunc += '\n';
  reportFunc += 'function generatePhase1ReportHTML(report, sessionId) {\n';
  reportFunc += '  var ts = Date.now();\n';
  reportFunc += '  var fileName = \'phase1_report_\' + sessionId + \'_\' + ts + \'.html\';\n';
  reportFunc += '  var outputDir = pathMod.join(__dirname, \'public/outputs\');\n';
  reportFunc += '  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });\n';
  reportFunc += '\n';
  reportFunc += '  var sections = [\n';
  reportFunc += '    { num: \'1\', icon: \'01\', title: \'ターゲット\', content: report.target || \'\' },\n';
  reportFunc += '    { num: \'2\', icon: \'02\', title: \'市場・競合分析\', content: report.market || \'\' },\n';
  reportFunc += '    { num: \'3\', icon: \'03\', title: \'サービス内容・強み・勝てる理由\', content: report.service || \'\' },\n';
  reportFunc += '    { num: \'4\', icon: \'04\', title: \'売上・収支予想\', content: report.revenue || \'\' },\n';
  reportFunc += '    { num: \'5\', icon: \'05\', title: \'課題・ネック・懸念点\', content: report.challenges || \'\' },\n';
  reportFunc += '    { num: \'6\', icon: \'06\', title: \'議論における論点・仮説・立証根拠\', content: report.discussion || \'\' }\n';
  reportFunc += '  ];\n';
  reportFunc += '\n';
  reportFunc += '  var sectionsHTML = sections.map(function(s) {\n';
  reportFunc += '    var c = (s.content || \'\').replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');\n';
  reportFunc += '    // Markdown風装飾\n';
  reportFunc += '    c = c.replace(/\\*\\*(.+?)\\*\\*/g, \'<strong>$1</strong>\');\n';
  reportFunc += '    c = c.replace(/^[・-]\\s*(.+)$/gm, \'<li>$1</li>\');\n';
  reportFunc += '    c = c.replace(/(<li>.*<\\/li>\\n?)+/g, function(m) { return \'<ul>\' + m + \'</ul>\'; });\n';
  reportFunc += '    c = c.replace(/\\n/g, \'<br>\');\n';
  reportFunc += '    return \'<section class="report-section\"><div class="section-header\"><span class="section-num\">\' + s.num + \'</span><h2>\' + s.title + \'</h2></div><div class="section-body\">\' + c + \'</div></section>\';\n';
  reportFunc += '  }).join(\'\');\n';
  reportFunc += '\n';
  reportFunc += '  var now = new Date().toLocaleString(\'ja-JP\', {timeZone:\'Asia/Tokyo\'});\n';
  reportFunc += '  var topicEsc = (report.topic || \'\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');\n';
  reportFunc += '  var titleEsc = (report.title || report.topic || \'\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');\n';
  reportFunc += '\n';
  reportFunc += '  var html = \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">\';\n';
  reportFunc += '  html += \'<title>Phase1完了レポート - \' + topicEsc + \'</title>\';\n';
  reportFunc += '  html += \'<style>\';\n';
  reportFunc += '  html += \'*{margin:0;padding:0;box-sizing:border-box}\';\n';
  reportFunc += '  html += \'body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;background:#f8f9fa;color:#2c3e50;line-height:1.8}\';\n';
  reportFunc += '  html += \'.header{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;padding:32px 20px 28px;text-align:center}\';\n';
  reportFunc += '  html += \'.header h1{font-size:14px;font-weight:400;letter-spacing:2px;opacity:0.8;margin-bottom:8px}\';\n';
  reportFunc += '  html += \'.header .topic{font-size:22px;font-weight:700;margin-bottom:6px}\';\n';
  reportFunc += '  html += \'.header .meta{font-size:12px;opacity:0.6}\';\n';
  reportFunc += '  html += \'.container{max-width:780px;margin:0 auto;padding:20px 16px 40px}\';\n';
  reportFunc += '  html += \'.report-section{background:#fff;border-radius:12px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);overflow:hidden}\';\n';
  reportFunc += '  html += \'.section-header{display:flex;align-items:center;gap:12px;padding:16px 20px 12px;border-bottom:1px solid #eef2f7}\';\n';
  reportFunc += '  html += \'.section-num{display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:linear-gradient(135deg,#16213e,#0f3460);color:#fff;border-radius:50%;font-size:14px;font-weight:700;flex-shrink:0}\';\n';
  reportFunc += '  html += \'.section-header h2{font-size:16px;color:#1a1a2e;font-weight:700}\';\n';
  reportFunc += '  html += \'.section-body{padding:16px 20px 20px;font-size:14px;color:#444}\';\n';
  reportFunc += '  html += \'.section-body strong{color:#1a1a2e}\';\n';
  reportFunc += '  html += \'.section-body ul{margin:8px 0;padding-left:20px;list-style:none}\';\n';
  reportFunc += '  html += \'.section-body li{position:relative;padding-left:16px;margin-bottom:4px}\';\n';
  reportFunc += '  html += \'.section-body li:before{content:"";position:absolute;left:0;top:10px;width:6px;height:6px;background:#0f3460;border-radius:50%}\';\n';
  reportFunc += '  html += \'.footer{text-align:center;padding:20px;font-size:11px;color:#999;border-top:1px solid #eee;margin-top:20px}\';\n';
  reportFunc += '  html += \'@media(max-width:600px){.header{padding:24px 16px 20px}.header .topic{font-size:18px}.section-header h2{font-size:15px}.section-body{padding:14px 16px 16px;font-size:13px}}\';\n';
  reportFunc += '  html += \'</style></head><body>\';\n';
  reportFunc += '  html += \'<div class="header"><h1>PHASE 1 完了レポート</h1><div class="topic">\' + titleEsc + \'</div><div class="meta">セッションID: \' + sessionId + \' | \' + now + \'</div></div>\';\n';
  reportFunc += '  html += \'<div class="container">\' + sectionsHTML + \'</div>\';\n';
  reportFunc += '  html += \'<div class="footer">前田法律事務所 AI壁打ちシステム | Phase1 壁打ち完了 → Phase2 訴求設計へ</div>\';\n';
  reportFunc += '  html += \'</body></html>\';\n';
  reportFunc += '\n';
  reportFunc += '  fs.writeFileSync(pathMod.join(outputDir, fileName), html, \'utf8\');\n';
  reportFunc += '  console.log(\'[Phase1Report] HTML生成: \' + fileName);\n';
  reportFunc += '  return \'https://176-32-87-118.sslip.io/outputs/\' + fileName;\n';
  reportFunc += '}\n';
  reportFunc += '\n';
  reportFunc += '// Phase1レポートのLINEテキスト版を生成\n';
  reportFunc += 'function formatPhase1ReportText(report) {\n';
  reportFunc += '  var msg = \'【フェーズ1完了レポート】\\n\';\n';
  reportFunc += '  msg += \'テーマ: \' + (report.title || report.topic) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'① ターゲット\\n→ \' + (report.target || \'\').substring(0, 300) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'② 市場・競合分析\\n→ \' + (report.market || \'\').substring(0, 300) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'③ サービス内容・強み・勝てる理由\\n→ \' + (report.service || \'\').substring(0, 300) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'④ 売上・収支予想\\n→ \' + (report.revenue || \'\').substring(0, 300) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'⑤ 課題・ネック・懸念点\\n→ \' + (report.challenges || \'\').substring(0, 300) + \'\\n\\n\';\n';
  reportFunc += '  msg += \'⑥ 議論における論点・仮説・立証根拠\\n→ \' + (report.discussion || \'\').substring(0, 300);\n';
  reportFunc += '  return msg;\n';
  reportFunc += '}\n';
  reportFunc += '\n';

  server = server.replace(outputHTMLMarker, reportFunc + outputHTMLMarker);
  console.log('[server] Phase1レポート関数追加完了');
} else {
  console.log('[server] Phase1レポート関数 既に追加済み');
}

// 2. round > 8 のPhase1完了時にレポート生成 + LINE通知を追加
var oldComplete = "      var summary = await engine.generateFinalSummary(sid);\n      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。Phase2に進む準備ができました。' });";

if (server.indexOf('generatePhase1Report') > -1 && server.indexOf('Phase1レポート生成') === -1) {
  var newComplete = '';
  newComplete += '      var summary = await engine.generateFinalSummary(sid);\n';
  newComplete += '      // Phase1レポート生成 + LINE通知\n';
  newComplete += '      try {\n';
  newComplete += '        var report = await engine.generatePhase1Report(sid);\n';
  newComplete += '        var reportUrl = generatePhase1ReportHTML(report, sid);\n';
  newComplete += '        var reportText = formatPhase1ReportText(report);\n';
  newComplete += '        await sendLine(reportText + \'\\n\\n詳細レポート:\\n\' + reportUrl);\n';
  newComplete += '        console.log(\'[Phase1] レポート送信完了: \' + reportUrl);\n';
  newComplete += '      } catch (reportErr) {\n';
  newComplete += '        console.error(\'[Phase1Report] エラー:\', reportErr.message);\n';
  newComplete += '      }\n';
  newComplete += '      return res.json({ phase: \'complete\', sessionId: sid, summary: summary, message: \'全8ステップ完了。Phase2に進む準備ができました。\' });';

  server = server.replace(oldComplete, newComplete);
  console.log('[server] API Phase1完了時のレポート生成追加');
} else {
  console.log('[server] API Phase1完了 スキップ');
}

// 3. 就寝モードのPhase1完了時にもレポート生成を追加
var oldSleepComplete = "          try { await engine.generateFinalSummary(s.id); console.log('[就寝モード] 最終統合完了 セッション' + s.id); }";

if (server.indexOf(oldSleepComplete) >= 0 && server.indexOf('就寝モード Phase1レポート') === -1) {
  var newSleepComplete = '';
  newSleepComplete += '          try {\n';
  newSleepComplete += '              await engine.generateFinalSummary(s.id);\n';
  newSleepComplete += '              console.log(\'[就寝モード] 最終統合完了 セッション\' + s.id);\n';
  newSleepComplete += '              // 就寝モード Phase1レポート生成\n';
  newSleepComplete += '              var sleepReport = await engine.generatePhase1Report(s.id);\n';
  newSleepComplete += '              var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);\n';
  newSleepComplete += '              global._phase1Reports = global._phase1Reports || [];\n';
  newSleepComplete += '              global._phase1Reports.push({ title: s.title, url: sleepReportUrl });\n';
  newSleepComplete += '            }';

  server = server.replace(oldSleepComplete, newSleepComplete);
  console.log('[server] 就寝モード Phase1完了時のレポート生成追加');
} else {
  console.log('[server] 就寝モード Phase1完了 スキップ');
}

// 4. 朝サマリーにPhase1レポートURL追加
var morningSleepResultsNull = "    global._sleepResults = null;";
if (server.indexOf('_phase1Reports') === -1 || server.indexOf('phase1Reports forEach') === -1) {
  var morningReportAdd = '';
  morningReportAdd += '    global._sleepResults = null;\n';
  morningReportAdd += '    // Phase1完了レポートがあれば追加\n';
  morningReportAdd += '    if (global._phase1Reports && global._phase1Reports.length > 0) {\n';
  morningReportAdd += '      msg += \'\\n\\n【Phase1完了レポート】\\n\';\n';
  morningReportAdd += '      global._phase1Reports.forEach(function(pr) {\n';
  morningReportAdd += '        msg += \'・\' + pr.title + \'\\n  \' + pr.url + \'\\n\';\n';
  morningReportAdd += '      });\n';
  morningReportAdd += '      global._phase1Reports = null;\n';
  morningReportAdd += '    }';

  server = server.replace(morningSleepResultsNull, morningReportAdd);
  console.log('[server] 朝サマリーにPhase1レポートURL追加');
} else {
  console.log('[server] 朝サマリー Phase1レポート 既に追加済み');
}

fs.writeFileSync(serverFile, server, 'utf8');
console.log('\npatch_phase1_report.js 適用完了');
