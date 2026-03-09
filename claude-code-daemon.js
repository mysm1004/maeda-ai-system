#!/usr/bin/env node
/**
 * Claude Code Daemon - LINE→Claude Code CLIブリッジサービス
 * LINEからの指示をClaude Code CLIに渡し、コード修正・デプロイを実行する
 * GitHub自動同期・モード切替対応
 */

const http = require('http');
const https = require('https');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PROJECT_DIR = '/home/ubuntu/kabeuchi-system';
const LOG_DIR = '/home/ubuntu/kabeuchi-system/data/claude-code-logs';
const TASK_TIMEOUT = 300000; // 5分
const GITHUB_PULL_INTERVAL = 300000; // 5分間隔GitHub pull

let currentTask = null;
let taskQueue = [];
let taskHistory = [];
let isPaused = false; // PCモード時にtrue

// ログディレクトリ作成
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try {
    fs.appendFileSync(path.join(LOG_DIR, 'daemon.log'), line + '\n');
  } catch (e) { /* ignore */ }
}

// LINE通知送信（httpsを使用）
function sendLineNotification(message) {
  return new Promise((resolve) => {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) { log('LINE token未設定'); return resolve(false); }

    const data = JSON.stringify({
      messages: [{ type: 'text', text: message.substring(0, 5000) }]
    });

    const req = https.request({
      hostname: 'api.line.me',
      path: '/v2/bot/message/broadcast',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        log(`LINE broadcast: status=${res.statusCode}`);
        resolve(res.statusCode === 200);
      });
    });
    req.on('error', (e) => { log('LINE error: ' + e.message); resolve(false); });
    req.write(data);
    req.end();
  });
}

// Git操作ヘルパー
function gitExec(cmd) {
  return execSync(cmd, { cwd: PROJECT_DIR, stdio: 'pipe', timeout: 30000 }).toString().trim();
}

// GitHubから最新コードをpull
function pullFromGitHub() {
  try {
    gitExec('git stash 2>/dev/null || true');
    gitExec('git pull origin main');
    gitExec('git stash pop 2>/dev/null || true');
    log('GitHub pull完了');
    return true;
  } catch (e) {
    log('GitHub pull失敗: ' + e.message);
    return false;
  }
}

// 変更をGitHubにpush
function pushToGitHub(msg) {
  try {
    gitExec('git add -A');
    try { gitExec('git reset HEAD -- .env'); } catch (e) { /* ok */ }
    try { gitExec('git reset HEAD -- data/kabeuchi.db*'); } catch (e) { /* ok */ }
    try { gitExec(`git commit -m "${msg || 'auto: code changes'}"`); } catch (e) {
      if (e.message.includes('nothing to commit')) return true;
      throw e;
    }
    gitExec('git push origin main');
    log('GitHub push完了: ' + msg);
    return true;
  } catch (e) {
    log('GitHub push失敗: ' + e.message);
    return false;
  }
}

// Claude Code CLIを実行
function runClaudeCode(instruction, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const taskId = Date.now().toString(36);

    log(`[Task ${taskId}] 開始: ${instruction.substring(0, 100)}...`);

    // まずGitHubから最新を取得
    pullFromGitHub();

    const args = [
      '--print', instruction,
      '--output-format', 'text',
      '--max-turns', '20'
    ];

    if (options.allowEdits !== false) {
      args.push('--dangerously-skip-permissions');
    }

    const proc = spawn('claude', args, {
      cwd: options.cwd || PROJECT_DIR,
      env: {
        ...process.env,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        HOME: '/home/ubuntu',
        PATH: process.env.PATH
      },
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: TASK_TIMEOUT
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    const timer = setTimeout(() => {
      proc.kill('SIGTERM');
      reject(new Error('タイムアウト（5分超過）'));
    }, TASK_TIMEOUT);

    proc.on('close', (code) => {
      clearTimeout(timer);
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      const result = {
        taskId,
        exitCode: code,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        duration: `${duration}秒`,
        instruction: instruction.substring(0, 200)
      };

      // ログ保存
      try {
        fs.writeFileSync(
          path.join(LOG_DIR, `task_${taskId}.json`),
          JSON.stringify(result, null, 2)
        );
      } catch (e) { /* ignore */ }

      log(`[Task ${taskId}] 完了: code=${code}, ${duration}秒`);

      // コード変更をGitHubにpush
      if (code === 0) {
        pushToGitHub(`claude-code: ${instruction.substring(0, 60)}`);
      }

      resolve(result);
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      log(`[Task ${taskId}] プロセスエラー: ${err.message}`);
      reject(err);
    });
  });
}

// タスクキュー処理
async function processQueue() {
  if (currentTask || taskQueue.length === 0 || isPaused) return;

  const task = taskQueue.shift();
  currentTask = task;

  try {
    await sendLineNotification(`🔧 タスク開始\n${task.instruction.substring(0, 200)}`);

    const result = await runClaudeCode(task.instruction, task.options);

    taskHistory.unshift({ ...result, completedAt: new Date().toISOString() });
    if (taskHistory.length > 50) taskHistory = taskHistory.slice(0, 50);

    const summary = result.exitCode === 0
      ? `✅ タスク完了（${result.duration}）\n\n${result.stdout.substring(0, 1500)}`
      : `❌ タスクエラー（code: ${result.exitCode}）\n${result.stderr.substring(0, 500)}\n\n${result.stdout.substring(0, 1000)}`;

    await sendLineNotification(summary);

    // 自動デプロイ
    if (result.exitCode === 0 && task.autoRestart) {
      log('PM2再起動中...');
      try {
        execSync('pm2 restart kabeuchi', { cwd: PROJECT_DIR, timeout: 15000 });
        await sendLineNotification('🔄 サーバー再起動完了');
      } catch (e) {
        log('PM2再起動エラー: ' + e.message);
        await sendLineNotification('⚠️ サーバー再起動に失敗: ' + e.message);
      }
    }
  } catch (err) {
    log('タスクエラー: ' + err.message);
    await sendLineNotification('❌ Claude Codeエラー: ' + err.message);
  } finally {
    currentTask = null;
    processQueue();
  }
}

// 定期GitHub pull
let pullInterval = setInterval(() => {
  if (!isPaused && !currentTask) {
    pullFromGitHub();
  }
}, GITHUB_PULL_INTERVAL);

// HTTPサーバー
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // ヘルスチェックは認証不要
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: isPaused ? 'paused' : 'ok',
      uptime: process.uptime(),
      mode: isPaused ? 'local' : 'aws'
    }));
  }

  // 認証チェック
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_SECRET) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: '認証エラー' }));
  }

  // POST /task - 新規タスク投入
  if (req.method === 'POST' && url.pathname === '/task') {
    if (isPaused) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'PCモード中のため一時停止中です' }));
    }
    let body = '';
    req.on('data', (c) => body += c);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.instruction) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'instruction必須' }));
        }
        const task = {
          id: Date.now().toString(36),
          instruction: data.instruction,
          options: { cwd: data.cwd || PROJECT_DIR },
          autoRestart: data.autoRestart !== false,
          queuedAt: new Date().toISOString()
        };
        taskQueue.push(task);
        processQueue();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'queued',
          taskId: task.id,
          queuePosition: taskQueue.length,
          currentlyRunning: !!currentTask
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON parse error' }));
      }
    });
    return;
  }

  // POST /pause - PCモード（一時停止）
  if (req.method === 'POST' && url.pathname === '/pause') {
    isPaused = true;
    log('PCモード: Daemon一時停止');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'paused', mode: 'local' }));
  }

  // POST /resume - AWSモード（再開）
  if (req.method === 'POST' && url.pathname === '/resume') {
    isPaused = false;
    pullFromGitHub();
    log('AWSモード: Daemon再開');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'running', mode: 'aws' }));
  }

  // POST /sync - 手動GitHub同期
  if (req.method === 'POST' && url.pathname === '/sync') {
    pullFromGitHub();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'synced' }));
  }

  // GET /status
  if (req.method === 'GET' && url.pathname === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      running: !!currentTask,
      paused: isPaused,
      mode: isPaused ? 'local' : 'aws',
      currentTask: currentTask ? {
        id: currentTask.id,
        instruction: currentTask.instruction.substring(0, 200),
        startedAt: currentTask.queuedAt
      } : null,
      queueLength: taskQueue.length,
      recentTasks: taskHistory.slice(0, 10).map(t => ({
        taskId: t.taskId,
        exitCode: t.exitCode,
        duration: t.duration,
        instruction: t.instruction,
        completedAt: t.completedAt
      }))
    }));
  }

  // GET /history
  if (req.method === 'GET' && url.pathname === '/history') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ tasks: taskHistory }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  log(`Claude Code Daemon起動 port=${PORT} mode=aws`);
  log(`プロジェクトDir: ${PROJECT_DIR}`);
  log(`GitHub pull間隔: ${GITHUB_PULL_INTERVAL / 1000}秒`);
});

process.on('SIGTERM', () => {
  log('SIGTERM受信、シャットダウン中...');
  clearInterval(pullInterval);
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  log('SIGINT受信、シャットダウン中...');
  clearInterval(pullInterval);
  server.close(() => process.exit(0));
});
