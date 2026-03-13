#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

d = 'C:/Users/user/Desktop/claudeマスター/交通提案/b64/'

def read_b64(name):
    with open(d + name) as f:
        return f.read().strip()

b64 = {
    'maeda2': read_b64('maeda2_jpg.txt'),
    'yamane': read_b64('yamane_jpg.txt'),
    'nisimura': read_b64('nisimura_jpg.txt'),
    'yakura': read_b64('yakura_jpg.txt'),
    'hurusawa': read_b64('hurusawa_jpg.txt'),
    'kawahara': read_b64('kawahara_jpg.txt'),
    'sasanuma': read_b64('sasanuma_jpg.txt'),
    'hamamatsu': read_b64('hamamatsu_jpg.txt'),
    'hamamatsu_no1': read_b64('hamamatsu_no1_jpg.txt'),
    'maeda_greeting': read_b64('maeda_greeting.txt'),
}

def img(key, alt=''):
    return f'data:image/jpeg;base64,{b64[key]}'

html = f'''<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>弁護士法人 東京新橋法律事務所｜事務所案内</title>
  <style>
    :root{{
      --bg:#ffffff;
      --txt:#0f172a;
      --muted:#475569;
      --soft:#64748b;
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
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
                   "Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic","Meiryo", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(900px 650px at 10% 8%, rgba(79,70,229,.08), transparent 60%),
        radial-gradient(900px 650px at 90% 10%, rgba(6,182,212,.07), transparent 60%),
        radial-gradient(900px 650px at 80% 95%, rgba(34,197,94,.06), transparent 60%),
        var(--bg);
      overflow:hidden;
    }}

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
      border:1px solid var(--line);
      background:#fff;
      color: var(--txt);
      padding:10px 12px;
      border-radius: 14px;
      font-weight:700;
      cursor:pointer;
      user-select:none;
      transition: transform .08s ease, background .18s ease, border-color .18s ease;
      box-shadow: 0 10px 20px rgba(15,23,42,.05);
    }}
    .btn:hover{{ background:#f8fafc; }}
    .btn:active{{ transform: translateY(1px); }}

    .kbd{{
      font-size:12px;
      padding:6px 10px;
      border:1px solid var(--line);
      border-bottom-width:2px;
      background:#fff;
      border-radius: 12px;
      color: var(--soft);
    }}
    .progress{{ min-width: 220px; display:flex; gap:10px; align-items:center; }}
    .bar{{
      flex:1; height:10px; border-radius: 999px;
      border:1px solid var(--line);
      background:#f1f5f9;
      overflow:hidden;
    }}
    .bar > i{{
      display:block; height:100%; width:0%;
      background: linear-gradient(90deg, var(--a), var(--b), var(--c));
      border-radius:999px;
      transition: width .25s ease;
    }}
    .ptext{{ font-size:12px; color: var(--soft); min-width:74px; text-align:right; }}

    .stage{{
      height: calc(100% - 62px);
      display:flex; align-items:center; justify-content:center;
      padding: 26px;
    }}
    .canvas{{
      width:min(1600px, 98vw);
      aspect-ratio: 16 / 9;
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
      padding: 48px 56px;
      display:none;
      flex-direction:column;
    }}
    .slide.active{{ display:flex; }}

    h1,h2,h3{{ margin:0; }}
    .h0{{ font-size: 48px; line-height: 1.10; letter-spacing:.01em; }}
    .h1{{ font-size: 34px; line-height: 1.16; }}
    .h2{{ font-size: 22px; line-height: 1.25; }}
    .lead{{ font-size: 17px; line-height: 1.75; color: var(--muted); max-width: 1020px; }}
    .small{{ font-size: 13px; color: var(--soft); line-height:1.7; }}

    .pill{{
      display:inline-flex; align-items:center; gap:8px;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #fff;
      color: var(--soft);
      font-size: 12px;
    }}
    .accentLine{{
      width: 92px; height: 10px; border-radius: 999px;
      background: linear-gradient(90deg, var(--a), var(--b), var(--c));
      margin-top: 16px;
    }}
    .divider{{ height:1px; background: var(--line); margin: 14px 0; }}

    .grid2{{ display:grid; grid-template-columns: 1.05fr .95fr; gap: 18px; margin-top: 22px; }}
    .grid2eq{{ display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }}
    .grid3{{ display:grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 18px; }}

    .card{{
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 22px;
      box-shadow: 0 14px 34px rgba(15,23,42,.06);
    }}
    .card.soft{{
      background: #f8fafc;
      border-color: #e5e7eb;
      box-shadow: none;
    }}

    .bullets{{ margin:0; padding-left: 18px; color: var(--muted); line-height:1.85; }}
    .bullets li{{ margin: 8px 0; }}

    .mini{{
      padding: 16px;
      border-radius: 18px;
      border: 1px solid var(--line);
      background: #fff;
    }}
    .mini .k{{ font-size:12px; color: var(--soft); }}
    .mini .v{{ font-size:22px; font-weight:900; margin-top:6px; }}

    .quote{{
      border-left: 4px solid rgba(79,70,229,.35);
      color: var(--muted);
      line-height: 1.85;
      font-size: 14px;
      margin-top: 10px;
      background: rgba(79,70,229,.04);
      border-radius: 14px;
      padding: 12px 12px 12px 14px;
    }}

    .lawyer-row{{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 14px;
      flex:1;
    }}
    .lawyer-card{{
      border-radius: 22px;
      border: 1px solid var(--line);
      background: #fff;
      overflow:hidden;
      display:flex;
      flex-direction:row;
      box-shadow: 0 14px 30px rgba(15,23,42,.05);
    }}
    .lawyer-photo{{
      width: 150px;
      min-height: 190px;
      flex-shrink:0;
      overflow:hidden;
      background:
        radial-gradient(180px 140px at 20% 20%, rgba(79,70,229,.12), transparent 62%),
        radial-gradient(180px 140px at 80% 20%, rgba(6,182,212,.10), transparent 62%),
        #f1f5f9;
      display:flex; align-items:center; justify-content:center;
    }}
    .lawyer-photo img{{
      width:100%; height:100%; object-fit:cover;
    }}
    .lawyer-info{{
      padding: 18px;
      display:flex; flex-direction:column; justify-content:center;
      flex:1;
    }}
    .lawyer-name{{ font-weight:900; font-size:18px; margin-bottom:4px; }}
    .lawyer-title{{ font-size:12px; font-weight:400; color:var(--soft); }}
    .lawyer-meta{{ color: var(--soft); font-size:12px; margin-bottom:10px; }}
    .lawyer-detail{{ color: var(--muted); font-size:12px; line-height:1.65; margin:0; }}
    .lawyer-detail dt{{ font-weight:700; color: var(--txt); margin-top:5px; font-size:11px; }}
    .lawyer-detail dd{{ margin:0; }}

    .cover-photo{{
      position:absolute;
      top:0; right:0;
      width: 380px; height:100%;
      overflow:hidden;
      mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 100%);
    }}
    .cover-photo img{{
      width:100%; height:100%; object-fit:cover; object-position: center 20%;
      opacity: 0.35;
    }}

    .greeting-photo{{
      width: 180px; height: 240px;
      border-radius: 18px;
      overflow:hidden;
      border: 1px solid var(--line);
      box-shadow: 0 14px 30px rgba(15,23,42,.08);
      flex-shrink:0;
    }}
    .greeting-photo img{{
      width:100%; height:100%; object-fit:cover;
    }}

    .footer{{
      position:absolute; left: 56px; right: 56px; bottom: 24px;
      display:flex; align-items:center; justify-content:space-between;
      color: var(--soft);
      font-size: 12px;
    }}

    @media print{{
      body{{ overflow: visible; background:#fff; }}
      .topbar,.stage{{ display:none; }}
      .printDeck{{ display:block; }}
      .printSlide{{
        width: 297mm; height: 167mm;
        page-break-after: always;
        position: relative;
        overflow:hidden;
        background: #ffffff;
        color: #0f172a;
      }}
      .printSlide:last-child{{ page-break-after: auto; }}
      .printSlide .slide{{
        position:relative;
        display:flex !important;
        flex-direction:column;
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
        <div class="ptext" id="ptext">1 / 12</div>
      </div>
    </div>
  </div>

  <div class="stage">
    <div class="canvas">
      <div class="slides">

        <!-- Slide 1: Cover -->
        <section class="slide active">
          <div class="cover-photo">
            <img src="{img('hamamatsu_no1')}" alt="" />
          </div>
          <div style="position:relative; z-index:1;">
            <div class="pill">Office Introduction</div>
            <div style="height:14px"></div>
            <div class="h0">事務所のご紹介</div>
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
                  資料送付後、代表より改めてご挨拶の機会も頂戴できれば幸いです。
                </p>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>&copy; Tokyo Shimbashi Law Office</div>
            <div>1 / 12</div>
          </div>
        </section>

        <!-- Slide 2: Theme01 Title -->
        <section class="slide">
          <div class="pill">Theme 01</div>
          <div style="height:14px"></div>
          <div class="h0">事務所概要</div>
          <div class="accentLine"></div>
          <p class="lead" style="margin-top:18px;">
            所在地・アクセス・体制など、まずは基本情報のご案内です。
          </p>
          <div class="footer">
            <div>Theme 01｜Overview</div>
            <div>2 / 12</div>
          </div>
        </section>

        <!-- Slide 3: Office Overview Detail -->
        <section class="slide">
          <div class="h1">事務所概要（基本情報）</div>
          <p class="lead" style="margin-top:10px;">
            銀座8丁目を拠点に、弁護士・スタッフのチームで案件対応しています。
          </p>
          <div class="grid2">
            <div class="card">
              <div class="h2">基本情報</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95;">
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
              <div class="small">お陰様で数多くのご依頼を賜り、本日まで何とか一歩一歩成長して参りました。</div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 01｜Overview</div>
            <div>3 / 12</div>
          </div>
        </section>

        <!-- Slide 4: Theme02 Title -->
        <section class="slide">
          <div class="pill">Theme 02</div>
          <div style="height:14px"></div>
          <div class="h0">分野・こだわり</div>
          <div class="accentLine"></div>
          <p class="lead" style="margin-top:18px;">
            経験分野と、仕事の向き合い方（コンセプト／品質づくり）をご紹介します。
          </p>
          <div class="footer">
            <div>Theme 02｜Focus</div>
            <div>4 / 12</div>
          </div>
        </section>

        <!-- Slide 5: Focus Detail -->
        <section class="slide">
          <div class="h1">分野・こだわり</div>
          <p class="lead" style="margin-top:10px;">
            交通事故分野をはじめ、複数分野でのノウハウを積んで参りました。
          </p>
          <div class="grid2eq">
            <div class="card">
              <div class="h2">交通事故分野（実績）</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95;">
                交通事故分野においては、専門性の高い弁護士も複数人在籍し、<br/>
                <strong>類型で500件ほど受任実績</strong>がございます。<br/>
                軽微なものから、後遺障害1級に至るような事案まで、様々経験して参りました。
              </div>
              <div class="divider"></div>
              <div class="pill"><strong style="color:#0f172a;">受任実績</strong>：類型 約500件</div>
            </div>
            <div class="card soft">
              <div class="h2">コンセプト／品質づくり</div>
              <div class="divider"></div>
              <div class="small" style="line-height:1.95;">
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
            <div>5 / 12</div>
          </div>
        </section>

        <!-- Slide 6: Theme03 Title -->
        <section class="slide">
          <div class="pill">Theme 03</div>
          <div style="height:14px"></div>
          <div class="h0">弁護士紹介</div>
          <div class="accentLine"></div>
          <p class="lead" style="margin-top:18px;">
            在籍する弁護士8名をご紹介いたします。
          </p>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>6 / 12</div>
          </div>
        </section>

        <!-- Slide 7: Lawyers 1-2 (前田・山根) -->
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
                  <dt>心掛け</dt>
                  <dd>お客様の事業や状況にとって何が望ましいのかを基点に発想すること</dd>
                  <dt>趣味</dt>
                  <dd>高校バスケ観戦、フットサル</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('yamane')}" alt="山根" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">山根</div>
                <div class="lawyer-meta">出身：広島県</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>レスポンスの速さ</dd>
                  <dt>趣味</dt>
                  <dd>ゴルフ</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>野球</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>7 / 12</div>
          </div>
        </section>

        <!-- Slide 8: Lawyers 3-4 (西村・八倉) -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('nisimura')}" alt="西村" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">西村</div>
                <div class="lawyer-meta">出身：東京</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>丁寧な仕事・これを裏付ける確かな知識</dd>
                  <dt>趣味</dt>
                  <dd>飲食店巡り</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>野球・ボクシング</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('yakura')}" alt="八倉" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">八倉</div>
                <div class="lawyer-meta">出身：富山県</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
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
            <div>8 / 12</div>
          </div>
        </section>

        <!-- Slide 9: Lawyers 5-6 (古澤・川原) -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('hurusawa')}" alt="古澤" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">古澤</div>
                <div class="lawyer-meta">出身：大阪府生まれ 東京都育ち</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>常に勉強し続けること</dd>
                  <dt>趣味</dt>
                  <dd>映画鑑賞</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('kawahara')}" alt="川原" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">川原</div>
                <div class="lawyer-meta">出身：佐賀県</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>幅広く方針を検討すること</dd>
                  <dt>趣味</dt>
                  <dd>子供と遊ぶこと</dd>
                  <dt>好きなスポーツ</dt>
                  <dd>サッカー</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>9 / 12</div>
          </div>
        </section>

        <!-- Slide 10: Lawyers 7-8 (笹沼・濱松) -->
        <section class="slide">
          <div class="h1" style="margin-bottom:4px;">弁護士紹介</div>
          <div class="lawyer-row">
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('sasanuma')}" alt="笹沼" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">笹沼</div>
                <div class="lawyer-meta">出身：栃木県宇都宮市</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>相談をいただく上での関係値作り、法務を超えた価値の提供</dd>
                  <dt>趣味</dt>
                  <dd>サッカー、睡眠、お酒</dd>
                </dl>
              </div>
            </div>
            <div class="lawyer-card">
              <div class="lawyer-photo">
                <img src="{img('hamamatsu')}" alt="濱松" />
              </div>
              <div class="lawyer-info">
                <div class="lawyer-name">濱松</div>
                <div class="lawyer-meta">出身：広島県</div>
                <dl class="lawyer-detail">
                  <dt>心掛け</dt>
                  <dd>丁寧な対応。依頼して良かったと思っていただけるように事案に向き合うこと</dd>
                  <dt>趣味</dt>
                  <dd>スポーツ全般（観戦も実際にするのも）、ゴルフ、野球</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 03｜People</div>
            <div>10 / 12</div>
          </div>
        </section>

        <!-- Slide 11: Theme04 Title -->
        <section class="slide">
          <div class="pill">Theme 04</div>
          <div style="height:14px"></div>
          <div class="h0">代表挨拶</div>
          <div class="accentLine"></div>
          <p class="lead" style="margin-top:18px;">
            代表弁護士 前田祥夢より、ご挨拶申し上げます。
          </p>
          <div class="footer">
            <div>Theme 04｜Message</div>
            <div>11 / 12</div>
          </div>
        </section>

        <!-- Slide 12: Greeting -->
        <section class="slide">
          <div class="h1" style="margin-bottom:8px;">代表挨拶</div>
          <div style="display:flex; gap:28px; flex:1; overflow:hidden;">
            <div style="flex:1; overflow-y:auto;">
              <div class="card" style="padding:20px;">
                <div class="small" style="line-height:2.0; color:var(--muted); font-size:13px;">
                  初めまして。東京新橋法律事務所の代表弁護士の前田と申します。<br/>
                  弊所は、6期目を迎えております若い弁護士事務所です。
                  弁護士8名（4月より9名）、スタッフ30名程度の中規模事務所です。
                  お陰様で、数多くのご依頼を賜り、本日迄何とか1歩1歩成長して参りました。<br/><br/>
                  弊所は、交通事故分野をはじめ、複数分野でのノウハウを積んで参りました。
                  交通事故分野においては、専門性の高い弁護士も複数人在籍し、類型で500件ほど受任実績がございます。
                  軽微なものから、後遺障害1級に至るような事案まで、様々経験して参りました。<br/><br/>
                  弊所のコンセプトは、「顧客提案力で負けない事務所」です。
                  端なる法律屋になるのではなく、顧客の要望をしっかり理解するというアナログ的要素をしっかりと注力しつつ、
                  適切な論点設定をしたうえ、明確かつ「刺さる」打ち手を顧客に提案することに拘っています。
                  法人のお客様では当然そうですが、個人のお客様であっても、同様のコンセプト、心がけの基、全分野一貫して、
                  かかる力点を重視した業務遂行に努めています。<br/><br/>
                  他方、サービス品質面においては、属人化の解消による業務品質の標準化に努めています。
                  弊所は、案件管理担当（いわゆる「PM」に近い役割）の基、自社オリジナルのシステム導入や、
                  直近はAIによるシステムのアップデートを図り、より迅速かつ安定したサービス提供を心掛けています。
                  若い事務所であり、その意味で経験が十二分とは言えない面はあるかと存じますが、
                  確かな顧客理解と提案力を基盤に、相応の事案処理実績を積ませて頂いた現状においては、
                  他事務所様に決して劣らない業務遂行が可能だと思っています。<br/><br/>
                  散文となり、誠に恐縮です。ささやかながら自己紹介としてお目通しいただけましたら幸いです。<br/>
                  今後とも何卒よろしくお願い申し上げます。
                </div>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
              <div class="greeting-photo">
                <img src="{img('maeda_greeting')}" alt="前田 祥夢" />
              </div>
              <div style="text-align:center;">
                <div style="font-weight:900; font-size:16px;">代表弁護士</div>
                <div style="font-size:22px; font-weight:900; margin-top:4px;">前田 祥夢</div>
              </div>
              <div class="card soft" style="padding:16px; width:200px;">
                <div class="small" style="line-height:1.95; text-align:center;">
                  弁護士法人<br/>東京新橋法律事務所<br/>
                  TEL：03-6273-3254<br/>
                  東京都中央区銀座8丁目20-33<br/>ACN銀座8ビル3階
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div>Theme 04｜Message</div>
            <div>12 / 12</div>
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

      function buildPrintDeck(){{
        printDeck.innerHTML = "";
        slides.forEach((s)=>{{
          const page = document.createElement("section");
          page.className = "printSlide";
          const clone = s.cloneNode(true);
          clone.classList.remove("active");
          clone.style.display = "flex";
          clone.style.position = "relative";
          page.appendChild(clone);
          printDeck.appendChild(page);
        }});
      }}

      printBtn.addEventListener("click", ()=>{{
        buildPrintDeck();
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
