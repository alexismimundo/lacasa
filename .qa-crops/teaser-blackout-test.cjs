const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
new vm.Script(fs.readFileSync(path.join(root,'dist/assets/coming-soon/teaser-atmosphere.js'),'utf8'));
const html=fs.readFileSync(path.join(root,'dist/assets/coming-soon/index.html'),'utf8');
// Shorten only the random blackout delay in the fixture, not production timing.
const setup=`<base href="../dist/assets/coming-soon/"><script>
window.blackoutDelays=[];const originalTimeout=window.setTimeout.bind(window);window.setTimeout=(fn,delay,...args)=>{if(delay>=14000&&delay<=36000){blackoutDelays.push(delay);return originalTimeout(fn,100,...args)}return originalTimeout(fn,delay,...args)};
const originalMedia=window.matchMedia.bind(window);window.testReduced=new EventTarget();testReduced.matches=false;window.matchMedia=q=>q==='(prefers-reduced-motion: reduce)'?testReduced:originalMedia(q);
const originalAnimate=Element.prototype.animate;Element.prototype.animate=function(...args){const motion=originalAnimate.apply(this,args);if(this.matches('.escena,.interfaz'))motion.pause();return motion};
</script>`;
const test=`<pre id="info"></pre><script>window.ready=(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms)),a=(v,m)=>{if(!v)throw Error(m)};try{
const targets=[document.querySelector('.escena'),document.querySelector('.interfaz')],background=document.querySelector('.fondo');
for(const count of [1,3,5]){
testReduced.matches=true;testReduced.dispatchEvent(new Event('change'));
// Deterministic burst lengths; production remains random.
const random=Math.random;Math.random=()=>((count-.5)/5);testReduced.matches=false;testReduced.dispatchEvent(new Event('change'));await wait(130);Math.random=random;
const motions=targets.map(t=>t.getAnimations()[0]);a(motions.every(Boolean),'scene and counter cut together');motions.forEach(m=>m.pause());const motion=motions[0],frames=motion.effect.getKeyframes();a(frames.length===count*2,'variable burst length');a(frames.every(f=>f.easing.replaceAll(' ','')==='steps(1)'||f.easing.replaceAll(' ','')==='steps(1,end)'),'instant cuts without fades');
const duration=motion.effect.getTiming().duration,firstCut=frames[1].offset*duration;a(firstCut>=20&&firstCut<=85,'brief abrupt cut');
motions.forEach(m=>m.currentTime=firstCut/2);a(targets.every(t=>Math.abs(Number(getComputedStyle(t).opacity)-Number(frames[0].opacity))<.001),'variable light loss');a(getComputedStyle(background).opacity==='1','textured background stays visible');a(!document.querySelector('#teaser-blackout'),'no flat black overlay');
const gaps=[],depths=[];
for(let i=0;i<frames.length-1;i++){const interval=(frames[i+1].offset-frames[i].offset)*duration;if(i%2){gaps.push(interval);a((interval>=44.9&&interval<=140.1)||(interval>=239.9&&interval<=700.1),'mixed short and long pauses')}else{depths.push(Number(frames[i].opacity));a(interval>=19.9&&interval<=85.1,'variable cut durations')}motions.forEach(m=>m.currentTime=(frames[i].offset+frames[i+1].offset)*duration/2);a(targets.every(t=>Math.abs(Number(getComputedStyle(t).opacity)-Number(frames[i].opacity))<.001),'hard cuts at selected intensity')}
if(count>1)a(depths.every((depth,i)=>!i||Math.abs(depth-depths[i-1])>=.179),'successive cuts have distinct intensity');if(count>=3)a(Math.max(...gaps)-Math.min(...gaps)>99,'unequal pauses within one burst');
testReduced.matches=true;testReduced.dispatchEvent(new Event('change'));a(targets.every(t=>t.getAnimations().length===0&&getComputedStyle(t).opacity==='1'),'reduced motion restores light');
}
a(blackoutDelays.every(d=>d>=14000&&d<=36000),'irregular long intervals');testReduced.matches=false;testReduced.dispatchEvent(new Event('change'));await wait(110);window.dispatchEvent(new Event('la-casa:teaser-fade'));a(targets.every(t=>t.getAnimations().length===0),'exit cancels cuts');
return document.querySelector('#info').textContent='PASS: variable intensities within bursts; mixed short/long gaps; hard cuts; texture preserved; reduced motion and exit cleanup; '+innerWidth+'x'+innerHeight;
}catch(e){return document.querySelector('#info').textContent='FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'teaser-blackout-browser.html'),html.replace('<head>','<head>'+setup).replace('</body>',test+'</body>'));