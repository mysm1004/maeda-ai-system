# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

from openpyxl import load_workbook
from openpyxl.chart import PieChart, LineChart, Reference
from openpyxl.chart.series import DataPoint
from openpyxl.chart.label import DataLabelList
from openpyxl.chart.text import RichText
from openpyxl.drawing.text import Paragraph, ParagraphProperties, CharacterProperties, Font as DrawingFont, RichTextProperties, RegularTextRun
from openpyxl.chart.layout import Layout, ManualLayout
from openpyxl.chart.title import Title
from openpyxl.chart.text import RichText as ChartText
from openpyxl.utils.dataframe import dataframe_to_rows
from copy import deepcopy

FILE = r'C:\Users\user\Desktop\claudeマスター\事業管理\建物明渡\全保連解除＆退去案件まとめ【260309】.xlsx'

wb = load_workbook(FILE)
ws = wb['グラフ分析']

# ---- 既存チャートを全て削除 ----
ws._charts = []

# ---- データはそのまま使う（既にセルに入っている） ----
# ① A4:B7  全体円グラフ
# ② A22:B25 提訴前円グラフ
# ③ A40:B43 提訴後円グラフ
# ④ A58:C65 折れ線グラフ

# === 共通設定 ===
PIE_COLORS = ['92D050', '5B9BD5', 'BFBFBF']  # 緑(退去), 青(回収), グレー(未解決)

# フォント設定用ヘルパー
def make_jp_font(sz=1000, bold=False):
    return CharacterProperties(
        latin=DrawingFont(typeface='游ゴシック'),
        ea=DrawingFont(typeface='游ゴシック'),
        sz=sz, b=bold
    )

def make_title_text(text, sz=1200):
    """チャートタイトル用"""
    from openpyxl.chart.text import Text
    run = RegularTextRun(rPr=make_jp_font(sz=sz, bold=True), t=text)
    para = Paragraph(pPr=ParagraphProperties(defRPr=make_jp_font(sz=sz, bold=True)), r=[run])
    rich = RichText(p=[para])
    tx = Text(rich=rich)
    return Title(tx=tx)

def create_pie_chart(ws, title_text, cat_range, val_range, anchor, totals):
    """円グラフ作成 - パーセントと件数を明確に表示"""
    pie = PieChart()
    pie.title = make_title_text(title_text, sz=1100)
    pie.style = 10

    data = Reference(ws, **val_range)
    cats = Reference(ws, **cat_range)
    pie.add_data(data, titles_from_data=False)
    pie.set_categories(cats)

    # 色を設定
    series = pie.series[0]
    for i, color in enumerate(PIE_COLORS):
        pt = DataPoint(idx=i)
        pt.graphicalProperties.solidFill = color
        series.data_points.append(pt)

    # データラベル: カテゴリ名 + パーセンテージのみ（件数はタイトルに総数あり）
    series.dLbls = DataLabelList()
    series.dLbls.showPercent = True
    series.dLbls.showCatName = True
    series.dLbls.showVal = True  # 件数も表示
    series.dLbls.showSerName = False
    series.dLbls.showLeaderLines = True
    series.dLbls.numFmt = '0.0%'  # パーセント表示を小数1桁に
    # ラベルフォント
    series.dLbls.txPr = RichText(
        p=[Paragraph(
            pPr=ParagraphProperties(defRPr=make_jp_font(sz=900)),
            r=[]
        )]
    )

    # 凡例フォント
    pie.legend.txPr = RichText(
        p=[Paragraph(
            pPr=ParagraphProperties(defRPr=make_jp_font(sz=900)),
            r=[]
        )]
    )

    pie.width = 16
    pie.height = 12

    ws.add_chart(pie, anchor)
    return pie

# ---- ①全体の円グラフ ----
total_all = 124 + 92 + 279  # 495
create_pie_chart(
    ws,
    title_text=f'全体の解決状況（全{total_all}件）',
    cat_range={'min_col': 1, 'min_row': 5, 'max_row': 7},
    val_range={'min_col': 2, 'min_row': 5, 'max_row': 7},
    anchor='D3',
    totals=total_all
)

# ---- ②提訴前の円グラフ ----
total_pre = 103 + 79 + 200  # 382
create_pie_chart(
    ws,
    title_text=f'提訴前案件の解決状況（全{total_pre}件）',
    cat_range={'min_col': 1, 'min_row': 23, 'max_row': 25},
    val_range={'min_col': 2, 'min_row': 23, 'max_row': 25},
    anchor='D21',
    totals=total_pre
)

# ---- ③提訴後の円グラフ ----
total_post = 21 + 13 + 79  # 113
create_pie_chart(
    ws,
    title_text=f'提訴後案件の解決状況（全{total_post}件）',
    cat_range={'min_col': 1, 'min_row': 41, 'max_row': 43},
    val_range={'min_col': 2, 'min_row': 41, 'max_row': 43},
    anchor='D39',
    totals=total_post
)

# ---- ④折れ線グラフ（大幅改善） ----
line = LineChart()
line.title = make_title_text('月別 解決率・任意退去率の推移（25年7月～26年1月）', sz=1100)
line.style = 10
line.width = 20
line.height = 14

# データ
data_ref = Reference(ws, min_col=2, min_row=58, max_col=3, max_row=65)
cats_ref = Reference(ws, min_col=1, min_row=59, max_row=65)
line.add_data(data_ref, titles_from_data=True)
line.set_categories(cats_ref)

# Y軸設定
line.y_axis.title = '割合（%）'
line.y_axis.numFmt = '0%'
line.y_axis.scaling.min = 0
line.y_axis.scaling.max = 0.6
line.y_axis.majorUnit = 0.1    # 10%刻み
line.y_axis.minorUnit = 0.05   # 5%刻みのマイナー目盛
line.y_axis.majorGridlines = None  # デフォルトのグリッド線を有効
line.y_axis.delete = False
# Y軸タイトルフォント
line.y_axis.txPr = RichText(
    p=[Paragraph(
        pPr=ParagraphProperties(defRPr=make_jp_font(sz=900)),
        r=[]
    )]
)
# Y軸数値ラベルフォント
line.y_axis.numFmt = '0%'

# X軸設定
line.x_axis.title = '月'
line.x_axis.delete = False
line.x_axis.tickLblPos = 'low'
# X軸ラベルフォント
line.x_axis.txPr = RichText(
    p=[Paragraph(
        pPr=ParagraphProperties(defRPr=make_jp_font(sz=900)),
        r=[]
    )]
)

# 系列の色とスタイル
# 解決率: 青
s0 = line.series[0]
s0.graphicalProperties.line.solidFill = '4472C4'
s0.graphicalProperties.line.width = 28000  # 太めの線
s0.marker.symbol = 'circle'
s0.marker.size = 7
s0.marker.graphicalProperties.solidFill = '4472C4'
# ★データラベルを削除（線にかぶる文字をなくす）
s0.dLbls = None

# 任意退去率: 緑
s1 = line.series[1]
s1.graphicalProperties.line.solidFill = '92D050'
s1.graphicalProperties.line.width = 28000
s1.marker.symbol = 'square'
s1.marker.size = 7
s1.marker.graphicalProperties.solidFill = '92D050'
# ★データラベルを削除
s1.dLbls = None

# 凡例フォント
line.legend.txPr = RichText(
    p=[Paragraph(
        pPr=ParagraphProperties(defRPr=make_jp_font(sz=1000)),
        r=[]
    )]
)
line.legend.position = 'b'  # 凡例を下に

ws.add_chart(line, 'D57')

# ---- 保存 ----
wb.save(FILE)
print('グラフ修正完了！')
print('変更点:')
print('  円グラフ: カテゴリ名 + 件数 + パーセント(小数1桁)を表示')
print('  折れ線: データラベル(線上の文字)削除、Y軸10%刻み目盛、X軸月名表示、凡例下配置')
