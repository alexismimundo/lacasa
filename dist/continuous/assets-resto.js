// Shared image resolver: a missing or undecodable image never removes its fallback.
// Reload the page after uploading assets; there is no server-side manifest.
(()=>{'use strict';
 const cache=new Map();
 function load(src){if(!cache.has(src)){const image=new Image(),record={image,ready:false};record.promise=new Promise(resolve=>{image.onload=()=>{record.ready=true;document.querySelectorAll('[data-asset-label]').forEach(el=>{if(el.dataset.assetLabel===src)el.hidden=true});resolve(image)};image.onerror=()=>resolve(null)});image.src=src;cache.set(src,record)}return cache.get(src)}
 function label(src,parent){const el=document.createElement('div');el.dataset.assetLabel=src;el.textContent='[asset pendiente: '+src.replace(/^assets\//,'')+']';el.hidden=!!cache.get(src)?.ready;parent.append(el);return el}
 function bind(parent,src,{fit='cover',onload=null}={}){
  const fallback=[...parent.children],record=load(src);
  record.promise.then(image=>{if(!image)return;const img=document.createElement('img');img.src=src;img.alt='';img.className='resto-asset-image';img.style.objectFit=fit;fallback.forEach(el=>{el.hidden=true;el.style.display='none'});parent.append(img);parent.dataset.assetLoaded=src;onload?.(image)});return record;
 }
 function replace(img,src,onload){const record=load(src);record.promise.then(image=>{if(image){img.src=src;img.dataset.assetLoaded=src;onload?.(image)}});return record}
 window.restoAssets=Object.freeze({load,bind,replace,label});
})();