// v3.1: レッドチームエージェント（OpenAI）
// 競合他社視点で両チームの出力を攻撃

var BaseAgent = require('./base-agent');

function RedteamAgent(db) {
  BaseAgent.call(this, db, { name: 'redteam', model: 'openai', maxTokens: 4000 });
}
RedteamAgent.prototype = Object.create(BaseAgent.prototype);
RedteamAgent.prototype.constructor = RedteamAgent;

RedteamAgent.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var claudeOutput = ctx.claudeOutput || '（Claudeチーム結果なし）';
  var openaiOutput = ctx.openaiOutput || '（OpenAIチーム結果なし）';
  var persona = ctx.persona;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたは「' + topic + '」分野の競合他社の上級マーケティングディレクターです。\n\n' +
    '前田法律事務所が2つのチームで練り上げた戦略・訴求案を受け取りました。\n' +
    'あなたの仕事は「なぜこのLP/DM/提案書を選ばないか」「どこで離脱するか」を徹底的に洗い出すことです。\n\n' +
    '【重要ルール】\n' +
    '- 競合の立場から容赦なく攻撃\n' +
    '- 「うちならこう対抗する」を具体的に\n' +
    '- 顧客の離脱ポイントを時系列で指摘\n' +
    '- 甘い見通し・楽観的数字を全て指摘\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '');

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【Claudeチームの統合案】\n' + claudeOutput + '\n\n' +
    '【OpenAIチームの統合案】\n' + openaiOutput + '\n\n' +
    '競合他社の立場から以下を攻撃してください：\n' +
    '1. 顧客がこのLPを見て「選ばない」理由トップ5\n' +
    '2. 離脱ポイント（ファーストビュー→中盤→CTA各段階）\n' +
    '3. 競合として「こう対抗する」戦略（具体的施策）\n' +
    '4. 価格・サービスで潰す方法\n' +
    '5. 信頼性を崩す方法（弱い根拠・曖昧な実績の指摘）\n' +
    '6. Claudeチーム案の最大の弱点3つ\n' +
    '7. OpenAIチーム案の最大の弱点3つ\n' +
    '8. 両チーム共通の致命的欠陥\n' +
    '9. 「これだけは修正しないと勝てない」必須改善ポイント';

  return await this.callOpenAI(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum
  });
};

module.exports = RedteamAgent;
