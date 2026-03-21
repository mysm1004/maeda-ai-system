// v3.1: ⑥統合OpenAI
// OpenAIチーム内の発散＋批判を統合して最善案を決定（Claudeチームの出力は参照しない）

var BaseAgent = require('./base-agent');

function SynthesizeOpenAI(db) {
  BaseAgent.call(this, db, { name: 'synthesize_openai', model: 'openai', maxTokens: 5000 });
}
SynthesizeOpenAI.prototype = Object.create(BaseAgent.prototype);
SynthesizeOpenAI.prototype.constructor = SynthesizeOpenAI;

SynthesizeOpenAI.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var divergeOutput = ctx.divergeOutput;
  var critiqueOutput = ctx.critiqueOutput;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';
  var memory = this.getMemory(projectId);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはOpenAIチームの統合担当です。発散＋批判の全出力を統合し、チームとしての最善案を決定してください。\n\n' +
    '【重要ルール】\n' +
    '- 批判で指摘された弱点は全て解消すること\n' +
    '- 除外対象の案は除外すること\n' +
    '- Claudeチームの出力は参照しない（独立性を保つ）\n' +
    '- データドリブンな根拠を重視\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '') +
    '前田さんの好み: ' + JSON.stringify(memory);

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【発散出力】\n' + divergeOutput + '\n\n' +
    '【批判出力】\n' + critiqueOutput + '\n\n' +
    'OpenAIチームの統合案を出力してください：\n' +
    '1. 採用する訴求軸（優先順位付き、各採用理由）\n' +
    '2. 採用するキャッチコピー案（各訴求軸のベスト案）\n' +
    '3. 差別化ポイント（端的に3つ）\n' +
    '4. ターゲット定義（最終版）\n' +
    '5. 全体のストーリーライン\n' +
    '6. OpenAIチームの推奨案とその根拠';

  return await this.callOpenAI(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 5000
  });
};

module.exports = SynthesizeOpenAI;
