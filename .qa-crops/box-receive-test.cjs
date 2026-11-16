const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const root=path.resolve(__dirname,'..');
try{
for(const file of ['first-house','casa'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/'+file+'.js'),'utf8'));
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
const a=(v,m)=>{if(!v)throw Error(m)};
document.body.classList.remove('inhabited');current=target=9;window.casaRender(performance.now(),.016);document.body.classList.add('inhabited');current=target=9;window.casaRender(performance.now(),.016);
const b=document.querySelector('#fh-model-box'),r=b.getBoundingClientRect(),obj=document.querySelector('#journey-objects [data-guardable="glicina"]');obj.setPointerCapture=()=>{};obj.hasPointerCapture=()=>false;
const fire=(type,x,y)=>obj.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:11,button:0,clientX:x,clientY:y}));
fire('pointerdown',100,100);fire('pointermove',r.left-20,r.top+r.height/2);a(b.classList.contains('drop-opening'),'opens on approach');
fire('pointermove',100,100);a(!b.classList.contains('drop-opening'),'closes when leaving');
fire('pointermove',r.left+r.width/2,r.top+r.height/2);fire('pointerup',r.left+r.width/2,r.top+r.height/2);a(enCaja('glicina'),'drop saves');a(!b.classList.contains('drop-opening'),'release closes');
fire('pointerdown',100,100);fire('pointermove',r.left+r.width/2,r.top+r.height/2);fire('pointercancel',0,0);a(!b.classList.contains('drop-opening'),'cancel closes');
const result='PASS: approach opens, leaving closes, drop saves and closes, cancel closes';document.querySelector('#info').textContent=result;resolve(result);
}catch(e){const result='FAIL '+e.stack;document.querySelector('#info').textContent=result;resolve(result)}},1600));</script>`;
fs.writeFileSync(path.join(__dirname,'box-receive-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));fs.writeFileSync(path.join(__dirname,'box-receive-syntax.txt'),'PASS: first-house and casa syntax; browser fixture generated.');
}catch(e){fs.writeFileSync(path.join(__dirname,'box-receive-syntax.txt'),'FAIL '+e.stack);process.exitCode=1}