// patch_retry_fix.js
// generateFull全体リトライを廃止 → 各API呼び出しに個別リトライヘルパー追加
// discussion-engine.jsも同様に修正

var fs = require('fs');
var fixCount = 0;

// ============================================
// 個別API呼び出しリトライヘルパー
// ============================================
var retryHelper = "\n// 個別API呼び出しリトライ（レート制限時30秒待機、最大3回）\nasync function _apiRetry(fn, label) {\n  for (var attempt = 0; attempt < 3; attempt++) {\n    try {\n      return await fn();\n    } catch(err) {\n      if (attempt < 2 && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0) || (err.message && err.message.indexOf('overloaded') >= 0))) {\n        console.log('[' + label + '] レート制限/過負荷 リトライ' + (attempt+1) + '/3 30秒待機');\n        await new Promise(function(r) { setTimeout(r, 30000); });\n        continue;\n      }\n      throw err;\n    }\n  }\n}\n";

// ============================================
// Fix 1: output-generator.js
// ============================================
var ogFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var og = fs.readFileSync(ogFile, 'utf8');

// 1a: generateFull全体リトライラッパーを削除
var oldWrapper = "\n// API呼び出しリトライラッパー\nvar _origOgProto = OutputGenerator.prototype;\nvar _origGenFull = _origOgProto.generateFull;\n_origOgProto.generateFull = async function() {\n  try {\n    return await _origGenFull.apply(this, arguments);\n  } catch(err) {\n    if (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0)) {\n      console.log('[OutputGenerator] レート制限 30秒後リトライ');\n      await new Promise(function(r) { setTimeout(r, 30000); });\n      return await _origGenFull.apply(this, arguments);\n    }\n    throw err;\n  }\n};\n";

if (og.indexOf(oldWrapper) >= 0) {
  og = og.replace(oldWrapper, '');
  fixCount++;
  console.log('[Fix 1a] output-generator.js: generateFull全体リトライ削除');
} else {
  // 改行差異を吸収して検索
  var wrapperStart = og.indexOf('// API呼び出しリトライラッパー');
  var wrapperEnd = og.indexOf('module.exports = OutputGenerator;');
  if (wrapperStart >= 0 && wrapperEnd >= 0 && wrapperStart < wrapperEnd) {
    og = og.substring(0, wrapperStart) + '\n' + og.substring(wrapperEnd);
    fixCount++;
    console.log('[Fix 1a] output-generator.js: generateFull全体リトライ削除（パターン2）');
  } else {
    console.log('[Fix 1a] スキップ（全体リトライラッパー未検出）');
  }
}

// 1b: ファイル冒頭にリトライヘルパー追加
if (og.indexOf('_apiRetry') === -1) {
  var patternsEnd = og.indexOf('var PATTERNS');
  if (patternsEnd >= 0) {
    og = og.substring(0, patternsEnd) + retryHelper + og.substring(patternsEnd);
    fixCount++;
    console.log('[Fix 1b] output-generator.js: _apiRetryヘルパー追加');
  }
}

// 1c: 各anthropic.messages.create呼び出しをラップ
// パターン: "var res = await this.anthropic.messages.create({" → "var res = await _apiRetry(function() { return this.anthropic.messages.create({" ... "}); }.bind(this), 'ラベル');"
// ただしこれは閉じ括弧の位置特定が複雑なので、別のアプローチを使う

// アプローチ: OutputGeneratorのprototype内でthis.anthropicとthis.openaiをラップ
// コンストラクタでAPI呼び出しメソッドをラップ
var oldConstructor = "function OutputGenerator(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;";
var newConstructor = "function OutputGenerator(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;\n\n  // API呼び出しを自動リトライラップ\n  var self = this;\n  var origAnthropicCreate = null;\n  var origOpenaiCreate = null;\n  Object.defineProperty(this, '_anthropicRetry', { get: function() {\n    if (!origAnthropicCreate && self.anthropic) {\n      origAnthropicCreate = self.anthropic.messages.create.bind(self.anthropic.messages);\n      self.anthropic.messages.create = function(opts) {\n        return _apiRetry(function() { return origAnthropicCreate(opts); }, 'Claude');\n      };\n    }\n    if (!origOpenaiCreate && self.openai) {\n      origOpenaiCreate = self.openai.chat.completions.create.bind(self.openai.chat.completions);\n      self.openai.chat.completions.create = function(opts) {\n        return _apiRetry(function() { return origOpenaiCreate(opts); }, 'ChatGPT');\n      };\n    }\n    return true;\n  }});";

if (og.indexOf(oldConstructor) >= 0) {
  og = og.replace(oldConstructor, newConstructor);
  fixCount++;
  console.log('[Fix 1c] output-generator.js: コンストラクタにAPI自動リトライ追加');
} else {
  console.log('[Fix 1c] スキップ（コンストラクタパターン不一致）');
}

// 1d: generateFullの冒頭でリトライを有効化
var oldGenFullStart = "OutputGenerator.prototype.generateFull = async function(sessionId, outputType, params) {";
var newGenFullStart = "OutputGenerator.prototype.generateFull = async function(sessionId, outputType, params) {\n  this._anthropicRetry; // API自動リトライ有効化";
if (og.indexOf(oldGenFullStart) >= 0 && og.indexOf('this._anthropicRetry') === -1) {
  og = og.replace(oldGenFullStart, newGenFullStart);
  fixCount++;
  console.log('[Fix 1d] output-generator.js: generateFull冒頭にリトライ有効化');
}

fs.writeFileSync(ogFile, og, 'utf8');

// ============================================
// Fix 2: discussion-engine.js - 同様に修正
// ============================================
var deFile = '/home/ubuntu/kabeuchi-system/src/services/discussion-engine.js';
var de = fs.readFileSync(deFile, 'utf8');

// 2a: runStep全体リトライラッパーを削除
var deWrapperStart = de.indexOf('// API呼び出しリトライラッパー（モンキーパッチ）');
var deModuleExports = de.indexOf('module.exports = DiscussionEngine;');
if (deWrapperStart >= 0 && deModuleExports >= 0 && deWrapperStart < deModuleExports) {
  de = de.substring(0, deWrapperStart) + '\n' + de.substring(deModuleExports);
  fixCount++;
  console.log('[Fix 2a] discussion-engine.js: runStep全体リトライ削除');
}

// 2b: リトライヘルパー追加
if (de.indexOf('_apiRetry') === -1) {
  var deInsert = de.indexOf('function DiscussionEngine');
  if (deInsert >= 0) {
    de = de.substring(0, deInsert) + retryHelper + de.substring(deInsert);
    fixCount++;
    console.log('[Fix 2b] discussion-engine.js: _apiRetryヘルパー追加');
  }
}

// 2c: コンストラクタにリトライラップ
var oldDeConstructor = "function DiscussionEngine(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;";
var newDeConstructor = "function DiscussionEngine(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;\n\n  // API呼び出しを自動リトライラップ\n  var self = this;\n  var origACreate = null;\n  var origOCreate = null;\n  Object.defineProperty(this, '_apiRetryInit', { get: function() {\n    if (!origACreate && self.anthropic) {\n      origACreate = self.anthropic.messages.create.bind(self.anthropic.messages);\n      self.anthropic.messages.create = function(opts) {\n        return _apiRetry(function() { return origACreate(opts); }, 'Claude');\n      };\n    }\n    if (!origOCreate && self.openai) {\n      origOCreate = self.openai.chat.completions.create.bind(self.openai.chat.completions);\n      self.openai.chat.completions.create = function(opts) {\n        return _apiRetry(function() { return origOCreate(opts); }, 'ChatGPT');\n      };\n    }\n    return true;\n  }});";

if (de.indexOf(oldDeConstructor) >= 0) {
  de = de.replace(oldDeConstructor, newDeConstructor);
  fixCount++;
  console.log('[Fix 2c] discussion-engine.js: コンストラクタにAPI自動リトライ追加');
} else {
  console.log('[Fix 2c] スキップ（コンストラクタパターン不一致）');
}

// 2d: runStepの冒頭でリトライ有効化
var oldRunStep = "DiscussionEngine.prototype.runStep = async function(sessionId, stepNum, isSleep) {";
var newRunStep = "DiscussionEngine.prototype.runStep = async function(sessionId, stepNum, isSleep) {\n  this._apiRetryInit; // API自動リトライ有効化";
if (de.indexOf(oldRunStep) >= 0 && de.indexOf('this._apiRetryInit') === -1) {
  de = de.replace(oldRunStep, newRunStep);
  fixCount++;
  console.log('[Fix 2d] discussion-engine.js: runStep冒頭にリトライ有効化');
}

fs.writeFileSync(deFile, de, 'utf8');

// 旧リトライヘルパーのcallWithRetry削除
[ogFile, deFile].forEach(function(f) {
  var content = fs.readFileSync(f, 'utf8');
  var oldHelper = content.indexOf('async function callWithRetry(');
  if (oldHelper >= 0) {
    var helperEnd = content.indexOf('}\n', content.indexOf('}\n', oldHelper) + 1);
    if (helperEnd >= 0) {
      content = content.substring(0, oldHelper) + content.substring(helperEnd + 2);
      fs.writeFileSync(f, content, 'utf8');
      fixCount++;
      console.log('[Cleanup] ' + f.split('/').pop() + ': 旧callWithRetry削除');
    }
  }
});

console.log('\n============================');
console.log('patch_retry_fix.js 完了: ' + fixCount + '件');
console.log('============================');
