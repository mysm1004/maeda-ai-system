require('dotenv').config();
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var cron = require('node-cron');
var https = require('https');
var { initDatabase } = require('./db/schema');
var DiscussionEngine = require('./services/discussion-engine');
var PreferenceLearner = require('./services/preference-learner');
var OutputGenerator = require('./services/output-generator');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
var Anthropic = require('@anthropic-ai/sdk');
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
var LineQA = require('./services/line-qa');
var ListGenerator = require('./services/list-generator');
var AdDesigner = require('./services/ad-designer');
var MediaOptimizer = require('./services/media-optimizer');
var Anthropic = require('@anthropic-ai/sdk');
var crypto = require('crypto');

var fs = require("fs");
var pathMod = require("path");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

var app = express();
var PORT = process.env.PORT || 3000;
var db = initDatabase(process.env.DB_PATH || './data/kabeuchi.db');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
var engine = new DiscussionEngine(db);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
var lineQA = new LineQA(db);
var engine = new DiscussionEngine(db, lineQA, sendLine);
var prefLearner = new PreferenceLearner(db);
var outputGen = new OutputGenerator(db, lineQA, sendLine);
var listGen = new ListGenerator(db, lineQA, sendLine);
var adDesigner = new AdDesigner(db, lineQA, sendLine);
var mediaOptimizer = new MediaOptimizer(db, lineQA, sendLine);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

// 認証（LINE Webhookは除外）
app.use('/api', function(req, res, next) {
  if (req.path === '/line/webhook') return next();
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
app.use('/outputs', express.static(pathMod.join(__dirname, 'public/outputs')));

// 認証（LINE Webhookは除外）
app.use('/api', function(req, res, next) {
  if (req.path === '/line/webhook' || req.path === '/deploy') return next();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  if (req.headers['x-api-key'] !== process.env.API_SECRET) {
    return res.status(401).json({ error: '認証エラー' });
  }
  next();
});

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Phase 1: 壁打ち（6ラウンド議論）
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
=======
// Phase 1: 壁打ち（8ステップ）
>>>>>>> Stashed changes
// ============================================

// 新規壁打ち開始 or 続行
app.post('/api/discussion', async function(req, res) {
  try {
    var body = req.body;
    var sid = body.sessionId;

    // 新規セッション作成
    if (!sid) {
      if (!body.topic) return res.status(400).json({ error: 'topicは必須' });
      sid = engine.createSession(body.title || body.topic, body.topic);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      // フェーズプラン設定
      var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
      var phasePlan = planMap[body.planPattern] || body.phasePlan || '1,2,3,4,5,6';
      var listCount = body.listCount || 100;
      db.prepare('UPDATE sessions SET phase_plan = ?, list_count = ? WHERE id = ?').run(phasePlan, listCount, sid);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      // 事前調査実行
      var research = await engine.runResearch(body.topic);
      db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
    }

    // ユーザーコメント保存
    if (body.userComment) {
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ?').get(sid);
      db.prepare('INSERT INTO discussion_logs (session_id, phase, role, role_label, content, round_number, round_theme) VALUES (?,1,?,?,?,?,?)')
        .run(sid, 'user', '前田さん', body.userComment, lr ? lr.mr || 1 : 1, '');
    }

    // 次のラウンド番号を決定
    var lr2 = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(sid, 'user');
    var round = (lr2 && lr2.mr ? lr2.mr : 0) + 1;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    if (round > 6) {
      // 全6ラウンド完了 → 最終統合
      var summary = await engine.generateFinalSummary(sid);
      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全6ラウンド完了。Phase2に進む準備ができました。' });
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if (round > 8) {
      // 全8ステップ完了 → 最終統合
      var summary = await engine.generateFinalSummary(sid);
      // Phase1レポート生成 + LINE通知
      try {
        var report = await engine.generatePhase1Report(sid);
        var reportUrl = generatePhase1ReportHTML(report, sid);
        var reportText = formatPhase1ReportText(report);
        await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
        console.log('[Phase1] レポート送信完了: ' + reportUrl);
      } catch (reportErr) {
        console.error('[Phase1Report] エラー:', reportErr.message);
      }
      // フェーズ自動進行
      advanceToNextPhase(sid, false).catch(function(e) { console.error('[Phase進行エラー]', e.message); });
      return res.json({ phase: 'complete', sessionId: sid, summary: summary, message: '全8ステップ完了。次フェーズに進む準備ができました。' });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }

    var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    var result = await engine.runRound(sid, session.topic, round, session.research_data, false);
    res.json(result);
  } catch (err) {
    console.error('[discussion]', err);
    res.status(500).json({ error: err.message });
  }
});

// 壁打ち承認/却下
app.post('/api/discussion/decide', function(req, res) {
  var body = req.body;
  if (!body.sessionId || !body.decision) return res.status(400).json({ error: 'sessionId, decision必須' });
  var last = db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
  db.prepare('INSERT INTO decisions (session_id, log_id, decision, comment) VALUES (?,?,?,?)')
    .run(body.sessionId, last ? last.id : null, body.decision, body.comment || null);
  if (last) prefLearner.learnFromDecision(body.sessionId, body.decision, body.comment, last.content);
  res.json({ success: true });
});

// セッション一覧
app.get('/api/discussion/sessions', function(req, res) {
  res.json(db.prepare('SELECT * FROM sessions ORDER BY updated_at DESC LIMIT 20').all());
});

// セッション詳細
app.get('/api/discussion/session/:id', function(req, res) {
  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
  if (!session) return res.status(404).json({ error: 'セッション未発見' });
  res.json(session);
});

// 議論ログ取得
app.get('/api/discussion/logs/:id', function(req, res) {
  res.json(db.prepare('SELECT * FROM discussion_logs WHERE session_id = ? ORDER BY created_at ASC').all(req.params.id));
});

// 最終サマリー手動生成
app.post('/api/discussion/finalize', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    var summary = await engine.generateFinalSummary(body.sessionId);
    res.json({ summary: summary });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ============================================
// Phase 2-3: アウトプット生成
// ============================================

// アウトプット生成（設計書→4パターン→批評→推奨）
app.post('/api/output/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    res.json(result);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // 即レスポンス（バックグラウンドで生成）
    res.json({ status: 'generating', sessionId: body.sessionId, outputType: body.outputType });
    (async function() {
      try {
        var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(body.sessionId);
        var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', fax:'FAX DM', email:'営業メール'};
        var result = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
        var htmlFile = generateOutputHTML(result, body.outputType, body.sessionId);
        var title = session ? session.title : '';
        await sendLine('ID:' + body.sessionId + ' ' + title + ' ' + (typeLabels[body.outputType] || body.outputType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);
      } catch(e) {
        console.error('[output API]', e);
        await sendLine('ID:' + body.sessionId + ' ' + (body.outputType || 'output') + '生成エラー。' + e.message);
      }
    })();
    return;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  } catch (err) {
    console.error('[output]', err);
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// 設計書のみ作成
app.post('/api/output/design', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    var doc = await outputGen.createDesignDoc(body.sessionId, body.outputType, body.params || {});
    res.json({ designDoc: doc });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// アウトプット承認
app.post('/api/output/approve', function(req, res) {
  var body = req.body;
  if (!body.queueId) return res.status(400).json({ error: 'queueId必須' });
  var caseId = outputGen.approveOutput(body.queueId, body.pattern || 'A', body.filePath, body.deployUrl);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  if (body.pattern) prefLearner.learnFromPatternChoice(null, body.pattern, body.outputType);
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
=======
  var approvedItem = db.prepare('SELECT * FROM output_queue WHERE id = ?').get(body.queueId);
  if (body.pattern) prefLearner.learnFromPatternChoice(approvedItem ? approvedItem.session_id : null, body.pattern, approvedItem ? approvedItem.output_type : body.outputType);
>>>>>>> Stashed changes
  res.json({ success: true, caseId: caseId });
});

// アウトプットキュー一覧
app.get('/api/output/queue', function(req, res) {
  var status = req.query.status || 'awaiting_approval';
  res.json(db.prepare('SELECT * FROM output_queue WHERE status = ? ORDER BY created_at DESC').all(status));
});

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// フェーズ遷移マネージャー
// ============================================

function getNextPhase(session) {
  var plan = (session.phase_plan || '1,2,3,4,5,6').split(',').map(Number);
  var idx = plan.indexOf(session.phase);
  return (idx >= 0 && idx < plan.length - 1) ? plan[idx + 1] : null;
}

async function advanceToNextPhase(sessionId, isSleep) {
  // 自動進行禁止: 完了通知だけ出して止まる
  var session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
  if (!session) return;
  var phaseLabels = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};
  var nextPhase = getNextPhase(session);
  if (!nextPhase) {
    await sendLine('ID:' + sessionId + ' ' + session.title + ' 全フェーズ完了しました。');
    db.prepare("UPDATE sessions SET status = 'completed' WHERE id = ?").run(sessionId);
    return;
  }
  // 完了通知のみ（自動で次フェーズに進まない）
  await sendLine('ID:' + sessionId + ' ' + session.title + ' ' + (phaseLabels[session.phase] || 'Phase'+session.phase) + '完了。次に進みますか？\n\n次: Phase' + nextPhase + '(' + (phaseLabels[nextPhase] || '') + ')\n「ID:' + sessionId + ' フェーズ' + nextPhase + '」で開始');
}

// ============================================
// Phase 4: 営業リスト API
// ============================================

app.post('/api/list/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    listGen.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[list/generate]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/list/:sessionId', function(req, res) {
  var entries = db.prepare('SELECT * FROM list_entries WHERE session_id = ? AND status = ? ORDER BY rank ASC, priority_score DESC').all(req.params.sessionId, 'active');
  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  res.json({ salesList: salesList, entries: entries, count: entries.length });
});

app.get('/api/list/:sessionId/excel', function(req, res) {
  var salesList = db.prepare('SELECT * FROM sales_lists WHERE session_id = ? AND excel_path IS NOT NULL ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  if (!salesList || !salesList.excel_path) return res.status(404).json({ error: 'Excel未生成' });
  var pathMod2 = require('path');
  res.download(salesList.excel_path, pathMod2.basename(salesList.excel_path));
});

app.post('/api/list/sample-check', function(req, res) {
  var body = req.body;
  if (!body.sessionId || !body.feedback) return res.status(400).json({ error: 'sessionId, feedback必須' });
  // pending_questionsのlist_sample_checkを解決
  var pending = db.prepare("SELECT * FROM pending_questions WHERE engine_type = 'list_sample_check' AND status = 'pending' ORDER BY id DESC LIMIT 1").get();
  if (pending) lineQA.resolveAnswer(pending.id, body.feedback);
  res.json({ success: true });
});

// ============================================
// Phase 5: 広告設計 API
// ============================================

app.post('/api/ad/generate', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    adDesigner.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[ad/generate]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/ad/:sessionId', function(req, res) {
  var adDesign = db.prepare('SELECT * FROM ad_designs WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(req.params.sessionId);
  if (!adDesign) return res.status(404).json({ error: '広告設計未生成' });
  res.json(adDesign);
});

// ============================================
// Phase 6: メディア最適化 API
// ============================================

app.post('/api/media/optimize', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'started', sessionId: body.sessionId });
    mediaOptimizer.generateFull(body.sessionId, false).then(function() {
      advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
    }).catch(function(e) { console.error('[media/optimize]', e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/media/:sessionId', function(req, res) {
  var opts = db.prepare('SELECT * FROM media_optimizations WHERE session_id = ? ORDER BY id DESC').all(req.params.sessionId);
  res.json(opts);
});

// ============================================
// フェーズプラン管理 API
// ============================================

app.post('/api/session/phase-plan', function(req, res) {
  var body = req.body;
  if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
  var planMap = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
  var plan = planMap[body.planPattern] || body.phasePlan;
  if (!plan) return res.status(400).json({ error: 'planPattern or phasePlan必須' });
  db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan, body.sessionId);
  if (body.listCount) db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(body.listCount, body.sessionId);
  res.json({ success: true, phase_plan: plan });
});

app.post('/api/session/phase-advance', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId) return res.status(400).json({ error: 'sessionId必須' });
    res.json({ status: 'advancing', sessionId: body.sessionId });
    advanceToNextPhase(body.sessionId, false).catch(function(e) { console.error(e); });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// 案件ライブラリ
// ============================================

app.get('/api/cases', function(req, res) {
  var type = req.query.type;
  if (type) {
    res.json(db.prepare('SELECT * FROM case_library WHERE output_type = ? ORDER BY created_at DESC').all(type));
  } else {
    res.json(db.prepare('SELECT * FROM case_library ORDER BY created_at DESC LIMIT 50').all());
  }
});

app.get('/api/cases/:id', function(req, res) {
  var c = db.prepare('SELECT * FROM case_library WHERE id = ?').get(req.params.id);
  if (!c) return res.status(404).json({ error: '案件未発見' });
  res.json(c);
});

// ============================================
// 好み・記憶DB
// ============================================

app.get('/api/preferences', function(req, res) { res.json(prefLearner.getAll()); });
app.post('/api/preferences', function(req, res) {
  prefLearner.addPreference(req.body.category, req.body.key, req.body.value, null, 'manual');
  res.json({ success: true });
});
app.get('/api/preferences/:category', function(req, res) {
  res.json(prefLearner.getByCategory(req.params.category));
});

// ============================================
// 音声メモ
// ============================================

app.post('/api/voice', function(req, res) {
  if (!req.body.text) return res.status(400).json({ error: 'text必須' });
  var r = db.prepare('INSERT INTO voice_memos (text, session_id) VALUES (?, ?)').run(req.body.text, req.body.sessionId || null);
  res.json({ success: true, id: r.lastInsertRowid });
});

app.get('/api/voice', function(req, res) {
  res.json(db.prepare('SELECT * FROM voice_memos WHERE processed = 0 ORDER BY created_at DESC').all());
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

// ============================================
// Phase1完了レポートHTML生成
// ============================================

function generatePhase1ReportHTML(report, sessionId) {
  var ts = Date.now();
  var fileName = 'phase1_report_' + sessionId + '_' + ts + '.html';
  var outputDir = pathMod.join(__dirname, 'public/outputs');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  var sections = [
    { num: '1', icon: '01', title: 'ターゲット', content: report.target || '' },
    { num: '2', icon: '02', title: '市場・競合分析', content: report.market || '' },
    { num: '3', icon: '03', title: 'サービス内容・強み・勝てる理由', content: report.service || '' },
    { num: '4', icon: '04', title: '売上・収支予想', content: report.revenue || '' },
    { num: '5', icon: '05', title: '課題・ネック・懸念点', content: report.challenges || '' },
    { num: '6', icon: '06', title: '議論における論点・仮説・立証根拠', content: report.discussion || '' }
  ];

  var sectionsHTML = sections.map(function(s) {
    var c = (s.content || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Markdown風装飾
    c = c.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    c = c.replace(/^[・-]\s*(.+)$/gm, '<li>$1</li>');
    c = c.replace(/(<li>.*<\/li>\n?)+/g, function(m) { return '<ul>' + m + '</ul>'; });
    c = c.replace(/\n/g, '<br>');
    return '<section class="report-section"><div class="section-header"><span class="section-num">' + s.num + '</span><h2>' + s.title + '</h2></div><div class="section-body">' + c + '</div></section>';
  }).join('');

  var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
  var topicEsc = (report.topic || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  var titleEsc = (report.title || report.topic || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
  html += '<title>Phase1完了レポート - ' + topicEsc + '</title>';
  html += '<style>';
  html += '*{margin:0;padding:0;box-sizing:border-box}';
  html += 'body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;background:#f8f9fa;color:#2c3e50;line-height:1.8}';
  html += '.header{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;padding:32px 20px 28px;text-align:center}';
  html += '.header h1{font-size:14px;font-weight:400;letter-spacing:2px;opacity:0.8;margin-bottom:8px}';
  html += '.header .topic{font-size:22px;font-weight:700;margin-bottom:6px}';
  html += '.header .meta{font-size:12px;opacity:0.6}';
  html += '.container{max-width:780px;margin:0 auto;padding:20px 16px 40px}';
  html += '.report-section{background:#fff;border-radius:12px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);overflow:hidden}';
  html += '.section-header{display:flex;align-items:center;gap:12px;padding:16px 20px 12px;border-bottom:1px solid #eef2f7}';
  html += '.section-num{display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:linear-gradient(135deg,#16213e,#0f3460);color:#fff;border-radius:50%;font-size:14px;font-weight:700;flex-shrink:0}';
  html += '.section-header h2{font-size:16px;color:#1a1a2e;font-weight:700}';
  html += '.section-body{padding:16px 20px 20px;font-size:14px;color:#444}';
  html += '.section-body strong{color:#1a1a2e}';
  html += '.section-body ul{margin:8px 0;padding-left:20px;list-style:none}';
  html += '.section-body li{position:relative;padding-left:16px;margin-bottom:4px}';
  html += '.section-body li:before{content:"";position:absolute;left:0;top:10px;width:6px;height:6px;background:#0f3460;border-radius:50%}';
  html += '.footer{text-align:center;padding:20px;font-size:11px;color:#999;border-top:1px solid #eee;margin-top:20px}';
  html += '@media(max-width:600px){.header{padding:24px 16px 20px}.header .topic{font-size:18px}.section-header h2{font-size:15px}.section-body{padding:14px 16px 16px;font-size:13px}}';
  html += '</style></head><body>';
  html += '<div class="header"><h1>PHASE 1 完了レポート</h1><div class="topic">' + titleEsc + '</div><div class="meta">セッションID: ' + sessionId + ' | ' + now + '</div></div>';
  html += '<div class="container">' + sectionsHTML + '</div>';
  html += '<div class="footer">前田法律事務所 AI壁打ちシステム | Phase1 壁打ち完了 → Phase2 訴求設計へ</div>';
  html += '</body></html>';

  fs.writeFileSync(pathMod.join(outputDir, fileName), html, 'utf8');
  console.log('[Phase1Report] HTML生成: ' + fileName);
  return 'https://176-32-87-118.sslip.io/outputs/' + fileName;
}

// Phase1レポートのLINEテキスト版を生成
function formatPhase1ReportText(report) {
  var msg = '【フェーズ1完了レポート】\n';
  msg += 'テーマ: ' + (report.title || report.topic) + '\n\n';
  msg += '① ターゲット\n→ ' + (report.target || '').substring(0, 300) + '\n\n';
  msg += '② 市場・競合分析\n→ ' + (report.market || '').substring(0, 300) + '\n\n';
  msg += '③ サービス内容・強み・勝てる理由\n→ ' + (report.service || '').substring(0, 300) + '\n\n';
  msg += '④ 売上・収支予想\n→ ' + (report.revenue || '').substring(0, 300) + '\n\n';
  msg += '⑤ 課題・ネック・懸念点\n→ ' + (report.challenges || '').substring(0, 300) + '\n\n';
  msg += '⑥ 議論における論点・仮説・立証根拠\n→ ' + (report.discussion || '').substring(0, 300);
  return msg;
}

// ============================================
// HTML出力生成 + LINE通知
// ============================================

function extractHTMLFromContent(raw) {
  // ```html ... ``` または ```html ... EOF を抽出
  var backtickIdx = raw.indexOf('```html');
  var html = null;
  if (backtickIdx >= 0) {
    var after = raw.substring(backtickIdx + 7).trim();
    var htmlStart = after.indexOf('<!DOCTYPE');
    if (htmlStart === -1) htmlStart = after.indexOf('<html');
    if (htmlStart >= 0) {
      html = after.substring(htmlStart);
      var closeIdx = html.lastIndexOf('```');
      if (closeIdx > 0) html = html.substring(0, closeIdx).trim();
      var endHtml = html.lastIndexOf('</html>');
      if (endHtml >= 0) html = html.substring(0, endHtml + 7);
    }
  }
  if (!html) {
    var m = raw.match(/```html\s*\n([\s\S]*?)```/);
    if (m) html = m[1].trim();
  }
  if (!html) {
    var trimmed = raw.trim();
    if (trimmed.indexOf("<!DOCTYPE") === 0 || trimmed.indexOf("<html") === 0) html = trimmed;
  }
  // HTML完全性チェック: </html>がない場合は補完
  if (html) {
    if (html.indexOf('</html>') === -1) {
      console.warn('[HTML警告] </html>タグなし - HTMLが途中で切れています。自動補完します。');
      if (html.indexOf('</style>') === -1) {
        html += '\n}\n</style>\n</head>\n<body>\n<div style="text-align:center;padding:60px 20px;font-family:sans-serif;"><h2 style="color:#e53e3e;margin-bottom:16px;">HTML生成が途中で中断されました</h2><p style="color:#666;">再生成してください。</p></div>\n</body>\n</html>';
        console.error('[HTML致命的] CSSの途中で切断。<body>コンテンツなし。再生成が必要です。');
      } else if (html.indexOf('</body>') === -1) {
        html += '\n</body>\n</html>';
      } else {
        html += '\n</html>';
      }
    }
    return html;
  }
  return '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>出力</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f8f9fa;color:#333;line-height:1.8;padding:24px;max-width:800px;margin:0 auto}.content{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}</style>' +
    '</head><body><div class="content">' + raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>") + '</div></body></html>';
}

// 既存アウトプットのURL一覧を返す（LINE「LP見せて」用）
function showExistingOutputs(text, types) {
  var idMatch = text.match(/(?:ID|id)\s*(\d+)/i);
  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料"};
  var query, params;
  if (idMatch) {
    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id WHERE oq.session_id = ? ORDER BY oq.created_at DESC";
    params = [parseInt(idMatch[1])];
  } else {
    query = "SELECT oq.*, s.title FROM output_queue oq JOIN sessions s ON oq.session_id = s.id ORDER BY oq.created_at DESC LIMIT 20";
    params = [];
  }
  var stmt = db.prepare(query);
  var rows = params.length > 0 ? stmt.all(params[0]) : stmt.all();
  if (types && types.length > 0) {
    rows = rows.filter(function(r) { return types.indexOf(r.output_type) >= 0; });
  }
  if (rows.length === 0) {
    sendLine("該当するアウトプットがまだありません。「LP作って」等で生成してください。");
    return "アウトプット未生成";
  }
  var outputDir = pathMod.join(__dirname, "public/outputs");
  var lines = [];
  rows.forEach(function(row) {
    var label = typeLabels[row.output_type] || row.output_type;
    var existingFiles = [];
    try { existingFiles = fs.readdirSync(outputDir).filter(function(f) { return f.indexOf(row.output_type + "_" + row.session_id + "_index_") === 0; }); } catch(e) {}
    var indexFile;
    if (existingFiles.length > 0) {
      indexFile = existingFiles[existingFiles.length - 1];
    } else {
      try {
        var patterns = JSON.parse(row.patterns || "[]");
        var result = { patterns: patterns, critique: row.critique || "", recommended: row.recommended_pattern || "" };
        indexFile = generateOutputHTML(result, row.output_type, row.session_id);
      } catch(e) { console.error("[showOutputs] HTML再生成エラー:", e.message); return; }
    }
    lines.push("ID:" + row.session_id + " " + (row.title || "") + " " + label + "\n\u{1F449} https://176-32-87-118.sslip.io/outputs/" + indexFile);
  });
  var msg = lines.join("\n\n");
  sendLine(msg);
  return msg;
}

function generateOutputHTML(result, outputType, sessionId) {
  var ts = Date.now();
  var outputDir = pathMod.join(__dirname, "public/outputs");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  var patterns = result.patterns || [];
  var critique = result.critique || "";
  var recommended = result.recommended || "";
  var session = db.prepare("SELECT title FROM sessions WHERE id = ?").get(sessionId);
  var title = session ? session.title : "";
  var typeLabels = {lp:"LP", proposal:"提案書", dm:"DM", sales_script:"営業スクリプト", blog:"ブログ", sns_post:"SNS投稿", banner:"バナー", fax:"FAX DM", email:"営業メール", seminar:"セミナー資料", press_release:"プレスリリース"};
  var typeLabel = typeLabels[outputType] || outputType;
  var labels = ["A (PASONA)", "B (ベネフィット直球)", "C (ストーリー)", "D (恐怖訴求)"];
  var patternFiles = [];
  // 各パターンを個別HTMLファイルとして保存
  patterns.forEach(function(p, i) {
    var letter = String.fromCharCode(65 + i);
    var raw = p.content || (typeof p === "string" ? p : JSON.stringify(p));
    var html = extractHTMLFromContent(raw);
    var fileName = outputType + "_" + sessionId + "_" + letter + "_" + ts + ".html";
    fs.writeFileSync(pathMod.join(outputDir, fileName), html, "utf8");
    patternFiles.push({ letter: letter, label: labels[i] || "パターン" + letter, file: fileName, star: recommended === letter });
  });
  // インデックスページ生成
  var indexName = outputType + "_" + sessionId + "_index_" + ts + ".html";
  var now = new Date().toLocaleString("ja-JP", {timeZone:"Asia/Tokyo"});
  var linksHtml = patternFiles.map(function(pf) {
    var star = pf.star ? " ⭐推奨" : "";
    return '<a href="/outputs/' + pf.file + '" class="card' + (pf.star ? ' recommended' : '') + '">' +
      '<span class="label">' + pf.label + star + '</span><span class="arrow">→</span></a>';
  }).join("");
  var indexHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' +
    '<title>' + typeLabel + ' - ID:' + sessionId + ' ' + title + '</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,Hiragino Sans,sans-serif;background:#f0f2f5;color:#333;padding:20px;max-width:600px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;text-align:center;margin-bottom:8px}.subtitle{text-align:center;color:#666;font-size:14px;margin-bottom:24px}.card{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:12px;text-decoration:none;color:#333;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:all 0.2s}.card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-2px)}.card.recommended{border:2px solid #ff9800;background:#fff8e1}.label{font-size:16px;font-weight:600}.arrow{font-size:20px;color:#888}.meta{text-align:center;font-size:12px;color:#999;margin-top:24px;padding-top:16px;border-top:1px solid #e0e0e0}</style></head><body>' +
    '<h1>' + typeLabel + '</h1><div class="subtitle">ID:' + sessionId + ' ' + title + '</div>' +
    linksHtml +
    '<div class="meta">前田法律事務所 AIシステム | ' + now + '</div></body></html>';
  fs.writeFileSync(pathMod.join(outputDir, indexName), indexHtml, "utf8");
  console.log("[HTML] 生成完了: " + indexName + " (" + patternFiles.length + "パターン)");
  return indexName;
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// ============================================
// LINE Webhook
// ============================================

app.post('/api/line/webhook', async function(req, res) {
  res.status(200).send('OK');
  try {
    var events = req.body.events || [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      console.log('[LINE Webhook] イベント受信:', JSON.stringify(ev.type), 'source:', JSON.stringify(ev.source));

      // followイベント（友だち追加）
      if (ev.type === 'follow') {
        var followUserId = ev.source.userId;
        console.log('==============================');
        console.log('[LINE] 友だち追加 ユーザーID: ' + followUserId);
        console.log('==============================');
        db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', followUserId, '[友だち追加]');
        if (ev.replyToken) await replyLine(ev.replyToken, '前田法律事務所AIシステムに接続しました。\nコマンド: 承認 / 却下 / 状態');
        continue;
      }

      if (ev.type !== 'message' || ev.message.type !== 'text') continue;
      var text = ev.message.text;
      var userId = ev.source.userId;

      console.log('==============================');
      console.log('[LINE] メッセージ受信 ユーザーID: ' + userId);
      console.log('[LINE] 内容: ' + text);
      console.log('==============================');

      db.prepare('INSERT INTO line_messages (direction, user_id, message) VALUES (?,?,?)').run('incoming', userId, text);

      var reply = await processLineCommand(text, userId);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      if (reply && ev.replyToken) {
        await replyLine(ev.replyToken, reply);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      if (reply) {
        var sent = false;
        if (ev.replyToken) sent = await replyLine(ev.replyToken, reply);
        if (!sent && userId) await pushLine(userId, reply);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        db.prepare('UPDATE line_messages SET reply = ? WHERE id = (SELECT MAX(id) FROM line_messages WHERE user_id = ?)').run(reply, userId);
      }
    }
  } catch (err) { console.error('[LINE webhook]', err); }
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
async function processLineCommand(text, userId) {
  var t = text.trim();
  // 承認
  if (t === '承認' || t === 'OK' || t === 'ok') {
    var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


// ============================================
// アウトプット指示検出: 「LP作って」「提案書お願い」等
// ============================================
function detectOutputRequest(t) {
  var outputMap = {
    'lp': /LP|ランディング|ＬＰ/i,
    'proposal': /提案書|企画書/,
    'dm': /DM|ダイレクトメール|ＤＭ/i,
    'sales_script': /営業トーク|セールススクリプト|電話スクリプト|テレアポ/,
    'blog': /ブログ|記事/,
    'sns_post': /SNS|インスタ|ツイート/i,
    'banner': /バナー|広告画像/,
    'press_release': /プレスリリース|PR/,
    'newsletter': /ニュースレター|メルマガ/,
    'seo_article': /SEO|検索対策/i,
    'youtube_script': /YouTube|動画|ユーチューブ/i,
    'seminar': /セミナー|ウェビナー/,
    'company_profile': /会社案内|事務所案内/,
    'legal_content': /法律コンテンツ|リーガル/,
    'fax': /FAX|ファックス|ＦＡＸ/i,
    'email': /営業メール|メール文/
  };

  // 「〇〇作って」「〇〇お願い」「〇〇生成」等のパターン
  var actionPattern = /作って|お願い|生成|作成|出力|書いて|頼む|よろしく|ちょうだい/;
  // 「〇〇見せて」「〇〇確認」等の閲覧リクエスト
  var viewPattern = /見せて|見たい|確認して|表示して|見る|開いて|URL|リンク/;
  if (viewPattern.test(t)) {
    var viewTypes = [];
    var typeKeys2 = Object.keys(outputMap);
    for (var vi = 0; vi < typeKeys2.length; vi++) {
      if (outputMap[typeKeys2[vi]].test(t)) viewTypes.push(typeKeys2[vi]);
    }
    if (viewTypes.length > 0) {
      return showExistingOutputs(t, viewTypes);
    }
  }

  if (!actionPattern.test(t)) return null;

  var detectedTypes = [];
  var typeKeys = Object.keys(outputMap);
  for (var i = 0; i < typeKeys.length; i++) {
    if (outputMap[typeKeys[i]].test(t)) {
      detectedTypes.push(typeKeys[i]);
    }
  }
  if (detectedTypes.length === 0) return null;
  var detectedType = detectedTypes[0]; // メインの1つ（後で複数対応）

  // セッション特定（ID指定を最優先）
  var idMatch = t.match(/(?:ID|id|ＩＤ)\s*(\d+)/i);
  var session = null;
  if (idMatch) {
    session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(parseInt(idMatch[1]));
  }
  if (!session) {
    // ID指定なし→進行中プロジェクトが複数あれば確認
    var activeSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC").all();
    if (activeSessions.length === 0) return null;
    if (activeSessions.length >= 2) {
      // 複数プロジェクト→キーワードマッチ試行
      var tLower2 = t.replace(/[\s　]/g, '').toLowerCase();
      for (var j = 0; j < activeSessions.length; j++) {
        var kws = activeSessions[j].title.split(/[\s　・×\/]/g).filter(function(w) { return w.length >= 2; });
        for (var kk = 0; kk < kws.length; kk++) {
          if (tLower2.indexOf(kws[kk].toLowerCase()) >= 0) { session = activeSessions[j]; break; }
        }
        if (session) break;
      }
      if (!session) {
        // キーワードでも特定できない→確認要求
        var sessionList = activeSessions.map(function(ss) { return 'ID:' + ss.id + ' ' + ss.title; }).join('\n');
        sendLine('どのプロジェクトの' + (typeLabels[detectedType] || detectedType) + 'を生成しますか？\n\n' + sessionList + '\n\n「ID:〇〇 ' + (typeLabels[detectedType] || detectedType) + '作って」で指定してください。');
        return '複数プロジェクト進行中のため確認しました。IDを指定してください。';
      }
    } else {
      session = activeSessions[0];
    }
  }
  if (!session) return null;

  var typeLabels = {lp:'LP', proposal:'提案書', dm:'DM', sales_script:'営業スクリプト', blog:'ブログ', sns_post:'SNS投稿', banner:'バナー', press_release:'プレスリリース', newsletter:'ニュースレター', seo_article:'SEO記事', youtube_script:'YouTube台本', seminar:'セミナー資料', company_profile:'会社案内', legal_content:'法律コンテンツ', fax:'FAX DM', email:'営業メール'};

  // 非同期でアウトプット生成（複数type対応）
  var allTypes = detectedTypes.slice();
  (async function() {
    for (var ti = 0; ti < allTypes.length; ti++) {
      try {
        var thisType = allTypes[ti];
        var result = await outputGen.generateFull(session.id, thisType, {});
        var htmlFile = generateOutputHTML(result, thisType, session.id);
        await sendLine('ID:' + session.id + ' ' + session.title + ' ' + (typeLabels[thisType] || thisType) + '全パターン完成。URL→ https://176-32-87-118.sslip.io/outputs/' + htmlFile);
      } catch(e) {
        console.error('[output ' + allTypes[ti] + ']', e);
        await sendLine('ID:' + session.id + ' ' + (typeLabels[allTypes[ti]] || allTypes[ti]) + '生成エラー。' + e.message);
      }
    }
  })();

  var typeNames = allTypes.map(function(tt) { return typeLabels[tt] || tt; }).join('・');
  return 'ID:' + session.id + ' ' + session.title + ' ' + typeNames + '生成開始します。';
}

// ============================================
// スマート指示解釈: 短い指示から意図を推測して即実行
// ============================================
function resolveSmartInstruction(t) {
  var allSessions = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep','completed') ORDER BY updated_at DESC LIMIT 20").all();
  if (allSessions.length === 0) return null;

  // ID指定: 「ID3」「ID3続けて」「ID3 フェーズ2へ」
  var idMatch = t.match(/(?:ID|id|ＩＤ)\s*(\d+)/i);
  var targetSession = null;
  var remainingText = t;

  if (idMatch) {
    var sid = parseInt(idMatch[1]);
    targetSession = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sid);
    remainingText = t.replace(idMatch[0], '').trim();
  }

  // プロジェクト名キーワードでマッチ（ID指定を最優先）
  if (!targetSession) {
    var tLower = t.replace(/[\s　]/g, '').toLowerCase();
    // 明示的キーワードマッピング（直前プロジェクトに引っ張られない）
    var bestMatch = null;
    var bestScore = 0;
    for (var i = 0; i < allSessions.length; i++) {
      var s = allSessions[i];
      var score = 0;
      // タイトルの主要キーワード（2文字以上）
      var keywords = s.title.split(/[\s　・×\/]/g).filter(function(w) { return w.length >= 2; });
      // トピックからもキーワード抽出
      if (s.topic) {
        var topicKw = s.topic.split(/[\s　・×\/、。]/g).filter(function(w) { return w.length >= 2; });
        keywords = keywords.concat(topicKw);
      }
      for (var k = 0; k < keywords.length; k++) {
        if (tLower.indexOf(keywords[k].toLowerCase()) >= 0) {
          score += keywords[k].length; // 長いキーワード一致ほど高スコア
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = s;
      }
    }
    if (bestMatch && bestScore >= 2) {
      targetSession = bestMatch;
    }
  }

  // フェーズ指示を検出
  var phaseMatch = t.match(/フェーズ\s*(\d+)|phase\s*(\d+)/i);
  var phaseNum = phaseMatch ? parseInt(phaseMatch[1] || phaseMatch[2]) : null;

  // 「続けて」「続き」「再開」
  var isContinue = /続けて|続き|再開|進めて|やって|開始|始めて|スタート/.test(t);
  // 「〜へ」「〜に進む」
  var isAdvance = /へ$|に進む|に進めて|に移行|開始して/.test(t);

  // セッション特定なし → null（通常フロー）
  if (!targetSession && !phaseNum && !isContinue) return null;

  // セッションが特定できない場合は直近を使用（ただしフェーズ指示がある場合のみ）
  if (!targetSession && (phaseNum || isContinue)) {
    targetSession = allSessions[0]; // 直近更新のセッション
  }

  // フェーズ指示 + セッション特定 → 即実行
  if (phaseNum && targetSession) {
    return executePhaseAction(targetSession, phaseNum, isAdvance, isContinue);
  }

  // セッション特定 + 続行指示
  if (targetSession && isContinue) {
    return executePhaseAction(targetSession, targetSession.phase, false, true);
  }

  // セッション特定のみ（フェーズ指示なし）→ 現在フェーズを続行と解釈
  if (targetSession && idMatch) {
    return executePhaseAction(targetSession, targetSession.phase, false, true);
  }

  return null; // 通常フローへ
}

function executePhaseAction(session, phaseNum, isAdvance, isContinue) {
  var phaseLabelsExec = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット生成', 4:'営業リスト作成', 5:'広告配信設計', 6:'メディア最適化'};
  var prefix = '「' + session.title + '」Phase' + phaseNum + '(' + (phaseLabelsExec[phaseNum] || '') + ') ';

  // 現在フェーズと異なる場合 → フェーズ変更して実行
  if (session.phase !== phaseNum && isAdvance) {
    db.prepare('UPDATE sessions SET phase = ?, current_round = 0, status = ? WHERE id = ?').run(phaseNum, 'active', session.id);
    prefix = '「' + session.title + '」をPhase' + phaseNum + 'に進めて' + (phaseLabelsExec[phaseNum] || '') + 'を ';
  }

  // セッション状態をactiveに
  db.prepare("UPDATE sessions SET status = 'active', updated_at = datetime('now') WHERE id = ?").run(session.id);

  global._lastSmartInterpretation = { sessionId: session.id, phase: phaseNum };

  switch (phaseNum) {
    case 1:
      // Phase1壁打ち続行
      var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(session.id, 'user');
      var nextRound = (lr && lr.mr ? lr.mr : 0) + 1;
      if (nextRound > 8) {
        return prefix + '全8ステップ完了済みです。「フェーズ2へ」で次フェーズに進めます。';
      }
      // 非同期で壁打ち実行
      (async function() {
        try {
          for (var r = nextRound; r <= 8; r++) {
            await engine.runStep(session.id, session.topic, r, session.research_data, false);
            if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');
          }
          var summary = await engine.generateFinalSummary(session.id);
          try {
            var report = await engine.generatePhase1Report(session.id);
            var reportUrl = generatePhase1ReportHTML(report, session.id);
            var reportText = formatPhase1ReportText(report);
            await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
          } catch(e) { console.error('[Phase1Report]', e.message); }
          advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
        } catch(err) {
          console.error('[Smart Phase1]', err.message);
          await sendLine('Phase1エラー: ' + err.message);
        }
      })();
      return 'ID:' + session.id + ' ' + session.title + ' Phase1(壁打ち) 開始します（Step' + nextRound + '/8から）';

    case 2:
    case 3:
      return 'ID:' + session.id + ' ' + session.title + ' Phase' + phaseNum + ' LINEで「LP作って」「提案書」等でアウトプット種別を指定してください。';

    case 4:
      listGen.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase4]', e); sendLine('Phase4エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase4(営業リスト作成) 開始します。';

    case 5:
      adDesigner.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase5]', e); sendLine('Phase5エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase5(広告配信設計) 開始します。';

    case 6:
      mediaOptimizer.generateFull(session.id, false).then(function() {
        advanceToNextPhase(session.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[Phase6]', e); sendLine('Phase6エラー: ' + e.message); });
      return 'ID:' + session.id + ' ' + session.title + ' Phase6(メディア最適化) 開始します。';

    default:
      return prefix + 'は不明なフェーズです。';
  }
}

async function processLineCommand(text, userId) {
  var t = text.trim();

  // =======================================
  // スマート指示解釈（短い指示でも即実行）
  // =======================================
  var smartResult = resolveSmartInstruction(t);
  if (smartResult) return smartResult;

  // 「違う」で直前の解釈を修正
  if (t === '違う' || t.startsWith('違う。') || t.startsWith('違う、') || t === 'ちがう') {
    global._lastSmartInterpretation = null;
    return '了解しました。改めてご指示ください。\n例: 「ID3 フェーズ2へ」「残業代でフェーズ1」「交通事故 LP作って」';
  }

  // 承認
  if (t === '承認' || t === 'OK' || t === 'ok') {
    // まず承認待ちアウトプットがあるか確認
    var awaitingOutput = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1").get();
    if (awaitingOutput) {
      var recPat = awaitingOutput.recommended_pattern || 'A';
      var caseId = outputGen.approveOutput(awaitingOutput.id, recPat);
      return 'パターン' + recPat + '（推奨）を採用しました。case_library ID: ' + caseId;
    }
    // 保留中の質問があれば回答として処理
    var pendingQ = lineQA.getPendingQuestion();
    if (pendingQ) {
      lineQA.resolveAnswer(pendingQ.id, t);
      return '承認を受け付けました。処理を再開します。';
    }
    var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if (latest) {
      db.prepare('INSERT INTO decisions (session_id, decision) VALUES (?,?)').run(latest.id, 'approved');
      return '承認しました（セッション: ' + latest.title + '）';
    }
    return 'アクティブなセッションがありません';
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // 却下
  if (t.startsWith('却下') || t.startsWith('NG')) {
    var comment = t.replace(/^(却下|NG)\s*/, '');
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  // 却下
  if (t.startsWith('却下') || t.startsWith('NG')) {
    var comment = t.replace(/^(却下|NG)\s*/, '');
    var latest2 = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 1").get();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if (latest2) {
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(latest2.id, 'rejected', comment || null);
      return '却下しました' + (comment ? '（理由: ' + comment + '）' : '');
    }
    return 'アクティブなセッションがありません';
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // 状態確認
  if (t === '状態' || t === 'ステータス') {
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 3").all();
    if (sessions.length === 0) return 'アクティブなセッションなし';
    return sessions.map(function(s) {
      return '[' + s.id + '] ' + s.title + ' (R' + s.current_round + '/' + s.total_rounds + ')';
    }).join('\n');
  }
  // 音声メモとして保存
  db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(t);
  return 'メモ保存しました: 「' + t.substring(0, 30) + '...」';
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  // プロジェクト一覧（Feature 1）
  if (t === '一覧' || t === 'リスト' || t === 'プロジェクト') {
    var all = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY priority ASC, updated_at DESC").all();
    if (all.length === 0) return 'アクティブなプロジェクトなし';
    return 'プロジェクト一覧\n\n' + all.map(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      var dl = s.deadline ? ' 〆' + s.deadline : '';
      return star + s.title + ' → Phase' + s.phase + ' Step' + s.current_round + ' (' + s.status + ')' + dl;
    }).join('\n');
  }

  // 状態確認（優先度付き）
  if (t === '状態' || t === 'ステータス') {
    var sessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY priority ASC, updated_at DESC LIMIT 5").all();
    if (sessions.length === 0) return 'アクティブなセッションなし';
    return sessions.map(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      return star + '[' + s.id + '] ' + s.title + ' (Phase' + s.phase + ' Step' + s.current_round + ')';
    }).join('\n');
  }

  // 優先度設定（Feature 3）: 「優先 セッションID 優先度」
  var priMatch = t.match(/^優先\s+(\d+)\s+(\d+)$/);
  if (priMatch) {
    var priSid = parseInt(priMatch[1]);
    var priVal = parseInt(priMatch[2]);
    db.prepare('UPDATE sessions SET priority = ? WHERE id = ?').run(priVal, priSid);
    return 'セッション' + priSid + 'の優先度を' + priVal + 'に設定しました';
  }

  // 最優先設定（Feature 3）: 「〇〇を最優先」
  var topPriMatch = t.match(/(.+)(を最優先|を優先|最優先にして)/);
  if (topPriMatch) {
    var keyword = topPriMatch[1].trim();
    var found = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = 'active' LIMIT 1").get('%' + keyword + '%');
    if (found) {
      db.prepare('UPDATE sessions SET priority = 1 WHERE id = ?').run(found.id);
      return '「' + found.title + '」を最優先(1)に設定しました';
    }
    return '「' + keyword + '」に該当するセッションが見つかりません';
  }

  // 締め切り設定（Feature 3）: 「〇〇は来週」「〇〇は急がない」
  var deadlineMatch = t.match(/(.+)(は来週|は今月中|は急がない)/);
  if (deadlineMatch) {
    var dKeyword = deadlineMatch[1].trim();
    var dFound = db.prepare("SELECT * FROM sessions WHERE title LIKE ? AND status = 'active' LIMIT 1").get('%' + dKeyword + '%');
    if (dFound) {
      if (t.indexOf('来週') >= 0) {
        var nextWeek = new Date(Date.now() + 7 * 86400000);
        var dl = nextWeek.toISOString().split('T')[0];
        db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(dl, dFound.id);
        return '「' + dFound.title + '」の期限を' + dl + 'に設定しました';
      } else if (t.indexOf('今月中') >= 0) {
        var now = new Date();
        var eom = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(eom, dFound.id);
        return '「' + dFound.title + '」の期限を' + eom + 'に設定しました';
      } else if (t.indexOf('急がない') >= 0) {
        db.prepare('UPDATE sessions SET priority = 8 WHERE id = ?').run(dFound.id);
        return '「' + dFound.title + '」の優先度を下げました(8)';
      }
    }
  }

  // フェーズ承認（Feature 2）: 「フェーズ1承認」
  var phaseApproveMatch = t.match(/フェーズ(\d+)(承認|OK|進めて)/i);
  if (phaseApproveMatch) {
    var paSidMatch = t.match(/セッション(\d+)/);
    var paSid = paSidMatch ? parseInt(paSidMatch[1]) : null;
    var paPhase = parseInt(phaseApproveMatch[1]);
    var paSession = paSid
      ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(paSid)
      : db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (paSession) {
      var nextPhase = paPhase + 1;
      db.prepare('UPDATE sessions SET phase = ?, current_round = 0 WHERE id = ?').run(nextPhase, paSession.id);
      db.prepare('INSERT INTO decisions (session_id, decision, comment) VALUES (?,?,?)').run(paSession.id, 'approved', 'Phase' + paPhase + '承認→Phase' + nextPhase + '開始');
      return '「' + paSession.title + '」Phase' + paPhase + '承認。Phase' + nextPhase + 'に進みます。';
    }
    return 'セッションが見つかりません';
  }

  // ステップやり直し（Feature 2）: 「ステップ3やり直し」
  var stepRedoMatch = t.match(/ステップ(\d+)(やり直し|再実行|リトライ)/);
  if (stepRedoMatch) {
    var srSidMatch = t.match(/セッション(\d+)/);
    var srSid = srSidMatch ? parseInt(srSidMatch[1]) : null;
    var srStep = parseInt(stepRedoMatch[1]);
    var srSession = srSid
      ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(srSid)
      : db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
    if (srSession) {
      engine.clearStep(srSession.id, srStep);
      return '「' + srSession.title + '」のStep' + srStep + 'をクリアしました。再実行します。';
    }
    return 'セッションが見つかりません';
  }

  // パターン採用（Feature 2）: 「パターンA採用」
  var patternMatch = t.match(/パターン([A-Da-d])(採用|承認|で決定|にして)/);
  if (patternMatch) {
    var pat = patternMatch[1].toUpperCase();
    var latestQueue = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval' ORDER BY created_at DESC LIMIT 1").get();
    if (latestQueue) {
      var caseId = outputGen.approveOutput(latestQueue.id, pat);
      return 'パターン' + pat + 'を採用しました（case_library ID: ' + caseId + '）';
    }
    return '承認待ちのアウトプットがありません';
  }

  // 競合追加（Feature 7）: 「競合追加 URL」
  var compMatch = t.match(/^競合追加\s+(.+)/);
  if (compMatch) {
    var compUrl = compMatch[1].trim();
    var compName = compUrl.replace(/https?:\/\//, '').split('/')[0];
    db.prepare('INSERT INTO competitors (name, url) VALUES (?,?)').run(compName, compUrl);
    return '競合「' + compName + '」を登録しました。週次で自動チェックします。';
  }

  // 保留中の質問があれば回答として処理
  var pending = lineQA.getPendingQuestion();
  if (pending) {
    lineQA.resolveAnswer(pending.id, t);
    return '回答受付しました。処理を再開します。\n\nQ: ' + pending.question.substring(0, 80) + '\nA: ' + t;
  }

  // Phase 4/5/6 コマンド
  if (t === 'フェーズ4' || t === 'リスト作成' || t === '営業リスト') {
    var ls = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ls) {
      listGen.generateFull(ls.id, false).then(function() {
        advanceToNextPhase(ls.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase4]', e); sendLine('Phase4エラー: ' + e.message); });
      return 'ID:' + ls.id + ' ' + ls.title + ' Phase4(営業リスト作成) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  if (t === 'フェーズ5' || t === '広告設計') {
    var as = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (as) {
      adDesigner.generateFull(as.id, false).then(function() {
        advanceToNextPhase(as.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase5]', e); sendLine('Phase5エラー: ' + e.message); });
      return 'ID:' + as.id + ' ' + as.title + ' Phase5(広告配信設計) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  if (t === 'フェーズ6' || t === 'メディア最適化') {
    var ms = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ms) {
      mediaOptimizer.generateFull(ms.id, false).then(function() {
        advanceToNextPhase(ms.id, false).catch(function(e) { console.error(e); });
      }).catch(function(e) { console.error('[LINE Phase6]', e); sendLine('Phase6エラー: ' + e.message); });
      return 'ID:' + ms.id + ' ' + ms.title + ' Phase6(メディア最適化) 開始します。';
    }
    return 'アクティブなセッションがありません';
  }

  // フェーズスキップ
  var skipMatch = t.match(/フェーズ(\d+)スキップ/);
  if (skipMatch) {
    var skipPhase = parseInt(skipMatch[1]);
    var ss = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ss) {
      var plan = (ss.phase_plan || '1,2,3,4,5,6').split(',').map(Number).filter(function(p) { return p !== skipPhase; });
      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan.join(','), ss.id);
      return 'Phase' + skipPhase + 'をスキップしました。現在のプラン: ' + plan.join('→');
    }
    return 'アクティブなセッションがありません';
  }

  // フェーズ追加（やっぱりリストも）
  if (t.indexOf('やっぱりリスト') >= 0 || t.indexOf('やっぱり広告') >= 0 || t.indexOf('やっぱりメディア') >= 0) {
    var addPhase = t.indexOf('リスト') >= 0 ? 4 : t.indexOf('広告') >= 0 ? 5 : 6;
    var as2 = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (as2) {
      var plan2 = (as2.phase_plan || '1,2,3,4,5,6').split(',').map(Number);
      if (plan2.indexOf(addPhase) === -1) {
        plan2.push(addPhase);
        plan2.sort(function(a,b) { return a - b; });
        db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(plan2.join(','), as2.id);
        return 'Phase' + addPhase + 'を追加しました。プラン: ' + plan2.join('→');
      }
      return 'Phase' + addPhase + 'は既にプランに含まれています';
    }
    return 'アクティブなセッションがありません';
  }

  // リスト確認
  var listCheckMatch = t.match(/リスト確認\s*(\d+)/);
  if (listCheckMatch || t === 'リスト確認') {
    var lcSid = listCheckMatch ? parseInt(listCheckMatch[1]) : null;
    var lcSession = lcSid ? db.prepare('SELECT * FROM sessions WHERE id = ?').get(lcSid) : db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (lcSession) {
      var aCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'A' AND status = 'active'").get(lcSession.id);
      var bCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'B' AND status = 'active'").get(lcSession.id);
      var cCount = db.prepare("SELECT COUNT(*) as cnt FROM list_entries WHERE session_id = ? AND rank = 'C' AND status = 'active'").get(lcSession.id);
      return 'リスト状況 (' + lcSession.title + ')\nAランク: ' + aCount.cnt + '件\nBランク: ' + bCount.cnt + '件\nCランク: ' + cCount.cnt + '件\n合計: ' + (aCount.cnt + bCount.cnt + cCount.cnt) + '件';
    }
    return 'セッションが見つかりません';
  }

  // 次のフェーズへ
  if (t === '次のフェーズへ' || t === '次フェーズ' || t === '進む') {
    var ns = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (ns) {
      advanceToNextPhase(ns.id, false).catch(function(e) { console.error(e); });
      return '次のフェーズへ進行します。';
    }
    return 'アクティブなセッションがありません';
  }

  // このフェーズで完了
  if (t === 'このフェーズで完了' || t === '完了') {
    var cs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (cs) {
      db.prepare("UPDATE sessions SET status = 'completed' WHERE id = ?").run(cs.id);
      return 'セッション「' + cs.title + '」を完了しました。';
    }
    return 'アクティブなセッションがありません';
  }

  // リスト件数変更
  var listCountMatch = t.match(/リスト\s*(\d+)件/);
  if (listCountMatch) {
    var newCount = parseInt(listCountMatch[1]);
    var lcs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (lcs) {
      db.prepare('UPDATE sessions SET list_count = ? WHERE id = ?').run(newCount, lcs.id);
      return 'リスト目標件数を' + newCount + '件に変更しました。';
    }
    return 'アクティブなセッションがありません';
  }

  // ゴール変更
  var goalMatch = t.match(/ゴール変更\s*パターン([A-Fa-f])/);
  if (goalMatch) {
    var pattern = goalMatch[1].toUpperCase();
    var planMap2 = { A:'1,2,3,4,5,6', B:'1,2,3,4,6', C:'1,2,3', D:'1,4', E:'4,6', F:'1,2,3,5' };
    var gs = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY updated_at DESC LIMIT 1").get();
    if (gs && planMap2[pattern]) {
      db.prepare('UPDATE sessions SET phase_plan = ? WHERE id = ?').run(planMap2[pattern], gs.id);
      return 'ゴールをパターン' + pattern + '(' + planMap2[pattern].split(',').join('→') + ')に変更しました。';
    }
    return 'セッションが見つからないか、パターンが不正です';
  }

  // アウトプット生成指示の自然言語検出
  var outputDetected = detectOutputRequest(t);
  if (outputDetected) return outputDetected;

  // 壁打ち開始指示の検出
  var topicMatch = t.match(/(.+?)(?:について壁打ち|で壁打ち|壁打ちして|について議論|を検討)/);
  if (topicMatch) {
    var topic = topicMatch[1].trim();
    (async function() {
      try {
        var sid = engine.createSession(topic, topic);
        var research = await engine.runResearch(topic);
        db.prepare('UPDATE sessions SET research_data = ? WHERE id = ?').run(research, sid);
        await sendLine('「' + topic + '」と解釈して壁打ち開始します（ID:' + sid + '）');
        for (var r = 1; r <= 8; r++) {
          await engine.runStep(sid, topic, r, research, false);
          if (r < 8) await sendLine('[Phase1] Step' + r + '/8 完了');
        }
        var summary = await engine.generateFinalSummary(sid);
        try {
          var report = await engine.generatePhase1Report(sid);
          var reportUrl = generatePhase1ReportHTML(report, sid);
          var reportText = formatPhase1ReportText(report);
          await sendLine(reportText + '\n\n詳細レポート:\n' + reportUrl);
        } catch(e) { console.error(e); }
        advanceToNextPhase(sid, false).catch(function(e) { console.error(e); });
      } catch(err) {
        console.error('[壁打ち自動開始]', err.message);
        await sendLine('壁打ちエラー: ' + err.message);
      }
    })();
    return '「' + topic + '」について壁打ち開始します（新規プロジェクト）。';
  }

  // スマートQ&A（Claudeがプロジェクト参照して回答）
  try {
    console.log('[Smart QA] 質問処理開始: ' + t.substring(0, 50));
    var answer = await lineQA.handleSmartQA(t, userId);
    return answer;
  } catch (err) {
    console.error('[Smart QA Error]', err.message);
    db.prepare('INSERT INTO voice_memos (text) VALUES (?)').run(t);
    return 'メモ保存しました: 「' + t.substring(0, 30) + '...」';
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

// LINE返信
function replyLine(replyToken, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return Promise.resolve(false);
  return new Promise(function(resolve) {
    var data = JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var req = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/reply', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { resolve(res.statusCode === 200); }); });
    req.on('error', function() { resolve(false); });
    req.write(data); req.end();
  });
}

// LINE プッシュ送信（特定ユーザー宛）
function pushLine(userId, message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) { console.log('[LINE] トークン未設定'); return Promise.resolve(false); }
  return new Promise(function(resolve) {
    var data = JSON.stringify({ to: userId, messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var options = {
      hostname: 'api.line.me', path: '/v2/bot/message/push', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    };
    var r = https.request(options, function(res) {
      var b = ''; res.on('data', function(c) { b += c; });
      res.on('end', function() { console.log('[LINE push] status:', res.statusCode, b); resolve(res.statusCode === 200); });
    });
    r.on('error', function(e) { console.error('[LINE push error]', e); resolve(false); });
    r.write(data); r.end();
  });
}

// LINE ブロードキャスト送信（全ユーザー宛）
function sendLine(message) {
  var token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) { console.log('[LINE] トークン未設定'); return Promise.resolve(false); }
  // DBからユーザーIDがあればプッシュ、なければブロードキャスト
  var user = db.prepare("SELECT DISTINCT user_id FROM line_messages WHERE user_id IS NOT NULL ORDER BY id DESC LIMIT 1").get();
  if (user && user.user_id) {
    return pushLine(user.user_id, message);
  }
  return new Promise(function(resolve) {
    var data = JSON.stringify({ messages: [{ type: 'text', text: message.substring(0, 5000) }] });
    var r = https.request({
      hostname: 'api.line.me', path: '/v2/bot/message/broadcast', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': Buffer.byteLength(data) }
    }, function(res) { var b = ''; res.on('data', function(c) { b += c; }); res.on('end', function() { console.log('[LINE broadcast] status:', res.statusCode, b); resolve(res.statusCode === 200); }); });
    r.on('error', function(e) { console.error('[LINE broadcast error]', e); resolve(false); });
    r.write(data); r.end();
  });
}

// LINE受信メッセージ・ユーザーID確認
app.get('/api/line/users', function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var users = db.prepare("SELECT DISTINCT user_id, MIN(created_at) as first_seen, MAX(created_at) as last_seen, COUNT(*) as msg_count FROM line_messages WHERE user_id IS NOT NULL GROUP BY user_id ORDER BY last_seen DESC").all();
  var messages = db.prepare("SELECT * FROM line_messages ORDER BY created_at DESC LIMIT 20").all();
  res.json({ users: users, recentMessages: messages });
});

// LINEテスト送信（特定ユーザーまたはブロードキャスト）
app.post('/api/line/send', async function(req, res) {
  if (req.headers['x-api-key'] !== process.env.API_SECRET) return res.status(401).json({ error: '認証エラー' });
  var body = req.body;
  if (!body.message) return res.status(400).json({ error: 'message必須' });
  var result;
  if (body.userId) {
    result = await pushLine(body.userId, body.message);
  } else {
    result = await sendLine(body.message);
  }
  res.json({ success: result });
});

// ============================================
// 就寝モード（23時自動実行）
// ============================================

async function runSleepMode() {
  console.log('[就寝モード] 開始 ' + new Date().toISOString());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  var latest = db.prepare("SELECT * FROM sessions WHERE status = 'active' ORDER BY updated_at DESC LIMIT 1").get();
  if (!latest) { console.log('[就寝モード] アクティブなセッションなし'); return; }

  db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(latest.id, 'sleep_start');

  // 残りラウンドを自動実行
  var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
  var maxRounds = Math.min(startRound + 2, 7); // 最大3ラウンドか6ラウンド目まで

  for (var r = startRound; r < maxRounds; r++) {
    try {
      await engine.runRound(latest.id, latest.topic, r, latest.research_data, true);
      console.log('[就寝モード] ラウンド ' + r + ' 完了');
    } catch (err) {
      console.error('[就寝モード] ラウンド' + r + 'エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'error_round_' + r, err.message);
    }
  }

  // 6ラウンド完了していたら最終統合も実行
  var currentRound = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(latest.id, 'user');
  if (currentRound && currentRound.mr >= 6) {
    try {
      await engine.generateFinalSummary(latest.id);
      console.log('[就寝モード] 最終統合完了');
    } catch (err) { console.error('[就寝モード] 最終統合エラー:', err.message); }
  }

  db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(latest.id);
  db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(latest.id, 'sleep_end', '完了');
  console.log('[就寝モード] 完了');
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // 全アクティブセッションを優先度順に取得（上限5件）
  var activeSessions = db.prepare("SELECT * FROM sessions WHERE status = 'active' AND updated_at > datetime('now', '-48 hours') ORDER BY priority ASC, updated_at DESC LIMIT 5").all();

  if (activeSessions.length > 0) {
    console.log('[就寝モード] アクティブセッション: ' + activeSessions.length + '件');
    // 並列処理（最大3件同時）
    var concurrency = 3;
    var results = [];
    for (var batch = 0; batch < activeSessions.length; batch += concurrency) {
      var chunk = activeSessions.slice(batch, batch + concurrency);
      var promises = chunk.map(function(sess) {
        return (async function(s) {
          try {
            console.log('[就寝モード] 処理開始: ' + s.title + ' (優先度:' + (s.priority || 5) + ')');
            db.prepare("UPDATE sessions SET status = 'sleep' WHERE id = ?").run(s.id);
            db.prepare('INSERT INTO sleep_logs (session_id, action) VALUES (?, ?)').run(s.id, 'sleep_start');
            var lr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
            var startRound = (lr && lr.mr ? lr.mr : 0) + 1;
            for (var r = startRound; r <= 8; r++) {
              try {
                await engine.runStep(s.id, s.topic, r, s.research_data, true);
                console.log('[就寝モード] セッション' + s.id + ' ステップ' + r + '完了');
              } catch (err) {
                console.error('[就寝モード] ステップ' + r + 'エラー:', err.message);
                db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'error_step_' + r, err.message);
                break;
              }
            }
            var cr = db.prepare('SELECT MAX(round_number) as mr FROM discussion_logs WHERE session_id = ? AND role != ?').get(s.id, 'user');
            if (cr && cr.mr >= 8) {
              try {
                await engine.generateFinalSummary(s.id);
                console.log('[就寝モード] 最終統合完了 セッション' + s.id);
                // 就寝モード Phase1レポート生成
                var sleepReport = await engine.generatePhase1Report(s.id);
                var sleepReportUrl = generatePhase1ReportHTML(sleepReport, s.id);
                global._phase1Reports = global._phase1Reports || [];
                global._phase1Reports.push({ title: s.title, url: sleepReportUrl });
                // 就寝モード Phase4/5/6 自動進行
                await advanceToNextPhase(s.id, true);
              } catch (err) {
                console.error('[就寝モード] 最終統合エラー:', err.message);
              }
            }
            db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
            db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(s.id, 'sleep_end', '完了');
            return { id: s.id, title: s.title, status: '完了' };
          } catch (err) {
            console.error('[就寝モード] セッション' + s.id + '全体エラー:', err.message);
            db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(s.id);
            return { id: s.id, title: s.title, status: 'エラー: ' + err.message };
          }
        })(sess);
      });
      var batchResults = await Promise.all(promises);
      results = results.concat(batchResults);
    }
    global._sleepResults = results;
  } else {
    // 指示なし：新規事業アイデアを市場調査
    console.log('[就寝モード] 本日の指示なし → 新規事業アイデア調査開始');
    try {
      var researchResult = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 8000,
        system: 'あなたは法律事務所の経営コンサルタントです。東京新橋にある「前田法律事務所（東京新橋法律事務所）」の新規事業アイデアを提案してください。\n\n前田法律事務所の特徴:\n- 代表弁護士: 前田\n- 所在地: 東京都港区新橋\n- 既存事業: 交通事故、企業法務、死後事務委任、高齢者見守り\n- 強み: AI活用、テクノロジー活用、賃貸保証会社との連携\n- ターゲット: 中小企業、単身高齢者、不動産管理会社\n\n以下の観点で分析してください:\n1. 市場調査（市場規模、成長率、トレンド）\n2. 競合分析（主要プレイヤー、差別化ポイント）\n3. 収益性分析（単価、想定件数、粗利率）\n4. 実現可能性（既存リソースの活用度、初期投資、立ち上げ期間）\n\n必ず3案を提案し、各案について向こう3年分のPL（損益計算書）を作成してください。最も実現可能性が高い案を推奨し、その理由を述べてください。',
        messages: [{ role: 'user', content: '前田法律事務所（東京新橋法律事務所）向けの新規事業アイデアを3案、市場調査・競合分析・3年PLつきで提案してください。' }]
      });
      var ideas = researchResult.content[0].text;
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_research', ideas);
      var ts = Date.now();
      var htmlName = 'biz_ideas_' + ts + '.html';
      var outputDir = pathMod.join(__dirname, 'public/outputs');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
      var htmlContent = ideas.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      htmlContent = htmlContent.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      htmlContent = htmlContent.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      htmlContent = htmlContent.replace(/^# (.+)$/gm, '<h1>$1</h1>');
      htmlContent = htmlContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      htmlContent = htmlContent.replace(/\|(.+)\|/g, function(m) { return '<code>' + m + '</code>'; });
      htmlContent = htmlContent.replace(/\n/g, '<br>');
      var fullHtml = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>新規事業アイデア</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f5f5f5;color:#333;line-height:1.8;padding:16px;max-width:800px;margin:0 auto}h1{font-size:22px;color:#1a1a2e;border-bottom:3px solid #16213e;padding-bottom:8px;margin:20px 0 16px}h2{font-size:18px;color:#16213e;margin:16px 0 10px;padding:8px 12px;background:#e8eaf6;border-radius:4px}h3{font-size:16px;color:#0d47a1;margin:12px 0 8px}strong{color:#1a1a2e}code{display:block;background:#fff;padding:8px;margin:4px 0;border-radius:4px;font-size:13px;overflow-x:auto;white-space:pre}.content{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:pre-wrap;word-wrap:break-word;font-size:14px}.meta{font-size:12px;color:#888;text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid #ddd}</style></head><body><h1>新規事業アイデア提案</h1><div class="content">' + htmlContent + '</div><div class="meta">前田法律事務所 AIシステム | 自動調査 | ' + new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'}) + '</div></body></html>';
      fs.writeFileSync(pathMod.join(outputDir, htmlName), fullHtml, 'utf8');
      global._sleepBizIdeas = { text: ideas, htmlUrl: 'https://176-32-87-118.sslip.io/outputs/' + htmlName };
    } catch (err) {
      console.error('[就寝モード] 新規事業調査エラー:', err.message);
      db.prepare('INSERT INTO sleep_logs (session_id, action, result) VALUES (?,?,?)').run(0, 'new_biz_error', err.message);
    }
  }
  console.log('[就寝モード] 完了 ' + new Date().toISOString());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

// ============================================
// 朝サマリー（7時LINE送信）
// ============================================

async function sendMorningSummary() {
  console.log('[朝サマリー] 生成開始');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY created_at ASC").all();
  if (sleepLogs.length === 0) { console.log('[朝サマリー] 就寝中ログなし'); return; }

  var logText = sleepLogs.map(function(l) { return '[' + l.role_label + '] ' + l.content; }).join('\n---\n');
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var r = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 1500,
    system: '就寝中の議論サマリーを簡潔に作成してください。重要ポイント・提案・決定事項を箇条書きで。',
    messages: [{ role: 'user', content: logText }]
  });
  var summary = r.content[0].text;
  db.prepare('INSERT INTO morning_summaries (session_id, summary) VALUES (?, ?)').run(sleepLogs[0].session_id, summary);

  // 未承認アウトプットキューも通知
  var pending = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  var pendingMsg = '';
  if (pending.length > 0) {
    pendingMsg = '\n\n【承認待ちアウトプット: ' + pending.length + '件】\n' +
      pending.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\n') +
      '\n→ 「承認」または「却下 理由」で返信';
  }

  await sendLine('おはようございます、前田さん\n\n【就寝中の議論サマリー】\n\n' + summary + pendingMsg);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var msg = 'おはようございます、前田さん\n';

  // 就寝中に処理したセッション結果
  if (global._sleepResults && global._sleepResults.length > 0) {
    msg += '\n【就寝中の処理結果: ' + global._sleepResults.length + '件】\n';
    global._sleepResults.forEach(function(r) {
      msg += '・' + r.title + ' → ' + r.status + '\n';
    });
    var sleepLogs = db.prepare("SELECT * FROM discussion_logs WHERE is_sleep_mode = 1 AND created_at > datetime('now', '-12 hours') ORDER BY session_id, created_at ASC").all();
    if (sleepLogs.length > 0) {
      var logText = sleepLogs.map(function(l) { return '[S' + l.session_id + ' ' + l.role_label + '] ' + l.content.substring(0, 200); }).join('\n---\n');
      try {
        var r = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514', max_tokens: 2000,
          system: '就寝中に複数プロジェクトが並列処理されました。各プロジェクトの進捗・重要ポイントを簡潔にまとめてください。',
          messages: [{ role: 'user', content: logText.substring(0, 10000) }]
        });
        msg += '\n' + r.content[0].text;
      } catch(e) { console.error('[朝サマリー] 要約エラー:', e.message); }
    }
    global._sleepResults = null;
    // Phase1完了レポートがあれば追加
    if (global._phase1Reports && global._phase1Reports.length > 0) {
      msg += '\n\n【Phase1完了レポート】\n';
      global._phase1Reports.forEach(function(pr) {
        msg += '・' + pr.title + '\n  ' + pr.url + '\n';
      });
      global._phase1Reports = null;
    }
  } else if (global._sleepBizIdeas) {
    try {
      var r2 = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', max_tokens: 2000,
        system: '新規事業アイデア分析をLINE通知用に簡潔にまとめてください。各案のタイトル、市場規模、3年後の営業利益を箇条書きで。推奨案を明示。',
        messages: [{ role: 'user', content: global._sleepBizIdeas.text + '\n\nHTML URL: ' + global._sleepBizIdeas.htmlUrl }]
      });
      msg += '\n【新規事業アイデア（自動調査）】\n\n' + r2.content[0].text;
      msg += '\n\n詳細はこちら:\n' + global._sleepBizIdeas.htmlUrl;
      global._sleepBizIdeas = null;
    } catch(e) { console.error('[朝サマリー] 新規事業要約エラー:', e.message); }
  } else {
    console.log('[朝サマリー] 就寝中ログも新規事業アイデアもなし');
    return;
  }

  // 全セッション進捗サマリー（Feature 1/3/4）
  var allSess = db.prepare("SELECT * FROM sessions WHERE status IN ('active','sleep') ORDER BY priority ASC").all();
  if (allSess.length > 0) {
    msg += '\n\n【プロジェクト進捗一覧】\n';
    allSess.forEach(function(s) {
      var pri = s.priority || 5;
      var star = pri <= 3 ? '[優先' + pri + '] ' : '';
      var dl = s.deadline ? ' 〆' + s.deadline : '';
      var phaseLabels2 = {1:'壁打ち', 2:'訴求設計', 3:'アウトプット', 4:'営業リスト', 5:'広告設計', 6:'メディア最適化'};
      var phLabel = phaseLabels2[s.phase] || 'Phase' + s.phase;
      msg += star + s.title + ' → ' + phLabel + ' Step' + s.current_round + dl + '\n';
    });
  }

  // 未承認アウトプットキュー
  var pendingOut = db.prepare("SELECT * FROM output_queue WHERE status = 'awaiting_approval'").all();
  if (pendingOut.length > 0) {
    msg += '\n【承認待ちアウトプット: ' + pendingOut.length + '件】\n' +
      pendingOut.map(function(p) { return '・' + p.output_type + '（推奨: パターン' + p.recommended_pattern + '）'; }).join('\n') +
      '\n→ 「承認」「パターンA採用」「却下 理由」で返信';
  }

  await sendLine(msg);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  console.log('[朝サマリー] 送信完了');
}

// ============================================
// 週次レポート（月曜7時）
// ============================================

async function sendWeeklyReport() {
  console.log('[週次レポート] 生成開始');
  var sessions = db.prepare("SELECT * FROM sessions WHERE created_at > datetime('now', '-7 days') ORDER BY created_at ASC").all();
  var cases = db.prepare("SELECT * FROM case_library WHERE created_at > datetime('now', '-7 days')").all();
  var decisions = db.prepare("SELECT * FROM decisions WHERE created_at > datetime('now', '-7 days')").all();

  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  var r = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514', max_tokens: 2000,
    system: '週次レポートを作成してください。成果・進捗・来週の推奨アクションを簡潔にまとめてください。',
    messages: [{ role: 'user', content: '【今週のセッション】\n' + sessions.map(function(s) { return s.title + '(Phase' + s.phase + ', R' + s.current_round + ')'; }).join('\n') +
      '\n\n【承認済みアウトプット】\n' + cases.map(function(c) { return c.output_type + ': ' + c.title; }).join('\n') +
      '\n\n【判断履歴】\n' + decisions.map(function(d) { return d.decision + (d.comment ? '(' + d.comment + ')' : ''); }).join('\n') }]
  });
  var report = r.content[0].text;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  // 競合動向をレポートに追加（DB保存前）
  var compChanges = db.prepare("SELECT cc.*, c.name FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id WHERE cc.detected_at > datetime('now', '-7 days')").all();
  if (compChanges.length > 0) {
    report += '\n\n【競合動向】\n' + compChanges.map(function(cc) { return '・' + cc.name + ': ' + cc.change_summary; }).join('\n');
  }
  db.prepare('INSERT INTO weekly_reports (week_start, report) VALUES (date(?), ?)').run(new Date().toISOString(), report);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  await sendLine('【週次レポート】\n\n' + report);
  console.log('[週次レポート] 送信完了');
}

// ============================================
// Cron Jobs
// ============================================

// 毎晩23時（JST）就寝モード
cron.schedule('0 23 * * *', function() { runSleepMode().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
// 毎朝7時（JST）朝サマリー
cron.schedule('0 7 * * *', function() { sendMorningSummary().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// 毎時: 保留質問のタイムアウト処理
cron.schedule('0 * * * *', function() {
  db.prepare("UPDATE pending_questions SET status = 'timeout' WHERE status = 'pending' AND timeout_at < datetime('now')").run();
}, { timezone: 'Asia/Tokyo' });
// 毎週日曜23時（JST）競合チェック（Feature 7）
cron.schedule('0 23 * * 0', function() { checkCompetitors().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });

async function checkCompetitors() {
  console.log('[競合チェック] 開始');
  var comps = db.prepare('SELECT * FROM competitors').all();
  for (var i = 0; i < comps.length; i++) {
    var comp = comps[i];
    try {
      var content = await fetchUrl(comp.url);
      var hash = crypto.createHash('md5').update(content).digest('hex');
      if (comp.last_content_hash && comp.last_content_hash !== hash) {
        db.prepare('INSERT INTO competitor_changes (competitor_id, old_hash, new_hash, change_summary) VALUES (?,?,?,?)').run(comp.id, comp.last_content_hash, hash, '変更検知');
        await sendLine('[競合変更検知] ' + comp.name + ' (' + comp.url + ') のページが更新されました。');
        console.log('[競合チェック] 変更検知: ' + comp.name);
      }
      db.prepare('UPDATE competitors SET last_content_hash = ?, last_checked_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, comp.id);
    } catch (err) {
      console.error('[競合チェック] ' + comp.name + ' エラー:', err.message);
    }
  }
  console.log('[競合チェック] 完了');
}

function fetchUrl(url, maxRedirects) {
  if (maxRedirects === undefined) maxRedirects = 5;
  return new Promise(function(resolve, reject) {
    var mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(res) {
      // リダイレクト対応
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) && res.headers.location && maxRedirects > 0) {
        var redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) redirectUrl = (url.startsWith('https') ? 'https' : 'http') + '://' + require('url').parse(url).host + redirectUrl;
        fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }
      var data = '';
      res.on('data', function(c) { data += c; });
      res.on('end', function() { resolve(data); });
    }).on('error', function(e) { reject(e); });
  });
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// 毎週月曜7時（JST）週次レポート
cron.schedule('0 7 * * 1', function() { sendWeeklyReport().catch(function(e) { console.error(e); }); }, { timezone: 'Asia/Tokyo' });

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// GitHub Webhook（push時自動デプロイ）
// ============================================

app.post('/api/deploy', function(req, res) {
  // GitHub Webhookまたは手動デプロイ
  var isGithub = req.headers['x-github-event'] === 'push';
  var isAuth = req.headers['x-api-key'] === process.env.API_SECRET;
  if (!isGithub && !isAuth) return res.status(401).json({ error: '認証エラー' });

  res.json({ status: 'deploying' });
  var exec = require('child_process').exec;
  exec('bash /home/ubuntu/kabeuchi-system/deploy.sh', { cwd: '/home/ubuntu/kabeuchi-system' }, function(err, stdout, stderr) {
    if (err) console.error('[Deploy error]', err.message);
    console.log('[Deploy]', stdout);
    if (stderr) console.error('[Deploy stderr]', stderr);
  });
});

// ============================================
// Q&A履歴
// ============================================

app.get('/api/qa/history', function(req, res) {
  var limit = parseInt(req.query.limit) || 20;
  res.json(db.prepare('SELECT * FROM pending_questions ORDER BY created_at DESC LIMIT ?').all(limit));
});

app.get('/api/qa/pending', function(req, res) {
  res.json(db.prepare("SELECT * FROM pending_questions WHERE status = 'pending' ORDER BY created_at ASC").all());
});

// ============================================
// ダッシュボード（Feature 1）
// ============================================

app.get('/dashboard', function(req, res) {
  var sessions = db.prepare("SELECT * FROM sessions ORDER BY priority ASC, updated_at DESC LIMIT 20").all();
  var pendingOutputs = db.prepare("SELECT oq.*, s.title as session_title FROM output_queue oq LEFT JOIN sessions s ON oq.session_id = s.id WHERE oq.status = 'awaiting_approval' ORDER BY oq.created_at DESC").all();
  var recentQA = db.prepare("SELECT * FROM pending_questions WHERE status = 'answered' ORDER BY answered_at DESC LIMIT 10").all();
  var qualityScores = db.prepare("SELECT qs.*, s.title as session_title FROM quality_scores qs LEFT JOIN sessions s ON qs.session_id = s.id ORDER BY qs.scored_at DESC LIMIT 10").all();

  var sessHTML = sessions.map(function(s) {
    var pri = s.priority || 5;
    var priClass = pri <= 2 ? 'high' : pri <= 4 ? 'mid' : 'low';
    var dl = s.deadline ? '<span class="deadline">〆' + s.deadline + '</span>' : '';
    var phaseLabel = ['壁打ち','訴求設計','アウトプット','営業リスト','広告設計','メディア最適化'][s.phase - 1] || 'Phase' + s.phase;
    return '<div class="card ' + priClass + '"><div class="card-header"><span class="pri">優先' + pri + '</span><span class="status">' + s.status + '</span></div><h3>' + s.title + '</h3><p>' + phaseLabel + ' Step' + s.current_round + ' ' + dl + '</p></div>';
  }).join('');

  var pendHTML = pendingOutputs.map(function(p) {
    return '<div class="card pending"><h3>' + (p.session_title || 'Session' + p.session_id) + '</h3><p>' + p.output_type + ' 推奨: パターン' + p.recommended_pattern + '</p></div>';
  }).join('') || '<p>なし</p>';

  var qaHTML = recentQA.map(function(q) {
    return '<div class="qa"><strong>Q:</strong> ' + q.question.substring(0, 80) + '<br><strong>A:</strong> ' + (q.answer || '').substring(0, 100) + '</div>';
  }).join('') || '<p>なし</p>';

  var scoreHTML = qualityScores.map(function(qs) {
    return '<div class="card score"><h3>' + (qs.session_title || 'Session' + qs.session_id) + ' パターン' + qs.pattern + '</h3><p>訴求' + qs.score_appeal + ' 差別' + qs.score_differentiation + ' 体裁' + qs.score_format + ' 衝撃' + qs.score_impact + ' = ' + qs.total_score + '/40</p></div>';
  }).join('') || '<p>なし</p>';

  var now = new Date().toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'});
  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>前田AI ダッシュボード</title>';
  html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;background:#f0f2f5;color:#333;padding:12px}h1{font-size:18px;color:#1a1a2e;padding:12px 0;border-bottom:2px solid #16213e;margin-bottom:16px}h2{font-size:16px;color:#16213e;margin:20px 0 12px;padding:8px;background:#e8eaf6;border-radius:4px}.card{background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,.1);border-left:4px solid #ccc}.card.high{border-left-color:#e53935}.card.mid{border-left-color:#fb8c00}.card.low{border-left-color:#43a047}.card.pending{border-left-color:#1e88e5}.card.score{border-left-color:#8e24aa}.card-header{display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px}.pri{color:#e53935;font-weight:bold}.status{color:#666}.deadline{color:#e53935;font-size:13px;font-weight:bold}h3{font-size:15px;margin-bottom:4px}p{font-size:13px;color:#555}.qa{background:#fff;padding:10px;margin-bottom:8px;border-radius:6px;font-size:13px;box-shadow:0 1px 2px rgba(0,0,0,.08)}.meta{font-size:11px;color:#999;text-align:center;margin-top:20px;padding:12px}button{background:#16213e;color:#fff;border:none;padding:8px 16px;border-radius:4px;font-size:14px;margin-top:12px;cursor:pointer}</style>';
  html += '<script>setTimeout(function(){location.reload()},30000)</script>';
  html += '</head><body>';
  html += '<h1>前田法律事務所 AIダッシュボード</h1>';
  html += '<h2>プロジェクト一覧 (' + sessions.length + ')</h2>' + sessHTML;
  html += '<h2>承認待ちアウトプット</h2>' + pendHTML;
  html += '<h2>品質スコア</h2>' + scoreHTML;
  html += '<h2>最近のQ&A</h2>' + qaHTML;
  html += '<div class="meta">最終更新: ' + now + ' (30秒自動更新)</div>';
  html += '</body></html>';
  res.send(html);
});

// 優先度API（Feature 3）
app.put('/api/session/:id/priority', function(req, res) {
  var id = req.params.id;
  var body = req.body;
  if (body.priority !== undefined) db.prepare('UPDATE sessions SET priority = ? WHERE id = ?').run(body.priority, id);
  if (body.deadline !== undefined) db.prepare('UPDATE sessions SET deadline = ? WHERE id = ?').run(body.deadline, id);
  res.json({ success: true });
});

// 品質スコアAPI（Feature 5）
app.get('/api/quality/:sessionId', function(req, res) {
  res.json(db.prepare('SELECT * FROM quality_scores WHERE session_id = ? ORDER BY scored_at DESC').all(req.params.sessionId));
});

// A/Bテスト（Feature 6）
app.post('/api/ab/create', async function(req, res) {
  try {
    var body = req.body;
    if (!body.sessionId || !body.outputType) return res.status(400).json({ error: 'sessionId, outputType必須' });
    // バリアントA
    var resultA = await outputGen.generateFull(body.sessionId, body.outputType, body.params || {});
    var queueA = db.prepare('SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
    // バリアントB
    var resultB = await outputGen.generateFull(body.sessionId, body.outputType, Object.assign({}, body.params || {}, { variant: 'B' }));
    var queueB = db.prepare('SELECT * FROM output_queue WHERE session_id = ? ORDER BY id DESC LIMIT 1').get(body.sessionId);
    // A/Bテスト保存
    var abResult = db.prepare('INSERT INTO ab_tests (session_id, name, variant_a_queue_id, variant_b_queue_id) VALUES (?,?,?,?)').run(body.sessionId, body.outputType + ' A/B', queueA ? queueA.id : null, queueB ? queueB.id : null);
    res.json({ abTestId: abResult.lastInsertRowid, variantA: resultA, variantB: resultB });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/ab/:id', function(req, res) {
  var ab = db.prepare('SELECT * FROM ab_tests WHERE id = ?').get(req.params.id);
  if (!ab) return res.status(404).json({ error: 'A/Bテスト未発見' });
  var qA = ab.variant_a_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_a_queue_id) : null;
  var qB = ab.variant_b_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_b_queue_id) : null;
  // HTML比較ビュー
  var pA = qA && qA.patterns ? JSON.parse(qA.patterns) : [];
  var pB = qB && qB.patterns ? JSON.parse(qB.patterns) : [];
  var recA = qA ? qA.recommended_pattern : '?';
  var recB = qB ? qB.recommended_pattern : '?';
  var contentA = pA.length > 0 ? (pA[0].content || JSON.stringify(pA[0])).substring(0, 2000) : 'データなし';
  var contentB = pB.length > 0 ? (pB[0].content || JSON.stringify(pB[0])).substring(0, 2000) : 'データなし';
  contentA = contentA.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  contentB = contentB.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>A/B比較</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f5f5f5;padding:12px}h1{font-size:18px;margin-bottom:16px}.compare{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:600px){.compare{grid-template-columns:1fr}}.variant{background:#fff;padding:12px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1)}.variant h2{font-size:15px;margin-bottom:8px;padding:6px;border-radius:4px}.variant.a h2{background:#e3f2fd;color:#1565c0}.variant.b h2{background:#fce4ec;color:#c62828}.content{font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word}</style></head><body>';
  html += '<h1>A/Bテスト比較 #' + ab.id + '</h1>';
  html += '<div class="compare"><div class="variant a"><h2>バリアントA (推奨:' + recA + ')</h2><div class="content">' + contentA + '</div></div>';
  html += '<div class="variant b"><h2>バリアントB (推奨:' + recB + ')</h2><div class="content">' + contentB + '</div></div></div>';
  if (ab.comparison_result) html += '<div style="margin-top:16px;background:#fff;padding:12px;border-radius:8px"><h2 style="font-size:15px;margin-bottom:8px">比較分析</h2><p style="font-size:13px;white-space:pre-wrap">' + ab.comparison_result.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>') + '</p></div>';
  html += '</body></html>';
  res.send(html);
});

app.post('/api/ab/compare/:id', async function(req, res) {
  try {
    var ab = db.prepare('SELECT * FROM ab_tests WHERE id = ?').get(req.params.id);
    if (!ab) return res.status(404).json({ error: 'A/Bテスト未発見' });
    var qA = ab.variant_a_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_a_queue_id) : null;
    var qB = ab.variant_b_queue_id ? db.prepare('SELECT * FROM output_queue WHERE id = ?').get(ab.variant_b_queue_id) : null;
    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    var r = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 2000,
      system: '2つのアウトプットバリアントを比較分析してください。訴求力・差別化・読みやすさ・インパクトで比較し、勝者と理由を明示。',
      messages: [{ role: 'user', content: 'バリアントA:\n' + (qA ? (qA.patterns || '').substring(0, 3000) : 'なし') + '\n\nバリアントB:\n' + (qB ? (qB.patterns || '').substring(0, 3000) : 'なし') }]
    });
    var comparison = r.content[0].text;
    db.prepare('UPDATE ab_tests SET comparison_result = ? WHERE id = ?').run(comparison, ab.id);
    res.json({ comparison: comparison });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 競合モニタリング（Feature 7）
app.get('/api/competitors', function(req, res) {
  res.json(db.prepare('SELECT * FROM competitors ORDER BY created_at DESC').all());
});

app.post('/api/competitors', function(req, res) {
  var body = req.body;
  if (!body.url) return res.status(400).json({ error: 'url必須' });
  var name = body.name || body.url.replace(/https?:\/\//, '').split('/')[0];
  db.prepare('INSERT INTO competitors (name, url, check_type) VALUES (?,?,?)').run(name, body.url, body.checkType || 'lp');
  res.json({ success: true });
});

app.get('/api/competitors/changes', function(req, res) {
  res.json(db.prepare('SELECT cc.*, c.name, c.url FROM competitor_changes cc LEFT JOIN competitors c ON cc.competitor_id = c.id ORDER BY cc.detected_at DESC LIMIT 20').all());
});

// ============================================
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
// ヘルスチェック
// ============================================

app.get('/health', function(req, res) {
  var sessionCount = db.prepare('SELECT COUNT(*) as cnt FROM sessions').get();
  var caseCount = db.prepare('SELECT COUNT(*) as cnt FROM case_library').get();
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    sessions: sessionCount.cnt,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    cases: caseCount.cnt
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    cases: caseCount.cnt,
    listEntries: db.prepare('SELECT COUNT(*) as cnt FROM list_entries').get().cnt,
    adDesigns: db.prepare('SELECT COUNT(*) as cnt FROM ad_designs').get().cnt,
    mediaOptimizations: db.prepare('SELECT COUNT(*) as cnt FROM media_optimizations').get().cnt
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
});

// ============================================
// 起動
// ============================================

app.listen(PORT, '0.0.0.0', function() { console.log('前田AIシステム起動 port:' + PORT); });
process.on('SIGTERM', function() { db.close(); process.exit(0); });
