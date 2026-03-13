var db = require('./schema').initDatabase('./data/kabeuchi.db');
var fs = require('fs');
var path = require('path');

var row = db.prepare('SELECT patterns, recommended_pattern FROM output_queue WHERE id = 3').get();
var patterns = JSON.parse(row.patterns);
var outDir = path.join(__dirname, 'src/public/outputs');

// Ensure output dir exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

var timestamp = Date.now();

patterns.forEach(function(p) {
  var content = p.content;

  // Extract HTML from markdown code block if present
  var codeBlockRegex = /```html\s*\n([\s\S]*?)```/;
  var m = content.match(codeBlockRegex);
  if (m) {
    content = m[1].trim();
  } else if (content.indexOf('<!DOCTYPE') >= 0) {
    content = content.substring(content.indexOf('<!DOCTYPE'));
    var endIdx = content.lastIndexOf('</html>');
    if (endIdx > 0) content = content.substring(0, endIdx + 7);
  }

  var hasBody = content.indexOf('<body') >= 0;
  var hasCloseHtml = content.indexOf('</html>') >= 0;

  var fname = 'lp_3_' + p.pattern + '_' + timestamp + '.html';
  fs.writeFileSync(path.join(outDir, fname), content);
  console.log(p.pattern + ' (' + p.name + '): ' + content.length + ' chars, body=' + hasBody + ', </html>=' + hasCloseHtml + ' -> ' + fname);
});

// Create index page
var indexHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>LP - ID:3</title>' +
  '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f0f2f5;color:#333;padding:20px;max-width:600px;margin:0 auto}' +
  'h1{font-size:22px;color:#1a1a2e;text-align:center;margin-bottom:8px}.subtitle{text-align:center;color:#666;margin-bottom:20px;font-size:14px}' +
  '.card{background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);text-decoration:none;display:block;color:#333}' +
  '.card h2{font-size:16px;margin-bottom:4px}.card p{font-size:13px;color:#666}.rec{border:2px solid #e74c3c}.rec-badge{display:inline-block;background:#e74c3c;color:#fff;font-size:11px;padding:2px 8px;border-radius:4px;margin-bottom:6px}</style></head><body>' +
  '<h1>LP比較</h1><p class="subtitle">推奨: パターン' + row.recommended_pattern + '</p>';

patterns.forEach(function(p) {
  var isRec = p.pattern === row.recommended_pattern;
  var fname = 'lp_3_' + p.pattern + '_' + timestamp + '.html';
  indexHtml += '<a href="' + fname + '" class="card' + (isRec ? ' rec' : '') + '">';
  if (isRec) indexHtml += '<span class="rec-badge">推奨</span>';
  indexHtml += '<h2>パターン' + p.pattern + ': ' + p.name + '</h2>';
  indexHtml += '<p>' + p.desc + '</p></a>';
});

indexHtml += '</body></html>';
var indexFname = 'lp_3_index_' + timestamp + '.html';
fs.writeFileSync(path.join(outDir, indexFname), indexHtml);
console.log('Index: ' + indexFname);
console.log('URL: http://176.32.87.118/outputs/' + indexFname);
