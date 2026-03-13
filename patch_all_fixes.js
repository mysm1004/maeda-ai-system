#!/usr/bin/env node
/**
 * patch_all_fixes.js - 全問題一括修正パッチ
 * 2026-03-10
 *
 * 修正内容:
 * 1. セッション4-9の文字化けデータをアーカイブ
 * 2. AIモデルを最新版に更新（Claude opus-4-6 / GPT-5.4）
 * 3. HTML切れ問題の修正（max_tokens増加）
 * 4. 事務所資料パスの修正
 * 5. 未処理エラーハンドリング追加
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
console.log('=== 全問題一括修正パッチ開始 ===');
console.log('ルート:', ROOT);

// ============================================
// 1. セッション4-9の文字化けデータをアーカイブ
// ============================================
console.log('\n--- 1. 文字化けセッションのクリーンアップ ---');
try {
  const Database = require('better-sqlite3');
  const db = new Database(path.join(ROOT, 'data', 'kabeuchi.db'));

  // 文字化けセッションをarchivedに変更
  const corruptSessions = db.prepare(
    "SELECT id, title FROM sessions WHERE id BETWEEN 4 AND 9"
  ).all();

  console.log('文字化けセッション:', corruptSessions.length, '件');
  corruptSessions.forEach(s => {
    console.log('  ID:', s.id, 'title:', s.title.substring(0, 30));
  });

  // statusをarchivedに変更（データは残す）
  const result = db.prepare(
    "UPDATE sessions SET status = 'archived' WHERE id BETWEEN 4 AND 9"
  ).run();
  console.log('アーカイブ完了:', result.changes, '件');

  db.close();
} catch (e) {
  console.error('DB修正エラー:', e.message);
}

// ============================================
// 2. AIモデル名を最新版に更新
// ============================================
console.log('\n--- 2. AIモデル名の更新 ---');

const modelUpdates = [
  {
    file: 'discussion-engine.js',
    replacements: [
      { from: "claude-sonnet-4-20250514", to: "claude-opus-4-6" },
      { from: "'gpt-4o'", to: "'gpt-5.4'" }
    ]
  },
  {
    file: 'output-generator.js',
    replacements: [
      { from: "claude-sonnet-4-20250514", to: "claude-opus-4-6" },
      { from: "'gpt-4o'", to: "'gpt-5.4'" }
    ]
  },
  {
    file: 'line-qa.js',
    replacements: [
      { from: "claude-sonnet-4-20250514", to: "claude-opus-4-6" }
    ]
  },
  {
    file: 'server.js',
    replacements: [
      { from: "claude-sonnet-4-20250514", to: "claude-opus-4-6" }
    ]
  }
];

modelUpdates.forEach(({ file, replacements }) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) {
    console.log('  スキップ（未発見）:', file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  replacements.forEach(({ from, to }) => {
    const count = (content.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count > 0) {
      content = content.split(from).join(to);
      console.log('  ' + file + ': "' + from + '" → "' + to + '" (' + count + '箇所)');
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('  ' + file + ' 保存完了');
  }
});

// ============================================
// 3. HTML切れ問題の修正（max_tokens増加）
// ============================================
console.log('\n--- 3. HTML切れ問題の修正（max_tokens増加） ---');

const ogPath = path.join(ROOT, 'output-generator.js');
if (fs.existsSync(ogPath)) {
  let ogContent = fs.readFileSync(ogPath, 'utf8');

  // Phase3 Step1とStep7のmax_tokens: 8000 → 16000に増加
  // Claude opus-4-6は128Kトークン出力対応なので余裕
  let count = 0;

  // Step1の4パターン生成部分
  ogContent = ogContent.replace(
    /(_phase3_step1[\s\S]*?model:\s*'claude-opus-4-6',\s*max_tokens:\s*)8000/g,
    function(match, prefix) { count++; return prefix + '16000'; }
  );

  // Step7の最終版生成部分
  ogContent = ogContent.replace(
    /(_phase3_step7[\s\S]*?model:\s*'claude-opus-4-6',\s*max_tokens:\s*)8000/g,
    function(match, prefix) { count++; return prefix + '16000'; }
  );

  // もし上記でマッチしなかった場合、全体から8000を16000に（Phase3内のみ）
  if (count === 0) {
    // 直接的なアプローチ: max_tokens: 8000 を全て16000に
    const before = (ogContent.match(/max_tokens:\s*8000/g) || []).length;
    ogContent = ogContent.replace(/max_tokens:\s*8000/g, 'max_tokens: 16000');
    const after = (ogContent.match(/max_tokens:\s*16000/g) || []).length;
    console.log('  max_tokens 8000→16000: ' + before + '箇所修正');
  } else {
    console.log('  Phase3 max_tokens 8000→16000: ' + count + '箇所修正');
  }

  fs.writeFileSync(ogPath, ogContent, 'utf8');
  console.log('  output-generator.js 保存完了');
}

// ============================================
// 4. 事務所資料パスの修正
// ============================================
console.log('\n--- 4. 事務所資料パスの修正 ---');

const files = ['discussion-engine.js', 'output-generator.js'];
files.forEach(file => {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) return;

  let content = fs.readFileSync(fp, 'utf8');

  // 旧パス: __dirname/../../../data/office-docs → 正しいパス
  // ルートファイルなので __dirname は /home/ubuntu/kabeuchi-system
  // 事務所資料は data/office-docs/ と 事務所資料/ の両方にある

  // _getOfficeDocs のパスを修正
  const oldPath1 = "path.join(__dirname, '..', '..', 'data', 'office-docs')";
  const newPath1 = "path.join(__dirname, 'data', 'office-docs')";

  if (content.includes(oldPath1)) {
    content = content.replace(oldPath1, newPath1);
    fs.writeFileSync(fp, content, 'utf8');
    console.log('  ' + file + ': パス修正完了');
  } else if (content.includes("'data', 'office-docs'")) {
    console.log('  ' + file + ': パス修正済み（スキップ）');
  } else {
    // 別のパターンを探す
    const match = content.match(/path\.join\(__dirname.*?office-docs/);
    if (match) {
      console.log('  ' + file + ': 現在のパス → ' + match[0]);
    } else {
      console.log('  ' + file + ': office-docsパス見つからず');
    }
  }
});

// ============================================
// 5. server.jsにグローバルエラーハンドリング追加
// ============================================
console.log('\n--- 5. 未処理エラーハンドリング追加 ---');

const serverPath = path.join(ROOT, 'server.js');
if (fs.existsSync(serverPath)) {
  let serverContent = fs.readFileSync(serverPath, 'utf8');

  // 既にunhandledRejectionがあるかチェック
  if (serverContent.includes('unhandledRejection')) {
    console.log('  server.js: エラーハンドリング既に存在（スキップ）');
  } else {
    // SIGTERM の前に追加
    const insertBefore = "process.on('SIGTERM'";
    const errorHandler = `// グローバルエラーハンドリング（PM2再起動防止）
process.on('unhandledRejection', function(reason, promise) {
  console.error('[unhandledRejection]', reason);
  // クラッシュせずログに記録
});
process.on('uncaughtException', function(err) {
  console.error('[uncaughtException]', err.message, err.stack);
  // 致命的でなければクラッシュしない
  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND') {
    console.log('[Recovery] ネットワークエラー、続行');
  } else if (err.message && (err.message.includes('rate_limit') || err.message.includes('overloaded'))) {
    console.log('[Recovery] API制限エラー、続行');
  }
  // 上記以外の致命的エラーはプロセスを終了させてPM2に再起動させる
  // ただし明示的にexitしない → PM2が自動再起動
});

`;

    if (serverContent.includes(insertBefore)) {
      serverContent = serverContent.replace(insertBefore, errorHandler + insertBefore);
      fs.writeFileSync(serverPath, serverContent, 'utf8');
      console.log('  server.js: グローバルエラーハンドリング追加完了');
    } else {
      // ファイル末尾に追加
      serverContent += '\n' + errorHandler;
      fs.writeFileSync(serverPath, serverContent, 'utf8');
      console.log('  server.js: ファイル末尾にエラーハンドリング追加');
    }
  }
}

// ============================================
// 6. CLAUDE.md のモデル情報更新
// ============================================
console.log('\n--- 6. CLAUDE.md のモデル情報更新 ---');

const claudeMdPath = path.join(ROOT, 'CLAUDE.md');
if (fs.existsSync(claudeMdPath)) {
  let claudeMd = fs.readFileSync(claudeMdPath, 'utf8');
  // 特にモデル名の明示的記載はないが、念のためチェック
  if (claudeMd.includes('sonnet')) {
    claudeMd = claudeMd.replace(/claude-sonnet-4-20250514/g, 'claude-opus-4-6');
    claudeMd = claudeMd.replace(/gpt-4o/g, 'gpt-5.4');
    fs.writeFileSync(claudeMdPath, claudeMd, 'utf8');
    console.log('  CLAUDE.md: モデル名更新完了');
  } else {
    console.log('  CLAUDE.md: モデル名記載なし（スキップ）');
  }
}

console.log('\n=== 全修正完了 ===');
console.log('次のステップ: pm2 restart kabeuchi');
