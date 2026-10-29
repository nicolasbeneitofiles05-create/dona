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
  await page.clock.install({time:new Date('2026-10-28T22:55:00Z')});
  const heights={};
  const measure=async()=>await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:innerWidth,viewportHeight:innerHeight}));
  const initialAt=async(width,height)=>{await page.setViewportSize({width,height});await page.goto(url);return measure()};
  const resultAt=async(cp)=>{await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');return measure()};
  await page.goto(url);
  assert.equal(await (await page.request.get(url)).text(),readFileSync('index.html','utf8'),'worker conserva el HTML completo');
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),null,'directorio cerrado inicialmente');
  assert(await page.getByText('Ver el directorio regional',{exact:true}).isVisible());
  assert.equal(await page.evaluate(()=>noticeState({...reviewedNotices[0],expires_at:'2026-10-29T01:00:00+01:00'},Date.parse('2026-10-28T23:00:00Z'))),'active','fixture activo visible');
  assert.equal(await page.locator('#eventCards .label').innerText(),'Campaña contrastada','aviso vigente visible');
  assert.equal(await page.locator('.history-panel').getAttribute('open'),null,'historial cerrado inicialmente');
  assert.equal(await page.locator('#postal').getAttribute('aria-describedby'),'inputHelp');

  for(const [cp,province] of [['03801','Alicante'],['28007','Madrid'],['13001','Ciudad Real'],['45001','Toledo'],['51001','Ceuta'],['52001','Melilla']]){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   const text=await page.locator('#searchResult').innerText();
   assert(text.includes(province),cp); assert(text.includes('No estamos calculando distancias'));
   assert.equal(await page.locator('#searchResult .result-main').count(),1,'una única acción principal '+cp);
   if(cp==='03801')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://centro-transfusion.san.gva.es/es/puntos-de-donacion');
   if(cp==='28007')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://www.comunidad.madrid/salud/donacion-sangre');
   if(cp==='13001'||cp==='45001')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre');
   if(cp==='51001'||cp==='52001')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://www.sanidad.gob.es/profesionales/saludPublica/medicinaTransfusional/dondedonar.htm',cp+' usa el directorio estatal exacto');
   assert.equal(new URL(await page.locator('#searchResult .result-main').getAttribute('href')).protocol,'https:',cp+' destino HTTPS');
   if(cp==='13001')assert(!(text.includes('Colectas Toledo')));
   if(cp==='45001')assert(!(text.includes('Colectas Ciudad Real')));
  }
  for(const cp of ['','0380','abcde','00000','99001','Ceuta','Melilla']){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'true',cp);
   assert(await page.locator('#searchResult .error-title').isVisible(),cp);
   assert.equal(await page.locator('#searchResult').getAttribute('role'),'alert',cp+' role alert');
  }
  await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'false');assert.equal(await page.locator('#searchResult').getAttribute('role'),'status','éxito role status');
  const links=await page.locator('a').evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute('href'),target:n.target,rel:n.rel})));
  for(const link of links){if(link.href.startsWith('#'))assert.equal(await page.locator(link.href).count(),1,link.href);else{assert(link.href.startsWith('https://'));assert(link.rel.includes('noopener'));}}
  assert.equal(await page.locator('#eventCards .label').innerText(),'Campaña contrastada');
  await page.locator('.directory-disclosure summary').click();
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),'');
  assert.equal(await page.locator('#directory a').count(),17);
  await page.locator('.directory-disclosure summary').press('Enter');
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),null,'directorio se cierra con teclado');

  heights['320-initial']=await initialAt(320,568);assert(heights['320-initial'].height<=2600,JSON.stringify(heights['320-initial']));
  assert(await page.locator('#postal').isVisible());assert(await page.locator('.primary').isVisible());
  const heroBottom320=await page.evaluate(()=>Math.max(document.querySelector('#postal').getBoundingClientRect().bottom,document.querySelector('.primary').getBoundingClientRect().bottom));assert(heroBottom320<=568,'CP y botón visibles en 320x568');
  heights['320-28007']=await resultAt('28007');assert(heights['320-28007'].height<=3100,JSON.stringify(heights['320-28007']));
  heights['390-initial']=await initialAt(390,844);assert(heights['390-initial'].height<=2400,JSON.stringify(heights['390-initial']));
  assert(await page.locator('#postal').isVisible());assert(await page.locator('.primary').isVisible());
  const heroBottom390=await page.evaluate(()=>Math.max(document.querySelector('#postal').getBoundingClientRect().bottom,document.querySelector('.primary').getBoundingClientRect().bottom));assert(heroBottom390<=844,'CP y botón visibles en 390x844');
  heights['390-28007']=await resultAt('28007');assert(heights['390-28007'].height<=2900,JSON.stringify(heights['390-28007']));

  await page.clock.fastForward(6*60*1000);assert((await page.locator('#eventCards').innerText()).includes('No hay avisos vigentes'),'caducado sale de vigentes');assert.equal(await page.locator('.history-panel').getAttribute('open'),null);await page.locator('.history-panel summary').click();assert((await page.locator('#historyCards .label').innerText()).includes('Caducado'),'caducado queda en historial');
  await page.reload();assert((await page.locator('#eventCards').innerText()).includes('No hay avisos vigentes'),'recargar no renueva');await page.locator('.history-panel summary').click();assert((await page.locator('#historyCards .label').innerText()).includes('Caducado'),'historial persiste tras recarga');
  await page.evaluate(()=>{reviewedNotices.push({...reviewedNotices[0],title:'AVISO FALSO',review_status:'pending',verified:true});renderNotices();});
  assert(!(await page.locator('#eventCards').innerText()).includes('AVISO FALSO'));assert(!(await page.locator('#historyCards').innerText()).includes('AVISO FALSO'));
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
  writeFileSync('dist/browser-results.json',JSON.stringify({result:'pass',browser:await browser.version(),postal:['03801','28007','13001','45001','51001','52001'],invalid:['','0380','abcde','00000','99001','Ceuta','Melilla'],widths:[320,375,390,768,1440],heights,compactTargets:{initial320:2600,initial390:2400,result320:3100,result390:2900},directory:{closedByDefault:true,communities:17,keyboard:true},primaryOfficialAction:true,expiry:true,reload:true,fakeNotice:true,anchorLinks:true,keyboard:true,reducedMotion:true,jsErrors:errors},null,2));
  console.log('Navegador: recorrido compacto, alturas, CP, resultado oficial único, directorio plegable, regresiones y 5 anchuras: OK');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
