// list-generator.js
// Phase 4: 営業リスト生成エンジン（11ステップ）
var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');
var ExcelJS = require('exceljs');
var path = require('path');
var fs = require('fs');

var PHASE4_STEPS = [
  { num: 1, ai: 'claude', label: 'マルチソース収集', desc: 'GoogleMaps/国税庁/iタウンページ/SNS/求人サイトからリスト収集' },
  { num: 2, ai: 'claude', label: '鮮度チェック', desc: 'HP更新日/口コミ/SNS投稿日で鮮度を判定' },
  { num: 3, ai: 'claude', label: 'ネガティブチェック', desc: '廃業/悪評/競合クライアント/同業を除外' },
  { num: 4, ai: 'claude', label: '連絡先生存確認', desc: '電話/FAX/メール有効性を確認' },
  { num: 5, ai: 'chatgpt', label: 'リスト補完', desc: '見落としソース/セグメントをChatGPTで補完' },
  { num: 6, ai: 'claude', label: 'HP個別精査', desc: '1件ずつHP巡回→採用/保留/除外判定' },
  { num: 7, ai: 'chatgpt', label: '精査結果批判', desc: 'Claudeの判定に対しChatGPTが異議' },
  { num: 8, ai: 'claude', label: 'リスト批判', desc: '穴/無駄/精度低い部分を指摘' },
  { num: 9, ai: 'chatgpt', label: 'リスト批判（競合視点）', desc: '競合視点でリストの質を批判' },
  { num: 10, ai: 'user', label: 'サンプルチェック', desc: 'Aランク上位20件→LINE送信→前田さん確認' },
  { num: 11, ai: 'claude', label: '統合・最終リスト確定', desc: 'A/B/Cランク付きJSON→Excel生成→LINE通知' }
];

function ListGenerator(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA;
  this.sendLine = sendLineFn;
  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Phase1結論を取得
ListGenerator.prototype._getPhase1Context = function(session) {
  var sections = ['target_definition', 'appeal_points', 'catchcopy', 'output_plan', 'research_data'];
  var ctx = '';
  for (var i = 0; i < sections.length; i++) {
    if (session[sections[i]]) {
      ctx += '【' + sections[i] + '】\n' + session[sections[i]] + '\n\n';
    }
  }
  // Step8結果も取得
  var step8 = this.db.prepare("SELECT content FROM discussion_logs WHERE session_id = ? AND phase = 1 AND round_number = 8 ORDER BY id DESC LIMIT 1").get(session.id);
  if (step8) {
    ctx += '【Phase1最終統合】\n' + step8.content + '\n\n';
  }
  return ctx;
};

// メモリから関連情報取得
ListGenerator.prototype._getMemory = function(sessionId) {
  var rows = this.db.prepare("SELECT category, key, value FROM memory_db WHERE source_session_id = ? OR category IN ('general', 'preference') ORDER BY updated_at DESC LIMIT 30").all(sessionId);
  return rows.map(function(r) { return r.category + '/' + r.key + ': ' + r.value; }).join('\n');
};

// ステップ履歴取得
ListGenerator.prototype._getHistory = function(sessionId) {
  var logs = this.db.prepare("SELECT round_number, role_label, content FROM discussion_logs WHERE session_id = ? AND phase = 4 ORDER BY round_number, id").all(sessionId);
  return logs.map(function(l) { return 'Step' + l.round_number + ' [' + l.role_label + ']:\n' + l.content; }).join('\n\n---\n\n');
};

// ログ保存
ListGenerator.prototype._saveLog = function(sessionId, stepNum, role, roleLabel, content, isSleep) {
  this.db.prepare("INSERT INTO discussion_logs (session_id, phase, round_number, round_theme, role, role_label, content, is_sleep_mode, created_at) VALUES (?, 4, ?, ?, ?, ?, ?, ?, datetime('now'))").run(sessionId, stepNum, PHASE4_STEPS[stepNum - 1].label, role, roleLabel, content, isSleep ? 1 : 0);
};

// sales_lists レコード取得or作成
ListGenerator.prototype._getOrCreateSalesList = function(sessionId) {
  var existing = this.db.prepare("SELECT * FROM sales_lists WHERE session_id = ? ORDER BY id DESC LIMIT 1").get(sessionId);
  if (existing) return existing;
  this.db.prepare("INSERT INTO sales_lists (session_id, status, created_at, updated_at) VALUES (?, 'in_progress', datetime('now'), datetime('now'))").run(sessionId);
  return this.db.prepare("SELECT * FROM sales_lists WHERE session_id = ? ORDER BY id DESC LIMIT 1").get(sessionId);
};

// Claude API呼び出し
ListGenerator.prototype._callClaude = function(system, user) {
  var self = this;
  var maxRetries = 3;
  function attempt(retryCount) {
    return self.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 4000,
      system: system,
      messages: [{ role: 'user', content: user }]
    }).then(function(r) { return r.content[0].text; })
    .catch(function(err) {
      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {
        console.log('[Claude] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');
        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });
      }
      if (self.sendLine) self.sendLine('[Claude API] 3回失敗: ' + err.message + ' 次のステップへ進みます。');
      throw err;
    });
  }
  return attempt(0);
};

// ChatGPT API呼び出し
ListGenerator.prototype._callChatGPT = function(system, user) {
  var self = this;
  var maxRetries = 3;
  function attempt(retryCount) {
    return self.openai.chat.completions.create({
      model: 'gpt-5.4', max_completion_tokens: 4000,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
    }).then(function(r) { return r.choices[0].message.content; })
    .catch(function(err) {
      if (retryCount < maxRetries && (err.status === 429 || (err.message && err.message.indexOf('rate') >= 0))) {
        console.log('[ChatGPT] レート制限 リトライ ' + (retryCount+1) + '/' + maxRetries + ' 30秒待機');
        return new Promise(function(resolve) { setTimeout(resolve, 30000); }).then(function() { return attempt(retryCount + 1); });
      }
      if (self.sendLine) self.sendLine('[ChatGPT API] 3回失敗: ' + err.message + ' 次のステップへ進みます。');
      throw err;
    });
  }
  return attempt(0);
};

// 個別ステップ実行
ListGenerator.prototype.runStep = function(sessionId, stepNum, isSleep) {
  var self = this;
  var session = self.db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId);
  if (!session) return Promise.reject(new Error('セッション不在: ' + sessionId));

  var phase1Ctx = self._getPhase1Context(session);
  var history = self._getHistory(sessionId);
  var memory = self._getMemory(sessionId);
  var listCount = session.list_count || 100;
  var stepDef = PHASE4_STEPS[stepNum - 1];

  console.log('[Phase4] Step' + stepNum + ' 開始: ' + stepDef.label + ' (session=' + sessionId + ')');

  var systemBase = '你は前田法律事務所の営業リスト作成AIです。\n' +
    '【Phase1結論】\n' + phase1Ctx + '\n' +
    '【目標件数】' + listCount + '件\n' +
    '【重要ルール】ターゲット条件に合わない対象は件数不足でも絶対に入れない。精度優先。\n' +
    '【記憶】\n' + memory;

  switch (stepNum) {
    case 1:
      return self._callClaude(
        systemBase,
        '以下のターゲット条件に基づき、営業リストを作成してください。\n' +
        '情報源: GoogleMaps, 国税庁法人番号, iタウンページ, SNS(Instagram/X/Facebook), 求人サイト(Indeed/マイナビ)\n' +
        '各候補について: 会社名/個人名, 業種, エリア, 電話, FAX, メール, 住所, HP, 従業員数, 担当者名, アプローチ方法(DM/FAX/電話/メール), 採用理由\n' +
        '目標' + listCount + '件以上の候補をJSON配列で出力してください。\n' +
        '出力形式: { "candidates": [...], "sources_used": [...], "coverage_notes": "..." }'
      ).then(function(result) {
        self._saveLog(sessionId, 1, 'claude_a', 'Claude（マルチソース収集）', result, isSleep);
        self._updateStep(sessionId, 1);
        return result;
      });

    case 2:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        'Step1で収集したリストの各候補について鮮度チェックを行ってください。\n' +
        '確認項目: HP最終更新日, Googleレビュー最新日, SNS最終投稿日, 求人掲載状況\n' +
        '各候補に freshness_date(最終活動日) と freshness_score(A/B/C) を付与。\n' +
        'Cランク(1年以上更新なし)は除外候補としてマーク。\n' +
        'JSON形式で出力: { "checked_list": [...], "removed_count": N, "notes": "..." }'
      ).then(function(result) {
        self._saveLog(sessionId, 2, 'claude_a', 'Claude（鮮度チェック）', result, isSleep);
        self._updateStep(sessionId, 2);
        return result;
      });

    case 3:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        'リストのネガティブチェックを実施してください。\n' +
        '確認項目:\n' +
        '・廃業/閉鎖の兆候（HP消滅, 電話不通, 登記変更）\n' +
        '・悪評/トラブル（Googleレビュー低評価, 訴訟歴, SNS炎上）\n' +
        '・競合クライアント（既に他の法律事務所と契約中の兆候）\n' +
        '・同業除外（法律事務所, 弁護士事務所は除外）\n' +
        '各候補に negative_check(OK/NG/要注意) を付与。\n' +
        'JSON形式: { "checked_list": [...], "ng_removed": N, "warning_count": N }'
      ).then(function(result) {
        self._saveLog(sessionId, 3, 'claude_a', 'Claude（ネガティブチェック）', result, isSleep);
        self._updateStep(sessionId, 3);
        return result;
      });

    case 4:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        'リストの連絡先生存確認を行ってください。\n' +
        '確認項目:\n' +
        '・電話番号: フォーマット正当性, エリアコード一致\n' +
        '・FAX: 番号有効性\n' +
        '・メール: ドメイン存在, MXレコード\n' +
        '・HP: アクセス可能性, SSL有無\n' +
        '各候補に contact_verified(○/△/×) を付与。\n' +
        'JSON形式: { "verified_list": [...], "invalid_removed": N, "partial_count": N }'
      ).then(function(result) {
        self._saveLog(sessionId, 4, 'claude_a', 'Claude（連絡先生存確認）', result, isSleep);
        self._updateStep(sessionId, 4);
        return result;
      });

    case 5:
      return self._callChatGPT(
        systemBase + '\n【前ステップの結果】\n' + history,
        'Claudeが作成した営業リストを確認し、以下の視点で補完してください。\n' +
        '1. 見落としている情報源はないか？（業界特有のDB, 協会名簿, 展示会出展者等）\n' +
        '2. 見落としているセグメントはないか？（関連業種, 周辺エリア）\n' +
        '3. 追加すべき候補があれば具体的にリストアップ\n' +
        '4. 既存リストの精度向上のための提案\n' +
        'JSON形式: { "additional_candidates": [...], "missed_sources": [...], "segment_suggestions": [...], "accuracy_tips": [...] }'
      ).then(function(result) {
        self._saveLog(sessionId, 5, 'chatgpt', 'ChatGPT（リスト補完）', result, isSleep);
        self._updateStep(sessionId, 5);
        return result;
      });

    case 6:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        'リストの各候補について、HPを個別精査してください。\n' +
        '各候補のHPを確認し、以下を判定:\n' +
        '・採用: ターゲット条件に完全一致、アプローチ価値あり\n' +
        '・保留: 条件に部分一致、追加調査が必要\n' +
        '・除外: 条件不一致、アプローチ不適切\n' +
        '各判定に理由を付与。\n' +
        'JSON形式: { "reviewed_list": [{ ...candidate, "verdict": "採用/保留/除外", "verdict_reason": "..." }], "summary": { "adopted": N, "pending": N, "excluded": N } }'
      ).then(function(result) {
        self._saveLog(sessionId, 6, 'claude_a', 'Claude（HP個別精査）', result, isSleep);
        self._updateStep(sessionId, 6);
        return result;
      });

    case 7:
      return self._callChatGPT(
        systemBase + '\n【前ステップの結果】\n' + history,
        'Claudeの個別精査結果を批判的に検証してください。\n' +
        '以下の視点で異議を唱えてください:\n' +
        '1. 採用判定が甘すぎる候補はないか？\n' +
        '2. 除外判定が厳しすぎる候補はないか？\n' +
        '3. 保留のまま放置すべきでない候補はないか？\n' +
        '4. 判定理由に論理的欠陥はないか？\n' +
        'JSON形式: { "objections": [{ "candidate": "...", "original_verdict": "...", "suggested_verdict": "...", "reason": "..." }], "overall_assessment": "..." }'
      ).then(function(result) {
        self._saveLog(sessionId, 7, 'chatgpt', 'ChatGPT（精査結果批判）', result, isSleep);
        self._updateStep(sessionId, 7);
        return result;
      });

    case 8:
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        '現在のリストを批判的に分析してください。\n' +
        '1. 穴: カバーできていないセグメント/エリア/業種\n' +
        '2. 無駄: 重複/低優先度で除外すべき候補\n' +
        '3. 精度: ランク付けの妥当性、情報の正確性\n' +
        '4. 件数: 目標' + listCount + '件に対する達成度\n' +
        '5. アプローチ方法の適切性\n' +
        'JSON形式: { "gaps": [...], "waste": [...], "accuracy_issues": [...], "count_status": { "current": N, "target": ' + listCount + ', "gap": N }, "recommendations": [...] }'
      ).then(function(result) {
        self._saveLog(sessionId, 8, 'claude_b', 'Claude（リスト批判）', result, isSleep);
        self._updateStep(sessionId, 8);
        return result;
      });

    case 9:
      return self._callChatGPT(
        systemBase + '\n【前ステップの結果】\n' + history,
        '営業リストを競合視点で批判してください。\n' +
        '1. 競合（他の法律事務所）も同じターゲットを狙っていないか？\n' +
        '2. レッドオーシャンのセグメントを避け、ブルーオーシャンはないか？\n' +
        '3. アプローチタイミングや方法で差別化できるポイント\n' +
        '4. 競合が見落としている隠れたターゲット層\n' +
        'JSON形式: { "competitive_risks": [...], "blue_ocean_segments": [...], "differentiation_tips": [...], "hidden_targets": [...] }'
      ).then(function(result) {
        self._saveLog(sessionId, 9, 'chatgpt', 'ChatGPT（リスト批判・競合視点）', result, isSleep);
        self._updateStep(sessionId, 9);
        return result;
      });

    case 10:
      // サンプルチェック（前田さん確認）
      if (isSleep) {
        // 就寝モード時はスキップ
        var skipMsg = '【就寝モード】サンプルチェックをスキップし、全件で続行します。\n\n【法的根拠の引用ルール】法的根拠は国の機関（法務省・厚労省・国税庁・裁判所等）、判例DB、行政機関公式サイト、弁護士公式サイト、法律学術論文、日弁連公式見解のみ引用可。事業会社・行政書士・司法書士・まとめサイト・Wikipedia使用禁止。出典明記。裏取り不可は「未確認」と明示。';
        self._saveLog(sessionId, 10, 'system', 'システム（就寝モード）', skipMsg, true);
        self._updateStep(sessionId, 10);
        return Promise.resolve(skipMsg);
      }
      // Aランク上位20件を抽出してLINE送信
      return self._callClaude(
        systemBase + '\n【前ステップの結果】\n' + history,
        '全ステップの結果を踏まえ、Aランク（最優先アプローチ対象）の上位20件を選定してください。\n' +
        '各候補について: 会社名, 業種, エリア, アプローチ方法, 採用理由（1行）\n' +
        '簡潔なリスト形式で出力してください（JSON不要、番号付きリスト）。'
      ).then(function(sampleList) {
        self._saveLog(sessionId, 10, 'claude_a', 'Claude（サンプル選定）', sampleList, false);
        // LINE送信して確認を待つ
        var question = '【Phase4 サンプルチェック】\nセッション' + sessionId + ': ' + session.title + '\n\nAランク上位20件:\n' + sampleList + '\n\n各候補について「OK」「除外」「保留」でお答えください。\nまたは「全部OK」「全部除外して再作成」でも構いません。';
        return self.lineQA.askUserViaLine({ question: question, engineType: 'list_sample_check', engineStep: 10, sessionId: sessionId, pushLineFn: self.sendLine, timeoutMs: 60 * 60000 });
      }).then(function(answer) {
        var feedback = answer || '確認タイムアウト - 全件OKとして続行';
        self._saveLog(sessionId, 10, 'user', '前田さん（サンプル確認）', feedback, false);
        // フィードバックをmemory_dbに保存
        self.db.prepare("INSERT OR REPLACE INTO memory_db (category, subcategory, key, value, confidence, source_session_id, source_type, updated_at) VALUES ('list_feedback', 'sample_check', ?, ?, 0.9, ?, 'user_feedback', datetime('now'))").run('session_' + sessionId, feedback, sessionId);
        self._updateStep(sessionId, 10);
        return feedback;
      });

    case 11:
      // 最終統合 + Excel生成
      return self._callClaude(
        systemBase + '\n【全ステップの結果】\n' + history,
        '全10ステップの分析・批判・フィードバックを統合し、最終営業リストを確定してください。\n\n' +
        '以下の形式でJSON出力してください:\n' +
        '{\n' +
        '  "final_list": [\n' +
        '    {\n' +
        '      "rank": "A/B/C",\n' +
        '      "company_name": "",\n' +
        '      "individual_name": "",\n' +
        '      "industry": "",\n' +
        '      "area": "",\n' +
        '      "phone": "",\n' +
        '      "fax": "",\n' +
        '      "email": "",\n' +
        '      "address": "",\n' +
        '      "website": "",\n' +
        '      "employee_count": "",\n' +
        '      "contact_person": "",\n' +
        '      "approach_method": "DM/FAX/電話/メール",\n' +
        '      "selection_reason": "",\n' +
        '      "source_count": "",\n' +
        '      "freshness_date": "",\n' +
        '      "negative_check": "OK/要注意",\n' +
        '      "contact_verified": "○/△",\n' +
        '      "priority_score": "1-100",\n' +
        '      "notes": ""\n' +
        '    }\n' +
        '  ],\n' +
        '  "summary": { "a_count": N, "b_count": N, "c_count": N, "total": N }\n' +
        '}'
      ).then(function(result) {
        self._saveLog(sessionId, 11, 'claude_a', 'Claude（最終統合）', result, isSleep);

        // JSONパース試行
        var listData;
        try {
          var jsonMatch = result.match(/\{[\s\S]*"final_list"[\s\S]*\}/);
          listData = jsonMatch ? JSON.parse(jsonMatch[0]) : { final_list: [], summary: {} };
        } catch(e) {
          listData = { final_list: [], summary: { parse_error: e.message } };
        }

        // DBにリストエントリ保存
        var entries = listData.final_list || [];
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          self.db.prepare("INSERT INTO list_entries (session_id, rank, company_name, individual_name, industry, area, phone, fax, email, address, website, employee_count, contact_person, approach_method, selection_reason, source_count, freshness_date, negative_check, contact_verified, priority_score, notes, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, datetime('now'))").run(
            sessionId, e.rank || 'C', e.company_name || '', e.individual_name || '',
            e.industry || '', e.area || '', e.phone || '', e.fax || '',
            e.email || '', e.address || '', e.website || '', e.employee_count || '',
            e.contact_person || '', e.approach_method || '', e.selection_reason || '',
            e.source_count || '', e.freshness_date || '', e.negative_check || 'OK',
            e.contact_verified || '', e.priority_score || '', e.notes || ''
          );
        }

        // sales_list更新
        self.db.prepare("UPDATE sales_lists SET step_completed = 11, final_list = ?, status = 'completed', updated_at = datetime('now') WHERE session_id = ?").run(JSON.stringify(listData), sessionId);

        // Excel生成
        return self.generateExcel(sessionId, listData).then(function(excelPath) {
          self._updateStep(sessionId, 11);

          // LINE通知
          var summary = listData.summary || {};
          var msg = '【Phase4完了】営業リスト確定\n' +
            'セッション: ' + session.title + '\n' +
            'Aランク: ' + (summary.a_count || 0) + '件\n' +
            'Bランク: ' + (summary.b_count || 0) + '件\n' +
            'Cランク: ' + (summary.c_count || 0) + '件\n' +
            '合計: ' + (summary.total || entries.length) + '件\n\n' +
            'Excel: https://176-32-87-118.sslip.io/' + excelPath.replace('/home/ubuntu/kabeuchi-system/public/', '');
          self.sendLine(msg);

          return result;
        });
      });

    default:
      return Promise.reject(new Error('無効なステップ番号: ' + stepNum));
  }
};

// ステップ完了更新
ListGenerator.prototype._updateStep = function(sessionId, stepNum) {
  this.db.prepare("UPDATE sales_lists SET step_completed = ?, updated_at = datetime('now') WHERE session_id = ?").run(stepNum, sessionId);
  this.db.prepare("UPDATE sessions SET current_round = ?, phase = 4, status = 'active', updated_at = datetime('now') WHERE id = ?").run(stepNum, sessionId);
};

// Excel生成
ListGenerator.prototype.generateExcel = function(sessionId, listData) {
  var self = this;
  return new Promise(function(resolve, reject) {
    try {
      var workbook = new ExcelJS.Workbook();
      workbook.creator = '前田法律事務所 AI壁打ちシステム';

      var entries = listData.final_list || [];
      var ranks = { A: [], B: [], C: [] };
      for (var i = 0; i < entries.length; i++) {
        var rank = (entries[i].rank || 'C').toUpperCase();
        if (!ranks[rank]) ranks[rank] = [];
        ranks[rank].push(entries[i]);
      }

      // サマリーシート
      var summarySheet = workbook.addWorksheet('サマリー');
      summarySheet.columns = [
        { header: '項目', key: 'item', width: 20 },
        { header: '件数', key: 'count', width: 10 }
      ];
      summarySheet.addRow({ item: 'Aランク（最優先）', count: ranks.A.length });
      summarySheet.addRow({ item: 'Bランク（標準）', count: ranks.B.length });
      summarySheet.addRow({ item: 'Cランク（補欠）', count: ranks.C.length });
      summarySheet.addRow({ item: '合計', count: entries.length });
      summarySheet.getRow(1).font = { bold: true };

      // ランク別シート作成
      var headers = [
        { header: 'No.', key: 'no', width: 6 },
        { header: '会社名', key: 'company_name', width: 25 },
        { header: '個人名', key: 'individual_name', width: 15 },
        { header: '業種', key: 'industry', width: 15 },
        { header: 'エリア', key: 'area', width: 12 },
        { header: '電話', key: 'phone', width: 15 },
        { header: 'FAX', key: 'fax', width: 15 },
        { header: 'メール', key: 'email', width: 25 },
        { header: '住所', key: 'address', width: 30 },
        { header: 'HP', key: 'website', width: 25 },
        { header: '従業員数', key: 'employee_count', width: 10 },
        { header: '担当者', key: 'contact_person', width: 12 },
        { header: 'アプローチ', key: 'approach_method', width: 12 },
        { header: '採用理由', key: 'selection_reason', width: 30 },
        { header: 'ソース数', key: 'source_count', width: 8 },
        { header: '鮮度', key: 'freshness_date', width: 12 },
        { header: 'ネガチェック', key: 'negative_check', width: 10 },
        { header: '連絡先確認', key: 'contact_verified', width: 10 },
        { header: '優先度', key: 'priority_score', width: 8 },
        { header: '備考', key: 'notes', width: 20 }
      ];

      var rankNames = { A: 'Aランク', B: 'Bランク', C: 'Cランク' };
      var rankKeys = ['A', 'B', 'C'];
      for (var r = 0; r < rankKeys.length; r++) {
        var rk = rankKeys[r];
        var sheet = workbook.addWorksheet(rankNames[rk]);
        sheet.columns = headers;
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rk === 'A' ? 'FFFFCCCC' : rk === 'B' ? 'FFFFFFCC' : 'FFCCFFCC' } };

        var items = ranks[rk] || [];
        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          item.no = j + 1;
          sheet.addRow(item);
        }
      }

      // ファイル保存
      var outputDir = '/home/ubuntu/kabeuchi-system/public/outputs';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      var fileName = 'sales_list_' + sessionId + '_' + Date.now() + '.xlsx';
      var filePath = path.join(outputDir, fileName);

      workbook.xlsx.writeFile(filePath).then(function() {
        // DB更新
        self.db.prepare("UPDATE sales_lists SET excel_path = ?, updated_at = datetime('now') WHERE session_id = ?").run(filePath, sessionId);
        console.log('[Phase4] Excel生成完了: ' + filePath);
        resolve(filePath);
      }).catch(function(err) {
        console.error('[Phase4] Excel生成エラー:', err.message);
        reject(err);
      });
    } catch(err) {
      console.error('[Phase4] Excel生成エラー:', err.message);
      reject(err);
    }
  });
};

// 全ステップ一括実行（途中再開対応）
ListGenerator.prototype.generateFull = function(sessionId, isSleep) {
  var self = this;
  var salesList = self._getOrCreateSalesList(sessionId);
  var startStep = (salesList.step_completed || 0) + 1;

  console.log('[Phase4] 全ステップ実行開始 (session=' + sessionId + ', startStep=' + startStep + ')');
  self.sendLine('【Phase4開始】営業リスト作成\nステップ' + startStep + '/11から実行します');

  // 更新: phase=4
  self.db.prepare("UPDATE sessions SET phase = 4, status = 'active', updated_at = datetime('now') WHERE id = ?").run(sessionId);

  var chain = Promise.resolve();
  for (var s = startStep; s <= 11; s++) {
    (function(step) {
      chain = chain.then(function() {
        return self.runStep(sessionId, step, isSleep);
      }).then(function(result) {
        if (step < 11) {
          self.sendLine('[Phase4] Step' + step + '/11 完了: ' + PHASE4_STEPS[step - 1].label);
        }
        return result;
      });
    })(s);
  }

  return chain.then(function(result) {
    console.log('[Phase4] 全ステップ完了 (session=' + sessionId + ')');
    return result;
  }).catch(function(err) {
    console.error('[Phase4] エラー (step中断):', err.message);
    self.sendLine('【Phase4エラー】' + err.message + '\nステップ' + (salesList.step_completed + 1) + 'で中断しました。「フェーズ4」で再開できます。');
    throw err;
  });
};

module.exports = ListGenerator;
