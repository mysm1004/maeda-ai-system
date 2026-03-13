import sys, re
sys.stdout.reconfigure(encoding='utf-8')

# Read current file
with open('【リーフレット】おひとりさまの安心サポート.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Read HQ photo
with open('交通提案/b64/maeda_greeting_hq.txt', 'r') as f:
    maeda_b64 = f.read().strip()
with open('交通提案/b64/logo.txt', 'r') as f:
    logo_b64 = f.read().strip()

maeda_src = f"data:image/jpeg;base64,{maeda_b64}"
logo_src = f"data:image/png;base64,{logo_b64}"

# Replace cover CSS: from .page-cover to PAGE 2 comment
old_cover_css_pattern = r'/\* =+\s*PAGE 1: COVER\s*=+ \*/(.*?)/\* =+\s*PAGE 2:'
new_cover_css = '''/* ========================================
     PAGE 1: COVER (warm elderly-friendly)
     ======================================== */
  .page-cover {
    background: #FFFDF7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .page-cover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
  }

  .page-cover::after {
    content: none;
  }

  .cover-deco {
    position: absolute;
    right: 12mm;
    top: 20mm;
    width: 120px;
    height: 120px;
    border: 2px solid rgba(196,148,61,0.1);
    border-radius: 50%;
  }

  .cover-deco2 {
    position: absolute;
    right: 6mm;
    top: 14mm;
    width: 160px;
    height: 160px;
    border: 1px solid rgba(27,94,59,0.06);
    border-radius: 50%;
  }

  .cover-top {
    padding: 20mm 18mm 0;
    flex: 1;
  }

  .cover-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10mm;
  }

  .cover-logo img {
    height: 34px;
    width: auto;
  }

  .cover-logo-text {
    color: var(--primary);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  .cover-badge {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 22px;
    border-radius: 22px;
    letter-spacing: 0.1em;
    margin-bottom: 8mm;
  }

  .cover-main-title {
    font-family: 'Noto Serif JP', serif;
    color: var(--primary-dark);
    font-size: 42px;
    font-weight: 900;
    line-height: 1.4;
    letter-spacing: 0.06em;
    margin-bottom: 6mm;
  }

  .cover-main-title .gold {
    color: var(--accent);
    display: block;
    font-size: 36px;
    margin-top: 2mm;
  }

  .cover-subtitle {
    color: #4a4a5a;
    font-size: 16px;
    line-height: 1.9;
    margin-bottom: 10mm;
    max-width: 420px;
  }

  .cover-checklist {
    list-style: none;
    padding: 0;
    margin-bottom: 8mm;
  }

  .cover-checklist-label {
    font-size: 13px;
    color: var(--primary);
    letter-spacing: 0.08em;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .cover-checklist li {
    color: #2d2d3a;
    font-size: 16px;
    padding: 6px 0 6px 32px;
    position: relative;
    line-height: 1.7;
  }

  .cover-checklist li::before {
    content: '\\2713';
    position: absolute;
    left: 0;
    top: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background: var(--accent);
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
  }

  .cover-bottom {
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 60%, var(--primary-light) 100%);
    padding: 10mm 18mm;
    display: flex;
    align-items: center;
    gap: 22px;
    position: relative;
    overflow: hidden;
  }

  .cover-bottom::before {
    content: '';
    position: absolute;
    right: -40px;
    top: -40px;
    width: 180px;
    height: 180px;
    border: 2px solid rgba(196,148,61,0.15);
    border-radius: 50%;
  }

  .cover-bottom::after {
    content: '';
    position: absolute;
    right: 20px;
    bottom: -30px;
    width: 120px;
    height: 120px;
    border: 1px solid rgba(196,148,61,0.1);
    border-radius: 50%;
  }

  .cover-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 3px solid var(--accent);
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  }

  .cover-lawyer-info {
    color: rgba(255,255,255,0.92);
    font-size: 13px;
    line-height: 1.7;
    position: relative;
    z-index: 1;
  }

  .cover-lawyer-name {
    font-family: 'Noto Serif JP', serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 3px;
  }

  .cover-lawyer-title {
    font-size: 11px;
    color: var(--accent-light);
    letter-spacing: 0.08em;
    margin-bottom: 4px;
    font-weight: 600;
  }

  /* ========================================
     PAGE 2:'''

content = re.sub(old_cover_css_pattern, new_cover_css, content, count=1, flags=re.DOTALL)

# Now replace the cover page HTML (from page-cover div to page-services div)
old_cover_html_start = '<div class="page page-cover">'
old_cover_html_end = '<div class="page page-services">'

# Find the positions
start_idx = content.find(old_cover_html_start)
end_idx = content.find(old_cover_html_end)

if start_idx >= 0 and end_idx > start_idx:
    new_cover_html = f'''<div class="page page-cover">
  <div class="cover-deco"></div>
  <div class="cover-deco2"></div>

  <div class="cover-top">
    <div class="cover-logo">
      <img src="{logo_src}" alt="東京新橋法律事務所">
      <span class="cover-logo-text">弁護士法人 東京新橋法律事務所</span>
    </div>

    <div class="cover-badge">初回相談無料</div>

    <h1 class="cover-main-title">
      おひとりさまの<br>安心サポート
      <span class="gold">「もしも」の備えを、弁護士が。</span>
    </h1>

    <p class="cover-subtitle">
      届出、葬儀、お部屋の片付け ——<br>
      おひとりで暮らすあなたの「もしも」に<br>
      弁護士が寄り添い、すべてをお引き受けします。
    </p>

    <p class="cover-checklist-label">こんなお悩みはありませんか？</p>
    <ul class="cover-checklist">
      <li>自分に何かあったとき、届出をしてくれる人がいない</li>
      <li>葬儀やお墓のことを頼める相手がいない</li>
      <li>部屋の片付けや契約の解約をどうすればいいか不安</li>
    </ul>
  </div>

  <div class="cover-bottom">
    <img class="cover-photo" src="{maeda_src}" alt="前田祥夢弁護士">
    <div class="cover-lawyer-info">
      <div class="cover-lawyer-title">代表弁護士・東京弁護士会所属</div>
      <div class="cover-lawyer-name">前田 祥夢</div>
      あなたの不安に、真摯に向き合います。<br>
      まずはお気軽にご相談ください。
    </div>
  </div>
</div>

'''
    content = content[:start_idx] + new_cover_html + content[end_idx:]

with open('【リーフレット】おひとりさまの安心サポート.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
