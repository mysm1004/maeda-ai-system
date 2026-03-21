// v3.1統合版: オーケストレーターエージェント
// v2.0の実戦ノウハウ（LINE SmartQA、品質自動評価、自動リトライ、好み学習書込み）を完全移植

var { TEAM_TIMEOUT } = require('../config/timeouts');
var PersonaAgent = require('./persona');
var DivergeClaude = require('./diverge_claude');
var CritiqueClaude = require('./critique_claude');
var SynthesizeClaude = require('./synthesize_claude');
var DivergeOpenAI = require('./diverge_openai');
var CritiqueOpenAI = require('./critique_openai');
var SynthesizeOpenAI = require('./synthesize_openai');
var RedteamAgent = require('./redteam');
var FactcheckAgent = require('./factcheck');
var FinalSynthesizer = require('./final_synthesizer');
var Reporter = require('./reporter');

// v2.0移植: 自動承認設定
var AUTO_APPROVE_CONFIG = {
  gradeA_threshold: 32,
  gradeB_threshold: 28,
  autoFixQuality: true,
  maxAutoFixRetries: 3
};

function Orchestrator(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA || null;
  this.sendLineFn = sendLineFn || null;
  this.reporter = new Reporter(sendLineFn);

  // エージェント初期化
  this.persona = new PersonaAgent(db);
  this.divergeClaude = new DivergeClaude(db);
  this.critiqueClaude = new CritiqueClaude(db);
  this.synthesizeClaude = new SynthesizeClaude(db);
  this.divergeOpenAI = new DivergeOpenAI(db);
  this.critiqueOpenAI = new CritiqueOpenAI(db);
  this.synthesizeOpenAI = new SynthesizeOpenAI(db);
  this.redteam = new RedteamAgent(db);
  this.factcheck = new FactcheckAgent(db);
  this.finalSynthesizer = new FinalSynthesizer(db);

  // v2.0移植: PreferenceLearnerの参照（server.jsから注入される）
  this.prefLearner = null;
}

// PreferenceLearner注入
Orchestrator.prototype.setPrefLearner = function(prefLearner) {
  this.prefLearner = prefLearner;
};

// メイン実行: 1フェーズ分のパイプラインを実行
Orchestrator.prototype.runPhase = async function(phaseNum, ctx) {
  var sessionId = ctx.sessionId;
  var topic = ctx.topic;
  var projectId = ctx.projectId;
  var source = ctx.source || 'api';
  var research = ctx.research || '';
  var previousOutput = ctx.previousOutput || '';
  var phasePrompt = ctx.phasePrompt || '';
  var outputType = ctx.outputType || 'general';
  var isSleep = ctx.isSleep || false;

  var log = [];
  var teamErrors = [];

  console.log('[Orchestrator] Phase' + phaseNum + ' 開始 (session:' + sessionId + ', project:' + projectId + ')');

  // 1. ペルソナエージェント
  console.log('[Orchestrator]   → ペルソナエージェント実行中...');
  var personaStart = Date.now();
  var personaResult = await this.persona.run({
    topic: topic, projectId: projectId, sessionId: sessionId,
    phase: phaseNum, research: research, previousOutput: previousOutput
  });
  log.push({ name: 'ペルソナ', model: 'claude', duration: Date.now() - personaStart, status: 'success' });
  this._saveLog(sessionId, projectId, phaseNum, 'persona', 'claude', 'ペルソナエージェント', personaResult);

  // v2.0移植: Phase1のペルソナ後にLINE SmartQA確認（非就寝モード時）
  if (phaseNum === 1 && this.lineQA && this.sendLineFn && !isSleep) {
    try {
      var dirCheck = await this._checkNeedsConfirmation(personaResult, topic);
      if (dirCheck.needsConfirmation) {
        var userDir = await this.lineQA.askUserViaLine({
          sessionId: sessionId, question: dirCheck.question,
          context: { phase: phaseNum, agent: 'persona', topic: topic },
          engineType: 'discussion', engineStep: 'v3_persona',
          pushLineFn: this.sendLineFn
        });
        if (userDir) personaResult += '\n\n【前田さんの方向性指示】\n' + userDir;
      }
    } catch (e) { console.log('[Orchestrator] ペルソナ確認スキップ:', e.message); }
  }

  // 2. Claudeチーム & OpenAIチーム 並列実行
  console.log('[Orchestrator]   → Claudeチーム & OpenAIチーム 並列実行中...');
  var teamCtx = {
    topic: topic, projectId: projectId, sessionId: sessionId,
    phase: phaseNum, persona: personaResult, research: research,
    previousOutput: previousOutput, phasePrompt: phasePrompt
  };

  var teamStart = Date.now();
  var teamTimer = new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('チーム全体タイムアウト')); }, TEAM_TIMEOUT);
  });

  var [claudeResult, openaiResult] = await Promise.allSettled([
    Promise.race([this._runClaudeTeam(teamCtx), teamTimer]),
    Promise.race([this._runOpenAITeam(teamCtx), teamTimer])
  ]);

  var claudeOutput = claudeResult.status === 'fulfilled' ? claudeResult.value : null;
  var openaiOutput = openaiResult.status === 'fulfilled' ? openaiResult.value : null;

  if (claudeResult.status === 'rejected') {
    teamErrors.push('Claudeチーム: ' + claudeResult.reason.message);
    console.error('[Orchestrator] Claudeチームエラー:', claudeResult.reason.message);
    if (this.sendLineFn) try { await this.sendLineFn('⚠️ Claudeチームタイムアウト（OpenAIチームのみで続行）'); } catch(e) {}
  }
  if (openaiResult.status === 'rejected') {
    teamErrors.push('OpenAIチーム: ' + openaiResult.reason.message);
    console.error('[Orchestrator] OpenAIチームエラー:', openaiResult.reason.message);
    if (this.sendLineFn) try { await this.sendLineFn('⚠️ OpenAIチームタイムアウト（Claudeチームのみで続行）'); } catch(e) {}
  }

  log.push({ name: 'チーム並列', model: 'both', duration: Date.now() - teamStart, status: claudeOutput || openaiOutput ? 'success' : 'failed' });

  // 両チーム失敗時は停止
  if (!claudeOutput && !openaiOutput) {
    var errMsg = '両チームでエラーが発生しました。リトライしてください。\n' + teamErrors.join('\n');
    console.error('[Orchestrator] ' + errMsg);
    if (this.sendLineFn) try { await this.sendLineFn('❌ 両チーム失敗: ' + errMsg.substring(0, 200)); } catch(e) {}
    return { success: false, error: errMsg, sessionId: sessionId, phase: phaseNum, agentLog: log, teamErrors: teamErrors };
  }

  // 3. レッドチームエージェント
  console.log('[Orchestrator]   → レッドチームエージェント実行中...');
  var rtStart = Date.now();
  var redteamResult = await this.redteam.run({
    topic: topic, projectId: projectId, sessionId: sessionId,
    phase: phaseNum, persona: personaResult,
    claudeOutput: claudeOutput ? claudeOutput.synthesize : '',
    openaiOutput: openaiOutput ? openaiOutput.synthesize : '',
    phasePrompt: phasePrompt
  });
  log.push({ name: 'レッドチーム', model: 'openai', duration: Date.now() - rtStart, status: 'success' });
  this._saveLog(sessionId, projectId, phaseNum, 'redteam', 'openai', 'レッドチームエージェント', redteamResult);

  // 4. ファクトチェックエージェント
  console.log('[Orchestrator]   → ファクトチェックエージェント実行中...');
  var fcStart = Date.now();
  var factcheckResult;
  try {
    factcheckResult = await this.factcheck.run({
      topic: topic, projectId: projectId, sessionId: sessionId,
      phase: phaseNum, redteamOutput: redteamResult,
      claudeOutput: claudeOutput ? claudeOutput.synthesize : '',
      openaiOutput: openaiOutput ? openaiOutput.synthesize : '',
      phasePrompt: phasePrompt
    });
    log.push({ name: 'ファクトチェック', model: 'claude', duration: Date.now() - fcStart, status: 'success' });
  } catch(e) {
    factcheckResult = '【要確認】ファクトチェック実行失敗: ' + e.message;
    teamErrors.push('ファクトチェック: ' + e.message);
    log.push({ name: 'ファクトチェック', model: 'claude', duration: Date.now() - fcStart, status: 'error' });
    if (this.sendLineFn) try { await this.sendLineFn('⚠️ ファクトチェック失敗（要確認フラグ付きで続行）'); } catch(e2) {}
  }
  this._saveLog(sessionId, projectId, phaseNum, 'factcheck', 'claude', 'ファクトチェックエージェント', factcheckResult);

  // 5. ⑦最終統合Claude
  console.log('[Orchestrator]   → ⑦最終統合Claude実行中...');
  var fsStart = Date.now();
  var finalResult = await this.finalSynthesizer.run({
    topic: topic, projectId: projectId, sessionId: sessionId,
    phase: phaseNum, persona: personaResult,
    claudeOutput: claudeOutput ? claudeOutput.synthesize : '',
    openaiOutput: openaiOutput ? openaiOutput.synthesize : '',
    redteamOutput: redteamResult,
    factcheckOutput: factcheckResult,
    phasePrompt: phasePrompt,
    outputType: outputType
  });
  log.push({ name: '最終統合', model: 'claude', duration: Date.now() - fsStart, status: 'success' });
  this._saveLog(sessionId, projectId, phaseNum, 'final_synthesizer', 'claude', '⑦最終統合Claude', finalResult);

  // JSON抽出
  var parsed = this._extractJSON(finalResult);

  // v2.0移植: 品質自動評価 + 自動リトライ（Phase3のみ）
  if (phaseNum === 3 && AUTO_APPROVE_CONFIG.autoFixQuality) {
    var qualityCheck = await this._runQualityCheck(finalResult, outputType, sessionId);
    var retryCount = 0;
    while (qualityCheck.needsFix && retryCount < AUTO_APPROVE_CONFIG.maxAutoFixRetries) {
      retryCount++;
      console.log('[Orchestrator] 品質不合格→自動修正試行 ' + retryCount + '/' + AUTO_APPROVE_CONFIG.maxAutoFixRetries);
      finalResult = await this.finalSynthesizer.run({
        topic: topic, projectId: projectId, sessionId: sessionId,
        phase: phaseNum, persona: personaResult,
        claudeOutput: claudeOutput ? claudeOutput.synthesize : '',
        openaiOutput: openaiOutput ? openaiOutput.synthesize : '',
        redteamOutput: redteamResult,
        factcheckOutput: factcheckResult + '\n\n【品質改善指示】\n' + qualityCheck.feedback,
        phasePrompt: phasePrompt, outputType: outputType
      });
      parsed = this._extractJSON(finalResult);
      qualityCheck = await this._runQualityCheck(finalResult, outputType, sessionId);
    }
    if (retryCount > 0) {
      log.push({ name: '品質自動修正', model: 'claude', duration: 0, status: retryCount + '回実施' });
      this._saveLog(sessionId, projectId, phaseNum, 'quality_autofix', 'claude', '品質自動修正(' + retryCount + '回)', qualityCheck.feedback);
    }
  }

  // セッション更新
  this._updateSession(sessionId, phaseNum, parsed);

  // v2.0移植: 品質スコアリング + 自動承認（Phase3のみ）
  var autoApproved = false;
  var qualityScores = null;
  if (phaseNum === 3) {
    qualityScores = await this._scoreAndAutoApprove(sessionId, outputType, finalResult, parsed, log);
    autoApproved = qualityScores ? qualityScores.autoApproved : false;
  }

  // v2.0移植: 好み学習書込み
  if (this.prefLearner && parsed && parsed.recommended) {
    try {
      this.prefLearner.learnFromPatternChoice(sessionId, parsed.recommended, outputType);
    } catch(e) {}
  }

  // 結果構造化
  var result = {
    success: true,
    sessionId: sessionId,
    phase: phaseNum,
    phaseName: this._getPhaseName(phaseNum),
    content: finalResult,
    patterns: parsed ? parsed.patterns : [],
    recommended: parsed ? parsed.recommended : null,
    recommendedReason: parsed ? parsed.recommended_reason : null,
    factCheckFlags: parsed ? parsed.fact_check_flags : [],
    agentLog: log,
    teamErrors: teamErrors,
    autoApproved: autoApproved,
    qualityScores: qualityScores
  };

  // レポート生成
  result.report = this.reporter.reportPhaseComplete(source, result);

  console.log('[Orchestrator] Phase' + phaseNum + ' 完了 (session:' + sessionId + ')');
  return result;
};

// Claudeチーム実行（①発散→②批判→③統合）
Orchestrator.prototype._runClaudeTeam = async function(ctx) {
  console.log('[Orchestrator]     ✓ ①発散Claude...');
  var divergeResult = await this.divergeClaude.run(ctx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'diverge_claude', 'claude', '①発散Claude', divergeResult);

  console.log('[Orchestrator]     ✓ ②批判Claude...');
  var critiqueCtx = Object.assign({}, ctx, { divergeOutput: divergeResult });
  var critiqueResult = await this.critiqueClaude.run(critiqueCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'critique_claude', 'claude', '②批判Claude', critiqueResult);

  console.log('[Orchestrator]     ✓ ③統合Claude...');
  var synthesizeCtx = Object.assign({}, ctx, { divergeOutput: divergeResult, critiqueOutput: critiqueResult });
  var synthesizeResult = await this.synthesizeClaude.run(synthesizeCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'synthesize_claude', 'claude', '③統合Claude', synthesizeResult);

  return { diverge: divergeResult, critique: critiqueResult, synthesize: synthesizeResult };
};

// OpenAIチーム実行（④発散→⑤批判→⑥統合）
Orchestrator.prototype._runOpenAITeam = async function(ctx) {
  console.log('[Orchestrator]     ✓ ④発散OpenAI...');
  var divergeResult = await this.divergeOpenAI.run(ctx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'diverge_openai', 'openai', '④発散OpenAI', divergeResult);

  console.log('[Orchestrator]     ✓ ⑤批判OpenAI...');
  var critiqueCtx = Object.assign({}, ctx, { divergeOutput: divergeResult });
  var critiqueResult = await this.critiqueOpenAI.run(critiqueCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'critique_openai', 'openai', '⑤批判OpenAI', critiqueResult);

  console.log('[Orchestrator]     ✓ ⑥統合OpenAI...');
  var synthesizeCtx = Object.assign({}, ctx, { divergeOutput: divergeResult, critiqueOutput: critiqueResult });
  var synthesizeResult = await this.synthesizeOpenAI.run(synthesizeCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'synthesize_openai', 'openai', '⑥統合OpenAI', synthesizeResult);

  return { diverge: divergeResult, critique: critiqueResult, synthesize: synthesizeResult };
};

// v2.0移植: 品質チェック
Orchestrator.prototype._runQualityCheck = async function(content, outputType, sessionId) {
  var BaseAgent = require('./base-agent');
  var agent = new BaseAgent(this.db, { name: 'quality_check', model: 'claude', maxTokens: 1500 });
  try {
    var result = await agent.callClaude(
      'アウトプットの品質を厳密にチェックしてください。不合格基準: 架空の数字、断定表現、法的リスク、デザインの問題。',
      '以下のアウトプットを品質チェック:\n\n' + content.substring(0, 5000) +
        '\n\nJSON形式で回答: {"pass": true/false, "score": 0-40, "feedback": "改善指示", "issues": ["問題1", "問題2"]}',
      { sessionId: sessionId, phase: 0 }
    );
    var m = result.match(/\{[\s\S]*\}/);
    if (m) {
      var parsed = JSON.parse(m[0]);
      return { needsFix: !parsed.pass, score: parsed.score || 0, feedback: parsed.feedback || '', issues: parsed.issues || [] };
    }
  } catch(e) {}
  return { needsFix: false, score: 0, feedback: '' };
};

// v2.0移植: 品質スコアリング + 自動承認
Orchestrator.prototype._scoreAndAutoApprove = async function(sessionId, outputType, finalResult, parsed, log) {
  var BaseAgent = require('./base-agent');
  var agent = new BaseAgent(this.db, { name: 'scorer', model: 'claude', maxTokens: 800 });
  var scores = [];

  // 各パターンをスコアリング
  var patterns = parsed ? parsed.patterns : [];
  for (var i = 0; i < patterns.length; i++) {
    var p = patterns[i];
    try {
      var scoreText = await agent.callClaude(
        'アウトプットの品質を4軸で採点。各軸1-10点。\n軸:\n- appeal: 訴求力\n- differentiation: 差別化\n- format: 体裁\n- impact: インパクト（ファーストビュー重視・AI感排除）',
        'パターン' + p.id + '「' + (p.name || '') + '」を採点:\n\n' + (p.concept || p.catchcopy || JSON.stringify(p)).substring(0, 2000) +
          '\n\nJSON: {"appeal":N,"differentiation":N,"format":N,"impact":N,"improvement":"改善1文"}',
        { sessionId: sessionId, phase: 3 }
      );
      var m = scoreText.match(/\{[\s\S]*\}/);
      if (m) {
        var s = JSON.parse(m[0]);
        var total = (s.appeal || 0) + (s.differentiation || 0) + (s.format || 0) + (s.impact || 0);
        try {
          this.db.prepare('INSERT INTO quality_scores (output_queue_id, session_id, pattern, score_appeal, score_differentiation, score_format, score_impact, total_score, improvement_points) VALUES (?,?,?,?,?,?,?,?,?)')
            .run(0, sessionId, p.id, s.appeal || 0, s.differentiation || 0, s.format || 0, s.impact || 0, total, s.improvement || '');
        } catch(e) {}
        scores.push({ pattern: p.id, total: total, grade: total >= 36 ? 'S' : total >= 32 ? 'A' : total >= 28 ? 'B' : total >= 24 ? 'C' : 'D' });
      }
    } catch(e) { console.error('[品質スコア] エラー:', e.message); }
  }

  // 自動承認判定（v2.0ロジック完全移植）
  var avgScore = scores.length > 0 ? scores.reduce(function(sum, s) { return sum + s.total; }, 0) / scores.length : 0;
  var autoApproved = false;

  if (avgScore >= AUTO_APPROVE_CONFIG.gradeA_threshold) {
    autoApproved = true;
    console.log('[AutoApprove] Grade A (' + avgScore.toFixed(1) + ') -> auto approved');
    if (this.sendLineFn) try { await this.sendLineFn('[Phase3完了] ' + outputType + ' Grade A (' + avgScore.toFixed(1) + '/40) 自動承認済'); } catch(e) {}
  } else if (avgScore >= AUTO_APPROVE_CONFIG.gradeB_threshold) {
    autoApproved = true;
    console.log('[AutoApprove] Grade B (' + avgScore.toFixed(1) + ') -> auto approved with notification');
    if (this.sendLineFn) try { await this.sendLineFn('[Phase3完了] ' + outputType + ' Grade B (' + avgScore.toFixed(1) + '/40) 自動承認済\n推奨: パターン' + (parsed ? parsed.recommended : '?')); } catch(e) {}
  } else {
    console.log('[AutoApprove] Grade C (' + avgScore.toFixed(1) + ') -> needs manual approval');
    if (this.sendLineFn) try { await this.sendLineFn('[要確認] ' + outputType + ' Grade C (' + avgScore.toFixed(1) + '/40)\n品質基準未達のため承認をお願いします'); } catch(e) {}
  }

  // LINE通知: スコア一覧
  if (this.sendLineFn && scores.length > 0) {
    var scoreMsg = '品質スコア:\n';
    scores.forEach(function(sc) { scoreMsg += sc.pattern + ': ' + sc.total + '/40(' + sc.grade + ')\n'; });
    try { await this.sendLineFn(scoreMsg); } catch(e) {}
  }

  log.push({ name: '品質スコア', model: 'claude', duration: 0, status: 'avg:' + avgScore.toFixed(1) });
  return { scores: scores, avgScore: avgScore, autoApproved: autoApproved };
};

// v2.0移植: 方向性確認判定
Orchestrator.prototype._checkNeedsConfirmation = async function(content, topic) {
  var BaseAgent = require('./base-agent');
  var agent = new BaseAgent(this.db, { name: 'confirm_check', model: 'claude', maxTokens: 500 });
  try {
    var result = await agent.callClaude(
      '議論結果を分析し、前田さんに方向性確認が必要か判定してください。複数の大きく異なる戦略案がある場合のみtrueにしてください。',
      '以下の結果に、方向性が大きく異なる複数案がありますか？\n\n' + content.substring(0, 2000) +
        '\n\nJSON: {"needsConfirmation": true/false, "question": "前田さんへの質問文（false時は空）"}',
      { sessionId: null, phase: 0 }
    );
    var m = result.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : { needsConfirmation: false, question: '' };
  } catch(e) { return { needsConfirmation: false, question: '' }; }
};

// discussion_logsに保存
Orchestrator.prototype._saveLog = function(sessionId, projectId, phase, agentName, role, label, content) {
  try {
    this.db.prepare(
      'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content, agent_name, team) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).run(sessionId, projectId || null, phase, phase, label, role, label, content, agentName,
      agentName.indexOf('openai') !== -1 ? 'openai_team' : agentName.indexOf('claude') !== -1 ? 'claude_team' : 'final');
  } catch(e) {
    try {
      this.db.prepare(
        'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content) VALUES (?,?,?,?,?,?,?,?)'
      ).run(sessionId, projectId || null, phase, phase, label, role, label, content);
    } catch(e2) { console.error('[Orchestrator] ログ保存エラー:', e2.message); }
  }
};

// セッション更新
Orchestrator.prototype._updateSession = function(sessionId, phaseNum, parsed) {
  if (parsed) {
    try {
      this.db.prepare(
        'UPDATE sessions SET phase = ?, target_definition = ?, appeal_points = ?, output_plan = ?, system_version = ?, updated_at = CURRENT_TIMESTAMP, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(phaseNum, parsed.target_definition || '', JSON.stringify(parsed.patterns || []), parsed.recommended || '', 'v3.1', sessionId);
    } catch(e) {
      try {
        this.db.prepare(
          'UPDATE sessions SET phase = ?, target_definition = ?, appeal_points = ?, output_plan = ?, updated_at = CURRENT_TIMESTAMP, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(phaseNum, parsed.target_definition || '', JSON.stringify(parsed.patterns || []), parsed.recommended || '', sessionId);
      } catch(e2) {}
    }
  }
};

// JSON抽出
Orchestrator.prototype._extractJSON = function(text) {
  var match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) match = text.match(/\{[\s\S]*"patterns"[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[1] || match[0]); } catch(e) { console.error('[Orchestrator] JSON解析エラー:', e.message); }
  }
  return null;
};

// フェーズ名取得
Orchestrator.prototype._getPhaseName = function(num) {
  var names = { 1: 'Phase1: アイデア磨き込み', 2: 'Phase2: 訴求磨き込み', 3: 'Phase3: LP/DM生成',
    4: 'Phase4: 営業リスト作成', 5: 'Phase5: 広告配信設計', 6: 'Phase6: 媒体最終最適化・入稿' };
  return names[num] || 'Phase' + num;
};

// フェーズ承認
Orchestrator.prototype.approvePhase = function(sessionId, phaseNum) {
  var nextPhase = phaseNum + 1;
  if (nextPhase > 6) {
    this.db.prepare("UPDATE sessions SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(sessionId);
    return { approved: true, nextPhase: null, message: '全フェーズ完了' };
  }
  this.db.prepare('UPDATE sessions SET phase = ?, updated_at = CURRENT_TIMESTAMP, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(nextPhase, sessionId);
  var session = this.db.prepare('SELECT project_id FROM sessions WHERE id = ?').get(sessionId);
  if (session && session.project_id) {
    this.db.prepare('UPDATE active_projects SET current_phase = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(nextPhase, session.project_id);
    this.db.prepare('INSERT INTO operation_logs (project_id, action, details) VALUES (?,?,?)').run(session.project_id, 'phase' + phaseNum + '_approved', 'Phase' + nextPhase + 'に進行');
  }
  // v2.0移植: 承認時の好み学習
  if (this.prefLearner) {
    try { this.prefLearner.learnFromDecision(sessionId, 'approved', 'phase' + phaseNum + '_complete', ''); } catch(e) {}
  }
  return { approved: true, nextPhase: nextPhase, message: 'Phase' + phaseNum + '承認。Phase' + nextPhase + 'に進行可能' };
};

// セッション作成（v2互換）
Orchestrator.prototype.createSession = function(title, topic, projectId) {
  var r = this.db.prepare('INSERT INTO sessions (title, topic, total_rounds, project_id, last_operated_at) VALUES (?, ?, 8, ?, CURRENT_TIMESTAMP)').run(title, topic, projectId || null);
  if (projectId) {
    this.db.prepare('UPDATE active_projects SET current_session_id = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(r.lastInsertRowid, projectId);
  }
  return r.lastInsertRowid;
};

// 事前調査（v2互換）
Orchestrator.prototype.runResearch = async function(topic, projectId) {
  var BaseAgent = require('./base-agent');
  var agent = new BaseAgent(this.db, { name: 'research', model: 'claude', maxTokens: 3000 });
  var officeDocs = agent.getOfficeDocs();
  var memory = agent.getMemory(projectId);
  var similarCases = agent.getSimilarCases(topic);

  return await agent.callClaude(
    agent.topicGuard(topic, projectId) + 'あなたはマーケティングリサーチの専門家です。「' + topic + '」の事前調査レポートを作成してください。',
    '★★★ 調査テーマ：「' + topic + '」★★★\n※他のテーマの情報は無視すること\n\nテーマ: ' + topic +
      '\n\n【事務所資料】\n' + (officeDocs || 'なし') +
      '\n\n【事務所HP】https://tslaw.or.jp/ の情報も参考にしてください' +
      '\n\n【類似過去案件】\n' + (similarCases || 'なし') +
      '\n\n【前田さんの好み】\n' + JSON.stringify(memory) +
      '\n\n調査項目：\n1. 競合LP・広告の傾向\n2. 業界トレンド\n3. 成功・失敗パターン\n4. 検索キーワード・口コミ表現\n5. 差別化の機会\n6. 市場規模・成長率\n7. 参入障壁',
    { sessionId: null, phase: 0 }
  );
};

module.exports = Orchestrator;
