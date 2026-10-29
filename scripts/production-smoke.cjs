// Comprobación bajo demanda del despliegue público; no cambia producción.
const {chromium}=require('../.tools/node_modules/playwright');
const {readFileSync,writeFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const assert=require('node:assert/strict');
(async()=>{
 const url=process.env.DONA_URL||'https://dona-2fp.pages.dev';
 const sha=process.argv[3];
 assert(/^[a-f0-9]{40}$/.test(sha||''),'Indicar SHA exacto como tercer argumento: node scripts/production-smoke.cjs <HTML del artefacto> <SHA>');
 const expected=readFileSync(process.argv[2]||'index.html');
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(url+'/?release-check='+sha.slice(0,8),{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  const body=await response.body();assert(body.equals(expected),'HTML público coincide byte a byte con artefacto del SHA');
  await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');
  assert((await page.locator('#searchResult').innerText()).includes('Madrid'));
  assert((await page.locator('#searchResult').innerText()).includes('No estamos calculando distancias'));
  const emptyNotice='DONA no tiene avisos activos verificados para mostrar. Puede haber campañas en los canales oficiales: consúltalos antes de desplazarte.';
  assert.equal(await page.locator('#eventCards').innerText(),emptyNotice);
  assert(await page.locator('#alertas time').isVisible());
  assert.equal(await page.locator('#eventCards .card').count(),0);
  assert.equal(await page.locator('.history-panel').getAttribute('open'),null);
  await page.locator('.history-panel summary').click();
  assert.equal(await page.locator('#historyCards .label').innerText(),'Caducado · no es un aviso activo');
  assert(!(await page.locator('body').innerText()).includes('Mancha Centro'));
  assert(!(await page.locator('body').innerText()).includes('Hospital General de Valdepeñas'));
  assert(!(await page.locator('body').innerText()).includes('Llamamiento Urda'));
  await page.reload();assert.equal(await page.locator('#eventCards').innerText(),emptyNotice);
  await page.locator('.history-panel summary').click();assert((await page.locator('#historyCards .label').innerText()).includes('Caducado'));
  await page.locator('.history-panel summary').click();
  const widths=[320,390,1440];
  for(const width of widths){
   await page.setViewportSize({width,height:844});
   await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   assert(await page.getByRole('link',{name:'Avisos',exact:true}).isVisible());
   if(width===1440)assert((await page.locator('.active-notice').boundingBox()).height<=180);
   await page.screenshot({path:`dist/production-${width}.png`,fullPage:true});
  }
  const national='https://www.sanidad.gob.es/profesionales/saludPublica/medicinaTransfusional/dondedonar.htm';
  const destinations={};
  for(const [cp,expectedUrl] of [['03801','https://centro-transfusion.san.gva.es/es/puntos-de-donacion'],['28007','https://www.comunidad.madrid/salud/donacion-sangre'],['13001','https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre'],['45001','https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre'],['51001',national],['52001',national]]){
   await page.locator('#postal').fill(cp);await page.locator('#postal').press('Enter');
   const href=await page.locator('#searchResult .result-main').getAttribute('href');assert.equal(href,expectedUrl);assert.equal(new URL(href).protocol,'https:');destinations[cp]=href;
   if(cp==='51001'||cp==='52001'){
    const [popup]=await Promise.all([page.waitForEvent('popup'),page.locator('#searchResult .result-main').click()]);
    await popup.waitForLoadState('domcontentloaded');assert.equal(new URL(popup.url()).hostname,'www.sanidad.gob.es');assert(popup.url().includes('dondedonar.htm'));await popup.close();
   }
  }
  assert.equal((await page.request.get(national)).status(),200);
  assert.deepEqual(errors,[]);
  const report={url,status:response.status(),checked_at:new Date().toISOString(),sha,html_sha256:createHash('sha256').update(body).digest('hex'),byte_match:true,official_destinations:destinations,ceuta_melilla_click:true,postal_28007:true,expired_after_reload:true,withdrawn_notices_absent:true,viewport_widths:widths,js_errors:errors,browser:await browser.version()};
  writeFileSync('dist/production-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
