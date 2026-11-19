const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">');
fs.writeFileSync(path.join(__dirname,'continuous-wheel-browser.html'),html);
let runner=fs.readFileSync(path.join(__dirname,'timed-desktop-runner.cjs'),'utf8');
runner=runner.replace("const result=await send('Runtime.evaluate',{expression:'window.ready',awaitPromise:true,returnByValue:true});",`const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
 const samples=[];
 for(const phase of [15.4,15.9,16.5,17.35,17.5,17.65,17.8,18.4,19.2]){
 await evaluate('casaReview.go("dibujo");target=current='+phase+';casaRender(performance.now(),0)');
 await new Promise(r=>setTimeout(r,80));
 const points=await evaluate('(()=>{const ids=["community-pad","tu-download","tu-send","tu-order","tu-memory","tu-title"];return ids.map(id=>{const e=document.getElementById(id);if(!e||e.closest("[hidden]"))return null;const r=e.getBoundingClientRect(),left=Math.max(2,r.left),right=Math.min(innerWidth-2,r.right),top=Math.max(2,r.top),bottom=Math.min(innerHeight-2,r.bottom);if(right-left<15||bottom-top<15)return null;const x=(left+right)/2,y=(top+bottom)/2,hit=document.elementFromPoint(x,y);return {id,x,y,hit:!!hit&&(hit===e||e.contains(hit)),inert:!!e.closest("[inert]")}}).filter(Boolean)})()');
 for(const point of points){
 // A preceding field focus can scroll its native room on narrow viewports.
 await evaluate('document.activeElement?.blur();target=current='+phase+';document.getElementById("tu-memory-room").scrollTop=0;casaRender(performance.now(),0)');
 const actual=await evaluate('(()=>{const e=document.getElementById('+JSON.stringify(point.id)+'),r=e.getBoundingClientRect(),x=(Math.max(2,r.left)+Math.min(innerWidth-2,r.right))/2,y=(Math.max(2,r.top)+Math.min(innerHeight-2,r.bottom))/2,h=document.elementFromPoint(x,y);return {x,y,hit:!!h&&(h===e||e.contains(h))}})()');
 Object.assign(point,actual);
 if(point.id==='community-pad'){
 const before=await evaluate('communityPrototype.strokes.length');
 await evaluate('target=current+.08');
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+8,y:point.y+8,button:'left',buttons:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x+8,y:point.y+8,button:'left',clickCount:1});
 point.drawn=await evaluate('communityPrototype.strokes.length')>before;
 point.settled=await evaluate('Math.abs(target-current)<.001');
 }else if(point.hit){
 await evaluate('window.qaClicks=0;document.getElementById('+JSON.stringify(point.id)+').addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();window.qaClicks++},{capture:true,once:true});target=current+.08');
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});
 point.clicked=await evaluate('window.qaClicks===1');
 }
 }
 samples.push({phase,points,debug:await evaluate('({hit:document.elementFromPoint(innerWidth/2,innerHeight*.25)?.outerHTML.slice(0,250),inert:[...document.querySelectorAll("[inert]")].filter(e=>e.contains(document.getElementById("tu-memory"))).map(e=>e.id||e.dataset.escena)})')});
 }
 const all=samples.flatMap(s=>s.points),checks={visibleControls:all.every(p=>p.hit&&!p.inert),drawing:all.filter(p=>p.id==='community-pad').every(p=>p.drawn&&p.settled),clicks:all.filter(p=>p.id!=='community-pad').every(p=>p.clicked),testedDrawing:all.some(p=>p.drawn),testedButtons:all.some(p=>p.id==='tu-order'&&p.clicked)};
 const result={status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,samples};`);
fs.writeFileSync(path.join(__dirname,'moving-room-interactions-runner.cjs'),runner);