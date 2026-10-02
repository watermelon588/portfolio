const fs=require('fs');const path=require('path');const sharp=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const {chromium}=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url');const OUT=__dirname;
const viz='C:/Users/Rohit Maity/.codex/visualizations/2026/10/01/01a0f7ad-ef0b-7211-9887-3344ace48523/tripverse-ten-graphics.html';
(async()=>{
 let html=fs.readFileSync(viz,'utf8');const manifest=JSON.parse(fs.readFileSync(path.join(OUT,'manifest.json'),'utf8'));
 for(const p of manifest){const b=await sharp(path.join(OUT,p.png)).resize({width:740,height:780,fit:'inside'}).jpeg({quality:65}).toBuffer();html=html.replace(`{{${p.id}}}`,`data:image/jpeg;base64,${b.toString('base64')}`);}
 if(/\{\{/.test(html))throw new Error('Missing preview');fs.writeFileSync(viz,html);console.log('Inline gallery bytes',Buffer.byteLength(html));
 const checks=JSON.parse(fs.readFileSync(path.join(OUT,'verification.json'),'utf8'));
 for(const p of manifest){for(const ext of ['png','jpg']){const m=await sharp(path.join(OUT,'posters',p.id+'.'+ext)).metadata();if(m.width!==p.width||m.height!==p.height)throw new Error('Incorrect dimensions: '+p.id);}const c=checks.find(c=>c.id===p.id);if(!c.items.every(i=>i.inside))throw new Error('Text bounds '+p.id);for(const family of ['Instrument Serif','Geist','Geist Mono']){if(!c.fonts.some(f=>f.family===family&&f.status==='loaded'))throw new Error('Missing font '+p.id);}if(c.logoStroke!=='currentColor')throw new Error('Logo changed');}
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,736,1440]){await page.setViewportSize({width,height:900});await page.goto(pathToFileURL(path.join(OUT,'gallery.html')).href);await page.evaluate(()=>document.fonts.ready);const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].map(i=>i.complete&&i.naturalWidth>0)}));if(state.overflow||state.images.some(x=>!x))throw new Error('Gallery failure at '+width);console.log('Gallery',width,'OK');}
 await browser.close();if(errors.length)throw new Error(errors.join('; '));console.log('Ten PNGs, ten JPEGs, exact fonts, text bounds and gallery verified.');
})().catch(e=>{console.error(e);process.exitCode=1});
