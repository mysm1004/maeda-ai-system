// v3.1: ④発散OpenAI
// Claudeチームとは独立してアイデアを発散（批判禁止）

var BaseAgent = require('./base-agent');

function DivergeOpenAI(db) {
  BaseAgent.call(this, db, { name: 'diverge_openai', model: 'openai', maxTokens: 5000 });
}
DivergeOpenAI.prototype = Object.create(BaseAgent.prototype);
DivergeOpenAI.prototype.constructor = DivergeOpenAI;

DivergeOpenAI.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var research = ctx.research || '';
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';
  var previousOutput = ctx.previousOutput || '';
  var memory = this.getMemory(projectId);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはOpenAIチームの発散担当です。「' + topic + '」に関してClaudeチームとは全く異なる切り口でアイデアを広げてください。\n\n' +
    '【重要ルール】\n' +
    '- 批判・評価は一切行わない（発散に専念）\n' +
    '- Claudeチームとは異なる視点を重視\n' +
    '- データドリブンな訴求、数字で語る案を多めに\n' +
    '- グローバルな成功事例・最新トレンドを積極活用\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '') +
    '前田さんの好み: ' + JSON.stringify(memory);

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【事前調査】\n' + (research || '').substring(0, 3000) + '\n\n' +
    (previousOutput ? '【前フェーズの結論】\n' + previousOutput + '\n\n' : '') +
    '以下を自由に発散してください：\n' +
    '1. 訴求軸・切り口（最低10案、Claudeとは異なる角度で）\n' +
    '2. キャッチコピー案（各訴求軸に2-3案ずつ）\n' +
    '3. データドリブンな差別化ポイント\n' +
    '4. 海外・異業種の成功パターンの応用\n' +
    '5. テクノロジーを活用した新しいアプローチ\n' +
    '6. SNS・口コミを活用する仕掛け\n' +
    '7. 競合が絶対にやらない切り口';

  return await this.callOpenAI(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 5000
  });
};

module.exports = DivergeOpenAI;
