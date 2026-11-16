const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');let html=fs.readFileSync(file,'utf8');
const before='<p class="memory-phrase" id="memory-first">Estoy pensando en volver a mi casa.</p>',after='<p class="memory-phrase" id="memory-first">Estoy pensando en volver<br><span style="white-space:nowrap">a mi casa.</span></p>';
assert(html.includes(before)||html.includes(after));html=html.replace(before,after);fs.writeFileSync(file,html);
for(const name of ['continuous/teaser-gate.js','assets/coming-soon/coming-soon.js','assets/coming-soon/teaser-atmosphere.js'])new vm.Script(fs.readFileSync(path.join(root,'dist',name),'utf8'));
const test=`<script>window.ready=(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms)),a=(v,m)=>{if(!v)throw Error(m)};try{
 let gate;for(let i=0;i<200;i++){gate=document.querySelector('#coming-soon-gate');if(gate?.contentDocument?.querySelector('#teaser-music'))break;await wait(25)}a(gate,'gate mounted');const doc=gate.contentDocument;
 a(document.querySelector('#memory-first br'),'explicit caption break');a(document.querySelector('#memory-first span[style]').textContent==='a mi casa.','whole final phrase');
 await wait(3600);a(document.querySelector('#coming-soon-gate'),'four-second ruins hold');
 let cut;for(let i=0;i<100;i++){cut=document.querySelector('#teaser-entry-cut');if(cut)break;await wait(25)}a(cut,'light-cut transition');a(!gate.getAnimations().length,'no iframe fade');
 const frames=cut.getAnimations()[0].effect.getKeyframes();a(frames.every(f=>f.easing.startsWith('steps(1')),'hard keyframes only: '+frames.map(f=>f.easing));
 await wait(300);a(document.querySelector('#coming-soon-gate'),'ruins still present before full blackout');
 await wait(300);a(!document.querySelector('#coming-soon-gate'),'scene swapped during blackout');a(!document.documentElement.classList.contains('teaser-pending'),'landing revealed');
 await wait(700);a(!document.querySelector('#teaser-entry-cut'),'cut overlay cleaned');a(doc.querySelector('#teaser-music').paused,'music stopped');a(!document.querySelector('#enter').inert,'entry restored');
 const result='PASS: caption second line a mi casa; four-second ruins hold; stepped light cuts; black scene swap; no fade; landing cleanup; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;return result;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'teaser-cut-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));