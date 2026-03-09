// gen_html_notify.js - output_queueからHTMLを生成してLINE通知を送る
require('dotenv').config();
var fs = require('fs');
var path = require('path');
var https = require('https');
var db = require('better-sqlite3')('./data/kabeuchi.db');

var row = db.prepare('SELECT * FROM output_queue WHERE id = 1').get();
if (!row) { console.log('データなし'); process.exit(1); }

var patterns = JSON.parse(row.patterns || '[]');
var critique = '';
try { var c = JSON.parse(row.critique || '{}'); critique = c.critique || c.reason || ''; } catch(e) {}

var ts = Date.now();
var fileName = row.output_type + '_' + row.session_id + '_' + ts + '.html';
var outputDir = path.join(__dirname, 'public/outputs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

var labels = ['A (PASONA)', 'B (ベネフィット直球)', 'C (ストーリー)', 'D (恐怖訴求)'];
var recommended = row.recommended_pattern || '';
var patternsHTML = patterns.map(function(p, i) {
  var label = labels[i] || 'パターン' + (i+1);
  var raw = p.content || (typeof p === 'string' ? p : JSON.stringify(p));
  var content = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  var star = (recommended === String.fromCharCode(65+i)) ? ' ⭐推奨' : '';
  return '<div class="pattern"><h2>' + label + star + '</h2><div class="content">' + content + '</div></div>';
}).join('');

var critiqueHTML = critique ? '<div class="section"><h2>批評</h2><div class="content">' + critique.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') + '</div></div>' : '';

var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>LP - 前田法律事務所AI</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f5f5f5;color:#333;line-height:1.7;padding:16px;max-width:800px;margin:0 auto}h1{font-size:20px;color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:8px;margin-bottom:20px}h2{font-size:17px;color:#16213e;margin-bottom:10px;padding:8px 12px;background:#e8eaf6;border-radius:4px}.pattern{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1)}.section{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1)}.content{font-size:14px;white-space:pre-wrap;word-wrap:break-word;padding:8px 0}.meta{font-size:12px;color:#888;text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid #ddd}</style></head><body><h1>LP アウトプット</h1>' + patternsHTML + critiqueHTML + '<div class="meta">前田法律事務所 AIシステム | セッションID: ' + row.session_id + ' | ' + now + '</div></body></html>';

fs.writeFileSync(path.join(outputDir, fileName), html, 'utf8');
console.log('[HTML] 生成完了: ' + fileName);

// LINE通知
var session = db.prepare('SELECT title FROM sessions WHERE id = ?').get(row.session_id);
var title = session ? session.title : '';
var msg = 'ID:' + row.session_id + ' ' + title + ' LP全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + fileName;
var data = JSON.stringify({ to: 'U61480433672e5161e2c5f9db4a405822', messages: [{ type: 'text', text: msg }] });
var opts = {
  hostname: 'api.line.me', path: '/v2/bot/message/push', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.LINE_CHANNEL_TOKEN, 'Content-Length': Buffer.byteLength(data) }
};
var req2 = https.request(opts, function(r) {
  var body = '';
  r.on('data', function(c) { body += c; });
  r.on('end', function() { console.log('[LINE] status:' + r.statusCode + ' ' + body); });
});
req2.write(data);
req2.end();
