// LINE送信の文字化け修正スクリプト
// Content-Type に charset=UTF-8 を追加し、Buffer/write で明示的に utf8 を指定
var fs = require('fs');

// === 1. src/server.js ===
var s = fs.readFileSync('src/server.js', 'utf8');
var origS = s;

// 全てのLINE API呼び出しで Content-Type を修正
// パターン: 'Content-Type': 'application/json' → 'Content-Type': 'application/json; charset=UTF-8'
// ただし既にcharsetがある場合はスキップ
s = s.replace(/'Content-Type': 'application\/json'/g, function(match) {
  return "'Content-Type': 'application/json; charset=UTF-8'";
});

// Buffer.byteLength(data) → Buffer.byteLength(data, 'utf8')
// line.me関連のコンテキストのみ (既にutf8指定済みはスキップ)
s = s.replace(/Buffer\.byteLength\(data\)/g, "Buffer.byteLength(data, 'utf8')");

// req.write(data); → req.write(data, 'utf8');
// r.write(data); → r.write(data, 'utf8');
s = s.replace(/req\.write\(data\);/g, "req.write(data, 'utf8');");
s = s.replace(/r\.write\(data\);/g, "r.write(data, 'utf8');");

if (s !== origS) {
  fs.writeFileSync('src/server.js', s, 'utf8');
  console.log('[OK] src/server.js 修正完了');
} else {
  console.log('[SKIP] src/server.js 変更なし');
}

// === 2. src/services/notification.js ===
var n = fs.readFileSync('src/services/notification.js', 'utf8');
var origN = n;

n = n.replace(/'Content-Type': 'application\/json'/g, "'Content-Type': 'application/json; charset=UTF-8'");
n = n.replace(/Buffer\.byteLength\(data\)/g, "Buffer.byteLength(data, 'utf8')");
n = n.replace(/req\.write\(data\);/g, "req.write(data, 'utf8');");

if (n !== origN) {
  fs.writeFileSync('src/services/notification.js', n, 'utf8');
  console.log('[OK] src/services/notification.js 修正完了');
} else {
  console.log('[SKIP] src/services/notification.js 変更なし');
}

// === 3. gen_html_notify.js ===
var g = fs.readFileSync('gen_html_notify.js', 'utf8');
var origG = g;

g = g.replace(/'Content-Type': 'application\/json'/g, "'Content-Type': 'application/json; charset=UTF-8'");
g = g.replace(/Buffer\.byteLength\(data\)/g, "Buffer.byteLength(data, 'utf8')");
g = g.replace(/req2\.write\(data\);/g, "req2.write(data, 'utf8');");

if (g !== origG) {
  fs.writeFileSync('gen_html_notify.js', g, 'utf8');
  console.log('[OK] gen_html_notify.js 修正完了');
} else {
  console.log('[SKIP] gen_html_notify.js 変更なし');
}

console.log('\n全ファイル処理完了');
