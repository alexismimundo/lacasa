// Stage 1 only: phase-driven placeholders, using the existing narrative clock.
(()=>{'use strict';
 const escenas=Object.freeze([
  {id:'oscuridad',nombre:'A · Casa II: de la oscuridad a la luz',inicio:8.6,fin:10.6,rumboEntrada:8.6,fondo:'#0b0b0d',cancion:'Daiana',fragmentoAudio:null,memoria:'a mi mamá le encantaba el moral / juntaba moras en un tupper / y las guardaba en la heladera',assets:['assets/casa2/pasillo-noche.webp','assets/casa2/tapa-carton.webp','assets/casa2/glicina-flor.png',...Array.from({length:8},(_,i)=>'assets/casa2/hueco-'+String(i+1).padStart(2,'0')+'.png')]},
  {id:'madrugada',nombre:'B · El niño y la madrugada',inicio:10.6,fin:12.6,rumboEntrada:10.6,fondo:'#2E4F86',cancion:'El niño',fragmentoAudio:null,memoria:'me encantaba treparme al ligustro / y construir casitas ahí arriba',assets:['assets/casa2/cielo.webp','assets/casa2/horizonte.png','assets/casa2/pasto.png','assets/casa2/restos-casa.webp',...Array.from({length:8},(_,i)=>'assets/casa2/nino-corre-'+String(i+1).padStart(2,'0')+'.png')]},
  {id:'terrero',nombre:'C · Terrero: la lluvia y la mesa',inicio:12.6,fin:15.8,rumboEntrada:12.6,fondo:'#f4f4f1',cancion:"Papa ra'y / Retrovisor",fragmentoAudio:null,memoria:null,assets:[]},
  {id:'tu-casa',nombre:'D · Tu casa y la cuadra',inicio:15.8,fin:21.8,rumboEntrada:15.8,fondo:'#F4F2EA',cancion:'La bicicleta',fragmentoAudio:null,memoria:null,assets:[]},
  {id:'salida',nombre:'E · Salida por la ventana',inicio:21.8,fin:26.85,rumboEntrada:21.8,fondo:'#B9A3DE',cancion:'La casa',fragmentoAudio:null,memoria:null,assets:[]}
 ].map(s=>Object.freeze({...s,assets:Object.freeze(s.assets)})));
 const uniones=Object.freeze([[9.6,10.6,10.6],[12,12.6,12.6],[14.8,15.8,15.8],[19.3,19.9,19.9]].map(Object.freeze));
 window.escenasResto=Object.freeze({inicio:8.6,escenas,uniones});
 // Old hidden screens still have narrative audio side effects. Leave their
 // resources registered, but do not execute them in the newly opened interval.
 const nuevo=v=>v>=8.6&&v<21.8;
 const oldCasa2=window.casa2Render,oldCasa3=window.casa3Render;
 window.casa2Render=function(now,dt,v){if(!nuevo(v))return oldCasa2(now,dt,v)};
 window.casa3Render=function(now,dt,v){if(!nuevo(v))return oldCasa3(now,dt,v)};
 const root=document.createElement('section');root.id='resto-provisorio';root.hidden=true;root.inert=true;root.setAttribute('aria-label','Resto del recorrido · estructura provisoria');
 const nodes=escenas.map(s=>{
  const el=document.createElement('section');el.className='resto-momento';el.dataset.escena=s.id;el.setAttribute('aria-label',s.nombre);el.hidden=true;el.inert=true;el.style.backgroundColor=s.fondo;
  const cartel=document.createElement('div');cartel.className='resto-cartel';
  const title=document.createElement('h2');title.textContent=s.nombre;
  const phase=document.createElement('p');phase.textContent='FASES '+s.inicio+' → '+s.fin;
  const pending=document.createElement('small');pending.textContent='[escena provisoria · etapa 1]';
  cartel.append(title,phase,pending);el.append(cartel);root.append(el);return el;
 });document.body.append(root);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),previous=window.casaRender;
 window.casaRender=function(now,dt){
  previous(now,dt);
  const p=current,inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering'),active=inside&&p>=8.6&&p<=26.85;
  root.hidden=!active;root.inert=!active;
  if(!active){nodes.forEach(el=>{el.hidden=true;el.inert=true});return}
  const index=escenas.findIndex(s=>p>=s.inicio&&(p<s.fin||s.id==='salida'&&p<=s.fin));
  const transition=uniones.find(([a,b])=>p>=a&&p<b);
  nodes.forEach((el,i)=>{
   const s=escenas[i];let visible=i===index,point={x:0,y:0};
   if(transition){
    const [a,b,at]=transition,raw=(p-a)/(b-a),t=at===10.6||at===12.6||at===15.8?raw*raw*(3-2*raw):raw;
    const next=at===19.9?-1:escenas.findIndex(s=>s.inicio===at);
    if(i===index){visible=true;if(at!==19.9)point=houseRoute.vector(-t,at,reduced.matches)}
    if(i===next){visible=true;point=houseRoute.vector(1-t,at,reduced.matches)}
   }
   // Reuse the existing panorama and closing media instead of masking them.
   const inherited=s.id==='tu-casa'&&p>=19.9||s.id==='salida'&&p>=21.8;
   el.classList.toggle('resto-heredado',inherited);
   el.hidden=!visible;el.inert=!visible;el.style.transform=houseRoute.transform(point);
  });
 };
})();