from pathlib import Path
import base64, json, re, runpy

root = Path(__file__).resolve().parents[1]
source = (root / 'index.html').read_bytes()
assert source.lstrip().lower().startswith(b'<!doctype html>')
assert source.rstrip().lower().endswith(b'</html>')
catalogue = json.loads((root / 'data/official-entrypoints.json').read_text(encoding='utf-8'))
validate = runpy.run_path(str(root / 'scripts/validate-entrypoints.py'))['validate']
problems = validate(catalogue)
if problems:
    raise ValueError('Catálogo de navegación inválido: ' + '; '.join(problems))
payload = json.dumps(catalogue, ensure_ascii=False).replace('<', '\\u003c')
html, replaced = re.subn(r'(<script id="official-entrypoints" type="application/json">).*?(</script>)',
                         lambda match: match[1] + payload + match[2], source.decode('utf-8'), flags=re.S)
assert replaced == 1, 'Debe existir un único bloque de navegación local'
# Radar is a dated, manually reviewed snapshot. No API or feed is contacted at build time.
radar = json.loads((root / 'data/incidents.json').read_text(encoding='utf-8'))
radar_validate = runpy.run_path(str(root / 'scripts/validate-radar.py'))['validate']
radar_problems = radar_validate(radar)
if radar_problems:
    raise ValueError('Índice editorial RADAR inválido: ' + '; '.join(radar_problems))
radar_payload = json.dumps(radar, ensure_ascii=False).replace('<', '\\u003c')
html, radar_replaced = re.subn(r'(<script id="radar-editorial" type="application/json">).*?(</script>)',
                               lambda match: match[1] + radar_payload + match[2], html, flags=re.S)
assert radar_replaced == 1, 'Debe existir un único índice editorial de RADAR'
source = html.encode('utf-8')
encoded = base64.b64encode(source).decode('ascii')
worker = 'const bytes=Uint8Array.from(atob(' + json.dumps(encoded) + '),c=>c.charCodeAt(0)); export default {async fetch(request){const path=new URL(request.url).pathname; if(path!=="/"&&path!=="/index.html")return new Response("Not found",{status:404});return new Response(bytes,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=60","x-content-type-options":"nosniff"}});}};'
out = root / 'dist'
out.mkdir(exist_ok=True)
(out / 'index.html').write_bytes(source)
(out / '_worker.js').write_text(worker, encoding='utf-8')
print(f'Generated dist/_worker.js from {len(source)} bytes')
