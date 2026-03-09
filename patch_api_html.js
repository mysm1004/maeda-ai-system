// patch_api_html.js
// APIエンドポイント /api/output/generate にHTML生成+LINE通知を追加
var fs = require('fs');
var sv = fs.readFileSync('/home/ubuntu/kabeuchi-system/src/server.js', 'utf8');

var oldEndpoint = "app.post('/api/output/generate', async function(req, res) {\n  try {\n    var body = req.body;\n    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });\n    var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});\n    res.json(result);";

var newEndpoint = "app.post('/api/output/generate', async function(req, res) {\n  try {\n    var body = req.body;\n    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });\n    // 即レスポンス（バックグラウンドで生成）\n    res.json({ status: 'generating', sessionId: body.sessionId, outputType: body.outputType });\n    (async function() {\n      try {\n        var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(body.sessionId);\n        var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', fax:'FAX DM', email:'営業メール'};\n        var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});\n        var htmlFile = generateOutputHTML(result, body.outputType, body.sessionId);\n        var title = session ? session.title : '';\n        await sendLine('ID:' + body.sessionId + ' ' + title + ' ' + (typeLabels[body.outputType] || body.outputType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);\n      } catch(e) {\n        console.error('[output API]', e);\n        await sendLine('ID:' + body.sessionId + ' ' + (body.outputType || 'output') + '生成エラー。' + e.message);\n      }\n    })();\n    return;";

if (sv.indexOf(oldEndpoint) >= 0) {
  sv = sv.replace(oldEndpoint, newEndpoint);
  fs.writeFileSync('/home/ubuntu/kabeuchi-system/src/server.js', sv, 'utf8');
  console.log('[OK] APIエンドポイントにHTML生成+LINE通知追加');
} else {
  console.log('[SKIP] パターン不一致 - 手動確認が必要');
}
