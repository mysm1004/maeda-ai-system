// patch_askuser_fix.js
// askUserViaLine の呼び出しシグネチャ不一致を修正
// 正: lineQA.askUserViaLine({question, engineType, sessionId, pushLineFn, ...})
// 誤: lineQA.askUserViaLine(question, 'type', step, timeout) ← 位置引数

var fs = require('fs');
var fixCount = 0;

// === Fix 1: server.js の advanceToNextPhase ===
var serverFile = '/home/ubuntu/kabeuchi-system/src/server.js';
var server = fs.readFileSync(serverFile, 'utf8');

var oldServer = "var answer = await lineQA.askUserViaLine(question, 'phase_advance', 0, 60);";
var newServer = "var answer = await lineQA.askUserViaLine({ question: question, engineType: 'phase_advance', engineStep: 0, sessionId: sessionId, pushLineFn: sendLine, timeoutMs: 60 * 60000 });";

if (server.indexOf(oldServer) >= 0) {
  server = server.replace(oldServer, newServer);
  fs.writeFileSync(serverFile, server, 'utf8');
  fixCount++;
  console.log('[Fix 1] server.js: advanceToNextPhase の askUserViaLine 修正完了');
} else {
  console.log('[Fix 1] スキップ（パターン不一致 or 既に修正済み）');
}

// === Fix 2: list-generator.js の Step10 サンプルチェック ===
var listFile = '/home/ubuntu/kabeuchi-system/src/services/list-generator.js';
var listGen = fs.readFileSync(listFile, 'utf8');

var oldList = "return self.lineQA.askUserViaLine(question, 'list_sample_check', 10, 60);";
var newList = "return self.lineQA.askUserViaLine({ question: question, engineType: 'list_sample_check', engineStep: 10, sessionId: sessionId, pushLineFn: self.sendLine, timeoutMs: 60 * 60000 });";

if (listGen.indexOf(oldList) >= 0) {
  listGen = listGen.replace(oldList, newList);
  fs.writeFileSync(listFile, listGen, 'utf8');
  fixCount++;
  console.log('[Fix 2] list-generator.js: Step10 askUserViaLine 修正完了');
} else {
  console.log('[Fix 2] スキップ（パターン不一致 or 既に修正済み）');
}

console.log('\n============================');
console.log('patch_askuser_fix.js 完了: ' + fixCount + '件修正');
console.log('============================');
