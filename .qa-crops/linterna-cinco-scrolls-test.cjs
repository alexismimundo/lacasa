const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
for(const n of ['casa2-oscuridad','floor-plan','fondo'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous',n+'.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2500);reachInside();
 const step=p=>{target=current=p;casaRender(performance.now(),.016)},tick=n=>{for(let i=0;i<n;i++)casaRender(performance.now(),.05)};
 step(8);step(8.1);tick(400);const screen=document.querySelector('#fh-next-house'),phrase=document.querySelector('#fh-light-phrase'),hint=screen.querySelector('.c2-scroll-hint');
 a(current===8.2&&getComputedStyle(phrase).visibility==='visible','waiting never starts video');a(casaLinterna.ignition===1,'gentle ignition retained');a(screen.dataset.scrollCount==='0','time does not count as scrolling');
 a(!hint.hidden&&hint.textContent==='Seguí escroleando','correct bottom hint');a(getComputedStyle(hint).backgroundColor==='rgba(0, 0, 0, 0)','no hint rectangle');a(getComputedStyle(hint).fontFamily===getComputedStyle(document.querySelector('.fh-next-continue')).fontFamily,'shared hint font');
 const scroll=()=>{navigateScroll(160);casaRender(performance.now(),.016)};
 for(let i=1;i<=4;i++){scroll();a(screen.dataset.scrollCount===String(i),'scroll count '+i);a(current===8.2,'phrase remains until fifth')}
 scroll();a(screen.dataset.scrollCount==='5'&&current===8.6,'fifth reveals video');const landscape=screen.querySelector('.c2-landscape');a(Number(landscape.style.opacity)>0&&Number(landscape.style.opacity)<1,'soft dissolve retained');tick(20);a(Number(landscape.style.opacity)===1&&getComputedStyle(phrase).visibility==='hidden','video replaces phrase');
 a(window.firstHouseScrollLimit(9.2,1)===9.2,'scroll released');step(10.1);const b=document.querySelector('[data-escena="madrugada"]');a(getComputedStyle(b).backgroundColor==='rgb(44, 72, 119)','incoming screen immediately blue');a(!document.querySelector('#house-floor-plan').hidden,'living divider active');
 const seam=document.querySelector('#house-floor-plan'),ctx=seam.getContext('2d'),data=ctx.getImageData(0,0,seam.width,seam.height).data;let ink=0;for(let i=0;i<data.length;i+=4)if(data[i+3]){ink++;a(data[i]<15&&data[i+1]<15&&data[i+2]<15,'divider black')}a(ink>0,'divider drawn');
 step(10.7);a(screen.hidden,'can leave partial video');step(8);step(8.1);a(screen.dataset.scrollCount==='0','reverse resets count');
 for(let i=0;i<4;i++){navigateScroll(30);casaRender(performance.now(),.016)}a(screen.dataset.scrollCount==='1','small touchpad deltas accumulate rather than counting every event');
 tick(100);return 'PASS no timed video trigger / five scroll advances / accumulated small deltas / soft dissolve / plain shared hint / immediately blue next screen / black living seam / reverse reset; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'linterna-cinco-scrolls-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));