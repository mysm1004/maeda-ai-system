// patch_retry_helpers.js
// discussion-engine.js と output-generator.js のインラインAPI呼び出しにリトライロジック追加
// 方式: ファイル冒頭にリトライヘルパー関数を追加 + 各API呼び出しをラップ

var fs = require('fs');
var fixCount = 0;

// ============================================
// リトライヘルパー関数（共通コード）
// ============================================
var retryHelper = "\n// リトライヘルパー（レート制限時30秒待機、最大3回）\nasync function callWithRetry(fn, label) {\n  for (var attempt = 0; attempt < 3; attempt++) {\n    try {\n      return await fn();\n    } catch(err) {\n      if (attempt < 2 && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {\n        console.log('[' + label + '] レート制限 リトライ ' + (attempt+1) + '/3 30秒待機');\n        await new Promise(function(r) { setTimeout(r, 30000); });\n        continue;\n      }\n      throw err;\n    }\n  }\n}\n";

// ============================================
// Fix 1: discussion-engine.js
// ============================================
var deFile = '/home/ubuntu/kabeuchi-system/src/services/discussion-engine.js';
var de = fs.readFileSync(deFile, 'utf8');

// ヘルパー関数が未追加なら追加
if (de.indexOf('callWithRetry') === -1) {
  // require文の後に追加
  var insertPoint = de.indexOf('function DiscussionEngine');
  if (insertPoint >= 0) {
    de = de.substring(0, insertPoint) + retryHelper + de.substring(insertPoint);
    fixCount++;
    console.log('[Fix 1a] discussion-engine.js: リトライヘルパー追加');
  }

  // 各API呼び出しをラップ
  // パターン: "var res = await this.anthropic.messages.create({" → "var res = await callWithRetry(function() { return self_or_this.anthropic... }, 'Claude');"
  // ただしasync function内でthisを使っているので、selfパターンでなくthisを直接使える

  // Anthropic呼び出し
  var anthropicPattern = /  var res = await this\.anthropic\.messages\.create\(\{/g;
  var match;
  var replacements = [];
  while ((match = anthropicPattern.exec(de)) !== null) {
    replacements.push(match.index);
  }
  // 後ろから置換（インデックスずれ防止）
  for (var i = replacements.length - 1; i >= 0; i--) {
    var pos = replacements[i];
    // "var res = await this.anthropic.messages.create({" を
    // "var res = await callWithRetry(function() { var self=this; return self.anthropic.messages.create({" に
    // ↑ thisが変わるので別の方法
    // →クロージャでthisを保存するパターン

    // 見つけた行から対応する閉じ括弧までをラップ
    // 実際には "var res = await this.xxx" → "var _self = this; var res = await callWithRetry..." だと複雑
    // シンプルに try-catch-retry ラッパーを追加する代わりに、
    // DiscussionEngineのコンストラクタ直後に self = this パターンを使う方法は大変なので
    // 別アプローチ: anthropicとopenaiのclientをラップ
  }

  // 別アプローチ: DiscussionEngineコンストラクタでラッパーメソッドを定義
  var oldConstructor = "function DiscussionEngine(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;";
  var newConstructor = "function DiscussionEngine(db, lineQA, sendLineFn) {\n  this.db = db;\n  this.lineQA = lineQA;\n  this.sendLine = sendLineFn;\n  // リトライ付きAPIラッパー\n  var origAnthropic = this.anthropic;\n  var origOpenai = this.openai;";
  // これも複雑すぎる

  // 最もシンプルなアプローチ: 各APIクライアントのcreateメソッドをモンキーパッチ
  // → ファイル末尾に追加

  // 実際最もシンプルなのは: ファイル末尾でprototype._callAPIを定義してrunStep等で使う
  // だが既存コード全体の書き換えは危険

  // 安全なアプローチ: module.exportsの前にモンキーパッチ
  var moduleExportsDe = de.lastIndexOf('module.exports');
  if (moduleExportsDe >= 0) {
    var monkeyPatch = "\n// API呼び出しリトライラッパー（モンキーパッチ）\nvar _origDeProto = DiscussionEngine.prototype;\nvar _origRunStep = _origDeProto.runStep;\n_origDeProto.runStep = async function() {\n  try {\n    return await _origRunStep.apply(this, arguments);\n  } catch(err) {\n    if (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0)) {\n      console.log('[DiscussionEngine] レート制限 30秒後リトライ');\n      await new Promise(function(r) { setTimeout(r, 30000); });\n      return await _origRunStep.apply(this, arguments);\n    }\n    throw err;\n  }\n};\n\n";
    de = de.substring(0, moduleExportsDe) + monkeyPatch + de.substring(moduleExportsDe);
    fixCount++;
    console.log('[Fix 1b] discussion-engine.js: runStepリトライラッパー追加');
  }
}
fs.writeFileSync(deFile, de, 'utf8');

// ============================================
// Fix 2: output-generator.js
// ============================================
var ogFile = '/home/ubuntu/kabeuchi-system/src/services/output-generator.js';
var og = fs.readFileSync(ogFile, 'utf8');

if (og.indexOf('callWithRetry') === -1 && og.indexOf('_origOgProto') === -1) {
  var moduleExportsOg = og.lastIndexOf('module.exports');
  if (moduleExportsOg >= 0) {
    // generateFullにリトライ、各ステップ内のAPI呼び出しエラーをキャッチ
    var ogMonkey = "\n// API呼び出しリトライラッパー\nvar _origOgProto = OutputGenerator.prototype;\nvar _origGenFull = _origOgProto.generateFull;\n_origOgProto.generateFull = async function() {\n  try {\n    return await _origGenFull.apply(this, arguments);\n  } catch(err) {\n    if (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0)) {\n      console.log('[OutputGenerator] レート制限 30秒後リトライ');\n      await new Promise(function(r) { setTimeout(r, 30000); });\n      return await _origGenFull.apply(this, arguments);\n    }\n    throw err;\n  }\n};\n\n";
    og = og.substring(0, moduleExportsOg) + ogMonkey + og.substring(moduleExportsOg);
    fixCount++;
    console.log('[Fix 2] output-generator.js: generateFullリトライラッパー追加');
  }
}

// 法的ソース制限がoutput-generator.jsに未適用の場合追加
if (og.indexOf('法的根拠の引用ルール') === -1 && og.indexOf('法的根拠') === -1) {
  // _getQualityRulesメソッドを探す
  var qualityRulesIdx = og.indexOf('_getQualityRules');
  if (qualityRulesIdx >= 0) {
    // returnの直前にソース制限を追加
    var returnIdx = og.indexOf("return '", qualityRulesIdx);
    if (returnIdx >= 0) {
      var oldReturn = og.substring(returnIdx);
      var endQuoteIdx = oldReturn.indexOf("';");
      if (endQuoteIdx >= 0) {
        var oldReturnStr = oldReturn.substring(0, endQuoteIdx + 2);
        var newReturnStr = oldReturnStr.replace("';", "\\n\\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所等）、裁判所判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社サイト・行政書士・司法書士サイト・まとめサイト・ブログ・Wikipedia使用禁止。ソース引用時は出典（URL・資料名・発行機関）を明記。裏取りできない情報は「未確認」と明示。';");
        og = og.replace(oldReturnStr, newReturnStr);
        fixCount++;
        console.log('[Fix 7b] output-generator.js: 法的ソース制限追加');
      }
    }
  }
  // _getQualityRulesが見つからない場合、メインのsystemプロンプトに追加
  if (og.indexOf('法的根拠') === -1) {
    // 最初のsystem promptにソース制限を追加
    var firstSystem = og.indexOf("system: '");
    if (firstSystem === -1) firstSystem = og.indexOf('system: "');
    if (firstSystem >= 0) {
      // 前田法律事務所 の直後に追加
      var maedaIdx = og.indexOf('前田法律事務所');
      if (maedaIdx >= 0) {
        var insertAfter = og.indexOf("\\n", maedaIdx);
        if (insertAfter >= 0) {
          og = og.substring(0, insertAfter) + '\\n【法的根拠の引用ルール】法的根拠は国の機関・裁判所・弁護士サイトのみ引用可。事業会社・行政書士・まとめサイト・Wikipedia使用禁止。出典明記必須。' + og.substring(insertAfter);
          fixCount++;
          console.log('[Fix 7b] output-generator.js: systemプロンプトに法的ソース制限追加');
        }
      }
    }
  }
}

fs.writeFileSync(ogFile, og, 'utf8');

console.log('\n============================');
console.log('patch_retry_helpers.js 完了: ' + fixCount + '件');
console.log('============================');
