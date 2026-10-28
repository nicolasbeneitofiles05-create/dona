"""Comprobación manual bajo demanda; HTTP no verifica contenido sanitario."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json, re, urllib.request, urllib.error

root=Path(__file__).resolve().parents[1]
urls=sorted(set(re.findall(r'https://[^\s\x22\x27<>]+', (root/'index.html').read_text(encoding='utf-8'))))
def check(url):
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'DONA-link-check/1.0'},method='GET')
        with urllib.request.urlopen(req,timeout=12) as r:
            return {'url':url,'status':r.status,'final_url':r.url,'content_verified':False}
    except urllib.error.HTTPError as e:
        return {'url':url,'status':e.code,'content_verified':False}
    except Exception as e:
        return {'url':url,'status':None,'error':type(e).__name__,'content_verified':False}
with ThreadPoolExecutor(max_workers=8) as pool:
    results=list(pool.map(check,urls))
(root/'dist').mkdir(exist_ok=True)
(root/'dist'/'link-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'total':len(results),'http_2xx':sum(isinstance(r['status'],int) and 200<=r['status']<300 for r in results),'others':[{'url':r['url'],'status':r['status']} for r in results if not isinstance(r['status'],int) or r['status']>=300]},ensure_ascii=False))
