const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,2300));reachInside();target=current=16.5;casaRender(performance.now(),.016);renderClosingScene();
 for(let i=0;i<100&&!window.tuCasaPostal?.layout;i++)await new Promise(r=>setTimeout(r,100));
 if(!window.tuCasaPostal?.layout)throw Error('Portada no cargada');
 document.getElementById('community-clear').click();document.getElementById('tu-title').value='';document.getElementById('tu-memory').value='';document.getElementById('tu-status').textContent='';tuCasaPostal.update();
 document.getElementById('tu-casa-editor').scrollTop=0;document.activeElement?.blur();await document.fonts.ready;await new Promise(r=>setTimeout(r,250));
 const pad=document.getElementById('community-pad').getBoundingClientRect();if(Math.abs(pad.width-pad.height)>2)throw Error('Lienzo no cuadrado');
 if(communityPrototype.strokes.length)throw Error('Lienzo no vacío');
 return {status:'PASS',scene:'Dibujá tu casa',viewport:[innerWidth,innerHeight],square:[pad.width,pad.height],blank:true};
 }catch(error){return 'FAIL '+error.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'capture-drawing-screen.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));