// v3.1: リサーチエージェント（Claude）
// 競合LP・SEO・料金・サービス内容・市場規模を網羅的に調査

var BaseAgent = require('./base-agent');

function ResearchClaude(db) {
  BaseAgent.call(this, db, { name: 'research_claude', model: 'claude', modelTier: 'best', maxTokens: 8000 });
}
ResearchClaude.prototype = Object.create(BaseAgent.prototype);
ResearchClaude.prototype.constructor = ResearchClaude;

ResearchClaude.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var officeDocs = this.getOfficeDocs();
  var memory = this.getMemory(projectId);
  var similarCases = this.getSimilarCases(topic);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたは法律事務所マーケティング専門のリサーチアナリストです。\n' +
    '「' + topic + '」について、以下の全項目を**網羅的かつ綿密に**調査してください。\n\n' +
    '【調査姿勢】\n' +
    '- 表面的な情報ではなく、具体的な数字・URL・事例を挙げる\n' +
    '- 「たぶん」「おそらく」ではなく、根拠を明示する\n' +
    '- 競合は名前を出して具体的に分析する\n' +
    '- 自分の知識の限界は正直に「最新データ要確認」と明記する\n' +
    '- 法律事務所特有の規制環境（弁護士広告規程等）を踏まえる';

  var userContent = '★★★ 調査テーマ：「' + topic + '」★★★\n\n' +
    '【事務所情報】\n' + ((officeDocs || '').substring(0, 3000) || 'なし') + '\n' +
    '【事務所HP】https://tslaw.or.jp/\n' +
    '【類似過去案件】\n' + (similarCases || 'なし') + '\n' +
    '【前田さんの好み】\n' + JSON.stringify(memory) + '\n\n' +

    '以下を全て網羅的に調査してください：\n\n' +

    '## 1. 競合調査（最重要）\n' +
    '- 競合法律事務所・サービスを最低10社リストアップ（名称・URL・所在地・規模）\n' +
    '- 各競合のLP構成分析（FV・CTA・訴求軸・デザインの特徴）\n' +
    '- 各競合の料金体系・価格帯（具体的な金額）\n' +
    '- 各競合の差別化ポイント・USP\n' +
    '- 各競合の強み3つ・弱み3つ\n' +
    '- 競合のGoogle口コミ・評判の傾向\n' +
    '- 競合の広告出稿状況（リスティング広告のキーワード・広告文）\n\n' +

    '## 2. SEO・検索環境\n' +
    '- メインキーワード・関連キーワード30個以上（検索ボリューム推定付き）\n' +
    '- 検索意図の分類（情報収集型/比較検討型/行動型）\n' +
    '- 検索結果1ページ目の構成（広告枠・オーガニック・ナレッジパネル等）\n' +
    '- 競合のSEO強度（ドメインパワー推定・被リンク傾向）\n' +
    '- ロングテールキーワードの機会\n' +
    '- AI Overview（SGE）での表示傾向\n\n' +

    '## 3. 市場分析\n' +
    '- 市場規模（TAM/SAM/SOM、金額ベース）\n' +
    '- 市場成長率・トレンド（過去5年・今後5年の見通し）\n' +
    '- 法改正・制度変更の影響\n' +
    '- 季節性・時期による需要変動\n' +
    '- 地域別の需要分布\n\n' +

    '## 4. 顧客の声・リアルな表現\n' +
    '- Yahoo知恵袋・教えてgoo等の実際の質問20件以上（要約）\n' +
    '- Google口コミで使われるリアルな表現15個以上\n' +
    '- SNS（X/Instagram）での関連投稿の傾向\n' +
    '- 顧客が使う検索フレーズ（「〇〇 弁護士 費用」等）\n\n' +

    '## 5. 成功・失敗パターン\n' +
    '- 同業界で成果が出ているLP・広告のパターン（具体例）\n' +
    '- 失敗しているパターンとその理由\n' +
    '- 異業種（医療・不動産等）の成功事例で応用可能なもの\n\n' +

    '## 6. 参入障壁・リスク\n' +
    '- 新規参入の障壁（資格・信頼構築・広告規制等）\n' +
    '- 弁護士広告規程上の制約\n' +
    '- 景品表示法上のリスク\n' +
    '- 価格競争のリスク\n\n' +

    '## 7. 差別化の機会\n' +
    '- 競合が手薄な領域・未開拓のニッチ\n' +
    '- 前田事務所の強みを活かせるポイント\n' +
    '- テクノロジー活用の余地（AI・LINEbot・オンライン相談等）\n' +
    '- コンテンツマーケティングの機会';

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: 0, maxTokens: 8000, timeout: 90000
  });
};

module.exports = ResearchClaude;
