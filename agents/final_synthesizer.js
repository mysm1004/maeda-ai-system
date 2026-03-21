// v3.1: ⑦最終統合Claude（最新モデル）
// ③⑥レッドチーム・ファクトチェック結果を全統合し、訴求軸A/B/Cの3パターン生成
// プロ業者基準チェックリストを適用

var BaseAgent = require('./base-agent');
var { CLAUDE_MODEL } = require('../config/models');
var { SYNTHESIZER_TIMEOUT } = require('../config/timeouts');

function FinalSynthesizer(db) {
  BaseAgent.call(this, db, { name: 'final_synthesizer', model: 'claude', maxTokens: 8000 });
}
FinalSynthesizer.prototype = Object.create(BaseAgent.prototype);
FinalSynthesizer.prototype.constructor = FinalSynthesizer;

FinalSynthesizer.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var persona = ctx.persona;
  var claudeOutput = ctx.claudeOutput || '（Claudeチーム結果なし）';
  var openaiOutput = ctx.openaiOutput || '（OpenAIチーム結果なし）';
  var redteamOutput = ctx.redteamOutput;
  var factcheckOutput = ctx.factcheckOutput;
  var phaseNum = ctx.phase || 1;
  var phasePrompt = ctx.phasePrompt || '';
  var outputType = ctx.outputType || 'general';
  var memory = this.getMemory(projectId);

  var qualityChecklist = this._getQualityChecklist(outputType);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたは最終統合担当です。Claudeチーム・OpenAIチーム・レッドチーム・ファクトチェックの全結果を統合し、' +
    '**訴求軸A・B・Cの3パターン**を生成してください。\n\n' +
    '【最重要ルール】\n' +
    '- 必ず3パターン（A・B・C）を出力すること\n' +
    '- 各パターンは独立した訴求軸（コンセプト自体が異なる）\n' +
    '- レッドチームの指摘は全て解消すること\n' +
    '- ファクトチェックで「要修正」「削除推奨」の項目は修正/削除すること\n' +
    '- 「要確認」フラグ付き情報はそのままフラグを残すこと\n' +
    '- 法的表現は弁護士法・景表法・弁護士広告規程に完全準拠\n' +
    '- 事務所の実在情報（https://tslaw.or.jp/）を優先使用\n\n' +
    '【品質チェックリスト（各パターンに適用）】\n' + qualityChecklist + '\n\n' +
    (phasePrompt ? '【フェーズ固有指示】\n' + phasePrompt + '\n\n' : '') +
    '前田さんの好み: ' + JSON.stringify(memory);

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +
    '【ペルソナ】\n' + persona + '\n\n' +
    '【③Claudeチーム統合案】\n' + claudeOutput + '\n\n' +
    '【⑥OpenAIチーム統合案】\n' + openaiOutput + '\n\n' +
    '【レッドチーム攻撃結果】\n' + redteamOutput + '\n\n' +
    '【ファクトチェック結果】\n' + factcheckOutput + '\n\n' +
    '3パターンを以下の形式で出力してください：\n\n' +
    '## パターンA: [訴求軸名]\n' +
    '- コンセプト:\n' +
    '- キャッチコピー:\n' +
    '- ターゲット:\n' +
    '- 差別化ポイント:\n' +
    '- 構成概要:\n' +
    '- 品質チェック結果: [OK/要改善の項目]\n\n' +
    '## パターンB: [訴求軸名]\n' +
    '(同上)\n\n' +
    '## パターンC: [訴求軸名]\n' +
    '(同上)\n\n' +
    '## 推奨パターンと理由\n' +
    '- 推奨: [A/B/C]\n' +
    '- 理由:\n\n' +
    '## フェーズ結論JSON\n' +
    '```json\n' +
    '{\n' +
    '  "patterns": [\n' +
    '    {"id": "A", "name": "訴求軸名", "concept": "概要", "catchcopy": "コピー", "target": "ターゲット"},\n' +
    '    {"id": "B", ...},\n' +
    '    {"id": "C", ...}\n' +
    '  ],\n' +
    '  "recommended": "A",\n' +
    '  "recommended_reason": "理由",\n' +
    '  "target_definition": "最終ターゲット定義",\n' +
    '  "fact_check_flags": ["要確認項目があれば"]\n' +
    '}\n' +
    '```';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 8000,
    timeout: SYNTHESIZER_TIMEOUT
  });
};

// 品質チェックリスト（outputTypeに応じて切替）
FinalSynthesizer.prototype._getQualityChecklist = function(outputType) {
  if (outputType === 'dm') {
    return '【DM品質基準】\n' +
      '- 件名で開封率を最大化する表現か\n' +
      '- 本文は300文字以内で価値が伝わるか\n' +
      '- CTAは1つに絞られているか';
  }

  // LP・汎用品質基準
  return '【ファーストビュー】\n' +
    '- キャッチコピーは10秒以内に価値が伝わるか\n' +
    '- CTAボタンがファーストビュー内に存在するか\n' +
    '- 訴求が1つに絞られているか（複数訴求の混在禁止）\n\n' +
    '【デザイン】\n' +
    '- フォントは最大2種類以内\n' +
    '- 余白は十分に確保されているか\n' +
    '- カラーはメイン・アクセント・ベースの3色以内\n' +
    '- モバイルファーストで設計されているか\n\n' +
    '【コンテンツ構成】\n' +
    '- 問題提起→共感→解決策→証拠→CTAの流れが成立しているか\n' +
    '- 実績・事例・数字による根拠が含まれているか\n' +
    '- 読了後に「次に何をすべきか」が明確か\n\n' +
    '【技術品質】\n' +
    '- 完全自己完結型HTML（外部CSS/JSファイル参照禁止）\n' +
    '- モバイル表示でのレイアウト崩れがないか\n\n' +
    '【法的チェック】\n' +
    '- 弁護士法・景品表示法に違反する表現がないか\n' +
    '- 「必ず勝てる」「絶対に解決」等の断定表現がないか\n' +
    '- 実績数値に根拠があるか';
};

module.exports = FinalSynthesizer;
