#!/usr/bin/env python3
"""Fix server_fixed.js - replace the broken question/memo section with properly escaped strings"""

with open('/home/ubuntu/kabeuchi-system/server_fixed.js', 'r') as f:
    content = f.read()

# The broken section starts with "// ============ 質問・ステータス問い合わせ判定"
# and ends before "// LINE返信"

# Find the start and end markers
start_marker = "  // ============ 質問・ステータス問い合わせ判定 ============"
end_marker = "// LINE返信"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: Could not find markers. start={start_idx}, end={end_idx}")
    exit(1)

# The replacement section (properly escaped JS strings)
replacement = """  // ============ 質問・ステータス問い合わせ判定 ============
  var questionPatterns = [
    /教えて/, /は[？?]$/, /どう(いう|なって)/, /状況/, /進捗/,
    /動いてる/, /いまの/, /何してる/, /何やってる/, /どうなった/,
    /作業.*教/, /確認.*して/, /見せて/, /報告/, /途中経過/
  ];
  var isQuestion = questionPatterns.some(function(p) { return p.test(t); });
  if (isQuestion) {
    var allSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 5").all();
    var pendingQ = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
    if (allSessions.length === 0 && pendingQ.length === 0) {
      return '現在進行中のプロジェクトはありません';
    }
    var statusMsg = '【現在の状況】\\n';
    allSessions.forEach(function(s) {
      statusMsg += '\\n\\u{1F4CB} ' + s.title + '\\n  Phase' + s.phase + ' / ラウンド' + s.current_round + '/' + s.total_rounds + ' (' + s.status + ')';
    });
    if (pendingQ.length > 0) {
      statusMsg += '\\n\\n【承認待ち: ' + pendingQ.length + '件】';
      pendingQ.forEach(function(q) {
        statusMsg += '\\n・' + q.output_type + '（推奨: パターン' + q.recommended_pattern + '）';
      });
      statusMsg += '\\n→「承認」または「却下 理由」で返信';
    }
    return statusMsg;
  }

  // ============ 明示的メモ保存 ============
  var memoPatterns = [/メモ(して|しといて|保存)/, /覚えて/, /覚えておいて/, /記録して/];
  var isMemoRequest = memoPatterns.some(function(p) { return p.test(t); });
  if (isMemoRequest) {
    var memoText = t.replace(/メモして|メモしといて|メモ保存|覚えて|覚えておいて|記録して/g, '').trim();
    if (!memoText) memoText = t;
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(memoText);
    return 'メモ保存しました: 「' + memoText.substring(0, 30) + '」';
  }

  // それ以外は壁打ちコマンドとして処理を試みる
  return '「' + t.substring(0, 20) + '」を受け付けました。\\n\\n使えるコマンド:\\n・承認 / 却下 / 状態\\n・コード○○ / 修正○○\\n・PCモード / AWSモード\\n・CC状態 / モード確認\\n\\nメモ保存は「○○をメモして」と送ってください';
}

"""

new_content = content[:start_idx] + replacement + end_marker + content[end_idx + len(end_marker):]

with open('/home/ubuntu/kabeuchi-system/server_fixed.js', 'w') as f:
    f.write(new_content)

print("Fixed question/memo section successfully")
