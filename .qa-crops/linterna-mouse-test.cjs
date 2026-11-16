const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
for(const n of ['rooms','casa2-oscuridad','first-house'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous',n+'.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2400);reachInside();
 const step=p=>{target=current=p;casaRender(performance.now(),.016)},tick=n=>{for(let i=0;i<n;i++)casaRender(performance.now(),.05)};
 step(.5);const doors=[...document.querySelectorAll('.kitchen-door')],burgers=[...document.querySelectorAll('.kitchen-burger')];
 for(const door of doors){door.click();a(door.getAttribute('aria-expanded')==='true','cupboard opens');door.click();a(door.getAttribute('aria-expanded')==='false','cupboard closes');for(const b of burgers)a(getComputedStyle(b).visibility==='visible','food remains during closing animation');door.click();for(const b of burgers)a(getComputedStyle(b).visibility==='visible','food still on shelf after reopening');door.click()}
 step(8.15);const phrase=document.querySelector('#fh-light-phrase'),dark=document.querySelector('.fh-next-dark'),screen=document.querySelector('#fh-next-house');
 a(getComputedStyle(phrase).visibility==='visible','phrase available under beam');a(Number(getComputedStyle(phrase).zIndex)<Number(getComputedStyle(dark).zIndex),'phrase never above darkness');
 const dctx=dark.getContext('2d');a(dctx.getImageData(0,0,1,1).data[3]===255,'phrase outside beam covered');
 tick(240);a(current===8.15,'waiting alone does not skip phrase');
 step(8.65);a(getComputedStyle(phrase).visibility==='hidden','phrase gone when revealing video');
 const canvas=document.querySelector('.c2-mask'),ctx=canvas.getContext('2d');
 const sum=()=>{const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;let n=0;for(let i=3;i<d.length;i+=4)n+=d[i];return n};
 const initial=sum();tick(240);a(sum()===initial,'stationary beam never auto reveals');
 for(let i=0;i<8;i++){screen.dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth*(.2+i*.07),clientY:innerHeight*.4,bubbles:true,pointerType:'mouse'}));casaRender(performance.now(),.016)}
 const revealed=sum();a(revealed<initial,'mouse uncovers video');a(revealed>canvas.width*canvas.height*255*.25,'unexplored black stays');
 tick(100);a(sum()===revealed,'revealed trail persists without automatic growth');
 step(10.7);a(current===10.7&&screen.hidden,'can advance with incomplete reveal');
 step(8.1);step(8.65);a(sum()>revealed,'reverse resets revealed trail');
 a(getComputedStyle(document.querySelector('#fh-next-house .c2-phrase')).display==='none','no foreground replacement lyric');
 for(const el of document.querySelectorAll('[data-asset-label]'))a(getComputedStyle(el).display==='none','pending notices remain hidden');
 screen.dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth*.3,clientY:innerHeight*.4,bubbles:true,pointerType:'mouse'}));casaRender(performance.now(),.016);
 return 'PASS cupboard food persists through close/reopen / phrase only behind beam / no timer or scroll lock / mouse reveals persistent partial trail / incomplete reveal can exit / reverse reset; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'linterna-mouse-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));