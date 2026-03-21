// v3.1: ⑤批判OpenAI
// OpenAIチーム内で発散出力を批判（改善提案禁止）

var BaseAgent = require('./base-agent');

function CritiqueOpenAI(db) {
  BaseAgent.call(this, db, { name: 'critique_openai', model: 'openai', maxTokens: 4000 });
}
CritiqueOpenAI.prototype = Object.create(BaseAgent.prototype);
CritiqueOpenAI.prototype.constructor = CritiqueOpenAI;

CritiqueOpenAI.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var divergeOutput = ctx.divergeOutput;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはOpenAIチームの批判担当です。発散担当の出力を受け取り、弱点・矛盾・法的リスクを徹底的に指摘してください。\n\n' +
    '【重要ルール】\n' +
    '- 改善提案は行わない（批判・指摘に専念）\n' +
    '- 消費者目線での「響かない理由」を具体的に指摘\n' +
    '- 誇大表現・根拠の薄い訴求を除外候補として明示\n' +
    '- 弁護士法・景品表示法違反のリスクをチェック\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '');

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【発散担当の出力（批判対象）】\n' + divergeOutput + '\n\n' +
    '以下の観点で批判してください：\n' +
    '1. 消費者が「響かない」理由（具体的に）\n' +
    '2. 市場データとの矛盾・根拠不足\n' +
    '3. 法的リスク（弁護士広告規程含む）\n' +
    '4. 実現困難な案\n' +
    '5. 競合との差別化が弱い案\n' +
    '6. 表現の矛盾・ロジックの破綻\n' +
    '7. 除外すべき案リスト（理由付き）\n' +
    '8. 残す価値があるが弱い案（弱点明記）';

  return await this.callOpenAI(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum
  });
};

module.exports = CritiqueOpenAI;
