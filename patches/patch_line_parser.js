#!/usr/bin/env node
/**
 * LINE コマンド解析ロジック修正パッチ
 * 修正1: コマンド解析優先順位の再設計（新規フェーズ1対応）
 * 修正2: 解析不能時のガイドメッセージ改善
 * 修正3: 承認・却下のIDなし操作を安全にする（複数プロジェクト時の確認）
 * 修正4: 全体状況確認（状態コマンド）の出力改善
 */

var fs = require('fs');
var SERVER_PATH = '/home/ubuntu/kabeuchi-system/server.js';

// バックアップ
var timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
fs.copyFileSync(SERVER_PATH, SERVER_PATH + '.bak_lineparser_' + timestamp);
console.log('[パッチ] バックアップ: ' + SERVER_PATH + '.bak_lineparser_' + timestamp);

var src = fs.readFileSync(SERVER_PATH, 'utf8');

// processLineCommand 関数を丸ごと置換
var startMarker = '// v2.0: LINE コマンド処理（プロジェクトID特定ルール準拠）\nasync function processLineCommand(text, userId) {';
var endMarker = "  return '使えるコマンド:\\n・新規 [テーマ]\\n・承認 / 却下\\n・状態\\n・PCモード / AWSモード';\n}";

var startIdx = src.indexOf(startMarker);
var endIdx = src.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  // フォールバック: 関数名だけで探す
  startIdx = src.indexOf('async function processLineCommand(text, userId) {');
  if (startIdx === -1) { console.error('[パッチ] processLineCommand が見つかりません'); process.exit(1); }
  // コメント行も含める
  var commentIdx = src.lastIndexOf('// v2.0:', startIdx);
  if (commentIdx !== -1 && startIdx - commentIdx < 100) startIdx = commentIdx;
  // 関数末尾を探す（「使えるコマンド」の後の閉じ括弧）
  endIdx = src.indexOf("return '使えるコマンド:", startIdx);
  if (endIdx === -1) { console.error('[パッチ] 関数末尾が見つかりません'); process.exit(1); }
  // その行の終わりの }; を見つける
  endIdx = src.indexOf('\n}', endIdx);
  if (endIdx === -1) { console.error('[パッチ] 閉じ括弧が見つかりません'); process.exit(1); }
  endIdx += 2; // '\n}' の後
} else {
  endIdx += endMarker.length;
}

var newFunction = `// v3.2: LINE コマンド処理（修正: 優先順位再設計、複数プロジェクト安全化）
async function processLineCommand(text, userId) {
  var t = text.trim();

  // ================================================================
  // ① 新規プロジェクト作成 + フェーズ1即時開始
  //    例:「新規フェーズ1 僕の強みを活かした法律分野を考えて」
  // ================================================================
  var createStartMatch = t.match(/^新規[\\s\\u3000]*フェーズ[\\s]*1[\\s\\u3000]+(.+)/);
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
        sendLine('[Phase1完了] ID:' + projId1 + ' ' + theme1 + '\\n承認 or フィードバックをお願いします');
      }).catch(function(e) { sendLine('[Phase1エラー] ID:' + projId1 + ' ' + e.message); });
    } else {
      // v2.0フォールバック
      try {
        var engine = require('./discussion-engine');
        engine.startDiscussion(theme1, theme1, sessId1);
      } catch(e2) {}
    }

    return 'プロジェクト作成 + Phase1開始\\nID:' + projId1 + ' ' + theme1 + '\\n\\nバックグラウンドで壁打ち実行中...';
  }

  // ================================================================
  // ② 新規プロジェクト作成のみ
  //    例: 「新規 交通事故LP」
  // ================================================================
  if (t.startsWith('新規 ') || t.startsWith('新規\\u3000') || /^新規[\\s\\u3000]+/.test(t)) {
    var themeName = t.replace(/^新規[\\s\\u3000]+/, '').trim();
    if (!themeName) return 'テーマ名を指定してください\\n例：新規 交通事故LP\\n例：新規フェーズ1 相続問題LP';
    var keyword = themeName.split(/[（(]/)[0].trim();
    var proj = db.prepare('INSERT INTO active_projects (name, keyword, current_phase, status) VALUES (?,?,1,?)').run(themeName, keyword, 'active');
    var projId = proj.lastInsertRowid;
    db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(projId, 'create', themeName);
    return 'プロジェクト作成完了\\nID:' + projId + ' ' + themeName + '\\n\\n「ID' + projId + ' フェーズ1開始」で壁打ち開始\\n「新規フェーズ1 テーマ」なら作成と同時に開始';
  }

  // ================================================================
  // ③ 既存プロジェクト操作（ID必須）
  //    例: 「ID2 フェーズ3開始」「ID2 状況」「ID2 承認」
  // ================================================================
  var idMatch = t.match(/^ID[\\s]*[:：]?[\\s]*(\\d+)[\\s]+(.+)/i);
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
      var rejectReason = cmd.replace(/^却下[\\s\\u3000]*/, '').trim() || '理由なし';
      var sessR = proj2.current_session_id ? db.prepare("SELECT * FROM sessions WHERE id = ?").get(proj2.current_session_id) : null;
      if (sessR) {
        db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(sessR.id, 'rejected', rejectReason);
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'rejected', rejectReason);
        return '却下しました（ID:' + targetId + ' ' + proj2.name + '）\\n理由: ' + rejectReason;
      }
      return 'ID:' + targetId + ' にアクティブなセッションがありません';
    }

    // --- フェーズ開始 ---
    if (/フェーズ[\\s]*(\\d+)[\\s]*(開始|スタート)/i.test(cmd)) {
      var phaseNum = parseInt(cmd.match(/(\\d+)/)[1]);
      db.prepare('UPDATE active_projects SET current_phase = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(phaseNum, targetId);
      db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(targetId, 'phase' + phaseNum + '_start', proj2.name);

      // Phase1-3: v3.1パイプライン
      if (phaseNum >= 1 && phaseNum <= 3 && proj2.current_session_id) {
        var topic = proj2.name;
        if (typeof phaseRunner !== 'undefined' && phaseRunner.runPhase) {
          phaseRunner.runPhase(proj2.current_session_id, phaseNum, topic).then(function() {
            sendLine('[Phase' + phaseNum + '完了] ID:' + targetId + ' ' + proj2.name + '\\n承認 or フィードバックをお願いします');
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
            sendLine('[Phase1完了] ID:' + targetId + ' ' + proj2.name + '\\n承認 or フィードバックをお願いします');
          }).catch(function(e) { sendLine('[Phase1エラー] ID:' + targetId + ' ' + e.message); });
          return proj2.name + ' Phase1 開始（バックグラウンド実行中）';
        }
      }

      return proj2.name + ' Phase' + phaseNum + ' 開始準備完了';
    }

    // --- 状況確認 ---
    if (/状況|進捗|ステータス/.test(cmd)) {
      var sessS = proj2.current_session_id ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(proj2.current_session_id) : null;
      var msg = 'ID:' + targetId + ' ' + proj2.name + '\\nPhase' + (proj2.current_phase || '?');
      if (sessS) msg += ' Step' + (sessS.current_round || 0) + '/8 (' + sessS.status + ')';
      // v3.1フェーズ結果があれば表示
      try {
        var phaseResult = db.prepare('SELECT phase, status FROM phase_results WHERE session_id = ? ORDER BY phase DESC LIMIT 1').get(proj2.current_session_id || 0);
        if (phaseResult) msg += '\\nv3.1: Phase' + phaseResult.phase + ' ' + phaseResult.status;
      } catch(e) {}
      return msg;
    }

    // --- FB ---
    if (cmd.startsWith('FB ') || cmd.startsWith('FB\\u3000')) {
      var fb = cmd.replace(/^FB[\\s\\u3000]+/, '').trim();
      prefLearner.addPreference('feedback', 'project_' + targetId, fb, null, 'line');
      db.prepare('INSERT INTO operation_logs (project_id, action, details, source) VALUES (?,?,?,?)').run(targetId, 'feedback', fb, 'line');
      return 'FB保存しました（ID:' + targetId + ' ' + proj2.name + '）';
    }

    // --- 履歴 ---
    if (/履歴/.test(cmd)) {
      var logs = db.prepare('SELECT * FROM operation_logs WHERE project_id = ? ORDER BY created_at DESC LIMIT 10').all(targetId);
      if (logs.length === 0) return proj2.name + 'の操作履歴なし';
      return 'ID:' + targetId + ' ' + proj2.name + ' 直近履歴\\n' + logs.map(function(l) { return l.action + ': ' + (l.details || '').substring(0, 30); }).join('\\n');
    }

    // --- まとめ ---
    if (/まとめ/.test(cmd)) {
      var sLogs = db.prepare('SELECT round_number, role, content FROM discussion_logs WHERE session_id = ? ORDER BY round_number ASC').all(proj2.current_session_id || 0);
      if (sLogs.length === 0) return proj2.name + ': ディスカッションログなし';
      var summary = 'ID:' + targetId + ' ' + proj2.name + ' まとめ\\n';
      sLogs.forEach(function(l) {
        summary += 'Step' + l.round_number + '(' + l.role + '): ' + (l.content || '').substring(0, 80) + '\\n';
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

    return 'ID:' + targetId + ' ' + proj2.name + ': コマンド「' + cmd + '」を認識できませんでした\\n\\n使えるコマンド:\\n  ID' + targetId + ' フェーズN開始\\n  ID' + targetId + ' 状況\\n  ID' + targetId + ' 承認 / 却下 [理由]\\n  ID' + targetId + ' FB [フィードバック]\\n  ID' + targetId + ' 履歴 / まとめ';
  }

  // ================================================================
  // ④ 承認・却下（IDなし → 安全化: 複数プロジェクト時は確認）
  // ================================================================
  if (/^(承認|OK|ok)$/i.test(t)) {
    var activeForApproval = db.prepare("SELECT ap.*, s.status as sess_status FROM active_projects ap LEFT JOIN sessions s ON ap.current_session_id = s.id WHERE ap.status = 'active'").all();

    // 複数プロジェクトがアクティブな場合 → 確認を返す
    if (activeForApproval.length > 1) {
      var confirmMsg = '現在 ' + activeForApproval.length + '件のプロジェクトが進行中です。\\nどのプロジェクトを承認しますか？\\n';
      activeForApproval.forEach(function(p) {
        confirmMsg += '\\n  ID' + p.id + ' 承認 → ' + p.name;
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
    var rejectText = t.replace(/^却下[\\s\\u3000]*/, '').trim() || '理由なし';
    var activeForReject = db.prepare("SELECT * FROM active_projects WHERE status = 'active'").all();

    if (activeForReject.length > 1) {
      var rejectConfirm = '現在 ' + activeForReject.length + '件のプロジェクトが進行中です。\\nどのプロジェクトを却下しますか？\\n';
      activeForReject.forEach(function(p) {
        rejectConfirm += '\\n  ID' + p.id + ' 却下 ' + rejectText + ' → ' + p.name;
      });
      return rejectConfirm;
    }

    if (activeForReject.length === 1) {
      var rp = activeForReject[0];
      if (rp.current_session_id) {
        db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(rp.current_session_id, 'rejected', rejectText);
        db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(rp.id, 'rejected', rejectText);
        return '却下しました（ID:' + rp.id + ' ' + rp.name + '）\\n理由: ' + rejectText;
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
      return 'プロジェクト状況\\n\\n進行中プロジェクトなし\\n\\n「新規 [テーマ]」で新しいプロジェクトを作成できます';
    }

    var statusMsg = 'プロジェクト状況\\n';
    allProjects.forEach(function(p) {
      statusMsg += '\\nID' + p.id + ' ' + p.name;
      var sess = p.current_session_id ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(p.current_session_id) : null;

      // フェーズ状態の詳細表示
      statusMsg += '\\n  フェーズ' + (p.current_phase || 1);

      // 承認待ち判定
      var hasPendingDecision = sess && sess.status === 'active';
      var hasPhaseResult = false;
      try {
        var pr = db.prepare("SELECT * FROM phase_results WHERE session_id = ? AND phase = ? ORDER BY id DESC LIMIT 1").get(p.current_session_id || 0, p.current_phase || 1);
        if (pr && pr.status === 'completed') { hasPhaseResult = true; hasPendingDecision = true; }
      } catch(e) {}

      if (p.status === 'sleeping') {
        statusMsg += ' 休眠中\\n  → 「ID' + p.id + ' フェーズ' + (p.current_phase || 1) + '開始」で再開';
      } else if (hasPhaseResult) {
        statusMsg += ' 承認待ち\\n  → 「ID' + p.id + ' 承認」で次へ進みます';
      } else if (sess && sess.status === 'active' && (sess.current_round || 0) > 0) {
        statusMsg += ' 実行中（Step' + (sess.current_round || 0) + '）';
      } else {
        statusMsg += ' 未着手\\n  → 「ID' + p.id + ' フェーズ' + (p.current_phase || 1) + '開始」で開始できます';
      }
      statusMsg += '\\n';
    });

    if (pendingOQ.length > 0) {
      statusMsg += '\\n承認待ちアウトプット: ' + pendingOQ.length + '件';
    }

    return statusMsg.trim();
  }

  // ================================================================
  // ⑥ 学習内容確認
  // ================================================================
  if (/^学習内容|^フィードバック一覧|^FB一覧/.test(t)) {
    var memories = db.prepare('SELECT category, key, value, confidence FROM memory_db ORDER BY confidence DESC LIMIT 15').all();
    if (memories.length === 0) return '学習データなし';
    return '学習内容（上位15件）\\n' + memories.map(function(m) { return m.category + '/' + m.key + ': ' + m.value.substring(0, 30) + ' (' + m.confidence.toFixed(2) + ')'; }).join('\\n');
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
    return 'フェーズ構成:\\nPhase1: アイデア磨き込み（9エージェント並列）\\nPhase2: 訴求磨き込み（9エージェント並列）\\nPhase3: コンテンツ生成（9エージェント+品質評価+自動承認）\\nPhase4: リスト生成\\nPhase5: 広告デザイン\\nPhase6: メディア最適化\\n\\n例: ID1 フェーズ1開始\\n例: 新規フェーズ1 交通事故LP';
  }

  // ================================================================
  // API状態
  // ================================================================
  if (/^API状態|^API確認|^api.?status/i.test(t)) {
    var apiStatus = 'API状態確認\\n';
    try {
      var anth = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      await anth.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 10, messages: [{ role: 'user', content: 'test' }] });
      apiStatus += 'Claude: OK\\n';
    } catch(ae) { apiStatus += 'Claude: NG (' + ae.message.substring(0, 50) + ')\\n'; }
    try {
      var oai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      await oai.chat.completions.create({ model: 'gpt-4o-mini', max_tokens: 10, messages: [{ role: 'user', content: 'test' }] });
      apiStatus += 'OpenAI: OK\\n';
    } catch(oe) { apiStatus += 'OpenAI: NG (' + oe.message.substring(0, 50) + ')\\n'; }
    apiStatus += 'LINE: ' + (process.env.LINE_CHANNEL_ACCESS_TOKEN ? '設定済' : '未設定') + '\\n';
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
      var ccMsg = 'Claude Code状態\\n';
      ccMsg += statusResult.running ? '実行中: ' + (statusResult.currentTask ? statusResult.currentTask.instruction : '') + '\\n' : '待機中\\n';
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
    var sMsg = 'プロジェクト状況\\n';
    allP.forEach(function(p) {
      sMsg += '\\nID' + p.id + ' ' + p.name + ' (Phase' + p.current_phase + ' ' + p.status + ')';
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
  return 'コマンドが認識できませんでした。\\n\\n【新規プロジェクト】\\n  新規 [テーマ]\\n  新規フェーズ1 [テーマ]  ← 作成+Phase1即時開始\\n\\n【既存プロジェクト操作】（IDを先頭につける）\\n  ID2 状況\\n  ID2 フェーズ3開始\\n  ID2 承認\\n  ID2 却下 [理由]\\n  ID2 FB [フィードバック]\\n\\n【全体確認】\\n  状態 / 全部まとめ\\n  学習内容';
}`;

var before = src.substring(0, startIdx);
var after = src.substring(endIdx);
var patched = before + newFunction + after;

fs.writeFileSync(SERVER_PATH, patched, 'utf8');
console.log('[パッチ] processLineCommand を置換完了');
console.log('[パッチ] 行数: ' + patched.split('\\n').length);
