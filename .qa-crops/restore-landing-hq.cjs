const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace('id="final-window" src="assets/videos/Video-landing-2-last.png"','id="final-window" src="assets/entrada-final-hq.jpg"');
assert(html.includes('id="final-window" src="assets/entrada-final-hq.jpg"'));
assert(html.includes('id="intro-video" src="assets/videos/Video-landing-2-hd.mp4"'));
assert(fs.statSync(path.join(root,'dist/assets/entrada-final-hq.jpg')).size>0);
fs.writeFileSync(file,html);
// Keep the previous preparation/test script from restoring the unwanted still.
const prep=path.join(__dirname,'landing2-integrate.cjs');
let script=fs.readFileSync(prep,'utf8');
script=script.replace("html=html.replace('id=\"final-window\" src=\"assets/entrada-final-hq.jpg\"','id=\"final-window\" src=\"assets/videos/Video-landing-2-last.png\"');","html=html.replace('id=\"final-window\" src=\"assets/videos/Video-landing-2-last.png\"','id=\"final-window\" src=\"assets/entrada-final-hq.jpg\"');");
script=script.replace("src.includes('Video-landing-2-last.png')","src.includes('entrada-final-hq.jpg')").replaceAll('matching final still','original high-resolution final still');
fs.writeFileSync(prep,script);
fs.writeFileSync(path.join(__dirname,'restore-landing-hq-result.json'),JSON.stringify({status:'PASS',finalImage:'assets/entrada-final-hq.jpg',newVideoRetained:true},null,2));