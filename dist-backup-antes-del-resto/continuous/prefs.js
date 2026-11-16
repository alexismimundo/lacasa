// La Casa — preferencia de movimiento reducido elegida por el visitante.
// Se carga antes de script.js: hace que todas las consultas a
// "(prefers-reduced-motion: reduce)" respondan también a la opción
// "menos movimiento" de la orientación lateral, sin tocar el resto del código.
(function(){
 const KEY='la-casa-movimiento';
 const nativeMatch=window.matchMedia.bind(window);
 let user=false;
 try{user=localStorage.getItem(KEY)==='reducido'}catch{}
 const proxies=new Set();
 window.matchMedia=function(query){
  const mql=nativeMatch(query);
  if(!/prefers-reduced-motion:\s*reduce/.test(query))return mql;
  const listeners=new Set();
  const proxy={
   media:mql.media,
   get matches(){return mql.matches||user},
   addEventListener(type,fn){if(type==='change')listeners.add(fn)},
   removeEventListener(type,fn){listeners.delete(fn)},
   addListener(fn){listeners.add(fn)},
   removeListener(fn){listeners.delete(fn)},
   onchange:null,
   _fire(){const ev={matches:proxy.matches,media:proxy.media};listeners.forEach(fn=>{try{fn(ev)}catch(e){console.error(e)}})}
  };
  mql.addEventListener('change',()=>proxy._fire());
  proxies.add(proxy);
  return proxy;
 };
 function mark(){document.documentElement.classList.toggle('motion-user-reduced',user)}
 window.casaSetReducedMotion=function(value){
  user=!!value;
  try{localStorage.setItem(KEY,user?'reducido':'normal')}catch{}
  mark();proxies.forEach(p=>p._fire());
 };
 window.casaUserReducedMotion=()=>user;
 mark();
})();
