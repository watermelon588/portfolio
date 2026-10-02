const fs=require('fs');const path=require('path');const sharp=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const OUT=__dirname,ROOT=path.resolve(OUT,'../..');
(async()=>{for(const [name,folder,cols,tw,th] of [['screens','frontend/public/guide',4,420,315],['creative','frontend/media/mmm/creative',5,280,350],['photography','frontend/media/mmm/photography',5,280,350]]){
 const files=fs.readdirSync(path.join(ROOT,folder)).filter(x=>/\.(png|jpg)$/.test(x)).sort();const composite=[];
 for(let i=0;i<files.length;i++){const file=files[i];const b=await sharp(path.join(ROOT,folder,file)).resize(tw-20,th-50,{fit:'inside'}).toBuffer();const m=await sharp(b).metadata();const x=(i%cols)*tw,y=Math.floor(i/cols)*th;composite.push({input:b,left:x+Math.round((tw-m.width)/2),top:y});const svg=Buffer.from(`<svg width="${tw}" height="44" xmlns="http://www.w3.org/2000/svg"><text x="10" y="21" font-family="monospace" font-size="12" fill="#111111">${file}</text></svg>`);composite.push({input:svg,left:x,top:y+th-44});}
 await sharp({create:{width:cols*tw,height:Math.ceil(files.length/cols)*th,channels:3,background:'#F7F6F3'}}).composite(composite).jpeg({quality:90}).toFile(path.join(OUT,`references-${name}.jpg`));
}console.log('Reference sheets ready');})().catch(e=>{console.error(e);process.exitCode=1});
