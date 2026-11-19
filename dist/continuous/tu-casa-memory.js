// Two consecutive rooms, sharing the same drawing, caption and export model.
(()=>{'use strict';
 const root=document.getElementById('community-journey'),editor=document.getElementById('tu-casa-editor'),layout=editor.querySelector('.community-draw-layout'),heading=layout.querySelector('h2'),form=editor.querySelector('form'),actions=editor.querySelector('.tu-actions'),cover=layout.querySelector('.tu-cover'),pad=document.getElementById('community-pad'),skip=document.getElementById('tu-skip'),status=document.getElementById('tu-status'),red=matchMedia('(prefers-reduced-motion:reduce)');
 const memoryRoom=document.createElement('section');memoryRoom.id='tu-memory-room';memoryRoom.setAttribute('aria-label','El recuerdo de tu casa');memoryRoom.hidden=true;memoryRoom.inert=true;
 const memoryHeading=heading.cloneNode(true);memoryHeading.removeAttribute('style');memoryRoom.append(memoryHeading,form);root.append(memoryRoom);
 memoryHeading.replaceChildren();memoryHeading.setAttribute('aria-label','Escribí un recuerdo de tu casa, algo que todavía viva en vos.');
 const memoryWords=[];
 for(const text of ['Escribí un recuerdo de tu casa,','algo que todavía viva en vos.']){
  const line=document.createElement('span');line.className='tu-heading-line';memoryHeading.append(line);
  for(const word of text.split(' ')){
   const group=document.createElement('span');group.className='ink-word';
   for(const char of word){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}
   line.append(group,document.createTextNode(' '));memoryWords.push(group);
  }
 }
 // Own navigation gestures without disabling the visible moving rooms.
 // Otherwise the target changes mid-gesture and legacy panel handlers swallow it.
 function routeInput(e){return document.body.classList.contains('inhabited')&&current>=12.6&&current<19.9&&!communityPrototype.active&&!document.querySelector('dialog[open]')&&!e.target.closest?.('#music-player,[contenteditable=true]')}
 function moveRoute(e,delta){
   if(!delta)return;
   const field=e.target.closest?.('textarea');
   if(field){
    const before=field.scrollTop;field.scrollTop+=delta;
    delta-=field.scrollTop-before;
   }
   if(e.cancelable)e.preventDefault();e.stopImmediatePropagation();
   if(Math.abs(delta)<.01)return;
   if(root.contains(document.activeElement))document.activeElement.blur();
   navigateScroll(Math.max(-innerHeight*1.5,Math.min(innerHeight*1.5,delta)));
 }
 window.addEventListener('wheel',e=>{
   if(e.ctrlKey||!routeInput(e))return;
   const unit=e.deltaMode===1?16:e.deltaMode===2?innerHeight:1;
   moveRoute(e,(Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX)*unit);
 },{capture:true,passive:false});
 let routeTouch=null;
 window.addEventListener('touchstart',e=>{
   routeTouch=routeInput(e)&&e.touches.length===1&&!e.target.closest('#community-pad')?e.touches[0].clientY:null;
   if(routeTouch!==null)e.stopImmediatePropagation();
 },{capture:true,passive:true});
 window.addEventListener('touchmove',e=>{
   if(routeTouch===null||e.touches.length!==1)return;
   const y=e.touches[0].clientY,delta=routeTouch-y;routeTouch=y;
   if(routeInput(e))moveRoute(e,delta);
 },{capture:true,passive:false});
 for(const type of ['touchend','touchcancel'])window.addEventListener(type,()=>{routeTouch=null},{capture:true,passive:true});
 // Stop leftover easing at the visible position before a local interaction.
 // Do not snap to a phase, capture the pointer, or block the next scroll gesture.
 function settleInteraction(e){
   if(!e.target.closest?.('#community-pad,button,input,textarea,select,a'))return;
   target=current;storeTravel();
 }
 root.addEventListener('pointerdown',settleInteraction,{capture:true});
 root.addEventListener('focusin',settleInteraction);
 const archiveButton=document.createElement('button');archiveButton.id='tu-add-archive';archiveButton.type='submit';archiveButton.textContent='Añadir al archivo';
 const archiveStatus=document.createElement('p');archiveStatus.id='tu-archive-status';archiveStatus.setAttribute('role','status');archiveStatus.setAttribute('aria-live','polite');
 form.append(archiveButton,archiveStatus);
 form.onsubmit=e=>{
   e.preventDefault();target=current;
   try{
    if(!communityPrototype.save(document.getElementById('tu-title').value.trim(),document.getElementById('tu-memory').value.trim())){archiveStatus.textContent='Escribí un recuerdo o dibujá tu casa antes de añadirlo.';return}
    archiveStatus.textContent='Añadido al archivo de este navegador.';
    communityPrototype.openAtlas(true);
   }catch{archiveStatus.textContent='No se pudo guardar. Tu dibujo y tu recuerdo siguen acá; podés volver a intentarlo.'}
 };
 const drawingLabel=document.createElement('p');drawingLabel.className='tu-drawing-label';drawingLabel.textContent='Dibujá tu casa';editor.querySelector('.community-tools').before(drawingLabel);
 const undo=document.getElementById('community-undo');undo.textContent='↶';undo.title='Deshacer el último trazo';undo.setAttribute('aria-label','Deshacer el último trazo');document.getElementById('community-clear').textContent='Borrar dibujo';
 const drawingTools=editor.querySelector('.community-tools');drawingTools.setAttribute('aria-label','Controles del dibujo');pad.closest('.tu-pad-wrap').before(drawingTools);
 const clear=document.getElementById('community-clear');clear.title='Borrar dibujo';clear.setAttribute('aria-label','Borrar dibujo');clear.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 pad.closest('.tu-pad-wrap').parentElement.classList.add('tu-drawing-column');
 cover.querySelector('figcaption').textContent='Vista previa';
 const frame=document.createElement('canvas');frame.className='tu-cover-frame';frame.setAttribute('aria-hidden','true');cover.append(frame);
 const fieldFrames=[...form.querySelectorAll('input,textarea')].map(field=>{
  const wrap=document.createElement('div');wrap.className='tu-field-wrap';field.before(wrap);wrap.append(field);
  const canvas=document.createElement('canvas');canvas.className='tu-field-frame';canvas.setAttribute('aria-hidden','true');wrap.append(canvas);return {field,canvas};
 });
 const divider=document.createElement('canvas');divider.className='tu-memory-divider';divider.setAttribute('aria-hidden','true');root.append(divider);
 const download=document.getElementById('tu-download'),send=document.getElementById('tu-send'),order=document.getElementById('tu-order');download.textContent='Descargar postal';send.textContent='Compartir en Instagram';order.textContent='Personalizar mi disco';
 const actionRail=document.createElement('aside');actionRail.className='tu-action-rail';actionRail.setAttribute('aria-label','Opciones de tu postal');actionRail.append(download,send,order);layout.append(actionRail);actions.replaceChildren(status);
 // Instagram does not expose a browser API for publishing a file directly.
 send.onclick=async()=>{
  if(!communityPrototype.strokes.length){status.textContent='Dibujá tu casa antes de compartirla.';return}
  try{
   await document.fonts.ready;const canvas=tuCasaPostal.render(document.createElement('canvas'),'cover');const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('PNG no disponible');
   const file=new File([blob],'mi-casa-instagram.png',{type:'image/png'});
   if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({files:[file],title:'Mi casa',text:document.getElementById('tu-memory').value});status.textContent='Elegí Instagram si aparece entre las aplicaciones para compartir. No se publica automáticamente.'}
   else{await tuCasaPostal.download('cover');status.textContent='Descargamos la imagen para que la publiques en Instagram. No se publicó automáticamente.'}
  }catch(error){status.textContent=error.name==='AbortError'?'Compartir cancelado. Tu dibujo sigue acá.':'No se pudo compartir. Podés descargar la postal.'}
 };
 skip.classList.add('fh-continue');skip.textContent='Seguí scrolleando ↓';skip.onclick=()=>{document.activeElement?.blur();target=current<17.9?18.4:19.95;storeTravel()};
 const pencil="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 64 64'%3E%3Cpath d='M8 56L13 40L46 7L57 18L24 51Z M13 40L24 51 M40 13L51 24' fill='%23f4f4f1' stroke='%23111111' stroke-width='2'/%3E%3C/svg%3E\") 4 28, crosshair";
 pad.style.setProperty('cursor',pencil,'important');
 let onPad=false,lastBorder=-Infinity;
 pad.addEventListener('pointerenter',()=>{onPad=true;root.classList.add('tu-pencil-hover')});pad.addEventListener('pointerleave',()=>{onPad=false;root.classList.remove('tu-pencil-hover')});
  function rectangleBorder(element,canvas,now){
   const r=element.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=r.width+12,h=r.height+12;if(!r.width||!r.height)return;
   canvas.style.width=w+'px';canvas.style.height=h+'px';canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);const c=canvas.getContext('2d');c.scale(dpr,dpr);const t=red.matches?0:now/1000;
   for(const [i,edge] of [[6,6,w-6,6],[w-6,6,w-6,h-6],[w-6,h-6,6,h-6],[6,h-6,6,6]].entries())window.houseGraphiteLine(...edge,41+i,t,c);
  }
  function border(now,drawing,writing){
  if(now-lastBorder<36||red.matches&&lastBorder!==-Infinity)return;lastBorder=now;
   if(drawing)rectangleBorder(cover.querySelector('canvas'),frame,now);
   if(writing)fieldFrames.forEach(({field,canvas})=>rectangleBorder(field,canvas,now));
 }
 window.addEventListener('resize',()=>{lastBorder=-Infinity});red.addEventListener('change',()=>{lastBorder=-Infinity});
 memoryRoom.addEventListener('keydown',e=>{if(e.target.closest('input,textarea'))e.stopPropagation()});
  let previousWriting=false,previousDrawing=false;
  const previous=window.casaRender;
 window.casaRender=function(now,dt){
  previous(now,dt);
   const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering'),p=current,visible=inside&&p>=14.8&&p<19.9,writing=visible&&p>=17.3,drawing=visible&&p<17.9;
   const entry=Math.max(0,Math.min(1,(p-17.3)/.6)),exit=Math.max(0,Math.min(1,(p-19.3)/.6)),passing=entry>0&&entry<1||exit>0;
    root.classList.toggle('is-visible',visible);root.classList.toggle('tu-writing',writing);root.inert=!visible;editor.hidden=!drawing;editor.inert=!drawing;memoryRoom.hidden=!writing;memoryRoom.inert=!writing;
    // The placeholder parent used to sit below the closing film during exit.
    // Keep the visible paper and its fields above it until the paper has left.
    const roomScene=root.closest('[data-escena="tu-casa"]');if(roomScene)roomScene.style.zIndex=visible?'10':'';
    document.getElementById('resto-provisorio').style.zIndex=visible?'60':'';
   editor.style.transform='translate3d(0,'+(-entry*innerHeight)+'px,0)';
   memoryRoom.style.transform='translate3d(0,'+((1-entry-exit)*innerHeight)+'px,0)';
   root.style.backgroundColor='transparent';editor.style.backgroundColor='#f4f4f1';document.body.classList.toggle('community-active',visible);
   if(writing!==previousWriting||drawing!==previousDrawing){lastBorder=-Infinity;previousWriting=writing;previousDrawing=drawing}
   if(visible)border(now,drawing,writing);
   if(!drawing){onPad=false;root.classList.remove('tu-pencil-hover')}
   divider.hidden=!visible||!passing;
   if(!divider.hidden){const ratio=Math.min(devicePixelRatio||1,2);divider.width=Math.round(innerWidth*ratio);divider.height=Math.round(innerHeight*ratio);const c=divider.getContext('2d');c.scale(ratio,ratio);const y=(exit>0?1-exit:1-entry)*innerHeight;window.houseGraphiteLine(-3,y,innerWidth+3,y,41,red.matches?0:now/1000,c)}
   skip.style.visibility=passing?'hidden':'visible';
   memoryHeading.style.visibility=writing?'visible':'hidden';
   if(writing)memoryWords.forEach((word,i)=>{const phase=now/1000/(12+i%5*2)*Math.PI*2+i*1.7;word.style.transform=red.matches?'none':'translate('+Math.sin(phase)*7+'px,'+Math.sin(phase*.7)*3+'px)'});
 };
})();