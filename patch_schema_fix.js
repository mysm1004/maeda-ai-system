// patch_schema_fix.js
// schema.jsの新テーブル定義を正しい位置に移動
var fs = require('fs');

var schemaFile = '/home/ubuntu/kabeuchi-system/src/db/schema.js';
var schema = fs.readFileSync(schemaFile, 'utf8');

// return db; の直前に全テーブル定義を追加（重複を避ける）
// まず、return db; の後に誤って追加されたコードを削除
var returnLine = "  return db;\n}\n";
var afterReturn = schema.indexOf(returnLine);
if (afterReturn >= 0) {
  // return db; の後の余分なコードを削除してmodule.exportsだけ残す
  var moduleExports = "\nmodule.exports = { initDatabase: initDatabase };\n";
  schema = schema.substring(0, afterReturn) + "\n" +
    "  // Phase 4: 営業リスト管理\n" +
    "  db.exec(`\n" +
    "    CREATE TABLE IF NOT EXISTS sales_lists (\n" +
    "      id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
    "      session_id INTEGER NOT NULL,\n" +
    "      step_completed INTEGER DEFAULT 0,\n" +
    "      raw_list TEXT,\n" +
    "      final_list TEXT,\n" +
    "      excel_path TEXT,\n" +
    "      status TEXT DEFAULT 'pending',\n" +
    "      created_at DATETIME DEFAULT (datetime('now')),\n" +
    "      updated_at DATETIME DEFAULT (datetime('now'))\n" +
    "    )\n" +
    "  `);\n\n" +
    "  // Phase 4: リスト個別エントリ\n" +
    "  db.exec(`\n" +
    "    CREATE TABLE IF NOT EXISTS list_entries (\n" +
    "      id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
    "      session_id INTEGER NOT NULL,\n" +
    "      rank TEXT,\n" +
    "      company_name TEXT,\n" +
    "      individual_name TEXT,\n" +
    "      industry TEXT,\n" +
    "      area TEXT,\n" +
    "      phone TEXT,\n" +
    "      fax TEXT,\n" +
    "      email TEXT,\n" +
    "      address TEXT,\n" +
    "      website TEXT,\n" +
    "      employee_count TEXT,\n" +
    "      contact_person TEXT,\n" +
    "      approach_method TEXT,\n" +
    "      selection_reason TEXT,\n" +
    "      source_count TEXT,\n" +
    "      freshness_date TEXT,\n" +
    "      negative_check TEXT DEFAULT 'OK',\n" +
    "      contact_verified TEXT,\n" +
    "      priority_score TEXT,\n" +
    "      notes TEXT,\n" +
    "      status TEXT DEFAULT 'active',\n" +
    "      created_at DATETIME DEFAULT (datetime('now'))\n" +
    "    )\n" +
    "  `);\n\n" +
    "  // Phase 5: 広告設計\n" +
    "  db.exec(`\n" +
    "    CREATE TABLE IF NOT EXISTS ad_designs (\n" +
    "      id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
    "      session_id INTEGER NOT NULL,\n" +
    "      step_completed INTEGER DEFAULT 0,\n" +
    "      design_doc TEXT,\n" +
    "      final_design TEXT,\n" +
    "      html_path TEXT,\n" +
    "      status TEXT DEFAULT 'pending',\n" +
    "      created_at DATETIME DEFAULT (datetime('now'))\n" +
    "    )\n" +
    "  `);\n\n" +
    "  // Phase 6: メディア最適化\n" +
    "  db.exec(`\n" +
    "    CREATE TABLE IF NOT EXISTS media_optimizations (\n" +
    "      id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
    "      session_id INTEGER NOT NULL,\n" +
    "      media_type TEXT,\n" +
    "      step_completed INTEGER DEFAULT 0,\n" +
    "      optimization_result TEXT,\n" +
    "      final_media TEXT,\n" +
    "      quality_score INTEGER,\n" +
    "      html_path TEXT,\n" +
    "      status TEXT DEFAULT 'pending',\n" +
    "      created_at DATETIME DEFAULT (datetime('now'))\n" +
    "    )\n" +
    "  `);\n\n" +
    "  // Phase 4/5/6: sessions テーブル拡張\n" +
    "  try { db.exec(\"ALTER TABLE sessions ADD COLUMN phase_plan TEXT DEFAULT '1,2,3,4,5,6'\"); } catch(e) {}\n" +
    "  try { db.exec(\"ALTER TABLE sessions ADD COLUMN list_count INTEGER DEFAULT 100\"); } catch(e) {}\n\n" +
    "  return db;\n}\n" +
    moduleExports;

  fs.writeFileSync(schemaFile, schema, 'utf8');
  console.log('schema.js テーブル定義を正しい位置に修正完了');
} else {
  console.log('return db; パターンが見つかりません');
}
