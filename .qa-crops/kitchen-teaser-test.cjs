const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const name of ['rooms','first-house','floor-plan','house-route'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/'+name+'.js'),'utf8'));
for(const file of ['casa-interior.mp4','casa-interior-poster.jpg'])assert(fs.existsSync(path.join(root,'dist/assets',file)));
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},film=document.querySelector('#kitchen-teaser-room'),video=film.querySelector('video'),box=document.querySelector('#fh-model-box'),scene=document.querySelector('.kitchen-scene'),paper=document.querySelector('.kitchen-paper-cover'),plan=document.querySelector('#house-floor-plan');
 a(video.getAttribute('src')==='assets/videos/Video-2.mp4','later passage uses Video-2');
 document.body.classList.add('inhabited');
 const sample=p=>{current=target=p;renderMemoryUmbral(performance.now(),0);casaRender(performance.now(),0)},x=el=>new DOMMatrix(el.style.transform).m41;
 sample(1.7);a(Math.abs(x(film)-x(scene)-innerWidth)<.1,'kitchen and video share horizontal edge');a(box.style.visibility==='hidden','box absent in kitchen');
  sample(1.85);a(Math.abs(x(film))<.1,'video centered');a(film.style.visibility==='visible','video visible');a(box.style.visibility==='hidden','no box over video');a(video.muted&&video.loop&&video.playsInline,'silent inline looping film');
  const vr=video.getBoundingClientRect();a(Math.abs(vr.left)<1&&Math.abs(vr.top)<1&&Math.abs(vr.width-innerWidth)<1&&Math.abs(vr.height-innerHeight)<1,'video fills viewport without external black borders');a(getComputedStyle(video).objectFit==='cover','cover preserves proportions while filling screen');
  sample(2);a(Math.abs(x(paper)-x(film)-innerWidth)<.1,'video and box paper share horizontal edge');a(x(film)<0&&x(paper)>0,'continued rightward passage');const before=film.style.transform;
  sample(1.85);sample(2);a(film.style.transform===before,'reversible passage');
  const question=document.querySelector('#paper-box-question'),intro=document.querySelector('#paper-intro'),boxWidth=parseFloat(box.style.width),centeredLeft=(innerWidth-boxWidth)/2;
  const words=()=>[...question.querySelectorAll('.ink-word')].map(l=>Number(l.style.opacity));
  a(box.style.visibility==='visible'&&Number(box.style.opacity)===1,'box enters fully opaque');a(Math.abs(parseFloat(box.style.left)-centeredLeft-x(paper))<.2,'box travels with incoming paper');a(question.style.visibility==='visible'&&Number(question.style.opacity)>.9,'question visible during arrival');a(Math.abs(x(intro)-x(paper))<.2,'question travels with incoming paper');a(words().some(v=>v>0)&&words().some(v=>v<1),'stagger visible during scroll');
  const partial=words();renderBoxQuestion(performance.now()+60000,1);a(JSON.stringify(words())===JSON.stringify(partial),'offscreen time cannot complete scroll reveal');
  sample(2.09);a(words().every(v=>v===1),'all text complete just before full room arrival');
  sample(2.1);a(Math.abs(parseFloat(box.style.left)-centeredLeft)<.2,'box centered without waiting');a(words().every(v=>v===1),'all text visible when room is centered');a(Math.abs(new DOMMatrix(intro.style.transform).m42)<.2,'text complete before departure');
  sample(2.19);a(words().every(v=>v===1),'text remains complete while leaving');a(Number(box.style.opacity)===1,'box reveal complete');sample(2);a(JSON.stringify(words())===JSON.stringify(partial),'reveal reverses with scroll');
  const state=window.readBoxArrivalQA;
  sample(1.95);a(Number(box.style.opacity)===1&&words().every(v=>v===0),'solid box and delayed text');a(box.style.pointerEvents==='none','early box does not intercept input');
  sample(2);a(box.style.pointerEvents==='auto'&&state().rotatable,'rotation enabled before full room arrival');box.click();a(state().open,'lid opens during arrival');box.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));a(!state().open,'keyboard closes lid during arrival');
 sample(2.35);a(film.style.visibility==='hidden','film leaves before box');a(video.paused,'hidden film paused');a(box.style.visibility==='visible','box preserved');a(!plan.hidden,'next passage already moving');
 let previousY=0,previousWidth=Infinity;for(let i=1;i<=29;i++){sample(2.1+i*.01);const py=new DOMMatrix(paper.style.transform).m42,wallY=new DOMMatrix(document.querySelector('.fh-shutter').style.transform).m42;a(py<previousY,'no stationary paper interval');a(Math.abs(wallY-py-innerHeight)<.2,'next room shares paper edge');a(Math.abs(new DOMMatrix(intro.style.transform).m42-py)<.2,'text leaves with paper');a(parseFloat(box.style.width)<previousWidth,'box continuously docks without hold');a(Number(box.style.opacity)===1,'box stays opaque');previousY=py;previousWidth=parseFloat(box.style.width)}
 sample(2.7);a(parseFloat(box.style.width)<=280,'corner shortcut preserved');sample(1.85);
  let previousX=null;for(let i=0;i<=48;i++){const p=1.61+i*.01;sample(p);const position=x(film);if(previousX!==null)a(Math.abs(position-previousX+innerWidth*.04)<.15,'constant strip speed without hold at '+p);a(Math.abs(x(film)-x(scene)-innerWidth)<.15,'continuous kitchen edge');a(Math.abs(x(paper)-x(film)-innerWidth)<.15,'continuous box edge');previousX=position}
  a(!document.querySelector('#teaser-entry-cut'),'no teaser transition overlay in passage');sample(1.85);
  const scrollSource=navigateScroll.toString();a(scrollSource.includes('lowEase(1.3,1.6,current)')&&scrollSource.includes('.35-.19*filmPassage'),'production uses softer sensitivity and longer ramps');
  const sensitivity=p=>.35-.19*lowEase(1.3,1.6,p)*(1-lowEase(2.1,2.4,p));a(Math.abs(sensitivity(1.85)-.16)<.0001,'softer passage sensitivity');a(sensitivity(1.5)>.16&&sensitivity(1.5)<.35,'smooth approach');a(sensitivity(2.2)>.16&&sensitivity(2.2)<.35,'smooth departure');
   const result='PASS: fully opaque box; staggered text; early interaction; continuous box-to-salon passage without stationary interval; paired edges; softer scroll; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;resolve(result);
 }catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
const instrumented=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8').replace('function positionModelBox(p,dt){','window.readBoxArrivalQA=()=>({rotatable:mvRotatable,open:boxOpen});\nfunction positionModelBox(p,dt){');
fs.writeFileSync(path.join(__dirname,'kitchen-teaser-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('<script src="continuous/first-house.js"></script>','<script>'+instrumented+'</script>').replace('</body>',test+'</body>'));
fs.writeFileSync(path.join(__dirname,'kitchen-teaser-static.txt'),'PASS: production script syntax; existing window-interior film and poster.');