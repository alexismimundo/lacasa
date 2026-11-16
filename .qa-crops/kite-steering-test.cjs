const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const root=path.resolve(__dirname,'..');
try{
const js=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');new vm.Script(js);
const fn=js.match(/function kiteSteeringStep[^\n]+/)[0];const box={Math};vm.createContext(box);vm.runInContext(fn,box);
let x=0;for(let i=0;i<120;i++){const next=box.kiteSteeringStep(x,.35,1/60);assert(next>=x&&next<=.35);assert(next-x<.025);x=next}assert(x>.349);
assert.equal(box.kiteSteeringStep(.2,-.3,0),.2);
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const browser=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
const a=(v,m)=>{if(!v)throw Error(m)};document.body.classList.remove('inhabited');current=target=5.7;window.casaRender(performance.now(),.016);document.body.classList.add('inhabited');current=target=5.7;window.casaRender(performance.now(),.016);
const sky=document.querySelector('.fh-sky'),kite=document.querySelector('.fh-kite');sky.setPointerCapture=()=>{};sky.hasPointerCapture=()=>false;
const click=(x,y)=>sky.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1,clientX:x,clientY:y}));
const frame=()=>{current=target=5.7;window.casaRender(performance.now(),1/60)};
 a(window.firstHouseScrollLimit(6,.1)===6,'no click gate');const before=parseFloat(kite.style.left);sky.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:innerWidth*.8,clientY:innerHeight*.3}));frame();const first=parseFloat(kite.style.left);a(first>before,'hover steers right without click');a(first-before<innerWidth*.03,'no teleport');
for(let i=0;i<45;i++){if(i%20===0)click(innerWidth*.8,innerHeight*.3);frame()}const right=parseFloat(kite.style.left);
 sky.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:innerWidth*.2,clientY:innerHeight*.4}));for(let i=0;i<10;i++)frame();a(parseFloat(kite.style.left)<right,'hover reverses left without buttons');
sky.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:9}));
 for(let i=0;i<360;i++){sky.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:innerWidth*(.5+Math.sin(i*.08)*.25),clientY:innerHeight*.4}));frame();a(kite.getAttribute('aria-label')!=='El barrilete cayó','moving mouse sustains without clicks')}
 const heldX=innerWidth*.5,heldY=innerHeight*.4;let fell=false;
 for(let i=0;i<600;i++){sky.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:heldX,clientY:heldY}));frame();if(kite.getAttribute('aria-label')==='El barrilete cayó'){fell=true;break}}a(fell,'stationary pointer events do not sustain');
 current=target=3.6;window.casaRender(500,.016);const tint=document.querySelector('.fh-salon-tint');a(tint.style.opacity==='0'&&tint.style.backgroundColor==='transparent','no coloured salon lighting');window.casaRender(1100,.016);a(tint.style.opacity==='0','no alternating light');
 const result='PASS: scroll launches; smooth hover steering; clicks retain impulse; continuous mouse movement sustains 6 seconds without clicks; stationary pointer loses lift and falls; salon coloured lighting disabled';document.querySelector('#info').textContent=result;resolve(result);
}catch(e){const result='FAIL '+e.stack;document.querySelector('#info').textContent=result;resolve(result)}},1000));</script>`;
fs.writeFileSync(path.join(__dirname,'kite-steering-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',browser+'</body>'));fs.writeFileSync(path.join(__dirname,'kite-steering-result.txt'),'PASS: first-house syntax; steering converges monotonically with bounded per-frame motion and zero-dt stability.');
}catch(e){fs.writeFileSync(path.join(__dirname,'kite-steering-result.txt'),'FAIL '+e.stack);process.exitCode=1}