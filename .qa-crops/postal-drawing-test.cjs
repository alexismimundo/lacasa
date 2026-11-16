const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/tu-casa-postal.js'),'utf8'));
const test=String.raw`<script>window.ready=(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(2700);reachInside();target=current=16.5;casaRender(performance.now(),.016);
 for(let i=0;i<100&&!window.tuCasaPostal?.layout;i++)await wait(100);const api=window.tuCasaPostal,l=api?.layout;a(l,'real template measured');a(l.width===3000&&l.height===3000,'native template size');a(l.text[1]>l.holeBottom,'text below alpha hole');
 const pad=document.getElementById('community-pad'),r=pad.getBoundingClientRect();document.getElementById('community-clear').click();
 const pts=[[.15,.8],[.15,.4],[.5,.1],[.85,.4],[.85,.8],[.15,.8]];
 const event=(type,p)=>pad.dispatchEvent(new PointerEvent(type,{button:0,pointerId:1,clientX:r.left+p[0]*r.width,clientY:r.top+p[1]*r.height,bubbles:true,cancelable:true}));
 event('pointerdown',pts[0]);pts.slice(1).forEach(p=>event('pointermove',p));event('pointerup',pts.at(-1));
 a(communityPrototype.strokes.length===1&&communityPrototype.strokes[0].closed,'closed shape captured');
 const memory=document.getElementById('tu-memory');memory.value='Mi casa olía a pan. Una ventana siempre abierta.';memory.dispatchEvent(new Event('input',{bubbles:true}));await wait(200);
 const postal=api.render(document.createElement('canvas'),'postal'),cover=api.render(document.createElement('canvas'),'cover');a(postal.width===3000&&cover.width===3000,'exports native resolution');
 const c=postal.getContext('2d'),[x,y,w,h]=l.drawing;let pigment=0,holes=0;const p=c.getImageData(x+w*.45,y+h*.5,100,100).data;for(let i=0;i<p.length;i+=4){if(p[i]>100)pigment++;if(p[i]<80)holes++}a(pigment>0&&holes>0,'worn fill has pigment and exposed blue');
 a(Math.abs(r.width-r.height)<2,'square drawing surface');
 const realClick=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){};const result=await api.download();HTMLAnchorElement.prototype.click=realClick;a(result.width===3000&&result.bytes>10000,'download PNG generated');
 document.getElementById('tu-order').click();a(document.getElementById('tu-order-dialog').open,'personalization preview opens');document.querySelector('.tu-order-close').click();
 a(getComputedStyle(document.getElementById('community-journey')).backgroundColor==='rgb(44, 72, 119)','blue editor');
 return {result:'PASS actual calado / safe drawing rectangle / text below calado / real pointer drawing / worn fill / 3000px postcard and cover / personalization preview',layout:l,viewport:[innerWidth,innerHeight]};
 }catch(e){return 'FAIL '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'postal-drawing-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));