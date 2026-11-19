const fs=require('fs'),path=require('path'),http=require('http'),{spawn}=require('child_process');
const root=path.resolve(__dirname,'..'),name=process.argv[2]||'fire-inspect.html',out=process.argv[3]||'fire-inspect';
const viewport={width:Number(process.argv[4])||1280,height:Number(process.argv[5])||900,deviceScaleFactor:1,mobile:process.argv[6]==='mobile'};
// Video range streams can otherwise keep the runner alive after its result.
setTimeout(()=>{fs.writeFileSync(path.join(__dirname,out+'-timeout.txt'),'FAIL: browser runner exceeded 30 seconds');process.exit(1)},30000).unref();
const rangeServer=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!p.startsWith(root)){res.writeHead(403).end();return}try{const size=fs.statSync(p).size;res.setHeader('Content-Type',({'.mp4':'video/mp4','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.html':'text/html'}[path.extname(p)]||'application/octet-stream'));res.setHeader('Accept-Ranges','bytes');if(req.headers.range){const parts=req.headers.range.replace('bytes=','').split('-'),start=Number(parts[0]),end=parts[1]?Math.min(Number(parts[1]),size-1):size-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(p,{start,end}).pipe(res)}else{res.setHeader('Content-Length',size);fs.createReadStream(p).pipe(res)}}catch{res.writeHead(404).end()}});rangeServer.listen(21912,'127.0.0.1');
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!p.startsWith(root)){res.writeHead(403).end();return}fs.readFile(p,(e,b)=>{if(e){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.mp4':'video/mp4','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.html':'text/html'}[path.extname(p)]||'application/octet-stream'));res.end(b)})});
(async()=>{await new Promise(r=>server.listen(21910,'127.0.0.1',r));const child=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless','--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required','--remote-debugging-port=21911','--user-data-dir='+path.join(process.env.TEMP,'casa-timed-desktop'),'about:blank'],{stdio:'ignore'});let ws;
try{let pages;for(let i=0;i<100;i++){try{pages=await(await fetch('http://127.0.0.1:21911/json')).json();break}catch{await new Promise(r=>setTimeout(r,100))}}ws=new WebSocket(pages[0].webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map(),errors=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params)};const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});await send('Runtime.enable');await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',viewport);await send('Page.navigate',{url:'http://127.0.0.1:21910/.qa-crops/'+name});await new Promise(r=>setTimeout(r,1200));const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
 await evaluate('casaReview.go("lluvia")');
 const samples=[];
 for(let i=0;i<25;i++){
 await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:viewport.width/2,y:viewport.height/2,deltaY:120,deltaX:0});
 await new Promise(r=>setTimeout(r,50));
 samples.push(await evaluate('({current,target,hit:document.elementFromPoint(innerWidth/2,innerHeight/2)?.id,blocked:!!casaBlocksScroll(),first:!!firstHouseBlocks(),active:!!communityPrototype.active})'));
 }
 const forward=samples.at(-1).current>19.9&&samples.every((s,i)=>!i||s.target>=samples[i-1].target);
 const checks={forward};
 checks.noPinnedHolds=await evaluate('(()=>{return [["lluvia",14.8],["dibujo",17.3],["memoria",19.3]].every(([id,boundary])=>{casaReview.go(id);navigateScroll(innerHeight*.08);return target>boundary})})()');
 checks.reversibleMapping=await evaluate('(()=>{for(let p=0;p<26.8;p+=.013){if(Math.abs(houseRoute.scrollPhase(houseRoute.scrollPosition(p))-p)>1e-9)return false;if(Math.abs(houseRoute.advanceScroll(houseRoute.advanceScroll(p,.23),-.23)-p)>1e-9)return false}return houseRoute.advanceScroll(10,.2)===10.2})()');
 await evaluate('casaReview.go("memoria");document.getElementById("tu-memory").focus()');
 const before=await evaluate('target');
 await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:viewport.width/2,y:viewport.height/2,deltaY:120,deltaX:0});
 await new Promise(r=>setTimeout(r,100));checks.focusedField=await evaluate('target')>before;
 await evaluate('casaReview.go("memoria")');
 for(let i=0;i<26;i++){await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:viewport.width/2,y:viewport.height/2,deltaY:-120,deltaX:0});await new Promise(r=>setTimeout(r,40))}
 checks.reverse=await evaluate('current')<16;
 checks.textareaRemainder=await evaluate('(()=>{casaReview.go("memoria");const f=document.getElementById("tu-memory");f.value=("patio"+String.fromCharCode(10)).repeat(100);f.scrollTop=0;let t=target;f.dispatchEvent(new WheelEvent("wheel",{deltaY:40,bubbles:true,cancelable:true}));const internal=f.scrollTop>0&&target===t;f.scrollTop=f.scrollHeight;f.dispatchEvent(new WheelEvent("wheel",{deltaY:120,bubbles:true,cancelable:true}));return internal&&target>t})()');
 checks.dialog=await evaluate('(()=>{casaReview.go("memoria");const d=document.getElementById("tu-order-dialog");d.showModal();const t=target;d.dispatchEvent(new WheelEvent("wheel",{deltaY:120,bubbles:true,cancelable:true}));d.close();return t===target})()');
 await evaluate('casaReview.go("memoria")');
 const touchBefore=await evaluate('target');
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:viewport.width/2,y:viewport.height*.8}]});
 await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:viewport.width/2,y:viewport.height*.5}]});
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 checks.touch=await evaluate('target')>touchBefore;
 const result={status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,samples};const info=await send('Runtime.evaluate',{expression:'document.querySelector("#info")?.textContent',returnByValue:true});const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(__dirname,out+'.png'),Buffer.from(shot.data,'base64'));fs.writeFileSync(path.join(__dirname,out+'.json'),JSON.stringify({result,info,errors},null,2));}finally{ws?.close();child.kill();server.close();server.closeAllConnections();rangeServer.close();rangeServer.closeAllConnections()}})().catch(e=>{fs.writeFileSync(path.join(__dirname,out+'-error.txt'),e.stack||JSON.stringify(e));process.exit(1)});