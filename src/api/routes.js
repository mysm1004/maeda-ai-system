const express = require('express');
const router = express.Router();

module.exports = function(db, engine, sleepMode, notification, prefLearner) {

  // --- セッション管理 ---
  router.get('/api/sessions', (req, res) => {
    const sessions = db.prepare('SELECT * FROM sessions ORDER BY updated_at DESC').all();
    res.json(sessions);
  });

  router.post('/api/sessions', (req, res) => {
    const { title, topic } = req.body;
    if (!title || !topic) return res.status(400).json({ error: 'タイトルとテーマは必須です' });
    const id = engine.createSession(title, topic);
    res.json({ id, title, topic });
  });

  router.get('/api/sessions/:id', (req, res) => {
    const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
    if (!session) return res.status(404).json({ error: 'セッションが見つかりません' });
    const logs = db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC').all(req.params.id);
    res.json({ ...session, logs });
  });

  // --- 議論実行 ---
  router.post('/api/sessions/:id/run', async (req, res) => {
    try {
      const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
      if (!session) return res.status(404).json({ error: 'セッションが見つかりません' });

      const lastLog = db.prepare('SELECT MAX(round_number) as max_round FROM discussion_logs WHERE session_id = ?').get(req.params.id);
      const nextRound = (lastLog?.max_round || 0) + 1;

      const result = await engine.runRound(session.id, session.topic, nextRound, false);
      res.json(result);
    } catch (err) {
      console.error('[議論実行エラー]', err);
      res.status(500).json({ error: err.message });
    }
  });

  // --- ユーザー意見送信 ---
  router.post('/api/sessions/:id/comment', (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: '意見内容は必須です' });
    
    const lastLog = db.prepare('SELECT MAX(round_number) as max_round FROM discussion_logs WHERE session_id = ?').get(req.params.id);
    const round = lastLog?.max_round || 1;
    
    db.prepare(
      'INSERT INTO discussion_logs (session_id, role, role_label, content, round_number) VALUES (?, ?, ?, ?, ?)'
    ).run(req.params.id, 'user', '前田さん', content, round);
    
    res.json({ success: true });
  });

  // --- 承認/却下 ---
  router.post('/api/sessions/:id/decide', (req, res) => {
    const { decision, comment, logId } = req.body;
    if (!decision) return res.status(400).json({ error: '判断は必須です' });
    
    db.prepare(
      'INSERT INTO decisions (session_id, log_id, decision, comment) VALUES (?, ?, ?, ?)'
    ).run(req.params.id, logId || null, decision, comment || null);

    // 好み学習
    if (logId) {
      const log = db.prepare('SELECT * FROM discussion_logs WHERE id = ?').get(logId);
      if (log) {
        prefLearner.learnFromDecision(req.params.id, decision, comment, log.content);
      }
    }

    res.json({ success: true });
  });

  // --- 就寝モード ---
  router.get('/api/sleep-mode', (req, res) => {
    res.json(sleepMode.getStatus());
  });

  router.post('/api/sleep-mode/activate', (req, res) => {
    const { sessionId, maxRounds, intervalMinutes } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'セッションIDは必須です' });
    
    try {
      const result = sleepMode.activate(sessionId, maxRounds || 10, intervalMinutes || 30);
      res.json({ success: true, ...result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/api/sleep-mode/deactivate', (req, res) => {
    sleepMode.deactivate();
    res.json({ success: true });
  });

  // --- 好み・判断基準 ---
  router.get('/api/preferences', (req, res) => {
    res.json(prefLearner.getAll());
  });

  router.post('/api/preferences', (req, res) => {
    const { category, key, value, confidence } = req.body;
    if (!category || !key || !value) return res.status(400).json({ error: '必須項目が不足しています' });
    prefLearner.addPreference(category, key, value, confidence);
    res.json({ success: true });
  });

  router.delete('/api/preferences/:id', (req, res) => {
    prefLearner.delete(req.params.id);
    res.json({ success: true });
  });

  // --- サマリー ---
  router.post('/api/sessions/:id/summary', async (req, res) => {
    try {
      const summary = await notification.generateMorningSummary(req.params.id);
      res.json({ summary });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/api/notify/line', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'メッセージは必須です' });
    const sent = await notification.sendLine(message);
    res.json({ sent });
  });

  // --- 議論ログ ---
  router.get('/api/sessions/:id/logs', (req, res) => {
    const logs = db.prepare(
      'SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC'
    ).all(req.params.id);
    res.json(logs);
  });

  return router;
};
