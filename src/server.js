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
var path = require("path");
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
require('dotenv').config();
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var cron = require('node-cron');
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
var https = require('https');
var { initDatabase } = require('./db/schema');
var DiscussionEngine = require('./services/discussion-engine');
var PreferenceLearner = require('./services/preference-learner');
var OutputGenerator = require('./services/output-generator');
var LineQA = require('./services/line-qa');
var ListGenerator = require('./services/list-generator');
var AdDesigner = require('./services/ad-designer');
var MediaOptimizer = require('./services/media-optimizer');
var Anthropic = require('@anthropic-ai/sdk');
var crypto = require('crypto');

var fs = require("fs");
var pathMod = require("path");
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

var app = express();
var PORT = process.env.PORT || 3000;
var db = initDatabase(process.env.DB_PATH || './data/kabeuchi.db');
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

// v2.0: lineQAとsendLineFnをエンジンに渡す
var lineQA = null; // 後で初期化
var engine = new DiscussionEngine(db, lineQA, sendLine);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db, lineQA, sendLine);
var stateManager = new StateManager(db);
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
var lineQA = new LineQA(db);
var engine = new DiscussionEngine(db, lineQA, sendLine);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db, lineQA, sendLine);
var listGen = new ListGenerator(db, lineQA, sendLine);
var adDesigner = new AdDesigner(db, lineQA, sendLine);
var mediaOptimizer = new MediaOptimizer(db, lineQA, sendLine);
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

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
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

// 認証（LINE Webhook・health・dashboardは除外）
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
=======
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
>>>>>>> Stashed changes
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
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
=======
// 新規壁打ち開始 or 続行
>>>>>>> Stashed changes
app.post('/api/discussion', async function(req, res) {
  try {
    var body = req.body;
    var sid = body.sessionId;
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
    var projectId = body.projectId || null;
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

    // 新規セッション作成
    if (!sid) {
      if (!body.topic) return res.status(400).json({ error: 'topicは必須' });
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
      sid = engine.createSession(body.title || body.topic, body.topic, projectId);

      // 事前調査実行
      var research = await engine.runResearch(body.topic, projectId);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);

      // 操作ログ記録
      if (projectId) {
        db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(projectId, 'phase1_start', 'テーマ: ' + body.topic, 'api');
      }
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
      sid = engine.createSession(body.title || body.topic, body.topic);

      // フェーズプラン設定
      var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
      var phasePlan = planMap[body.planPattern] || body.phasePlan || '1,2,3,4,5,6';
      var listCount = body.listCount || 100;
      db.prepare('UPDATE sessions SET phase_plan = ?, list_count = ? WHERE id = ?').run(phasePlan, listCount, sid);

      // 事前調査実行
      var research = await engine.runResearch(body.topic);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
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
    }

    // ユーザーコメント保存
    if (body.userComment) {
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sid);
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
      db.prepare('INSERT INTO discussion_logs (session_id, phase, role, role_label, content, round_number, round_theme) VALUES (?,1,?,?,?,?,?)')
        .run(sid, 'user', '前田さん', body.userComment, lr ? lr.mr || 1 : 1, '');
    }

    // 次のラウンド番号を決定
    var lr2 = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sid, 'user');
    var round = (lr2 && lr2.mr ? lr2.mr : 0) + 1;

    if (round > 8) {
      // 全8ステップ完了 → 最終統合
      var summary = await engine.generateFinalSummary(sid);
      // Phase1レポート生成 + LINE通知
      try {
        var report = await engine.generatePhase1Report(sid);
        var reportUrl = generatePhase1ReportHTML(report, sid);
        var reportText = formatPhase1ReportText(report);
        await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
        console.log('[Phase1] レポート送信完了: ' + reportUrl);
      } catch (reportErr) {
        console.error('[Phase1Report] エラー:', reportErr.message);
      }
      // フェーズ自動進行
      advanceToNextPhase(sid, false).catch(function(e) { console.error('[Phase進行エラー]', e.message); });
      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。次フェーズに進む準備ができました。' });
    }

    var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    var result = await engine.runRound(sid, session.topic, round, session.research_data, false);
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
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
=======
// アウトプット生成（設計書→4パターン→批評→推奨）
>>>>>>> Stashed changes
app.post('/api/output/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
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
    var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    res.json(result);
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
    // 即レスポンス（バックグラウンドで生成）
    res.json({ status: 'generating', sessionId: body.sessionId, outputType: body.outputType });
    (async function() {
      try {
        var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(body.sessionId);
        var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', fax:'FAX DM', email:'営業メール'};
        var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
        var htmlFile = generateOutputHTML(result, body.outputType, body.sessionId);
        var title = session ? session.title : '';
        await sendLine('ID:' + body.sessionId + ' ' + title + ' ' + (typeLabels[body.outputType] || body.outputType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);
      } catch(e) {
        console.error('[output API]', e);
        await sendLine('ID:' + body.sessionId + ' ' + (body.outputType || 'output') + '生成エラー。' + e.message);
      }
    })();
    return;
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
  } catch (err) {
    console.error('[output]', err);
    res.status(500).json({ error: err.message });
  }
});

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
app.post('/api/output/design', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var doc = await outputGen.createDesignDoc(body.sessionId, body.outputType, body.params || {});
    res.json({ designDoc: doc });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
=======
// アウトプット承認
>>>>>>> Stashed changes
app.post('/api/output/approve', function(req, res) {
  var body = req.body;
  if (!body.queueId) return res.status(400).json({ error: 'queueId必須' });
  var caseId = outputGen.approveOutput(body.queueId, body.pattern || 'A', body.filePath, body.deployUrl);
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
  if (body.pattern) prefLearner.learnFromPatternChoice(null, body.pattern, body.outputType);
  res.json({ success: true, caseId: caseId });
});

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
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
  res.json({ success: true, caseId: caseId });
});

// アウトプットキュー一覧
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
app.get('/api/output/queue', function(req, res) {
  var status = req.query.status || 'awaiting_approval';
  res.json(db.prepare('SELECT * FROM output_queue WHERE status = ? ORDER BY created_at DESC').all(status));
});

// ============================================
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
// フェーズ遷移マネージャー
// ============================================

function getNextPhase(session) {
  var plan = (session.phase_plan || '1,2,3,4,5,6').split(',').map(Number);
  var idx = plan.indexOf(session.phase);
  return (idx >= 0 && idx < plan.length - 1) ? plan[idx + 1] : null;
}

async function advanceToNextPhase(sessionId, isSleep) {
  // 自動進行禁止: 完了通知だけ出して止まる
  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  if (!session) return;
  var phaseLabels = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};
  var nextPhase = getNextPhase(session);
  if (!nextPhase) {
    await sendLine('ID:' + sessionId + ' ' + session.title + ' 全フェーズ完了しました。');
    db.prepare("UPDATE sessions SET status = 'completed' WHERE id = ?").run(sessionId);
    return;
  }
  // 完了通知のみ（自動で次フェーズに進まない）
  await sendLine('ID:' + sessionId + ' ' + session.title + ' ' + (phaseLabels[session.phase] || 'Phase'+session.phase) + '完了。次に進みますか？\n\n次: Phase' + nextPhase + '(' + (phaseLabels[nextPhase] || '') + ')\n「ID:' + sessionId + ' フェーズ' + nextPhase + '」で開始');
}

// ============================================
// Phase 4: 営業リスト API
// ============================================

app.post('/api/list/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    listGen.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[list/generate]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/list/:sessionId', function(req, res) {
  var entries = db.prepare('SELECT * FROM list_entries WHERE session_id = ? AND status = ? ORDER BY rank ASC, priority_score DESC').all(req.params.sessionId, 'active');
  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  res.json({ salesList: salesList, entries: entries, count: entries.length });
});

app.get('/api/list/:sessionId/excel', function(req, res) {
  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? AND excel_path IS NOT NULL ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  if (!salesList || !salesList.excel_path) return res.status(404).json({ error: 'Excel未生成' });
  var pathMod2 = require('path');
  res.download(salesList.excel_path, pathMod2.basename(salesList.excel_path));
});

app.post('/api/list/sample-check', function(req, res) {
  var body = req.body;
  if (!body.sessionId || !body.feedback) return res.status(400).json({ error: 'sessionId, feedback必須' });
  // pending_questionsのlist_sample_checkを解決
  var pending = db.prepare("SELECT * FROM pending_questions WHERE engine_type = 'list_sample_check' AND status = 'pending' ORDER BY id DESC LIMIT 1").get();
  if (pending) lineQA.resolveAnswer(pending.id, body.feedback);
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
  res.json({ success: true });
});

// ============================================
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
// Phase 5: 広告設計 API
// ============================================

app.post('/api/ad/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    adDesigner.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[ad/generate]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/ad/:sessionId', function(req, res) {
  var adDesign = db.prepare('SELECT * FROM ad_designs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  if (!adDesign) return res.status(404).json({ error: '広告設計未生成' });
  res.json(adDesign);
});

// ============================================
// Phase 6: メディア最適化 API
// ============================================

app.post('/api/media/optimize', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    mediaOptimizer.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[media/optimize]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/media/:sessionId', function(req, res) {
  var opts = db.prepare('SELECT * FROM media_optimizations WHERE session_id = ? ORDER BY id DESC').all(req.params.sessionId);
  res.json(opts);
});

// ============================================
// フェーズプラン管理 API
// ============================================

app.post('/api/session/phase-plan', function(req, res) {
  var body = req.body;
  if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
  var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
  var plan = planMap[body.planPattern] || body.phasePlan;
  if (!plan) return res.status(400).json({ error: 'planPattern or phasePlan必須' });
  db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan, body.sessionId);
  if (body.listCount) db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(body.listCount, body.sessionId);
  res.json({ success: true, phase_plan: plan });
});

app.post('/api/session/phase-advance', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'advancing', sessionId: body.sessionId });
    advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ============================================
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

// ============================================
// Phase1完了レポートHTML生成
// ============================================

function generatePhase1ReportHTML(report, sessionId) {
  var ts = Date.now();
  var fileName = 'phase1_report_' + sessionId + '_' + ts + '.html';
  var outputDir = pathMod.join(__dirname, 'public/outputs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  var sections = [
    { num: '1', icon: '01', title: 'ターゲット', content: report.target || '' },
    { num: '2', icon: '02', title: '市場・競合分析', content: report.market || '' },
    { num: '3', icon: '03', title: 'サービス内容・強み・勝てる理由', content: report.service || '' },
    { num: '4', icon: '04', title: '売上・収支予想', content: report.revenue || '' },
    { num: '5', icon: '05', title: '課題・ネック・懸念点', content: report.challenges || '' },
    { num: '6', icon: '06', title: '議論における論点・仮説・立証根拠', content: report.discussion || '' }
  ];

  var sectionsHTML = sections.map(function(s) {
    var c = (s.content || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Markdown風装飾
    c = c.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    c = c.replace(/^[・-]\s*(.+)$/gm, '<li>$1</li>');
    c = c.replace(/(<li>.*<\/li>\n?)+/g, function(m) { return '<ul>' + m + '</ul>'; });
    c = c.replace(/\n/g, '<br>');
    return '<section class="report-section"><div class="section-header"><span class="section-num">' + s.num + '</span><h2>' + s.title + '</h2></div><div class="section-body">' + c + '</div></section>';
  }).join('');

  var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
  var topicEsc = (report.topic || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  var titleEsc = (report.title || report.topic || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
  html += '<title>Phase1完了レポート - ' + topicEsc + '</title>';
  html += '<style>';
  html += '*{margin:0;padding:0;box-sizing:border-box}';
  html += 'body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;background:#f8f9fa;color:#2c3e50;line-height:1.8}';
  html += '.header{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;padding:32px 20px 28px;text-align:center}';
  html += '.header h1{font-size:14px;font-weight:400;letter-spacing:2px;opacity:0.8;margin-bottom:8px}';
  html += '.header .topic{font-size:22px;font-weight:700;margin-bottom:6px}';
  html += '.header .meta{font-size:12px;opacity:0.6}';
  html += '.container{max-width:780px;margin:0 auto;padding:20px 16px 40px}';
  html += '.report-section{background:#fff;border-radius:12px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);overflow:hidden}';
  html += '.section-header{display:flex;align-items:center;gap:12px;padding:16px 20px 12px;border-bottom:1px solid #eef2f7}';
  html += '.section-num{display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:linear-gradient(135deg,#16213e,#0f3460);color:#fff;border-radius:50%;font-size:14px;font-weight:700;flex-shrink:0}';
  html += '.section-header h2{font-size:16px;color:#1a1a2e;font-weight:700}';
  html += '.section-body{padding:16px 20px 20px;font-size:14px;color:#444}';
  html += '.section-body strong{color:#1a1a2e}';
  html += '.section-body ul{margin:8px 0;padding-left:20px;list-style:none}';
  html += '.section-body li{position:relative;padding-left:16px;margin-bottom:4px}';
  html += '.section-body li:before{content:"";position:absolute;left:0;top:10px;width:6px;height:6px;background:#0f3460;border-radius:50%}';
  html += '.footer{text-align:center;padding:20px;font-size:11px;color:#999;border-top:1px solid #eee;margin-top:20px}';
  html += '@media(max-width:600px){.header{padding:24px 16px 20px}.header .topic{font-size:18px}.section-header h2{font-size:15px}.section-body{padding:14px 16px 16px;font-size:13px}}';
  html += '</style></head><body>';
  html += '<div class="header"><h1>PHASE 1 完了レポート</h1><div class="topic">' + titleEsc + '</div><div class="meta">セッションID: ' + sessionId + ' | ' + now + '</div></div>';
  html += '<div class="container">' + sectionsHTML + '</div>';
  html += '<div class="footer">前田法律事務所 AI壁打ちシステム | Phase1 壁打ち完了 → Phase2 訴求設計へ</div>';
  html += '</body></html>';

  fs.writeFileSync(pathMod.join(outputDir, fileName), html, 'utf8');
  console.log('[Phase1Report] HTML生成: ' + fileName);
  return 'https://176-32-87-118.sslip.io/outputs/' + fileName;
}

// Phase1レポートのLINEテキスト版を生成
function formatPhase1ReportText(report) {
  var msg = '【フェーズ1完了レポート】\n';
  msg += 'テーマ: ' + (report.title || report.topic) + '\n\n';
  msg += '① ターゲット\n→ ' + (report.target || '').substring(0, 300) + '\n\n';
  msg += '② 市場・競合分析\n→ ' + (report.market || '').substring(0, 300) + '\n\n';
  msg += '③ サービス内容・強み・勝てる理由\n→ ' + (report.service || '').substring(0, 300) + '\n\n';
  msg += '④ 売上・収支予想\n→ ' + (report.revenue || '').substring(0, 300) + '\n\n';
  msg += '⑤ 課題・ネック・懸念点\n→ ' + (report.challenges || '').substring(0, 300) + '\n\n';
  msg += '⑥ 議論における論点・仮説・立証根拠\n→ ' + (report.discussion || '').substring(0, 300);
  return msg;
}

// ============================================
// HTML出力生成 + LINE通知
// ============================================

function extractHTMLFromContent(raw) {
  // ```html ... ``` または ```html ... EOF を抽出
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
  // HTML完全性チェック: </html>がない場合は補完
  if (html) {
    if (html.indexOf('</html>') === -1) {
      console.warn('[HTML警告] </html>タグなし - HTMLが途中で切れています。自動補完します。');
      if (html.indexOf('</style>') === -1) {
        html += '\n}\n</style>\n</head>\n<body>\n<div style="text-align:center;padding:60px 20px;font-family:sans-serif;"><h2 style="color:#e53e3e;margin-bottom:16px;">HTML生成が途中で中断されました</h2><p style="color:#666;">再生成してください。</p></div>\n</body>\n</html>';
        console.error('[HTML致命的] CSSの途中で切断。<body>コンテンツなし。再生成が必要です。');
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
}

// 既存アウトプットのURL一覧を返す（LINE「LP見せて」用）
function showExistingOutputs(text, types) {
  var idMatch = text.match(/(?:ID|id)\s*(\d+)/i);
  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料"};
  var query, params;
  if (idMatch) {
    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id WHERE oq.session_id = ? ORDER BY oq.created_at DESC";
    params = [parseInt(idMatch[1])];
  } else {
    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id ORDER BY oq.created_at DESC LIMIT 20";
    params = [];
  }
  var stmt = db.prepare(query);
  var rows = params.length > 0 ? stmt.all(params[0]) : stmt.all();
  if (types && types.length > 0) {
    rows = rows.filter(function(r) { return types.indexOf(r.output_type) >= 0; });
  }
  if (rows.length === 0) {
    sendLine("該当するアウトプットがまだありません。「LP作って」等で生成してください。");
    return "アウトプット未生成";
  }
  var outputDir = pathMod.join(__dirname, "public/outputs");
  var lines = [];
  rows.forEach(function(row) {
    var label = typeLabels[row.output_type] || row.output_type;
    var existingFiles = [];
    try { existingFiles = fs.readdirSync(outputDir).filter(function(f) { return f.indexOf(row.output_type + "_" + row.session_id + "_index_") === 0; }); } catch(e) {}
    var indexFile;
    if (existingFiles.length > 0) {
      indexFile = existingFiles[existingFiles.length - 1];
    } else {
      try {
        var patterns = JSON.parse(row.patterns || "[]");
        var result = { patterns: patterns, critique: row.critique || "", recommended: row.recommended_pattern || "" };
        indexFile = generateOutputHTML(result, row.output_type, row.session_id);
      } catch(e) { console.error("[showOutputs] HTML再生成エラー:", e.message); return; }
    }
    lines.push("ID:" + row.session_id + " " + (row.title || "") + " " + label + "\n\u{1F449} https://176-32-87-118.sslip.io/outputs/" + indexFile);
  });
  var msg = lines.join("\n\n");
  sendLine(msg);
  return msg;
}

function generateOutputHTML(result, outputType, sessionId) {
  var ts = Date.now();
  var outputDir = pathMod.join(__dirname, "public/outputs");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  var patterns = result.patterns || [];
  var critique = result.critique || "";
  var recommended = result.recommended || "";
  var session = db.prepare("SELECT title FROM sessions WHERE id = ?").get(sessionId);
  var title = session ? session.title : "";
  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料", press_release:"プレスリリース"};
  var typeLabel = typeLabels[outputType] || outputType;
  var labels = ["A (PASONA)", "B (ベネフィット直球)", "C (ストーリー)", "D (恐怖訴求)"];
  var patternFiles = [];
  // 各パターンを個別HTMLファイルとして保存
  patterns.forEach(function(p, i) {
    var letter = String.fromCharCode(65 + i);
    var raw = p.content || (typeof p === "string" ? p : JSON.stringify(p));
    var html = extractHTMLFromContent(raw);
    var fileName = outputType + "_" + sessionId + "_" + letter + "_" + ts + ".html";
    fs.writeFileSync(pathMod.join(outputDir, fileName), html, "utf8");
    patternFiles.push({ letter: letter, label: labels[i] || "パターン" + letter, file: fileName, star: recommended === letter });
  });
  // インデックスページ生成
  var indexName = outputType + "_" + sessionId + "_index_" + ts + ".html";
  var now = new Date().toLocaleString("ja-JP", {timeZone:"Asia/Tokyo"});
  var linksHtml = patternFiles.map(function(pf) {
    var star = pf.star ? " ⭐推奨" : "";
    return '<a href="/outputs/' + pf.file + '" class="card' + (pf.star ? ' recommended' : '') + '">' +
      '<span class="label">' + pf.label + star + '</span><span class="arrow">→</span></a>';
  }).join("");
  var indexHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' +
    '<title>' + typeLabel + ' - ID:' + sessionId + ' ' + title + '</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f0f2f5;color:#333;padding:20px;max-width:600px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;text-align:center;margin-bottom:8px}.subtitle{text-align:center;color:#666;font-size:14px;margin-bottom:24px}.card{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:12px;text-decoration:none;color:#333;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:all 0.2s}.card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-2px)}.card.recommended{border:2px solid #ff9800;background:#fff8e1}.label{font-size:16px;font-weight:600}.arrow{font-size:20px;color:#888}.meta{text-align:center;font-size:12px;color:#999;margin-top:24px;padding-top:16px;border-top:1px solid #e0e0e0}</style></head><body>' +
    '<h1>' + typeLabel + '</h1><div class="subtitle">ID:' + sessionId + ' ' + title + '</div>' +
    linksHtml +
    '<div class="meta">前田法律事務所 AIシステム | ' + now + '</div></body></html>';
  fs.writeFileSync(pathMod.join(outputDir, indexName), indexHtml, "utf8");
  console.log("[HTML] 生成完了: " + indexName + " (" + patternFiles.length + "パターン)");
  return indexName;
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
// ============================================
// LINE Webhook
// ============================================

app.post('/api/line/webhook', async function(req, res) {
  res.status(200).send('OK');
  try {
    var events = req.body.events || [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
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
      console.log('[LINE Webhook] イベント受信:', JSON.stringify(ev.type));

      if (ev.type === 'follow') {
        var followUserId = ev.source.userId;
        console.log('[LINE] 友だち追加 ユーザーID: ' + followUserId);
        db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', followUserId, '[友だち追加]');
        if (ev.replyToken) await replyLine(ev.replyToken, '前田法律事務所AIシステムに接続しました。');
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
      console.log('[LINE Webhook] イベント受信:', JSON.stringify(ev.type), 'source:', JSON.stringify(ev.source));

      // followイベント（友だち追加）
      if (ev.type === 'follow') {
        var followUserId = ev.source.userId;
        console.log('==============================');
        console.log('[LINE] 友だち追加 ユーザーID: ' + followUserId);
        console.log('==============================');
        db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', followUserId, '[友だち追加]');
        if (ev.replyToken) await replyLine(ev.replyToken, '前田法律事務所AIシステムに接続しました。\nコマンド: 承認 / 却下 / 状態');
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
        continue;
      }

      if (ev.type !== 'message' || ev.message.type !== 'text') continue;
      var text = ev.message.text;
      var userId = ev.source.userId;

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
      console.log('==============================');
      console.log('[LINE] メッセージ受信 ユーザーID: ' + userId);
      console.log('[LINE] 内容: ' + text);
      console.log('==============================');

      db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', userId, text);

      var reply = await processLineCommand(text, userId);
      if (reply) {
        var sent = false;
        if (ev.replyToken) sent = await replyLine(ev.replyToken, reply);
        if (!sent && userId) await pushLine(userId, reply);
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
        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);
      }
    }
  } catch (err) { console.error('[LINE webhook]', err); }
});

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
// v2.0: LINE コマンド処理（プロジェクトID特定ルール準拠）
async function processLineCommand(text, userId) {
  var t = text.trim();

  // ========== 承認 ==========
  if (t === '承認' || t === 'OK' || t === 'ok') {
    var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (latest) {
      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');
      if (latest.project_id) {
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(latest.project_id, 'approved', latest.title);
      }
      return '承認しました（' + latest.title + '）';
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


// ============================================
// アウトプット指示検出: 「LP作って」「提案書お願い」等
// ============================================
function detectOutputRequest(t) {
  var outputMap = {
    'lp': /LP|ランディング|ＬＰ/i,
    'proposal': /提案書|企画書/,
    'dm': /DM|ダイレクトメール|ＤＭ/i,
    'sales_script': /営業トーク|セールススクリプト|電話スクリプト|テレアポ/,
    'blog': /ブログ|記事/,
    'sns_post': /SNS|インスタ|ツイート/i,
    'banner': /バナー|広告画像/,
    'press_release': /プレスリリース|PR/,
    'newsletter': /ニュースレター|メルマガ/,
    'seo_article': /SEO|検索対策/i,
    'youtube_script': /YouTube|動画|ユーチューブ/i,
    'seminar': /セミナー|ウェビナー/,
    'company_profile': /会社案内|事務所案内/,
    'legal_content': /法律コンテンツ|リーガル/,
    'fax': /FAX|ファックス|ＦＡＸ/i,
    'email': /営業メール|メール文/
  };

  // 「〇〇作って」「〇〇お願い」「〇〇生成」等のパターン
  var actionPattern = /作って|お願い|生成|作成|出力|書いて|頼む|よろしく|ちょうだい/;
  // 「〇〇見せて」「〇〇確認」等の閲覧リクエスト
  var viewPattern = /見せて|見たい|確認して|表示して|見る|開いて|URL|リンク/;
  if (viewPattern.test(t)) {
    var viewTypes = [];
    var typeKeys2 = Object.keys(outputMap);
    for (var vi = 0; vi < typeKeys2.length; vi++) {
      if (outputMap[typeKeys2[vi]].test(t)) viewTypes.push(typeKeys2[vi]);
    }
    if (viewTypes.length > 0) {
      return showExistingOutputs(t, viewTypes);
    }
  }

  if (!actionPattern.test(t)) return null;

  var detectedTypes = [];
  var typeKeys = Object.keys(outputMap);
  for (var i = 0; i < typeKeys.length; i++) {
    if (outputMap[typeKeys[i]].test(t)) {
      detectedTypes.push(typeKeys[i]);
    }
  }
  if (detectedTypes.length === 0) return null;
  var detectedType = detectedTypes[0]; // メインの1つ（後で複数対応）

  // セッション特定（ID指定を最優先）
  var idMatch = t.match(/(?:ID|id|ＩＤ)\s*(\d+)/i);
  var session = null;
  if (idMatch) {
    session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(parseInt(idMatch[1]));
  }
  if (!session) {
    // ID指定なし→進行中プロジェクトが複数あれば確認
    var activeSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC").all();
    if (activeSessions.length === 0) return null;
    if (activeSessions.length >= 2) {
      // 複数プロジェクト→キーワードマッチ試行
      var tLower2 = t.replace(/[\s　]/g, '').toLowerCase();
      for (var j = 0; j < activeSessions.length; j++) {
        var kws = activeSessions[j].title.split(/[\s　・×\/]/g).filter(function(w) { return w.length >= 2; });
        for (var kk = 0; kk < kws.length; kk++) {
          if (tLower2.indexOf(kws[kk].toLowerCase()) >= 0) { session = activeSessions[j]; break; }
        }
        if (session) break;
      }
      if (!session) {
        // キーワードでも特定できない→確認要求
        var sessionList = activeSessions.map(function(ss) { return 'ID:' + ss.id + ' ' + ss.title; }).join('\n');
        sendLine('どのプロジェクトの' + (typeLabels[detectedType] || detectedType) + 'を生成しますか？\n\n' + sessionList + '\n\n「ID:〇〇 ' + (typeLabels[detectedType] || detectedType) + '作って」で指定してください。');
        return '複数プロジェクト進行中のため確認しました。IDを指定してください。';
      }
    } else {
      session = activeSessions[0];
    }
  }
  if (!session) return null;

  var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', press_release:'プレスリリース', newsletter:'ニュースレター', seo_article:'SEO記事', youtube_script:'YouTube台本', seminar:'セミナー資料', company_profile:'会社案内', legal_content:'法律コンテンツ', fax:'FAX DM', email:'営業メール'};

  // 非同期でアウトプット生成（複数type対応）
  var allTypes = detectedTypes.slice();
  (async function() {
    for (var ti = 0; ti < allTypes.length; ti++) {
      try {
        var thisType = allTypes[ti];
        var result = await outputGen.generateFull(session.id, thisType, {});
        var htmlFile = generateOutputHTML(result, thisType, session.id);
        await sendLine('ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[thisType] || thisType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);
      } catch(e) {
        console.error('[output ' + allTypes[ti] + ']', e);
        await sendLine('ID:' + session.id + ' ' + (typeLabels[allTypes[ti]] || allTypes[ti]) + '生成エラー。' + e.message);
      }
    }
  })();

  var typeNames = allTypes.map(function(tt) { return typeLabels[tt] || tt; }).join('・');
  return 'ID:' + session.id + ' ' + session.title + ' ' + typeNames + '生成開始します。';
}

// ============================================
// スマート指示解釈: 短い指示から意図を推測して即実行
// ============================================
function resolveSmartInstruction(t) {
  var allSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep','completed') ORDER BY updated_at DESC LIMIT 20").all();
  if (allSessions.length === 0) return null;

  // ID指定: 「ID3」「ID3続けて」「ID3 フェーズ2へ」
  var idMatch = t.match(/(?:ID|id|ＩＤ)\s*(\d+)/i);
  var targetSession = null;
  var remainingText = t;

  if (idMatch) {
    var sid = parseInt(idMatch[1]);
    targetSession = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    remainingText = t.replace(idMatch[0], '').trim();
  }

  // プロジェクト名キーワードでマッチ（ID指定を最優先）
  if (!targetSession) {
    var tLower = t.replace(/[\s　]/g, '').toLowerCase();
    // 明示的キーワードマッピング（直前プロジェクトに引っ張られない）
    var bestMatch = null;
    var bestScore = 0;
    for (var i = 0; i < allSessions.length; i++) {
      var s = allSessions[i];
      var score = 0;
      // タイトルの主要キーワード（2文字以上）
      var keywords = s.title.split(/[\s　・×\/]/g).filter(function(w) { return w.length >= 2; });
      // トピックからもキーワード抽出
      if (s.topic) {
        var topicKw = s.topic.split(/[\s　・×\/、。]/g).filter(function(w) { return w.length >= 2; });
        keywords = keywords.concat(topicKw);
      }
      for (var k = 0; k < keywords.length; k++) {
        if (tLower.indexOf(keywords[k].toLowerCase()) >= 0) {
          score += keywords[k].length; // 長いキーワード一致ほど高スコア
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = s;
      }
    }
    if (bestMatch && bestScore >= 2) {
      targetSession = bestMatch;
    }
  }

  // フェーズ指示を検出
  var phaseMatch = t.match(/フェーズ\s*(\d+)|phase\s*(\d+)/i);
  var phaseNum = phaseMatch ? parseInt(phaseMatch[1] || phaseMatch[2]) : null;

  // 「続けて」「続き」「再開」
  var isContinue = /続けて|続き|再開|進めて|やって|開始|始めて|スタート/.test(t);
  // 「〜へ」「〜に進む」
  var isAdvance = /へ$|に進む|に進めて|に移行|開始して/.test(t);

  // セッション特定なし → null（通常フロー）
  if (!targetSession && !phaseNum && !isContinue) return null;

  // セッションが特定できない場合は直近を使用（ただしフェーズ指示がある場合のみ）
  if (!targetSession && (phaseNum || isContinue)) {
    targetSession = allSessions[0]; // 直近更新のセッション
  }

  // フェーズ指示 + セッション特定 → 即実行
  if (phaseNum && targetSession) {
    return executePhaseAction(targetSession, phaseNum, isAdvance, isContinue);
  }

  // セッション特定 + 続行指示
  if (targetSession && isContinue) {
    return executePhaseAction(targetSession, targetSession.phase, false, true);
  }

  // セッション特定のみ（フェーズ指示なし）→ 現在フェーズを続行と解釈
  if (targetSession && idMatch) {
    return executePhaseAction(targetSession, targetSession.phase, false, true);
  }

  return null; // 通常フローへ
}

function executePhaseAction(session, phaseNum, isAdvance, isContinue) {
  var phaseLabelsExec = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};
  var prefix = '「' + session.title + '」Phase' + phaseNum + '(' + (phaseLabelsExec[phaseNum] || '') + ') ';

  // 現在フェーズと異なる場合 → フェーズ変更して実行
  if (session.phase !== phaseNum && isAdvance) {
    db.prepare('UPDATE sessions SET phase = ?, current_round = 0, status = ? WHERE id = ?').run(phaseNum, 'active', session.id);
    prefix = '「' + session.title + '」をPhase' + phaseNum + 'に進めて' + (phaseLabelsExec[phaseNum] || '') + 'を ';
  }

  // セッション状態をactiveに
  db.prepare("UPDATE sessions SET status = 'active', updated_at = datetime('now') WHERE id = ?").run(session.id);

  global._lastSmartInterpretation = { sessionId: session.id, phase: phaseNum };

  switch (phaseNum) {
    case 1:
      // Phase1壁打ち続行
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(session.id, 'user');
      var nextRound = (lr && lr.mr ? lr.mr : 0) + 1;
      if (nextRound > 8) {
        return prefix + '全8ステップ完了済みです。「フェーズ2へ」で次フェーズに進めます。';
      }
      // 非同期で壁打ち実行
      (async function() {
        try {
          for (var r = nextRound; r <= 8; r++) {
            await engine.runStep(session.id, session.topic, r, session.research_data, false);
            if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');
          }
          var summary = await engine.generateFinalSummary(session.id);
          try {
            var report = await engine.generatePhase1Report(session.id);
            var reportUrl = generatePhase1ReportHTML(report, session.id);
            var reportText = formatPhase1ReportText(report);
            await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
          } catch(e) { console.error('[Phase1Report]', e.message); }
          advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
        } catch(err) {
          console.error('[Smart Phase1]', err.message);
          await sendLine('Phase1エラー: ' + err.message);
        }
      })();
      return 'ID:' + session.id + ' ' + session.title + ' Phase1(壁打ち) 開始します（Step' + nextRound + '/8から）';

    case 2:
    case 3:
      return 'ID:' + session.id + ' ' + session.title + ' Phase' + phaseNum + ' LINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';

    case 4:
      listGen.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase4]', e); sendLine('Phase4エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase4(営業リスト作成) 開始します。';

    case 5:
      adDesigner.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase5]', e); sendLine('Phase5エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase5(広告配信設計) 開始します。';

    case 6:
      mediaOptimizer.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase6]', e); sendLine('Phase6エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase6(メディア最適化) 開始します。';

    default:
      return prefix + 'は不明なフェーズです。';
  }
}

async function processLineCommand(text, userId) {
  var t = text.trim();

  // =======================================
  // スマート指示解釈（短い指示でも即実行）
  // =======================================
  var smartResult = resolveSmartInstruction(t);
  if (smartResult) return smartResult;

  // 「違う」で直前の解釈を修正
  if (t === '違う' || t.startsWith('違う。') || t.startsWith('違う、') || t === 'ちがう') {
    global._lastSmartInterpretation = null;
    return '了解しました。改めてご指示ください。\n例: 「ID3 フェーズ2へ」「残業代でフェーズ1」「交通事故 LP作って」';
  }

  // 承認
  if (t === '承認' || t === 'OK' || t === 'ok') {
    // まず承認待ちアウトプットがあるか確認
    var awaitingOutput = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1").get();
    if (awaitingOutput) {
      var recPat = awaitingOutput.recommended_pattern || 'A';
      var caseId = outputGen.approveOutput(awaitingOutput.id, recPat);
      return 'パターン' + recPat + '（推奨）を採用しました。case_library ID: ' + caseId;
    }
    // 保留中の質問があれば回答として処理
    var pendingQ = lineQA.getPendingQuestion();
    if (pendingQ) {
      lineQA.resolveAnswer(pendingQ.id, t);
      return '承認を受け付けました。処理を再開します。';
    }
    var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();
    if (latest) {
      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');
      return '承認しました（セッション: ' + latest.title + '）';
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
    }
    return 'アクティブなセッションがありません';
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ========== 却下 ==========
  if (t.startsWith('却下') || t.startsWith('NG')) {
    var comment = t.replace(/^(却下|NG)\s*/, '');
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (latest2) {
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(latest2.id, 'rejected', comment || null);
      return '却下しました' + (comment ? '（' + comment + '）' : '');
    }
    return 'アクティブなセッションがありません';
  }
<<<<<<< Updated upstream

  // ========== 新規プロジェクト ==========
  if (t.startsWith('新規 ') || t.startsWith('新規　')) {
    var themeName = t.replace(/^新規[\s　]+/, '').trim();
    if (!themeName) return 'テーマ名を指定してください（例：新規 交通事故LP）';
    var keyword = themeName.split(/[（(]/)[0].trim();
    var proj = db.prepare('INSERT INTO active_projects (name, keyword, current_phase, status) VALUES (?,?,1,?)').run(themeName, keyword, 'active');
    var projId = proj.lastInsertRowid;
    db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(projId, 'create', themeName);
    return 'プロジェクト作成完了\nID:' + projId + ' ' + themeName + '\n\n「ID' + projId + ' フェーズ1開始」で壁打ち開始';
  }

  // ========== ID指定コマンド ==========
  var idMatch = t.match(/^ID\s*[:：]?\s*(\d+)\s+(.+)/i);
  if (!idMatch) {
    // キーワードでプロジェクト特定を試みる
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

    // フェーズ開始
    if (/フェーズ\s*(\d+)\s*(開始|スタート)/i.test(cmd)) {
      var phaseNum = parseInt(cmd.match(/(\d+)/)[1]);
      db.prepare('UPDATE active_projects SET current_phase = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(phaseNum, targetId);
      db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'phase' + phaseNum + '_start', proj2.name);

      // v2.1: Phase4-6は自動実行開始
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

      return proj2.name + ' Phase' + phaseNum + ' 開始準備完了';
    }

    // 状況確認
    if (/状況|進捗|ステータス/.test(cmd)) {
      var sess = proj2.current_session_id ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(proj2.current_session_id) : null;
      var msg = proj2.name + '\nPhase' + (proj2.current_phase || '?');
      if (sess) msg += ' Step' + (sess.current_round || 0) + '/8 (' + sess.status + ')';
      return msg;
    }

    // FB（フィードバック）
    if (cmd.startsWith('FB ') || cmd.startsWith('FB　')) {
      var fb = cmd.replace(/^FB[\s　]+/, '').trim();
      prefLearner.addPreference('feedback', 'project_' + targetId, fb, null, 'line');
      db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(targetId, 'feedback', fb, 'line');
      return 'FB保存しました（' + proj2.name + '）';
    }

    // 履歴
    if (/履歴/.test(cmd)) {
      var logs = db.prepare('SELECT * FROM operation_logs WHERE project_id = ? ORDER BY created_at DESC LIMIT 10').all(targetId);
      if (logs.length === 0) return proj2.name + 'の操作履歴なし';
      return proj2.name + ' 直近履歴\n' + logs.map(function(l) { return l.action + ': ' + (l.details || '').substring(0, 30); }).join('\n');
    }

    // アーカイブ
    if (/アーカイブ/.test(cmd)) {
      return proj2.name + ' をアーカイブしますか？「はい」で確定';
    }

    return proj2.name + ': コマンド「' + cmd + '」を認識できませんでした';
  }

  // ========== IDnまとめ ==========
  var summaryMatch = t.match(/^ID\s*[:：]?\s*(\d+)\s*まとめ/i);
  if (summaryMatch) {
    var sId = parseInt(summaryMatch[1]);
    var sProj = db.prepare('SELECT * FROM active_projects WHERE id = ?').get(sId);
    if (!sProj) return 'プロジェクトID:' + sId + ' が見つかりません';
    var sLogs = db.prepare('SELECT round_number, role, content FROM discussion_logs WHERE session_id = ? ORDER BY round_number ASC').all(sProj.current_session_id || 0);
    if (sLogs.length === 0) return sProj.name + ': ディスカッションログなし';
    var summary = sProj.name + ' まとめ\n';
    sLogs.forEach(function(l) {
      summary += 'Step' + l.round_number + '(' + l.role + '): ' + (l.content || '').substring(0, 80) + '\n';
    });
    var chunks = [];
    for (var ci = 0; ci < summary.length; ci += 300) chunks.push(summary.substring(ci, ci + 300));
    for (var cj = 1; cj < chunks.length; cj++) await sendLine(chunks[cj]);
    return chunks[0];
  }

  // ========== 全部まとめ（詳細版） ==========
  if (/^全部まとめ/.test(t)) {
    var allP = db.prepare("SELECT * FROM active_projects WHERE status IN ('active','sleeping') ORDER BY id").all();
    if (allP.length === 0) return '進行中プロジェクトなし';
    var allSummary = '全プロジェクトまとめ\n';
    allP.forEach(function(p) {
      allSummary += '\nID:' + p.id + ' ' + p.name + ' Phase' + p.current_phase + '\n';
      if (p.current_session_id) {
        var lastLog = db.prepare('SELECT content FROM discussion_logs WHERE session_id = ? ORDER BY round_number DESC LIMIT 1').get(p.current_session_id);
        if (lastLog) allSummary += '最新: ' + (lastLog.content || '').substring(0, 100) + '\n';
      }
    });
    var aChunks = [];
    for (var ai = 0; ai < allSummary.length; ai += 300) aChunks.push(allSummary.substring(ai, ai + 300));
    for (var aj = 1; aj < aChunks.length; aj++) await sendLine(aChunks[aj]);
    return aChunks[0];
  }

  // ========== フェーズ構成見せて ==========
  if (/フェーズ構成|Phase構成|フェーズ(一覧|説明)/.test(t)) {
    return 'フェーズ構成:\nPhase1: 壁打ち（8ステップ、3AI並列議論）\nPhase2: 訴求設計（6ステップ）\nPhase3: コンテンツ生成（7ステップ、4パターン）\nPhase4: リスト生成\nPhase5: 広告デザイン\nPhase6: メディア最適化\n\n例: ID1 フェーズ1開始';
  }

  // ========== API状態 ==========
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

  // ========== 状態確認（全プロジェクト） ==========
  if (/^(状態|ステータス|いまの状況|全部まとめ|状況教えて)/.test(t) || /教えて|は[？?]$|どう(いう|なって)|進捗|動いてる|何してる|どうなった|報告/.test(t)) {
    var allProjects = db.prepare("SELECT * FROM active_projects WHERE status IN ('active','sleeping') ORDER BY last_operated_at DESC").all();
    var pendingOQ = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
    if (allProjects.length === 0 && pendingOQ.length === 0) {
      return '進行中プロジェクトなし';
    }
    var statusMsg = '';
    allProjects.forEach(function(p) {
      statusMsg += 'ID:' + p.id + ' ' + p.name + ' (Phase' + p.current_phase + ' ' + p.status + ')\n';
    });
    if (pendingOQ.length > 0) {
      statusMsg += '\n承認待ち: ' + pendingOQ.length + '件';
    }
    return statusMsg.trim();
  }

  // ========== モード切替 ==========
  if (t === 'PCモード' || t === 'pcモード' || t === 'PC' || t === 'ローカル') {
    try {
      var result = stateManager.switchToPC();
      operationMode = 'local';
      try { require('child_process').execSync('sudo systemctl stop claude-code-daemon', { timeout: 10000 }); } catch (e) {}
      return 'PCモード切替完了';
    } catch (e) { return 'PCモード切替エラー: ' + e.message; }
  }

  if (t === 'AWSモード' || t === 'awsモード' || t === 'AWS') {
    try {
      var state = stateManager.switchToAWS();
      operationMode = 'aws';
      try { require('child_process').execSync('sudo systemctl start claude-code-daemon', { timeout: 10000 }); } catch (e) {}
      return 'AWSモード切替完了';
    } catch (e) { return 'AWSモード切替エラー: ' + e.message; }
  }

  if (t === 'モード確認' || t === 'モード' || t === 'mode' || t === 'CC状態' || t === 'Claude状態') {
    return operationMode === 'aws' ? 'AWSモード稼働中' : 'PCモード';
  }

  // ========== Claude Code コマンド ==========
=======
  // 状態確認
  if (t === '状態' || t === 'ステータス') {
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 3").all();
    if (sessions.length === 0) return 'アクティブなセッションなし';
    return sessions.map(function(s) {
      return '[' + s.id + '] ' + s.title + ' (R' + s.current_round + '/' + s.total_rounds + ')';
    }).join('\n');
  }
  // Claude Code コマンド（コード修正・実装・デプロイ）
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var ccPrefixes = ['コード', '修正', '実装', '追加', 'バグ', 'デプロイ', 'claude'];
  var isCodeCmd = ccPrefixes.some(function(p) { return t.startsWith(p); });
  if (isCodeCmd) {
    try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      var ccData = JSON.stringify({ instruction: t, autoRestart: true });
=======
      var instruction = t;
      var ccData = JSON.stringify({ instruction: instruction, autoRestart: true });
>>>>>>> Stashed changes
=======
      var instruction = t;
      var ccData = JSON.stringify({ instruction: instruction, autoRestart: true });
>>>>>>> Stashed changes
      var ccResult = await new Promise(function(resolve) {
        var ccReq = http.request({
          hostname: '127.0.0.1', port: 3001, path: '/task', method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.API_SECRET, 'Content-Length': Buffer.byteLength(ccData) }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        }, function(res2) {
          var b = ''; res2.on('data', function(c) { b += c; }); res2.on('end', function() { resolve(JSON.parse(b)); });
=======
        }, function(res) {
          var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(JSON.parse(b)); });
>>>>>>> Stashed changes
=======
        }, function(res) {
          var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(JSON.parse(b)); });
>>>>>>> Stashed changes
        });
        ccReq.on('error', function(e) { resolve({ error: e.message }); });
        ccReq.write(ccData); ccReq.end();
      });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      if (ccResult.error) return 'CC接続エラー: ' + ccResult.error;
      return 'タスク投入完了 ID:' + ccResult.taskId;
    } catch (e) { return 'CC呼出エラー: ' + e.message; }
  }

  // ========== 明示的メモ保存 ==========
  var memoPatterns = [/メモ(して|しといて|保存)/, /覚えて/, /覚えておいて/, /記録して/];
  var isMemoRequest = memoPatterns.some(function(p) { return p.test(t); });
  if (isMemoRequest) {
    var memoText = t.replace(/メモして|メモしといて|メモ保存|覚えて|覚えておいて|記録して/g, '').trim();
    if (!memoText) memoText = t;
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(memoText);
    return 'メモ保存: ' + memoText.substring(0, 30);
  }

  // ========== 学習内容表示 ==========
  if (/学習内容|フィードバック一覧|FB一覧/.test(t)) {
    var memories = db.prepare('SELECT category, key, value, confidence FROM memory_db ORDER BY confidence DESC LIMIT 15').all();
    if (memories.length === 0) return '学習データなし';
    return '学習内容（上位15件）\n' + memories.map(function(m) { return m.category + '/' + m.key + ': ' + m.value.substring(0, 30) + ' (' + m.confidence.toFixed(2) + ')'; }).join('\n');
  }

  // ========== プロジェクトIDが特定できない場合 ==========
  var activeProjects = db.prepare("SELECT * FROM active_projects WHERE status = 'active'").all();
  if (activeProjects.length > 0) {
    return 'どのプロジェクトですか？\n' + activeProjects.map(function(p) { return 'ID:' + p.id + ' ' + p.name; }).join('\n') + '\n\n例: ID' + activeProjects[0].id + ' 状況';
  }

  return '使えるコマンド:\n・新規 [テーマ]\n・承認 / 却下\n・状態\n・PCモード / AWSモード';
=======
=======
>>>>>>> Stashed changes
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

  // 音声メモとして保存
  db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(t);
  return 'メモ保存しました: 「' + t.substring(0, 30) + '...」';
>>>>>>> Stashed changes
}

// ============================================
// LINE送信関数
// ============================================

=======
=======
>>>>>>> Stashed changes
=======
    }
    return 'アクティブなセッションがありません';
  }

>>>>>>> Stashed changes
=======
    }
    return 'アクティブなセッションがありません';
  }

>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
    }
    return 'アクティブなセッションがありません';
  }

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
    }
    return 'アクティブなセッションがありません';
  }

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
    }
    return 'アクティブなセッションがありません';
  }

<<<<<<< Updated upstream
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
  // 却下
  if (t.startsWith('却下') || t.startsWith('NG')) {
    var comment = t.replace(/^(却下|NG)\s*/, '');
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();
    if (latest2) {
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(latest2.id, 'rejected', comment || null);
      return '却下しました' + (comment ? '（理由: ' + comment + '）' : '');
    }
    return 'アクティブなセッションがありません';
  }

  // プロジェクト一覧（Feature 1）
  if (t === '一覧' || t === 'リスト' || t === 'プロジェクト') {
    var all = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY priority ASC, updated_at DESC").all();
    if (all.length === 0) return 'アクティブなプロジェクトなし';
    return 'プロジェクト一覧\n\n' + all.map(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      var dl = s.deadline ? ' 〆' + s.deadline : '';
      return star + s.title + ' → Phase' + s.phase + ' Step' + s.current_round + ' (' + s.status + ')' + dl;
    }).join('\n');
  }

  // 状態確認（優先度付き）
  if (t === '状態' || t === 'ステータス') {
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 5").all();
    if (sessions.length === 0) return 'アクティブなセッションなし';
    return sessions.map(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      return star + '[' + s.id + '] ' + s.title + ' (Phase' + s.phase + ' Step' + s.current_round + ')';
    }).join('\n');
  }

  // 優先度設定（Feature 3）: 「優先 セッションID 優先度」
  var priMatch = t.match(/^優先\s+(\d+)\s+(\d+)$/);
  if (priMatch) {
    var priSid = parseInt(priMatch[1]);
    var priVal = parseInt(priMatch[2]);
    db.prepare('UPDATE sessions SET priority = ? WHERE id = ?').run(priVal, priSid);
    return 'セッション' + priSid + 'の優先度を' + priVal + 'に設定しました';
  }

  // 最優先設定（Feature 3）: 「〇〇を最優先」
  var topPriMatch = t.match(/(.+)(を最優先|を優先|最優先にして)/);
  if (topPriMatch) {
    var keyword = topPriMatch[1].trim();
    var found = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = 'active' LIMIT 1").get('%' + keyword + '%');
    if (found) {
      db.prepare('UPDATE sessions SET priority = 1 WHERE id = ?').run(found.id);
      return '「' + found.title + '」を最優先(1)に設定しました';
    }
    return '「' + keyword + '」に該当するセッションが見つかりません';
  }

  // 締め切り設定（Feature 3）: 「〇〇は来週」「〇〇は急がない」
  var deadlineMatch = t.match(/(.+)(は来週|は今月中|は急がない)/);
  if (deadlineMatch) {
    var dKeyword = deadlineMatch[1].trim();
    var dFound = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = 'active' LIMIT 1").get('%' + dKeyword + '%');
    if (dFound) {
      if (t.indexOf('来週') >= 0) {
        var nextWeek = new Date(Date.now() + 7 * 86400000);
        var dl = nextWeek.toISOString().split('T')[0];
        db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(dl, dFound.id);
        return '「' + dFound.title + '」の期限を' + dl + 'に設定しました';
      } else if (t.indexOf('今月中') >= 0) {
        var now = new Date();
        var eom = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(eom, dFound.id);
        return '「' + dFound.title + '」の期限を' + eom + 'に設定しました';
      } else if (t.indexOf('急がない') >= 0) {
        db.prepare('UPDATE sessions SET priority = 8 WHERE id = ?').run(dFound.id);
        return '「' + dFound.title + '」の優先度を下げました(8)';
      }
    }
  }

  // フェーズ承認（Feature 2）: 「フェーズ1承認」
  var phaseApproveMatch = t.match(/フェーズ(\d+)(承認|OK|進めて)/i);
  if (phaseApproveMatch) {
    var paSidMatch = t.match(/セッション(\d+)/);
    var paSid = paSidMatch ? parseInt(paSidMatch[1]) : null;
    var paPhase = parseInt(phaseApproveMatch[1]);
    var paSession = paSid
      ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(paSid)
      : db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (paSession) {
      var nextPhase = paPhase + 1;
      db.prepare('UPDATE sessions SET phase = ?, current_round = 0 WHERE id = ?').run(nextPhase, paSession.id);
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(paSession.id, 'approved', 'Phase' + paPhase + '承認→Phase' + nextPhase + '開始');
      return '「' + paSession.title + '」Phase' + paPhase + '承認。Phase' + nextPhase + 'に進みます。';
    }
    return 'セッションが見つかりません';
  }

  // ステップやり直し（Feature 2）: 「ステップ3やり直し」
  var stepRedoMatch = t.match(/ステップ(\d+)(やり直し|再実行|リトライ)/);
  if (stepRedoMatch) {
    var srSidMatch = t.match(/セッション(\d+)/);
    var srSid = srSidMatch ? parseInt(srSidMatch[1]) : null;
    var srStep = parseInt(stepRedoMatch[1]);
    var srSession = srSid
      ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(srSid)
      : db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (srSession) {
      engine.clearStep(srSession.id, srStep);
      return '「' + srSession.title + '」のStep' + srStep + 'をクリアしました。再実行します。';
    }
    return 'セッションが見つかりません';
  }

  // パターン採用（Feature 2）: 「パターンA採用」
  var patternMatch = t.match(/パターン([A-Da-d])(採用|承認|で決定|にして)/);
  if (patternMatch) {
    var pat = patternMatch[1].toUpperCase();
    var latestQueue = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1").get();
    if (latestQueue) {
      var caseId = outputGen.approveOutput(latestQueue.id, pat);
      return 'パターン' + pat + 'を採用しました（case_library ID: ' + caseId + '）';
    }
    return '承認待ちのアウトプットがありません';
  }

  // 競合追加（Feature 7）: 「競合追加 URL」
  var compMatch = t.match(/^競合追加\s+(.+)/);
  if (compMatch) {
    var compUrl = compMatch[1].trim();
    var compName = compUrl.replace(/https?:\/\//, '').split('/')[0];
    db.prepare('INSERT INTO competitors (name, url) VALUES (?,?)').run(compName, compUrl);
    return '競合「' + compName + '」を登録しました。週次で自動チェックします。';
  }

  // 保留中の質問があれば回答として処理
  var pending = lineQA.getPendingQuestion();
  if (pending) {
    lineQA.resolveAnswer(pending.id, t);
    return '回答受付しました。処理を再開します。\n\nQ: ' + pending.question.substring(0, 80) + '\nA: ' + t;
  }

  // Phase 4/5/6 コマンド
  if (t === 'フェーズ4' || t === 'リスト作成' || t === '営業リスト') {
    var ls = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ls) {
      listGen.generateFull(ls.id, false).then(function() {
        advanceToNextPhase(ls.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase4]', e); sendLine('Phase4エラー: ' + e.message); });
      return 'ID:' + ls.id + ' ' + ls.title + ' Phase4(営業リスト作成) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  if (t === 'フェーズ5' || t === '広告設計') {
    var as = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (as) {
      adDesigner.generateFull(as.id, false).then(function() {
        advanceToNextPhase(as.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase5]', e); sendLine('Phase5エラー: ' + e.message); });
      return 'ID:' + as.id + ' ' + as.title + ' Phase5(広告配信設計) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  if (t === 'フェーズ6' || t === 'メディア最適化') {
    var ms = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ms) {
      mediaOptimizer.generateFull(ms.id, false).then(function() {
        advanceToNextPhase(ms.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase6]', e); sendLine('Phase6エラー: ' + e.message); });
      return 'ID:' + ms.id + ' ' + ms.title + ' Phase6(メディア最適化) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  // フェーズスキップ
  var skipMatch = t.match(/フェーズ(\d+)スキップ/);
  if (skipMatch) {
    var skipPhase = parseInt(skipMatch[1]);
    var ss = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ss) {
      var plan = (ss.phase_plan || '1,2,3,4,5,6').split(',').map(Number).filter(function(p) { return p !== skipPhase; });
      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan.join(','), ss.id);
      return 'Phase' + skipPhase + 'をスキップしました。現在のプラン: ' + plan.join('→');
    }
    return 'アクティブなセッションがありません';
  }

  // フェーズ追加（やっぱりリストも）
  if (t.indexOf('やっぱりリスト') >= 0 || t.indexOf('やっぱり広告') >= 0 || t.indexOf('やっぱりメディア') >= 0) {
    var addPhase = t.indexOf('リスト') >= 0 ? 4 : t.indexOf('広告') >= 0 ? 5 : 6;
    var as2 = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (as2) {
      var plan2 = (as2.phase_plan || '1,2,3,4,5,6').split(',').map(Number);
      if (plan2.indexOf(addPhase) === -1) {
        plan2.push(addPhase);
        plan2.sort(function(a,b) { return a - b; });
        db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan2.join(','), as2.id);
        return 'Phase' + addPhase + 'を追加しました。プラン: ' + plan2.join('→');
      }
      return 'Phase' + addPhase + 'は既にプランに含まれています';
    }
    return 'アクティブなセッションがありません';
  }

  // リスト確認
  var listCheckMatch = t.match(/リスト確認\s*(\d+)/);
  if (listCheckMatch || t === 'リスト確認') {
    var lcSid = listCheckMatch ? parseInt(listCheckMatch[1]) : null;
    var lcSession = lcSid ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(lcSid) : db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (lcSession) {
      var aCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'A' AND status = 'active'").get(lcSession.id);
      var bCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'B' AND status = 'active'").get(lcSession.id);
      var cCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'C' AND status = 'active'").get(lcSession.id);
      return 'リスト状況 (' + lcSession.title + ')\nAランク: ' + aCount.cnt + '件\nBランク: ' + bCount.cnt + '件\nCランク: ' + cCount.cnt + '件\n合計: ' + (aCount.cnt + bCount.cnt + cCount.cnt) + '件';
    }
    return 'セッションが見つかりません';
  }

  // 次のフェーズへ
  if (t === '次のフェーズへ' || t === '次フェーズ' || t === '進む') {
    var ns = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ns) {
      advanceToNextPhase(ns.id, false).catch(function(e) { console.error(e); });
      return '次のフェーズへ進行します。';
    }
    return 'アクティブなセッションがありません';
  }

  // このフェーズで完了
  if (t === 'このフェーズで完了' || t === '完了') {
    var cs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (cs) {
      db.prepare("UPDATE sessions SET status = 'completed' WHERE id = ?").run(cs.id);
      return 'セッション「' + cs.title + '」を完了しました。';
    }
    return 'アクティブなセッションがありません';
  }

  // リスト件数変更
  var listCountMatch = t.match(/リスト\s*(\d+)件/);
  if (listCountMatch) {
    var newCount = parseInt(listCountMatch[1]);
    var lcs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (lcs) {
      db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(newCount, lcs.id);
      return 'リスト目標件数を' + newCount + '件に変更しました。';
    }
    return 'アクティブなセッションがありません';
  }

  // ゴール変更
  var goalMatch = t.match(/ゴール変更\s*パターン([A-Fa-f])/);
  if (goalMatch) {
    var pattern = goalMatch[1].toUpperCase();
    var planMap2 = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
    var gs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (gs && planMap2[pattern]) {
      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(planMap2[pattern], gs.id);
      return 'ゴールをパターン' + pattern + '(' + planMap2[pattern].split(',').join('→') + ')に変更しました。';
    }
    return 'セッションが見つからないか、パターンが不正です';
  }

  // アウトプット生成指示の自然言語検出
  var outputDetected = detectOutputRequest(t);
  if (outputDetected) return outputDetected;

  // 壁打ち開始指示の検出
  var topicMatch = t.match(/(.+?)(?:について壁打ち|で壁打ち|壁打ちして|について議論|を検討)/);
  if (topicMatch) {
    var topic = topicMatch[1].trim();
    (async function() {
      try {
        var sid = engine.createSession(topic, topic);
        var research = await engine.runResearch(topic);
        db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
        await sendLine('「' + topic + '」と解釈して壁打ち開始します（ID:' + sid + '）');
        for (var r = 1; r <= 8; r++) {
          await engine.runStep(sid, topic, r, research, false);
          if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');
        }
        var summary = await engine.generateFinalSummary(sid);
        try {
          var report = await engine.generatePhase1Report(sid);
          var reportUrl = generatePhase1ReportHTML(report, sid);
          var reportText = formatPhase1ReportText(report);
          await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
        } catch(e) { console.error(e); }
        advanceToNextPhase(sid, false).catch(function(e) { console.error(e); });
      } catch(err) {
        console.error('[壁打ち自動開始]', err.message);
        await sendLine('壁打ちエラー: ' + err.message);
      }
    })();
    return '「' + topic + '」について壁打ち開始します（新規プロジェクト）。';
  }

  // スマートQ&A（Claudeがプロジェクト参照して回答）
  try {
    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));
    var answer = await lineQA.handleSmartQA(t, userId);
    return answer;
  } catch (err) {
    console.error('[Smart QA Error]', err.message);
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(t);
    return 'メモ保存しました: 「' + t.substring(0, 30) + '...」';
  }
}

// LINE返信
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
function replyLine(replyToken, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  return new Promise(function(resolve) {
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
app.get('/api/line/users', function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var users = db.prepare("SELECT DISTINCT user_id, MIN(created_at) as first_seen, MAX(created_at) as last_seen, COUNT(*) as msg_count FROM line_messages WHERE user_id IS NOT NULL GROUP BY user_id ORDER BY last_seen DESC").all();
  var messages = db.prepare("SELECT * FROM line_messages ORDER BY created_at DESC LIMIT 20").all();
  res.json({ users: users, recentMessages: messages });
});

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
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
=======
// LINEテスト送信（特定ユーザーまたはブロードキャスト）
>>>>>>> Stashed changes
app.post('/api/line/send', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.message) return res.status(400).json({ error: 'message必須' });
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
  var result = body.userId ? await pushLine(body.userId, body.message) : await sendLine(body.message);
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
  var result;
  if (body.userId) {
    result = await pushLine(body.userId, body.message);
  } else {
    result = await sendLine(body.message);
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
  res.json({ success: result });
});

// ============================================
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
// 就寝モード（v2.0: 最大5件、3件並列、各最大3ステップ）
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
=======
// 就寝モード（23時自動実行）
>>>>>>> Stashed changes
// ============================================

async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
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
              await engine.runStep(s.id, s.topic, r, s.research_data, true, s.project_id);
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
// v2.1: リトライヘルパー（429→30s, 500/529→10s, timeout 60s）
async function withRetry(fn, label, maxRetries) {
  maxRetries = maxRetries || 3;
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await Promise.race([
        fn(),
        new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout 60s')); }, 60000); })
      ]);
    } catch(err) {
      var status = err.status || (err.response && err.response.status) || 0;
      var isRetryable = status === 429 || status === 500 || status === 529 || err.message === 'timeout 60s';
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
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // 全アクティブセッションを優先度順に取得（上限5件）
  var activeSessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' AND updated_at > datetime('now', '-48 hours') ORDER BY priority ASC, updated_at DESC LIMIT 5").all();

  if (activeSessions.length > 0) {
    console.log('[就寝モード] アクティブセッション: ' + activeSessions.length + '件');
    // 並列処理（最大3件同時）
    var concurrency = 3;
    var results = [];
    for (var batch = 0; batch < activeSessions.length; batch += concurrency) {
      var chunk = activeSessions.slice(batch, batch + concurrency);
      var promises = chunk.map(function(sess) {
        return (async function(s) {
          try {
            console.log('[就寝モード] 処理開始: ' + s.title + ' (優先度:' + (s.priority || 5) + ')');
            db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(s.id);
            db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(s.id, 'sleep_start');
            var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
            var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
            for (var r = startRound; r <= 8; r++) {
              try {
                await engine.runStep(s.id, s.topic, r, s.research_data, true);
                console.log('[就寝モード] セッション' + s.id + ' ステップ' + r + '完了');
              } catch (err) {
                console.error('[就寝モード] ステップ' + r + 'エラー:', err.message);
                db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'error_step_' + r, err.message);
                break;
              }
            }
            var cr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
            if (cr && cr.mr >= 8) {
              try {
                await engine.generateFinalSummary(s.id);
                console.log('[就寝モード] 最終統合完了 セッション' + s.id);
                // 就寝モード Phase1レポート生成
                var sleepReport = await engine.generatePhase1Report(s.id);
                var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);
                global._phase1Reports = global._phase1Reports || [];
                global._phase1Reports.push({ title: s.title, url: sleepReportUrl });
                // 就寝モード Phase4/5/6 自動進行
                await advanceToNextPhase(s.id, true);
              } catch (err) {
                console.error('[就寝モード] 最終統合エラー:', err.message);
              }
            }
            db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
            db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'sleep_end', '完了');
            return { id: s.id, title: s.title, status: '完了' };
          } catch (err) {
            console.error('[就寝モード] セッション' + s.id + '全体エラー:', err.message);
            db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
            return { id: s.id, title: s.title, status: 'エラー: ' + err.message };
          }
        })(sess);
      });
      var batchResults = await Promise.all(promises);
      results = results.concat(batchResults);
    }
    global._sleepResults = results;
  } else {
    // 指示なし：新規事業アイデアを市場調査
    console.log('[就寝モード] 本日の指示なし → 新規事業アイデア調査開始');
    try {
      var researchResult = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 8000,
        system: 'あなたは法律事務所の経営コンサルタントです。東京新橋にある「前田法律事務所（東京新橋法律事務所）」の新規事業アイデアを提案してください。\n\n前田法律事務所の特徴:\n- 代表弁護士: 前田\n- 所在地: 東京都港区新橋\n- 既存事業: 交通事故、企業法務、死後事務委任、高齢者見守り\n- 強み: AI活用、テクノロジー活用、賃貸保証会社との連携\n- ターゲット: 中小企業、単身高齢者、不動産管理会社\n\n以下の観点で分析してください:\n1. 市場調査（市場規模、成長率、トレンド）\n2. 競合分析（主要プレイヤー、差別化ポイント）\n3. 収益性分析（単価、想定件数、粗利率）\n4. 実現可能性（既存リソースの活用度、初期投資、立ち上げ期間）\n\n必ず3案を提案し、各案について向こう3年分のPL（損益計算書）を作成してください。最も実現可能性が高い案を推奨し、その理由を述べてください。',
        messages: [{ role: 'user', content: '前田法律事務所（東京新橋法律事務所）向けの新規事業アイデアを3案、市場調査・競合分析・3年PLつきで提案してください。' }]
      });
      var ideas = researchResult.content[0].text;
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_research', ideas);
      var ts = Date.now();
      var htmlName = 'biz_ideas_' + ts + '.html';
      var outputDir = pathMod.join(__dirname, 'public/outputs');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
      var htmlContent = ideas.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      htmlContent = htmlContent.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      htmlContent = htmlContent.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      htmlContent = htmlContent.replace(/^# (.+)$/gm, '<h1>$1</h1>');
      htmlContent = htmlContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      htmlContent = htmlContent.replace(/\|(.+)\|/g, function(m) { return '<code>' + m + '</code>'; });
      htmlContent = htmlContent.replace(/\n/g, '<br>');
      var fullHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>新規事業アイデア</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f5f5f5;color:#333;line-height:1.8;padding:16px;max-width:800px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:8px;margin:20px 0 16px}h2{font-size:18px;color:#16213e;margin:16px 0 10px;padding:8px 12px;background:#e8eaf6;border-radius:4px}h3{font-size:16px;color:#0d47a1;margin:12px 0 8px}strong{color:#1a1a2e}code{display:block;background:#fff;padding:8px;margin:4px 0;border-radius:4px;font-size:13px;overflow-x:auto;white-space:pre}.content{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.meta{font-size:12px;color:#888;text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid #ddd}</style></head><body><h1>新規事業アイデア提案</h1><div class="content">' + htmlContent + '</div><div class="meta">前田法律事務所 AIシステム | 自動調査 | ' + new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'}) + '</div></body></html>';
      fs.writeFileSync(pathMod.join(outputDir, htmlName), fullHtml, 'utf8');
      global._sleepBizIdeas = { text: ideas, htmlUrl: 'https://176-32-87-118.sslip.io/outputs/' + htmlName };
    } catch (err) {
      console.error('[就寝モード] 新規事業調査エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_error', err.message);
    }
  }
  console.log('[就寝モード] 完了 ' + new Date().toISOString());
}

// ============================================
// 朝サマリー（7時LINE送信）
// ============================================

async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var msg = 'おはようございます、前田さん\n';

  // 就寝中に処理したセッション結果
  if (global._sleepResults && global._sleepResults.length > 0) {
    msg += '\n【就寝中の処理結果: ' + global._sleepResults.length + '件】\n';
    global._sleepResults.forEach(function(r) {
      msg += '・' + r.title + ' → ' + r.status + '\n';
    });
    var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY session_id, created_at ASC").all();
    if (sleepLogs.length > 0) {
      var logText = sleepLogs.map(function(l) { return '[S' + l.session_id + ' ' + l.role_label + '] ' + l.content.substring(0, 200); }).join('\n---\n');
      try {
        var r = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514', max_tokens: 2000,
          system: '就寝中に複数プロジェクトが並列処理されました。各プロジェクトの進捗・重要ポイントを簡潔にまとめてください。',
          messages: [{ role: 'user', content: logText.substring(0, 10000) }]
        });
        msg += '\n' + r.content[0].text;
      } catch(e) { console.error('[朝サマリー] 要約エラー:', e.message); }
    }
    global._sleepResults = null;
    // Phase1完了レポートがあれば追加
    if (global._phase1Reports && global._phase1Reports.length > 0) {
      msg += '\n\n【Phase1完了レポート】\n';
      global._phase1Reports.forEach(function(pr) {
        msg += '・' + pr.title + '\n  ' + pr.url + '\n';
      });
      global._phase1Reports = null;
    }
  } else if (global._sleepBizIdeas) {
    try {
      var r2 = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 2000,
        system: '新規事業アイデア分析をLINE通知用に簡潔にまとめてください。各案のタイトル、市場規模、3年後の営業利益を箇条書きで。推奨案を明示。',
        messages: [{ role: 'user', content: global._sleepBizIdeas.text + '\n\nHTML URL: ' + global._sleepBizIdeas.htmlUrl }]
      });
      msg += '\n【新規事業アイデア（自動調査）】\n\n' + r2.content[0].text;
      msg += '\n\n詳細はこちら:\n' + global._sleepBizIdeas.htmlUrl;
      global._sleepBizIdeas = null;
    } catch(e) { console.error('[朝サマリー] 新規事業要約エラー:', e.message); }
  } else {
    console.log('[朝サマリー] 就寝中ログも新規事業アイデアもなし');
    return;
  }

  // 全セッション進捗サマリー（Feature 1/3/4）
  var allSess = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY priority ASC").all();
  if (allSess.length > 0) {
    msg += '\n\n【プロジェクト進捗一覧】\n';
    allSess.forEach(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      var dl = s.deadline ? ' 〆' + s.deadline : '';
      var phaseLabels2 = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット', 4:'営業リスト', 5:'広告設計', 6:'メディア最適化'};
      var phLabel = phaseLabels2[s.phase] || 'Phase' + s.phase;
      msg += star + s.title + ' → ' + phLabel + ' Step' + s.current_round + dl + '\n';
    });
  }

  // 未承認アウトプットキュー
  var pendingOut = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  if (pendingOut.length > 0) {
    msg += '\n【承認待ちアウトプット: ' + pendingOut.length + '件】\n' +
      pendingOut.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\n') +
      '\n→ 「承認」「パターンA採用」「却下 理由」で返信';
  }

  await sendLine(msg);
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
  // 競合動向をレポートに追加（DB保存前）
  var compChanges = db.prepare("SELECT cc.*, c.name FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id WHERE cc.detected_at > datetime('now', '-7 days')").all();
  if (compChanges.length > 0) {
    report += '\n\n【競合動向】\n' + compChanges.map(function(cc) { return '・' + cc.name + ': ' + cc.change_summary; }).join('\n');
  }
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
// 毎時: 保留質問のタイムアウト処理
cron.schedule('0 * * * *', function() {
  db.prepare("UPDATE pending_questions SET status = 'timeout' WHERE status = 'pending' AND timeout_at < datetime('now')").run();
}, { timezone: 'Asia/Tokyo' });
// 毎週日曜23時（JST）競合チェック（Feature 7）
cron.schedule('0 23 * * 0', function() { checkCompetitors().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });

async function checkCompetitors() {
  console.log('[競合チェック] 開始');
  var comps = db.prepare('SELECT * FROM competitors').all();
  for (var i = 0; i < comps.length; i++) {
    var comp = comps[i];
    try {
      var content = await fetchUrl(comp.url);
      var hash = crypto.createHash('md5').update(content).digest('hex');
      if (comp.last_content_hash && comp.last_content_hash !== hash) {
        db.prepare('INSERT INTO competitor_changes (competitor_id, old_hash, new_hash, change_summary) VALUES (?,?,?,?)').run(comp.id, comp.last_content_hash, hash, '変更検知');
        await sendLine('[競合変更検知] ' + comp.name + ' (' + comp.url + ') のページが更新されました。');
        console.log('[競合チェック] 変更検知: ' + comp.name);
      }
      db.prepare('UPDATE competitors SET last_content_hash = ?, last_checked_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, comp.id);
    } catch (err) {
      console.error('[競合チェック] ' + comp.name + ' エラー:', err.message);
    }
  }
  console.log('[競合チェック] 完了');
}

function fetchUrl(url, maxRedirects) {
  if (maxRedirects === undefined) maxRedirects = 5;
  return new Promise(function(resolve, reject) {
    var mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(res) {
      // リダイレクト対応
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) && res.headers.location && maxRedirects > 0) {
        var redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) redirectUrl = (url.startsWith('https') ? 'https' : 'http') + '://' + require('url').parse(url).host + redirectUrl;
        fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }
      var data = '';
      res.on('data', function(c) { data += c; });
      res.on('end', function() { resolve(data); });
    }).on('error', function(e) { reject(e); });
  });
}

// 毎週月曜7時（JST）週次レポート
cron.schedule('0 7 * * 1', function() { sendWeeklyReport().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });

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
// Q&A履歴
// ============================================

app.get('/api/qa/history', function(req, res) {
  var limit = parseInt(req.query.limit) || 20;
  res.json(db.prepare('SELECT * FROM pending_questions ORDER BY created_at DESC LIMIT ?').all(limit));
});

app.get('/api/qa/pending', function(req, res) {
  res.json(db.prepare("SELECT * FROM pending_questions WHERE status = 'pending' ORDER BY created_at ASC").all());
});

// ============================================
// ダッシュボード（Feature 1）
// ============================================

app.get('/dashboard', function(req, res) {
  var sessions = db.prepare("SELECT * FROM sessions ORDER BY priority ASC, updated_at DESC LIMIT 20").all();
  var pendingOutputs = db.prepare("SELECT oq.*, s.title as session_title FROM output_queue oq LEFT JOIN sessions s ON oq.session_id = s.id WHERE oq.status = 'awaiting_approval' ORDER BY oq.created_at DESC").all();
  var recentQA = db.prepare("SELECT * FROM pending_questions WHERE status = 'answered' ORDER BY answered_at DESC LIMIT 10").all();
  var qualityScores = db.prepare("SELECT qs.*, s.title as session_title FROM quality_scores qs LEFT JOIN sessions s ON qs.session_id = s.id ORDER BY qs.scored_at DESC LIMIT 10").all();

  var sessHTML = sessions.map(function(s) {
    var pri = s.priority || 5;
    var priClass = pri <= 2 ? 'high' : pri <= 4 ? 'mid' : 'low';
    var dl = s.deadline ? '<span class="deadline">〆' + s.deadline + '</span>' : '';
    var phaseLabel = ['壁打ち','訴求設計','アウトプット','営業リスト','広告設計','メディア最適化'][s.phase - 1] || 'Phase' + s.phase;
    return '<div class="card ' + priClass + '"><div class="card-header"><span class="pri">優先' + pri + '</span><span class="status">' + s.status + '</span></div><h3>' + s.title + '</h3><p>' + phaseLabel + ' Step' + s.current_round + ' ' + dl + '</p></div>';
  }).join('');

  var pendHTML = pendingOutputs.map(function(p) {
    return '<div class="card pending"><h3>' + (p.session_title || 'Session' + p.session_id) + '</h3><p>' + p.output_type + ' 推奨: パターン' + p.recommended_pattern + '</p></div>';
  }).join('') || '<p>なし</p>';

  var qaHTML = recentQA.map(function(q) {
    return '<div class="qa"><strong>Q:</strong> ' + q.question.substring(0, 80) + '<br><strong>A:</strong> ' + (q.answer || '').substring(0, 100) + '</div>';
  }).join('') || '<p>なし</p>';

  var scoreHTML = qualityScores.map(function(qs) {
    return '<div class="card score"><h3>' + (qs.session_title || 'Session' + qs.session_id) + ' パターン' + qs.pattern + '</h3><p>訴求' + qs.score_appeal + ' 差別' + qs.score_differentiation + ' 体裁' + qs.score_format + ' 衝撃' + qs.score_impact + ' = ' + qs.total_score + '/40</p></div>';
  }).join('') || '<p>なし</p>';

  var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>前田AI ダッシュボード</title>';
  html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f0f2f5;color:#333;padding:12px}h1{font-size:18px;color:#1a1a2e;padding:12px 0;border-bottom:2px solid #16213e;margin-bottom:16px}h2{font-size:16px;color:#16213e;margin:20px 0 12px;padding:8px;background:#e8eaf6;border-radius:4px}.card{background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,.1);border-left:4px solid #ccc}.card.high{border-left-color:#e53935}.card.mid{border-left-color:#fb8c00}.card.low{border-left-color:#43a047}.card.pending{border-left-color:#1e88e5}.card.score{border-left-color:#8e24aa}.card-header{display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px}.pri{color:#e53935;font-weight:bold}.status{color:#666}.deadline{color:#e53935;font-size:13px;font-weight:bold}h3{font-size:15px;margin-bottom:4px}p{font-size:13px;color:#555}.qa{background:#fff;padding:10px;margin-bottom:8px;border-radius:6px;font-size:13px;box-shadow:0 1px 2px rgba(0,0,0,.08)}.meta{font-size:11px;color:#999;text-align:center;margin-top:20px;padding:12px}button{background:#16213e;color:#fff;border:none;padding:8px 16px;border-radius:4px;font-size:14px;margin-top:12px;cursor:pointer}</style>';
  html += '<script>setTimeout(function(){location.reload()},30000)</script>';
  html += '</head><body>';
  html += '<h1>前田法律事務所 AIダッシュボード</h1>';
  html += '<h2>プロジェクト一覧 (' + sessions.length + ')</h2>' + sessHTML;
  html += '<h2>承認待ちアウトプット</h2>' + pendHTML;
  html += '<h2>品質スコア</h2>' + scoreHTML;
  html += '<h2>最近のQ&A</h2>' + qaHTML;
  html += '<div class="meta">最終更新: ' + now + ' (30秒自動更新)</div>';
  html += '</body></html>';
  res.send(html);
});

// 優先度API（Feature 3）
app.put('/api/session/:id/priority', function(req, res) {
  var id = req.params.id;
  var body = req.body;
  if (body.priority !== undefined) db.prepare('UPDATE sessions SET priority = ? WHERE id = ?').run(body.priority, id);
  if (body.deadline !== undefined) db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(body.deadline, id);
  res.json({ success: true });
});

// 品質スコアAPI（Feature 5）
app.get('/api/quality/:sessionId', function(req, res) {
  res.json(db.prepare('SELECT * FROM quality_scores WHERE session_id = ? ORDER BY scored_at DESC').all(req.params.sessionId));
});

// A/Bテスト（Feature 6）
app.post('/api/ab/create', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    // バリアントA
    var resultA = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    var queueA = db.prepare('SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
    // バリアントB
    var resultB = await outputGen.generateFull(body.sessionId, body.outputType, Object.assign({}, body.params || {}, { variant: 'B' }));
    var queueB = db.prepare('SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
    // A/Bテスト保存
    var abResult = db.prepare('INSERT INTO ab_tests (session_id, name, variant_a_queue_id, variant_b_queue_id) VALUES (?,?,?,?)').run(body.sessionId, body.outputType + ' A/B', queueA ? queueA.id : null, queueB ? queueB.id : null);
    res.json({ abTestId: abResult.lastInsertRowid, variantA: resultA, variantB: resultB });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/ab/:id', function(req, res) {
  var ab = db.prepare('SELECT * FROM ab_tests WHERE id = ?').get(req.params.id);
  if (!ab) return res.status(404).json({ error: 'A/Bテスト未発見' });
  var qA = ab.variant_a_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_a_queue_id) : null;
  var qB = ab.variant_b_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_b_queue_id) : null;
  // HTML比較ビュー
  var pA = qA && qA.patterns ? JSON.parse(qA.patterns) : [];
  var pB = qB && qB.patterns ? JSON.parse(qB.patterns) : [];
  var recA = qA ? qA.recommended_pattern : '?';
  var recB = qB ? qB.recommended_pattern : '?';
  var contentA = pA.length > 0 ? (pA[0].content || JSON.stringify(pA[0])).substring(0, 2000) : 'データなし';
  var contentB = pB.length > 0 ? (pB[0].content || JSON.stringify(pB[0])).substring(0, 2000) : 'データなし';
  contentA = contentA.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  contentB = contentB.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A/B比較</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f5f5f5;padding:12px}h1{font-size:18px;margin-bottom:16px}.compare{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:600px){.compare{grid-template-columns:1fr}}.variant{background:#fff;padding:12px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1)}.variant h2{font-size:15px;margin-bottom:8px;padding:6px;border-radius:4px}.variant.a h2{background:#e3f2fd;color:#1565c0}.variant.b h2{background:#fce4ec;color:#c62828}.content{font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word}</style></head><body>';
  html += '<h1>A/Bテスト比較 #' + ab.id + '</h1>';
  html += '<div class="compare"><div class="variant a"><h2>バリアントA (推奨:' + recA + ')</h2><div class="content">' + contentA + '</div></div>';
  html += '<div class="variant b"><h2>バリアントB (推奨:' + recB + ')</h2><div class="content">' + contentB + '</div></div></div>';
  if (ab.comparison_result) html += '<div style="margin-top:16px;background:#fff;padding:12px;border-radius:8px"><h2 style="font-size:15px;margin-bottom:8px">比較分析</h2><p style="font-size:13px;white-space:pre-wrap">' + ab.comparison_result.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>') + '</p></div>';
  html += '</body></html>';
  res.send(html);
});

app.post('/api/ab/compare/:id', async function(req, res) {
  try {
    var ab = db.prepare('SELECT * FROM ab_tests WHERE id = ?').get(req.params.id);
    if (!ab) return res.status(404).json({ error: 'A/Bテスト未発見' });
    var qA = ab.variant_a_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_a_queue_id) : null;
    var qB = ab.variant_b_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_b_queue_id) : null;
    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    var r = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 2000,
      system: '2つのアウトプットバリアントを比較分析してください。訴求力・差別化・読みやすさ・インパクトで比較し、勝者と理由を明示。',
      messages: [{ role: 'user', content: 'バリアントA:\n' + (qA ? (qA.patterns || '').substring(0, 3000) : 'なし') + '\n\nバリアントB:\n' + (qB ? (qB.patterns || '').substring(0, 3000) : 'なし') }]
    });
    var comparison = r.content[0].text;
    db.prepare('UPDATE ab_tests SET comparison_result = ? WHERE id = ?').run(comparison, ab.id);
    res.json({ comparison: comparison });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 競合モニタリング（Feature 7）
app.get('/api/competitors', function(req, res) {
  res.json(db.prepare('SELECT * FROM competitors ORDER BY created_at DESC').all());
});

app.post('/api/competitors', function(req, res) {
  var body = req.body;
  if (!body.url) return res.status(400).json({ error: 'url必須' });
  var name = body.name || body.url.replace(/https?:\/\//, '').split('/')[0];
  db.prepare('INSERT INTO competitors (name, url, check_type) VALUES (?,?,?)').run(name, body.url, body.checkType || 'lp');
  res.json({ success: true });
});

app.get('/api/competitors/changes', function(req, res) {
  res.json(db.prepare('SELECT cc.*, c.name, c.url FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id ORDER BY cc.detected_at DESC LIMIT 20').all());
});

// ============================================
// ヘルスチェック
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
// ============================================

app.get('/health', function(req, res) {
  var sessionCount = db.prepare('SELECT COUNT(*) as cnt FROM sessions').get();
  var caseCount = db.prepare('SELECT COUNT(*) as cnt FROM case_library').get();
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
  res.json({ status: 'ok', time: new Date().toISOString(), mode: operationMode, sessions: sessionCount.cnt, cases: caseCount.cnt });
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
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    sessions: sessionCount.cnt,
    cases: caseCount.cnt,
    listEntries: db.prepare('SELECT COUNT(*) as cnt FROM list_entries').get().cnt,
    adDesigns: db.prepare('SELECT COUNT(*) as cnt FROM ad_designs').get().cnt,
    mediaOptimizations: db.prepare('SELECT COUNT(*) as cnt FROM media_optimizations').get().cnt
  });
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
});

// ============================================
// 起動
// ============================================

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
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
=======
app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
>>>>>>> Stashed changes
process.on('SIGTERM', function() { db.close(); process.exit(0); });
