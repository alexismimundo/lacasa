const fs=require('fs'),path=require('path');
const test=`<script>window.ready=(async()=>{try{
await new Promise(r=>setTimeout(r,600));casaReview.go('memoria');
const assert=(ok,label)=>{if(!ok)throw Error(label)},samples=[];
function sample(p){target=current=p;casaRender(performance.now(),0);renderClosingScene();const root=document.getElementById('closing-scene'),memory=document.getElementById('tu-memory-room'),r=root.getBoundingClientRect(),m=memory.getBoundingClientRect();return {p,top:r.top,bottom:m.bottom,opacity:getComputedStyle(root).opacity,phrase:getComputedStyle(document.getElementById('closing-phrase')).opacity,scale:new DOMMatrix(getComputedStyle(document.getElementById('closing-window')).transform).a}}
for(const p of [19.3001,19.36,19.45,19.6,19.75,19.8999]){const s=sample(p);samples.push(s);assert(Math.abs(s.top-s.bottom)<1,'shared boundary '+p);assert(Math.abs(s.top-(1-(p-19.3)/.6)*innerHeight)<1,'linear slide '+p);assert(s.opacity==='1'&&s.phrase==='1','no fade '+p);assert(Math.abs(s.scale-10)<.01,'no early zoom '+p)}
const a=sample(19.6);sample(19.8);const b=sample(19.6);assert(a.top===b.top,'reverse continuity');
const seam=[...document.querySelectorAll('#community-journey canvas')].find(c=>!c.hidden&&c.width>=innerWidth&&c.height>=innerHeight&&Array.from(c.getContext('2d').getImageData(0,Math.floor(innerHeight/2)-4,c.width,8).data).some((v,i)=>i%4===3&&v>0));assert(seam,'living seam visible at midpoint');
assert(Math.abs(sample(19.9).top)<1,'full video arrival');assert(sample(21.2).scale<9,'zoom follows arrival');
const phraseStyle=getComputedStyle(document.getElementById('closing-phrase'));assert(phraseStyle.color==='rgb(51, 83, 134)'&&phraseStyle.textShadow==='none','blue phrase without shadow');
let lastScale=sample(19.9).scale;for(const p of [19.901,19.91,19.95,20,20.1,20.3,20.5,21,21.5,22,22.35]){const s=sample(p);assert(s.scale<lastScale,'continuous camera without hold '+p);lastScale=s.scale}
assert(Math.abs(lastScale-1)<.001,'unchanged exterior endpoint');
sample(19.95);assert(new DOMMatrix(getComputedStyle(document.getElementById('closing-interior')).transform).a<1,'visible interior moves immediately');
const start=sample(19.6).top;navigateScroll(100);assert(target>19.6,'forward scroll');navigateScroll(-200);assert(target<19.6,'reverse scroll');
sample(19.6);return {status:'PASS',viewport:[innerWidth,innerHeight],samples};
}catch(e){return {status:'FAIL',error:e.stack}}})();</script>`;
fs.writeFileSync(path.join(__dirname,'memory-exit-slide-browser.html'),fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));