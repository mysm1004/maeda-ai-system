import http.server
import os

class UTF8Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        from urllib.parse import unquote
        path = unquote(path, encoding='utf-8')
        return super().translate_path(path)

os.chdir(os.path.dirname(os.path.abspath(__file__)))
server = http.server.HTTPServer(('', 8765), UTF8Handler)
print("Serving on http://localhost:8765")
server.serve_forever()
