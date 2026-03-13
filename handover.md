# 前田法律事務所 AI壁打ちシステム 完全引き継ぎ情報
## 2026-03-10 パッチ適用後・最新版

---

# 1. ディレクトリ構成と各ファイルの役割

```
/home/ubuntu/kabeuchi-system/
├── server.js                  # メインサーバー（Express, 全APIルート, LINE webhook, cron）約740行
├── discussion-engine.js       # Phase1エンジン（8ステップ壁打ち）約350行
├── output-generator.js        # Phase2-3エンジン（13ステップ アウトプット生成）約683行
├── line-qa.js                 # LINE Q&A モジュール（質問送信・回答受付・スマートQA）
├── schema.js                  # SQLiteスキーマ定義（全テーブル・インデックス）
├── state-manager.js           # AWS⇔PC 状態管理・GitHub同期
├── claude-code-daemon.js      # Claude Code CLIブリッジ（port 3001）
├── github-sync.js             # GitHub自動同期（ファイル監視・定期push/pull）
├── ecosystem.config.js        # PM2設定ファイル
├── package.json               # npm依存関係
├── .env                       # 環境変数（APIキー等）
├── CLAUDE.md                  # Claude Code用プロジェクト設定
├── SYSTEM_PROMPT.md           # Claude Projects用システムプロンプト
├── patch_all_fixes.js         # 2026-03-10 一括修正パッチ（実行済み）
├── fix_line_encoding.js       # LINE文字化け修正スクリプト（実行済み）
├── convert_handover.js        # handover.md→HTML変換スクリプト
├── server.js.bak_encoding     # server.jsバックアップ（エンコーディング修正前）
├── data/
│   ├── kabeuchi.db            # SQLiteデータベース本体（WALモード）
│   ├── kabeuchi.db-wal        # WALファイル
│   ├── kabeuchi.db-shm        # 共有メモリファイル
│   ├── office-docs/           # 事務所資料格納ディレクトリ
│   ├── claude-code-logs/      # Claude Code Daemon実行ログ
│   └── sync.log               # GitHub同期ログ
├── state/
│   └── current_state.json     # 現在の作業状態（モード・プロジェクト進捗）
├── src/
│   └── public/
│       └── outputs/           # 生成済みHTML（LP等）格納
├── node_modules/              # npm パッケージ
└── .git/                      # Gitリポジトリ
```

---

# 2. 全APIエンドポイント一覧

server.js で定義。全エンドポイントに `x-api-key` ヘッダー認証が必要（一部除外あり）。

## 壁打ち（Phase1）
| メソッド | パス | 機能 |
|---------|------|------|
| POST | /api/discussion | 新規壁打ち開始 or 続行（sessionId指定時） |
| POST | /api/discussion/decide | 承認/却下（decision: approved/rejected） |
| POST | /api/discussion/finalize | 6ラウンド完了後の最終統合 |
| GET | /api/discussion/sessions | セッション一覧取得 |
| GET | /api/discussion/session/:id | セッション詳細取得（ログ含む） |

## アウトプット生成（Phase2-3）
| メソッド | パス | 機能 |
|---------|------|------|
| POST | /api/output/generate | アウトプット生成開始（4パターン同時） |
| POST | /api/output/approve | パターン承認（queueId + pattern指定） |

## 案件ライブラリ
| メソッド | パス | 機能 |
|---------|------|------|
| GET | /api/cases | 案件一覧（?type=lpで種別絞込） |
| POST | /api/cases | 案件登録 |

## 好み・記憶管理
| メソッド | パス | 機能 |
|---------|------|------|
| GET | /api/preferences | 好み一覧取得 |
| POST | /api/preferences | 好み登録 |

## 音声メモ
| メソッド | パス | 機能 |
|---------|------|------|
| POST | /api/voice | 音声メモ登録 |

## LINE Webhook
| メソッド | パス | 機能 |
|---------|------|------|
| POST | /webhook/line | LINE Messaging API webhook受信 |

## 状態管理
| メソッド | パス | 機能 |
|---------|------|------|
| GET | /api/state | 現在の状態取得 |
| POST | /api/state/switch | モード切替（mode: aws/local） |

## ヘルスチェック
| メソッド | パス | 機能 |
|---------|------|------|
| GET | /health | サーバーヘルスチェック（認証不要） |

## 静的ファイル配信
| パス | 内容 |
|------|------|
| /outputs/* | 生成済みHTMLファイル（src/public/outputs/） |

## Claude Code Daemon（port 3001）
| メソッド | パス | 機能 |
|---------|------|------|
| POST | /task | タスク投入（instruction指定） |
| GET | /status | 実行中タスク・キュー状態 |
| GET | /health | ヘルスチェック（認証不要） |
| GET | /history | タスク実行履歴 |
| POST | /pause | PCモード（一時停止） |
| POST | /resume | AWSモード（再開） |
| POST | /sync | 手動GitHub同期 |

---

# 3. フェーズ・ステップ仕様

## Phase1: 壁打ち（discussion-engine.js）
8ステップ × 最大6ラウンドの多角的AI議論。

| Step | 名前 | 役割 | AIモデル |
|------|------|------|---------|
| Step1 | market_research | 市場調査専門家（TAM/SAM/SOM・競合分析） | gpt-5.4 |
| Step2 | customer_needs | 消費者心理専門家（ペルソナ・深層心理） | claude-opus-4-6 |
| Step3 | idea_expansion | アイデア発展役（強化・横展開） | claude-opus-4-6 |
| Step4 | destruction | 悪魔の批判役（論理破壊・数字検証） | claude-opus-4-6 |
| Step5 | user_confirmation | ユーザー確認（方向性が変わった場合LINE通知） | - |
| Step6 | integration | 統合役（全意見統合・矛盾解消） | claude-opus-4-6 |
| Step7 | external_check | 外部視点チェック（競合・市場・法務リスク） | gpt-5.4 |
| Step8 | final_summary | 最終まとめ（JSON抽出→Phase2移行判定） | claude-opus-4-6 |

### Phase1 詳細仕様
- Step5: 就寝モードでなく、かつ方向性が変わった場合にLINE通知で確認
- Step8: 6ラウンド完了時にJSONでtarget_definition/appeal_points/catchcopyを抽出し、sessionsテーブルを更新してphase=2に移行
- 各Stepのレスポンスはdiscussion_logsテーブルに保存
- ラウンド間のコンテキストは直近3ラウンドのログを参照

## Phase2: アウトプット設計（output-generator.js）
6ステップの訴求戦略設計。

| Step | 名前 | 役割 | AIモデル |
|------|------|------|---------|
| Step1 | design_doc | 設計書作成（ターゲット・訴求軸・構成案） | claude-opus-4-6 |
| Step2 | appeal_gen | 訴求案6パターン生成 | claude-opus-4-6 |
| Step3 | appeal_critique | 悪魔の批判（訴求案への徹底批判） | claude-opus-4-6 |
| Step4 | appeal_narrow | 訴求絞り込み（LINE確認→最終2案選定） | claude-opus-4-6 |
| Step5 | copy_gen | キャッチコピー候補生成（各訴求×3案） | gpt-5.4 |
| Step6 | final_appeal | 最終訴求統合（メイン訴求+サブ訴求確定） | claude-opus-4-6 |

### Phase2 詳細仕様
- Step4: LINE確認で「OK」or修正指示を受付（30分タイムアウト→自動続行）
- Step6完了後、Phase3に自動移行

## Phase3: コンテンツ生成（output-generator.js）
7ステップの4パターン同時生成+品質管理。

| Step | 名前 | 役割 | AIモデル | max_tokens |
|------|------|------|---------|-----------|
| Step1 | pattern_gen | 4パターン同時生成（PASONA/ベネフィット/ストーリー/恐怖訴求） | claude-opus-4-6 | 16000 |
| Step2 | pattern_critique | 全パターンへの悪魔の批判 | claude-opus-4-6 | 4096 |
| Step3 | pattern_improve | 批判を踏まえた改善版生成 | claude-opus-4-6 | 8000 |
| Step4 | quality_check | 品質管理（4軸スコアリング） | claude-opus-4-6 | 4096 |
| Step5 | impact_check | インパクト・差別化チェック | gpt-5.4 | 4096 |
| Step6 | mobile_check | モバイル対応・UX最適化チェック | claude-opus-4-6 | 4096 |
| Step7 | final_version | 最終版生成（推奨パターン選定） | claude-opus-4-6 | 16000 |

### Phase3 詳細仕様
- 4パターン: A=PASONA型、B=ベネフィット直球型、C=ストーリー型、D=恐怖訴求型
- Step4の品質スコア: 4軸（訴求力・差別化・フォーマット・インパクト）各1-10点、計40点満点
- グレード: S(36+) / A(32-35) / B(28-31) / C(24-27) / D(24未満)
- Step4でC以下の場合、LINE警告送信し確認を求める
- Step7完了後、output_queueにstatus='awaiting_approval'で保存
- HTMLファイルはsrc/public/outputs/に保存（ファイル名: {type}_{sessionId}_{pattern}_{timestamp}.html）
- 承認時: output_queueのstatus='completed'、case_libraryに登録

### 対応アウトプット種別（16種）
lp, banner, sns_post, blog, youtube_script, press_release, newsletter, seo_design, seo_article, aio_content, proposal, dm, sales_script, company_profile, legal_content, seminar

---

# 4. LINEハンドラールール

server.jsの`processLineCommand()`関数で処理。

## コマンド一覧
| コマンド | 処理 |
|---------|------|
| 承認 | 最新のawaiting_approvalをapproved（パターン指定可: 「承認 A」） |
| 却下 + 理由 | 最新をrejected |
| 状態 / 状況 / 進捗 | 全アクティブセッション状態をLINE返信 |
| PCモード | AWS→PC切替（state-manager経由） |
| AWSモード | PC→AWS切替 |
| コード修正 + 指示 | Claude Code Daemon（port 3001）にタスク投入 |
| CC状態 | Claude Code Daemonの状態取得 |
| 質問+番号+回答 | pending_questionsの回答受付 |
| メモ + テキスト | voice_memosに保存 |
| その他テキスト | handleSmartQA()でAI回答（コンテキスト自動参照） |

## LINE送信関数
- `replyLine(replyToken, text)` - Webhook応答（5000文字制限）
- `pushLine(text)` - プッシュ通知（全ユーザー broadcast）
- `sendLine(text)` - 内部からのLINE送信（pushLineのラッパー）

## 就寝モード中の挙動
- 就寝モード中（23:00-07:00）は壁打ちを自動進行するが、LINE確認はスキップ（自動続行）
- ユーザーからのLINEメッセージは常に受付

---

# 5. プロジェクト管理メカニズム

## セッション管理
- sessionsテーブルでphase/current_round/statusを管理
- status: active（進行中）、sleep（就寝中自動進行）、archived（アーカイブ）、completed（完了）
- Phase遷移: Phase1 Step8完了時にphase=2に自動更新
- ラウンド管理: current_roundが各ステップ実行ごとにインクリメント

## 承認フロー
1. Phase2 Step4: 訴求絞り込み時にLINE確認（タイムアウト30分→自動続行）
2. Phase3 Step4: 品質チェックでC以下の場合LINE警告
3. Phase3 Step7完了: output_queueにawaiting_approval、LINE通知
4. /api/output/approve でパターン承認 → case_libraryに登録

## state/current_state.json
- mode: aws / local
- active_projects: 全アクティブセッションの詳細
- pending_tasks: 承認待ちタスク一覧
- voice_memos: 未処理音声メモ
- feedback_db: 好み・記憶DB全データ
- StateManagerがcollectState()で自動収集

---

# 6. 現在のプロジェクト状態（2026-03-10時点）

## アクティブセッション

### ID:2 交通事故LP壁打ち
- Phase: 2 | Round: 8/6（Phase1完了済み）
- Status: active
- 次のアクション: Phase2 アウトプット生成に進む
- 判断履歴: 1件（approved「ペルソナ設計良い」2026-03-07）
- 備考: LP生成未実行。Phase2に進んだがoutput/generateが未呼出し

### ID:3 死後事務委任×寺院 総合終活ビジネスモデル戦略
- Phase: 3 | Round: 6/6（Phase3完了）
- Status: active
- 次のアクション: LP承認待ち（推奨: パターンC）
- 出力キュー: queueId=3, type=lp, recommended=C
- 判断履歴: 2件（approved×2, 2026-03-08）
- 品質スコア（queueId=3）:
  - A: 28点（B判定）「HTMLが途中で切れ」
  - B: 28点（B判定）「コードが途中で切れ」
  - C: 28点（B判定）「HTMLコードが途中で切れ」推奨
  - D: 22点（D判定）「HTMLコードが途中で切れ」
- 生成済みHTML: lp_3_A/B/C/D_1773108339525.html（各25-26KB）+ lp_3_revised.html（72KB）

### ID:10 葬儀社×死後事務委任 提携提案書
- Phase: 2 | Round: 6/8
- Status: active
- 次のアクション: 提案書承認待ち（推奨: パターンB）
- 出力キュー: queueId=2, type=proposal, recommended=B
- 判断履歴: なし

### ID:4-9 文字化けセッション
- Status: archived（2026-03-10パッチで対応）
- 原因: LINE webhookからのShift_JIS→UTF-8エンコーディング不一致
- state/current_state.jsonではまだactiveとして表示されている（要state再生成）

## 出力キュー（output_queue）
| ID | Session | Type | 推奨 | Status |
|----|---------|------|------|--------|
| 1 | 3 | lp | B | completed |
| 2 | 10 | proposal | B | awaiting_approval |
| 3 | 3 | lp | C | awaiting_approval |

---

# 7. AI統合仕様

## 使用モデル（2026-03-10更新）
| 役割 | モデル | 備考 |
|------|--------|------|
| メイン（Claude A/B/統合） | claude-opus-4-6 | 128Kトークン出力対応 |
| 外部視点（ChatGPT） | gpt-5.4 | 128Kトークン出力対応 |
| LINE Q&A | claude-opus-4-6 | max_tokens: 1500 |
| Gemini | 未使用 | APIキー設定済みだが未実装 |

## API呼び出しパターン
- Anthropic SDK: `new Anthropic({ apiKey })` → `anthropic.messages.create()`
- OpenAI SDK: `new OpenAI({ apiKey })` → `openai.chat.completions.create()`
- 各ステップでsystem promptにコンテキスト（過去ログ・Phase1結果・事務所資料）を注入
- `_getOfficeDocs()`: data/office-docs/からテキストファイルを読み込みシステムプロンプトに追加

## max_tokens設定
| 用途 | 値 |
|------|-----|
| Phase3 Step1（4パターンHTML生成） | 16000 |
| Phase3 Step7（最終版HTML生成） | 16000 |
| Phase3 Step3（改善版） | 8000 |
| Phase2各ステップ | 4096 |
| Phase1各ステップ | 4096 |
| LINE Q&A | 1500 |

---

# 8. 自動スケジュール仕様

server.jsでnode-cronを使用。

| 時刻 | 処理 | 関数 |
|------|------|------|
| 毎日 23:00 | 就寝モード開始 | runSleepMode() |
| 毎日 07:00 | 朝サマリー送信 | sendMorningSummary() |
| 毎週月曜 09:00 | 週次レポート送信 | sendWeeklyReport() |

### runSleepMode()
1. アクティブセッションをsleep_logsに記録
2. 各セッションの壁打ちを1ラウンド自動進行（discussionEngine.runStep()）
3. LINE通知「就寝モード開始」

### sendMorningSummary()
1. 就寝中の進捗をclaude-opus-4-6で要約
2. morning_summariesに保存
3. LINE送信（前日の進捗・承認待ち・本日の推奨アクション）

### sendWeeklyReport()
1. 1週間の全活動をclaude-opus-4-6で要約
2. weekly_reportsに保存
3. LINE送信（週間サマリー・KPI・来週の推奨）

---

# 9. フィードバック・学習DB仕様

## memory_db テーブル
| カラム | 型 | 説明 |
|--------|-----|------|
| category | TEXT | カテゴリ（feedback_db / line_qa / preference等） |
| subcategory | TEXT | サブカテゴリ |
| key | TEXT | 項目名 |
| value | TEXT | 値 |
| confidence | REAL | 信頼度（0.0-1.0） |
| source_session_id | INTEGER | 元セッションID |
| source_type | TEXT | ソース種別（manual / line_qa / engine等） |

## 現在のデータ（38件）
主要エントリ:
- feedback_db / no_fake_data: 架空データ使用禁止ルール
- feedback_db / design_quality: デザイン品質基準（Inter+Noto Sans JP使用等）
- feedback_db / lp_material_priority: LP素材優先順位（弁護士写真フォルダ優先）
- line_qa系: LINEでの質問回答履歴（20件以上）

## 学習の流れ
1. LINE Q&A回答時にconfidence=0.6で自動保存
2. エンジンからの確認回答時にconfidence=0.8で保存
3. 手動登録（/api/preferences）はconfidence=0.5
4. 各エンジンステップでmemory_dbの内容をシステムプロンプトに注入

---

# 10. 法的ソース制約

discussion-engine.js / output-generator.js の `_getOfficeDocs()` 関数で以下を制御:

## 制約ルール
- 架空のデータ・実績は絶対に使わない
- 事務所HP・既存資料ファイルに基づくもののみ使用
- 弁護士名・事務所名・電話番号は必ず実物と照合
- 統計データは出典を明記
- 事務所資料は `data/office-docs/` ディレクトリから読み込み

## memory_dbでの管理
- key: no_fake_data でルールを記録
- エンジンのシステムプロンプトに「架空データ禁止」を明記
- 品質チェック（Phase3 Step4）でも虚偽データチェック項目あり

---

# 11. 品質チェック仕様

output-generator.jsの`scoreOutput()`関数で実装。

## 4軸スコアリング
| 軸 | 評価内容 | 配点 |
|----|---------|------|
| score_appeal | 訴求力（ターゲットの心に刺さるか） | 1-10 |
| score_differentiation | 差別化（競合との差） | 1-10 |
| score_format | フォーマット（HTML完成度・モバイル対応） | 1-10 |
| score_impact | インパクト（行動喚起力） | 1-10 |

## グレード判定
| グレード | スコア範囲 | 対応 |
|---------|----------|------|
| S | 36-40 | そのまま承認推奨 |
| A | 32-35 | 軽微修正推奨 |
| B | 28-31 | 改善推奨 |
| C | 24-27 | 要改善（LINE警告） |
| D | 0-23 | 不合格（LINE警告・再生成推奨） |

## 現在のスコア状況
- queueId=3（セッション3 LP第2回）: A=28, B=28, C=28(推奨), D=22
  - 全パターンで「HTMLが途中で切れている」指摘あり
  - max_tokens 8000→16000に修正済みのため、再生成で改善見込み
- queueId=1（セッション3 LP第1回）: A=31, B=12, C=24, D=23
  - B/C/Dは「HTMLが途切れ」で低スコア

---

# 12. 環境変数

.envファイルで管理。

| 変数名 | 用途 | 備考 |
|--------|------|------|
| ANTHROPIC_API_KEY | Claude API認証 | sk-ant-api03-... |
| OPENAI_API_KEY | ChatGPT API認証 | sk-proj-... |
| LINE_CHANNEL_ACCESS_TOKEN | LINE Messaging API | S+GvO4... |
| PORT | サーバーポート | 3000 |
| NODE_ENV | 実行環境 | production |
| SESSION_SECRET | セッション署名 | openssl rand -hex 32 |
| DB_PATH | データベースパス | ./data/kabeuchi.db |
| API_SECRET | API認証キー | 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912 |
| GITHUB_TOKEN | GitHub認証 | ghp_l7W... |
| GEMINI_API_KEY | Google Gemini | AIzaSy...（未使用） |

---

# 13. プロセス管理

## PM2設定（ecosystem.config.js）
```
name: kabeuchi
script: server.js
cwd: /home/ubuntu/kabeuchi-system
max_restarts: 5
min_uptime: 10s
restart_delay: 5000
max_memory_restart: 500M
```

## 現在のPM2状態（2026-03-10）
- Status: online
- PID: 99499
- Memory: 68.2MB
- Restarts: 2（パッチ適用による再起動）
- Uptime: 正常稼働中

## Nginx設定
- ドメイン: 176-32-87-118.sslip.io / 176.32.87.118
- SSL: Let's Encrypt（sslip.io経由）
- HTTP(80) / HTTPS(443) → proxy_pass http://127.0.0.1:3000
- proxy_read_timeout: 120s

## グローバルエラーハンドリング（2026-03-10追加）
server.jsに以下を追加済み:
- `process.on('unhandledRejection')` - ログ記録してクラッシュ回避
- `process.on('uncaughtException')` - ネットワークエラー・API制限はログのみで続行
- ECONNREFUSED / ETIMEDOUT / ENOTFOUND / rate_limit / overloaded は自動復帰

## Claude Code Daemon（port 3001）
- PM2管理外（手動起動）
- LINE→Claude Code CLI→コード修正→Git push→PM2再起動の自動パイプライン
- 5分間隔でGitHub pull
- タスクタイムアウト: 5分
- `--dangerously-skip-permissions` フラグ付きで実行

---

# 14. AWS⇔ローカル切替（Claude Code移行状態）

## 現在のモード: AWS

## 切替メカニズム（state-manager.js）
1. AWS→PC: `switchToPC()` → state保存 → GitHub push
2. PC→AWS: `switchToAWS()` → GitHub pull → state読込
3. LINE「PCモード」「AWSモード」コマンドで切替

## GitHub連携
- リポジトリ: github.com/mysm1004/maeda-ai-system（private）
- origin: https://mysm1004:{GITHUB_TOKEN}@github.com/mysm1004/maeda-ai-system.git
- 自動push対象から除外: .env, data/kabeuchi.db*, data/claude-code-logs

## state/current_state.json
- 全プロジェクト進捗・承認待ち・音声メモ・好みDB・最近のログを含む
- mode: aws / local で現在のアクティブ環境を記録
- 切替時に自動更新・GitHub同期

---

# 15. GitHub統合

## github-sync.js
4つの動作モード:
| モード | 用途 | 起動方法 |
|--------|------|---------|
| watch | ローカル用: ファイル変更監視+自動push | `node github-sync.js watch` |
| pull | AWS用: 定期pull（デフォルト5分間隔） | `node github-sync.js pull` |
| push | 即時push | `node github-sync.js push` |
| sync | 双方向（watch+pull） | `node github-sync.js sync` |

## 除外パターン
node_modules, .git, data/kabeuchi.db*, data/claude-code-logs, data/sync.log, *.pyc, __pycache__, .DS_Store, Thumbs.db

## 最近のコミット履歴
- 大半は「state: auto-save」（current_state.jsonの自動保存）
- 「fix: sequential LP generation to avoid rate limits」
- 「fix: serve LP/HTML outputs without helmet headers」
- 「feat: add static file serving for /outputs」

---

# 16. 既知のバグ・問題点

## 修正済み（2026-03-10パッチ）
1. **AIモデル旧版使用** → claude-opus-4-6 / gpt-5.4に更新（26箇所）
2. **HTML出力途中切れ** → max_tokens 8000→16000に増加（2箇所）
3. **事務所資料パス不正** → `__dirname/../../../data/office-docs` → `__dirname/data/office-docs`に修正
4. **PM2クラッシュループ** → unhandledRejection/uncaughtExceptionハンドラー追加
5. **文字化けセッション（ID:4-9）** → status='archived'に変更

## 残存する問題
1. **state/current_state.jsonの不整合**: セッション4-9がDBではarchived済みだが、state.jsonでは依然「進行中」と表示。state再生成（POST /api/state/switch等）が必要
2. **memory_dbの文字化け**: feedback_db系のvalue（no_fake_data, design_quality, lp_material_priority）がShift_JIS文字化け状態のまま。再登録が必要
3. **品質スコアの「HTML切れ」問題**: 既存スコア（queueId=1,3）はmax_tokens:8000時代の評価。max_tokens:16000で再生成すれば改善見込みだが、既存スコアは古いまま
4. **case_libraryが空**: 承認フローは実装済みだが、まだ1件も承認完了していない（全てawaiting_approval）
5. **Claude Code Daemonが常時起動ではない**: PM2管理外のため手動起動が必要。サーバー再起動時に自動起動しない
6. **LINE webhook body-parser**: malformed JSONがクラッシュ原因になる可能性あり（エラーハンドラーで軽減済み）

---

# 17. 未実装機能

## コードに痕跡はあるが未稼働
1. **AB テスト（ab_tests テーブル）**: スキーマ存在、データ0件、API未実装
2. **広告デザイン（ad_designs テーブル）**: スキーマ存在、データ0件、API未実装
3. **競合監視（competitors/competitor_changes テーブル）**: スキーマ存在、データ0件、定期チェック未実装
4. **営業リスト（sales_lists/list_entries テーブル）**: スキーマ存在、データ0件、API未実装
5. **メディア最適化（media_optimizations テーブル）**: スキーマ存在、データ0件
6. **Gemini統合**: APIキー設定済み、コード未実装
7. **preference-learner.js**: ファイル不在（好み自動学習モジュール計画のみ）

## 設計上の未完成部分
8. **LP以外のアウトプットHTML保存**: LP（outputType=lp）のみHTMLファイル保存実装済み。banner/proposal/dm等は非HTML形式で返却
9. **ABテスト連動**: 同一セッションで複数パターンの効果測定機能が未実装
10. **自動デプロイ**: 生成HTMLの本番サーバー自動配置（Nginx配信）が手動
11. **ダッシュボード**: Webベースの管理画面が未実装（現状LINE+API操作のみ）

---

# 18. HTML・レポート・生成ファイル管理

## 生成済みHTMLファイル一覧（src/public/outputs/）
| ファイル名 | サイズ | 日時 | 内容 |
|-----------|--------|------|------|
| lp_3_A_1773108339525.html | 25KB | 2026-03-10 02:05 | セッション3 LP パターンA（PASONA型）第2回 |
| lp_3_B_1773108339525.html | 26KB | 2026-03-10 02:05 | セッション3 LP パターンB（ベネフィット直球型）第2回 |
| lp_3_C_1773108339525.html | 26KB | 2026-03-10 02:05 | セッション3 LP パターンC（ストーリー型）第2回【推奨】 |
| lp_3_D_1773108339525.html | 26KB | 2026-03-10 02:05 | セッション3 LP パターンD（恐怖訴求型）第2回 |
| lp_3_index_1773108339525.html | 1.6KB | 2026-03-10 02:05 | 4パターン比較インデックス |
| lp_3_A_1773023323362.html | 16KB | 2026-03-09 02:28 | セッション3 LP パターンA 第1回 |
| lp_3_B_1773023323362.html | 16KB | 2026-03-09 14:11 | セッション3 LP パターンB 第1回 |
| lp_3_C_1773023323362.html | 16KB | 2026-03-09 02:28 | セッション3 LP パターンC 第1回 |
| lp_3_D_1773023323362.html | 15KB | 2026-03-09 02:28 | セッション3 LP パターンD 第1回 |
| lp_3_index_1773023323362.html | 1.9KB | 2026-03-09 02:28 | 第1回インデックス |
| lp_3_revised.html | 72KB | 2026-03-10 03:53 | 修正版LP（手動生成） |

## 閲覧URL
- LP比較: https://176-32-87-118.sslip.io/outputs/lp_3_index_1773108339525.html
- 個別LP: https://176-32-87-118.sslip.io/outputs/lp_3_{A-D}_1773108339525.html
- 引き継ぎHTML: http://176.32.87.118/handover.html

## /var/www/html/
| ファイル | サイズ | 内容 |
|---------|--------|------|
| handover.md | 31KB | この引き継ぎ文書（Markdown版） |
| handover.html | 34KB | この引き継ぎ文書（HTML版） |
| index.nginx-debian.html | 612B | Nginxデフォルトページ |

## HTMLファイルの配信ルール
- `src/public/outputs/` 内のファイルはExpressのstatic middleware経由で `/outputs/` パスで配信
- helmet headerを除外（LINE内ブラウザ互換性のため）
- Content-Security-Policy等は無効化済み

---

# DBテーブル行数サマリー（2026-03-10時点）
| テーブル | 行数 | 状態 |
|---------|------|------|
| sessions | 9 | ID:2,3,10がactive / ID:4-9がarchived |
| discussion_logs | 163 | Phase1-3の全議論ログ |
| memory_db | 38 | 好み・学習データ |
| output_queue | 3 | 1件completed, 2件awaiting_approval |
| quality_scores | 8 | 2セットのスコア |
| decisions | 3 | 承認履歴 |
| pending_questions | 34 | LINE Q&A履歴 |
| line_messages | 50 | LINE送受信ログ |
| sleep_logs | 9 | 就寝モードログ |
| morning_summaries | 1 | 朝サマリー |
| weekly_reports | 1 | 週次レポート |
| voice_memos | 5 | 音声メモ |
| case_library | 0 | 承認済みアウトプット（未使用） |
| ab_tests | 0 | 未実装 |
| ad_designs | 0 | 未実装 |
| competitors | 0 | 未実装 |
| competitor_changes | 0 | 未実装 |
| sales_lists | 0 | 未実装 |
| list_entries | 0 | 未実装 |
| media_optimizations | 0 | 未実装 |

---

# 運用メモ

## よく使うコマンド
```bash
# SSH接続
ssh -i /c/Users/user/Downloads/LightsailDefaultKey-ap-northeast-1.pem ubuntu@176.32.87.118

# PM2操作
pm2 restart kabeuchi
pm2 logs kabeuchi --lines 50
pm2 reset kabeuchi  # リスタートカウンタリセット

# API テスト
curl -s http://176.32.87.118/health
curl -s http://176.32.87.118/api/discussion/sessions -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912"

# DB直接操作
cd /home/ubuntu/kabeuchi-system
node -e "var db = require('better-sqlite3')('./data/kabeuchi.db'); console.log(db.prepare('SELECT * FROM sessions').all()); db.close();"
```

## トラブルシューティング
1. サーバー応答なし → `pm2 restart kabeuchi` → `pm2 logs`で確認
2. LINE通知が来ない → `pm2 logs kabeuchi | grep LINE` でエラー確認
3. HTMLが表示されない → `/outputs/`パスの確認、helmet設定確認
4. API認証エラー → x-api-keyヘッダーの値確認

---

*この文書は2026-03-10にサーバー上の実コードを読み取って生成しました。*
*パッチ適用後（AIモデル更新・max_tokens増加・エラーハンドリング追加・パス修正）の最新状態を反映しています。*
