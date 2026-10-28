from pathlib import Path
import base64, json

root = Path(__file__).resolve().parents[1]
source = (root / 'index.html').read_bytes()
assert source.lstrip().lower().startswith(b'<!doctype html>')
assert source.rstrip().lower().endswith(b'</html>')
encoded = base64.b64encode(source).decode('ascii')
worker = 'const bytes=Uint8Array.from(atob(' + json.dumps(encoded) + '),c=>c.charCodeAt(0)); export default {async fetch(request){const path=new URL(request.url).pathname; if(path!=="/"&&path!=="/index.html")return new Response("Not found",{status:404});return new Response(bytes,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=60","x-content-type-options":"nosniff"}});}};'
out = root / 'dist'
out.mkdir(exist_ok=True)
(out / '_worker.js').write_text(worker, encoding='utf-8')
print(f'Generated dist/_worker.js from {len(source)} bytes')
