/* Living graphite seams, exactly between adjacent screens. No room frames. */
(()=>{'use strict';
 const canvas=document.createElement('canvas');canvas.id='house-floor-plan';canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:30;pointer-events:none';document.body.append(canvas);
 const ctx=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion:reduce)');
 const transitions=[
  [.52,1.2,1],[1.6,1.85,1.6],[1.85,2.1,1.6],[2.1,3,2.4],[5.28,5.70,5.28],
  [7.6,8.6,8.6],[11.6,12.6,12.6],[12.6,13.6,13.6],
  [13.6,14.6,14.6],[14.6,15.6,15.6],[15.6,16.6,16.6],
  [16.6,17.6,17.6],[21,22,22]
 ];
 let w=0,h=0,ratio=1,lastTime=-Infinity,lastPhase=null,lastVisible=false,dirty=true;
 function resize(){w=innerWidth;h=innerHeight;ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);dirty=true}
 window.addEventListener('resize',resize);motion.addEventListener('change',()=>{dirty=true});resize();
 function seamAt(phase,reduced){
  const passage=transitions.find(([a,b])=>phase>=a&&phase<b);
  if(!passage)return null;
  const [start,end,at]=passage,dir=reduced?{x:0,y:1}:houseRoute.heading(at);
  // First-house passages ease; subsequent section transforms are linear in phase.
  const progress=start<7.6&&at!==1.6&&at!==2.4?houseRoute.passage(start,end,phase,at,reduced).progress:(phase-start)/(end-start);
   let seam;
   if(dir.x){const x=(dir.x>0?1-progress:progress)*w;seam=[x,-3,x,h+3]}
   else{const y=(dir.y>0?1-progress:progress)*h;seam=[-3,y,w+3,y]}
   return seam;
 }
  function noise(value){const n=Math.sin(value*127.1+311.7)*43758.5453;return (n-Math.floor(n))*2-1}
  function line(x1,y1,x2,y2,seed,time){
  const length=Math.hypot(x2-x1,y2-y1),steps=Math.max(2,Math.ceil(length/7));
  if(!length)return;
  const nx=-(y2-y1)/length,ny=(x2-x1)/length;
   // More legible living fibres, with their mean anchored on the shared boundary.
  for(let pass=0;pass<4;pass++){
   ctx.beginPath();ctx.lineWidth=pass===0?1.5:.55;ctx.strokeStyle=pass===0?'rgba(8,8,8,.82)':'rgba(8,8,8,.34)';
   for(let i=0;i<=steps;i++){
     const t=i/steps,grain=noise(i+seed+pass*37)*.3;
     // Independent redraws, not a travelling sine wave: quick pencil vibration.
      const frame=Math.floor(time*28);
     const breath=noise(frame*19+seed)*.65+noise(i*7+frame*53+seed+pass*101)*.45;
    const offset=(pass-1.5)*.55+grain+breath;
    const x=x1+(x2-x1)*t+nx*offset,y=y1+(y2-y1)*t+ny*offset;
    if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);
   }
   ctx.stroke();
  }
 }
  function render(now){
  const seam=seamAt(current,motion.matches);
   const visible=!!seam&&document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside');
  canvas.hidden=!visible;
  if(!visible){lastVisible=false;return}
  if(document.hidden)return;
  const moved=current!==lastPhase;
    if(!dirty&&lastVisible&&!moved&&(motion.matches||now-lastTime<36))return;
  lastTime=now;lastPhase=current;lastVisible=true;dirty=false;
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,w,h);
    const time=motion.matches?0:now/1000;
     if(seam)line(...seam,41,time);
   // The kite remains behind the crowd. Erase only its opaque artwork from
   // the seam instead of promoting it above the entire salon's stacking tree.
   if(current>=5.28&&current<5.70){
    const kite=document.querySelector('.fh-kite'),entry=kite?.parentElement;
    if(kite&&entry&&getComputedStyle(entry).visibility!=='hidden'){
     const m=new DOMMatrix(getComputedStyle(kite).transform);
     const parent=entry.parentElement,pr=parent.getBoundingClientRect();
     const scale=pr.width/parent.clientWidth;
     const a=m.a*scale,b=m.b*scale,c=m.c*scale,d=m.d*scale;
     const x=pr.left+m.e*scale,y=pr.top+m.f*scale;
     ctx.save();ctx.globalCompositeOperation='destination-out';
     ctx.setTransform(ratio*a,ratio*b,ratio*c,ratio*d,ratio*x,ratio*y);
     for(const image of kite.querySelectorAll('img')){
      if(!image.complete||!image.naturalWidth)continue;
      const style=getComputedStyle(image),im=new DOMMatrix(style.transform==='none'?undefined:style.transform);
      const origin=style.transformOrigin.split(' ').map(parseFloat);
      ctx.save();ctx.translate(image.offsetLeft+origin[0],image.offsetTop+origin[1]);
      ctx.transform(im.a,im.b,im.c,im.d,im.e,im.f);ctx.translate(-origin[0],-origin[1]);
      ctx.drawImage(image,0,0,image.clientWidth,image.clientHeight);ctx.restore();
     }
     ctx.restore();
    }
   }
 }
 const previous=window.casaRender;
 window.casaRender=function(now,dt){previous(now,dt);render(now)};
})();