// v3.1: フェーズ共通パイプライン
// 各フェーズはこのランナーを通して実行される
// ペルソナ→並列チーム→レッドチーム→ファクトチェック→最終統合

var Orchestrator = require('../agents/orchestrator');

function PhaseRunner(db, lineQA, sendLineFn) {
  this.orchestrator = new Orchestrator(db, lineQA, sendLineFn);
  this.db = db;
}

// フェーズ実行（フェーズ番号とコンテキストを受け取る）
PhaseRunner.prototype.run = async function(phaseNum, ctx) {
  // フェーズ固有プロンプトを注入
  var phaseModule = this._getPhaseModule(phaseNum);
  if (phaseModule) {
    ctx.phasePrompt = phaseModule.getPrompt(ctx);
  }

  // オーケストレーターに委譲
  return await this.orchestrator.runPhase(phaseNum, ctx);
};

// セッション作成（v2互換）
PhaseRunner.prototype.createSession = function(title, topic, projectId) {
  return this.orchestrator.createSession(title, topic, projectId);
};

// 事前調査（v2互換）
PhaseRunner.prototype.runResearch = async function(topic, projectId) {
  return await this.orchestrator.runResearch(topic, projectId);
};

// フェーズ承認
PhaseRunner.prototype.approvePhase = function(sessionId, phaseNum) {
  return this.orchestrator.approvePhase(sessionId, phaseNum);
};

// フェーズモジュールのロード
PhaseRunner.prototype._getPhaseModule = function(phaseNum) {
  try {
    switch (phaseNum) {
      case 1: return require('./phase1');
      case 2: return require('./phase2');
      case 3: return require('./phase3');
      case 4: return require('./phase4');
      case 5: return require('./phase5');
      case 6: return require('./phase6');
      default: return null;
    }
  } catch(e) {
    console.error('[PhaseRunner] フェーズモジュール読込エラー:', e.message);
    return null;
  }
};

module.exports = PhaseRunner;
