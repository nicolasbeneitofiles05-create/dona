// Dependencia de desarrollo opcional: npm install --no-save --package-lock=false --prefix .tools playwright
const {chromium}=require('../.tools/node_modules/playwright');
const {readFileSync,writeFileSync}=require('node:fs');
const http=require('node:http');
const assert=require('node:assert/strict');
(async()=>{
 const worker=(await import('data:text/javascript;base64,'+readFileSync('dist/_worker.js').toString('base64'))).default;
 const server=http.createServer(async(req,res)=>{const r=await worker.fetch(new Request('http://localhost'+req.url));res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
 browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const url='http://127.0.0.1:'+server.address().port;
 await page.clock.install({time:new Date('2026-10-28T22:55:00Z')});await page.goto(url);
 assert.equal(await (await page.request.get(url)).text(),readFileSync('index.html','utf8'),'worker conserva el HTML completo');
 for(const [cp,province] of [['03801','Alicante'],['28007','Madrid'],['13001','Ciudad Real'],['45001','Toledo'],['51001','Ceuta'],['52001','Melilla']]){
  await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
  assert((await page.locator('#searchResult').innerText()).includes(province),cp);
  assert((await page.locator('#searchResult').innerText()).includes('No estamos calculando distancias'));
  if(cp==='13001')assert(!(await page.locator('#searchResult').innerText()).includes('Colectas Toledo'));
  if(cp==='45001')assert(!(await page.locator('#searchResult').innerText()).includes('Colectas Ciudad Real'));
 }
 for(const cp of ['','0380','abcde','00000','99001','Ceuta','Melilla']){
  await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
  assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'true',cp);
 }
 await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'false');
 const links=await page.locator('a').evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute('href'),target:n.target,rel:n.rel})));
 for(const link of links){if(link.href.startsWith('#'))assert.equal(await page.locator(link.href).count(),1,link.href);else{assert(link.href.startsWith('https://'));assert(link.rel.includes('noopener'));}}
 assert.equal(await page.locator('#eventCards .label').innerText(),'Campaña contrastada');
 await page.clock.fastForward(6*60*1000);assert((await page.locator('#eventCards .label').innerText()).includes('Caducado'));
 await page.reload();assert((await page.locator('#eventCards .label').innerText()).includes('Caducado'),'recargar no renueva');
 await page.evaluate(()=>{reviewedNotices.push({...reviewedNotices[0],title:'AVISO FALSO',review_status:'pending',verified:true});renderNotices();});
 assert(!(await page.locator('#eventCards').innerText()).includes('AVISO FALSO'));
 for(const width of [320,375,390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.locator('#postal').fill('03801');await page.locator('#postal').press('Enter');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`desbordamiento ${width}`);
  assert(await page.getByRole('link',{name:'Avisos',exact:true}).isVisible());
  await page.screenshot({path:`dist/mobile-${width}.png`,fullPage:true});
 }
 await page.goto(url);await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Saltar al contenido');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 assert.equal((await page.request.get(url+'/missing')).status(),404);
 assert.deepEqual(errors,[]);
 writeFileSync('dist/browser-results.json',JSON.stringify({result:'pass',browser:await browser.version(),postal:['03801','28007','13001','45001','51001','52001'],invalid:['','0380','abcde','00000','99001','Ceuta','Melilla'],widths:[320,375,390,768,1440],expiry:true,reload:true,fakeNotice:true,anchorLinks:true,keyboard:true,reducedMotion:true,jsErrors:errors},null,2));
 console.log('Navegador: CP, inválidos, caducidad en pestaña/recarga, aviso falso, enlaces internos, teclado y 5 anchuras: OK');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
