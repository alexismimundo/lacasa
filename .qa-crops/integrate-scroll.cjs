const fs=require('fs'),path=require('path'),file=path.resolve(__dirname,'../dist/index.html');
let html=fs.readFileSync(file,'utf8');
const old='lastTime=time;current+=(target-current)',updated='lastTime=time;window.casaScrollFrame?.(dt,time);current+=(target-current)';
if(!html.includes(updated)){if(!html.includes(old))throw Error('Tick not found');html=html.replace(old,updated)}
if(!html.includes('src="continuous/scroll-flow.js"'))html=html.replace('<script src="continuous/inventory.js"></script>','<script src="continuous/inventory.js"></script><script src="continuous/scroll-flow.js"></script>');
fs.writeFileSync(file,html);