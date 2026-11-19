const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const test=`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2300);await closingFinal.decode();closingFinalReady=true;reachInside();restoreFlowerExterior();casaRender(performance.now(),.016);renderClosingScene();await wait(250);
 const nav=document.getElementById('threshold-menu'),track=nav.querySelector('.threshold-track');a(!nav.inert,'original menu interactive');a(getComputedStyle(nav).visibility==='visible','menu visible');a(Number(getComputedStyle(nav).zIndex)>55,'menu above final photo');a(getComputedStyle(document.getElementById('salida-menu')).display==='none','replacement menu removed');
 const before=track.style.transform;await wait(650);a(matchMedia('(prefers-reduced-motion:reduce)').matches||track.style.transform!==before,'rows drift');
 const album=nav.querySelector('[data-menu="album"]');album.click();a(document.getElementById('threshold-panel').open,'album link works');closeMenuSection();
 nav.querySelector('[data-menu="others"]').click();a(document.getElementById('community-atlas').open,'community link works');document.getElementById('community-atlas').close();await wait(50);a(!nav.inert,'menu remains interactive after closing');
 return {status:'PASS',checks:'original menu visible above final photo / drifting rows / album and community links / replacement hidden',viewport:[innerWidth,innerHeight]};
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'moving-exit-menu-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));