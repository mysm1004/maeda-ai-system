// v3.1統合版: フェーズ共通パイプライン
// v2.0のノウハウ完全移植: 就寝モード対応、Phase4-6サービス連携、好み学習

var Orchestrator = require('../agents/orchestrator');

function PhaseRunner(db, lineQA, sendLineFn) {
  this.orchestrator = new Orchestrator(db, lineQA, sendLineFn);
  this.db = db;
  this.lineQA = lineQA;
  this.sendLineFn = sendLineFn;

  // Phase4-6専用サービスの動的ロード（存在する場合のみ）
  this.listGenerator = null;
  this.adDesigner = null;
  this.mediaOptimizer = null;
  try { this.listGenerator = require('../src/services/list-generator'); } catch(e) {
    try { this.listGenerator = require('../../src/services/list-generator'); } catch(e2) {}
  }
  try { this.adDesigner = require('../src/services/ad-designer'); } catch(e) {
    try { this.adDesigner = require('../../src/services/ad-designer'); } catch(e2) {}
  }
  try { this.mediaOptimizer = require('../src/services/media-optimizer'); } catch(e) {
    try { this.mediaOptimizer = require('../../src/services/media-optimizer'); } catch(e2) {}
  }
}

// PreferenceLearner注入（server.jsから呼ばれる）
PhaseRunner.prototype.setPrefLearner = function(prefLearner) {
  this.orchestrator.setPrefLearner(prefLearner);
};

// フェーズ実行
PhaseRunner.prototype.run = async function(phaseNum, ctx) {
  // フェーズ固有プロンプトを注入
  var phaseModule = this._getPhaseModule(phaseNum);
  if (phaseModule) {
    ctx.phasePrompt = phaseModule.getPrompt(ctx);
  }

  // ========== 工程0: フェーズ専用リサーチ（Phase2-6） ==========
  // Phase1は独立した3エージェント並列調査（orchestrator.runResearch）が担うので除外
  if (phaseNum >= 2) {
    try {
      var PhaseResearcher = require('../agents/phase_researcher');
      var researcher = new PhaseResearcher(this.db);

      console.log('[PhaseRunner] Phase' + phaseNum + ' 工程0: 専用リサーチ (Opus 4.6) 実行中...');
      var researchResult = await researcher.run({
        topic: ctx.topic,
        projectId: ctx.projectId,
        sessionId: ctx.sessionId,
        phase: phaseNum,
        previousOutput: ctx.previousOutput || '',
        outputType: ctx.outputType || 'general'
      });

      // リサーチ結果をコンテキストに追加（全エージェントが参照できるようにする）
      ctx.phaseResearch = researchResult;
      ctx.phasePrompt = (ctx.phasePrompt || '') +
        '\n\n【Phase' + phaseNum + '専用リサーチ結果（工程0）】\n' + researchResult;

      // DBに保存
      try {
        this.db.prepare(
          'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content, agent_name, team) VALUES (?,?,?,0,?,?,?,?,?,?)'
        ).run(ctx.sessionId, ctx.projectId || null, phaseNum,
          'Phase' + phaseNum + '専用リサーチ', 'claude', 'Phase' + phaseNum + '専用リサーチ (Opus4.6)',
          researchResult, 'phase_researcher', 'research');
      } catch(e) {
        try {
          this.db.prepare(
            'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content) VALUES (?,?,?,0,?,?,?,?)'
          ).run(ctx.sessionId, ctx.projectId || null, phaseNum,
            'Phase' + phaseNum + '専用リサーチ', 'claude', 'Phase' + phaseNum + '専用リサーチ (Opus4.6)', researchResult);
        } catch(e2) {}
      }

      console.log('[PhaseRunner] Phase' + phaseNum + ' 工程0: 専用リサーチ完了');
    } catch(e) {
      console.error('[PhaseRunner] Phase' + phaseNum + ' 専用リサーチエラー:', e.message);
      // リサーチ失敗してもパイプラインは続行
    }
  }

  // Phase4-6: 専用サービスが存在する場合はそちらを優先で連携
  if (phaseNum === 4 && this.listGenerator) {
    return await this._runPhase4WithService(ctx);
  }
  if (phaseNum === 5 && this.adDesigner) {
    return await this._runPhase5WithService(ctx);
  }
  if (phaseNum === 6 && this.mediaOptimizer) {
    return await this._runPhase6WithService(ctx);
  }

  // 共通パイプライン（Phase1-3、またはサービスなしのPhase4-6）
  return await this.orchestrator.runPhase(phaseNum, ctx);
};

// v2.0移植: Phase4 ListGenerator連携
PhaseRunner.prototype._runPhase4WithService = async function(ctx) {
  console.log('[PhaseRunner] Phase4: ListGenerator + v3.1パイプライン併用');

  // まずv3.1パイプラインでリスト戦略を策定
  var strategyResult = await this.orchestrator.runPhase(4, ctx);

  // ListGeneratorでDB保存
  if (this.listGenerator && strategyResult.success) {
    try {
      var ListGen = this.listGenerator;
      var gen = new ListGen(this.db, this.lineQA, this.sendLineFn);
      await gen.generateFull(ctx.sessionId, ctx.isSleep || false);
      console.log('[PhaseRunner] Phase4: ListGenerator完了');
    } catch(e) {
      console.error('[PhaseRunner] Phase4 ListGeneratorエラー:', e.message);
      strategyResult.teamErrors = (strategyResult.teamErrors || []).concat(['ListGenerator: ' + e.message]);
    }
  }
  return strategyResult;
};

// v2.0移植: Phase5 AdDesigner連携
PhaseRunner.prototype._runPhase5WithService = async function(ctx) {
  console.log('[PhaseRunner] Phase5: AdDesigner + v3.1パイプライン併用');
  var strategyResult = await this.orchestrator.runPhase(5, ctx);

  if (this.adDesigner && strategyResult.success) {
    try {
      var AdDes = this.adDesigner;
      var designer = new AdDes(this.db, this.lineQA, this.sendLineFn);
      await designer.generateFull(ctx.sessionId, ctx.isSleep || false);
      console.log('[PhaseRunner] Phase5: AdDesigner完了');
    } catch(e) {
      console.error('[PhaseRunner] Phase5 AdDesignerエラー:', e.message);
      strategyResult.teamErrors = (strategyResult.teamErrors || []).concat(['AdDesigner: ' + e.message]);
    }
  }
  return strategyResult;
};

// v2.0移植: Phase6 MediaOptimizer連携
PhaseRunner.prototype._runPhase6WithService = async function(ctx) {
  console.log('[PhaseRunner] Phase6: MediaOptimizer + v3.1パイプライン併用');
  var strategyResult = await this.orchestrator.runPhase(6, ctx);

  if (this.mediaOptimizer && strategyResult.success) {
    try {
      var MediaOpt = this.mediaOptimizer;
      var optimizer = new MediaOpt(this.db, this.lineQA, this.sendLineFn);
      await optimizer.generateFull(ctx.sessionId, ctx.mediaType || 'all', ctx.isSleep || false);
      console.log('[PhaseRunner] Phase6: MediaOptimizer完了');
    } catch(e) {
      console.error('[PhaseRunner] Phase6 MediaOptimizerエラー:', e.message);
      strategyResult.teamErrors = (strategyResult.teamErrors || []).concat(['MediaOptimizer: ' + e.message]);
    }
  }
  return strategyResult;
};

// v2.0移植: 就寝モード対応（server.jsのrunSleepModeから呼ばれる）
PhaseRunner.prototype.runSleepStep = async function(session) {
  var phaseNum = session.phase || 1;
  console.log('[PhaseRunner/Sleep] session:' + session.id + ' Phase' + phaseNum + ' 就寝モード実行');

  try {
    var result = await this.run(phaseNum, {
      sessionId: session.id,
      topic: session.topic,
      projectId: session.project_id,
      source: 'sleep',
      research: session.research_data,
      previousOutput: session.appeal_points || session.target_definition || '',
      outputType: 'general',
      isSleep: true
    });

    if (result.success) {
      console.log('[PhaseRunner/Sleep] session:' + session.id + ' Phase' + phaseNum + ' 完了');
      // 就寝モードではPhase完了後に自動で次フェーズには進まない（承認待ち）
      this.db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)')
        .run(session.id, 'v3_phase' + phaseNum + '_complete', 'success');
    }
    return result;
  } catch(e) {
    console.error('[PhaseRunner/Sleep] session:' + session.id + ' エラー:', e.message);
    this.db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)')
      .run(session.id, 'v3_error', e.message);
    throw e;
  }
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
