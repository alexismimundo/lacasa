/* Spatial passages, not a new scroll controller. Phase remains the narrative clock. */
(()=>{'use strict';
 const passages=Object.freeze([
  {at:1,x:0,y:1,name:'Entrada'},
  {at:1.6,x:1,y:0,name:'De la cocina a la caja y al vídeo'},
  {at:2.4,x:0,y:1,name:'Hacia el salón'},
  {at:5.28,x:0,y:-1,name:'Subida hacia los barriletes'},
  {at:7.6,x:0,y:1,name:'Otra casa'},
  {at:8.6,x:-1,y:0,name:'Hacia los recuerdos'},
  {at:10.6,x:0,y:-1,name:'El niño y la madrugada'},
  {at:12.6,x:0,y:-1,name:'Terrero: lluvia y mesa'},
  {at:15.8,x:1,y:0,name:'Tu casa'},
  {at:17.6,x:1,y:0,name:'El camino de la bicicleta'},
  {at:21.8,x:0,y:1,name:'Salida por la ventana'}
 ].map(Object.freeze));
 function heading(at){let result=passages[0];for(const passage of passages){if(passage.at>at+.00001)break;result=passage}return result}
 function vector(distance,at,reduced=false){const dir=reduced?{x:0,y:1}:heading(at);return {x:distance*dir.x,y:distance*dir.y}}
 function section(sec,d,reduced=false){
  // Tall collages retain their internal vertical travel. One-screen rooms and
  // pinned panoramas share the following room's heading while leaving.
  if(!sec.pin&&sec.h!==1)return {x:0,y:d};
  return vector(d,d>=0?sec.s:sec.s+sec.h,reduced);
 }
 function transform(point,w=innerWidth,h=innerHeight){return 'translate3d('+(point.x*w).toFixed(2)+'px,'+(point.y*h).toFixed(2)+'px,0)'}
 function passage(start,end,phase,at,reduced=false){
  const t=Math.max(0,Math.min(1,(phase-start)/(end-start))),progress=t*t*(3-2*t);
  return {progress,incoming:vector(1-progress,at,reduced),outgoing:vector(-progress,at,reduced)};
 }
  // Retain the reusable house panorama and the window ending; retired scenes
  // remain dormant so their shared resources can still be reused later.
  const retired=Object.freeze([]);
  function skipRetired(phase,direction=1){for(const [start,end] of retired)if(phase>=start&&phase<end)return direction<0?start-.0001:end;return phase}
  function advanceRetired(current,target){for(const [start,end] of retired){if(current>=start&&current<end)return target<current?start-.0001:end;if(current<start&&target>=end)return end;if(current>=end&&target<start)return start-.0001}return current}
  window.houseRoute=Object.freeze({passages,heading,vector,section,transform,passage,skipRetired,advanceRetired,retired});
})();