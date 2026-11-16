const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/casa2-oscuridad.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2400);reachInside();
 const render=()=>casaRender(performance.now(),.016),step=p=>{target=current=p;render()},advance=n=>{for(let i=0;i<n;i++){current+=(target-current)*(1-Math.exp(-9*.016));render()}},scroll=delta=>{navigateScroll(delta);render()};
 const enter=()=>{step(8);scroll(160);advance(80);for(let i=0;i<5;i++)scroll(160);a(current===8.6,'video reached: '+JSON.stringify({current,target,count:document.querySelector('#fh-next-house').dataset.scrollCount}))};
 enter();scroll(-160);a(target<8.6,'reverse target allowed during dissolve');advance(100);a(current<8.6,'no render snap during dissolve');a(getComputedStyle(document.querySelector('#fh-light-phrase')).visibility==='visible','phrase restored');
 step(8);enter();advance(100);a(Number(document.querySelector('.c2-landscape').style.opacity)===1,'video fully visible');scroll(-160);advance(100);a(current<8.6,'can reverse after dissolve');a(document.querySelector('#fh-next-house').dataset.scrollCount==='0','count resets on phrase return');
 for(let i=0;i<3;i++){scroll(-160);advance(25)}a(current<8.02,'can continue backwards to address');
 enter();advance(100);scroll(160);advance(60);a(current>8.6,'forward navigation still works');step(10.1);a(getComputedStyle(document.querySelector('[data-escena="madrugada"]')).backgroundColor==='rgb(44, 72, 119)','blue preserved');
 return 'PASS real navigateScroll + interpolated frames / reverse during dissolve / reverse after reveal / phrase restored / no snap back / return to address / five-scroll forward preserved; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'linterna-retroceso-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));