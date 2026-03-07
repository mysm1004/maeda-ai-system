// 壁打ちシステム フロントエンド
const state = {
  currentSessionId: null,
  sleepMode: false
};

// === API ===
async function api(path, method, body) {
  method = method || 'GET';
  body = body || null;
  var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  var res = await fetch(path, opts);
  if (!res.ok) {
    var err = await res.json().catch(function() { return { error: 'エラーが発生しました' }; });
    throw new Error(err.error);
  }
  return res.json();
}

// === タブ切り替え ===
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');

    if (btn.dataset.tab === 'sessions') loadSessions();
    if (btn.dataset.tab === 'preferences') loadPreferences();
  });
});

// === セッション管理 ===
async function loadSessions() {
  var sessions = await api('/api/sessions');
  var list = document.getElementById('session-list');
  if (sessions.length === 0) {
    list.innerHTML = '<div class="empty-state"><p>セッションがありません</p></div>';
    return;
  }
  list.innerHTML = sessions.map(function(s) {
    return '<div class="session-card" onclick="selectSession(' + s.id + ')">' +
      '<h4>' + esc(s.title) + '</h4>' +
      '<p>' + esc(s.topic) + '</p>' +
      '<span class="status status-' + s.status + '">' + s.status + '</span>' +
      '<span style="float:right;font-size:0.75rem;color:#64748b;">' + new Date(s.updated_at).toLocaleString('ja-JP') + '</span>' +
      '</div>';
  }).join('');
}

async function selectSession(id) {
  state.currentSessionId = id;
  document.getElementById('no-session').style.display = 'none';
  document.getElementById('discussion-view').style.display = 'block';

  var data = await api('/api/sessions/' + id);
  document.getElementById('session-title').textContent = data.title;
  document.getElementById('session-topic').textContent = 'テーマ: ' + data.topic;

  renderLogs(data.logs);
  // 議論タブに切り替え
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
  document.querySelector('[data-tab="discussion"]').classList.add('active');
  document.getElementById('tab-discussion').classList.add('active');
}

document.getElementById('btn-create-session').addEventListener('click', async function() {
  var title = document.getElementById('new-title').value.trim();
  var topic = document.getElementById('new-topic').value.trim();
  if (!title || !topic) return alert('タイトルとテーマを入力してください');

  var data = await api('/api/sessions', 'POST', { title: title, topic: topic });
  document.getElementById('new-title').value = '';
  document.getElementById('new-topic').value = '';
  await selectSession(data.id);
});

// === ログ表示 ===
function renderLogs(logs) {
  var container = document.getElementById('discussion-logs');
  if (logs.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>まだ議論がありません。「次のラウンド実行」で開始してください。</p></div>';
    return;
  }
  container.innerHTML = logs.map(function(l) {
    return '<div class="log-entry ' + l.role + '" data-id="' + l.id + '">' +
      '<div class="log-role">' + esc(l.role_label) +
      (l.is_sleep_mode ? ' <span class="sleep-badge">就寝中</span>' : '') +
      '</div>' +
      '<div class="log-content">' + esc(l.content) + '</div>' +
      '<div class="log-meta">R' + l.round_number + ' | ' + new Date(l.created_at).toLocaleString('ja-JP') + '</div>' +
      '</div>';
  }).join('');
  container.scrollTop = container.scrollHeight;
}

// === 議論実行 ===
document.getElementById('btn-run-round').addEventListener('click', async function() {
  if (!state.currentSessionId) return;
  var btn = document.getElementById('btn-run-round');
  btn.disabled = true;
  btn.textContent = '実行中...';

  var logsContainer = document.getElementById('discussion-logs');
  logsContainer.innerHTML += '<div class="loading">AI が議論中です...</div>';
  logsContainer.scrollTop = logsContainer.scrollHeight;

  try {
    await api('/api/sessions/' + state.currentSessionId + '/run', 'POST');
    var data = await api('/api/sessions/' + state.currentSessionId);
    renderLogs(data.logs);
  } catch (err) {
    alert('エラー: ' + err.message);
    var loadingEl = logsContainer.querySelector('.loading');
    if (loadingEl) loadingEl.remove();
  }
  btn.disabled = false;
  btn.textContent = '▶ 次のラウンド実行';
});

// === ユーザー意見送信 ===
document.getElementById('btn-send').addEventListener('click', async function() {
  if (!state.currentSessionId) return;
  var input = document.getElementById('user-input');
  var content = input.value.trim();
  if (!content) return;

  await api('/api/sessions/' + state.currentSessionId + '/comment', 'POST', { content: content });
  input.value = '';
  var data = await api('/api/sessions/' + state.currentSessionId);
  renderLogs(data.logs);
});

// === 承認/却下 ===
document.getElementById('btn-approve').addEventListener('click', function() { decide('approved'); });
document.getElementById('btn-reject').addEventListener('click', function() { decide('rejected'); });

async function decide(decision) {
  if (!state.currentSessionId) return;
  var comment = document.getElementById('user-input').value.trim();
  var logs = document.querySelectorAll('.log-entry');
  var lastLog = logs[logs.length - 1];
  var logId = lastLog ? parseInt(lastLog.dataset.id) : null;

  await api('/api/sessions/' + state.currentSessionId + '/decide', 'POST', {
    decision: decision, comment: comment, logId: logId
  });
  document.getElementById('user-input').value = '';
  alert(decision === 'approved' ? '承認しました' : '却下しました');
}

// === 就寝モード ===
document.getElementById('btn-sleep-toggle').addEventListener('click', async function() {
  if (!state.currentSessionId) return alert('セッションを選択してください');

  if (state.sleepMode) {
    await api('/api/sleep-mode/deactivate', 'POST');
    state.sleepMode = false;
    updateSleepUI();
  } else {
    var maxRounds = parseInt(document.getElementById('sleep-max-rounds').value) || 10;
    var intervalMinutes = parseInt(document.getElementById('sleep-interval').value) || 30;
    await api('/api/sleep-mode/activate', 'POST', {
      sessionId: state.currentSessionId, maxRounds: maxRounds, intervalMinutes: intervalMinutes
    });
    state.sleepMode = true;
    updateSleepUI();
  }
});

function updateSleepUI() {
  var indicator = document.getElementById('sleep-indicator');
  var btn = document.getElementById('btn-sleep-toggle');
  if (state.sleepMode) {
    indicator.textContent = '就寝モード: ON';
    indicator.className = 'sleep-on';
    btn.textContent = '就寝モードOFF';
    btn.style.background = '#f59e0b';
  } else {
    indicator.textContent = '就寝モード: OFF';
    indicator.className = 'sleep-off';
    btn.textContent = '就寝モードON';
    btn.style.background = '';
  }
}

// === 好み管理 ===
async function loadPreferences() {
  var prefs = await api('/api/preferences');
  var list = document.getElementById('preferences-list');
  if (prefs.length === 0) {
    list.innerHTML = '<div class="empty-state"><p>まだ学習データがありません</p></div>';
    return;
  }
  list.innerHTML = prefs.map(function(p) {
    return '<div class="pref-item">' +
      '<div class="pref-info">' +
      '<div class="pref-category">' + esc(p.category) + '</div>' +
      '<div class="pref-key">' + esc(p.key) + '</div>' +
      '<div class="pref-value">' + esc(p.value) + '</div>' +
      '<div class="pref-confidence">信頼度: ' + (p.confidence * 100).toFixed(0) + '%</div>' +
      '</div>' +
      '<button class="pref-delete" onclick="deletePref(' + p.id + ')">削除</button>' +
      '</div>';
  }).join('');
}

document.getElementById('btn-add-pref').addEventListener('click', async function() {
  var category = document.getElementById('pref-category').value.trim();
  var key = document.getElementById('pref-key').value.trim();
  var value = document.getElementById('pref-value').value.trim();
  if (!category || !key || !value) return alert('全項目を入力してください');
  await api('/api/preferences', 'POST', { category: category, key: key, value: value, confidence: 0.8 });
  document.getElementById('pref-category').value = '';
  document.getElementById('pref-key').value = '';
  document.getElementById('pref-value').value = '';
  loadPreferences();
});

async function deletePref(id) {
  if (!confirm('この好みを削除しますか？')) return;
  await api('/api/preferences/' + id, 'DELETE');
  loadPreferences();
}

// === LINE通知テスト ===
document.getElementById('btn-test-line').addEventListener('click', async function() {
  try {
    await api('/api/notify/line', 'POST', { message: 'テスト通知：壁打ちシステムからの通知テストです。' });
    alert('LINE通知を送信しました（トークン未設定の場合はスキップされます）');
  } catch (err) {
    alert('エラー: ' + err.message);
  }
});

// === サマリー生成 ===
document.getElementById('btn-gen-summary').addEventListener('click', async function() {
  if (!state.currentSessionId) return alert('セッションを選択してください');
  var resultEl = document.getElementById('summary-result');
  resultEl.style.display = 'block';
  resultEl.textContent = 'サマリー生成中...';
  try {
    var data = await api('/api/sessions/' + state.currentSessionId + '/summary', 'POST');
    resultEl.textContent = data.summary || 'サマリーなし';
  } catch (err) {
    resultEl.textContent = 'エラー: ' + err.message;
  }
});

// === コンテンツ生成 ===
document.getElementById('btn-gen-lp').addEventListener('click', async function() {
  var resultEl = document.getElementById('gen-result');
  resultEl.style.display = 'block';
  resultEl.textContent = 'LP生成中...';
  try {
    var data = await api('/api/generate/lp', 'POST', {
      lawFirmName: document.getElementById('lp-name').value,
      services: document.getElementById('lp-services').value,
      targetAudience: document.getElementById('lp-target').value,
      tone: document.getElementById('lp-tone').value,
      additionalInfo: document.getElementById('lp-info').value
    });
    resultEl.textContent = data.content;
  } catch (err) { resultEl.textContent = 'エラー: ' + err.message; }
});

document.getElementById('btn-gen-prop').addEventListener('click', async function() {
  var resultEl = document.getElementById('gen-result');
  resultEl.style.display = 'block';
  resultEl.textContent = '提案書生成中...';
  try {
    var data = await api('/api/generate/proposal', 'POST', {
      clientName: document.getElementById('prop-client').value,
      projectType: document.getElementById('prop-type').value,
      budget: document.getElementById('prop-budget').value,
      deadline: document.getElementById('prop-deadline').value,
      requirements: document.getElementById('prop-req').value
    });
    resultEl.textContent = data.content;
  } catch (err) { resultEl.textContent = 'エラー: ' + err.message; }
});

document.getElementById('btn-gen-dm').addEventListener('click', async function() {
  var resultEl = document.getElementById('gen-result');
  resultEl.style.display = 'block';
  resultEl.textContent = 'DM生成中...';
  try {
    var data = await api('/api/generate/dm', 'POST', {
      targetType: document.getElementById('dm-target').value,
      purpose: document.getElementById('dm-purpose').value,
      channel: document.getElementById('dm-channel').value,
      length: document.getElementById('dm-length').value
    });
    resultEl.textContent = data.content;
  } catch (err) { resultEl.textContent = 'エラー: ' + err.message; }
});

// === 初期化 ===
async function init() {
  var sleepStatus = await api('/api/sleep-mode');
  state.sleepMode = sleepStatus.isActive;
  updateSleepUI();
}

function esc(str) {
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

init();
