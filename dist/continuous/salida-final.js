// E decorates the existing window camera; it does not replace its playback/reentry.
(()=>{'use strict';
 const $=id=>document.getElementById(id),api=window.communityPrototype,windowNode=$('closing-window'),nav=document.createElement('nav');nav.id='salida-menu';nav.hidden=true;nav.inert=true;nav.setAttribute('aria-label','Menú final de La Casa');
 const links=[['others','Recorrer el barrio'],['album','El disco'],['cover','Tu portada'],['about','Sobre La casa'],['houses','Las casas que habité']];links.forEach(([id,label])=>{const b=document.createElement('button');b.type='button';b.dataset.salida=id;b.textContent=label;b.onclick=()=>openMenuSection(id);nav.append(b)});document.body.append(nav);
 $('closing-phrase').replaceChildren(document.createTextNode('Algo de esta casa'),document.createElement('br'),document.createTextNode('sale con vos.'));
 document.querySelector('[data-escena="salida"]').replaceChildren();
 const overlay=document.createElement('div');overlay.id='salida-personal';overlay.setAttribute('aria-label','Lo que te llevás de esta casa');overlay.innerHTML='<div class="salida-drawing"></div><div class="salida-sill"></div><aside class="salida-memory"><h3></h3><p></p><div class="salida-echo" aria-hidden="true"><h3></h3><p></p></div></aside>';windowNode.append(overlay);let signature='';
 function refresh(){const drawing=api.strokes,title=$('tu-title').value,memory=$('tu-memory').value,items=E.caja.filter(c=>COSAS[c.id]),key=JSON.stringify([drawing,title,memory,items.map(c=>[c.id,COSAS[c.id].src])]);if(key===signature)return;signature=key;overlay.querySelector('.salida-drawing').innerHTML=drawing.length?api.drawing(drawing):'';overlay.querySelector('.salida-drawing').hidden=!drawing.length;const sill=overlay.querySelector('.salida-sill');sill.replaceChildren();items.forEach(c=>{const img=document.createElement('img');img.src=COSAS[c.id].src;img.alt=COSAS[c.id].nombre;sill.append(img)});overlay.querySelector('.salida-memory').hidden=!title.trim()&&!memory.trim();overlay.querySelectorAll('h3').forEach(el=>el.textContent=title);overlay.querySelectorAll('p').forEach(el=>el.textContent=memory);overlay.hidden=!drawing.length&&!items.length&&!title.trim()&&!memory.trim()}
 // Match object-fit:cover of the existing 1280x720 exit media, including mobile crop.
 function geometry(){const w=innerWidth,h=innerHeight,s=Math.max(w/1280,h/720),ox=(w-1280*s)/2,oy=(h-720*s)/2;overlay.style.cssText='left:'+ox+'px;top:'+oy+'px;width:'+1280*s+'px;height:'+720*s+'px;';nav.style.setProperty('--window-bottom',Math.min(h*.72,oy+500*s)+'px')}
 window.addEventListener('resize',geometry);geometry();
 const oldMenu=openMenuSection;
 document.querySelector('#music-player .player-name').firstChild.textContent='LA CASA ';
 updateRadioUI();
 function panel(title){menuLastFocus=document.activeElement;menuPanel.classList.remove('album-panel','about-panel');menuContent.replaceChildren();const h=document.createElement('h2');h.textContent=title;menuContent.append(h);document.body.classList.add('menu-panel-open');if(!menuPanel.open)menuPanel.showModal();menuPanel.scrollTop=0;$('menu-panel-close').focus()}
 function text(content,parent=menuContent){const p=document.createElement('p');p.textContent=content;parent.append(p);return p}
 // CANCIONES remains the single album list. Optional per-title files may be added there.
 const tracks=CANCIONES.flatMap(group=>group.titulos.map(title=>({title,house:group.casa,src:'assets/sirens.mp3'})));const songTitle=t=>t.replace(/ \(intro\)$/,'');
 let selectedTrack=0;
 function album(){
  panel('La casa');menuPanel.classList.add('album-panel');
  text('ALEXIS GABRIEL · DIEZ CANCIONES · TRES DOMICILIOS').className='album-eyebrow';
  const deck=document.createElement('section');deck.className='album-deck';deck.setAttribute('aria-label','Reproductor del álbum');
  deck.innerHTML='<div class="album-cover"><img src="assets/Booklet-01%20(tapa).jpg" alt="Portada del álbum La casa" decoding="async"></div><div class="album-now"><small>AHORA SUENA</small><h3></h3><p></p><div class="album-controls"><button type="button" data-album="previous" aria-label="Canción anterior">‹</button><button type="button" data-album="play" aria-label="Reproducir">▶</button><button type="button" data-album="next" aria-label="Canción siguiente">›</button><button type="button" data-album="mute" aria-label="Silenciar">SONIDO</button></div><label class="album-progress">Posición de la canción<input type="range" min="0" max="1000" value="0" aria-label="Posición de la canción del álbum"></label><div class="album-times"><span>0:00</span><span>0:00</span></div><p class="album-feedback" role="status"></p></div>';
  menuContent.append(deck);
  const list=document.createElement('ol');list.className='salida-tracks';
  tracks.forEach((track,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.type='button';b.dataset.track=i;const num=document.createElement('span'),name=document.createElement('span'),state=document.createElement('small');num.textContent=String(i+1).padStart(2,'0');name.textContent=songTitle(track.title);state.textContent='▶';b.append(num,name,state);b.onclick=()=>{if(selectedTrack===i)toggle();else select(i)};li.append(b);list.append(li)});menuContent.append(list);
  text('Audio provisional: todas las canciones reproducen el audio del interior hasta incorporar las pistas finales.').className='album-note';
  const order=document.createElement('button');order.type='button';order.className='menu-song';order.textContent='Pedir la edición física';order.onclick=()=>$('tu-order-dialog').showModal();menuContent.append(order);
  const play=deck.querySelector('[data-album="play"]'),mute=deck.querySelector('[data-album="mute"]'),seek=deck.querySelector('input'),feedback=deck.querySelector('.album-feedback');
  function sync(){
   if(!deck.isConnected)return;
   const playing=sounding&&!music.paused,track=tracks[selectedTrack],duration=music.duration;
   deck.querySelector('h3').textContent=songTitle(track.title);deck.querySelector('.album-now>p').textContent=track.house;
   deck.classList.toggle('is-playing',playing);play.textContent=playing?'Ⅱ':'▶';play.setAttribute('aria-label',(playing?'Pausar ':'Reproducir ')+songTitle(track.title));play.setAttribute('aria-pressed',String(playing));
   mute.textContent=music.muted?'MUDO':'SONIDO';mute.setAttribute('aria-pressed',String(music.muted));mute.setAttribute('aria-label',music.muted?'Activar sonido':'Silenciar');
   seek.disabled=!Number.isFinite(duration)||duration<=0;seek.value=seek.disabled?'0':String(Math.round(music.currentTime/duration*1000));
   const times=deck.querySelectorAll('.album-times span');times[0].textContent=playerTime(music.currentTime);times[1].textContent=playerTime(duration);
   list.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-current',String(i===selectedTrack));b.querySelector('small').textContent=i===selectedTrack&&playing?'Ⅱ':'▶'});
  }
  function resume(){feedback.textContent='';musicChosen=true;entryMusicComplete=true;music.volume=.55;fadeId++;sounding=true;musicLabel();music.play().catch(()=>{sounding=false;musicLabel();feedback.textContent='No se pudo reproducir. Volvé a pulsar reproducir.';sync()});sync()}
  function toggle(){if(sounding&&!music.paused){music.pause();sounding=false;musicLabel();sync()}else resume()}
  function select(i){selectedTrack=(i+tracks.length)%tracks.length;music.currentTime=0;resume()}
  play.onclick=toggle;mute.onclick=()=>{music.muted=!music.muted;updateRadioUI();sync()};deck.querySelector('[data-album="previous"]').onclick=()=>select(selectedTrack-1);deck.querySelector('[data-album="next"]').onclick=()=>select(selectedTrack+1);
  seek.oninput=()=>{if(Number.isFinite(music.duration)&&music.duration>0)music.currentTime=music.duration*Number(seek.value)/1000;sync()};
  const events=['timeupdate','loadedmetadata','durationchange','playing','pause','volumechange'];events.forEach(event=>music.addEventListener(event,sync));
  menuPanel.addEventListener('close',()=>events.forEach(event=>music.removeEventListener(event,sync)),{once:true});sync();
 }
 openMenuSection=function(section){
  if(!document.body.classList.contains('closing-outside'))return oldMenu(section);
  if(section==='others'){menuPanel.classList.remove('album-panel','about-panel');return oldMenu('others')}
  if(section==='cover'){panel('Tu portada');if(api.strokes.length){text('La portada conserva tu dibujo y tu memoria de esta visita.');const b=document.createElement('button');b.type='button';b.className='menu-song';b.textContent='Descargar portada · PNG 2000×2000';b.onclick=()=>tuCasa.download('cover').catch(()=>text('No se pudo descargar. Volvé a intentar.'));menuContent.append(b)}else{text('Todavía no dibujaste tu casa. Podés volver a Tu casa para armar tu portada.');const b=document.createElement('button');b.type='button';b.className='menu-song';b.textContent='Volver a Tu casa';b.onclick=()=>{closeMenuSection();closingFilm.pause();closingFinished=false;closingPlaying=false;closingVideoReady=false;document.body.classList.remove('closing-outside','exit-identity-visible');target=current=16.1;storeTravel();renderClosingScene();casaRender(performance.now(),.016)};menuContent.append(b)}return}
  if(section==='about'||section==='artist'){
   panel('Sobre La casa');menuPanel.classList.add('about-panel');
   text('La casa es un álbum sobre las casas que habité. Son diez canciones y tres domicilios que marcaron mi vida, desde la infancia hasta hoy. Ninguno lo cuenta todo, y en todos falta algo.');
   text('Esta web es otra forma de entrar al disco. No explica las canciones: las rodea de objetos, imágenes, fragmentos y silencios, para recorrerlas como se recorre una casa. Se puede ir directo a escuchar o perderse un rato adentro.');
   text('No me acuerdo de todo. Lo que recuerdo está hecho de versiones, de cosas que guardé y de cosas que se perdieron. Por eso la casa queda abierta: quien pasa puede dejar algo, dibujar la suya y sumarla al barrio.');
   const credits=document.createElement('footer');credits.className='about-credits';text('Producción musical: Tablón Estudio.',credits);text('Alexis Gabriel.',credits);menuContent.append(credits);return;
  }
  if(section==='houses'||section.startsWith('house-')){panel('Las casas que habité');['Casa I','Casa II','Casa III'].forEach((label,i)=>{const group=document.createElement('section'),h=document.createElement('h3');h.textContent=label;group.append(h);text('[dirección: a confirmar]',group);text(CANCIONES[i+1].titulos.join(' · '),group);menuContent.append(group)});return}
  if(section==='album'){album();return}
  return oldMenu(section);
 };
 menuPanel.addEventListener('close',()=>menuPanel.classList.remove('album-panel','about-panel'));
 // Re-enable the existing window hit area, using the unchanged reentry function.
 $('closing-window-enter').onclick=()=>{restartFromWindow();reentryTarget=1};$('closing-again').onclick=()=>{restartFromWindow();reentryTarget=1};
 const previous=window.casaRender;window.casaRender=function(now,dt){previous(now,dt);const visible=document.body.classList.contains('closing-outside')&&!document.body.classList.contains('reentering');nav.hidden=!visible;nav.inert=!visible;document.body.classList.toggle('salida-final-outside',visible);overlay.hidden=true;if(document.body.classList.contains('inhabited')&&(current>=21.8||document.body.classList.contains('reentering'))){refresh();overlay.hidden=!api.strokes.length&&!E.caja.length&&!$('tu-title').value.trim()&&!$('tu-memory').value.trim()}};
 // The original engine updates closing-outside after casaRender; synchronize on that edge too.
 function syncExteriorMenu(){const visible=document.body.classList.contains('closing-outside')&&!document.body.classList.contains('reentering');nav.hidden=true;nav.inert=true;const original=$('threshold-menu');original.inert=!visible;if(visible){original.classList.add('menu-awake');measureMenuRows()}if(document.body.classList.contains('salida-final-outside')!==visible)document.body.classList.toggle('salida-final-outside',visible)}
 new MutationObserver(syncExteriorMenu).observe(document.body,{attributes:true,attributeFilter:['class']});syncExteriorMenu();
 window.salidaFinal=Object.freeze({refresh,geometry,tracks});
})();