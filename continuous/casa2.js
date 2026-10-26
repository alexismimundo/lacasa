// La Casa — etapa 2 del storyboard: segunda casa, Gabriela Mistral 4860 (pantallas 8 a 11).
// Se carga después de casa.js y usa su estado (E), su caja (guardar, hacerGuardable) y su
// mapa de recorrido (S, P). casa.js la llama con casa2Render, casa2Gate, casa2Oscuro y casa2Herramienta.
'use strict';

/* ======================================================================
   CONFIGURACIÓN EDITABLE (se suma a la de casa.js)
   ====================================================================== */
Object.assign(RECURSOS,{
 glicina:'assets/textural/fragment-90.webp',petalo:'assets/textural/fragment-39.webp',
 mora:'assets/textural/fragment-54.webp',bowl:'assets/textural/fragment-93.webp',bowlLleno:'assets/textural/fragment-94.webp',
 hojaLaurel:'assets/textural/fragment-39.webp',botellaAgua:'assets/textural/fragment-75.webp',moneda:'assets/textural/fragment-54.webp',
 vecina:'assets/textural/fragment-135.webp',vecinaSaluda:'assets/textural/fragment-134.webp',
 leche:'assets/textural/fragment-73.webp',lecheRota:'assets/textural/fragment-69.webp',
 tranquera:'assets/textural/fragment-108.webp',tranqueraAbierta:'assets/textural/fragment-107.webp'
});
RECURSOS.cursores.linterna='assets/provisional/cursor-linterna.svg';PUNTA.linterna=[24,8];
// ⚑ de la segunda casa. Las acciones que salen de la letra de La casa no se marcan.
Object.assign(FLAGS,{moral:true,bomba:true,basural:true,vacas:true,albumHuecos:true});
Object.assign(OPCIONES,{trepar:'B',oscuridad:'A'});
Object.assign(TEXTOS,{
 cartas2:{vecina:'[carta pendiente: del otro lado del alambrado]',ausencia:'[carta pendiente: lo que falta]',vacas:'[carta pendiente: las vacas]'},
 versiones:['archivo','recuerdo','falta']
});
Object.assign(COSAS,{
 glicina:{nombre:'Una flor de glicina',src:RECURSOS.glicina,unica:true},
 mora:{nombre:'Una mora',src:RECURSOS.mora,unica:true,flag:'moral'},
 agua:{nombre:'Una botella de agua de la bomba',src:RECURSOS.botellaAgua,unica:true,flag:'bomba'},
 laurel:{nombre:'Una hoja de laurel',src:RECURSOS.hojaLaurel,unica:true},
 centavos:{nombre:'Quince centavos',src:RECURSOS.moneda,unica:true,flag:'basural'}
});
E={trepado:false,p8Seguir:false,moras:0,agua:0,arbol:0,vecina:false,basural:0,tranquera:false,leche:'entera',carta2:null,cartaEfectos2:null,version:null,...E};
document.querySelectorAll('#p8 [data-flag],#p9 [data-flag],#p10 [data-flag],#p11 [data-flag]').forEach(el=>{if(FLAGS[el.dataset.flag]===false)el.classList.add('flag-off')});

/* ======================================================================
   PANTALLA 8: ENTRAR POR LA VENTANA DE ROBLE (opción B: clic sostenido)
   ====================================================================== */
const ninoP8=$('p8-nino');let trepando=null,pistaP8=0;
function pintarP8(){ninoP8.classList.toggle('adentro',!!E.trepado);ninoP8.disabled=!!E.trepado}
function empezarTrepar(){if(E.trepado||trepando)return;trepando={inicio:performance.now(),dur:reducido()?300:1700};ninoP8.classList.remove('cae')}
function soltarTrepar(){if(!trepando)return;const p=Math.min(1,(performance.now()-trepando.inicio)/trepando.dur);trepando=null;if(p<1){ninoP8.style.setProperty('--sube','0');ninoP8.classList.add('cae')}}
ninoP8.addEventListener('pointerdown',e=>{if(e.button!==0)return;ninoP8.setPointerCapture(e.pointerId);empezarTrepar()});
ninoP8.addEventListener('pointerup',soltarTrepar);ninoP8.addEventListener('pointercancel',soltarTrepar);
ninoP8.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();empezarTrepar()}});
ninoP8.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')soltarTrepar()});
function renderP8(now){
 if(trepando){const p=Math.min(1,(now-trepando.inicio)/trepando.dur);ninoP8.style.setProperty('--sube',p.toFixed(3));if(p>=1){trepando=null;E.trepado=true;guardarEstado();pintarP8()}}
}
pintarP8();
// La radio se apoya en el marco de la ventana mientras se ve la fachada.
const radioCapa=$('radio');let radioEnVentana=false;
function ubicarRadio(on){
 if(on){const r=$('p8-repisa').getBoundingClientRect();radioCapa.classList.add('en-ventana');radioCapa.style.left=(r.left+r.width/2-43)+'px';radioCapa.style.top=(r.top-58)+'px';radioCapa.style.bottom='auto'}
 else if(radioEnVentana){radioCapa.classList.remove('en-ventana');radioCapa.style.left=radioCapa.style.top=radioCapa.style.bottom=''}
 radioEnVentana=on;
}

/* ======================================================================
   PANTALLA 9: EL PASILLO, EL PATIO Y EL CAMPO (scroll horizontal fijo)
   ====================================================================== */
const ANCHO_P9=400; // vw del recorrido horizontal
// Glicinas del pasillo: al acercarse caen pétalos lila y sube el aroma.
const glicinas=$('p9-glicinas'),petalos=$('p9-petalos');
[12,25,39,56,71,86].forEach((x,i)=>{const b=document.createElement('button');b.type='button';b.className='p9-glicina';b.style.left=x+'vw';b.style.height=(26+(i%3)*5)+'vh';b.setAttribute('aria-label','Un racimo de glicina');b.innerHTML='<img src="'+RECURSOS.glicina+'" alt=""><svg class="aroma" viewBox="0 0 60 200" aria-hidden="true"><path d="M30 200c-20-30 20-50 0-80s20-50 0-80 10-30 0-40"/></svg>';glicinas.append(b);
 let ultimo=0;const caer=()=>{const t=performance.now();if(t-ultimo<220||reducido())return;ultimo=t;b.classList.add('aromando');setTimeout(()=>b.classList.remove('aromando'),1600);for(let k=0;k<3;k++){const p=document.createElement('img');p.src=RECURSOS.petalo;p.className='petalo';p.style.left='calc('+x+'vw + '+azar(-2,4)+'vw)';p.style.top=azar(14,30)+'vh';p.style.setProperty('--dx',azar(-6,6)+'vw');p.style.setProperty('--r',azar(-200,200)+'deg');petalos.append(p);setTimeout(()=>p.remove(),2600)}};
 b.addEventListener('pointermove',caer);b.addEventListener('focus',caer);
 hacerGuardable(b,'glicina');
});
// Moral ⚑: las moras se juntan en un bowl con azúcar.
const moras=$('p9-moras');
for(let i=0;i<7;i++){const m=document.createElement('button');m.type='button';m.className='p9-mora';m.style.left=(18+(i*13)%62)+'%';m.style.top=(14+(i*17)%40)+'%';m.setAttribute('aria-label','Una mora');m.innerHTML='<img src="'+RECURSOS.mora+'" alt="">';
 m.onclick=()=>{if(recien(m))return;E.moras++;guardarEstado();m.classList.add('cosechada');setTimeout(()=>{m.hidden=true},500);pintarBowl()};
 hacerGuardable(m,'mora',{alGuardar:()=>{m.hidden=true}});moras.append(m)}
function pintarBowl(){$('p9-bowl').querySelector('img').src=E.moras>=3?RECURSOS.bowlLleno:RECURSOS.bowl;[...moras.children].slice(0,E.moras).forEach(m=>m.hidden=true)}
$('p9-bowl').onclick=()=>{};pintarBowl();
// Laurel
hacerGuardable($('p9-hoja'),'laurel');
// El árbol: se trepa, y al rato ya no está. De la letra: alguien me lo ha arrancado.
const arbol=$('p9-arbol');let arbolTimer=0;
function pintarArbol(){arbol.classList.toggle('trepado',E.arbol===1);arbol.classList.toggle('arrancado',E.arbol===2);arbol.setAttribute('aria-label',E.arbol===2?'Donde estaba el árbol':'Trepar al árbol');arbol.disabled=E.arbol===2}
arbol.onclick=()=>{if(E.arbol)return;E.arbol=1;guardarEstado();pintarArbol();clearTimeout(arbolTimer);arbolTimer=setTimeout(()=>{E.arbol=2;guardarEstado();pintarArbol()},reducido()?1500:6000)};
if(E.arbol===1){E.arbol=2;guardarEstado()}pintarArbol();
// Bomba de agua ⚑: mantener apretado; el agua sale marrón y se aclara de a poco.
const bomba=$('p9-bomba'),chorro=$('p9-chorro');let bombeando=false;
function pintarAgua(){const a=Math.min(1,E.agua);chorro.style.setProperty('--claridad',a.toFixed(3));$('p9-agua').hidden=a<1||enCaja('agua')}
['pointerdown'].forEach(t=>bomba.addEventListener(t,e=>{if(e.button!==0)return;bomba.setPointerCapture(e.pointerId);bombeando=true}));
['pointerup','pointercancel','pointerleave'].forEach(t=>bomba.addEventListener(t,()=>{bombeando=false}));
bomba.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();bombeando=true}});bomba.addEventListener('keyup',()=>{bombeando=false});
hacerGuardable($('p9-agua'),'agua',{alGuardar:pintarAgua});pintarAgua();
// El alambrado: del otro lado hay alguien que responde las señas, pero no puede pasar.
const vecina=$('p9-vecina');let saludoTimer=0;
function aparecerVecina(){E.vecina=true;guardarEstado();vecina.classList.add('aparece');vecina.src=RECURSOS.vecinaSaluda;clearTimeout(saludoTimer);saludoTimer=setTimeout(()=>{vecina.src=RECURSOS.vecina},1400)}
$('p9-alambrado').onclick=()=>setTimeout(aparecerVecina,500);if(E.vecina)vecina.classList.add('aparece');
// Gavilán ⚑: revolver la pila descubre papeles, un rollo de tickets y 15 centavos.
const basural=$('p9-basural');let revuelto=0;
function pintarBasural(){basural.dataset.nivel=String(Math.min(3,E.basural));$('p9-centavos').hidden=E.basural<3||enCaja('centavos')}
function revolver(n){revuelto+=n;if(revuelto>40){revuelto=0;if(E.basural<3){E.basural++;guardarEstado();pintarBasural()}}}
basural.addEventListener('pointermove',e=>revolver(Math.abs(e.movementX)+Math.abs(e.movementY)>4?1:0));basural.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();revolver(41)}});
hacerGuardable($('p9-centavos'),'centavos',{alGuardar:pintarBasural});pintarBasural();
// La botella de leche: si se la mueve rápido, se cae y se rompe.
const leche=$('p9-leche');let lecheDrag=null;
function pintarLeche(){leche.classList.toggle('rota',E.leche==='rota');leche.querySelector('img').src=E.leche==='rota'?RECURSOS.lecheRota:RECURSOS.leche;leche.setAttribute('aria-label',E.leche==='rota'?'Una botella de leche rota':'Una botella de leche en la vereda')}
leche.addEventListener('pointerdown',e=>{if(e.button!==0||E.leche==='rota')return;leche.setPointerCapture(e.pointerId);lecheDrag={x:e.clientX,t:performance.now(),dx:0}});
leche.addEventListener('pointermove',e=>{if(!lecheDrag)return;const t=performance.now(),vel=Math.abs(e.clientX-lecheDrag.x)/Math.max(1,t-lecheDrag.t)*1000;lecheDrag.dx+=e.clientX-lecheDrag.x;lecheDrag.x=e.clientX;lecheDrag.t=t;leche.style.translate=Math.max(-120,Math.min(120,lecheDrag.dx))+'px 0';if(vel>1600){lecheDrag=null;E.leche='rota';guardarEstado();pintarLeche()}});
leche.addEventListener('pointerup',()=>{lecheDrag=null});pintarLeche();
// La tranquera y las vacas ⚑: cruzan el descampado; con la tranquera abierta entran al patio.
const tranquera=$('p9-tranquera');
function pintarTranquera(){tranquera.setAttribute('aria-pressed',String(E.tranquera));tranquera.setAttribute('aria-label',E.tranquera?'Cerrar la tranquera':'Abrir la tranquera');tranquera.querySelector('img').src=E.tranquera?RECURSOS.tranqueraAbierta:RECURSOS.tranquera;$('p9-vacas').classList.toggle('entran',E.tranquera)}
tranquera.onclick=()=>{E.tranquera=!E.tranquera;guardarEstado();pintarTranquera()};pintarTranquera();
// Mazo de la segunda casa (capa 8)
const EFECTOS2=['vecina','ausencia','vacas'];if(!Array.isArray(E.cartaEfectos2)||E.cartaEfectos2.length!==3){E.cartaEfectos2=mezclar(EFECTOS2);guardarEstado()}
const mazo2=$('p9-mazo');
E.cartaEfectos2.forEach((ef,i)=>{const b=document.createElement('button');b.type='button';b.className='carta';b.style.left=(i*24)+'%';b.style.top=(i%2?10:0)+'%';b.style.setProperty('--r',(i-1)*6+'deg');b.setAttribute('aria-label','Una carta boca abajo');b.innerHTML='<span class="cara dorso"><img src="'+RECURSOS.cartaDorso+'" alt=""></span><span class="cara frente"><img src="'+RECURSOS.cartaFrente+'" alt=""><p></p></span>';b.querySelector('p').textContent=TEXTOS.cartas2[ef];b.onclick=()=>{if(E.carta2!==null)return;E.carta2=i;guardarEstado();aplicarCarta2(ef);pintarMazo2()};mazo2.append(b)});
function aplicarCarta2(ef){if(ef==='vecina')aparecerVecina();if(ef==='ausencia'){E.irAFalta=true;guardarEstado()}if(ef==='vacas'&&FLAGS.vacas){E.tranquera=true;guardarEstado();pintarTranquera()}}
function pintarMazo2(){[...mazo2.children].forEach((b,i)=>{b.classList.toggle('dada',E.carta2===i);b.classList.toggle('descartada',E.carta2!==null&&E.carta2!==i);if(E.carta2===i)b.setAttribute('aria-label','Carta: '+b.querySelector('p').textContent)})}
pintarMazo2();
let ultimaAgua=0;
function renderP9(now,dt,v){
 const sec=S.p9,local=Math.max(0,Math.min(1,(v-sec.s)/(sec.h-1)));
 const x=-local*(ANCHO_P9-100);
 $('p9-medio').style.transform='translate3d('+x+'vw,0,0)';$('p9-frente').style.transform='translate3d('+x+'vw,0,0)';$('p9-fondo').style.transform='translate3d('+(x*.35)+'vw,0,0)';
 if(bombeando&&E.agua<1&&now-ultimaAgua>40){const paso=ultimaAgua?Math.min(.1,(now-ultimaAgua)/1000):.016;ultimaAgua=now;E.agua=Math.min(1,E.agua+paso*.35);if(E.agua>=1)guardarEstado();pintarAgua()}
 if(!bombeando)ultimaAgua=0;
 chorro.classList.toggle('sale',bombeando);
}

/* ======================================================================
   PANTALLA 10: LAS VERSIONES (la tira de papel de la v44)
   ====================================================================== */
const escena10=$('second-scene');$('p10').prepend(escena10);escena10.inert=false;escena10.removeAttribute('inert');
$('second-archive').append($('p10-eleccion'));
const objetos10=document.createElement('div');objetos10.id='p10-objetos';$('second-image').append(objetos10);
let firmaObjetos='';
function pintarObjetos10(){
 const ids=E.caja.map(c=>c.id).filter(id=>COSAS[id]);const firma=ids.join(',');if(firma===firmaObjetos)return;firmaObjetos=firma;objetos10.replaceChildren();
 ids.slice(0,9).forEach((id,i)=>{const w=document.createElement('div');w.className='p10-objeto';w.style.left=(6+i*10)+'%';w.style.setProperty('--r',((i%3)-1)*5+'deg');['foto','dibujo','hueco'].forEach((v,k)=>{const d=document.createElement('div');d.className='version v'+k+' '+v;if(k===2){d.style.webkitMaskImage=d.style.maskImage='url("'+COSAS[id].src+'")'}else{const im=document.createElement('img');im.src=COSAS[id].src;im.alt='';d.append(im)}w.append(d)});objetos10.append(w)});
}
function renderP10(dt){
 renderSecondComparison(dt);
 const c1=$('second-state-1').style.clipPath,c2=$('second-state-2').style.clipPath,idx=Math.round(secondValue);
 objetos10.querySelectorAll('.v1').forEach(el=>{el.style.clipPath=reducido()?'none':c1;el.style.opacity=reducido()?String(idx===1?1:0):'1'});
 objetos10.querySelectorAll('.v2').forEach(el=>{el.style.clipPath=reducido()?'none':c2;el.style.opacity=reducido()?String(idx===2?1:0):'1'});
 objetos10.querySelectorAll('.v0').forEach(el=>{el.style.opacity=reducido()?String(idx===0?1:0):'1'});
 $('p10-quedarme').disabled=!E.caja.length;if(E.version===null)pintarElegida();
}
$('p10-quedarme').onclick=()=>{E.version=Math.round(secondValue);guardarEstado();pintarElegida()};
function pintarElegida(){$('p10-elegida').textContent=E.version===null?(E.caja.length?'':'Tu caja está vacía: no hay objetos para elegir.'):'Te quedás con la versión «'+TEXTOS.versiones[E.version]+'» de lo que guardaste.'}
pintarElegida();
let faltaAplicada=false;

/* ======================================================================
   PANTALLA 11: EN LA OSCURIDAD (opción A: la linterna)
   ====================================================================== */
const p11=$('p11'),oscuro=$('p11-oscuro');let radioAntesDelApagon=null;
function luzEn(x,y){const r=p11.getBoundingClientRect(),q=$('p11-restos').getBoundingClientRect();oscuro.style.setProperty('--lx',(x-r.left)+'px');oscuro.style.setProperty('--ly',(y-r.top)+'px');$('p11-restos').style.setProperty('--lx',(x-q.left)+'px');$('p11-restos').style.setProperty('--ly',(y-q.top)+'px')}
p11.addEventListener('pointermove',e=>luzEn(e.clientX,e.clientY));
p11.addEventListener('focusin',e=>{const r=e.target.getBoundingClientRect();luzEn(r.left+r.width/2,r.top+r.height/2)});
const luzVuelve=()=>S.p11.s+.3;
function enApagon(v){return adentro()&&v>S.p11.s-.45&&v<luzVuelve()}
function renderP11(v){
 const apagon=enApagon(v),vuelta=v>=luzVuelve();
 p11.classList.toggle('apagon',apagon);p11.classList.toggle('luz-vuelve',vuelta);
}

/* ======================================================================
   GANCHOS
   ====================================================================== */
function casa2Gate(t,step){
 return null; // sin trabas: la ventana de roble no detiene el recorrido
 if(step>0&&!E.trepado&&!E.p8Seguir&&t<=P.p8Gate+.001&&t+step>P.p8Gate){const s=$('p8-seguir');s.classList.remove('empuje');void s.offsetWidth;s.classList.add('empuje');return Math.max(0,P.p8Gate-t)}
 return null;
}
function casa2Oscuro(v){return enApagon(v)}
function casa2Herramienta(t){
 const v=fase();if(enApagon(v))return 'linterna';
 if(t&&t.closest&&(t.closest('#p8-nino')||t.closest('#p9-bomba')))return 'mano-abierta';
 if(t&&t.closest&&t.closest('#p9-basural'))return 'mano-abierta';
 return null;
}
function casa2Render(now,dt,v){
 // radio en el marco de la ventana durante la fachada
 ubicarRadio(cerca('p8')&&Math.abs(SECCIONES.find(x=>x.el.id==='p8').d)<.5);
 if(cerca('p8'))renderP8(now);
 if(cerca('p9'))renderP9(now,dt,v);
 if(cerca('p10')){pintarObjetos10();renderP10(dt);if(E.irAFalta&&!faltaAplicada&&Math.abs(SECCIONES.find(x=>x.el.id==='p10').d)<.3){faltaAplicada=true;setSecondVersion(2,true)}}
 if(cerca('p11'))renderP11(v);
 // la radio se apaga en la oscuridad y vuelve con la luz
 const apagon=enApagon(v);
 if(apagon&&radioAntesDelApagon===null){radioAntesDelApagon=radioEncendida();if(radioAntesDelApagon)apagarRadio()}
 if(!apagon&&radioAntesDelApagon!==null){if(radioAntesDelApagon)encenderSenal();radioAntesDelApagon=null}
 $('casa-layers').classList.toggle('apagon',apagon);
}
