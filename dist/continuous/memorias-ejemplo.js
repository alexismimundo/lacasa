// Temporary approved artwork, shared with the original first-house box card.
// Never rewrites visitor data or scene texts; remove this presentation to restore them.
(()=>{'use strict';
 const src='assets/Memorias/03-frente.png',selectors='.journey-memory-card';
 // The supplied front is the approved memory artwork. Repetitions are allowed;
 // randomize placement once per screen, never on animation frames.
 const screens=[
  ['salon',3.95,5.28],['barriletes',5.7,6.55],['objetos',6.55,7.6],
  ['oscuridad',8.6,10.6],['lluvia',12.6,14.8],
  ['dibujo',15.8,17.3],['recuerdo',17.9,19.3],['despedida',19.9,22.35]
 ];
 const cards=document.createElement('div');cards.id='journey-memories';document.body.append(cards);
 screens.forEach(([id,start,end])=>{
  const host=document.createElement('aside');host.className='journey-memory-card';host.id='memory-screen-'+id;
  host.setAttribute('aria-label','Memoria de La Casa');host.hidden=true;
  host.style.left=(Math.random()<.5?5+Math.random()*6:81+Math.random()*5)+'%';
  host.style.top=(22+Math.random()*25)+'%';cards.append(host);
  host.dataset.start=start;host.dataset.end=end;
 });
 const viewer=document.createElement('dialog');viewer.className='memoria-lectura';
 viewer.setAttribute('aria-label','Leer memoria');viewer.innerHTML='<button type="button" aria-label="Cerrar memoria ampliada">×</button><img alt="Tarjeta de memoria ampliada">';document.body.append(viewer);
 let activeHost=null,closingTimer=null;
 function close(){if(!viewer.open)return;viewer.classList.add('memoria-cerrando');clearTimeout(closingTimer);closingTimer=setTimeout(()=>{viewer.close();viewer.classList.remove('memoria-cerrando')},matchMedia('(prefers-reduced-motion:reduce)').matches?0:200)}
 viewer.querySelector('button').onclick=e=>{e.stopPropagation();close()};
 viewer.querySelector('button').addEventListener('pointerdown',e=>e.stopPropagation());
 document.addEventListener('keydown',e=>{if(viewer.open&&e.key==='Escape'){e.preventDefault();close()}});
 document.addEventListener('pointerdown',e=>{if(viewer.open&&!viewer.contains(e.target)&&!e.target.closest('.memoria-ejemplo,#fh-model-box'))close()});
 viewer.addEventListener('wheel',e=>e.stopPropagation(),{passive:true});
 function open(host){if(host.dataset.recien||enCaja(host.dataset.memoryId))return;activeHost=host;clearTimeout(closingTimer);viewer.classList.remove('memoria-cerrando');viewer.querySelector('img').src=host.querySelector('.memoria-ejemplo-imagen').src;if(!viewer.open)viewer.show()}
 function kept(host){host?.classList.add('memoria-guardada');close()}
 hacerGuardable(viewer,()=>activeHost?.dataset.memoryId,{alGuardar:()=>kept(activeHost)});
 let memoryIndex=0;
 function apply(){document.querySelectorAll(selectors).forEach(host=>{
  host.classList.add('memoria-ejemplo');
  if(host.querySelector(':scope > .memoria-ejemplo-imagen'))return;
  const scene=host.closest('[data-escena]')?.dataset.escena||host.id||'comunidad';
  const id='memoria-recorrido-'+scene+'-'+memoryIndex++;host.dataset.memoryId=id;
  COSAS[id]={nombre:host.querySelector('h3')?.textContent||host.getAttribute('aria-label')||'Memoria de La Casa',src,unica:true};
  if(enCaja(id))host.classList.add('memoria-guardada');
  hacerGuardable(host,id,{alGuardar:()=>kept(host)});
  const img=document.createElement('img');img.className='memoria-ejemplo-imagen';img.src=src;img.alt='Tarjeta de memoria de ejemplo: diseño original de La Casa';img.draggable=false;host.append(img);
  img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar memoria');img.setAttribute('aria-haspopup','dialog');
   host.addEventListener('click',e=>{e.stopPropagation();open(host)});
   img.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();open(host)}};
 })}
 apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
 const previous=window.casaRender;
 window.casaRender=function(now,dt){
  previous(now,dt);
  const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside');
  for(const host of cards.children){host.hidden=!inside||current<Number(host.dataset.start)||current>=Number(host.dataset.end)||enCaja(host.dataset.memoryId)}
  if(viewer.open&&activeHost?.hidden&&!viewer.classList.contains('memoria-cerrando'))close();
 };
 const record=restoAssets.load(src);record.promise.then(image=>{window.memoriaEjemploImagen=image;window.tuCasa?.update()});
})();