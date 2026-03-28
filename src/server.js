var path = require("path");
require('dotenv').config();
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var cron = require('node-cron');
var http = require('http');
var https = require('https');
var fs = require("fs");
var { initDatabase } = require('./schema');
var DiscussionEngine = require('./discussion-engine');
var PreferenceLearner = require('./preference-learner');
var OutputGenerator = require('./output-generator');
var StateManager = require('./state-manager');
var ListGenerator = require('./src/services/list-generator');
var AdDesigner = require('./src/services/ad-designer');
var MediaOptimizer = require('./src/services/media-optimizer');
var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');

// v3.1: フェーズランナー（フィーチャーフラグで切替）
var V3_ENABLED = process.env.V3_ENABLED === 'true';
var PhaseRunner = null;
if (V3_ENABLED) {
  try {
    PhaseRunner = require('./phases/phase-runner');
    console.log('[v3.1] マルチLLM並列モード有効');
  } catch(e) {
    console.error('[v3.1] PhaseRunner読込エラー、v2.0にフォールバック:', e.message);
    V3_ENABLED = false;
  }
}

// v2.1: 承認最小化設定
var AUTO_APPROVE_CONFIG = {
  gradeA_threshold: 32,  // 32点以上: 自動承認（通知なし）
  gradeB_threshold: 28,  // 28-31点: 自動承認+LINE通知
  // 27点以下: 前田さんに確認
  skipPhase1Confirm: true,   // Phase1 Step5方向性確認スキップ
  skipPhase2Confirm: true,   // Phase2 Step4訴求確認スキップ
  autoFixQuality: true,      // Phase3品質不合格時の自動修正
  maxAutoFixRetries: 3       // 自動修正最大回数
};



var app = express();
var PORT = process.env.PORT || 3000;
var db = initDatabase(process.env.DB_PATH || './data/kabeuchi.db');

// v2.0: lineQAとsendLineFnをエンジンに渡す
var lineQA = null; // 後で初期化
var engine = new DiscussionEngine(db, lineQA, sendLine);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db, lineQA, sendLine);
var stateManager = new StateManager(db);

// v3.1: フェーズランナー初期化
var phaseRunner = V3_ENABLED ? new PhaseRunner(db, lineQA, sendLine) : null;
if (phaseRunner && prefLearner) { phaseRunner.setPrefLearner(prefLearner); }
var listGen = new ListGenerator(db, lineQA, sendLine);
var adDesigner = new AdDesigner(db, lineQA, sendLine);
var mediaOpt = new MediaOptimizer(db, lineQA, sendLine);

// 運用モード管理
var operationMode = 'aws';
try {
  var savedState = stateManager.loadState();
  if (savedState && savedState.mode) operationMode = savedState.mode;
} catch (e) { /* デフォルトaws */ }

// 静的ファイル配信（LP等のHTML）- helmetの前に配置
app.disable("x-powered-by");
app.get("/outputs/:filename", function(req, res) {
  var filePath = path.join(__dirname, "src/public/outputs", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not Found");
  var html = fs.readFileSync(filePath, "utf8");
  res.set("Content-Type", "text/html; charset=UTF-8");
  res.send(html);
});

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// 認証（LINE Webhook・health・dashboardは除外）
app.use('/api', function(req, res, next) {
  if (req.path === '/line/webhook' || req.path === '/deploy') return next();
  if (req.headers['x-api-key'] !== process.env.API_SECRET) {
    return res.status(401).json({ error: '認証エラー' });
  }
  next();
});

// ============================================
// Phase 1: 壁打ち（8ステップ）
// ============================================

app.post('/api/discussion', async function(req, res) {
  try {
    var body = req.body;
    var sid = body.sessionId;

    // v3.1モード: フェーズランナーに委譲
    if (V3_ENABLED && phaseRunner && !sid) {
      if (!body.topic) return res.status(400).json({ error: 'topicは必須' });
      var projectId = body.projectId || null;
      var source = body.source || 'api';
      sid = phaseRunner.createSession(body.title || body.topic, body.topic, projectId);
      var research = await phaseRunner.runResearch(body.topic, projectId);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
      if (projectId) {
        db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(projectId, 'phase1_start_v3', 'テーマ: ' + body.topic, source);
      }
      var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
      var v3result = await phaseRunner.run(body.phase || 1, {
        sessionId: sid, topic: session.topic, projectId: session.project_id,
        source: source, research: session.research_data, outputType: body.outputType || 'general'
      });
      return res.json(v3result);
    }

    // v2.0 フォールバック
    var projectId = body.projectId || null;

    // 新規セッション作成
    if (!sid) {
      if (!body.topic) return res.status(400).json({ error: 'topicは必須' });
      sid = engine.createSession(body.title || body.topic, body.topic, projectId);

      // 事前調査実行
      var research = await engine.runResearch(body.topic, projectId);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);

      // 操作ログ記録
      if (projectId) {
        db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(projectId, 'phase1_start', 'テーマ: ' + body.topic, 'api');
      }
    }

    // ユーザーコメント保存
    if (body.userComment) {
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sid);
      var session0 = db.prepare('SELECT project_id FROM sessions WHERE id = ?').get(sid);
      db.prepare('INSERT INTO discussion_logs (session_id, project_id, phase, role, role_label, content, round_number, round_theme) VALUES (?,?,1,?,?,?,?,?)')
        .run(sid, session0 ? session0.project_id : null, 'user', '前田さん', body.userComment, lr ? lr.mr || 1 : 1, '');
    }

    // 次のステップ番号を決定
    var lr2 = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sid, 'user');
    var round = (lr2 && lr2.mr ? lr2.mr : 0) + 1;

    // v2.0: 8ステップ完了で最終統合
    if (round > 8) {
      var summary = await engine.generateFinalSummary(sid);
      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。Phase2に進む準備ができました。' });
    }

    var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    var result = await engine.runStep(sid, session.topic, round, session.research_data, false, session.project_id);
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

app.post('/api/output/generate', async function(req, res) {
  try {
    // v3.1モード
    if (V3_ENABLED && phaseRunner) {
      var body = req.body;
      if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
      var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(body.sessionId);
      if (!session) return res.status(404).json({ error: 'セッション未発見' });
      var phase2Result = await phaseRunner.run(2, {
        sessionId: body.sessionId, topic: session.topic, projectId: session.project_id,
        source: body.source || 'api', research: session.research_data,
        previousOutput: session.appeal_points || session.target_definition || '',
        outputType: body.outputType
      });
      var phase3Result = await phaseRunner.run(3, {
        sessionId: body.sessionId, topic: session.topic, projectId: session.project_id,
        source: body.source || 'api', research: session.research_data,
        previousOutput: phase2Result.content || '', outputType: body.outputType
      });
      return res.json(phase3Result);
    }
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    res.json(result);
  } catch (err) {
    console.error('[output]', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/output/design', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var doc = await outputGen.createDesignDoc(body.sessionId, body.outputType, body.params || {});
    res.json({ designDoc: doc });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/output/approve', function(req, res) {
  var body = req.body;
  if (!body.queueId) return res.status(400).json({ error: 'queueId必須' });
  var caseId = outputGen.approveOutput(body.queueId, body.pattern || 'A', body.filePath, body.deployUrl);
  if (body.pattern) prefLearner.learnFromPatternChoice(null, body.pattern, body.outputType);
  res.json({ success: true, caseId: caseId });
});

app.get('/api/output/queue', function(req, res) {
  var status = req.query.status || 'awaiting_approval';
  res.json(db.prepare('SELECT * FROM output_queue WHERE status = ? ORDER BY created_at DESC').all(status));
});

// ============================================
// プロジェクト管理（v2.0新規）
// ============================================

app.get('/api/projects', function(req, res) {
  res.json(db.prepare('SELECT * FROM active_projects ORDER BY last_operated_at DESC').all());
});

app.get('/api/projects/:id/logs', function(req, res) {
  res.json(db.prepare('SELECT * FROM operation_logs WHERE project_id = ? ORDER BY created_at DESC LIMIT 30').all(req.params.id));
});

app.post('/api/projects/:id/archive', function(req, res) {
  db.prepare("UPDATE active_projects SET status = 'archived' WHERE id = ?").run(req.params.id);
  db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(req.params.id, 'archive', 'プロジェクトをアーカイブ');
  res.json({ success: true });
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
      console.log('[LINE Webhook] イベント受信:', JSON.stringify(ev.type));

      if (ev.type === 'follow') {
        var followUserId = ev.source.userId;
        console.log('[LINE] 友だち追加 ユーザーID: ' + followUserId);
        db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', followUserId, '[友だち追加]');
        if (ev.replyToken) await replyLine(ev.replyToken, '前田法律事務所AIシステムに接続しました。');
        continue;
      }

      if (ev.type !== 'message' || ev.message.type !== 'text') continue;
      var text = ev.message.text;
      var userId = ev.source.userId;

      console.log('[LINE] メッセージ: ' + text);
      db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', userId, text);

      // LINE QA保留質問への回答チェック
      var pendingQ = db.prepare("SELECT * FROM pending_questions WHERE status = 'pending' ORDER BY created_at DESC LIMIT 1").get();
      if (pendingQ) {
        db.prepare("UPDATE pending_questions SET answer = ?, status = 'answered' WHERE id = ?").run(text, pendingQ.id);
        if (ev.replyToken) await replyLine(ev.replyToken, '回答を受け付けました');
        continue;
      }

      var reply = await processLineCommand(text, userId);
      if (reply && ev.replyToken) {
        await replyLine(ev.replyToken, reply);
        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);
      }
    }
  } catch (err) { console.error('[LINE webhook]', err); }
});

// v3.2: LINE コマンド処理（修正: 優先順位再設計、複数プロジェクト安全化）
async function processLineCommand(text, userId) {
  var t = text.trim();

  // ================================================================
  // ① 新規プロジェクト作成 + フェーズ1即時開始
  //    例:「新規フェーズ1 僕の強みを活かした法律分野を考えて」
  // ================================================================
  var createStartMatch = t.match(/^新規[\s\u3000]*フェーズ[\s]*1[\s\u3000]+(.+)/);
  if (createStartMatch) {
    var theme1 = createStartMatch[1].trim();
    var keyword1 = theme1.split(/[（(]/)[0].trim();
    var proj1 = db.prepare('INSERT INTO active_projects (name, keyword, current_phase, status) VALUES (?,?,1,?)').run(theme1, keyword1, 'active');
    var projId1 = proj1.lastInsertRowid;
    db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(projId1, 'create_and_start', theme1);

    // Phase1セッション作成 & 即時開始
    var sess1 = db.prepare("INSERT INTO sessions (title, topic, status, current_round) VALUES (?,?,'active',0)").run(theme1, theme1);
    var sessId1 = sess1.lastInsertRowid;
    db.prepare('UPDATE active_projects SET current_session_id = ? WHERE id = ?').run(sessId1, projId1);
    db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(projId1, 'phase1_start', 'auto');

    // v3.1パイプライン起動（バックグラウンド）
    if (typeof phaseRunner !== 'undefined' && phaseRunner.runPhase) {
      phaseRunner.runPhase(sessId1, 1, theme1).then(function() {
        sendLine('[Phase1完了] ID:' + projId1 + ' ' + theme1 + '\n承認 or フィードバックをお願いします');
      }).catch(function(e) { sendLine('[Phase1エラー] ID:' + projId1 + ' ' + e.message); });
    } else {
      // v2.0フォールバック
      try {
        var engine = require('./discussion-engine');
        engine.startDiscussion(theme1, theme1, sessId1);
      } catch(e2) {}
    }

    return 'プロジェクト作成 + Phase1開始\nID:' + projId1 + ' ' + theme1 + '\n\nバックグラウンドで壁打ち実行中...';
  }

  // ================================================================
  // ② 新規プロジェクト作成のみ
  //    例: 「新規 交通事故LP」
  // ================================================================
  if (t.startsWith('新規 ') || t.startsWith('新規\u3000') || /^新規[\s\u3000]+/.test(t)) {
    var themeName = t.replace(/^新規[\s\u3000]+/, '').trim();
    if (!themeName) return 'テーマ名を指定してください\n例：新規 交通事故LP\n例：新規フェーズ1 相続問題LP';
    var keyword = themeName.split(/[（(]/)[0].trim();
    var proj = db.prepare('INSERT INTO active_projects (name, keyword, current_phase, status) VALUES (?,?,1,?)').run(themeName, keyword, 'active');
    var projId = proj.lastInsertRowid;
    db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(projId, 'create', themeName);
    return 'プロジェクト作成完了\nID:' + projId + ' ' + themeName + '\n\n「ID' + projId + ' フェーズ1開始」で壁打ち開始\n「新規フェーズ1 テーマ」なら作成と同時に開始';
  }

  // ================================================================
  // ③ 既存プロジェクト操作（ID必須）
  //    例: 「ID2 フェーズ3開始」「ID2 状況」「ID2 承認」
  // ================================================================
  var idMatch = t.match(/^ID[\s]*[:：]?[\s]*(\d+)[\s]+(.+)/i);
  if (!idMatch) {
    // キーワードマッチによるID推定（既存ロジック維持）
    var projects = db.prepare("SELECT * FROM active_projects WHERE status = 'active'").all();
    for (var pi = 0; pi < projects.length; pi++) {
      if (projects[pi].keyword && t.indexOf(projects[pi].keyword) !== -1) {
        idMatch = [null, String(projects[pi].id), t.replace(projects[pi].keyword, '').trim()];
        break;
      }
    }
  }

  if (idMatch) {
    var targetId = parseInt(idMatch[1]);
    var cmd = idMatch[2].trim();
    var proj2 = db.prepare('SELECT * FROM active_projects WHERE id = ?').get(targetId);
    if (!proj2) return 'プロジェクトID:' + targetId + ' が見つかりません';

    // --- ID指定の承認 ---
    if (/^(承認|OK|ok)$/i.test(cmd)) {
      var sess = proj2.current_session_id ? db.prepare("SELECT * FROM sessions WHERE id = ?").get(proj2.current_session_id) : null;
      if (sess) {
        db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(sess.id, 'approved');
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'approved', proj2.name);
        // v3.1承認連携
        if (typeof phaseRunner !== 'undefined' && phaseRunner.approvePhase) {
          try { phaseRunner.approvePhase(sess.id, proj2.current_phase || 1); } catch(e) {}
        }
        return '承認しました（ID:' + targetId + ' ' + proj2.name + '）';
      }
      return 'ID:' + targetId + ' にアクティブなセッションがありません';
    }

    // --- ID指定の却下 ---
    if (/^却下/.test(cmd)) {
      var rejectReason = cmd.replace(/^却下[\s\u3000]*/, '').trim() || '理由なし';
      var sessR = proj2.current_session_id ? db.prepare("SELECT * FROM sessions WHERE id = ?").get(proj2.current_session_id) : null;
      if (sessR) {
        db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(sessR.id, 'rejected', rejectReason);
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'rejected', rejectReason);
        return '却下しました（ID:' + targetId + ' ' + proj2.name + '）\n理由: ' + rejectReason;
      }
      return 'ID:' + targetId + ' にアクティブなセッションがありません';
    }

    // --- フェーズ開始 ---
    if (/フェーズ[\s]*(\d+)[\s]*(開始|スタート)/i.test(cmd)) {
      var phaseNum = parseInt(cmd.match(/(\d+)/)[1]);
      db.prepare('UPDATE active_projects SET current_phase = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(phaseNum, targetId);
      db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'phase' + phaseNum + '_start', proj2.name);

      // Phase1-3: v3.1パイプライン
      if (phaseNum >= 1 && phaseNum <= 3 && proj2.current_session_id) {
        var topic = proj2.name;
        if (typeof phaseRunner !== 'undefined' && phaseRunner.runPhase) {
          phaseRunner.runPhase(proj2.current_session_id, phaseNum, topic).then(function() {
            sendLine('[Phase' + phaseNum + '完了] ID:' + targetId + ' ' + proj2.name + '\n承認 or フィードバックをお願いします');
          }).catch(function(e) { sendLine('[Phase' + phaseNum + 'エラー] ID:' + targetId + ' ' + e.message); });
          return proj2.name + ' Phase' + phaseNum + ' 開始（バックグラウンド実行中）';
        }
      }

      // Phase4-6: 専用サービスモジュール
      if (phaseNum === 4 && proj2.current_session_id) {
        listGen.generateFull(proj2.current_session_id, false).then(function() {
          sendLine('[Phase4完了] ' + proj2.name + ' リスト生成完了');
        }).catch(function(e) { sendLine('[Phase4エラー] ' + e.message); });
        return proj2.name + ' Phase4 リスト生成開始（バックグラウンド実行中）';
      }
      if (phaseNum === 5 && proj2.current_session_id) {
        adDesigner.generateFull(proj2.current_session_id, false).then(function() {
          sendLine('[Phase5完了] ' + proj2.name + ' 広告デザイン完了');
        }).catch(function(e) { sendLine('[Phase5エラー] ' + e.message); });
        return proj2.name + ' Phase5 広告デザイン開始（バックグラウンド実行中）';
      }
      if (phaseNum === 6 && proj2.current_session_id) {
        mediaOpt.generateFull(proj2.current_session_id, 'all', false).then(function() {
          sendLine('[Phase6完了] ' + proj2.name + ' メディア最適化完了');
        }).catch(function(e) { sendLine('[Phase6エラー] ' + e.message); });
        return proj2.name + ' Phase6 メディア最適化開始（バックグラウンド実行中）';
      }

      // セッション未作成の場合
      if (!proj2.current_session_id && phaseNum === 1) {
        var newSess = db.prepare("INSERT INTO sessions (title, topic, status, current_round) VALUES (?,?,'active',0)").run(proj2.name, proj2.name);
        db.prepare('UPDATE active_projects SET current_session_id = ? WHERE id = ?').run(newSess.lastInsertRowid, targetId);
        if (typeof phaseRunner !== 'undefined' && phaseRunner.runPhase) {
          phaseRunner.runPhase(newSess.lastInsertRowid, 1, proj2.name).then(function() {
            sendLine('[Phase1完了] ID:' + targetId + ' ' + proj2.name + '\n承認 or フィードバックをお願いします');
          }).catch(function(e) { sendLine('[Phase1エラー] ID:' + targetId + ' ' + e.message); });
          return proj2.name + ' Phase1 開始（バックグラウンド実行中）';
        }
      }

      return proj2.name + ' Phase' + phaseNum + ' 開始準備完了';
    }

    // --- 状況確認 ---
    if (/状況|進捗|ステータス/.test(cmd)) {
      var sessS = proj2.current_session_id ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(proj2.current_session_id) : null;
      var msg = 'ID:' + targetId + ' ' + proj2.name + '\nPhase' + (proj2.current_phase || '?');
      if (sessS) msg += ' Step' + (sessS.current_round || 0) + '/8 (' + sessS.status + ')';
      // v3.1フェーズ結果があれば表示
      try {
        var phaseResult = db.prepare('SELECT phase, status FROM phase_results WHERE session_id = ? ORDER BY phase DESC LIMIT 1').get(proj2.current_session_id || 0);
        if (phaseResult) msg += '\nv3.1: Phase' + phaseResult.phase + ' ' + phaseResult.status;
      } catch(e) {}
      return msg;
    }

    // --- FB ---
    if (cmd.startsWith('FB ') || cmd.startsWith('FB\u3000')) {
      var fb = cmd.replace(/^FB[\s\u3000]+/, '').trim();
      prefLearner.addPreference('feedback', 'project_' + targetId, fb, null, 'line');
      db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(targetId, 'feedback', fb, 'line');
      return 'FB保存しました（ID:' + targetId + ' ' + proj2.name + '）';
    }

    // --- 履歴 ---
    if (/履歴/.test(cmd)) {
      var logs = db.prepare('SELECT * FROM operation_logs WHERE project_id = ? ORDER BY created_at DESC LIMIT 10').all(targetId);
      if (logs.length === 0) return proj2.name + 'の操作履歴なし';
      return 'ID:' + targetId + ' ' + proj2.name + ' 直近履歴\n' + logs.map(function(l) { return l.action + ': ' + (l.details || '').substring(0, 30); }).join('\n');
    }

    // --- まとめ ---
    if (/まとめ/.test(cmd)) {
      var sLogs = db.prepare('SELECT round_number, role, content FROM discussion_logs WHERE session_id = ? ORDER BY round_number ASC').all(proj2.current_session_id || 0);
      if (sLogs.length === 0) return proj2.name + ': ディスカッションログなし';
      var summary = 'ID:' + targetId + ' ' + proj2.name + ' まとめ\n';
      sLogs.forEach(function(l) {
        summary += 'Step' + l.round_number + '(' + l.role + '): ' + (l.content || '').substring(0, 80) + '\n';
      });
      var chunks = [];
      for (var ci = 0; ci < summary.length; ci += 300) chunks.push(summary.substring(ci, ci + 300));
      for (var cj = 1; cj < chunks.length; cj++) await sendLine(chunks[cj]);
      return chunks[0];
    }

    // --- アーカイブ ---
    if (/アーカイブ/.test(cmd)) {
      return proj2.name + ' をアーカイブしますか？「ID' + targetId + ' アーカイブ確定」で実行';
    }
    if (/アーカイブ確定/.test(cmd)) {
      db.prepare("UPDATE active_projects SET status = 'archived' WHERE id = ?").run(targetId);
      db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'archive', proj2.name);
      return 'ID:' + targetId + ' ' + proj2.name + ' をアーカイブしました';
    }

    return 'ID:' + targetId + ' ' + proj2.name + ': コマンド「' + cmd + '」を認識できませんでした\n\n使えるコマンド:\n  ID' + targetId + ' フェーズN開始\n  ID' + targetId + ' 状況\n  ID' + targetId + ' 承認 / 却下 [理由]\n  ID' + targetId + ' FB [フィードバック]\n  ID' + targetId + ' 履歴 / まとめ';
  }

  // ================================================================
  // ④ 承認・却下（IDなし → 安全化: 複数プロジェクト時は確認）
  // ================================================================
  if (/^(承認|OK|ok)$/i.test(t)) {
    var activeForApproval = db.prepare("SELECT ap.*, s.status as sess_status FROM active_projects ap LEFT JOIN sessions s ON ap.current_session_id = s.id WHERE ap.status = 'active'").all();

    // 複数プロジェクトがアクティブな場合 → 確認を返す
    if (activeForApproval.length > 1) {
      var confirmMsg = '現在 ' + activeForApproval.length + '件のプロジェクトが進行中です。\nどのプロジェクトを承認しますか？\n';
      activeForApproval.forEach(function(p) {
        confirmMsg += '\n  ID' + p.id + ' 承認 → ' + p.name;
      });
      return confirmMsg;
    }

    // 1件のみ → 即時承認
    if (activeForApproval.length === 1) {
      var ap = activeForApproval[0];
      if (ap.current_session_id) {
        db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(ap.current_session_id, 'approved');
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(ap.id, 'approved', ap.name);
        if (typeof phaseRunner !== 'undefined' && phaseRunner.approvePhase) {
          try { phaseRunner.approvePhase(ap.current_session_id, ap.current_phase || 1); } catch(e) {}
        }
        return '承認しました（ID:' + ap.id + ' ' + ap.name + '）';
      }
    }

    return 'アクティブなプロジェクトがありません';
  }

  if (/^却下/.test(t)) {
    var rejectText = t.replace(/^却下[\s\u3000]*/, '').trim() || '理由なし';
    var activeForReject = db.prepare("SELECT * FROM active_projects WHERE status = 'active'").all();

    if (activeForReject.length > 1) {
      var rejectConfirm = '現在 ' + activeForReject.length + '件のプロジェクトが進行中です。\nどのプロジェクトを却下しますか？\n';
      activeForReject.forEach(function(p) {
        rejectConfirm += '\n  ID' + p.id + ' 却下 ' + rejectText + ' → ' + p.name;
      });
      return rejectConfirm;
    }

    if (activeForReject.length === 1) {
      var rp = activeForReject[0];
      if (rp.current_session_id) {
        db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(rp.current_session_id, 'rejected', rejectText);
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(rp.id, 'rejected', rejectText);
        return '却下しました（ID:' + rp.id + ' ' + rp.name + '）\n理由: ' + rejectText;
      }
    }

    return 'アクティブなプロジェクトがありません';
  }

  // ================================================================
  // ⑤ 全体状況確認（修正4: 次のアクション明記）
  // ================================================================
  if (/^(状態|全部まとめ|ステータス)$/.test(t)) {
    var allProjects = db.prepare("SELECT * FROM active_projects WHERE status IN ('active','sleeping') ORDER BY last_operated_at DESC").all();
    var pendingOQ = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();

    if (allProjects.length === 0 && pendingOQ.length === 0) {
      return 'プロジェクト状況\n\n進行中プロジェクトなし\n\n「新規 [テーマ]」で新しいプロジェクトを作成できます';
    }

    var statusMsg = 'プロジェクト状況\n';
    allProjects.forEach(function(p) {
      statusMsg += '\nID' + p.id + ' ' + p.name;
      var sess = p.current_session_id ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(p.current_session_id) : null;

      // フェーズ状態の詳細表示
      statusMsg += '\n  フェーズ' + (p.current_phase || 1);

      // 承認待ち判定
      var hasPendingDecision = sess && sess.status === 'active';
      var hasPhaseResult = false;
      try {
        var pr = db.prepare("SELECT * FROM phase_results WHERE session_id = ? AND phase = ? ORDER BY id DESC LIMIT 1").get(p.current_session_id || 0, p.current_phase || 1);
        if (pr && pr.status === 'completed') { hasPhaseResult = true; hasPendingDecision = true; }
      } catch(e) {}

      if (p.status === 'sleeping') {
        statusMsg += ' 休眠中\n  → 「ID' + p.id + ' フェーズ' + (p.current_phase || 1) + '開始」で再開';
      } else if (hasPhaseResult) {
        statusMsg += ' 承認待ち\n  → 「ID' + p.id + ' 承認」で次へ進みます';
      } else if (sess && sess.status === 'active' && (sess.current_round || 0) > 0) {
        statusMsg += ' 実行中（Step' + (sess.current_round || 0) + '）';
      } else {
        statusMsg += ' 未着手\n  → 「ID' + p.id + ' フェーズ' + (p.current_phase || 1) + '開始」で開始できます';
      }
      statusMsg += '\n';
    });

    if (pendingOQ.length > 0) {
      statusMsg += '\n承認待ちアウトプット: ' + pendingOQ.length + '件';
    }

    return statusMsg.trim();
  }

  // ================================================================
  // ⑥ 学習内容確認
  // ================================================================
  if (/^学習内容|^フィードバック一覧|^FB一覧/.test(t)) {
    var memories = db.prepare('SELECT category, key, value, confidence FROM memory_db ORDER BY confidence DESC LIMIT 15').all();
    if (memories.length === 0) return '学習データなし';
    return '学習内容（上位15件）\n' + memories.map(function(m) { return m.category + '/' + m.key + ': ' + m.value.substring(0, 30) + ' (' + m.confidence.toFixed(2) + ')'; }).join('\n');
  }

  // ================================================================
  // ⑦ モード切替
  // ================================================================
  if (t === 'AWSモード' || t === 'awsモード' || t === 'AWS') {
    try {
      var state = stateManager.switchToAWS();
      operationMode = 'aws';
      try { require('child_process').execSync('sudo systemctl start claude-code-daemon', { timeout: 10000 }); } catch (e) {}
      return 'AWSモード切替完了';
    } catch (e) { return 'AWSモード切替エラー: ' + e.message; }
  }

  if (t === 'PCモード' || t === 'pcモード' || t === 'PC' || t === 'ローカル') {
    try {
      var result = stateManager.switchToPC();
      operationMode = 'local';
      try { require('child_process').execSync('sudo systemctl stop claude-code-daemon', { timeout: 10000 }); } catch (e) {}
      return 'PCモード切替完了';
    } catch (e) { return 'PCモード切替エラー: ' + e.message; }
  }

  if (t === 'モード確認' || t === 'モード' || t === 'mode') {
    return operationMode === 'aws' ? 'AWSモード稼働中' : 'PCモード';
  }

  // ================================================================
  // フェーズ構成
  // ================================================================
  if (/フェーズ構成|Phase構成|フェーズ(一覧|説明)/.test(t)) {
    return 'フェーズ構成:\nPhase1: アイデア磨き込み（9エージェント並列）\nPhase2: 訴求磨き込み（9エージェント並列）\nPhase3: コンテンツ生成（9エージェント+品質評価+自動承認）\nPhase4: リスト生成\nPhase5: 広告デザイン\nPhase6: メディア最適化\n\n例: ID1 フェーズ1開始\n例: 新規フェーズ1 交通事故LP';
  }

  // ================================================================
  // API状態
  // ================================================================
  if (/^API状態|^API確認|^api.?status/i.test(t)) {
    var apiStatus = 'API状態確認\n';
    try {
      var anth = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      await anth.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 10, messages: [{ role: 'user', content: 'test' }] });
      apiStatus += 'Claude: OK\n';
    } catch(ae) { apiStatus += 'Claude: NG (' + ae.message.substring(0, 50) + ')\n'; }
    try {
      var oai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      await oai.chat.completions.create({ model: 'gpt-4o-mini', max_tokens: 10, messages: [{ role: 'user', content: 'test' }] });
      apiStatus += 'OpenAI: OK\n';
    } catch(oe) { apiStatus += 'OpenAI: NG (' + oe.message.substring(0, 50) + ')\n'; }
    apiStatus += 'LINE: ' + (process.env.LINE_CHANNEL_ACCESS_TOKEN ? '設定済' : '未設定') + '\n';
    apiStatus += 'Gemini: ' + (process.env.GEMINI_API_KEY ? '設定済' : '未設定');
    return apiStatus;
  }

  // ================================================================
  // Claude Code コマンド
  // ================================================================
  var ccPrefixes = ['コード', '修正', '実装', '追加', 'バグ', 'デプロイ', 'claude'];
  var isCodeCmd = ccPrefixes.some(function(p) { return t.startsWith(p); });
  if (isCodeCmd) {
    try {
      var ccData = JSON.stringify({ instruction: t, autoRestart: true });
      var ccResult = await new Promise(function(resolve) {
        var ccReq = http.request({
          hostname: '127.0.0.1', port: 3001, path: '/task', method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.API_SECRET, 'Content-Length': Buffer.byteLength(ccData) }
        }, function(res2) {
          var b = ''; res2.on('data', function(c) { b += c; }); res2.on('end', function() { resolve(JSON.parse(b)); });
        });
        ccReq.on('error', function(e) { resolve({ error: e.message }); });
        ccReq.write(ccData); ccReq.end();
      });
      if (ccResult.error) return 'CC接続エラー: ' + ccResult.error;
      return 'タスク投入完了 ID:' + ccResult.taskId;
    } catch (e) { return 'CC呼出エラー: ' + e.message; }
  }

  // ================================================================
  // CC状態
  // ================================================================
  if (t === 'CC状態' || t === 'Claude状態') {
    try {
      var statusResult = await new Promise(function(resolve) {
        var sReq = http.request({
          hostname: '127.0.0.1', port: 3001, path: '/status', method: 'GET',
          headers: { 'x-api-key': process.env.API_SECRET }
        }, function(res2) {
          var b = ''; res2.on('data', function(c) { b += c; }); res2.on('end', function() { resolve(JSON.parse(b)); });
        });
        sReq.on('error', function(e) { resolve({ error: e.message }); });
        sReq.end();
      });
      if (statusResult.error) return 'CC: ' + statusResult.error;
      var ccMsg = 'Claude Code状態\n';
      ccMsg += statusResult.running ? '実行中: ' + (statusResult.currentTask ? statusResult.currentTask.instruction : '') + '\n' : '待機中\n';
      ccMsg += 'キュー: ' + statusResult.queueLength + '件';
      return ccMsg;
    } catch (e) { return 'CC状態取得エラー'; }
  }

  // ================================================================
  // 「いまの状況」等の自然言語状態確認
  // ================================================================
  if (/教えて|は[？?]$|進捗|動いてる|何してる|どうなった|報告|いまの状況|状況教えて/.test(t)) {
    var allP = db.prepare("SELECT * FROM active_projects WHERE status IN ('active','sleeping') ORDER BY last_operated_at DESC").all();
    if (allP.length === 0) return '進行中プロジェクトなし';
    var sMsg = 'プロジェクト状況\n';
    allP.forEach(function(p) {
      sMsg += '\nID' + p.id + ' ' + p.name + ' (Phase' + p.current_phase + ' ' + p.status + ')';
    });
    return sMsg;
  }

  // ================================================================
  // メモ保存
  // ================================================================
  var memoPatterns = [/メモ(して|しといて|保存)/, /覚えて/, /覚えておいて/, /記録して/];
  var isMemoRequest = memoPatterns.some(function(p) { return p.test(t); });
  if (isMemoRequest) {
    var memoText = t.replace(/メモして|メモしといて|メモ保存|覚えて|覚えておいて|記録して/g, '').trim();
    if (!memoText) memoText = t;
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(memoText);
    return 'メモ保存: ' + memoText.substring(0, 30);
  }

  // ================================================================
  // ⑧ 解析不能 → ガイドメッセージ（修正2）
  // ================================================================
  return 'コマンドが認識できませんでした。\n\n【新規プロジェクト】\n  新規 [テーマ]\n  新規フェーズ1 [テーマ]  ← 作成+Phase1即時開始\n\n【既存プロジェクト操作】（IDを先頭につける）\n  ID2 状況\n  ID2 フェーズ3開始\n  ID2 承認\n  ID2 却下 [理由]\n  ID2 FB [フィードバック]\n\n【全体確認】\n  状態 / 全部まとめ\n  学習内容';
}

// ============================================

function replyLine(replyToken, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  return new Promise(function(resolve) {
    var data = JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: String(message).substring(0, 5000) }] });
    var req = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/reply', method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data, 'utf8') }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(res.statusCode === 200); }); });
    req.on('error', function() { resolve(false); });
    req.write(data, 'utf8'); req.end();
  });
}

function pushLine(userId, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  return new Promise(function(resolve) {
    var data = JSON.stringify({ to: userId, messages: [{ type: 'text', text: String(message).substring(0, 5000) }] });
    var r = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/push', method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data, 'utf8') }
    }, function(res) {
      var b = ''; res.on('data', function(c) { b += c; });
      res.on('end', function() { resolve(res.statusCode === 200); });
    });
    r.on('error', function() { resolve(false); });
    r.write(data, 'utf8'); r.end();
  });
}

function sendLine(message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  // v2.0: HTMLコード・内部プロンプトをフィルタリング
  var msg = String(message);
  if (msg.indexOf('<!DOCTYPE') !== -1 || msg.indexOf('<html') !== -1) {
    msg = '（HTMLコンテンツは送信をスキップしました。プレビューURLをご確認ください）';
  }
  // v2.1: .env優先 → DB fallback → broadcast
  var userId = process.env.LINE_USER_ID;
  if (!userId) {
    try {
      var user = db.prepare("SELECT DISTINCT user_id FROM line_messages WHERE user_id IS NOT NULL ORDER BY id DESC LIMIT 1").get();
      if (user && user.user_id) userId = user.user_id;
    } catch(e) { console.log("[sendLine] DB lookup failed:", e.message); }
  }
  if (userId) {
    return pushLine(userId, msg);
  }
  return new Promise(function(resolve) {
    var data = JSON.stringify({ messages: [{ type: 'text', text: msg.substring(0, 5000) }] });
    var r = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/broadcast', method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data, 'utf8') }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(res.statusCode === 200); }); });
    r.on('error', function() { resolve(false); });
    r.write(data, 'utf8'); r.end();
  });
}

// LINE ユーザー/メッセージ確認
app.get('/api/line/users', function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var users = db.prepare("SELECT DISTINCT user_id, MIN(created_at) as first_seen, MAX(created_at) as last_seen, COUNT(*) as msg_count FROM line_messages WHERE user_id IS NOT NULL GROUP BY user_id ORDER BY last_seen DESC").all();
  var messages = db.prepare("SELECT * FROM line_messages ORDER BY created_at DESC LIMIT 20").all();
  res.json({ users: users, recentMessages: messages });
});

app.post('/api/line/send', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.message) return res.status(400).json({ error: 'message必須' });
  var result = body.userId ? await pushLine(body.userId, body.message) : await sendLine(body.message);
  res.json({ success: result });
});

// ============================================
// 就寝モード（v2.0: 最大5件、3件並列、各最大3ステップ）
// ============================================

async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
  var activeSessions = db.prepare("SELECT s.*, ap.id as proj_id FROM sessions s LEFT JOIN active_projects ap ON s.project_id = ap.id WHERE s.status = 'active' ORDER BY s.priority ASC, s.updated_at DESC LIMIT 5").all();
  if (activeSessions.length === 0) {
    console.log('[就寝モード] アクティブなセッションなし → 新規事業アイデア調査モード');
    try {
      var ideaPrompt = 'あなたは弁護士事務所の経営戦略アドバイザーです。前田法律事務所（東京新橋、即独5年で年商5億、交通事故・相続・企業法務が主力）が新たに取り組むべき事業アイデアを3つ提案してください。' +
        '\n\n各アイデアについて以下を簡潔に：' +
        '\n1. 事業名' +
        '\n2. 市場規模・成長性（具体的な数字）' +
        '\n3. 前田事務所の強みとの親和性' +
        '\n4. 初期投資・リスク' +
        '\n5. 想定月間売上' +
        '\n\n※法律事務所として適法な範囲内で。弁護士法・弁護士職務基本規程を遵守。';
      var ideaResult = await aiSummarize(
        '弁護士事務所の新規事業アイデアを提案する専門家。最新の市場データに基づき実現可能な提案をする。',
        ideaPrompt, 2000
      );
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (0, ?, ?)').run('new_business_idea', ideaResult);
      console.log('[就寝モード] 新規事業アイデア生成完了');
    } catch(e) {
      console.error('[就寝モード] アイデア生成エラー:', e.message);
    }
    return;
  }

  // v2.0: 3件並列で実行
  var batchSize = 3;
  for (var bi = 0; bi < activeSessions.length; bi += batchSize) {
    var batch = activeSessions.slice(bi, bi + batchSize);
    var promises = batch.map(function(sess) {
      return (async function(s) {
        try {
          db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(s.id);
          db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?,?)').run(s.id, 'sleep_start');

          var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
          var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
          var maxRounds = Math.min(startRound + 2, 9); // 最大3ステップ or Step8まで

          for (var r = startRound; r < maxRounds; r++) {
            try {
              // v3.1: フェーズランナーで就寝モード実行
              if (V3_ENABLED && phaseRunner) {
                try { await phaseRunner.runSleepStep(s); break; } catch(v3err) { console.error("[就寝v3.1]", v3err.message); }
              } else {
                await engine.runStep(s.id, s.topic, r, s.research_data, true, s.project_id);
              }
              console.log('[就寝モード] session:' + s.id + ' Step' + r + ' 完了');
            } catch (err) {
              console.error('[就寝モード] session:' + s.id + ' Step' + r + 'エラー:', err.message);
              db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'error_step_' + r, err.message);
              break;
            }
          }

          // 8ステップ完了なら最終統合
          var currentRound = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
          if (currentRound && currentRound.mr >= 8) {
            try {
              await engine.generateFinalSummary(s.id);
              console.log('[就寝モード] session:' + s.id + ' 最終統合完了');
            } catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }
          }

          db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
          db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'sleep_end', '完了');
        } catch (e) {
          console.error('[就寝モード] session:' + s.id + ' エラー:', e.message);
          db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
        }
      })(sess);
    });
    await Promise.all(promises);
  }
  console.log('[就寝モード] 完了');
}


// ============================================
// Phase4: 営業リスト生成
// ============================================
app.post('/api/phase4/generate', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
  try {
    var result = await listGen.generateFull(body.sessionId, body.isSleep || false);
    res.json({ success: true, result: result });
  } catch(e) {
    console.error('[Phase4] エラー:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/phase4/step', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.sessionId || !body.step) return res.status(400).json({ error: 'sessionId, step必須' });
  try {
    var result = await listGen.runStep(body.sessionId, body.step, body.isSleep || false);
    res.json({ success: true, step: body.step, result: result });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================
// Phase5: 広告デザイン
// ============================================
app.post('/api/phase5/generate', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
  try {
    var result = await adDesigner.generateFull(body.sessionId, body.isSleep || false);
    res.json({ success: true, result: result });
  } catch(e) {
    console.error('[Phase5] エラー:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/phase5/step', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.sessionId || !body.step) return res.status(400).json({ error: 'sessionId, step必須' });
  try {
    var result = await adDesigner.runStep(body.sessionId, body.step, body.isSleep || false);
    res.json({ success: true, step: body.step, result: result });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================
// Phase6: メディア最適化
// ============================================
app.post('/api/phase6/generate', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.sessionId || !body.mediaType) return res.status(400).json({ error: 'sessionId, mediaType必須' });
  try {
    var result = await mediaOpt.generateFull(body.sessionId, body.mediaType, body.isSleep || false);
    res.json({ success: true, result: result });
  } catch(e) {
    console.error('[Phase6] エラー:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ============================================
// LINE Phase4-6コマンド処理用の拡張
// ============================================

// ============================================
// 朝サマリー（7時LINE送信）
// ============================================


// AI summarize helper: Claude -> GPT-5.4 fallback
// v2.1: リトライヘルパー（429→30s, 500/529→10s, timeout 120s）
async function withRetry(fn, label, maxRetries) {
  maxRetries = maxRetries || 3;
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await Promise.race([
        fn(),
        new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout 120s')); }, 120000); })
      ]);
    } catch(err) {
      var status = err.status || (err.response && err.response.status) || 0;
      var isRetryable = status === 429 || status === 500 || status === 529 || err.message === 'timeout 120s';
      if (!isRetryable || attempt === maxRetries) throw err;
      var delay = status === 429 ? 30000 : 10000;
      console.log('[Retry] ' + label + ' attempt ' + attempt + '/' + maxRetries + ' status:' + status + ' wait:' + (delay/1000) + 's');
      await new Promise(function(r) { setTimeout(r, delay); });
    }
  }
}

async function aiSummarize(systemPrompt, userContent, maxTokens) {
  try {
    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    var r = await withRetry(function() {
      return anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: maxTokens || 1500,
      system: systemPrompt, messages: [{ role: 'user', content: userContent }]
      });
    }, 'Claude');
    return r.content[0].text;
  } catch (e) {
    console.error('[aiSummarize] Claude failed, falling back to GPT-5.4:', e.message);
    var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    var r2 = await openai.chat.completions.create({
      model: 'gpt-5.4', max_completion_tokens: 16000,
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userContent }]
    });
    return (r2.choices[0].message.content || '(summarize failed)') + '\n*GPT-5.4 fallback';
  }
}

async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
  var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY created_at ASC").all();
  if (sleepLogs.length === 0) { console.log('[朝サマリー] 就寝中ログなし'); return; }

  var logText = sleepLogs.map(function(l) { return '[' + l.role_label + '] ' + l.content.substring(0, 500); }).join('\n---\n');
  var summary = await aiSummarize(
    '就寝中の議論サマリーを簡潔に作成してください。重要ポイント・提案・決定事項を箇条書きで。1-2行でまとめること。',
    logText.substring(0, 8000)
  );
  db.prepare('INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)').run(sleepLogs[0].session_id, summary);

  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  var pendingMsg = pending.length > 0 ? '\n\n承認待ち: ' + pending.length + '件' : '';

  await sendLine('おはようございます\n\n' + summary.substring(0, 300) + pendingMsg);
}

// ============================================
// 週次レポート（月曜7時）
// ============================================

async function sendWeeklyReport() {
  console.log('[週次レポート] 生成開始');
  var sessions = db.prepare("SELECT * FROM sessions WHERE created_at > datetime('now', '-7 days') ORDER BY created_at ASC").all();
  var cases = db.prepare("SELECT * FROM case_library WHERE created_at > datetime('now', '-7 days')").all();
  var sleeping = db.prepare("SELECT * FROM active_projects WHERE status = 'sleeping'").all();

  var report = await aiSummarize(
    '週次レポートを1-2行でまとめてください。成果・来週の推奨アクション。',
    'セッション: ' + sessions.length + '件\n承認済み: ' + cases.length + '件\n休眠プロジェクト: ' + sleeping.length + '件'
  );
  db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);

  var sleepMsg = sleeping.length > 0 ? '\n\n休眠中: ' + sleeping.map(function(p) { return p.name; }).join('、') : '';
  await sendLine('週次レポート\n' + report.substring(0, 300) + sleepMsg);
}


// ============================================
// Manual test endpoints
// ============================================

app.post('/api/test/morning', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: 'auth error' });
  try {
    await sendMorningSummary();
    res.json({ success: true, message: 'morning summary executed' });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.post('/api/test/weekly', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: 'auth error' });
  try {
    await sendWeeklyReport();
    res.json({ success: true, message: 'weekly report executed' });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.post('/api/test/sleep', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: 'auth error' });
  try {
    await runSleepMode();
    res.json({ success: true, message: 'sleep mode executed' });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

app.post('/api/test/line-send', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: 'auth error' });
  try {
    var ok = await sendLine(req.body.message || 'LINE test OK');
    res.json({ success: ok });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
});

// ============================================
// Cron Jobs
// ============================================

// 毎晩23時（JST）就寝モード
cron.schedule('0 23 * * *', function() { runSleepMode().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 毎朝7時（JST）朝サマリー
cron.schedule('0 7 * * *', function() { sendMorningSummary().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 毎週月曜7時（JST）週次レポート
cron.schedule('0 7 * * 1', function() { sendWeeklyReport().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 30分ごとに状態自動保存
cron.schedule('*/30 * * * *', function() {
  if (operationMode !== 'aws') return;
  try {
    stateManager.saveState('aws');
    stateManager.pushToGitHub('state: auto-save');
  } catch (e) { console.error('[Auto Save]', e.message); }
});
// v2.0: 毎週月曜 confidence減衰
cron.schedule('0 0 * * 1', function() {
  try {
    db.prepare("UPDATE memory_db SET confidence = MAX(0.0, confidence - decay_rate), updated_at = CURRENT_TIMESTAMP WHERE confidence > 0").run();
    console.log('[Confidence減衰] 完了');
  } catch (e) { console.error('[Confidence減衰]', e.message); }
}, { timezone: 'Asia/Tokyo' });
// v2.0: 日曜23時 競合監視
cron.schedule('0 23 * * 0', async function() {
  try {
    var competitors = db.prepare('SELECT * FROM competitors').all();
    var crypto = require('crypto');
    for (var ci = 0; ci < competitors.length; ci++) {
      var comp = competitors[ci];
      if (!comp.url) continue;
      try {
        var body = await new Promise(function(resolve) {
          https.get(comp.url, function(res) {
            var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(b); });
          }).on('error', function() { resolve(''); });
        });
        var hash = crypto.createHash('md5').update(body).digest('hex');
        if (comp.last_hash && comp.last_hash !== hash) {
          db.prepare('INSERT INTO competitor_changes (competitor_id, change_type, details) VALUES (?,?,?)').run(comp.id, 'content_change', 'ハッシュ変更: ' + comp.last_hash.substring(0,8) + '→' + hash.substring(0,8));
          await sendLine('競合変更検知: ' + comp.name + '\nURL: ' + comp.url);
        }
        db.prepare('UPDATE competitors SET last_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, comp.id);
      } catch (e) { console.error('[競合監視]', comp.name, e.message); }
    }
    console.log('[競合監視] 完了');
  } catch (e) { console.error('[競合監視]', e.message); }
}, { timezone: 'Asia/Tokyo' });
// v2.0: 休眠プロジェクトチェック（毎日）
cron.schedule('0 1 * * *', function() {
  try {
    db.prepare("UPDATE active_projects SET status = 'sleeping' WHERE status = 'active' AND last_operated_at < datetime('now', '-30 days')").run();
  } catch (e) {}
}, { timezone: 'Asia/Tokyo' });

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
// GitHub Webhook
// ============================================

app.post('/api/deploy', function(req, res) {
  var isGithub = req.headers['x-github-event'] === 'push';
  var isAuth = req.headers['x-api-key'] === process.env.API_SECRET;
  if (!isGithub && !isAuth) return res.status(401).json({ error: '認証エラー' });
  res.json({ status: 'deploying' });
  var exec = require('child_process').exec;
  exec('bash /home/ubuntu/kabeuchi-system/deploy.sh', { cwd: '/home/ubuntu/kabeuchi-system' }, function(err, stdout, stderr) {
    if (err) console.error('[Deploy error]', err.message);
    console.log('[Deploy]', stdout);
  });
});

// ============================================
// ヘルスチェック・ダッシュボード
// ============================================

app.get('/health', function(req, res) {
  var sessionCount = db.prepare('SELECT COUNT(*) as cnt FROM sessions').get();
  var caseCount = db.prepare('SELECT COUNT(*) as cnt FROM case_library').get();
  res.json({ status: 'ok', version: V3_ENABLED ? 'v3.1' : 'v2.0', time: new Date().toISOString(), mode: operationMode, sessions: sessionCount.cnt, cases: caseCount.cnt });
});

app.get('/dashboard', function(req, res) {
  var sessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 10").all();
  var projects = db.prepare("SELECT * FROM active_projects WHERE status != 'archived' ORDER BY last_operated_at DESC").all();
  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>前田AIシステム Dashboard</title><style>body{font-family:sans-serif;padding:20px;background:#f5f5f5}h1{color:#333}table{border-collapse:collapse;width:100%;margin:10px 0}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#4a90d9;color:white}.card{background:white;padding:15px;margin:10px 0;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)}</style></head><body>';
  html += '<h1>前田法律事務所 AIシステム</h1>';
  html += '<div class="card"><h2>プロジェクト (' + projects.length + ')</h2><table><tr><th>ID</th><th>名前</th><th>Phase</th><th>状態</th></tr>';
  projects.forEach(function(p) { html += '<tr><td>' + p.id + '</td><td>' + p.name + '</td><td>' + p.current_phase + '</td><td>' + p.status + '</td></tr>'; });
  html += '</table></div>';
  html += '<div class="card"><h2>セッション (' + sessions.length + ')</h2><table><tr><th>ID</th><th>タイトル</th><th>Phase</th><th>Step</th><th>状態</th></tr>';
  sessions.forEach(function(s) { html += '<tr><td>' + s.id + '</td><td>' + s.title + '</td><td>' + s.phase + '</td><td>' + s.current_round + '/8</td><td>' + s.status + '</td></tr>'; });
  html += '</table></div>';
  if (pending.length > 0) {
    html += '<div class="card"><h2>承認待ち (' + pending.length + ')</h2><table><tr><th>ID</th><th>種別</th><th>推奨</th></tr>';
    pending.forEach(function(q) { html += '<tr><td>' + q.id + '</td><td>' + q.output_type + '</td><td>パターン' + q.recommended_pattern + '</td></tr>'; });
    html += '</table></div>';
  }
  html += '<p>モード: ' + operationMode + ' / 更新: ' + new Date().toISOString() + '</p></body></html>';
  res.set("Content-Type", "text/html; charset=UTF-8");
  res.send(html);
});

// ============================================
// 起動
// ============================================


// ============================================
// v3.1: 明示的フェーズ実行API
// ============================================

app.post('/api/v3/phase/:num', async function(req, res) {
  if (!V3_ENABLED || !phaseRunner) return res.status(400).json({ error: 'v3.1モード無効' });
  try {
    var body = req.body;
    var phaseNum = parseInt(req.params.num);
    if (phaseNum < 1 || phaseNum > 6) return res.status(400).json({ error: 'フェーズは1-6' });
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(body.sessionId);
    if (!session) return res.status(404).json({ error: 'セッション未発見' });
    var result = await phaseRunner.run(phaseNum, {
      sessionId: body.sessionId, topic: session.topic, projectId: session.project_id,
      source: body.source || 'api', research: session.research_data,
      previousOutput: body.previousOutput || session.appeal_points || session.target_definition || '',
      outputType: body.outputType || 'general'
    });
    res.json(result);
  } catch (err) { console.error('[v3/phase]', err); res.status(500).json({ error: err.message }); }
});

app.post('/api/v3/approve', function(req, res) {
  if (!V3_ENABLED || !phaseRunner) return res.status(400).json({ error: 'v3.1モード無効' });
  var body = req.body;
  if (!body.sessionId || !body.phase) return res.status(400).json({ error: 'sessionId, phase必須' });
  res.json(phaseRunner.approvePhase(body.sessionId, parseInt(body.phase)));
});

app.get('/api/v3/agent-logs/:sessionId', function(req, res) {
  try { res.json(db.prepare('SELECT * FROM agent_logs WHERE session_id = ? ORDER BY created_at ASC').all(req.params.sessionId)); }
  catch(e) { res.json([]); }
});

app.get('/api/v3/info', function(req, res) {
  var models = V3_ENABLED ? require('./config/models') : {};
  res.json({ version: V3_ENABLED ? 'v3.1' : 'v2.0', v3Enabled: V3_ENABLED, models: models,
    agents: V3_ENABLED ? ['persona','diverge_claude','critique_claude','synthesize_claude','diverge_openai','critique_openai','synthesize_openai','redteam','factcheck','final_synthesizer'] : [],
    phases: V3_ENABLED ? 6 : 3 });
});

app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム v2.0 起動 port:' + PORT); });

process.on('unhandledRejection', function(reason) {
  console.error('[unhandledRejection]', reason);
});
process.on('uncaughtException', function(err) {
  console.error('[uncaughtException]', err.message, err.stack);
  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND') {
    console.log('[Recovery] ネットワークエラー、続行');
  } else if (err.message && (err.message.includes('rate_limit') || err.message.includes('overloaded'))) {
    console.log('[Recovery] API制限エラー、続行');
  }
});
process.on('SIGTERM', function() { db.close(); process.exit(0); });
