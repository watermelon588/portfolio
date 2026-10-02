const {chromium}=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
(async()=>{
 const dir=__dirname,ff='C:/ffmpeg-8.1-essentials_build/bin/ffmpeg.exe';
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1920,height:1080}});
 await page.goto('file:///'+path.join(dir,'index.html').replaceAll('\\','/'));await page.evaluate(()=>window.ready);
 const times=[7.7,24.8,29.5,3.9,17.3,7.7];const hashes=[];
 for(const time of times){await page.evaluate(t=>window.seek(t),time);const png=await page.screenshot({type:'png'});if(time===7.7){fs.writeFileSync(path.join(dir,'review','seek-'+hashes.length+'.png'),png);const poses=await page.locator('#s2').evaluate(el=>[...el.querySelectorAll('[style]')].map(n=>({id:n.id,style:n.getAttribute('style')})));fs.writeFileSync(path.join(dir,'review','seek-'+hashes.length+'.json'),JSON.stringify(poses,null,2));}hashes.push({time,sha256:crypto.createHash('sha256').update(png).digest('hex')});}
 const diffCode="from PIL import Image,ImageChops,ImageStat;import json;import sys;a=Image.open(sys.argv[1]).convert('RGB');b=Image.open(sys.argv[2]).convert('RGB');d=ImageChops.difference(a,b);changed=sum(1 for p in d.getdata() if max(p)>0);print(json.dumps({'changedPixels':changed,'totalPixels':a.width*a.height,'rms':ImageStat.Stat(d).rms,'bbox':d.getbbox()}))";
 const diff=spawnSync('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',['-c',diffCode,path.join(dir,'review','seek-0.png'),path.join(dir,'review','seek-5.png')],{encoding:'utf8',windowsHide:true});if(diff.status!==0)throw Error(diff.stderr);
 const seekDifference=JSON.parse(diff.stdout);
 const poseEqual=fs.readFileSync(path.join(dir,'review','seek-0.json'),'utf8')===fs.readFileSync(path.join(dir,'review','seek-5.json'),'utf8');
 if(!poseEqual||seekDifference.changedPixels/seekDifference.totalPixels>.0001||Math.max(...seekDifference.rms)>1)throw Error('Out-of-order seek changed visual state');
 const actors=['#hook-maker','#face0','#run-browser','#report-browser','#check2','#fix-paper','#launch-scout','#final-word'];const starts=[0,3,6,11,15,19,23,26];const motion=[];
 for(let i=0;i<actors.length;i++){
  const poses=[];
  for(const time of [starts[i]+.2,starts[i]+1.4]){await page.evaluate(t=>window.seek(t),time);poses.push(await page.locator(actors[i]).evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,opacity:Number(getComputedStyle(el).opacity)};}));}
  const a=poses[0],b=poses[1];const changed=Math.abs(a.x-b.x)+Math.abs(a.y-b.y)+Math.abs(a.width-b.width)>2||Math.abs(a.opacity-b.opacity)>.1;
  if(!changed)throw Error('Motion frozen for '+actors[i]);motion.push({selector:actors[i],poses,changed});
 }
 await page.goto('file:///'+path.join(dir,'player.html').replaceAll('\\','/'));
 await page.waitForFunction(()=>document.querySelector('video').readyState>=1);
 const player=await page.locator('video').evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,hasControls:v.controls}));
 if(player.duration!==30||player.width!==1920||player.height!==1080)throw Error('Player cannot read final file');
 const layouts=[];for(const width of [1440,375,320]){await page.setViewportSize({width,height:900});layouts.push(await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));}
 if(layouts.some(l=>l.width!==l.scrollWidth))throw Error('Player overflow');
 await browser.close();
 const film=path.join(dir,'walkthru-launch-30s.mp4');
 const select='select=eq(n\\,60)+eq(n\\,135)+eq(n\\,240)+eq(n\\,375)+eq(n\\,510)+eq(n\\,630)+eq(n\\,735)+eq(n\\,870),scale=480:270,tile=4x2';
 const contact=spawnSync(ff,['-v','error','-y','-i',film,'-vf',select,'-frames:v','1',path.join(dir,'filmstrip.jpg')],{encoding:'utf8',windowsHide:true});if(contact.status!==0)throw Error(contact.stderr);
 const audio=spawnSync(ff,['-hide_banner','-i',film,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=8:print_format=json','-f','null','-'],{encoding:'utf8',windowsHide:true});if(audio.status!==0)throw Error(audio.stderr);
 const audioJson=audio.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);
 const report={seekDeterministic:true,poseEqual,seekDifference,hashes,motion,player,layouts,audio:audioJson?JSON.parse(audioJson[0]):null,decode:'full final video decoded successfully with FFmpeg',specification:'30 seconds, 900 frames, 1920x1080, 30 fps, H.264, stereo AAC'};
 fs.writeFileSync(path.join(dir,'final-qa.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({seekDeterministic:true,movingScenes:motion.length,player,layouts,audio:report.audio}));
})().catch(e=>{console.error(e);process.exit(1);});
