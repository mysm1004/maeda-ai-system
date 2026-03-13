const fs = require("fs");
const md = fs.readFileSync("/home/ubuntu/kabeuchi-system/handover.md", "utf8");

let h = md
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/^### (.+)$/gm, "<h3>$1</h3>")
  .replace(/^## (.+)$/gm, "<h2>$1</h2>")
  .replace(/^# (.+)$/gm, "<h1>$1</h1>")
  .replace(/^---$/gm, "<hr>")
  .replace(/^- (.+)$/gm, "<li>$1</li>")
  .replace(/\n\n/g, "<br><br>");

const full = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI壁打ちシステム 完全引き継ぎ情報</title>
<style>
*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.7;color:#333;max-width:900px;margin:0 auto;padding:16px;background:#f5f5f5}
h1{font-size:1.5em;color:#1a237e;border-bottom:3px solid #1a237e;padding:12px 0;margin:24px 0 16px}
h2{font-size:1.3em;color:#283593;border-left:4px solid #283593;padding:8px 12px;margin:20px 0 12px;background:#e8eaf6}
h3{font-size:1.1em;color:#3949ab;margin:16px 0 8px}
pre{background:#263238;color:#eee;padding:12px;border-radius:8px;overflow-x:auto;font-size:.85em;margin:12px 0;white-space:pre-wrap}
code{background:#e3f2fd;padding:1px 4px;border-radius:3px;font-size:.9em}
pre code{background:none;padding:0}
strong{color:#1a237e}
hr{border:none;border-top:2px solid #ddd;margin:24px 0}
li{margin:4px 0 4px 20px}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.9em}
td,th{border:1px solid #ccc;padding:6px 8px;text-align:left}
tr:nth-child(odd){background:#f9f9f9}
@media(max-width:600px){body{padding:8px;font-size:14px}h1{font-size:1.3em}h2{font-size:1.1em}pre{font-size:.75em}}
</style>
</head>
<body>
${h}
</body>
</html>`;

fs.writeFileSync("/var/www/html/handover.html", full, "utf8");
console.log("HTML generated: " + full.length + " bytes");
