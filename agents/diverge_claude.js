// v3.1: ①発散Claude
// ペルソナを踏まえてアイデア・訴求軸・表現を最大限に広げる（批判禁止）

var BaseAgent = require('./base-agent');

function DivergeClaude(db) {
  BaseAgent.call(this, db, { name: 'diverge_claude', model: 'claude', maxTokens: 5000 });
}
DivergeClaude.prototype = Object.create(BaseAgent.prototype);
DivergeClaude.prototype.constructor = DivergeClaude;

DivergeClaude.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var research = ctx.research || '';
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';
  var previousOutput = ctx.previousOutput || '';
  var memory = this.getMemory(projectId);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはClaudeチームの発散担当です。「' + topic + '」に関するアイデア・訴求軸・表現を最大限に広げてください。\n\n' +
    '【重要ルール】\n' +
    '- 批判・評価は一切行わない（発散に専念）\n' +
    '- 質より量を重視\n' +
    '- 異業種の成功事例も積極的に取り入れる\n' +
    '- 常識にとらわれない斬新なアイデアも歓迎\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '') +
    '前田さんの好み: ' + JSON.stringify(memory);

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【事前調査】\n' + (research || '').substring(0, 3000) + '\n\n' +
    (previousOutput ? '【前フェーズの結論】\n' + previousOutput + '\n\n' : '') +
    '以下を自由に発散してください：\n' +
    '1. 訴求軸・切り口（最低10案）\n' +
    '2. キャッチコピー案（各訴求軸に2-3案ずつ）\n' +
    '3. 差別化ポイント案\n' +
    '4. 異業種からの応用アイデア\n' +
    '5. ペルソナの心を動かすストーリー案\n' +
    '6. 数字・実績の活用案\n' +
    '7. 競合が使っていない切り口';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 5000
  });
};

module.exports = DivergeClaude;
