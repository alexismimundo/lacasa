const fs=require('fs'),path=require('path'),assert=require('assert'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'dist/assets/videos'),ff='C:\\Users\\alexismimundo\\AppData\\Local\\Programs\\Stremio\\ffmpeg.exe';
function run(args){const r=spawnSync(ff,args,{encoding:'utf8'});assert.strictEqual(r.status,0,r.stderr);return r.stderr}
run(['-y','-i',path.join(dir,'Video-2.mp4'),'-t','2.72','-an','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',path.join(dir,'Video-2-loop.mp4')]);
run(['-y','-i',path.join(dir,'Video-2-loop.mp4'),'-frames:v','1',path.join(dir,'Video-2-loop-poster.jpg')]);
const report=run(['-hide_banner','-i',path.join(dir,'Video-2-loop.mp4'),'-vf','blackdetect=d=0.08:pix_th=0.10:pic_th=0.97','-an','-f','null','-']);
assert(!report.includes('black_start:'),'Black footage remains');fs.writeFileSync(path.join(__dirname,'video2-loop-verified.txt'),'PASS: original retained; trimmed loop decoded; no black intervals >= 80ms.\n'+report);