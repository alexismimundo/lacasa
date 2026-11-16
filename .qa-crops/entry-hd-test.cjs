const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');
let html=fs.readFileSync(file,'utf8');
const old='<video id="intro-video" src="assets/entrada-video.mp4"',next='<video id="intro-video" src="assets/entrada-video-hd.mp4"';
assert(html.includes(old)||html.includes(next));
html=html.replace(old,next);fs.writeFileSync(file,html);
const test=`<script>window.ready=(async()=>{try{
 const v=document.querySelector('#intro-video'),a=(ok,m)=>{if(!ok)throw Error(m)};
 a(v.getAttribute('src')==='assets/entrada-video-hd.mp4','HD source integrated');
 if(v.readyState<1)await new Promise((resolve,reject)=>{v.addEventListener('loadedmetadata',resolve,{once:true});v.addEventListener('error',reject,{once:true})});
 a(v.videoWidth===1920&&v.videoHeight===1080,'1080p decoded');a(Math.abs(v.duration-5)<.05,'same 5-second duration');
 a(document.querySelector('#sequence').getAttribute('src')==='assets/entrada-inicial-hq.jpg','initial still unchanged');a(document.querySelector('#final-window').getAttribute('src')==='assets/entrada-final-hq.jpg','final still unchanged');
 await v.play();await new Promise(r=>setTimeout(r,400));a(v.currentTime>0,'playback advances');v.pause();
 const result='PASS: HD entrance integration; 1920x1080; 5 seconds; Chrome playback; original HQ stills retained; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;return result;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'entry-hd-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));