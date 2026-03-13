const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat,
        HeadingLevel, BorderStyle, WidthType, ShadingType,
        PageNumber, PageBreak, TableOfContents } = require('docx');

// ===== ヘルパー =====
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 }, children: [new TextRun({ text, bold: true, size: 32, font: 'Yu Gothic' })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 }, children: [new TextRun({ text, bold: true, size: 28, font: 'Yu Gothic' })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 }, children: [new TextRun({ text, bold: true, size: 24, font: 'Yu Gothic' })] });
}
function p(text, opts = {}) {
  return new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text, size: 22, font: 'Yu Gothic', ...opts })] });
}
function pMulti(runs) {
  return new Paragraph({ spacing: { after: 100 }, children: runs.map(r => {
    if (typeof r === 'string') return new TextRun({ text: r, size: 22, font: 'Yu Gothic' });
    return new TextRun({ size: 22, font: 'Yu Gothic', ...r });
  })});
}
function bullet(text, ref = 'bullets', level = 0) {
  return new Paragraph({ numbering: { reference: ref, level }, spacing: { after: 60 }, children: [new TextRun({ text, size: 22, font: 'Yu Gothic' })] });
}
function bulletBold(label, desc) {
  return new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 }, children: [
    new TextRun({ text: label, size: 22, font: 'Yu Gothic', bold: true }),
    new TextRun({ text: desc, size: 22, font: 'Yu Gothic' })
  ]});
}

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: '1F4E79', type: ShadingType.CLEAR };
const altShading = { fill: 'F2F7FB', type: ShadingType.CLEAR };

function cell(text, opts = {}) {
  return new TableCell({
    borders, width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.shading || undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Yu Gothic', color: opts.color || '000000', bold: opts.bold || false })] })]
  });
}
function headerCell(text, w) {
  return cell(text, { width: w, shading: headerShading, color: 'FFFFFF', bold: true });
}

function makeTable(headers, rows, colWidths) {
  const tw = colWidths.reduce((a,b) => a+b, 0);
  return new Table({
    width: { size: tw, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => headerCell(h, colWidths[i])) }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((c, ci) => cell(c, { width: colWidths[ci], shading: ri % 2 === 1 ? altShading : undefined }))
      }))
    ]
  });
}

function spacer() { return new Paragraph({ spacing: { after: 80 }, children: [] }); }

// ===== 本文 =====
const children = [];

// 表紙
children.push(new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '前田法律事務所', size: 36, font: 'Yu Gothic', bold: true, color: '1F4E79' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'AI壁打ちシステム', size: 48, font: 'Yu Gothic', bold: true, color: '1F4E79' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: '詳細仕様書 v1.0', size: 32, font: 'Yu Gothic', color: '333333' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: '2026年3月13日', size: 24, font: 'Yu Gothic', color: '666666' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '本文書はシステムの全機能・全工程・全ルールを網羅的に記載した技術仕様書です。', size: 20, font: 'Yu Gothic', color: '666666' })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// 目次
children.push(h1('目次'));
children.push(new TableOfContents('目次', { hyperlink: true, headingStyleRange: '1-3' }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 1. システム概要 =====
children.push(h1('1. システム概要'));

children.push(h2('1.1 目的'));
children.push(p('前田法律事務所のマーケティング・事業戦略立案を、複数AIによる構造化された議論（壁打ち）を通じて高精度に支援するシステム。テーマに対して市場調査→顧客分析→アイデア構築→批判→統合の8ステップを経て最強のアイデアを生成し、さらにそのアイデアを訴求設計→コンテンツ生成まで一気通貫で実行する。'));

children.push(h2('1.2 アーキテクチャ'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['サーバー', 'AWS Lightsail (176.32.87.118)'],
    ['ランタイム', 'Node.js v20.20.1'],
    ['フレームワーク', 'Express.js 4.21.0'],
    ['データベース', 'SQLite3 (better-sqlite3 v11.7.0)'],
    ['プロセス管理', 'PM2 (アプリ名: kabeuchi)'],
    ['ポート', '3000'],
    ['AI: Claude', 'claude-sonnet-4-20250514 (Anthropic SDK v0.39.0)'],
    ['AI: ChatGPT', 'gpt-5.4 (OpenAI SDK v4.77.0)'],
    ['AI: 高度分析', 'claude-opus-4-6 (LINE SmartQA用)'],
    ['LINE連携', 'LINE Messaging API (push/reply/broadcast)'],
    ['GitHub同期', '自動commit & push (30分毎 + ファイル変更監視)'],
    ['セキュリティ', 'Helmet.js + API Key認証 + gzip圧縮'],
  ],
  [3500, 5860]
));

children.push(h2('1.3 3フェーズ構成'));
children.push(p('システムは以下の3フェーズで構成される。各フェーズは順序的に実行され、前フェーズの出力が次フェーズの入力となる。'));
children.push(makeTable(
  ['フェーズ', 'ステップ数', '目的', 'AI使用'],
  [
    ['Phase1: 壁打ち', '8ステップ', 'テーマの徹底調査・アイデア構築・批判・統合', 'Claude 5回 / GPT 3回'],
    ['Phase2: 訴求磨き込み', '6ステップ', '最強の訴求角度を絞り込み、コピーライティング', 'Claude 5回 / GPT 1回'],
    ['Phase3: コンテンツ生成', '7ステップ', '4パターン同時生成→多角チェック→最終版', 'Claude 6回 / GPT 1回'],
  ],
  [2000, 1500, 3500, 2360]
));
children.push(p('合計21ステップ。Claude 16回、GPT 5回のAI呼び出しで構成される。'));

children.push(h2('1.4 統一ルール'));
children.push(h3('1.4.1 テーマ固定ルール'));
children.push(p('全ステップのシステムプロンプトに以下の注意書きが強制挿入される:'));
children.push(p('「【最重要】分析対象テーマ：「{topic}」。このテーマのみを分析してください。記憶DBや過去案件の別テーマに絶対に引っ張られないこと。」', { italics: true }));
children.push(p('これにより、記憶DBや過去案件の情報が混入してテーマがブレることを防止する。'));

children.push(h3('1.4.2 コンテキスト共通構造 (baseCtx)'));
children.push(p('Phase1の全ステップに共通で渡されるコンテキスト:'));
children.push(bullet('【テーマ】: セッションのtopic'));
children.push(bullet('【事前調査】: runResearchの結果（未実施の場合は「未実施」）'));
children.push(bullet('【事務所資料要約】: data/office-docs/配下の.txt/.mdファイル（1500文字まで）'));
children.push(bullet('【前田さんの記憶DB】: memory_dbテーブルからconfidence順上位30件のJSON'));
children.push(bullet('【これまでの結果】: 当該セッションの全過去ステップの結果'));

children.push(h3('1.4.3 AI使い分けの原則'));
children.push(bullet('Claude: 一次調査・分析・構築・自己批判・統合を担当（主導的役割）'));
children.push(bullet('GPT-5.4: 二次調査・検証・別視点からの反論・補完を担当（対抗的役割）'));
children.push(bullet('Claude Opus: LINE SmartQA（前田さんの自由質問への回答）のみ'));

children.push(h3('1.4.4 ログ保存ルール'));
children.push(p('全ステップの結果はdiscussion_logsテーブルに以下の形式で保存:'));
children.push(bullet('session_id: セッションID'));
children.push(bullet('phase: フェーズ番号 (1/2/3)'));
children.push(bullet('round_number: ステップ番号'));
children.push(bullet('round_theme: ステップ名'));
children.push(bullet('role: "claude" または "chatgpt"'));
children.push(bullet('role_label: 表示用ラベル'));
children.push(bullet('content: AI応答の全文'));
children.push(bullet('is_sleep_mode: 就寝モード実行時は1、通常時は0'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 2. 認証・セキュリティ =====
children.push(h1('2. 認証・セキュリティ'));

children.push(h2('2.1 API認証'));
children.push(p('全 /api/* パスにミドルウェアで x-api-key ヘッダー検証を実施。'));
children.push(bullet('ヘッダー名: x-api-key'));
children.push(bullet('検証値: 環境変数 API_SECRET'));
children.push(bullet('不一致時: HTTP 401 { error: "認証エラー" }'));

children.push(h2('2.2 認証除外パス'));
children.push(makeTable(
  ['パス', '理由'],
  [
    ['/api/line/webhook', 'LINE PlatformからのWebhookを受け付けるため'],
    ['/api/deploy', 'GitHub WebhookまたはAPI Key認証（二重認証）'],
    ['/health', 'ヘルスチェック（認証不要）'],
    ['/outputs/:filename', '生成LP等のHTML配信（公開コンテンツ）'],
    ['/dashboard', 'ダッシュボードHTML（認証不要）'],
  ],
  [3500, 5860]
));

children.push(h2('2.3 セキュリティ対策'));
children.push(bullet('Helmet.js: セキュリティヘッダー自動設定（X-Frame-Options, CSP等）'));
children.push(bullet('gzip圧縮: compression ミドルウェア'));
children.push(bullet('JSON制限: リクエストボディ上限10MB'));
children.push(bullet('X-Powered-By: 無効化'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 3. データベーススキーマ =====
children.push(h1('3. データベーススキーマ'));
children.push(p('SQLite3を使用。ファイルパス: ./data/kabeuchi.db'));

children.push(h2('3.1 sessions'));
children.push(p('壁打ちセッションの管理テーブル。1テーマ = 1セッション。'));
children.push(makeTable(
  ['カラム', '型', 'デフォルト', '説明'],
  [
    ['id', 'INTEGER PRIMARY KEY', '自動連番', 'セッションID'],
    ['title', 'TEXT', '-', 'セッションタイトル'],
    ['topic', 'TEXT', '-', '壁打ちテーマ（全ステップで参照）'],
    ['phase', 'INTEGER', '1', '現在のフェーズ (1/2/3)'],
    ['current_round', 'INTEGER', '0', '現在のステップ番号'],
    ['total_rounds', 'INTEGER', '8', '※旧6→現8に変更済み'],
    ['status', 'TEXT', 'active', 'active / completed / sleep'],
    ['research_data', 'TEXT', 'NULL', '事前調査結果（全文保存）'],
    ['target_definition', 'TEXT', 'NULL', 'Phase1 Step8で抽出されたターゲット定義'],
    ['appeal_points', 'TEXT (JSON)', 'NULL', '訴求ポイント配列'],
    ['catchcopy', 'TEXT (JSON)', 'NULL', 'キャッチコピー案配列'],
    ['output_plan', 'TEXT', 'NULL', '勝てる理由 + 収益モデル'],
    ['priority', 'INTEGER', '5', '優先度 (1=最高 ～ 10=最低)'],
    ['deadline', 'TEXT', 'NULL', '期限 (ISO日付)'],
    ['created_at', 'DATETIME', 'CURRENT_TIMESTAMP', '作成日時'],
    ['updated_at', 'DATETIME', 'CURRENT_TIMESTAMP', '更新日時'],
  ],
  [2000, 2000, 2000, 3360]
));

children.push(h2('3.2 discussion_logs'));
children.push(p('全フェーズ・全ステップのAI応答ログ。'));
children.push(makeTable(
  ['カラム', '型', '説明'],
  [
    ['id', 'INTEGER PRIMARY KEY', '自動連番'],
    ['session_id', 'INTEGER (FK)', 'sessionsテーブルへの外部キー'],
    ['phase', 'INTEGER (default 1)', 'フェーズ番号 (1/2/3)'],
    ['round_number', 'INTEGER', 'ステップ番号'],
    ['round_theme', 'TEXT', 'ステップ名（例: "市場・競合調査（Claude）"）'],
    ['role', 'TEXT', '"claude" / "chatgpt" / "user"'],
    ['role_label', 'TEXT', '表示用ラベル'],
    ['content', 'TEXT', 'AI応答の全文またはユーザーコメント'],
    ['is_sleep_mode', 'INTEGER (default 0)', '就寝モード実行フラグ'],
    ['created_at', 'DATETIME', '作成日時'],
  ],
  [2000, 3000, 4360]
));

children.push(h2('3.3 memory_db'));
children.push(p('前田さんの好み・記憶を蓄積するデータベース。全ステップのコンテキストとして参照される。'));
children.push(makeTable(
  ['カラム', '型', '説明'],
  [
    ['id', 'INTEGER PRIMARY KEY', '自動連番'],
    ['category', 'TEXT', 'カテゴリ（例: "tone", "style", "pattern_preference"）'],
    ['subcategory', 'TEXT', 'サブカテゴリ'],
    ['key', 'TEXT', '項目名'],
    ['value', 'TEXT', '値'],
    ['confidence', 'REAL (default 0.5)', '信頼度 (0.0～1.0)。承認で+0.1、却下で-0.1'],
    ['source_session_id', 'INTEGER', '学習元セッションID'],
    ['source_type', 'TEXT', '学習元の種別'],
    ['output_type', 'TEXT', '関連するアウトプット種別'],
    ['created_at', 'DATETIME', '作成日時'],
    ['updated_at', 'DATETIME', '更新日時'],
  ],
  [2200, 2800, 4360]
));

children.push(h2('3.4 その他のテーブル'));

children.push(h3('decisions'));
children.push(p('承認/却下の判断記録。'));
children.push(makeTable(
  ['カラム', '型', '説明'],
  [
    ['id', 'INTEGER PK', '自動連番'],
    ['session_id', 'INTEGER FK', 'セッションID'],
    ['log_id', 'INTEGER', '対象ログID'],
    ['output_id', 'INTEGER', '対象アウトプットID'],
    ['decision', 'TEXT', '"approved" / "rejected"'],
    ['comment', 'TEXT', '却下理由等'],
    ['pattern_chosen', 'TEXT', '選択パターン (A/B/C/D)'],
    ['created_at', 'DATETIME', ''],
  ],
  [2000, 2500, 4860]
));

children.push(h3('case_library'));
children.push(p('承認済みアウトプットの案件ライブラリ。過去案件として以降のセッションで参照される。'));
children.push(makeTable(
  ['カラム', '型', '説明'],
  [
    ['id', 'INTEGER PK', ''],
    ['session_id', 'INTEGER FK', '元セッションID'],
    ['output_type', 'TEXT', 'lp / banner / proposal 等'],
    ['title', 'TEXT', '案件タイトル'],
    ['description', 'TEXT', '概要'],
    ['content', 'TEXT', '本文（全文）'],
    ['pattern', 'TEXT', '採用パターン (A/B/C/D)'],
    ['design_doc', 'TEXT', '設計書'],
    ['target_audience', 'TEXT', 'ターゲット'],
    ['tone', 'TEXT', 'トーン'],
    ['tags', 'TEXT', 'タグ'],
    ['file_path', 'TEXT', 'HTMLファイルパス'],
    ['deploy_url', 'TEXT', 'デプロイURL'],
    ['status', 'TEXT (default "draft")', 'draft / approved'],
    ['approved_at', 'DATETIME', '承認日時'],
    ['created_at', 'DATETIME', ''],
  ],
  [2000, 2800, 4560]
));

children.push(h3('output_queue'));
children.push(p('Phase3完了後のアウトプット承認待ちキュー。'));
children.push(makeTable(
  ['カラム', '型', '説明'],
  [
    ['id', 'INTEGER PK', ''],
    ['session_id', 'INTEGER FK', '元セッションID'],
    ['output_type', 'TEXT', 'アウトプット種別'],
    ['params', 'TEXT (JSON)', '生成パラメータ'],
    ['design_doc', 'TEXT', '設計書'],
    ['patterns', 'TEXT (JSON)', '4パターンの内容'],
    ['critique', 'TEXT', '批評内容'],
    ['recommended_pattern', 'TEXT', '推奨パターン'],
    ['status', 'TEXT', 'pending / awaiting_approval / approved'],
    ['created_at', 'DATETIME', ''],
  ],
  [2200, 2800, 4360]
));

children.push(h3('その他'));
children.push(makeTable(
  ['テーブル名', '用途'],
  [
    ['quality_scores', '品質スコア (訴求力/差別化/体裁/衝撃 各10点、合計40点)'],
    ['sleep_logs', '就寝モードの実行ログ'],
    ['morning_summaries', '朝サマリーの送信記録'],
    ['weekly_reports', '週次レポートの記録'],
    ['voice_memos', '音声メモ (processed=0で未処理)'],
    ['line_messages', 'LINEメッセージ送受信ログ'],
    ['pending_questions', 'LINE QAの保留質問 (タイムアウト30分)'],
    ['ab_tests', 'A/Bテスト定義 (variant_a / variant_b)'],
    ['competitors', '競合登録 (name, url, last_hash)'],
    ['competitor_changes', '競合変更検知ログ'],
  ],
  [3000, 6360]
));

children.push(h2('3.5 インデックス'));
children.push(makeTable(
  ['インデックス名', '対象', '目的'],
  [
    ['idx_logs_session', 'discussion_logs(session_id)', 'セッション別ログ高速検索'],
    ['idx_logs_phase', 'discussion_logs(phase)', 'フェーズ別ログ検索'],
    ['idx_memory_cat', 'memory_db(category)', 'カテゴリ別記憶検索'],
    ['idx_memory_output', 'memory_db(output_type)', 'アウトプット種別記憶検索'],
    ['idx_case_type', 'case_library(output_type)', '案件種別検索'],
    ['idx_case_tags', 'case_library(tags)', 'タグ検索'],
    ['idx_decisions_session', 'decisions(session_id)', 'セッション別判断検索'],
  ],
  [2800, 3200, 3360]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 4. Phase1 詳細 =====
children.push(h1('4. Phase1: 壁打ち（8ステップ）'));
children.push(p('テーマに対して、市場調査→顧客分析→アイデア構築→批判→統合の8ステップを実行する。Claude 5回、GPT-5.4 3回の計8回のAI呼び出しで構成。'));

children.push(h2('4.0 事前調査 (runResearch)'));
children.push(p('Phase1開始前に自動実行される事前調査。'));
children.push(bulletBold('AI: ', 'Claude claude-sonnet-4-20250514 (max_tokens: 3000)'));
children.push(bulletBold('ロール: ', 'マーケティングリサーチの専門家'));
children.push(bulletBold('入力データ: ', ''));
children.push(bullet('事務所資料（data/office-docs/配下の全.txt/.mdファイル、各2000文字まで）', 'bullets', 0));
children.push(bullet('類似過去案件（case_libraryから最新10件のタイトル一覧）', 'bullets', 0));
children.push(bullet('前田さんの好み（memory_db上位30件のJSON）', 'bullets', 0));
children.push(bulletBold('調査項目: ', '競合LP・広告の傾向、業界トレンド、成功・失敗パターン、検索キーワード・口コミ表現、差別化の機会'));
children.push(bulletBold('結果保存: ', 'sessions.research_data に全文保存。以降の全ステップのbaseCtxで参照'));

children.push(h2('4.1 Step1: 市場・競合調査（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514'],
    ['max_tokens', '4000'],
    ['ロール', '市場調査の専門家'],
    ['入力', 'baseCtx（テーマ+事前調査+事務所資料+記憶DB）'],
    ['調査項目', '1. 競合サービスのリスト（名称・URL・特徴）\n2. 各競合の料金体系・価格帯\n3. 各競合LPの構成・訴求ポイント\n4. 各競合の強み・弱み\n5. 市場規模（TAM/SAM/SOM）\n6. 市場の成長率・トレンド\n7. 参入障壁\n8. 業界の課題・ペインポイント'],
    ['出力先', 'discussion_logs (phase=1, round_number=1)'],
  ],
  [2000, 7360]
));

children.push(h2('4.2 Step2: 市場・競合調査（ChatGPT）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'GPT-5.4'],
    ['max_tokens', '4000'],
    ['ロール', '市場調査の専門家（Claudeの検証・補完役）'],
    ['入力', 'baseCtx + Step1のClaude調査結果を【Claudeの調査結果】として明示的に渡す'],
    ['調査項目', '1. 見落とし競合\n2. 料金データ補完・修正\n3. 海外の類似サービス\n4. 過大評価の指摘\n5. 市場規模の別推定\n6. 最新トレンド・ニュース'],
    ['特徴', 'Claudeの調査を前提に、見落とし・別視点・過大評価を指摘する対抗的役割'],
  ],
  [2000, 7360]
));

children.push(h2('4.3 Step3: 顧客ニーズ深掘り（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514'],
    ['max_tokens', '4000'],
    ['ロール', '消費者心理の専門家'],
    ['入力', 'baseCtx（Step1-2の結果も「これまでの結果」として含む）'],
    ['分析項目', '1. ペルソナ3人以上\n2. 顕在・潜在ニーズ\n3. 購入を阻む不安トップ5\n4. 検索キーワード20個以上\n5. リアルな口コミ表現15個以上\n6. 買わない理由トップ5と克服法\n7. 感情の流れ（認知→検討→決定→後悔防止）\n8. 情報収集チャネル\n9. 決定トリガー\n10. 競合を選ぶ理由と奪い返す方法'],
  ],
  [2000, 7360]
));

children.push(h2('4.4 Step4: 顧客ニーズ深掘り（ChatGPT）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'GPT-5.4'],
    ['max_tokens', '4000'],
    ['ロール', '消費者行動分析の専門家（Claudeへの対抗）'],
    ['入力', 'baseCtx + Step3のClaude分析結果を【Claudeの顧客分析】として渡す'],
    ['分析項目', '1. 想定外の顧客セグメント\n2. 見落とし心理的障壁\n3. 別角度ペルソナ\n4. 購買決定の別モデル\n5. SNS・Q&Aでの声\n6. Claudeへの反論と代替仮説'],
  ],
  [2000, 7360]
));

children.push(h2('4.5 Step5: 構築・アイデア拡張（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514'],
    ['max_tokens', '5000（他ステップより増量）'],
    ['ロール', '事業戦略の天才'],
    ['入力', 'baseCtx + Step1～Step4の全結果を個別に4つ渡す'],
    ['実行項目', '1. 全調査の統合サマリー\n2. 最有望戦略3案\n3. 各案の差別化ポイント\n4. 異業種成功事例の応用3つ以上\n5. テクノロジー活用の可能性\n6. 収益モデル設計\n7. 実行ロードマップ（3ヶ月・6ヶ月・1年）\n8. 最推奨案と理由'],
    ['特殊処理', 'Step5完了後に方向性確認ロジックが発動（後述4.10参照）'],
  ],
  [2000, 7360]
));

children.push(h2('4.6 Step6: 批判・対抗（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514'],
    ['max_tokens', '4000'],
    ['ロール', '容赦ない悪魔の代弁者（ただし建設的提案も必須）'],
    ['入力', 'baseCtx + Step5の結果'],
    ['批判観点', '1. 市場規模が楽観的すぎないか\n2. 競合の反撃シナリオ\n3. 法的リスク（弁護士法・景表法・個情法等）\n4. オペレーション破綻ポイント\n5. 顧客獲得コストの現実性\n6. やらない理由トップ5\n7. 類似事業の失敗パターン\n8. 前田事務所のリソースで可能か\n9. 3年後に市場が変わる可能性\n10. 致命的欠陥と回避策'],
  ],
  [2000, 7360]
));

children.push(h2('4.7 Step7: さらなる批判（ChatGPT）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'GPT-5.4'],
    ['max_tokens', '4000'],
    ['ロール', '競合企業の戦略コンサルタント（「競合ならどう潰すか」視点）'],
    ['入力', 'baseCtx + Step5のアイデア + Step6のClaude批判'],
    ['分析項目', '1. 競合の対抗戦略\n2. 価格で潰す方法\n3. マーケで潰す方法\n4. サービス品質で潰す方法\n5. Claude批判の見落とし\n6. 最も脆弱なポイント\n7. 競合が先手で仕掛ける施策'],
  ],
  [2000, 7360]
));

children.push(h2('4.8 Step8: 最終案の統合（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514'],
    ['max_tokens', '5000'],
    ['ロール', '最終統合者。全批判を受け止め穴を全て潰した最強のアイデアを提示'],
    ['入力', 'baseCtx + Step5アイデア + Step6批判 + Step7批判 + 前田さんの好みJSON'],
    ['実行項目', '1. 各批判への具体的解決策\n2. 修正した最終アイデア\n3. ターゲット定義（最終版）\n4. 差別化ポイント3つ\n5. 勝てる理由\n6. 収益モデル（最終版）\n7. リスク対策マトリクス\n8. 実行優先順位'],
    ['構造化出力', 'JSON: { target_definition, appeal_points[], differentiation[], winning_reason, revenue_model, catchcopy[] }'],
    ['DB更新', 'sessions.phase=2, target_definition, appeal_points, catchcopy, output_plan を更新'],
    ['エラー時', 'JSON解析失敗→LINE経由で前田さんに手動入力を依頼'],
  ],
  [2000, 7360]
));

children.push(h2('4.9 データフロー図'));
children.push(p('各ステップ間のデータの流れ:'));
children.push(p('runResearch(topic) → research変数 → 全ステップのbaseCtxに含まれる'));
children.push(p('Step1(Claude) → Step2(GPT)に直接渡す'));
children.push(p('Step3(Claude) → Step4(GPT)に直接渡す'));
children.push(p('Step1+2+3+4 → Step5(Claude)に4つ個別に渡す'));
children.push(p('Step5 → Step6(Claude)に渡す'));
children.push(p('Step5+Step6 → Step7(GPT)に渡す'));
children.push(p('Step5+Step6+Step7 → Step8(Claude)に渡す → Phase2へJSON引継ぎ'));

children.push(h2('4.10 方向性確認ロジック'));
children.push(p('Step5完了後、以下の条件を全て満たす場合に発動:'));
children.push(bullet('非就寝モード（isSleep = false）'));
children.push(bullet('lineQAモジュールが有効'));
children.push(bullet('sendLineFn（LINE送信関数）が設定済み'));
children.push(p('発動時の処理:'));
children.push(bullet('1. Claude (max_tokens:500) でStep5結果の先頭2000文字を分析'));
children.push(bullet('2. 「複数の大きく異なる戦略案がある」場合のみneedsConfirmation=trueを返す'));
children.push(bullet('3. trueの場合、LINE経由で前田さんに質問を送信し回答を待機（タイムアウト30分）'));
children.push(bullet('4. 回答があればStep5結果に「【前田さんの方向性指示】」として追記'));
children.push(bullet('5. 追記された方向性指示は後続Step6～8に影響する'));

children.push(h2('4.11 Phase1完了レポート'));
children.push(p('8ステップ完了後、generatePhase1Reportで構造化レポートを生成:'));
children.push(bullet('AI: Claude claude-sonnet-4-20250514 (max_tokens: 6000)'));
children.push(bullet('6セクション構成のJSON: target, market, service, revenue, challenges, discussion'));
children.push(bullet('各セクションは端的かつ明確に、根拠データや具体的数字を含む'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 5. Phase2 詳細 =====
children.push(h1('5. Phase2: 訴求の磨き込み（6ステップ）'));
children.push(p('Phase1 Step8で確定したアイデアを、最も効果的な訴求角度に磨き上げる。'));

children.push(h2('5.1 Step1: 訴求パターン生成（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', 'トップコピーライティングディレクター'],
    ['入力', 'Phase1の結論 + 事務所資料 + 好みメモリ + 追加パラメータ + outputType'],
    ['生成項目', '1. メインターゲットの心理状態（認知前→検討中→行動直前）\n2. 訴求角度4～6パターン（名前・概要・刺さる理由・仮キャッチコピー・想定反応）\n3. 各パターンの優先順位と理由\n4. 訴求で使える事務所の実績・数字\n5. 競合が使っていない訴求角度'],
  ],
  [2000, 7360]
));

children.push(h2('5.2 Step2: 訴求批判（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', '容赦ない広告批評家'],
    ['入力', 'Step1の訴求パターン'],
    ['批判観点', '1. スクロール停止力\n2. 競合との差別化\n3. ベネフィット具体性\n4. ターゲット本音との一致\n5. 法律事務所の信頼性\n6. 「だから何？(So what?)」テスト耐性\n7. 行動喚起の強さ\n8. 致命的弱点と克服案'],
  ],
  [2000, 7360]
));

children.push(h2('5.3 Step3: 訴求批判（ChatGPT）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'GPT-5.4 (max_tokens: 4000)'],
    ['ロール', '実際の消費者代表'],
    ['入力', 'Step1訴求パターン + Step2Claude批判'],
    ['評価観点', '1. 一番興味を持つ訴求とその理由\n2. 一番胡散臭い訴求とその理由\n3. 相談意欲を喚起するもの\n4. Claude批判の見落とし・反論\n5. SNSシェア可能性\n6. 競合LP比較\n7. 改善提案'],
  ],
  [2000, 7360]
));

children.push(h2('5.4 Step4: 絞り込み（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', '全批判を踏まえた絞り込み判定者'],
    ['入力', 'Step1訴求 + Step2批判 + Step3批判'],
    ['出力', '1. 全批判要約+重要度ランク\n2. 各訴求の生存/脱落判定\n3. 最強2案の選定理由\n4. 強化ポイント\n5. メイン/サブ訴求使い分け方針'],
    ['LINE確認', '絞り込み結果をLINEで前田さんに確認。「OK」以外は修正指示として反映'],
  ],
  [2000, 7360]
));

children.push(h2('5.5 Step5: コピーライティング（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', '日本トップクラスのコピーライター'],
    ['入力', '絞り込まれた2案'],
    ['生成項目', '各訴求に対して:\n1. メインキャッチコピー3案\n2. サブキャッチ1案\n3. リード文（30文字以内）\n4. ボディコピー構成案\n5. CTA文言3案\n6. 見出し群（H2/H3）\n7. 最推奨組み合わせ'],
  ],
  [2000, 7360]
));

children.push(h2('5.6 Step6: 最終訴求の統合（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', 'Phase3用の設計書作成者'],
    ['出力形式', 'JSON設計書: {\n  main_appeal, sub_appeal,\n  main_catchcopy, sub_catchcopy,\n  lead_text, body_structure[],\n  cta_text, tone, key_numbers[],\n  ng_words[], quality_checklist[]\n}'],
    ['Phase3への引継ぎ', 'この設計書がPhase3の全パターン生成の基盤となる'],
  ],
  [2000, 7360]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 6. Phase3 詳細 =====
children.push(h1('6. Phase3: コンテンツ生成（7ステップ）'));
children.push(p('Phase2で確定した訴求設計書に基づき、4パターンを同時生成→多角的チェック→最終版を完成させる。'));

children.push(h2('6.1 4パターン定義'));
children.push(makeTable(
  ['パターン', '名称', '説明'],
  [
    ['A', 'PASONA型', '問題(Problem)→共感(Affinity)→解決(Solution)→提案(Offer)→行動(Narrow+Action)'],
    ['B', 'ベネフィット直球型', '最大の価値・メリットを冒頭で直球提示'],
    ['C', 'ストーリー型', '物語（体験談・事例）で感情を動かす'],
    ['D', '恐怖訴求型', '失わないために行動させる（損失回避バイアス活用）'],
  ],
  [1500, 2500, 5360]
));

children.push(h2('6.2 Step1: 初稿生成（Claude）- 4パターン並行'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (各パターンmax_tokens: 5000)'],
    ['実行方式', 'Promise.allで4パターンを並行生成'],
    ['入力', 'Phase2設計書 + 事務所資料 + 好み + 類似過去案件（同種別承認済み最大5件）'],
    ['品質ルール', '全パターン共通:\n1. 抽象表現禁止（「質の高い」「安心の」→具体的数字・事例に）\n2. 「弊社は～」禁止（読者主語で書く）\n3. 読者の言葉を使用\n4. 実績数字参照必須\n5. CTA明確化\n6. 法的表現チェック\n7. スマホ可読性'],
  ],
  [2000, 7360]
));

children.push(h2('6.3 Step2: コンテンツチェック（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['ロール', 'Claude批評役'],
    ['チェック観点', '1. 設計書反映度\n2. 読者つまずき箇所\n3. 競合表現の重複\n4. ベネフィット具体性\n5. CTA明確性\n6. 前田さん好み一致\n7. 事務所資料活用度\n8. 具体的改善指示\n9. 推奨パターン'],
  ],
  [2000, 7360]
));

children.push(h2('6.4 Step3: コンテンツチェック（ChatGPT）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'GPT-5.4 (max_tokens: 4000)'],
    ['ロール', '一般消費者代表'],
    ['チェック観点', '1. 相談意欲\n2. 退屈な部分\n3. 信頼感\n4. Claude批評の見落とし\n5. ユーザー行動予測\n6. 改善提案'],
  ],
  [2000, 7360]
));

children.push(h2('6.5 Step4: 品質チェック（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['チェック項目', '1. 抽象表現チェック\n2. 数字正確性\n3. 法的表現（弁護士法・景表法）\n4. 主語チェック\n5. 読者言葉使用度\n6. CTA到達率予測\n7. SEO観点\n8. 文字数/レイアウト\n9. 品質スコア（100点）\n10. 合格/不合格判定'],
    ['LINE連携', '不合格・要改善→LINEで確認。「中止」「NG」回答で全プロセス中断可能'],
  ],
  [2000, 7360]
));

children.push(h2('6.6 Step5: インパクトチェック（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['評価項目', '1. 予測CTR\n2. 予測CVR\n3. 3秒テスト（3秒で伝わるか）\n4. スクロール到達率\n5. 感情揺さぶり度 (1-10)\n6. 記憶残存度 (1-10)\n7. シェアされやすさ (1-10)\n8. 最終推奨パターン'],
  ],
  [2000, 7360]
));

children.push(h2('6.7 Step6: モバイルチェック（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 4000)'],
    ['チェック項目', '1. 1行文字数（折り返し）\n2. 段落長（スクロール疲れ）\n3. CTAタップしやすさ\n4. 画像スマホ表示\n5. 読み込み速度\n6. フォントサイズ\n7. 改善指示'],
  ],
  [2000, 7360]
));

children.push(h2('6.8 Step7: 最終版生成（Claude）'));
children.push(makeTable(
  ['項目', '詳細'],
  [
    ['AI', 'Claude claude-sonnet-4-20250514 (max_tokens: 5000 x4)'],
    ['処理内容', '1. まず推奨パターン判定をJSON取得 (recommended, reason, critique)\n2. 次にPromise.allで4パターン全ての最終改善版を並行生成\n3. Step2～6の全指摘を反映した最終版'],
    ['出力先', 'output_queue テーブルに status="awaiting_approval" で保存'],
    ['後処理', '品質スコアリング (scoreOutput) を自動実行'],
  ],
  [2000, 7360]
));

children.push(h2('6.9 品質スコアリング'));
children.push(p('Phase3 Step7完了後に自動実行される品質評価。'));
children.push(makeTable(
  ['評価軸', '観点', 'スコア'],
  [
    ['appeal (訴求力)', '読者の心を動かせるか', '1-10点'],
    ['differentiation (差別化)', '競合と明確に違うか', '1-10点'],
    ['format (体裁)', '読みやすさ、構成、デザイン', '1-10点'],
    ['impact (インパクト)', '記憶に残るか、行動を促すか', '1-10点'],
  ],
  [2500, 4500, 2360]
));
children.push(p('合計40点満点。グレード: S(36+) / A(32+) / B(28+) / C(24+) / D(24未満)'));
children.push(p('結果はquality_scoresテーブルに保存され、LINEで通知される。'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 7. outputType一覧 =====
children.push(h1('7. アウトプット種別 (outputType)'));
children.push(p('Phase2-3で生成可能なアウトプットの全種別と、各種別固有の生成指示:'));

children.push(makeTable(
  ['outputType', '名称', '生成指示の要点'],
  [
    ['lp', 'ランディングページ', 'レスポンシブHTML/CSS。セクション: FV→悩み共感→解決策→実績→サービス詳細→料金→FAQ→CTA'],
    ['banner', 'バナー広告', '複数サイズ (300x250, 728x90, 1200x628) のHTML/SVGバナー'],
    ['sns_post', 'SNS投稿', 'X/Instagram/Facebook/LinkedIn用投稿文、ハッシュタグ付き'],
    ['blog', 'ブログ記事', 'SEO最適化記事、H1/H2/H3構成、メタディスクリプション、3000文字以上'],
    ['youtube_script', 'YouTube台本', '動画台本、フック→本題→CTA、タイムスタンプ付き'],
    ['press_release', 'プレスリリース', '5W1H形式、配信先メディア候補'],
    ['newsletter', 'メルマガ', '件名5案+本文、開封率意識'],
    ['seo_design', 'SEOキーワード設計', '検索意図分析、キーワードマップ、優先順位表'],
    ['seo_article', 'SEO記事', '構成案→本文→メタ情報、schema.org構造化データ付き'],
    ['aio_content', 'AI検索最適化', 'AI検索回答に選ばれるFAQ/構造化コンテンツ'],
    ['proposal', '提案書', '目次→概要→課題分析→提案→実績→スケジュール→費用'],
    ['dm', 'DM・営業メール', 'DM/手紙/営業メール、件名+本文'],
    ['sales_script', '営業台本', 'トーク台本・FAQ集、場面別対応スクリプト'],
    ['company_profile', '会社概要', '会社概要・サービス資料'],
    ['legal_content', '法律解説', '法律解説コンテンツ、一般向け'],
    ['seminar', 'セミナー資料', 'スライド構成・台本'],
  ],
  [2000, 2500, 4860]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 8. API =====
children.push(h1('8. APIエンドポイント一覧'));

children.push(h2('8.1 壁打ち (Phase1)'));
children.push(makeTable(
  ['メソッド', 'パス', 'パラメータ', 'レスポンス'],
  [
    ['POST', '/api/discussion', '{topic, title} (新規)\n{sessionId, userComment} (続行)', 'ステップ結果\n完了時: {phase:"complete", summary}'],
    ['POST', '/api/discussion/decide', '{sessionId, decision, comment?}', '{success: true}'],
    ['GET', '/api/discussion/sessions', 'なし', '最新20件のセッション一覧'],
    ['GET', '/api/discussion/session/:id', 'パスパラメータ', 'セッション詳細'],
    ['GET', '/api/discussion/logs/:id', 'パスパラメータ', '議論ログ一覧(ASC順)'],
    ['POST', '/api/discussion/finalize', '{sessionId}', '{summary}'],
  ],
  [1200, 2800, 2800, 2560]
));

children.push(h2('8.2 アウトプット (Phase2-3)'));
children.push(makeTable(
  ['メソッド', 'パス', 'パラメータ', 'レスポンス'],
  [
    ['POST', '/api/output/generate', '{sessionId, outputType, params?}', '4パターン+批評+推奨'],
    ['POST', '/api/output/design', '{sessionId, outputType, params?}', '{designDoc}'],
    ['POST', '/api/output/approve', '{queueId, pattern?, filePath?, deployUrl?}', '{success, caseId}'],
    ['GET', '/api/output/queue', '?status=awaiting_approval', 'キュー一覧'],
  ],
  [1200, 2800, 3000, 2360]
));

children.push(h2('8.3 案件・好み・音声'));
children.push(makeTable(
  ['メソッド', 'パス', 'パラメータ', 'レスポンス'],
  [
    ['GET', '/api/cases', '?type=lp (任意)', '案件一覧 (最大50件)'],
    ['GET', '/api/cases/:id', 'パスパラメータ', '案件詳細'],
    ['GET', '/api/preferences', 'なし', '好み全件'],
    ['POST', '/api/preferences', '{category, key, value}', '{success}'],
    ['GET', '/api/preferences/:category', 'パスパラメータ', 'カテゴリ別'],
    ['POST', '/api/voice', '{text, sessionId?}', '{success, id}'],
    ['GET', '/api/voice', 'なし', '未処理メモ一覧'],
  ],
  [1200, 2800, 2800, 2560]
));

children.push(h2('8.4 LINE・状態・システム'));
children.push(makeTable(
  ['メソッド', 'パス', 'パラメータ', 'レスポンス'],
  [
    ['POST', '/api/line/webhook', 'LINE Webhook payload', '200 OK'],
    ['GET', '/api/line/users', 'なし', 'ユーザー一覧+最新20メッセージ'],
    ['POST', '/api/line/send', '{message, userId?}', '{success}'],
    ['GET', '/api/state', 'なし', '現在の全状態JSON'],
    ['POST', '/api/state/save', '{mode?}', '{success, pushed, state}'],
    ['POST', '/api/state/load', 'なし', 'GitHub pull+状態復元'],
    ['GET', '/api/mode', 'なし', '{mode, state}'],
    ['POST', '/api/mode', '{mode: "aws"|"local"}', '切替結果'],
    ['POST', '/api/deploy', 'GitHub Webhook', '{status:"deploying"}'],
    ['GET', '/health', 'なし（認証不要）', '{status, time, sessions, cases}'],
  ],
  [1200, 2800, 2800, 2560]
));

children.push(h2('8.5 拡張機能API'));
children.push(makeTable(
  ['メソッド', 'パス', 'パラメータ', 'レスポンス'],
  [
    ['PUT', '/api/session/:id/priority', '{priority, deadline?}', '{success}'],
    ['GET', '/api/quality/:sessionId', 'パスパラメータ', '品質スコア一覧'],
    ['POST', '/api/ab/create', '{sessionId, outputType}', 'A/Bテスト作成'],
    ['GET', '/api/ab/:id', 'パスパラメータ', 'HTML比較ビュー'],
    ['POST', '/api/ab/compare/:id', 'パスパラメータ', 'Claude自動比較分析'],
    ['POST', '/api/competitors', '{name, url}', '競合登録'],
    ['GET', '/dashboard', 'なし（認証不要）', 'ダッシュボードHTML'],
  ],
  [1200, 2800, 2800, 2560]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 9. 自動処理 =====
children.push(h1('9. 自動処理・定期ジョブ'));

children.push(h2('9.1 就寝モード（毎晩23時 JST）'));
children.push(p('cronスケジュール: 0 23 * * * (Asia/Tokyo)'));
children.push(p('処理内容:'));
children.push(bullet('アクティブセッションを最大5件、優先度順に取得'));
children.push(bullet('3件同時並列 (Promise.all) で処理'));
children.push(bullet('各セッションの残りステップ（最大3つ）をis_sleep_mode=1で自動実行'));
children.push(bullet('8ステップ完了済みなら最終統合(generateFinalSummary)も実行'));
children.push(bullet('アクティブセッションが0件の場合、新規事業アイデアの自動調査を実行'));
children.push(bullet('実行結果はsleep_logsテーブルに記録'));

children.push(h2('9.2 朝サマリー（毎朝7時 JST）'));
children.push(p('cronスケジュール: 0 7 * * * (Asia/Tokyo)'));
children.push(p('処理内容:'));
children.push(bullet('就寝中に実行されたログをClaude Opusで要約'));
children.push(bullet('未承認アウトプットキューの一覧を添付'));
children.push(bullet('LINE push メッセージとして送信'));
children.push(bullet('morning_summariesテーブルに記録'));

children.push(h2('9.3 週次レポート（毎週月曜7時 JST）'));
children.push(p('cronスケジュール: 0 7 * * 1 (Asia/Tokyo)'));
children.push(p('処理内容:'));
children.push(bullet('過去7日間のセッション・案件・判断をClaude Opusで分析'));
children.push(bullet('競合モニタリング結果も含む'));
children.push(bullet('LINE push メッセージとして送信'));
children.push(bullet('weekly_reportsテーブルに記録'));

children.push(h2('9.4 自動保存（30分毎）'));
children.push(p('cronスケジュール: */30 * * * *'));
children.push(p('条件: operationMode === "aws" の場合のみ実行'));
children.push(p('処理内容:'));
children.push(bullet('StateManager.collectState() でDB全体の状態を収集'));
children.push(bullet('state/current_state.json に保存'));
children.push(bullet('git add + commit + push で GitHub に同期'));

children.push(h2('9.5 競合モニタリング（毎週日曜23時 JST）'));
children.push(p('cronスケジュール: 0 23 * * 0 (Asia/Tokyo)'));
children.push(p('処理内容:'));
children.push(bullet('competitorsテーブルの全競合URLをfetch'));
children.push(bullet('レスポンスのMD5ハッシュを前回と比較'));
children.push(bullet('変更検知時: competitor_changesテーブルに記録 + LINE通知'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 10. LINE連携 =====
children.push(h1('10. LINE連携'));

children.push(h2('10.1 Webhook受信'));
children.push(p('POST /api/line/webhook でLINE PlatformからのWebhookイベントを受信。'));
children.push(bullet('followイベント: 友だち追加時の処理'));
children.push(bullet('messageイベント(text): processLineCommandで処理'));

children.push(h2('10.2 LINEコマンド一覧'));
children.push(makeTable(
  ['コマンド', '処理内容'],
  [
    ['承認 / OK', '最新アクティブセッションの最新ログを承認'],
    ['却下 / NG + 理由', '最新アクティブセッションを却下（理由をcommentに保存）'],
    ['状態 / ステータス', 'アクティブセッション一覧を表示'],
    ['PCモード', 'operationMode="local"に切替 + claude-code-daemon停止'],
    ['AWSモード', 'operationMode="aws"に切替 + claude-code-daemon起動'],
    ['モード確認', '現在のモード・プロジェクト情報表示'],
    ['フェーズN承認', '粒度承認: 特定フェーズを承認'],
    ['ステップNやり直し', '粒度承認: 特定ステップをクリアして再実行可能に'],
    ['パターンX採用', '粒度承認: 特定パターン(A/B/C/D)を採用'],
    ['優先 ID 数字', '優先度設定: セッションIDの優先度を変更'],
    ['コード/修正/実装/追加/バグ/デプロイ/claude', 'Claude Code Daemon(localhost:3001)にタスク投入'],
    ['CC状態/Claude状態', 'Claude Code Daemonのステータス確認'],
    ['メモして + 内容', 'voice_memosテーブルに保存'],
    ['質問パターン(正規表現)', 'セッション状況+承認待ち一覧を返答'],
  ],
  [3000, 6360]
));

children.push(h2('10.3 LINE QA (双方向確認)'));
children.push(p('エンジンからLINE経由で前田さんに質問を送り、回答を待つ仕組み。'));
children.push(bullet('askUserViaLine: 質問をpending_questionsテーブルに保存し、LINE push送信'));
children.push(bullet('EventEmitterで回答をPromiseとして待機'));
children.push(bullet('タイムアウト: デフォルト30分（タイムアウト時はnullを返しデフォルト続行）'));
children.push(bullet('回答はmemory_dbにconfidence 0.8で自動保存'));
children.push(p('発動箇所:'));
children.push(bullet('Phase1 Step5後: 方向性確認（複数の大きく異なる戦略案がある場合）'));
children.push(bullet('Phase2 Step4後: 訴求絞り込み結果の確認'));
children.push(bullet('Phase3 Step4後: 品質チェック不合格/要改善時'));
children.push(bullet('Phase1 Step8: JSON解析失敗時の手動入力依頼'));

children.push(h2('10.4 Smart QA'));
children.push(p('前田さんからの自由質問に対して、システムの全コンテキストを踏まえて回答する機能。'));
children.push(bullet('AI: Claude Opus (claude-opus-4-6)'));
children.push(bullet('参照データ: 直近10セッション + 15件の議論ログ + 記憶DB上位20件 + 承認待ちアウトプット + 直近5件のQ&A'));
children.push(bullet('回答はpending_questionsとmemory_db (confidence 0.6) に保存'));

children.push(h2('10.5 送信方式'));
children.push(makeTable(
  ['メソッド', '用途', 'LINE API'],
  [
    ['replyLine', 'Webhookへの返信', '/v2/bot/message/reply'],
    ['pushLine', '個別ユーザーへのプッシュ', '/v2/bot/message/push'],
    ['sendLine', 'ブロードキャスト or プッシュ', '/v2/bot/message/broadcast (全員)\n/v2/bot/message/push (個別)'],
  ],
  [2000, 3500, 3860]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 11. 好み学習 =====
children.push(h1('11. 好み学習 (PreferenceLearner)'));

children.push(h2('11.1 学習トリガー'));
children.push(makeTable(
  ['トリガー', '処理', 'confidence変動'],
  [
    ['承認 (learnFromDecision)', 'コンテンツのスタイル特徴を"approved_style"として抽出保存。関連メモリをブースト', '+0.1'],
    ['却下 (learnFromDecision)', '却下理由を"rejection_reason"として保存。関連メモリにペナルティ', '-0.1'],
    ['パターン選択 (learnFromPatternChoice)', 'パターン(A/B/C/D)の選択を"pattern_preference"として記録', '選択2回以上で+0.05'],
    ['手動登録 (addPreference)', 'API経由でカテゴリ・キー・値を直接登録', '新規: 0.5 / 既存: +0.1'],
  ],
  [3000, 4000, 2360]
));

children.push(h2('11.2 自動特徴抽出'));
children.push(p('_extractAndStoreメソッドがコンテンツから以下のキーワードを自動検出:'));
children.push(bullet('トーン: フォーマル / カジュアル'));
children.push(bullet('数字パターン: コンテンツ内の数字表現'));
children.push(bullet('CTA傾向: 「無料相談」「LINE」等のCTAキーワード'));

children.push(h2('11.3 関連メモリの連動'));
children.push(p('承認/却下時、コンテンツ先頭200文字から日本語キーワード(2文字以上)を最大5個抽出し、memory_dbの該当レコードのconfidenceを増減させる。'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 12. 状態管理 =====
children.push(h1('12. 状態管理 (StateManager)'));

children.push(h2('12.1 状態収集'));
children.push(p('collectState()がDB全体から以下を収集し、JSONファイルに保存:'));
children.push(bullet('アクティブセッション一覧'));
children.push(bullet('保留中アウトプットキュー'));
children.push(bullet('未処理音声メモ'));
children.push(bullet('好みDB全件'));
children.push(bullet('直近の議論ログ'));
children.push(bullet('案件ライブラリ'));
children.push(bullet('生成済みHTMLファイル一覧'));

children.push(h2('12.2 AWS⇔PC切替'));
children.push(makeTable(
  ['操作', '処理内容'],
  [
    ['switchToPC()', '状態保存 → GitHub push → mode="local"'],
    ['switchToAWS()', 'GitHub pull → 状態復元 → mode="aws"'],
  ],
  [3000, 6360]
));

children.push(h2('12.3 GitHub同期'));
children.push(p('github-sync.jsによるファイル同期:'));
children.push(bullet('watchモード: fs.watchで再帰的にファイル変更を監視。5秒デバウンス後にgit add→commit→push'));
children.push(bullet('.envとkabeuchi.db*は自動unstage（機密・バイナリ除外）'));
children.push(bullet('push失敗時: git pull --rebaseしてリトライ'));
children.push(bullet('pullモード: デフォルト5分間隔でgit pull origin main (stash/pop付き)'));
children.push(bullet('除外: node_modules, .git, data/kabeuchi.db*, data/claude-code-logs, *.pyc, __pycache__, .DS_Store'));

children.push(h2('12.4 次アクション自動判定'));
children.push(p('_determineNextAction()がセッション状態から次に何をすべきかを自動判定する。'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 13. 事務所資料 =====
children.push(h1('13. 事務所資料参照'));

children.push(h2('13.1 ディレクトリ構造'));
children.push(p('data/office-docs/ 配下に以下のサブディレクトリ:'));
children.push(bullet('AI法務セミナー/'));
children.push(bullet('コンサル事業/'));
children.push(bullet('リード追撃/'));
children.push(bullet('事務所基本情報/'));
children.push(bullet('事務所資料/'));
children.push(bullet('交通提案/'));
children.push(bullet('提案研修/'));

children.push(h2('13.2 読み込みロジック'));
children.push(makeTable(
  ['メソッド', '用途', '文字数制限'],
  [
    ['_getOfficeDocs()', '事前調査(runResearch)で使用。全文読み込み', '各ファイル2000文字まで'],
    ['_getOfficeDocsSummary()', '各ステップのbaseCtxで使用。要約版', '全体で1500文字まで'],
  ],
  [3000, 4000, 2360]
));
children.push(p('対象ファイル: .txt と .md のみ。再帰的にサブディレクトリを走査。'));
children.push(p('各ファイルは【ファイル名】ヘッダー付きで連結される。'));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 14. エラーハンドリング =====
children.push(h1('14. エラーハンドリング'));

children.push(h2('14.1 APIレベル'));
children.push(p('各エンドポイント内でtry/catch → HTTP 500 + err.messageを返却'));

children.push(h2('14.2 プロセスレベル'));
children.push(makeTable(
  ['イベント', '処理'],
  [
    ['unhandledRejection', 'ログ記録のみ（クラッシュしない）'],
    ['uncaughtException', 'ECONNREFUSED/ETIMEDOUT/ENOTFOUND/rate_limit/overloaded → ログのみで続行。それ以外 → PM2に再起動を委任'],
    ['SIGTERM', 'DB接続を閉じてからexit(0)で正常終了'],
  ],
  [3000, 6360]
));

children.push(h2('14.3 PM2設定'));
children.push(makeTable(
  ['項目', '値'],
  [
    ['最大再起動回数', '5回'],
    ['最小稼働時間', '10秒'],
    ['再起動遅延', '5秒'],
    ['メモリ上限', '500MB（超過で自動再起動）'],
    ['ログ出力先', '~/.pm2/logs/kabeuchi-error.log / kabeuchi-out.log'],
  ],
  [3000, 6360]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 15. 依存パッケージ =====
children.push(h1('15. 依存パッケージ'));
children.push(makeTable(
  ['パッケージ', 'バージョン', '用途'],
  [
    ['@anthropic-ai/sdk', '^0.39.0', 'Claude API'],
    ['openai', '^4.77.0', 'GPT-5.4 API'],
    ['better-sqlite3', '^11.7.0', 'SQLite3 DB'],
    ['express', '^4.21.0', 'HTTPサーバー'],
    ['helmet', '^8.0.0', 'セキュリティヘッダー'],
    ['compression', '^1.7.4', 'gzip圧縮'],
    ['dotenv', '^16.4.0', '環境変数'],
    ['node-cron', '^3.0.3', 'cron スケジューラ'],
    ['cors', '^2.8.5', 'CORS'],
    ['ejs', '^3.1.10', 'テンプレートエンジン'],
    ['exceljs', '^4.4.0', 'Excel出力'],
    ['express-rate-limit', '^7.4.0', 'レート制限'],
    ['express-session', '^1.18.0', 'セッション管理'],
    ['marked', '^15.0.0', 'Markdown→HTML変換'],
  ],
  [2500, 1500, 5360]
));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== 16. 環境変数 =====
children.push(h1('16. 環境変数'));
children.push(makeTable(
  ['変数名', '用途'],
  [
    ['ANTHROPIC_API_KEY', 'Claude API認証キー'],
    ['OPENAI_API_KEY', 'GPT-5.4 API認証キー'],
    ['LINE_CHANNEL_ACCESS_TOKEN', 'LINE Messaging APIアクセストークン'],
    ['PORT', 'サーバーポート (デフォルト: 3000)'],
    ['NODE_ENV', '実行環境 (production)'],
    ['SESSION_SECRET', 'Expressセッション暗号化キー'],
    ['DB_PATH', 'SQLiteファイルパス (デフォルト: ./data/kabeuchi.db)'],
    ['API_SECRET', 'API認証キー'],
    ['GITHUB_TOKEN', 'GitHub API トークン'],
    ['GEMINI_API_KEY', 'Google Gemini APIキー（現在未使用）'],
  ],
  [3500, 5860]
));

// 最終ページ
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: '以上', size: 28, font: 'Yu Gothic', bold: true, color: '1F4E79' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: '前田法律事務所 AI壁打ちシステム 詳細仕様書 v1.0', size: 22, font: 'Yu Gothic', color: '666666' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '本文書の内容は2026年3月13日時点のシステム状態に基づく', size: 20, font: 'Yu Gothic', color: '999999' })] }));

// ===== Document =====
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Yu Gothic', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Yu Gothic', color: '1F4E79' },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Yu Gothic', color: '2E75B6' },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Yu Gothic', color: '404040' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [
        { level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
      ]},
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 }
      }
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '1F4E79', space: 4 } },
          children: [new TextRun({ text: '前田法律事務所 AI壁打ちシステム 詳細仕様書', size: 16, font: 'Yu Gothic', color: '999999' })]
        })
      ]})
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC', space: 4 } },
          children: [
            new TextRun({ text: 'Page ', size: 16, font: 'Yu Gothic', color: '999999' }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Yu Gothic', color: '999999' }),
          ]
        })
      ]})
    },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/tmp/spec.docx', buf);
  console.log('OK: /tmp/spec.docx (' + buf.length + ' bytes)');
});
