// v3.1統合パッチ: v2.0ノウハウ移植の最終統合
// server.jsに就寝モードv3.1対応、好み学習注入、GPTモデル統一を適用

var fs = require('fs');
var path = require('path');
var BASE = '/home/ubuntu/kabeuchi-system';

(function patchServer() {
  var file = path.join(BASE, 'server.js');
  var code = fs.readFileSync(file, 'utf8');

  // 1. phaseRunner初期化の直後にprefLearner注入を追加
  if (code.indexOf('setPrefLearner') === -1) {
    code = code.replace(
      'var phaseRunner = V3_ENABLED ? new PhaseRunner(db, lineQA, sendLine) : null;',
      'var phaseRunner = V3_ENABLED ? new PhaseRunner(db, lineQA, sendLine) : null;\n' +
      'if (phaseRunner && prefLearner) { phaseRunner.setPrefLearner(prefLearner); }'
    );
    console.log('[server.js] prefLearner注入追加');
  }

  // 2. 就寝モードにv3.1対応を追加
  if (code.indexOf('phaseRunner.runSleepStep') === -1 && code.indexOf('runSleepMode') !== -1) {
    // runSleepMode内のengine.runStep呼び出しの前にv3.1分岐を追加
    var sleepMarker = "await engine.runStep(s.id, s.topic, r, s.research_data, true, s.project_id);";
    if (code.indexOf(sleepMarker) !== -1) {
      code = code.replace(
        sleepMarker,
        '// v3.1: フェーズランナーで就寝モード実行\n' +
        '              if (V3_ENABLED && phaseRunner) {\n' +
        '                try { await phaseRunner.runSleepStep(s); break; } catch(v3err) { console.error("[就寝v3.1]", v3err.message); }\n' +
        '              } else {\n' +
        '                ' + sleepMarker + '\n' +
        '              }'
      );
      console.log('[server.js] 就寝モードv3.1対応追加');
    }
  }

  fs.writeFileSync(file, code, 'utf8');
  console.log('[server.js] 統合パッチ適用完了');
})();

console.log('=== v3.1統合パッチ完了 ===');
