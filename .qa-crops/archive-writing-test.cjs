const fs=require('fs'),path=require('path');
fs.writeFileSync(path.join(__dirname,'archive-writing-browser.html'),fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">'));
let runner=fs.readFileSync(path.join(__dirname,'timed-desktop-runner.cjs'),'utf8');
runner=runner.replace("const result=await send('Runtime.evaluate',{expression:'window.ready',awaitPromise:true,returnByValue:true});",`const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
 const checks={},samples=[];
 for(const phase of [17.65,17.8,18.4,19.4,19.55]){
 await evaluate('casaReview.go("memoria");document.activeElement?.blur();target=current='+phase+';casaRender(performance.now(),0)');
 await new Promise(r=>setTimeout(r,80));
 for(const id of ['tu-memory','tu-title']){
 const point=await evaluate('(()=>{const e=document.getElementById('+JSON.stringify(id)+'),r=e.getBoundingClientRect(),x=(Math.max(2,r.left)+Math.min(innerWidth-2,r.right))/2,y=(Math.max(2,r.top)+Math.min(innerHeight-2,r.bottom))/2;return {x,y,visible:r.bottom>20&&r.top<innerHeight-20}})()');
 if(!point.visible)continue;
 const hitBefore=await evaluate('document.elementFromPoint('+point.x+','+point.y+')?.outerHTML.slice(0,400)');
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});
 await send('Input.insertText',{text:'Patio de prueba'});
 samples.push({phase,id,hitBefore,typed:await evaluate('document.activeElement.id==='+JSON.stringify(id)+'&&document.activeElement.value.includes("Patio de prueba")'),debug:await evaluate('({active:document.activeElement.id,hit:document.elementFromPoint('+point.x+','+point.y+')?.outerHTML.slice(0,200)})')});
 }
 }
 checks.writing=samples.length>=6&&samples.every(s=>s.typed);
 await evaluate('casaReview.go("memoria");document.getElementById("tu-memory").value="La casa del patio y la voz de mi abuela";document.getElementById("tu-title").value="Alexis";document.getElementById("community-clear").click();document.getElementById("tu-add-archive").click()');
 await new Promise(r=>setTimeout(r,150));
 checks.opened=await evaluate('document.getElementById("community-atlas").open');
 checks.latest=await evaluate('(()=>{const e=[...document.querySelectorAll(".atlas-house")].find(e=>e.dataset.cell==="0:0");return e?.textContent.includes("La casa del patio y la voz de mi abuela")&&e.textContent.includes("Alexis")})()');
 checks.black=await evaluate('getComputedStyle(document.querySelector(".atlas-viewport")).backgroundColor==="rgb(0, 0, 0)"');
 checks.local=await evaluate('communityPrototype.saved.memory==="La casa del patio y la voz de mi abuela"&&communityPrototype.contributions.length>0');
 const phaseBefore=await evaluate('target');
 await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:viewport.width/2,y:viewport.height/2,deltaY:180,deltaX:120});await new Promise(r=>setTimeout(r,100));
 checks.isolated=await evaluate('target')===phaseBefore;
 checks.cards=await evaluate('document.querySelectorAll(".atlas-house .archive-card-memory").length>4');
 await evaluate('communityPrototype.showMemory(communityPrototype.saved)');
 checks.detail=await evaluate('document.querySelector("#community-memory article").textContent.includes("La casa del patio y la voz de mi abuela")&&!document.querySelector("#community-memory .memoria-ejemplo-imagen")');
 await evaluate('document.getElementById("community-memory").close();document.getElementById("community-atlas").close();casaReview.go("memoria");document.getElementById("tu-memory").value="Segundo recuerdo";document.getElementById("tu-add-archive").click()');
 checks.multiple=await evaluate('communityPrototype.contributions.some(e=>e.memory==="Segundo recuerdo")&&communityPrototype.contributions.some(e=>e.memory==="La casa del patio y la voz de mi abuela")');
 const result={status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,samples};`);
fs.writeFileSync(path.join(__dirname,'archive-writing-runner.cjs'),runner);