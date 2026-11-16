const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
try{
 const html=read('dist/index.html');for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(m[1]))new vm.Script(m[2]);
 assert(html.includes('window.casaScrollFrame?.(dt,time)'));assert(html.includes('src="continuous/scroll-flow.js"'));
 new vm.Script(read('dist/continuous/first-house.js'));
 const w={},doc={addEventListener(){}},context={window:w,document:doc};vm.runInNewContext(read('dist/continuous/scroll-flow.js'),context);
 const create=w.createCasaScrollFlow,input=(f,over={})=>f.input({delta:120,position:4,destination:4,height:900,now:1000,...over});
 let f=create();assert.equal(input(f),4);assert(f.active);let current=4,target=4,previous=current;
 for(let i=0;i<300;i++){target=f.frame({dt:1/60,position:current,destination:target,now:1000+i*1000/60});current+=(target-current)*(1-Math.exp(-9/60));assert(current>=previous);assert(current-previous<.025);assert(target<=5.28);previous=current}
 assert(!f.active);assert(Math.abs(current-5.28)<.001);
 f=create();input(f);assert(input(f,{delta:-120,position:4.5,destination:4.52})<4.5);assert(!f.active);
 for(const reason of [{blocked:true},{reduced:true}]){f=create();input(f);assert.equal(f.frame({dt:.016,position:4.2,destination:4.21,now:1100,...reason}),4.2);assert(!f.active)}
 f=create();let dest=4;for(let i=0;i<8;i++)dest=input(f,{delta:3,destination:dest,now:1000+i*20});assert(f.active,'trackpad small deltas accumulate');
 f=create();assert(input(f,{reduced:true})>4);assert(!f.active);
 f=create();assert(input(f,{position:19,destination:19})>19);assert(!f.active);
 f=create();assert(input(f,{position:9,destination:9,delta:9000})<=9.8);
 f=create();assert.equal(input(f,{delta:0}),4);
 const browser=`<script>
 window.ready=new Promise(resolve=>{setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)};
 document.body.classList.remove('inhabited');current=target=4;window.casaRender(performance.now(),.016);document.body.classList.add('inhabited');current=target=4;
 navigateScroll(120);a(target===4,'gesture starts assisted shot without jump');let prev=current;
 for(let i=0;i<300;i++){window.casaScrollFrame(1/60,performance.now()+i*1000/60);current+=(target-current)*(1-Math.exp(-9/60));a(current>=prev,'continuous forward movement');prev=current}
 a(Math.abs(current-5.28)<.001,'single gesture reaches child');a(current<5.4,'stops before kite');
 current=target=4;navigateScroll(120);window.casaScrollFrame(.05,performance.now());current=target;navigateScroll(-120);a(target<current,'opposite scroll reverses');
 current=target=4;navigateScroll(120);abrirCaja(true);window.casaScrollFrame(.05,performance.now());a(target===current,'inventory stops shot');document.querySelector('#box-inventory').close();
 current=target=9;const obj=document.querySelector('#journey-objects [data-guardable="glicina"]');obj.setPointerCapture=()=>{};obj.hasPointerCapture=()=>false;obj.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:5,button:0,clientX:100,clientY:100}));navigateScroll(120);a(target===9,'drag blocks scrolling');obj.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:5}));
 current=target=5.69;navigateScroll(900);a(target<=5.7,'flight gate preserved');
 casaSetReducedMotion(true);current=target=4;navigateScroll(120);a(target>4&&target<4.5,'reduced motion remains manual');casaSetReducedMotion(false);
 current=target=19;navigateScroll(120);a(target>19&&target<19.5,'gallery remains manual');
 const result='PASS: single gesture reaches child continuously; reverse cancels; inventory and drag stop navigation; flight gate preserved; reduced motion and gallery stay manual';document.querySelector('#info').textContent=result;resolve(result);
 }catch(e){const result='FAIL '+e.stack;document.querySelector('#info').textContent=result;resolve(result)}},1000)});
 </script>`;
 fs.writeFileSync(path.join(__dirname,'scroll-flow-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',browser+'</body>'));
 fs.writeFileSync(path.join(__dirname,'scroll-flow-result.txt'),'PASS: syntax, integration, 300 monotonic frames, one gesture finishes zoom, reversal, blocking, reduced motion, trackpad accumulation, gallery manual control and bounded input.');
}catch(e){fs.writeFileSync(path.join(__dirname,'scroll-flow-result.txt'),'FAIL '+e.stack);process.exitCode=1}