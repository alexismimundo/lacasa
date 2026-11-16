const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),read=name=>fs.readFileSync(path.join(root,name),'utf8');
const source=read('dist/continuous/first-house.js');new vm.Script(source);
if(/fireVideo|burnRun|updatePaperBurn|Papel_quemandose/.test(source))throw Error('Legacy fire runtime remains');
// Test-only access stays in the generated fixture, never in production.
const hook=`window.endingQA={start(){E.caja=E.caja.filter(c=>c.id!=='soldiers');window.resetFirstHouse();current=target=6.3;flightStartedThisVisit=true;st.flight={phase:'fallen',time:0,y:94,vy:12,lastHorizontal:.2};},snapshot(){return {landed:st.flight.landed,fall:st.flight.fallProgress,run:endingRun&&{...endingRun},collected:st.soldiers,count:E.caja.filter(c=>c.id==='soldiers').length,carry:window.laCasaCarry.soldiers,phase:current}},returnToGround(){current=target=6.86;resetEnding()}};`;
const instrumented=source.replace(/syncObjects\(\);\s*\}\)\(\);\s*$/,()=> 'syncObjects();\n'+hook+'\n})();');
if(instrumented===source)throw Error('Fixture hook insertion failed');
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,1800));document.body.classList.add('inhabited');
 const a=(v,m)=>{if(!v)throw Error(m)},root=document.querySelector('#first-house'),soldier=root.querySelector('.fh-soldiers'),kite=root.querySelector('.fh-kite'),black=root.querySelector('.fh-ending-black'),cut=root.querySelector('.fh-ending-cut'),qa=window.endingQA;
 qa.start();casaRender(performance.now(),0);
 await Promise.all([...root.querySelectorAll('img')].filter(i=>i.src).map(i=>i.decode().catch(()=>{})));
 let now=performance.now(),landed=false;for(let i=0;i<400;i++){casaRender(now+=50,.05);if(qa.snapshot().landed){landed=true;break}}
 a(landed,'fall completes');a(Math.abs(parseFloat(kite.style.left)/innerWidth-.17)<.001,'kite lands at left 17%');
 a(soldier.style.left==='50%'&&parseFloat(soldier.style.top)===60,'small soldiers at heap center');a(black.hidden,'ground visible before blackout');
 const small=soldier.getBoundingClientRect().width;let swapped=false;for(let i=0;i<80;i++){casaRender(now+=25,.025);const state=qa.snapshot();if(state.run.swapped){swapped=true;break}}
 a(swapped,'blackout swaps scene');a(!black.hidden&&getComputedStyle(black).backgroundColor==='rgb(0, 0, 0)','flat black backdrop');
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)a(cut.style.opacity==='1','scene swap concealed by complete light cut');
 a(soldier.style.left==='50%'&&soldier.style.top==='50%','centered on black');a(!soldier.hidden&&soldier.getBoundingClientRect().width>small*2,'same soldiers visibly enlarged');
 a(qa.snapshot().count===0,'hold on black before collection');
 for(let i=0;i<200;i++)casaRender(now+=25,.025);
 const complete=qa.snapshot();a(complete.collected&&complete.carry&&complete.count===1,'automatically stored once and carry emitted');a(soldier.hidden,'source hidden after box flight');a(cut.hidden,'glitch finishes');
 a(!root.querySelector('video'),'no fire video or decoding');a(!root.querySelector('.fh-paper-burn'),'no burn canvas');
 for(let i=0;i<100;i++)casaRender(now+=25,.025);a(qa.snapshot().count===1,'no repeated collection');
 current=target=5.4;casaRender(now,0);a(black.hidden&&cut.hidden&&!root.classList.contains('fh-ending-centered'),'reverse clears blackout');
 qa.returnToGround();for(let i=0;i<160;i++)casaRender(now+=25,.025);a(qa.snapshot().count===1,'revisit does not duplicate inventory');
 return JSON.stringify({status:'PASS',viewport:innerWidth+'x'+innerHeight,reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,smallWidth:small,checks:'left landing; centered small heap soldiers; hard blackout; masked swap; enlarged on flat black; automatic box collection; carry; no duplicate; reverse; no fire runtime'});
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
let html=read('dist/index.html').replace('<head>','<head><base href="../dist/">');
const script=/<script\b[^>]*src=["']continuous\/first-house\.js[^"']*["'][^>]*><\/script>/;
if(!script.test(html))throw Error('Production script tag not found');
html=html.replace(script,()=>'<script>'+instrumented+'</script>');
fs.writeFileSync(path.join(__dirname,'kite-blackout-ending-browser.html'),html.replace('</body>',test+'</body>'));
fs.writeFileSync(path.join(__dirname,'ending-reduced-chrome.cjs'),read('.qa-crops/chrome-check.cjs').replace("await send('Page.navigate'","await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await send('Page.navigate'"));
fs.writeFileSync(path.join(__dirname,'kite-blackout-source-check.json'),JSON.stringify({status:'PASS',syntax:true,noLegacyFire:true}));