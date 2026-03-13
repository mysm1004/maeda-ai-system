#!/bin/bash
set -e
cd /home/ubuntu/kabeuchi-system

echo "[Deploy] git pull..."
git pull origin main 2>&1

echo "[Deploy] Syncing source files to src/..."
# コアファイル → src/ にコピー
[ -f server.js ] && cp -f server.js src/server.js
[ -f schema.js ] && cp -f schema.js src/db/schema.js
[ -f discussion-engine.js ] && cp -f discussion-engine.js src/services/discussion-engine.js
[ -f output-generator.js ] && cp -f output-generator.js src/services/output-generator.js
[ -f preference-learner.js ] && cp -f preference-learner.js src/services/preference-learner.js

echo "[Deploy] Syncing office docs..."
# 事務所資料 → data/office-docs/ にコピー
mkdir -p data/office-docs
if [ -d "事務所資料" ]; then
  cp -rf 事務所資料/* data/office-docs/ 2>/dev/null || true
fi

echo "[Deploy] PM2 restart..."
cd src && npx pm2 restart kabeuchi --update-env 2>&1 | tail -3

echo "[Deploy] Done! Sat Mar  7 22:54:14     2026"
