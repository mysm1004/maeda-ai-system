#!/usr/bin/env python3
"""Fix Phase3 Step1: change parallel to sequential generation to avoid rate limits"""

with open('/home/ubuntu/kabeuchi-system/output-generator.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line "  // 4パターン並行生成" and replace the block
result = []
i = 0
while i < len(lines):
    line = lines[i]

    # Match the parallel generation block
    if '4パターン並行生成' in line or '4パターン並列生成' in line:
        # Replace with sequential version
        result.append('  // 4パターン順次生成（レートリミット対策）\n')
        result.append('  var results = [];\n')
        result.append('  var keys = Object.keys(PATTERNS);\n')
        result.append('  for (var ki = 0; ki < keys.length; ki++) {\n')
        result.append('    var key = keys[ki];\n')
        result.append('    var p = PATTERNS[key];\n')
        result.append("    console.log('[Phase3] Step1: パターン' + key + '（' + p.name + '）生成中...');\n")
        result.append('    var r = await this.anthropic.messages.create({\n')
        result.append("      model: 'claude-sonnet-4-20250514', max_tokens: 8000,\n")
        result.append("      system: 'あなたはトップコピーライターです。「' + p.name + '（' + p.desc + '）」のパターンで、Phase2の訴求設計書に基づいて最高品質のコンテンツを生成してください。HTML系アウトプット（LP、バナー等）の場合は、必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。CSSは全て<style>タグ内にインライン記述。外部ファイル参照禁止。CSSは簡潔にまとめること。' + qualityRules,\n")
        result.append("      messages: [{ role: 'user', content: basePrompt + '\\n\\nパターン「' + p.name + '」で生成してください。設計書のキャッチコピー・構成を活かしつつ、このパターンの特性を最大限発揮すること。' }]\n")
        result.append('    });\n')
        result.append('    results.push({ pattern: key, name: p.name, desc: p.desc, content: r.content[0].text });\n')
        result.append('  }\n')

        # Skip old lines until we find "return results;"
        i += 1
        while i < len(lines) and 'return results;' not in lines[i]:
            i += 1
        # Keep "return results;" line
        if i < len(lines):
            result.append(lines[i])
        i += 1
        continue

    result.append(line)
    i += 1

with open('/home/ubuntu/kabeuchi-system/output-generator.js', 'w', encoding='utf-8') as f:
    f.writelines(result)

print('Done. Lines: {} -> {}'.format(len(lines), len(result)))

# Also fix Phase3 Step7 if it has parallel generation
with open('/home/ubuntu/kabeuchi-system/output-generator.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Check Step7
if 'Promise.all' in content:
    print('WARNING: Promise.all still exists in file - may need manual fix for Step7')
else:
    print('No Promise.all found - all parallel generation removed')

import subprocess
r = subprocess.run(['node', '-c', '/home/ubuntu/kabeuchi-system/output-generator.js'], capture_output=True, text=True)
print('Syntax: {}'.format('OK' if r.returncode == 0 else 'ERROR: ' + r.stderr[:200]))
