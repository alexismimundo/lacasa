const fs=require('fs'),path=require('path'),assert=require('assert'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),file=path.join(dist,'index.html');
const source=path.join(dist,'assets/videos/Video-1.mp4'),poster=path.join(dist,'assets/videos/Video-1-poster.jpg');
assert(fs.existsSync(source));
const encoded=spawnSync('C:\\Users\\alexismimundo\\AppData\\Local\\Programs\\Stremio\\ffmpeg.exe',['-hide_banner','-y','-i',source,'-frames:v','1','-q:v','2',poster],{encoding:'utf8',timeout:60000});
assert.equal(encoded.status,0,encoded.stderr);
let html=fs.readFileSync(file,'utf8');assert(html.includes('<video id="house-film"'));
html=html.replace(/<video id="house-film"[^>]*>/,'<video id="house-film" src="assets/videos/Video-1.mp4" poster="assets/videos/Video-1-poster.jpg" muted loop playsinline preload="auto" aria-hidden="true">');
fs.writeFileSync(file,html);
const test=`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},video=document.querySelector('#house-film');
 a(video.getAttribute('src')==='assets/videos/Video-1.mp4','new first film');a(video.poster.includes('Video-1-poster.jpg'),'matching poster');
 if(video.readyState<2)await new Promise((resolve,reject)=>{video.addEventListener('loadeddata',resolve,{once:true});video.addEventListener('error',()=>reject(Error('video loading failed')),{once:true})});
 a(video.videoWidth>0&&video.videoHeight>0,'video decodes');await video.play();await new Promise(r=>setTimeout(r,350));a(video.currentTime>0,'video playback advances');
 a(document.querySelector('#memory-first').textContent.includes('Estoy pensando en volver'),'first caption preserved');a(document.querySelector('#memory-second').textContent.includes('Esta ya no es mi casa'),'second caption preserved');
 a(document.querySelector('#kitchen-teaser-room video').getAttribute('src')==='assets/casa-interior.mp4','later video unchanged');
 const result='PASS: Video-1 first interior film; matching poster; decoded '+video.videoWidth+'x'+video.videoHeight+'; duration '+video.duration+'; playback advances; captions and later film preserved; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;return result;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'first-film-replace-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));