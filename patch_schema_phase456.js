// patch_schema_phase456.js
// Phase 4/5/6 用 DBスキーマ追加
var fs = require('fs');

var schemaFile = '/home/ubuntu/kabeuchi-system/src/db/schema.js';
var schema = fs.readFileSync(schemaFile, 'utf8');
var fixes = 0;

// ============================================
// 1. sessions テーブルに phase_plan, list_count カラム追加
// ============================================
if (schema.indexOf('phase_plan') === -1) {
  // ALTER TABLE を initDB 内に追加（module.exports の直前）
  var exportLine = 'module.exports = initDB;';
  if (schema.indexOf(exportLine) >= 0) {
    var alterSQL = "\n  // Phase 4/5/6: sessions テーブル拡張\n  try { db.exec(\"ALTER TABLE sessions ADD COLUMN phase_plan TEXT DEFAULT '1,2,3,4,5,6'\"); } catch(e) {}\n  try { db.exec(\"ALTER TABLE sessions ADD COLUMN list_count INTEGER DEFAULT 100\"); } catch(e) {}\n\n";
    schema = schema.replace(exportLine, alterSQL + exportLine);
    fixes++;
    console.log('[Fix 1] sessions テーブルに phase_plan, list_count カラム追加');
  } else {
    console.log('[Fix 1] スキップ（module.exports パターン不一致）');
  }
} else {
  console.log('[Fix 1] スキップ（既に追加済み）');
}

// ============================================
// 2. sales_lists テーブル作成
// ============================================
if (schema.indexOf('sales_lists') === -1) {
  var exportLine2 = 'module.exports = initDB;';
  var salesListSQL = "\n  // Phase 4: 営業リスト管理\n  db.exec(`\n    CREATE TABLE IF NOT EXISTS sales_lists (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      session_id INTEGER NOT NULL,\n      step_completed INTEGER DEFAULT 0,\n      raw_list TEXT,\n      final_list TEXT,\n      excel_path TEXT,\n      status TEXT DEFAULT 'pending',\n      created_at DATETIME DEFAULT (datetime('now')),\n      updated_at DATETIME DEFAULT (datetime('now'))\n    )\n  `);\n\n";
  schema = schema.replace(exportLine2, salesListSQL + exportLine2);
  fixes++;
  console.log('[Fix 2] sales_lists テーブル作成');
} else {
  console.log('[Fix 2] スキップ（既に存在）');
}

// ============================================
// 3. list_entries テーブル作成
// ============================================
if (schema.indexOf('list_entries') === -1) {
  var exportLine3 = 'module.exports = initDB;';
  var listEntriesSQL = "\n  // Phase 4: リスト個別エントリ\n  db.exec(`\n    CREATE TABLE IF NOT EXISTS list_entries (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      session_id INTEGER NOT NULL,\n      rank TEXT,\n      company_name TEXT,\n      individual_name TEXT,\n      industry TEXT,\n      area TEXT,\n      phone TEXT,\n      fax TEXT,\n      email TEXT,\n      address TEXT,\n      website TEXT,\n      employee_count TEXT,\n      contact_person TEXT,\n      approach_method TEXT,\n      selection_reason TEXT,\n      source_count TEXT,\n      freshness_date TEXT,\n      negative_check TEXT DEFAULT 'OK',\n      contact_verified TEXT,\n      priority_score TEXT,\n      notes TEXT,\n      status TEXT DEFAULT 'active',\n      created_at DATETIME DEFAULT (datetime('now'))\n    )\n  `);\n\n";
  schema = schema.replace(exportLine3, listEntriesSQL + exportLine3);
  fixes++;
  console.log('[Fix 3] list_entries テーブル作成');
} else {
  console.log('[Fix 3] スキップ（既に存在）');
}

// ============================================
// 4. ad_designs テーブル作成
// ============================================
if (schema.indexOf('ad_designs') === -1) {
  var exportLine4 = 'module.exports = initDB;';
  var adDesignsSQL = "\n  // Phase 5: 広告設計\n  db.exec(`\n    CREATE TABLE IF NOT EXISTS ad_designs (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      session_id INTEGER NOT NULL,\n      step_completed INTEGER DEFAULT 0,\n      design_doc TEXT,\n      final_design TEXT,\n      html_path TEXT,\n      status TEXT DEFAULT 'pending',\n      created_at DATETIME DEFAULT (datetime('now'))\n    )\n  `);\n\n";
  schema = schema.replace(exportLine4, adDesignsSQL + exportLine4);
  fixes++;
  console.log('[Fix 4] ad_designs テーブル作成');
} else {
  console.log('[Fix 4] スキップ（既に存在）');
}

// ============================================
// 5. media_optimizations テーブル作成
// ============================================
if (schema.indexOf('media_optimizations') === -1) {
  var exportLine5 = 'module.exports = initDB;';
  var mediaOptSQL = "\n  // Phase 6: メディア最適化\n  db.exec(`\n    CREATE TABLE IF NOT EXISTS media_optimizations (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      session_id INTEGER NOT NULL,\n      media_type TEXT,\n      step_completed INTEGER DEFAULT 0,\n      optimization_result TEXT,\n      final_media TEXT,\n      quality_score INTEGER,\n      html_path TEXT,\n      status TEXT DEFAULT 'pending',\n      created_at DATETIME DEFAULT (datetime('now'))\n    )\n  `);\n\n";
  schema = schema.replace(exportLine5, mediaOptSQL + exportLine5);
  fixes++;
  console.log('[Fix 5] media_optimizations テーブル作成');
} else {
  console.log('[Fix 5] スキップ（既に存在）');
}

fs.writeFileSync(schemaFile, schema, 'utf8');

console.log('\n============================');
console.log('patch_schema_phase456.js 完了: ' + fixes + '件追加');
console.log('============================');
