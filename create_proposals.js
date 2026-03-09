var pptxgen = require("pptxgenjs");

// ============================================
// 共通デザインシステム
// ============================================
var COLORS = {
  navy: "1A1A2E",
  darkNavy: "16213E",
  gold: "C9A96E",
  lightGold: "E8D5B5",
  cream: "F5F5F0",
  white: "FFFFFF",
  text: "333333",
  lightText: "888888",
  accent: "2D6A4F",
  lightBg: "F0EDE6"
};

var FONTS = { header: "Georgia", body: "Calibri" };

function makeShadow() {
  return { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.1 };
}

// 共通: タイトルスライド
function addTitleSlide(pres, title, subtitle) {
  var slide = pres.addSlide();
  slide.background = { color: COLORS.darkNavy };

  // 上部ゴールドライン
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: COLORS.gold } });

  // メインタイトル
  slide.addText(title, {
    x: 0.8, y: 1.5, w: 8.4, h: 1.4,
    fontSize: 34, fontFace: FONTS.header, color: COLORS.white,
    bold: true, align: "center", valign: "middle", margin: 0
  });

  // ゴールド装飾ライン
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.0, w: 3, h: 0.04, fill: { color: COLORS.gold } });

  // サブタイトル
  slide.addText(subtitle, {
    x: 1.5, y: 3.3, w: 7, h: 0.7,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.lightGold,
    align: "center", valign: "middle", margin: 0
  });

  // 事務所名
  slide.addText("前田法律事務所", {
    x: 2.5, y: 4.4, w: 5, h: 0.5,
    fontSize: 18, fontFace: FONTS.header, color: COLORS.gold,
    align: "center", valign: "middle", charSpacing: 4, margin: 0
  });

  // 下部ゴールドライン
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: COLORS.gold } });
}

// 共通: セクションタイトル
function addSectionSlide(pres, number, title) {
  var slide = pres.addSlide();
  slide.background = { color: COLORS.darkNavy };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: COLORS.gold } });

  slide.addText(String(number).padStart(2, "0"), {
    x: 1, y: 1.5, w: 8, h: 1,
    fontSize: 60, fontFace: FONTS.header, color: COLORS.gold,
    align: "center", valign: "middle", margin: 0, bold: true
  });

  slide.addText(title, {
    x: 1, y: 2.6, w: 8, h: 1,
    fontSize: 30, fontFace: FONTS.header, color: COLORS.white,
    align: "center", valign: "middle", margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: COLORS.gold } });
}

// 共通: コンテンツスライド（ヘッダー付き）
function addContentSlide(pres, title) {
  var slide = pres.addSlide();
  slide.background = { color: COLORS.cream };

  // ヘッダーバー
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: COLORS.darkNavy } });
  slide.addText(title, {
    x: 0.6, y: 0, w: 8.8, h: 0.9,
    fontSize: 20, fontFace: FONTS.header, color: COLORS.white,
    bold: true, valign: "middle", margin: 0
  });

  // フッター
  slide.addText("前田法律事務所  |  Confidential", {
    x: 0.5, y: 5.2, w: 9, h: 0.4,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText,
    align: "right", valign: "middle", margin: 0
  });

  return slide;
}

// 共通: カード
function addCard(slide, x, y, w, h, bgColor) {
  slide.addShape(slide.__proto__.constructor === Object ? "RECTANGLE" : "RECTANGLE", {
    x: x, y: y, w: w, h: h, fill: { color: bgColor || COLORS.white },
    shadow: makeShadow()
  });
}

// ============================================
// 1. 葬儀社向け提案スライド
// ============================================

function createFuneralProposal() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "前田法律事務所";
  pres.title = "終活パートナー連携ご提案 - 葬儀社向け";

  // --- Slide 1: タイトル ---
  addTitleSlide(pres, "終活パートナー連携のご提案", "生前会員獲得 × 死後事務委任の新モデル");

  // --- Slide 2: 業界の課題 ---
  var s2 = addContentSlide(pres, "葬儀業界を取り巻く3つの課題");

  // 3カード横並び
  var cards2 = [
    { num: "01", title: "生前獲得の壁", body: "高齢者との接点が\n葬儀発生後に限定\n生前会員の獲得が困難" },
    { num: "02", title: "単価の下落", body: "家族葬・直葬の増加で\n平均単価が年々低下\n2024年平均110万円" },
    { num: "03", title: "差別化の困難", body: "サービス内容が同質化\n価格競争に陥りやすい\n顧客ロイヤリティが低い" }
  ];
  cards2.forEach(function(c, i) {
    var cx = 0.6 + i * 3.1;
    slide2Card(s2, pres, cx, 1.3, 2.8, 3.5, c);
  });

  function slide2Card(slide, pres, x, y, w, h, data) {
    slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: COLORS.white }, shadow: makeShadow() });
    // アクセントバー
    slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: 0.06, fill: { color: COLORS.gold } });
    // 番号
    slide.addText(data.num, {
      x: x + 0.3, y: y + 0.25, w: 1, h: 0.6,
      fontSize: 32, fontFace: FONTS.header, color: COLORS.gold, bold: true, margin: 0
    });
    // タイトル
    slide.addText(data.title, {
      x: x + 0.3, y: y + 0.9, w: w - 0.6, h: 0.5,
      fontSize: 16, fontFace: FONTS.header, color: COLORS.navy, bold: true, margin: 0
    });
    // 本文
    slide.addText(data.body, {
      x: x + 0.3, y: y + 1.5, w: w - 0.6, h: 1.8,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.text, margin: 0, lineSpacingMultiple: 1.4
    });
  }

  // --- Slide 3: 提案概要 ---
  var s3 = addContentSlide(pres, "ご提案：死後事務委任連携モデル");

  // 左側: 概要テキスト
  s3.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 3.8, fill: { color: COLORS.white }, shadow: makeShadow() });
  s3.addText("弁護士×葬儀社の連携で\n「生前から選ばれる」仕組み", {
    x: 0.8, y: 1.4, w: 3.7, h: 0.8,
    fontSize: 16, fontFace: FONTS.header, color: COLORS.navy, bold: true, margin: 0
  });
  s3.addText([
    { text: "前田法律事務所が死後事務委任契約を受任し、", options: { breakLine: true } },
    { text: "ご遺体の引取・葬儀・納骨を貴社に優先発注。", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "契約者が生前に葬儀社を「指名」するため、", options: { breakLine: true } },
    { text: "確実な受注につながります。", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "年会費モデルで預託金不要。", options: { breakLine: true } },
    { text: "高齢者が気軽に始められる設計です。", options: {} }
  ], {
    x: 0.8, y: 2.3, w: 3.7, h: 2.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.text, margin: 0, lineSpacingMultiple: 1.5
  });

  // 右側: 数字ハイライト
  var stats3 = [
    { num: "700万人", label: "単身高齢者（潜在顧客）" },
    { num: "1,200億円", label: "死後事務委任市場規模" },
    { num: "年6万円", label: "契約者の年会費" }
  ];
  stats3.forEach(function(st, i) {
    var sy = 1.2 + i * 1.25;
    s3.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: sy, w: 4.3, h: 1.1, fill: { color: COLORS.white }, shadow: makeShadow() });
    s3.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: sy, w: 0.07, h: 1.1, fill: { color: COLORS.gold } });
    s3.addText(st.num, {
      x: 5.5, y: sy + 0.1, w: 3.7, h: 0.5,
      fontSize: 26, fontFace: FONTS.header, color: COLORS.gold, bold: true, margin: 0
    });
    s3.addText(st.label, {
      x: 5.5, y: sy + 0.6, w: 3.7, h: 0.35,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.lightText, margin: 0
    });
  });

  // --- Slide 4: 連携スキーム ---
  var s4 = addContentSlide(pres, "連携スキーム");

  // 中央フロー: 高齢者 → 前田事務所 → 葬儀社
  var flowItems = [
    { x: 0.5, label: "単身高齢者", sub: "賃貸保証会社\n不動産管理会社\nからの紹介", color: COLORS.accent },
    { x: 3.7, label: "前田法律事務所", sub: "死後事務委任契約\n見守りサービス\n生前意思確認", color: COLORS.darkNavy },
    { x: 6.9, label: "貴社（葬儀社）", sub: "葬儀施行\n生前相談会共催\n会員サービス", color: COLORS.gold }
  ];
  flowItems.forEach(function(f) {
    s4.addShape(pres.shapes.RECTANGLE, { x: f.x, y: 1.4, w: 2.6, h: 1.2, fill: { color: f.color }, shadow: makeShadow() });
    s4.addText(f.label, {
      x: f.x, y: 1.4, w: 2.6, h: 1.2,
      fontSize: 15, fontFace: FONTS.header, color: COLORS.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s4.addText(f.sub, {
      x: f.x, y: 2.8, w: 2.6, h: 1.2,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.text,
      align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });
  });

  // 矢印（テキストで表現）
  s4.addText("\u2192", { x: 3.1, y: 1.4, w: 0.6, h: 1.2, fontSize: 30, color: COLORS.gold, align: "center", valign: "middle", margin: 0 });
  s4.addText("\u2192", { x: 6.3, y: 1.4, w: 0.6, h: 1.2, fontSize: 30, color: COLORS.gold, align: "center", valign: "middle", margin: 0 });

  // 下部: お金の流れ
  s4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 9, h: 0.9, fill: { color: COLORS.white }, shadow: makeShadow() });
  s4.addText([
    { text: "お金の流れ: ", options: { bold: true, color: COLORS.navy } },
    { text: "高齢者 → 年会費6万円（前田事務所） / 死亡時 → 実行費50万円+実費（葬儀費を含む）→ 葬儀社へ葬儀費用を支払い" }
  ], {
    x: 0.8, y: 4.2, w: 8.4, h: 0.8,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.text, valign: "middle", margin: 0
  });

  // --- Slide 5: 貴社のメリット ---
  var s5 = addContentSlide(pres, "貴社にとっての4つのメリット");

  var merits = [
    { title: "確実な受注", body: "契約者が生前に貴社を指名。\n亡くなった時点で自動的に\n貴社へ発注されます。" },
    { title: "生前接点の獲得", body: "共催セミナー・相談会で\n生前から関係構築。\n他社との差別化に直結。" },
    { title: "新規顧客層の開拓", body: "賃貸保証会社経由の\n単身高齢者700万人が\n潜在ターゲットに。" },
    { title: "ブランド価値向上", body: "弁護士との連携による\n信頼性・安心感の付与。\n社会貢献の訴求にも。" }
  ];

  merits.forEach(function(m, i) {
    var mx = (i % 2 === 0) ? 0.5 : 5.2;
    var my = (i < 2) ? 1.2 : 3.1;
    s5.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: 4.3, h: 1.7, fill: { color: COLORS.white }, shadow: makeShadow() });
    s5.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: 0.07, h: 1.7, fill: { color: COLORS.gold } });
    s5.addText(m.title, {
      x: mx + 0.3, y: my + 0.15, w: 3.7, h: 0.4,
      fontSize: 16, fontFace: FONTS.header, color: COLORS.navy, bold: true, margin: 0
    });
    s5.addText(m.body, {
      x: mx + 0.3, y: my + 0.6, w: 3.7, h: 0.95,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.text, margin: 0, lineSpacingMultiple: 1.4
    });
  });

  // --- Slide 6: 収益シミュレーション ---
  var s6 = addContentSlide(pres, "収益シミュレーション（貴社側）");

  s6.addTable([
    [
      { text: "項目", options: { fill: { color: COLORS.darkNavy }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body } },
      { text: "1年目", options: { fill: { color: COLORS.darkNavy }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } },
      { text: "2年目", options: { fill: { color: COLORS.darkNavy }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } },
      { text: "3年目", options: { fill: { color: COLORS.darkNavy }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "連携契約者数（累計）", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "50名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "150名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "300名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "年間施行件数", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "5件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "15件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "30件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "葬儀売上（1件80万円）", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "400万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "1,200万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "2,400万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "セミナー共催収入", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "60万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "120万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "180万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "合計売上", options: { fontSize: 12, fontFace: FONTS.body, bold: true, fill: { color: COLORS.lightBg } } },
      { text: "460万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: COLORS.lightBg } } },
      { text: "1,320万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: COLORS.lightBg } } },
      { text: "2,580万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: COLORS.lightBg }, color: COLORS.gold } }
    ]
  ], {
    x: 0.5, y: 1.2, w: 9, h: 2.5,
    border: { pt: 0.5, color: "CCCCCC" },
    colW: [3.5, 1.83, 1.83, 1.84],
    rowH: [0.4, 0.35, 0.35, 0.35, 0.35, 0.4]
  });

  s6.addText("※ 貴社の初期投資: 0円（連携契約のみ）", {
    x: 0.5, y: 3.9, w: 9, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.gold, bold: true, margin: 0
  });
  s6.addText("※ 上記は死亡率10%/年で試算。セミナーは月1回・参加費5,000円×10名を想定。", {
    x: 0.5, y: 4.3, w: 9, h: 0.4,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.lightText, margin: 0
  });

  // --- Slide 7: 導入ステップ ---
  var s7 = addContentSlide(pres, "導入ステップ");

  var steps = [
    { month: "1ヶ月目", title: "連携契約締結", body: "基本契約書の締結\n担当者アサイン\n情報共有体制の構築" },
    { month: "2-3ヶ月目", title: "合同セミナー開始", body: "終活セミナー共催\n相談会の実施\n紹介フローの確立" },
    { month: "4-6ヶ月目", title: "本格運用", body: "契約者の本格獲得\n月次報告開始\n改善サイクル構築" }
  ];
  steps.forEach(function(st, i) {
    var sx = 0.5 + i * 3.1;
    // ステップ番号
    s7.addShape(pres.shapes.OVAL, { x: sx + 0.9, y: 1.15, w: 0.7, h: 0.7, fill: { color: COLORS.gold } });
    s7.addText(String(i + 1), {
      x: sx + 0.9, y: 1.15, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: FONTS.header, color: COLORS.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // カード
    s7.addShape(pres.shapes.RECTANGLE, { x: sx, y: 2.05, w: 2.8, h: 2.8, fill: { color: COLORS.white }, shadow: makeShadow() });
    s7.addText(st.month, {
      x: sx + 0.2, y: 2.2, w: 2.4, h: 0.35,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.gold, bold: true, margin: 0
    });
    s7.addText(st.title, {
      x: sx + 0.2, y: 2.55, w: 2.4, h: 0.45,
      fontSize: 15, fontFace: FONTS.header, color: COLORS.navy, bold: true, margin: 0
    });
    s7.addText(st.body, {
      x: sx + 0.2, y: 3.1, w: 2.4, h: 1.5,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.text, margin: 0, lineSpacingMultiple: 1.5
    });
  });

  // 矢印テキスト
  if (steps.length > 1) {
    s7.addText("\u2192", { x: 3.3, y: 1.15, w: 0.5, h: 0.7, fontSize: 24, color: COLORS.gold, align: "center", valign: "middle", margin: 0 });
    s7.addText("\u2192", { x: 6.4, y: 1.15, w: 0.5, h: 0.7, fontSize: 24, color: COLORS.gold, align: "center", valign: "middle", margin: 0 });
  }

  // --- Slide 8: お問い合わせ ---
  var s8 = pres.addSlide();
  s8.background = { color: COLORS.darkNavy };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: COLORS.gold } });

  s8.addText("まずはお気軽にご相談ください", {
    x: 1, y: 1.0, w: 8, h: 0.8,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true,
    align: "center", valign: "middle", margin: 0
  });

  s8.addShape(pres.shapes.RECTANGLE, { x: 2, y: 2.1, w: 6, h: 2.5, fill: { color: "FFFFFF" }, shadow: makeShadow() });
  s8.addText([
    { text: "前田法律事務所", options: { fontSize: 22, bold: true, color: COLORS.navy, breakLine: true } },
    { text: "", options: { fontSize: 10, breakLine: true } },
    { text: "代表弁護士  前田", options: { fontSize: 14, breakLine: true, color: COLORS.text } },
    { text: "東京都港区新橋", options: { fontSize: 13, breakLine: true, color: COLORS.text } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "本資料に関するお問い合わせは上記までお願いいたします。", options: { fontSize: 11, color: COLORS.lightText } }
  ], {
    x: 2.3, y: 2.3, w: 5.4, h: 2.1,
    fontFace: FONTS.body, align: "center", valign: "middle", margin: 0
  });

  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: COLORS.gold } });

  return pres;
}


// ============================================
// 2. お寺向け提案スライド
// ============================================

function createTempleProposal() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "前田法律事務所";
  pres.title = "寺院の新たな収益モデルのご提案";

  // 寺院向けカラー調整
  var T = {
    primary: "2D3A4A",    // 濃紺（より深い）
    accent: "8B6F47",     // 和風ゴールド
    lightAccent: "D4C5A0", // 薄い金
    green: "3A6B4E",      // 深緑
    cream: "F7F4ED",      // 温かいクリーム
    text: "333333"
  };

  // --- Slide 1: タイトル ---
  var t1 = pres.addSlide();
  t1.background = { color: T.primary };
  t1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: T.accent } });

  t1.addText("檀家減少時代の\n新たな寺院収益モデル", {
    x: 0.8, y: 1.2, w: 8.4, h: 1.6,
    fontSize: 32, fontFace: FONTS.header, color: COLORS.white,
    bold: true, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.3
  });

  t1.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.0, w: 3, h: 0.04, fill: { color: T.accent } });

  t1.addText("死後事務委任 × 永代供養 連携のご提案", {
    x: 1.5, y: 3.3, w: 7, h: 0.7,
    fontSize: 16, fontFace: FONTS.body, color: T.lightAccent,
    align: "center", valign: "middle", margin: 0
  });

  t1.addText("前田法律事務所", {
    x: 2.5, y: 4.4, w: 5, h: 0.5,
    fontSize: 18, fontFace: FONTS.header, color: T.accent,
    align: "center", valign: "middle", charSpacing: 4, margin: 0
  });

  t1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: T.accent } });

  // --- Slide 2: 寺院の課題 ---
  var t2 = pres.addSlide();
  t2.background = { color: T.cream };
  t2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t2.addText("寺院経営を取り巻く現状", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t2.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  // 大きな数字 + 説明のペア
  var issues = [
    { num: "77,000寺", label: "全国の寺院数", desc: "うち約40%が\n「消滅の危機」にある\nとされています" },
    { num: "34%減", label: "檀家数の減少率", desc: "過去20年で\n檀家数は約3割減少。\n今後さらに加速予測" },
    { num: "700万人", label: "単身高齢者数", desc: "お墓の継承者がいない\n高齢者が急増。\n新たな「出会い」の機会" }
  ];

  issues.forEach(function(iss, i) {
    var ix = 0.5 + i * 3.1;
    t2.addShape(pres.shapes.RECTANGLE, { x: ix, y: 1.3, w: 2.8, h: 3.5, fill: { color: COLORS.white }, shadow: makeShadow() });
    t2.addText(iss.num, {
      x: ix + 0.2, y: 1.5, w: 2.4, h: 0.7,
      fontSize: 28, fontFace: FONTS.header, color: (i < 2) ? "C44536" : T.green, bold: true, align: "center", margin: 0
    });
    t2.addText(iss.label, {
      x: ix + 0.2, y: 2.2, w: 2.4, h: 0.4,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.lightText, align: "center", margin: 0
    });
    t2.addShape(pres.shapes.RECTANGLE, { x: ix + 0.4, y: 2.7, w: 2, h: 0.03, fill: { color: T.lightAccent } });
    t2.addText(iss.desc, {
      x: ix + 0.3, y: 2.9, w: 2.2, h: 1.5,
      fontSize: 12, fontFace: FONTS.body, color: T.text, align: "center", margin: 0, lineSpacingMultiple: 1.4
    });
  });

  // --- Slide 3: 提案モデル ---
  var t3 = pres.addSlide();
  t3.background = { color: T.cream };
  t3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t3.addText("ご提案：死後事務委任 × 永代供養の連携", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t3.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  // 左: コンセプト
  t3.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 3.8, fill: { color: COLORS.white }, shadow: makeShadow() });
  t3.addText("「生前契約」で確実な\n永代供養のご縁をつくる", {
    x: 0.8, y: 1.4, w: 3.7, h: 0.8,
    fontSize: 16, fontFace: FONTS.header, color: T.primary, bold: true, margin: 0, lineSpacingMultiple: 1.3
  });
  t3.addText([
    { text: "前田法律事務所が単身高齢者と", options: { breakLine: true } },
    { text: "死後事務委任契約を結びます。", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "契約者が生前にお寺を選び、", options: { breakLine: true } },
    { text: "永代供養・納骨先を指定。", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "亡くなった際、前田事務所が", options: { breakLine: true } },
    { text: "貴寺への永代供養を手配します。", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "檀家ではなく「会員」として", options: { breakLine: true } },
    { text: "お寺との新しいご縁を結びます。", options: {} }
  ], {
    x: 0.8, y: 2.3, w: 3.7, h: 2.4,
    fontSize: 12, fontFace: FONTS.body, color: T.text, margin: 0, lineSpacingMultiple: 1.4
  });

  // 右: ポイント3つ
  var points = [
    { title: "新規のご縁", body: "檀家以外の新しい供養者との接点が、弁護士経由で自然に生まれます" },
    { title: "確実な収入", body: "死後事務委任契約で永代供養費が確定。未回収リスクゼロ" },
    { title: "社会貢献", body: "身寄りのない方の「最後の居場所」として寺院の存在価値を高めます" }
  ];
  points.forEach(function(pt, i) {
    var py = 1.2 + i * 1.25;
    t3.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: py, w: 4.3, h: 1.1, fill: { color: COLORS.white }, shadow: makeShadow() });
    t3.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: py, w: 0.07, h: 1.1, fill: { color: T.accent } });
    t3.addText(pt.title, {
      x: 5.5, y: py + 0.1, w: 3.7, h: 0.35,
      fontSize: 14, fontFace: FONTS.header, color: T.primary, bold: true, margin: 0
    });
    t3.addText(pt.body, {
      x: 5.5, y: py + 0.5, w: 3.7, h: 0.5,
      fontSize: 11, fontFace: FONTS.body, color: T.text, margin: 0
    });
  });

  // --- Slide 4: 連携スキーム ---
  var t4 = pres.addSlide();
  t4.background = { color: T.cream };
  t4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t4.addText("連携の仕組み", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t4.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  // フロー
  var tFlows = [
    { x: 0.5, label: "単身高齢者", sub: "お墓の継承者なし\n身寄りのない方", color: T.green },
    { x: 3.7, label: "前田法律事務所", sub: "死後事務委任契約\n永代供養先の選定\n遺品整理・行政手続", color: T.primary },
    { x: 6.9, label: "貴寺", sub: "永代供養の受入\n生前訪問・法話会\n年忌法要の実施", color: T.accent }
  ];
  tFlows.forEach(function(f) {
    t4.addShape(pres.shapes.RECTANGLE, { x: f.x, y: 1.4, w: 2.6, h: 1.2, fill: { color: f.color }, shadow: makeShadow() });
    t4.addText(f.label, {
      x: f.x, y: 1.4, w: 2.6, h: 1.2,
      fontSize: 15, fontFace: FONTS.header, color: COLORS.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    t4.addText(f.sub, {
      x: f.x, y: 2.8, w: 2.6, h: 1.2,
      fontSize: 11, fontFace: FONTS.body, color: T.text,
      align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.3
    });
  });
  t4.addText("\u2192", { x: 3.1, y: 1.4, w: 0.6, h: 1.2, fontSize: 30, color: T.accent, align: "center", valign: "middle", margin: 0 });
  t4.addText("\u2192", { x: 6.3, y: 1.4, w: 0.6, h: 1.2, fontSize: 30, color: T.accent, align: "center", valign: "middle", margin: 0 });

  // 下部: 収益の流れ
  t4.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 9, h: 0.9, fill: { color: COLORS.white }, shadow: makeShadow() });
  t4.addText([
    { text: "収益の流れ: ", options: { bold: true, color: T.primary } },
    { text: "死後事務委任契約の実行費から永代供養費を貴寺にお支払い。生前の法話会・見学会への参加費も貴寺の収入に。" }
  ], {
    x: 0.8, y: 4.2, w: 8.4, h: 0.8,
    fontSize: 12, fontFace: FONTS.body, color: T.text, valign: "middle", margin: 0
  });

  // --- Slide 5: 貴寺のメリット ---
  var t5 = pres.addSlide();
  t5.background = { color: T.cream };
  t5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t5.addText("貴寺にとってのメリット", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t5.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  var tMerits = [
    { title: "檀家に頼らない新収入源", body: "永代供養費として\n1件30-50万円の安定収入。\n契約者数に応じて拡大。" },
    { title: "営業活動は不要", body: "弁護士が契約者を獲得し\n貴寺にご紹介します。\n営業コストゼロ。" },
    { title: "寺院の存在意義の再定義", body: "「身寄りのない方の最後の拠り所」\nとしてメディア露出の\n可能性も広がります。" },
    { title: "生前からの関係構築", body: "法話会・寺カフェ等で\n契約者と生前交流。\nお布施や寄付の可能性も。" }
  ];

  tMerits.forEach(function(m, i) {
    var mx = (i % 2 === 0) ? 0.5 : 5.2;
    var my = (i < 2) ? 1.2 : 3.1;
    t5.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: 4.3, h: 1.7, fill: { color: COLORS.white }, shadow: makeShadow() });
    t5.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: 0.07, h: 1.7, fill: { color: T.accent } });
    t5.addText(m.title, {
      x: mx + 0.3, y: my + 0.15, w: 3.7, h: 0.4,
      fontSize: 15, fontFace: FONTS.header, color: T.primary, bold: true, margin: 0
    });
    t5.addText(m.body, {
      x: mx + 0.3, y: my + 0.6, w: 3.7, h: 0.95,
      fontSize: 12, fontFace: FONTS.body, color: T.text, margin: 0, lineSpacingMultiple: 1.4
    });
  });

  // --- Slide 6: 収益シミュレーション ---
  var t6 = pres.addSlide();
  t6.background = { color: T.cream };
  t6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t6.addText("収益シミュレーション（貴寺側）", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t6.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  t6.addTable([
    [
      { text: "項目", options: { fill: { color: T.primary }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body } },
      { text: "1年目", options: { fill: { color: T.primary }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } },
      { text: "2年目", options: { fill: { color: T.primary }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } },
      { text: "3年目", options: { fill: { color: T.primary }, color: COLORS.white, bold: true, fontSize: 12, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "紹介契約者数（累計）", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "20名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "60名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "120名", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "年間永代供養受入", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "2件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "6件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "12件", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "永代供養収入（1件40万円）", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "80万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "240万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "480万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "法話会・見学会収入", options: { fontSize: 11, fontFace: FONTS.body } },
      { text: "30万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "60万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } },
      { text: "90万円", options: { fontSize: 11, fontFace: FONTS.body, align: "center" } }
    ],
    [
      { text: "合計収入", options: { fontSize: 12, fontFace: FONTS.body, bold: true, fill: { color: T.cream } } },
      { text: "110万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: T.cream } } },
      { text: "300万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: T.cream } } },
      { text: "570万円", options: { fontSize: 12, fontFace: FONTS.body, bold: true, align: "center", fill: { color: T.cream }, color: T.accent } }
    ]
  ], {
    x: 0.5, y: 1.2, w: 9, h: 2.5,
    border: { pt: 0.5, color: "CCCCCC" },
    colW: [3.5, 1.83, 1.83, 1.84],
    rowH: [0.4, 0.35, 0.35, 0.35, 0.35, 0.4]
  });

  t6.addText("※ 貴寺の初期投資: 0円（連携契約のみ）", {
    x: 0.5, y: 3.9, w: 9, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: T.accent, bold: true, margin: 0
  });
  t6.addText("※ 死亡率10%/年で試算。法話会は月1回・参加費2,000円を想定。お布施・寄付は含まず。", {
    x: 0.5, y: 4.3, w: 9, h: 0.4,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.lightText, margin: 0
  });

  // --- Slide 7: 導入ステップ ---
  var t7 = pres.addSlide();
  t7.background = { color: T.cream };
  t7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: T.primary } });
  t7.addText("はじめかた", { x: 0.6, y: 0, w: 8.8, h: 0.9, fontSize: 20, fontFace: FONTS.header, color: COLORS.white, bold: true, valign: "middle", margin: 0 });
  t7.addText("前田法律事務所  |  Confidential", { x: 0.5, y: 5.2, w: 9, h: 0.4, fontSize: 9, fontFace: FONTS.body, color: COLORS.lightText, align: "right", valign: "middle", margin: 0 });

  var tSteps = [
    { month: "1ヶ月目", title: "ご面談・ご契約", body: "貴寺の方針を確認\n連携基本契約の締結\n永代供養の条件を整理" },
    { month: "2-3ヶ月目", title: "受入体制の整備", body: "永代供養墓の確認\n法話会の企画\n紹介フローの確立" },
    { month: "4ヶ月目〜", title: "ご紹介開始", body: "契約者への貴寺紹介\n生前見学会の実施\n定期的なご報告" }
  ];
  tSteps.forEach(function(st, i) {
    var sx = 0.5 + i * 3.1;
    t7.addShape(pres.shapes.OVAL, { x: sx + 0.9, y: 1.15, w: 0.7, h: 0.7, fill: { color: T.accent } });
    t7.addText(String(i + 1), {
      x: sx + 0.9, y: 1.15, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: FONTS.header, color: COLORS.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    t7.addShape(pres.shapes.RECTANGLE, { x: sx, y: 2.05, w: 2.8, h: 2.8, fill: { color: COLORS.white }, shadow: makeShadow() });
    t7.addText(st.month, {
      x: sx + 0.2, y: 2.2, w: 2.4, h: 0.35,
      fontSize: 11, fontFace: FONTS.body, color: T.accent, bold: true, margin: 0
    });
    t7.addText(st.title, {
      x: sx + 0.2, y: 2.55, w: 2.4, h: 0.45,
      fontSize: 15, fontFace: FONTS.header, color: T.primary, bold: true, margin: 0
    });
    t7.addText(st.body, {
      x: sx + 0.2, y: 3.1, w: 2.4, h: 1.5,
      fontSize: 12, fontFace: FONTS.body, color: T.text, margin: 0, lineSpacingMultiple: 1.5
    });
  });
  t7.addText("\u2192", { x: 3.3, y: 1.15, w: 0.5, h: 0.7, fontSize: 24, color: T.accent, align: "center", valign: "middle", margin: 0 });
  t7.addText("\u2192", { x: 6.4, y: 1.15, w: 0.5, h: 0.7, fontSize: 24, color: T.accent, align: "center", valign: "middle", margin: 0 });

  // --- Slide 8: お問い合わせ ---
  var t8 = pres.addSlide();
  t8.background = { color: T.primary };
  t8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: T.accent } });

  t8.addText("まずはお気軽にご相談ください", {
    x: 1, y: 1.0, w: 8, h: 0.8,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true,
    align: "center", valign: "middle", margin: 0
  });

  t8.addShape(pres.shapes.RECTANGLE, { x: 2, y: 2.1, w: 6, h: 2.5, fill: { color: "FFFFFF" }, shadow: makeShadow() });
  t8.addText([
    { text: "前田法律事務所", options: { fontSize: 22, bold: true, color: T.primary, breakLine: true } },
    { text: "", options: { fontSize: 10, breakLine: true } },
    { text: "代表弁護士  前田", options: { fontSize: 14, breakLine: true, color: T.text } },
    { text: "東京都港区新橋", options: { fontSize: 13, breakLine: true, color: T.text } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "ご興味をお持ちいただけましたら、お気軽にお声がけください。", options: { fontSize: 11, color: COLORS.lightText } }
  ], {
    x: 2.3, y: 2.3, w: 5.4, h: 2.1,
    fontFace: FONTS.body, align: "center", valign: "middle", margin: 0
  });

  t8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: T.accent } });

  return pres;
}


// ============================================
// メイン実行
// ============================================

async function main() {
  try {
    console.log("葬儀社向け提案スライド生成中...");
    var funeral = createFuneralProposal();
    await funeral.writeFile({ fileName: "C:/Users/user/Desktop/claudeマスター/提案書_葬儀社向け.pptx" });
    console.log("葬儀社向け完了: 提案書_葬儀社向け.pptx");

    console.log("お寺向け提案スライド生成中...");
    var temple = createTempleProposal();
    await temple.writeFile({ fileName: "C:/Users/user/Desktop/claudeマスター/提案書_お寺向け.pptx" });
    console.log("お寺向け完了: 提案書_お寺向け.pptx");

    console.log("全スライド生成完了！");
  } catch (err) {
    console.error("エラー:", err);
  }
}

main();
