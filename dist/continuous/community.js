// Local prototype: no account, server or public submission is implied.
(()=>{
 const KEY='la-casa-community-drawing-v1',NS='http://www.w3.org/2000/svg';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const path=points=>points.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ');
 function closed(points){if(points.length<4)return false;let length=0;for(let i=1;i<points.length;i++)length+=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);return length>60&&Math.hypot(points[0][0]-points.at(-1)[0],points[0][1]-points.at(-1)[1])<=20}
 function drawing(strokes){const loops=strokes.filter(s=>s.closed),lines=strokes.filter(s=>!s.closed);return '<svg xmlns="'+NS+'" viewBox="0 0 800 500" role="img" aria-label="Casa dibujada a mano">'+loops.map(s=>'<path fill="#335386" d="'+path(s.points)+' Z"/>').join('')+'<path fill="none" stroke="#335386" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="'+lines.map(s=>path(s.points)).join(' ')+'"/></svg>'}
 const lineHouse=i=>[{closed:false,points:[[120,390],[120,205],[390,65+i*5],[650,210],[650,390],[460,390],[460,285],[330,285],[330,390],[170,390]]},{closed:false,points:[[200,235],[280,235],[280,290],[200,290],[200,235]]}];
  const fictionalMemories=[
   ['Clara Benítez','La cocina encendida','Mi abuela dejaba la radio bajita. Desde el patio sabíamos que ya estaba preparando el mate.'],
   ['Tomás Pereyra','Una puerta abierta','En verano cenábamos en la vereda. Siempre aparecía alguien con una silla más.'],
   ['Lucía Funes','El limonero','La ventana de mi cuarto daba al limonero. Todavía busco ese olor cuando llueve.'],
   ['Mateo Soria','Los domingos','Mi papá amasaba sobre la mesa grande y yo hacía casas con la harina que sobraba.'],
   ['Inés Molina','La casa amarilla','El pasillo parecía larguísimo cuando era chica. Lo cruzaba corriendo hasta los brazos de mi mamá.'],
   ['Bruno Acosta','Después de la lluvia','Poníamos las zapatillas junto a la estufa y escuchábamos el agua caer del techo.'],
   ['Vera Quiroga','La última luz','Mi hermana y yo leíamos debajo de una frazada con una linterna que casi no tenía pilas.'],
   ['Julián Costa','El taller del fondo','Mi abuelo guardaba tornillos en frascos de mermelada. Decía que todo podía arreglarse.'],
   ['Alma Cabrera','A la hora de la siesta','Las persianas dibujaban rayas sobre el piso. Yo saltaba de una a otra sin pisar la sombra.'],
   ['Nicolás Ferreyra','El techo de chapa','Cuando llovía fuerte no se escuchaba la tele. Nos quedábamos escuchando la casa.'],
   ['Emilia Ríos','Una casa chiquita','No había lugar para una mesa más grande, pero siempre entraba alguien a comer.'],
   ['Simón Aguirre','La escalera','Me sentaba en el tercer escalón para esperar a mi hermano después de la escuela.'],
   ['Malena Duarte','El patio azul','Mi mamá pintó las macetas una tarde de enero. Las manos le quedaron azules hasta la noche.'],
   ['Pedro Ledesma','Volver del colegio','Dejaba la mochila en la entrada. El olor del pan tostado llegaba antes que el saludo.'],
   ['Amparo Vidal','La ventana del sur','Desde mi cama veía pasar las nubes por un pedacito de cielo entre dos edificios.'],
   ['Felipe Luna','La casa de los primos','Dormíamos todos en el piso del living. Nadie quería ser el primero en quedarse dormido.'],
   ['Renata Paz','El timbre roto','Había que dar tres palmadas en la reja. El perro nos anunciaba desde la primera.'],
   ['Damián Torres','Un lugar para cantar','Mi madre cantaba mientras barría. A veces todavía termino las canciones que ella empezaba.']
  ];
  function fictionalHouse(i){
   const house=[],mode=i%3;
   const stroke=(points,fill=false)=>house.push({closed:fill,points:fill?points:[...points,points[0]]});
   const line=points=>house.push({closed:false,points});
   const rect=(x,y,w,h,fill=false)=>stroke([[x,y],[x+w+2,y-2],[x+w,y+h],[x-2,y+h+1]],fill);
   const window=(x,y,w=55,h=55)=>{rect(x,y,w,h,mode===2);if(mode!==1){line([[x,y+h/2],[x+w,y+h/2]]);line([[x+w/2,y],[x+w/2,y+h]])}};
   const door=(x,y,h=100)=>{line([[x,y+h],[x+1,y],[x+61,y-2],[x+62,y+h]]);line([[x+46,y+h*.57],[x+49,y+h*.57]])};
   switch(i%9){
    case 0: // Low pitched-roof home.
     stroke([[155,420],[155,240],[386,86],[621,240],[618,420]],mode===1);
     stroke([[133,246],[386,75],[645,247]],mode===2);window(205,275);window(500,275);door(358,320);break;
    case 1: // Flat-roofed narrow townhouse, two floors.
     rect(262,105,260,315,mode===1);rect(248,91,288,22,mode===2);window(295,150,65,70);window(421,150,65,70);line([[262,265],[522,263]]);window(294,303);door(422,311,109);break;
    case 2: // A-frame cabin.
     stroke([[138,422],[390,65],[650,422]],mode===1);line([[171,422],[390,114],[616,422]]);window(364,227,52,50);door(357,324,98);break;
    case 3: // Stepped terrace with a rooftop water tank.
     stroke([[120,420],[120,245],[305,244],[305,160],[484,160],[484,237],[675,237],[675,420]],mode===1);
     rect(355,94,80,61,mode===2);line([[348,94],[444,94]]);window(165,289);window(545,284,78,60);door(355,311,109);break;
    case 4: // Barn with a broken mansard roof.
     stroke([[175,420],[175,235],[247,119],[493,119],[590,235],[590,420]],mode===1);
     stroke([[157,241],[235,105],[507,105],[612,244]],mode===2);rect(278,290,200,130);line([[278,290],[478,420]]);line([[478,290],[278,420]]);window(342,175,65,55);break;
    case 5: // Tall apartment building with balconies.
     rect(270,62,245,360,mode===1);rect(252,49,280,18,mode===2);
     for(let row=0;row<3;row++){window(295,95+row*90,55,52);window(425,95+row*90,55,52);line([[281,158+row*90],[500,158+row*90]]);line([[281,143+row*90],[281,170+row*90],[500,170+row*90],[500,143+row*90]])}door(360,349,73);break;
    case 6: // Two attached houses of different heights.
     stroke([[110,420],[110,258],[240,156],[370,258],[370,420]],mode===1);
     stroke([[370,420],[370,188],[512,83],[660,188],[660,420]],mode===2);window(153,288);door(265,320);window(411,230);window(550,230);door(510,320);break;
    case 7: // Long bungalow with veranda posts.
     rect(123,260,550,160,mode===1);stroke([[98,265],[235,150],[570,153],[701,265]],mode===2);
     for(const x of [145,330,650])line([[x,267],[x,423]]);window(190,295,85,60);window(514,295,85,60);door(390,316,104);line([[104,433],[693,433]]);break;
    case 8: // Asymmetric cottage with a side extension and chimney.
     stroke([[165,420],[165,232],[308,96],[465,232],[465,302],[651,302],[651,420]],mode===1);
     stroke([[146,240],[308,82],[484,239]],mode===2);rect(367,98,44,83,mode===2);window(210,275);window(537,332,65,46);door(349,317,103);line([[470,298],[535,247],[670,301]]);break;
   }
   // Solid silhouettes and mixed shapes use the same additive pigment as the pad.
   if(mode===1){
    // Architectural outlines remain legible outside the solid silhouette.
    line([[96,438],[697,435]]);
   }else if(mode===2){rect(80+(i%4)*11,386,46,37,true)}
   if(i>=9){
    // Second series: a different hand, proportions and small garden marks.
    house.forEach(s=>s.points=s.points.map(([x,y],n)=>[Math.max(20,Math.min(780,400+(x-400)*.82+(n%2?3:-2))),Math.max(20,Math.min(480,440-(440-y)*.9))]));
    line([[665,428],[665,345],[646,323],[665,304],[688,327],[665,345]]);
   }
   return house;
  }
  const entries=fictionalMemories.map(([name,title,memory],i)=>({name,title,memory,strokes:fictionalHouse(i),demo:true}));
  let strokes=[],saved=null,active=null,contributions=[];
 function valid(data){return data&&typeof data.name==='string'&&typeof data.memory==='string'&&Array.isArray(data.strokes)&&data.strokes.length<=120&&data.strokes.every(s=>s&&typeof s.closed==='boolean'&&Array.isArray(s.points)&&s.points.length<=2500&&s.points.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&n>=0&&n<=800)))}
 try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(valid(data)){saved=data;strokes=data.strokes}}catch{}
  try{const data=JSON.parse(localStorage.getItem(KEY+'-archive')||'[]');if(Array.isArray(data))contributions=data.filter(valid)}catch{}
  if(saved&&!contributions.some(e=>JSON.stringify(e.strokes)===JSON.stringify(saved.strokes)&&e.memory===saved.memory))contributions.push(saved);
  const archiveEntries=()=>[...entries,...contributions];
 const root=document.createElement('section');root.id='community-journey';root.inert=true;root.setAttribute('aria-label','Las casas de quienes pasan');
 root.innerHTML=`<div id="community-walk"><h2 class="community-heading">Una casa también puede ser<br>el recuerdo de alguien más.</h2><div class="community-track"></div><p class="community-caption">OTRAS CASAS · Seguí bajando para recorrerlas →<br>Tocá una casa para leer su memoria. [memoria de la comunidad]</p></div><section id="community-draw-step" hidden><div class="community-draw-layout"><div><h2 class="community-draw-title">¿Cómo recordás tu casa?</h2><p class="community-help">Dibujala en este recuadro. Un trazo abierto queda como línea. Volvé al comienzo de un trazo para cerrar una silueta. Cerrá otra figura dentro para calar una puerta, una ventana o un vacío.</p><svg id="community-pad" viewBox="0 0 800 500" preserveAspectRatio="none" role="img" aria-label="Recuadro para dibujar tu casa con el mouse, el dedo o un lápiz"></svg><div class="community-tools"><button type="button" id="community-undo">Deshacer trazo</button><button type="button" id="community-clear">Borrar dibujo</button></div></div><form class="community-form"><label>Tu nombre o nombre de usuario<input id="community-name" maxlength="60" autocomplete="nickname" placeholder="¿Cómo te llamás?"></label><label>Una memoria de esa casa<textarea id="community-text" maxlength="700" placeholder="Me acuerdo de…"></textarea></label><button type="submit">Sumar mi casa al recorrido ↗</button><p class="community-local">Prototipo local: tu casa se guarda solo en este navegador. No se publica ni se envía a otras personas.</p><p id="community-status" role="status" aria-live="polite"></p><button type="button" id="community-continue">Continuar sin compartir ↓</button></form></div></section>`;
 document.body.append(root);
 const track=root.querySelector('.community-track'),pad=$('community-pad'),status=$('community-status');
 const modal=document.createElement('dialog');modal.id='community-memory';modal.innerHTML='<button type="button">Cerrar memoria ×</button><div></div>';document.body.append(modal);modal.querySelector('button').onclick=()=>modal.close();
 for(const event of ['wheel','keydown','touchstart','touchmove'])modal.addEventListener(event,e=>e.stopPropagation(),{passive:true});
 const artwork=e=>e.strokes?drawing(e.strokes):'<img src="'+e.asset+'" alt="Silueta de una casa con textura de papel" loading="lazy">';
  const cardPictures=new WeakMap();
  function cardPicture(entry){
   if(cardPictures.has(entry))return cardPictures.get(entry);
   if(!window.tuCasaPostal)return '';
   const canvas=document.createElement('canvas');canvas.width=canvas.height=400;const c=canvas.getContext('2d');c.fillStyle='#2c4877';c.fillRect(0,0,400,400);
   c.drawImage(tuCasaPostal.drawPigment(0,false,entry.strokes||[]),0,0,400,400);
   const image=canvas.toDataURL('image/png');cardPictures.set(entry,image);return image;
  }
  function memoryCard(entry,index=0){return '<span class="archive-card-kicker">MEMORIA Nº '+String(index+1).padStart(2,'0')+'</span><strong>'+esc(entry.title||'Mi casa')+'</strong><span class="archive-card-memory">'+esc(entry.memory||'Sin recuerdo escrito')+'</span><span class="archive-card-art"><img src="'+cardPicture(entry)+'" alt="Casa dibujada con lápiz lila sobre el recuadro azul" draggable="false"></span><span class="archive-card-footer"><span class="archive-card-brand"><img src="assets/logo-la-casa.webp" alt="La casa" draggable="false"></span><span>'+esc(entry.name||entry.title||'Sin nombre')+'</span></span>'}
  function showMemory(e){let card=modal.querySelector('article');if(!card){modal.querySelector('div')?.remove();card=document.createElement('article');modal.append(card)}card.className='archive-memory-card';card.innerHTML=memoryCard(e,Math.max(0,archiveEntries().indexOf(e)));if(!modal.open)modal.showModal()}
 function populate(container){container.replaceChildren();[...entries,...(saved?[saved]:[])].forEach(e=>{const b=document.createElement('button');b.type='button';b.className='community-house';b.innerHTML=artwork(e)+'<span>'+esc(e.name||'Sin nombre')+'<br><small>'+(e.demo?'leer memoria ↗':'tu casa · leer memoria ↗')+'</small></span>';b.onclick=()=>showMemory(e);container.append(b)})}
 populate(track);
 // Use the existing bicycle panorama, not a second horizontal scene.
 const landscape=$('p15-cerca');landscape.replaceChildren(track);track.classList.add('community-landscape-track');
 // Only this walk uses the cleaned white copies; the blue atlas keeps its art.
 // Keep the original community cutouts in the walk as well as in the atlas.
 $('p15-lejos').replaceChildren();
 for(let i=0;i<12;i++){const im=document.createElement('img');im.src='assets/casas-comunidad/blancas/casa-'+String(i+13).padStart(2,'0')+'.png';im.alt='';$('p15-lejos').append(im)}
 const oldWalk=$('community-walk');oldWalk.hidden=true;
 function positionDistantHouses(progress){const far=$('p15-lejos');far.style.transform='translateX('+(innerWidth-progress*(far.scrollWidth+innerWidth))+'px)'}
 function paint(){pad.innerHTML=drawing(strokes).replace(/^.*?<svg[^>]*>|<\/svg>$/g,'')+(active?'<path d="'+path(active)+'" fill="none" stroke="#335386" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>':'');window.dispatchEvent(new Event('community-drawing-change'))}
 function point(e){const r=pad.getBoundingClientRect();return [Math.max(0,Math.min(800,(e.clientX-r.left)*800/r.width)),Math.max(0,Math.min(500,(e.clientY-r.top)*500/r.height))]}
 pad.addEventListener('pointerdown',e=>{if(e.button!==0||strokes.length>=120)return;e.preventDefault();e.stopPropagation();pad.setPointerCapture(e.pointerId);active=[point(e)];paint()});
 pad.addEventListener('pointermove',e=>{if(!active)return;const p=point(e),last=active.at(-1);if(Math.hypot(p[0]-last[0],p[1]-last[1])<1.5||active.length>=2500)return;active.push(p);paint()});
 function finish(e){if(!active)return;if(e?.type==='pointercancel'){active=null;paint();return}if(e)active.push(point(e));if(active.length>1)strokes.push({points:active,closed:closed(active)});active=null;paint()}
 pad.addEventListener('pointerup',finish);pad.addEventListener('pointercancel',finish);pad.addEventListener('lostpointercapture',()=>{if(active){active=null;paint()}});
 $('community-undo').onclick=()=>{active=null;strokes.pop();paint()};$('community-clear').onclick=()=>{active=null;strokes=[];paint()};
 $('community-name').value=saved?.name||'';$('community-text').value=saved?.memory||'';paint();
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
   atlas.innerHTML='<div class="atlas-minimal-nav"><button type="button" class="atlas-close">Volver</button><h2 id="community-atlas-title">Archivo de casas y recuerdos</h2></div><div class="atlas-viewport" tabindex="0" role="region" aria-label="Lienzo infinito. Arrastrá para recorrerlo; flechas para moverte; más y menos para zoom. Espacio para pausar el movimiento."><div class="atlas-world"></div></div><p class="atlas-archive-note">Arrastrá en cualquier dirección · + / − para acercar<br>Archivo de muestra con personas ficticias y tus aportes locales. No se publica en internet.</p>';
  document.body.append(atlas);
  atlas.querySelector('.atlas-archive-note')?.remove();
  const viewport=atlas.querySelector('.atlas-viewport'),world=atlas.querySelector('.atlas-world'),cells=new Map(),pointers=new Map();
   const camera={x:0,y:0,zoom:1};let atlasFrame=0,atlasFocus=null,gestureMoved=false,pinch=null,archiveOffset=0;
  const atlasReduced=matchMedia('(prefers-reduced-motion:reduce)');
   let atlasLastTime=0,atlasIdleUntil=0,atlasMotion=0,atlasPaused=false;
  function interruptAtlas(){atlasIdleUntil=performance.now()+1800;atlasMotion=0}
  const limit=(v,a,b)=>Math.max(a,Math.min(b,v));
  function requestAtlas(){if(!atlasFrame&&atlas.open)atlasFrame=requestAnimationFrame(paintAtlas)}
  function paintAtlas(now=performance.now()){
   atlasFrame=0;if(!atlas.open)return;
   const dt=atlasLastTime?Math.min(.05,Math.max(0,(now-atlasLastTime)/1000)):0;atlasLastTime=now;
   const idle=!atlasReduced.matches&&!atlasPaused&&!document.hidden&&!modal.open&&!pointers.size&&now>atlasIdleUntil;
   atlasMotion+=(Number(idle)-atlasMotion)*(1-Math.exp(-dt*2));
   if(idle){camera.x-=dt*7*atlasMotion;camera.y+=dt*3*atlasMotion}
    const width=viewport.clientWidth,height=viewport.clientHeight,stepX=380,stepY=510;
   const col=Math.floor(-camera.x/stepX),row=Math.floor(-camera.y/stepY);
   const cols=Math.ceil(width/camera.zoom/stepX/2)+1,rows=Math.ceil(height/camera.zoom/stepY/2)+1;
    const archive=archiveEntries(),needed=new Set();
   world.style.transform=`translate(${width/2+camera.x*camera.zoom}px,${height/2+camera.y*camera.zoom}px) scale(${camera.zoom})`;
   for(let y=row-rows;y<=row+rows;y++)for(let x=col-cols;x<=col+cols;x++){
    const key=x+':'+y;needed.add(key);let button=cells.get(key);
    if(!button){
      const index=((x+y*7+archiveOffset)%archive.length+archive.length)%archive.length,entry=archive[index];
      button=document.createElement('article');button.className='atlas-house';
      button.dataset.cell=key;button.setAttribute('aria-label',entry.name||'Sin nombre');
      button.innerHTML=memoryCard(entry,index);
      if(entry===saved){button.classList.add('is-newest');button.dataset.latest='true'}
     button.style.setProperty('--atlas-depth',String(.82+((x*3+y*7)%5+5)%5*.07));
     world.append(button);cells.set(key,button);
    }
     button.style.left=(x*stepX)+'px';button.style.top=(y*stepY)+'px';
     button.style.setProperty('--atlas-turn','0deg');
   }
   for(const [key,button] of cells)if(!needed.has(key)){button.remove();cells.delete(key)}
   if(!document.hidden&&!atlasReduced.matches&&!atlasPaused)requestAtlas();
  }
  function zoomAtlas(next,x=viewport.clientWidth/2,y=viewport.clientHeight/2){
   next=limit(next,.5,1.8);const px=x-viewport.clientWidth/2,py=y-viewport.clientHeight/2;
   camera.x+=px/next-px/camera.zoom;camera.y+=py/next-py/camera.zoom;camera.zoom=next;requestAtlas();
  }
   function openAtlas(latest=false){
   if(atlas.open)return;atlasFocus=document.activeElement;
   if(menuPanel.open)menuPanel.close();document.body.classList.remove('menu-panel-open');
   atlas.classList.toggle('atlas-popup',latest);
   const closeButton=atlas.querySelector('.atlas-close');closeButton.textContent=latest?'×':'Volver';closeButton.setAttribute('aria-label',latest?'Cerrar archivo y volver a mi recuerdo':'Volver a la landing');
   document.body.classList.add('community-atlas-open');atlas.showModal();
    atlasPaused=false;atlasMotion=0;
    if(latest){archiveOffset=archiveEntries().indexOf(saved);if(archiveOffset<0)archiveOffset=archiveEntries().length-1;camera.x=camera.y=0;camera.zoom=Math.max(.25,Math.min(1,(viewport.clientWidth-36)/300,(viewport.clientHeight-150)/420))}
    cells.forEach(button=>button.remove());cells.clear();gestureMoved=false;atlasLastTime=0;atlasIdleUntil=performance.now()+1200;
   viewport.focus();paintAtlas();
  }
  atlas.querySelector('.atlas-close').onclick=()=>atlas.close();
  atlas.addEventListener('close',()=>{if(atlas.open)return;document.body.classList.remove('community-atlas-open');cancelAnimationFrame(atlasFrame);atlasFrame=0;pointers.clear();pinch=null;viewport.classList.remove('is-dragging');atlasFocus?.focus({preventScroll:true})});
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
 window.casaRender=function(now,dt){previousRender(now,dt)};
  window.communityPrototype={closed,drawing,valid,get strokes(){return strokes},get saved(){return saved},get active(){return active},get contributions(){return contributions.slice()},entries,showMemory,openAtlas,populate,positionDistantHouses,save(title,memory){if(!strokes.length&&!memory.trim())return false;const data={name:title,title,memory,strokes:JSON.parse(JSON.stringify(strokes)),demo:false};const duplicate=contributions.find(e=>e.title===title&&e.memory===memory&&JSON.stringify(e.strokes)===JSON.stringify(data.strokes));const next=duplicate?contributions:[...contributions,data];localStorage.setItem(KEY+'-archive',JSON.stringify(next));saved=duplicate||data;contributions=next;try{localStorage.setItem(KEY,JSON.stringify(saved))}catch{}return true}};
})();