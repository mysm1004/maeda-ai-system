"""LINE_banner_spring.html からバナー画像をPNGとして書き出すスクリプト"""
import pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
HTML_FILE = HERE / "LINE_banner_spring.html"
OUT_DIR = HERE

def export_banners():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # --- バナー1: 1040x1300 ---
        page = browser.new_page(viewport={"width": 1040, "height": 1300})
        page.goto(f"file:///{HTML_FILE.as_posix()}")
        page.wait_for_load_state("networkidle")
        # 少し待ってCanvas透過処理を完了させる
        page.wait_for_timeout(1000)

        banner1 = page.locator(".banner-main")
        banner1.screenshot(path=str(OUT_DIR / "banner1_1040x1300.png"))
        print(f"[OK] banner1_1040x1300.png 書き出し完了")

        # --- バナー2: 1040x520 (2:1) ---
        page2 = browser.new_page(viewport={"width": 1040, "height": 800})
        page2.goto(f"file:///{HTML_FILE.as_posix()}")
        page2.wait_for_load_state("networkidle")
        page2.wait_for_timeout(1000)

        banner2 = page2.locator(".banner-card")
        banner2.screenshot(path=str(OUT_DIR / "banner2_1040x520.png"))
        print(f"[OK] banner2_1040x520.png 書き出し完了")

        browser.close()

if __name__ == "__main__":
    export_banners()
