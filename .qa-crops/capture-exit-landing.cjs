const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,2200));await closingFinal.decode();closingFinalReady=true;reachInside();restoreFlowerExterior();casaRender(performance.now(),.016);renderClosingScene();await Promise.all([...document.querySelectorAll('#closing-scene img')].map(i=>i.decode().catch(()=>{})));await new Promise(r=>setTimeout(r,800));
 if(!document.body.classList.contains('closing-outside'))throw Error('Exterior final no activo');
 if(getComputedStyle(document.getElementById('closing-final-photo')).opacity!=='1')throw Error('Foto final no visible');
 return {status:'PASS',scene:'Landing exterior después de salir por la ventana',viewport:[innerWidth,innerHeight],photo:document.getElementById('closing-final-photo').currentSrc};
 }catch(error){return 'FAIL '+error.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'capture-exit-landing.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));