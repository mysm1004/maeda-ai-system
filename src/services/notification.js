const https = require('https');
const cron = require('node-cron');

class NotificationService {
  constructor(db, discussionEngine) {
    this.db = db;
    this.engine = discussionEngine;
    this.morningCron = null;
  }

  // LINE通知送信
  async sendLine(message) {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) {
      console.log('[LINE] トークン未設定。通知スキップ。');
      return false;
    }

    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        to: 'all',
        messages: [{ type: 'text', text: message.substring(0, 5000) }]
      });

      const options = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/broadcast',
        method: 'POST',
        headers: {
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
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data, 'utf8')
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
=======
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data)
>>>>>>> Stashed changes
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(res.statusCode === 200));
      });
      req.on('error', reject);
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
      req.write(data, 'utf8');
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
=======
      req.write(data);
>>>>>>> Stashed changes
      req.end();
    });
  }

  // 朝のサマリー生成
  async generateMorningSummary(sessionId) {
    const logs = this.db.prepare(
      'SELECT * FROM discussion_logs WHERE session_id = ? AND is_sleep_mode = 1 ORDER BY created_at ASC'
    ).all(sessionId);

    if (logs.length === 0) return null;

    // Claude APIでサマリー生成
    const Anthropic = require('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const logText = logs.map(l => `[${l.role_label}] ${l.content}`).join('\n\n---\n\n');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: 'あなたは議論のサマリーを作成するアシスタントです。簡潔で要点を押さえたサマリーを日本語で作成してください。',
      messages: [{
        role: 'user',
        content: `以下の就寝中の議論をサマリーしてください。重要なポイント・提案・決定事項を箇条書きで整理し、前田さんが朝すぐに把握できるようにしてください。\n\n${logText}`
      }]
    });

    const summary = response.content[0].text;

    // DB保存
    this.db.prepare(
      'INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)'
    ).run(sessionId, summary);

    return summary;
  }

  // 朝7時の自動サマリー送信を設定
  scheduleMorningSummary() {
    // 毎朝7時（JST = UTC-9なのでUTC 22:00前日）
    this.morningCron = cron.schedule('0 22 * * *', async () => {
      try {
        const sleepData = this.db.prepare('SELECT * FROM sleep_mode ORDER BY id DESC LIMIT 1').get();
        if (!sleepData?.session_id) return;

        const summary = await this.generateMorningSummary(sleepData.session_id);
        if (summary) {
          const message = `🌅 おはようございます、前田さん\n\n【就寝中の議論サマリー】\n\n${summary}`;
          await this.sendLine(message);
          console.log('[朝サマリー] LINE送信完了');
        }
      } catch (err) {
        console.error('[朝サマリー] エラー:', err.message);
      }
    }, { timezone: 'Asia/Tokyo' });
  }

  stop() {
    if (this.morningCron) this.morningCron.stop();
  }
}

module.exports = NotificationService;
