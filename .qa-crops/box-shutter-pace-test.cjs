const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},src=navigateScroll.toString(),start=src.indexOf('const filmPassage='),end=src.indexOf('}',start),input=new Function('current','delta','lowEase',src.slice(start,end)+';return delta;');
 a(Math.abs(input(1.8,120,lowEase)-19.2)<.001,'film unchanged');a(Math.abs(input(2.6,120,lowEase)-90)<.001,'more direct box passage');a(Math.abs(input(3.3,120,lowEase)-42)<.001,'shutter opening response restored');
 for(let p=2.1;p<3.2;p+=.001){a(Math.abs(input(p+.001,120,lowEase)-input(p,120,lowEase))<.4,'gradual speed');a(input(p,120,lowEase)>0,'no hold');a(Math.abs(input(p,-120,lowEase)+input(p,120,lowEase))<.001,'reverse symmetry')}
 document.body.classList.add('inhabited');for(let i=0;i<=30;i++){const p=2.1+i*.03;current=target=p;casaRender(performance.now(),0);const shutter=document.querySelector('.fh-shutter'),paper=document.querySelector('.kitchen-paper-cover'),incoming=new DOMMatrix(shutter.style.transform).m42,outgoing=new DOMMatrix(paper.style.transform).m42;a(Math.abs(incoming-outgoing-innerHeight)<.2,'joined box/shutter edge '+p)}
 resolve('PASS: faster manual box-to-shutter passage; gradual entry/exit; unchanged film; reverse symmetry; 31 joined-edge samples; '+innerWidth+'x'+innerHeight);
 }catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
fs.writeFileSync(path.join(__dirname,'box-shutter-pace-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));