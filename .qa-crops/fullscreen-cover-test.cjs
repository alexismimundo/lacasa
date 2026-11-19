const fs=require('fs'),path=require('path'),vm=require('vm');
new vm.Script(fs.readFileSync(path.join(__dirname,'../dist/continuous/salida-final.js'),'utf8'));
const test=`<script>window.ready=(async()=>{try{
await new Promise(r=>setTimeout(r,600));casaReview.go('landing');
const assert=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms)),checks={};
for(const section of ['about','album']){openMenuSection(section);await wait(150);const r=menuPanel.getBoundingClientRect();assert(Math.abs(r.x)<1&&Math.abs(r.y)<1&&Math.abs(r.width-innerWidth)<1&&Math.abs(r.height-innerHeight)<1,'full viewport '+section);assert(menuPanel.scrollWidth<=menuPanel.clientWidth+1,'no horizontal overflow '+section);checks[section+'Fullscreen']=true;if(section==='about'){assert(menuContent.textContent.includes('Producción musical: Tablón Estudio.'),'about intact');closeMenuSection();await wait(100)}}
const cover=menuContent.querySelector('.album-cover img');assert(cover,'official cover element');await cover.decode();assert(cover.naturalWidth>0&&cover.src.includes('Booklet-01'),'cover loaded');const r=cover.getBoundingClientRect();assert(Math.abs(r.width/r.height-cover.naturalWidth/cover.naturalHeight)<.01,'cover proportions');assert(getComputedStyle(cover).filter==='none'&&getComputedStyle(cover.parentElement).animationName==='none','original colors and no rotation');checks.cover=true;
const play=menuContent.querySelector('[data-album=play]');play.click();await wait(200);assert(!music.paused,'play works');play.click();assert(music.paused,'pause works');checks.controls=true;
return {status:'PASS',checks,viewport:[innerWidth,innerHeight],cover:[cover.naturalWidth,cover.naturalHeight]};
}catch(e){return {status:'FAIL',error:e.stack}}})();</script>`;
fs.writeFileSync(path.join(__dirname,'fullscreen-cover-browser.html'),fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));