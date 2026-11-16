const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
try{
 for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(m[1]))new vm.Script(m[2]);
 const start=html.indexOf('// A fresh page load'),end=html.indexOf("const intro=$('intro-video');",start),code=html.slice(start,end);
 assert(start>0&&end>start);
 for(const raw of [JSON.stringify({phase:29.05,word:'Mi memoria',kept:true}),'{invalid',null]){
 const store=new Map([['la-casa-journey-complete-v1','true'],['la-casa-community-drawing-v1','my-drawing'],['la-casa-umbral','my-state']]);if(raw!==null)store.set('la-casa-continuous-travel-v1',raw);
 const history={scrollRestoration:'auto'};vm.runInNewContext(code,{history,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}});
 assert(!store.has('la-casa-journey-complete-v1'));assert.equal(history.scrollRestoration,'manual');assert.equal(store.get('la-casa-community-drawing-v1'),'my-drawing');assert.equal(store.get('la-casa-umbral'),'my-state');
 if(raw&&raw!=='{invalid'){const travel=JSON.parse(store.get('la-casa-continuous-travel-v1'));assert.equal(travel.phase,0);assert.equal(travel.word,'Mi memoria');assert.equal(travel.kept,true)}
 }
 vm.runInNewContext(code,{history:{},localStorage:{getItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}}});
 const seed=`<base href="../dist/"><script>localStorage.setItem('la-casa-continuous-travel-v1',JSON.stringify({phase:29.05,word:'Memoria conservada'}));localStorage.setItem('la-casa-journey-complete-v1','true');</script>`;
 const check=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{if(current!==0||target!==0)throw Error('phase not zero');if(document.body.classList.contains('closing-outside')||document.body.classList.contains('inhabited'))throw Error('not at entrance');if(state.opened)throw Error('window already open');if(JSON.parse(localStorage.getItem('la-casa-continuous-travel-v1')).word!=='Memoria conservada')throw Error('memory lost');const result='PASS: browser starts at entrance despite saved ending; phase zero, window closed, memory preserved';document.querySelector('#info').textContent=result;resolve(result)}catch(e){document.querySelector('#info').textContent='FAIL '+e.stack;resolve('FAIL '+e.stack)}},800));</script>`;
 fs.writeFileSync(path.join(__dirname,'preview-start-browser.html'),html.replace('<head>','<head>'+seed).replace('</body>',check+'</body>'));
 fs.writeFileSync(path.join(__dirname,'preview-start-result.txt'),'PASS: inline JS syntax; reset saved late phase and completion; preserve memories and drawings; malformed/blocked storage tolerated; native scroll restoration disabled.');
}catch(e){fs.writeFileSync(path.join(__dirname,'preview-start-result.txt'),'FAIL '+e.stack);process.exitCode=1}