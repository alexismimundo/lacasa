const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),code=fs.readFileSync(path.join(root,'dist/continuous/floor-plan.js'),'utf8');
new vm.Script(code);assert(!code.includes('seam.door'));assert(!code.includes('function threshold'));
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},canvas=document.querySelector('#house-floor-plan'),ctx=canvas.getContext('2d');document.body.classList.add('inhabited');
 const sample=(p,t=1000)=>{current=target=p;casaRender(t,0)};
 for(const phase of [.86,1.725,1.975,2.55,5.51,8.1,12.1,13.1,14.1,15.1,16.1,17.1,21.5]){
  sample(phase);a(!canvas.hidden,'divider visible '+phase);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let l=canvas.width,r=-1,t=canvas.height,b=-1;
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y)}
  a(r>=l&&b>=t,'divider drawn');a(Math.min(r-l,b-t)<10,'only thin divider, no perpendicular door marks '+phase);a(Math.max(r-l,b-t)>=Math.min(canvas.width,canvas.height)-5,'full boundary preserved');
 }
 sample(1.975);const before=canvas.toDataURL();sample(1.975,2000);a(before!==canvas.toDataURL(),'living graphite retained');sample(3.2);a(canvas.hidden,'no residual between passages');
 const result='PASS: 13 transitions retain only thin full-length living dividers; no door marks; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;resolve(result);
 }catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
fs.writeFileSync(path.join(__dirname,'seam-only-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));