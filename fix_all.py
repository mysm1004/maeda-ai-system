#!/usr/bin/env python3
"""
Remove all git merge conflict markers from server.js on AWS.
Keep the 'Updated upstream' (ours) side which has all the new code.
"""

with open('/home/ubuntu/kabeuchi-system/server.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

result = []
in_theirs = False  # True when we're in the ======= ... >>>>>>> section (skip these)

i = 0
while i < len(lines):
    stripped = lines[i].strip()

    if stripped.startswith('<<<<<<<'):
        # Start of conflict marker - skip this line, keep 'ours' content
        i += 1
        continue
    elif stripped.startswith('=======') and not stripped.startswith('========'):
        # Separator - start skipping 'theirs' content
        # But only if it looks like a conflict separator (just ======= or ======= with no other code)
        # Check if next line has >>>>>>> or another =======
        in_theirs = True
        i += 1
        continue
    elif stripped.startswith('>>>>>>>'):
        # End of conflict - stop skipping
        in_theirs = False
        i += 1
        continue

    if not in_theirs:
        result.append(lines[i])

    i += 1

with open('/home/ubuntu/kabeuchi-system/server.js', 'w', encoding='utf-8') as f:
    f.writelines(result)

print('Done. Original: {} lines -> Clean: {} lines'.format(len(lines), len(result)))

# Verify no conflicts remain
with open('/home/ubuntu/kabeuchi-system/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

conflicts = content.count('<<<<<<<')
print('Remaining conflict markers: {}'.format(conflicts))

import subprocess
r = subprocess.run(['node', '-c', '/home/ubuntu/kabeuchi-system/server.js'], capture_output=True, text=True)
print('Syntax check: {}'.format('OK' if r.returncode == 0 else 'ERROR: ' + r.stderr[:200]))
