import re

with open('/home/ubuntu/kabeuchi-system/server_fixed.js', 'r') as f:
    content = f.read()

lines = content.split('\n')
result = []
in_string = False
string_buffer = ''

for line in lines:
    if in_string:
        sq = chr(39)  # single quote
        if sq in line:
            string_buffer += '\\n' + line
            result.append(string_buffer)
            in_string = False
            string_buffer = ''
        else:
            string_buffer += '\\n' + line
    else:
        sq = chr(39)
        count = 0
        i = 0
        while i < len(line):
            ch = line[i]
            if ch == chr(92) and i + 1 < len(line):  # backslash
                i += 2
                continue
            if ch == sq:
                count += 1
            i += 1
        if count % 2 == 1:
            in_string = True
            string_buffer = line
        else:
            result.append(line)

if in_string:
    result.append(string_buffer)

with open('/home/ubuntu/kabeuchi-system/server_fixed.js', 'w') as f:
    f.write('\n'.join(result))

print('Fixed multiline strings')
