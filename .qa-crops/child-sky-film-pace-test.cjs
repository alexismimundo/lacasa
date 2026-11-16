const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8'));
assert(html.includes('assets/videos/Video-1.mp4'));
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)};document.body.classList.add('inhabited');
 const source=navigateScroll.toString(),start=source.indexOf('const filmPassage='),end=source.indexOf('}',start);
 const input=new Function('current','delta','lowEase',source.slice(start,end)+';return delta;');
 const film=input(1.8,120,lowEase);a(Math.abs(film-19.2)<.001,'reference film pace');
 for(const p of [4.15,4.5,5,5.28,5.5,5.7])a(Math.abs(input(p,120,lowEase)-film)<.001,'same gentle input '+p);
 for(const p of [2.9,3.3,3.5,3.95])a(Math.abs(input(p,120,lowEase)-42)<.001,'shutter input unchanged '+p);
 a(tick.toString().includes('Math.exp(-9*dt)'),'same following as reference film');
 for(let p=3.95;p<5.95;p+=.001){a(input(p,120,lowEase)>0,'no scroll hold');a(Math.abs(input(p+.001,120,lowEase)-input(p,120,lowEase))<.18,'continuous sensitivity');a(Math.abs(input(p,-120,lowEase)+input(p,120,lowEase))<.0001,'symmetric reverse input')}
 const sample=p=>{current=target=p;casaRender(performance.now(),0)},zoom=()=>new DOMMatrix(document.querySelector('.fh-shutter').style.transform).a,y=sel=>new DOMMatrix(document.querySelector(sel).style.transform).m42;
 sample(3.5);a(Math.abs(zoom()-1)<.001,'initial zoom preserved');sample(5.28);a(Math.abs(zoom()-5.2)<.001,'final zoom preserved');
 let prev=innerHeight;for(let i=0;i<=84;i++){sample(5.28+i*.005);const incoming=y('.fh-sky'),outgoing=y('.fh-salon-viewport');a(Math.abs(incoming-outgoing-innerHeight)<.1,'joined scene edges');a(incoming<=prev+.01,'monotonic descent');prev=incoming}
 sample(5.29);a(y('.fh-salon-viewport')<0,'descent starts immediately after zoom');sample(5.7);a(Math.abs(y('.fh-sky'))<.01,'sky fully arrives');
 a(document.querySelector('#kitchen-teaser-room video').getAttribute('src')==='assets/videos/Video-2.mp4','second video retained');
 const result='PASS: film-matched .16 scroll sensitivity; shutter input unchanged; shared camera following; smooth reversible input; no gap after child; 85 joined sky samples; original zoom endpoints; Video-2 retained; '+innerWidth+'x'+innerHeight;resolve(result);
 }catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
fs.writeFileSync(path.join(__dirname,'child-sky-film-pace-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));