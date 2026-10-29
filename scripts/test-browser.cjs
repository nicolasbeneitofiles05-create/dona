// Dependencia de desarrollo opcional: npm install --no-save --package-lock=false --prefix .tools playwright
const {chromium}=require('../.tools/node_modules/playwright');
const {readFileSync,writeFileSync}=require('node:fs');
const http=require('node:http');
const assert=require('node:assert/strict');
const emptyNotice='DONA no tiene avisos activos verificados para mostrar. Puede haber campañas en los canales oficiales: consúltalos antes de desplazarte.';
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
  assert.equal(await (await page.request.get(url)).text(),readFileSync('dist/index.html','utf8'),'worker conserva el HTML compilado completo');
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),null,'directorio cerrado inicialmente');
  assert(await page.getByText('Ver el directorio regional',{exact:true}).isVisible());
  assert.equal(await page.locator('nav[aria-label="Navegación"] a').first().getAttribute('href'),'#alertas','mantener Avisos como primer enlace responsive');
  assert.equal(await page.evaluate(()=>noticeState({...reviewedNotices[0],expires_at:'2026-10-29T01:00:00+01:00'},Date.parse('2026-10-28T23:00:00Z'))),'active','fixture activo visible');
  assert.equal(await page.locator('#eventCards .label').innerText(),'Campaña contrastada','aviso vigente visible');
  assert.equal(await page.locator('.history-panel').getAttribute('open'),null,'historial cerrado inicialmente');
  assert.equal(await page.locator('#postal').getAttribute('aria-describedby'),'inputHelp');

  for(const [cp,province] of [['03801','Alicante'],['28007','Madrid'],['13001','Ciudad Real'],['45001','Toledo'],['51001','Ceuta'],['52001','Melilla']]){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   const text=await page.locator('#searchResult').innerText();
   assert(text.includes(province),cp); assert(text.includes('No estamos calculando distancias'));
   assert.equal(await page.locator('#searchResult .result-main').count(),1,'una única acción principal '+cp);
   if(cp==='03801')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://centro-transfusion.san.gva.es/es/puntos-de-donacion-alicante');
   if(cp==='28007'){assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://donarsangre.sanidadmadrid.org/moviles.aspx');assert((await page.locator('.result-scope').innerText()).includes('puntos móviles'));}
   if(cp==='13001'||cp==='45001')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre');
   if(cp==='51001'||cp==='52001')assert.equal(await page.locator('#searchResult .result-main').getAttribute('href'),'https://www.sanidad.gob.es/profesionales/saludPublica/medicinaTransfusional/dondedonar.htm',cp+' usa el directorio estatal exacto');
   assert.equal(new URL(await page.locator('#searchResult .result-main').getAttribute('href')).protocol,'https:',cp+' destino HTTPS');
   if(cp==='13001')assert(!(text.includes('Colectas Toledo')));
   if(cp==='45001')assert(!(text.includes('Colectas Ciudad Real')));
  }
  for(const [cp,ending,label] of [['03440','alicante','Alicante'],['12001','castellon','Castellón'],['46001','valencia','Valencia'],['08001','calendario/','Cataluña'],['17001','calendario/','Cataluña'],['25001','calendario/','Cataluña'],['43001','calendario/','Cataluña']]){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   assert((await page.locator('.result-main').getAttribute('href')).endsWith(ending));assert((await page.locator('.result-main').innerText()).includes(label));
  }
  for(const cp of ['51001','52001']){await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');assert((await page.locator('.result-main').innerText()).includes('Consultar directorio estatal'));assert((await page.locator('.result-scope').innerText()).includes('Orientación parcial'));}
  for(const cp of ['','0380','abcde','00000','99001','Ceuta','Melilla']){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'true',cp);
   assert(await page.locator('#searchResult .error-title').isVisible(),cp);
   assert.equal(await page.locator('#searchResult').getAttribute('role'),'alert',cp+' role alert');
  }
  await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');assert.equal(await page.locator('#postal').getAttribute('aria-invalid'),'false');assert.equal(await page.locator('#searchResult').getAttribute('role'),'status','éxito role status');
  const links=await page.locator('a').evaluateAll(nodes=>nodes.map(n=>({href:n.getAttribute('href'),target:n.target,rel:n.rel})));
  for(const link of links){if(link.href.startsWith('#'))assert.equal(await page.locator(link.href).count(),1,link.href);else if(link.href.startsWith('tel:')){assert(['tel:+34900122112','tel:+34900101020','tel:+34900001403'].includes(link.href),'solo teléfonos contrastados');}else{assert(link.href.startsWith('https://'));assert(link.rel.includes('noopener'));}}
  assert.equal(await page.locator('#radarExpander').getAttribute('open'),null,'Radar plegado al cargar');
  assert(await page.locator('#radarSummaryTitle').isVisible(),'Radar visible como panel compacto');
  assert.equal(await page.locator('#radar-editorial').count(),1,'datos locales incrustados por build');
  assert.equal(await page.evaluate(()=>radarSnapshot.items.length),5,'cinco fuentes fechadas en radar');
  const editorialStates=await page.evaluate(()=>{
    const item=radarSnapshot.items[0];
    return [
      radarState(item,Date.parse('2026-10-29T18:00:00+01:00')),
      radarState(item,Date.parse('2026-10-31T00:00:00+01:00')),
      radarState({...item,editorial_status:'withdrawn'},Date.parse('2026-10-29T18:00:00+01:00')),
      radarState(item,Date.parse('2026-10-28T18:00:00+01:00'))
    ];
  });
  assert.deepEqual(editorialStates,['confirmed','outdated','unknown','unknown'],'caducidad no es disponibilidad');
  assert.equal(await page.locator('#radarLatest .radar-item').count(),0,'no simular verificación futura con reloj de prueba anterior');
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),null,'ayuda Urda plegada al cargar');
  await page.locator('#ayuda-urda summary').click();
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),'','ayuda se despliega');
  const crisisNumbers=await page.locator('#ayuda-urda a[href^="tel:"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')).sort());
  assert.deepEqual(crisisNumbers,['tel:+34900001403','tel:+34900101020','tel:+34900122112'].sort(),'teléfonos de asistencia exactos');
  assert.equal(await page.locator('#ayuda-urda form, #ayuda-urda input, #ayuda-urda textarea').count(),0,'sin captación de datos personales');
  assert(await page.locator('#ayuda-urda').innerText().then(t=>t.includes('No tenemos confirmación de necesidades sanguíneas concretas')),'sin inventar stock');
  assert.equal(await page.locator('#ayuda-urda a[href="https://www.adif.es/viajeros/estado-de-la-red"]').count(),1,'canal ferroviario oficial');
  const familyText=await page.locator('#ayuda-urda').innerText();
  for(const location of ['Madrid','Toledo','Córdoba','Sevilla','Málaga'])assert(familyText.includes(location),'asistencia oficial y ciudades '+location);
  assert(familyText.includes('familiares de primer grado'),'identificación solo a familiares pertinentes');
  assert(familyText.includes('anulaciones gratuitos'),'cambios y anulaciones de operadores');
  assert.equal(await page.locator('#ayuda-urda a[href^="https://web.guardiacivil.es/"]').count(),1,'fuente de Guardia Civil');

  await page.locator('#ayuda-urda summary').press('Enter');
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),null,'ayuda se cierra por teclado');
  await page.goto(url+'/#ayuda-urda');
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),'','enlace directo a familias despliega los teléfonos');
  await page.locator('#ayuda-urda summary').click();
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),null,'ayuda se puede cerrar manualmente');
  await page.locator('nav[aria-label="Navegación"] a[href="#ayuda-urda"]').click();
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),'','mismo hash vuelve a abrir ayuda');
  await page.goto(url);
  assert.equal(await page.locator('#ayuda-urda .urda-assist-expander').getAttribute('open'),null,'sin hash el panel conserva cierre inicial');

  assert.equal(await page.locator('#eventCards .label').innerText(),'Campaña contrastada');
  await page.locator('.directory-disclosure summary').click();
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),'');
  assert.equal(await page.locator('#directory a').count(),17);
  await page.locator('.directory-disclosure summary').press('Enter');
  assert.equal(await page.locator('.directory-disclosure').getAttribute('open'),null,'directorio se cierra con teclado');

  heights['320-initial']=await initialAt(320,568);console.log('320 initial full-page: '+heights['320-initial'].height+'px (includes compact RADAR entry)');assert(heights['320-initial'].height<=2750,JSON.stringify(heights['320-initial']));
  assert(await page.locator('#postal').isVisible());assert(await page.locator('.primary').isVisible());
  const heroBottom320=await page.evaluate(()=>Math.max(document.querySelector('#postal').getBoundingClientRect().bottom,document.querySelector('.primary').getBoundingClientRect().bottom));console.log('Viewport 320x568 · buscador termina en '+heroBottom320+'px');assert(heroBottom320<=568,'CP y botón visibles en 320x568: '+heroBottom320+'px');
  heights['320-28007']=await resultAt('28007');console.log('320 searched full-page: '+heights['320-28007'].height+'px');assert(heights['320-28007'].height<=3350,JSON.stringify(heights['320-28007']));
  heights['390-initial']=await initialAt(390,844);console.log('390 initial full-page: '+heights['390-initial'].height+'px');assert(heights['390-initial'].height<=2650,JSON.stringify(heights['390-initial']));
  assert(await page.locator('#postal').isVisible());assert(await page.locator('.primary').isVisible());
  const heroBottom390=await page.evaluate(()=>Math.max(document.querySelector('#postal').getBoundingClientRect().bottom,document.querySelector('.primary').getBoundingClientRect().bottom));console.log('Viewport 390x844 · buscador termina en '+heroBottom390+'px');assert(heroBottom390<=844,'CP y botón visibles en 390x844: '+heroBottom390+'px');
  heights['390-28007']=await resultAt('28007');assert(heights['390-28007'].height<=3150,JSON.stringify(heights['390-28007']));

  await page.clock.fastForward(6*60*1000);assert.equal(await page.locator('#eventCards').innerText(),emptyNotice,'vacío no afirma ausencia general de campañas');assert(await page.locator('#alertas time').isVisible());assert.equal(await page.locator('#alertas time').getAttribute('datetime'),'2026-10-28T22:50:00Z');assert.equal(await page.locator('.history-panel').getAttribute('open'),null);await page.locator('.history-panel summary').click();assert((await page.locator('#historyCards .label').innerText()).includes('Caducado'),'caducado queda en historial');
  await page.reload();assert.equal(await page.locator('#eventCards').innerText(),emptyNotice,'recargar no renueva');await page.locator('.history-panel summary').click();assert((await page.locator('#historyCards .label').innerText()).includes('Caducado'),'historial persiste tras recarga');
  await page.evaluate(()=>{reviewedNotices.push({...reviewedNotices[0],title:'AVISO FALSO',review_status:'pending',verified:true});renderNotices();});
  assert(!(await page.locator('#eventCards').innerText()).includes('AVISO FALSO'));assert(!(await page.locator('#historyCards').innerText()).includes('AVISO FALSO'));
  await page.setViewportSize({width:1440,height:900});
  await page.evaluate(()=>document.querySelector('.history-panel').open=false);
  const emptyClosed=await page.locator('.active-notice').boundingBox();
  assert(emptyClosed.height<=180,'vacío compacto en escritorio: '+emptyClosed.height);
  await page.locator('.history-panel summary').click();
  const emptyOpen=await page.locator('.active-notice').boundingBox();
  assert(Math.abs(emptyOpen.height-emptyClosed.height)<=1,'abrir historial no estira el vacío');
  await page.evaluate(()=>renderNotices());
  assert(Math.abs((await page.locator('.active-notice').boundingBox()).height-emptyOpen.height)<=1,'revisión estable sin salto de altura');
  // Fixture solo en memoria del navegador de prueba; nunca se escribe en los datos publicados.
  await page.evaluate(()=>{reviewedNotices.push({...reviewedNotices[0],id:'test-only-active',title:'SOLO FIXTURE ACTIVO',message:'Texto largo para comprobar que un aviso activo no se recorta. '.repeat(40),expires_at:'2026-10-30T00:00:00+01:00'});renderNotices();});
  assert(await page.getByText('SOLO FIXTURE ACTIVO',{exact:true}).isVisible());
  assert.equal(await page.locator('.active-notice.is-empty').count(),0);
  assert(!(await page.locator('#eventCards').innerText()).includes(emptyNotice));
  assert((await page.locator('.active-notice').boundingBox()).height>180,'activo largo puede crecer');
  assert(await page.locator('.active-notice').evaluate(el=>el.scrollHeight<=el.clientHeight+1),'activo no recortado');
  await page.evaluate(()=>{reviewedNotices.splice(reviewedNotices.findIndex(x=>x.id==='test-only-active'),1);renderNotices();document.querySelector('.history-panel').open=false;});
  assert.equal(await page.locator('#eventCards').innerText(),emptyNotice);
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
  // Pruebas de la vista real de radar con reloj posterior a la comprobación, sin afectar las de avisos.
  await page.clock.setFixedTime(new Date('2026-10-29T14:00:00+01:00'));
  await page.goto(url+'/#radar');
  assert.equal(await page.locator('#radarExpander').getAttribute('open'),'','deep-link de Radar abre la cronología');
  assert.equal(await page.locator('#radarLatest .radar-item').count(),2,'dos comunicados destacados');
  assert.equal(await page.locator('#radarMore .radar-item').count(),3,'tres comunicados adicionales');
  await page.locator('#radarMoreDisclosure summary').click();
  assert.equal(await page.locator('#radarMoreDisclosure').getAttribute('open'),'','historial adicional abre por teclado/clic');
  const safeRadarLinks=await page.locator('.radar-item a').evaluateAll(nodes=>nodes.map(n=>({url:n.href,rel:n.rel})));
  assert.equal(safeRadarLinks.length,5);
  assert(safeRadarLinks.every(link=>link.url.startsWith('https://')&&link.rel.includes('noopener')),'fuentes seguras');
  await page.clock.setFixedTime(new Date('2026-11-01T14:00:00+01:00'));
  await page.evaluate(()=>renderRadar());
  assert.equal((await page.locator('#radarLatest .radar-item-status').first().innerText()).toLocaleLowerCase('es-ES'),'histórico · verificar vigencia','fuentes se vuelven históricas automáticamente');
  assert.equal(await page.locator('#radarLatest .radar-item-status.is-confirmed').count(),0,'sin falsas fuentes vigentes tras caducidad');
  assert.deepEqual(errors,[]);

  writeFileSync('dist/browser-results.json',JSON.stringify({result:'pass',browser:await browser.version(),postal:['03801','28007','13001','45001','51001','52001'],invalid:['','0380','abcde','00000','99001','Ceuta','Melilla'],widths:[320,375,390,768,1440],heights,compactTargets:{initial320:2750,initial390:2650,result320:3350,result390:3150},directory:{closedByDefault:true,communities:17,keyboard:true},primaryOfficialAction:true,expiry:true,reload:true,fakeNotice:true,anchorLinks:true,keyboard:true,reducedMotion:true,jsErrors:errors},null,2));
  console.log('Navegador: recorrido compacto, alturas, CP, resultado oficial único, directorio plegable, regresiones y 5 anchuras: OK');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
