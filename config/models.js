// v3.1: モデル設定の一元管理
// アップデート時はここを変更するだけで全エージェントに反映

module.exports = {
  // メインモデル
  CLAUDE_MODEL: 'claude-opus-4-5-20250918',
  OPENAI_MODEL: 'gpt-5.4',
  GEMINI_MODEL: 'gemini-1.5-pro',

  // サマリー・レポート用（既存cronジョブ互換）
  CLAUDE_SUMMARY_MODEL: 'claude-opus-4-6',

  // フォールバック用
  FALLBACK_MODEL: 'gpt-5.4'
};
