/* Familiar system-cursor silhouettes, drawn with a living graphite edge. */
(()=>{'use strict';
 const fine=matchMedia('(any-pointer:fine)'),motion=matchMedia('(prefers-reduced-motion:reduce)');
 if(document.getElementById('living-cursor'))return;
 const size=32,scale=size/64;
 const canvas=document.createElement('canvas');canvas.id='living-cursor';canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText=`position:fixed;left:0;top:0;width:${size}px;height:${size}px;z-index:2147483647;pointer-events:none;display:none`;
 document.body.append(canvas);
 const ctx=canvas.getContext('2d'),style=document.createElement('style');
 // Beat scene-specific !important SVG cursors, including the first-house sky.
 // Keep the old cursor's instructional label, but never its pointer artwork.
 style.textContent='html:root body.living-cursor-active,html:root body.living-cursor-active.living-cursor-active.living-cursor-active :is(*,#living-cursor){cursor:none!important}html:root body #house-cursor i{display:none!important}';
 document.head.append(style);
 const shapes={
  flecha:{hot:[10,6],paths:['M10 6 Q9 5 9 8 L15 48 Q15 50 17 48 L27 37 L39 55 Q40 57 42 55 L48 51 Q50 50 48 48 L36 31 L48 26 Q51 25 48 23 Z']},
  mano:{hot:[26,7],paths:['M23 55 Q23 51 20 47 Q15 40 10 30 Q8 26 11 25 Q15 23 19 28 L23 33 L23 10 Q23 6 27 6 Q31 6 31 10 L31 25 L31 21 Q31 18 35 18 Q39 18 39 22 L39 27 L39 24 Q39 21 43 21 Q47 21 47 25 L47 29 L47 27 Q47 24 50 24 Q54 24 54 28 L54 36 Q54 43 51 49 Q49 53 49 57 Q49 59 46 59 L27 59 Q23 59 23 55 Z']},
  abierta:{hot:[26,12],paths:['M23 55 Q23 51 20 47 Q15 40 10 30 Q8 26 11 25 Q15 23 19 28 L23 33 L23 14 Q23 10 27 10 Q31 10 31 14 L31 27 L31 23 Q31 20 35 20 Q39 20 39 24 L39 29 L39 26 Q39 23 43 23 Q47 23 47 27 L47 31 L47 29 Q47 26 50 26 Q54 26 54 30 L54 38 Q54 45 51 51 L49 57 Q49 59 46 59 L27 59 Q23 59 23 55 Z']},
  agarre:{hot:[26,16],paths:['M23 55 Q21 51 18 47 L11 35 Q9 31 12 30 Q15 28 19 32 L23 37 L23 19 Q23 15 27 15 Q31 15 31 19 L31 29 L31 25 Q31 22 35 22 Q39 22 39 26 L39 31 L39 28 Q39 25 43 25 Q47 25 47 29 L47 33 L47 31 Q47 28 50 28 Q54 28 54 32 L54 40 Q54 49 49 57 Q48 59 45 59 L27 59 Q24 59 23 55 Z']},
  linterna:{hot:[48,12],paths:['M10 51 L28 33 L39 44 L21 62 Z','M28 33 L38 17 L51 30 L39 44 Z','M38 17 L47 7 L60 20 L51 30 Z']},
  lupa:{hot:[25,25],paths:['M43 25 A18 18 0 1 1 7 25 A18 18 0 1 1 43 25 Z','M37 39 L43 35 L59 52 L53 58 Z']},
  lapiz:{hot:[8,56],paths:['M8 56 L13 40 L46 7 L57 18 L24 51 Z','M8 56 L13 40 L24 51 Z','M40 13 L51 24']},
  crayon:{hot:[8,56],paths:['M8 56 L13 40 L46 7 L57 18 L24 51 Z','M8 56 L13 40 L24 51 Z','M36 17 L47 28']},
  tijera:{hot:[56,6],paths:['M25 47 A9 9 0 1 1 7 47 A9 9 0 1 1 25 47 Z','M45 53 A9 9 0 1 1 27 53 A9 9 0 1 1 45 53 Z','M22 40 L56 6 L29 47','M30 46 L40 14']},
  manubrio:{hot:[32,28],paths:['M5 30 Q17 17 32 27 Q48 37 59 27 L60 34 Q47 44 35 34 L35 55 L29 55 L29 33 Q17 24 7 36 Z']}
 };
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 for(const shape of Object.values(shapes))shape.lines=shape.paths.map(d=>{
  const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',d);svg.append(p);
  const length=p.getTotalLength(),n=Math.max(2,Math.ceil(length/3));
  return {path:new Path2D(d),closed:/Z\s*$/i.test(d),points:Array.from({length:n+1},(_,i)=>{const at=length*i/n,q=p.getPointAtLength(at),a=p.getPointAtLength(Math.max(0,at-.5)),b=p.getPointAtLength(Math.min(length,at+.5)),l=Math.hypot(b.x-a.x,b.y-a.y)||1;return {x:q.x,y:q.y,nx:-(b.y-a.y)/l,ny:(b.x-a.x)/l}})};
 });
 const tile=document.createElement('canvas');tile.width=tile.height=128;
 const material=tile.getContext('2d'),paper=new Image();
 let pattern=null,dirty=true,x=0,y=0,target=null,present=false,kind='flecha',last=-Infinity,pressed=false,ratio=1;
 // A quiet grey grain also covers loading failures, never a flat white fill.
 const fallback=material.createImageData(128,128);
 for(let i=0;i<fallback.data.length;i+=4){const grey=166+((i*17+(i>>>5)*31)%43);fallback.data[i]=fallback.data[i+1]=fallback.data[i+2]=grey;fallback.data[i+3]=255}
 material.putImageData(fallback,0,0);pattern=ctx.createPattern(tile,'repeat');
 canvas.dataset.material='grain-fallback';
 paper.onload=()=>{
  // Sample only the stippled cardboard, not the box silhouette or its seams.
  material.drawImage(paper,380,140,300,110,0,0,128,128);
  const pixels=material.getImageData(0,0,128,128);
  for(let i=0;i<pixels.data.length;i+=4){const grey=130+(.2126*pixels.data[i]+.7152*pixels.data[i+1]+.0722*pixels.data[i+2])*.36;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=grey;pixels.data[i+3]=255}
  material.putImageData(pixels,0,0);pattern=ctx.createPattern(tile,'repeat');canvas.dataset.material='caja-textura';dirty=true;
 };
 paper.src=new URL('../assets/first-house/caja-textura.webp',document.currentScript.src).href;
 const noise=v=>{const n=Math.sin(v*127.1+311.7)*43758.5453;return (n-Math.floor(n))*2-1};
 function resize(){ratio=Math.min(devicePixelRatio||1,2);canvas.width=size*ratio;canvas.height=size*ratio;dirty=true}
 function hide(){present=false;canvas.style.display='none';document.body.classList.remove('living-cursor-active')}
 function choose(){
  document.body.classList.remove('living-cursor-active');
  // Modal dialogs occupy the browser's top layer, above every body z-index.
  // Move the one canvas into that layer rather than creating another cursor.
  const host=[...document.querySelectorAll('dialog[open]')].reverse().find(el=>el.matches(':modal'))||document.body;
  if(canvas.parentElement!==host)host.append(canvas);
  if(!target?.isConnected)return false;
  if(target.closest('input,textarea,select,[contenteditable="true"],iframe')||document.body.classList.contains('casa-sin-cursor'))return false;
  // Read the existing scene tool before suppressing the native cursor.
  document.body.classList.remove('living-cursor-active');
  const native=getComputedStyle(target).cursor,tool=getComputedStyle(document.documentElement).getPropertyValue('--casa-cursor');
  let next='flecha';
  const match=(native.includes('cursor-')?native:tool).match(/cursor-([a-z-]+)\.svg/);
  if(match){next=match[1]==='mano-abierta'?'abierta':match[1]}
  // The old scene controller uses "mano" as its default, even on empty paper.
  // Keep the familiar arrow there; reserve the pointing hand for real actions.
  if(next==='mano')next='flecha';
  if(!shapes[next])next='flecha';
  if(pressed&&(target.closest('[data-guardable],#fh-model-box,.threshold-line')||/grabbing/.test(native)))next='agarre';
  else if(target.closest('[data-guardable],#fh-model-box')||native==='grab')next='abierta';
  else if(target.closest('button,a,[role="button"],[data-help]')&&!target.closest('[disabled],[inert]'))next='mano';
  else if(!match&&native==='pointer')next='mano';
  // Drawing tools are local to the actual house-drawing surface, never a
  // scene-wide cursor inherited from the retired notebook or threshold.
  // Tool artwork is parked until its redesign; only this family is enabled.
  if(!['flecha','mano','abierta','agarre'].includes(next))next='flecha';
  if(kind!==next){kind=next;dirty=true}
  canvas.dataset.kind=kind;
  document.body.classList.add('living-cursor-active');return true;
 }
 function position(){const hot=shapes[kind].hot;canvas.style.transform=`translate3d(${x-hot[0]*scale}px,${y-hot[1]*scale}px,0)`}
 function draw(now){
  requestAnimationFrame(draw);
  if(!present||!fine.matches||document.hidden)return;
  if(now-last<36&&!dirty)return;
  if(!choose()){canvas.style.display='none';return}
  canvas.style.display='block';position();
  if(motion.matches&&!dirty)return;
  last=now;dirty=false;ctx.setTransform(ratio*scale,0,0,ratio*scale,0,0);ctx.clearRect(0,0,64,64);
  const shape=shapes[kind],frame=motion.matches?0:Math.floor(now/1000*28);
  // Drift the material inside the fixed silhouette; no pointer displacement.
  const phase=motion.matches?0:now/1000;
  pattern.setTransform(new DOMMatrix().translate(Math.sin(phase*.45)*3,Math.cos(phase*.35)*3));
  ctx.lineJoin=ctx.lineCap='round';
  for(const line of shape.lines){
   ctx.fillStyle=pattern;if(line.closed)ctx.fill(line.path);
   // Narrow contrast rim, not a sticker-like white outline.
   ctx.strokeStyle='rgba(244,244,241,.65)';ctx.lineWidth=3;ctx.stroke(line.path);
   for(let pass=0;pass<3;pass++){
    ctx.beginPath();ctx.lineWidth=pass===0?1.7:.55;ctx.strokeStyle=pass===0?'rgba(8,8,8,.9)':'rgba(8,8,8,.22)';
    line.points.forEach((p,i)=>{
     const grain=noise(i+41+pass*37)*.3,breath=noise(frame*19+41)*.65+noise(i*7+frame*53+41+pass*101)*.45;
     const offset=(pass-1)*.22+grain*.35+breath*.30;
     const px=p.x+p.nx*offset,py=p.y+p.ny*offset;i?ctx.lineTo(px,py):ctx.moveTo(px,py);
    });ctx.stroke();
   }
  }
 }
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||!fine.matches){hide();return}x=e.clientX;y=e.clientY;target=e.target;present=true;position()},{passive:true});
 window.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){hide();return}pressed=true;dirty=true},{passive:true,capture:true});
 window.addEventListener('pointerup',()=>{pressed=false;dirty=true},{passive:true,capture:true});
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget)hide()});
 window.addEventListener('blur',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
 window.addEventListener('resize',resize);fine.addEventListener('change',hide);motion.addEventListener('change',()=>{dirty=true});
 resize();requestAnimationFrame(draw);
})();