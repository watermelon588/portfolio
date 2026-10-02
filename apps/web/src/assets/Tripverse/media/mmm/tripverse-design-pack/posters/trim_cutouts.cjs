const sharp=require('C:/Users/Rohit Maity/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const path=require('path');
(async()=>{for(const name of ['alpine-world','floral-world','traveler-faces','ocean-perspective']){
 const input=path.join(__dirname,'cutouts',name+'.png');const output=path.join(__dirname,'cutouts',name+'-trimmed.png');
 await sharp(input).trim().toFile(output);const m=await sharp(output).metadata();console.log(name,m.width,m.height,m.hasAlpha);
}})().catch(e=>{console.error(e);process.exitCode=1});
