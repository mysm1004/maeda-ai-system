// LINE双方向Q&A機能パッチ
// schema.js + server.js を更新

var fs = require("fs");

// ============================================
// 1. schema.js に pending_questions テーブル追加
// ============================================
var schemaFile = "/home/ubuntu/kabeuchi-system/src/db/schema.js";
var schema = fs.readFileSync(schemaFile, "utf8");

if (schema.indexOf("pending_questions") === -1) {
  var insertBefore = "  // インデックス";
  var newTable = '  // LINE Q&A 保留質問\n\
  db.exec("CREATE TABLE IF NOT EXISTS pending_questions (\\\n\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\\\n\
    session_id INTEGER,\\\n\
    source TEXT NOT NULL,\\\n\
    question TEXT NOT NULL,\\\n\
    context TEXT,\\\n\
    answer TEXT,\\\n\
    status TEXT DEFAULT \'pending\',\\\n\
    engine_type TEXT,\\\n\
    engine_step TEXT,\\\n\
    timeout_at DATETIME,\\\n\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\\\n\
    answered_at DATETIME,\\\n\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\\\n\
  )");\n\n  ';

  schema = schema.replace(insertBefore, newTable + insertBefore);

  // インデックス追加
  var lastIndex = '  db.exec("CREATE INDEX IF NOT EXISTS idx_decisions_session ON decisions(session_id)");';
  schema = schema.replace(lastIndex, lastIndex + '\n  db.exec("CREATE INDEX IF NOT EXISTS idx_pending_status ON pending_questions(status)");');

  fs.writeFileSync(schemaFile, schema, "utf8");
  console.log("[schema] pending_questions テーブル追加完了");
} else {
  console.log("[schema] pending_questions 既に存在");
}

// ============================================
// 2. server.js にLineQA統合
// ============================================
var serverFile = "/home/ubuntu/kabeuchi-system/src/server.js";
var server = fs.readFileSync(serverFile, "utf8");

// 2a. require追加
if (server.indexOf("LineQA") === -1) {
  server = server.replace(
    "var OutputGenerator = require('./services/output-generator');",
    "var OutputGenerator = require('./services/output-generator');\nvar LineQA = require('./services/line-qa');"
  );

  // 2b. インスタンス生成を変更
  server = server.replace(
    "var engine = new DiscussionEngine(db);\nvar prefLearner = new PreferenceLearner(db);\nvar outputGen = new OutputGenerator(db);",
    "var lineQA = new LineQA(db);\nvar engine = new DiscussionEngine(db, lineQA, sendLine);\nvar prefLearner = new PreferenceLearner(db);\nvar outputGen = new OutputGenerator(db, lineQA, sendLine);"
  );

  // 2c. processLineCommand 全体を置換
  var oldProcessCmd = 'async function processLineCommand(text, userId) {\n\
  var t = text.trim();\n\
  // 承認\n\
  if (t === \'承認\' || t === \'OK\' || t === \'ok\') {\n\
    var latest = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n\
    if (latest) {\n\
      db.prepare(\'INSERT INTO decisions (session_id, decision) VALUES (?,?)\').run(latest.id, \'approved\');\n\
      return \'承認しました（セッション: \' + latest.title + \'）\';\n\
    }\n\
    return \'アクティブなセッションがありません\';\n\
  }\n\
  // 却下\n\
  if (t.startsWith(\'却下\') || t.startsWith(\'NG\')) {\n\
    var comment = t.replace(/^(却下|NG)\\s*/, \'\');\n\
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n\
    if (latest2) {\n\
      db.prepare(\'INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)\').run(latest2.id, \'rejected\', comment || null);\n\
      return \'却下しました\' + (comment ? \'（理由: \' + comment + \'）\' : \'\');\n\
    }\n\
    return \'アクティブなセッションがありません\';\n\
  }\n\
  // 状態確認\n\
  if (t === \'状態\' || t === \'ステータス\') {\n\
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 3").all();\n\
    if (sessions.length === 0) return \'アクティブなセッションなし\';\n\
    return sessions.map(function(s) {\n\
      return \'[\' + s.id + \'] \' + s.title + \' (R\' + s.current_round + \'/\' + s.total_rounds + \')\';\n\
    }).join(\'\\n\');\n\
  }\n\
  // 音声メモとして保存\n\
  db.prepare(\'INSERT INTO voice_memos (text) VALUES (?)\').run(t);\n\
  return \'メモ保存しました: 「\' + t.substring(0, 30) + \'...」\';\n\
}';

  var newProcessCmd = 'async function processLineCommand(text, userId) {\n\
  var t = text.trim();\n\
  // 承認\n\
  if (t === \'承認\' || t === \'OK\' || t === \'ok\') {\n\
    var latest = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n\
    if (latest) {\n\
      db.prepare(\'INSERT INTO decisions (session_id, decision) VALUES (?,?)\').run(latest.id, \'approved\');\n\
      return \'承認しました（セッション: \' + latest.title + \'）\';\n\
    }\n\
    return \'アクティブなセッションがありません\';\n\
  }\n\
  // 却下\n\
  if (t.startsWith(\'却下\') || t.startsWith(\'NG\')) {\n\
    var comment = t.replace(/^(却下|NG)\\s*/, \'\');\n\
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 1").get();\n\
    if (latest2) {\n\
      db.prepare(\'INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)\').run(latest2.id, \'rejected\', comment || null);\n\
      return \'却下しました\' + (comment ? \'（理由: \' + comment + \'）\' : \'\');\n\
    }\n\
    return \'アクティブなセッションがありません\';\n\
  }\n\
  // 状態確認\n\
  if (t === \'状態\' || t === \'ステータス\') {\n\
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = \'active\' ORDER BY updated_at DESC LIMIT 3").all();\n\
    if (sessions.length === 0) return \'アクティブなセッションなし\';\n\
    return sessions.map(function(s) {\n\
      return \'[\' + s.id + \'] \' + s.title + \' (Phase\' + s.phase + \' Step\' + s.current_round + \')\';\n\
    }).join(\'\\n\');\n\
  }\n\
  // 保留中の質問があれば回答として処理\n\
  var pending = lineQA.getPendingQuestion();\n\
  if (pending) {\n\
    lineQA.resolveAnswer(pending.id, t);\n\
    return \'回答受付しました。処理を再開します。\\n\\nQ: \' + pending.question.substring(0, 80) + \'\\nA: \' + t;\n\
  }\n\
  // スマートQ&A（Claudeがプロジェクト参照して回答）\n\
  try {\n\
    console.log(\'[Smart QA] 質問処理開始: \' + t.substring(0, 50));\n\
    var answer = await lineQA.handleSmartQA(t, userId);\n\
    return answer;\n\
  } catch (err) {\n\
    console.error(\'[Smart QA Error]\', err.message);\n\
    db.prepare(\'INSERT INTO voice_memos (text) VALUES (?)\').run(t);\n\
    return \'メモ保存しました: 「\' + t.substring(0, 30) + \'...」\';\n\
  }\n\
}';

  server = server.replace(oldProcessCmd, newProcessCmd);

  // 2d. replyLine失敗時にpushLineフォールバック
  server = server.replace(
    "if (reply && ev.replyToken) {\n        await replyLine(ev.replyToken, reply);\n        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);\n      }",
    "if (reply) {\n        var sent = false;\n        if (ev.replyToken) sent = await replyLine(ev.replyToken, reply);\n        if (!sent && userId) await pushLine(userId, reply);\n        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);\n      }"
  );

  // 2e. Q&A APIエンドポイント追加（ヘルスチェックの前に）
  var healthCheck = "// ============================================\n// ヘルスチェック";
  var qaEndpoints = '// ============================================\n\
// Q&A履歴\n\
// ============================================\n\
\n\
app.get(\'/api/qa/history\', function(req, res) {\n\
  var limit = parseInt(req.query.limit) || 20;\n\
  res.json(db.prepare(\'SELECT * FROM pending_questions ORDER BY created_at DESC LIMIT ?\').all(limit));\n\
});\n\
\n\
app.get(\'/api/qa/pending\', function(req, res) {\n\
  res.json(db.prepare("SELECT * FROM pending_questions WHERE status = \'pending\' ORDER BY created_at ASC").all());\n\
});\n\
\n\
' + healthCheck;

  server = server.replace(healthCheck, qaEndpoints);

  // 2f. 保留質問のタイムアウト処理をcronに追加
  server = server.replace(
    "// 毎週月曜7時（JST）週次レポート",
    "// 毎時: 保留質問のタイムアウト処理\ncron.schedule('0 * * * *', function() {\n  db.prepare(\"UPDATE pending_questions SET status = 'timeout' WHERE status = 'pending' AND timeout_at < datetime('now')\").run();\n}, { timezone: 'Asia/Tokyo' });\n// 毎週月曜7時（JST）週次レポート"
  );

  fs.writeFileSync(serverFile, server, "utf8");
  console.log("[server] LineQA統合完了");
} else {
  console.log("[server] LineQA 既に統合済み");
}

console.log("patch_line_qa.js 適用完了");
