var fs = require("fs");
var serverFile = "/home/ubuntu/kabeuchi-system/src/server.js";
var code = fs.readFileSync(serverFile, "utf8");

// 1. コメント更新: Phase1 6ラウンド → 8ステップ
code = code.replace(
  "// Phase 1: 壁打ち（6ラウンド議論）",
  "// Phase 1: 壁打ち（8ステップ）"
);

// 2. round > 6 → round > 8
code = code.replace(
  "if (round > 6) {",
  "if (round > 8) {"
);

// 3. 完了メッセージ更新
code = code.replace(
  "message: '全6ラウンド完了。Phase2に進む準備ができました。'",
  "message: '全8ステップ完了。Phase2に進む準備ができました。'"
);

// 4. 就寝モード: 6ラウンド → 8ステップ
code = code.replace(
  "for (var r = startRound; r <= 6; r++) {",
  "for (var r = startRound; r <= 8; r++) {"
);

// 5. 就寝モード最終統合チェック: 6 → 8
code = code.replace(
  "if (cr && cr.mr >= 6) {",
  "if (cr && cr.mr >= 8) {"
);

// 6. output/generate にHTML出力+LINE通知を追加（まだ未適用の場合）
if (code.indexOf("generateOutputHTML(result") === -1) {
  code = code.replace(
    'var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});\n    res.json(result);',
    'var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});\n    // HTML出力 + LINE通知\n    try {\n      var htmlFile = generateOutputHTML(result, body.outputType, body.sessionId);\n      var htmlUrl = "https://176-32-87-118.sslip.io/outputs/" + htmlFile;\n      result.htmlUrl = htmlUrl;\n      sendLine("[アウトプット完成]\\n種類: " + body.outputType + "\\n\\n" + htmlUrl + "\\n\\nスマホで確認できます。\\n「承認」「却下 理由」で返信してください。");\n    } catch(e) { console.error("[HTML出力エラー]", e); }\n    res.json(result);'
  );
}

// 7. designエンドポイントを削除（createDesignDocがなくなったため）
code = code.replace(
  /\/\/ 設計書のみ作成\napp\.post\('\/api\/output\/design'[\s\S]*?\}\);\n\n/,
  ""
);

// 8. 就寝モードのrunRoundをrunStepに更新
code = code.replace(
  "await engine.runRound(sess.id, sess.topic, r, sess.research_data, true);",
  "await engine.runStep(sess.id, sess.topic, r, sess.research_data, true);"
);

// 9. ラウンド表記をステップ表記に更新（就寝モードログ）
code = code.replace(
  "console.log('[就寝モード] セッション' + sess.id + ' ラウンド' + r + '完了');",
  "console.log('[就寝モード] セッション' + sess.id + ' ステップ' + r + '完了');"
);
code = code.replace(
  "console.error('[就寝モード] ラウンド' + r + 'エラー:', err.message);",
  "console.error('[就寝モード] ステップ' + r + 'エラー:', err.message);"
);
code = code.replace(
  "db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(sess.id, 'error_round_' + r, err.message);",
  "db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(sess.id, 'error_step_' + r, err.message);"
);

// 10. 最大6ラウンドのコメントを更新
code = code.replace(
  "// 残りラウンドを自動実行（最大6ラウンドまで）",
  "// 残りステップを自動実行（最大8ステップまで）"
);

// 11. 6ラウンド完了コメントを更新
code = code.replace(
  "// 6ラウンド完了なら最終統合",
  "// 8ステップ完了なら最終統合"
);

fs.writeFileSync(serverFile, code, "utf8");
console.log("phase update patch applied successfully");
console.log("Changes: 6rounds->8steps, sleep mode updated, HTML output+LINE added, design endpoint removed");
