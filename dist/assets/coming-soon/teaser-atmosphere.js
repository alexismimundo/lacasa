/* Match the main house's regenerated monochrome grain, including its cadence. */
(()=>{'use strict';
 const canvas=document.getElementById('living-grain'),ctx=canvas.getContext('2d',{alpha:true});
 const tile=document.createElement('canvas');tile.width=tile.height=256;
 const tc=tile.getContext('2d'),pixels=tc.createImageData(256,256);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let last=0,stopped=false;
 const edgeNoise=document.querySelector('#teaser-ink-edge feTurbulence');
 function paint(){
  if(!ctx)return;
  const d=pixels.data;for(let i=0;i<d.length;i+=4){const shade=Math.floor(Math.random()*256);d[i]=d[i+1]=d[i+2]=shade;d[i+3]=48}
  tc.putImageData(pixels,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=ctx.createPattern(tile,'repeat');ctx.fillRect(0,0,canvas.width,canvas.height);
  // Low-amplitude edge redraws, synchronized with the grain and disabled by reduced motion.
  if(edgeNoise&&!reduced.matches)edgeNoise.setAttribute('seed',String((Number(edgeNoise.getAttribute('seed'))+1)%997));
 }
 function resize(){canvas.width=Math.ceil(innerWidth);canvas.height=Math.ceil(innerHeight);paint()}
 function animate(t){if(stopped)return;if(!document.hidden&&!reduced.matches&&t-last>=80){paint();last=t}requestAnimationFrame(animate)}
 window.addEventListener('resize',resize);resize();requestAnimationFrame(animate);
 // Ambient blackouts are disabled; the entry transition owns its narrative cut.
 const music=document.getElementById('teaser-music');
 let pausedByUser=false,pending=false;
 music.volume=.55;
 async function start(){if(stopped||pausedByUser||pending||!music.paused)return;pending=true;try{await music.play();if(stopped||pausedByUser)music.pause()}catch{}finally{pending=false}}
 document.addEventListener('pointerdown',start);
 document.addEventListener('keydown',start);
 function stop(){stopped=true;pausedByUser=true;clearTimeout(shortcutTimer);music.pause();music.currentTime=0}
 // Resolve doubles only after the triple-click window has elapsed.
 let shortcutClicks=[],shortcutTimer;
 document.addEventListener('selectstart',event=>event.preventDefault());
 document.addEventListener('dragstart',event=>event.preventDefault());
 document.addEventListener('click',event=>{
  if(event.target.closest('button,a,input,select,textarea')){shortcutClicks=[];clearTimeout(shortcutTimer);return}
  if(stopped)return;
  const now=performance.now();shortcutClicks=shortcutClicks.filter(t=>now-t<=900);shortcutClicks.push(now);
  // Stop acceleration synchronously on the first click, not after gesture resolution.
  if(shortcutClicks.length===1)window.dispatchEvent(new Event('la-casa:teaser-normal'));
  clearTimeout(shortcutTimer);
  if(shortcutClicks.length<3){
   shortcutTimer=setTimeout(()=>{
    if(!stopped){
     if(shortcutClicks.length===2)window.dispatchEvent(new Event('la-casa:teaser-accelerate'));
    }
    shortcutClicks=[];
   },Math.max(0,900-(now-shortcutClicks[0])));
   return;
  }
  shortcutClicks=[];stop();
  if(new URLSearchParams(location.search).has('integrado'))window.parent.postMessage({type:'la-casa:teaser-enter',immediate:true},location.origin);
  else location.href='../../index.html?vista=landing';
 });
 document.getElementById('entrar').addEventListener('click',stop);
 window.addEventListener('pagehide',stop);
 window.addEventListener('la-casa:teaser-transition',()=>{
  pausedByUser=true;const volume=music.volume,start=performance.now();
  function fade(t){if(stopped)return;const progress=Math.min(1,(t-start)/500);music.volume=volume*(1-progress);if(progress<1)requestAnimationFrame(fade);else stop()}
  requestAnimationFrame(fade);
 });
 start();
})();