const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..');
try{
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8'),house=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
 for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(m[1]))new vm.Script(m[2]);new vm.Script(house);
 assert(!html.includes('casaScrollFrame'));assert(!html.includes('casaScrollDestination'));assert(!html.includes('continuous/scroll-flow.js'));
 assert(html.includes('delta*=current<1.2?.32:.35'));assert(html.includes('cameraTarget+delta/1600'));assert(html.includes("delta/Math.max(500,axis==='x'?innerWidth:innerHeight)"));
 const ease=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
 const expr=house.match(/const camZoom=(.*);/)[1],zoom=p=>vm.runInNewContext(expr,{ease,p,closeUp:ease(4.64,5.28,p)});
 assert.equal(zoom(3.5),1);assert(Math.abs(zoom(5.28)-5.2)<1e-9);
 let previous=zoom(3.5),maxDifference=0;
 for(let i=1;i<=178;i++){const p=3.5+i*.01,z=zoom(p),old=1+ease(3.5,5,p)*2.6+ease(4.64,5.28,p)*1.6;assert(z>=previous);maxDifference=Math.max(maxDifference,Math.abs(z-old));previous=z;assert.equal(zoom(p),z)}
 assert(maxDifference<.2,'only a small curve adjustment');
 fs.writeFileSync(path.join(__dirname,'restored-scroll-result.txt'),'PASS: syntax; previous scroll sensitivity and entry restored; no automatic controller; zoom monotonic, deterministic and same endpoints; adjustment below 0.2 scale units.');
}catch(e){fs.writeFileSync(path.join(__dirname,'restored-scroll-result.txt'),'FAIL '+e.stack);process.exitCode=1}