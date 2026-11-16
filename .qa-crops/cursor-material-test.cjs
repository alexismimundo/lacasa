const fs=require('fs'),path=require('path');
require('./cursor-drawing-scope-test.cjs');
const source=fs.readFileSync(path.join(__dirname,'cursor-drawing-scope-browser.html'),'utf8');
const marker="assert(second.some((v,i)=>i%4===3&&v>0),'cursor painted');";
if(!source.includes(marker))throw Error('Missing cursor pixel assertion insertion point');
const check=`assert(canvas.dataset.material==='caja-textura','existing box texture loaded');const shades=new Set(),pixelScale=canvas.width/42;for(let y=27;y<31;y++)for(let x=19;x<26;x++){const pixel=ctx.getImageData(x*pixelScale,y*pixelScale,1,1).data;assert(pixel[3]===255&&pixel[0]>=120&&pixel[0]<225,'opaque grey material inside hand');shades.add(pixel[0])}assert(shades.size>4,'visible non-flat texture');`;
fs.writeFileSync(path.join(__dirname,'cursor-material-browser.html'),source.replace(marker,marker+check).replace('redesigned hand, living strokes, drawing-only pencil, native editing fallback','grey box texture, living strokes, drawing-only pencil, native editing fallback'));