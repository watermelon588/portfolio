const fs=require('fs'),path=require('path'),crypto=require('crypto');
const runtime='C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {chromium}=require(runtime+'/playwright');
const OUT=__dirname,ROOT=path.resolve(OUT,'../..');
const file='C:/Users/Rohit Maity/.codex/visualizations/2026/10/01/01a0f7ad-ef0b-7211-9887-3344ace48523/tripverse-application-mockups.html';
(async()=>{
 const html=fs.readFileSync(file,'utf8');const checks=[];
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const width of [320,736]){const p=await browser.newPage({viewport:{width,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.setContent('<!doctype html><html><body style="margin:0">'+html+'</body></html>');await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
   const result=await p.evaluate(()=>{const root=document.getElementById('tripverse-application-mockups-v1');const sections=[...root.children].filter(el=>el.tagName==='SECTION');const variants=sections.map((s,index)=>{sections.forEach((el,i)=>el.hidden=i!==index);const img=s.querySelector('img'),r=img.getBoundingClientRect();return {name:s.dataset.variant,loaded:img.complete&&img.naturalWidth>0,imageFits:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};});return {width:innerWidth,count:sections.length,distinctNames:new Set(sections.map(s=>s.dataset.variant)).size,variants};});checks.push({...result,errors});await p.close();
 }await browser.close();
 const verification=JSON.parse(fs.readFileSync(path.join(OUT,'verification.json'))),original=fs.readFileSync(path.join(ROOT,'frontend/media/icons/Vector.svg'),'utf8').match(/ d="([^"]+)"/)[1];
 if(!verification.every(c=>c.logoPath===original))throw new Error('Logo path mismatch');
 const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
 const manifest=JSON.parse(fs.readFileSync(path.join(OUT,'manifest.json')));const filesMatch=manifest.every(s=>sha(path.join(OUT,s.png))===sha(path.join(ROOT,'frontend/media/mmm/tripverse-mockups',s.id+'.png')));
 const report={bytes:Buffer.byteLength(html),fragmentOnly:!/<html|<!doctype|<head|<body/.test(html),logoExact:true,workingPackPngsMatch:filesMatch,checks};
 if(!filesMatch||checks.some(c=>c.count!==10||c.distinctNames!==10||c.errors.length||c.variants.some(v=>!v.loaded||!v.imageFits||v.overflow)))throw new Error('Inline checks failed');
 fs.writeFileSync(path.join(OUT,'inline-verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({inlineBytes:report.bytes,variants:10,widths:[320,736],originalLogoPath:true,workingPackPngsMatch:filesMatch}));
})().catch(e=>{console.error(e);process.exitCode=1});
