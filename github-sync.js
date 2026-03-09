#!/usr/bin/env node
/**
 * github-sync.js - claudeマスターフォルダのGitHub自動同期
 * ファイル変更を監視し、自動でcommit & push
 * ローカル(Windows)・AWS両方で動作
 */

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const PROJECT_DIR = __dirname;
const SYNC_INTERVAL = 60000; // 1分間隔チェック
const DEBOUNCE_MS = 5000;    // 5秒デバウンス
const LOG_FILE = path.join(PROJECT_DIR, 'data', 'sync.log');

// 同期除外パターン
const IGNORE_PATTERNS = [
  'node_modules', '.git', 'data/kabeuchi.db', 'data/kabeuchi.db-wal',
  'data/kabeuchi.db-shm', 'data/claude-code-logs', 'data/sync.log',
  '*.pyc', '__pycache__', '.DS_Store', 'Thumbs.db'
];

let lastSyncTime = Date.now();
let pendingSync = null;
let isSyncing = false;

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  try {
    const dir = path.dirname(LOG_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(LOG_FILE, line + '\n');
  } catch (e) { /* ignore */ }
}

function gitExec(cmd) {
  return execSync(cmd, { cwd: PROJECT_DIR, stdio: 'pipe', timeout: 30000 }).toString().trim();
}

function hasChanges() {
  try {
    const status = gitExec('git status --porcelain');
    return status.length > 0;
  } catch (e) {
    return false;
  }
}

function getChangedFiles() {
  try {
    const status = gitExec('git status --porcelain');
    return status.split('\n').filter(l => l.trim()).map(l => l.substring(3));
  } catch (e) {
    return [];
  }
}

function shouldIgnore(filepath) {
  return IGNORE_PATTERNS.some(p => {
    if (p.startsWith('*')) return filepath.endsWith(p.substring(1));
    return filepath.includes(p);
  });
}

async function syncToGitHub() {
  if (isSyncing) return;
  isSyncing = true;

  try {
    if (!hasChanges()) {
      isSyncing = false;
      return;
    }

    const changed = getChangedFiles().filter(f => !shouldIgnore(f));
    if (changed.length === 0) {
      isSyncing = false;
      return;
    }

    log(`変更検出: ${changed.length}ファイル`);
    changed.forEach(f => log(`  - ${f}`));

    // ステージング（.envとDBは除外）
    try {
      gitExec('git add -A');
      // 機密ファイルをunstage
      try { gitExec('git reset HEAD -- .env'); } catch (e) { /* ok */ }
      try { gitExec('git reset HEAD -- data/kabeuchi.db*'); } catch (e) { /* ok */ }
    } catch (e) {
      log('git add エラー: ' + e.message);
      isSyncing = false;
      return;
    }

    // コミット
    const summary = changed.slice(0, 3).join(', ');
    const msg = `auto-sync: ${summary}${changed.length > 3 ? ' +' + (changed.length - 3) + '件' : ''}`;
    try {
      gitExec(`git commit -m "${msg}"`);
    } catch (e) {
      if (e.message.includes('nothing to commit')) {
        isSyncing = false;
        return;
      }
      log('git commit エラー: ' + e.message);
      isSyncing = false;
      return;
    }

    // Push
    try {
      gitExec('git push origin main');
      log(`GitHub push完了: ${msg}`);
      lastSyncTime = Date.now();
    } catch (e) {
      log('git push エラー: ' + e.message);
      // conflict時はpull & retry
      try {
        gitExec('git pull --rebase origin main');
        gitExec('git push origin main');
        log('リベース後push完了');
      } catch (e2) {
        log('push リトライ失敗: ' + e2.message);
      }
    }
  } catch (e) {
    log('同期エラー: ' + e.message);
  } finally {
    isSyncing = false;
  }
}

// GitHubからpull（AWSサーバー用）
async function pullFromGitHub() {
  if (isSyncing) return;
  isSyncing = true;
  try {
    // ローカル変更を一時退避
    try { gitExec('git stash'); } catch (e) { /* ok */ }
    gitExec('git pull origin main');
    try { gitExec('git stash pop'); } catch (e) { /* ok */ }
    log('GitHub pull完了');
  } catch (e) {
    log('pull エラー: ' + e.message);
  } finally {
    isSyncing = false;
  }
}

// デバウンス付き同期トリガー
function triggerSync() {
  if (pendingSync) clearTimeout(pendingSync);
  pendingSync = setTimeout(() => {
    syncToGitHub();
    pendingSync = null;
  }, DEBOUNCE_MS);
}

// ファイル監視
function startWatcher() {
  log('ファイル監視開始: ' + PROJECT_DIR);

  // fs.watchは再帰的にディレクトリを監視
  const watcher = fs.watch(PROJECT_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    if (shouldIgnore(filename)) return;
    if (filename.startsWith('.git')) return;
    triggerSync();
  });

  watcher.on('error', (err) => {
    log('監視エラー: ' + err.message);
  });

  return watcher;
}

// 定期同期（バックアップ）
function startPeriodicSync() {
  setInterval(() => {
    if (Date.now() - lastSyncTime > SYNC_INTERVAL * 5) {
      syncToGitHub();
    }
  }, SYNC_INTERVAL);
}

// AWS側: 定期的にGitHub pullチェック
function startPeriodicPull(intervalMs) {
  setInterval(() => {
    pullFromGitHub();
  }, intervalMs || 300000); // デフォルト5分間隔
}

// メイン起動
if (require.main === module) {
  const mode = process.argv[2] || 'watch';

  log(`=== GitHub Sync 起動 (mode: ${mode}) ===`);

  if (mode === 'watch') {
    // ローカル: ファイル変更監視 + 自動push
    startWatcher();
    startPeriodicSync();
    log('ファイル監視 + 定期同期モード');
  } else if (mode === 'pull') {
    // AWS: 定期pull
    const interval = parseInt(process.argv[3]) || 300000;
    startPeriodicPull(interval);
    log(`定期pullモード (${interval / 1000}秒間隔)`);
  } else if (mode === 'push') {
    // 即時push
    syncToGitHub().then(() => {
      log('手動push完了');
      process.exit(0);
    });
  } else if (mode === 'sync') {
    // 双方向: watch + pull
    startWatcher();
    startPeriodicSync();
    startPeriodicPull();
    log('双方向同期モード');
  }
}

module.exports = { syncToGitHub, pullFromGitHub, triggerSync, hasChanges };
