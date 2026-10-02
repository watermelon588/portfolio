const { chromium } = require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
 const output = path.join(__dirname, 'posters');
 fs.mkdirSync(output, {recursive:true});
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const page = await browser.newPage({viewport:{width:2464,height:2100},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',error=>errors.push(String(error)));
 await page.goto('file:///'+path.join(__dirname,'poster-source.html').replaceAll('\\','/'),{waitUntil:'load'});
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForFunction(()=>[...document.querySelectorAll('[data-art]')].every(img=>img.complete&&img.naturalWidth>0));
 await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode())));
 const fonts=await page.evaluate(()=>[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family));
 if(!fonts.includes('Geist Variable')||!fonts.includes('Geist Mono Variable'))throw Error('Real brand fonts not loaded');
 const posters=await page.locator('[data-poster]').evaluateAll(elements=>elements.map(el=>({slug:el.dataset.poster,name:el.dataset.name,width:Number(el.dataset.width),height:Number(el.dataset.height),ratio:el.dataset.ratio})));
 const measurements=[];
 for(const poster of posters){
  const element=page.locator('[data-poster="'+poster.slug+'"]');
  const m=await element.evaluate(el=>{
   const bounds=el.getBoundingClientRect();
   const headings=[...el.querySelectorAll('h1,.brand,.footer-label,.folio,.station,.step')].map(n=>{const b=n.getBoundingClientRect();return {text:n.innerText,width:b.width,height:b.height,left:b.left-bounds.left,right:b.right-bounds.left,top:b.top-bounds.top,bottom:b.bottom-bounds.top};});
   const overflow=headings.filter(h=>h.left<0||h.right>bounds.width+1||h.top<0||h.bottom>bounds.height+1);
   return {width:bounds.width,height:bounds.height,overflow,headingWeight:getComputedStyle(el.querySelector('h1')).fontWeight};
  });
  if(m.width!==poster.width||m.height!==poster.height||m.overflow.length)throw Error('Poster dimensions or typography clipping: '+poster.slug+' '+JSON.stringify(m));
  await element.screenshot({path:path.join(output,poster.slug+'.png')});
  measurements.push({...poster,...m});
  console.log('Rendered '+poster.slug+' '+poster.width+'x'+poster.height);
 }
 const report={posters:posters.length,originalImageUses:await page.locator('[data-art]').count(),fonts,errors,measurements};
 fs.writeFileSync(path.join(__dirname,'qa-results.json'),JSON.stringify(report,null,2));
 const fontCSS=fs.readFileSync(path.join(__dirname,'font-faces.css'),'utf8');
 const gallery=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Walkthru · Ten visual posters</title><style>${fontCSS}
 :root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f4f4f5;color:#1b1b1f;font-family:'Geist Variable',system-ui,sans-serif;-webkit-font-smoothing:antialiased}main{max-width:1600px;padding:48px 32px;margin:auto}header{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-bottom:48px}.brand{display:flex;align-items:center;gap:12px;font-size:22px}.brand img{width:32px;height:35px}h1{font-size:clamp(28px,4vw,48px);font-weight:200;letter-spacing:-.035em;margin:0}header p{font-family:'Geist Mono Variable',monospace;font-size:12px;color:#63636b;line-height:1.6}section{columns:3 360px;column-gap:32px}figure{break-inside:avoid;margin:0 0 32px}figure a{display:block}figure img{display:block;width:100%;height:auto}figcaption{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:13px;font-size:14px}figcaption span:last-child{font-family:'Geist Mono Variable',monospace;color:#63636b;font-size:11px}:focus-visible{outline:2px solid #4d7274;outline-offset:4px}@media(max-width:600px){main{padding:24px 16px}header{margin-bottom:28px}section{columns:1}}
 </style></head><body><main><header><div class="brand"><img src="assets/walkthru-mark.png" alt="">Walkthru</div><h1>A world of fresh eyes.</h1><p>10 visual posters<br>Geist · Original artwork · Different perspectives</p></header><section aria-label="Ten Walkthru posters">${posters.map(p=>`<figure><a href="posters/${p.slug}.png" target="_blank" rel="noopener" aria-label="Open ${p.name} at full resolution"><img src="posters/${p.slug}.png" alt="${p.name}, ${p.ratio} Walkthru campaign poster" width="${p.width}" height="${p.height}"></a><figcaption><span>${p.name}</span><span>${p.ratio} · ${p.width} × ${p.height}</span></figcaption></figure>`).join('')}</section></main></body></html>`;
 fs.writeFileSync(path.join(__dirname,'gallery.html'),gallery);
 console.log(JSON.stringify({posters:posters.length,fonts,errors,imageUses:report.originalImageUses}));
 await browser.close();
})();
