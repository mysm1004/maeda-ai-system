// v3.1: リサーチエージェント（OpenAI / GPT-5.4）
// Claudeとは独立して並列調査。異なる視点・データソースを重視

var BaseAgent = require('./base-agent');

function ResearchOpenAI(db) {
  BaseAgent.call(this, db, { name: 'research_openai', model: 'openai', maxTokens: 8000 });
}
ResearchOpenAI.prototype = Object.create(BaseAgent.prototype);
ResearchOpenAI.prototype.constructor = ResearchOpenAI;

ResearchOpenAI.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var officeDocs = this.getOfficeDocs();
  var memory = this.getMemory(projectId);
  var similarCases = this.getSimilarCases(topic);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたは市場調査のプロフェッショナルアナリストです。\n' +
    '「' + topic + '」について、Claudeとは**独立して**網羅的に調査してください。\n\n' +
    '【調査姿勢】\n' +
    '- Claudeが見落としがちな視点を重視\n' +
    '- グローバルな事例・最新テクノロジートレンドに強みを活かす\n' +
    '- 定量データ・統計を多めに\n' +
    '- 消費者行動データ・心理学的知見を活用\n' +
    '- 具体的な数字・URL・事例を挙げる\n' +
    '- 根拠が不確実な場合は「要検証」と明記';

  var userContent = '★★★ 調査テーマ：「' + topic + '」★★★\n\n' +
    '【事務所情報】\n' + ((officeDocs || '').substring(0, 2000) || 'なし') + '\n' +
    '【事務所HP】https://tslaw.or.jp/\n' +
    '【類似過去案件】\n' + (similarCases || 'なし') + '\n' +
    '【前田さんの好み】\n' + JSON.stringify(memory) + '\n\n' +

    '以下を全て調査してください（Claudeとは異なる切り口で）：\n\n' +

    '## 1. 競合の商品・サービス内容の深掘り\n' +
    '- 主要競合10社以上のサービスメニュー詳細（何をいくらで提供しているか）\n' +
    '- 各競合の集客チャネル分析（SEO/広告/SNS/紹介/メディア露出）\n' +
    '- 各競合のコンバージョン動線分析（LP→問合せの流れ）\n' +
    '- 各競合のコンテンツ戦略（ブログ・YouTube・SNSの内容と頻度）\n' +
    '- 新興の競合・異業種からの参入者\n\n' +

    '## 2. LP・広告クリエイティブの徹底分析\n' +
    '- 競合LPのFV（ファーストビュー）で使われているキャッチコピー一覧\n' +
    '- 競合LPのCTA文言・配置パターン\n' +
    '- 競合LPの社会的証明の使い方（実績数字・口コミ・メディア掲載）\n' +
    '- リスティング広告の広告文・表示URL・拡張機能の使い方\n' +
    '- Meta広告・LINE広告のクリエイティブ傾向\n\n' +

    '## 3. 消費者インサイト\n' +
    '- このサービスを探す人の典型的な検索ジャーニー（最初の検索→比較→決定）\n' +
    '- 購入/問合せの決め手トップ5（消費者調査・口コミから推定）\n' +
    '- 問合せしない理由トップ5と克服法\n' +
    '- 価格感度分析（いくらなら安い/妥当/高いと感じるか）\n' +
    '- 季節・曜日・時間帯による検索需要の変動パターン\n\n' +

    '## 4. デジタルマーケティング環境\n' +
    '- 関連キーワードの検索ボリューム推定（メイン・サブ・ロングテール各10以上）\n' +
    '- リスティング広告のCPC推定（キーワード別）\n' +
    '- SEO難易度評価（上位表示に必要な施策規模の推定）\n' +
    '- SNSでのエンゲージメント傾向（どんな投稿がバズるか）\n' +
    '- 法律系YouTubeチャンネルの成功パターン\n\n' +

    '## 5. 市場の構造変化・将来予測\n' +
    '- AI・テクノロジーによる業界変化（AI法律相談サービスの台頭等）\n' +
    '- 法改正の影響と機会\n' +
    '- 人口動態・社会変化による需要シフト\n' +
    '- 3年後の市場予測\n\n' +

    '## 6. 海外事例・異業種ベストプラクティス\n' +
    '- 海外（米国・英国等）の法律事務所マーケティング成功事例\n' +
    '- 異業種（医療・不動産・金融）のLP/広告で応用可能なパターン\n' +
    '- 最新のマーケティングテクノロジー活用事例';

  return await this.callOpenAI(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: 0, maxTokens: 8000, timeout: 90000
  });
};

module.exports = ResearchOpenAI;
