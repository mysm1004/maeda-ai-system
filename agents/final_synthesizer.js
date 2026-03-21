// v3.1統合版: ⑦最終統合Claude（最新モデル）
// v2.0の出力種別別プロンプト（17種別）・品質ルール・HTMLルールを完全移植

var BaseAgent = require('./base-agent');
var { SYNTHESIZER_TIMEOUT } = require('../config/timeouts');

function FinalSynthesizer(db) {
  BaseAgent.call(this, db, { name: 'final_synthesizer', model: 'claude', modelTier: 'best', maxTokens: 8000 });
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
  var typeInstructions = this._getTypeInstructions(outputType);
  var qualityRules = this._getQualityRules();

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
    '【アウトプット種別】' + outputType + '\n' +
    '【種別固有指示】\n' + typeInstructions + '\n\n' +
    qualityRules + '\n\n' +
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
    '- コンセプト:\n- キャッチコピー:\n- ターゲット:\n- 差別化ポイント:\n- 構成概要:\n- 品質チェック結果:\n\n' +
    '## パターンB: [訴求軸名]\n(同上)\n\n' +
    '## パターンC: [訴求軸名]\n(同上)\n\n' +
    '## 推奨パターンと理由\n- 推奨: [A/B/C]\n- 理由:\n\n' +
    '## フェーズ結論JSON\n```json\n' +
    '{"patterns":[{"id":"A","name":"訴求軸名","concept":"概要","catchcopy":"コピー","target":"ターゲット"},' +
    '{"id":"B","name":"...","concept":"...","catchcopy":"...","target":"..."},' +
    '{"id":"C","name":"...","concept":"...","catchcopy":"...","target":"..."}],' +
    '"recommended":"A","recommended_reason":"理由",' +
    '"target_definition":"最終ターゲット定義","fact_check_flags":["要確認項目"]}\n```';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 8000,
    timeout: SYNTHESIZER_TIMEOUT
  });
};

// v2.0完全移植: 出力種別別の詳細指示（17種別）
FinalSynthesizer.prototype._getTypeInstructions = function(type) {
  var map = {
    'lp': '完全な単一HTMLファイルでLP全体を生成。CSSは全て<style>タグ内にインライン記述（外部CSS参照禁止）。JavaScriptも全て<script>タグ内にインライン記述（外部JS参照禁止）。画像はSVGインラインまたはCSS背景のみ使用。bodyやコンテナにdisplay:noneやvisibility:hiddenを設定しない。<!DOCTYPE html>から</html>まで完結。セクション: ファーストビュー→悩み共感→解決策→実績→サービス詳細→料金→FAQ→CTA。レスポンシブ対応必須。<meta charset="UTF-8">必須。',
    'banner': '完全な単一HTMLファイルで複数サイズのHTML/SVGバナーを生成。CSSは全て<style>タグ内。外部参照禁止。',
    'sns_post': 'X・Instagram・Facebook・LinkedIn用の投稿文を各1つ。ハッシュタグ付き。',
    'blog': 'SEO最適化記事。H1/H2/H3構成、メタディスクリプション、内部リンク候補。3000文字以上。',
    'youtube_script': 'YouTube動画台本。フック→本題→CTA構成。タイムスタンプ付き。',
    'press_release': 'プレスリリース。5W1H形式。配信先メディア候補も記載。',
    'newsletter': 'メルマガ。件名5案+本文。開封率を意識した構成。',
    'seo_design': 'SEOキーワード設計。検索意図分析・キーワードマップ・優先順位表。',
    'seo_article': 'SEO記事。構成案→本文→メタ情報まで一括。schema.org付き。',
    'aio_content': 'AI検索回答に選ばれるFAQ/構造化コンテンツ。',
    'proposal': '提案書。目次→概要→課題分析→提案内容→実績→スケジュール→費用。',
    'dm': '完全な単一HTMLファイルでDM生成。CSSは全て<style>タグ内。外部参照禁止。<meta charset="UTF-8">必須。印刷向けレイアウト。',
    'sales_script': '営業トーク台本・FAQ集。場面別の対応スクリプト。',
    'company_profile': '会社概要・サービス資料。',
    'legal_content': '法律解説コンテンツ。一般向け・わかりやすい表現。',
    'seminar': 'セミナー資料。スライド構成・台本。',
    'fax': '完全な単一HTMLファイルでFAXを生成。CSSは全て<style>タグ内。外部参照禁止。<meta charset="UTF-8">必須。A4白黒印刷向けレイアウト。'
  };
  return map[type] || '指定された種別のコンテンツを高品質で生成してください。';
};

// v2.0完全移植: 品質ルール
FinalSynthesizer.prototype._getQualityRules = function() {
  return '【品質基準（絶対遵守）】\n' +
    '- 架空の実績・数字は一切使用禁止。事務所HP・事務所情報ファイルに基づく情報のみ\n' +
    '- ファーストビューのインパクトを最優先事項とする\n' +
    '- 安っぽい・AI感のあるデザインは不合格\n' +
    '- キャッチコピーは複数案を出してから最良を選ぶ\n' +
    '- 事務所実写真（弁護士写真フォルダ）を優先使用\n' +
    '- CTAは明確で行動しやすくする\n' +
    '- 法的に問題のある表現を使わない\n' +
    '- スマートフォンでの可読性を考慮する（1行25文字以内、ボタン48px以上、フォント16px以上）\n' +
    '- 恐怖訴求は効果低い傾向あり。使用は慎重に';
};

// 品質チェックリスト（outputTypeに応じて切替）
FinalSynthesizer.prototype._getQualityChecklist = function(outputType) {
  if (outputType === 'dm') {
    return '【DM品質基準】\n' +
      '- 件名で開封率を最大化する表現か\n' +
      '- 本文は300文字以内で価値が伝わるか\n' +
      '- CTAは1つに絞られているか';
  }
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
