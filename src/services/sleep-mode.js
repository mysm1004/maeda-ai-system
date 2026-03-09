const cron = require('node-cron');

class SleepModeService {
  constructor(db, discussionEngine) {
    this.db = db;
    this.engine = discussionEngine;
    this.cronJob = null;
    this.currentRound = 0;
  }

  activate(sessionId, maxRounds = 10, intervalMinutes = 30) {
    // DB記録
    const existing = this.db.prepare('SELECT * FROM sleep_mode WHERE is_active = 1').get();
    if (existing) this.deactivate();

    this.db.prepare(
      'INSERT INTO sleep_mode (is_active, session_id, max_rounds, interval_minutes, started_at) VALUES (1, ?, ?, ?, CURRENT_TIMESTAMP)'
    ).run(sessionId, maxRounds, intervalMinutes);

    this.currentRound = 0;
    const session = this.db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    if (!session) throw new Error('セッションが見つかりません');

    // セッションのステータスをsleepに
    this.db.prepare('UPDATE sessions SET status = ? WHERE id = ?').run('sleep', sessionId);

    // 現在のラウンド数を取得
    const lastLog = this.db.prepare(
      'SELECT MAX(round_number) as max_round FROM discussion_logs WHERE session_id = ?'
    ).get(sessionId);
    const startRound = (lastLog?.max_round || 0) + 1;

    // 定期実行（cron式ではなくsetIntervalで）
    const intervalMs = intervalMinutes * 60 * 1000;
    this.cronJob = setInterval(async () => {
      this.currentRound++;
      if (this.currentRound > maxRounds) {
        this.deactivate();
        return;
      }
      try {
        const round = startRound + this.currentRound - 1;
        await this.engine.runRound(sessionId, session.topic, round, true);
        console.log(`[就寝モード] ラウンド ${this.currentRound}/${maxRounds} 完了`);
      } catch (err) {
        console.error('[就寝モード] エラー:', err.message);
      }
    }, intervalMs);

    // 最初の1ラウンドはすぐ実行
    (async () => {
      try {
        this.currentRound++;
        await this.engine.runRound(sessionId, session.topic, startRound, true);
        console.log(`[就寝モード] 初回ラウンド完了`);
      } catch (err) {
        console.error('[就寝モード] 初回エラー:', err.message);
      }
    })();

    return { sessionId, maxRounds, intervalMinutes };
  }

  deactivate() {
    if (this.cronJob) {
      clearInterval(this.cronJob);
      this.cronJob = null;
    }
    this.db.prepare(
      'UPDATE sleep_mode SET is_active = 0, ended_at = CURRENT_TIMESTAMP WHERE is_active = 1'
    ).run();
    // sleepステータスのセッションをactiveに戻す
    this.db.prepare("UPDATE sessions SET status = 'active' WHERE status = 'sleep'").run();
    this.currentRound = 0;
  }

  getStatus() {
    const active = this.db.prepare('SELECT * FROM sleep_mode WHERE is_active = 1').get();
    return {
      isActive: !!active,
      ...active,
      currentRound: this.currentRound
    };
  }
}

module.exports = SleepModeService;
