const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['dist/assets/entrada-video.mp4','source-materials/web-originals/entrada-video.mp4','dist/assets/entrada-inicial-hq.jpg','dist/assets/entrada-final-hq.jpg'];
const entries=files.map(file=>({file,bytes:fs.statSync(path.join(root,file)).size}));
fs.writeFileSync(path.join(__dirname,'entry-quality-browser.html'),`<!doctype html><html><body><pre id="info"></pre><script>
window.ready=(async()=>{const results=[];for(const item of ${JSON.stringify(entries)}){
 const media=document.createElement(item.file.endsWith('.mp4')?'video':'img');document.body.append(media);
 await new Promise((resolve,reject)=>{media.addEventListener(media.tagName==='VIDEO'?'loadedmetadata':'load',resolve,{once:true});media.onerror=()=>reject(Error(item.file));media.src='../'+item.file});
 results.push({...item,width:media.videoWidth||media.naturalWidth,height:media.videoHeight||media.naturalHeight,duration:media.duration||null});
 }const result=JSON.stringify(results,null,2);document.querySelector('#info').textContent=result;return result})().catch(e=>'FAIL: '+e.stack);
</script></body></html>`);