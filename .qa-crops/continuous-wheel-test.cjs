const fs=require('fs'),path=require('path');
let runner=fs.readFileSync(path.join(__dirname,'timed-desktop-runner.cjs'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">');
fs.writeFileSync(path.join(__dirname,'continuous-wheel-browser.html'),html);
runner=runner.replace("const result=await send('Runtime.evaluate',{expression:'window.ready',awaitPromise:true,returnByValue:true});",`const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
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
 const result={status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,samples};`);
fs.writeFileSync(path.join(__dirname,'continuous-wheel-runner.cjs'),runner);