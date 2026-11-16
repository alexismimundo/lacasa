const fs=require('fs'),path=require('path'),vm=require('vm');const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');let text=fs.readFileSync(file,'utf8');
const before='function tick(time){let dt=',after='function tick(time){if(window.houseRoute){target=houseRoute.skipRetired(target,target<current?-1:1);current=houseRoute.advanceRetired(current,target)}let dt=';
if(text.includes(before)){text=text.replace(before,after);fs.writeFileSync(file,text)}
for(const name of ['house-route','first-house'])new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/'+name+'.js'),'utf8'));
const test=`<script>window.ready=(async()=>{try{const a=(v,m)=>{if(!v)throw Error(m)},sleep=ms=>new Promise(r=>setTimeout(r,ms));await sleep(1600);document.body.classList.add('inhabited');document.body.classList.remove('closing-outside','reentering');
 async function phase(p){target=current=p;window.casaRender(performance.now(),.016)}
 const title=document.querySelector('#fh-next-house h2');await phase(7.4);a(title.querySelectorAll('.ink-letter').length===19,'ink letters registered');const r=title.getBoundingClientRect();a(Math.abs(r.top+r.height/2-innerHeight/2)<innerHeight*.06,'entry near center');
 await phase(7.6);const letter=title.querySelector('.ink-letter'),lr=letter.getBoundingClientRect();window.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientX:lr.left+lr.width/2,clientY:lr.top+lr.height/2,bubbles:true}));await sleep(100);a(parseFloat(letter.style.getPropertyValue('--ink-stroke'))>0,'inkbleed active');a(getComputedStyle(letter).color==='rgb(255, 255, 255)','white ink');
 await phase(7.9);const exit=title.getBoundingClientRect();a(Math.abs(exit.top+exit.height/2-innerHeight/2)<innerHeight*.06,'exit near center');
 await phase(8.1);a(document.querySelector('#fh-next-house').classList.contains('flashlight-active'),'flashlight retained');
 a(houseRoute.skipRetired(8.7)===17.6,'skip obsolete houses');a(houseRoute.skipRetired(22)===24,'skip old drawing form');a(houseRoute.skipRetired(17,-1)<8.6,'reverse route');
 await phase(18.5);a(getComputedStyle(document.querySelector('#p15')).display!=='none','horizontal panorama retained');
 for(const id of ['p8','p9','p10','p11','p12','p13','p14','community-draw-step','journey-objects'])a(getComputedStyle(document.getElementById(id)).display==='none','retired '+id);
 await phase(24.7);renderClosingScene();a(document.querySelector('#closing-scene').classList.contains('active'),'closing video retained');
 await phase(7.6);return 'PASS: white inkbleed, centered short title motion, flashlight, retired scenes skipped both directions, horizontal houses and window ending retained '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'trim-route-browser.html'),text.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));