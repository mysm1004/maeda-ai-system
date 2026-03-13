import sys
sys.stdout.reconfigure(encoding='utf-8')

# Read base64 assets
with open('交通提案/b64/maeda_greeting_hq.txt', 'r') as f:
    maeda_b64 = f.read().strip()
with open('交通提案/b64/logo.txt', 'r') as f:
    logo_b64 = f.read().strip()

maeda_src = f"data:image/jpeg;base64,{maeda_b64}"
logo_src = f"data:image/png;base64,{logo_b64}"

html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>おひとりさまの安心相談 - 弁護士法人 東京新橋法律事務所</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;500;600;700;900&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after {{
    margin: 0; padding: 0; box-sizing: border-box;
  }}
  html, body {{
    width: 210mm;
    margin: 0 auto;
    font-family: 'Noto Sans JP', sans-serif;
    color: #1a1a1a;
    background: #e8e8e8;
  }}
  .page {{
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }}

  /* ===== HERO: 最大インパクト ===== */
  .hero {{
    background: linear-gradient(135deg, #0D2B4E 0%, #1a4a7a 100%);
    padding: 10mm 14mm 8mm;
    text-align: center;
    position: relative;
    overflow: hidden;
  }}
  .hero::after {{
    content: '';
    position: absolute;
    right: -60px; top: -60px;
    width: 200px; height: 200px;
    border: 2px solid rgba(196,148,61,0.12);
    border-radius: 50%;
  }}
  .hero-badge {{
    display: inline-block;
    background: #C41E3A;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 4px 20px;
    border-radius: 20px;
    letter-spacing: 0.1em;
    margin-bottom: 5mm;
  }}
  .hero-title {{
    font-family: 'Noto Serif JP', serif;
    color: #fff;
    font-size: 48px;
    font-weight: 900;
    line-height: 1.35;
    letter-spacing: 0.08em;
    margin-bottom: 4mm;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }}
  .hero-title .accent {{
    color: #E8C860;
    display: block;
    font-size: 40px;
    margin-top: 2mm;
  }}
  .hero-sub {{
    color: rgba(255,255,255,0.85);
    font-size: 17px;
    line-height: 1.8;
    letter-spacing: 0.04em;
  }}

  /* ===== 問いかけセクション ===== */
  .question-section {{
    background: #FFFDF7;
    padding: 7mm 14mm 5mm;
    text-align: center;
  }}
  .question-label {{
    display: inline-block;
    background: #C77B2B;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 3px 16px;
    border-radius: 3px;
    letter-spacing: 0.08em;
    margin-bottom: 4mm;
  }}
  .question-list {{
    list-style: none;
    text-align: center;
    margin-bottom: 3mm;
  }}
  .question-list li {{
    font-family: 'Noto Serif JP', serif;
    font-size: 17px;
    color: #2d2d3a;
    line-height: 2.2;
    font-weight: 500;
  }}
  .question-list li::before {{
    content: '\\2713';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    background: #C77B2B;
    color: #fff;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    margin-right: 8px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }}

  /* ===== 解決メッセージ ===== */
  .solution {{
    padding: 4mm 14mm 3mm;
    text-align: center;
  }}
  .solution-text {{
    font-family: 'Noto Serif JP', serif;
    font-size: 20px;
    font-weight: 700;
    color: #0D2B4E;
    line-height: 1.8;
    letter-spacing: 0.04em;
  }}
  .solution-text .gold {{
    color: #B8860B;
    font-size: 22px;
  }}

  /* ===== サービス ===== */
  .services {{
    padding: 3mm 18mm 3mm;
  }}
  .services-box {{
    background: #f7f3ec;
    border-radius: 8px;
    padding: 4mm 10mm;
    border: 1px solid #e8dece;
  }}
  .services-title {{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: #0D2B4E;
    margin-bottom: 2mm;
    letter-spacing: 0.06em;
  }}
  .services-grid {{
    display: flex;
    flex-wrap: wrap;
    gap: 2mm;
    justify-content: center;
  }}
  .service-item {{
    background: #fff;
    border-radius: 6px;
    padding: 2mm 4mm;
    font-size: 14px;
    font-weight: 500;
    color: #2a2a2a;
    border: 1px solid #e8dece;
  }}

  /* ===== CTA ===== */
  .cta {{
    background: #0D2B4E;
    margin: 4mm 14mm;
    border-radius: 10px;
    padding: 5mm 8mm;
    text-align: center;
    color: #fff;
    position: relative;
  }}
  .cta-free {{
    display: inline-block;
    background: #C41E3A;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    padding: 3px 20px;
    border-radius: 20px;
    letter-spacing: 0.12em;
    margin-bottom: 3mm;
  }}
  .cta-label {{
    font-size: 18px;
    font-weight: 700;
    color: #FFE4B5;
    letter-spacing: 0.08em;
    margin-bottom: 2mm;
  }}
  .cta-phone {{
    font-size: 52px;
    font-weight: 900;
    color: #fff;
    letter-spacing: 0.06em;
    line-height: 1.2;
  }}
  .cta-phone .phone-icon {{
    font-size: 36px;
    margin-right: 4px;
    vertical-align: middle;
    position: relative;
    top: -3px;
  }}
  .cta-hours {{
    font-size: 14px;
    color: #ddd;
    margin-top: 1mm;
  }}
  .cta-note {{
    font-size: 14px;
    color: #FFE4B5;
    margin-top: 2mm;
    font-weight: 500;
  }}

  /* ===== 弁護士 + フッター ===== */
  .bottom {{
    padding: 3mm 14mm 5mm;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: auto;
    border-top: 1px solid #e8dece;
  }}
  .bottom-photo {{
    width: 72px; height: 72px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 3px solid #C77B2B;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }}
  .bottom-info {{
    flex: 1;
  }}
  .bottom-name {{
    font-family: 'Noto Serif JP', serif;
    font-size: 18px;
    font-weight: 700;
    color: #0D2B4E;
  }}
  .bottom-title {{
    font-size: 11px;
    color: #888;
  }}
  .bottom-office {{
    font-size: 11px;
    color: #666;
    line-height: 1.7;
    margin-top: 1mm;
  }}
  .bottom-url {{
    font-size: 11px;
    color: #0D2B4E;
    font-weight: 600;
  }}

  /* 印刷対応 */
  @media print {{
    html, body {{
      width: 210mm;
      margin: 0;
      padding: 0;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .page {{
      box-shadow: none;
      page-break-after: avoid;
      page-break-inside: avoid;
    }}
    @page {{
      size: A4 portrait;
      margin: 0;
    }}
  }}
</style>
</head>
<body>

<div class="page">

  <!-- HERO: 最大インパクト -->
  <div class="hero">
    <div class="hero-badge">弁護士による安心の備え</div>
    <h1 class="hero-title">
      ひとりで暮らす<br>あなたへ
      <span class="accent">「もしも」の備えを、弁護士が。</span>
    </h1>
    <p class="hero-sub">
      届出、葬儀、お部屋の片付け ——<br>
      おひとりで暮らすあなたの「もしも」に、弁護士が寄り添います。
    </p>
  </div>

  <!-- 問いかけ -->
  <div class="question-section">
    <div class="question-label">こんなお悩みはありませんか？</div>
    <ul class="question-list">
      <li>自分に何かあったとき、届出をしてくれる人がいない</li>
      <li>葬儀やお墓のことを頼める相手がいない</li>
      <li>部屋の片付けや契約の解約をどうすればいいか不安</li>
    </ul>
  </div>

  <!-- 解決 -->
  <div class="solution">
    <p class="solution-text">
      こうした「もしも」の備えを、<br>
      <span class="gold">弁護士があなたに代わって、すべてお引き受けします。</span>
    </p>
  </div>

  <!-- サービス内容 -->
  <div class="services">
    <div class="services-box">
      <p class="services-title">弁護士がお手伝いできること</p>
      <div class="services-grid">
        <div class="service-item">&#10003; 届出・行政手続き</div>
        <div class="service-item">&#10003; 葬儀・火葬・納骨の手配</div>
        <div class="service-item">&#10003; お部屋の片付け・明け渡し</div>
        <div class="service-item">&#10003; 公共料金の解約</div>
        <div class="service-item">&#10003; ご関係者への連絡</div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta">
    <div class="cta-free">初回相談無料</div>
    <p class="cta-label">まずはお電話ください</p>
    <p class="cta-phone"><span class="phone-icon">&#9742;</span>03-6273-3254</p>
    <p class="cta-hours">受付時間：平日 10:00〜19:00</p>
    <p class="cta-note">「新聞を見た」とお伝えいただければスムーズです</p>
  </div>

  <!-- 弁護士 + フッター -->
  <div class="bottom">
    <img class="bottom-photo" src="{maeda_src}" alt="前田祥夢弁護士">
    <div class="bottom-info">
      <div class="bottom-title">代表弁護士・東京弁護士会所属</div>
      <div class="bottom-name">前田 祥夢</div>
      <div class="bottom-office">
        弁護士法人 東京新橋法律事務所<br>
        〒104-0061 東京都中央区銀座8丁目20番33号 ACN銀座8ビル3F<br>
        TEL: 03-6273-3254｜平日 10:00〜19:00
      </div>
      <div class="bottom-url">https://tslaw.or.jp</div>
    </div>
  </div>

</div>

</body>
</html>'''

with open('【新聞折込】おひとりさまの安心相談_v2.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done - 新聞折込v2 generated")
