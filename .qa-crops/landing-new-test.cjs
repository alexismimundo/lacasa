const fs=require('fs'),path=require('path'),assert=require('assert'),vm=require('vm');
const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');let html=fs.readFileSync(file,'utf8');
const old='id="intro-video" src="assets/entrada-video-hd.mp4"',next='id="intro-video" src="assets/videos/Video-landing-hd.mp4"';assert(html.includes(old)||html.includes(next));html=html.replace(old,next);fs.writeFileSync(file,html);
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){if(match[0].startsWith('<script type="module"')||match[0].startsWith('<script type="importmap"'))continue;new vm.Script(match[1]);}
const test=`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},v=document.querySelector('#intro-video');
 await Promise.all([document.querySelector('#sequence').decode(),finalReady]);
 a(v.getAttribute('src')==='assets/videos/Video-landing-hd.mp4','new landing source');
 a(document.querySelector('#sequence').getAttribute('src')==='assets/entrada-inicial-hq.jpg','original initial still');a(finalWindow.getAttribute('src')==='assets/entrada-final-hq.jpg','original final still');
 const snapshots=[];for(let repeat=0;repeat<2;repeat++){
 state.opened=false;paint();syncSequence();const playing=playIntro();await new Promise(r=>setTimeout(r,650));
 a(document.body.classList.contains('video-visible'),'decoded video revealed');a(v.currentTime>0&&!v.paused,'playback advances');a(getComputedStyle(document.querySelector('#sequence')).visibility==='visible','still remains beneath fade');
 a(v.videoWidth===1920&&v.videoHeight===1080,'1080p decoded');a(v.duration>3.9&&v.duration<4.2,'new duration preserved');snapshots.push(v.currentTime);
 await playing;state.opened=true;paint();syncSequence();await new Promise(r=>setTimeout(r,700));a(!document.body.classList.contains('video-visible'),'video hands off to final still');a(getComputedStyle(finalWindow).visibility==='visible','final still visible');
 }
 const result='PASS: new landing video 1920x1080, '+v.duration.toFixed(3)+'s; decoded-frame reveal; underlying still retained; final crossfade; replay twice; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;return result;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'landing-new-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));