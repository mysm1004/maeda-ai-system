var fs = require("fs");
var serverFile = "/home/ubuntu/kabeuchi-system/src/server.js";
var code = fs.readFileSync(serverFile, "utf8");

// Replace runSleepMode function
var oldSleep = `async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
  var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
  if (!latest) { console.log('[就寝モード] アクティブなセッションなし'); return; }

  db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(latest.id, 'sleep_start');

  // 残りラウンドを自動実行
  var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
  var maxRounds = Math.min(startRound + 2, 7); // 最大3ラウンドか6ラウンド目まで

  for (var r = startRound; r < maxRounds; r++) {
    try {
      await engine.runRound(latest.id, latest.topic, r, latest.research_data, true);
      console.log('[就寝モード] ラウンド ' + r + ' 完了');
    } catch (err) {
      console.error('[就寝モード] ラウンド' + r + 'エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'error_round_' + r, err.message);
    }
  }

  // 6ラウンド完了していたら最終統合も実行
  var currentRound = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  if (currentRound && currentRound.mr >= 6) {
    try {
      await engine.generateFinalSummary(latest.id);
      console.log('[就寝モード] 最終統合完了');
    } catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }
  }

  db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'sleep_end', '完了');
  console.log('[就寝モード] 完了');
}`;

var newSleep = `async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // 今日の明示的な指示があるか確認（当日のアクティブセッション）
  var todaySessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' AND updated_at > datetime('now', '-16 hours') ORDER BY updated_at DESC").all();

  if (todaySessions.length > 0) {
    // ===== 指示あり：その日に指示されたテーマだけ処理 =====
    console.log('[就寝モード] 本日の指示あり: ' + todaySessions.length + '件');
    for (var si = 0; si < todaySessions.length; si++) {
      var sess = todaySessions[si];
      console.log('[就寝モード] 処理中: ' + sess.title);
      db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(sess.id);
      db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(sess.id, 'sleep_start');

      // 残りラウンドを自動実行（最大6ラウンドまで）
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sess.id, 'user');
      var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
      for (var r = startRound; r <= 6; r++) {
        try {
          await engine.runRound(sess.id, sess.topic, r, sess.research_data, true);
          console.log('[就寝モード] セッション' + sess.id + ' ラウンド' + r + '完了');
        } catch (err) {
          console.error('[就寝モード] ラウンド' + r + 'エラー:', err.message);
          db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(sess.id, 'error_round_' + r, err.message);
          break;
        }
      }
      // 6ラウンド完了なら最終統合
      var cr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sess.id, 'user');
      if (cr && cr.mr >= 6) {
        try { await engine.generateFinalSummary(sess.id); console.log('[就寝モード] 最終統合完了'); }
        catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }
      }
      db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(sess.id);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(sess.id, 'sleep_end', '完了');
    }
  } else {
    // ===== 指示なし：新規事業アイデアを市場調査 =====
    console.log('[就寝モード] 本日の指示なし → 新規事業アイデア調査開始');
    try {
      var researchResult = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 8000,
        system: 'あなたは法律事務所の経営コンサルタントです。東京新橋にある「前田法律事務所（東京新橋法律事務所）」の新規事業アイデアを提案してください。\\n\\n前田法律事務所の特徴:\\n- 代表弁護士: 前田\\n- 所在地: 東京都港区新橋\\n- 既存事業: 交通事故、企業法務、死後事務委任、高齢者見守り\\n- 強み: AI活用、テクノロジー活用、賃貸保証会社との連携\\n- ターゲット: 中小企業、単身高齢者、不動産管理会社\\n\\n以下の観点で分析してください:\\n1. 市場調査（市場規模、成長率、トレンド）\\n2. 競合分析（主要プレイヤー、差別化ポイント）\\n3. 収益性分析（単価、想定件数、粗利率）\\n4. 実現可能性（既存リソースの活用度、初期投資、立ち上げ期間）\\n\\n必ず3案を提案し、各案について向こう3年分のPL（損益計算書）を以下のフォーマットで作成してください:\\n\\n【PL（3年予測）】\\n| 項目 | 1年目 | 2年目 | 3年目 |\\n|------|-------|-------|-------|\\n| 売上高 | xxx万円 | xxx万円 | xxx万円 |\\n| 売上原価 | xxx万円 | xxx万円 | xxx万円 |\\n| 粗利益 | xxx万円 | xxx万円 | xxx万円 |\\n| 販管費 | xxx万円 | xxx万円 | xxx万円 |\\n| 営業利益 | xxx万円 | xxx万円 | xxx万円 |\\n| 営業利益率 | xx% | xx% | xx% |\\n\\n最も実現可能性が高い案を推奨し、その理由を述べてください。',
        messages: [{ role: 'user', content: '前田法律事務所（東京新橋法律事務所）向けの新規事業アイデアを3案、市場調査・競合分析・3年PLつきで提案してください。現在の日本の法律業界・高齢化社会のトレンドを踏まえ、前田事務所の既存の強み（AI活用、賃貸保証会社連携、死後事務委任）を活かせるものを優先してください。' }]
      });
      var ideas = researchResult.content[0].text;

      // 結果をDBに保存
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_research', ideas);

      // HTMLファイルとしても保存
      var ts = Date.now();
      var htmlName = 'biz_ideas_' + ts + '.html';
      var outputDir = pathMod.join(__dirname, 'public/outputs');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

      var htmlContent = ideas.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Markdown風の装飾
      htmlContent = htmlContent.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      htmlContent = htmlContent.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      htmlContent = htmlContent.replace(/^# (.+)$/gm, '<h1>$1</h1>');
      htmlContent = htmlContent.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
      htmlContent = htmlContent.replace(/\\|(.+)\\|/g, function(m) { return '<code>' + m + '</code>'; });
      htmlContent = htmlContent.replace(/\\n/g, '<br>');

      var fullHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>新規事業アイデア - 前田法律事務所</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f5f5f5;color:#333;line-height:1.8;padding:16px;max-width:800px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:8px;margin:20px 0 16px}h2{font-size:18px;color:#16213e;margin:16px 0 10px;padding:8px 12px;background:#e8eaf6;border-radius:4px}h3{font-size:16px;color:#0d47a1;margin:12px 0 8px}strong{color:#1a1a2e}code{display:block;background:#fff;padding:8px;margin:4px 0;border-radius:4px;font-size:13px;overflow-x:auto;white-space:pre}.content{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.meta{font-size:12px;color:#888;text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid #ddd}</style></head><body><h1>新規事業アイデア提案</h1><div class="content">' + htmlContent + '</div><div class="meta">前田法律事務所 AIシステム | 自動調査 | ' + new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'}) + '</div></body></html>';

      fs.writeFileSync(pathMod.join(outputDir, htmlName), fullHtml, 'utf8');
      console.log('[就寝モード] 新規事業HTML保存: ' + htmlName);

      // 結果をグローバル変数に保存（朝サマリーで使用）
      global._sleepBizIdeas = { text: ideas, htmlUrl: 'https://176-32-87-118.sslip.io/outputs/' + htmlName };
    } catch (err) {
      console.error('[就寝モード] 新規事業調査エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_error', err.message);
    }
  }
  console.log('[就寝モード] 完了 ' + new Date().toISOString());
}`;

code = code.replace(oldSleep, newSleep);

// Replace sendMorningSummary function
var oldMorning = `async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
  var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY created_at ASC").all();
  if (sleepLogs.length === 0) { console.log('[朝サマリー] 就寝中ログなし'); return; }

  var logText = sleepLogs.map(function(l) { return '[' + l.role_label + '] ' + l.content; }).join('\\n---\\n');
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var r = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 1500,
    system: '就寝中の議論サマリーを簡潔に作成してください。重要ポイント・提案・決定事項を箇条書きで。',
    messages: [{ role: 'user', content: logText }]
  });
  var summary = r.content[0].text;
  db.prepare('INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)').run(sleepLogs[0].session_id, summary);

  // 未承認アウトプットキューも通知
  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  var pendingMsg = '';
  if (pending.length > 0) {
    pendingMsg = '\\n\\n【承認待ちアウトプット: ' + pending.length + '件】\\n' +
      pending.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\\n') +
      '\\n→ 「承認」または「却下 理由」で返信';
  }

  await sendLine('おはようございます、前田さん\\n\\n【就寝中の議論サマリー】\\n\\n' + summary + pendingMsg);
  console.log('[朝サマリー] 送信完了');
}`;

var newMorning = `async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var msg = 'おはようございます、前田さん\\n';

  // 就寝中に処理した議論ログがあるか
  var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY created_at ASC").all();

  if (sleepLogs.length > 0) {
    // ===== 指示ありモード：議論サマリー =====
    var logText = sleepLogs.map(function(l) { return '[' + l.role_label + '] ' + l.content; }).join('\\n---\\n');
    var r = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 1500,
      system: '就寝中の議論サマリーを簡潔に作成してください。重要ポイント・提案・決定事項を箇条書きで。',
      messages: [{ role: 'user', content: logText }]
    });
    var summary = r.content[0].text;
    db.prepare('INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)').run(sleepLogs[0].session_id, summary);
    msg += '\\n【就寝中の議論サマリー】\\n\\n' + summary;
  } else if (global._sleepBizIdeas) {
    // ===== 指示なしモード：新規事業アイデア =====
    // 要約を生成
    var r2 = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 2000,
      system: '以下の新規事業アイデア分析を、LINE通知用に簡潔にまとめてください。各案のタイトル、市場規模、3年後の営業利益だけを箇条書きで。推奨案を明示してください。最後にHTMLのURLを案内してください。',
      messages: [{ role: 'user', content: global._sleepBizIdeas.text + '\\n\\nHTML URL: ' + global._sleepBizIdeas.htmlUrl }]
    });
    msg += '\\n【新規事業アイデア（自動調査）】\\n\\n' + r2.content[0].text;
    msg += '\\n\\n詳細はこちら:\\n' + global._sleepBizIdeas.htmlUrl;
    global._sleepBizIdeas = null; // クリア
  } else {
    console.log('[朝サマリー] 就寝中ログも新規事業アイデアもなし');
    return;
  }

  // 未承認アウトプットキューも通知
  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  if (pending.length > 0) {
    msg += '\\n\\n【承認待ちアウトプット: ' + pending.length + '件】\\n' +
      pending.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\\n') +
      '\\n→ 「承認」または「却下 理由」で返信';
  }

  await sendLine(msg);
  console.log('[朝サマリー] 送信完了');
}`;

code = code.replace(oldMorning, newMorning);

fs.writeFileSync(serverFile, code, "utf8");
console.log("sleep mode patch applied successfully");
