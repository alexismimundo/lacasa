const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'dist/assets/videos'),ff='C:\\Users\\alexismimundo\\AppData\\Local\\Programs\\Stremio\\ffmpeg.exe',source=path.join(dir,'Video-landing-2.mp4'),output=path.join(dir,'Video-landing-2-hd.mp4');
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),before=hash(source);
function run(args){const r=spawnSync(ff,['-hide_banner','-y',...args],{encoding:'utf8',timeout:240000});if(r.status!==0)throw Error(r.stderr||String(r.error));return r.stderr}
const log=run(['-i',source,'-map','0:v:0','-vf','scale=1920:1080:flags=lanczos,unsharp=5:5:0.35:3:3:0','-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-an','-movflags','+faststart',output]);
fs.writeFileSync(path.join(__dirname,'landing2-encode.log'),log);
run(['-i',output,'-frames:v','1',path.join(dir,'Video-landing-2-first.png')]);
run(['-sseof','-0.05','-i',output,'-frames:v','1',path.join(dir,'Video-landing-2-last.png')]);
run(['-v','error','-i',output,'-f','null','-']);
if(hash(source)!==before)throw Error('Source changed');
fs.writeFileSync(path.join(__dirname,'landing2-media-result.json'),JSON.stringify({status:'PASS',originalUnchanged:true,sourceHash:before,filter:'Lanczos 1920x1080 + unsharp 0.35; H.264 CRF 16; silent; faststart',bytes:fs.statSync(output).size,decode:'PASS'},null,2));