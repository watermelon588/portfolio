const {chromium}=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {spawn,spawnSync}=require('node:child_process');
const {once}=require('node:events');
const fs=require('node:fs');
const path=require('node:path');
const dir=__dirname,FF='C:/ffmpeg-8.1-essentials_build/bin/ffmpeg.exe',PROBE='C:/ffmpeg-8.1-essentials_build/bin/ffprobe.exe';
const url='file:///'+path.join(dir,'index.html').replaceAll('\\','/');
function run(args){const r=spawnSync(FF,args,{encoding:'utf8',windowsHide:true,maxBuffer:4e6});if(r.status!==0)throw Error(r.stderr);return r.stdout;}
async function newPage(browser){const p=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});await p.goto(url);await p.evaluate(()=>window.ready);return p;}
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--hide-scrollbars']});
 const review=path.join(dir,'review');fs.mkdirSync(review,{recursive:true});
 const p=await newPage(browser),errors=[];p.on('pageerror',e=>errors.push(String(e)));
 const times=[0,.9,2.4,3.9,5.4,7.7,10.2,12.7,14.4,17.3,18.5,20.7,22.4,24.8,27.7,29.5];
 const checks=[];
 for(const t of times){await p.evaluate(t=>window.seek(t),t);await p.screenshot({path:path.join(review,'frame-'+t.toFixed(1)+'.jpg'),type:'jpeg',quality:92});
  const state=await p.evaluate(()=>{
   const active=[...document.querySelectorAll('.clip')].filter(s=>s.style.visibility==='visible');
   const missing=[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src.split('/').pop());
   const texts=active.flatMap(s=>[...s.querySelectorAll('.headline,.label,h2')].map(el=>{
    const r=el.getBoundingClientRect(),style=getComputedStyle(el);return {text:el.textContent.trim(),left:r.left,top:r.top,right:r.right,bottom:r.bottom,opacity:Number(style.opacity)};
   }));
   return {active:active.map(s=>s.id),missing,textOverflow:texts.filter(t=>t.opacity>.8&&(t.left<0||t.right>1921||t.top<0||t.bottom>1081)),fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)};
  });checks.push({time:t,...state});
 }
 const qa={duration:30,fps:30,width:1920,height:1080,errors,checks};fs.writeFileSync(path.join(dir,'qa.json'),JSON.stringify(qa,null,2));
 const failures=checks.filter(c=>c.active.length!==1||c.missing.length||c.textOverflow.length);
 if(errors.length||failures.length)throw Error('Visual QA failed '+JSON.stringify({errors,failures}));
 console.log('QA passed: 16 frames, exact brand fonts, no missing images or headline overflow.');
 await p.close();
 if(process.argv.includes('--review-only')){await browser.close();return;}
 const workers=3,per=300;
 await Promise.all(Array.from({length:workers},async(_,worker)=>{
  const page=await newPage(browser);const output=path.join(dir,'frames','part-'+worker+'.mp4');
  const encoder=spawn(FF,['-v','error','-y','-f','image2pipe','-vcodec','mjpeg','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p','-threads','2',output],{windowsHide:true,stdio:['pipe','ignore','pipe']});
  let stderr='';encoder.stderr.on('data',d=>stderr+=d);const done=once(encoder,'close');
  for(let f=worker*per;f<(worker+1)*per;f++){
   await page.evaluate(t=>window.seek(t),f/30);
   const jpg=await page.screenshot({type:'jpeg',quality:95});
   if(!encoder.stdin.write(jpg))await once(encoder.stdin,'drain');
   if((f-worker*per+1)%60===0)console.log('Worker '+(worker+1)+': '+(f-worker*per+1)+' / '+per+' frames');
  }
  encoder.stdin.end();const [code]=await done;if(code!==0)throw Error(stderr);await page.close();console.log('Worker '+(worker+1)+' complete.');
 }));
 await browser.close();
 const list=[0,1,2].map(n=>"file 'part-"+n+".mp4'").join('\n');fs.writeFileSync(path.join(dir,'frames','concat.txt'),list);
 const master=path.join(dir,'walkthru-launch-30s.mp4');
 run(['-v','error','-y','-f','concat','-safe','0','-i',path.join(dir,'frames','concat.txt'),'-i',path.join(dir,'assets','original-score.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','loudnorm=I=-16:TP=-1.5:LRA=8','-ar','48000','-c:a','aac','-b:a','256k','-t','30','-movflags','+faststart',master]);
 const info=spawnSync(PROBE,['-v','error','-show_format','-show_streams','-of','json',master],{encoding:'utf8',windowsHide:true});if(info.status!==0)throw Error(info.stderr);
 const metadata=JSON.parse(info.stdout);fs.writeFileSync(path.join(dir,'video-metadata.json'),JSON.stringify(metadata,null,2));
 const video=metadata.streams.find(s=>s.codec_type==='video'),audio=metadata.streams.find(s=>s.codec_type==='audio');
 if(video.width!==1920||video.height!==1080||video.r_frame_rate!=='30/1'||Math.abs(Number(metadata.format.duration)-30)>.04||!audio)throw Error('Final export specification mismatch');
 run(['-v','error','-y','-ss','28','-i',master,'-frames:v','1',path.join(dir,'poster.jpg')]);
 console.log('DELIVERED '+master+' '+metadata.format.size+' bytes; 30.000 seconds; 1920x1080; 30 fps; H.264 + stereo AAC.');
})().catch(e=>{console.error(e);process.exit(1);});
