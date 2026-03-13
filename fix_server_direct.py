#!/usr/bin/env python3
"""Directly fix extractHTMLFromContent in src/server.js"""

srv_path = '/home/ubuntu/kabeuchi-system/src/server.js'
with open(srv_path, 'r') as f:
    srv = f.read()

# Find extractHTMLFromContent function
func_name = 'function extractHTMLFromContent(raw) {'
start_idx = srv.find(func_name)
print(f'Function found at position: {start_idx}')

if start_idx < 0:
    print('Function not found! Searching for alternatives...')
    for search in ['extractHTMLFromContent', 'extractHTML', 'function extract']:
        idx = srv.find(search)
        if idx >= 0:
            print(f'  Found "{search}" at position {idx}')
            context = srv[max(0,idx-50):idx+100]
            print(f'  Context: {repr(context[:200])}')
    print('Aborting.')
    exit(1)

# Count braces to find function end
brace_count = 0
end_idx = start_idx
found_first = False
for i in range(start_idx, len(srv)):
    if srv[i] == '{':
        brace_count += 1
        found_first = True
    elif srv[i] == '}':
        brace_count -= 1
        if found_first and brace_count == 0:
            end_idx = i + 1
            break

old_func = srv[start_idx:end_idx]
print(f'Old function: {len(old_func)} chars, lines {srv[:start_idx].count(chr(10))+1}-{srv[:end_idx].count(chr(10))+1}')
print(f'First 200 chars: {old_func[:200]}')
print(f'Last 200 chars: {old_func[-200:]}')

new_func = r'''function extractHTMLFromContent(raw) {
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
    var m = raw.match(/```html\s*\n([\s\S]*?)```/);
    if (m) html = m[1].trim();
  }
  if (!html) {
    var trimmed = raw.trim();
    if (trimmed.indexOf("<!DOCTYPE") === 0 || trimmed.indexOf("<html") === 0) html = trimmed;
  }
  // HTML完全性チェック
  if (html) {
    if (html.indexOf('</html>') === -1) {
      console.warn('[HTML警告] </html>タグなし - 途中切れ検出');
      if (html.indexOf('</style>') === -1) {
        html += '\n}\n</style>\n</head>\n<body>\n<div style="text-align:center;padding:60px 20px;font-family:sans-serif;"><h2 style="color:#e53e3e;margin-bottom:16px;">HTML生成が途中で中断されました</h2><p style="color:#666;">再生成してください。</p></div>\n</body>\n</html>';
        console.error('[HTML致命的] CSSの途中で切断');
      } else if (html.indexOf('</body>') === -1) {
        html += '\n</body>\n</html>';
      } else {
        html += '\n</html>';
      }
    }
    return html;
  }
  return '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>' +
    '</head><body><div class="content">' + raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>") + '</div></body></html>';
}'''

srv = srv[:start_idx] + new_func + srv[end_idx:]

with open(srv_path, 'w') as f:
    f.write(srv)

# Verify
import subprocess
r = subprocess.run(['node', '-c', srv_path], capture_output=True, text=True)
print(f'\nSyntax check: {"OK" if r.returncode == 0 else "ERROR: " + r.stderr}')

# Verify the function exists
with open(srv_path, 'r') as f:
    check = f.read()
print(f'HTML警告 present: {"HTML警告" in check}')
print(f'HTML完全性 present: {"HTML完全性" in check}')
print('Done.')
