// v3.1: ②批判Claude
// 自チームの発散アウトプットの弱点・矛盾・法的リスクを指摘（改善提案禁止）

var BaseAgent = require('./base-agent');

function CritiqueClaude(db) {
  BaseAgent.call(this, db, { name: 'critique_claude', model: 'claude', maxTokens: 4000 });
}
CritiqueClaude.prototype = Object.create(BaseAgent.prototype);
CritiqueClaude.prototype.constructor = CritiqueClaude;

CritiqueClaude.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var divergeOutput = ctx.divergeOutput;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはClaudeチームの批判担当です。発散担当の出力を受け取り、弱点・矛盾・法的リスクを徹底的に指摘してください。\n\n' +
    '【重要ルール】\n' +
    '- 改善提案は行わない（批判・指摘に専念）\n' +
    '- 誇大表現・根拠の薄い訴求を除外候補として明示\n' +
    '- ターゲットに刺さらない表現を指摘\n' +
    '- 弁護士法・景品表示法違反のリスクを厳格にチェック\n' +
    '- 「必ず勝てる」「絶対に解決」等の断定表現を排除\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '');

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【発散担当の出力（批判対象）】\n' + divergeOutput + '\n\n' +
    '以下の観点で批判してください：\n' +
    '1. 法的リスク（弁護士法・景表法・弁護士広告規程）\n' +
    '2. 誇大表現・根拠のない主張\n' +
    '3. ペルソナに刺さらない訴求（ズレている理由）\n' +
    '4. 競合と差別化できていない案\n' +
    '5. 実現不可能・非現実的な案\n' +
    '6. 表現の矛盾・論理の飛躍\n' +
    '7. 除外すべき案のリスト（理由付き）\n' +
    '8. 弱いが残す価値のある案（弱点の指摘付き）';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum
  });
};

module.exports = CritiqueClaude;
