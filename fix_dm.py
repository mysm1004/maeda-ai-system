import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('交通提案/b64/maeda_greeting_hq.txt', 'r') as f:
    maeda_b64 = f.read().strip()
with open('交通提案/b64/logo.txt', 'r') as f:
    logo_b64 = f.read().strip()

maeda_src = f"data:image/jpeg;base64,{maeda_b64}"
logo_src = f"data:image/png;base64,{logo_b64}"

html = '''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>孤独死リスク対策のご提案 - 弁護士法人 東京新橋法律事務所</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Noto+Serif+JP:wght@400;500;600;700&display=swap');

:root {
  --navy: #0D2B4E;
  --navy-light: #1a4a7a;
  --navy-dark: #071e38;
  --gold: #B8860B;
  --gold-light: #DAA520;
  --gold-soft: #E8C860;
  --white: #ffffff;
  --gray-light: #f7f8fa;
  --gray-border: #e2e5ea;
  --text-dark: #1a1a2e;
  --text-body: #333344;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans JP', 'Hiragino Sans', 'Meiryo', sans-serif;
  color: var(--text-body);
  background: #e8e8e8;
  line-height: 1.8;
  font-size: 14px;
}

.page {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 14mm 17mm;
  background: var(--white);
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 3px solid var(--navy);
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-logo img {
  height: 38px;
  width: auto;
}

.header-office-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: 0.06em;
}

.header-right {
  text-align: right;
  font-size: 12px;
  color: var(--text-body);
  line-height: 1.7;
}

/* ===== MAIN TITLE ===== */
.main-title-section {
  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-light) 100%);
  color: var(--white);
  padding: 24px 30px;
  border-radius: 8px;
  margin-bottom: 22px;
  position: relative;
  overflow: hidden;
}

.main-title-section::before {
  content: '';
  position: absolute;
  right: -20px;
  top: -20px;
  width: 140px;
  height: 140px;
  border: 2px solid rgba(184, 134, 11, 0.2);
  border-radius: 50%;
}

.main-title-section::after {
  content: '';
  position: absolute;
  right: 20px;
  bottom: -30px;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(184, 134, 11, 0.15);
  border-radius: 50%;
}

.main-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 1;
}

.main-title .highlight {
  color: var(--gold-soft);
}

.main-subtitle {
  font-size: 12.5px;
  font-weight: 400;
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* ===== GREETING ===== */
.greeting {
  font-size: 13px;
  line-height: 2.0;
  margin-bottom: 22px;
  padding: 0 4px;
  text-align: justify;
}

/* ===== SECTION ===== */
.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  padding: 10px 16px;
  border-left: 4px solid var(--gold);
  background: linear-gradient(90deg, var(--gray-light) 0%, transparent 100%);
  margin-bottom: 14px;
  letter-spacing: 0.04em;
  border-radius: 0 4px 4px 0;
}

.section-number {
  display: inline-block;
  background: var(--gold);
  color: var(--white);
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  margin-right: 10px;
}

/* ===== PROBLEMS LIST ===== */
.problems-list {
  list-style: none;
  padding: 0;
}

.problems-list li {
  padding: 8px 12px 8px 40px;
  position: relative;
  font-size: 13px;
  line-height: 1.7;
  border-bottom: 1px solid var(--gray-border);
}

.problems-list li:last-child {
  border-bottom: none;
}

.problems-list li::before {
  content: '\2610';
  position: absolute;
  left: 12px;
  top: 8px;
  font-size: 16px;
  color: var(--gold);
}

/* ===== TABLE ===== */
.service-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  border-radius: 6px;
  overflow: hidden;
}

.service-table thead th {
  background: var(--navy);
  color: var(--white);
  padding: 10px 14px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
}

.service-table tbody td {
  padding: 8px 14px;
  border-bottom: 1px solid var(--gray-border);
  vertical-align: top;
}

.service-table tbody tr:nth-child(even) {
  background: var(--gray-light);
}

.service-table .item-col {
  width: 28%;
  font-weight: 600;
  color: var(--navy);
}

/* ===== LEGAL BASIS ===== */
.legal-basis {
  background: var(--gray-light);
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid var(--gray-border);
}

.legal-item {
  font-size: 13px;
  padding: 5px 0 5px 22px;
  position: relative;
}

.legal-item::before {
  content: '\25B6';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 10px;
  top: 7px;
}

.legal-year {
  font-weight: 700;
  color: var(--navy);
}

/* ===== MERITS ===== */
.merits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.merit-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: var(--white);
  border-radius: 6px;
  font-size: 13px;
  border-left: 3px solid var(--gold);
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
}

.merits-grid .merit-item:last-child {
  grid-column: 1 / -1;
}

.merit-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.merit-text {
  font-weight: 500;
  line-height: 1.55;
}

.merit-text strong {
  color: var(--navy);
}

/* ===== STEPS ===== */
.steps-container {
  display: flex;
  gap: 0;
  align-items: stretch;
}

.step-item {
  flex: 1;
  text-align: center;
  padding: 14px 10px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 8px;
}

.step-number {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: var(--white);
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
  padding: 2px 12px;
  border-radius: 12px;
  margin: 0 auto 8px;
  width: fit-content;
  letter-spacing: 0.05em;
}

.step-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 4px;
  line-height: 1.4;
}

.step-desc {
  font-size: 11px;
  color: var(--text-body);
  line-height: 1.5;
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  flex-shrink: 0;
  font-size: 18px;
  color: var(--gold);
  font-weight: 700;
}

/* ===== CONTACT ===== */
.contact-section {
  background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-light) 100%);
  color: var(--white);
  padding: 20px 24px;
  border-radius: 8px;
  display: flex;
  gap: 22px;
  align-items: center;
}

.contact-photo {
  flex-shrink: 0;
}

.contact-photo img {
  width: 110px;
  height: 140px;
  object-fit: cover;
  object-position: center top;
  border-radius: 6px;
  border: 2px solid var(--gold);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.contact-info {
  flex: 1;
}

.contact-cta {
  font-family: 'Noto Serif JP', serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--gold-soft);
  line-height: 1.5;
}

.contact-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.contact-details {
  font-size: 12px;
  line-height: 1.8;
}

.contact-details .tel {
  font-size: 22px;
  font-weight: 700;
  color: var(--gold-soft);
  letter-spacing: 0.05em;
}

/* ===== FOOTER ===== */
.footer {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 2px solid var(--navy);
  text-align: center;
  font-size: 11px;
  color: var(--text-body);
  line-height: 1.7;
}

.footer-name {
  font-weight: 700;
  color: var(--navy);
  font-size: 12px;
}

/* ===== PRINT ===== */
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 100%;
    min-height: auto;
    padding: 12mm 15mm;
    margin: 0;
    box-shadow: none;
  }
}
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="header-left">
      <div class="header-logo">
        <img src="''' + logo_src + '''" alt="東京新橋法律事務所">
      </div>
      <div class="header-office-name">弁護士法人 東京新橋法律事務所</div>
    </div>
    <div class="header-right">
      2026年3月吉日<br>
      賃貸管理会社 ご担当者様
    </div>
  </div>

  <!-- MAIN TITLE -->
  <div class="main-title-section">
    <div class="main-title">
      高齢入居者の<span class="highlight">「孤独死リスク」をゼロにする</span>仕組みのご提案
    </div>
    <div class="main-subtitle">
      国交省推奨「死後事務委任契約」の活用による、賃貸管理の新しいリスクヘッジ
    </div>
  </div>

  <!-- GREETING -->
  <div class="greeting">
    <p>
      拝啓　時下ますますご清栄のこととお慶び申し上げます。<br>
      東京・銀座にて法律事務所を経営しております、弁護士の前田祥夢と申します。当事務所は、家賃保証会社と連携した建物明渡業務を多数取り扱っており、賃貸管理の現場で日常的に発生する法的課題に向き合っております。このたび、貴社の賃貸管理業務に直結する重要なご提案がございまして、ご案内申し上げます。
    </p>
  </div>

  <!-- SECTION 1: PROBLEMS -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">1</span>こんなお悩みはありませんか？
    </div>
    <ul class="problems-list">
      <li>高齢の単身入居者が亡くなった後、賃貸借契約の解約ができない</li>
      <li>残置物の処分に法的根拠がなく、何ヶ月も放置せざるを得ない</li>
      <li>孤独死が発生し、原状回復に数十万円の費用が発生した</li>
      <li>事故物件化により、家賃の大幅値下げを余儀なくされた</li>
      <li>高齢者の入居申込を断りたいが、空室率も気になる</li>
    </ul>
  </div>

  <!-- SECTION 2: SOLUTION -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">2</span>解決策「死後事務委任契約」とは
    </div>
    <p style="font-size: 13px; margin-bottom: 10px; padding: 0 4px;">
      入居者が生前に弁護士と契約を締結し、万が一の際に必要な手続きを全て委任する仕組みです。
    </p>
    <table class="service-table">
      <thead>
        <tr>
          <th>対応事項</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="item-col">賃貸借契約の解約</td>
          <td>法的権限に基づき、速やかに契約を終了</td>
        </tr>
        <tr>
          <td class="item-col">残置物の撤去・処分</td>
          <td>弁護士の権限で適法に対応</td>
        </tr>
        <tr>
          <td class="item-col">原状回復の手配</td>
          <td>遺産または預託金から費用を支出</td>
        </tr>
        <tr>
          <td class="item-col">死亡届の提出</td>
          <td>行政手続きを弁護士が全て代行</td>
        </tr>
        <tr>
          <td class="item-col">葬儀・納骨の手配</td>
          <td>事前の意向に沿って手配</td>
        </tr>
        <tr>
          <td class="item-col">関係者への通知</td>
          <td>管理会社様への迅速な死亡連絡</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: LEGAL BASIS -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">3</span>国の制度的裏付け
    </div>
    <div class="legal-basis">
      <div class="legal-item">
        <span class="legal-year">2021年</span>　国土交通省・法務省「残置物の処理等に関するモデル契約条項」を策定。賃貸住宅における死後事務委任の活用を推奨。
      </div>
      <div class="legal-item">
        <span class="legal-year">2024年</span>　改正住宅セーフティネット法が成立。高齢者等の住宅確保要配慮者への居住支援を強化し、死後事務委任契約の普及を後押し。
      </div>
    </div>
  </div>

  <!-- SECTION 4: MERITS -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">4</span>貴社のメリット
    </div>
    <div class="merits-grid">
      <div class="merit-item">
        <div class="merit-icon">1</div>
        <div class="merit-text"><strong>孤独死リスクの実質ゼロ化</strong><br>万が一の際も弁護士が即座に対応</div>
      </div>
      <div class="merit-item">
        <div class="merit-icon">2</div>
        <div class="merit-text"><strong>残置物問題の即時解決</strong><br>法的権限で迅速かつ適法に処分</div>
      </div>
      <div class="merit-item">
        <div class="merit-icon">3</div>
        <div class="merit-text"><strong>高齢者の入居受入が可能に</strong><br>リスクなく入居審査を通過可能</div>
      </div>
      <div class="merit-item">
        <div class="merit-icon">4</div>
        <div class="merit-text"><strong>空室率の改善</strong><br>入居対象者の拡大で収益向上</div>
      </div>
      <div class="merit-item">
        <div class="merit-icon">5</div>
        <div class="merit-text"><strong>費用負担ゼロ</strong>　入居者本人が契約・費用を負担するため、管理会社様の追加コストは一切不要</div>
      </div>
    </div>
  </div>

  <!-- SECTION 5: STEPS -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">5</span>導入の流れ
    </div>
    <div class="steps-container">
      <div class="step-item">
        <span class="step-number">STEP 1</span>
        <div class="step-title">提携契約締結</div>
        <div class="step-desc">費用不要<br>まずは提携のご契約</div>
      </div>
      <div class="step-arrow">&#9654;</div>
      <div class="step-item">
        <span class="step-number">STEP 2</span>
        <div class="step-title">サービスご案内</div>
        <div class="step-desc">高齢単身入居者に<br>サービスをご案内</div>
      </div>
      <div class="step-arrow">&#9654;</div>
      <div class="step-item">
        <span class="step-number">STEP 3</span>
        <div class="step-title">入居者と直接契約</div>
        <div class="step-desc">入居者と当事務所が<br>直接契約を締結</div>
      </div>
      <div class="step-arrow">&#9654;</div>
      <div class="step-item">
        <span class="step-number">STEP 4</span>
        <div class="step-title">万が一の際</div>
        <div class="step-desc">当事務所が<br>全て代行</div>
      </div>
    </div>
  </div>

  <!-- SECTION 6: CONTACT -->
  <div class="section">
    <div class="section-title">
      <span class="section-number">6</span>お問い合わせ
    </div>
    <div class="contact-section">
      <div class="contact-photo">
        <img src="''' + maeda_src + '''" alt="前田祥夢弁護士">
      </div>
      <div class="contact-info">
        <div class="contact-cta">まずは30分のオンライン面談で<br>貴社に最適なプランをご提案します</div>
        <div class="contact-name">代表弁護士　前田 祥夢（東京弁護士会所属）</div>
        <div class="contact-details">
          <div class="tel">TEL: 03-6273-3254</div>
          平日 10:00〜19:00｜https://tslaw.or.jp<br>
          〒104-0061 東京都中央区銀座8丁目20番33号 ACN銀座8ビル3F
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-name">弁護士法人 東京新橋法律事務所</div>
    〒104-0061 東京都中央区銀座8丁目20番33号 ACN銀座8ビル3F｜TEL: 03-6273-3254｜https://tslaw.or.jp
  </div>

</div>
</body>
</html>'''

with open('【管理会社向け】孤独死リスク対策DM.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done")
