#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

d = 'C:/Users/user/Desktop/claudeマスター/交通提案/b64/'

def read_b64(name):
    with open(d + name) as f:
        return f.read().strip()

# High quality lawyer photos
b = {
    'maeda2': read_b64('maeda2_jpg_hq.txt'),
    'yamane': read_b64('yamane_jpg_hq.txt'),
    'nisimura': read_b64('nisimura_jpg_hq.txt'),
    'yakura': read_b64('yakura_jpg_hq.txt'),
    'hurusawa': read_b64('hurusawa_jpg_hq.txt'),
    'kawahara': read_b64('kawahara_jpg_hq.txt'),
    'sasanuma': read_b64('sasanuma_jpg_hq.txt'),
    'hamamatsu': read_b64('hamamatsu_jpg_hq.txt'),
    'maeda_g': read_b64('maeda_greeting_hq.txt'),
    'logo': read_b64('logo.txt'),
    # Office material photos
    'mat_2558': read_b64('IMG_2558_mat.txt'),
    'mat_2560': read_b64('IMG_2560_mat.txt'),
    'mat_2563': read_b64('IMG_2563_mat.txt'),
    'mat_hama': read_b64('hamamatsu.no1_mat.txt'),
}

def img(key, fmt='jpeg'):
    if fmt == 'png':
        return f'data:image/png;base64,{b[key]}'
    return f'data:image/jpeg;base64,{b[key]}'

TOTAL = 15

html = f'''<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>弁護士法人 東京新橋法律事務所｜事務所案内</title>
  <style>
    :root{{
      --bg:#ffffff;
      --txt:#0a0f1a;
      --muted:#1e293b;
      --soft:#334155;
      --line:#e2e8f0;
      --card:#ffffff;
      --shadow: 0 18px 40px rgba(15,23,42,.08);
      --a:#4f46e5;
      --b:#06b6d4;
      --c:#22c55e;
      --radius: 22px;
    }}

    *{{ box-sizing:border-box; }}
    html,body{{ height:100%; }}
    body{{
      margin:0;
      font-family: "Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic","Meiryo",
                   ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(900px 650px at 10% 8%, rgba(79,70,229,.08), transparent 60%),
        radial-gradient(900px 650px at 90% 10%, rgba(6,182,212,.07), transparent 60%),
        radial-gradient(900px 650px at 80% 95%, rgba(34,197,94,.06), transparent 60%),
        var(--bg);
      overflow:hidden;
    }}

    /* ===== TOPBAR ===== */
    .topbar{{
      display:flex; align-items:center; justify-content:space-between;
      padding:14px 18px;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,.86);
      backdrop-filter: blur(8px);
    }}
    .brand{{ display:flex; align-items:center; gap:12px; }}
    .mark{{
      width:34px; height:34px; border-radius:12px;
      background: linear-gradient(135deg, var(--a), var(--b));
      box-shadow: 0 12px 26px rgba(79,70,229,.18);
      position:relative; overflow:hidden;
    }}
    .mark:after{{
      content:""; position:absolute; inset:-30%;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), transparent 45%);
      transform: rotate(18deg); opacity:.6;
    }}
    .b1{{ font-weight:900; letter-spacing:.01em; }}
    .b2{{ font-size:12px; color:var(--soft); margin-top:2px; }}

    .controls{{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-end; }}
    .btn{{
      border:1px solid var(--line); background:#fff; color:var(--txt);
      padding:10px 12px; border-radius:14px; font-weight:700;
      cursor:pointer; user-select:none;
      transition: transform .08s ease, background .18s ease;
      box-shadow: 0 10px 20px rgba(15,23,42,.05);
    }}
    .btn:hover{{ background:#f8fafc; }}
    .btn:active{{ transform: translateY(1px); }}
    .kbd{{
      font-size:12px; padding:6px 10px; border:1px solid var(--line);
      border-bottom-width:2px; background:#fff; border-radius:12px; color:var(--soft);
    }}
    .progress{{ min-width:220px; display:flex; gap:10px; align-items:center; }}
    .bar{{
      flex:1; height:10px; border-radius:999px;
      border:1px solid var(--line); background:#f1f5f9; overflow:hidden;
    }}
    .bar > i{{
      display:block; height:100%; width:0%;
      background: linear-gradient(90deg, var(--a), var(--b), var(--c));
      border-radius:999px; transition: width .25s ease;
    }}
    .ptext{{ font-size:12px; color:var(--soft); min-width:74px; text-align:right; }}

    /* ===== STAGE ===== */
    .stage{{
      height: calc(100vh - 62px);
      display:flex; align-items:center; justify-content:center;
      padding: 12px 20px;
    }}
    .canvas{{
      /* Height-first: fit to available height, then derive width from 16:9 */
      height: 100%;
      max-height: calc(100vh - 86px);
      aspect-ratio: 16 / 9;
      max-width: 100%;
      border-radius: 26px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.92);
      box-shadow: var(--shadow);
      overflow:hidden;
      position:relative;
    }}
    .slides{{ position:absolute; inset:0; }}
    .slide{{
      position:absolute; inset:0;
      padding: 20px 48px 36px;
      display:none;
      flex-direction:column;
    }}
    .slide.active{{ display:flex; }}

    /* ===== TYPOGRAPHY (darker) ===== */
    h1,h2,h3{{ margin:0; }}
    .h0{{ font-size: 52px; line-height: 1.12; letter-spacing:.01em; font-weight:900; color:#0a0f1a; }}
    .h1{{ font-size: 36px; line-height: 1.18; font-weight:800; color:#0a0f1a; }}
    .h2{{ font-size: 22px; line-height: 1.25; font-weight:800; color:#0a0f1a; }}
    .lead{{ font-size: 17px; line-height: 1.75; color:var(--muted); max-width:1020px; }}
    .small{{ font-size: 13px; color:var(--soft); line-height:1.7; }}

    .pill{{
      display:inline-flex; align-items:center; gap:8px;
      padding: 7px 14px; border-radius:999px;
      border:1px solid var(--line); background:#fff;
      color:var(--soft); font-size:12px; font-weight:600;
    }}
    .accentLine{{
      width:92px; height:10px; border-radius:999px;
      background: linear-gradient(90deg, var(--a), var(--b), var(--c));
      margin-top:16px;
    }}
    .divider{{ height:1px; background:var(--line); margin:10px 0; }}

    /* ===== GRIDS ===== */
    .grid2{{ display:grid; grid-template-columns:1.05fr .95fr; gap:14px; margin-top:14px; }}
    .grid2eq{{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:12px; }}
    .grid3{{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:14px; }}

    .card{{
      background:var(--card); border:1px solid var(--line);
      border-radius:var(--radius); padding:18px;
      box-shadow: 0 14px 34px rgba(15,23,42,.06);
    }}
    .card.soft{{
      background:#f8fafc; border-color:#e5e7eb; box-shadow:none;
    }}

    .bullets{{ margin:0; padding-left:18px; color:var(--muted); line-height:1.85; font-weight:500; }}
    .bullets li{{ margin:8px 0; }}

    .mini{{
      padding:16px; border-radius:18px;
      border:1px solid var(--line); background:#fff;
    }}
    .mini .k{{ font-size:12px; color:var(--soft); font-weight:600; }}
    .mini .v{{ font-size:22px; font-weight:900; margin-top:6px; color:#0a0f1a; }}

    .quote{{
      border-left: 4px solid rgba(79,70,229,.35);
      color:var(--muted); line-height:1.85; font-size:14px;
      margin-top:10px; background:rgba(79,70,229,.04);
      border-radius:14px; padding:12px 12px 12px 14px;
    }}

    /* ===== THEME DIVIDER (large centered) ===== */
    .theme-divider{{
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      flex:1; text-align:center;
    }}
    .theme-divider .pill{{ margin-bottom:20px; }}
    .theme-divider .h0{{ font-size:68px; }}
    .theme-divider .accentLine{{ margin:20px auto 0; }}
    .theme-divider .lead{{ margin-top:24px; text-align:center; font-size:20px; }}

    /* ===== LAWYER CARDS ===== */
    .lawyer-row{{
      display:grid; grid-template-columns:1fr 1fr;
      gap:18px; margin-top:8px; flex:1;
      min-height:0;
    }}
    .lawyer-card{{
      border-radius:22px; border:1px solid var(--line);
      background:#fff; overflow:hidden;
      display:flex; flex-direction:row;
      box-shadow: 0 14px 30px rgba(15,23,42,.05);
    }}
    .lawyer-photo{{
      width:170px; min-height:200px; flex-shrink:0;
      overflow:hidden;
      background:
        radial-gradient(180px 140px at 20% 20%, rgba(79,70,229,.12), transparent 62%),
        radial-gradient(180px 140px at 80% 20%, rgba(6,182,212,.10), transparent 62%),
        #f1f5f9;
      display:flex; align-items:center; justify-content:center;
    }}
    .lawyer-photo img{{
      width:100%; height:100%; object-fit:cover;
      image-rendering: auto;
    }}
    .lawyer-info{{
      padding:18px; display:flex; flex-direction:column;
      justify-content:center; flex:1;
    }}
    .lawyer-name{{ font-weight:900; font-size:19px; margin-bottom:4px; color:#0a0f1a; }}
    .lawyer-title{{ font-size:12px; font-weight:600; color:var(--soft); }}
    .lawyer-meta{{ color:var(--soft); font-size:12px; margin-bottom:10px; font-weight:500; }}
    .lawyer-detail{{ color:var(--muted); font-size:12.5px; line-height:1.65; margin:0; }}
    .lawyer-detail dt{{ font-weight:700; color:#0a0f1a; margin-top:5px; font-size:11.5px; }}
    .lawyer-detail dd{{ margin:0; }}

    /* ===== PHOTO GALLERY ===== */
    .gallery{{
      display:grid; grid-template-columns:1fr 1fr;
      grid-template-rows:1fr 1fr;
      gap:10px; flex:1; margin-top:0;
      min-height:0;
    }}
    .gallery-item{{
      border-radius:16px; overflow:hidden;
      border:1px solid var(--line);
      box-shadow: 0 10px 24px rgba(15,23,42,.06);
      position:relative;
      min-height:0;
    }}
    .gallery-item img{{
      width:100%; height:100%; object-fit:cover; display:block;
    }}
    .gallery-label{{
      position:absolute; bottom:10px; left:10px;
      background:rgba(255,255,255,.88); backdrop-filter:blur(6px);
      padding:5px 12px; border-radius:10px;
      font-size:11px; font-weight:700; color:#0a0f1a;
    }}

    /* ===== GREETING ===== */
    .greeting-photo{{
      width:200px; height:260px;
      border-radius:18px; overflow:hidden;
      border:1px solid var(--line);
      box-shadow: 0 14px 30px rgba(15,23,42,.08);
      flex-shrink:0;
    }}
    .greeting-photo img{{
      width:100%; height:100%; object-fit:cover;
    }}

    /* ===== FOOTER ===== */
    .footer{{
      position:absolute; left:48px; right:48px; bottom:10px;
      display:flex; align-items:center; justify-content:space-between;
      color:var(--soft); font-size:11px;
    }}

    /* ===== COVER SLIDE ===== */
    .cover-bg{{
      position:absolute; inset:0;
      background:
        radial-gradient(ellipse 900px 600px at 15% 80%, rgba(79,70,229,.22), transparent 55%),
        radial-gradient(ellipse 800px 500px at 85% 20%, rgba(6,182,212,.20), transparent 55%),
        radial-gradient(ellipse 600px 400px at 50% 50%, rgba(34,197,94,.10), transparent 55%),
        linear-gradient(135deg, #f8fafc 0%, #eef2ff 40%, #ecfeff 70%, #f0fdf4 100%);
    }}
    .cover-accent-top{{
      position:absolute; top:0; left:0; right:0; height:5px;
      background: linear-gradient(90deg, var(--a), var(--b), var(--c));
    }}
    .cover-accent-bot{{
      position:absolute; bottom:0; left:0; right:0; height:5px;
      background: linear-gradient(90deg, var(--c), var(--b), var(--a));
    }}
    .cover-content{{
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      flex:1; text-align:center;
      position:relative; z-index:1;
    }}
    .cover-logo{{ height:44px; margin-bottom:32px; filter:drop-shadow(0 4px 12px rgba(0,0,0,.08)); }}
    .cover-line{{
      width:60px; height:3px; border-radius:999px;
      background: linear-gradient(90deg, var(--a), var(--b));
      margin:0 auto 28px;
    }}
    .cover-title{{
      font-size:52px; font-weight:900; letter-spacing:.04em; color:#0a0f1a;
      line-height:1.2;
    }}
    .cover-subtitle{{
      font-size:18px; color:var(--soft); margin-top:12px; font-weight:500;
      letter-spacing:.06em;
    }}
    .cover-to{{
      margin-top:44px; font-size:17px; color:#1e293b;
      border:none; border-radius:14px;
      padding:14px 40px; font-weight:700;
      background: linear-gradient(135deg, rgba(79,70,229,.08), rgba(6,182,212,.08));
      border: 1px solid rgba(79,70,229,.15);
      box-shadow: 0 8px 24px rgba(79,70,229,.08);
    }}
    .cover-date{{
      margin-top:18px; font-size:13px; color:var(--soft); font-weight:500;
    }}
    .cover-orbs{{
      position:absolute; inset:0; overflow:hidden; pointer-events:none;
    }}
    .cover-orbs::before{{
      content:''; position:absolute;
      width:320px; height:320px; border-radius:50%;
      background: radial-gradient(circle, rgba(79,70,229,.12), transparent 70%);
      top:-80px; right:-60px;
    }}
    .cover-orbs::after{{
      content:''; position:absolute;
      width:260px; height:260px; border-radius:50%;
      background: radial-gradient(circle, rgba(6,182,212,.10), transparent 70%);
      bottom:-60px; left:-40px;
    }}

    /* ===== PRINT ===== */
    @media print{{
      @page{{ size:297mm 167mm; margin:0; }}
      *{{ -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }}
      html,body{{
        width:297mm; height:auto;
        overflow:visible !important;
        background:#fff !important;
        margin:0; padding:0;
      }}
      .topbar{{ display:none !important; }}
      .printDeck{{ display:none !important; }}

      /* Unwrap stage/canvas so slides flow naturally */
      .stage{{
        display:block !important;
        height:auto !important;
        padding:0 !important;
        overflow:visible !important;
      }}
      .canvas{{
        width:297mm !important;
        height:auto !important;
        max-height:none !important;
        aspect-ratio:auto !important;
        border:none !important;
        border-radius:0 !important;
        box-shadow:none !important;
        background:transparent !important;
        overflow:visible !important;
        position:static !important;
      }}
      .slides{{
        position:static !important;
      }}

      /* Each slide becomes a full print page */
      .slide{{
        display:flex !important;
        flex-direction:column;
        position:relative !important;
        width:297mm !important;
        height:167mm !important;
        inset:auto !important;
        page-break-after:always;
        page-break-inside:avoid;
        overflow:hidden;
        background:#ffffff;
      }}
      .slide:last-child{{
        page-break-after:auto;
      }}
    }}
    .printDeck{{ display:none; }}
  </style>
</head>

<body>
  <div class="topbar">
    <div class="brand">
      <div class="mark" aria-hidden="true"></div>
      <div>
        <div class="b1">弁護士法人 東京新橋法律事務所</div>
        <div class="b2">事務所案内</div>
      </div>
    </div>
    <div class="controls">
      <button class="btn" id="prevBtn">&larr; 前へ</button>
      <button class="btn" id="nextBtn">次へ &rarr;</button>
      <button class="btn" id="printBtn">PDFにする（印刷）</button>
      <span class="kbd">&larr; / &rarr;</span>
      <div class="progress">
        <div class="bar"><i id="barFill"></i></div>
        <div class="ptext" id="ptext">1 / {TOTAL}</div>
      </div>
    </div>
  </div>

  <div class="stage">
    <div class="canvas">
      <div class="slides">

        <!-- ==================== SLIDE 1: COVER ==================== -->
        <section class="slide active" style="padding:0;">
          <div class="cover-bg"></div>
          <div class="cover-orbs"></div>
          <div class="cover-accent-top"></div>
          <div class="cover-accent-bot"></div>
          <div class="cover-content">
            <img src="{img('logo','png')}" alt="東京新橋法律事務所" class="cover-logo" />
            <div class="cover-line"></div>
            <div class="cover-title">事務所のご案内</div>
            <div class="cover-subtitle">弁護士法人 東京新橋法律事務所</div>
            <div class="cover-to">三井住友海上火災保険株式会社　御中</div>
            <div class="cover-date">2026年3月</div>
          </div>
          <div class="footer" style="bottom:14px; left:56px; right:56px;">
            <div>&copy; Tokyo Shimbashi Law Office</div>
            <div>1 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 2: INTRO ==================== -->
        <section class="slide">
          <div style="position:relative; z-index:1;">
            <div class="pill">Office Introduction</div>
            <div style="height:14px"></div>
            <div class="h0" style="font-size:48px;">事務所のご紹介</div>
            <div class="accentLine"></div>
            <p class="lead" style="margin-top:18px; max-width:750px;">
              初めまして。弁護士法人 東京新橋法律事務所です。<br/>
              本資料は、弊所の概要や雰囲気を知っていただくための簡単なご案内です。
            </p>
            <div class="grid2" style="margin-top:22px;">
              <div class="card">
                <div class="h2">構成（4テーマ）</div>
                <div class="divider"></div>
                <ul class="bullets">
                  <li>事務所概要（所在地・体制・基本情報）</li>
                  <li>分野・こだわり（経験分野／コンセプト／品質づくり）</li>
                  <li>弁護士紹介（写真・自己紹介）</li>
                  <li>代表挨拶</li>
                </ul>
              </div>
              <div class="card soft">
                <div class="h2">ご担当者様へ</div>
                <div class="divider"></div>
                <p class="lead" style="max-width:unset; font-size:15px;">
                  貴社とは個人的なご縁もございますが、業務としては「事務所として」窓口を持ち、
                  相談しやすい形でご一緒できればと考えております。<br/>
                  資料送付後、担当弁護士より改めてご挨拶の機会も頂戴できれば幸いです。
                </p>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>&copy; Tokyo Shimbashi Law Office</div>
            <div>2 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 3: THEME 01 DIVIDER ==================== -->
        <section class="slide">
          <div class="theme-divider">
            <div class="pill">Theme 01</div>
            <div class="h0">事務所概要</div>
            <div class="accentLine"></div>
            <p class="lead">所在地・アクセス・体制など、まずは基本情報のご案内です。</p>
          </div>
          <div class="footer">
            <div>Theme 01｜Overview</div>
            <div>3 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 4: OFFICE DETAIL ==================== -->
        <section class="slide">
          <div class="h1">事務所概要（基本情報）</div>
          <p class="lead" style="margin-top:10px;">
            銀座8丁目を拠点に、弁護士・スタッフのチームで案件対応しています。
          </p>
          <div class="grid2">
            <div class="card">
              <div class="h2">基本情報</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95; color:var(--muted);">
                <strong>事務所名</strong>：弁護士法人 東京新橋法律事務所<br/>
                <strong>代表弁護士</strong>：前田 祥夢<br/>
                <strong>設立</strong>：2021年1月<br/>
                <strong>電話番号</strong>：03-6273-3254<br/>
                <strong>所在地</strong>：東京都中央区銀座8丁目20-33　ACN銀座8ビル3階<br/>
                <strong>最寄駅</strong>：新橋駅（徒歩8分）、東銀座駅（徒歩6分）、築地市場駅（徒歩3分）等<br/>
                <strong>法律相談料</strong>：初回30分無料　以後30分5,000円<br/>
                <strong>HP</strong>：https://tslaw.or.jp/
              </div>
              <div class="divider"></div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <span class="pill">銀座8丁目</span>
                <span class="pill">新橋／東銀座／築地市場</span>
              </div>
            </div>
            <div class="card soft">
              <div class="h2">体制</div>
              <div class="divider"></div>
              <div class="grid3">
                <div class="mini">
                  <div class="k">Term</div>
                  <div class="v">6期目</div>
                  <div class="small">2021年1月設立</div>
                </div>
                <div class="mini">
                  <div class="k">Lawyers</div>
                  <div class="v">8名</div>
                  <div class="small">（4月より9名）</div>
                </div>
                <div class="mini">
                  <div class="k">Staff</div>
                  <div class="v">約30名</div>
                  <div class="small">中規模体制</div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="small" style="color:var(--muted);">お陰様で数多くのご依頼を賜り、本日まで何とか一歩一歩成長して参りました。</div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 01｜Overview</div>
            <div>4 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 5: OFFICE PHOTOS ==================== -->
        <section class="slide">
          <div style="display:flex; align-items:baseline; gap:18px; margin-bottom:2px;">
            <div class="h1" style="font-size:26px; white-space:nowrap;">事務所の様子</div>
            <span style="font-size:13px; color:var(--soft);">銀座のオフィスの雰囲気をご覧ください。</span>
          </div>
          <div class="gallery">
            <div class="gallery-item">
              <img src="{img('mat_2563')}" alt="受付" />
              <div class="gallery-label">エントランス・受付</div>
            </div>
            <div class="gallery-item">
              <img src="{img('mat_2560')}" alt="相談室" />
              <div class="gallery-label">相談室</div>
            </div>
            <div class="gallery-item">
              <img src="{img('mat_2558')}" alt="オフィス内" />
              <div class="gallery-label">オフィス内</div>
            </div>
            <div class="gallery-item">
              <img src="{img('mat_hama')}" alt="執務風景" />
              <div class="gallery-label">執務風景</div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 01｜Overview</div>
            <div>5 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 6: THEME 02 DIVIDER ==================== -->
        <section class="slide">
          <div class="theme-divider">
            <div class="pill">Theme 02</div>
            <div class="h0">分野・こだわり</div>
            <div class="accentLine"></div>
            <p class="lead">経験分野と、仕事の向き合い方をご紹介します。</p>
          </div>
          <div class="footer">
            <div>Theme 02｜Focus</div>
            <div>6 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 7: FOCUS DETAIL ==================== -->
        <section class="slide">
          <div class="h1">分野・こだわり</div>
          <p class="lead" style="margin-top:10px;">
            交通事故分野をはじめ、複数分野でのノウハウを積んで参りました。
          </p>
          <div class="grid2eq">
            <div class="card">
              <div class="h2">交通事故分野（実績）</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95; color:var(--muted);">
                交通事故分野においては、専門性の高い弁護士も複数人在籍し、<br/>
                <strong>類型で500件ほど受任実績</strong>がございます。<br/>
                軽微なものから、後遺障害1級に至るような事案まで、様々経験して参りました。
              </div>
              <div class="divider"></div>
              <div class="pill"><strong style="color:#0a0f1a;">受任実績</strong>：類型 約500件</div>
            </div>
            <div class="card soft">
              <div class="h2">コンセプト／品質づくり</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95; color:var(--muted);">
                <strong>コンセプト</strong>：「顧客提案力で負けない事務所」<br/>
                端なる法律屋になるのではなく、顧客の要望をしっかり理解するというアナログ的要素に注力しつつ、
                適切な論点設定のうえ、明確かつ「刺さる」打ち手を提案することに拘っています。<br/>
                法人のお客様では当然そうですが、個人のお客様であっても、同様のコンセプト、心がけの基、全分野一貫して、
                かかる力点を重視した業務遂行に努めています。
              </div>
              <div class="quote">
                サービス品質面では、属人化の解消による業務品質の標準化に努めています。
                案件管理担当（いわゆる「PM」に近い役割）のもと、自社オリジナルのシステム導入や、
                直近はAIによるアップデートを図り、より迅速かつ安定したサービス提供を心掛けています。
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 02｜Focus</div>
            <div>7 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 8: THEME 03 DIVIDER ==================== -->
        <section class="slide">
          <div class="theme-divider">
            <div class="pill">Theme 03</div>
            <div class="h0">弁護士紹介</div>
            <div class="accentLine"></div>
            <p class="lead">在籍する弁護士8名をご紹介いたします。</p>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>8 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 9: LAWYERS 1-2 ==================== -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('maeda2')}" alt="前田 祥夢" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">前田 祥夢 <span class="lawyer-title">代表弁護士</span></div>
                <div class="lawyer-meta">出身：北海道</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>お客様の事業や状況にとって何が望ましいのかを基点に発想すること</dd>
                  <dt>趣味・特技</dt>
                  <dd>高校バスケ観戦（特に福岡第一高校）、フットサル（する方）</dd>
                  <dt>好きな漫画</dt>
                  <dd>キングダム、スラムダンク</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('yamane')}" alt="山根 佑介" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">山根 佑介 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：広島県</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>レスポンスの速さ</dd>
                  <dt>趣味・特技</dt>
                  <dd>ゴルフ</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>野球</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>9 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 10: LAWYERS 3-4 ==================== -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('nisimura')}" alt="西村 哲郎" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">西村 哲郎 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：東京</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>丁寧な仕事・これを裏付ける確かな知識</dd>
                  <dt>趣味・特技</dt>
                  <dd>飲食店巡り</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>野球・ボクシング</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('yakura')}" alt="八倉 美緒" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">八倉 美緒 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：富山県</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>仕事は誠実に</dd>
                  <dt>趣味</dt>
                  <dd>寝ること</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>野球（観戦）</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>10 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 11: LAWYERS 5-6 ==================== -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('hurusawa')}" alt="古澤 亮太郎" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">古澤 亮太郎 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：大阪府生まれ 東京都育ち</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>常に勉強し続けること</dd>
                  <dt>趣味・特技</dt>
                  <dd>映画鑑賞</dd>
                  <dt>好きな映画</dt>
                  <dd>仁義なき戦い</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('kawahara')}" alt="川原 慎太郎" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">川原 慎太郎 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：佐賀県</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>幅広く方針を検討すること</dd>
                  <dt>趣味・特技</dt>
                  <dd>子供と遊ぶこと</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>サッカー</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>11 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 12: LAWYERS 7-8 ==================== -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('sasanuma')}" alt="笹沼 永浩" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">笹沼 永浩 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：栃木県宇都宮市</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>相談をいただく上での関係値作り、法務を超えた価値の提供</dd>
                  <dt>趣味・特技</dt>
                  <dd>サッカー、睡眠、お酒</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>サッカー</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('hamamatsu')}" alt="濱松 拓也" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">濱松 拓也 <span class="lawyer-title">所属弁護士</span></div>
                <div class="lawyer-meta">出身：広島県</div>
                <dl class="lawyer-detail">
                  <dt>弁護士として心掛けていること</dt>
                  <dd>丁寧な対応。依頼して良かったと思っていただけるように事案に向き合うこと</dd>
                  <dt>趣味</dt>
                  <dd>スポーツ（観戦も実際にするのも）。最近はゴルフや野球をしています</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>スポーツ全般（野球、ラグビー、大相撲は特によく観ています）</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>12 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 13: THEME 04 DIVIDER ==================== -->
        <section class="slide">
          <div class="theme-divider">
            <div class="pill">Theme 04</div>
            <div class="h0">代表挨拶</div>
            <div class="accentLine"></div>
            <p class="lead">代表弁護士 前田祥夢より、ご挨拶申し上げます。</p>
          </div>
          <div class="footer">
            <div>Theme 04｜Message</div>
            <div>13 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 14: GREETING ==================== -->
        <section class="slide" style="padding: 14px 40px 24px;">
          <div style="display:flex; align-items:center; gap:18px; margin-bottom:4px;">
            <div style="width:80px; height:80px; border-radius:50%; overflow:hidden; border:2px solid var(--line); box-shadow:0 8px 20px rgba(15,23,42,.08); flex-shrink:0;">
              <img src="{img('maeda_g')}" alt="前田 祥夢" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div>
              <div class="h1" style="font-size:22px; margin:0;">代表挨拶</div>
              <div style="font-weight:800; font-size:14px; color:var(--soft); margin-top:2px;">代表弁護士　前田 祥夢</div>
            </div>
          </div>
          <div class="card" style="padding:12px 16px; flex:1; min-height:0;">
            <div style="line-height:1.72; color:var(--muted); font-size:11.5px;">
              初めまして。東京新橋法律事務所の代表弁護士の前田と申します。<br/>
              弊所は、6期目を迎えております若い弁護士事務所です。弁護士8名（4月より9名）、スタッフ30名程度の中規模事務所です。お陰様で、数多くのご依頼を賜り、本日迄何とか1歩1歩成長して参りました。<br/><br/>
              弊所は、交通事故分野をはじめ、複数分野でのノウハウを積んで参りました。交通事故分野においては、専門性の高い弁護士も複数人在籍し、類型で500件ほど受任実績がございます。軽微なものから、後遺障害1級に至るような事案まで、様々経験して参りました。<br/><br/>
              弊所のコンセプトは、「顧客提案力で負けない事務所」です。端なる法律屋になるのではなく、顧客の要望をしっかり理解するというアナログ的要素をしっかりと注力しつつ、適切な論点設定をしたうえ、明確かつ「刺さる」打ち手を顧客に提案することに拘っています。法人のお客様では当然そうですが、個人のお客様であっても、同様のコンセプト、心がけの基、全分野一貫して、かかる力点を重視した業務遂行に努めています。<br/><br/>
              他方、サービス品質面においては、属人化の解消による業務品質の標準化に努めています。弊所は、案件管理担当（いわゆる「PM」に近い役割）の基、自社オリジナルのシステム導入や、直近はAIによるシステムのアップデートを図り、より迅速かつ安定したサービス提供を心掛けています。若い事務所であり、その意味で経験が十二分とは言えない面はあるかと存じますが、確かな顧客理解と提案力を基盤に、相応の事案処理実績を積ませて頂いた現状においては、他事務所様に決して劣らない業務遂行が可能だと思っています。<br/><br/>
              散文となり、誠に恐縮です。ささやかながら自己紹介としてお目通しいただけましたら幸いです。<br/>
              今後とも何卒よろしくお願い申し上げます。
            </div>
          </div>
          <div class="footer">
            <div>Theme 04｜Message</div>
            <div>14 / {TOTAL}</div>
          </div>
        </section>

        <!-- ==================== SLIDE 15: CLOSING ==================== -->
        <section class="slide" style="padding:0;">
          <div class="cover-bg"></div>
          <div class="cover-orbs"></div>
          <div class="cover-accent-top"></div>
          <div class="cover-accent-bot"></div>
          <div class="cover-content">
            <img src="{img('logo','png')}" alt="東京新橋法律事務所" class="cover-logo" />
            <div class="cover-line"></div>
            <div style="font-size:40px; font-weight:900; color:#0a0f1a; letter-spacing:.04em;">ご清覧ありがとうございました</div>
            <p style="font-size:16px; color:var(--soft); margin-top:18px; line-height:1.9; text-align:center; max-width:640px;">
              ご不明な点やご質問がございましたら、<br/>お気軽にお問い合わせください。<br/>
              今後とも何卒よろしくお願い申し上げます。
            </p>
            <div style="margin-top:32px; display:flex; gap:32px; font-size:14px; color:var(--muted);">
              <span>TEL：03-6273-3254</span>
              <span>https://tslaw.or.jp/</span>
            </div>
          </div>
          <div class="footer" style="bottom:14px; left:56px; right:56px;">
            <div>&copy; Tokyo Shimbashi Law Office</div>
            <div>15 / {TOTAL}</div>
          </div>
        </section>

      </div>
    </div>
  </div>

  <div class="printDeck" id="printDeck" aria-hidden="true"></div>

  <script>
    (function(){{
      const slides = Array.from(document.querySelectorAll(".slide"));
      const ptext = document.getElementById("ptext");
      const barFill = document.getElementById("barFill");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const printBtn = document.getElementById("printBtn");
      const printDeck = document.getElementById("printDeck");
      let idx = 0;

      function clamp(n,min,max){{ return Math.max(min, Math.min(max, n)); }}
      function render(){{
        slides.forEach((s,i)=> s.classList.toggle("active", i===idx));
        ptext.textContent = (idx+1) + " / " + slides.length;
        barFill.style.width = ((idx+1)/slides.length*100).toFixed(1) + "%";
        prevBtn.disabled = (idx===0);
        nextBtn.disabled = (idx===slides.length-1);
        prevBtn.style.opacity = prevBtn.disabled ? .55 : 1;
        nextBtn.style.opacity = nextBtn.disabled ? .55 : 1;
      }}
      function go(d){{ idx = clamp(idx+d, 0, slides.length-1); render(); }}

      prevBtn.addEventListener("click", ()=>go(-1));
      nextBtn.addEventListener("click", ()=>go(1));
      window.addEventListener("keydown", (e)=>{{
        if(e.key==="ArrowLeft") go(-1);
        if(e.key==="ArrowRight") go(1);
      }});

      printBtn.addEventListener("click", ()=>{{
        window.print();
      }});

      render();
    }})();
  </script>
</body>
</html>'''

output_path = 'C:/Users/user/Desktop/claudeマスター/交通提案/事務所紹介資料_完成版.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written to {output_path}')
print(f'File size: {len(html):,} bytes')
print(f'Total slides: {TOTAL}')
