var Database = require('better-sqlite3');

function initDatabase(dbPath) {
  var db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // セッション（フェーズ管理付き）
  db.exec("CREATE TABLE IF NOT EXISTS sessions (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    title TEXT NOT NULL,\
    topic TEXT NOT NULL,\
    phase INTEGER DEFAULT 1,\
    current_round INTEGER DEFAULT 0,\
    total_rounds INTEGER DEFAULT 6,\
    status TEXT DEFAULT 'active',\
    research_data TEXT,\
    target_definition TEXT,\
    appeal_points TEXT,\
    catchcopy TEXT,\
    output_plan TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // 議論ログ
  db.exec("CREATE TABLE IF NOT EXISTS discussion_logs (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER NOT NULL,\
    phase INTEGER DEFAULT 1,\
    round_number INTEGER NOT NULL,\
    round_theme TEXT,\
    role TEXT NOT NULL,\
    role_label TEXT NOT NULL,\
    content TEXT NOT NULL,\
    is_sleep_mode INTEGER DEFAULT 0,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\
  )");

  // 前田さん記憶DB（強化版）
  db.exec("CREATE TABLE IF NOT EXISTS memory_db (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    category TEXT NOT NULL,\
    subcategory TEXT,\
    key TEXT NOT NULL,\
    value TEXT NOT NULL,\
    confidence REAL DEFAULT 0.5,\
    source_session_id INTEGER,\
    source_type TEXT,\
    output_type TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // 判断履歴
  db.exec("CREATE TABLE IF NOT EXISTS decisions (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER NOT NULL,\
    log_id INTEGER,\
    output_id INTEGER,\
    decision TEXT NOT NULL,\
    comment TEXT,\
    pattern_chosen TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\
  )");

  // 案件ライブラリ（全アウトプット蓄積）
  db.exec("CREATE TABLE IF NOT EXISTS case_library (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER,\
    output_type TEXT NOT NULL,\
    title TEXT NOT NULL,\
    description TEXT,\
    content TEXT NOT NULL,\
    pattern TEXT,\
    design_doc TEXT,\
    target_audience TEXT,\
    tone TEXT,\
    tags TEXT,\
    file_path TEXT,\
    deploy_url TEXT,\
    status TEXT DEFAULT 'draft',\
    approved_at DATETIME,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\
  )");

  // アウトプット生成キュー
  db.exec("CREATE TABLE IF NOT EXISTS output_queue (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER NOT NULL,\
    output_type TEXT NOT NULL,\
    params TEXT,\
    design_doc TEXT,\
    patterns TEXT,\
    critique TEXT,\
    recommended_pattern TEXT,\
    status TEXT DEFAULT 'pending',\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\
  )");

  // 就寝モードログ
  db.exec("CREATE TABLE IF NOT EXISTS sleep_logs (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER,\
    action TEXT NOT NULL,\
    result TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // 朝サマリー
  db.exec("CREATE TABLE IF NOT EXISTS morning_summaries (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER,\
    summary TEXT NOT NULL,\
    sent_via TEXT DEFAULT 'line',\
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // 週次レポート
  db.exec("CREATE TABLE IF NOT EXISTS weekly_reports (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    week_start DATE,\
    report TEXT NOT NULL,\
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // 音声メモ
  db.exec("CREATE TABLE IF NOT EXISTS voice_memos (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    text TEXT NOT NULL,\
    session_id INTEGER,\
    processed INTEGER DEFAULT 0,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

  // LINE メッセージログ
  db.exec("CREATE TABLE IF NOT EXISTS line_messages (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    direction TEXT NOT NULL,\
    user_id TEXT,\
    message TEXT NOT NULL,\
    reply TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP\
  )");

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // インデックス
  db.exec("CREATE INDEX IF NOT EXISTS idx_logs_session ON discussion_logs(session_id)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_logs_phase ON discussion_logs(session_id, phase, round_number)");
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
  // LINE Q&A 保留質問
  db.exec("CREATE TABLE IF NOT EXISTS pending_questions (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INTEGER,\
    source TEXT NOT NULL,\
    question TEXT NOT NULL,\
    context TEXT,\
    answer TEXT,\
    status TEXT DEFAULT 'pending',\
    engine_type TEXT,\
    engine_step TEXT,\
    timeout_at DATETIME,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    answered_at DATETIME,\
    FOREIGN KEY (session_id) REFERENCES sessions(id)\
  )");

    // インデックス
  db.exec("CREATE INDEX IF NOT EXISTS idx_logs_session ON discussion_logs(session_id)");
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_logs_phase ON discussion_logs(session_id, phase, round_number)"); } catch(e) {}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  db.exec("CREATE INDEX IF NOT EXISTS idx_memory_cat ON memory_db(category)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_memory_output ON memory_db(output_type)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_case_type ON case_library(output_type)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_case_tags ON case_library(tags)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_decisions_session ON decisions(session_id)");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  db.exec("CREATE INDEX IF NOT EXISTS idx_pending_status ON pending_questions(status)");

  // Feature 3: 優先度
  try { db.exec("ALTER TABLE sessions ADD COLUMN priority INTEGER DEFAULT 5"); } catch(e) {}
  try { db.exec("ALTER TABLE sessions ADD COLUMN deadline TEXT"); } catch(e) {}

  // Feature 5: 品質スコア
  db.exec("CREATE TABLE IF NOT EXISTS quality_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, output_queue_id INTEGER, session_id INTEGER, pattern TEXT, score_appeal INTEGER, score_differentiation INTEGER, score_format INTEGER, score_impact INTEGER, total_score INTEGER, improvement_points TEXT, scored_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

  // Feature 6: A/Bテスト
  db.exec("CREATE TABLE IF NOT EXISTS ab_tests (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id INTEGER, name TEXT, variant_a_queue_id INTEGER, variant_b_queue_id INTEGER, comparison_result TEXT, winner TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

  // Feature 7: 競合モニタリング
  db.exec("CREATE TABLE IF NOT EXISTS competitors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, url TEXT NOT NULL, check_type TEXT DEFAULT 'lp', last_content_hash TEXT, last_checked_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
  db.exec("CREATE TABLE IF NOT EXISTS competitor_changes (id INTEGER PRIMARY KEY AUTOINCREMENT, competitor_id INTEGER, change_summary TEXT, old_hash TEXT, new_hash TEXT, detected_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (competitor_id) REFERENCES competitors(id))");


  // Phase 4: 営業リスト管理
  db.exec(`
    CREATE TABLE IF NOT EXISTS sales_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      step_completed INTEGER DEFAULT 0,
      raw_list TEXT,
      final_list TEXT,
      excel_path TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT (datetime('now')),
      updated_at DATETIME DEFAULT (datetime('now'))
    )
  `);

  // Phase 4: リスト個別エントリ
  db.exec(`
    CREATE TABLE IF NOT EXISTS list_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      rank TEXT,
      company_name TEXT,
      individual_name TEXT,
      industry TEXT,
      area TEXT,
      phone TEXT,
      fax TEXT,
      email TEXT,
      address TEXT,
      website TEXT,
      employee_count TEXT,
      contact_person TEXT,
      approach_method TEXT,
      selection_reason TEXT,
      source_count TEXT,
      freshness_date TEXT,
      negative_check TEXT DEFAULT 'OK',
      contact_verified TEXT,
      priority_score TEXT,
      notes TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT (datetime('now'))
    )
  `);

  // Phase 5: 広告設計
  db.exec(`
    CREATE TABLE IF NOT EXISTS ad_designs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      step_completed INTEGER DEFAULT 0,
      design_doc TEXT,
      final_design TEXT,
      html_path TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT (datetime('now'))
    )
  `);

  // Phase 6: メディア最適化
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_optimizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      media_type TEXT,
      step_completed INTEGER DEFAULT 0,
      optimization_result TEXT,
      final_media TEXT,
      quality_score INTEGER,
      html_path TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT (datetime('now'))
    )
  `);

  // Phase 4/5/6: sessions テーブル拡張
  try { db.exec("ALTER TABLE sessions ADD COLUMN phase_plan TEXT DEFAULT '1,2,3,4,5,6'"); } catch(e) {}
  try { db.exec("ALTER TABLE sessions ADD COLUMN list_count INTEGER DEFAULT 100"); } catch(e) {}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return db;
}

module.exports = { initDatabase: initDatabase };
