const { chromium } = require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
 const browser = await chromium.launch({ channel: 'msedge', headless: true });
 const page = await browser.newPage({ viewport: { width: 1060, height: 1000 }, deviceScaleFactor: 1 });
 const errors = [];
 page.on('pageerror', err => errors.push(String(err)));
 await page.goto('file:///' + path.join(__dirname,'qa-preview.html').replaceAll('\\','/'), { waitUntil: 'domcontentloaded' });
 await page.frameLocator('iframe').locator('#walkthru-worlds').waitFor();
 const frame = page.frames().find(f => f !== page.mainFrame());
 await frame.waitForFunction(() => [...document.querySelectorAll('[data-asset]')].every(i => i.complete && i.naturalWidth > 0));
 await frame.evaluate(() => document.fonts.ready);
 const typography = await frame.evaluate(() => ({
  loadedFonts: [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),
  body: getComputedStyle(document.querySelector('.wt-page')).fontFamily,
  headingWeight: getComputedStyle(document.querySelector('.wt-page h1')).fontWeight,
  note: getComputedStyle(document.querySelector('.wt-note')).fontFamily,
  technical: getComputedStyle(document.querySelector('.wt-tag')).fontFamily,
 }));
 if(!typography.loadedFonts.includes('Geist Variable') || !typography.loadedFonts.includes('Geist Mono Variable') || typography.headingWeight!=='200' || !typography.note.includes('Geist Variable')) throw new Error('Website typography did not load');
 await frame.locator('.viz-carousel-next').click();
 if(!(await frame.locator('[data-variant="Cobalt Crowd"]').isVisible())) throw new Error('Carousel next failed');
 await frame.locator('.viz-carousel-previous').click();
 if(!(await frame.locator('[data-variant="Paper Playground"]').isVisible())) throw new Error('Carousel previous failed');
 const variants = await frame.locator('[data-variant]').evaluateAll(v => v.map(e => e.dataset.variant));
 const measurements = [];
 for (const width of [1024, 736, 375, 320]) {
  await page.setViewportSize({width: width + 32, height: 1900});
  for (let i = 0; i < variants.length; i++) {
   await frame.evaluate(index => { document.querySelectorAll('[data-variant]').forEach((e,n) => e.hidden = n !== index); },i);
   const metrics = await frame.locator('[data-variant]').nth(i).evaluate(e => {
    const root=e.querySelector('.wt-page');
    const bounds=root.getBoundingClientRect();
    const overflow=[...root.querySelectorAll('*')].filter(n=>{const s=getComputedStyle(n);const r=n.getBoundingClientRect();return s.display!=='none'&&r.width>0&&(r.right>bounds.right+2||r.left<bounds.left-2);}).map(n=>n.className).slice(0,8);
    return {name:e.dataset.variant,width:bounds.width,height:bounds.height,overflow,scrollWidth:root.scrollWidth};
   });
   measurements.push({width,...metrics});
   if(width===1024) await frame.locator('[data-variant]').nth(i).screenshot({path:path.join(__dirname, 'mockup-'+String(i+1).padStart(2,'0')+'.png')});
  }
 }
 await page.setViewportSize({width:1056,height:1000});
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==1);});
 await frame.locator('[data-perspective="skeptic"]').click();
 if(!(await frame.locator('.wt-perspective').innerText()).includes('free plan')) throw new Error('Perspective control failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==4);});
 await frame.locator('[data-preview-form="journey"] button').click();
 if(!(await frame.locator('[data-preview-form="journey"] .wt-result').innerText()).includes('No website')) throw new Error('Journey preview failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==6);});
 await frame.locator('[data-step="pricing"]').click();
 if((await frame.locator('.wt-step-heading').innerText())!=='Find the free plan') throw new Error('Step inspection failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==8);});
 await frame.locator('[data-prompt]').click();
 if(!(await frame.locator('.wt-prompt').isVisible())) throw new Error('Prompt disclosure failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==9);});
 await frame.locator('[data-connect]').click();
 if(!(await frame.locator('[data-variant="MCP Workshop"] .wt-result').innerText()).includes('No real connection')) throw new Error('Connection preview failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==10);});
 await frame.locator('[data-watch]').click();
 if((await frame.locator('[data-watch]').getAttribute('aria-pressed'))!=='true') throw new Error('Watch control failed');
 await frame.evaluate(()=>{document.querySelectorAll('[data-variant]').forEach((e,n)=>e.hidden=n!==11);});
 await frame.locator('#agency-email').fill('preview@example.com');
 await frame.locator('[data-preview-form="invite"] button').click();
 if(!(await frame.locator('[data-preview-form="invite"] .wt-result').innerText()).includes('No email')) throw new Error('Invite preview failed');
 const result={variants:variants.length,assets:await frame.locator('[data-asset]').count(),typography,errors,measurements,interactions:'7 primary interactions and carousel navigation passed'};
 fs.writeFileSync(path.join(__dirname,'qa-results.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({variants:result.variants,assets:result.assets,typography,errors,overflows:measurements.filter(m=>m.overflow.length),heights:measurements.filter(m=>m.width===1024).map(m=>({name:m.name,height:m.height})),interactions:result.interactions},null,2));
 await browser.close();
})();
