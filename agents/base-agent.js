// v3.1: 全エージェント共通基底クラス
// API呼び出し、フォールバック、タイムアウト、ログ出力を統合

var Anthropic = require('@anthropic-ai/sdk');
var OpenAI = require('openai');
var { CLAUDE_MODEL, OPENAI_MODEL, FALLBACK_MODEL } = require('../config/models');
var { AGENT_TIMEOUT } = require('../config/timeouts');

function BaseAgent(db, opts) {
  opts = opts || {};
  this.db = db;
  this.name = opts.name || 'base';
  this.model = opts.model || 'claude';  // 'claude' or 'openai'
  this.maxTokens = opts.maxTokens || 4000;

  this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Claude→GPTフォールバック（既存パターン継承）
  var originalCreate = this.anthropic.messages.create.bind(this.anthropic.messages);
  var openai = this.openai;
  this.anthropic.messages.create = async function(params) {
    try {
      return await originalCreate(params);
    } catch (e) {
      if (e.status === 400 && e.message && e.message.indexOf('credit') !== -1) {
        console.error('[Claude→GPT fallback] クレジット不足:', e.message);
        var msgs = [];
        if (params.system) msgs.push({ role: 'system', content: params.system });
        msgs = msgs.concat(params.messages);
        var gptRes = await openai.chat.completions.create({
          model: FALLBACK_MODEL, max_completion_tokens: params.max_tokens || 4000, messages: msgs
        });
        var fallbackText = (gptRes.choices[0].message.content || gptRes.choices[0].message.refusal || '（フォールバック応答なし）') +
          '\n\n※Claude APIクレジット不足のためGPTで代替生成';
        return { content: [{ type: 'text', text: fallbackText }] };
      }
      throw e;
    }
  };
}

// タイムアウト付きAPI呼び出し（Claude）
BaseAgent.prototype.callClaude = async function(systemPrompt, userContent, opts) {
  opts = opts || {};
  var timeout = opts.timeout || AGENT_TIMEOUT;
  var maxTokens = opts.maxTokens || this.maxTokens;
  var startTime = Date.now();
  var self = this;

  var apiCall = this.anthropic.messages.create({
    model: opts.model || CLAUDE_MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userContent }]
  });

  var timer = new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('[' + self.name + '] タイムアウト (' + timeout + 'ms)')); }, timeout);
  });

  var res = await Promise.race([apiCall, timer]);
  var text = res.content[0].text;
  var duration = Date.now() - startTime;

  // エージェントログ保存
  this._logAgent(opts.sessionId, opts.phase, 'claude', duration, 'success', text.length);
  return text;
};

// タイムアウト付きAPI呼び出し（OpenAI）
BaseAgent.prototype.callOpenAI = async function(systemPrompt, userContent, opts) {
  opts = opts || {};
  var timeout = opts.timeout || AGENT_TIMEOUT;
  var maxTokens = opts.maxTokens || this.maxTokens;
  var startTime = Date.now();
  var self = this;

  var apiCall = this.openai.chat.completions.create({
    model: opts.model || OPENAI_MODEL,
    max_completion_tokens: maxTokens,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent }
    ]
  });

  var timer = new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('[' + self.name + '] タイムアウト (' + timeout + 'ms)')); }, timeout);
  });

  var res = await Promise.race([apiCall, timer]);
  var text = res.choices[0].message.content || res.choices[0].message.refusal || '（応答なし）';
  var duration = Date.now() - startTime;

  this._logAgent(opts.sessionId, opts.phase, 'openai', duration, 'success', text.length);
  return text;
};

// モデル種別に応じた呼び出し
BaseAgent.prototype.call = async function(systemPrompt, userContent, opts) {
  if (this.model === 'openai') {
    return this.callOpenAI(systemPrompt, userContent, opts);
  }
  return this.callClaude(systemPrompt, userContent, opts);
};

// エージェント実行ログをDBに保存
BaseAgent.prototype._logAgent = function(sessionId, phase, model, durationMs, status, outputLen) {
  try {
    this.db.prepare(
      'INSERT INTO agent_logs (session_id, phase, agent_name, model, duration_ms, status, error_message, created_at) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)'
    ).run(sessionId || null, phase || null, this.name, model, durationMs, status, outputLen ? 'output_len:' + outputLen : null);
  } catch(e) {
    // agent_logsテーブルがない場合は無視（v2互換）
  }
};

// エラーログ
BaseAgent.prototype._logError = function(sessionId, phase, model, durationMs, error) {
  try {
    this.db.prepare(
      'INSERT INTO agent_logs (session_id, phase, agent_name, model, duration_ms, status, error_message, created_at) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)'
    ).run(sessionId || null, phase || null, this.name, model, durationMs, 'error', error);
  } catch(e) {}
};

// ヘルパー: 事務所資料取得（既存パターン継承）
BaseAgent.prototype.getOfficeDocs = function() {
  var fs = require('fs');
  var path = require('path');
  var dir = path.join(__dirname, '..', 'data', 'office-docs');
  if (!fs.existsSync(dir)) return null;
  var result = [];
  this._readDir(dir, result);
  return result.join('\n\n') || null;
};

BaseAgent.prototype._readDir = function(dir, result) {
  var fs = require('fs');
  var path = require('path');
  try {
    var items = fs.readdirSync(dir);
    for (var i = 0; i < items.length; i++) {
      var full = path.join(dir, items[i]);
      var stat = fs.statSync(full);
      if (stat.isDirectory()) this._readDir(full, result);
      else if (items[i].endsWith('.txt') || items[i].endsWith('.md')) {
        try { result.push('【' + items[i] + '】\n' + fs.readFileSync(full, 'utf8').substring(0, 2000)); } catch(e) {}
      }
    }
  } catch(e) {}
};

// ヘルパー: 記憶DB取得（既存パターン継承）
BaseAgent.prototype.getMemory = function(projectId) {
  var rows;
  if (projectId) {
    rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db WHERE (project_id = ? OR project_id IS NULL) ORDER BY confidence DESC LIMIT 30').all(projectId);
  } else {
    rows = this.db.prepare('SELECT category, subcategory, key, value FROM memory_db ORDER BY confidence DESC LIMIT 30').all();
  }
  var g = {};
  rows.forEach(function(r) {
    var cat = r.category + (r.subcategory ? '/' + r.subcategory : '');
    if (!g[cat]) g[cat] = {};
    g[cat][r.key] = r.value;
  });
  return g;
};

// ヘルパー: 類似案件取得
BaseAgent.prototype.getSimilarCases = function(topic) {
  var c = this.db.prepare("SELECT title, output_type, description FROM case_library ORDER BY created_at DESC LIMIT 10").all();
  if (c.length === 0) return null;
  return c.map(function(x) { return '[' + x.output_type + '] ' + x.title; }).join('\n');
};

// テーマ固定プレフィックス（クロス汚染防止）
BaseAgent.prototype.topicGuard = function(topic, projectId) {
  return '【最重要】分析対象テーマ：「' + topic + '」。' +
    (projectId ? 'project_id: ' + projectId + '。' : '') +
    'このテーマのみを分析すること。memory_dbや他プロジェクトの別テーマに絶対に引っ張られないこと。\n\n';
};

module.exports = BaseAgent;
