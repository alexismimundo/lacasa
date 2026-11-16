/* Primera casa — narrativa continua. Assets and optional cumbia are replaceable here. */
(()=>{'use strict';
const A={robot:'assets/low-robot.webp',money:'assets/first-house/money.webp',bag:'assets/first-house/bag.webp',bagClosed:'assets/first-house/bag-closed.webp',legs:'assets/first-house/legs.webp',children:'assets/first-house/children.webp',sleep:'assets/first-house/sleep.webp',kite:'assets/first-house/kite.webp',soldiers:'assets/first-house/soldiers.webp',paper:'assets/fondo-papel.webp',cumbia:null};
const key='la-casa-first-house-v2',blank=()=>({kept:[],bag:false,money:false,robot:false,box:false,shared:false,filters:[{x:33,y:28},{x:60,y:32}],flight:{phase:'ready',time:0,y:48,vy:0},burn:0,soldiers:false});
let st=blank();try{const v=JSON.parse(sessionStorage.getItem(key));if(v)st={...st,...v,flight:{...st.flight,...v.flight}}}catch{}
// This memory is offered again on every page load, not restored as already kept.
st.soldiers=false;st.burn=0;st.kept=st.kept.filter(id=>id!=='soldiers');
E.caja=E.caja.filter(item=>item.id!=='soldiers');guardarEstado();pintarCaja();
const save=()=>{try{sessionStorage.setItem(key,JSON.stringify(st))}catch{}},Q=(s,r=document)=>r.querySelector(s),clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)},reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const root=document.createElement('section');root.id='first-house';root.inert=true;root.setAttribute('aria-label','La primera casa');
const im=(src,cls='',alt='')=>`<img class="${cls}" data-src="${src}" alt="${alt}" decoding="async">`;
const skyDesigns=['azul','negro','azul-rombo','azul','azul-rombo','negro','azul-rombo'];
root.innerHTML=`<div class="fh-party fh-layer"><div class="fh-salon"><div class="fh-salon-bg"></div><div class="fh-salon-kid"></div><div class="fh-sp sp-12"></div><div class="fh-sp sp-11"></div><div class="fh-sp sp-10"></div><div class="fh-sp sp-9"></div><div class="fh-sp sp-8"></div><div class="fh-sp sp-7"></div><div class="fh-sp sp-6"></div><div class="fh-sp sp-5"></div><div class="fh-sp sp-4"></div><div class="fh-sp sp-3"></div><div class="fh-sp sp-2"></div><div class="fh-sp sp-1"></div><div class="fh-salon-tint"></div></div></div>
<div class="fh-shutter fh-layer"><div class="fh-metal-wall"></div><div class="fh-metal-roll"></div></div>
<div class="fh-sky fh-layer"><svg class="fh-kite-strings" aria-hidden="true">${[...skyDesigns,'usuario'].map((_,i)=>`<path class="kite-string-${i}" pathLength="1"/>`).join('')}</svg>${skyDesigns.map((color,i)=>`<div class="fh-distant distant-${i}" aria-hidden="true">${im('assets/barrilete/volador-'+color+'.png')}${im('assets/barrilete/cola-'+['azul','rosa','negro'][i%3]+'.png','fh-kite-tail')}</div>`).join('')}<div class="fh-kite-entry"><button class="fh-kite" aria-label="Hacé clic para mantenerlo en el aire">${im('assets/barrilete/volador-usuario.png')}${im('assets/barrilete/cola-rosa.png','fh-kite-tail')}</button></div></div>
<div class="fh-macro fh-layer"><div class="fh-macro-content">${im(A.kite,'fh-fallen-kite')}${im(A.robot,'fh-macro-robot')}${im(A.money,'fh-macro-money')}</div><div class="fh-burn-edge"></div><div class="fh-ash"></div></div>
<div class="fh-end fh-layer"><button class="fh-soldiers" aria-label="Llevar conmigo">${im(A.soldiers,'','Soldaditos verdes de plástico')}</button><p class="fh-end-note"></p><span class="fh-continue">Seguí bajando ↓</span></div><div class="fh-notice" role="status" aria-live="polite"></div>`;
$('inside').append(root);
// A viewport-sized room carries the internal zoom without painting over its neighbour.
const salonViewport=document.createElement('div');salonViewport.className='fh-salon-viewport';
salonViewport.style.cssText='position:absolute;inset:0;overflow:hidden;z-index:9';
salonViewport.append(Q('.fh-party',root),Q('.fh-shutter',root));root.prepend(salonViewport);
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
// Same stepped light failures as teaser-gate; swap the scene during full blackout.
const endingBlack=document.createElement('div');endingBlack.className='fh-ending-black';endingBlack.hidden=true;
const endingCut=document.createElement('div');endingCut.className='fh-ending-cut';endingCut.setAttribute('aria-hidden','true');endingCut.hidden=true;
root.append(endingBlack,endingCut);
const endingCuts=[[0,0],[.06,1],[.12,0],[.29,.73],[.35,0],[.42,1],[.60,1],[.61,0],[.77,.92],[.83,0],[1,0]];
let endingRun=null;
function resetEnding(){
 endingRun=null;endingBlack.hidden=endingCut.hidden=true;endingCut.style.opacity='0';
 root.classList.remove('fh-ending-centered');
}
function updateEnding(p,dt){
 if(p<6.8){resetEnding();return false}
 if(p>=7.6)return !!endingRun?.swapped;
 // Allow the landing composition to register before the cut, without another gesture.
 if(!endingRun&&(st.flight.landed||p>=6.88))endingRun={elapsed:0,swapped:false,done:false,collected:false};
 if(!endingRun)return false;
 if(!document.hidden)endingRun.elapsed+=Math.min(Math.max(dt,0),.05);
 const t=endingRun.elapsed,duration=reduced()?0:1;
 if(t>=0){
  endingCut.hidden=t>=duration;
  let opacity=0;for(const [at,value] of endingCuts){if(at>t)break;opacity=value}
  endingCut.style.opacity=String(opacity);
    if(!endingRun.swapped&&(duration===0||t>=.5)){
   endingRun.swapped=true;endingBlack.hidden=false;root.classList.add('fh-ending-centered');
   st.burn=1;syncObjects();save();
  }
    // Keep the cut, then offer the click-to-save action.
   if(t>=duration)endingRun.done=true;
 }
 return endingRun.swapped;
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
 robot.remove();money.remove();
  // The kitchen precedes the box introduction; memories remain available elsewhere.
robot.onclick=()=>{if(recien(robot)||performance.now()<robotUntil)return;if(!st.robot){st.robot=true;robotUntil=performance.now()+1800;robot.classList.add('walking');hint(robot,'Está caminando');setTimeout(()=>{robot.classList.remove('walking');robot.classList.add('walked');hint(robot,'Arrastrá a la caja');save()},1800)}};
bag.onclick=()=>{st.bag=!st.bag;Q('img',bag).src=st.bag?A.bag:A.bagClosed;bag.classList.toggle('open',st.bag);bag.setAttribute('aria-expanded',String(st.bag));hint(bag,st.bag?'Cerrar la mochila':'Abrir la mochila');save()};
money.onclick=()=>{if(recien(money))return;if(!st.money){st.money=true;money.classList.add('unfolded');hint(money,'Arrastrá a la caja');save()}};
Object.assign(COSAS,{money:{nombre:'Cuatro pesos de la cocina',src:A.money,unica:true},soldiers:{nombre:'Soldaditos azules de plástico',src:'assets/objetos-incendio/soldiers-azul.webp',unica:true}});
[[robot,'robot'],[money,'money']].forEach(([el,id])=>hacerGuardable(el,id,{alGuardar:()=>keep(id)}));
st.kept.forEach(id=>{if(COSAS[id]&&!enCaja(id))guardar(id,{silencioso:true})});
// --- Caja 3D: aparece sola en la pantalla siguiente y queda como acceso en la esquina ---
const boxCanvas=document.createElement('canvas');boxCanvas.id='fh-model-box';boxCanvas.style.touchAction='none';boxCanvas.setAttribute('role','button');boxCanvas.setAttribute('aria-label','La caja de zapatillas');boxCanvas.tabIndex=0;document.body.append(boxCanvas);
const boxLidHint=document.createElement('span');boxLidHint.id='fh-box-lid-hint';boxLidHint.setAttribute('role','tooltip');boxLidHint.hidden=true;
const boxScrollHint=document.createElement('p');boxScrollHint.id='fh-box-scroll-hint';boxScrollHint.textContent='ARRASTRÁ PARA GIRAR · SCROLLEÁ PARA SEGUIR ↓';boxScrollHint.hidden=true;document.body.append(boxLidHint,boxScrollHint);
boxCanvas.setAttribute('aria-describedby','fh-box-scroll-hint');
let boxDropHover=false;
window.casaBoxDropHover=(x,y)=>{const r=boxCanvas.getBoundingClientRect(),visible=getComputedStyle(boxCanvas).visibility!=='hidden';boxDropHover=current>=.98&&visible&&Number.isFinite(x)&&Number.isFinite(y)&&x>=r.left-45&&x<=r.right+45&&y>=r.top-45&&y<=r.bottom+45;boxCanvas.classList.toggle('drop-opening',boxDropHover)};
let mvRotatable=false,mvPointerMoved=false,box3d=null,boxOpen=false,openAnim=0,wiggleT=0,dragging=false,dragStartX=0,dragStartRotY=0;
window.laCasaBoxOpening=0;
function initMemoryCard3D(THREE,scene,size,renderer){
 const group=new THREE.Group();group.name='box-memory-card';group.visible=false;scene.add(group);
 const width=Math.min(size.x,size.z)*.70,height=width*1040/744;
 const basePlane=new THREE.Plane(new THREE.Vector3(0,1,0),size.y*.5),clipPlane=basePlane.clone();
 const geometry=new THREE.PlaneGeometry(width,height),loader=new THREE.TextureLoader();
 for(const [i,src] of ['03-frente.png','02-dorso.png'].entries()){
  const texture=loader.load('assets/Memorias/'+src,()=>{lastBoxFrame=''});texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
  const face=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.05,depthTest:true,depthWrite:true,clippingPlanes:[clipPlane]}));
  face.name=i?'memory-back':'memory-front';face.position.z=i?-.0002:.0002;if(i)face.rotation.y=Math.PI;group.add(face);
 }
 group.scale.setScalar(.55);
  return {group,size,height,basePlane,clipPlane,progress:0,enlarged:false,zoom:.55,point:new THREE.Vector3(),turn:new THREE.Quaternion(),axis:new THREE.Vector3(0,1,0)};
}
function renderMemoryCard(inside,p,dt){
 const card=box3d?.card;if(!card)return;
 const active=inside&&p>=1.73&&(p<2.1||card.progress>0),wanted=active&&boxOpen&&p<=1.85&&target<=1.85;
 const goal=wanted&&openAnim>.65?1:0;
 card.progress=reduced()?goal:clamp(card.progress+(goal>card.progress?1:goal<card.progress?-1:0)*Math.min(.05,Math.max(0,dt))/(wanted?.85:.70));
 if(!active)card.progress=0;
 const t=card.progress,rise=ease(0,1,t);card.group.visible=active&&t>0;
 if(!wanted)card.enlarged=false;
 // Keep the approved reading size, with a much smaller everyday card.
 const zoomGoal=card.enlarged?1.28:.55;
 card.zoom=reduced()?zoomGoal:card.zoom+(zoomGoal-card.zoom)*(1-Math.exp(-Math.max(0,dt)*10));
 card.group.scale.setScalar(card.zoom);
 // The base clipping plane follows the rig; no part can leak below the box.
 // Settle low, overlapping the body rather than floating above the lid.
 const start=-card.size.y*.30-card.height*.5,end=card.size.y*.12+card.height*.18;
 card.point.set(0,start+(end-start)*rise,0);
 box3d.rig.updateWorldMatrix(true,false);card.clipPlane.copy(card.basePlane).applyMatrix4(box3d.rig.matrixWorld);box3d.rig.localToWorld(card.point);card.group.position.copy(card.point);
 // Start with the back facing out; a single half-turn reveals the front.
 card.turn.setFromAxisAngle(card.axis,Math.PI*(1-rise));
 // Keep the card upright relative to the box and rotate both together.
 card.group.quaternion.copy(box3d.rig.quaternion).multiply(card.turn);
}
function initBox3D(){
 const THREE=window.__THREE,GLTFLoader=window.__GLTFLoader;
 const renderer=new THREE.WebGLRenderer({canvas:boxCanvas,alpha:true,antialias:true});
 renderer.localClippingEnabled=true;
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
    modelRoot.traverse(o=>{if(o.isMesh&&o.material){o.material.map=tex;o.material.needsUpdate=true}});lastBoxFrame='';
  });
   box3d={renderer,scene,camera,rig,tapa,openQuat,closedQuat,card:initMemoryCard3D(THREE,scene,size,renderer),homeRotation:null,raycaster:new THREE.Raycaster(),pointer:new THREE.Vector2(),lastW:0,lastH:0};
 },undefined,err=>{console.warn('caja 3D: no se pudo cargar el modelo',err);boxCanvas.classList.add('fh-mv-fallback')});
}
if(window.__THREE)initBox3D();else window.addEventListener('three-ready',initBox3D,{once:true});
setTimeout(()=>{if(!window.__THREE){console.warn('caja 3D: no cargó three.js (CDN inaccesible o bloqueado); se muestra una imagen fija de reemplazo');boxCanvas.classList.add('fh-mv-fallback')}},4000);
boxCanvas.addEventListener('pointerdown',e=>{mvPointerMoved=false;if(mvRotatable&&box3d){dragging=true;dragStartX=e.clientX;dragStartRotY=box3d.rig.rotation.y;boxCanvas.setPointerCapture(e.pointerId)}});
boxCanvas.addEventListener('pointermove',e=>{if(!dragging||!box3d)return;const dx=e.clientX-dragStartX;if(Math.abs(dx)>3)mvPointerMoved=true;box3d.rig.rotation.y=dragStartRotY+dx*.012});
const endBoxDrag=()=>{dragging=false};
boxCanvas.addEventListener('lostpointercapture',endBoxDrag);
function boxHintsVisible(p=current){return adentro()&&p>=1.73&&p<=1.85&&target<=1.85&&!document.hidden}
boxCanvas.addEventListener('pointermove',e=>{
 boxLidHint.hidden=true;
 if(e.pointerType==='touch'||dragging||!mvRotatable||!box3d||!boxHintsVisible())return;
 const rect=boxCanvas.getBoundingClientRect(),{raycaster,pointer,camera,tapa,scene}=box3d;
 pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
 scene.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);
 const card=box3d.card,hit=card.group.visible?raycaster.intersectObject(card.group,true)[0]:null,wall=raycaster.intersectObject(box3d.rig,true)[0];
 const overCard=hit&&card.clipPlane.distanceToPoint(hit.point)>=0&&(!wall||hit.distance<wall.distance);
 if(!overCard&&!raycaster.intersectObject(tapa,true).length)return;
 boxLidHint.textContent=overCard?(card.enlarged?'REDUCIR':'LEER'):(boxOpen?'CERRAR':'ABRIR');boxLidHint.hidden=false;
 boxLidHint.style.left=Math.max(8,Math.min(innerWidth-125,e.clientX+14))+'px';boxLidHint.style.top=Math.max(8,Math.min(innerHeight-35,e.clientY+18))+'px';
});
boxCanvas.addEventListener('pointerleave',()=>{boxLidHint.hidden=true});
boxCanvas.addEventListener('pointerdown',()=>{boxLidHint.hidden=true});
window.addEventListener('blur',()=>{boxLidHint.hidden=true});
boxCanvas.addEventListener('pointerup',endBoxDrag);boxCanvas.addEventListener('pointercancel',endBoxDrag);
boxCanvas.addEventListener('click',e=>{
 if(mvPointerMoved)return;
 if(box3d&&boxOpen&&box3d.card.progress===1&&Number.isFinite(e.clientX)&&e.detail){
  const {raycaster,pointer,camera,scene,card,rig}=box3d,r=boxCanvas.getBoundingClientRect();
  pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);scene.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);
  const hit=raycaster.intersectObject(card.group,true)[0],wall=raycaster.intersectObject(rig,true)[0];
  if(hit&&card.clipPlane.distanceToPoint(hit.point)>=0&&(!wall||hit.distance<wall.distance)){card.enlarged=!card.enlarged;return}
 }
 const p=current;
 if(p<1.58){wiggleT=.5}
  else if(mvRotatable){boxOpen=!boxOpen;boxLidHint.textContent=boxOpen?'CERRAR':'ABRIR'}
 else if(p>=2.62){abrirCaja(true)}
});
boxCanvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&(mvRotatable||current>=2.62)){e.preventDefault();e.stopPropagation();if(mvRotatable){boxOpen=!boxOpen;boxLidHint.textContent=boxOpen?'CERRAR':'ABRIR'}else abrirCaja(true)}});
let boxReceivingUntil=0;
window.addEventListener('la-casa:box-receive',()=>{boxReceivingUntil=performance.now()+950});
function positionModelBox(p,dt){
 const boxInteractive=p>=1.73&&p<2.1;
 const showBoxHints=boxHintsVisible(p);
 boxScrollHint.hidden=!showBoxHints;
 if(!showBoxHints)boxLidHint.hidden=true;
  const mvActive=p>=1.6;
 boxCanvas.style.visibility=mvActive?'visible':'hidden';
 boxCanvas.style.pointerEvents=mvActive&&(boxInteractive||p>=2.62)?'auto':'none';
  if(!mvActive){boxDropHover=false;boxOpen=false;openAnim=0;mvRotatable=false;dragging=false;window.laCasaBoxOpening=0;return}
 // The box enters as a solid object, never through an opacity fade.
 boxCanvas.style.opacity='1';
 let rect;
 {
  const popW=Math.min(innerWidth*.84,1120),popH=popW*.67;
  const pop={left:(innerWidth-popW)/2,top:(innerHeight-popH)/2,width:popW,height:popH};
   const cornerW=Math.min(336,innerWidth*.66),cornerH=cornerW*114/180;
  const corner={left:innerWidth-18-cornerW,top:innerHeight-14-cornerH,width:cornerW,height:cornerH};
  // Cocina → caja → vídeo. Dock before the film fills the screen.
  const shrink=ease(1.85,2.1,p);
  const lerp=(a,b,t)=>a+(b-a)*t;
  if(shrink<=0){
   rect=pop;
  }else{
   rect={left:lerp(pop.left,corner.left,shrink),top:lerp(pop.top,corner.top,shrink),width:lerp(pop.width,corner.width,shrink),height:lerp(pop.height,corner.height,shrink)};
   // Retract the card before closing the lid, even while docking.
   if(shrink>0&&boxOpen)boxOpen=false;
  }
 }
   const arrival=houseRoute.vector(Math.max(0,Math.min(1,(1.85-p)/.25)),1.6,reduced());
  boxCanvas.style.left=(rect.left+arrival.x*innerWidth)+'px';boxCanvas.style.top=(rect.top+arrival.y*innerHeight)+'px';boxCanvas.style.width=rect.width+'px';boxCanvas.style.height=rect.height+'px';
 if(showBoxHints){boxScrollHint.style.left=(rect.left+arrival.x*innerWidth+rect.width/2)+'px';boxScrollHint.style.top=Math.min(innerHeight-48,rect.top+arrival.y*innerHeight+rect.height*.94)+'px'}
 mvRotatable=boxInteractive;
 if(!mvRotatable&&dragging)dragging=false;
 if(!box3d)return;
  // Blend the user's rotation back to the same frontal pose as it docks.
   if(p<=1.85||dragging||boxOpen)box3d.homeRotation=null;
  else if(p>=2.1){box3d.rig.rotation.y=0;box3d.homeRotation=null}
  else{
   if(box3d.homeRotation===null)box3d.homeRotation=Math.atan2(Math.sin(box3d.rig.rotation.y),Math.cos(box3d.rig.rotation.y));
   box3d.rig.rotation.y=box3d.homeRotation*(1-ease(1.85,2.1,p));
  }
  // Keep GPU attachments stable throughout docking; CSS handles the visible size.
  // Reallocating the drawing buffer every frame stalls the shrinking passage.
   const renderWidth=p<2.1?Math.min(innerWidth*.84,1120):Math.min(336,innerWidth*.66);
  const w=Math.max(1,Math.round(renderWidth)),h=Math.max(1,Math.round(renderWidth*(p<2.1?.67:114/180)));
  if(w!==box3d.lastW||h!==box3d.lastH){box3d.renderer.setSize(w,h,false);box3d.lastW=w;box3d.lastH=h}
  const aspect=rect.width/rect.height;
  if(Math.abs(box3d.camera.aspect-aspect)>.00001){box3d.camera.aspect=aspect;box3d.camera.updateProjectionMatrix()}
 if(wiggleT>0){wiggleT=Math.max(0,wiggleT-dt);box3d.rig.rotation.z=Math.sin(wiggleT*46)*wiggleT*1.6}
 else if(box3d.rig.rotation.z)box3d.rig.rotation.z=0;
   const targetOpen=(performance.now()<boxReceivingUntil||boxOpen||box3d.card.progress>0||(p>=.95&&boxDropHover))?1:0;openAnim+=(targetOpen-openAnim)*(1-Math.exp(-Math.max(0,dt)*8));
 window.laCasaBoxOpening=openAnim;
 box3d.tapa.quaternion.slerpQuaternions(box3d.closedQuat,box3d.openQuat,openAnim);
}
// Los clics conservan sus pequeñas acciones; guardar requiere arrastrar a la caja.
function syncObjects(){robot.inert=money.inert=st.burn>0;robot.hidden=st.kept.includes('robot');money.hidden=st.kept.includes('money');bag.classList.toggle('open',st.bag);Q('img',bag).src=st.bag?A.bag:A.bagClosed;money.classList.toggle('unfolded',st.money);robot.classList.toggle('walked',st.robot);hint(robot,st.robot?'Guardar en la caja':'Ponerlo a andar');hint(bag,st.bag?'Cerrar la mochila':'Abrir la mochila');hint(money,st.money?'Guardar en la caja':'Desplegar el billete');
Q('.fh-soldiers',root).setAttribute('aria-label','Soldaditos azules de plástico');Q('.fh-soldiers',root).hidden=st.soldiers||enCaja('soldiers');if(st.robot)hint(robot,'Arrastrá a la caja');if(st.money)hint(money,'Arrastrá a la caja')}
 survivor.onclick=()=>{
  if(survivor.inert||st.soldiers||!endingRun?.done)return;
   if(guardar('soldiers',{desde:survivor})){collectSoldiers();tip.classList.remove('shown');tipTarget=null;setTimeout(()=>{if(st.soldiers&&adentro()){target=current=7.65}},reduced()?0:1300)}
 };
function collectSoldiers(){
 if(!enCaja('soldiers'))return;
 st.soldiers=true;survivor.hidden=true;save();syncObjects();
 window.laCasaCarry={soldiers:true};window.dispatchEvent(new CustomEvent('la-casa:carry',{detail:window.laCasaCarry}));
}
survivor.setAttribute('aria-label','Soldaditos. Arrastrá este recuerdo a tu caja o seguí scrolleando');
hint(survivor,'GUARDAR');
const memoryPrompt=Q('.fh-end-note',root);memoryPrompt.id='fh-soldiers-prompt';
memoryPrompt.textContent='';
survivor.setAttribute('aria-describedby',memoryPrompt.id);
const nextHouse=document.createElement('section');nextHouse.id='fh-next-house';nextHouse.setAttribute('aria-label','Gabriela Mistral 4860');
 nextHouse.innerHTML='<h2 aria-label="Gabriela Mistral 4860">Gabriela Mistral 4860</h2><canvas class="fh-next-dark" aria-hidden="true"></canvas>';
const nextHeading=nextHouse.querySelector('h2');
nextHeading.textContent='';
for(const word of ['Gabriela','Mistral','4860']){
 const group=document.createElement('span');group.className='ink-word';
 for(const char of word){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}
 nextHeading.append(group,document.createTextNode(' '));
}
document.body.append(nextHouse);nextHouse.hidden=true;
const nextHint=document.createElement('p');nextHint.className='fh-continue fh-next-continue';nextHint.textContent='SEGUÍ SCROLLEANDO ↓';nextHouse.append(nextHint);
const nextDark=nextHouse.querySelector('.fh-next-dark');let nextLight={x:.5,y:.5};
 const lightPhrase=document.createElement('p');lightPhrase.id='fh-light-phrase';lightPhrase.className='memory-phrase';lightPhrase.setAttribute('aria-label','"La vida está en ti" me dices después que pueda ver salir la vida de tu piel.');
 const lightWords=['"La vida está en ti" me dices','después que pueda ver salir','la vida de tu piel.'];
 lightWords.forEach(text=>{
  const word=document.createElement('span');word.className='fh-light-line';
  for(const part of text.split(' ')){const group=document.createElement('span');group.className='ink-word';for(const char of part){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}word.append(group,document.createTextNode(' '))}
  lightPhrase.append(word,document.createTextNode(' '));
 });nextHouse.insertBefore(lightPhrase,nextDark);
 const lightCtx=nextDark.getContext('2d'),lightStamp=document.createElement('canvas'),lightImage=new Image();let lightReady=false;
 lightImage.onload=()=>{
  lightStamp.width=lightImage.naturalWidth;lightStamp.height=lightImage.naturalHeight;
  const context=lightStamp.getContext('2d');context.drawImage(lightImage,0,0);
  const pixels=context.getImageData(0,0,lightStamp.width,lightStamp.height);
  for(let i=0;i<pixels.data.length;i+=4){
   const luminance=(pixels.data[i]*.2126+pixels.data[i+1]*.7152+pixels.data[i+2]*.0722)/255;
   // Suppress the white frame; fade the stamp edges without a circular halo.
   const x=(i/4)%lightStamp.width,y=Math.floor(i/4/lightStamp.width),edge=Math.min(x,y,lightStamp.width-1-x,lightStamp.height-1-y);
   pixels.data[i+3]*=Math.max(0,(luminance-.12)/.88)*Math.min(1,edge/28);
  }
  context.putImageData(pixels,0,0);lightReady=true;nextDark.dataset.mask='linterna';
 };
 lightImage.src='assets/linterna.png';
  // Only the flashlight flutters; ambient full-page blackouts stay disabled.
  function nextLightStrength(seconds){
   return reduced()?1:.60+Math.sin(seconds*7.1)*.23+Math.sin(seconds*11.3+.7)*.10+Math.sin(seconds*3.7+1.2)*.06;
  }
  function paintNextLight(){
  const width=Math.round(innerWidth),height=Math.round(innerHeight);
  if(nextDark.width!==width||nextDark.height!==height){nextDark.width=width;nextDark.height=height}
  lightCtx.globalCompositeOperation='source-over';lightCtx.fillStyle='#000';lightCtx.fillRect(0,0,width,height);
  if(!lightReady)return;
   const size=Math.min(width,height)*.38,h=size*lightStamp.height/lightStamp.width;
   lightCtx.globalCompositeOperation='destination-out';lightCtx.globalAlpha=nextLightStrength(performance.now()/1000);
   lightCtx.drawImage(lightStamp,nextLight.x*width-size/2,nextLight.y*height-h/2,size,h);
   lightCtx.globalAlpha=1;lightCtx.globalCompositeOperation='source-over';
 }
nextHouse.addEventListener('pointermove',e=>{nextLight={x:e.clientX/innerWidth,y:e.clientY/innerHeight}});
nextHouse.addEventListener('pointerdown',e=>{nextLight={x:e.clientX/innerWidth,y:e.clientY/innerHeight}});
function renderNextHouse(inside,p){
 const visible=inside&&p>=7.28,finished=visible&&p>=8.6;nextHouse.hidden=!visible;
 nextHouse.classList.toggle('awaiting-next-scene',finished);
 nextHint.hidden=!visible||p>=8.02;
 nextHouse.classList.toggle('flashlight-active',visible&&p>=8.02&&!finished);
  const illuminating=visible&&p>=8.02&&!finished;lightPhrase.style.visibility=illuminating?'visible':'hidden';
  if(illuminating){const time=performance.now()/1000;[...lightPhrase.children].forEach((line,i)=>{const phase=time/(14+i*3)*Math.PI*2;line.style.transform=reduced()?'none':`translate(${((i%2?-1:1)*Math.sin(phase)*(12+i*3)).toFixed(2)}px,${(Math.sin(phase*.7+i)*3).toFixed(2)}px)`})}
  if(illuminating)paintNextLight();
 // One uninterrupted scroll-driven rise; no resting interval at the center.
 const heading=nextHouse.querySelector('h2'),progress=clamp((p-7.28)/(8.02-7.28)),opacity=Math.sin(Math.PI*progress);
 heading.style.opacity=String(opacity);heading.style.visibility=visible&&opacity>.001?'visible':'hidden';heading.style.transform=`translate(-50%,calc(-50% + ${(5-progress*10).toFixed(3)}vh))`;
 nextDark.style.setProperty('--light-x',nextLight.x*100+'%');nextDark.style.setProperty('--light-y',nextLight.y*100+'%');
 nextHouse.style.opacity='1';
}
window.laCasaCarry={soldiers:st.soldiers};
const kite=Q('.fh-kite',root);let tug=0;
// Runtime steering does not persist across visits or replace the click impulse.
const steering={x:null,y:48,offset:0,pointer:null,idle:Infinity,lastX:null,lastY:null};
function kiteSteeringStep(offset,target,dt){return offset+(target-offset)*(1-Math.exp(-3.5*Math.max(0,Math.min(.05,dt))))}
const skyKites=[...root.querySelectorAll('.fh-distant')],kiteEntry=Q('.fh-kite-entry',root),skyStrings=[...root.querySelectorAll('.fh-kite-strings path')];
loadImages(kiteEntry);
// Only the portion of the kite beyond the salon's clip is painted separately.
// The original stays in the child's layer, behind the woman and other guests.
const crossingKite=document.createElement('canvas');
crossingKite.className='fh-crossing-kite';crossingKite.setAttribute('aria-hidden','true');
crossingKite.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:10;pointer-events:none';
root.append(crossingKite);
function paintCrossingKite(p){
 crossingKite.hidden=!(p>=5.28&&p<5.70);
 if(crossingKite.hidden)return;
 const ratio=Math.min(devicePixelRatio||1,2),w=Math.round(innerWidth*ratio),h=Math.round(innerHeight*ratio);
 if(crossingKite.width!==w||crossingKite.height!==h){crossingKite.width=w;crossingKite.height=h}
 const ctx=crossingKite.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,innerWidth,innerHeight);
 const viewport=salonViewport.getBoundingClientRect();
 // Exclude the entire outgoing viewport: its crowd already occludes the real kite.
 ctx.save();ctx.beginPath();ctx.rect(0,0,innerWidth,innerHeight);
 ctx.rect(viewport.left,viewport.top,viewport.width,viewport.height);ctx.clip('evenodd');
 if(playerString.dataset.crossingPath){
  ctx.strokeStyle='rgba(51,83,134,.32)';ctx.lineWidth=.28;
  ctx.stroke(new Path2D(playerString.dataset.crossingPath));
 }
 const child=Q('.fh-salon-kid',root),rect=child.getBoundingClientRect(),s=rect.width/child.clientWidth;
 const m=new DOMMatrix(getComputedStyle(kite).transform);
 ctx.setTransform(ratio*m.a*s,ratio*m.b*s,ratio*m.c*s,ratio*m.d*s,ratio*(rect.left+m.e*s),ratio*(rect.top+m.f*s));
 for(const image of kite.querySelectorAll('img')){
  if(!image.complete||!image.naturalWidth)continue;
  const style=getComputedStyle(image),im=new DOMMatrix(style.transform==='none'?undefined:style.transform),origin=style.transformOrigin.split(' ').map(parseFloat);
  ctx.save();ctx.translate(image.offsetLeft+origin[0],image.offsetTop+origin[1]);ctx.transform(im.a,im.b,im.c,im.d,im.e,im.f);ctx.translate(-origin[0],-origin[1]);
  ctx.drawImage(image,0,0,image.clientWidth,image.clientHeight);ctx.restore();
 }
 ctx.restore();
}
// One physical kite: held over the updated photo, then carried into the sky.
function updateHeldKite(p){
 const crossing=p>5.05&&p<5.70;
  salonViewport.style.overflow='hidden';
 Q('.fh-salon',root).style.overflow=crossing?'visible':'hidden';
 if(p>=5.70){
  if(kiteEntry.parentNode!==skyWorld)skyWorld.append(kiteEntry);
  kiteEntry.style.zIndex='';
  crossingKite.hidden=true;
   if(playerString.parentNode!==skyWorld)skyWorld.append(playerString);
   skyStrings[skyKites.length].removeAttribute('transform');
   delete playerString.dataset.crossingPath;
  return;
 }
 const child=Q('.fh-salon-kid',root),held=p<=5.05;
 const parent=child;
 if(kiteEntry.parentNode!==parent)parent.append(kiteEntry);
 // Stay inside the child's stacking context throughout release: the woman
 // must occlude the kite until the whole salon has left the viewport.
 kiteEntry.style.zIndex='3';kiteEntry.style.transform='none';
 kiteEntry.style.visibility=p>=2.1&&p<5.70?'visible':'hidden';
 kiteEntry.style.opacity='1';kite.inert=true;
 const rect=child.getBoundingClientRect();
 const width=held?child.clientWidth:rect.width,height=held?child.clientHeight:rect.height;
 const scale=Math.max(width/3072,height/2048);
 const ox=(held?0:rect.left)+(width-3072*scale)/2,oy=(held?0:rect.top)+(height-2048*scale)/2;
 const w=kite.offsetWidth,h=kite.offsetHeight;if(!w||!h)return;
 const t=ease(5.05,5.70,p),mix=(a,b)=>a+(b-a)*t;
 const finalY=innerHeight*.48;
 // Upper tip (top midpoint) rests at (1650,1550), between the fingers.
 // A foreshortened transverse axis and long sideways axis lay the kite down.
 const a=mix(130*scale/w,1),b=mix(-95*scale/w,0);
 const c=mix(270*scale/h,0),d=mix(110*scale/h,1);
 const x=mix(ox+1585*scale,innerWidth*.5-w/2);
 const y=mix(oy+1597.5*scale,finalY-h/2);
 kite.style.left='0px';kite.style.top='0px';kite.style.transformOrigin='0 0';
 const parentScale=rect.width/child.clientWidth;
 kite.style.transform=held?`matrix(${a},${b},${c},${d},${x},${y})`:
  `matrix(${a/parentScale},${b/parentScale},${c/parentScale},${d/parentScale},${(x-rect.left)/parentScale},${(y-rect.top)/parentScale})`;
 kiteEntry.dataset.release=String(t);
 updateReleaseString(p,t);
 paintCrossingKite(p);
}
// Keep the player's line above the heap, independent of the distant strings.
const playerString=document.createElementNS('http://www.w3.org/2000/svg','svg');
playerString.setAttribute('class','fh-player-string');playerString.setAttribute('aria-hidden','true');
playerString.append(skyStrings[skyKites.length]);skyWorld.append(playerString);
// Loose thread: smooth, broad bends with anchored ends, never sharp zigzags.
function looseKiteThread(x,y,endX,endY,index,time,still=false){
 const dx=endX-x,dy=endY-y,length=Math.hypot(dx,dy),nx=length?-dy/length:0,ny=length?dx/length:0;
 const slack=Math.min(length*.16,innerWidth*.065),wind=still?0:time*.65+index*1.7;
 const points=Array.from({length:13},(_,i)=>{
  const t=i/12,envelope=Math.sin(Math.PI*t);
  const bend=slack*envelope*(.85+(still?0:Math.sin(wind)*.22)+.32*Math.sin(2*Math.PI*t-wind));
  return {x:x+dx*t+nx*bend,y:y+dy*t+ny*bend+slack*.5*envelope};
 });
 let d=`M ${x} ${y}`;
 for(let i=0;i<12;i++){
  const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],e=points[Math.min(12,i+2)];
  d+=` C ${b.x+(c.x-a.x)/6} ${b.y+(c.y-a.y)/6}, ${c.x-(e.x-b.x)/6} ${c.y-(e.y-b.y)/6}, ${c.x} ${c.y}`;
 }
 return d;
}
function updateReleaseString(p,t){
 const child=Q('.fh-salon-kid',root),rect=child.getBoundingClientRect(),s=rect.width/child.clientWidth;
 if(playerString.parentNode!==child)child.append(playerString);
 const path=skyStrings[skyKites.length],m=new DOMMatrix(getComputedStyle(kite).transform);
 const x=rect.left+s*(m.e+m.a*kite.offsetWidth*.5+m.c*kite.offsetHeight*.98);
 const y=rect.top+s*(m.f+m.b*kite.offsetWidth*.5+m.d*kite.offsetHeight*.98);
 const imageScale=Math.max(rect.width/3072,rect.height/2048);
 const handX=rect.left+(rect.width-3072*imageScale)/2+1650*imageScale;
 const handY=rect.top+(rect.height-2048*imageScale)/2+1550*imageScale;
 const mix=(a,b)=>a+(b-a)*t,w=innerWidth,h=innerHeight;
 const endX=mix(handX,w*.29),endY=mix(handY,h*1.15);
 const d=pinkKiteThread(x,y,endX,endY,Math.max(0,p-5.28)*4,reduced());
 path.setAttribute('d',d);path.setAttribute('transform',`matrix(${1/s} 0 0 ${1/s} ${-rect.left/s} ${-rect.top/s})`);
 path.style.visibility=p>=5.05?'visible':'hidden';path.style.strokeDasharray='none';path.style.strokeDashoffset='0';
 path.style.strokeWidth='.28';path.style.strokeOpacity='.32';
 playerString.style.zIndex='2';playerString.dataset.crossingPath=p>=5.05?d:'';
}
function pinkKiteThread(x,y,endX,endY,time,still){
 const dx=endX-x,dy=endY-y,length=Math.hypot(dx,dy);
 const slack=Math.min(length*.12,innerWidth*.045);
 const breeze=still?0:Math.sin(time*.7)*slack*.35;
 // One relaxed hanging arc, not a travelling wave; the upper end tracks the tail.
 return `M ${x} ${y} C ${x+dx*.18+breeze} ${y+dy*.38+slack}, ${endX-dx*.24+breeze*.6} ${endY-dy*.25+slack*.6}, ${endX} ${endY}`;
}
let skyTime=0,skyWasVisible=false,flightStartedThisVisit=false;
let skyEntryClock=0;
let fallCamera=null;
const flightReady=5.64,flightGate=5.70,flightPrompt=document.createElement('p');
flightPrompt.className='fh-flight-start';flightPrompt.textContent='NO DEJES CAER EL BARRILETE';flightPrompt.hidden=true;Q('.fh-sky',root).append(flightPrompt);
const flightWarning=document.createElement('p');flightWarning.className='fh-flight-start fh-flight-warning';flightWarning.textContent='NO DEJES CAER EL BARRILETE';flightWarning.hidden=true;flightWarning.setAttribute('role','status');Q('.fh-sky',root).append(flightWarning);
// The child camera follows the shared scroll phase in both directions.
window.firstHouseScrollLimit=(next,step)=>{
 if(!adentro())return next;
 if(fallCamera)return target;
 if(endingRun&&!st.soldiers&&step>0)return 6.9;
 if(step>0&&current>=6.8&&current<7.3&&!endingRun)return Math.min(next,6.9);
  // Navigation never waits for a click; launch follows the visible scroll phase.
 return next;
};
function animateSky(p,dt){
 kite.style.transformOrigin='50% 50%';
 const still=reduced();
 if(!flightStartedThisVisit&&st.flight.phase!=='ready')st.flight={phase:'ready',time:0,y:48,vy:0};
 skyWasVisible=true;
  // During the reveal, even the wind follows scroll and freezes when it stops.
  // Continue from that exact clock once the sky has fully arrived.
  if(p<flightGate){skyTime=(p-5.28)*4;skyEntryClock=skyTime}
  else if(!document.hidden){skyTime=Math.max(skyTime,skyEntryClock)+Math.min(Math.max(dt,0),.05)}
 const w=innerWidth,h=innerHeight;
   function string(index,x,y,entry=1,offsetX=0,offsetY=0,depth=1){
   const settling=index===skyKites.length?ease(0,1,st.flight.fallProgress||0):0;
    const endX=w*(.15+(index%6)*.14+settling*.35)+offsetX,endY=h*(1.15+settling*1.34)+offsetY;
   const path=skyStrings[index];
   path.style.visibility=entry>0?'visible':'hidden';
   path.style.strokeDasharray='1';path.style.strokeDashoffset=String(1-entry);
     path.style.strokeWidth=clamp(.28*Math.sqrt(depth),.12,.5).toFixed(3);
     path.style.strokeOpacity=clamp(.24+depth*.08,.26,.42).toFixed(3);
   skyStrings[index].setAttribute('d',index===skyKites.length?pinkKiteThread(x,y,endX,endY,skyTime,still):looseKiteThread(x,y,endX,endY,index,skyTime,still));
 }
 skyKites.forEach((el,i)=>{
     // Rise from behind the outgoing shutter, opaque and tied only to scroll.
     const delay=[0,.045,.09,.02,.07,.12,.055][i];
     const entry=1,offsetX=0,offsetY=(1-ease(5.28+delay,5.70,p))*h*1.15;
    el.style.opacity='1';
  const wind=still?0:Math.sin(skyTime/5+i)*.025;
  const x=w*(.5+(still?Math.sin(i*2):Math.sin(skyTime/(12+i*2)+i*2))*.34+wind)+offsetX;
  const y=h*(.32+(still?Math.cos(i*1.7):Math.cos(skyTime/(9+i*2)+i*1.7))*.22)+offsetY;
  el.style.left=x+'px';el.style.top=y+'px';
  const depth=[.22,.48,1.05,.16,.28,.2,.36][i];
  el.style.transform=`translate(-50%,-50%) rotate(${still?0:Math.sin(skyTime/3+i)*12}deg) scale(${depth})`;
   string(i,x,y,entry,offsetX,offsetY,depth);
   skyStrings[i].style.opacity=entry.toFixed(4);
 });
   // The same upward scroll reveal applies to the player and its string.
  const playerEntry=1;
    const playerRise=(1-ease(5.36,5.70,p))*h*1.15;
  kiteEntry.style.opacity='1';
  kiteEntry.style.transform=`translateY(${playerRise.toFixed(2)}px)`;
 kiteEntry.style.visibility=playerEntry>0?'visible':'hidden';
  kite.inert=p<flightReady;
  const f=st.flight,autopilot=!still&&f.phase==='ready'?Math.sin(skyTime/1.5)*5:0;
 const flying=f.phase==='flying',t=f.travel||0;
 const launch=ease(0,1.8,t);
 // Mostly central flight; just two soft edge excursions during the full flight.
 const edgeExcursion=.51*Math.exp(-Math.pow((t-5)/1.05,2))-.51*Math.exp(-Math.pow((t-13)/1.05,2));
 const freeHorizontal=!still?clamp(launch*(Math.sin(t/2.6)*.10+Math.sin(t/4.7)*.045+edgeExcursion)+(f.drift||0)*.45,-.53,.53):0;
 if(flying)steering.offset=kiteSteeringStep(steering.offset,steering.x===null?freeHorizontal:steering.x,dt);
 const horizontal=flying?clamp(steering.offset,-.40,.40):0;
 if(flying)f.lastHorizontal=horizontal;
 const fallProgress=f.fallProgress||0;
  const playerX=w*(.5+(f.phase==='fallen'?(f.lastHorizontal||0)*(1-ease(0,1,fallProgress))-.08*ease(0,1,fallProgress):horizontal));
 const altitude=f.y+autopilot;
 const playerY=h*altitude/100;
 const depth=flying&&!still?1+launch*(Math.sin(t/2.2)*.43+Math.sin(t/4.6)*.12-.16):f.phase==='fallen'?(f.lastDepth||1)+(.98-(f.lastDepth||1))*ease(0,1,fallProgress):1;
 if(flying)f.lastDepth=depth;
 kite.style.left=playerX+'px';kite.style.top=playerY+'px';
  const desiredBank=flying?(steering.x===null?launch*(Math.cos(t/2.1)*20+Math.cos(t/5.3)*6):(steering.x-steering.offset)*65)+(f.gust||0)*14+(f.vy||0)*.18:f.phase==='fallen'?28+fallProgress*38:Math.sin(skyTime/3)*4;
 // Click tension affects acceleration, never the rendered angle directly.
 f.bank=(f.bank||0)+(desiredBank-(f.bank||0))*(1-Math.exp(-3*Math.min(Math.max(dt,0),.05)));
 kite.style.transform=`translate(-50%,-50%) rotate(${still?0:f.bank}deg) scale(${depth})`;
   const tailAngle=(still?0:f.bank)*Math.PI/180,tailReach=kite.offsetHeight*.48*depth;
   string(skyKites.length,playerX-Math.sin(tailAngle)*tailReach,playerY+playerRise+Math.cos(tailAngle)*tailReach,playerEntry,0,playerRise,depth);
  flightPrompt.hidden=!(!flightStartedThisVisit&&p>=flightReady&&p<6.55);
  const showTangle=f.entangled&&fallProgress<.25;
 const warningText='NO DEJES CAER EL BARRILETE';
 if(flightWarning.textContent!==warningText)flightWarning.textContent=warningText;
 flightWarning.hidden=!((showTangle||(flying&&f.sinceClick>.85&&steering.idle>.6))&&p>=flightReady&&p<6.55);
 root.querySelectorAll('.fh-kite-tail').forEach((el,i)=>{el.style.transform=`rotate(${still?0:Math.sin(skyTime/1.7+i)*11+Math.sin(skyTime/3.8+i)*6}deg)`});
}
function impulse(){const f=st.flight;if(f.phase==='fallen'||(f.phase==='ready'&&current<flightReady))return;if(f.phase==='ready'){flightStartedThisVisit=true;f.phase='flying';f.time=0;f.travel=0;flightPrompt.hidden=true}if(f.phase==='flying'){f.tension=Math.min(2,(f.tension||0)+1.1);f.sinceClick=0;flightWarning.hidden=true}else {f.vy=-2;tug=1}save()}
const steeringSky=Q('.fh-sky',root);
steeringSky.addEventListener('dragstart',e=>e.preventDefault());
function steerAt(e){
 if(!adentro()||current<flightReady||current>6.4||st.flight.phase==='fallen')return;
 if(steering.lastX!==null&&Math.hypot(e.clientX-steering.lastX,e.clientY-steering.lastY)>=1)steering.idle=0;
 steering.lastX=e.clientX;steering.lastY=e.clientY;
 steering.x=clamp(e.clientX/innerWidth-.5,-.40,.40);steering.y=clamp(e.clientY/innerHeight*100,12,78);
}
function skyClick(){impulse()}
kite.onclick=e=>{e.stopPropagation();skyClick(e)};steeringSky.onclick=skyClick;kite.onkeydown=e=>{if(e.code==='Space'){e.preventDefault();e.stopPropagation()}};
steeringSky.addEventListener('pointerdown',e=>{if(e.button!==0||steering.pointer!==null||current<flightReady||current>6.4||st.flight.phase==='fallen')return;steerAt(e);steering.pointer=e.pointerId;steeringSky.setPointerCapture(e.pointerId)});
steeringSky.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen'||steering.pointer===e.pointerId)steerAt(e)});
function endSteering(e){if(steering.pointer!==e.pointerId)return;steering.pointer=null;if(steeringSky.hasPointerCapture(e.pointerId))steeringSky.releasePointerCapture(e.pointerId)}
steeringSky.addEventListener('pointerup',endSteering);steeringSky.addEventListener('pointercancel',endSteering);steeringSky.addEventListener('lostpointercapture',()=>{steering.pointer=null});
// Touch gestures keep reaching the existing scroll navigation; dragging still steers.
window.addEventListener('blur',()=>{steering.pointer=null;steering.idle=Infinity;steering.lastX=steering.lastY=null});
window.addEventListener('keydown',e=>{if(e.code==='Space'&&adentro()&&current>5.7&&current<6.7&&!e.target.closest('input,textarea,dialog,#music-player')){e.preventDefault();e.stopImmediatePropagation();impulse()}},true);
function flight(dt,p){
 const f=st.flight;if(p<flightReady||p>6.7||document.hidden)return;
 const step=Math.min(Math.max(dt,0),.05);
 if(f.phase==='flying'){
  f.time+=step;f.sinceClick=(f.sinceClick||0)+step;
  steering.idle+=step;
  const movementLift=1-ease(.15,.85,steering.idle);
  const lift=Math.max(1-ease(.35,1.5,f.sinceClick),movementLift);
  f.travel=(f.travel||0)+step*lift;
  // Each tug builds line tension; it releases over time instead of teleporting velocity.
  f.tension=(f.tension||0)*Math.exp(-step*5);
  const gustEnvelope=ease(.35,.85,(1+Math.sin(f.time*.58-1.8))*.5);
  f.gust=reduced()?0:gustEnvelope*(Math.sin(f.time*2.7)*.65+Math.sin(f.time*4.1)*.35);
  f.driftVelocity=((f.driftVelocity||0)+((f.gust*.16)-(f.drift||0)*1.8)*step)*Math.exp(-step*1.8);
  f.drift=clamp((f.drift||0)+f.driftVelocity*step,-.08,.08);
   // Actual pointer movement supports flight; a stationary target loses lift gradually.
   // Click impulses remain independent and do not change the steering destination.
   const steerLift=steering.x===null?0:clamp((steering.y-f.y)*1.6-f.vy*.8,-30,30)*lift;
    const arrivalFall=ease(1,2.4,f.time);
    f.vy=clamp(f.vy+step*(23*(1-movementLift)*arrivalFall-f.tension*76+f.gust*4*arrivalFall+steerLift-f.vy*movementLift*.8),-28,50);
  f.y+=f.vy*step;
   if(f.y<-5){f.y=-5;f.vy=Math.max(0,f.vy)}
  if(f.y>94)f.phase='fallen';
  // Narrative limit counts only active flight, never waiting or a hidden tab.
  if(f.time>=18){f.entangled=true;f.phase='fallen';f.vy=Math.max(5,f.vy)}
 }
 if(p>6.4&&f.phase!=='ready'&&f.phase!=='fallen')f.phase='fallen';
 // Falling position is integrated with the camera, not in a separate outgoing layer.
   kite.setAttribute('aria-label',f.phase==='fallen'?'El barrilete cayó':'Mové el mouse para dirigirlo y sostenerlo; también podés hacer clic para darle impulso');
 tug=Math.max(0,tug-step*3);
}
const layerCache=new Map(),loadedLayers=new WeakSet();
function layer(sel,a){let el=layerCache.get(sel);if(!el){el=Q(sel,root);layerCache.set(sel,el)}el.style.opacity=clamp(a);el.style.visibility=a>.001?'visible':'hidden';el.inert=a<.7;if(a>.001&&!loadedLayers.has(el)){loadImages(el);loadedLayers.add(el)}return el}
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
function audio(p,active,dt){const enter=active&&p>4&&p<5,exit=!active||p<4||p>5.05;if(enter&&!partyActive){partyActive=true;albumTime=music.currentTime;albumWasPlaying=sounding&&!music.paused;music.pause();if(cumbia&&sounding&&!music.muted)cumbia.play().catch(()=>{})}else if(partyActive&&exit){partyActive=false;cumbia?.pause();if(sounding&&albumWasPlaying){music.currentTime=albumTime;music.play().catch(()=>{})}}if(partyActive&&!music.paused)music.pause();if(cumbia){cumbia.muted=music.muted||!sounding||document.hidden;cumbia.volume=.45*(1-ease(4.85,5.05,p))}const tv=Q('.tv-video'),tvOn=active&&p>1.2&&p<2&&Q('.kitchen-tv').dataset.channel!=='0';tv.muted=music.muted||!sounding||!tvOn;tv.volume=.55;const desired=tvOn?.12:.55;if(entryMusicComplete&&adentro())music.volume+= (desired-music.volume)*Math.min(1,dt*3);if(partyActive)$('player-status').textContent=cumbia?'LA JODITA':'EN PAUSA';}
const previous=window.casaRender;
let lastBoxFrame='';
window.casaRender=function(now,dt){
followFallingKite(dt);
 if(endingRun&&!st.soldiers&&adentro()&&current>=6.8&&current<7.6&&target>=current)target=current=6.9;
if(adentro()&&!flightStartedThisVisit&&current>=flightGate&&current<6.55){
  // Arrive without an artificial click impulse: float, then ease into gravity.
  st.flight={phase:'flying',time:0,travel:0,y:48,vy:0,sinceClick:2,tension:0,bank:0};
  flightStartedThisVisit=true;flightPrompt.hidden=true;
}
previous(now,dt);const inside=adentro()&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside'),p=current,active=inside&&p>=.95&&p<7.6;
 if(!inside||p<5.4){steering.x=null;steering.y=48;steering.offset=0;steering.pointer=null;steering.idle=Infinity;steering.lastX=steering.lastY=null}
 if(inside)positionModelBox(p,dt);else boxCanvas.style.visibility='hidden';

  renderMemoryCard(inside,p,dt);
 if(inside&&box3d){
  // The docked shortcut is static. Repaint only after an actual model, lid,
  // buffer or aspect change; keep leaf flights and user interaction live.
  const r=box3d.rig.rotation,q=box3d.tapa.quaternion;
   const frame=[box3d.lastW,box3d.lastH,box3d.camera.aspect,r.x,r.y,r.z,q.x,q.y,q.z,q.w,box3d.card.progress,box3d.card.zoom,box3d.card.group.visible].join(':');
  if(frame!==lastBoxFrame){box3d.renderer.render(box3d.scene,box3d.camera);lastBoxFrame=frame}
 }
renderNextHouse(inside,p);
root.style.visibility=active?'visible':'hidden';root.inert=!active;$('casa-screens').inert=active;document.body.classList.toggle('new-first-house',active);if(active)document.body.classList.remove('casa-sin-cursor');audio(p,active,dt);if(!active){tip.classList.remove('shown');boxLidHint.hidden=boxScrollHint.hidden=true;lastCurrent=p;return}
if(p>2.48&&p<2.9&&!st.autoBox){st.autoBox=true;st.box=true;syncObjects();save()}
// Box positioning also runs beyond the first house, keeping its drop target alive.
layoutSalon();
// La pared (con el calado de la persiana) y la escena del salón aparecen y desaparecen
// SIEMPRE juntas, como un solo grupo: no hay un desvanecimiento entre una y otra. La
// escena del salón ya está entera ahí detrás desde que arranca este grupo; lo único que
// la revela es que la persiana (encima, con el hueco real) se levanta.
const groupOpacity=p>=2.1&&p<5.70?1:0,shutter=layer('.fh-shutter',groupOpacity),party=layer('.fh-party',groupOpacity);
// La pared entra deslizando desde 2.4 (justo cuando termina de aparecer, sin hueco)
// hasta 3.0. La persiana ya empieza a levantarse ANTES de que la pared termine de
// encajar (arranca en 2.85, superpuesto con el final del deslizamiento de la pared),
// así el "encaje" de la pared y el levantamiento de la persiana son un solo
// movimiento continuo: no hay instante en el que la escena quede quieta.
// Una vez levantada del todo (3.95), la pared NO se va: se queda como el arco que
// contiene la escena, y es la pared+escena juntas las que hacen zoom in al mismo
// tiempo, como si la cámara se metiera dentro de ese hueco.
// Preserve the initial camera; then lower its aim to the child and approach closer.
const wallIn=clamp((p-2.1)/.9);
// One direct scroll-to-camera mapping, with no competing acceleration curves.
// A wider final composition: less magnification, entirely driven by scroll.
const camZoom=1+clamp((p-3.50)/(5.28-3.50))*2.8;
const sw=salonLayout.width,sh=salonLayout.height;
const imageScale=Math.max(sw/3072,sh/2048),imageW=3072*imageScale,imageH=2048*imageScale;
const childX=salonLayout.left+(sw-imageW)/2+imageW*.53;
const childY=salonLayout.top+(sh-imageH)/2+imageH*.76;
// Fixed aim and one shared progress: the child follows a straight screen-space
// line from the wide composition to the final framing, without a late curved pan.
const cameraProgress=clamp((camZoom-1)/2.8);
const focusX=childX,focusY=childY;
const panX=(innerWidth*.5-childX)*cameraProgress,panY=(innerHeight*.57-childY)*cameraProgress;
const passage=window.houseRoute?houseRoute.vector(1-wallIn,2.4,reduced()):{x:0,y:1-wallIn};
const skyPass=houseRoute.passage(5.28,5.70,p,5.28,reduced());
salonViewport.style.transform=houseRoute.transform(skyPass.outgoing);
const cameraTransform=`translate(${(passage.x*innerWidth+panX).toFixed(2)}px,${(passage.y*innerHeight+panY).toFixed(2)}px) scale(${camZoom.toFixed(5)})`;
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
// Preserve the original artwork without alternating coloured lighting.
const tint=Q('.fh-salon-tint',root);
tint.style.opacity='0';tint.style.backgroundColor='transparent';
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
  const personPhase=p+.22;
  const start=SALON_LEVEL_START[info.level],t=ease(start,start+SALON_DISPERSE_DUR,personPhase),[dx,dy]=info.dir;
 const sway=SALON_SWAY[n];
 if(sway){
  const bounds=salonBounds.get(el),anchorX=bounds?(bounds.left+bounds.right)*.5:.5;
  // The source canvases have transparent margins: pivot in image space,
  // compensating for cover cropping rather than rotating about viewport center.
   const origin=`${((sw-imageW)*.5+imageW*anchorX).toFixed(2)}px ${((sh-imageH)*.5+imageH*.9).toFixed(2)}px`;
   if(el.style.transformOrigin!==origin)el.style.transformOrigin=origin;
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
   // A small opening only once the camera is close; never chase viewport edges.
   // Use the actual scroll phase, without the former early-departure offset.
   const revealStart=4.50+(info.level-1)*.035;
   const part=ease(revealStart,5.28,p),direction=dx<0?-1:1;
   const distance=n===7?.020:info.level===7?.035:info.level===6?.018:.012;
   el.style.transform=`translateX(${(direction*imageW*distance*part).toFixed(2)}px)`;
   el.style.opacity='1';el.style.filter='none';el.style.visibility='inherit';
});
// Single static camera-facing child, revealed only as the crowd moves aside.
const followingFall=!!st.flight.followed;
const cameraY=followingFall?(fallCamera?(st.flight.cameraY||0):190*ease(st.flight.fallStart||6.24,6.86,p)):190*ease(6.4,6.86,p);
  const sky=layer('.fh-sky',p>=5.28?(1-ease(7.5,7.6,p)):0);
sky.style.transform=houseRoute.transform(skyPass.incoming);sky.style.backgroundPosition=`center ${-cameraY*innerHeight/100}px`;
skyWorld.style.transform=`translateY(${-cameraY}vh)`;
if(p>=5.28&&p<7.42){flight(dt,p);animateSky(p,dt)}else skyWasVisible=false;
updateHeldKite(p);
const macro=layer('.fh-macro',1);
if(p>6.8&&p<7.12)macroDwell+=dt;
const centered=updateEnding(p,dt);
 const ending=layer('.fh-end',ease(5.4,5.56,p));const soldier=Q('.fh-soldiers',root),memoryFade=1-ease(7.02,7.28,p);
 const grow=centered?1:0;
 soldier.style.left='50%';soldier.style.top=((250-cameraY)*(1-grow)+50*grow)+'%';
 const small=innerWidth*(innerWidth<=650?.14:.08),large=innerWidth<=650?innerWidth*.38:Math.max(100,Math.min(innerWidth*.20,320));
 soldier.style.width=(small+(large-small)*grow)+'px';
 Q('img',soldier).style.maxHeight=(19.72+(30-19.72)*grow)+'vh';
 if(!body.classList.contains('casa-arrastrando'))soldier.style.opacity=String(memoryFade);
 soldier.inert=!centered||!endingRun?.done||memoryFade<.15||st.soldiers||enCaja('soldiers');
 ending.classList.toggle('fh-burn-complete',centered);memoryPrompt.style.opacity=String(memoryFade);memoryPrompt.hidden=!centered||st.soldiers||enCaja('soldiers');
root.style.setProperty('--night',Math.max(ease(6.9,7.35,p),0));Q('.kitchen-tv').classList.toggle('fh-tv-lit',Q('.kitchen-tv').dataset.channel!=='0');
if(tipTarget&&(tipTarget.closest('[inert]')||!tipTarget.getClientRects().length)){tip.classList.remove('shown');tipTarget=null}
// Storage is synchronous: do not interrupt the camera with periodic writes.
// Persist after input settles; pagehide still preserves state when leaving.
if(now-lastPersist>1000&&Math.abs(target-p)<.0001&&Math.abs(lastCurrent-p)<.0001){st.kitchen=window.readKitchen?.();save();lastPersist=now}lastCurrent=p;
};
Q('.tv-switch').addEventListener('click',()=>{const n=Number(Q('.kitchen-tv').dataset.channel);hint(Q('.tv-switch'),n===0?'Encender la tele':n===5?'Apagar la tele':'Cambiar de canal')});hint(Q('.tv-switch'),'Encender la tele');
document.querySelectorAll('.kitchen-door').forEach(el=>{hint(el,el.getAttribute('aria-expanded')==='true'?'Cerrar la puerta':'Abrir la puerta');el.addEventListener('click',()=>hint(el,el.getAttribute('aria-expanded')==='true'?'Cerrar la puerta':'Abrir la puerta'))});
// Cupboard food stays monochrome and non-interactive.
window.resetFirstHouse=()=>{fallCamera=null;flightStartedThisVisit=false;resetEnding();st=blank();macroDwell=0;window.laCasaCarry={soldiers:false};save();syncObjects();window.resetKitchen?.()};
const resetOld=$('reset-experience').onclick;$('reset-experience').onclick=async()=>{window.resetFirstHouse();await resetOld()};
const restartOld=restartFromWindow;restartFromWindow=function(){window.resetFirstHouse();restartOld()};
// Touch scrolling is navigation except while manipulating an object.
let touchY=null;window.addEventListener('touchstart',e=>{if(e.touches.length===1&&!e.target.closest('button,input,textarea,select,dialog,[contenteditable=true],#community-pad,[data-guardable]'))touchY=e.touches[0].clientY;else touchY=null},{passive:true});window.addEventListener('touchmove',e=>{if(touchY===null||drag||e.touches.length!==1)return;const y=e.touches[0].clientY;const dy=touchY-y;touchY=y;if(Math.abs(dy)>1){e.preventDefault();navigateScroll(dy*2)}},{passive:false});const endTouch=()=>touchY=null;window.addEventListener('touchend',endTouch);window.addEventListener('touchcancel',endTouch);
window.addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>{if(document.hidden){cumbia?.pause()}else if(partyActive&&cumbia&&sounding)cumbia.play().catch(()=>{})});
if(st.kitchen)window.restoreKitchen?.(st.kitchen);
syncObjects();
})();
