const fs=require('fs'),path=require('path'),http=require('http'),{spawn}=require('child_process');
const root=path.resolve(__dirname,'..'),name=process.argv[2]||'fire-inspect.html',out=process.argv[3]||'fire-inspect';
const viewport={width:Number(process.argv[4])||1280,height:Number(process.argv[5])||900,deviceScaleFactor:1,mobile:process.argv[6]==='mobile'};
// Video range streams can otherwise keep the runner alive after its result.
setTimeout(()=>{fs.writeFileSync(path.join(__dirname,out+'-timeout.txt'),'FAIL: browser runner exceeded 30 seconds');process.exit(1)},30000).unref();
const rangeServer=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!p.startsWith(root)){res.writeHead(403).end();return}try{const size=fs.statSync(p).size;res.setHeader('Content-Type',({'.mp4':'video/mp4','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.html':'text/html'}[path.extname(p)]||'application/octet-stream'));res.setHeader('Accept-Ranges','bytes');if(req.headers.range){const parts=req.headers.range.replace('bytes=','').split('-'),start=Number(parts[0]),end=parts[1]?Math.min(Number(parts[1]),size-1):size-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(p,{start,end}).pipe(res)}else{res.setHeader('Content-Length',size);fs.createReadStream(p).pipe(res)}}catch{res.writeHead(404).end()}});rangeServer.listen(21912,'127.0.0.1');
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!p.startsWith(root)){res.writeHead(403).end();return}fs.readFile(p,(e,b)=>{if(e){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.mp4':'video/mp4','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.html':'text/html'}[path.extname(p)]||'application/octet-stream'));res.end(b)})});
(async()=>{await new Promise(r=>server.listen(21910,'127.0.0.1',r));const child=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless','--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required','--remote-debugging-port=21911','--user-data-dir='+path.join(process.env.TEMP,'casa-timed-desktop'),'about:blank'],{stdio:'ignore'});let ws;
try{let pages;for(let i=0;i<100;i++){try{pages=await(await fetch('http://127.0.0.1:21911/json')).json();break}catch{await new Promise(r=>setTimeout(r,100))}}ws=new WebSocket(pages[0].webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map(),errors=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params)};const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});await send('Runtime.enable');await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',viewport);await send('Page.navigate',{url:'http://127.0.0.1:21910/.qa-crops/'+name});await new Promise(r=>setTimeout(r,1200));const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
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
 const result={status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,samples};const info=await send('Runtime.evaluate',{expression:'document.querySelector("#info")?.textContent',returnByValue:true});const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(__dirname,out+'.png'),Buffer.from(shot.data,'base64'));fs.writeFileSync(path.join(__dirname,out+'.json'),JSON.stringify({result,info,errors},null,2));}finally{ws?.close();child.kill();server.close();server.closeAllConnections();rangeServer.close();rangeServer.closeAllConnections()}})().catch(e=>{fs.writeFileSync(path.join(__dirname,out+'-error.txt'),e.stack||JSON.stringify(e));process.exit(1)});