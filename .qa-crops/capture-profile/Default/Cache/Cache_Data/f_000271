/* Primera casa — narrativa continua. Assets and optional cumbia are replaceable here. */
(()=>{'use strict';
const A={robot:'assets/low-robot.webp',money:'assets/first-house/money.webp',bag:'assets/first-house/bag.webp',bagClosed:'assets/first-house/bag-closed.webp',legs:'assets/first-house/legs.webp',children:'assets/first-house/children.webp',sleep:'assets/first-house/sleep.webp',kite:'assets/first-house/kite.webp',soldiers:'assets/first-house/soldiers.webp',paper:'assets/fondo-papel.webp',cumbia:null};
const key='la-casa-first-house-v2',blank=()=>({kept:[],bag:false,money:false,robot:false,box:false,shared:false,filters:[{x:33,y:28},{x:60,y:32}],flight:{phase:'ready',time:0,y:48,vy:0},burn:0,soldiers:false});
let st=blank();try{const v=JSON.parse(sessionStorage.getItem(key));if(v)st={...st,...v,flight:{...st.flight,...v.flight}}}catch{}
const save=()=>{try{sessionStorage.setItem(key,JSON.stringify(st))}catch{}},Q=(s,r=document)=>r.querySelector(s),clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)},reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const root=document.createElement('section');root.id='first-house';root.inert=true;root.setAttribute('aria-label','La primera casa');
const im=(src,cls='',alt='')=>`<img class="${cls}" data-src="${src}" alt="${alt}" decoding="async">`;
const skyDesigns=['azul','negro','azul-rombo','azul','azul-rombo','negro','azul-rombo'];
root.innerHTML=`<div class="fh-party fh-layer"><div class="fh-salon"><div class="fh-salon-bg"></div><div class="fh-salon-kid pose-a"></div><div class="fh-salon-kid pose-b"></div><div class="fh-sp sp-12"></div><div class="fh-sp sp-11"></div><div class="fh-sp sp-10"></div><div class="fh-sp sp-9"></div><div class="fh-sp sp-8"></div><div class="fh-sp sp-7"></div><div class="fh-sp sp-6"></div><div class="fh-sp sp-5"></div><div class="fh-sp sp-4"></div><div class="fh-sp sp-3"></div><div class="fh-sp sp-2"></div><div class="fh-sp sp-1"></div><div class="fh-salon-tint"></div></div></div>
<div class="fh-shutter fh-layer"><div class="fh-metal-wall"></div><div class="fh-metal-roll"><p class="fh-shutter-graffiti">Hay que ponerse<br>una remera<br>blanca</p></div></div>
<div class="fh-sky fh-layer"><svg class="fh-kite-strings" aria-hidden="true">${[...skyDesigns,'usuario'].map((_,i)=>`<path class="kite-string-${i}" pathLength="1"/>`).join('')}</svg>${skyDesigns.map((color,i)=>`<div class="fh-distant distant-${i}" aria-hidden="true">${im('assets/barrilete/volador-'+color+'.png')}${im('assets/barrilete/cola-'+['azul','rosa','negro'][i%3]+'.png','fh-kite-tail')}</div>`).join('')}<div class="fh-kite-entry"><button class="fh-kite" aria-label="Hacé clic para mantenerlo en el aire">${im('assets/barrilete/volador-usuario.png')}${im('assets/barrilete/cola-rosa.png','fh-kite-tail')}</button></div></div>
<div class="fh-macro fh-layer"><div class="fh-macro-content">${im(A.kite,'fh-fallen-kite')}${im(A.robot,'fh-macro-robot')}${im(A.money,'fh-macro-money')}</div><div class="fh-burn-edge"></div><div class="fh-ash"></div></div>
<div class="fh-end fh-layer"><button class="fh-soldiers" aria-label="Llevar conmigo">${im(A.soldiers,'','Soldaditos verdes de plástico')}</button><p class="fh-end-note"></p><span class="fh-continue">Seguí bajando ↓</span></div><div class="fh-notice" role="status" aria-live="polite"></div>`;
$('inside').append(root);
// Sky and ground belong to one world; the player remains the same DOM node.
const ground=Q('.fh-macro',root);
Q('.fh-sky',root).append(ground);
// Fixed collage positions keep the heap stable across visits and viewport changes.
const fireNames=['Caja de recuerdos','Paños','Bufanda','Casita','Sonajero','Robot','Bolso','Ropa','Bolsa','Tren de juguete','Zapatillas','Jardinero','Cuaderno','Álbum','Fotografías','Televisor','Mueble','Papel','Almohadón','Libro','Cartuchera','Bolitas','Vaso','Sombrero','Frasco','Soldaditos','Radio','Casete'];
const fireHeap=Array.from({length:56},(_,i)=>{
 const id=(i*11)%28,color=i%3===0?'azul':'negro';
 // Low, scattered mound: broad shoulders, uneven spacing and a few loose edges.
 const row=i<8?0:i<20?1:i<36?2:3;
 const count=[8,12,16,20][row],first=[0,8,20,36][row],col=i-first;
 const span=[43,63,79,89][row],u=col/(count-1)*2-1;
 const x=50+u*span/2+Math.sin(i*2.3)*2.8;
 const y=[40,49,61,73][row]+u*u*3+Math.sin(i*1.7)*5;
 const width=13+(i*7%9),angle=Math.sin(i*2.7)*48;
 return `<div class="fh-heap-object" style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--w:${width}%;--angle:${angle.toFixed(1)}deg;z-index:${i+1}">${im('assets/objetos-incendio/recortes/objeto-'+String(id+1).padStart(2,'0')+'-'+color+'.webp','',fireNames[id])}</div>`;
}).join('');
Q('.fh-macro-content',root).innerHTML=`<div class="fh-ground-contact" aria-hidden="true"></div>${fireHeap}<div class="fh-heap-object fh-heap-bag">${im('assets/objetos-incendio/bag.webp','','Mochila con cucharitas')}</div><div class="fh-heap-object fh-heap-lamp">${im('assets/objetos-incendio/lamp.webp','','Reflector casero')}</div><div class="fh-heap-object fh-heap-money">${im('assets/objetos-incendio/money.webp','','Billetes')}</div><div class="fh-heap-object fh-heap-soldiers">${im('assets/objetos-incendio/soldiers.webp','','Soldaditos')}</div>`;
const skyWorld=document.createElement('div');skyWorld.className='fh-sky-world';
[...Q('.fh-sky',root).children].forEach(el=>skyWorld.append(el));Q('.fh-sky',root).append(skyWorld);
// Keep the actual heap soldiers alive: no replacement image or crossfade.
const survivor=Q('.fh-soldiers',root),heapSoldiers=Q('.fh-heap-soldiers',root);
survivor.replaceChildren(...heapSoldiers.childNodes);heapSoldiers.remove();
Q('img',survivor).dataset.src='assets/objetos-incendio/soldiers-azul.webp';
Q('img',survivor).alt='Soldaditos azules';
const burnCanvas=document.createElement('canvas');burnCanvas.className='fh-paper-burn';burnCanvas.setAttribute('aria-hidden','true');Q('.fh-sky',root).append(burnCanvas);
const burnContext=burnCanvas.getContext('2d');
let burnRun=null,burnFrame=-1,burnSize='',burnVisible=0;
const fireVideo=document.createElement('video');fireVideo.muted=true;fireVideo.playsInline=true;fireVideo.preload='auto';fireVideo.setAttribute('aria-hidden','true');fireVideo.hidden=true;
fireVideo.src='assets/videos/Papel_quemandose_en_fondo_verde_1080p_20261026142343.mp4';root.append(fireVideo);
const fireBuffer=document.createElement('canvas'),firePixels=fireBuffer.getContext('2d',{willReadFrequently:true});
const fireMask=document.createElement('canvas'),fireMaskContext=fireMask.getContext('2d');
let fireLastTime=-1,fireFailed=false,fireCoverage=null;
function keyFireFrame(data,coverage){
 for(let i=0,j=0;i<data.length;i+=4,j++){
  const r=data[i],g=data[i+1],b=data[i+2],excess=g-Math.max(r,b);
  const key=clamp((excess-8)/35)*clamp((g-38)/40),alpha=Math.round(data[i+3]*(1-key));
  // Both layers come from this exact pixel, not an independent geometric front.
  coverage[j]=Math.max(coverage[j],alpha);
  const luminance=r*.299+Math.min(g,Math.max(r,b)+8)*.587+b*.114;
  const ink=luminance>=125?244:16;
  data[i]=data[i+1]=data[i+2]=ink;data[i+3]=alpha;
 }
}
function resetFireMask(){
 fireLastTime=-1;fireCoverage=null;fireMaskContext.clearRect(0,0,fireMask.width,fireMask.height);
}
fireVideo.addEventListener('error',()=>{fireFailed=true});
function compositeFire(ctx,w,h,progress){
 if(reduced()||fireFailed||fireVideo.readyState<2||progress<=0||progress>=1)return;
 const fw=Math.min(960,Math.round(innerWidth)),fh=Math.round(fw*fireVideo.videoHeight/fireVideo.videoWidth);
 if(fireBuffer.width!==fw||fireBuffer.height!==fh){
  fireBuffer.width=fw;fireBuffer.height=fh;
  // Preserve already consumed areas when the viewport changes.
  const old=document.createElement('canvas');old.width=fireMask.width;old.height=fireMask.height;
  if(old.width&&old.height)old.getContext('2d').drawImage(fireMask,0,0);
  fireMask.width=fw;fireMask.height=fh;
  if(old.width&&old.height)fireMaskContext.drawImage(old,0,0,fw,fh);
  const previous=fireMaskContext.getImageData(0,0,fw,fh).data;fireCoverage=new Uint8ClampedArray(fw*fh);
  for(let j=0;j<fireCoverage.length;j++)fireCoverage[j]=previous[j*4+3];
  fireLastTime=-1;
 }
 if(!fireCoverage)fireCoverage=new Uint8ClampedArray(fw*fh);
 if(fireLastTime!==fireVideo.currentTime){
  firePixels.drawImage(fireVideo,0,0,fw,fh);
  const frame=firePixels.getImageData(0,0,fw,fh),data=frame.data;
  keyFireFrame(data,fireCoverage);
  const mask=fireMaskContext.createImageData(fw,fh);
  for(let j=0;j<fireCoverage.length;j++)mask.data[j*4+3]=fireCoverage[j];
  fireMaskContext.putImageData(mask,0,0);
  firePixels.putImageData(frame,0,0);fireLastTime=fireVideo.currentTime;
 }
 // Mask and flame use identical dimensions, timing and viewport transform.
 ctx.drawImage(fireMask,0,0,w,h);
 // Close uncovered paper remnants as the clip finishes, including viewport edges.
 const settle=ease(.78,.98,progress);
 ctx.save();ctx.globalAlpha=settle;ctx.fillStyle='#0b0b0d';ctx.fillRect(0,0,w,h);ctx.restore();
 revealDarkPaper(ctx,w,h,Math.min(devicePixelRatio||1,1.5));
 // The thresholded plate contains white ash: let it die out, not freeze at the edges.
 ctx.save();ctx.globalAlpha=1-settle;ctx.drawImage(fireBuffer,0,0,w,h);ctx.restore();
}
// The revealed surface is the same paper, inverted, not a flat black overlay.
const darkPaper=new Image(),darkSurface=document.createElement('canvas');let darkSurfaceSize='';
darkPaper.onload=()=>{darkSurfaceSize='';burnFrame=-1;drawPaperBurn(burnVisible)};
darkPaper.src=A.paper;
function revealDarkPaper(ctx,w,h,ratio){
 if(!darkPaper.complete||!darkPaper.naturalWidth)return;
 const size=w+'x'+h;
 if(darkSurfaceSize!==size){
  darkSurface.width=w;darkSurface.height=h;
  const paper=darkSurface.getContext('2d'),tw=1600*ratio,th=tw*darkPaper.naturalHeight/darkPaper.naturalWidth;
  const x=(w-tw)/2,y=-190*innerHeight/100*ratio;
  paper.fillStyle='#0b0b0d';paper.fillRect(0,0,w,h);
  paper.filter='grayscale(1) invert(1) brightness(.7)';
  for(let px=x-Math.ceil(x/tw)*tw;px<w;px+=tw){
   for(let py=y-Math.floor(y/th)*th-th;py<h;py+=th)paper.drawImage(darkPaper,px,py,tw,th);
  }
  paper.filter='none';darkSurfaceSize=size;
 }
 ctx.save();ctx.globalCompositeOperation='source-in';ctx.drawImage(darkSurface,0,0);ctx.restore();
}
function drawPaperBurn(progress){
 const ratio=Math.min(devicePixelRatio||1,1.5),w=Math.round(innerWidth*ratio),h=Math.round(innerHeight*ratio),size=w+'x'+h;
 const frame=progress>=1?181:Math.floor(progress*180);
 if(size===burnSize&&frame===burnFrame&&(progress<=0||progress>=1||reduced()))return;
 burnSize=size;burnFrame=frame;
 if(burnCanvas.width!==w||burnCanvas.height!==h){burnCanvas.width=w;burnCanvas.height=h}
 const ctx=burnContext;if(!ctx)return;
 ctx.clearRect(0,0,w,h);if(progress<=0)return;
 ctx.fillStyle='#0b0b0d';
 if(progress>=1){ctx.fillRect(0,0,w,h);revealDarkPaper(ctx,w,h,ratio);return}
 if(reduced()||fireFailed){ctx.globalAlpha=progress;ctx.fillRect(0,0,w,h);ctx.globalAlpha=1;revealDarkPaper(ctx,w,h,ratio);return}
 compositeFire(ctx,w,h,progress);
}
function updatePaperBurn(p,dt){
 // Runtime progress is separate from persisted destruction. Earlier scenes stay white.
 if(p<6.88){burnVisible=0;fireVideo.pause();if(burnRun&&burnRun.done)burnRun=null}
 else if(p<7.6){
  if(!burnRun){burnRun={elapsed:0,done:false,waiting:0};fireVideo.currentTime=0;resetFireMask()}
  const duration=reduced()?1.2:(Number.isFinite(fireVideo.duration)?fireVideo.duration:4);
  if(!document.hidden&&!burnRun.done){
   if(fireVideo.readyState<2){burnRun.waiting+=Math.min(Math.max(dt,0),.05);if(burnRun.waiting>8)fireFailed=true}
   if(!reduced()&&!fireFailed&&fireVideo.paused&&!fireVideo.ended)fireVideo.play().catch(()=>{fireFailed=true});
   const usingVideo=!reduced()&&!fireFailed;
   if(usingVideo&&fireVideo.readyState>=2)burnRun.elapsed=fireVideo.currentTime;
   else if(!usingVideo)burnRun.elapsed+=Math.min(Math.max(dt,0),.05);
   burnRun.done=fireVideo.ended||burnRun.elapsed>=duration;
  }
  burnVisible=burnRun.done?1:clamp(burnRun.elapsed/duration);
  if(burnRun.done)fireVideo.pause();
 }
 if(burnVisible>st.burn){const first=st.burn===0;st.burn=burnVisible;if(first)syncObjects()}
 drawPaperBurn(burnVisible);
 return burnVisible;
}
const tip=document.createElement('div');tip.id='fh-tooltip';tip.role='tooltip';document.body.append(tip);
const dialog=document.createElement('dialog');dialog.id='fh-detail';dialog.innerHTML='<img alt="Envoltorio de hamburguesa"><button type="button">Volver</button>';document.body.append(dialog);Q('button',dialog).onclick=()=>dialog.close();
let drag=null,tipTarget=null,robotUntil=0,previousInside=false,lastPersist=0,partyActive=false,albumTime=0,albumWasPlaying=false,lastCurrent=0,macroDwell=0,preloaded=null;
// La escena del salón ya está completa y armada detrás de la pared calada desde el principio
// (no aparece nadie de a uno): lo que se ve es sólo lo que la persiana va dejando pasar por el
// hueco. Una vez levantada del todo, seguir scrolleando hace zoom a TODA la composición (pared +
// escena, como un solo grupo) y, a medida que se acerca, la gente se va del cuadro por niveles de
// profundidad: primero la más cercana a cámara, después la siguiente, así hasta llegar a las dos
// personas del centro que dividen el plano al medio (persona-03 a la izquierda, persona-09 a la
// derecha), que se van últimas y revelan al nene. Cada persona se va hacia SU lado (izquierda o
// derecha según de qué lado del eje está), nunca para cualquier lado.
const SALON_PEOPLE={
 1:{level:6,dir:[62,-12]},   // persona-01-celular — derecha
 2:{level:3,dir:[58,18]},    // persona-02-vaso-izq — derecha
 3:{level:7,dir:[-42,-6]},   // persona-03-top-blanco — eje, izquierda
 4:{level:2,dir:[-55,14]},   // persona-04-vaso-espaldas — izquierda
 5:{level:2,dir:[54,-16]},   // persona-05-gorra-cerveza — derecha
 6:{level:3,dir:[-50,-18]},  // persona-06-remera-blanca-cerveza — izquierda
 7:{level:4,dir:[-58,18]},   // persona-07-remera-negra-brazo — izquierda
 8:{level:1,dir:[-68,-10]},  // persona-08-celular-cortado — izquierda, la más cercana
 9:{level:7,dir:[42,6]},     // persona-09-centro-pantalon-blanco — eje, derecha
 10:{level:5,dir:[64,10]},   // persona-10-espaldas — derecha
 11:{level:4,dir:[50,-20]},  // persona-11-perfil-vaso — derecha
 12:{level:1,dir:[64,14]},   // persona-12-espaldas-pelolargo — derecha, la más cercana
};
// La pared calada (persiana-calado.webp) se ve con background-size:cover, así que el hueco del
// portón nunca está en el mismo % de pantalla: depende de cuánto recorta `cover` según el ancho/alto
// real de la ventana. Para que la escena del salón encaje siempre exacto en ese hueco (en vez de
// quedar a un tamaño fijo que no se adapta y deja bordes negros, o recorta gente, al achicar la
// ventana o pasar a pantalla completa), calculamos acá el mismo recorte que hace `cover` con las
// dimensiones reales de la imagen de la pared y de la pantalla, y lo aplicamos como el rectángulo
// de `.fh-salon`. HUECO son las % del hueco adentro de la imagen de la pared (medidas por alfa).
// SALON_BLEED agranda un poco ese rectángulo hacia afuera, para que la escena sobre por muy poco
// en vez de quedar justa al pixel (más seguro contra errores de redondeo que dejen un borde negro).
const WALL_W=1920,WALL_H=1081,HUECO={l:.23802,t:.33858,r:.76146,b:.89824},SALON_BLEED=.02;
let salonLayout=null;
function layoutSalon(){
 if(salonLayout&&salonLayout.vw===innerWidth&&salonLayout.vh===innerHeight)return;
 const vw=innerWidth,vh=innerHeight,scale=Math.max(vw/WALL_W,vh/WALL_H),dispW=WALL_W*scale,dispH=WALL_H*scale,offX=(vw-dispW)/2,offY=(vh-dispH)/2;
 const hw=HUECO.r-HUECO.l,hh=HUECO.b-HUECO.t,l=HUECO.l-SALON_BLEED*hw,r=HUECO.r+SALON_BLEED*hw,t=HUECO.t-SALON_BLEED*hh,b=HUECO.b+SALON_BLEED*hh;
 const left=offX+l*dispW,top=offY+t*dispH,right=offX+r*dispW,bottom=offY+b*dispH,salon=Q('.fh-salon',root);
 salon.style.left=left.toFixed(1)+'px';salon.style.top=top.toFixed(1)+'px';salon.style.width=(right-left).toFixed(1)+'px';salon.style.height=(bottom-top).toFixed(1)+'px';
 salonLayout={vw,vh,left:Math.round(left),top:Math.round(top),width:Math.round(right-left),height:Math.round(bottom-top)};
 // Both child poses share the same image-space anchor, including on tall screens
 // where background-size:cover crops the sides of their transparent canvases.
 const imageScale=Math.max(salonLayout.width/3072,salonLayout.height/2048);
 const anchorX=(salonLayout.width-3072*imageScale)/2+3072*imageScale*.53;
 const anchorY=(salonLayout.height-2048*imageScale)/2+2048*imageScale*.76;
 root.querySelectorAll('.fh-salon-kid').forEach(el=>{
  el.style.transformOrigin=`${anchorX.toFixed(2)}px ${anchorY.toFixed(2)}px`;
 });
}
// El primer nivel conserva su salida. Los siguientes salen por el borde real del
// encuadre, sin fundirse en el centro ni agrandarse alrededor del centro del lienzo.
// Las últimas salidas se completan antes del cartón, sin bloquearse en el borde.
const SALON_LEVEL_START={1:4.40,2:4.48,3:4.54,4:4.60,5:4.90,6:5.00,7:5.08};
const SALON_DISPERSE_DUR=.34;
const salonBounds=new Map();
const salonPeople=[...root.querySelectorAll('.fh-sp')];
// Independent collage sway. Individual rotate composes with the
// existing scroll transform, so camera/dispersal positions remain untouched.
const salonSwayPreference=matchMedia('(prefers-reduced-motion:reduce)');
const SALON_SWAY={1:{period:6.8,phase:3.2,angle:1.2},2:{period:5.7,phase:.8,angle:1.45},3:{period:7.6,phase:5.3,angle:1.15},4:{period:6.1,phase:1.2,angle:1.35},5:{period:8.7,phase:4.7,angle:1.4},6:{period:7.1,phase:2.4,angle:1.3},7:{period:6.3,phase:4.1,angle:1.2},8:{period:8.1,phase:.2,angle:1.05},9:{period:7.9,phase:2.9,angle:1.1},10:{period:6.6,phase:5.8,angle:1.2},11:{period:8.2,phase:1.7,angle:1.5},12:{period:7.4,phase:3.8,angle:1.1}};
let salonSwayTime=0;
// Small joint bitmaps are prepared once and inherit body sway/scroll travel.
const salonJoints=new Map();
const SALON_JOINTS={
 7:{x:1424,y:776,w:128,h:264,pivotX:1494,pivotY:1016,outline:[[1434,776],[1504,776],[1540,1018],[1494,1040],[1455,973]],overlap:18,angle:-10,period:7.4,phase:.3},
 6:{x:960,y:728,w:216,h:232,pivotX:1094,pivotY:932,outline:[[960,728],[1176,728],[1176,900],[1138,922],[1108,960],[1060,944],[1008,902],[976,852]],overlap:22,angle:4,period:8.6,phase:2.1},
 9:{x:1568,y:912,w:112,h:208,pivotX:1602,pivotY:1086,outline:[[1612,912],[1672,912],[1672,980],[1648,1018],[1628,1082],[1624,1108],[1584,1112],[1576,1080],[1596,1016],[1608,980]],overlap:18,angle:-8,period:6.9,phase:1.4}
};
function prepareSalonJoint(el,image,n){
 if(image.naturalWidth!==3072||image.naturalHeight!==2048)return;
 const config=SALON_JOINTS[n];if(!config)return;
 const {x,y,w,h,pivotX,pivotY,outline,overlap}=config;
 const body=document.createElement('canvas'),arm=document.createElement('canvas');
 body.width=3072;body.height=2048;arm.width=w;arm.height=h;
 const bc=body.getContext('2d'),ac=arm.getContext('2d');if(!bc||!ac)return;
 const path=ctx=>{ctx.beginPath();outline.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath()};
 bc.drawImage(image,0,0);bc.save();bc.globalCompositeOperation='destination-out';path(bc);bc.fill();bc.restore();
 // Overlap at the hinge prevents a transparent seam during the small rotation.
 bc.save();bc.beginPath();bc.arc(pivotX,pivotY,overlap,0,Math.PI*2);bc.clip();bc.drawImage(image,0,0);bc.restore();
 ac.translate(-x,-y);path(ac);ac.clip();ac.drawImage(image,0,0);
 for(const canvas of [body,arm]){canvas.style.position='absolute';canvas.style.pointerEvents='none';canvas.setAttribute('aria-hidden','true')}
 el.append(body,arm);el.style.backgroundImage='none';
 salonJoints.set(n,{...config,body,arm});
}
salonPeople.forEach(el=>{
 const image=new Image();
 image.onload=()=>{
  const canvas=document.createElement('canvas');canvas.width=384;canvas.height=256;
  const context=canvas.getContext('2d',{willReadFrequently:true});if(!context)return;
  context.drawImage(image,0,0,canvas.width,canvas.height);
  const pixels=context.getImageData(0,0,canvas.width,canvas.height).data;
  let left=canvas.width,right=-1;
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]>32){left=Math.min(left,x);right=Math.max(right,x)}
  if(right>=left)salonBounds.set(el,{left:left/canvas.width,right:(right+1)/canvas.width,width:image.naturalWidth,height:image.naturalHeight});
  const n=Number(el.className.match(/sp-(\d+)/)[1]);if(SALON_JOINTS[n])prepareSalonJoint(el,image,n);
 };
 const src=getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/);if(src)image.src=src[1];
});
window.firstHouseBlocks=()=>!!drag||dialog.open;
window.firstHousePreload=src=>{if(!src||preloaded===src)return;preloaded=src;preload.src=src;preload.load()};
const preload=document.createElement('video');preload.preload='auto';preload.muted=true;
const cumbia=A.cumbia?new Audio(A.cumbia):null;if(cumbia){cumbia.loop=true;cumbia.preload='none'}
function loadImages(node){node.querySelectorAll('img[data-src]').forEach(i=>{i.src=i.dataset.src;delete i.dataset.src})}
function notify(text){Q('.fh-notice',root).textContent=text;clearTimeout(notify.t);notify.t=setTimeout(()=>Q('.fh-notice',root).textContent='',2600)}
function hint(el,text){if(el.dataset.help===text)return;el.dataset.help=text;el.setAttribute('aria-label',text);if(tipTarget===el)tip.textContent=text;let label=el.querySelector(':scope > .fh-touch-label');if(!label){label=document.createElement('span');label.className='fh-touch-label';el.append(label)}label.textContent=text}
function positionTip(x,y){tip.style.left=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,x+14))+'px';tip.style.top=Math.max(8,Math.min(innerHeight-tip.offsetHeight-8,y+18))+'px'}
function showTip(el,x,y){if(!el||el.closest('[inert]')||el.hidden)return;tipTarget=el;tip.textContent=el.dataset.help||el.getAttribute('aria-label');tip.classList.add('shown');positionTip(x,y)}
document.addEventListener('pointerover',e=>{const el=e.target.closest('[data-help]');if(el)showTip(el,e.clientX,e.clientY)});document.addEventListener('pointermove',e=>{if(tipTarget)positionTip(e.clientX,e.clientY)});document.addEventListener('pointerout',e=>{if(tipTarget&&!tipTarget.contains(e.relatedTarget)){tipTarget=null;tip.classList.remove('shown')}});document.addEventListener('focusin',e=>{const el=e.target.closest('[data-help]');if(el){const r=el.getBoundingClientRect();showTip(el,r.left+r.width/2,r.bottom)}});document.addEventListener('focusout',()=>{tipTarget=null;tip.classList.remove('shown')});
function keep(id){if(st.kept.includes(id))return;st.kept.push(id);st.box=true;save();syncObjects();notify('Quedó en la caja')}
const stage=Q('.kitchen-stage'),cupboard=Q('.kitchen-cupboard');
function object(cls,src,text,parent){const b=document.createElement('button');b.type='button';b.className=cls;b.innerHTML=im(src);parent.append(b);loadImages(b);hint(b,text);return b}
const robot=object('fh-room-robot',A.robot,'Ponerlo a andar',stage),bag=object('fh-room-bag',A.bag,'Abrir la mochila',stage),money=object('fh-room-money',A.money,'Desplegar el billete',stage);
robot.onclick=()=>{if(recien(robot)||performance.now()<robotUntil)return;if(!st.robot){st.robot=true;robotUntil=performance.now()+1800;robot.classList.add('walking');hint(robot,'Está caminando');setTimeout(()=>{robot.classList.remove('walking');robot.classList.add('walked');hint(robot,'Arrastrá a la caja');save()},1800)}};
bag.onclick=()=>{st.bag=!st.bag;Q('img',bag).src=st.bag?A.bag:A.bagClosed;bag.classList.toggle('open',st.bag);bag.setAttribute('aria-expanded',String(st.bag));hint(bag,st.bag?'Cerrar la mochila':'Abrir la mochila');save()};
money.onclick=()=>{if(recien(money))return;if(!st.money){st.money=true;money.classList.add('unfolded');hint(money,'Arrastrá a la caja');save()}};
Object.assign(COSAS,{money:{nombre:'Cuatro pesos de la cocina',src:A.money,unica:true},soldiers:{nombre:'Soldaditos verdes de plástico',src:A.soldiers,unica:true}});
[[robot,'robot'],[money,'money']].forEach(([el,id])=>hacerGuardable(el,id,{alGuardar:()=>keep(id)}));
st.kept.forEach(id=>{if(COSAS[id]&&!enCaja(id))guardar(id,{silencioso:true})});
// --- Caja 3D (caja-zapatillas.glb): fija en la alacena, se acerca al frente y queda como acceso en la esquina ---
const boxAnchor=document.createElement('div');boxAnchor.className='fh-box-anchor';cupboard.append(boxAnchor);
const boxCanvas=document.createElement('canvas');boxCanvas.id='fh-model-box';boxCanvas.style.touchAction='none';boxCanvas.setAttribute('role','button');boxCanvas.setAttribute('aria-label','La caja de zapatillas');boxCanvas.tabIndex=0;document.body.append(boxCanvas);
const boxLidHint=document.createElement('span');boxLidHint.id='fh-box-lid-hint';boxLidHint.setAttribute('role','tooltip');boxLidHint.hidden=true;
const boxScrollHint=document.createElement('p');boxScrollHint.id='fh-box-scroll-hint';boxScrollHint.textContent='ARRASTRÁ PARA GIRAR · SCROLLEÁ PARA SEGUIR ↓';boxScrollHint.hidden=true;document.body.append(boxLidHint,boxScrollHint);
boxCanvas.setAttribute('aria-describedby','fh-box-scroll-hint');
let mvRotatable=false,mvDockedRect=null,mvPointerMoved=false,box3d=null,boxOpen=false,openAnim=0,wiggleT=0,dragging=false,dragStartX=0,dragStartRotY=0;
window.laCasaBoxOpening=0;
function initBox3D(){
 const THREE=window.__THREE,GLTFLoader=window.__GLTFLoader;
 const renderer=new THREE.WebGLRenderer({canvas:boxCanvas,alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(32,1,.01,10);
 scene.add(new THREE.AmbientLight(0xffffff,1.15));
 const d1=new THREE.DirectionalLight(0xffffff,1.5);d1.position.set(1,2,1.5);scene.add(d1);
 const d2=new THREE.DirectionalLight(0xffffff,.5);d2.position.set(-1,1,-1);scene.add(d2);
 new GLTFLoader().load(window.__fhBoxGLB||'assets/first-house/caja-zapatillas.glb',gltf=>{
  const modelRoot=gltf.scene;
  const bbox=new THREE.Box3().setFromObject(modelRoot);
  const center=bbox.getCenter(new THREE.Vector3()),size=bbox.getSize(new THREE.Vector3());
  modelRoot.position.sub(center);
  const rig=new THREE.Group();rig.add(modelRoot);scene.add(rig);
  const radius=size.length()*.5;
  const dist=radius*1.4/Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  camera.position.set(0,dist*.27,dist);camera.lookAt(0,0,0);
  const tapa=modelRoot.getObjectByName('caja_tapa');
  const openQuat=tapa.quaternion.clone();
  const closedQuat=openQuat.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2));
  tapa.quaternion.copy(closedQuat);
  new THREE.TextureLoader().load('assets/first-house/caja-textura.webp',tex=>{
   tex.flipY=false;tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
   modelRoot.traverse(o=>{if(o.isMesh&&o.material){o.material.map=tex;o.material.needsUpdate=true}});
  });
  box3d={renderer,scene,camera,rig,tapa,openQuat,closedQuat,raycaster:new THREE.Raycaster(),pointer:new THREE.Vector2(),lastW:0,lastH:0};
 },undefined,err=>{console.warn('caja 3D: no se pudo cargar el modelo',err);boxCanvas.classList.add('fh-mv-fallback')});
}
if(window.__THREE)initBox3D();else window.addEventListener('three-ready',initBox3D,{once:true});
setTimeout(()=>{if(!window.__THREE){console.warn('caja 3D: no cargó three.js (CDN inaccesible o bloqueado); se muestra una imagen fija de reemplazo');boxCanvas.classList.add('fh-mv-fallback')}},4000);
boxCanvas.addEventListener('pointerdown',e=>{mvPointerMoved=false;if(mvRotatable&&box3d){dragging=true;dragStartX=e.clientX;dragStartRotY=box3d.rig.rotation.y;boxCanvas.setPointerCapture(e.pointerId)}});
boxCanvas.addEventListener('pointermove',e=>{if(!dragging||!box3d)return;const dx=e.clientX-dragStartX;if(Math.abs(dx)>3)mvPointerMoved=true;box3d.rig.rotation.y=dragStartRotY+dx*.012});
const endBoxDrag=()=>{dragging=false};
boxCanvas.addEventListener('pointermove',e=>{
 boxLidHint.hidden=true;
 if(e.pointerType==='touch'||dragging||!mvRotatable||!box3d)return;
 const rect=boxCanvas.getBoundingClientRect(),{raycaster,pointer,camera,tapa,scene}=box3d;
 pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
 scene.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);
 if(!raycaster.intersectObject(tapa,true).length)return;
 boxLidHint.textContent=boxOpen?'CERRAR':'ABRIR';boxLidHint.hidden=false;
 boxLidHint.style.left=Math.max(8,Math.min(innerWidth-125,e.clientX+14))+'px';boxLidHint.style.top=Math.max(8,Math.min(innerHeight-35,e.clientY+18))+'px';
});
boxCanvas.addEventListener('pointerleave',()=>{boxLidHint.hidden=true});
boxCanvas.addEventListener('pointerdown',()=>{boxLidHint.hidden=true});
window.addEventListener('blur',()=>{boxLidHint.hidden=true});
boxCanvas.addEventListener('pointerup',endBoxDrag);boxCanvas.addEventListener('pointercancel',endBoxDrag);
boxCanvas.addEventListener('click',()=>{
 if(mvPointerMoved)return;
 const p=current;
 if(p<1.58){wiggleT=.5}
 else if(p>=2.3&&p<2.4){boxOpen=!boxOpen;boxLidHint.textContent=boxOpen?'CERRAR':'ABRIR'}
 else if(p>=2.62){abrirCaja(true)}
});
boxCanvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&current>=2.62){e.preventDefault();e.stopPropagation();abrirCaja(true)}});
function positionModelBox(p,dt){
 const showBoxHints=p>=2.3&&p<2.4&&!document.hidden;
 boxScrollHint.hidden=!showBoxHints;
 if(!showBoxHints)boxLidHint.hidden=true;
 const mvActive=p>=1.0;
 boxCanvas.style.visibility=mvActive?'visible':'hidden';
 boxCanvas.style.pointerEvents=mvActive&&p>=1.4?'auto':'none';
 if(!mvActive){window.laCasaBoxOpening=0;return}
 boxCanvas.style.opacity=p<1.4?ease(1,1.4,p).toFixed(3):'1';
 let rect;
 if(p<1.6){
  const r=boxAnchor.getBoundingClientRect();mvDockedRect=r;rect=r;
  // Si la caja vuelve a quedar guardada en la alacena (se scrollea hacia atrás), la tapa
  // siempre se cierra sola: no puede quedar "guardada" con la tapa abierta.
  if(boxOpen)boxOpen=false;
 }else{
  const docked=mvDockedRect||boxAnchor.getBoundingClientRect();
  const popW=Math.min(innerWidth*.84,1120),popH=popW*.67;
  const pop={left:(innerWidth-popW)/2,top:(innerHeight-popH)/2,width:popW,height:popH};
  const cornerW=Math.min(280,innerWidth*.55),cornerH=cornerW*114/180;
  const corner={left:innerWidth-18-cornerW,top:innerHeight-14-cornerH,width:cornerW,height:cornerH};
  // El crecimiento arranca apenas el mueble termina de entrar (1.6), en vez de
  // esperar hasta 2.0: antes quedaba la escena completamente quieta ahí en el medio.
  // Retreat as soon as the wall starts rising, before the black shutter reaches
  // the foreground box. The shortcut returns to the full-size stop at 2.35.
  const grow=ease(1.6,2.3,p),shrink=ease(2.4,2.62,p);
  const lerp=(a,b,t)=>a+(b-a)*t;
  if(shrink<=0){
   rect={left:lerp(docked.left,pop.left,grow),top:lerp(docked.top,pop.top,grow),width:lerp(docked.width,pop.width,grow),height:lerp(docked.height,pop.height,grow)};
  }else{
   rect={left:lerp(pop.left,corner.left,shrink),top:lerp(pop.top,corner.top,shrink),width:lerp(pop.width,corner.width,shrink),height:lerp(pop.height,corner.height,shrink)};
   // Lo mismo al achicarse al widget de la esquina: si se dejó la tapa abierta, se cierra
   // sola apenas termina de achicarse del todo (shrink llega a 1).
   if(shrink>=1&&boxOpen)boxOpen=false;
  }
 }
 boxCanvas.style.left=rect.left+'px';boxCanvas.style.top=rect.top+'px';boxCanvas.style.width=rect.width+'px';boxCanvas.style.height=rect.height+'px';
 if(showBoxHints){boxScrollHint.style.left=(rect.left+rect.width/2)+'px';boxScrollHint.style.top=Math.min(innerHeight-48,rect.top+rect.height*.82)+'px'}
 mvRotatable=p>=2.3&&p<2.4;
 if(!mvRotatable&&dragging)dragging=false;
 if(!box3d)return;
 const w=Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
 if(w!==box3d.lastW||h!==box3d.lastH){box3d.renderer.setSize(w,h,false);box3d.camera.aspect=w/h;box3d.camera.updateProjectionMatrix();box3d.lastW=w;box3d.lastH=h}
 if(wiggleT>0){wiggleT=Math.max(0,wiggleT-dt);box3d.rig.rotation.z=Math.sin(wiggleT*46)*wiggleT*1.6}
 else if(box3d.rig.rotation.z)box3d.rig.rotation.z=0;
 const targetOpen=boxOpen?1:0;openAnim+=(targetOpen-openAnim)*Math.min(1,dt*5);
 window.laCasaBoxOpening=openAnim;
 box3d.tapa.quaternion.slerpQuaternions(box3d.closedQuat,box3d.openQuat,openAnim);
 box3d.renderer.render(box3d.scene,box3d.camera);
}
// Los clics conservan sus pequeñas acciones; guardar requiere arrastrar a la caja.
function syncObjects(){robot.inert=money.inert=st.burn>0;robot.hidden=st.kept.includes('robot');money.hidden=st.kept.includes('money');bag.classList.toggle('open',st.bag);Q('img',bag).src=st.bag?A.bag:A.bagClosed;money.classList.toggle('unfolded',st.money);robot.classList.toggle('walked',st.robot);hint(robot,st.robot?'Guardar en la caja':'Ponerlo a andar');hint(bag,st.bag?'Cerrar la mochila':'Abrir la mochila');hint(money,st.money?'Guardar en la caja':'Desplegar el billete');
hint(Q('.fh-soldiers',root),st.soldiers?'Este recuerdo va con vos':'Arrastrá a la caja');Q('.fh-soldiers',root).hidden=st.soldiers||enCaja('soldiers');if(st.robot)hint(robot,'Arrastrá a la caja');if(st.money)hint(money,'Arrastrá a la caja')}
Q('.fh-soldiers',root).onclick=()=>{};
hacerGuardable(Q('.fh-soldiers',root),'soldiers',{alGuardar:()=>{st.soldiers=true;Q('.fh-soldiers',root).hidden=true;save();syncObjects();window.laCasaCarry={soldiers:true};window.dispatchEvent(new CustomEvent('la-casa:carry',{detail:window.laCasaCarry}))}});window.laCasaCarry={soldiers:st.soldiers};
const kite=Q('.fh-kite',root);let tug=0;
const skyKites=[...root.querySelectorAll('.fh-distant')],kiteEntry=Q('.fh-kite-entry',root),skyStrings=[...root.querySelectorAll('.fh-kite-strings path')];
// Keep the player's line above the heap, independent of the distant strings.
const playerString=document.createElementNS('http://www.w3.org/2000/svg','svg');
playerString.setAttribute('class','fh-player-string');playerString.setAttribute('aria-hidden','true');
playerString.append(skyStrings[skyKites.length]);skyWorld.append(playerString);
let skyTime=0,skyWasVisible=false,flightStartedThisVisit=false;
let fallCamera=null;
const flightReady=5.64,flightGate=5.70,flightPrompt=document.createElement('p');
flightPrompt.className='fh-flight-start';flightPrompt.textContent='Hacé clic seguido sobre la pantalla para mantenerlo en el aire';flightPrompt.hidden=true;Q('.fh-sky',root).append(flightPrompt);
const flightWarning=document.createElement('p');flightWarning.className='fh-flight-start fh-flight-warning';flightWarning.textContent='SE PUEDE CAER · SEGUÍ HACIENDO CLIC';flightWarning.hidden=true;flightWarning.setAttribute('role','status');Q('.fh-sky',root).append(flightWarning);
window.firstHouseScrollLimit=(next,step)=>{
 if(!adentro())return next;
 if(fallCamera)return target;
 if(burnRun&&!burnRun.done)return 6.9;
 if(step>0&&current>=6.8&&current<7.3&&!burnRun)return Math.min(next,6.9);
 if(step>0&&!flightStartedThisVisit&&current<6.55){
  // No slow-scroll zone: a short gesture reveals the field, interpolation stays soft.
  return Math.min(next,flightGate);
 }
 return next;
};
function animateSky(p,dt){
 const still=reduced();
 if(!flightStartedThisVisit&&st.flight.phase!=='ready')st.flight={phase:'ready',time:0,y:48,vy:0};
 skyWasVisible=true;
 if(!document.hidden)skyTime+=Math.min(Math.max(dt,0),.05);
 const w=innerWidth,h=innerHeight;
   function string(index,x,y,entry=1,offsetX=0,offsetY=0,depth=1){
   const settling=index===skyKites.length?ease(0,1,st.flight.fallProgress||0):0;
   const endX=w*(.15+(index%6)*.14+settling*.35)+offsetX,endY=h*(1.15+settling*1.34)+offsetY,sway=still?0:Math.sin(skyTime/3+index)*w*.035;
   const path=skyStrings[index];
   path.style.visibility=entry>0?'visible':'hidden';
   path.style.strokeDasharray='1';path.style.strokeDashoffset=String(1-entry);
    path.style.strokeWidth=clamp(.35*Math.sqrt(depth),.12,.65).toFixed(3);
    path.style.strokeOpacity=clamp(.3+depth*.14,.32,.65).toFixed(3);
  skyStrings[index].setAttribute('d',`M ${x.toFixed(2)} ${y.toFixed(2)} C ${(x+w*.12+sway).toFixed(2)} ${(y+h*(.22-settling*.17)).toFixed(2)}, ${(endX-w*.16+sway).toFixed(2)} ${(h*(.85+settling*1.67)).toFixed(2)}, ${endX.toFixed(2)} ${endY.toFixed(2)}`);
 }
 skyKites.forEach((el,i)=>{
  const entry=ease(5.40,5.61,p),side=i%2?1:-1,fromBelow=i%3===2;
  const offsetX=fromBelow?0:side*(1-entry)*w*.68,offsetY=fromBelow?(1-entry)*h*.85:0;
  const wind=still?0:Math.sin(skyTime/5+i)*.025;
  const x=w*(.5+(still?Math.sin(i*2):Math.sin(skyTime/(12+i*2)+i*2))*.34+wind)+offsetX;
  const y=h*(.32+(still?Math.cos(i*1.7):Math.cos(skyTime/(9+i*2)+i*1.7))*.22)+offsetY;
  el.style.left=x+'px';el.style.top=y+'px';
  const depth=[.22,.48,1.05,.16,.28,.2,.36][i];
  el.style.transform=`translate(-50%,-50%) rotate(${still?0:Math.sin(skyTime/3+i)*12}deg) scale(${depth})`;
  string(i,x,y,entry,offsetX,offsetY,depth);
 });
 // The player arrives last through scroll, then launches on the first impulse.
 const playerEntry=ease(5.53,5.66,p);
 kiteEntry.style.transform=`translateY(${((1-playerEntry)*h).toFixed(2)}px)`;
 kiteEntry.style.visibility=playerEntry>0?'visible':'hidden';
 kite.inert=playerEntry<.99;
 const f=st.flight,autopilot=!still&&f.phase==='ready'?Math.sin(performance.now()/1500)*5:0;
 const flying=f.phase==='flying',t=f.travel||0;
 const launch=ease(0,1.8,t);
 // Mostly central flight; just two soft edge excursions during the full flight.
 const edgeExcursion=.51*Math.exp(-Math.pow((t-5)/1.05,2))-.51*Math.exp(-Math.pow((t-13)/1.05,2));
 const horizontal=flying&&!still?clamp(launch*(Math.sin(t/2.6)*.10+Math.sin(t/4.7)*.045+edgeExcursion)+(f.drift||0)*.45,-.53,.53):0;
 if(flying)f.lastHorizontal=horizontal;
 const fallProgress=f.fallProgress||0;
 const playerX=w*(.5+(f.phase==='fallen'?(f.lastHorizontal||0)*(1-ease(0,1,fallProgress)):horizontal));
 const altitude=f.y+autopilot;
 const playerY=h*altitude/100;
 const depth=flying&&!still?1+launch*(Math.sin(t/2.2)*.43+Math.sin(t/4.6)*.12-.16):f.phase==='fallen'?(f.lastDepth||1)+(.98-(f.lastDepth||1))*ease(0,1,fallProgress):1;
 if(flying)f.lastDepth=depth;
 kite.style.left=playerX+'px';kite.style.top=playerY+'px';
 const desiredBank=flying?launch*(Math.cos(t/2.1)*20+Math.cos(t/5.3)*6)+(f.gust||0)*14+(f.vy||0)*.18:f.phase==='fallen'?28+fallProgress*38:Math.sin(skyTime/3)*4;
 // Click tension affects acceleration, never the rendered angle directly.
 f.bank=(f.bank||0)+(desiredBank-(f.bank||0))*(1-Math.exp(-3*Math.min(Math.max(dt,0),.05)));
 kite.style.transform=`translate(-50%,-50%) rotate(${still?0:f.bank}deg) scale(${depth})`;
 string(skyKites.length,playerX,playerY+(1-playerEntry)*h,playerEntry,0,(1-playerEntry)*h,depth);
  flightPrompt.hidden=!(!flightStartedThisVisit&&p>=flightReady&&p<6.55);
  const showTangle=f.entangled&&fallProgress<.25;
 const warningText=showTangle?'SE TE ENREDÓ EL HILO': 'SE PUEDE CAER · SEGUÍ HACIENDO CLIC';
 if(flightWarning.textContent!==warningText)flightWarning.textContent=warningText;
 flightWarning.hidden=!((showTangle||(flying&&f.sinceClick>.85))&&p>=flightReady&&p<6.55);
 root.querySelectorAll('.fh-kite-tail').forEach((el,i)=>{el.style.transform=`rotate(${still?0:Math.sin(skyTime/1.7+i)*11+Math.sin(skyTime/3.8+i)*6}deg)`});
}
function impulse(){const f=st.flight;if(f.phase==='fallen'||(f.phase==='ready'&&current<flightReady))return;if(f.phase==='ready'){flightStartedThisVisit=true;f.phase='flying';f.time=0;f.travel=0;flightPrompt.hidden=true}if(f.phase==='flying'){f.tension=Math.min(2,(f.tension||0)+1.1);f.sinceClick=0;flightWarning.hidden=true}else {f.vy=-2;tug=1}save()}
kite.onclick=e=>{e.stopPropagation();impulse()};Q('.fh-sky',root).onclick=impulse;kite.onkeydown=e=>{if(e.code==='Space'){e.preventDefault();e.stopPropagation()}};
window.addEventListener('keydown',e=>{if(e.code==='Space'&&adentro()&&current>5.7&&current<6.7&&!e.target.closest('input,textarea,dialog,#music-player')){e.preventDefault();e.stopImmediatePropagation();impulse()}},true);
function flight(dt,p){
 const f=st.flight;if(p<flightReady||p>6.7||document.hidden)return;
 const step=Math.min(Math.max(dt,0),.05);
 if(f.phase==='flying'){
  f.time+=step;f.sinceClick=(f.sinceClick||0)+step;
  const lift=1-ease(.35,1.5,f.sinceClick);
  f.travel=(f.travel||0)+step*lift;
  // Each tug builds line tension; it releases over time instead of teleporting velocity.
  f.tension=(f.tension||0)*Math.exp(-step*5);
  const gustEnvelope=ease(.35,.85,(1+Math.sin(f.time*.58-1.8))*.5);
  f.gust=reduced()?0:gustEnvelope*(Math.sin(f.time*2.7)*.65+Math.sin(f.time*4.1)*.35);
  f.driftVelocity=((f.driftVelocity||0)+((f.gust*.16)-(f.drift||0)*1.8)*step)*Math.exp(-step*1.8);
  f.drift=clamp((f.drift||0)+f.driftVelocity*step,-.08,.08);
  f.vy=clamp(f.vy+step*(23-f.tension*76+f.gust*4),-28,50);
  f.y+=f.vy*step;
   if(f.y<-5){f.y=-5;f.vy=Math.max(0,f.vy)}
  if(f.y>94)f.phase='fallen';
  // Narrative limit counts only active flight, never waiting or a hidden tab.
  if(f.time>=18){f.entangled=true;f.phase='fallen';f.vy=Math.max(5,f.vy)}
 }
 if(p>6.4&&f.phase!=='ready'&&f.phase!=='fallen')f.phase='fallen';
 // Falling position is integrated with the camera, not in a separate outgoing layer.
 kite.setAttribute('aria-label',f.phase==='fallen'?'El barrilete cayó':'Hacé clic seguido para mantenerlo en el aire');
 tug=Math.max(0,tug-step*3);
}
function layer(sel,a){const el=Q(sel,root);el.style.opacity=clamp(a);el.style.visibility=a>.001?'visible':'hidden';el.inert=a<.7;if(a>.001)loadImages(el);return el}
function followFallingKite(dt){
 const f=st.flight;
 const inside=adentro()&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside');
 if(!inside||current<flightReady||current>7.12){fallCamera=null;return}
 if(document.hidden)return;
 if(!fallCamera&&flightStartedThisVisit&&f.phase==='fallen'&&!f.followed&&current<6.7){
  fallCamera={time:0,start:current,startY:f.y};f.followed=true;f.fallStart=current;f.vy=Math.max(5,f.vy||0);
 }
 if(!fallCamera)return;
 const step=Math.min(Math.max(dt,0),.05);fallCamera.time+=step;
 f.vy=Math.min(55,f.vy+step*18);f.y=Math.min(245,f.y+f.vy*step);
 const progress=clamp((f.y-fallCamera.startY)/(245-fallCamera.startY));
 f.fallProgress=progress;f.cameraY=190*progress;
 // One coordinate system: falling kite, floor and camera move together, no dissolve.
 target=current=fallCamera.start+(6.86-fallCamera.start)*progress;
 if(progress>=1){f.vy=0;f.landed=true;target=current=6.86;fallCamera=null;storeTravel();save()}
}
function audio(p,active,dt){const enter=active&&p>4&&p<5,exit=!active||p<4||p>5.05;if(enter&&!partyActive){partyActive=true;albumTime=music.currentTime;albumWasPlaying=sounding&&!music.paused;music.pause();if(cumbia&&sounding&&!music.muted)cumbia.play().catch(()=>{})}else if(partyActive&&exit){partyActive=false;cumbia?.pause();if(sounding&&albumWasPlaying){music.currentTime=albumTime;music.play().catch(()=>{})}}if(partyActive&&!music.paused)music.pause();if(cumbia){cumbia.muted=music.muted||!sounding||document.hidden;cumbia.volume=.45*(1-ease(4.85,5.05,p))}const tv=Q('.tv-video'),tvOn=active&&p>1.2&&p<2&&Q('.kitchen-tv').dataset.channel!=='0';tv.muted=music.muted||!sounding||!tvOn;tv.volume=.55;const desired=tvOn?.12:.55;music.volume+= (desired-music.volume)*Math.min(1,dt*3);if(partyActive)$('player-status').textContent=cumbia?'LA JODITA':'EN PAUSA';}
const previous=window.casaRender;
window.casaRender=function(now,dt){
followFallingKite(dt);
 if(burnRun&&!burnRun.done&&adentro()&&current>=6.88&&current<7.6)target=current=6.9;
if(adentro()&&!flightStartedThisVisit&&lastCurrent<6.55&&target>flightGate){target=flightGate;current=Math.min(current,flightGate)}
previous(now,dt);const inside=adentro()&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside'),p=current,active=inside&&p>=.95&&p<7.6;
 if(inside)positionModelBox(p,dt);else boxCanvas.style.visibility='hidden';
root.style.visibility=active?'visible':'hidden';root.inert=!active;$('casa-screens').inert=active;document.body.classList.toggle('new-first-house',active);if(active)document.body.classList.remove('casa-sin-cursor');audio(p,active,dt);if(!active){fireVideo.pause();tip.classList.remove('shown');boxLidHint.hidden=boxScrollHint.hidden=true;lastCurrent=p;return}
if(p>2.48&&p<2.9&&!st.autoBox){st.autoBox=true;st.box=true;syncObjects();save()}
// Box positioning also runs beyond the first house, keeping its drop target alive.
layoutSalon();
// La pared (con el calado de la persiana) y la escena del salón aparecen y desaparecen
// SIEMPRE juntas, como un solo grupo: no hay un desvanecimiento entre una y otra. La
// escena del salón ya está entera ahí detrás desde que arranca este grupo; lo único que
// la revela es que la persiana (encima, con el hueco real) se levanta.
const groupOpacity=clamp(ease(2.2,2.4,p)-ease(5.40,5.56,p)),shutter=layer('.fh-shutter',groupOpacity),party=layer('.fh-party',groupOpacity);
// La pared entra deslizando desde 2.4 (justo cuando termina de aparecer, sin hueco)
// hasta 3.0. La persiana ya empieza a levantarse ANTES de que la pared termine de
// encajar (arranca en 2.85, superpuesto con el final del deslizamiento de la pared),
// así el "encaje" de la pared y el levantamiento de la persiana son un solo
// movimiento continuo: no hay instante en el que la escena quede quieta.
// Una vez levantada del todo (3.95), la pared NO se va: se queda como el arco que
// contiene la escena, y es la pared+escena juntas las que hacen zoom in al mismo
// tiempo, como si la cámara se metiera dentro de ese hueco.
// Preserve the initial camera; then lower its aim to the child and approach closer.
const wallIn=ease(2.4,3.0,p),closeUp=ease(4.64,5.28,p);
// The opening is already clear before the roll reaches its full travel. Start
// approaching during that last lift so there is no visually idle scroll interval.
const camZoom=1+ease(3.50,5.0,p)*2.6+closeUp*1.6;
const sw=salonLayout.width,sh=salonLayout.height;
const imageScale=Math.max(sw/3072,sh/2048),imageW=3072*imageScale,imageH=2048*imageScale;
const childX=salonLayout.left+(sw-imageW)/2+imageW*.53;
const childY=salonLayout.top+(sh-imageH)/2+imageH*.76;
// Fixed aim and one shared progress: the child follows a straight screen-space
// line from the wide composition to the final framing, without a late curved pan.
const cameraProgress=clamp((camZoom-1)/4.2);
const focusX=childX,focusY=childY;
const panX=(innerWidth*.5-childX)*cameraProgress,panY=(innerHeight*.57-childY)*cameraProgress;
const cameraTransform=`translate(${panX.toFixed(2)}px,${((1-wallIn)*innerHeight+panY).toFixed(2)}px) scale(${camZoom.toFixed(3)})`;
shutter.style.transformOrigin=party.style.transformOrigin=`${focusX.toFixed(2)}px ${focusY.toFixed(2)}px`;
shutter.style.transform=cameraTransform;
// La escena del salón no es una capa aparte que aparece sola: viene deslizándose JUNTO con la
// pared calada y la persiana (mismo movimiento), para que no se vea aparecer de golpe superpuesta
// a otra cosa (como la caja 3D todavía grande) antes de que la pared llegue a su lugar.
party.style.transform=cameraTransform;
// La persiana se abre moviéndose de verdad (no con una máscara que la tapa):
// la imagen de la persiana (detrás de la pared calada) se desplaza hacia arriba,
// así se ven las líneas subir, y la pared calada (encima, con alfa) recorta lo
// que queda visible exactamente al hueco del portón. La escena del salón ya está
// detrás de TODO esto desde el principio: lo que se ve por el hueco a medida que
// sube es la fiesta entera, ya armada, nunca algo que aparece después.
const liftT=ease(2.85,3.95,p);Q('.fh-metal-roll',root).style.transform='translateY(-'+(liftT*100).toFixed(1)+'%)';
// Salón detrás de la persiana: luces titilando (lila/azul, cada ~medio segundo,
// independiente del scroll) desde que algo de la escena empieza a verse por el hueco.
const tint=Q('.fh-salon-tint',root);
const stillLights=salonSwayPreference.matches||document.hidden;
 // Full-colour multiply wash, without the translucent normal layer or lamp halos.
 tint.style.opacity=p>2.85&&p<5.56?'1':'0';
tint.style.backgroundColor=stillLights?'#a491c0':Math.floor(now/500)%2?'#d1b5d5':'#335386';
// Una vez levantada la persiana, cada persona se va del cuadro (crece, se desenfoca y se
// corre) hacia SU lado: las que están a la derecha del eje (la chica de pantalón blanco
// y, a su izquierda, la que sonríe de frente) se van hacia la derecha; las que están a la
// izquierda se van hacia la izquierda. No se van todas juntas, sino por niveles de
// profundidad: primero las más cercanas a cámara, nivel por nivel, hasta llegar a las dos
// del eje, que se van últimas y recién ahí revelan al nene, que estaba tapado detrás de
// todas pero siempre estuvo ahí.
const swayStrength=salonSwayPreference.matches||document.hidden?0:ease(2.95,3.6,p)*(1-ease(4.35,4.95,p));
// Cap elapsed time after tab suspension; no separate animation loop or timer.
if(swayStrength>0)salonSwayTime+=Math.min(Math.max(dt,0),.05);
salonPeople.forEach(el=>{
 const n=Number(el.dataset.n||(el.dataset.n=el.className.match(/sp-(\d+)/)[1])),info=SALON_PEOPLE[n];
 const start=SALON_LEVEL_START[info.level],t=ease(start,start+SALON_DISPERSE_DUR,p),[dx,dy]=info.dir;
 const sway=SALON_SWAY[n];
 if(sway){
  const bounds=salonBounds.get(el),anchorX=bounds?(bounds.left+bounds.right)*.5:.5;
  // The source canvases have transparent margins: pivot in image space,
  // compensating for cover cropping rather than rotating about viewport center.
  el.style.transformOrigin=`${((sw-imageW)*.5+imageW*anchorX).toFixed(2)}px ${((sh-imageH)*.5+imageH*.9).toFixed(2)}px`;
  const cycle=salonSwayTime*Math.PI*2/sway.period+sway.phase;
  const wave=Math.sin(cycle),pause=.65+.35*Math.sin(cycle*.47+sway.phase);
  el.style.rotate=(wave*pause*sway.angle*swayStrength*(1-t)).toFixed(4)+'deg';
  const joint=salonJoints.get(n);
  if(joint){
   const a=joint,scale=imageW/3072,left=(sw-imageW)*.5,top=(sh-imageH)*.5;
   const layoutKey=sw+':'+sh;
   if(a.layoutKey!==layoutKey){
    a.body.style.left=left+'px';a.body.style.top=top+'px';a.body.style.width=imageW+'px';a.body.style.height=imageH+'px';
    a.arm.style.left=(left+a.x*scale)+'px';a.arm.style.top=(top+a.y*scale)+'px';a.arm.style.width=a.w*scale+'px';a.arm.style.height=a.h*scale+'px';
    a.arm.style.transformOrigin=((a.pivotX-a.x)*scale)+'px '+((a.pivotY-a.y)*scale)+'px';a.layoutKey=layoutKey;
   }
   const cycle=salonSwayTime*Math.PI*2/a.period+a.phase;
   const bend=n===7||n===9?(1+Math.sin(cycle))*.5:Math.sin(cycle);
   a.arm.style.transform=`rotate(${(a.angle*bend*swayStrength*(1-t)).toFixed(3)}deg)`;
  }
 }
  if(info.level===1){
   el.style.transform=`translate(${(dx*t).toFixed(1)}%,${(dy*t).toFixed(1)}%) scale(${(1+t*1.1).toFixed(3)})`;
   // No animated blur on enlarged full-scene canvases: reversing the scroll
   // must not recreate large filtered surfaces. Restore visibility from phase.
   el.style.opacity=(1-t).toFixed(3);el.style.filter='none';
   el.style.visibility=t>=1?'hidden':'inherit';
   return;
  }
  // Keep the four innermost figures as foreground legs around a narrow opening.
  // Earlier levels still leave the frame; these only make small, depth-staggered moves.
  if(info.level>=5){
   const part=ease(info.level===7?4.90:start,5.28,p),direction=dx<0?-1:1;
   const distance=info.level===7?.035:info.level===6?.018:.012;
   el.style.transform=`translateX(${(direction*imageW*distance*part).toFixed(2)}px)`;
   el.style.opacity='1';el.style.filter='none';
   return;
  }
  // Measure the opaque cutout, not its transparent full-scene canvas. Only move
  // far enough to clear the viewport at the final zoom; never fade a central figure.
   const bounds=salonBounds.get(el);
   const late=info.level>=5;
   const w=sw,h=sh,finalZoom=late?5.2:3.6,origin=childX;
  let exit=0,nearEdge=0;
  if(bounds){
   const imageScale=Math.max(w/bounds.width,h/bounds.height),imageWidth=bounds.width*imageScale;
   const imageLeft=(w-imageWidth)/2,edge=imageLeft+(dx<0?bounds.right:bounds.left)*imageWidth;
    // Include a small margin for the sampled alpha bounds.
   const viewportEdge=dx<0?-24:innerWidth+24;
   const finalPan=(innerWidth*.5-childX)*((finalZoom-1)/4.2);
   exit=(viewportEdge-origin-finalPan)/finalZoom+origin-salonLayout.left-edge;
   exit=dx<0?Math.min(0,exit):Math.max(0,exit);
   const outer=imageLeft+(dx<0?bounds.left:bounds.right)*imageWidth;
   const projected=panX+focusX+(salonLayout.left+outer-focusX)*camZoom;
   nearEdge=dx<0?1-ease(0,innerWidth*.12,projected):ease(innerWidth*.88,innerWidth,projected);
  }
  // Linear travel avoids the old mid-animation acceleration. The initial wait
  // still follows depth, while the actual exit is opaque and through the edge.
   const travel=clamp((p-start)/((late?5.28:4.98)-start));
   // A central figure may never reach the edge through zoom alone. Let its final
   // travel finish progressively instead of multiplying it by a permanent zero.
   const edgeRelease=late?Math.max(nearEdge,ease(start,5.28,p)):nearEdge;
   el.style.transform=`translateX(${(exit*travel*edgeRelease).toFixed(2)}px)`;
   el.style.opacity='1';el.style.filter='none';
});
// El nene no tiene fade in propio: está siempre ahí (opacity 1), tapado por la gente que
// tiene delante en el z-index, y se revela solo porque esa gente se corre. Las dos poses
// (mirando el barrilete / mirando a cámara) se cruzan recién cuando el eje ya se fue.
const poseA=Q('.fh-salon-kid.pose-a',root),poseB=Q('.fh-salon-kid.pose-b',root),faceSwap=ease(5.28,5.38,p);
poseA.style.opacity=(1-faceSwap).toFixed(3);poseB.style.opacity=faceSwap.toFixed(3);
const followingFall=!!st.flight.followed;
const cameraY=followingFall?(fallCamera?(st.flight.cameraY||0):190*ease(st.flight.fallStart||6.24,6.86,p)):190*ease(6.4,6.86,p);
 const sky=layer('.fh-sky',p>=5.56&&p<7.5?1:ease(5.40,5.56,p)*(1-ease(7.5,7.6,p)));
sky.style.transform='';sky.style.backgroundPosition=`center ${-cameraY*innerHeight/100}px`;
skyWorld.style.transform=`translateY(${-cameraY}vh)`;
if(p>=5.4&&p<7.42){flight(dt,p);animateSky(p,dt)}else skyWasVisible=false;
const macro=layer('.fh-macro',1);
if(p>6.8&&p<7.12)macroDwell+=dt;
const burn=updatePaperBurn(p,dt);
const ending=layer('.fh-end',ease(5.4,5.56,p)*(1-ease(7.5,7.6,p)));const soldier=Q('.fh-soldiers',root),soldierCenter=ease(.65,1,burn);soldier.style.left=(68.36+(50-68.36)*soldierCenter)+'%';soldier.style.top=((258.84-cameraY)*(1-soldierCenter)+50*soldierCenter)+'%';soldier.inert=burn<1;ending.classList.toggle('fh-burn-complete',burn===1);Q('.fh-end-note',root).textContent=st.soldiers?'Este recuerdo va con vos.':'';
root.style.setProperty('--night',Math.max(ease(6.9,7.35,p),0));Q('.kitchen-tv').classList.toggle('fh-tv-lit',Q('.kitchen-tv').dataset.channel!=='0');
if(tipTarget&&(tipTarget.closest('[inert]')||!tipTarget.getClientRects().length)){tip.classList.remove('shown');tipTarget=null}
if(now-lastPersist>1000){st.kitchen=window.readKitchen?.();save();lastPersist=now}lastCurrent=p;
};
Q('.tv-switch').addEventListener('click',()=>{const n=Number(Q('.kitchen-tv').dataset.channel);hint(Q('.tv-switch'),n===0?'Encender la tele':n===5?'Apagar la tele':'Cambiar de canal')});hint(Q('.tv-switch'),'Encender la tele');
document.querySelectorAll('.kitchen-door').forEach(el=>{hint(el,el.getAttribute('aria-expanded')==='true'?'Cerrar la puerta':'Abrir la puerta');el.addEventListener('click',()=>hint(el,el.getAttribute('aria-expanded')==='true'?'Cerrar la puerta':'Abrir la puerta'))});
document.querySelectorAll('.kitchen-burger').forEach(el=>{hint(el,'Mirar de cerca');el.onclick=()=>{Q('img',dialog).src='assets/kitchen/hamburguesa-1.webp';dialog.showModal();Q('button',dialog).focus()}});
window.resetFirstHouse=()=>{fallCamera=null;flightStartedThisVisit=false;burnRun=null;burnVisible=0;fireVideo.pause();fireVideo.currentTime=0;drawPaperBurn(0);st=blank();macroDwell=0;window.laCasaCarry={soldiers:false};save();syncObjects();window.resetKitchen?.()};
const resetOld=$('reset-experience').onclick;$('reset-experience').onclick=async()=>{window.resetFirstHouse();await resetOld()};
const restartOld=restartFromWindow;restartFromWindow=function(){window.resetFirstHouse();restartOld()};
// Touch scrolling is navigation except while manipulating an object.
let touchY=null;window.addEventListener('touchstart',e=>{if(e.touches.length===1&&!e.target.closest('button,input,dialog'))touchY=e.touches[0].clientY;else touchY=null},{passive:true});window.addEventListener('touchmove',e=>{if(touchY===null||drag)return;const y=e.touches[0].clientY;const dy=touchY-y;touchY=y;if(Math.abs(dy)>1){e.preventDefault();navigateScroll(dy*2)}},{passive:false});window.addEventListener('touchend',()=>touchY=null);
window.addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>{if(document.hidden){cumbia?.pause();fireVideo.pause()}else if(partyActive&&cumbia&&sounding)cumbia.play().catch(()=>{})});
if(st.kitchen)window.restoreKitchen?.(st.kitchen);
syncObjects();
})();
