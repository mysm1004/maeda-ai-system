/**
 * state-manager.js - 作業状態の保存・復元・GitHub同期
 * ローカル⇔AWS間のシームレスな引き継ぎを実現
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATE_DIR = path.join(__dirname, 'state');
const STATE_FILE = path.join(STATE_DIR, 'current_state.json');

class StateManager {
  constructor(db) {
    this.db = db;
    if (!fs.existsSync(STATE_DIR)) {
      fs.mkdirSync(STATE_DIR, { recursive: true });
    }
  }

  // 現在の作業状態をDBから収集
  collectState(mode) {
    const now = new Date().toISOString();

    // アクティブセッション
    const sessions = this.db.prepare(
      "SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 10"
    ).all();

    const activeProjects = sessions.map(s => {
      const lastLog = this.db.prepare(
        'SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY id DESC LIMIT 1'
      ).get(s.id);

      const pendingOutput = this.db.prepare(
        "SELECT * FROM output_queue WHERE session_id = ? AND status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1"
      ).get(s.id);

      const decisions = this.db.prepare(
        'SELECT * FROM decisions WHERE session_id = ? ORDER BY created_at DESC LIMIT 5'
      ).all(s.id);

      return {
        id: s.id,
        name: s.title,
        topic: s.topic,
        phase: s.phase || 1,
        current_round: s.current_round,
        total_rounds: s.total_rounds || 6,
        status: s.status === 'active' ? '進行中' : s.status,
        next_action: this._determineNextAction(s, lastLog, pendingOutput),
        last_log_summary: lastLog ? lastLog.content.substring(0, 200) : null,
        pending_output: pendingOutput ? {
          queueId: pendingOutput.id,
          type: pendingOutput.output_type,
          recommended: pendingOutput.recommended_pattern
        } : null,
        recent_decisions: decisions.map(d => ({
          decision: d.decision,
          comment: d.comment,
          at: d.created_at
        }))
      };
    });

    // 未処理タスク
    const pendingOutputs = this.db.prepare(
      "SELECT id, session_id, output_type, recommended_pattern, created_at FROM output_queue WHERE status = 'awaiting_approval'"
    ).all();

    const voiceMemos = this.db.prepare(
      'SELECT id, text, created_at FROM voice_memos WHERE processed = 0 ORDER BY created_at DESC LIMIT 20'
    ).all();

    // 好みDB
    const preferences = this.db.prepare('SELECT * FROM memory_db ORDER BY updated_at DESC').all();

    // 最近の議論ログ（直近セッション）
    let recentLogs = [];
    if (sessions.length > 0) {
      recentLogs = this.db.prepare(
        'SELECT session_id, round_number, role, role_label, content, round_theme, created_at FROM discussion_logs WHERE session_id = ? ORDER BY id DESC LIMIT 30'
      ).all(sessions[0].id);
    }

    // 案件ライブラリ
    const recentCases = this.db.prepare(
      'SELECT id, session_id, output_type, title, pattern, created_at FROM case_library ORDER BY created_at DESC LIMIT 20'
    ).all();

    // 生成済みHTMLファイル一覧
    let generatedFiles = [];
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      try {
        generatedFiles = fs.readdirSync(publicDir)
          .filter(f => f.endsWith('.html'))
          .map(f => ({
            name: f,
            size: fs.statSync(path.join(publicDir, f)).size,
            modified: fs.statSync(path.join(publicDir, f)).mtime.toISOString()
          }));
      } catch (e) { /* ignore */ }
    }

    return {
      mode: mode || 'aws',
      last_updated: now,
      last_updated_by: mode === 'local' ? 'pc' : 'aws',
      system_version: '2.0',
      active_projects: activeProjects,
      pending_tasks: pendingOutputs.map(p => ({
        type: 'output_approval',
        queueId: p.id,
        sessionId: p.session_id,
        outputType: p.output_type,
        recommended: p.recommended_pattern
      })),
      voice_memos: voiceMemos,
      feedback_db: preferences.map(p => ({
        category: p.category,
        key: p.key,
        value: p.value,
        confidence: p.confidence,
        source: p.source
      })),
      recent_discussion_logs: recentLogs,
      recent_cases: recentCases,
      generated_files: generatedFiles
    };
  }

  // 状態をファイルに保存
  saveState(mode) {
    const state = this.collectState(mode);
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    console.log('[StateManager] 状態保存完了:', STATE_FILE);
    return state;
  }

  // 状態をファイルから読み込み
  loadState() {
    if (!fs.existsSync(STATE_FILE)) return null;
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (e) {
      console.error('[StateManager] 状態読み込みエラー:', e.message);
      return null;
    }
  }

  // GitHubに状態をpush
  pushToGitHub(commitMsg) {
    try {
      const cwd = __dirname;
      execSync('git add state/current_state.json', { cwd, stdio: 'pipe' });
      execSync(`git commit -m "${commitMsg || 'state: auto-save'}" --allow-empty`, { cwd, stdio: 'pipe' });
      execSync('git push origin main', { cwd, stdio: 'pipe', timeout: 30000 });
      console.log('[StateManager] GitHub push完了');
      return true;
    } catch (e) {
      console.error('[StateManager] GitHub push失敗:', e.message);
      return false;
    }
  }

  // GitHubから最新状態をpull
  pullFromGitHub() {
    try {
      const cwd = __dirname;
      execSync('git stash', { cwd, stdio: 'pipe' });
      execSync('git pull origin main', { cwd, stdio: 'pipe', timeout: 30000 });
      execSync('git stash pop 2>/dev/null || true', { cwd, stdio: 'pipe' });
      console.log('[StateManager] GitHub pull完了');
      return this.loadState();
    } catch (e) {
      console.error('[StateManager] GitHub pull失敗:', e.message);
      return null;
    }
  }

  // モード切替: AWSモード → PCモード
  switchToPC() {
    // 1. 現在の状態を保存
    const state = this.saveState('local');
    // 2. GitHubにpush
    const pushed = this.pushToGitHub('state: AWS→PC切替');
    return { state, pushed };
  }

  // モード切替: PCモード → AWSモード
  switchToAWS() {
    // 1. GitHubから最新状態をpull
    const state = this.pullFromGitHub();
    // 2. 状態をAWSモードとして保存
    if (state) {
      state.mode = 'aws';
      state.last_updated = new Date().toISOString();
      state.last_updated_by = 'aws';
      fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    }
    return state;
  }

  // 現在のモードを取得
  getCurrentMode() {
    const state = this.loadState();
    return state ? state.mode : 'aws';
  }

  // 次のアクション判定
  _determineNextAction(session, lastLog, pendingOutput) {
    if (pendingOutput) return pendingOutput.output_type + 'の承認待ち（推奨: パターン' + pendingOutput.recommended_pattern + '）';
    if (session.current_round >= session.total_rounds) return 'Phase2 アウトプット生成に進む';
    if (session.phase >= 2) return 'アウトプット生成の続き';
    return 'ラウンド' + (session.current_round + 1) + '/' + session.total_rounds + 'の議論を継続';
  }
}

module.exports = StateManager;
