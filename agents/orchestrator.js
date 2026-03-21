// v3.1: オーケストレーターエージェント
// フェーズ・プロジェクトの管理、エージェント実行順序制御
// 明示的な承認なしに次フェーズへ自動進行しない

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

function Orchestrator(db, lineQA, sendLineFn) {
  this.db = db;
  this.lineQA = lineQA || null;
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
}

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

  var log = [];
  var teamErrors = [];

  console.log('[Orchestrator] Phase' + phaseNum + ' 開始 (session:' + sessionId + ', project:' + projectId + ')');

  // 1. ペルソナエージェント
  console.log('[Orchestrator] ペルソナエージェント実行中...');
  var personaStart = Date.now();
  var personaResult = await this.persona.run({
    topic: topic, projectId: projectId, sessionId: sessionId,
    phase: phaseNum, research: research, previousOutput: previousOutput
  });
  log.push({ name: 'ペルソナ', model: 'claude', duration: Date.now() - personaStart, status: 'success' });
  this._saveLog(sessionId, projectId, phaseNum, 'persona', 'claude', 'ペルソナエージェント', personaResult);

  // 2. Claudeチーム & OpenAIチーム 並列実行
  console.log('[Orchestrator] Claudeチーム & OpenAIチーム 並列実行中...');
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
  }
  if (openaiResult.status === 'rejected') {
    teamErrors.push('OpenAIチーム: ' + openaiResult.reason.message);
    console.error('[Orchestrator] OpenAIチームエラー:', openaiResult.reason.message);
  }

  log.push({ name: 'チーム並列', model: 'both', duration: Date.now() - teamStart, status: claudeOutput || openaiOutput ? 'success' : 'failed' });

  // 両チーム失敗時は停止
  if (!claudeOutput && !openaiOutput) {
    var errMsg = '両チームでエラーが発生しました。リトライしてください。\n' + teamErrors.join('\n');
    console.error('[Orchestrator] ' + errMsg);
    return {
      success: false, error: errMsg, sessionId: sessionId, phase: phaseNum,
      agentLog: log, teamErrors: teamErrors
    };
  }

  // 3. レッドチームエージェント
  console.log('[Orchestrator] レッドチームエージェント実行中...');
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
  console.log('[Orchestrator] ファクトチェックエージェント実行中...');
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
  }
  this._saveLog(sessionId, projectId, phaseNum, 'factcheck', 'claude', 'ファクトチェックエージェント', factcheckResult);

  // 5. ⑦最終統合Claude
  console.log('[Orchestrator] ⑦最終統合Claude実行中...');
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

  // セッション更新
  this._updateSession(sessionId, phaseNum, parsed);

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
    teamErrors: teamErrors
  };

  // レポート生成
  result.report = this.reporter.reportPhaseComplete(source, result);

  console.log('[Orchestrator] Phase' + phaseNum + ' 完了 (session:' + sessionId + ')');
  return result;
};

// Claudeチーム実行（①発散→②批判→③統合）
Orchestrator.prototype._runClaudeTeam = async function(ctx) {
  var divergeResult = await this.divergeClaude.run(ctx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'diverge_claude', 'claude', '①発散Claude', divergeResult);

  var critiqueCtx = Object.assign({}, ctx, { divergeOutput: divergeResult });
  var critiqueResult = await this.critiqueClaude.run(critiqueCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'critique_claude', 'claude', '②批判Claude', critiqueResult);

  var synthesizeCtx = Object.assign({}, ctx, { divergeOutput: divergeResult, critiqueOutput: critiqueResult });
  var synthesizeResult = await this.synthesizeClaude.run(synthesizeCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'synthesize_claude', 'claude', '③統合Claude', synthesizeResult);

  return { diverge: divergeResult, critique: critiqueResult, synthesize: synthesizeResult };
};

// OpenAIチーム実行（④発散→⑤批判→⑥統合）
Orchestrator.prototype._runOpenAITeam = async function(ctx) {
  var divergeResult = await this.divergeOpenAI.run(ctx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'diverge_openai', 'openai', '④発散OpenAI', divergeResult);

  var critiqueCtx = Object.assign({}, ctx, { divergeOutput: divergeResult });
  var critiqueResult = await this.critiqueOpenAI.run(critiqueCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'critique_openai', 'openai', '⑤批判OpenAI', critiqueResult);

  var synthesizeCtx = Object.assign({}, ctx, { divergeOutput: divergeResult, critiqueOutput: critiqueResult });
  var synthesizeResult = await this.synthesizeOpenAI.run(synthesizeCtx);
  this._saveLog(ctx.sessionId, ctx.projectId, ctx.phase, 'synthesize_openai', 'openai', '⑥統合OpenAI', synthesizeResult);

  return { diverge: divergeResult, critique: critiqueResult, synthesize: synthesizeResult };
};

// discussion_logsに保存
Orchestrator.prototype._saveLog = function(sessionId, projectId, phase, agentName, role, label, content) {
  try {
    this.db.prepare(
      'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content, agent_name, team) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).run(sessionId, projectId || null, phase, phase, label, role, label, content, agentName,
      agentName.indexOf('openai') !== -1 ? 'openai_team' : agentName.indexOf('claude') !== -1 ? 'claude_team' : 'final');
  } catch(e) {
    // agent_name/teamカラムがない場合（v2互換）
    try {
      this.db.prepare(
        'INSERT INTO discussion_logs (session_id, project_id, phase, round_number, round_theme, role, role_label, content) VALUES (?,?,?,?,?,?,?,?)'
      ).run(sessionId, projectId || null, phase, phase, label, role, label, content);
    } catch(e2) {
      console.error('[Orchestrator] ログ保存エラー:', e2.message);
    }
  }
};

// セッション更新
Orchestrator.prototype._updateSession = function(sessionId, phaseNum, parsed) {
  if (parsed) {
    try {
      var targetDef = parsed.target_definition || '';
      var patterns = JSON.stringify(parsed.patterns || []);
      var recommended = parsed.recommended || '';
      this.db.prepare(
        'UPDATE sessions SET phase = ?, target_definition = ?, appeal_points = ?, output_plan = ?, system_version = ?, updated_at = CURRENT_TIMESTAMP, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).run(phaseNum, targetDef, patterns, recommended, 'v3.1', sessionId);
    } catch(e) {
      // system_versionカラムがない場合
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
    try {
      var jsonStr = match[1] || match[0];
      return JSON.parse(jsonStr);
    } catch(e) {
      console.error('[Orchestrator] JSON解析エラー:', e.message);
    }
  }
  return null;
};

// フェーズ名取得
Orchestrator.prototype._getPhaseName = function(num) {
  var names = {
    1: 'Phase1: アイデア磨き込み',
    2: 'Phase2: 訴求磨き込み',
    3: 'Phase3: LP/DM生成',
    4: 'Phase4: 営業リスト作成',
    5: 'Phase5: 広告配信設計',
    6: 'Phase6: 媒体最終最適化・入稿'
  };
  return names[num] || 'Phase' + num;
};

// フェーズ承認（次フェーズへの進行許可）
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
  }

  return { approved: true, nextPhase: nextPhase, message: 'Phase' + phaseNum + '承認。Phase' + nextPhase + 'に進行可能' };
};

// セッション作成（v2互換: createSession）
Orchestrator.prototype.createSession = function(title, topic, projectId) {
  var r = this.db.prepare('INSERT INTO sessions (title, topic, total_rounds, project_id, last_operated_at) VALUES (?, ?, 8, ?, CURRENT_TIMESTAMP)').run(title, topic, projectId || null);
  if (projectId) {
    this.db.prepare('UPDATE active_projects SET current_session_id = ?, last_operated_at = CURRENT_TIMESTAMP WHERE id = ?').run(r.lastInsertRowid, projectId);
  }
  return r.lastInsertRowid;
};

// 事前調査（v2互換: runResearch）
Orchestrator.prototype.runResearch = async function(topic, projectId) {
  var BaseAgent = require('./base-agent');
  var agent = new BaseAgent(this.db, { name: 'research', model: 'claude', maxTokens: 3000 });
  var officeDocs = agent.getOfficeDocs();
  var memory = agent.getMemory(projectId);
  var similarCases = agent.getSimilarCases(topic);

  var systemPrompt = agent.topicGuard(topic, projectId) +
    'あなたはマーケティングリサーチの専門家です。「' + topic + '」の事前調査レポートを作成してください。';

  var userContent = '★★★ 調査テーマ：「' + topic + '」★★★\n※他のテーマの情報は無視すること\n\nテーマ: ' + topic +
    '\n\n【事務所資料】\n' + (officeDocs || 'なし') +
    '\n\n【事務所HP】https://tslaw.or.jp/ の情報も参考にしてください' +
    '\n\n【類似過去案件】\n' + (similarCases || 'なし') +
    '\n\n【前田さんの好み】\n' + JSON.stringify(memory) +
    '\n\n調査項目：\n1. 競合LP・広告の傾向\n2. 業界トレンド\n3. 成功・失敗パターン\n4. 検索キーワード・口コミ表現\n5. 差別化の機会\n6. 市場規模・成長率\n7. 参入障壁';

  return await agent.callClaude(systemPrompt, userContent, { sessionId: null, phase: 0 });
};

module.exports = Orchestrator;
