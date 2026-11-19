/* The teaser is isolated so its CSS, IDs and clock cannot collide with the house. */
(()=>{'use strict';
 const params=new URLSearchParams(location.search);
 // Old review URLs must not skip coming soon on reload.
 if(params.has('revision')||params.has('pantalla')){
  ['revision','pantalla','vista'].forEach(key=>params.delete(key));
  const clean=new URL(location.href);clean.search=params.toString();try{history.replaceState(null,'',clean)}catch{}
 }
 if(params.get('vista')==='landing'&&performance.getEntriesByType('navigation')[0]?.type!=='reload')return;
 document.documentElement.classList.add('teaser-pending');
 const style=document.createElement('style');
 style.textContent='html.teaser-pending{background:#000}html.teaser-pending body{visibility:hidden}#coming-soon-gate{visibility:visible!important;position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483647;background:#000}';
 document.head.append(style);
 function mount(){
  const frame=document.createElement('iframe');frame.id='coming-soon-gate';frame.title='La Casa — Próximamente';
  const url=new URL('assets/coming-soon/index.html',document.baseURI);
  url.searchParams.set('integrado','1');
  for(const name of ['dia','rapido','reiniciar','prueba'])if(params.has(name))url.searchParams.set(name,params.get(name));
  frame.src=url.href;
  const states=new Map();
  function isolate(node){if(node.nodeType!==1||node===frame)return;if(!states.has(node))states.set(node,node.inert);node.inert=true}
  [...document.body.children].forEach(isolate);
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(isolate)));
  observer.observe(document.body,{childList:true});document.body.append(frame);
   function enter(event){
   if(event.source!==frame.contentWindow||event.origin!==url.origin||event.data?.type!=='la-casa:teaser-enter')return;
    window.removeEventListener('message',enter);delete window.casaDismissTeaser;
   try{sessionStorage.setItem('laCasaTeaserEntered','1')}catch{}
   const immediate=event.data.immediate||matchMedia('(prefers-reduced-motion:reduce)').matches;
   function reveal(){document.documentElement.classList.remove('teaser-pending');frame.remove()}
   function finish(){
    observer.disconnect();states.forEach((inert,node)=>{node.inert=inert});
    frame.remove();style.remove();
    // Do not focus the entry button: it would show its keyboard outline/label
    // before the visitor actually hovers or navigates there with the keyboard.
    document.body.classList.remove('cursor-enter','window-hover','cursor-active');
   }
   if(immediate){reveal();finish();return}
   // Hard light failures only. Swap scenes while the light is completely off.
   const cut=document.createElement('div');cut.id='teaser-entry-cut';cut.setAttribute('aria-hidden','true');
   cut.style.cssText='visibility:visible!important;position:fixed;inset:0;z-index:2147483647;background:#000;pointer-events:auto';
   document.body.append(cut);
   const frames=[{opacity:0,offset:0},{opacity:1,offset:.06},{opacity:0,offset:.12},{opacity:.73,offset:.29},{opacity:0,offset:.35},{opacity:1,offset:.42},{opacity:1,offset:.60},{opacity:0,offset:.61},{opacity:.92,offset:.77},{opacity:0,offset:.83},{opacity:0,offset:1}].map(frame=>({...frame,easing:'steps(1,end)'}));
   const motion=cut.animate(frames,{duration:1000,easing:'linear',fill:'forwards'});
   const swap=setTimeout(reveal,500);
   motion.finished.catch(()=>{}).then(()=>{clearTimeout(swap);reveal();finish();cut.remove()});
  }
  window.addEventListener('message',enter);
   window.casaDismissTeaser=()=>enter({source:frame.contentWindow,origin:url.origin,data:{type:'la-casa:teaser-enter',immediate:true}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();