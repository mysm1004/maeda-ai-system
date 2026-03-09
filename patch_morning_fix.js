// patch_morning_fix.js - 朝サマリーのフェーズラベル修正
var fs = require('fs');
var f = '/home/ubuntu/kabeuchi-system/src/server.js';
var s = fs.readFileSync(f, 'utf8');

var old = "msg += star + s.title + ' \u2192 Phase' + s.phase + ' Step' + s.current_round + dl + '\\n';";
var rep = "var phaseLabels2 = {1:'\u58c1\u6253\u3061', 2:'\u8a34\u6c42\u8a2d\u8a08', 3:'\u30a2\u30a6\u30c8\u30d7\u30c3\u30c8', 4:'\u55b6\u696d\u30ea\u30b9\u30c8', 5:'\u5e83\u544a\u8a2d\u8a08', 6:'\u30e1\u30c7\u30a3\u30a2\u6700\u9069\u5316'};\n      var phLabel = phaseLabels2[s.phase] || 'Phase' + s.phase;\n      msg += star + s.title + ' \u2192 ' + phLabel + ' Step' + s.current_round + dl + '\\n';";

if (s.indexOf(old) >= 0 && s.indexOf('phaseLabels2') === -1) {
  s = s.replace(old, rep);
  fs.writeFileSync(f, s, 'utf8');
  console.log('[Fix] 朝サマリー: フェーズラベル修正完了');
} else {
  console.log('[Fix] スキップ（既に修正済み or パターン不一致）');
}
