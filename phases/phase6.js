// v3.1: Phase6 媒体最終最適化・入稿
// 広告媒体への実際の入稿・最適化

/**
 * [COMPUTER USE - 未実装]
 * Phase6の広告入稿（Meta広告・Google広告管理画面への直接操作）。
 * 現在はMediaOptimizerで入稿内容を生成するところまで。実際の入稿は手動。
 * Computer Use実装時はここに組み込む。
 * 参考: https://docs.anthropic.com/en/docs/build-with-claude/computer-use
 */

/**
 * [MCP - 未実装]
 * Phase6完了後の外部サービス連携（Notion・Slack等への結果自動連携）。
 * 連携先サービスが確定次第実装予定。
 * 現在はLINEへの完了通知のみ。
 */

module.exports = {
  getPrompt: function(ctx) {
    return '【Phase6: 媒体最終最適化・入稿】\n' +
      '目的: 広告媒体への実際の入稿内容の最終確定\n\n' +
      '発散エージェントへの指示:\n' +
      '- 各媒体の入稿仕様に合わせた広告文・画像サイズ案\n' +
      '- ABテスト用のバリエーション案\n\n' +
      'ファクトチェックへの指示:\n' +
      '- 入稿内容の法的表現を最終確認\n' +
      '- 各媒体の広告ポリシーとの整合性チェック\n\n' +
      '最終統合への指示:\n' +
      '- 各媒体への入稿内容を確定\n' +
      '- 入稿チェックリストを作成\n' +
      '- 運用開始後のモニタリング指標を定義';
  }
};
