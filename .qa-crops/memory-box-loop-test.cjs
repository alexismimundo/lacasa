const fs=require('fs'),path=require('path'),vm=require('vm');
for(const file of ['memorias-ejemplo.js','first-house.js'])new vm.Script(fs.readFileSync(path.join(__dirname,'../dist/continuous',file),'utf8'));
const test=`<script>window.ready=(async()=>{try{
await new Promise(r=>setTimeout(r,700));casaReview.go('memoria');
const assert=(v,m)=>{if(!v)throw Error(m)},step=p=>{target=current=p;casaRender(performance.now(),0);renderClosingScene()},visible=()=>[...document.querySelectorAll('.journey-memory-card')].filter(el=>!el.hidden&&getComputedStyle(el).display!=='none');
const ids=[...document.querySelectorAll('.journey-memory-card')].map(el=>el.dataset.memoryId);E.caja=E.caja.filter(c=>!ids.includes(c.id));pintarCaja();
for(const p of [1.3,2,3.9,5.8,6.86,7.85,9.1,11.3,13.4,16.3,18.4,20.2]){step(p);assert(visible().length===1,'one card at '+p)}
for(const p of [13.4,16.3,18.4,20.2,22.3]){step(p);const b=document.getElementById('fh-model-box'),r=b.getBoundingClientRect();assert(getComputedStyle(b).visibility==='visible'&&getComputedStyle(b).pointerEvents==='auto','persistent box '+p);assert(r.right<=innerWidth+1&&r.bottom<=innerHeight+1,'box bounds '+p)}
step(18.4);const card=visible()[0],id=card.dataset.memoryId;card.querySelector('img').focus();card.querySelector('img').dispatchEvent(new KeyboardEvent('keydown',{key:'g',bubbles:true}));step(18.4);assert(enCaja(id)&&visible().length===0,'save and hide collected card');
abrirCaja(true);assert(document.querySelector('#box-inventory[open] img[src="'+COSAS[id].src+'"]'),'inventory contains card');document.getElementById('box-inventory').close();
restoreFlowerExterior();const end=current;navigateScroll(-500);assert(current===end&&target===end&&reentryStarted===null,'exterior blocks reverse');
navigateScroll(500);assert(reentryStarted!==null&&reentryTarget>0,'down enters window');const forward=reentryTarget;navigateScroll(-1000);assert(reentryTarget===forward,'reentry cannot rewind');navigateScroll(1600);for(let i=0;i<90;i++)renderClosingScene();assert(reentryStarted===null&&!document.body.classList.contains('reentering'),'reentry completes');assert(current===0&&target===0,'new journey starts');navigateScroll(-200);assert(current===0&&reentryStarted===null,'new start cannot back out');navigateScroll(300);assert(target>0,'new journey advances');
step(18.4);return {status:'PASS',cards:ids.length,viewport:[innerWidth,innerHeight]};
}catch(e){return {status:'FAIL',error:e.stack}}})();</script>`;
fs.writeFileSync(path.join(__dirname,'memory-box-loop-browser.html'),fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));