import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('交通提案/b64/maeda_greeting_hq.txt', 'r') as f:
    maeda_b64 = f.read().strip()

maeda_src = f"data:image/jpeg;base64,{maeda_b64}"

with open('【新聞折込】おひとりさまの安心相談.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the old small base64 with HQ version
# Find the lawyer-photo img src
import re
content = re.sub(
    r'(<img class="lawyer-photo" src=")data:image/jpeg;base64,[^"]+(")',
    r'\1' + maeda_src + r'\2',
    content
)

with open('【新聞折込】おひとりさまの安心相談.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done - newspaper photo replaced with HQ version")
