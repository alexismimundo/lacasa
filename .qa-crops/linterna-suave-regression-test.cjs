const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
for(const n of ['casa2-oscuridad','memorias-ejemplo'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous',n+'.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2600);reachInside();
 const step=p=>{target=current=p;casaRender(performance.now(),.016)},tick=n=>{for(let i=0;i<n;i++)casaRender(performance.now(),.05)};
 step(8);step(8.1);const screen=document.querySelector('#fh-next-house'),phrase=document.querySelector('#fh-light-phrase');
 a(current===8.2,'phrase scene holds');tick(100);a(current===8.2,'phrase remains for 5 seconds');a(window.firstHouseScrollLimit(10,1)===8.2,'scroll blocked');a(window.firstHouseScrollLimit(7,-1)===8.2,'reverse also holds briefly');
 a(phrase.parentElement===screen,'phrase behind original darkness');a(getComputedStyle(phrase).visibility==='visible','phrase available only through beam');
 tick(34);a(current===8.6,'timed same-screen transition starts');const scene=screen.querySelector('.c2-scene'),film=screen.querySelector('video'),mask=screen.querySelector('.c2-mask');
 a(phrase.parentElement===scene,'phrase transitions beneath same mask');a(Number(getComputedStyle(phrase).zIndex)<Number(getComputedStyle(mask).zIndex),'phrase stays behind mask');a(Number(phrase.style.opacity)<1&&Number(phrase.style.opacity)>0,'phrase dissolves gradually');a(Number(film.parentElement.style.opacity)>0&&Number(film.parentElement.style.opacity)<1,'video fades into same beam');
 tick(25);a(getComputedStyle(phrase).visibility==='hidden','phrase disappears');a(Number(film.parentElement.style.opacity)===1,'video fully present under mask');a(window.firstHouseScrollLimit(9.5,1)===9.5,'scroll released');a(!document.querySelector('.c2-flower'),'glicina removed');
 const ctx=mask.getContext('2d'),pixels=ctx.getImageData(0,0,mask.width,mask.height).data;let black=0;for(let i=3;i<pixels.length;i+=4)if(pixels[i]===255)black++;a(black>mask.width*mask.height*.5,'no full-screen forced reveal');
 const host=scene.querySelector('.memoria-ejemplo'),img=host.querySelector('img'),id=host.dataset.memoryId;a(host.dataset.guardable===id&&!!COSAS[id],'card registered with box');img.click();await wait(50);const viewer=document.querySelector('.memoria-lectura');a(viewer.open,'card opens');a(!viewer.matches(':modal'),'box remains accessible');a(getComputedStyle(viewer).animationName==='memoria-aparecer','smooth opening');await wait(420);
 // Exercise the existing drag/drop handlers; capture is shimmed for synthetic events.
 viewer.setPointerCapture=()=>{};viewer.hasPointerCapture=()=>false;
 const from=viewer.getBoundingClientRect(),box=document.querySelector('#fh-model-box').getBoundingClientRect(),sx=from.left+from.width/2,sy=from.top+from.height/2,x=box.left+box.width/2,y=box.top+box.height/2;
 viewer.dispatchEvent(new PointerEvent('pointerdown',{pointerId:99,button:0,clientX:sx,clientY:sy,bubbles:true}));
 viewer.dispatchEvent(new PointerEvent('pointermove',{pointerId:99,button:0,clientX:x,clientY:y,bubbles:true}));
 a(document.querySelector('.caja-ghost'),'drag creates existing box ghost');
 viewer.dispatchEvent(new PointerEvent('pointerup',{pointerId:99,button:0,clientX:x,clientY:y,bubbles:true}));
 a(enCaja(id),'memory saved by drop');a(host.classList.contains('memoria-guardada'),'stored scene card hidden');await wait(250);a(!viewer.open,'reader gently closes on save');
 step(10.7);a(screen.hidden,'can continue without revealing entire video');
 return 'PASS 5-second scroll hold / phrase masked throughout / 1-second dissolve into original flashlight-shaped video / no flower / animated nonmodal reader / existing drag-drop stores memory / partial reveal can exit; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'linterna-cinco-segundos-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));