// v3.1: タイムアウト設定

module.exports = {
  AGENT_TIMEOUT: 120000,       // 各エージェント: 120秒（60秒→延長）
  TEAM_TIMEOUT: 300000,        // チーム全体（①〜③ or ④〜⑥）: 300秒（180秒→延長）
  SYNTHESIZER_TIMEOUT: 180000, // ⑦最終統合: 180秒（120秒→延長）
  PHASE_TIMEOUT: 900000        // フェーズ全体: 15分（10分→延長）
};
