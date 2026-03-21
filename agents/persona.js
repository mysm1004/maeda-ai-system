// v3.1: ペルソナエージェント（Claude）
// ターゲット顧客像を具体化し、以降の全エージェントにインプットとして渡す

var BaseAgent = require('./base-agent');

function PersonaAgent(db) {
  BaseAgent.call(this, db, { name: 'persona', model: 'claude', maxTokens: 3000 });
}
PersonaAgent.prototype = Object.create(BaseAgent.prototype);
PersonaAgent.prototype.constructor = PersonaAgent;

PersonaAgent.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var research = ctx.research || '';
  var projectId = ctx.projectId;
  var phaseNum = ctx.phase || 1;
  var previousOutput = ctx.previousOutput || '';
  var officeDocs = this.getOfficeDocs();
  var memory = this.getMemory(projectId);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはターゲット顧客心理の専門家です。「' + topic + '」のターゲット顧客像を具体的に設定してください。\n\n' +
    '以降の全エージェント（発散・批判・統合・レッドチーム・ファクトチェック）がこのペルソナを参照して作業します。\n' +
    '具体的な人物像（年齢・状況・感情・検索意図・生活背景）を明文化してください。';

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【フェーズ】' + phaseNum + '\n' +
    '【事前調査】\n' + (research || '未実施') + '\n\n' +
    '【事務所資料】\n' + ((officeDocs || '').substring(0, 2000) || 'なし') + '\n\n' +
    '【前田さんの好み】\n' + JSON.stringify(memory) + '\n\n' +
    (previousOutput ? '【前フェーズの結論】\n' + previousOutput + '\n\n' : '') +
    '以下を出力してください：\n' +
    '1. メインペルソナ（最も重要なターゲット1人を詳細に描写）\n' +
    '   - 年齢・性別・職業・家族構成\n' +
    '   - 現在の状況（なぜこのサービスが必要になったか）\n' +
    '   - 感情状態（不安・焦り・怒り等の具体的な心理）\n' +
    '   - 検索行動（どんなキーワードで、いつ、どのデバイスで検索するか）\n' +
    '   - 情報収集チャネル（口コミ・比較サイト・SNS等）\n' +
    '   - 決定トリガー（何があれば問い合わせに至るか）\n' +
    '   - 阻害要因（問い合わせしない理由トップ3）\n\n' +
    '2. サブペルソナ（2人：異なるセグメントから各1人）\n\n' +
    '3. ペルソナ共通の「刺さる言葉」「避けるべき表現」リスト\n\n' +
    '4. 以降のエージェントへの申し送り事項';

  var result = await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 3000
  });
  return result;
};

module.exports = PersonaAgent;
