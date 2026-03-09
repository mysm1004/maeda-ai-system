@echo off
echo === GitHub Auto-Sync Start ===
cd /d "%~dp0"
node github-sync.js watch
pause
