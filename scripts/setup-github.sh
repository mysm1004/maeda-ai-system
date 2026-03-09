#!/bin/bash
TOKEN=$1
REPO=${2:-kabeuchi-system}
cd /home/ubuntu/kabeuchi-system
echo 'node_modules/
.env
data/*.db
*.log' > .gitignore
git init && git add -A && git commit -m 'Initial commit'
gh auth login --with-token <<< "$TOKEN"
gh repo create "$REPO" --private --source=. --push
