// v3.1: ファクトチェックエージェント（Claude）
// 法的根拠・統計・判例の裏取り、素材使用ルールのチェック

var BaseAgent = require('./base-agent');

function FactcheckAgent(db) {
  BaseAgent.call(this, db, { name: 'factcheck', model: 'claude', modelTier: 'best', maxTokens: 4000 });
}
FactcheckAgent.prototype = Object.create(BaseAgent.prototype);
FactcheckAgent.prototype.constructor = FactcheckAgent;

FactcheckAgent.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var redteamOutput = ctx.redteamOutput;
  var claudeOutput = ctx.claudeOutput || '';
  var openaiOutput = ctx.openaiOutput || '';
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';

  // 統合コンテンツ（チェック対象）
  var allContent = '【Claudeチーム案】\n' + claudeOutput + '\n\n' +
    '【OpenAIチーム案】\n' + openaiOutput + '\n\n' +
    '【レッドチーム指摘】\n' + redteamOutput;

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたは法律事務所専門のファクトチェッカーです。「' + topic + '」に関する全アウトプットに含まれる情報の正確性を検証してください。\n\n' +
    '【参照ソース制限（厳守）】\n' +
    '- 公的機関サイト（裁判所、法務省、消費者庁等）\n' +
    '- 弁護士サイト・弁護士会サイト\n' +
    '- 判例データベース\n' +
    '- 上記以外の情報源は「信頼性未確認」と明記\n\n' +
    '【チェック項目】\n' +
    '- 法的根拠の正確性（法令名・条文番号）\n' +
    '- 統計データの出所と正確性\n' +
    '- 判例の実在性と引用の正確性\n' +
    '- 弁護士法・景品表示法・弁護士広告規程への違反\n' +
    '- 「必ず勝てる」「絶対に解決」等の断定表現\n' +
    '- 素材使用ルール（著作権・肖像権）\n' +
    '- 裏取りできない情報は削除または「要確認」フラグ\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '');

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ファクトチェック対象】\n' + allContent + '\n\n' +
    '以下の形式で出力してください：\n\n' +
    '## 問題なし（裏取り済み）\n' +
    '- 裏取りできた事実・数字のリスト\n\n' +
    '## 要修正（法的リスクあり）\n' +
    '- 修正が必要な表現とその理由\n' +
    '- 弁護士法・景表法違反の具体的指摘\n\n' +
    '## 要確認（裏取り不能）\n' +
    '- 裏取りできなかった情報（「要確認」フラグ付き）\n\n' +
    '## 削除推奨\n' +
    '- 虚偽または誤解を招く表現\n\n' +
    '## 素材使用チェック\n' +
    '- 著作権・肖像権のリスクがある箇所';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum
  });
};

module.exports = FactcheckAgent;
