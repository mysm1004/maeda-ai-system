# 前田法律事務所 AI壁打ちシステム - Claude Code設定

## サーバー情報
- API: http://176.32.87.118
- SSH: ssh -i /c/Users/user/Downloads/LightsailDefaultKey-ap-northeast-1.pem ubuntu@176.32.87.118
- 認証ヘッダー: x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912

## システム概要
3フェーズ × 6ラウンドの高精度AI壁打ちシステム。
壁打ち → 戦略設計 → アウトプット生成（4パターン同時）のフルパイプライン。

## 自動実行ルール

### 「〇〇について壁打ちして」→ Phase1 壁打ち自動開始
```bash
curl -s -X POST http://176.32.87.118/api/discussion -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"topic":"テーマ","title":"タイトル"}'
```
結果を以下の形式で表示:
```
## ラウンドN: テーマ名

### Claude A（構築役）
[アイデア発展]

### Claude B（破壊役）
[批判・穴つき]

### ChatGPT（市場役）
[データ・競合分析]

### 統合（前田フィルター適用）
[全意見の統合結果]

---
セッションID: XX | ラウンド: N/6
続行 / 承認 / 修正指示 を選んでください
```

### 続きの壁打ち
```bash
curl -s -X POST http://176.32.87.118/api/discussion -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"sessionId":ID,"userComment":"意見"}'
```

### 承認/却下
```bash
# 承認
curl -s -X POST http://176.32.87.118/api/discussion/decide -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"sessionId":ID,"decision":"approved"}'

# 却下
curl -s -X POST http://176.32.87.118/api/discussion/decide -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"sessionId":ID,"decision":"rejected","comment":"理由"}'
```

### 最終統合（6ラウンド完了後）
```bash
curl -s -X POST http://176.32.87.118/api/discussion/finalize -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"sessionId":ID}'
```

### 「LP作って」「提案書」「DM」等 → アウトプット生成
```bash
curl -s -X POST http://176.32.87.118/api/output/generate -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"sessionId":ID,"outputType":"lp","params":{}}'
```
outputType一覧: lp, banner, sns_post, blog, youtube_script, press_release, newsletter, seo_design, seo_article, aio_content, proposal, dm, sales_script, company_profile, legal_content, seminar

結果は4パターン（PASONA/ベネフィット直球/ストーリー/恐怖訴求）+ 批評 + 推奨が返る。

### アウトプット承認
```bash
curl -s -X POST http://176.32.87.118/api/output/approve -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"queueId":ID,"pattern":"A"}'
```

### セッション一覧
```bash
curl -s http://176.32.87.118/api/discussion/sessions -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912"
```

### 案件ライブラリ
```bash
curl -s http://176.32.87.118/api/cases -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912"
# 種別指定: ?type=lp
```

### 好み管理
```bash
# 取得
curl -s http://176.32.87.118/api/preferences -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912"
# 登録
curl -s -X POST http://176.32.87.118/api/preferences -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"category":"カテゴリ","key":"項目","value":"値"}'
```

### 音声メモ
```bash
curl -s -X POST http://176.32.87.118/api/voice -H "Content-Type: application/json" -H "x-api-key: 08ff8c1e97306c38580ad72081fb37be130704ddc45c5912" -d '{"text":"メモ内容","sessionId":ID}'
```

## 注意事項
- 日本語で応答する
- 法律事務所としてのセキュリティ・品位を意識する
- ユーザーの曖昧な指示は確認してからAPIを叩く
- サーバーへのファイル配置は scp で転送する
- 事務所資料は data/office-docs/ に配置
