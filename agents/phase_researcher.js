// v3.1: フェーズ専用リサーチエージェント（Claude Opus 4.6）
// 各フェーズの工程0として、そのフェーズに必要な市場調査を実施

var BaseAgent = require('./base-agent');

function PhaseResearcher(db) {
  BaseAgent.call(this, db, { name: 'phase_researcher', model: 'claude', maxTokens: 6000 });
}
PhaseResearcher.prototype = Object.create(BaseAgent.prototype);
PhaseResearcher.prototype.constructor = PhaseResearcher;

// フェーズ番号に応じた専用調査を実行
PhaseResearcher.prototype.run = async function(ctx) {
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var phaseNum = ctx.phase;
  var previousOutput = ctx.previousOutput || '';
  var outputType = ctx.outputType || 'general';
  var officeDocs = this.getOfficeDocs();
  var memory = this.getMemory(projectId);

  var prompt = this._getPhasePrompt(phaseNum, topic, outputType, previousOutput);

  var systemPrompt = this.topicGuard(topic, projectId) +
    'あなたはPhase' + phaseNum + '専用のリサーチャーです。\n' +
    'このフェーズの作業に直結する最新の市場情報・競合情報を網羅的に調査してください。\n\n' +
    '【調査姿勢】\n' +
    '- 具体的な競合名・URL・数字を挙げる\n' +
    '- 「たぶん」ではなく根拠を明示\n' +
    '- 不確実な情報は「要検証」と明記\n' +
    '- このフェーズの作業に役立つ情報に集中する（関係ない情報は省く）';

  var userContent = '★★★ テーマ：「' + topic + '」/ Phase' + phaseNum + '専用調査 ★★★\n\n' +
    '【事務所資料】\n' + ((officeDocs || '').substring(0, 2000) || 'なし') + '\n' +
    '【前田さんの好み】\n' + JSON.stringify(memory) + '\n' +
    (previousOutput ? '【前フェーズの結論】\n' + previousOutput.substring(0, 3000) + '\n\n' : '') +
    prompt;

  return await this.callClaude(systemPrompt, userContent, {
    sessionId: ctx.sessionId, phase: phaseNum, maxTokens: 6000, timeout: 90000,
    model: 'claude-opus-4-6'  // Opus 4.6指定
  });
};

// フェーズごとの専用調査プロンプト
PhaseResearcher.prototype._getPhasePrompt = function(phaseNum, topic, outputType, previousOutput) {
  switch (phaseNum) {

    case 2:
      return '【Phase2専用調査: 訴求・コピーライティングの市場調査】\n\n' +
        '## 1. 競合の訴求分析\n' +
        '- 競合10社以上のLP/広告で使われているキャッチコピーを全て列挙\n' +
        '- 各コピーの訴求軸の分類（恐怖訴求/ベネフィット/権威/共感/緊急性等）\n' +
        '- 競合間で頻出する訴求パターンと、逆に誰も使っていない切り口\n' +
        '- リスティング広告の広告文（見出し・説明文）を10社以上収集\n\n' +
        '## 2. 消費者に刺さる表現の調査\n' +
        '- Yahoo知恵袋・教えてgoo等で「' + topic + '」関連の質問タイトル20件以上\n' +
        '- Google口コミで法律事務所に対して使われるポジティブ/ネガティブ表現各10以上\n' +
        '- SNS（X）で「' + topic + '」関連の投稿に使われるリアルな言葉遣い\n' +
        '- 「相談しよう」と思った決め手として実際に語られている表現\n\n' +
        '## 3. コピーライティングのベストプラクティス\n' +
        '- 法律事務所LPで高CVRを出しているキャッチコピーのパターン分析\n' +
        '- 弁護士広告規程で使ってはいけない表現の具体例\n' +
        '- 士業・専門職のLP成功コピー事例（医師・税理士等からの応用）\n\n' +
        '## 4. 訴求の差別化機会\n' +
        '- 競合が使い古している訴求（避けるべきもの）\n' +
        '- 市場に存在しない新しい訴求角度の候補\n' +
        '- 前田事務所の強みを活かせる独自の訴求軸';

    case 3:
      return '【Phase3専用調査: LP/DM/コンテンツの市場調査】\n' +
        'アウトプット種別: ' + outputType + '\n\n' +
        '## 1. 競合LP/DMの徹底分析\n' +
        '- 競合10社以上のLPの構成を詳細に分析（セクション順序・各セクションの文字数・画像配置）\n' +
        '- 各競合LPのファーストビュー（FV）の構成要素（キャッチコピー・画像・CTA・サブコピー）\n' +
        '- CTAボタンの文言・色・配置パターン一覧\n' +
        '- 社会的証明の使い方（実績数字・お客様の声・メディア掲載ロゴ等）\n' +
        '- フォーム設計（項目数・必須/任意・ステップ数）\n' +
        '- ページ長さ・スクロール量の傾向\n\n' +
        '## 2. デザイン・UI/UXトレンド\n' +
        '- 法律事務所LPの最新デザイントレンド（配色・フォント・レイアウト）\n' +
        '- 高CVRのLP共通のデザイン特徴\n' +
        '- モバイルファーストで成功しているLPのUI特徴\n' +
        '- 「AI感がない」「人間味のある」デザインの具体的特徴\n\n' +
        '## 3. コンテンツ構成のベストプラクティス\n' +
        '- 問題提起→共感→解決→証拠→CTAの各セクションで競合が使っている具体的な文言\n' +
        '- FAQ/よくある質問で取り上げるべき項目（競合分析から）\n' +
        '- 料金表の見せ方パターン（明示/非明示、比較表等）\n\n' +
        '## 4. 技術・実装の調査\n' +
        '- 競合LPの読込速度・パフォーマンス傾向\n' +
        '- 使用されているCSS/JSフレームワーク・アニメーション\n' +
        '- 構造化データ（schema.org）の実装状況\n' +
        '- AMP対応・PWA対応の状況';

    case 4:
      return '【Phase4専用調査: 営業リスト・ターゲット企業の市場調査】\n\n' +
        '## 1. ターゲット企業・機関の調査\n' +
        '- 「' + topic + '」に関連する提携先・紹介元候補のリスト（業種別）\n' +
        '- 各業種のキープレイヤー（大手・中堅・地域密着別）\n' +
        '- 関連する業界団体・協会・公的機関のリスト\n\n' +
        '## 2. アプローチ手法の調査\n' +
        '- 士業の営業で成功しているアプローチ手法\n' +
        '- DM・FAX・テレアポ・メール各チャネルの業界別反応率データ\n' +
        '- 異業種連携（保険代理店・不動産・医療等）の成功パターン\n\n' +
        '## 3. 地域別の需要分析\n' +
        '- エリア別の潜在需要（人口・事業所数・訴訟件数等から推定）\n' +
        '- 競合がカバーしていない地域の特定';

    case 5:
      return '【Phase5専用調査: 広告配信・メディア環境の市場調査】\n\n' +
        '## 1. 広告媒体の調査\n' +
        '- Google広告: 「' + topic + '」関連キーワードのCPC・競合度・推奨予算\n' +
        '- Meta広告: 法律事務所のターゲティング設定ベストプラクティス\n' +
        '- LINE広告: 法律系の配信実績・CPM・CPC相場\n' +
        '- YouTube広告: 法律系コンテンツの広告効果データ\n' +
        '- ポータルサイト（弁護士ドットコム等）の掲載料金・効果\n\n' +
        '## 2. 競合の広告出稿状況\n' +
        '- リスティング広告の入札キーワード・広告文を10社以上\n' +
        '- SNS広告のクリエイティブ・ターゲティング傾向\n' +
        '- 競合の推定広告予算（出稿量から推定）\n\n' +
        '## 3. 予算別のROIシミュレーション\n' +
        '- 月額10万/30万/50万/100万の各予算帯での想定成果\n' +
        '- メディアミックスの最適配分パターン\n' +
        '- 法律事務所のCPA相場（問合せ1件あたりの獲得コスト）';

    case 6:
      return '【Phase6専用調査: 入稿・運用最適化の市場調査】\n\n' +
        '## 1. 各媒体の最新入稿仕様\n' +
        '- Google広告: レスポンシブ検索広告の文字数・画像サイズ・審査基準\n' +
        '- Meta広告: 画像/動画サイズ・テキスト量制限・広告ポリシー\n' +
        '- LINE広告: クリエイティブ仕様・審査基準・入稿フロー\n\n' +
        '## 2. 広告審査の注意点\n' +
        '- 法律事務所特有の審査落ちパターン（弁護士広告規程との整合性）\n' +
        '- 各媒体の広告ポリシーで引っかかりやすい表現\n' +
        '- 審査通過率を上げるテクニック\n\n' +
        '## 3. 運用最適化のベンチマーク\n' +
        '- 法律事務所の広告KPIベンチマーク（CTR/CVR/CPA業界平均）\n' +
        '- ABテストで効果が出やすい要素（見出し/画像/CTA）\n' +
        '- 初動2週間の最適化チェックリスト';

    default:
      return '【Phase' + phaseNum + '専用調査】\n' +
        '「' + topic + '」に関するPhase' + phaseNum + 'の作業に必要な最新市場情報を調査してください。';
  }
};

module.exports = PhaseResearcher;
