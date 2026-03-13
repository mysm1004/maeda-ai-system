#!/usr/bin/env python3
"""Fix Phase3 Step7: change parallel to sequential generation"""

with open('/home/ubuntu/kabeuchi-system/output-generator.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

result = []
i = 0
while i < len(lines):
    line = lines[i]

    if '4パターン最終改善版を並行生成' in line:
        result.append('  // 4パターン最終改善版を順次生成（レートリミット対策）\n')
        result.append('  var finalPatterns = [];\n')
        result.append('  for (var fi = 0; fi < patterns.length; fi++) {\n')
        result.append('    var p = patterns[fi];\n')
        result.append("    console.log('[Phase3] Step7: パターン' + p.pattern + ' 最終版生成中...');\n")
        result.append('    var r = await this.anthropic.messages.create({\n')
        result.append("      model: 'claude-sonnet-4-20250514', max_tokens: 8000,\n")
        result.append("      system: 'あなたは最終仕上げ担当のトップコピーライターです。全チェック結果を反映し最高品質の最終版を生成してください。HTML系アウトプット（LP、バナー等）の場合は、必ず<!DOCTYPE html>から</html>まで完結する単一HTMLファイルとして出力。CSSは全て<style>タグ内にインライン記述。外部ファイル参照禁止。CSSは簡潔にまとめること。前田さんの好み: ' + JSON.stringify(memory),\n")
        result.append("      messages: [{ role: 'user', content: '【元のパターン' + p.pattern + ': ' + p.name + '】\\n' + p.content +\n")
        result.append("        '\\n\\n【全チェックからの改善指示】\\n' + allFeedback +\n")
        result.append("        '\\n\\n全ての指摘を反映した最終版を生成してください。改善点を必ず全て反映すること。' }]\n")
        result.append('    });\n')
        result.append('    finalPatterns.push({ pattern: p.pattern, name: p.name, desc: p.desc, content: r.content[0].text });\n')
        result.append('  }\n')

        # Skip old parallel block until the closing }));
        i += 1
        while i < len(lines) and '}.bind(this)));' not in lines[i]:
            i += 1
        i += 1  # skip the }.bind(this))); line
        continue

    result.append(line)
    i += 1

with open('/home/ubuntu/kabeuchi-system/output-generator.js', 'w', encoding='utf-8') as f:
    f.writelines(result)

print('Done. Lines: {} -> {}'.format(len(lines), len(result)))

import subprocess
r = subprocess.run(['node', '-c', '/home/ubuntu/kabeuchi-system/output-generator.js'], capture_output=True, text=True)
print('Syntax: {}'.format('OK' if r.returncode == 0 else 'ERROR: ' + r.stderr[:300]))
