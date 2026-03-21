// v3.1: モデル設定の一元管理
// アップデート時はここを変更するだけで全エージェントに反映
// 各ファイルにモデル名を直書きしないこと

module.exports = {
  // 最高性能モデル（市場調査・最終統合・ファクトチェック専用）
  // 複雑な推論・長文処理・品質最優先タスクに使用
  claude_best: 'claude-opus-4-6-20260219',

  // 標準Claudeモデル（コアパイプライン全般）
  claude_standard: 'claude-opus-4-5-20251101',

  // OpenAI
  openai: 'gpt-5.4',           // gpt-4o → gpt-5.4 に更新
  openai_fast: 'gpt-5.4-mini', // 軽量タスク用（将来対応）

  // フォールバック用
  fallback: 'gpt-5.4'
};
