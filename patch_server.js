// patch_server.js
// 1. generateOutputHTML書き換え: パターン別HTMLファイル + インデックスページ
// 2. 「LP見せて」「提案書見せて」でURL返す機能追加

var fs = require('fs');
var fixCount = 0;

var svFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var sv = fs.readFileSync(svFile, 'utf8');

// ============================================
// Fix 1: generateOutputHTML を完全書き換え
// ============================================

var oldFuncMarker = 'function generateOutputHTML(result, outputType, sessionId) {';
var endMarker = '// ============================================\n// LINE Webhook';

var startIdx = sv.indexOf(oldFuncMarker);
var endIdx = sv.indexOf(endMarker);

if (startIdx >= 0 && endIdx >= 0) {
  // extractHTMLFromContent + generateOutputHTML + showExistingOutputs
  var newBlock = [
    'function extractHTMLFromContent(raw) {',
    '  var m = raw.match(/```html\\s*\\n([\\s\\S]*?)```/);',
    '  if (m) return m[1].trim();',
    '  var trimmed = raw.trim();',
    '  if (trimmed.indexOf("<!DOCTYPE") === 0 || trimmed.indexOf("<html") === 0) return trimmed;',
    '  return \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>\' +',
    '    \'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>\' +',
    '    \'</head><body><div class="content">\' + raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\n/g,"<br>") + \'</div></body></html>\';',
    '}',
    '',
    '// 既存アウトプットのURL一覧を返す（LINE「LP見せて」用）',
    'function showExistingOutputs(text, types) {',
    '  var idMatch = text.match(/(?:ID|id)\\s*(\\d+)/i);',
    '  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料"};',
    '  var query, params;',
    '  if (idMatch) {',
    '    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id WHERE oq.session_id = ? ORDER BY oq.created_at DESC";',
    '    params = [parseInt(idMatch[1])];',
    '  } else {',
    '    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id ORDER BY oq.created_at DESC LIMIT 20";',
    '    params = [];',
    '  }',
    '  var stmt = db.prepare(query);',
    '  var rows = params.length > 0 ? stmt.all(params[0]) : stmt.all();',
    '  if (types && types.length > 0) {',
    '    rows = rows.filter(function(r) { return types.indexOf(r.output_type) >= 0; });',
    '  }',
    '  if (rows.length === 0) {',
    '    sendLine("該当するアウトプットがまだありません。「LP作って」等で生成してください。");',
    '    return "アウトプット未生成";',
    '  }',
    '  var outputDir = pathMod.join(__dirname, "public/outputs");',
    '  var lines = [];',
    '  rows.forEach(function(row) {',
    '    var label = typeLabels[row.output_type] || row.output_type;',
    '    var existingFiles = [];',
    '    try { existingFiles = fs.readdirSync(outputDir).filter(function(f) { return f.indexOf(row.output_type + "_" + row.session_id + "_index_") === 0; }); } catch(e) {}',
    '    var indexFile;',
    '    if (existingFiles.length > 0) {',
    '      indexFile = existingFiles[existingFiles.length - 1];',
    '    } else {',
    '      try {',
    '        var patterns = JSON.parse(row.patterns || "[]");',
    '        var result = { patterns: patterns, critique: row.critique || "", recommended: row.recommended_pattern || "" };',
    '        indexFile = generateOutputHTML(result, row.output_type, row.session_id);',
    '      } catch(e) { console.error("[showOutputs] HTML再生成エラー:", e.message); return; }',
    '    }',
    '    lines.push("ID:" + row.session_id + " " + (row.title || "") + " " + label + "\\n\\u{1F449} https://176-32-87-118.sslip.io/outputs/" + indexFile);',
    '  });',
    '  var msg = lines.join("\\n\\n");',
    '  sendLine(msg);',
    '  return msg;',
    '}',
    '',
    'function generateOutputHTML(result, outputType, sessionId) {',
    '  var ts = Date.now();',
    '  var outputDir = pathMod.join(__dirname, "public/outputs");',
    '  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });',
    '  var patterns = result.patterns || [];',
    '  var critique = result.critique || "";',
    '  var recommended = result.recommended || "";',
    '  var session = db.prepare("SELECT title FROM sessions WHERE id = ?").get(sessionId);',
    '  var title = session ? session.title : "";',
    '  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料", press_release:"プレスリリース"};',
    '  var typeLabel = typeLabels[outputType] || outputType;',
    '  var labels = ["A (PASONA)", "B (ベネフィット直球)", "C (ストーリー)", "D (恐怖訴求)"];',
    '  var patternFiles = [];',
    '  // 各パターンを個別HTMLファイルとして保存',
    '  patterns.forEach(function(p, i) {',
    '    var letter = String.fromCharCode(65 + i);',
    '    var raw = p.content || (typeof p === "string" ? p : JSON.stringify(p));',
    '    var html = extractHTMLFromContent(raw);',
    '    var fileName = outputType + "_" + sessionId + "_" + letter + "_" + ts + ".html";',
    '    fs.writeFileSync(pathMod.join(outputDir, fileName), html, "utf8");',
    '    patternFiles.push({ letter: letter, label: labels[i] || "パターン" + letter, file: fileName, star: recommended === letter });',
    '  });',
    '  // インデックスページ生成',
    '  var indexName = outputType + "_" + sessionId + "_index_" + ts + ".html";',
    '  var now = new Date().toLocaleString("ja-JP", {timeZone:"Asia/Tokyo"});',
    '  var linksHtml = patternFiles.map(function(pf) {',
    '    var star = pf.star ? " ⭐推奨" : "";',
    '    return \'<a href="/outputs/\' + pf.file + \'" class="card\' + (pf.star ? \' recommended\' : \'\') + \'">\' +',
    '      \'<span class="label">\' + pf.label + star + \'</span><span class="arrow">→</span></a>\';',
    '  }).join("");',
    '  var indexHtml = \'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">\' +',
    '    \'<title>\' + typeLabel + \' - ID:\' + sessionId + \' \' + title + \'</title>\' +',
    '    \'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f0f2f5;color:#333;padding:20px;max-width:600px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;text-align:center;margin-bottom:8px}.subtitle{text-align:center;color:#666;font-size:14px;margin-bottom:24px}.card{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:12px;text-decoration:none;color:#333;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:all 0.2s}.card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-2px)}.card.recommended{border:2px solid #ff9800;background:#fff8e1}.label{font-size:16px;font-weight:600}.arrow{font-size:20px;color:#888}.meta{text-align:center;font-size:12px;color:#999;margin-top:24px;padding-top:16px;border-top:1px solid #e0e0e0}</style></head><body>\' +',
    '    \'<h1>\' + typeLabel + \'</h1><div class="subtitle">ID:\' + sessionId + \' \' + title + \'</div>\' +',
    '    linksHtml +',
    '    \'<div class="meta">前田法律事務所 AIシステム | \' + now + \'</div></body></html>\';',
    '  fs.writeFileSync(pathMod.join(outputDir, indexName), indexHtml, "utf8");',
    '  console.log("[HTML] 生成完了: " + indexName + " (" + patternFiles.length + "パターン)");',
    '  return indexName;',
    '}',
    '',
    ''
  ].join('\n');

  sv = sv.substring(0, startIdx) + newBlock + sv.substring(endIdx);
  fixCount++;
  console.log('[Fix 1] generateOutputHTML + extractHTMLFromContent + showExistingOutputs 書き換え完了');
} else {
  console.log('[Fix 1] SKIP - 位置特定失敗 start=' + startIdx + ' end=' + endIdx);
}

// ============================================
// Fix 2: detectOutputRequest に「見せて」ハンドラー追加
// ============================================

var actionLine = '  var actionPattern = /作って|お願い|生成|作成|出力|書いて|頼む|よろしく|ちょうだい/;';
var viewHandler = '\n  // 「〇〇見せて」「〇〇確認」等の閲覧リクエスト\n' +
  '  var viewPattern = /見せて|見たい|確認して|表示して|見る|開いて|URL|リンク/;\n' +
  '  if (viewPattern.test(t)) {\n' +
  '    var viewTypes = [];\n' +
  '    var typeKeys2 = Object.keys(outputMap);\n' +
  '    for (var vi = 0; vi < typeKeys2.length; vi++) {\n' +
  '      if (outputMap[typeKeys2[vi]].test(t)) viewTypes.push(typeKeys2[vi]);\n' +
  '    }\n' +
  '    if (viewTypes.length > 0) {\n' +
  '      return showExistingOutputs(t, viewTypes);\n' +
  '    }\n' +
  '  }\n';

if (sv.indexOf(actionLine) >= 0 && sv.indexOf('viewPattern') === -1) {
  sv = sv.replace(actionLine, actionLine + viewHandler);
  fixCount++;
  console.log('[Fix 2] 「見せて」ハンドラー追加');
} else if (sv.indexOf('viewPattern') >= 0) {
  console.log('[Fix 2] SKIP - 既に存在');
} else {
  console.log('[Fix 2] SKIP - actionPattern行が見つからない');
}

fs.writeFileSync(svFile, sv, 'utf8');

console.log('\n============================');
console.log('patch_server.js 完了: ' + fixCount + '件');
console.log('============================');
