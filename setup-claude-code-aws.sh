#!/bin/bash
# Claude Code AWS常駐セットアップスクリプト
set -e

echo "=== Claude Code AWS Setup ==="
echo "$(date)"

PROJECT_DIR="/home/ubuntu/kabeuchi-system"
CLAUDE_DIR="/home/ubuntu/.claude"

# 1. Claude Code設定ディレクトリ作成
echo "[1/6] Claude Code設定ディレクトリ準備..."
mkdir -p "$CLAUDE_DIR"
mkdir -p "$CLAUDE_DIR/projects"
mkdir -p "$CLAUDE_DIR/projects/_home_ubuntu_kabeuchi-system"
mkdir -p "$CLAUDE_DIR/projects/_home_ubuntu_kabeuchi-system/memory"
mkdir -p "$PROJECT_DIR/data/claude-code-logs"

# 2. Claude Code認証設定（APIキー方式）
echo "[2/6] Claude Code認証設定..."
# .envからANTHROPIC_API_KEYを取得
source "$PROJECT_DIR/.env"
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "ERROR: ANTHROPIC_API_KEY not found in .env"
  exit 1
fi

# Claude Codeの設定ファイル作成
cat > "$CLAUDE_DIR/settings.json" << 'SETTINGS_EOF'
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(node *)",
      "Bash(pm2 *)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(grep *)",
      "Bash(curl *)",
      "Bash(cd *)",
      "Read",
      "Write",
      "Edit",
      "Glob",
      "Grep"
    ],
    "deny": []
  },
  "env": {}
}
SETTINGS_EOF

# プロジェクトレベルのsettings.local.json
cat > "$PROJECT_DIR/.claude/settings.local.json" 2>/dev/null << 'LOCAL_EOF' || true
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(node *)",
      "Bash(pm2 *)",
      "Bash(git *)",
      "Bash(curl *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(grep *)",
      "Read",
      "Write",
      "Edit",
      "Glob",
      "Grep"
    ],
    "deny": []
  }
}
LOCAL_EOF
mkdir -p "$PROJECT_DIR/.claude"
cat > "$PROJECT_DIR/.claude/settings.local.json" << 'LOCAL_EOF'
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(node *)",
      "Bash(pm2 *)",
      "Bash(git *)",
      "Bash(curl *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(grep *)",
      "Read",
      "Write",
      "Edit",
      "Glob",
      "Grep"
    ],
    "deny": []
  }
}
LOCAL_EOF

# 3. 環境変数をbashrcに設定
echo "[3/6] 環境変数設定..."
if ! grep -q "ANTHROPIC_API_KEY" ~/.bashrc; then
  echo "" >> ~/.bashrc
  echo "# Claude Code" >> ~/.bashrc
  echo "export ANTHROPIC_API_KEY=\"$ANTHROPIC_API_KEY\"" >> ~/.bashrc
fi

# 4. systemdサービス設定
echo "[4/6] systemdサービス設定..."
sudo cp "$PROJECT_DIR/claude-code-daemon.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable claude-code-daemon

# 5. PM2をsystemd管理に変更（オプション・既存維持）
echo "[5/6] PM2 startup設定確認..."
pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null || true
pm2 save 2>/dev/null || true

# 6. Claude Code Daemon起動
echo "[6/6] Claude Code Daemon起動..."
sudo systemctl start claude-code-daemon
sleep 2
sudo systemctl status claude-code-daemon --no-pager

echo ""
echo "=== セットアップ完了 ==="
echo "Claude Code Daemon: http://localhost:3001"
echo "ヘルスチェック: curl -s http://localhost:3001/health -H 'x-api-key: $API_SECRET'"
echo ""
echo "LINEからのコマンド例:"
echo "  コード○○を修正して → Claude Codeがコード修正"
echo "  修正○○ → Claude Codeがコード修正"
echo "  CC状態 → Claude Code状態確認"
