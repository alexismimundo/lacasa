// La Casa — etapa 1 del storyboard: capas persistentes y pantallas 0 a 7.
// Se carga después de script.js (v44) y usa su motor: la fase virtual `current`/`target`,
// la música (`music`, `sound`, `sounding`), el menú (`openMenuSection`) y el tick por cuadro,
// que llama a casaRender(). No reemplaza el umbral ni la entrada.
'use strict';

/* ======================================================================
   CONFIGURACIÓN EDITABLE
   ====================================================================== */

// Recursos provisionales. Para usar el definitivo, cambiá la ruta acá (ver PROVISIONALES.md).
const RECURSOS={
 billetes:'assets/textural/fragment-61.webp',
 botella:'assets/textural/fragment-74.webp',
 cama:'assets/textural/fragment-84.webp',
 mochila:'assets/textural/fragment-44.webp',
 mochilaAbierta:'assets/textural/fragment-46.webp',
 jardin:'assets/textural/fragment-27.webp',
 jardinAbierta:'assets/textural/fragment-38.webp',
 aluminio:'assets/textural/fragment-39.webp',
 aluminioAbierto:'assets/textural/fragment-34.webp',
 cucharita:'assets/box-spoon.webp',
 dibujoJardin:'assets/second-drawing.webp',
 robot:'assets/low-robot.webp',
 tele:'assets/low-tv.webp',
 alacena:'assets/low-cupboard.webp',
 fachada:'assets/textural/fragment-30.webp',
 cartel:'assets/textural/fragment-78.webp',
 guirnalda:'assets/textural/fragment-25.webp',
 papelPicado:'assets/textural/fragment-34.webp',
 globo:'assets/textural/fragment-55.webp',
 cartaDorso:'assets/textural/fragment-28.webp',
 cartaFrente:'assets/textural/fragment-61.webp',
 cursores:{
  mano:'assets/provisional/cursor-mano.svg',
  'mano-abierta':'assets/provisional/cursor-mano-abierta.svg',
  tijera:'assets/provisional/cursor-tijera.svg',
  crayon:'assets/provisional/cursor-crayon.svg',
  lupa:'assets/provisional/cursor-lupa.svg'
 }
};

// Detalles ⚑ (tomados del relato, todavía sin decidir si se hacen públicos).
// Poner en false para sacar cada uno de la web sin tocar el resto.
const FLAGS={contexto:true,pesos:true,cama:true,robot:true,bichitos:true,panchito:true,albumes:true};
const MOSTRAR_MARCAS=false; // muestra un ⚑ chico sobre cada detalle marcado

// Opciones del storyboard elegidas para esta base (ver DECISIONES_ETAPA1.md).
const OPCIONES={radio:'A',direccion:'C',pieza:'A',zocalo:'A',fuego:'B',mama:'A',escondidas:'B'};

// Textos. Los marcados como pendientes son lugares para tu escritura: no son citas ni letras.
const TEXTOS={
 pesos:'robale estos 4 pesos a tu hermano para comprar globos',
 paquetes:['[frase pendiente]','[frase pendiente]','[frase pendiente]'],
 cartas:{
  robot:'Lo que más quería era amarillo y caminaba solo. (texto de ejemplo del storyboard)',
  tele:'[carta pendiente: la tele como única luz]',
  cucharitas:'[carta pendiente: las cucharitas]'
 },
 zocaloPais:['Restringen el retiro de depósitos','Estado de sitio','Cacerolazos en todo el país','Cinco presidentes en doce días','Default de la deuda','Fin de la convertibilidad'],
 zocaloChico:[{t:'joditas con mis hermanos'},{t:'Tom y Jerry a la medianoche'},{t:'un panchito en la feria',flag:'panchito'}],
 mama:'[frase de Mamá — pendiente]'
};

// Canciones del álbum. Por ahora solo hay una pista cargada en la v44.
const PISTA_ACTUAL={titulo:'Sirens',nota:'pista provisional del prototipo'};
const CANCIONES=[
 {casa:'Umbral',titulos:['La casa (intro)']},
 {casa:'Colodrero y A. del Valle',titulos:['2001','Fuego','Mamá']},
 {casa:'Gabriela Mistral 4860',titulos:['El niño','Daiana','En la oscuridad']},
 {casa:'Terrero 3231',titulos:["Papa ra'y",'La bicicleta','Retrovisor']}
];

// Mapa del recorrido en la fase virtual (1 unidad ≈ una pantalla de scroll).
// Las pantallas están apiladas como una página vertical: cada una entra desde abajo,
// queda fija durante h-1 unidades mientras pasa lo suyo y sale hacia arriba.
// s = fase en la que su borde superior llega arriba de la pantalla.
// Página continua: cada pantalla mide h pantallas de alto y pasa de largo, sin quedarse fija.
// Solo los dos tramos horizontales (pin) quedan fijos mientras el scroll se vuelve lateral.
const S={p2:{s:1,h:1},p3:{s:2,h:1},p4:{s:3,h:1},p5:{s:4,h:1},p6:{s:5,h:1},p7:{s:6,h:1.6},
 p8:{s:7.6,h:1},p9:{s:8.6,h:4,pin:true},p10:{s:12.6,h:1},p11:{s:13.6,h:1},
 p12:{s:14.6,h:1},p13:{s:15.6,h:1},p14:{s:16.6,h:1},p15:{s:17.6,h:4.4,pin:true},
 p17:{s:22,h:1}};
const P={instala:.72,p6Gate:5.4};
const routeEnd=22.6;
const TOTAL_ESCONDITES=11;
const CAPACIDAD_CAJA=100;

/* ======================================================================
   ESTADO (sesión del navegador, igual que las participaciones de la v44)
   ====================================================================== */
const CLAVE='la-casa-etapa1-v1';
function estadoVacio(){return {caja:[],chamuscada:false,piezaLiberada:false,encontrados:[],robot:false,mochila:false,jardin:false,alacena:false,abiertos:[],carta:null,cartaEfectos:null,cucharitas:null,nombre:'',deco:[],fuego:'pendiente',perdidos:[],instruccionVista:false,senal:0}}
let E=estadoVacio();
try{const raw=JSON.parse(sessionStorage.getItem(CLAVE)||'null');if(raw&&typeof raw==='object')E={...E,...raw,caja:Array.isArray(raw.caja)?raw.caja.slice(0,CAPACIDAD_CAJA+1):[]}}catch{}
E.senal=0;
function guardarEstado(){try{sessionStorage.setItem(CLAVE,JSON.stringify(E))}catch{}}

const COSAS={
 cucharitas:{nombre:'Unas cucharitas de plástico',src:RECURSOS.cucharita,unica:true},
 robot:{nombre:'El robot amarillo',src:RECURSOS.robot,unica:true,flag:'robot'},
 pesos:{nombre:'Cuatro pesos',src:RECURSOS.billetes,unica:true,flag:'pesos'},
 aluminio:{nombre:'Un paquete de aluminio',src:RECURSOS.aluminio,unica:true},
 dibujo:{nombre:'Un dibujo de la caja del jardín',src:RECURSOS.dibujoJardin,unica:true},
 botella:{nombre:'Una botella con bichitos de luz',src:RECURSOS.botella,unica:true,flag:'bichitos'},
 guirnalda:{nombre:'Una guirnalda',src:RECURSOS.guirnalda},
 papel:{nombre:'Papel picado',src:RECURSOS.papelPicado},
 globo:{nombre:'Un globo',src:RECURSOS.globo},
 cartel:{nombre:'El cartel',src:RECURSOS.cartel,unica:true}
};

/* ======================================================================
   UTILIDADES
   ====================================================================== */
const body=document.body;
const reducido=()=>memoryReduced.matches;
const fase=()=>Math.max(0,current);
const adentro=()=>body.classList.contains('inhabited');
function ventana(v,a,b,ent=.3,sal=.3){return lowEase(a,a+ent,v)*(1-lowEase(b-sal,b,v))}
function azar(a,b){return a+Math.random()*(b-a)}
function mezclar(lista){const l=[...lista];for(let i=l.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[l[i],l[j]]=[l[j],l[i]]}return l}
function enCaja(id){return E.caja.some(c=>c.id===id)}
function letras(el,texto){el.replaceChildren();el.setAttribute('aria-label',texto);const out=[];texto.split(/(\s+)/).forEach(parte=>{if(!parte)return;if(/^\s+$/.test(parte)){el.append(document.createTextNode(' '));return}const w=document.createElement('span');w.style.whiteSpace='nowrap';w.setAttribute('aria-hidden','true');[...parte].forEach(ch=>{const s=document.createElement('span');s.className='letra';s.textContent=ch;w.append(s);out.push(s)});el.append(w)});return out}

if(MOSTRAR_MARCAS)body.classList.add('casa-marcas');
document.querySelectorAll('[data-flag]').forEach(el=>{if(FLAGS[el.dataset.flag]===false)el.classList.add('flag-off')});

/* ======================================================================
   LANDING (pantalla 0)
   ====================================================================== */
const nav=$('threshold-menu');let despertarId=0,ultimoGesto=performance.now(),asomado=0;
function despertarMenu(on){clearTimeout(despertarId);if(on)nav.classList.add('menu-awake');else despertarId=setTimeout(()=>{if(!nav.contains(document.activeElement))nav.classList.remove('menu-awake')},700)}
window.addEventListener('pointermove',e=>{ultimoGesto=performance.now();if(e.pointerType!=='touch')despertarMenu(e.clientY>innerHeight*2/3)},{passive:true});
window.addEventListener('keydown',()=>{ultimoGesto=performance.now()});
nav.addEventListener('focusin',()=>despertarMenu(true));nav.addEventListener('focusout',()=>despertarMenu(false));
if(matchMedia('(pointer: coarse)').matches)setTimeout(()=>nav.classList.add('menu-awake'),4000);

function renderLanding(now){}
$('enter').addEventListener('pointermove',e=>{const b=$('loose-brick').getBoundingClientRect();body.classList.toggle('brick-nudge',Math.hypot(e.clientX-(b.left+b.width/2),e.clientY-(b.top+b.height/2))<b.width*1.1)});
$('enter').addEventListener('pointerleave',()=>body.classList.remove('brick-nudge'));

/* ======================================================================
   MENÚ: Escuchar el álbum / Sobre La Casa (Otras casas usa el panel de la v44)
   ====================================================================== */
function htmlAlbum(){
 return '<h2>El disco</h2><p>Tres casas. Distintas formas de volver.</p>'+CANCIONES.map(g=>'<div class="menu-act"><h3>'+g.casa+'</h3><p>'+g.titulos.join(' · ')+' <small>(pendientes)</small></p></div>').join('')+
 '<div class="menu-act"><h3>Ahora en el prototipo</h3><p>'+PISTA_ACTUAL.titulo+' · '+PISTA_ACTUAL.nota+'</p><button class="menu-song" id="menu-escuchar">'+(sounding?'PAUSAR':'ESCUCHAR')+' ↗</button></div>';
}
function htmlSobre(){
 return '<h2>Sobre La Casa</h2><p><strong>Alexis Gabriel Sanabria</strong></p><p>La Casa nace de una historia propia: los lugares que habité, sus recuerdos y las cosas que siguen conmigo.</p><p>Un álbum en desarrollo, producido junto a Tablón Estudio, y un proyecto de diseño sobre memoria y pertenencia. Una casa que también puede abrirse a la historia de alguien más.</p><p><small>Prototipo en construcción. Las imágenes marcadas como provisionales se reemplazarán por material propio.</small></p>';
}
function casaMenuSection(section){
 if(section!=='album'&&section!=='about')return false;
 menuLastFocus=document.activeElement;menuContent.innerHTML=section==='album'?htmlAlbum():htmlSobre();
 body.classList.add('menu-panel-open');if(!menuPanel.open)menuPanel.showModal();menuPanel.scrollTop=0;$('menu-panel-close').focus();
 const b=$('menu-escuchar');if(b)b.onclick=()=>{fijarSenal(0);if(sounding)sound();else encenderSenal();b.textContent=(sounding?'PAUSAR':'ESCUCHAR')+' ↗';setTimeout(()=>{b.textContent=(sounding?'PAUSAR':'ESCUCHAR')+' ↗'},700)};
 return true;
}

/* ======================================================================
   AUDIO DE LA RADIO: estática sintetizada para las señales sin grabación
   ====================================================================== */
let ctx=null,ruido=null,ruidoGain=null,ruidoFiltro=null,ruidoOn=false,volumen=.55;
function asegurarAudio(){
 if(ctx)return ctx;try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch{return null}
 const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 ruido=ctx.createBufferSource();ruido.buffer=buf;ruido.loop=true;ruidoFiltro=ctx.createBiquadFilter();ruidoFiltro.type='bandpass';ruidoFiltro.frequency.value=1800;ruidoFiltro.Q.value=.6;
 ruidoGain=ctx.createGain();ruidoGain.gain.value=0;ruido.connect(ruidoFiltro).connect(ruidoGain).connect(ctx.destination);ruido.start();return ctx;
}
window.addEventListener('pointerdown',()=>{if(ctx&&ctx.state==='suspended')ctx.resume()},{passive:true});
function nivelRuido(){
 if(!ctx)return;let g=0;
 if(ruidoOn)g=(E.senal===1?.035:.05)*volumen;
 if(teleRuidosa())g=Math.max(g,.018*volumen);
 ruidoFiltro.frequency.setTargetAtTime(E.senal===2?650:1800,ctx.currentTime,.1);
 ruidoGain.gain.setTargetAtTime(g,ctx.currentTime,.08);
}

/* ======================================================================
   CAPA 1: LA RADIO (reproductor de toda la web, opción A)
   ====================================================================== */
const SENALES=['El álbum','Radio de barrio','Sonidos de la casa'];
const radio=$('radio'),radioPanel=$('radio-panel');
function radioEncendida(){return E.senal===0?sounding:ruidoOn}
function encenderSenal(){if(E.senal===0){ruidoOn=false;if(!sounding)sound()}else{if(sounding)sound();asegurarAudio();ctx?.resume?.();ruidoOn=true}nivelRuido();pintarRadio()}
function apagarRadio(){if(sounding)sound();ruidoOn=false;nivelRuido();pintarRadio()}
function fijarSenal(n){
 n=Math.max(0,Math.min(2,n));if(n===E.senal)return;const estaba=radioEncendida();E.senal=n;guardarEstado();if(estaba)encenderSenal();else pintarRadio();
}
function pintarRadio(){
 const on=radioEncendida();radio.classList.toggle('sonando',on);
 $('radio-dial').style.transform='rotate('+[-60,0,60][E.senal]+'deg)';$('radio-dial').setAttribute('aria-valuenow',E.senal);$('radio-dial').setAttribute('aria-valuetext',SENALES[E.senal]);
 $('radio-aguja').style.left=[14,47,80][E.senal]+'%';
 $('radio-play').textContent=on?'apagar':'encender';
 $('radio-ahora').textContent=E.senal===0?(on?'Sonando: '+PISTA_ACTUAL.titulo+' ('+PISTA_ACTUAL.nota+')':'El álbum · apagado'):E.senal===1?'Radio de barrio · señal pendiente: faltan las grabaciones propias':'Sonidos de la casa · por ahora, estática';
 $('ori-sonido').setAttribute('aria-pressed',String(on));$('ori-sonido').textContent=on?'sonido: sí':'sonido: no';
}
function pintarLista(){
 const ol=$('radio-lista');ol.replaceChildren();
 const li0=document.createElement('li');li0.innerHTML='<span>'+PISTA_ACTUAL.titulo+'</span>';const b=document.createElement('button');b.type='button';b.textContent='escuchar';b.onclick=()=>{fijarSenal(0);encenderSenal()};li0.append(b);ol.append(li0);
 CANCIONES.forEach(g=>{const c=document.createElement('li');c.innerHTML='<span class="casa">'+g.casa+'</span>';ol.append(c);g.titulos.forEach(t=>{const li=document.createElement('li');li.className='pendiente';li.innerHTML='<span>'+t+'</span><span>pendiente</span>';ol.append(li)})});
}
$('radio-abrir').onclick=()=>{const abrir=radioPanel.hidden;radioPanel.hidden=!abrir;$('radio-abrir').setAttribute('aria-expanded',String(abrir));$('radio-abrir').setAttribute('aria-label',abrir?'La radio: cerrar':'La radio: abrir')};
$('radio-play').onclick=()=>{if(radioEncendida())apagarRadio();else encenderSenal()};
$('radio-volumen').oninput=e=>{volumen=Number(e.target.value);if(sounding){fadeId++;music.volume=volumen}nivelRuido()};
const dial=$('radio-dial');let dialDrag=null;
dial.addEventListener('pointerdown',e=>{if(e.button!==0)return;dialDrag={id:e.pointerId,moved:false,x:e.clientX};dial.setPointerCapture(e.pointerId);e.preventDefault()});
dial.addEventListener('pointermove',e=>{if(!dialDrag||dialDrag.id!==e.pointerId)return;const r=dial.getBoundingClientRect(),ang=Math.atan2(e.clientX-(r.left+r.width/2),-(e.clientY-(r.top+r.height/2)))*180/Math.PI;if(Math.abs(e.clientX-dialDrag.x)>4)dialDrag.moved=true;if(dialDrag.moved)fijarSenal(ang<-30?0:ang>30?2:1)});
dial.addEventListener('pointerup',e=>{if(!dialDrag)return;if(!dialDrag.moved)fijarSenal((E.senal+1)%3);dialDrag=null});
dial.addEventListener('keydown',e=>{const d={ArrowLeft:-1,ArrowDown:-1,ArrowRight:1,ArrowUp:1}[e.key];if(!d)return;e.preventDefault();e.stopPropagation();fijarSenal(E.senal+d)});
pintarLista();pintarRadio();

/* ======================================================================
   CAPA 5: LA CAJA (hasta 9 cosas; para guardar más hay que sacar algo)
   ====================================================================== */
const caja=$('caja'),cajaPanel=$('caja-panel');let pendiente=null;
function abrirCaja(abrir){if(window.casaInventory){window.casaInventory(abrir);return}cajaPanel.hidden=!abrir;caja.classList.toggle('abierta',abrir);$('caja-abrir').setAttribute('aria-expanded',String(abrir))}
$('caja-abrir').onclick=()=>abrirCaja(cajaPanel.hidden);
function pintarCaja(){
 const ul=$('caja-lista');ul.replaceChildren();
 E.caja.forEach((c,i)=>{const cosa=COSAS[c.id];if(!cosa)return;const li=document.createElement('li');const im=document.createElement('img');im.src=cosa.src;im.alt='';const t=document.createElement('span');t.textContent=c.id==='cartel'&&c.texto?'El cartel: «'+c.texto+'»':cosa.nombre;li.append(im,t);ul.append(li)});
 $('caja-vacia').hidden=E.caja.length>0;$('caja-cuenta').textContent=E.caja.length?String(E.caja.length):'';
 caja.classList.toggle('chamuscada',!!E.chamuscada);
}
function sacar(i){E.caja.splice(i,1);guardarEstado();if(pendiente){const p=pendiente;pendiente=null;guardar(p.id,{texto:p.texto,silencioso:false})}else $('caja-aviso').textContent='';pintarCaja();actualizarPieza()}
function guardar(id,{desde=null,texto='',forzar=false,silencioso=false}={}){
 const cosa=COSAS[id];if(!cosa)return false;
 if(cosa.unica&&enCaja(id)){$('caja-aviso').textContent='Eso ya está en la caja.';return false}
 // Sin límite que administrar: si la caja se llena, lo más viejo se cae.
 if(E.caja.length>=CAPACIDAD_CAJA){const cae=E.caja.shift();$('caja-aviso').textContent='Se cayó de la caja: '+(COSAS[cae.id]?.nombre||'algo').toLowerCase()+'.';caja.classList.add('se-cae');setTimeout(()=>caja.classList.remove('se-cae'),700)}
 E.caja.push({id,texto});E.instruccionVista=true;
 if(fase()>=S.p3.s-.5&&fase()<S.p3.s+S.p3.h)E.piezaLiberada=true;
 guardarEstado();pintarCaja();if(!silencioso)$('caja-aviso').textContent='';
 if(desde&&!reducido())volarALaCaja(desde,cosa.src);
 caja.classList.add('recibiendo');setTimeout(()=>caja.classList.remove('recibiendo'),450);
 actualizarPieza();return true;
}
function volarALaCaja(el,src){const r=el.getBoundingClientRect(),c=($('fh-model-box')||$('caja-abrir')).getBoundingClientRect(),im=document.createElement('img');im.src=src;im.className='guardado-vuela';Object.assign(im.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});body.append(im);requestAnimationFrame(()=>requestAnimationFrame(()=>{Object.assign(im.style,{left:(c.left+c.width*.3)+'px',top:(c.top+c.height*.2)+'px',width:(c.width*.4)+'px',height:(c.height*.4)+'px',opacity:'.2'})}));setTimeout(()=>im.remove(),800)}
try{const viejo=JSON.parse(sessionStorage.getItem('la-casa-guardar-algo-v1')||'null');if(viejo&&viejo.confirmed&&String(viejo.confirmed).trim()){$('caja-anterior').hidden=false;$('caja-anterior').textContent='Antes guardaste (versión anterior): «'+String(viejo.confirmed).slice(0,180)+'»'}}catch{}
pintarCaja();

/* ======================================================================
   ARRASTRAR A LA CAJA (y mover libremente cucharitas y cotillón)
   ====================================================================== */
let arrastre=null;const alGuardarDe=new WeakMap();
function sobreCaja(x,y){const el=$('fh-model-box')||$('caja-abrir');if(getComputedStyle(el).visibility==='hidden')return false;const r=el.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom}
function hacerGuardable(el,id,opciones={}){
 el.addEventListener('dragstart',e=>e.preventDefault());
 el.dataset.guardable=typeof id==='string'?id:'';el.setAttribute('aria-keyshortcuts','G');
 const actual=()=>typeof id==='function'?id():id;
 alGuardarDe.set(el,()=>{const ok=guardar(actual(),{desde:el,texto:opciones.texto?.()||''});if(ok)opciones.alGuardar?.();return ok});
 el.addEventListener('pointerdown',e=>{
  if(e.button!==0||el.closest('[inert]'))return;e.preventDefault();e.stopPropagation();const r=el.getBoundingClientRect();
  arrastre={el,pid:e.pointerId,sx:e.clientX,sy:e.clientY,ox:e.clientX-(r.left+r.width/2),oy:e.clientY-(r.top+r.height/2),movido:false,ghost:null,libre:!!opciones.libre,contenedor:opciones.contenedor,alSoltar:opciones.alSoltar,w:r.width,h:r.height};
  el.setPointerCapture(e.pointerId);
 });
 el.addEventListener('pointermove',e=>{
  const a=arrastre;if(!a||a.el!==el||a.pid!==e.pointerId)return;
  if(!a.movido&&Math.hypot(e.clientX-a.sx,e.clientY-a.sy)<6)return;
  if(!a.movido){a.movido=true;body.classList.add('casa-arrastrando');if(!a.libre){const src=el.querySelector('img')?.src;const g=document.createElement('img');g.className='caja-ghost';g.src=src||'';g.style.width=a.w+'px';g.style.height=a.h+'px';body.append(g);a.ghost=g;el.style.opacity='.25'}else el.classList.add('suelta')}
  if(a.libre){const c=a.contenedor.getBoundingClientRect();el.style.left=Math.max(0,Math.min(100,(e.clientX-a.ox-c.left)/c.width*100))+'%';el.style.top=Math.max(0,Math.min(100,(e.clientY-a.oy-c.top)/c.height*100))+'%'}
  else{a.ghost.style.left=e.clientX+'px';a.ghost.style.top=e.clientY+'px'}
  caja.classList.toggle('recibiendo',sobreCaja(e.clientX,e.clientY));$('fh-model-box')?.classList.toggle('drop-ready',sobreCaja(e.clientX,e.clientY));
 });
 const soltar=(e,cancelar)=>{
  const a=arrastre;if(!a||a.el!==el||a.pid!==e.pointerId)return;arrastre=null;
  body.classList.remove('casa-arrastrando');caja.classList.remove('recibiendo');$('fh-model-box')?.classList.remove('drop-ready');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);
  if(!a.movido)return;el.dataset.recien='1';setTimeout(()=>delete el.dataset.recien,30);
  a.ghost?.remove();el.style.opacity='';el.classList.remove('suelta');
  if(!cancelar&&sobreCaja(e.clientX,e.clientY))alGuardarDe.get(el)();
  else a.alSoltar?.();
 };
 el.addEventListener('pointerup',e=>soltar(e,false));el.addEventListener('pointercancel',e=>soltar(e,true));
}
document.addEventListener('keydown',e=>{if((e.key==='g'||e.key==='G')&&!e.target.isContentEditable&&!['INPUT','TEXTAREA'].includes(e.target.tagName)){const el=e.target.closest?.('[data-guardable]');const fn=el&&alGuardarDe.get(el);if(fn){e.preventDefault();fn()}}});
const recien=el=>!!el.dataset.recien;

/* ======================================================================
   CAPA 2: EL CURSOR COMO HERRAMIENTA
   ====================================================================== */
// Cursor nativo del sistema con el dibujo de cada herramienta: siempre visible y sin retraso.
const PUNTA={mano:[16,1],'mano-abierta':[15,1],tijera:[28,3],crayon:[4,28],lupa:[13,13]};let herramientaActual='';
function fijarCursor(h){if(h===herramientaActual)return;herramientaActual=h;document.documentElement.style.setProperty('--casa-cursor',h==='auto'?'auto':'url("'+new URL(RECURSOS.cursores[h],document.baseURI).href+'") '+PUNTA[h][0]+' '+PUNTA[h][1]+', auto')}
function elegirHerramienta(t){
 if(reducido()||body.classList.contains('menu-panel-open')){fijarCursor('auto');return}
 if(!adentro()){fijarCursor('mano');return}
 if(body.classList.contains('umbral-active')){fijarCursor('crayon');return}
 if(typeof casa2Herramienta==='function'){const h2=casa2Herramienta(t);if(h2){fijarCursor(h2);return}}
 if(typeof casa3Herramienta==='function'){const h3=casa3Herramienta(t);if(h3){fijarCursor(h3);return}}
 let h='mano';const el=t&&t.closest?t.closest('[data-cursor],[data-guardable],.cucharita,.deco,.cosa.salvable,.escondite,#casa-layers'):null;
 if(el){if(el.dataset.cursor)h=el.dataset.cursor;else if(el.classList.contains('escondite'))h='lupa';else if(el.id==='casa-layers')h='mano';else h='mano-abierta'}
 if(arrastre)h='mano-abierta';
 fijarCursor(h);
}
fijarCursor('mano');
window.addEventListener('pointermove',e=>elegirHerramienta(e.target),{passive:true});

/* ======================================================================
   CAPA 3: EL NIÑO Y LAS ESCONDIDAS (opción A: con contador)
   ====================================================================== */
function pintarEscondidas(){
 document.querySelectorAll('.escondite').forEach(b=>{if(E.encontrados.includes(b.dataset.escondite)&&!b.classList.contains('encontrado'))b.hidden=true});
 const n=E.encontrados.length,c=$('escondidas');c.hidden=n===0||OPCIONES.escondidas!=='A';c.textContent='te encontré '+n+' de '+TOTAL_ESCONDITES;
}
document.querySelectorAll('.escondite').forEach(b=>b.onclick=()=>{if(E.encontrados.includes(b.dataset.escondite))return;E.encontrados.push(b.dataset.escondite);guardarEstado();b.classList.add('encontrado');setTimeout(()=>{b.hidden=true},reducido()?10:1700);pintarEscondidas()});
pintarEscondidas();

/* ======================================================================
   CAPA 6: ORIENTACIÓN
   ====================================================================== */
const casasOri=[...document.querySelectorAll('#ori-casas button')];
casasOri[0].onclick=()=>{if(!adentro())return;target=S.p2.s+.3;storeTravel()};
casasOri[1].onclick=()=>{if(!adentro())return;target=S.p8.s+.2;storeTravel()};
$('ori-sonido').onclick=()=>{if(radioEncendida())apagarRadio();else encenderSenal()};
$('ori-archivo').onclick=()=>openMenuSection('others');
function pintarMovimiento(){const on=window.casaUserReducedMotion?.()||false;$('ori-movimiento').setAttribute('aria-pressed',String(on))}
$('ori-movimiento').onclick=()=>{window.casaSetReducedMotion(!window.casaUserReducedMotion());pintarMovimiento()};pintarMovimiento();

/* ======================================================================
   PANTALLA 2: LA DIRECCIÓN (opción C: se escribe sola con el scroll)
   ====================================================================== */
const letrasP2=letras($('p2-direccion'),$('p2-direccion').dataset.texto);
function renderP2(v){const a=S.p2.s-.3,prog=Math.max(0,Math.min(1,(v-a)/.75)),n=Math.round(prog*letrasP2.length);letrasP2.forEach((l,i)=>l.classList.toggle('escrita',reducido()?v>a:i<n));$('p2-contexto').classList.toggle('visible',v>S.p2.s+.4)}

/* ======================================================================
   PANTALLA 3: LA PIEZA (opción A: vista como mesa, objetos recortados)
   ====================================================================== */
const escP3=$('p3-escenario');
// Tele: cuatro canales evocados con dibujo propio, nunca imágenes de programas reales.
const CANALES=['dibujitos','manualidades','estática','noticiero'];let canal=0;const canalCtx=$('p3-canal').getContext('2d');
function ubicarPantallaTele(){const box=$('p3-tele'),im=box.querySelector('img');if(!im.naturalWidth)return;const w=box.clientWidth,h=box.clientHeight,s=Math.min(w/im.naturalWidth,h/im.naturalHeight),dw=im.naturalWidth*s,dh=im.naturalHeight*s;Object.assign($('p3-canal').style,{left:((w-dw)/2+dw*.202)+'px',top:((h-dh)/2+dh*.135)+'px',width:(dw*.56)+'px',height:(dh*.435)+'px'})}
$('p3-tele').querySelector('img').decode().then(ubicarPantallaTele).catch(()=>{});window.addEventListener('resize',ubicarPantallaTele);
$('p3-tele').onclick=()=>{canal=(canal+1)%CANALES.length;$('p3-canal-nombre').textContent='canal: '+CANALES[canal]+' (provisional)';nivelRuido()};
$('p3-canal-nombre').textContent='canal: '+CANALES[canal]+' (provisional)';
function teleRuidosa(){return canal===2&&$('p3').classList.contains('viva')&&(sounding||ruidoOn)}
function dibujarCanal(t){
 const c=canalCtx,W=320,H=240;t/=1000;
 if(canal===0){c.fillStyle='#bcd6ef';c.fillRect(0,0,W,H);c.fillStyle='#8fbf7a';c.fillRect(0,170,W,70);const x=(t*90)%(W+120)-60;c.fillStyle='#e9b949';c.fillRect(x+70,130+Math.sin(t*9)*8,34,34);c.fillStyle='#9b83b2';c.beginPath();c.arc(x,148+Math.abs(Math.sin(t*7))*-22,20,0,7);c.fill()}
 else if(canal===1){c.fillStyle='#f4efe3';c.fillRect(0,0,W,H);c.strokeStyle='#335386';c.lineWidth=3;c.setLineDash([8,7]);c.beginPath();const p=(t*.35)%1;c.moveTo(40,120);c.lineTo(40+240*p,120-40*Math.sin(p*3.14));c.stroke();c.setLineDash([]);c.fillStyle='#c3b0d7';c.fillRect(150,40,90,60);c.fillStyle='#e9b949';c.beginPath();c.moveTo(60,180);c.lineTo(110,140);c.lineTo(130,200);c.fill()}
 else if(canal===2){const img=c.createImageData(80,60);for(let i=0;i<img.data.length;i+=4){const v=Math.random()*255;img.data[i]=img.data[i+1]=img.data[i+2]=v;img.data[i+3]=255}c.putImageData(img,0,0);c.drawImage(c.canvas,0,0,80,60,0,0,W,H)}
 else{c.fillStyle='#2c4a7a';c.fillRect(0,0,W,H);c.fillStyle='#cfd8e6';c.beginPath();c.arc(160,95,30,0,7);c.fill();c.fillRect(118,124,84,70);c.fillStyle='#b23a3a';c.fillRect(0,192,W,30);c.fillStyle='#f4f1e9';const x=W-((t*70)%(W+220));for(let k=0;k<4;k++)c.fillRect(x+k*70,202,50,10)}
}
// Billetes ⚑
const pesos=$('p3-pesos'),leyenda=$('p3-pesos-leyenda');leyenda.textContent=TEXTOS.pesos;
const verLeyenda=on=>{leyenda.hidden=!on};
pesos.addEventListener('pointerenter',()=>verLeyenda(true));pesos.addEventListener('pointerleave',()=>verLeyenda(false));pesos.addEventListener('focus',()=>verLeyenda(true));pesos.addEventListener('blur',()=>verLeyenda(false));
hacerGuardable(pesos,'pesos',{alGuardar:()=>verLeyenda(false)});
// Alacena con paquetes de aluminio: adentro una frase, no comida.
const paquetes=$('p3-paquetes');
TEXTOS.paquetes.forEach((frase,i)=>{const b=document.createElement('button');b.type='button';b.className='paquete';b.setAttribute('aria-label','Desenvolver un paquete de aluminio');b.innerHTML='<img src="'+RECURSOS.aluminio+'" alt=""><span></span>';b.querySelector('span').textContent=frase;b.onclick=()=>{if(recien(b))return;const abrir=!b.classList.contains('abierto');b.classList.toggle('abierto',abrir);b.querySelector('img').src=abrir?RECURSOS.aluminioAbierto:RECURSOS.aluminio;if(abrir&&!E.abiertos.includes(i)){E.abiertos.push(i);guardarEstado()}};paquetes.append(b);hacerGuardable(b,'aluminio',{alGuardar:()=>{b.hidden=true}})});
$('p3-alacena').onclick=()=>{E.alacena=!E.alacena;guardarEstado();actualizarPieza()};
// Mochila de cucharitas: se desparraman y se pueden ordenar.
const cuchContenedor=$('p3-cucharitas');
function crearCucharitas(){
 cuchContenedor.replaceChildren();if(!E.mochila)return;
 if(!E.cucharitas){E.cucharitas=Array.from({length:14},()=>({x:azar(22,60),y:azar(55,90),r:azar(-80,80),h:Math.floor(azar(0,4))}));guardarEstado()}
 E.cucharitas.forEach((c,i)=>{if(c.guardada)return;const b=document.createElement('button');b.type='button';b.className='cucharita';b.setAttribute('aria-label','Una cucharita de plástico');b.innerHTML='<img src="'+RECURSOS.cucharita+'" alt="">';b.querySelector('img').style.filter='hue-rotate('+[0,120,200,300][c.h]+'deg)';Object.assign(b.style,{left:c.x+'%',top:c.y+'%',transform:'translate(-50%,-50%) rotate('+c.r+'deg)'});cuchContenedor.append(b);
  hacerGuardable(b,'cucharitas',{libre:true,contenedor:escP3,alSoltar:()=>{c.x=parseFloat(b.style.left);c.y=parseFloat(b.style.top);guardarEstado()},alGuardar:()=>{c.guardada=true;guardarEstado();b.remove()}})});
}
$('p3-mochila').onclick=()=>{if(E.mochila)return;E.mochila=true;guardarEstado();actualizarPieza()};
function ordenarCucharitas(){if(!E.mochila){E.mochila=true;actualizarPieza()}E.cucharitas.forEach((c,i)=>{const a=i/E.cucharitas.length*Math.PI*2;c.x=40+Math.cos(a)*9;c.y=70+Math.sin(a)*15;c.r=a*180/Math.PI+90});guardarEstado();crearCucharitas()}
// Caja del jardín con un dibujo (ensayo gráfico de la v44, provisional).
$('p3-jardin').onclick=()=>{E.jardin=true;guardarEstado();actualizarPieza()};
hacerGuardable($('p3-dibujo'),'dibujo');
// Cama ⚑: con el cursor quieto encima, el niño se acuesta cruzado para ver la tele.
let camaTimer=0;const cama=$('p3-cama');
cama.addEventListener('pointermove',()=>{clearTimeout(camaTimer);camaTimer=setTimeout(()=>cama.classList.add('acostado'),1200)});
cama.addEventListener('pointerleave',()=>{clearTimeout(camaTimer);cama.classList.remove('acostado')});
// Robot ⚑: escondido; si se lo encuentra, camina y se puede guardar.
const robot=$('p3-robot');
function encontrarRobot(){if(!E.robot){E.robot=true;guardarEstado()}robot.classList.add('encontrado');robot.setAttribute('aria-label','El robot amarillo');robot.removeAttribute('data-cursor')}
robot.addEventListener('click',()=>{if(recien(robot))return;encontrarRobot()});
hacerGuardable(robot,()=>E.robot?'robot':'',{});
robot.dataset.guardable='';
// Botella ⚑: se enciende al acercarse; al alejarse los bichitos se apagan de a uno.
const botella=$('p3-botella');
['pointerenter','focus'].forEach(t=>botella.addEventListener(t,()=>botella.classList.add('encendida')));['pointerleave','blur'].forEach(t=>botella.addEventListener(t,()=>botella.classList.remove('encendida')));
hacerGuardable(botella,'botella');
// Mazo de cartas de memoria: una de tres, sorteadas en cada visita.
const EFECTOS=['robot','tele','cucharitas'];if(!Array.isArray(E.cartaEfectos)||E.cartaEfectos.length!==3){E.cartaEfectos=mezclar(EFECTOS);guardarEstado()}
const mazo=$('p3-mazo');
E.cartaEfectos.forEach((ef,i)=>{const b=document.createElement('button');b.type='button';b.className='carta';b.style.left=(i*24)+'%';b.style.top=(i%2?10:0)+'%';b.style.setProperty('--r',(i-1)*6+'deg');b.setAttribute('aria-label','Una carta boca abajo');b.innerHTML='<span class="cara dorso"><img src="'+RECURSOS.cartaDorso+'" alt=""></span><span class="cara frente"><img src="'+RECURSOS.cartaFrente+'" alt=""><p></p></span>';b.querySelector('p').textContent=TEXTOS.cartas[ef];b.onclick=()=>{if(E.carta!==null)return;E.carta=i;guardarEstado();aplicarCarta(ef);pintarMazo()};mazo.append(b)});
function aplicarCarta(ef){if(ef==='robot'&&FLAGS.robot)encontrarRobot();if(ef==='tele')escP3.classList.add('penumbra');if(ef==='cucharitas')ordenarCucharitas()}
function pintarMazo(){[...mazo.children].forEach((b,i)=>{b.classList.toggle('dada',E.carta===i);b.classList.toggle('descartada',E.carta!==null&&E.carta!==i);if(E.carta===i)b.setAttribute('aria-label','Carta: '+b.querySelector('p').textContent)})}
// Seguir: el scroll se detiene en la pieza hasta guardar algo o seguir.
$('p3-seguir').remove();
function actualizarPieza(){
 robot.hidden=enCaja('robot');if(E.robot&&!robot.classList.contains('encontrado'))robot.classList.add('encontrado');robot.dataset.guardable=E.robot?'robot':'';
 pesos.hidden=enCaja('pesos');botella.hidden=enCaja('botella');
 $('p3-alacena').setAttribute('aria-expanded',String(E.alacena));$('p3-alacena').setAttribute('aria-label',E.alacena?'Cerrar la alacena':'Abrir la alacena');paquetes.hidden=!E.alacena;
 if(enCaja('aluminio'))[...paquetes.children].forEach((p,i)=>{if(i===0&&!paquetes.querySelector('[hidden]'))p.hidden=true});
 const moch=$('p3-mochila');moch.querySelector('img').src=E.mochila?RECURSOS.mochilaAbierta:RECURSOS.mochila;moch.setAttribute('aria-label',E.mochila?'La mochila abierta':'Abrir la mochila');
 if(E.mochila&&!cuchContenedor.children.length)crearCucharitas();
 $('p3-jardin').querySelector('img').src=E.jardin?RECURSOS.jardinAbierta:RECURSOS.jardin;$('p3-dibujo').hidden=!E.jardin||enCaja('dibujo');
 $('p4-pila').querySelector('[data-fuente=globo]').hidden=!enCaja('pesos');
 $('p3').classList.toggle('quemada',E.fuego==='hecho');
 pintarMazo();
}
if(E.carta!==null&&E.cartaEfectos[E.carta]==='tele')escP3.classList.add('penumbra');
actualizarPieza();

/* ======================================================================
   PANTALLA 4: EL CUMPLEAÑOS INVENTADO (elegida)
   ====================================================================== */
const escP4=$('p4-escenario'),decoCapa=$('p4-deco'),nombre=$('p4-nombre');
nombre.textContent=E.nombre||'';
nombre.addEventListener('input',()=>{if(nombre.textContent.length>24)nombre.textContent=nombre.textContent.slice(0,24);E.nombre=nombre.textContent.trim();guardarEstado()});
nombre.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'){e.preventDefault();nombre.blur()}});
function crearDeco(d){
 const b=document.createElement('button');b.type='button';b.className='deco';b.dataset.tipo=d.tipo;b.setAttribute('aria-label',COSAS[d.tipo].nombre+' colgada');b.innerHTML='<img src="'+COSAS[d.tipo].src+'" alt="">';Object.assign(b.style,{left:d.x+'%',top:d.y+'%'});b.style.setProperty('--r',d.r+'deg');decoCapa.append(b);
 hacerGuardable(b,d.tipo,{libre:true,contenedor:escP4,alSoltar:()=>{d.x=parseFloat(b.style.left);d.y=parseFloat(b.style.top);guardarEstado()},alGuardar:()=>{E.deco=E.deco.filter(x=>x!==d);guardarEstado();b.remove()}});
}
E.deco.forEach(crearDeco);
document.querySelectorAll('#p4-pila [data-fuente]').forEach(b=>b.onclick=()=>{if(E.deco.length>=16)return;const tipo=b.dataset.fuente;const d={tipo,x:azar(30,70),y:tipo==='globo'?azar(30,50):azar(16,36),r:azar(-6,6)};E.deco.push(d);guardarEstado();crearDeco(d)});

/* ======================================================================
   PANTALLA 5: 2001 (opción A: dos zócalos opuestos)
   ====================================================================== */
const zocalos=[{el:$('p5-pais'),textos:TEXTOS.zocaloPais.map(t=>({t})),dir:-1,x:0,w:0,pausa:false},{el:$('p5-chico'),textos:TEXTOS.zocaloChico.filter(z=>!z.flag||FLAGS[z.flag]!==false),dir:1,x:0,w:0,pausa:false}];
zocalos.forEach(z=>{const pista=z.el.querySelector('.zocalo-pista');for(let k=0;k<2;k++){const grupo=document.createElement('div');grupo.style.display='flex';z.textos.forEach(o=>{const s=document.createElement('span');s.textContent=o.t;if(o.flag){s.dataset.flag=o.flag}grupo.append(s)});if(k)grupo.setAttribute('aria-hidden','true');pista.append(grupo)}z.pista=pista;z.el.addEventListener('pointerenter',()=>z.pausa=true);z.el.addEventListener('pointerleave',()=>z.pausa=false)});
let faseAnterior=0;const medirZocalos=()=>zocalos.forEach(z=>z.w=0);window.addEventListener('resize',medirZocalos);document.fonts.ready.then(medirZocalos);
function renderP5(dt){
 const vel=Math.max(0,(current-faseAnterior)/Math.max(dt,.001));
 zocalos.forEach((z,i)=>{if(!z.w)z.w=z.pista.firstChild.offsetWidth;if(reducido()){z.pista.style.transform='none';return}
  const base=55,v=i===0?base*(1+vel*5):base*Math.max(.06,1-vel*2.5);if(!z.pausa)z.x+=v*dt*z.dir;
  if(z.w){z.x=((z.x%z.w)+z.w)%z.w;z.pista.style.transform='translateX('+(-z.x)+'px)'}});
}

/* ======================================================================
   PANTALLA 6: EL FUEGO (opción B: elegir sin reloj; una sola cosa)
   ====================================================================== */
const p6=$('p6'),cosasP6=$('p6-cosas'),ceniza=$('p6-ceniza'),cenizaCtx=ceniza.getContext('2d');let fuegoArmado=false,quema=null,particulas=[],gateDesde=0;
function cosasDelFuego(){
 const L=[],sc=id=>!enCaja(id);
 L.push({src:RECURSOS.alacena,x:14,y:38,w:15,h:56,n:'la alacena'},{src:RECURSOS.tele,x:62,y:30,w:22,h:40,n:'la tele'},{src:RECURSOS.mochila,x:30,y:70,w:10,h:24,n:'la mochila'},{src:RECURSOS.jardin,x:47,y:76,w:12,h:18,n:'la caja del jardín'});
 if(FLAGS.cama)L.push({src:RECURSOS.cama,x:82,y:66,w:28,h:36,n:'la cama'});
 if(sc('pesos')&&FLAGS.pesos)L.push({id:'pesos',src:RECURSOS.billetes,x:62,y:8,w:8,h:9});
 if(sc('botella')&&FLAGS.bichitos)L.push({id:'botella',src:RECURSOS.botella,x:28,y:24,w:5,h:20});
 if(E.robot&&sc('robot')&&FLAGS.robot)L.push({id:'robot',src:RECURSOS.robot,x:38,y:44,w:6,h:14});
 if(E.jardin&&sc('dibujo'))L.push({id:'dibujo',src:RECURSOS.dibujoJardin,x:50,y:56,w:12,h:14});
 if(E.alacena&&sc('aluminio'))L.push({id:'aluminio',src:RECURSOS.aluminio,x:25,y:50,w:7,h:8});
 if(E.mochila&&sc('cucharitas'))L.push({id:'cucharitas',src:RECURSOS.cucharita,x:38,y:84,w:3,h:9});
 E.deco.forEach((d,i)=>L.push({id:d.tipo,deco:d,src:COSAS[d.tipo].src,x:20+((i*13)%60),y:10+((i*7)%14),w:d.tipo==='globo'?4:16,h:d.tipo==='globo'?14:6}));
 if(E.nombre&&sc('cartel'))L.push({id:'cartel',texto:E.nombre,src:RECURSOS.cartel,x:72,y:88,w:18,h:10});
 return L;
}
function armarFuego(){
 fuegoArmado=true;cosasP6.replaceChildren();
 cosasDelFuego().forEach(c=>{const salv=!!c.id;const el=document.createElement(salv?'button':'div');if(salv)el.type='button';el.className='cosa'+(salv?' salvable':'');Object.assign(el.style,{left:c.x+'%',top:c.y+'%',width:c.w+'%',height:c.h+'%'});el.style.setProperty('--r',azar(-4,4)+'deg');el.innerHTML='<img src="'+c.src+'" alt="">';
  if(salv){el.setAttribute('aria-label','Salvar: '+(c.texto?'el cartel «'+c.texto+'»':COSAS[c.id].nombre));if(c.texto){const s=document.createElement('span');s.className='nombre';s.textContent=c.texto;el.append(s)}
   // Mientras se quema se puede sacar una sola cosa. No hay aviso: se descubre o no.
   const elegir=()=>{if(E.fuego==='hecho'||E.salvoUno)return;if(guardar(c.id,{desde:el,texto:c.texto||'',forzar:true})){E.salvoUno=true;if(c.deco)E.deco=E.deco.filter(x=>x!==c.deco);el.remove();if(E.fuego==='pendiente')empezarQuema()}};
   el.addEventListener('click',()=>{if(!recien(el))elegir()});hacerGuardable(el,c.id,{});alGuardarDe.set(el,()=>{elegir();return true})}
  cosasP6.append(el)});
}
function empezarQuema(){
 if(E.fuego!=='pendiente')return;E.fuego='quemando';
 p6.classList.add('ardiendo');quema={inicio:performance.now(),dur:reducido()?1:7500};guardarEstado();
}
function terminarQuema(){
 quema=null;E.perdidos=[...cosasP6.children].map(el=>el.getAttribute('aria-label')||'');E.fuego='hecho';E.chamuscada=true;
 E.deco=[];decoCapa.replaceChildren();E.nombre='';nombre.textContent='';
 p6.classList.remove('ardiendo');p6.classList.add('consumido');cosasP6.replaceChildren();
 guardarEstado();pintarCaja();actualizarPieza();
}
function renderP6(now,dt,v){return; // Replaced by first-house.js scroll-driven material erosion.

 if(E.fuego==='pendiente'&&!fuegoArmado&&v>S.p6.s-.9)armarFuego();
 // El fuego empieza solo cuando la pieza quemada queda a la vista; no espera al visitante.
 const qScroll=Math.max(0,Math.min(1,(v-(S.p6.s-.5))/.95));
 if(E.fuego==='pendiente'&&fuegoArmado&&qScroll>0)empezarQuema();
 if(E.fuego==='hecho'){p6.classList.add('consumido');cosasP6.replaceChildren()}
 const W=ceniza.clientWidth,H=ceniza.clientHeight;if(ceniza.width!==W||ceniza.height!==H){ceniza.width=W;ceniza.height=H}
 let q=E.fuego==='hecho'?1:0;
 // El fuego avanza con el scroll: mientras bajás, se quema. Si parás, queda a medio quemar.
 if(quema){quema.q=Math.max(quema.q||0,qScroll);q=quema.q;if(!reducido()&&Math.random()<.6)for(let k=0;k<3;k++)particulas.push({x:azar(0,W),y:azar(H*.2,H),vx:azar(-8,8),vy:azar(-30,-10),r:azar(1,3.5),a:azar(.4,.9)});
  [...cosasP6.children].forEach(el=>{el.style.opacity=String(1-lowEase(.25,1,q))});$('casa-erosion-alfa').setAttribute('intercept',String(1-q*13));if(q>=1)terminarQuema()}
 $('p6-borde').style.setProperty('--q',String(q));
 cenizaCtx.clearRect(0,0,W,H);particulas=particulas.filter(p=>p.a>0.02);particulas.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.a*=E.fuego==='hecho'?.985:.995;cenizaCtx.fillStyle='rgba(190,186,178,'+p.a+')';cenizaCtx.fillRect(p.x,p.y,p.r,p.r*.7)});
}

/* ======================================================================
   PANTALLA 7: MAMÁ (opción A: solo texto)
   ====================================================================== */
const letrasP7=letras($('p7-frase'),TEXTOS.mama),letrasP7dir=letras($('p7-direccion'),$('p7-direccion').dataset.texto);
function renderP7(v){
 const b=S.p7.s,n=Math.round(Math.max(0,Math.min(1,(v-(b-.6))/.6))*letrasP7.length);
 const apagar=v>b+.25;letrasP7.forEach((l,i)=>{l.classList.toggle('escrita',reducido()?v>b-.6:i<n);l.classList.toggle('apagada',apagar&&i<letrasP7.length-1)});
 const m=Math.round(Math.max(0,Math.min(1,(v-(b+.3))/.45))*letrasP7dir.length);letrasP7dir.forEach((l,i)=>l.classList.toggle('escrita',i<m));
 // El storyboard pide que el cursor desaparezca solo mientras la frase se escribe.
 body.classList.toggle('casa-sin-cursor',v>b-.6&&v<b&&n<letrasP7.length&&!reducido());
}

/* ======================================================================
   CAPA 4: LA LUZ (parpadeo más frecuente a medida que se acerca el fuego)
   ====================================================================== */
let proximoParpadeo=performance.now()+9000;
function renderLuz(now,v){
 const primera=v>=S.p3.s-.3&&v<=P.p6Gate&&E.fuego==='pendiente',segunda=v>=S.p8.s&&v<S.p11.s-.3;
 if(reducido()||document.hidden||!adentro()||!(primera||segunda)||now<proximoParpadeo)return;
 const rango=segunda?[8000,15000]:v<S.p4.s?[9000,16000]:v<S.p5.s?[6000,11000]:[3000,6500];proximoParpadeo=now+azar(...rango);
 powerOverlay.animate([{opacity:0},{opacity:.22,offset:.1},{opacity:.05,offset:.25},{opacity:.28,offset:.4},{opacity:0}],{duration:750,easing:'linear'});
}

/* ======================================================================
   GANCHOS DEL MOTOR (los llama script.js)
   ====================================================================== */
function casaAdjustStep(step){return step}
function casaBlocksScroll(){return !!arrastre||!!dialDrag}
function casaBlocksKeys(e){return e.target===dial}

const SECCIONES=Object.entries(S).map(([id,sec])=>({el:$(id),...sec,d:2}));
function desplazamiento(sec,v){if(!sec.pin)return sec.s-v;const fin=sec.s+sec.h-1;if(v<sec.s)return sec.s-v;if(v<=fin)return 0;return -(v-fin)}
// Alto en pantallas de lo que ocupa cada sección en la página (las fijas ocupan una).
const alto=sec=>sec.pin?1:sec.h;
const visible=sec=>sec.d<1.02&&sec.d>-alto(sec)-.02;
const cerca=id=>visible(SECCIONES.find(x=>x.el.id===id));
SECCIONES.forEach(sec=>{if(!sec.pin&&sec.h!==1){sec.el.style.bottom='auto';sec.el.style.height=(sec.h*100)+'vh'}});
let instalada=false;
function casaRender(now,dt){
 renderLanding(now);
 const v=fase(),dentro=adentro();
 if(dentro&&v<1.2)return;
 // capas persistentes
 const inst=dentro&&v>P.instala;
 if(inst!==instalada){instalada=inst;body.classList.toggle('casa-instalada',inst);if(inst){body.classList.add('recien');setTimeout(()=>body.classList.remove('recien'),2000)}else{abrirCaja(false);radioPanel.hidden=true}}
 $('caja-instruccion').classList.toggle('visible',inst&&!E.instruccionVista&&E.caja.length===0&&E.fuego!=='hecho'&&v<S.p4.s);
 $('casa-layers').classList.toggle('atenuada',v>S.p7.s-.3&&v<S.p7.s+.9);
 body.classList.toggle('casa-oscura',dentro&&((typeof fondoOscuro==='function'&&fondoOscuro(v)&&v<S.p17.s-.5)||(typeof casa2Oscuro==='function'&&casa2Oscuro(v))));
 const casaActual=v>S.p12.s-.6?2:v>S.p7.s+.8?1:0;casasOri.forEach((b,i)=>b.setAttribute('aria-current',String(i===casaActual)));
 if(E.senal===0&&sounding&&music.volume>volumen+.001)music.volume=volumen;
 radio.classList.toggle('sonando',radioEncendida());
 // pantallas
 // pantallas apiladas: el scroll las desplaza en vertical, sin fundidos
 SECCIONES.forEach(sec=>{const d=dentro?desplazamiento(sec,v):2;sec.d=d;const vis=visible(sec);sec.el.style.visibility=vis?'visible':'hidden';if(vis)sec.el.style.transform='translate3d(0,'+(d*innerHeight).toFixed(1)+'px,0)';const viva=d<.45&&d>-alto(sec)+.55;sec.el.classList.toggle('viva',viva);sec.el.inert=!viva});
 if(!dentro){faseAnterior=current;body.classList.remove('casa-sin-cursor');return}
 if(cerca('p2'))renderP2(v);
 if(cerca('p3')){dibujarCanal(now);if(typeof piezaViva==='function')piezaViva(now,v)}
  if(v>S.p3.s-1.2&&v<S.p6.s+1.2)renderP5(dt);
 if(cerca('p6')||quema)renderP6(now,dt,v);
 if(v<P.p6Gate-.05)gateDesde=0;
 if(v<S.p6.s-1.2&&E.fuego==='pendiente')fuegoArmado=false;
 if(cerca('p7'))renderP7(v);else body.classList.remove('casa-sin-cursor');
 if(typeof casa2Render==='function')casa2Render(now,dt,v);
 if(typeof casa3Render==='function')casa3Render(now,dt,v);
 if(typeof casa4Render==='function')casa4Render(now,dt,v);
 if(typeof primeraCasaViva==='function')primeraCasaViva(now,dt,v);
 if(typeof casasVivas==='function')casasVivas(now,dt,v);
 renderLuz(now,v);
 nivelRuido();
 faseAnterior=current;
}
