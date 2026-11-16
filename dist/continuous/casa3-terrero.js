// Terrero: individual drops from the supplied artwork and the memory card.
(()=>{'use strict';
 const root=document.querySelector('[data-escena="terrero"]'),red=matchMedia('(prefers-reduced-motion:reduce)');
 const text="Papa ra'y, papa ra'y. Parece que esta lloviendo y no va a parar. Hoy ponemos ollas en los huecos y nos damos paz.";
 root.replaceChildren();
 const scene=document.createElement('div');scene.className='c3-scene';
 scene.innerHTML='<canvas class="c3-rain" aria-hidden="true"></canvas><p class="c3-rain-display memory-phrase"></p><aside class="c2-memory" aria-label="Memoria de Terrero"><small>MEMORIA Nº 03</small><h3>La cerámica</h3><div class="c2-memory-text">había cerámica / paredes revocadas / y hasta bañera / ahora tengo cerámica</div></aside>';
 root.append(scene);
 const pot=document.createElement('img');pot.className='c3-rain-pot';pot.src='assets/Olla-agua.png';pot.alt='Olla con agua bajo la lluvia';pot.draggable=false;scene.prepend(pot);
 const catcher=document.createElement('div');catcher.className='c3-pot-catcher';catcher.tabIndex=0;catcher.setAttribute('role','slider');catcher.setAttribute('aria-label','Mover la olla para recoger agua');catcher.setAttribute('aria-valuemin','0');catcher.setAttribute('aria-valuemax','100');catcher.setAttribute('aria-valuenow','7');
 pot.replaceWith(catcher);catcher.append(pot);
 let caught=0,position=.07,drag=null;
 function drawWater(){
  catcher.dataset.caught=String(caught);catcher.setAttribute('aria-valuetext',Math.round(position*100)+'% de la pantalla; '+caught+' gotas recogidas');
 }
 function placePot(value){
  position=Math.max(0,Math.min(1,value));const available=Math.max(0,scene.clientWidth-catcher.offsetWidth);
  catcher.style.left=(position*available)+'px';catcher.setAttribute('aria-valuenow',String(Math.round(position*100)));drawWater();
 }
 catcher.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();const r=catcher.getBoundingClientRect();drag={id:e.pointerId,offset:e.clientX-r.left};catcher.setPointerCapture(e.pointerId);catcher.classList.add('dragging')});
 catcher.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;e.preventDefault();e.stopPropagation();const r=scene.getBoundingClientRect();placePot((e.clientX-r.left-drag.offset)/Math.max(1,scene.clientWidth-catcher.offsetWidth))});
 function releasePot(e){if(drag?.id!==e.pointerId)return;drag=null;catcher.classList.remove('dragging');if(catcher.hasPointerCapture(e.pointerId))catcher.releasePointerCapture(e.pointerId)}
 catcher.addEventListener('pointerup',releasePot);catcher.addEventListener('pointercancel',releasePot);catcher.addEventListener('lostpointercapture',()=>{drag=null;catcher.classList.remove('dragging')});
 for(const type of ['touchstart','touchmove','touchend'])catcher.addEventListener(type,e=>e.stopPropagation(),{passive:true});
 catcher.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();placePot(e.key==='Home'?0:e.key==='End'?1:position+(e.key==='ArrowLeft'?-.05:.05))});
 window.addEventListener('resize',()=>placePot(position));pot.addEventListener('load',()=>placePot(position));drawWater();
 const display=scene.querySelector('.c3-rain-display');display.setAttribute('aria-label',text);
 // The box display's letter treatment and word drift, without lid displacement.
 const groups=[],slots=[],order=[];let wordDrag=null;
 text.split(' ').forEach((word,i)=>{
  const slot=document.createElement('span');slot.className='c3-word-slot';
  const ghost=document.createElement('span');ghost.className='c3-word-ghost';ghost.textContent=word;ghost.setAttribute('aria-hidden','true');
  const group=document.createElement('span');group.className='c3-display-word';group.tabIndex=0;group.setAttribute('role','button');group.setAttribute('aria-label','Mover '+word);group.dataset.word=word;
  for(const char of word){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}
  slot.append(ghost,group);display.append(slot,document.createTextNode(' '));groups.push(group);slots.push(slot);order.push(group);
 });
 function arrangeWords(){
  slots.forEach((slot,i)=>{slot.append(order[i]);slot.classList.toggle('c3-word-changed',order[i]!==groups[i]);slot.classList.remove('c3-word-target','c3-word-origin')});
  display.setAttribute('aria-label',order.map(group=>group.dataset.word).join(' '));
 }
 function finishWord(cancel){
  if(!wordDrag)return;const state=wordDrag;wordDrag=null;
  state.group.classList.remove('c3-word-dragging');state.group.style.removeProperty('left');state.group.style.removeProperty('top');state.group.style.removeProperty('width');
  if(state.group.hasPointerCapture(state.id))state.group.releasePointerCapture(state.id);
  if(!cancel&&state.to!==state.from){order.splice(state.from,1);order.splice(state.to,0,state.group)}
  arrangeWords();state.group.focus({preventScroll:true});
 }
 groups.forEach(group=>{
  group.addEventListener('pointerdown',e=>{
   if(e.button!==0||wordDrag)return;e.preventDefault();e.stopPropagation();
   const r=group.getBoundingClientRect(),from=order.indexOf(group),parent=display.getBoundingClientRect();
   wordDrag={group,id:e.pointerId,from,to:from,dx:e.clientX-r.left,dy:e.clientY-r.top};slots[from].classList.add('c3-word-origin');
   group.classList.add('c3-word-dragging');group.style.width=r.width+'px';group.style.left=(r.left-parent.left)+'px';group.style.top=(r.top-parent.top)+'px';group.setPointerCapture(e.pointerId);
  });
  group.addEventListener('pointermove',e=>{
   if(wordDrag?.id!==e.pointerId)return;e.preventDefault();e.stopPropagation();const parent=display.getBoundingClientRect();
   group.style.left=(e.clientX-parent.left-wordDrag.dx)+'px';group.style.top=(e.clientY-parent.top-wordDrag.dy)+'px';
   let best=Infinity;slots.forEach((slot,i)=>{const r=slot.getBoundingClientRect(),distance=Math.hypot(e.clientX-r.left-r.width/2,(e.clientY-r.top-r.height/2)*2);if(distance<best){best=distance;wordDrag.to=i}});
   slots.forEach((slot,i)=>slot.classList.toggle('c3-word-target',i===wordDrag.to));
  });
  group.addEventListener('pointerup',e=>{if(wordDrag?.id===e.pointerId){e.stopPropagation();finishWord(false)}});
  group.addEventListener('pointercancel',()=>finishWord(true));group.addEventListener('lostpointercapture',()=>finishWord(true));
  group.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Escape'].includes(e.key))return;e.preventDefault();e.stopPropagation();if(e.key==='Escape'){finishWord(true);return}const from=order.indexOf(group),to=Math.max(0,Math.min(order.length-1,from+(e.key==='ArrowLeft'?-1:1)));order.splice(from,1);order.splice(to,0,group);arrangeWords();group.focus({preventScroll:true})});
 });
 for(const type of ['touchstart','touchmove','touchend'])display.addEventListener(type,e=>{if(e.target.closest('.c3-display-word'))e.stopPropagation()},{passive:true});
 // Navigation always wins over an unfinished local drag; do not consume wheel events.
 window.addEventListener('wheel',()=>{
  if(root.hidden)return;
  finishWord(true);
  if(drag){const id=drag.id;drag=null;catcher.classList.remove('dragging');if(catcher.hasPointerCapture(id))catcher.releasePointerCapture(id)}
 },{capture:true,passive:true});
 let localTouch=null;
 scene.addEventListener('touchstart',e=>{if(e.touches.length===1&&e.target.closest('.c3-display-word,.c3-pot-catcher'))localTouch={x:e.touches[0].clientX,y:e.touches[0].clientY,scroll:false}},{capture:true,passive:true});
 scene.addEventListener('touchmove',e=>{
  if(!localTouch||e.touches.length!==1)return;
  const touch=e.touches[0],dy=localTouch.y-touch.clientY,dx=localTouch.x-touch.clientX;
  if(!localTouch.scroll&&Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)*1.3){localTouch.scroll=true;finishWord(true);if(drag){const id=drag.id;drag=null;catcher.classList.remove('dragging');if(catcher.hasPointerCapture(id))catcher.releasePointerCapture(id)}}
  if(localTouch.scroll){e.preventDefault();e.stopPropagation();navigateScroll(dy*2);localTouch.y=touch.clientY;localTouch.x=touch.clientX}
 },{capture:true,passive:false});
 for(const type of ['touchend','touchcancel'])scene.addEventListener(type,()=>{localTouch=null},{capture:true,passive:true});
 const rain=scene.querySelector('.c3-rain'),ctx=rain.getContext('2d'),stamp=document.createElement('canvas'),source=new Image();
 const sprites=[],drops=[];
 let ready=false,w=0,h=0,clock=0,lastDraw=-Infinity,rainTime=0;
 source.onload=()=>{
  stamp.width=source.naturalWidth;stamp.height=source.naturalHeight;
  const sc=stamp.getContext('2d',{willReadFrequently:true});sc.drawImage(source,0,0);
  const pixels=sc.getImageData(0,0,stamp.width,stamp.height),d=pixels.data;
  // Extract pigment rather than white paper; retain the supplied drop texture.
  for(let i=0;i<d.length;i+=4){const ink=Math.max(0,Math.min(1,(250-(d[i]*.2126+d[i+1]*.7152+d[i+2]*.0722))/180));d[i]=44+Math.round((1-ink)*20);d[i+1]=72+Math.round((1-ink)*24);d[i+2]=119+Math.round((1-ink)*26);d[i+3]=Math.round(ink*230)}
  sc.putImageData(pixels,0,0);
  // Isolated drops, not a scrolling image tile. Coordinates refer to the original artwork.
  for(const [x,y,width,height] of [[138,48,24,50],[203,252,27,62],[716,242,29,62],[1010,58,25,53],[1208,38,27,60],[402,452,27,60]]){
   const sprite=document.createElement('canvas');sprite.width=width;sprite.height=height;
   sprite.getContext('2d').drawImage(stamp,x/1417*stamp.width,y/1417*stamp.height,width/1417*stamp.width,height/1417*stamp.height,0,0,width,height);sprites.push(sprite);
  }
  ready=true;rain.dataset.ready='true';lastDraw=-Infinity;
 };
 source.onerror=()=>{rain.dataset.ready='error'};source.src='assets/lluvia.jpg';
 function paint(now){
  if(w!==innerWidth||h!==innerHeight){
   w=rain.width=innerWidth;h=rain.height=innerHeight;lastDraw=-Infinity;drops.length=0;
   const count=Math.max(35,Math.min(135,Math.round(w*h/11000)));
   for(let i=0;i<count;i++)drops.push({x:Math.random()*w,y:Math.random()*(h+100)-100,speed:70+Math.random()*280,size:.35+Math.random()*.65,alpha:.24+Math.random()*.65,sprite:i%6});
   rain.dataset.drops=String(count);rainTime=clock;
  }
  if(!ready||now-lastDraw<30)return;lastDraw=now;ctx.clearRect(0,0,w,h);
  const elapsed=red.matches?0:Math.max(0,clock-rainTime);rainTime=clock;
  const bowl=catcher.getBoundingClientRect(),screen=rain.getBoundingClientRect(),surface=bowl.top-screen.top+bowl.height*.37;
  for(const drop of drops){
   const sprite=sprites[drop.sprite],tip=drop.y+sprite.height*drop.size;
   if(drop.entering){
    drop.entering.time+=elapsed;const t=Math.min(1,drop.entering.time/.18),entry=drop.entering;
    if(t<1){ctx.globalAlpha=drop.alpha*(1-t);ctx.drawImage(sprite,bowl.left-screen.left+entry.x*bowl.width,bowl.top-screen.top+(entry.y+t*.12)*bowl.height,sprite.width*drop.size*(1-t*.6),sprite.height*drop.size*(1-t*.6));continue}
    drop.entering=null;drop.y=-60-Math.random()*140;drop.x=Math.random()*w;
   }
   drop.y+=drop.speed*elapsed;
   if(tip<=surface&&drop.y+sprite.height*drop.size>=surface&&drop.x>=bowl.left-screen.left+bowl.width*.24&&drop.x<=bowl.left-screen.left+bowl.width*.79){caught++;drawWater();drop.entering={time:0,x:(drop.x-bowl.left+screen.left)/bowl.width,y:(drop.y-bowl.top+screen.top)/bowl.height}}
   if(drop.y>h+50){drop.y=-60-Math.random()*140;drop.x=Math.random()*w;drop.speed=70+Math.random()*280;drop.alpha=.24+Math.random()*.65}
   ctx.globalAlpha=drop.alpha;ctx.drawImage(sprite,drop.x,drop.y,sprite.width*drop.size,sprite.height*drop.size);
  }
  ctx.globalAlpha=1;
 }
 const previous=window.casaRender;
 window.casaRender=function(now,dt){
  previous(now,dt);
  const active=!root.hidden&&document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering');
   display.style.visibility=active?'visible':'hidden';if(!active){finishWord(true);return}
  root.style.backgroundColor='rgb(244,244,241)';
  // Small continuous travel makes progress perceptible without any automatic advance.
  const travel=Math.max(0,Math.min(1,(current-12.6)/2.9));
  display.style.top=(53-travel*6)+'%';
  if(!document.hidden)clock+=Math.min(.05,Math.max(0,dt));
  paint(now);
  groups.forEach((group,i)=>{const phase=clock/(12+i%5*2)*Math.PI*2+i*1.7;group.style.transform=red.matches||wordDrag?.group===group?'none':'translate('+(Math.sin(phase)*10).toFixed(2)+'px,'+(Math.sin(phase*.7)*4).toFixed(2)+'px)'});
 };
})();