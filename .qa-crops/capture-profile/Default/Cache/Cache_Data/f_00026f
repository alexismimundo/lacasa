// La Casa — etapa 3 del storyboard: tercera casa, Terrero 3231 (pantallas 12 a 15).
// Se carga después de casa2.js. Usa el estado (E), la caja, la radio y el recorrido de casa.js.
// casa.js la llama con casa3Render, casa3Step y casa3Herramienta.
'use strict';

/* ======================================================================
   CONFIGURACIÓN EDITABLE
   ====================================================================== */
Object.assign(RECURSOS,{
 baldosa:'assets/textural/fragment-18.webp',plato:'assets/textural/fragment-93.webp',vaso:'assets/textural/fragment-94.webp',cubiertos:'assets/textural/fragment-40.webp',
 cuadernoEscuela:'assets/textural/fragment-105.webp',cuadernoEscuelaAbierto:'assets/textural/fragment-63.webp',
 barrio:'assets/textural/fragment-129.webp',estacion:'assets/textural/fragment-35.webp',calle:'assets/textural/fragment-43.webp',
 // Lo que se ve en el retrovisor: fragmentos de las pantallas anteriores.
 retrovisor:['assets/textural/fragment-83.webp','assets/textural/fragment-31.webp','assets/low-tv.webp','assets/marco-ventana.webp','assets/daily-table.webp']
});
RECURSOS.cursores.lapiz='assets/provisional/cursor-lapiz.svg';PUNTA.lapiz=[4,28];
RECURSOS.cursores.manubrio='assets/provisional/cursor-manubrio.svg';PUNTA.manubrio=[16,14];
Object.assign(FLAGS,{daisy:true,cuaderno:true,naipes:true,discografia:true,mimundo:true,escuelita:true});
Object.assign(OPCIONES,{ceramica:'A',bicicleta:'C'});
Object.assign(TEXTOS,{
 ceramica:'ahora tengo cerámica',
 cartas3:{daisy:'[carta pendiente: el camión que se acerca]',juntos:'[carta pendiente: cuando estábamos todos]',cuaderno:'[carta pendiente: la escuela]'},
 // Discografía imaginaria ⚑: el storyboard nombra solo la primera. El resto queda para tus títulos y años.
 discos:[{titulo:'La fiesta va a comenzar',anio:'[año]'},{titulo:'[título pendiente]',anio:'[año]'},{titulo:'[título pendiente]',anio:'[año]'},{titulo:'[título pendiente]',anio:'[año]'},{titulo:'[título pendiente]',anio:'[año]'},{titulo:'[título pendiente]',anio:'[año]'}],
 cd:'Otra canción tuya · fragmento pendiente'
});
Object.assign(COSAS,{plato:{nombre:'El plato que quedó en el centro',src:RECURSOS.plato,unica:true}});
E={carta3:null,cartaEfectos3:null,huella:{confirmado:'',borrador:'',sucio:false,editando:true},compartir:null,...E};
document.querySelectorAll('#p12 [data-flag],#p13 [data-flag],#p14 [data-flag],#p15 [data-flag]').forEach(el=>{if(FLAGS[el.dataset.flag]===false)el.classList.add('flag-off')});
const local=(sec,v)=>Math.max(0,Math.min(1,(v-sec.s)/Math.max(.001,sec.h-1)));
const desp=id=>SECCIONES.find(x=>x.el.id===id).d;

/* ======================================================================
   PANTALLA 12: LA CERÁMICA (opción A: se coloca sola con el scroll)
   ====================================================================== */
const piso=$('p12-piso');let baldosas=[];
function armarPiso(){
 const lado=Math.max(70,Math.round(innerWidth/14)),cols=Math.ceil(innerWidth/lado)+1,filas=Math.ceil(innerHeight/lado)+1;
 piso.style.setProperty('--lado',lado+'px');piso.replaceChildren();baldosas=[];
 // Se colocan de abajo hacia arriba, fila por fila, como se pone un piso.
 for(let f=filas-1;f>=0;f--)for(let c=0;c<cols;c++){const b=document.createElement('span');b.className='baldosa';b.style.left=(c*lado)+'px';b.style.top=(f*lado)+'px';b.style.rotate=((f+c)%2?90:0)+'deg';piso.append(b);baldosas.push(b)}
}
armarPiso();window.addEventListener('resize',armarPiso);
piso.parentElement.addEventListener('pointermove',e=>{const r=piso.getBoundingClientRect();piso.style.setProperty('--mx',(e.clientX-r.left)+'px');piso.style.setProperty('--my',(e.clientY-r.top)+'px');piso.classList.add('barro')});
piso.parentElement.addEventListener('pointerleave',()=>piso.classList.remove('barro'));
$('p12-frase').textContent=TEXTOS.ceramica;
const letrasP12=letras($('p12-direccion'),$('p12-direccion').dataset.texto);let colocadas=-1;
function renderP12(v){
 const prog=reducido()?(v>S.p12.s-.9?1:0):Math.max(0,Math.min(1,(v-(S.p12.s-.95))/1.5)),n=Math.round(prog*baldosas.length);
 if(n!==colocadas){baldosas.forEach((b,i)=>b.classList.toggle('puesta',i<n));colocadas=n}
 const m=Math.round(Math.max(0,Math.min(1,(v-(S.p12.s-.2))/.5))*letrasP12.length);letrasP12.forEach((l,i)=>l.classList.toggle('escrita',i<m));
 $('p12-frase').classList.toggle('visible',v>S.p12.s-.3);
}

/* ======================================================================
   PANTALLA 13: LA MESA QUE SE SEPARA (monótono)
   ====================================================================== */
const esc13=$('p13-escenario'),cosas13=$('p13-cosas');
// x, y en % del escenario. La mesa ocupa el centro; con el scroll todo se aleja hacia los bordes.
const MESA=[
 {tipo:'plato',x:50,y:50,quieto:true,id:'plato'},{tipo:'plato',x:33,y:34},{tipo:'plato',x:67,y:34},{tipo:'plato',x:33,y:66},{tipo:'plato',x:67,y:66},
 {tipo:'vaso',x:42,y:28},{tipo:'vaso',x:58,y:72},{tipo:'vaso',x:76,y:50},{tipo:'cubiertos',x:24,y:48},{tipo:'cubiertos',x:79,y:62},
 {tipo:'naipes',x:50,y:28,flag:'naipes'},{tipo:'cuaderno',x:58,y:30,flag:'cuaderno'}
];
const TAM={plato:[11,19],vaso:[5,9],cubiertos:[3.4,15],naipes:[16,17],cuaderno:[12,17]};
let juntosHasta=0;
MESA.forEach(o=>{
 if(o.flag&&FLAGS[o.flag]===false)return;
 let el;
 if(o.tipo==='naipes')el=esc13.querySelector('.p13-naipes');
 else if(o.tipo==='cuaderno')el=$('p13-cuaderno-wrap');
 else{el=document.createElement('button');el.type='button';el.className='p13-cosa';el.innerHTML='<img src="'+RECURSOS[o.tipo]+'" alt="">';el.setAttribute('aria-label',o.quieto?'El plato del centro':'Un '+(o.tipo==='cubiertos'?'par de cubiertos':o.tipo));cosas13.append(el)}
 o.el=el;o.off={x:0,y:0};o.suelto=0;const[w,h]=TAM[o.tipo];Object.assign(el.style,{width:w+'%',height:h+'%'});
 const dx=o.x-50,dy=o.y-50,len=Math.hypot(dx,dy)||1;o.dir={x:dx/len,y:dy/len};
 if(o.quieto){hacerGuardable(el,'plato',{alGuardar:()=>{el.hidden=true}})}
 else if(o.tipo!=='cuaderno'){
  // Arrastrar algo de vuelta al centro: se queda un instante y vuelve a irse.
  let a=null;
  el.addEventListener('pointerdown',e=>{if(e.button!==0)return;el.setPointerCapture(e.pointerId);a={x:e.clientX,y:e.clientY,ox:o.off.x,oy:o.off.y};o.suelto=0;e.preventDefault()});
  el.addEventListener('pointermove',e=>{if(!a)return;const r=esc13.getBoundingClientRect();o.off.x=a.ox+(e.clientX-a.x)/r.width*100;o.off.y=a.oy+(e.clientY-a.y)/r.height*100});
  const fin=()=>{if(!a)return;a=null;o.suelto=performance.now()+700};el.addEventListener('pointerup',fin);el.addEventListener('pointercancel',fin);
 }
});
const puerta13=$('p13-puerta');
function renderP13(now,dt,v){
 let drift=Math.max(0,Math.min(1,(v-(S.p13.s-.7))/1.1));
 if(now<juntosHasta){const r=(juntosHasta-now)/4000;drift*=r>.4?0:1-r/.4}
 MESA.forEach(o=>{if(!o.el)return;
  if(o.suelto&&now>o.suelto){const k=1-Math.exp(-2.2*dt);o.off.x-=o.off.x*k;o.off.y-=o.off.y*k;if(Math.hypot(o.off.x,o.off.y)<.2){o.off.x=o.off.y=0;o.suelto=0}}
  const d=o.quieto?0:drift*(o.tipo==='cuaderno'||o.tipo==='naipes'?34:44)*(1+((o.x*7)%5)/10);
  o.el.style.left=(o.x+o.dir.x*d*1.1+o.off.x)+'%';o.el.style.top=(o.y+o.dir.y*d*.95+o.off.y)+'%';
  o.el.style.rotate=(o.quieto?0:drift*((o.x+o.y)%2?14:-11))+'deg';
 });
 const cierre=Math.max(0,Math.min(1,(drift-.72)/.28));puerta13.style.opacity=String(Math.min(1,cierre*3));puerta13.style.transform='translate(-50%,-50%) perspective(900px) rotateY('+(-75*(1-cierre))+'deg)';
 $('p13-escenario').querySelector('.p13-mesa').style.opacity=String(1-drift*.55);
 renderParlante(now);renderDaisy(now);
}
// El parlante: otra música, que sube cuando el cursor se acerca y baja la del álbum.
let parlanteCerca=0,parlanteGain=null,proximaNota=0,notaIdx=0;const NOTAS=[392,523.25,440,329.63,392,293.66];
const parlante=$('p13-parlante');
esc13.addEventListener('pointermove',e=>{const r=parlante.getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));parlanteCerca=Math.max(0,Math.min(1,1-(d-60)/360))});
esc13.addEventListener('pointerleave',()=>{parlanteCerca=0});
parlante.addEventListener('focus',()=>{parlanteCerca=1});parlante.addEventListener('blur',()=>{parlanteCerca=0});
parlante.onclick=()=>{if(!radioEncendida())encenderSenal();parlanteCerca=1};
function renderParlante(now){
 const viva=Math.abs(desp('p13'))<.5,on=viva&&radioEncendida();
 parlante.classList.toggle('sonando',on);parlante.style.setProperty('--cerca',(on?.25+parlanteCerca*.75:0).toFixed(2));
 if(!on){if(parlanteGain)parlanteGain.gain.setTargetAtTime(0,ctx.currentTime,.1);return}
 if(!asegurarAudio())return;if(!parlanteGain){parlanteGain=ctx.createGain();parlanteGain.gain.value=0;parlanteGain.connect(ctx.destination)}
 parlanteGain.gain.setTargetAtTime((.02+parlanteCerca*.11)*volumen,ctx.currentTime,.12);
 if(now>proximaNota){proximaNota=now+320;const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.frequency.value=NOTAS[notaIdx++%NOTAS.length];g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(.6,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.3);o.connect(g).connect(parlanteGain);o.start();o.stop(ctx.currentTime+.32)}
}
// Daisy ⚑: si el visitante espera, se escucha un camión a lo lejos y ella ladra antes de que llegue.
const daisy=$('p13-daisy');let camion=null,proximoCamion=0;
function sonidoCamion(){if(!radioEncendida()||!asegurarAudio())return;const n=ctx.createBufferSource(),buf=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),d=buf.getChannelData(0);let last=0;for(let i=0;i<d.length;i++){last=last*.97+(Math.random()*2-1)*.03;d[i]=last*6}n.buffer=buf;const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=220;const g=ctx.createGain();g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(.35*volumen,ctx.currentTime+3.2);g.gain.linearRampToValueAtTime(0,ctx.currentTime+4);n.connect(f).connect(g).connect(ctx.destination);n.start()}
function sonidoLadrido(){if(!radioEncendida()||!asegurarAudio())return;[0,.28].forEach(t=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(520,ctx.currentTime+t);o.frequency.exponentialRampToValueAtTime(260,ctx.currentTime+t+.14);g.gain.setValueAtTime(0,ctx.currentTime+t);g.gain.linearRampToValueAtTime(.12*volumen,ctx.currentTime+t+.01);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+t+.16);o.connect(g).connect(ctx.destination);o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+.18)})}
function llegaCamion(now){if(camion||FLAGS.daisy===false)return;camion={inicio:now};sonidoCamion()}
function renderDaisy(now){
 if(FLAGS.daisy===false)return;
 const viva=Math.abs(desp('p13'))<.3;
 if(viva&&!proximoCamion)proximoCamion=now+6000;
 if(viva&&!camion&&proximoCamion&&now>proximoCamion)llegaCamion(now);
 if(camion){const t=now-camion.inicio;daisy.classList.toggle('despierta',t>1800&&t<5200);if(t>1800&&!camion.ladro){camion.ladro=true;sonidoLadrido()}if(t>5200){camion=null;proximoCamion=now+azar(14000,22000)}}
}
// Cuaderno de la escuela ⚑
const cuaderno13=$('p13-cuaderno');
function abrirCuaderno13(abrir){cuaderno13.setAttribute('aria-expanded',String(abrir));cuaderno13.querySelector('img').src=abrir?RECURSOS.cuadernoEscuelaAbierto:RECURSOS.cuadernoEscuela;$('p13-cuaderno-wrap').classList.toggle('abierto',abrir);cuaderno13.setAttribute('aria-label',abrir?'Cerrar el cuaderno de la escuela':'Abrir el cuaderno de la escuela')}
cuaderno13.onclick=()=>abrirCuaderno13(cuaderno13.getAttribute('aria-expanded')!=='true');
// Mazo de la tercera casa: entre el juego de cartas a medio jugar.
const EFECTOS3=['daisy','juntos','cuaderno'];if(!Array.isArray(E.cartaEfectos3)||E.cartaEfectos3.length!==3){E.cartaEfectos3=mezclar(EFECTOS3);guardarEstado()}
const mazo3=$('p13-mazo');
E.cartaEfectos3.forEach((ef,i)=>{const b=document.createElement('button');b.type='button';b.className='carta';b.style.left=(i*24)+'%';b.style.top=(i%2?10:0)+'%';b.style.setProperty('--r',(i-1)*6+'deg');b.setAttribute('aria-label','Una carta boca abajo');b.innerHTML='<span class="cara dorso"><img src="'+RECURSOS.cartaDorso+'" alt=""></span><span class="cara frente"><img src="'+RECURSOS.cartaFrente+'" alt=""><p></p></span>';b.querySelector('p').textContent=TEXTOS.cartas3[ef];b.onclick=()=>{if(E.carta3!==null)return;E.carta3=i;guardarEstado();aplicarCarta3(ef);pintarMazo3()};mazo3.append(b)});
function aplicarCarta3(ef){const now=performance.now();if(ef==='daisy')llegaCamion(now);if(ef==='juntos')juntosHasta=now+4000;if(ef==='cuaderno'&&FLAGS.cuaderno)abrirCuaderno13(true)}
function pintarMazo3(){[...mazo3.children].forEach((b,i)=>{b.classList.toggle('dada',E.carta3===i);b.classList.toggle('descartada',E.carta3!==null&&E.carta3!==i);if(E.carta3===i)b.setAttribute('aria-label','Carta: '+b.querySelector('p').textContent)})}
pintarMazo3();

/* ======================================================================
   PANTALLA 14: LA PUERTA Y EL CUADERNO
   ====================================================================== */
// Páginas de la izquierda: discografía imaginaria ⚑ y «Mi mundo» ⚑.
const tapas=$('p14-tapas'),COLORES=['#c9b6dd','#f3d9a8','#a9c4e2','#dfe9d9','#e8c2c2','#b39bd0'];
TEXTOS.discos.forEach((d,i)=>{const t=document.createElement('figure');t.className='p14-tapa';t.style.setProperty('--c',COLORES[i%COLORES.length]);t.style.rotate=((i%3)-1)*3+'deg';t.innerHTML='<span class="disco"></span><figcaption></figcaption>';t.querySelector('figcaption').textContent=d.titulo+' · '+d.anio;tapas.append(t)});
const FUENTES=['Georgia,serif','MonumentMono,monospace','"Comic Sans MS","Chalkboard",cursive','"Brush Script MT",cursive','"Courier New",monospace','"Trebuchet MS",sans-serif','"Times New Roman",serif','Impact,sans-serif'];
const mundo=$('p14-mimundo');for(let i=0;i<14;i++){const s=document.createElement('span');s.textContent='mi mundo';s.style.fontFamily=FUENTES[i%FUENTES.length];s.style.fontSize=(13+(i*7)%14)+'px';s.style.rotate=((i*13)%9-4)+'deg';mundo.append(s)}
const paginas=[...document.querySelectorAll('.p14-pagina')].filter(p=>FLAGS[p.dataset.flag]!==false);let pagina=0;
function pintarPagina(){document.querySelectorAll('.p14-pagina').forEach(p=>p.hidden=true);if(paginas[pagina])paginas[pagina].hidden=false;$('p14-numero').textContent=paginas.length?(pagina+1)+' / '+paginas.length:'';$('p14-anterior').disabled=pagina===0;$('p14-siguiente').disabled=pagina>=paginas.length-1}
$('p14-anterior').onclick=()=>{pagina=Math.max(0,pagina-1);pintarPagina()};$('p14-siguiente').onclick=()=>{pagina=Math.min(paginas.length-1,pagina+1);pintarPagina()};pintarPagina();
// La frase del visitante: borrador separado del texto confirmado, como en la v44.
const H=E.huella,texto14=$('p14-texto');
function pintarHuella(){
 texto14.value=H.borrador;$('p14-cuenta').textContent=H.borrador.length+' / 180';$('p14-estado').textContent=H.sucio?'borrador sin guardar':'';
 $('p14-form').classList.toggle('cerrado',!H.editando);texto14.hidden=!H.editando;$('p14-form').querySelector('[type=submit]').hidden=!H.editando;
 $('p14-confirmado').hidden=!H.confirmado||H.editando;$('p14-confirmado').textContent=H.confirmado;
 $('p14-editar').hidden=!H.confirmado||H.editando;$('p14-borrar').hidden=!H.confirmado||H.editando;
 $('p14-compartir').hidden=!H.confirmado;document.querySelectorAll('[data-compartir]').forEach(b=>b.setAttribute('aria-pressed',String(E.compartir===b.dataset.compartir)));
}
texto14.addEventListener('input',()=>{H.borrador=texto14.value.replace(/\r\n?/g,'\n').slice(0,180);H.sucio=H.borrador.trim()!==H.confirmado;guardarEstado();$('p14-cuenta').textContent=H.borrador.length+' / 180';$('p14-estado').textContent=H.sucio?'borrador sin guardar':''});
$('p14-form').onsubmit=e=>{e.preventDefault();const t=H.borrador.trim();if(!t){$('p14-estado').textContent='No escribiste nada: podés seguir igual.';return}H.confirmado=t;H.borrador=t;H.sucio=false;H.editando=false;guardarEstado();pintarHuella()};
$('p14-editar').onclick=()=>{H.editando=true;if(!H.sucio)H.borrador=H.confirmado;guardarEstado();pintarHuella();texto14.focus()};
$('p14-borrar').onclick=()=>{H.confirmado='';H.borrador='';H.sucio=false;H.editando=true;E.compartir=null;guardarEstado();pintarHuella()};
document.querySelectorAll('[data-compartir]').forEach(b=>b.onclick=()=>{E.compartir=b.dataset.compartir;guardarEstado();pintarHuella()});
$('p14-revisar').onclick=()=>abrirCaja(true);
pintarHuella();
// La escuelita ⚑: una puerta usada como pizarrón. El trazo de tiza vive solo durante la visita.
const tiza=$('p14-tiza'),tizaCtx=tiza.getContext('2d');let tizaTrazo=null;
function medirTiza(){const r=tiza.getBoundingClientRect();if(!r.width)return;const img=tiza.width?tizaCtx.getImageData(0,0,tiza.width,tiza.height):null;tiza.width=Math.round(r.width);tiza.height=Math.round(r.height);if(img)tizaCtx.putImageData(img,0,0)}
tiza.addEventListener('pointerdown',e=>{if(e.button!==0)return;if(!tiza.width)medirTiza();tiza.setPointerCapture(e.pointerId);const r=tiza.getBoundingClientRect();tizaTrazo={x:(e.clientX-r.left)*tiza.width/r.width,y:(e.clientY-r.top)*tiza.height/r.height};e.preventDefault()});
tiza.addEventListener('pointermove',e=>{if(!tizaTrazo)return;const r=tiza.getBoundingClientRect(),x=(e.clientX-r.left)*tiza.width/r.width,y=(e.clientY-r.top)*tiza.height/r.height;tizaCtx.strokeStyle='rgba(245,244,236,.85)';tizaCtx.lineWidth=2.6;tizaCtx.lineCap='round';for(let k=0;k<3;k++){tizaCtx.globalAlpha=.35+Math.random()*.4;tizaCtx.beginPath();tizaCtx.moveTo(tizaTrazo.x+azar(-1,1),tizaTrazo.y+azar(-1,1));tizaCtx.lineTo(x+azar(-1,1),y+azar(-1,1));tizaCtx.stroke()}tizaCtx.globalAlpha=1;tizaTrazo={x,y}});
['pointerup','pointercancel'].forEach(t=>tiza.addEventListener(t,()=>{tizaTrazo=null}));
$('p14-borrador').onclick=()=>tizaCtx.clearRect(0,0,tiza.width,tiza.height);
// Los CDs: tocar uno cambia la radio a un fragmento de otra canción tuya (pendiente).
const cdNota=document.createElement('p');cdNota.id='p14-cd-nota';cdNota.setAttribute('role','status');$('p14-cds').append(cdNota);
for(let i=0;i<7;i++){const b=document.createElement('button');b.type='button';b.className='p14-cd';b.style.bottom=(8+i*11.2)+'%';b.setAttribute('aria-label','Un CD');b.onclick=()=>{cdNota.textContent=TEXTOS.cd;$('radio-ahora').textContent=TEXTOS.cd;if(radioEncendida()&&asegurarAudio()){const g=ctx.createGain();g.gain.value=.05*volumen;const n=ctx.createBufferSource();n.buffer=ctx.createBuffer(1,ctx.sampleRate*.5,ctx.sampleRate);const d=n.buffer.getChannelData(0);for(let k=0;k<d.length;k++)d[k]=Math.random()*2-1;n.connect(g).connect(ctx.destination);n.start()}clearTimeout(b._t);b._t=setTimeout(()=>{cdNota.textContent=''},3500)};$('p14-cd-botones').append(b)}
let tizaMedida=false;
function renderP14(){if(!tizaMedida&&Math.abs(desp('p14'))<.5){medirTiza();tizaMedida=true}}

/* ======================================================================
   PANTALLA 15: LA BICICLETA (opción C: el retrovisor, sobre el paisaje que pasa)
   ====================================================================== */
const reflejo=$('p15-reflejo');RECURSOS.retrovisor.forEach(src=>{const im=document.createElement('img');im.src=src;im.alt='';reflejo.append(im)});
let velBici=0,maxBici=0,derrapeHasta=0,ultimaFase=0;
function renderP15(now,dt,v){
 const p=local(S.p15,v),vel=Math.max(0,(current-ultimaFase)/Math.max(dt,.001));ultimaFase=current;
 velBici+=(vel-velBici)*(1-Math.exp(-8*dt));maxBici=Math.max(maxBici*Math.exp(-1.2*dt),velBici);
 if(maxBici>.35&&velBici<.03&&now>derrapeHasta&&p>0&&p<.98){derrapeHasta=now+1300;maxBici=0}
 const derrape=now<derrapeHasta,W=innerWidth,red=reducido();
 const estira=red?1:1+Math.min(.28,velBici*.5),blur=red?0:Math.min(4,velBici*5);
 $('p15-lejos').style.backgroundPositionX=(-p*W*1.2)+'px';$('p15-cerca').style.backgroundPositionX=(-p*W*3.2)+'px';$('p15-calle').style.backgroundPositionX=(-p*W*5)+'px';
 ['p15-lejos','p15-cerca'].forEach(id=>{const el=$(id);el.style.transform='scaleX('+estira.toFixed(3)+')';el.style.filter=blur>.2?'blur('+blur.toFixed(1)+'px)':'none'});
 $('p15-bici').classList.toggle('derrapa',derrape);
 $('p15-ciclista').style.translate='0 '+(red?0:Math.sin(p*120)*2*Math.min(1,velBici*4)).toFixed(1)+'px';
 // En el retrovisor las pantallas anteriores se ven hacia atrás, cada vez más chicas.
 const esc=1-p*.55,ancho=reflejo.scrollWidth*esc,ventanita=$('p15-retrovisor').clientWidth;reflejo.style.transform='translateX('+(-p*Math.max(0,ancho-ventanita*.6)).toFixed(1)+'px) scale('+esc.toFixed(3)+')';
 const llega=Math.max(0,Math.min(1,(p-.62)/.38));$('p15-ventana-lejos').style.opacity=String(llega);$('p15-ventana-lejos').style.transform='translateX(-50%) scale('+(.15+llega*.85).toFixed(3)+')';
}

/* ======================================================================
   GANCHOS
   ====================================================================== */
function casa3Step(t,step){
 // La mesa es monótona a propósito: el scroll rinde menos.
 return step;
}
function casa3Herramienta(t){
 if(t&&t.closest&&t.closest('#p14-cuaderno,#p14-pizarron'))return 'lapiz';
 if(Math.abs(desp('p15'))<.3)return 'manubrio';
 return null;
}
let musicaBajada=false;
function casa3Render(now,dt,v){
 if(cerca('p12'))renderP12(v);
 if(cerca('p13'))renderP13(now,dt,v);else if(parlanteGain&&ctx)parlanteGain.gain.setTargetAtTime(0,ctx.currentTime,.1);
 if(cerca('p14'))renderP14();
 if(cerca('p15'))renderP15(now,dt,v);else ultimaFase=current;
 // En Terrero la radio suena lejos, como desde otro cuarto, y el parlante la tapa al acercarse.
 const enMesa=Math.abs(desp('p13'))<.6,factor=enMesa?.45*(1-parlanteCerca*.75):1;
 if(sounding&&E.senal===0){const obj=volumen*factor;if(factor<1){musicaBajada=true;fadeId++;music.volume=Math.max(0,Math.min(1,music.volume+(obj-music.volume)*(1-Math.exp(-4*dt))))}else if(musicaBajada){music.volume=Math.min(obj,music.volume+dt*.35);if(music.volume>=obj-.002)musicaBajada=false}}
}
