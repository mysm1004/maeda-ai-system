// v3.1: リサーチ検証・統合エージェント（Claude）
// Claude調査とGPT調査の結果を照合・検証・統合して最終リサーチレポートを生成

var BaseAgent = require('./base-agent');

function ResearchVerifier(db) {
  BaseAgent.call(this, db, { name: 'research_verifier', model: 'claude', maxTokens: 8000 });
}
ResearchVerifier.prototype = Object.create(BaseAgent.prototype);
ResearchVerifier.prototype.constructor = ResearchVerifier;

ResearchVerifier.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var claudeResearch = ctx.claudeResearch;
  var openaiResearch = ctx.openaiResearch;

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはリサーチ品質管理の専門家です。\n' +
    '2つの独立した調査チーム（Claude調査チームとOpenAI調査チーム）の結果を受け取りました。\n\n' +
    'あなたの仕事は：\n' +
    '1. 両チームの調査結果を照合し、**矛盾・不一致を特定**する\n' +
    '2. 片方のみが発見した重要情報を**漏れなく拾い上げる**\n' +
    '3. 両チームが一致した情報に**高い信頼度**を付与する\n' +
    '4. 数字・データの**整合性をチェック**する（矛盾する数字は両方記載し「要検証」と明記）\n' +
    '5. 最終的に**1つの統合リサーチレポート**にまとめる\n\n' +
    '【検証基準】\n' +
    '- 両チーム一致 → 信頼度:高\n' +
    '- 片方のみ記載（もう片方が否定していない） → 信頼度:中\n' +
    '- 両チームで矛盾 → 信頼度:要検証（両方の数字を併記）\n' +
    '- 根拠不明の主張 → 信頼度:低（「根拠要確認」と明記）';

  var userContent = '★★★ テーマ：「' + topic + '」★★★\n\n' +

    '【Claude調査チームの結果】\n' + claudeResearch + '\n\n' +
    '═══════════════════════════\n\n' +
    '【OpenAI調査チームの結果】\n' + openaiResearch + '\n\n' +

    '以下の形式で統合リサーチレポートを作成してください：\n\n' +

    '## 調査結果の照合\n' +
    '- 両チーム一致した重要事実（信頼度:高）\n' +
    '- 矛盾・不一致のある情報（信頼度:要検証、両方の数字を併記）\n' +
    '- 片方のみが発見した重要情報（信頼度:中）\n\n' +

    '## 統合リサーチレポート\n\n' +

    '### 1. 競合分析（統合版）\n' +
    '- 競合リスト（両チームの結果を統合、重複排除）\n' +
    '- 各競合のLP・料金・訴求軸・強み弱み\n' +
    '- 競合の広告戦略・SEO戦略\n\n' +

    '### 2. SEO・検索環境（統合版）\n' +
    '- キーワードリスト（両チームの結果を統合、ボリューム推定付き）\n' +
    '- 検索意図分類\n' +
    '- SEO参入難易度\n\n' +

    '### 3. 市場分析（統合版）\n' +
    '- 市場規模（両チームの推定を比較、信頼度付き）\n' +
    '- 成長率・トレンド\n' +
    '- 法改正・制度変更の影響\n\n' +

    '### 4. 顧客インサイト（統合版）\n' +
    '- 検索ジャーニー\n' +
    '- リアルな声・表現\n' +
    '- 購入決め手・阻害要因\n\n' +

    '### 5. 成功・失敗パターン（統合版）\n' +
    '- 同業界の成功パターン\n' +
    '- 海外・異業種の応用可能な事例\n\n' +

    '### 6. 差別化の機会（統合版）\n' +
    '- 競合が手薄な領域\n' +
    '- 前田事務所の活かせる強み\n\n' +

    '### 7. リスク・参入障壁（統合版）\n\n' +

    '## 検証サマリー\n' +
    '- 信頼度:高の情報数\n' +
    '- 信頼度:要検証の情報数（要追加調査リスト）\n' +
    '- 調査の網羅性評価（5段階）\n' +
    '- 追加で調査すべき項目';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: 0, maxTokens: 8000, timeout: 120000
  });
};

module.exports = ResearchVerifier;
