#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""リーフレットHTML生成スクリプト"""
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Base64画像読み込み
def load_b64(filename):
    path = os.path.join('交通提案', 'b64', filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return f.read().strip()
    return ''

logo_b64 = load_b64('logo.txt')
maeda_b64 = load_b64('maeda_greeting_hq.txt')
maeda2_b64 = load_b64('maeda2_jpg_hq.txt')

# PNG/JPEG判定
logo_prefix = 'data:image/png;base64,' if logo_b64.startswith('iVBOR') else 'data:image/jpeg;base64,'
maeda_prefix = 'data:image/jpeg;base64,' if maeda_b64.startswith('/9j/') else 'data:image/png;base64,'
maeda2_prefix = 'data:image/jpeg;base64,' if maeda2_b64.startswith('/9j/') else 'data:image/png;base64,'

html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>おひとりさまの安心サポート - 弁護士法人 東京新橋法律事務所</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Noto+Serif+JP:wght@400;500;600;700;900&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4;
    margin: 0;
  }}

  *, *::before, *::after {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }}

  html {{
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  body {{
    font-family: 'Noto Sans JP', 'Hiragino Sans', 'Meiryo', sans-serif;
    color: #2d2d3a;
    background: #e8e8e8;
    line-height: 1.7;
  }}

  /* ===== PAGE SYSTEM ===== */
  .page {{
    width: 210mm;
    height: 297mm;
    margin: 10px auto;
    position: relative;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 20px rgba(0,0,0,0.12);
  }}

  @media print {{
    body {{ background: #fff; }}
    .page {{
      margin: 0;
      box-shadow: none;
      page-break-after: always;
    }}
  }}

  /* ===== COLOR PALETTE ===== */
  :root {{
    --primary: #1B5E3B;
    --primary-dark: #0F3D26;
    --primary-light: #2E7D52;
    --accent: #C4943D;
    --accent-light: #D4A94F;
    --warm-bg: #FAFAF5;
    --warm-cream: #F5F0E6;
    --card-bg: #ffffff;
    --text-dark: #1a1a2e;
    --text-body: #333344;
    --text-light: #666678;
    --border: #e0ddd4;
  }}

  /* ========================================
     PAGE 1: COVER
     ======================================== */
  .page-cover {{
    background: linear-gradient(165deg, var(--primary-dark) 0%, var(--primary) 40%, var(--primary-light) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }}

  .cover-top {{
    padding: 14mm 18mm 0;
  }}

  .cover-logo {{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8mm;
  }}

  .cover-logo img {{
    height: 32px;
    width: auto;
    filter: brightness(10);
  }}

  .cover-logo-text {{
    color: rgba(255,255,255,0.85);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
  }}

  .cover-badge {{
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 18px;
    border-radius: 20px;
    letter-spacing: 0.1em;
    margin-bottom: 6mm;
  }}

  .cover-main-title {{
    font-family: 'Noto Serif JP', serif;
    color: #fff;
    font-size: 38px;
    font-weight: 900;
    line-height: 1.35;
    letter-spacing: 0.04em;
    margin-bottom: 5mm;
  }}

  .cover-main-title .gold {{
    color: var(--accent-light);
  }}

  .cover-subtitle {{
    color: rgba(255,255,255,0.88);
    font-size: 15px;
    line-height: 1.8;
    margin-bottom: 8mm;
    max-width: 380px;
  }}

  .cover-checklist {{
    list-style: none;
    padding: 0;
    margin-bottom: 6mm;
  }}

  .cover-checklist li {{
    color: rgba(255,255,255,0.92);
    font-size: 14.5px;
    padding: 4px 0 4px 28px;
    position: relative;
    line-height: 1.6;
  }}

  .cover-checklist li::before {{
    content: '\\2713';
    position: absolute;
    left: 0;
    top: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: var(--accent);
    color: #fff;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
  }}

  .cover-bottom {{
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(4px);
    padding: 10mm 18mm;
    display: flex;
    align-items: center;
    gap: 18px;
    border-top: 1px solid rgba(255,255,255,0.12);
  }}

  .cover-photo {{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent);
    flex-shrink: 0;
  }}

  .cover-lawyer-info {{
    color: rgba(255,255,255,0.92);
    font-size: 13px;
    line-height: 1.7;
  }}

  .cover-lawyer-name {{
    font-family: 'Noto Serif JP', serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
  }}

  .cover-lawyer-title {{
    font-size: 11px;
    color: var(--accent-light);
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }}

  .cover-deco {{
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    width: 280px;
    height: 280px;
    border: 2px solid rgba(196,148,61,0.15);
    border-radius: 50%;
  }}

  .cover-deco2 {{
    position: absolute;
    right: -20px;
    top: 55%;
    transform: translateY(-50%);
    width: 200px;
    height: 200px;
    border: 1px solid rgba(196,148,61,0.08);
    border-radius: 50%;
  }}

  /* ========================================
     PAGE 2: サービス内容
     ======================================== */
  .page-services {{
    padding: 14mm 18mm;
    background: var(--warm-bg);
  }}

  .page-header {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 8px;
    margin-bottom: 8mm;
  }}

  .page-header-title {{
    font-family: 'Noto Serif JP', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-dark);
    letter-spacing: 0.05em;
  }}

  .page-header-sub {{
    font-size: 11px;
    color: var(--text-light);
  }}

  .intro-text {{
    font-size: 14px;
    line-height: 1.9;
    color: var(--text-body);
    margin-bottom: 8mm;
    text-align: justify;
  }}

  .intro-text strong {{
    color: var(--primary);
  }}

  .service-cards {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
    margin-bottom: 8mm;
  }}

  .service-card {{
    background: var(--card-bg);
    border-radius: 8px;
    padding: 16px 18px;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }}

  .service-card::before {{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  }}

  .service-card-icon {{
    font-size: 28px;
    margin-bottom: 6px;
  }}

  .service-card-title {{
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 6px;
  }}

  .service-card-desc {{
    font-size: 12px;
    color: var(--text-light);
    line-height: 1.6;
  }}

  /* 死後事務委任とは */
  .what-is-box {{
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 18px 22px;
    margin-bottom: 8mm;
  }}

  .what-is-title {{
    font-size: 15px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
  }}

  .what-is-desc {{
    font-size: 13px;
    line-height: 1.85;
    color: var(--text-body);
  }}

  /* 安心ポイント */
  .trust-points {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4mm;
  }}

  .trust-point {{
    text-align: center;
    padding: 14px 10px;
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border);
  }}

  .trust-point-icon {{
    width: 44px;
    height: 44px;
    margin: 0 auto 8px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #fff;
  }}

  .trust-point-title {{
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 4px;
  }}

  .trust-point-desc {{
    font-size: 10.5px;
    color: var(--text-light);
    line-height: 1.5;
  }}

  /* ========================================
     PAGE 3: 料金・Q&A
     ======================================== */
  .page-pricing {{
    padding: 14mm 18mm;
    background: #fff;
  }}

  .pricing-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5mm;
    margin-bottom: 8mm;
  }}

  .pricing-card {{
    background: var(--card-bg);
    border: 2px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    position: relative;
  }}

  .pricing-card.recommended {{
    border-color: var(--primary);
    box-shadow: 0 4px 16px rgba(27,94,59,0.12);
  }}

  .pricing-card.recommended .pricing-card-header {{
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  }}

  .pricing-recommend-badge {{
    position: absolute;
    top: -1px;
    right: -1px;
    background: var(--accent);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 0 8px 0 8px;
  }}

  .pricing-card-header {{
    background: var(--primary-light);
    color: #fff;
    padding: 12px 14px;
  }}

  .pricing-plan-name {{
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }}

  .pricing-card-body {{
    padding: 14px 14px 16px;
  }}

  .pricing-price {{
    font-family: 'Noto Serif JP', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--primary-dark);
    margin-bottom: 4px;
  }}

  .pricing-price .yen {{
    font-size: 14px;
    font-weight: 500;
  }}

  .pricing-price .tax {{
    font-size: 10px;
    color: var(--text-light);
    font-weight: 400;
  }}

  .pricing-features {{
    list-style: none;
    padding: 0;
    text-align: left;
    margin-top: 10px;
  }}

  .pricing-features li {{
    font-size: 11.5px;
    padding: 3px 0 3px 18px;
    position: relative;
    color: var(--text-body);
    line-height: 1.5;
  }}

  .pricing-features li::before {{
    content: '\\2713';
    position: absolute;
    left: 0;
    color: var(--primary);
    font-weight: 700;
    font-size: 12px;
  }}

  .pricing-note {{
    font-size: 11px;
    color: var(--text-light);
    text-align: center;
    margin-bottom: 8mm;
    line-height: 1.6;
  }}

  /* Q&A */
  .qa-section {{
    margin-bottom: 6mm;
  }}

  .qa-section-title {{
    font-family: 'Noto Serif JP', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 5mm;
    padding-bottom: 6px;
    border-bottom: 2px solid var(--primary);
    display: inline-block;
  }}

  .qa-item {{
    margin-bottom: 4mm;
    background: var(--warm-bg);
    border-radius: 6px;
    padding: 12px 16px;
    border-left: 3px solid var(--primary);
  }}

  .qa-q {{
    font-size: 13px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 4px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }}

  .qa-q-badge {{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background: var(--primary);
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }}

  .qa-a {{
    font-size: 12.5px;
    color: var(--text-body);
    line-height: 1.7;
    padding-left: 30px;
  }}

  /* ========================================
     PAGE 4: CTA・お問い合わせ
     ======================================== */
  .page-cta {{
    padding: 14mm 18mm;
    background: var(--warm-bg);
    display: flex;
    flex-direction: column;
  }}

  .cta-message {{
    text-align: center;
    margin-bottom: 8mm;
  }}

  .cta-message-title {{
    font-family: 'Noto Serif JP', serif;
    font-size: 24px;
    font-weight: 900;
    color: var(--primary-dark);
    line-height: 1.4;
    margin-bottom: 4mm;
  }}

  .cta-message-title .gold {{
    color: var(--accent);
  }}

  .cta-message-sub {{
    font-size: 14px;
    color: var(--text-body);
    line-height: 1.8;
  }}

  /* 相談の流れ */
  .flow-section {{
    margin-bottom: 8mm;
  }}

  .flow-title {{
    font-family: 'Noto Serif JP', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--primary-dark);
    text-align: center;
    margin-bottom: 5mm;
  }}

  .flow-steps {{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 3mm;
  }}

  .flow-step {{
    flex: 1;
    text-align: center;
    max-width: 140px;
  }}

  .flow-step-num {{
    width: 36px;
    height: 36px;
    margin: 0 auto 6px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
  }}

  .flow-step-title {{
    font-size: 13px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 3px;
  }}

  .flow-step-desc {{
    font-size: 10.5px;
    color: var(--text-light);
    line-height: 1.5;
  }}

  .flow-arrow {{
    color: var(--accent);
    font-size: 18px;
    margin-top: 12px;
    flex-shrink: 0;
  }}

  /* 電話CTA */
  .cta-phone-box {{
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
    border-radius: 12px;
    padding: 20px 28px;
    text-align: center;
    color: #fff;
    margin-bottom: 6mm;
    position: relative;
    overflow: hidden;
  }}

  .cta-phone-box::after {{
    content: '';
    position: absolute;
    right: -40px;
    bottom: -40px;
    width: 150px;
    height: 150px;
    border: 2px solid rgba(196,148,61,0.2);
    border-radius: 50%;
  }}

  .cta-phone-label {{
    font-size: 13px;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
    opacity: 0.9;
  }}

  .cta-phone-number {{
    font-family: 'Noto Serif JP', serif;
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  }}

  .cta-phone-hours {{
    font-size: 12px;
    opacity: 0.85;
  }}

  .cta-free-badge {{
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 14px;
    margin-bottom: 8px;
    letter-spacing: 0.1em;
  }}

  /* 弁護士紹介 */
  .lawyer-card {{
    display: flex;
    align-items: center;
    gap: 18px;
    background: var(--card-bg);
    border-radius: 10px;
    padding: 18px 22px;
    border: 1px solid var(--border);
    margin-bottom: 6mm;
  }}

  .lawyer-card-photo {{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--primary);
    flex-shrink: 0;
  }}

  .lawyer-card-info {{
    flex: 1;
  }}

  .lawyer-card-title {{
    font-size: 11px;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.1em;
    margin-bottom: 2px;
  }}

  .lawyer-card-name {{
    font-family: 'Noto Serif JP', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 4px;
  }}

  .lawyer-card-desc {{
    font-size: 12px;
    color: var(--text-light);
    line-height: 1.6;
  }}

  /* フッター */
  .cta-footer {{
    background: var(--primary-dark);
    color: rgba(255,255,255,0.88);
    padding: 14px 22px;
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    line-height: 1.7;
    margin-top: auto;
  }}

  .cta-footer-name {{
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
    letter-spacing: 0.05em;
  }}

  .cta-footer a {{
    color: var(--accent-light);
    text-decoration: none;
  }}
</style>
</head>
<body>

<!-- ===================== PAGE 1: COVER ===================== -->
<div class="page page-cover">
  <div class="cover-deco"></div>
  <div class="cover-deco2"></div>

  <div class="cover-top">
    <div class="cover-logo">
      <img src="{logo_prefix}{logo_b64}" alt="ロゴ">
      <span class="cover-logo-text">弁護士法人 東京新橋法律事務所</span>
    </div>

    <div class="cover-badge">初回相談無料</div>

    <h1 class="cover-main-title">
      おひとりさまの<br>
      <span class="gold">安心</span>サポート
    </h1>

    <p class="cover-subtitle">
      「もしも」の時、誰があなたの想いを届けますか？<br>
      弁護士が最期まで責任をもってお手伝いします。
    </p>

    <ul class="cover-checklist">
      <li>身寄りがいない、頼れる親族がいない</li>
      <li>葬儀やお墓のことを決めておきたい</li>
      <li>自宅の片付けや各種届出が心配</li>
      <li>ペットの世話を誰かに託したい</li>
    </ul>
  </div>

  <div class="cover-bottom">
    <img class="cover-photo" src="{maeda_prefix}{maeda_b64}" alt="代表弁護士 前田祥夢">
    <div class="cover-lawyer-info">
      <div class="cover-lawyer-title">代表弁護士</div>
      <div class="cover-lawyer-name">前田 祥夢</div>
      東京弁護士会所属｜開業6年目<br>
      年間売上5.2億円の実績ある法律事務所が<br>
      あなたの「もしも」に備えます。
    </div>
  </div>
</div>

<!-- ===================== PAGE 2: サービス内容 ===================== -->
<div class="page page-services">
  <div class="page-header">
    <div class="page-header-title">死後事務委任契約とは</div>
    <div class="page-header-sub">SERVICE OVERVIEW</div>
  </div>

  <p class="intro-text">
    <strong>死後事務委任契約</strong>は、ご自身が亡くなられた後に必要となる様々な手続きを、
    <strong>生前のうちに弁護士に委任</strong>しておく契約です。
    身寄りのない方や、ご家族に負担をかけたくない方に最適な制度です。
  </p>

  <div class="service-cards">
    <div class="service-card">
      <div class="service-card-icon">&#x1F3E0;</div>
      <div class="service-card-title">住居の明渡し・片付け</div>
      <div class="service-card-desc">賃貸住宅の解約手続き、家財の整理・処分を代行。大家さんへの迷惑を最小限に。</div>
    </div>
    <div class="service-card">
      <div class="service-card-icon">&#x26B0;</div>
      <div class="service-card-title">葬儀・納骨の手配</div>
      <div class="service-card-desc">ご希望に沿った葬儀の手配、納骨先の選定・手続きまで、すべてお任せください。</div>
    </div>
    <div class="service-card">
      <div class="service-card-icon">&#x1F4CB;</div>
      <div class="service-card-title">各種届出・解約手続き</div>
      <div class="service-card-desc">役所への届出、公共料金・携帯電話・保険など各種契約の解約手続きを代行。</div>
    </div>
    <div class="service-card">
      <div class="service-card-icon">&#x1F43E;</div>
      <div class="service-card-title">ペットの引渡し</div>
      <div class="service-card-desc">大切なペットを事前に決めた引取先へ。フードや医療情報も引き継ぎます。</div>
    </div>
    <div class="service-card">
      <div class="service-card-icon">&#x1F4E7;</div>
      <div class="service-card-title">関係者への連絡</div>
      <div class="service-card-desc">ご友人、知人、お世話になった方々への訃報連絡をご意向に沿って行います。</div>
    </div>
    <div class="service-card">
      <div class="service-card-icon">&#x1F4B0;</div>
      <div class="service-card-title">遺産の清算・分配</div>
      <div class="service-card-desc">公正証書遺言に基づく遺言執行で、残された財産を適切に処理します。</div>
    </div>
  </div>

  <div class="what-is-box">
    <div class="what-is-title">なぜ弁護士に依頼すべきか</div>
    <div class="what-is-desc">
      死後の手続きには法律判断が伴います。賃貸解約の原状回復費用の交渉、遺品の所有権確認、
      相続人との調整——これらは弁護士だからこそ適切に対応できる業務です。
      NPO等の民間事業者と異なり、弁護士は法律に基づく代理権を有しており、
      万が一のトラブルにも対応可能です。
    </div>
  </div>

  <div class="trust-points">
    <div class="trust-point">
      <div class="trust-point-icon">&#x2696;</div>
      <div class="trust-point-title">弁護士の法的権限</div>
      <div class="trust-point-desc">法律に基づく正当な代理権で確実に手続き</div>
    </div>
    <div class="trust-point">
      <div class="trust-point-icon">&#x1F512;</div>
      <div class="trust-point-title">守秘義務の保証</div>
      <div class="trust-point-desc">弁護士法に基づく厳格な守秘義務</div>
    </div>
    <div class="trust-point">
      <div class="trust-point-icon">&#x1F91D;</div>
      <div class="trust-point-title">長期的な信頼関係</div>
      <div class="trust-point-desc">法人体制で長期にわたり安定した対応</div>
    </div>
  </div>
</div>

<!-- ===================== PAGE 3: 料金・Q&A ===================== -->
<div class="page page-pricing">
  <div class="page-header">
    <div class="page-header-title">料金プラン</div>
    <div class="page-header-sub">PRICING</div>
  </div>

  <div class="pricing-grid">
    <div class="pricing-card">
      <div class="pricing-card-header">
        <div class="pricing-plan-name">シンプル</div>
      </div>
      <div class="pricing-card-body">
        <div class="pricing-price">22<span class="yen">万円</span><br><span class="tax">（税込）</span></div>
        <ul class="pricing-features">
          <li>住居の明渡し手続き</li>
          <li>葬儀・納骨の手配</li>
          <li>各種届出・解約手続き</li>
        </ul>
      </div>
    </div>

    <div class="pricing-card recommended">
      <div class="pricing-recommend-badge">おすすめ</div>
      <div class="pricing-card-header">
        <div class="pricing-plan-name">スタンダード</div>
      </div>
      <div class="pricing-card-body">
        <div class="pricing-price">33<span class="yen">万円</span><br><span class="tax">（税込）</span></div>
        <ul class="pricing-features">
          <li>シンプルの全内容</li>
          <li>関係者への連絡代行</li>
          <li>遺品の仕分け・配送</li>
          <li>SNS等のアカウント削除</li>
        </ul>
      </div>
    </div>

    <div class="pricing-card">
      <div class="pricing-card-header">
        <div class="pricing-plan-name">フルサポート</div>
      </div>
      <div class="pricing-card-body">
        <div class="pricing-price">44<span class="yen">万円</span><br><span class="tax">（税込）</span></div>
        <ul class="pricing-features">
          <li>スタンダードの全内容</li>
          <li>ペットの引渡し手配</li>
          <li>遺産整理・清算手続き</li>
          <li>公正証書遺言の作成支援</li>
        </ul>
      </div>
    </div>
  </div>

  <p class="pricing-note">
    ※ 上記は契約時の費用です。実費（葬儀費用・遺品整理費用等）は遺産から清算する方式のため、<br>
    多額の預託金は不要です。公正証書遺言により弁護士を遺言執行者に指定していただきます。
  </p>

  <div class="qa-section">
    <div class="qa-section-title">よくあるご質問</div>

    <div class="qa-item">
      <div class="qa-q">
        <span class="qa-q-badge">Q</span>
        <span>契約してから亡くなるまでの間、何かすることはありますか？</span>
      </div>
      <div class="qa-a">
        特にございません。年に1回程度、ご連絡先やご希望に変更がないか確認のご連絡をいたします。ご状況の変化に合わせて、契約内容はいつでも見直し可能です。
      </div>
    </div>

    <div class="qa-item">
      <div class="qa-q">
        <span class="qa-q-badge">Q</span>
        <span>大きな預託金が必要ですか？</span>
      </div>
      <div class="qa-a">
        いいえ。当事務所は「遺産清算方式」を採用しています。葬儀費用等の実費はお亡くなり後にご遺産から清算しますので、契約時に多額の預託金をお預かりする必要はありません。
      </div>
    </div>

    <div class="qa-item">
      <div class="qa-q">
        <span class="qa-q-badge">Q</span>
        <span>弁護士が先に亡くなった場合はどうなりますか？</span>
      </div>
      <div class="qa-a">
        当事務所は弁護士法人として組織的に運営しております。担当弁護士に万が一のことがあっても、法人として責任をもって契約を引き継ぎます。
      </div>
    </div>

    <div class="qa-item">
      <div class="qa-q">
        <span class="qa-q-badge">Q</span>
        <span>判断能力が衰えてからでも契約できますか？</span>
      </div>
      <div class="qa-a">
        契約には意思能力が必要です。認知症が進行した後では契約が困難になりますので、お元気なうちにご検討いただくことをお勧めしています。
      </div>
    </div>
  </div>
</div>

<!-- ===================== PAGE 4: CTA ===================== -->
<div class="page page-cta">
  <div class="cta-message">
    <h2 class="cta-message-title">
      「もしも」に<span class="gold">安心</span>を。<br>
      まずはお電話ください。
    </h2>
    <p class="cta-message-sub">
      初回のご相談は無料です。「まだ早いかな」と思われた時こそ、<br>
      最適なタイミングです。お気軽にお電話ください。
    </p>
  </div>

  <div class="flow-section">
    <div class="flow-title">ご相談の流れ</div>
    <div class="flow-steps">
      <div class="flow-step">
        <div class="flow-step-num">1</div>
        <div class="flow-step-title">お電話</div>
        <div class="flow-step-desc">まずはお気軽にお問い合わせください</div>
      </div>
      <div class="flow-arrow">&#x25B6;</div>
      <div class="flow-step">
        <div class="flow-step-num">2</div>
        <div class="flow-step-title">無料相談</div>
        <div class="flow-step-desc">ご状況やご希望をじっくりお伺いします</div>
      </div>
      <div class="flow-arrow">&#x25B6;</div>
      <div class="flow-step">
        <div class="flow-step-num">3</div>
        <div class="flow-step-title">ご提案</div>
        <div class="flow-step-desc">最適なプランをご提案いたします</div>
      </div>
      <div class="flow-arrow">&#x25B6;</div>
      <div class="flow-step">
        <div class="flow-step-num">4</div>
        <div class="flow-step-title">ご契約</div>
        <div class="flow-step-desc">ご納得いただいてから契約締結</div>
      </div>
    </div>
  </div>

  <div class="cta-phone-box">
    <div class="cta-free-badge">初回相談無料</div>
    <div class="cta-phone-label">お電話でのお問い合わせ</div>
    <div class="cta-phone-number">03-6273-3254</div>
    <div class="cta-phone-hours">受付時間：平日 10:00〜19:00（土日祝は予約制）</div>
  </div>

  <div class="lawyer-card">
    <img class="lawyer-card-photo" src="{maeda2_prefix}{maeda2_b64}" alt="前田祥夢弁護士">
    <div class="lawyer-card-info">
      <div class="lawyer-card-title">代表弁護士</div>
      <div class="lawyer-card-name">前田 祥夢</div>
      <div class="lawyer-card-desc">
        東京弁護士会所属。弁護士法人東京新橋法律事務所代表。<br>
        「おひとりさまの不安を安心に変える」をモットーに、<br>
        死後事務委任契約の普及に取り組んでいます。
      </div>
    </div>
  </div>

  <div class="cta-footer">
    <div class="cta-footer-name">弁護士法人 東京新橋法律事務所</div>
    〒104-0061 東京都中央区銀座8丁目20番33号 ACN銀座8ビル3F<br>
    TEL: 03-6273-3254｜平日 10:00〜19:00<br>
    東京弁護士会所属｜<a href="https://tslaw.or.jp">https://tslaw.or.jp</a>
  </div>
</div>

</body>
</html>'''

output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '【リーフレット】おひとりさまの安心サポート.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f'✓ リーフレット HTML 生成完了: {output_path}')
print(f'  ファイルサイズ: {os.path.getsize(output_path):,} bytes')
