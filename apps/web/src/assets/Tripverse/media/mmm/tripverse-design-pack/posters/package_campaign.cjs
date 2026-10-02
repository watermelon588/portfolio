const fs=require('fs');const path=require('path');
const runtime='C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const sharp=require(runtime+'/sharp');const OUT=__dirname;
(async()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(OUT,'manifest.json'),'utf8'));
 const tiles=[];const cw=520,ch=700,pad=24;
 for(let i=0;i<manifest.length;i++){
  const p=manifest[i];const thumb=await sharp(path.join(OUT,p.png)).resize(460,560,{fit:'inside'}).toBuffer();const m=await sharp(thumb).metadata();
  const label=Buffer.from(`<svg width="520" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="520" height="120" fill="#F7F6F3"/><text x="30" y="30" font-family="Arial" font-size="17" fill="#111111">${String(i+1).padStart(2,'0')} · ${p.name.replace(/&/g,'&amp;')}</text><text x="30" y="58" font-family="monospace" font-size="14" fill="#666562">${p.aspectRatio} / ${p.width} × ${p.height}</text></svg>`);
  tiles.push({input:thumb,left:pad+(i%5)*cw+Math.round((cw-m.width)/2),top:pad+Math.floor(i/5)*ch+Math.round((580-m.height)/2)});
  tiles.push({input:label,left:pad+(i%5)*cw,top:pad+Math.floor(i/5)*ch+580});
 }
 await sharp({create:{width:5*cw+2*pad,height:2*ch+2*pad,channels:3,background:'#F7F6F3'}}).composite(tiles).jpeg({quality:92}).toFile(path.join(OUT,'contact-sheet.jpg'));
 for(const file of ['alpine-world.png','floral-world.png']){
  const p=path.join(OUT,'cutouts',file);const m=await sharp(p).metadata();const s=await sharp(p).stats();console.log(file,'alpha',m.hasAlpha,s.channels.at(-1).min,s.channels.at(-1).max);
 }
 console.log('Contact sheet ready');
})().catch(e=>{console.error(e);process.exitCode=1});
