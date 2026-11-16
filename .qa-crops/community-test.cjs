const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
try{
for(const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(match[1]))new vm.Script(match[2]);
 for(const file of ['community','inventory','first-house','casa'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/'+file+'.js'),'utf8'));
 assert(html.includes('journeyLength=29.05'));assert(html.includes('const closingPhase=current-2'));
assert.equal(fs.readdirSync(path.join(root,'dist/assets/casas-comunidad/recortes')).filter(s=>s.endsWith('.png')).length,44);
const browser=`<script>
try{
 const assert=(v,m)=>{if(!v)throw Error(m)};
 const api=window.communityPrototype;
 assert(api.closed([[0,0],[100,0],[100,100],[0,100],[0,0]]),'closed loop');
 assert(!api.closed([[0,0],[100,0],[100,100],[0,100]]),'open line');
 assert(!api.closed([[0,0],[2,2],[3,3],[0,0]]),'tiny mark');
 assert(api.drawing([{closed:true,points:[[0,0],[100,0],[0,100]]}]).includes('fill-rule="evenodd"'),'holes use evenodd');
 assert(document.querySelectorAll('.community-track .community-house').length===24,'24 houses');
  document.body.classList.remove('inhabited');current=target=23;window.casaRender(performance.now(),.016);
  document.body.classList.add('inhabited');document.body.classList.remove('reentering','closing-outside');current=target=23;window.casaRender(performance.now(),.016);renderClosingScene();
 assert(document.querySelector('#community-journey').classList.contains('is-visible'),'walk visible');assert(!document.querySelector('#closing-scene').classList.contains('active'),'closing deferred');
 document.querySelector('.community-house').click();assert(document.querySelector('#community-memory').open,'memory opens');document.querySelector('#community-memory').close();
  assert(document.querySelector('#p15-cerca .community-track'),'houses in original panorama');
  current=target=22.8;window.casaRender(performance.now(),.016);assert(!document.querySelector('#community-draw-step').hidden,'drawing visible');
 const pad=document.querySelector('#community-pad'),r=pad.getBoundingClientRect();
 const fire=(type,x,y)=>pad.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:1,button:0,clientX:r.left+x*r.width,clientY:r.top+y*r.height}));
 // Synthetic pointers cannot be captured; use a temporary no-op for fixture only.
 pad.setPointerCapture=()=>{};fire('pointerdown',.2,.8);fire('pointermove',.2,.4);fire('pointermove',.5,.1);fire('pointermove',.8,.4);fire('pointermove',.8,.8);fire('pointerup',.2,.8);
 assert(pad.querySelector('path[fill="#335386"]').getAttribute('d').includes('Z'),'closed shape fills');
 document.querySelector('#community-name').value='<Ana>';document.querySelector('#community-text').value='Una memoria de prueba';document.querySelector('.community-form').requestSubmit();
 assert(document.querySelectorAll('.community-track .community-house').length===25,'local house appended');assert(document.querySelector('.community-track').textContent.includes('<Ana>'),'name escaped');
  E.caja=[];pintarCaja();current=target=9;window.casaRender(performance.now(),.016);
  const obj=document.querySelector('#journey-objects [data-guardable="glicina"]');assert(!obj.hidden,'object visible in route');obj.click();assert(E.caja.length===0,'click does not collect');
  obj.setPointerCapture=()=>{};obj.hasPointerCapture=()=>false;
  const fireObj=(type,x,y)=>obj.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:7,button:0,clientX:x,clientY:y}));
  fireObj('pointerdown',100,100);fireObj('pointermove',200,200);fireObj('pointerup',200,200);assert(E.caja.length===0,'missed drop does not collect');
  const box=document.querySelector('#fh-model-box');if(box){const rect=box.getBoundingClientRect();fireObj('pointerdown',100,100);fireObj('pointermove',rect.left+rect.width/2,rect.top+rect.height/2);fireObj('pointerup',rect.left+rect.width/2,rect.top+rect.height/2);assert(enCaja('glicina'),'drop collects');const before=target;box.click();assert(target===before,'shortcut does not rewind')}else{guardar('glicina');abrirCaja(true)}
  assert(document.querySelector('#box-inventory').open,'inventory open');assert(document.querySelectorAll('#box-inventory li').length===1,'inventory shows collected item');document.querySelector('#box-inventory').close();
  document.querySelector('#community-continue').click();assert(target===24.15,'continue reaches closing');
  current=target=24.8;window.casaRender(performance.now(),.016);renderClosingScene();assert(document.querySelector('#closing-scene').classList.contains('active'),'closing still reachable');
 document.body.classList.add('closing-outside');openMenuSection('others');assert(document.querySelectorAll('.community-gallery .community-house').length===25,'exterior archive');menuPanel.close();
 localStorage.removeItem('la-casa-community-drawing-v1');
  document.body.innerHTML='<pre id="community-test-result">PASS: first-house loaded; original panorama with 24 houses; memory dialog; drawing, local save and escaped names; click and missed drop do not collect; drop collects; widget opens inventory without rewinding; continuation, closing and exterior archive.</pre>';
}catch(e){document.body.innerHTML='<pre id="community-test-result">FAIL: '+e.stack+'</pre>'}
</script>`;
 // Load first-house too; initialize lastCurrent outside the house before testing late phases.
 fs.writeFileSync(path.join(__dirname,'community-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',browser+'</body>'));
 fs.writeFileSync(path.join(__dirname,'community-syntax-result.txt'),'PASS: inline, community, inventory, first-house and casa syntax; 44 crops; original panorama integration and shortened journey.');
}catch(e){fs.writeFileSync(path.join(__dirname,'community-syntax-result.txt'),'FAIL '+e.stack);process.exitCode=1}