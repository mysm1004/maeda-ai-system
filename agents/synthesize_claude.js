// v3.1: ③統合Claude
// 自チームの発散＋批判を統合して最善案を決定（相手チームの出力は参照しない）

var BaseAgent = require('./base-agent');

function SynthesizeClaude(db) {
  BaseAgent.call(this, db, { name: 'synthesize_claude', model: 'claude', maxTokens: 5000 });
}
SynthesizeClaude.prototype = Object.create(BaseAgent.prototype);
SynthesizeClaude.prototype.constructor = SynthesizeClaude;

SynthesizeClaude.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var divergeOutput = ctx.divergeOutput;
  var critiqueOutput = ctx.critiqueOutput;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';
  var memory = this.getMemory(projectId);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはClaudeチームの統合担当です。発散＋批判の全出力を統合し、チームとしての最善案を決定してください。\n\n' +
    '【重要ルール】\n' +
    '- 批判で指摘された弱点は全て解消すること\n' +
    '- 除外対象の案は除外すること\n' +
    '- 残った案を優先順位付きで整理\n' +
    '- OpenAIチームの出力は参照しない（独立性を保つ）\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '') +
    '前田さんの好み: ' + JSON.stringify(memory);

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【発散出力】\n' + divergeOutput + '\n\n' +
    '【批判出力】\n' + critiqueOutput + '\n\n' +
    'Claudeチームの統合案を出力してください：\n' +
    '1. 採用する訴求軸（優先順位付き、各採用理由）\n' +
    '2. 採用するキャッチコピー案（各訴求軸のベスト案）\n' +
    '3. 差別化ポイント（端的に3つ）\n' +
    '4. ターゲット定義（最終版）\n' +
    '5. 全体のストーリーライン\n' +
    '6. Claudeチームの推奨案とその根拠';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 5000
  });
};

module.exports = SynthesizeClaude;
