const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),ffmpeg='C:\\Users\\alexismimundo\\AppData\\Local\\Programs\\Stremio\\ffmpeg.exe';
function run(args,name){const r=spawnSync(ffmpeg,['-hide_banner','-y',...args],{encoding:'utf8',timeout:180000});fs.writeFileSync(path.join(__dirname,name+'.log'),r.stderr||'');if(r.status!==0)throw Error(r.stderr);}
const input=path.join(root,'dist/assets/videos/Video-landing.mp4');
run(['-i',input,'-vf','scale=1920:1080:flags=lanczos,unsharp=5:5:0.35:3:3:0','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p','-an','-movflags','+faststart',path.join(root,'dist/assets/videos/Video-landing-hd.mp4')],'landing-encode');
run(['-i',input,'-frames:v','1','-q:v','2',path.join(__dirname,'landing-new-start.jpg')],'landing-start');
run(['-sseof','-0.1','-i',input,'-frames:v','1','-q:v','2',path.join(__dirname,'landing-new-end.jpg')],'landing-end');