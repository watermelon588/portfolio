const {chromium}=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('file:///'+path.join(__dirname,'gallery.html').replaceAll('\\','/'));
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
 const widths=[];
 for(const width of [1600,1024,375,320]){
  await page.setViewportSize({width,height:900});
  const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),links:document.querySelectorAll('figure a').length}));
  if(result.scrollWidth>width||!result.imagesLoaded||result.links!==10)throw Error(JSON.stringify(result));
  widths.push(result);
 }
 const report={widths,errors};
 fs.writeFileSync(path.join(__dirname,'gallery-qa.json'),JSON.stringify(report,null,2));
 await page.setViewportSize({width:1800,height:2100});
 await page.addStyleTag({content:'main{max-width:none;padding:50px 50px 30px}header{margin-bottom:32px}section{columns:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:28px}figure{margin:0;min-width:0}figure a{height:395px;background:#e7e7e3;display:flex;align-items:center;justify-content:center}figure img{width:100%;height:100%;object-fit:contain}figure:last-child{grid-column:1/-1}figure:last-child a{height:340px}figcaption{margin-top:12px;font-size:17px}figcaption span:last-child{font-size:13px}'});
 await page.screenshot({path:path.join(__dirname,'overview.jpg'),type:'jpeg',quality:92,fullPage:true});
 console.log(JSON.stringify(report));
 await browser.close();
})();
