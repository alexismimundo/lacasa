// Full-scale domestic foreground, followed by the same continuous paper passage.
(()=>{
 const root=document.createElement('section');root.id='remembered-rooms';root.setAttribute('aria-label','La mesa, la alacena y la televisión');root.inert=true;
 const asset=n=>'assets/kitchen/'+n+'.webp';
 root.innerHTML=`<div class="kitchen-scene"><div class="kitchen-stage">
 <div class="kitchen-cupboard"><img class="cupboard-base" src="${asset('alacena-1')}" alt="Alacena de madera gastada">
 <div class="cupboard-interior" aria-hidden="true"><img src="${asset('alacena-interior')}" alt=""></div><div class="kitchen-food">${[0,1,2].map((n)=>`<button type="button" class="kitchen-burger burger-${n}" aria-label="Hamburguesa ${n+1}" aria-pressed="false" inert><img src="${asset('hamburguesa-1')}" alt="Hamburguesa envuelta"><img class="burger-color" src="${asset('hamburguesa-3')}" alt=""></button>`).join('')}</div>
 <button type="button" class="kitchen-door door-left" aria-label="Abrir puerta izquierda de la alacena" aria-expanded="false"><img src="${asset('alacena-2')}" alt=""></button>
 <button type="button" class="kitchen-door door-right" aria-label="Abrir puerta derecha de la alacena" aria-expanded="false"><img src="${asset('alacena-3')}" alt=""></button>
 </div>
 <img class="kitchen-table" src="${asset('mesa')}" alt="Mesa de madera en primer plano">
 <div class="kitchen-tv" data-channel="0"><div class="tv-program" aria-hidden="true"><video class="tv-video" muted playsinline loop preload="none"></video><span class="tv-channel">01</span></div><img class="tv-cutout" src="${asset('tele-2')}" alt="Televisor antiguo sobre un mueble"><img class="tv-off" src="${asset('tele-1')}" alt=""><button type="button" class="tv-switch" aria-label="Encender el televisor" aria-describedby="tv-tooltip"><span id="tv-tooltip" class="tv-tooltip" role="tooltip">Clic para encender</span></button></div>
 </div><span class="kitchen-status sr-only" role="status" aria-live="polite"></span></div>
 <div class="kitchen-paper-cover" aria-hidden="true"></div><div class="kitchen-passage"><img class="passage-line left" src="assets/rooms/10.webp" alt=""><img class="passage-line right" src="assets/rooms/12.webp" alt=""><p>De una habitación<br>a otra.</p><img class="passage-wire" src="assets/rooms/65.webp" alt=""></div>`;
 $('inside').append(root);
 const stage=root.querySelector('.kitchen-stage'),scene=root.querySelector('.kitchen-scene'),passage=root.querySelector('.kitchen-passage'),tv=root.querySelector('.kitchen-tv'),switcher=root.querySelector('.tv-switch'),status=root.querySelector('.kitchen-status');
 const doors=[...root.querySelectorAll('.kitchen-door')],burgers=[...root.querySelectorAll('.kitchen-burger')];let channel=0,wasBeginning=false;
 const video=root.querySelector('.tv-video'),tooltip=root.querySelector('.tv-tooltip');
 let playbackVisible=false,playRequest=0;
 const programs=[null,...Array.from({length:5},(_,i)=>'assets/tv/program-'+([3,5].includes(i+1)?'revised-':'edited-')+(i+1)+'.mp4')];
 function hint(){const action=channel===0?'encender':channel===5?'apagar':'cambiar de programa';tooltip.textContent='Clic para '+action;switcher.setAttribute('aria-label',channel?'Programa '+channel+'. Clic para '+action:'Encender el televisor')}
 function play(){const request=++playRequest;video.play().catch(()=>{if(request===playRequest&&channel){status.textContent='No se pudo reproducir este programa. Hacé clic para pasar al siguiente.'}})}
 function selectChannel(next){
  ++playRequest;video.pause();channel=next;tv.dataset.channel=String(channel);tv.classList.remove('video-ready');hint();
  if(!channel){video.removeAttribute('src');video.load();status.textContent='Televisor apagado.';return}
  video.src=programs[channel];window.firstHousePreload?.(programs[channel%5+1]);video.load();root.querySelector('.tv-channel').textContent=String(channel).padStart(2,'0');status.textContent='Programa '+channel+' de 5.';
  if(playbackVisible&&!document.hidden)play();
  tv.classList.remove('channel-flash');void tv.offsetWidth;tv.classList.add('channel-flash');
 }
 video.addEventListener('playing',()=>{if(channel)tv.classList.add('video-ready')});
 video.addEventListener('error',()=>{if(channel)status.textContent='Este programa no está disponible. Hacé clic para pasar al siguiente.'});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){++playRequest;video.pause()}else if(playbackVisible&&channel)play()});
  burgers.forEach(b=>{b.replaceWith(Object.assign(document.createElement('div'),{className:b.className,innerHTML:b.querySelector('img').outerHTML}))});
  burgers.splice(0,burgers.length,...root.querySelectorAll('.kitchen-burger'));
  // Food stays on the shelf; the rotating door itself occludes it as it closes.
  function foodAccess(){burgers.forEach(b=>{b.inert=true;b.style.visibility='visible'})}
 doors.forEach((door,i)=>door.onclick=()=>{const open=door.getAttribute('aria-expanded')!=='true';door.setAttribute('aria-expanded',String(open));door.setAttribute('aria-label',(open?'Cerrar':'Abrir')+' puerta '+(i?'derecha':'izquierda')+' de la alacena');foodAccess()});
 switcher.onclick=()=>selectChannel((channel+1)%programs.length);
 function reset(){selectChannel(0);doors.forEach((d,i)=>{d.setAttribute('aria-expanded','false');d.setAttribute('aria-label','Abrir puerta '+(i?'derecha':'izquierda')+' de la alacena')});burgers.forEach(b=>b.setAttribute('aria-pressed','false'));status.textContent='';foodAccess()}
 let entranceOffset=innerHeight;
 function resize(){const mobile=innerWidth<650,w=mobile?760:1600,h=mobile?1300:1000;const scale=Math.max(innerWidth/w,innerHeight/h);stage.style.width=w+'px';stage.style.height=h+'px';stage.style.transform='translate(-50%,-50%) scale('+scale+')';root.classList.toggle('kitchen-mobile',mobile);const origin=scene.getBoundingClientRect().top;const top=Math.min(0,...[...stage.querySelectorAll('img,button')].map(el=>el.getBoundingClientRect().top-origin));entranceOffset=innerHeight-top+4}
 resize();window.addEventListener('resize',resize);reset();
 window.readKitchen=()=>({channel,doors:doors.map(d=>d.getAttribute('aria-expanded')==='true')});
 window.restoreKitchen=data=>{selectChannel(Number(data.channel)||0);doors.forEach((d,i)=>d.setAttribute('aria-expanded',String(!!data.doors?.[i])));foodAccess()};
  // Temporary film stop: reuse the film seen after crossing the window.
  const filmRoom=document.createElement('section');filmRoom.id='kitchen-teaser-room';filmRoom.setAttribute('aria-label','La casa — vídeo provisional');
  filmRoom.innerHTML='<video muted playsinline loop preload="metadata" aria-label="El vídeo del interior de la casa"></video>';
  root.append(filmRoom);
  const teaserVideo=filmRoom.querySelector('video');teaserVideo.muted=true;
  teaserVideo.src='assets/videos/Video-3.mp4';
  teaserVideo.poster='assets/videos/Video-3-poster.jpg';
   let teaserPlaying=false,teaserPending=false,teaserRetryAt=0;
  function syncTeaserPlayback(wanted){
   teaserPlaying=wanted;
    if(!wanted){if(!teaserVideo.paused)teaserVideo.pause();return}
    if(!teaserVideo.paused||teaserPending||performance.now()<teaserRetryAt)return;
    teaserPending=true;
    teaserVideo.play().then(()=>{if(!teaserPlaying)teaserVideo.pause()}).catch(()=>{teaserRetryAt=performance.now()+1000}).finally(()=>{teaserPending=false});
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)syncTeaserPlayback(false)});
  const previous=window.casaRender;
 window.casaRender=function(now,dt){
  previous(now,dt);
  const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering');
   // La cocina sale hacia la izquierda al recorrer el ambiente contiguo a su derecha.
   // Ambas superficies permanecen opacas y comparten el mismo borde.
   const shown=inside&&current>=.54&&current<3;
  root.style.opacity=shown?'1':'0';root.style.visibility=shown?'visible':'hidden';
  // A gradual entrance and departure; no wheel locks or mandatory interactions.
  // The paper covers the background first (paperReveal, from .52); the furniture
  // only starts sliding up and revealing afterwards, once the paper is most of the way up.
  const furnitureReveal=lowEase(1,1.6,current);
  const y=(1-furnitureReveal)*entranceOffset;
  // Clip only against the paper edge, never against the furniture's own entrance.
  root.style.zIndex='12';root.style.clipPath=current<1.2?'inset('+Math.max(0,100-paperReveal(current)*100)+'% 0 0 0)':'none';
    const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
    // One uninterrupted two-screen strip: no centered hold or easing restart.
    const travel=Math.max(0,Math.min(2,(current-1.6)/.25));
    const kitchen={progress:Math.min(1,travel),outgoing:houseRoute.vector(-travel,1.6,reduced)};
    const cover=kitchen.progress,salon={outgoing:houseRoute.vector(-Math.max(0,Math.min(1,(current-2.1)/.9)),2.4,reduced)};
    const paperPosition=houseRoute.vector(1-travel,1.6,reduced),filmArrival=houseRoute.vector(Math.max(0,2-travel),1.6,reduced);
    const filmPosition={x:filmArrival.x+salon.outgoing.x,y:filmArrival.y+salon.outgoing.y};
    const teaserVisible=shown&&current>1.85&&current<3;
    filmRoom.style.visibility=teaserVisible?'visible':'hidden';
    filmRoom.style.transform=houseRoute.transform(filmPosition);
    filmRoom.inert=!teaserVisible;
    syncTeaserPlayback(teaserVisible&&!document.hidden&&!document.querySelector('#coming-soon-gate'));
   const paper=root.querySelector('.kitchen-paper-cover');paper.style.clipPath='none';
    paper.style.transform=houseRoute.transform(paperPosition);
  root.inert=!shown||cover>=.999;
    scene.style.transform=houseRoute.transform({x:kitchen.outgoing.x,y:y/innerHeight+kitchen.outgoing.y});scene.inert=root.inert||current>=2;
  const visible=inside&&shown&&cover<.5;
  if(visible!==playbackVisible){playbackVisible=visible;if(!visible){++playRequest;video.pause()}else if(channel&&!document.hidden)play()}
  passage.style.display='none';passage.style.transform='translate3d(0,'+((3-current)*innerHeight).toFixed(2)+'px,0)';
  document.body.classList.toggle('first-room-active',inside&&current>.65&&current<3.6);
  window.resetKitchen=reset;
 };
})();
