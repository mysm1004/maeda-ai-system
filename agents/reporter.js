// v3.1: レポーターエージェント
// LINE向け（短文・URL送信のみ）とClaude Code向け（詳細ログ）の出力切替

function Reporter(sendLineFn) {
  this.sendLineFn = sendLineFn || null;
}

// インターフェース判別
Reporter.prototype.isClaudeCode = function(source) {
  return source === 'claude_code' || source === 'api';
};

// フェーズ完了報告
Reporter.prototype.reportPhaseComplete = function(source, data) {
  if (this.isClaudeCode(source)) {
    return this._formatForClaudeCode(data);
  }
  return this._formatForLine(data);
};

// LINE向けフォーマット（短文・URL送信のみ）
Reporter.prototype._formatForLine = function(data) {
  var msg = '✅ ' + (data.phaseName || 'フェーズ' + data.phase) + ' 完了\n';

  if (data.patterns && data.patterns.length > 0) {
    msg += '\n📋 3パターン:\n';
    data.patterns.forEach(function(p) {
      msg += p.id + ': ' + p.name + '\n';
    });
    if (data.recommended) {
      msg += '\n⭐ 推奨: パターン' + data.recommended + '\n';
      if (data.recommendedReason) {
        msg += '理由: ' + data.recommendedReason.substring(0, 100) + '\n';
      }
    }
  }

  if (data.urls && data.urls.length > 0) {
    msg += '\n🔗 URL:\n';
    data.urls.forEach(function(u) { msg += u + '\n'; });
  }

  if (data.factCheckFlags && data.factCheckFlags.length > 0) {
    msg += '\n⚠️ 要確認: ' + data.factCheckFlags.length + '件\n';
  }

  msg += '\n承認するには「承認」と返信してください';
  return msg;
};

// Claude Code向けフォーマット（詳細ログ）
Reporter.prototype._formatForClaudeCode = function(data) {
  var lines = [];
  lines.push('[MAEDA-AI] ========================================');
  lines.push('[MAEDA-AI] ' + (data.phaseName || 'フェーズ' + data.phase) + ' 完了');
  lines.push('[MAEDA-AI] ========================================');
  lines.push('');

  // エージェント実行サマリー
  if (data.agentLog) {
    lines.push('📊 エージェント実行サマリー:');
    data.agentLog.forEach(function(a) {
      var icon = a.status === 'success' ? '✓' : '✗';
      lines.push('  ' + icon + ' ' + a.name + ' (' + a.duration + 'ms) [' + a.model + ']');
    });
    lines.push('');
  }

  // 3パターン概要
  if (data.patterns && data.patterns.length > 0) {
    lines.push('📋 3パターン出力:');
    data.patterns.forEach(function(p) {
      lines.push('');
      lines.push('  【パターン' + p.id + '】' + p.name);
      if (p.concept) lines.push('  コンセプト: ' + p.concept.substring(0, 200));
      if (p.catchcopy) lines.push('  キャッチコピー: ' + p.catchcopy);
      if (p.target) lines.push('  ターゲット: ' + p.target.substring(0, 100));
    });
    lines.push('');
  }

  // 推奨
  if (data.recommended) {
    lines.push('⭐ 推奨: パターン' + data.recommended);
    if (data.recommendedReason) {
      lines.push('  理由: ' + data.recommendedReason);
    }
    lines.push('');
  }

  // ファクトチェック
  if (data.factCheckFlags && data.factCheckFlags.length > 0) {
    lines.push('⚠️ ファクトチェック要確認:');
    data.factCheckFlags.forEach(function(f) { lines.push('  - ' + f); });
    lines.push('');
  }

  // URL
  if (data.urls && data.urls.length > 0) {
    lines.push('🔗 URL:');
    data.urls.forEach(function(u) { lines.push('  ' + u); });
    lines.push('');
  }

  // チーム失敗通知
  if (data.teamErrors && data.teamErrors.length > 0) {
    lines.push('⚠️ チームエラー:');
    data.teamErrors.forEach(function(e) { lines.push('  - ' + e); });
    lines.push('');
  }

  lines.push('[MAEDA-AI] セッションID: ' + data.sessionId + ' | フェーズ: ' + data.phase);
  lines.push('[MAEDA-AI] 承認 / 修正指示 を選んでください');
  return lines.join('\n');
};

// 進捗通知（Claude Code向け）
Reporter.prototype.progress = function(agentName, status) {
  var icon = status === 'done' ? '✓' : status === 'running' ? '→' : '○';
  return '  ' + icon + ' ' + agentName + (status === 'running' ? ' 実行中...' : status === 'done' ? ' 完了' : '');
};

// LINE送信ヘルパー
Reporter.prototype.sendLine = async function(message) {
  if (this.sendLineFn) {
    try { await this.sendLineFn(message); } catch(e) { console.error('[Reporter] LINE送信失敗:', e.message); }
  }
};

module.exports = Reporter;
