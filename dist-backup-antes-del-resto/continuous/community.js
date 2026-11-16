// Local prototype: no account, server or public submission is implied.
(()=>{
 const KEY='la-casa-community-drawing-v1',NS='http://www.w3.org/2000/svg';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const path=points=>points.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ');
 function closed(points){if(points.length<4)return false;let length=0;for(let i=1;i<points.length;i++)length+=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);return length>60&&Math.hypot(points[0][0]-points.at(-1)[0],points[0][1]-points.at(-1)[1])<=20}
 function drawing(strokes){const loops=strokes.filter(s=>s.closed),lines=strokes.filter(s=>!s.closed);return '<svg xmlns="'+NS+'" viewBox="0 0 800 500" role="img" aria-label="Casa dibujada a mano"><path fill="#335386" fill-rule="evenodd" d="'+loops.map(s=>path(s.points)+' Z').join(' ')+'"/><path fill="none" stroke="#335386" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="'+lines.map(s=>path(s.points)).join(' ')+'"/></svg>'}
 const examples=['En el patio siempre había una silla esperando.','La cocina se llenaba de voces los domingos.','Me acuerdo de la luz debajo de la puerta.','La ventana daba a un árbol enorme.','Todavía reconozco el sonido de esa escalera.','En esa casa aprendí a quedarme.'];
 const names=['Ana','Nico','Luz','Juli','Mar','Tomás','Sol','Dani','Vale','Pau','Fran','Leo'];
 const lineHouse=i=>[{closed:false,points:[[120,390],[120,205],[390,65+i*5],[650,210],[650,390],[460,390],[460,285],[330,285],[330,390],[170,390]]},{closed:false,points:[[200,235],[280,235],[280,290],[200,290],[200,235]]}];
 const entries=Array.from({length:24},(_,i)=>({name:names[i%names.length],memory:examples[i%examples.length],asset:'assets/casas-comunidad/recortes/casa-'+String(i%2?27+Math.floor(i/2):1+Math.floor(i/2)).padStart(2,'0')+'.png',strokes:i%4===3?lineHouse(i):null,demo:true}));
 let strokes=[],saved=null,active=null;
 function valid(data){return data&&typeof data.name==='string'&&typeof data.memory==='string'&&Array.isArray(data.strokes)&&data.strokes.length<=120&&data.strokes.every(s=>s&&typeof s.closed==='boolean'&&Array.isArray(s.points)&&s.points.length<=2500&&s.points.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&n>=0&&n<=800)))}
 try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(valid(data)){saved=data;strokes=data.strokes}}catch{}
 const root=document.createElement('section');root.id='community-journey';root.inert=true;root.setAttribute('aria-label','Las casas de quienes pasan');
 root.innerHTML=`<div id="community-walk"><h2 class="community-heading">Una casa también puede ser<br>el recuerdo de alguien más.</h2><div class="community-track"></div><p class="community-caption">OTRAS CASAS · Seguí bajando para recorrerlas →<br>Tocá una casa para leer su memoria. Nombres y recuerdos de ejemplo.</p></div><section id="community-draw-step" hidden><div class="community-draw-layout"><div><h2 class="community-draw-title">¿Cómo recordás tu casa?</h2><p class="community-help">Dibujala en este recuadro. Un trazo abierto queda como línea. Volvé al comienzo de un trazo para cerrar una silueta. Cerrá otra figura dentro para calar una puerta, una ventana o un vacío.</p><svg id="community-pad" viewBox="0 0 800 500" preserveAspectRatio="none" role="img" aria-label="Recuadro para dibujar tu casa con el mouse, el dedo o un lápiz"></svg><div class="community-tools"><button type="button" id="community-undo">Deshacer trazo</button><button type="button" id="community-clear">Borrar dibujo</button></div></div><form class="community-form"><label>Tu nombre o nombre de usuario<input id="community-name" maxlength="60" autocomplete="nickname" placeholder="¿Cómo te llamás?"></label><label>Una memoria de esa casa<textarea id="community-text" maxlength="700" placeholder="Me acuerdo de…"></textarea></label><button type="submit">Sumar mi casa al recorrido ↗</button><p class="community-local">Prototipo local: tu casa se guarda solo en este navegador. No se publica ni se envía a otras personas.</p><p id="community-status" role="status" aria-live="polite"></p><button type="button" id="community-continue">Continuar sin compartir ↓</button></form></div></section>`;
 document.body.append(root);
 const track=root.querySelector('.community-track'),pad=$('community-pad'),status=$('community-status');
 const modal=document.createElement('dialog');modal.id='community-memory';modal.innerHTML='<button type="button">Cerrar memoria ×</button><div></div>';document.body.append(modal);modal.querySelector('button').onclick=()=>modal.close();
 for(const event of ['wheel','keydown','touchstart','touchmove'])modal.addEventListener(event,e=>e.stopPropagation(),{passive:true});
 const artwork=e=>e.strokes?drawing(e.strokes):'<img src="'+e.asset+'" alt="Silueta de una casa con textura de papel" loading="lazy">';
 function showMemory(e){modal.querySelector('div').innerHTML=artwork(e)+'<h2>'+esc(e.name||'Sin nombre')+'</h2><p>'+esc(e.memory||'Una casa que todavía no tiene palabras.')+'</p><p class="community-local">'+(e.demo?'Memoria y nombre de ejemplo · prototipo':'Tu aporte · guardado solo en este navegador')+'</p>';modal.showModal()}
 function populate(container){container.replaceChildren();[...entries,...(saved?[saved]:[])].forEach(e=>{const b=document.createElement('button');b.type='button';b.className='community-house';b.innerHTML=artwork(e)+'<span>'+esc(e.name||'Sin nombre')+'<br><small>'+(e.demo?'leer memoria ↗':'tu casa · leer memoria ↗')+'</small></span>';b.onclick=()=>showMemory(e);container.append(b)})}
 populate(track);
 // Use the existing bicycle panorama, not a second horizontal scene.
 const landscape=$('p15-cerca');landscape.replaceChildren(track);track.classList.add('community-landscape-track');
 // Only this walk uses the cleaned white copies; the blue atlas keeps its art.
 track.querySelectorAll('img').forEach(im=>{im.src=im.src.replace('/recortes/','/blancas/')});
 $('p15-lejos').replaceChildren();
 for(let i=0;i<12;i++){const im=document.createElement('img');im.src='assets/casas-comunidad/blancas/casa-'+String(i+13).padStart(2,'0')+'.png';im.alt='';$('p15-lejos').append(im)}
 const oldWalk=$('community-walk');oldWalk.hidden=true;
 function positionDistantHouses(progress){const far=$('p15-lejos');far.style.transform='translateX('+(innerWidth-progress*(far.scrollWidth+innerWidth))+'px)'}
 function paint(){pad.innerHTML=drawing(strokes).replace(/^.*?<svg[^>]*>|<\/svg>$/g,'')+(active?'<path d="'+path(active)+'" fill="none" stroke="#335386" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>':'')}
 function point(e){const r=pad.getBoundingClientRect();return [Math.max(0,Math.min(800,(e.clientX-r.left)*800/r.width)),Math.max(0,Math.min(500,(e.clientY-r.top)*500/r.height))]}
 pad.addEventListener('pointerdown',e=>{if(e.button!==0||strokes.length>=120)return;e.preventDefault();e.stopPropagation();pad.setPointerCapture(e.pointerId);active=[point(e)];paint()});
 pad.addEventListener('pointermove',e=>{if(!active)return;const p=point(e),last=active.at(-1);if(Math.hypot(p[0]-last[0],p[1]-last[1])<1.5||active.length>=2500)return;active.push(p);paint()});
 function finish(e){if(!active)return;if(e?.type==='pointercancel'){active=null;paint();return}if(e)active.push(point(e));if(active.length>1)strokes.push({points:active,closed:closed(active)});active=null;paint()}
 pad.addEventListener('pointerup',finish);pad.addEventListener('pointercancel',finish);pad.addEventListener('lostpointercapture',()=>{if(active){active=null;paint()}});
 $('community-undo').onclick=()=>{active=null;strokes.pop();paint()};$('community-clear').onclick=()=>{active=null;strokes=[];paint()};
 $('community-name').value=saved?.name||'';$('community-text').value=saved?.memory||'';paint();
 root.querySelector('form').onsubmit=e=>{e.preventDefault();if(!strokes.length){status.textContent='Primero dejá un dibujo de tu casa en el recuadro.';return}saved={name:$('community-name').value.trim()||'Sin nombre',memory:$('community-text').value.trim(),strokes:JSON.parse(JSON.stringify(strokes)),demo:false};try{localStorage.setItem(KEY,JSON.stringify(saved));status.textContent='Tu casa ya forma parte de este recorrido local. Podés seguir bajando.'}catch{status.textContent='Tu casa se sumó a esta visita, pero el navegador no permitió guardarla.'}populate(track);document.querySelectorAll('.community-gallery-track').forEach(populate);$('community-continue').textContent='Continuar ↓'};
 $('community-continue').onclick=()=>{target=24.15;storeTravel()};
 root.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,button'))e.stopPropagation()});
 root.addEventListener('touchstart',e=>{if(e.target.closest('#community-pad,input,textarea'))e.stopPropagation()},{passive:true});
 // Reuse the same archive in the exterior menu without touching other menu sections.
 const previousMenu=openMenuSection;
  openMenuSection=function(section){
   if(section==='others'&&document.body.classList.contains('closing-outside')){openAtlas();return}
   previousMenu(section);
  };
  // Provisional local atlas: recycle only visible cells instead of an enormous DOM.
  const atlas=document.createElement('dialog');atlas.id='community-atlas';
  atlas.setAttribute('aria-labelledby','community-atlas-title');
  atlas.innerHTML='<div class="atlas-minimal-nav"><button type="button" class="atlas-close">Volver</button><h2 id="community-atlas-title">Otras casas</h2></div><div class="atlas-viewport" tabindex="0" role="region" aria-label="Lienzo infinito. Arrastrá para recorrerlo; flechas para moverte; más y menos para zoom. Espacio para pausar el movimiento."><div class="atlas-world"></div></div>';
  document.body.append(atlas);
  const viewport=atlas.querySelector('.atlas-viewport'),world=atlas.querySelector('.atlas-world'),cells=new Map(),pointers=new Map();
  const camera={x:0,y:0,zoom:1};let atlasFrame=0,atlasFocus=null,gestureMoved=false,pinch=null;
  const atlasReduced=matchMedia('(prefers-reduced-motion:reduce)');
  let atlasLastTime=0,atlasIdleUntil=0,atlasMotion=0,atlasPaused=false;
  function interruptAtlas(){atlasIdleUntil=performance.now()+3000;atlasMotion=0}
  const limit=(v,a,b)=>Math.max(a,Math.min(b,v));
  function requestAtlas(){if(!atlasFrame&&atlas.open)atlasFrame=requestAnimationFrame(paintAtlas)}
  function paintAtlas(now=performance.now()){
   atlasFrame=0;if(!atlas.open)return;
   const dt=atlasLastTime?Math.min(.05,Math.max(0,(now-atlasLastTime)/1000)):0;atlasLastTime=now;
   const idle=!atlasReduced.matches&&!atlasPaused&&!document.hidden&&!modal.open&&!pointers.size&&now>atlasIdleUntil;
   atlasMotion+=(Number(idle)-atlasMotion)*(1-Math.exp(-dt*2));
   if(idle){camera.x-=dt*7*atlasMotion;camera.y+=dt*3*atlasMotion}
   const width=viewport.clientWidth,height=viewport.clientHeight,stepX=360,stepY=300;
   const col=Math.floor(-camera.x/stepX),row=Math.floor(-camera.y/stepY);
   const cols=Math.ceil(width/camera.zoom/stepX/2)+1,rows=Math.ceil(height/camera.zoom/stepY/2)+1;
   const archive=[...entries,...(saved?[saved]:[])],needed=new Set();
   world.style.transform=`translate(${width/2+camera.x*camera.zoom}px,${height/2+camera.y*camera.zoom}px) scale(${camera.zoom})`;
   for(let y=row-rows;y<=row+rows;y++)for(let x=col-cols;x<=col+cols;x++){
    const key=x+':'+y;needed.add(key);let button=cells.get(key);
    if(!button){
     const index=((x*7+y*11)%archive.length+archive.length)%archive.length,entry=archive[index];
     button=document.createElement('button');button.type='button';button.className='atlas-house';
     button.dataset.cell=key;button.setAttribute('aria-label',(entry.name||'Sin nombre')+' · Leer memoria'+(entry.demo?' de ejemplo':''));
     button.innerHTML=artwork(entry);
     button.style.setProperty('--atlas-depth',String(.82+((x*3+y*7)%5+5)%5*.07));
     button.onclick=()=>{if(!gestureMoved)showMemory(entry)};
     button.addEventListener('focus',()=>{if(!atlas.open||!button.matches(':focus-visible'))return;camera.x=-x*stepX;camera.y=-y*stepY;requestAtlas()});
     world.append(button);cells.set(key,button);
    }
    const offsetX=Math.sin(x*13+y*7)*35,offsetY=Math.sin(x*3-y*11)*24;
    button.style.left=(x*stepX+offsetX)+'px';button.style.top=(y*stepY+offsetY)+'px';
    button.style.setProperty('--atlas-turn',Math.sin(x*5+y*3)*4+'deg');
   }
   for(const [key,button] of cells)if(!needed.has(key)){button.remove();cells.delete(key)}
   if(!document.hidden&&!atlasReduced.matches&&!atlasPaused)requestAtlas();
  }
  function zoomAtlas(next,x=viewport.clientWidth/2,y=viewport.clientHeight/2){
   next=limit(next,.5,1.8);const px=x-viewport.clientWidth/2,py=y-viewport.clientHeight/2;
   camera.x+=px/next-px/camera.zoom;camera.y+=py/next-py/camera.zoom;camera.zoom=next;requestAtlas();
  }
  function openAtlas(){
   if(atlas.open)return;atlasFocus=document.activeElement;
   if(menuPanel.open)menuPanel.close();document.body.classList.remove('menu-panel-open');
   document.body.classList.add('community-atlas-open');atlas.showModal();
   cells.forEach(button=>button.remove());cells.clear();gestureMoved=false;atlasLastTime=0;atlasIdleUntil=performance.now()+1200;
   viewport.focus();paintAtlas();
  }
  atlas.querySelector('.atlas-close').onclick=()=>atlas.close();
  atlas.addEventListener('close',()=>{document.body.classList.remove('community-atlas-open');cancelAnimationFrame(atlasFrame);atlasFrame=0;pointers.clear();pinch=null;viewport.classList.remove('is-dragging');atlasFocus?.focus()});
  viewport.addEventListener('wheel',e=>{e.preventDefault();if(e.ctrlKey||e.metaKey){const r=viewport.getBoundingClientRect();zoomAtlas(camera.zoom*Math.exp(-e.deltaY*.002),e.clientX-r.left,e.clientY-r.top)}else{const unit=e.deltaMode===1?16:e.deltaMode===2?viewport.clientHeight:1;camera.x-=e.deltaX*unit/camera.zoom;camera.y-=e.deltaY*unit/camera.zoom;requestAtlas()}},{passive:false});
  viewport.addEventListener('pointerdown',e=>{
   if(e.button!==0)return;gestureMoved=false;
   pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY});
   // Capture on the original house so an unmoved tap still opens its memory.
   e.target.setPointerCapture(e.pointerId);viewport.classList.add('is-dragging');
   if(pointers.size===2){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y)}}
  });
  viewport.addEventListener('pointermove',e=>{
   const previous=pointers.get(e.pointerId);if(!previous)return;
   const dx=e.clientX-previous.x,dy=e.clientY-previous.y;
   if(Math.hypot(e.clientX-previous.startX,e.clientY-previous.startY)>6)gestureMoved=true;
   previous.x=e.clientX;previous.y=e.clientY;
   if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y),r=viewport.getBoundingClientRect();
    gestureMoved=true;if(pinch?.distance>0&&distance>0)zoomAtlas(camera.zoom*distance/pinch.distance,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top);pinch={distance};
   }else{camera.x+=dx/camera.zoom;camera.y+=dy/camera.zoom;requestAtlas()}
  });
  function endAtlasPointer(e){pointers.delete(e.pointerId);pinch=null;if(!pointers.size)viewport.classList.remove('is-dragging')}
  viewport.addEventListener('pointerup',endAtlasPointer);viewport.addEventListener('pointercancel',endAtlasPointer);viewport.addEventListener('lostpointercapture',endAtlasPointer);
  viewport.addEventListener('dragstart',e=>e.preventDefault());
  for(const event of ['wheel','pointerdown','pointermove','pointerup','keydown'])atlas.addEventListener(event,e=>{if(e.type!=='pointermove'||pointers.size)interruptAtlas()},{capture:true,passive:true});
  document.addEventListener('visibilitychange',()=>{atlasLastTime=0;if(document.hidden){cancelAnimationFrame(atlasFrame);atlasFrame=0}else requestAtlas()});
  atlasReduced.addEventListener('change',()=>{atlasMotion=0;requestAtlas()});
  atlas.addEventListener('keydown',e=>{
   if(e.key==='Escape')return;
   if(e.code==='Space'&&e.target===viewport){e.preventDefault();atlasPaused=!atlasPaused;requestAtlas();return}
   const moves={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]};
   if(moves[e.key]){e.preventDefault();const [x,y]=moves[e.key];camera.x+=x/camera.zoom;camera.y+=y/camera.zoom;requestAtlas()}
   else if(e.key==='+'||e.key==='='){e.preventDefault();zoomAtlas(camera.zoom*1.2)}
   else if(e.key==='-'){e.preventDefault();zoomAtlas(camera.zoom/1.2)}
   else if(e.key==='Home'){e.preventDefault();camera.x=camera.y=0;requestAtlas()}
   if(e.key==='Enter'||e.key===' ')gestureMoved=false;
  });
  // No wheel/touch/key input may leak into the scroll-driven journey underneath.
  for(const event of ['wheel','touchstart','touchmove','touchend','keydown','pointerdown','pointermove','pointerup'])atlas.addEventListener(event,e=>e.stopPropagation(),{passive:true});
  window.addEventListener('resize',requestAtlas);
 const previousRender=window.casaRender;
 window.casaRender=function(now,dt){previousRender(now,dt);const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering'),visible=inside&&current>=21.8&&current<24.15;root.classList.toggle('is-visible',visible);root.inert=!visible;document.body.classList.toggle('community-active',visible);root.style.transform='translateY('+((current<22?22-current:current>23.7?23.7-current:0)*innerHeight)+'px)';$('community-draw-step').hidden=!visible;const walking=inside&&current>=17.6&&current<22;document.body.classList.toggle('neighborhood-active',walking);if(walking){$('p15').style.transform='none';$('p15').style.visibility='visible'}const progress=Math.max(0,Math.min(1,(current-17.6)/3.4));track.style.transform='translate3d('+(innerWidth-progress*(track.scrollWidth+innerWidth))+'px,0,0)';landscape.style.transform='none';landscape.style.filter='none';positionDistantHouses(progress);$('p15-lejos').style.filter='none'};
 window.communityPrototype={closed,drawing,valid};
})();