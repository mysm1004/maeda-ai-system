// v3.1: Phase3 LP/DM生成
// プロ業者顔負けのLP HTMLおよびDMを3パターン生成

module.exports = {
  getPrompt: function(ctx) {
    var outputType = ctx.outputType || 'lp';

    var basePrompt = '【Phase3: LP/DM生成】\n' +
      '目的: プロ業者顔負けの' + (outputType === 'dm' ? 'DM' : 'LP HTML') + 'を3パターン生成\n' +
      'アウトプット種別: ' + outputType + '\n\n';

    if (outputType === 'dm') {
      basePrompt += '発散エージェントへの指示:\n' +
        '- DM件名を各訴求軸に5案以上\n' +
        '- 本文は300文字以内で価値が伝わる構成\n' +
        '- CTAは1つに絞る\n' +
        '- 開封率を最大化する件名表現\n\n';
    } else {
      basePrompt += '発散エージェントへの指示:\n' +
        '- LP構成（セクション順序・各セクションの役割）を提案\n' +
        '- ファーストビューの構成案を複数\n' +
        '- CTA配置・文言案\n' +
        '- 社会的証明（実績・事例）の配置\n\n';
    }

    basePrompt += '統合エージェントへの指示:\n' +
      '- ペルソナ視点での読了体験を評価\n' +
      '- CVR低下要因・離脱ポイントを特定\n\n' +
      '最終統合への指示:\n' +
      '- 3パターンの最終構成を確定\n' +
      '- プロ業者基準チェックリストを全パターンに適用\n' +
      '- 完全自己完結型HTML（外部CSS/JSファイル参照禁止）\n' +
      '- モバイルファーストデザイン\n' +
      '- AI感のない人間的なデザイン\n' +
      '- 事務所の実際の情報・写真を優先使用（https://tslaw.or.jp/ 参照）\n\n' +
      'アセット優先順位: 事務所フォトフォルダ → Gemini生成 → ChatGPT生成 → フリー素材';

    return basePrompt;
  }
};
