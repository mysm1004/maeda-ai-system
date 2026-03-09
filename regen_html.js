// regen_html.js - 既存output_queueからHTMLを再生成してLINE通知
require('dotenv').config();
var path = require('path');
var fs = require('fs');
var https = require('https');
var db = require('better-sqlite3')('./data/kabeuchi.db');

function extractHTMLFromContent(raw) {
  var m = raw.match(/```html\s*\n([\s\S]*?)```/);
  if (m) return m[1].trim();
  var trimmed = raw.trim();
  if (trimmed.indexOf('<!DOCTYPE') === 0 || trimmed.indexOf('<html') === 0) return trimmed;
  return '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>' +
    '</head><body><div class="content">' + raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') + '</div></body></html>';
}

var rows = db.prepare('SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id ORDER BY oq.id').all();
var outputDir = path.join(__dirname, 'src/public/outputs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ'};
var labels = ['A (PASONA)', 'B (ベネフィット直球)', 'C (ストーリー)', 'D (恐怖訴求)'];
var allResults = [];

rows.forEach(function(row) {
  var patterns = [];
  try { patterns = JSON.parse(row.patterns || '[]'); } catch(e) {}
  if (patterns.length === 0) { console.log('スキップ: id=' + row.id + ' パターンなし'); return; }

  var ts = Date.now();
  var patternFiles = [];
  var recommended = row.recommended_pattern || '';

  patterns.forEach(function(p, i) {
    var letter = String.fromCharCode(65 + i);
    var raw = p.content || (typeof p === 'string' ? p : JSON.stringify(p));
    var html = extractHTMLFromContent(raw);
    var fileName = row.output_type + '_' + row.session_id + '_' + letter + '_' + ts + '.html';
    fs.writeFileSync(path.join(outputDir, fileName), html, 'utf8');
    patternFiles.push({ letter: letter, label: labels[i] || 'パターン' + letter, file: fileName, star: recommended === letter });
    console.log('  保存: ' + fileName);
  });

  var indexName = row.output_type + '_' + row.session_id + '_index_' + ts + '.html';
  var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
  var typeLabel = typeLabels[row.output_type] || row.output_type;
  var linksHtml = patternFiles.map(function(pf) {
    var star = pf.star ? ' ⭐推奨' : '';
    return '<a href="/outputs/' + pf.file + '" class="card' + (pf.star ? ' recommended' : '') + '">' +
      '<span class="label">' + pf.label + star + '</span><span class="arrow">→</span></a>';
  }).join('');

  var indexHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' +
    '<title>' + typeLabel + ' - ID:' + row.session_id + ' ' + (row.title || '') + '</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f0f2f5;color:#333;padding:20px;max-width:600px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;text-align:center;margin-bottom:8px}.subtitle{text-align:center;color:#666;font-size:14px;margin-bottom:24px}.card{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:12px;text-decoration:none;color:#333;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:all 0.2s}.card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-2px)}.card.recommended{border:2px solid #ff9800;background:#fff8e1}.label{font-size:16px;font-weight:600}.arrow{font-size:20px;color:#888}.meta{text-align:center;font-size:12px;color:#999;margin-top:24px;padding-top:16px;border-top:1px solid #e0e0e0}</style></head><body>' +
    '<h1>' + typeLabel + '</h1><div class="subtitle">ID:' + row.session_id + ' ' + (row.title || '') + '</div>' +
    linksHtml +
    '<div class="meta">前田法律事務所 AIシステム | ' + now + '</div></body></html>';

  fs.writeFileSync(path.join(outputDir, indexName), indexHtml, 'utf8');
  console.log('[HTML] インデックス: ' + indexName + ' (' + patternFiles.length + 'パターン)');
  allResults.push({ sessionId: row.session_id, title: row.title, type: row.output_type, typeLabel: typeLabel, indexFile: indexName });
});

console.log('\n====== 生成完了: ' + allResults.length + '件 ======');
allResults.forEach(function(r) {
  console.log('ID:' + r.sessionId + ' ' + r.title + ' ' + r.typeLabel);
  console.log('  URL: https://176-32-87-118.sslip.io/outputs/' + r.indexFile);
});

// LINE通知
if (allResults.length > 0) {
  var lineMsg = allResults.map(function(r) {
    return 'ID:' + r.sessionId + ' ' + r.title + ' ' + r.typeLabel + '\n\u{1F449} https://176-32-87-118.sslip.io/outputs/' + r.indexFile;
  }).join('\n\n');

  var user = db.prepare('SELECT DISTINCT user_id FROM line_messages WHERE user_id IS NOT NULL ORDER BY id DESC LIMIT 1').get();
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (token && user && user.user_id) {
    var data = JSON.stringify({ to: user.user_id, messages: [{ type: 'text', text: lineMsg }] });
    var req = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/push', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { console.log('[LINE] status:' + res.statusCode + ' ' + b); }); });
    req.write(data); req.end();
  } else {
    console.log('[LINE] トークン未設定またはユーザーID不明');
  }
}
