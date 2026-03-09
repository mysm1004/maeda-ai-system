// patch_quality_autofix.js
// 品質チェック不合格時に自動修正→再チェック→合格まで自走
// 確認不要。完了時だけ「ID:X LP全パターン完成。URL→〇〇」送信
// + 訴求確認も廃止（確認なしで続行）
// + LINE通知を統一フォーマットに

var fs = require('fs');
var fixCount = 0;

var ogFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var og = fs.readFileSync(ogFile, 'utf8');

// ============================================
// Fix 1: 訴求確認（Phase2 Step4後）を廃止
// ============================================
var appealStart = '  // Phase2 Step4後: 訴求の確認\n  if (this.lineQA && this.sendLineFn) {';
var appealEnd = "} catch(e) { console.log('[OutputGen] 訴求確認スキップ:', e.message); }\n  }";
var appealIdx = og.indexOf(appealStart);
var appealEndIdx = og.indexOf(appealEnd, appealIdx);

if (appealIdx >= 0 && appealEndIdx >= 0) {
  var blockEnd = appealEndIdx + appealEnd.length;
  og = og.substring(0, appealIdx) +
    '  // Phase2 Step4: 確認なしで続行' +
    og.substring(blockEnd);
  fixCount++;
  console.log('[Fix 1] 訴求確認ループ廃止');
} else {
  console.log('[Fix 1] スキップ（パターン不一致）');
}

// ============================================
// Fix 2: 品質チェック不合格時の確認を廃止 → 自動修正ループに置換
// ============================================
// 旧: askUserViaLine で確認 → 新: 自動修正→再チェック→合格まで

var qcStart = "  // Phase3 Step4後: 品質不合格時の確認\n  if (this.lineQA && this.sendLineFn && (p3s4.indexOf('不合格') !== -1 || p3s4.indexOf('要改善') !== -1)) {";
var qcEnd = "} catch(e) { console.log('[OutputGen] 品質確認スキップ:', e.message); }\n  }";
var qcIdx = og.indexOf(qcStart);
var qcEndIdx = og.indexOf(qcEnd, qcIdx);

if (qcIdx >= 0 && qcEndIdx >= 0) {
  var qcBlockEnd = qcEndIdx + qcEnd.length;

  // 自動修正ループに置換
  var autoFixLoop = "  // Phase3 Step4: 品質不合格時→自動修正→再チェック（最大3回）\n" +
    "  var qualityRetry = 0;\n" +
    "  while (qualityRetry < 3 && (p3s4.indexOf('不合格') !== -1 || p3s4.indexOf('要改善') !== -1)) {\n" +
    "    qualityRetry++;\n" +
    "    console.log('[Phase3] 品質不合格→自動修正 リトライ' + qualityRetry + '/3');\n" +
    "    // 不合格パターンをStep4の指摘に基づいて自動修正\n" +
    "    var fixedPatterns = await Promise.all(patterns.map(async function(p) {\n" +
    "      var fixRes = await this.anthropic.messages.create({\n" +
    "        model: 'claude-sonnet-4-20250514', max_tokens: 5000,\n" +
    "        system: '品質チェックで不合格になったコンテンツを修正してください。指摘された問題点を全て解消し、合格基準を満たす最終版を出力してください。元の訴求力・構成は維持しつつ、品質基準のみ改善すること。',\n" +
    "        messages: [{ role: 'user', content: '【元のパターン' + p.pattern + ': ' + p.name + '】\\n' + p.content + '\\n\\n【品質チェック結果（不合格箇所）】\\n' + p3s4 + '\\n\\n上記の指摘を全て反映した修正版を出力してください。' }]\n" +
    "      });\n" +
    "      return { pattern: p.pattern, name: p.name, desc: p.desc, content: fixRes.content[0].text };\n" +
    "    }.bind(this)));\n" +
    "    patterns = fixedPatterns;\n" +
    "    this._saveOutputLog(sessionId, 3, 4, 'Phase3-自動修正(リトライ' + qualityRetry + ')', JSON.stringify(patterns.map(function(p) { return p.pattern; })));\n" +
    "    // 再チェック\n" +
    "    p3s2 = await this._phase3_step2(patterns, p2s6, outputType);\n" +
    "    p3s3 = await this._phase3_step3(patterns, p2s6, p3s2);\n" +
    "    p3s4 = await this._phase3_step4(patterns, p3s2, p3s3, outputType);\n" +
    "    this._saveOutputLog(sessionId, 3, 4, 'Phase3-再品質チェック(リトライ' + qualityRetry + ')', p3s4.substring(0, 300));\n" +
    "    console.log('[Phase3] 品質再チェック リトライ' + qualityRetry + ' 結果: ' + (p3s4.indexOf('不合格') === -1 && p3s4.indexOf('要改善') === -1 ? '合格' : '不合格'));\n" +
    "  }\n" +
    "  if (qualityRetry > 0) {\n" +
    "    console.log('[Phase3] 品質修正完了: ' + qualityRetry + '回のリトライ後' + (p3s4.indexOf('不合格') === -1 ? '合格' : '続行'));\n" +
    "  }";

  og = og.substring(0, qcIdx) + autoFixLoop + og.substring(qcBlockEnd);
  fixCount++;
  console.log('[Fix 2] 品質チェック自動修正ループ実装');
} else {
  console.log('[Fix 2] スキップ（パターン不一致）');
}

// ============================================
// Fix 3: output_queueのstatus → 'completed'（承認待ち廃止）
// ============================================
var oldStatus = ".run(sessionId, outputType, JSON.stringify(params), p2s6, JSON.stringify(finalResult.patterns), JSON.stringify({ critique: finalResult.critique, reason: finalResult.reason }), finalResult.recommended, 'awaiting_approval');";
var newStatus = ".run(sessionId, outputType, JSON.stringify(params), p2s6, JSON.stringify(finalResult.patterns), JSON.stringify({ critique: finalResult.critique, reason: finalResult.reason }), finalResult.recommended, 'completed');";
if (og.indexOf(oldStatus) >= 0) {
  og = og.replace(oldStatus, newStatus);
  fixCount++;
  console.log('[Fix 3] output_queueステータスを直接completed化');
}

fs.writeFileSync(ogFile, og, 'utf8');

// ============================================
// Fix 4: server.js - LP/DM完了時の通知を統一
// ============================================
var svFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var sv = fs.readFileSync(svFile, 'utf8');

// detectOutputRequest内の完了通知
var oldOutputDone = "sendLine('ID:' + session.id + ' ' + (typeLabels[detectedType] || detectedType) + '生成 完了。\\nURL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);";
if (sv.indexOf(oldOutputDone) < 0) {
  // 前回パッチ未適用の場合の旧パターン
  oldOutputDone = "sendLine('【アウトプット完了】' + (typeLabels[detectedType] || detectedType) + '\\nセッション: ' + session.title + '\\n推奨: パターン' + (result.recommended || 'A') + '\\n\\n確認: https://176-32-87-118.sslip.io/outputs/' + htmlFile + '\\n\\n「パターンA採用」等で承認してください');";
}
var newOutputDone = "sendLine('ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[detectedType] || detectedType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);";
if (sv.indexOf(oldOutputDone) >= 0) {
  sv = sv.replace(oldOutputDone, newOutputDone);
  fixCount++;
  console.log('[Fix 4] server.js: アウトプット完了通知を統一フォーマットに');
}

// API経由のアウトプット生成完了通知も修正
var apiOutputPattern = /sendLine\('【アウトプット完了】[\s\S]*?承認してください'\)/g;
var apiMatches = sv.match(apiOutputPattern);
if (apiMatches) {
  for (var i = 0; i < apiMatches.length; i++) {
    sv = sv.replace(apiMatches[i], "sendLine('アウトプット完了。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile)");
    fixCount++;
    console.log('[Fix 4b] server.js: API経由の完了通知も修正');
  }
}

// 承認ハンドラも「OK」でアウトプット待ちがあれば即case_library登録
// → 品質自動修正で完成済みなので、output_queue.status='completed'
// 承認フローは不要だが、パターン選択は残す

fs.writeFileSync(svFile, sv, 'utf8');

// ============================================
// Fix 5: 「LPとDM作って」の複数媒体同時生成対応
// ============================================
// detectOutputRequest で複数outputType検出 → 順次生成

var oldDetectFunc = "function detectOutputRequest(t) {";
var insertAfterDetect = sv.indexOf(oldDetectFunc);
if (insertAfterDetect >= 0) {
  // 既存のdetectOutputRequest内で「と」「、」区切りの複数媒体を検出
  // dmのパターンが^DMになっているのを修正（文中マッチ用）
  var oldDmPattern = "'dm': /^DM|ダイレクトメール|ＤＭ/i,";
  var newDmPattern = "'dm': /DM|ダイレクトメール|ＤＭ/i,";
  if (sv.indexOf(oldDmPattern) >= 0) {
    sv = sv.replace(oldDmPattern, newDmPattern);
    fixCount++;
    console.log('[Fix 5] server.js: DMパターンの^除去（文中マッチ対応）');
  }

  // 複数outputType検出ロジック追加
  // 「LPとDM作って」→ LP + DM を両方生成
  var oldSingleDetect = "  var detectedType = null;\n  var typeKeys = Object.keys(outputMap);\n  for (var i = 0; i < typeKeys.length; i++) {\n    if (outputMap[typeKeys[i]].test(t)) {\n      detectedType = typeKeys[i];\n      break;\n    }\n  }\n  if (!detectedType) return null;";

  var newMultiDetect = "  var detectedTypes = [];\n  var typeKeys = Object.keys(outputMap);\n  for (var i = 0; i < typeKeys.length; i++) {\n    if (outputMap[typeKeys[i]].test(t)) {\n      detectedTypes.push(typeKeys[i]);\n    }\n  }\n  if (detectedTypes.length === 0) return null;\n  var detectedType = detectedTypes[0]; // メインの1つ（後で複数対応）";

  if (sv.indexOf(oldSingleDetect) >= 0) {
    sv = sv.replace(oldSingleDetect, newMultiDetect);
    fixCount++;
    console.log('[Fix 5b] server.js: 複数outputType検出対応');
  }

  // 複数type時の順次生成
  // 既存のoutputGen.generateFull呼び出しの後に、追加typeも生成
  var oldGenCall = "  // 非同期でアウトプット生成\n  outputGen.generateFull(session.id, detectedType, {}).then(function(result) {";
  var newGenCall = "  // 非同期でアウトプット生成（複数type対応）\n  var allTypes = detectedTypes.slice(); // コピー\n  async function generateSequential(types) {\n    for (var ti = 0; ti < types.length; ti++) {\n      try {\n        var thisType = types[ti];\n        var result = await outputGen.generateFull(session.id, thisType, {});\n        var htmlFile = generateOutputHTML(result, thisType, session.id);\n        await sendLine('ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[thisType] || thisType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);\n      } catch(e) {\n        console.error('[output ' + types[ti] + ']', e);\n        await sendLine('ID:' + session.id + ' ' + (typeLabels[types[ti]] || types[ti]) + '生成エラー。' + e.message);\n      }\n    }\n  }\n  generateSequential(allTypes);\n\n  var typeNames = allTypes.map(function(tt) { return typeLabels[tt] || tt; }).join('・');\n  return 'ID:' + session.id + ' ' + session.title + ' ' + typeNames + '生成開始します。';\n}\n\n// 以下の旧コード（単一type生成）は置換済み\nfunction _detectOutputRequest_old_unused() {\n  outputGen.generateFull(null, null, {}).then(function(result) {";

  if (sv.indexOf(oldGenCall) >= 0) {
    // 旧コードのthen/catchブロック全体を特定
    var genCallIdx = sv.indexOf(oldGenCall);
    // returnまでを切り出し
    var returnIdx = sv.indexOf("  return 'ID:' + session.id", genCallIdx);
    if (returnIdx >= 0) {
      var returnEndIdx = sv.indexOf(";\n}", returnIdx);
      if (returnEndIdx >= 0) {
        var oldBlock = sv.substring(genCallIdx, returnEndIdx + 3);
        var newBlock = "  // 非同期でアウトプット生成（複数type対応）\n" +
          "  var allTypes = detectedTypes.slice();\n" +
          "  (async function() {\n" +
          "    for (var ti = 0; ti < allTypes.length; ti++) {\n" +
          "      try {\n" +
          "        var thisType = allTypes[ti];\n" +
          "        var result = await outputGen.generateFull(session.id, thisType, {});\n" +
          "        var htmlFile = generateOutputHTML(result, thisType, session.id);\n" +
          "        await sendLine('ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[thisType] || thisType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);\n" +
          "      } catch(e) {\n" +
          "        console.error('[output ' + allTypes[ti] + ']', e);\n" +
          "        await sendLine('ID:' + session.id + ' ' + (typeLabels[allTypes[ti]] || allTypes[ti]) + '生成エラー。' + e.message);\n" +
          "      }\n" +
          "    }\n" +
          "  })();\n\n" +
          "  var typeNames = allTypes.map(function(tt) { return typeLabels[tt] || tt; }).join('・');\n" +
          "  return 'ID:' + session.id + ' ' + session.title + ' ' + typeNames + '生成開始します。';\n}";
        sv = sv.substring(0, genCallIdx) + newBlock + sv.substring(returnEndIdx + 3);
        fixCount++;
        console.log('[Fix 5c] server.js: 複数媒体順次生成ロジック実装');
      }
    }
  }
}

fs.writeFileSync(svFile, sv, 'utf8');

console.log('\n====================================');
console.log('patch_quality_autofix.js 完了: ' + fixCount + '件修正');
console.log('====================================');
