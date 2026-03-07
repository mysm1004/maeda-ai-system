#!/usr/bin/env node
require('dotenv').config();
const { initDatabase } = require('./src/db/schema');
const DiscussionEngine = require('./src/services/discussion-engine');
const SleepModeService = require('./src/services/sleep-mode');
const NotificationService = require('./src/services/notification');
const PreferenceLearner = require('./src/services/preference-learner');
const ContentGenerator = require('./src/services/content-generator');

const db = initDatabase(process.env.DB_PATH || './data/kabeuchi.db');
const engine = new DiscussionEngine(db);
const sleepMode = new SleepModeService(db, engine);
const notification = new NotificationService(db, engine);
const prefLearner = new PreferenceLearner(db);
const generator = new ContentGenerator(db);

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {

    // === セッション管理 ===
    case 'new': {
      const title = args[0] || '新規セッション';
      const topic = args.slice(1).join(' ') || title;
      const id = engine.createSession(title, topic);
      console.log(JSON.stringify({ id, title, topic }));
      break;
    }

    case 'sessions': {
      const rows = db.prepare('SELECT * FROM sessions ORDER BY updated_at DESC').all();
      console.log(JSON.stringify(rows, null, 2));
      break;
    }

    // === 議論実行 ===
    case 'discuss': {
      const sessionId = parseInt(args[0]);
      if (!sessionId) { console.error('使い方: cli.js discuss <session_id>'); process.exit(1); }
      const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
      if (!session) { console.error('セッションが見つかりません'); process.exit(1); }
      const lastLog = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sessionId);
      const round = (lastLog?.mr || 0) + 1;
      console.error(`[ラウンド ${round}] 議論開始...`);
      const result = await engine.runRound(session.id, session.topic, round, false);
      console.log(`\n===== Claude A（提案役）=====\n${result.proposalA}`);
      console.log(`\n===== Claude B（批評役）=====\n${result.critiqueB}`);
      console.log(`\n===== ChatGPT（外部視点）=====\n${result.externalView}`);
      break;
    }

    // === ユーザー意見追加 ===
    case 'comment': {
      const sid = parseInt(args[0]);
      const content = args.slice(1).join(' ');
      if (!sid || !content) { console.error('使い方: cli.js comment <session_id> <意見>'); process.exit(1); }
      const lastLog2 = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sid);
      db.prepare('INSERT INTO discussion_logs (session_id, role, role_label, content, round_number) VALUES (?, ?, ?, ?, ?)')
        .run(sid, 'user', '前田さん', content, lastLog2?.mr || 1);
      console.log('意見を追加しました');
      break;
    }

    // === 承認/却下 ===
    case 'approve':
    case 'reject': {
      const decSid = parseInt(args[0]);
      const decComment = args.slice(1).join(' ') || null;
      if (!decSid) { console.error('使い方: cli.js approve|reject <session_id> [コメント]'); process.exit(1); }
      const lastEntry = db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(decSid);
      const decision = command === 'approve' ? 'approved' : 'rejected';
      db.prepare('INSERT INTO decisions (session_id, log_id, decision, comment) VALUES (?, ?, ?, ?)')
        .run(decSid, lastEntry?.id || null, decision, decComment);
      if (lastEntry) {
        prefLearner.learnFromDecision(decSid, decision, decComment, lastEntry.content);
      }
      console.log(`${decision === 'approved' ? '承認' : '却下'}しました`);
      break;
    }

    // === ログ表示 ===
    case 'logs': {
      const logSid = parseInt(args[0]);
      const limit = parseInt(args[1]) || 20;
      if (!logSid) { console.error('使い方: cli.js logs <session_id> [件数]'); process.exit(1); }
      const logs = db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at DESC LIMIT ?').all(logSid, limit);
      logs.reverse().forEach(l => {
        const sleepTag = l.is_sleep_mode ? ' [就寝中]' : '';
        console.log(`\n--- [R${l.round_number}] ${l.role_label}${sleepTag} (${l.created_at}) ---\n${l.content}`);
      });
      break;
    }

    // === 就寝モード ===
    case 'sleep': {
      const action = args[0];
      if (action === 'on') {
        const sleepSid = parseInt(args[1]);
        const maxR = parseInt(args[2]) || 10;
        const interval = parseInt(args[3]) || 30;
        if (!sleepSid) { console.error('使い方: cli.js sleep on <session_id> [最大ラウンド] [間隔分]'); process.exit(1); }
        sleepMode.activate(sleepSid, maxR, interval);
        console.log(`就寝モードON (セッション${sleepSid}, 最大${maxR}ラウンド, ${interval}分間隔)`);
        // プロセスを維持（就寝中の議論を継続するため）
        console.error('就寝モード実行中... Ctrl+Cで停止');
        process.on('SIGINT', () => { sleepMode.deactivate(); process.exit(0); });
        await new Promise(() => {}); // 無限待機
      } else if (action === 'off') {
        sleepMode.deactivate();
        console.log('就寝モードOFF');
      } else {
        console.log(JSON.stringify(sleepMode.getStatus()));
      }
      break;
    }

    // === サマリー ===
    case 'summary': {
      const sumSid = parseInt(args[0]);
      if (!sumSid) { console.error('使い方: cli.js summary <session_id>'); process.exit(1); }
      const summary = await notification.generateMorningSummary(sumSid);
      console.log(summary || 'サマリー対象のログがありません');
      break;
    }

    // === コンテンツ生成 ===
    case 'gen-lp': {
      const lpText = args.join(' ') || '法律事務所のLP';
      console.error('LP生成中...');
      const lp = await generator.generateLP({ services: lpText });
      console.log(lp);
      break;
    }

    case 'gen-proposal': {
      const propText = args.join(' ') || '提案書';
      console.error('提案書生成中...');
      const prop = await generator.generateProposal({ requirements: propText });
      console.log(prop);
      break;
    }

    case 'gen-dm': {
      const dmText = args.join(' ') || 'フォローアップ';
      console.error('DM生成中...');
      const dm = await generator.generateDM({ purpose: dmText });
      console.log(dm);
      break;
    }

    // === 好み管理 ===
    case 'prefs': {
      const prefs = prefLearner.getAll();
      if (prefs.length === 0) { console.log('学習データなし'); break; }
      prefs.forEach(p => {
        console.log(`[${p.category}] ${p.key}: ${p.value} (信頼度${(p.confidence*100).toFixed(0)}%)`);
      });
      break;
    }

    case 'add-pref': {
      const [cat, key, ...valArr] = args;
      const val = valArr.join(' ');
      if (!cat || !key || !val) { console.error('使い方: cli.js add-pref <カテゴリ> <項目> <好み>'); process.exit(1); }
      prefLearner.addPreference(cat, key, val);
      console.log('好みを追加しました');
      break;
    }

    default:
      console.log(`
壁打ちシステム CLI

セッション管理:
  new <タイトル> <テーマ>     新規セッション作成
  sessions                     一覧表示

議論:
  discuss <id>                 1ラウンド実行（3者議論）
  comment <id> <意見>          意見を追加
  approve <id> [コメント]      承認
  reject <id> [コメント]       却下
  logs <id> [件数]             ログ表示

就寝モード:
  sleep on <id> [回数] [間隔]  就寝モードON
  sleep off                    就寝モードOFF
  sleep                        状態確認

生成:
  gen-lp <内容>                LP生成
  gen-proposal <内容>          提案書生成
  gen-dm <内容>                DM生成

その他:
  summary <id>                 サマリー生成
  prefs                        好み一覧
  add-pref <カテ> <項目> <値>  好み追加
`);
  }
}

main().then(() => {
  if (command !== 'sleep' || args[0] !== 'on') {
    db.close();
    process.exit(0);
  }
}).catch(err => {
  console.error('エラー:', err.message);
  db.close();
  process.exit(1);
});
