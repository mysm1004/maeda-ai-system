// v3.1 パッチスクリプト
// schema.jsとserver.jsにv3.1の変更を安全に適用

var fs = require('fs');
var path = require('path');

var BASE = '/home/ubuntu/kabeuchi-system';

// ======== schema.js パッチ ========
(function patchSchema() {
  var file = path.join(BASE, 'schema.js');
  var code = fs.readFileSync(file, 'utf8');

  // 既にv3.1パッチ済みか確認
  if (code.indexOf('v3.1 マイグレーション') !== -1) {
    console.log('[schema.js] 既にv3.1パッチ適用済み');
    return;
  }

  // インデックスセクションの直前にv3.1マイグレーションを挿入
  var marker = '// ============ インデックス ============';
  if (code.indexOf(marker) === -1) {
    // マーカーがない場合は `return db;` の前に挿入
    marker = 'return db;';
  }

  var v31Migration = `
  // ============ v3.1 マイグレーション ============

  // sessions: system_version, agent_log追加
  try { db.exec("ALTER TABLE sessions ADD COLUMN system_version TEXT DEFAULT 'v2.0'"); } catch(e) {}
  try { db.exec("ALTER TABLE sessions ADD COLUMN agent_log TEXT"); } catch(e) {}

  // discussion_logs: agent_name, team追加
  try { db.exec("ALTER TABLE discussion_logs ADD COLUMN agent_name TEXT"); } catch(e) {}
  try { db.exec("ALTER TABLE discussion_logs ADD COLUMN team TEXT"); } catch(e) {}

  // エージェント実行ログテーブル（v3.1新規）
  db.exec("CREATE TABLE IF NOT EXISTS agent_logs (\\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\\
    session_id INTEGER,\\
    phase INTEGER,\\
    agent_name TEXT NOT NULL,\\
    model TEXT,\\
    input_tokens INTEGER,\\
    output_tokens INTEGER,\\
    duration_ms INTEGER,\\
    status TEXT DEFAULT 'success',\\
    error_message TEXT,\\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP\\
  )");

  // v3.1 インデックス
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_agent_logs_session ON agent_logs(session_id)"); } catch(e) {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_agent_logs_agent ON agent_logs(agent_name)"); } catch(e) {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_logs_agent ON discussion_logs(agent_name)"); } catch(e) {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_logs_team ON discussion_logs(team)"); } catch(e) {}

`;

  code = code.replace(marker, v31Migration + '\n  ' + marker);
  fs.writeFileSync(file, code, 'utf8');
  console.log('[schema.js] v3.1マイグレーション追加完了');
})();

// ======== server.js パッチ ========
(function patchServer() {
  var file = path.join(BASE, 'server.js');
  var code = fs.readFileSync(file, 'utf8');

  // 既にv3.1パッチ済みか確認
  if (code.indexOf('V3_ENABLED') !== -1) {
    console.log('[server.js] 既にv3.1パッチ適用済み');
    return;
  }

  // 1. require文の後にv3.1フィーチャーフラグを追加
  var requireEnd = "var Anthropic = require('@anthropic-ai/sdk');";
  if (code.indexOf("var OpenAI = require('openai');") !== -1) {
    requireEnd = "var OpenAI = require('openai');";
  }

  var v3Require = `

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
}`;
  code = code.replace(requireEnd, requireEnd + v3Require);

  // 2. エンジン初期化後にフェーズランナー初期化を追加
  var engineInit = code.match(/var stateManager = new StateManager\(db\);/);
  if (engineInit) {
    code = code.replace(
      'var stateManager = new StateManager(db);',
      'var stateManager = new StateManager(db);\n\n// v3.1: フェーズランナー初期化\nvar phaseRunner = V3_ENABLED ? new PhaseRunner(db, lineQA, sendLine) : null;'
    );
  }

  // 3. /api/discussion の先頭にv3.1分岐を追加
  var discussionRoute = "app.post('/api/discussion', async function(req, res) {\n  try {\n    var body = req.body;\n    var sid = body.sessionId;";
  if (code.indexOf(discussionRoute) !== -1) {
    var v3DiscussionBlock = `app.post('/api/discussion', async function(req, res) {
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

    // v2.0 フォールバック`;
    code = code.replace(discussionRoute, v3DiscussionBlock);
  }

  // 4. /api/output/generate にv3.1分岐を追加
  var outputRoute = "app.post('/api/output/generate', async function(req, res) {\n  try {";
  if (code.indexOf(outputRoute) !== -1) {
    var v3OutputBlock = `app.post('/api/output/generate', async function(req, res) {
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
    }`;
    code = code.replace(outputRoute, v3OutputBlock);
  }

  // 5. 起動メッセージをv3.1対応に
  code = code.replace(
    /console\.log\('前田AIシステム.*起動.*'\)/,
    "console.log('前田AIシステム ' + (V3_ENABLED ? 'v3.1 (マルチLLM並列)' : 'v2.0') + ' 起動 port:' + PORT)"
  );

  // 6. ヘルスチェックにバージョン追加
  code = code.replace(
    /res\.json\(\{ status: 'ok', time:/,
    "res.json({ status: 'ok', version: V3_ENABLED ? 'v3.1' : 'v2.0', time:"
  );

  // 7. v3.1専用エンドポイントを追加（ファイル末尾の`app.listen`の前）
  var listenLine = "app.listen(PORT";
  var v3Endpoints = `
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

`;
  code = code.replace(listenLine, v3Endpoints + listenLine);

  fs.writeFileSync(file, code, 'utf8');
  console.log('[server.js] v3.1パッチ適用完了');
})();

console.log('\n=== v3.1パッチ適用完了 ===');
console.log('V3_ENABLED=false (デフォルト) で起動確認後、V3_ENABLED=true に切替してください');
