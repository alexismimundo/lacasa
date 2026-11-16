const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8'),source=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
new vm.Script(source);
const controller=source.slice(source.indexOf('let childDolly=null'),source.indexOf('window.firstHouseScrollLimit='));
let now=0,hidden=false,reduce=false,inside=true,blocked=false;
const context={window:{},current:3.95,target:3.95,performance:{now:()=>now},document:{get hidden(){return hidden},body:{classList:{contains:()=>false}},querySelector:()=>blocked},dialog:{open:false},adentro:()=>inside,reduced:()=>reduce,clamp:x=>Math.max(0,Math.min(1,x)),storeTravel:()=>{}};
vm.createContext(context);vm.runInContext(controller,context);const input=d=>context.window.firstHouseNavigate(d),step=dt=>context.window.firstHouseAdvanceCamera(dt);
assert(input(120));let previous=context.current;for(let i=0;i<54;i++){step(1/60);assert(context.current>=previous&&context.current<=5.28);previous=context.current;if(i===25){assert(input(120));assert(context.target<5.28)}}step(1/60);assert.equal(context.current,5.28);assert(input(120));now=300;assert.equal(input(120),false);
context.current=context.target=3.95;input(120);step(.05);hidden=true;const paused=context.current;step(.05);assert.equal(context.current,paused);hidden=false;blocked=true;step(.05);assert.equal(context.current,paused);blocked=false;assert.equal(input(-120),false);step(.05);assert.equal(context.current,paused);
context.current=context.target=3.95;input(120);reduce=true;step(.01);assert.equal(context.current,5.28);
input(-120);reduce=false;context.current=3.91;context.target=3.95;assert(input(120),'first gesture while shutter interpolation settles');for(let i=0;i<19;i++)step(.05);assert.equal(context.current,5.28,'settling shutter reaches child without extra gestures');
input(-120);context.current=context.target=3.935;assert(input(120),'visually open shutter accepts first gesture');for(let i=0;i<19;i++)step(.05);assert.equal(context.current,5.28);
fs.writeFileSync(path.join(__dirname,'child-one-gesture-unit.json'),JSON.stringify({status:'PASS',checks:'0.9-second monotonic dolly; ignores repeated gestures; exact endpoint; momentum guard; new gesture continues; hidden/modal pause; reverse cancel; reduced motion'}));
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,1800));const a=(v,m)=>{if(!v)throw Error(m)};document.body.classList.add('inhabited');
 current=3.91;target=3.95;casaRender(performance.now(),0);navigateScroll(120);const start=performance.now();let previous=current,count=0;
 while(performance.now()-start<10000&&current<5.28){await new Promise(requestAnimationFrame);a(current>=previous-.0001,'monotonic dolly');a(current<=5.28001,'does not enter sky');previous=current;count++}
 a(Math.abs(current-5.28)<.001,'single gesture completes camera from settling shutter');a(Math.abs(new DOMMatrix(document.querySelector('.fh-shutter').style.transform).a-5.2)<.001,'original child framing');a(getComputedStyle(document.querySelector('.fh-party')).willChange==='auto','no low-resolution parent cache');for(const el of document.querySelectorAll('.fh-sp'))a(getComputedStyle(el).filter==='none','no figure blur');
 await new Promise(r=>setTimeout(r,250));navigateScroll(120);a(target>5.28,'next gesture continues toward sky');navigateScroll(-120);
  return 'PASS: one scroll triggers smooth 0.9-second dolly; final child framing; no automatic sky skip; next gesture continues; '+count+' sampled frames; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'child-one-gesture-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));