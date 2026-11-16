const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
for(const name of ['casa3-terrero','escenas-resto','floor-plan'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous',name+'.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2500);reachInside();
 const render=()=>casaRender(performance.now(),.016),set=p=>{target=current=p;render()},frames=n=>{for(let i=0;i<n;i++){current+=(target-current)*(1-Math.exp(-9*.016));render()}};
 const root=document.querySelector('[data-escena="terrero"]'),display=root.querySelector('.c3-rain-display');
 set(13.4);const top=display.style.top;navigateScroll(160);a(target>13.4,'forward target unlocked');frames(60);a(current>13.5&&display.style.top!==top,'continuous visible movement');const before=current;navigateScroll(-160);frames(60);a(current<before,'backwards unlocked');
 set(13.4);frames(100);a(current===13.4&&target===13.4,'can stay without forced advance');
 for(let i=0;i<16;i++){navigateScroll(160);frames(25)}a(current>15.8,'can leave rain');for(let i=0;i<17;i++){navigateScroll(-160);frames(25)}a(current<13.4,'can return through rain');
 set(15);const matrix=new DOMMatrix(getComputedStyle(root).transform);a(matrix.m42<0,'exit starts gently before former boundary');
 set(13.4);const word=display.querySelector('.c3-display-word'),r=word.getBoundingClientRect();word.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:1,clientX:r.left+5,clientY:r.top+5,bubbles:true,cancelable:true}));word.dispatchEvent(new WheelEvent('wheel',{deltaY:100,bubbles:true,cancelable:true}));a(!display.querySelector('.c3-word-dragging'),'wheel releases word drag');a(target>13.4,'wheel navigates over interactions');
 return 'PASS forward / reverse / stay / exit and reentry with navigateScroll / continuous display travel / smooth early exit / wheel releases drag; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'lluvia-scroll-libre-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));