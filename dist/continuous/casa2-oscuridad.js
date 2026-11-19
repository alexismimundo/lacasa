// Moments A/B only. Scroll selects the scene; pointer movement uncovers the video.
(()=>{'use strict';
 const scenes=escenasResto.escenas,configA=scenes.find(s=>s.id==='oscuridad'),configB=scenes.find(s=>s.id==='madrugada');
 const a=document.querySelector('[data-escena="oscuridad"]'),b=document.querySelector('[data-escena="madrugada"]');
 const clamp=v=>Math.max(0,Math.min(1,v)),progress=(p,s)=>clamp((p-s.inicio)/(s.fin-s.inicio));
 const svg=content=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+content+'</svg>';
 const memory=(text,n)=>{const lines=text.split(' / '),body=lines.map((s,i)=>'<span>'+s+(i<lines.length-1?' /':'')+'</span>').join('');return '<aside class="c2-memory" aria-label="Memoria '+n+'"><small>MEMORIA Nº '+n+'</small><h3>'+(n==='01'?'Las moras':'[título pendiente]')+'</h3><div class="c2-memory-text">'+body+'<div class="c2-memory-echo" aria-hidden="true">'+body+'</div></div></aside>'};
 const labels=s=>'<div class="c2-assets">'+s.assets.map(src=>'<div data-asset-label="'+src+'">[asset pendiente: '+src.replace('assets/','')+']</div>').join('')+'</div>';
 const corridor=svg('<g fill="none" stroke="#8495b1" stroke-width="3"><path d="M0 0L600 280H1050L1600 0M600 280V700L0 1000M1050 280V700L1600 1000M600 700H1050M0 500L600 510M1600 500L1050 510M100 1000L670 700M1460 1000L990 700"/><path d="M690 360H960V700H690Z"/></g><path d="M130 0Q230 150 100 410M250 0Q340 170 200 370" fill="none" stroke="#335386" stroke-width="14"/><g fill="#B9A3DE">'+Array.from({length:30},(_,i)=>'<ellipse cx="'+(100+(i%6)*36)+'" cy="'+(70+Math.floor(i/6)*45)+'" rx="16" ry="25"/>').join('')+'</g><g fill="#2e4f63" stroke="#657c92" stroke-width="2"><path d="M1190 850L1210 260L1235 850Z"/><path d="M1215 300Q1020 190 1100 460Q1260 510 1215 300M1220 400Q1440 210 1480 430Q1400 570 1220 400M1200 520Q1000 400 1020 630Q1140 690 1200 520"/></g><g fill="#9B83B2">'+Array.from({length:14},(_,i)=>'<circle cx="'+(1120+i*21)+'" cy="'+(420+Math.sin(i)*50)+'" r="7"/>').join('')+'</g>');
 a.replaceChildren();b.replaceChildren();
 a.innerHTML='<div class="c2-scene"><div class="c2-landscape">'+corridor+'</div><canvas class="c2-mask" aria-label="Raspá la oscuridad con el mouse o el dedo para abrir un hueco"></canvas><p class="c2-phrase">Que la luz no entre / voy tapando agujeros</p><p class="c2-scratch-hint">[raspá con el mouse o arrastrá el dedo]</p>'+memory(configA.memoria,'01')+'<button type="button" class="c2-flower" aria-label="Una flor de glicina. Arrastrá a la caja o presioná G"><img src="assets/casa2/glicina-flor-provisoria.svg" alt="Flor de glicina provisoria"><span>Arrastrá a la caja</span></button>'+labels(configA)+'</div>';
 const horizon=svg('<path d="M0 660Q200 510 390 630T800 580T1200 610T1600 540V1000H0Z" fill="#335386" opacity=".65"/><g stroke="#335386" stroke-width="6" fill="none"><path d="M220 700V370M220 410L150 350M220 480L310 380M1170 700V290M1170 380L1080 320M1170 440L1280 330"/></g>');
 const grass=svg('<path d="M0 790Q300 750 600 810T1200 780T1600 800V1000H0Z" fill="#4a6774"/><g stroke="#233f53" stroke-width="3">'+Array.from({length:70},(_,i)=>'<path d="M'+(i*25)+' 950l-15 -'+(35+i%5*12)+'m15 '+(35+i%5*12)+'l18 -45"/>').join('')+'</g>');
 const remains=svg('<g fill="#272d34" stroke="#9B83B2" stroke-width="3"><path d="M890 860V590L970 520L1080 610V850M900 620L1080 610M920 700H1010V840H920Z" fill="none"/><path d="M1120 850L1100 760Q1110 725 1150 760L1160 700Q1200 675 1240 710L1250 760Q1290 730 1300 780L1280 850Z"/><path d="M720 900l60 -65 35 70M1350 915l70 -50 40 55"/></g>');
 b.innerHTML='<div class="c2-scene c2-night-blue"><h2 class="c2-route-address" aria-label="Terrero 3231"></h2></div>';
 const address=b.querySelector('.c2-route-address');
 for(const word of ['Terrero','3231']){const group=document.createElement('span');group.className='ink-word';for(const char of word){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}address.append(group,document.createTextNode(' '))}
 a.querySelector('.c2-flower').remove();
  // The apertures uncover the original running-child footage, not the test corridor.
  const landscape=a.querySelector('.c2-landscape');
  landscape.replaceChildren();
  const runningFilm=document.createElement('video');
  runningFilm.className='c2-running-film';runningFilm.src='assets/videos/nino-corriendo.mp4';
  runningFilm.poster='assets/videos/nino-corriendo-poster.jpg';runningFilm.muted=true;
  runningFilm.loop=true;runningFilm.playsInline=true;runningFilm.preload='auto';
  runningFilm.setAttribute('aria-hidden','true');landscape.append(runningFilm);
  const lyrics=document.createElement('div');lyrics.className='c2-running-lyrics';
  const verses=[['Ay, devuelveme el tiempo,','cuentame los cuentos.','Salvame de mi.'],['Vi en otro una fortuna','y yo que ni tengo cuna,','de fé estoy ahí.']];
  verses.forEach((lines,verse)=>{const stanza=document.createElement('p');lines.forEach((text,i)=>{const line=document.createElement('span'),n=verse*3+i;line.textContent=text;line.style.setProperty('--lyric-x',(n%2?-1:1)*(7+n%3*3)+'px');line.style.setProperty('--lyric-y',(n%3?-1:1)*(2+n%2)+'px');line.style.setProperty('--lyric-duration',(17+n*3)+'s');line.style.setProperty('--lyric-delay',(-n*2.3)+'s');stanza.append(line)});lyrics.append(stanza)});
  landscape.append(lyrics);
 const frames=Array.from({length:8},(_,i)=>restoAssets.load('assets/casa2/nino-corre-'+String(i+1).padStart(2,'0')+'.png'));
 const holes=Array.from({length:8},(_,i)=>restoAssets.load('assets/casa2/hueco-'+String(i+1).padStart(2,'0')+'.png')),coverImage=restoAssets.load('assets/casa2/tapa-carton.webp');
 const canvas=a.querySelector('canvas'),ctx=canvas.getContext('2d'),red=matchMedia('(prefers-reduced-motion:reduce)');
 let viewW=0,viewH=0,aim={x:0,y:0},lastPoint=null,phraseTime=0,phraseStarted=false,scrollCount=0,scrollDistance=0,dissolve=0,scrollBack=false;
 const scrollLimit=window.firstHouseScrollLimit;
 window.firstHouseScrollLimit=(next,step)=>{
  next=scrollLimit?scrollLimit(next,step):next;
  if(step<0){scrollBack=true;scrollDistance=0;return next}
  if(step>0)scrollBack=false;
  if(document.body.classList.contains('inhabited')&&current<10.6){
   if(step>0&&!phraseStarted&&current<8.02&&next>=8.02)return 8.2;
   if(phraseStarted&&scrollCount<5){
    if(step>0){scrollDistance+=step*Math.max(500,innerHeight);if(scrollDistance>=120){scrollCount++;scrollDistance=0}}
    else if(step<0){scrollDistance=0;return next}
    return 8.2;
   }
   if(phraseStarted&&dissolve<1)return 8.6;
  }
  return next;
 };
 const trail=document.createElement('canvas'),trailCtx=trail.getContext('2d');
 a.querySelector('.c2-scratch-hint').remove();canvas.setAttribute('aria-label','La linterna revela el video');
 b.addEventListener('pointermove',e=>{if(!red.matches)aim={x:(e.clientX/innerWidth-.5)*18,y:(e.clientY/innerHeight-.5)*7}});
 // Continue inside the actual flashlight screen, using its exact processed stamp.
 const flashlight=document.getElementById('fh-next-house'),aContent=a.querySelector('.c2-scene');flashlight.append(aContent);aContent.hidden=true;
  const scrollHint=document.createElement('p');scrollHint.className='fh-continue c2-scroll-hint';scrollHint.textContent='Seguí escroleando';scrollHint.hidden=true;flashlight.append(scrollHint);
 function reveal(e){
  if(dissolve<1||current<8.6||current>=10.6||!document.body.classList.contains('inhabited'))return;
  const light=window.casaLinterna;if(!light?.ready)return;
  const point={x:e.clientX/innerWidth,y:e.clientY/innerHeight},radius=Math.min(innerWidth,innerHeight)*.19,height=radius*2*light.stamp.height/light.stamp.width;
  const start=lastPoint||point,steps=Math.max(1,Math.ceil(Math.hypot((point.x-start.x)*innerWidth,(point.y-start.y)*innerHeight)/(radius*.3)));
  trailCtx.globalCompositeOperation='source-over';
  for(let i=1;i<=steps;i++){const t=i/steps;trailCtx.drawImage(light.stamp,(start.x+(point.x-start.x)*t)*innerWidth-radius,(start.y+(point.y-start.y)*t)*innerHeight-height/2,radius*2,height)}
  lastPoint=point;
 }
 flashlight.addEventListener('pointermove',reveal);flashlight.addEventListener('pointerdown',reveal);flashlight.addEventListener('pointerleave',()=>{lastPoint=null});
 function hole(x,y,r,seed){const light=window.casaLinterna;if(light?.ready){const height=r*2*light.stamp.height/light.stamp.width;ctx.drawImage(light.stamp,x-r,y-height/2,r*2,height);return}ctx.beginPath();for(let j=0;j<18;j++){const angle=j/18*Math.PI*2,rr=r*(.83+Math.sin(j*7.3+seed)*.17);const px=x+Math.cos(angle)*rr,py=y+Math.sin(angle)*rr*.72;j?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.fill()}
 function mask(now,q){const w=Math.round(innerWidth),h=Math.round(innerHeight);if(viewW!==w||viewH!==h){canvas.width=trail.width=viewW=w;canvas.height=trail.height=viewH=h}
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);
  const point=window.casaLinterna?.point||{x:.5,y:.5};
  // Fixed-size beam: no automatic growth or forced full-screen clearing.
  ctx.globalCompositeOperation='destination-out';
  const radius=Math.min(w,h)*.19;
  hole(point.x*w,point.y*h,radius,0);
  ctx.drawImage(trail,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  canvas.dataset.progress=q.toFixed(4);
 }
 let filmWanted=false;
 function syncRunningFilm(wanted){
  if(wanted===filmWanted)return;filmWanted=wanted;
  if(wanted)runningFilm.play().catch(()=>{filmWanted=false});else runningFilm.pause();
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)syncRunningFilm(false)});
 const old=window.casaRender;
 window.casaRender=function(now,dt){
  const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering');
  if(!inside||current<8.02){phraseTime=0;phraseStarted=false;scrollCount=0;scrollDistance=0;dissolve=0}
   if(inside&&current>=8.02&&current<10.6&&!window.casaReview?.active){
   phraseStarted=true;if(!document.hidden)phraseTime+=Math.min(.05,Math.max(0,dt));
   if(scrollBack){if(current<8.6){scrollCount=0;scrollDistance=0;dissolve=0}}
   else if(scrollCount<5){if(target>=8.02)target=current=8.2}
   else {if(!document.hidden)dissolve=clamp(dissolve+Math.min(.05,Math.max(0,dt))/.8);if(dissolve<1||current<8.6)target=current=8.6}
  }
  const ignition=clamp(phraseTime/1.6);window.casaLinterna.ignition=ignition*ignition*(3-2*ignition);
  if(!inside||current<8.6){trailCtx.clearRect(0,0,trail.width,trail.height);lastPoint=null}
  // Scroll alone chooses the scene; exploring the video is entirely optional.
  old(now,dt);const p=current,q=progress(p,configA);
  aContent.hidden=!inside||p<8.6||p>=10.6;flashlight.style.transform=p>=8.6&&p<10.6?a.style.transform:'none';aContent.style.setProperty('--aperture-phrase',String(clamp((p-9.05)/.3)));
  syncRunningFilm(inside&&p>=8.6&&p<10.6&&!document.hidden&&!red.matches);
  const phrase=document.querySelector('#fh-light-phrase');
  const dissolving=inside&&p>=8.6&&p<10.6&&dissolve<1;
  if(dissolving&&phrase.parentElement!==aContent)aContent.insertBefore(phrase,canvas);
  if(!dissolving&&phrase.parentElement===aContent)flashlight.insertBefore(phrase,flashlight.querySelector('.fh-next-dark'));
  phrase.style.visibility=inside&&p>=8.02&&p<10.6&&dissolve<1?'visible':'hidden';phrase.style.opacity=String(1-dissolve);
  scrollHint.hidden=!inside||p<8.02||p>=10.6;flashlight.dataset.scrollCount=String(scrollCount);
  flashlight.dataset.phraseTime=phraseTime.toFixed(3);
  if(!inside||p<8.6||p>=12.6)return;
  if(!a.hidden){aContent.style.backgroundColor='#000';mask(now,q);landscape.style.opacity=String(dissolve)}
   if(!b.hidden){b.style.backgroundColor='#B9A3DE';const t=clamp((p-11.35)/1.25),opacity=Math.sin(Math.PI*t);address.style.opacity=String(opacity);address.style.visibility=opacity>.001?'visible':'hidden';address.style.transform='translate(-50%,calc(-50% + '+(5-t*10).toFixed(3)+'vh))';b.dataset.progress=progress(p,configB).toFixed(4)}
 };
})();