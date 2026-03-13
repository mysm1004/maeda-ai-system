const fs = require("fs");
const md = fs.readFileSync("/home/ubuntu/kabeuchi-system/handover.md", "utf8");

// Markdown表のHTML変換
function convertTables(text) {
  const lines = text.split("\n");
  let result = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // セパレータ行をスキップ
      if (/^\|[\s\-:|]+\|$/.test(line)) continue;
      tableRows.push(line);
    } else {
      if (inTable) {
        // テーブル出力
        let html = '<table>';
        tableRows.forEach((row, idx) => {
          const cells = row.split("|").filter((c, ci) => ci > 0 && ci < row.split("|").length - 1);
          const tag = idx === 0 ? "th" : "td";
          html += "<tr>" + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join("") + "</tr>";
        });
        html += "</table>";
        result.push(html);
        inTable = false;
        tableRows = [];
      }
      result.push(line);
    }
  }
  if (inTable && tableRows.length > 0) {
    let html = '<table>';
    tableRows.forEach((row, idx) => {
      const cells = row.split("|").filter((c, ci) => ci > 0 && ci < row.split("|").length - 1);
      const tag = idx === 0 ? "th" : "td";
      html += "<tr>" + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join("") + "</tr>";
    });
    html += "</table>";
    result.push(html);
  }
  return result.join("\n");
}

let h = convertTables(md);

h = h
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  // テーブルタグを復元
  .replace(/&lt;table&gt;/g, "<table>")
  .replace(/&lt;\/table&gt;/g, "</table>")
  .replace(/&lt;tr&gt;/g, "<tr>")
  .replace(/&lt;\/tr&gt;/g, "</tr>")
  .replace(/&lt;th&gt;/g, "<th>")
  .replace(/&lt;\/th&gt;/g, "</th>")
  .replace(/&lt;td&gt;/g, "<td>")
  .replace(/&lt;\/td&gt;/g, "</td>")
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
<title>AI壁打ちシステム 完全引き継ぎ情報（2026-03-10 パッチ適用後）</title>
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
th{background:#e8eaf6;font-weight:bold}
tr:nth-child(odd){background:#f9f9f9}
@media(max-width:600px){body{padding:8px;font-size:14px}h1{font-size:1.3em}h2{font-size:1.1em}pre{font-size:.75em}table{font-size:.8em}}
</style>
</head>
<body>
${h}
</body>
</html>`;

// /tmpに書き出し（sudo cpで/var/www/htmlへ）
fs.writeFileSync("/tmp/handover_new.html", full, "utf8");
console.log("HTML generated: " + full.length + " bytes → /tmp/handover_new.html");
