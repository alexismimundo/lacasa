const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const name of ['first-house','inventory'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/'+name+'.js'),'utf8'));
assert(!fs.readFileSync(path.join(root,'dist/continuous/inventory.js'),'utf8').includes("{id:'cucharitas',a:3.1"));
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)};document.body.classList.add('inhabited');
 const sample=p=>{current=target=p;casaRender(performance.now(),0);return new DOMMatrix(document.querySelector('.fh-shutter').style.transform).a};
 a(!document.querySelector('#journey-objects [aria-label*="cucharita"]'),'no unrelated spoon offer');
 let previous=sample(3.5);a(Math.abs(previous-1)<.001,'original starting zoom');
 for(let i=1;i<=89;i++){const zoom=sample(3.5+i*.02);a(Math.abs(zoom-previous-4.2*.02/1.78)<.0025,'uniform direct zoom step '+i);previous=zoom}
 a(Math.abs(previous-5.2)<.001,'original final zoom');const final=document.querySelector('.fh-shutter').style.transform;sample(4);sample(5.28);a(document.querySelector('.fh-shutter').style.transform===final,'reversible exact framing');
 for(const p of [3.2,3.8,4.1]){sample(p);a([...document.querySelectorAll('#journey-objects .journey-object')].every(el=>el.hidden),'no unrelated offer on shutter '+p)}
 a(document.querySelectorAll('#journey-objects .journey-object').length===7,'other offers preserved');
  const source=navigateScroll.toString();a(source.includes('+.61*childApproach'),'doubled input response');a(source.includes('lowEase(3.3,3.5,current)')&&source.includes('lowEase(5.28,5.48,current)'),'smooth ramps outside full zoom interval');
  const sensitivity=p=>.35+.61*lowEase(3.3,3.5,p)*(1-lowEase(5.28,5.48,p));for(const p of [3.5,4,4.5,5,5.28])a(Math.abs(sensitivity(p)-.96)<.0001,'double previous .48 response through zoom');a(sensitivity(3.4)>.35&&sensitivity(3.4)<.96,'gradual approach');a(sensitivity(5.38)>.35&&sensitivity(5.38)<.96,'gradual departure');
  sample(4.4);const result='PASS: doubled zoom sensitivity through entire approach; smooth entry/exit ramps; 89 uniform camera steps; original framing; reverse scroll; spoon remains removed; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;resolve(result);
 }catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
fs.writeFileSync(path.join(__dirname,'salon-direct-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));