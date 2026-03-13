import sys, os
sys.stdout.reconfigure(encoding='utf-8')

# Read base64 assets
with open(r'C:\Users\user\Desktop\claudeマスター\maeda_b64.txt', 'r') as f:
    maeda_b64 = f.read().strip()

with open(r'C:\Users\user\Desktop\claudeマスター\logo_b64.txt', 'r') as f:
    logo_b64 = 'data:image/png;base64,' + f.read().strip()

html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>死後事務委任×寺院連携｜弁護士法人東京新橋法律事務所</title>
<meta name="description" content="弁護士法人東京新橋法律事務所の死後事務委任サービス。弁護士と寺院が連携し、死後の手続きから葬儀・納骨まで一括対応。初回相談無料。銀座。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@500;700;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{{margin:0;padding:0;box-sizing:border-box}}
html{{scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:72px}}
body{{font-family:"Noto Sans JP",sans-serif;color:#1a1a2e;background:#fff;line-height:1.85;font-size:16px;overflow-x:hidden;-webkit-font-smoothing:antialiased}}
img{{max-width:100%;height:auto;display:block}}
a{{color:inherit;text-decoration:none}}
ul,ol{{list-style:none}}
:root{{
--navy:#0a1628;--navy-light:#162038;--gold:#b8975a;--gold-light:#d4bc8a;
--cream:#f7f4ee;--warm-gray:#6b6b7b;--text:#1a1a2e;--accent:#1a5276;
--cta-green:#1a6b4a;--cta-green-hover:#15573c;--border:#e0ddd6;
}}
.container{{width:100%;max-width:1100px;margin:0 auto;padding:0 24px}}
.serif{{font-family:"Noto Serif JP",serif}}
.label-font{{font-family:"Inter",sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:11px}}
.fade-in{{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.25,.46,.45,.94),transform .8s cubic-bezier(.25,.46,.45,.94)}}
.fade-in.is-visible{{opacity:1;transform:translateY(0)}}

/* HEADER */
.site-header{{position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:box-shadow .3s}}
.site-header.scrolled{{box-shadow:0 2px 24px rgba(10,22,40,.08)}}
.header-inner{{display:flex;align-items:center;justify-content:space-between;height:64px;max-width:1100px;margin:0 auto;padding:0 24px}}
.header-logo{{display:flex;align-items:center;gap:10px}}
.header-logo-text{{font-size:13px;font-weight:700;color:var(--navy);letter-spacing:.5px;line-height:1.3}}
.header-logo-text small{{display:block;font-size:10px;font-weight:500;color:var(--warm-gray);letter-spacing:0}}
.header-right{{display:flex;align-items:center;gap:16px}}
.header-tel{{font-family:"Inter",sans-serif;font-size:15px;font-weight:700;color:var(--navy);letter-spacing:.5px}}
.header-tel small{{font-size:11px;font-weight:500;color:var(--warm-gray);display:block;text-align:right}}
.header-cta{{display:inline-flex;align-items:center;gap:6px;background:var(--cta-green);color:#fff;font-size:13px;font-weight:700;padding:10px 24px;border-radius:4px;border:none;cursor:pointer;transition:background .2s,transform .1s;white-space:nowrap}}
.header-cta:hover{{background:var(--cta-green-hover);transform:translateY(-1px)}}

/* HERO */
.hero{{display:flex;align-items:stretch;min-height:calc(100vh - 64px);background:var(--navy)}}
.hero-grid{{display:grid;grid-template-columns:1fr 1fr;width:100%;min-height:calc(100vh - 64px)}}
.hero-photo{{position:relative;overflow:hidden;background:var(--navy-light);display:flex;align-items:flex-end}}
.hero-photo img{{width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.92)}}
.hero-photo-overlay{{position:absolute;bottom:0;left:0;right:0;padding:32px 40px;background:linear-gradient(transparent,rgba(10,22,40,.88));color:#fff;z-index:2}}
.hero-photo-name{{font-size:20px;font-weight:900;margin-bottom:2px;font-family:"Noto Serif JP",serif}}
.hero-photo-role{{font-size:12px;color:rgba(255,255,255,.7)}}
.hero-text{{background:var(--navy);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:60px 56px}}
.hero-label{{display:inline-block;font-family:"Inter","Noto Sans JP",sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:20px;padding:6px 14px;border:1px solid rgba(184,151,90,.4);border-radius:3px}}
.hero-h1{{font-family:"Noto Serif JP",serif;font-size:36px;font-weight:900;line-height:1.65;margin-bottom:20px;letter-spacing:.02em}}
.hero-h1 .accent{{color:var(--gold)}}
.hero-tagline{{font-size:15px;color:rgba(255,255,255,.68);line-height:2;margin-bottom:32px;border-left:3px solid var(--gold);padding-left:16px}}
.hero-cta-wrap{{display:flex;flex-direction:column;gap:12px}}
.hero-cta-btn{{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:18px 40px;border-radius:4px;border:none;cursor:pointer;transition:all .2s;letter-spacing:.5px}}
.hero-cta-btn:hover{{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,151,90,.3)}}
.hero-sub-info{{font-size:12px;color:rgba(255,255,255,.45);text-align:center}}
.hero-badges{{display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap}}
.hero-badge{{font-size:12px;font-weight:700;padding:5px 12px;border-radius:3px;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.85)}}

/* SECTIONS COMMON */
.section-label{{font-family:"Inter",sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:12px;display:inline-block}}
.section-title{{font-family:"Noto Serif JP",serif;font-size:30px;font-weight:900;line-height:1.6;margin-bottom:16px;color:var(--navy)}}
.section-lead{{font-size:15px;color:var(--warm-gray);line-height:2;margin-bottom:48px;max-width:680px}}

/* PROBLEM */
.problem-section{{padding:100px 0;background:var(--cream)}}
.problem-cards{{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}}
.problem-card{{background:#fff;border:1px solid var(--border);border-radius:6px;padding:36px 28px;position:relative;transition:transform .2s,box-shadow .2s}}
.problem-card:hover{{transform:translateY(-4px);box-shadow:0 12px 32px rgba(10,22,40,.06)}}
.problem-num{{font-family:"Inter",sans-serif;font-size:48px;font-weight:900;color:rgba(184,151,90,.12);position:absolute;top:16px;right:20px;line-height:1}}
.problem-icon{{width:44px;height:44px;background:var(--cream);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:20px}}
.problem-title{{font-size:17px;font-weight:700;margin-bottom:8px;line-height:1.5}}
.problem-desc{{font-size:14px;color:var(--warm-gray);line-height:1.85}}

/* WHAT IS */
.whatis-section{{padding:100px 0;background:#fff}}
.whatis-box{{background:var(--navy);color:#fff;border-radius:8px;padding:60px;position:relative;overflow:hidden}}
.whatis-box::before{{content:"";position:absolute;top:-60px;right:-60px;width:240px;height:240px;border-radius:50%;background:rgba(184,151,90,.08)}}
.whatis-inner{{position:relative;z-index:1}}
.whatis-label{{color:var(--gold);margin-bottom:16px}}
.whatis-title{{font-family:"Noto Serif JP",serif;font-size:28px;font-weight:900;line-height:1.6;margin-bottom:20px}}
.whatis-desc{{font-size:15px;color:rgba(255,255,255,.72);line-height:2;margin-bottom:32px;max-width:640px}}
.whatis-points{{display:grid;grid-template-columns:1fr 1fr;gap:16px}}
.whatis-point{{display:flex;align-items:flex-start;gap:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:20px}}
.whatis-point-icon{{width:32px;height:32px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;color:var(--navy);font-weight:700}}
.whatis-point-text{{font-size:14px;line-height:1.75;font-weight:500}}
.whatis-point-text strong{{display:block;margin-bottom:4px;font-size:15px}}

/* FLOW */
.flow-section{{padding:100px 0;background:var(--cream)}}
.flow-steps{{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px}}
.flow-step{{background:#fff;border-radius:6px;padding:32px 24px;text-align:center;position:relative;border:1px solid var(--border)}}
.flow-step::after{{content:"";position:absolute;top:50%;right:-14px;width:8px;height:8px;border-top:2px solid var(--gold);border-right:2px solid var(--gold);transform:rotate(45deg) translateY(-50%);z-index:2}}
.flow-step:last-child::after{{display:none}}
.flow-step-num{{font-family:"Inter",sans-serif;font-size:11px;font-weight:900;color:var(--gold);letter-spacing:2px;margin-bottom:12px}}
.flow-step-icon{{width:56px;height:56px;margin:0 auto 16px;background:var(--cream);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px}}
.flow-step-title{{font-size:16px;font-weight:700;margin-bottom:8px;line-height:1.4}}
.flow-step-desc{{font-size:13px;color:var(--warm-gray);line-height:1.8}}

/* WHY US */
.whyus-section{{padding:100px 0;background:#fff}}
.whyus-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}}
.whyus-card{{border:1px solid var(--border);border-radius:6px;padding:36px 28px;border-top:3px solid var(--gold);transition:transform .2s,box-shadow .2s}}
.whyus-card:hover{{transform:translateY(-4px);box-shadow:0 12px 32px rgba(10,22,40,.06)}}
.whyus-num{{font-family:"Inter",sans-serif;font-size:11px;font-weight:900;color:var(--gold);letter-spacing:2px;margin-bottom:12px}}
.whyus-title{{font-size:18px;font-weight:700;margin-bottom:12px;line-height:1.5}}
.whyus-desc{{font-size:14px;color:var(--warm-gray);line-height:1.85}}

/* PROFILE */
.profile-section{{padding:100px 0;background:var(--cream)}}
.profile-card{{display:grid;grid-template-columns:280px 1fr;gap:48px;background:#fff;border-radius:8px;padding:48px;border:1px solid var(--border)}}
.profile-photo{{border-radius:6px;overflow:hidden;aspect-ratio:3/4}}
.profile-photo img{{width:100%;height:100%;object-fit:cover;object-position:center top}}
.profile-position{{font-family:"Inter","Noto Sans JP",sans-serif;font-size:11px;font-weight:700;color:var(--gold);letter-spacing:2px;margin-bottom:8px;text-transform:uppercase}}
.profile-name{{font-family:"Noto Serif JP",serif;font-size:28px;font-weight:900;margin-bottom:4px}}
.profile-name-en{{font-family:"Inter",sans-serif;font-size:13px;color:var(--warm-gray);margin-bottom:20px;font-weight:500}}
.profile-bio{{font-size:14px;color:var(--warm-gray);line-height:2;margin-bottom:20px}}
.profile-career{{border-top:1px solid var(--border);padding-top:20px}}
.profile-career dt{{font-size:12px;font-weight:700;color:var(--navy);margin-bottom:4px}}
.profile-career dd{{font-size:13px;color:var(--warm-gray);margin-bottom:12px;line-height:1.7}}
.profile-team{{margin-top:40px}}
.profile-team-title{{font-size:16px;font-weight:700;margin-bottom:16px}}
.profile-team-desc{{font-size:14px;color:var(--warm-gray);line-height:1.85}}

/* FAQ */
.faq-section{{padding:100px 0;background:#fff}}
.faq-list{{max-width:760px;margin:40px auto 0}}
.faq-item{{border-bottom:1px solid var(--border);padding:24px 0}}
.faq-q{{font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:12px;transition:color .2s}}
.faq-q:hover{{color:var(--gold)}}
.faq-q::before{{content:"Q";display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:var(--gold);color:#fff;border-radius:50%;font-family:"Inter",sans-serif;font-size:12px;font-weight:900;flex-shrink:0}}
.faq-a{{padding:16px 0 0 40px;font-size:14px;color:var(--warm-gray);line-height:2;display:none}}
.faq-item.active .faq-a{{display:block}}
.faq-item.active .faq-q{{color:var(--gold)}}

/* OFFICE */
.office-section{{padding:100px 0;background:var(--cream)}}
.office-grid{{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:48px}}
.office-map{{border-radius:6px;overflow:hidden;min-height:360px;background:#ddd}}
.office-map iframe{{width:100%;height:100%;border:0;min-height:360px}}
.office-detail-row{{display:flex;padding:14px 0;border-bottom:1px solid var(--border)}}
.office-detail-label{{font-weight:700;min-width:100px;color:var(--navy);flex-shrink:0;font-size:14px}}
.office-detail-value{{color:var(--warm-gray);line-height:1.7;font-size:14px}}

/* FINAL CTA */
.final-cta{{padding:80px 0;background:var(--navy);color:#fff;text-align:center}}
.final-cta-title{{font-family:"Noto Serif JP",serif;font-size:28px;font-weight:900;line-height:1.6;margin-bottom:16px}}
.final-cta-sub{{font-size:15px;color:rgba(255,255,255,.62);margin-bottom:36px;max-width:540px;margin-left:auto;margin-right:auto;line-height:2}}
.final-cta-box{{display:inline-flex;flex-direction:column;align-items:center;gap:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:40px 60px}}
.final-cta-tel{{font-family:"Inter",sans-serif;font-size:32px;font-weight:900;letter-spacing:1px;color:var(--gold)}}
.final-cta-tel small{{font-size:13px;font-weight:500;color:rgba(255,255,255,.55);display:block;letter-spacing:0;margin-top:4px}}
.final-cta-btn{{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:18px 48px;border-radius:4px;border:none;cursor:pointer;transition:all .2s;letter-spacing:.5px;width:100%}}
.final-cta-btn:hover{{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,151,90,.3)}}
.final-cta-benefits{{display:flex;gap:20px;margin-top:12px;flex-wrap:wrap;justify-content:center}}
.final-cta-benefit{{font-size:13px;color:rgba(255,255,255,.65);display:flex;align-items:center;gap:6px}}
.final-cta-benefit::before{{content:"";width:6px;height:6px;background:var(--gold);border-radius:50%}}

.site-footer{{padding:32px 0;background:var(--navy-light);color:rgba(255,255,255,.4);text-align:center;font-size:12px}}

/* FLOATING CTA */
.floating-cta{{display:none;position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(10,22,40,.96);backdrop-filter:blur(12px);padding:12px 16px;border-top:1px solid rgba(184,151,90,.3)}}
.floating-cta-inner{{display:flex;gap:10px;max-width:500px;margin:0 auto}}
.floating-cta .btn-tel,.floating-cta .btn-web{{flex:1;padding:14px 0;border-radius:4px;font-size:14px;font-weight:700;text-align:center;border:none;cursor:pointer;display:block}}
.floating-cta .btn-tel{{background:transparent;color:var(--gold);border:1px solid var(--gold)}}
.floating-cta .btn-web{{background:var(--gold);color:var(--navy)}}

/* RESPONSIVE */
@media(max-width:1024px){{
.hero-grid{{grid-template-columns:1fr}}
.hero-photo{{min-height:400px}}
.hero-text{{padding:48px 32px}}
.hero-h1{{font-size:28px}}
.whatis-points{{grid-template-columns:1fr}}
.whatis-box{{padding:40px 28px}}
.flow-steps{{grid-template-columns:repeat(2,1fr)}}
.flow-step::after{{display:none}}
.profile-card{{grid-template-columns:200px 1fr;gap:32px;padding:32px}}
}}
@media(max-width:768px){{
.header-tel{{display:none}}
.header-logo-text{{font-size:11px}}
.hero-grid{{grid-template-columns:1fr}}
.hero-photo{{min-height:320px}}
.hero-text{{padding:36px 20px}}
.hero-h1{{font-size:24px}}
.hero-tagline{{font-size:14px}}
.problem-cards{{grid-template-columns:1fr}}
.section-title{{font-size:24px}}
.whyus-grid{{grid-template-columns:1fr}}
.flow-steps{{grid-template-columns:1fr}}
.flow-step::after{{display:none}}
.office-grid{{grid-template-columns:1fr}}
.profile-card{{grid-template-columns:1fr;text-align:center;padding:28px 20px}}
.profile-photo{{max-width:240px;margin:0 auto}}
.final-cta-box{{padding:28px 24px;width:100%}}
.final-cta-tel{{font-size:24px}}
.floating-cta{{display:block}}
body{{padding-bottom:70px}}
.final-cta-title{{font-size:22px}}
}}
</style>
</head>
<body>

<header class="site-header" id="site-header">
<div class="header-inner">
<div class="header-logo">
<div class="header-logo-text">弁護士法人<br>東京新橋法律事務所<small>Tokyo Shimbashi Law Office</small></div>
</div>
<div class="header-right">
<div class="header-tel">03-6281-5147<small>相続・終活専用（平日10:00-19:00）</small></div>
<a href="#contact" class="header-cta">無料相談を予約 &rarr;</a>
</div>
</div>
</header>

<section class="hero">
<div class="hero-grid">
<div class="hero-photo">
<img src="{maeda_b64}" alt="代表弁護士 前田祥夢">
<div class="hero-photo-overlay">
<div class="hero-photo-name">前田 祥夢</div>
<div class="hero-photo-role">代表弁護士｜早稲田大学法科大学院卒｜東京弁護士会所属</div>
</div>
</div>
<div class="hero-text">
<div class="hero-label">死後事務委任 &times; 寺院連携</div>
<div class="hero-badges">
<span class="hero-badge">初回相談無料</span>
<span class="hero-badge">弁護士8名体制</span>
<span class="hero-badge">銀座</span>
</div>
<h1 class="hero-h1">あなたが逝った翌日、<br><span class="accent">誰が動きますか。</span></h1>
<p class="hero-tagline">行政届出、銀行口座の凍結解除、賃貸の明渡し、<br>携帯電話の解約、葬儀の手配、納骨&mdash;&mdash;<br>死後に必要な手続きを、弁護士と寺院が<br>連携してすべて引き受けます。</p>
<div class="hero-cta-wrap">
<a href="#contact" class="hero-cta-btn">まずは無料で相談する &rarr;</a>
<p class="hero-sub-info">秘密厳守・出張面談可・オンライン対応可</p>
</div>
</div>
</div>
</section>

<section class="problem-section fade-in">
<div class="container">
<div class="section-label label-font">Problem</div>
<h2 class="section-title">「死んだ後のことは、<br>考えたくない」&mdash;&mdash;本当にそれでいいですか？</h2>
<p class="section-lead">多くの方が「死後の手続き」を先送りにしています。しかし、あなたが亡くなった後に残るのは、膨大な事務手続きと、それを処理しなければならない誰かの負担です。</p>
<div class="problem-cards">
<div class="problem-card">
<span class="problem-num">01</span>
<div class="problem-icon" style="font-size:20px">&#x1F4CB;</div>
<h3 class="problem-title">死後の手続きは、<br>想像以上に多い</h3>
<p class="problem-desc">死亡届の提出から始まり、年金の停止、保険の手続き、銀行口座の解約、不動産の名義変更、各種契約の解除&mdash;&mdash;行政・金融・生活インフラにまたがる手続きが、すべて遺族に降りかかります。</p>
</div>
<div class="problem-card">
<span class="problem-num">02</span>
<div class="problem-icon" style="font-size:20px">&#x23F0;</div>
<h3 class="problem-title">手続きの大半は、<br>平日昼間のみ</h3>
<p class="problem-desc">役所も銀行も平日の日中しか対応していません。働いている家族は、何日も仕事を休まなければなりません。おひとりさまの場合、手続きをする人がそもそもいないケースも。</p>
</div>
<div class="problem-card">
<span class="problem-num">03</span>
<div class="problem-icon" style="font-size:20px">&#x26A0;</div>
<h3 class="problem-title">放置すれば、<br>社会的リスクに</h3>
<p class="problem-desc">手続きを放置すると、賃貸契約の残債、未払いの公共料金、凍結された銀行口座の相続手続きの複雑化など、残された人や社会に大きな負担をかけることになります。</p>
</div>
</div>
</div>
</section>

<section class="whatis-section fade-in">
<div class="container">
<div class="whatis-box">
<div class="whatis-inner">
<div class="section-label label-font whatis-label">Solution</div>
<h2 class="whatis-title">死後事務委任契約とは&mdash;&mdash;<br>「自分の死後」を、生前に法的に託す仕組み</h2>
<p class="whatis-desc">死後事務委任契約は、ご自身が亡くなった後に必要となる行政手続き・契約解除・葬儀手配・納骨などの事務を、信頼できる第三者（弁護士等）に生前から委任する法的な契約です。当事務所では、この契約に寺院との連携を組み合わせ、法的手続きから供養まで一貫して対応します。</p>
<div class="whatis-points">
<div class="whatis-point">
<div class="whatis-point-icon">1</div>
<div class="whatis-point-text"><strong>行政届出・契約解除</strong>死亡届、年金停止、保険手続き、銀行口座解約、賃貸契約の明渡し、公共料金の精算など</div>
</div>
<div class="whatis-point">
<div class="whatis-point-icon">2</div>
<div class="whatis-point-text"><strong>葬儀・納骨・永代供養</strong>提携寺院と連携し、葬儀の手配から納骨、永代供養まで、宗派を問わず対応</div>
</div>
<div class="whatis-point">
<div class="whatis-point-icon">3</div>
<div class="whatis-point-text"><strong>遺言執行・相続手続き</strong>遺言書の作成から執行まで弁護士が一貫して対応。相続放棄や限定承認にも対応</div>
</div>
<div class="whatis-point">
<div class="whatis-point-icon">4</div>
<div class="whatis-point-text"><strong>生前の見守り・定期連絡</strong>契約後もお元気なうちから定期的にご連絡。状況の変化に合わせて契約内容を見直し</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section class="flow-section fade-in">
<div class="container">
<div class="section-label label-font">Flow</div>
<h2 class="section-title">ご相談から契約、そして執行まで</h2>
<p class="section-lead">まずは無料相談から。ご状況に合わせて最適なプランをご提案します。</p>
<div class="flow-steps">
<div class="flow-step">
<div class="flow-step-num label-font">STEP 01</div>
<div class="flow-step-icon">&#x1F4AC;</div>
<h3 class="flow-step-title">無料相談</h3>
<p class="flow-step-desc">対面・オンライン・出張いずれも可。ご状況やご希望を丁寧にお伺いします。</p>
</div>
<div class="flow-step">
<div class="flow-step-num label-font">STEP 02</div>
<div class="flow-step-icon">&#x1F4DD;</div>
<h3 class="flow-step-title">プラン設計・契約</h3>
<p class="flow-step-desc">死後に必要な手続きを整理し、委任内容を明確にした契約書を作成します。</p>
</div>
<div class="flow-step">
<div class="flow-step-num label-font">STEP 03</div>
<div class="flow-step-icon">&#x1F91D;</div>
<h3 class="flow-step-title">生前の見守り</h3>
<p class="flow-step-desc">契約後も定期的にご連絡。ご状況の変化に応じて契約内容を柔軟に見直します。</p>
</div>
<div class="flow-step">
<div class="flow-step-num label-font">STEP 04</div>
<div class="flow-step-icon">&#x1F54A;</div>
<h3 class="flow-step-title">死後事務の執行</h3>
<p class="flow-step-desc">万一の際、弁護士が速やかに全手続きを遂行。提携寺院が葬儀・供養を担当します。</p>
</div>
</div>
</div>
</section>

<section class="whyus-section fade-in">
<div class="container">
<div class="section-label label-font">Why Us</div>
<h2 class="section-title">東京新橋法律事務所が選ばれる理由</h2>
<p class="section-lead">弁護士法人として、法的な確実性と、寺院連携による精神的な安心の両方を提供します。</p>
<div class="whyus-grid">
<div class="whyus-card">
<div class="whyus-num label-font">REASON 01</div>
<h3 class="whyus-title">弁護士8名体制。<br>法人としての継続性</h3>
<p class="whyus-desc">個人の弁護士ではなく、弁護士法人が契約主体。担当弁護士に万一のことがあっても、法人として責任を持って死後事務を遂行します。元検事を含む8名の弁護士体制で、相続紛争にも対応可能です。</p>
</div>
<div class="whyus-card">
<div class="whyus-num label-font">REASON 02</div>
<h3 class="whyus-title">寺院連携。<br>法律と供養の一体対応</h3>
<p class="whyus-desc">弁護士が行政手続きや契約解除を担い、提携寺院が葬儀・納骨・永代供養を担当。法的手続きと供養を分断させず、一つの窓口で完結します。宗派を問わずご対応可能です。</p>
</div>
<div class="whyus-card">
<div class="whyus-num label-font">REASON 03</div>
<h3 class="whyus-title">相続問題にも強い。<br>ワンストップ対応</h3>
<p class="whyus-desc">当事務所は相続問題（遺産分割、遺留分、遺言書作成・執行、成年後見）を主要取扱分野としています。死後事務委任と相続対策を一体で設計でき、二度手間がありません。</p>
</div>
</div>
</div>
</section>

<section class="profile-section fade-in">
<div class="container">
<div class="section-label label-font">Lawyer</div>
<h2 class="section-title">担当弁護士のご紹介</h2>
<div class="profile-card">
<div class="profile-photo">
<img src="{maeda_b64}" alt="代表弁護士 前田祥夢">
</div>
<div class="profile-info">
<div class="profile-position label-font">Representative Lawyer</div>
<h3 class="profile-name">前田 祥夢</h3>
<p class="profile-name-en">Yoshimu Maeda</p>
<p class="profile-bio">早稲田大学法科大学院修了（2015年）。リクルートでのビジネス経験を経て弁護士に転身。2021年に弁護士法人東京新橋法律事務所を設立。「弁護士はサービス業である」を信条に、法律の専門性とビジネス感覚を融合させた課題解決型のリーガルサービスを提供。相続・終活分野では、単なる法的手続きにとどまらず、依頼者の人生の最終章を尊厳をもって締めくくるための包括的なサポートを目指しています。</p>
<dl class="profile-career">
<dt>所属</dt>
<dd>東京弁護士会</dd>
<dt>経歴</dt>
<dd>早稲田大学法科大学院卒 &rarr; リクルート勤務 &rarr; 2021年 弁護士法人東京新橋法律事務所設立</dd>
</dl>
<div class="profile-team">
<h4 class="profile-team-title">チーム体制</h4>
<p class="profile-team-desc">当事務所には、元検事の弁護士を含む8名の弁護士が在籍。さらに、顧問弁護士（元検事）および大阪の提携弁護士2名（社会保険労務士資格保有）と連携し、東京・大阪の二拠点体制で対応しています。</p>
</div>
</div>
</div>
</div>
</section>

<section class="faq-section fade-in">
<div class="container">
<div class="section-label label-font">FAQ</div>
<h2 class="section-title">よくあるご質問</h2>
<div class="faq-list">
<div class="faq-item active">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">死後事務委任契約とは何ですか？</div>
<div class="faq-a">ご本人が亡くなった後に発生する各種手続き（行政届出、銀行口座の解約、賃貸契約の解除、葬儀の手配など）を、生前のうちに弁護士等に委任しておく契約です。法的に有効な委任契約として、ご本人の意思に基づいて確実に手続きが遂行されます。</div>
</div>
<div class="faq-item">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">身寄りがなくても利用できますか？</div>
<div class="faq-a">はい、おひとりさまの方にこそご活用いただきたいサービスです。身寄りのない方の場合、死後の手続きを行う人がいないため、弁護士法人が確実に手続きを遂行する本サービスの意義が特に大きくなります。</div>
</div>
<div class="faq-item">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">費用はどのくらいかかりますか？</div>
<div class="faq-a">ご状況やご希望の内容によって異なります。初回相談は無料ですので、まずはお気軽にご相談ください。ご状況を伺った上で、明確な費用をご提示いたします。分割払いにも対応しております。</div>
</div>
<div class="faq-item">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">宗派が違っても対応できますか？</div>
<div class="faq-a">はい、宗派を問わず対応可能です。ご本人のご希望の宗派・寺院がある場合はそちらと連携し、特にご希望がない場合は当事務所の提携寺院をご紹介いたします。</div>
</div>
<div class="faq-item">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">契約後に内容を変更できますか？</div>
<div class="faq-a">はい、ご状況の変化（転居、財産状況の変化、ご希望の変更等）に応じて、契約内容を見直すことが可能です。定期的なご連絡の中で、必要に応じて更新のご提案をいたします。</div>
</div>
<div class="faq-item">
<div class="faq-q" onclick="this.parentElement.classList.toggle('active')">遺言書の作成も一緒にお願いできますか？</div>
<div class="faq-a">はい、当事務所は相続問題（遺言書作成・遺言執行、遺産分割、遺留分、成年後見・財産管理等）を主要取扱分野としています。死後事務委任と遺言を一体で設計することで、より確実で漏れのない終活プランをお作りできます。</div>
</div>
</div>
</div>
</section>

<section class="office-section fade-in">
<div class="container">
<div class="section-label label-font">Office</div>
<h2 class="section-title">事務所情報</h2>
<div class="office-grid">
<div class="office-map">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d810.4!2d139.7584!3d35.6654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bc3b1d6e7e1%3A0x5e3f5e3e3d7b7b7b!2z5p2x5Lqs6YO95Lit5aSu5Yy66YqA5bqnOC0yMC0zMw!5e0!3m2!1sja!2sjp!4v1" allowfullscreen loading="lazy"></iframe>
</div>
<div class="office-details">
<div class="office-detail-row">
<div class="office-detail-label">事務所名</div>
<div class="office-detail-value">弁護士法人 東京新橋法律事務所</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">代表</div>
<div class="office-detail-value">弁護士 前田 祥夢（東京弁護士会所属）</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">所在地</div>
<div class="office-detail-value">&lang;104-0061&rang;<br>東京都中央区銀座8丁目20番33号<br>ACN銀座8ビル 3F・4F</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">電話番号</div>
<div class="office-detail-value">03-6273-3254（代表）<br>03-6281-5147（相続・終活専用）</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">メール</div>
<div class="office-detail-value">info@tslaw.or.jp</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">営業時間</div>
<div class="office-detail-value">平日 10:00〜19:00<br>※時間外は事前予約で対応可</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">アクセス</div>
<div class="office-detail-value">JR新橋駅 徒歩7分<br>築地市場駅 徒歩5分<br>汐留駅 徒歩5分</div>
</div>
<div class="office-detail-row">
<div class="office-detail-label">設立</div>
<div class="office-detail-value">2021年1月</div>
</div>
</div>
</div>
</div>
</section>

<section class="final-cta" id="contact">
<div class="container">
<h2 class="final-cta-title serif">まずは、話してみることから。</h2>
<p class="final-cta-sub">「死後のことを考えるのはまだ早い」と思うかもしれません。<br>しかし、元気なうちにしか、自分の意思を託すことはできません。<br>初回相談は無料です。まずはお気軽にお問い合わせください。</p>
<div class="final-cta-box">
<div class="final-cta-tel">03-6281-5147<small>相続・終活専用ダイヤル（平日10:00-19:00）</small></div>
<a href="tel:03-6281-5147" class="final-cta-btn">電話で無料相談を予約する &rarr;</a>
<div class="final-cta-benefits">
<span class="final-cta-benefit">初回相談無料</span>
<span class="final-cta-benefit">秘密厳守</span>
<span class="final-cta-benefit">出張面談可</span>
<span class="final-cta-benefit">オンライン対応可</span>
</div>
</div>
</div>
</section>

<footer class="site-footer">
<div class="container">
<p>&copy; 2021- 弁護士法人 東京新橋法律事務所 All Rights Reserved.</p>
</div>
</footer>

<div class="floating-cta">
<div class="floating-cta-inner">
<a href="tel:03-6281-5147" class="btn-tel">&#x1F4DE; 電話で相談</a>
<a href="#contact" class="btn-web">無料相談を予約 &rarr;</a>
</div>
</div>

<script>
var observer=new IntersectionObserver(function(e){{e.forEach(function(t){{if(t.isIntersecting)t.target.classList.add("is-visible")}});}},{{threshold:0.1}});
document.querySelectorAll(".fade-in").forEach(function(el){{observer.observe(el)}});
var header=document.getElementById("site-header");
window.addEventListener("scroll",function(){{header.classList.toggle("scrolled",window.scrollY>20)}});
document.querySelectorAll('a[href^="#"]').forEach(function(a){{a.addEventListener("click",function(e){{e.preventDefault();var t=document.querySelector(this.getAttribute("href"));if(t)t.scrollIntoView({{behavior:"smooth"}})}});}});
</script>
</body>
</html>'''

output_path = r'C:\Users\user\Desktop\claudeマスター\lp_shigo_jimu_v2.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"LP written: {os.path.getsize(output_path)} bytes")
