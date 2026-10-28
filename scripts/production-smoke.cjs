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
  assert.equal(await page.locator('#eventCards .label').innerText(),'Caducado · no es un aviso activo');
  assert(!(await page.locator('body').innerText()).includes('Mancha Centro'));
  assert(!(await page.locator('body').innerText()).includes('Hospital General de Valdepeñas'));
  assert(!(await page.locator('body').innerText()).includes('Llamamiento Urda'));
  await page.reload();assert((await page.locator('#eventCards .label').innerText()).includes('Caducado'));
  const widths=[320,390];
  for(const width of widths){
   await page.setViewportSize({width,height:844});
   await page.locator('#postal').fill('28007');await page.locator('#postal').press('Enter');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   assert(await page.getByRole('link',{name:'Avisos',exact:true}).isVisible());
   await page.screenshot({path:`dist/production-${width}.png`,fullPage:true});
  }
  assert.deepEqual(errors,[]);
  const report={url,status:response.status(),checked_at:new Date().toISOString(),sha,html_sha256:createHash('sha256').update(body).digest('hex'),byte_match:true,postal_28007:true,expired_after_reload:true,withdrawn_notices_absent:true,mobile_widths:widths,js_errors:errors,browser:await browser.version()};
  writeFileSync('dist/production-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
