// Keyboard-only shortcuts: never change the startup screen or persist a stop.
(()=>{'use strict';
 const params=new URLSearchParams(location.search);
 const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname)||location.protocol==='file:';
 if(params.get('revision')!=='1'&&(!local||params.get('revision')==='0'))return;
 const stops=Object.freeze([
  {id:'cocina',label:'Cocina',phase:1.3},
  {id:'caja',label:'Caja y recuerdos',phase:2.65},
  {id:'salon',label:'Salón',phase:3.9},
  {id:'barriletes',label:'Barriletes',phase:5.8},
  {id:'monticulo',label:'Montículo de objetos',phase:6.86},
  {id:'otra-casa',label:'Otra casa',phase:7.85},
  {id:'oscuridad',label:'De la oscuridad a la luz',phase:9.1},
  {id:'madrugada',label:'El niño y la madrugada',phase:11.3},
  {id:'lluvia',label:'Lluvia · Papa ra’y',phase:13.4},
  {id:'dibujo',label:'Dibujá tu casa',phase:16.3},
  {id:'memoria',label:'Escribí tu recuerdo',phase:18.4},
  {id:'cierre',label:'Algo de esta casa sale con vos',phase:19.95},
  {id:'ventana',label:'Salida por la ventana',phase:22.4},
  {id:'landing',label:'Landing final y menú',phase:null}
 ]);
 let index=-1,active=false;
 function go(value){
  const next=typeof value==='string'?stops.findIndex(stop=>stop.id===value):value;if(next<0||next>=stops.length)return false;
   if(window.communityPrototype?.active)return false;
  window.casaDismissTeaser?.();active=true;
  document.activeElement?.blur();document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
  index=next;const stop=stops[index];
  reentryStarted=null;reentryTarget=reentryCurrent=0;busy=false;closingFilm.pause();closingInterior.pause();closingPlaying=false;
  document.body.classList.remove('reentering','closing-outside','exit-identity-visible','sequence-playing');
  window.firstHouseReviewAt?.(stop.phase);
  reachInside();cameraCurrent=cameraTarget=1;
  if(stop.phase===null)restoreFlowerExterior();else{
   closingFinished=false;closingVideoReady=false;closingFilm.currentTime=0;document.getElementById('closing-final-photo').style.opacity='0';document.getElementById('closing-still').src='assets/salida-inicial.webp';
   target=current=stop.phase;
  }
  casaRender(performance.now(),0);renderClosingScene();syncJourneyNavigation();
   return true;
 }
 function shortcut(e){
  if(e.ctrlKey||e.metaKey||e.shiftKey||!['ArrowLeft','ArrowRight'].includes(e.key))return;
  if(document.querySelector('dialog[open]')||e.target.isContentEditable||e.target.closest?.('input,textarea,select,[contenteditable="true"],[role="slider"],.trace,.threshold-track'))return;
  e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
  let at=-1;
  if(!document.getElementById('coming-soon-gate')&&document.body.classList.contains('inhabited')){
   if(document.body.classList.contains('closing-outside'))at=stops.length-1;
   else for(let i=0;i<stops.length;i++)if(stops[i].phase!==null&&current>=stops[i].phase-.05)at=i;
  }
  go(at+(e.key==='ArrowRight'?1:-1));
 }
 window.addEventListener('keydown',shortcut,{capture:true});
 function bindTeaser(){const frame=document.getElementById('coming-soon-gate');if(!frame)return;const bind=()=>{try{frame.contentWindow.addEventListener('keydown',shortcut,{capture:true})}catch{}};frame.addEventListener('load',bind);bind()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindTeaser,{once:true});else bindTeaser();
 window.casaReview=Object.freeze({go,stops,get active(){return active},get index(){return index}});
})();