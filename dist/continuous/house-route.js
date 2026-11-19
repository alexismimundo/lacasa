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
   // A phase also clocks music and artwork, so keep its existing landmarks.
   // In scroll space, remove the long pinned holds between these full-screen
   // rooms. Each visible passage instead consumes one viewport of input.
   const scrollSegments=Object.freeze([
    [12.6,14.8,.06],[14.8,15.8,1],
    [15.8,17.3,.06],[17.3,17.9,1],
    [17.9,19.3,.06],[19.3,19.9,1]
   ].map(Object.freeze));
   function scrollPosition(phase){
    let offset=0;
    for(const [start,end,length] of scrollSegments){
     if(phase<start)return phase+offset;
     if(phase<=end)return start+offset+(phase-start)/(end-start)*length;
     offset+=length-(end-start);
    }
    return phase+offset;
   }
   function scrollPhase(position){
    let offset=0;
    for(const [start,end,length] of scrollSegments){
     const from=start+offset;
     if(position<from)return position-offset;
     if(position<=from+length)return start+(position-from)/length*(end-start);
     offset+=length-(end-start);
    }
    return position-offset;
   }
   function advanceScroll(phase,distance){return scrollPhase(scrollPosition(phase)+distance)}
   function easeScroll(phase,destination,amount){return scrollPhase(scrollPosition(phase)+(scrollPosition(destination)-scrollPosition(phase))*amount)}
   window.houseRoute=Object.freeze({passages,heading,vector,section,transform,passage,skipRetired,advanceRetired,retired,scrollPosition,scrollPhase,advanceScroll,easeScroll});
})();