const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');new vm.Script(source);
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,1800));document.body.classList.add('inhabited');
 const a=(v,m)=>{if(!v)throw Error(m)},sample=p=>{current=target=p;casaRender(performance.now(),0)},people=[6,7].map(n=>document.querySelector('.sp-'+n));
 await Promise.all(['persona-06-remera-blanca-cerveza.webp','persona-07-remera-negra-brazo.webp'].map(name=>{const img=new Image();img.src='assets/first-house/salon/'+name;return img.decode()}));
 await new Promise(r=>setTimeout(r,100));
 sample(4.95);const girl=document.querySelector('.sp-3');a(Number(getComputedStyle(people[1]).zIndex)>Number(getComputedStyle(girl).zIndex),'raised-arm boy above last left woman');
 const positions=[];for(let i=0;i<=100;i++){sample(4.1+i*.01);positions.push(people.map(el=>new DOMMatrix(el.style.transform).m41));for(const el of people)a(Number(el.style.opacity)===1,'opaque departure')}
 for(let n=0;n<2;n++){
  if(positions.at(-1)[n]>=-1){
   const img=new Image();img.src='assets/first-house/salon/'+['persona-06-remera-blanca-cerveza.webp','persona-07-remera-negra-brazo.webp'][n];await img.decode();
   const canvas=document.createElement('canvas');canvas.width=384;canvas.height=256;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,384,256);const pixels=ctx.getImageData(0,0,384,256).data;let right=0;
   for(let y=0;y<256;y++)for(let x=0;x<384;x++)if(pixels[(y*384+x)*4+3]>32)right=Math.max(right,(x+1)/384);
   sample(5.1);const salon=document.querySelector('.fh-salon'),zoom=new DOMMatrix(document.querySelector('.fh-party').style.transform).a,w=salon.offsetWidth,h=salon.offsetHeight,imageW=3072*Math.max(w/3072,h/2048),projected=salon.getBoundingClientRect().left+((w-imageW)/2+imageW*right+positions.at(-1)[n])*zoom;
   a(projected<0,'stationary figure already cropped out on narrow screen');
  }
  for(let i=1;i<positions.length;i++)a(positions[i][n]<=positions[i-1][n]+.02,'continuous leftward travel');
 }
 for(let i=100;i>=0;i--){sample(4.1+i*.01);people.forEach((el,n)=>a(Math.abs(new DOMMatrix(el.style.transform).m41-positions[i][n])<.02,'exact reverse'))}
 sample(5.28);a(Math.abs(new DOMMatrix(document.querySelector('.fh-party').style.transform).a-3.8)<.001,'manual zoom unchanged');
 sample(4.96);a(document.querySelector('.pose-b').style.opacity==='1','gaze timing unchanged');
 sample(4.75);return JSON.stringify({status:'PASS',viewport:innerWidth+'x'+innerHeight,finalOffsets:positions.at(-1),checks:'both left boys move; monotonic departure; opaque; exact reverse; boy above woman; 3.8x camera; early gaze'});
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'salon-left-departure-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));