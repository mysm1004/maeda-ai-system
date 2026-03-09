require('dotenv').config();
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var cron = require('node-cron');
var http = require('http');
var https = require('https');
var { initDatabase } = require('./schema');
var DiscussionEngine = require('./discussion-engine');
var PreferenceLearner = require('./preference-learner');
var OutputGenerator = require('./output-generator');
var StateManager = require('./state-manager');
var Anthropic = require('@anthropic-ai/sdk');

var app = express();
var PORT = process.env.PORT || 3000;
var db = initDatabase(process.env.DB_PATH || './data/kabeuchi.db');
var engine = new DiscussionEngine(db);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db);
var stateManager = new StateManager(db);

// 運用モード管理
var operationMode = 'aws'; // 'aws' or 'local'
try {
  var savedState = stateManager.loadState();
  if (savedState && savedState.mode) operationMode = savedState.mode;
} catch (e) { /* デフォルトaws */ }

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// 認証（LINE Webhookは除外）
app.use('/api', function(req, res, next) {
  if (req.path === '/line/webhook' || req.path === '/deploy') return next();
  if (req.headers['x-api-key'] !== process.env.API_SECRET) {
    return res.status(401).json({ error: '認証エラー' });
  }
  next();
});

// ============================================
// Phase 1: 壁打ち（6ラウンド議論）
// ============================================

// 新規壁打ち開始 or 続行
app.post('/api/discussion', async function(req, res) {
  try {
    var body = req.body;
    var sid = body.sessionId;

    // 新規セッション作成
    if (!sid) {
      if (!body.topic) return res.status(400).json({ error: 'topicは必須' });
      sid = engine.createSession(body.title || body.topic, body.topic);

      // 事前調査実行
      var research = await engine.runResearch(body.topic);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
    }

    // ユーザーコメント保存
    if (body.userComment) {
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sid);
      db.prepare('INSERT INTO discussion_logs (session_id, phase, role, role_label, content, round_number, round_theme) VALUES (?,1,?,?,?,?,?)')
        .run(sid, 'user', '前田さん', body.userComment, lr ? lr.mr || 1 : 1, '');
    }

    // 次のラウンド番号を決定
    var lr2 = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sid, 'user');
    var round = (lr2 && lr2.mr ? lr2.mr : 0) + 1;

    if (round > 6) {
      // 全6ラウンド完了 → 最終統合
      var summary = await engine.generateFinalSummary(sid);
      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全6ラウンド完了。Phase2に進む準備ができました。' });
    }

    var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    var result = await engine.runRound(sid, session.topic, round, session.research_data, false);
    res.json(result);
  } catch (err) {
    console.error('[discussion]', err);
    res.status(500).json({ error: err.message });
  }
});

// 壁打ち承認/却下
app.post('/api/discussion/decide', function(req, res) {
  var body = req.body;
  if (!body.sessionId || !body.decision) return res.status(400).json({ error: 'sessionId, decision必須' });
  var last = db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
  db.prepare('INSERT INTO decisions (session_id, log_id, decision, comment) VALUES (?,?,?,?)')
    .run(body.sessionId, last ? last.id : null, body.decision, body.comment || null);
  if (last) prefLearner.learnFromDecision(body.sessionId, body.decision, body.comment, last.content);
  res.json({ success: true });
});

// セッション一覧
app.get('/api/discussion/sessions', function(req, res) {
  res.json(db.prepare('SELECT * FROM sessions ORDER BY updated_at DESC LIMIT 20').all());
});

// セッション詳細
app.get('/api/discussion/session/:id', function(req, res) {
  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
  if (!session) return res.status(404).json({ error: 'セッション未発見' });
  res.json(session);
});

// 議論ログ取得
app.get('/api/discussion/logs/:id', function(req, res) {
  res.json(db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC').all(req.params.id));
});

// 最終サマリー手動生成
app.post('/api/discussion/finalize', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    var summary = await engine.generateFinalSummary(body.sessionId);
    res.json({ summary: summary });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ============================================
// Phase 2-3: アウトプット生成
// ============================================

// アウトプット生成（設計書→4パターン→批評→推奨）
app.post('/api/output/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    res.json(result);
  } catch (err) {
    console.error('[output]', err);
    res.status(500).json({ error: err.message });
  }
});

// 設計書のみ作成
app.post('/api/output/design', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var doc = await outputGen.createDesignDoc(body.sessionId, body.outputType, body.params || {});
    res.json({ designDoc: doc });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// アウトプット承認
app.post('/api/output/approve', function(req, res) {
  var body = req.body;
  if (!body.queueId) return res.status(400).json({ error: 'queueId必須' });
  var caseId = outputGen.approveOutput(body.queueId, body.pattern || 'A', body.filePath, body.deployUrl);
  if (body.pattern) prefLearner.learnFromPatternChoice(null, body.pattern, body.outputType);
  res.json({ success: true, caseId: caseId });
});

// アウトプットキュー一覧
app.get('/api/output/queue', function(req, res) {
  var status = req.query.status || 'awaiting_approval';
  res.json(db.prepare('SELECT * FROM output_queue WHERE status = ? ORDER BY created_at DESC').all(status));
});

// ============================================
// 案件ライブラリ
// ============================================

app.get('/api/cases', function(req, res) {
  var type = req.query.type;
  if (type) {
    res.json(db.prepare('SELECT * FROM case_library WHERE output_type = ? ORDER BY created_at DESC').all(type));
  } else {
    res.json(db.prepare('SELECT * FROM case_library ORDER BY created_at DESC LIMIT 50').all());
  }
});

app.get('/api/cases/:id', function(req, res) {
  var c = db.prepare('SELECT * FROM case_library WHERE id = ?').get(req.params.id);
  if (!c) return res.status(404).json({ error: '案件未発見' });
  res.json(c);
});

// ============================================
// 好み・記憶DB
// ============================================

app.get('/api/preferences', function(req, res) { res.json(prefLearner.getAll()); });
app.post('/api/preferences', function(req, res) {
  prefLearner.addPreference(req.body.category, req.body.key, req.body.value, null, 'manual');
  res.json({ success: true });
});
app.get('/api/preferences/:category', function(req, res) {
  res.json(prefLearner.getByCategory(req.params.category));
});

// ============================================
// 音声メモ
// ============================================

app.post('/api/voice', function(req, res) {
  if (!req.body.text) return res.status(400).json({ error: 'text必須' });
  var r = db.prepare('INSERT INTO voice_memos (text, session_id) VALUES (?, ?)').run(req.body.text, req.body.sessionId || null);
  res.json({ success: true, id: r.lastInsertRowid });
});

app.get('/api/voice', function(req, res) {
  res.json(db.prepare('SELECT * FROM voice_memos WHERE processed = 0 ORDER BY created_at DESC').all());
});

// ============================================
// LINE Webhook
// ============================================

app.post('/api/line/webhook', async function(req, res) {
  res.status(200).send('OK');
  try {
    var events = req.body.events || [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      console.log('[LINE Webhook] イベント受信:', JSON.stringify(ev.type), 'source:', JSON.stringify(ev.source));

      // followイベント（友だち追加）
      if (ev.type === 'follow') {
        var followUserId = ev.source.userId;
        console.log('==============================');
        console.log('[LINE] 友だち追加 ユーザーID: ' + followUserId);
        console.log('==============================');
        db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', followUserId, '[友だち追加]');
        if (ev.replyToken) await replyLine(ev.replyToken, '前田法律事務所AIシステムに接続しました。\nコマンド: 承認 / 却下 / 状態');
        continue;
      }

      if (ev.type !== 'message' || ev.message.type !== 'text') continue;
      var text = ev.message.text;
      var userId = ev.source.userId;

      console.log('==============================');
      console.log('[LINE] メッセージ受信 ユーザーID: ' + userId);
      console.log('[LINE] 内容: ' + text);
      console.log('==============================');

      db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', userId, text);

      var reply = await processLineCommand(text, userId);
      if (reply && ev.replyToken) {
        await replyLine(ev.replyToken, reply);
        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);
      }
    }
  } catch (err) { console.error('[LINE webhook]', err); }
});

async function processLineCommand(text, userId) {
  var t = text.trim();
  // 承認
  if (t === '承認' || t === 'OK' || t === 'ok') {
    var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (latest) {
      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');
      return '承認しました（セッション: ' + latest.title + '）';
    }
    return 'アクティブなセッションがありません';
  }
  // 却下
  if (t.startsWith('却下') || t.startsWith('NG')) {
    var comment = t.replace(/^(却下|NG)\s*/, '');
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (latest2) {
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(latest2.id, 'rejected', comment || null);
      return '却下しました' + (comment ? '（理由: ' + comment + '）' : '');
    }
    return 'アクティブなセッションがありません';
  }
  // 状態確認
  if (t === '状態' || t === 'ステータス') {
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 3").all();
    if (sessions.length === 0) return 'アクティブなセッションなし';
    return sessions.map(function(s) {
      return '[' + s.id + '] ' + s.title + ' (R' + s.current_round + '/' + s.total_rounds + ')';
    }).join('\n');
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ============ モード切替 ============
  if (t === 'PCモード' || t === 'pcモード' || t === 'PC' || t === 'ローカル') {
    try {
      var result = stateManager.switchToPC();
      operationMode = 'local';
      // Claude Code Daemonを一時停止
      try {
        require('child_process').execSync('sudo systemctl stop claude-code-daemon', { timeout: 10000 });
      } catch (e) { /* ok */ }
      return 'PCモード切り替え完了。続きから始めます\n\n' +
        '【保存した状態】\n' +
        (result.state.active_projects || []).map(function(p) {
          return '・' + p.name + ' (Phase' + p.phase + ' R' + p.current_round + ')\n  → ' + p.next_action;
        }).join('\n') +
        '\n\nGitHub push: ' + (result.pushed ? '✅' : '❌') +
        '\n\nローカルで「AWSモード」と送るとAWSに戻ります';
    } catch (e) {
      return '⚠️ PCモード切替エラー: ' + e.message;
    }
  }

  if (t === 'AWSモード' || t === 'awsモード' || t === 'AWS') {
    try {
      var state = stateManager.switchToAWS();
      operationMode = 'aws';
      // Claude Code Daemon再開
      try {
        require('child_process').execSync('sudo systemctl start claude-code-daemon', { timeout: 10000 });
      } catch (e) { /* ok */ }
      var projectInfo = '';
      if (state && state.active_projects && state.active_projects.length > 0) {
        projectInfo = '\n\n【復元した状態】\n' +
          state.active_projects.map(function(p) {
            return '・' + p.name + ' (Phase' + p.phase + ' R' + p.current_round + ')\n  → ' + p.next_action;
          }).join('\n');
      }
      return 'AWSモード切り替え完了。続きから始めます' + projectInfo;
    } catch (e) {
      return '⚠️ AWSモード切替エラー: ' + e.message;
    }
  }

  if (t === 'モード確認' || t === 'モード' || t === 'mode') {
    var currentState = stateManager.loadState();
    var modeLabel = operationMode === 'aws' ? '☁️ AWSモード（常駐稼働中）' : '💻 PCモード（AWS一時停止）';
    var msg2 = '現在のモード: ' + modeLabel;
    if (currentState) {
      msg2 += '\n最終更新: ' + currentState.last_updated;
      msg2 += '\n更新元: ' + (currentState.last_updated_by === 'aws' ? 'AWS' : 'PC');
      if (currentState.active_projects && currentState.active_projects.length > 0) {
        msg2 += '\n\n【進行中プロジェクト】';
        currentState.active_projects.forEach(function(p) {
          msg2 += '\n・' + p.name + ' (' + p.status + ')';
        });
      }
    }
    return msg2;
  }

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // Claude Code コマンド（コード修正・実装・デプロイ）
  var ccPrefixes = ['コード', '修正', '実装', '追加', 'バグ', 'デプロイ', 'claude'];
  var isCodeCmd = ccPrefixes.some(function(p) { return t.startsWith(p); });
  if (isCodeCmd) {
    try {
      var instruction = t;
      var ccData = JSON.stringify({ instruction: instruction, autoRestart: true });
      var ccResult = await new Promise(function(resolve) {
        var ccReq = http.request({
          hostname: '127.0.0.1', port: 3001, path: '/task', method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.API_SECRET, 'Content-Length': Buffer.byteLength(ccData) }
        }, function(res) {
          var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(JSON.parse(b)); });
        });
        ccReq.on('error', function(e) { resolve({ error: e.message }); });
        ccReq.write(ccData); ccReq.end();
      });
      if (ccResult.error) return '⚠️ Claude Code接続エラー: ' + ccResult.error;
      return '🔧 Claude Codeにタスク投入しました\nタスクID: ' + ccResult.taskId + '\n完了時にLINEで結果を通知します';
    } catch (e) {
      return '⚠️ Claude Code呼び出しエラー: ' + e.message;
    }
  }

  // Claude Code 状態確認
  if (t === 'CC状態' || t === 'Claude状態') {
    try {
      var statusResult = await new Promise(function(resolve) {
        var sReq = http.request({
          hostname: '127.0.0.1', port: 3001, path: '/status', method: 'GET',
          headers: { 'x-api-key': process.env.API_SECRET }
        }, function(res) {
          var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(JSON.parse(b)); });
        });
        sReq.on('error', function(e) { resolve({ error: e.message }); });
        sReq.end();
      });
      if (statusResult.error) return '⚠️ Claude Code: ' + statusResult.error;
      var msg = '🤖 Claude Code状態\n';
      msg += statusResult.running ? '⏳ 実行中: ' + (statusResult.currentTask ? statusResult.currentTask.instruction : '') + '\n' : '✅ 待機中\n';
      msg += 'キュー: ' + statusResult.queueLength + '件';
      if (statusResult.recentTasks && statusResult.recentTasks.length > 0) {
        msg += '\n\n最近のタスク:';
        statusResult.recentTasks.slice(0, 3).forEach(function(t) {
          msg += '\n' + (t.exitCode === 0 ? '✅' : '❌') + ' ' + t.instruction.substring(0, 50) + ' (' + t.duration + ')';
        });
      }
      return msg;
    } catch (e) {
      return '⚠️ Claude Code状態取得エラー';
    }
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ============ 質問・ステータス問い合わせ判定 ============
  var questionPatterns = [
    /教えて/, /は[？?]$/, /どう(いう|なって)/, /状況/, /進捗/,
    /動いてる/, /いまの/, /何してる/, /何やってる/, /どうなった/,
    /作業.*教/, /確認.*して/, /見せて/, /報告/, /途中経過/
  ];
  var isQuestion = questionPatterns.some(function(p) { return p.test(t); });
  if (isQuestion) {
    var allSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 5").all();
    var pendingQ = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
    if (allSessions.length === 0 && pendingQ.length === 0) {
      return '現在進行中のプロジェクトはありません';
    }
    var statusMsg = '【現在の状況】\n';
    allSessions.forEach(function(s) {
      statusMsg += '\n\u{1F4CB} ' + s.title + '\n  Phase' + s.phase + ' / ラウンド' + s.current_round + '/' + s.total_rounds + ' (' + s.status + ')';
    });
    if (pendingQ.length > 0) {
      statusMsg += '\n\n【承認待ち: ' + pendingQ.length + '件】';
      pendingQ.forEach(function(q) {
        statusMsg += '\n・' + q.output_type + '（推奨: パターン' + q.recommended_pattern + '）';
      });
      statusMsg += '\n→「承認」または「却下 理由」で返信';
    }
    return statusMsg;
  }

  // ============ 明示的メモ保存 ============
  var memoPatterns = [/メモ(して|しといて|保存)/, /覚えて/, /覚えておいて/, /記録して/];
  var isMemoRequest = memoPatterns.some(function(p) { return p.test(t); });
  if (isMemoRequest) {
    var memoText = t.replace(/メモして|メモしといて|メモ保存|覚えて|覚えておいて|記録して/g, '').trim();
    if (!memoText) memoText = t;
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(memoText);
    return 'メモ保存しました: 「' + memoText.substring(0, 30) + '」';
  }

  // それ以外は壁打ちコマンドとして処理を試みる
  return '「' + t.substring(0, 20) + '」を受け付けました。\n\n使えるコマンド:\n・承認 / 却下 / 状態\n・コード○○ / 修正○○\n・PCモード / AWSモード\n・CC状態 / モード確認\n\nメモ保存は「○○をメモして」と送ってください';
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // 音声メモとして保存
  db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(t);
  return 'メモ保存しました: 「' + t.substring(0, 30) + '...」';
>>>>>>> Stashed changes
}

// LINE返信
function replyLine(replyToken, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  return new Promise(function(resolve) {
    var data = JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var req = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/reply', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(res.statusCode === 200); }); });
    req.on('error', function() { resolve(false); });
    req.write(data); req.end();
  });
}

// LINE プッシュ送信（特定ユーザー宛）
function pushLine(userId, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) { console.log('[LINE] トークン未設定'); return Promise.resolve(false); }
  return new Promise(function(resolve) {
    var data = JSON.stringify({ to: userId, messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var options = {
      hostname: 'api.line.me', path: '/v2/bot/message/push', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    };
    var r = https.request(options, function(res) {
      var b = ''; res.on('data', function(c) { b += c; });
      res.on('end', function() { console.log('[LINE push] status:', res.statusCode, b); resolve(res.statusCode === 200); });
    });
    r.on('error', function(e) { console.error('[LINE push error]', e); resolve(false); });
    r.write(data); r.end();
  });
}

// LINE ブロードキャスト送信（全ユーザー宛）
function sendLine(message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) { console.log('[LINE] トークン未設定'); return Promise.resolve(false); }
  // DBからユーザーIDがあればプッシュ、なければブロードキャスト
  var user = db.prepare("SELECT DISTINCT user_id FROM line_messages WHERE user_id IS NOT NULL ORDER BY id DESC LIMIT 1").get();
  if (user && user.user_id) {
    return pushLine(user.user_id, message);
  }
  return new Promise(function(resolve) {
    var data = JSON.stringify({ messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var r = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/broadcast', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { console.log('[LINE broadcast] status:', res.statusCode, b); resolve(res.statusCode === 200); }); });
    r.on('error', function(e) { console.error('[LINE broadcast error]', e); resolve(false); });
    r.write(data); r.end();
  });
}

// LINE受信メッセージ・ユーザーID確認
app.get('/api/line/users', function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var users = db.prepare("SELECT DISTINCT user_id, MIN(created_at) as first_seen, MAX(created_at) as last_seen, COUNT(*) as msg_count FROM line_messages WHERE user_id IS NOT NULL GROUP BY user_id ORDER BY last_seen DESC").all();
  var messages = db.prepare("SELECT * FROM line_messages ORDER BY created_at DESC LIMIT 20").all();
  res.json({ users: users, recentMessages: messages });
});

// LINEテスト送信（特定ユーザーまたはブロードキャスト）
app.post('/api/line/send', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.message) return res.status(400).json({ error: 'message必須' });
  var result;
  if (body.userId) {
    result = await pushLine(body.userId, body.message);
  } else {
    result = await sendLine(body.message);
  }
  res.json({ success: result });
});

// ============================================
// 就寝モード（23時自動実行）
// ============================================

async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
  var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
  if (!latest) { console.log('[就寝モード] アクティブなセッションなし'); return; }

  db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(latest.id, 'sleep_start');

  // 残りラウンドを自動実行
  var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
  var maxRounds = Math.min(startRound + 2, 7); // 最大3ラウンドか6ラウンド目まで

  for (var r = startRound; r < maxRounds; r++) {
    try {
      await engine.runRound(latest.id, latest.topic, r, latest.research_data, true);
      console.log('[就寝モード] ラウンド ' + r + ' 完了');
    } catch (err) {
      console.error('[就寝モード] ラウンド' + r + 'エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'error_round_' + r, err.message);
    }
  }

  // 6ラウンド完了していたら最終統合も実行
  var currentRound = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  if (currentRound && currentRound.mr >= 6) {
    try {
      await engine.generateFinalSummary(latest.id);
      console.log('[就寝モード] 最終統合完了');
    } catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }
  }

  db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'sleep_end', '完了');
  console.log('[就寝モード] 完了');
}

// ============================================
// 朝サマリー（7時LINE送信）
// ============================================

async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
  var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY created_at ASC").all();
  if (sleepLogs.length === 0) { console.log('[朝サマリー] 就寝中ログなし'); return; }

  var logText = sleepLogs.map(function(l) { return '[' + l.role_label + '] ' + l.content; }).join('\n---\n');
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var r = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 1500,
    system: '就寝中の議論サマリーを簡潔に作成してください。重要ポイント・提案・決定事項を箇条書きで。',
    messages: [{ role: 'user', content: logText }]
  });
  var summary = r.content[0].text;
  db.prepare('INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)').run(sleepLogs[0].session_id, summary);

  // 未承認アウトプットキューも通知
  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  var pendingMsg = '';
  if (pending.length > 0) {
    pendingMsg = '\n\n【承認待ちアウトプット: ' + pending.length + '件】\n' +
      pending.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\n') +
      '\n→ 「承認」または「却下 理由」で返信';
  }

  await sendLine('おはようございます、前田さん\n\n【就寝中の議論サマリー】\n\n' + summary + pendingMsg);
  console.log('[朝サマリー] 送信完了');
}

// ============================================
// 週次レポート（月曜7時）
// ============================================

async function sendWeeklyReport() {
  console.log('[週次レポート] 生成開始');
  var sessions = db.prepare("SELECT * FROM sessions WHERE created_at > datetime('now', '-7 days') ORDER BY created_at ASC").all();
  var cases = db.prepare("SELECT * FROM case_library WHERE created_at > datetime('now', '-7 days')").all();
  var decisions = db.prepare("SELECT * FROM decisions WHERE created_at > datetime('now', '-7 days')").all();

  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var r = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 2000,
    system: '週次レポートを作成してください。成果・進捗・来週の推奨アクションを簡潔にまとめてください。',
    messages: [{ role: 'user', content: '【今週のセッション】\n' + sessions.map(function(s) { return s.title + '(Phase' + s.phase + ', R' + s.current_round + ')'; }).join('\n') +
      '\n\n【承認済みアウトプット】\n' + cases.map(function(c) { return c.output_type + ': ' + c.title; }).join('\n') +
      '\n\n【判断履歴】\n' + decisions.map(function(d) { return d.decision + (d.comment ? '(' + d.comment + ')' : ''); }).join('\n') }]
  });
  var report = r.content[0].text;
  db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);
  await sendLine('【週次レポート】\n\n' + report);
  console.log('[週次レポート] 送信完了');
}

// ============================================
// Cron Jobs
// ============================================

// 毎晩23時（JST）就寝モード
cron.schedule('0 23 * * *', function() { runSleepMode().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 毎朝7時（JST）朝サマリー
cron.schedule('0 7 * * *', function() { sendMorningSummary().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 毎週月曜7時（JST）週次レポート
cron.schedule('0 7 * * 1', function() { sendWeeklyReport().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 30分ごとに状態自動保存（GitHub同期）
cron.schedule('*/30 * * * *', function() {
  if (operationMode !== 'aws') return;
  try {
    stateManager.saveState('aws');
    stateManager.pushToGitHub('state: auto-save');
    console.log('[Auto Save] 状態保存・GitHub push完了');
  } catch (e) { console.error('[Auto Save]', e.message); }
});

// ============================================
// 状態管理API
// ============================================

app.get('/api/state', function(req, res) {
  var state = stateManager.collectState(operationMode);
  res.json(state);
});

app.post('/api/state/save', function(req, res) {
  var state = stateManager.saveState(req.body.mode || operationMode);
  var pushed = stateManager.pushToGitHub('state: 手動保存');
  res.json({ success: true, pushed: pushed, state: state });
});

app.post('/api/state/load', function(req, res) {
  var state = stateManager.pullFromGitHub();
  res.json({ success: !!state, state: state });
});

app.get('/api/mode', function(req, res) {
  res.json({ mode: operationMode, state: stateManager.loadState() });
});

app.post('/api/mode', function(req, res) {
  var newMode = req.body.mode;
  if (newMode !== 'aws' && newMode !== 'local') return res.status(400).json({ error: 'mode must be aws or local' });
  if (newMode === 'local') {
    var result = stateManager.switchToPC();
    operationMode = 'local';
    res.json({ success: true, mode: 'local', pushed: result.pushed });
  } else {
    var state = stateManager.switchToAWS();
    operationMode = 'aws';
    res.json({ success: true, mode: 'aws', state: state });
  }
});

// ============================================
// GitHub Webhook（push時自動デプロイ）
// ============================================

app.post('/api/deploy', function(req, res) {
  // GitHub Webhookまたは手動デプロイ
  var isGithub = req.headers['x-github-event'] === 'push';
  var isAuth = req.headers['x-api-key'] === process.env.API_SECRET;
  if (!isGithub && !isAuth) return res.status(401).json({ error: '認証エラー' });

  res.json({ status: 'deploying' });
  var exec = require('child_process').exec;
  exec('bash /home/ubuntu/kabeuchi-system/deploy.sh', { cwd: '/home/ubuntu/kabeuchi-system' }, function(err, stdout, stderr) {
    if (err) console.error('[Deploy error]', err.message);
    console.log('[Deploy]', stdout);
    if (stderr) console.error('[Deploy stderr]', stderr);
  });
});

// ============================================
// ヘルスチェック
// ============================================

app.get('/health', function(req, res) {
  var sessionCount = db.prepare('SELECT COUNT(*) as cnt FROM sessions').get();
  var caseCount = db.prepare('SELECT COUNT(*) as cnt FROM case_library').get();
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    sessions: sessionCount.cnt,
    cases: caseCount.cnt
  });
});

// ============================================
// 起動
// ============================================

app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
process.on('SIGTERM', function() { db.close(); process.exit(0); });
