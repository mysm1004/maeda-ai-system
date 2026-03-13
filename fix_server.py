import re

with open('/home/ubuntu/kabeuchi-system/src/server.js', 'r') as f:
    content = f.read()

# extractHTMLFromContent関数を置換
old_func = """function extractHTMLFromContent(raw) {
  // ```html ... ``` または ```html ... EOF を抽出
  var backtickIdx = raw.indexOf('```html');
  if (backtickIdx >= 0) {
    var after = raw.substring(backtickIdx + 7).trim();
    // <!DOCTYPE or <html を探す
    var htmlStart = after.indexOf('<!DOCTYPE');
    if (htmlStart === -1) htmlStart = after.indexOf('<html');
    if (htmlStart >= 0) {
      var html = after.substring(htmlStart);
      // 末尾の```があれば除去
      var closeIdx = html.lastIndexOf('```');
      if (closeIdx > 0) html = html.substring(0, closeIdx).trim();
      // </html>で切る
      var endHtml = html.lastIndexOf('</html>');
      if (endHtml >= 0) html = html.substring(0, endHtml + 7);
      return html;
    }
  }
  var m = raw.match(/```html\\s*\\n([\\s\\S]*?)```/);
  if (m) return m[1].trim();
  var trimmed = raw.trim();
  if (trimmed.indexOf("<!DOCTYPE") === 0 || trimmed.indexOf("<html") === 0) return trimmed;
  return '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>' +
    '</head><body><div class="content">' + raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\n/g,"<br>") + '</div></body></html>';
}"""

new_func = """function extractHTMLFromContent(raw) {
  // ```html ... ``` または ```html ... EOF を抽出
  var backtickIdx = raw.indexOf('```html');
  var html = null;
  if (backtickIdx >= 0) {
    var after = raw.substring(backtickIdx + 7).trim();
    var htmlStart = after.indexOf('<!DOCTYPE');
    if (htmlStart === -1) htmlStart = after.indexOf('<html');
    if (htmlStart >= 0) {
      html = after.substring(htmlStart);
      var closeIdx = html.lastIndexOf('```');
      if (closeIdx > 0) html = html.substring(0, closeIdx).trim();
      var endHtml = html.lastIndexOf('</html>');
      if (endHtml >= 0) html = html.substring(0, endHtml + 7);
    }
  }
  if (!html) {
    var m = raw.match(/```html\\s*\\n([\\s\\S]*?)```/);
    if (m) html = m[1].trim();
  }
  if (!html) {
    var trimmed = raw.trim();
    if (trimmed.indexOf("<!DOCTYPE") === 0 || trimmed.indexOf("<html") === 0) html = trimmed;
  }
  // HTML完全性チェック: </html>がない場合は補完
  if (html) {
    if (html.indexOf('</html>') === -1) {
      console.warn('[HTML警告] </html>タグなし - HTMLが途中で切れています。自動補完します。');
      if (html.indexOf('</style>') === -1) {
        html += '\\n}\\n</style>\\n</head>\\n<body>\\n<div style="text-align:center;padding:60px 20px;font-family:sans-serif;"><h2 style="color:#e53e3e;margin-bottom:16px;">HTML生成が途中で中断されました</h2><p style="color:#666;">再生成してください。</p></div>\\n</body>\\n</html>';
        console.error('[HTML致命的] CSSの途中で切断。<body>コンテンツなし。再生成が必要です。');
      } else if (html.indexOf('</body>') === -1) {
        html += '\\n</body>\\n</html>';
      } else {
        html += '\\n</html>';
      }
    }
    return html;
  }
  return '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>' +
    '</head><body><div class="content">' + raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\n/g,"<br>") + '</div></body></html>';
}"""

if old_func in content:
    content = content.replace(old_func, new_func)
    print('extractHTMLFromContent replaced successfully')
else:
    print('ERROR: exact match not found, trying line-by-line approach')
    # Find the function and replace it
    start_marker = 'function extractHTMLFromContent(raw) {'
    start_idx = content.find(start_marker)
    if start_idx >= 0:
        # Find the end of the function - look for the next top-level function or closing brace
        # Count braces from the opening
        brace_count = 0
        end_idx = start_idx
        found_first = False
        for i in range(start_idx, len(content)):
            if content[i] == '{':
                brace_count += 1
                found_first = True
            elif content[i] == '}':
                brace_count -= 1
                if found_first and brace_count == 0:
                    end_idx = i + 1
                    break
        old_text = content[start_idx:end_idx]
        content = content[:start_idx] + new_func + content[end_idx:]
        print(f'Function replaced using brace-matching approach (chars {start_idx}-{end_idx})')
    else:
        print('ERROR: function not found at all')

with open('/home/ubuntu/kabeuchi-system/src/server.js', 'w') as f:
    f.write(content)
print('Done writing server.js')
