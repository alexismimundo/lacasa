const fs=require('fs'),path=require('path');
let runner=fs.readFileSync(path.join(__dirname,'timed-desktop-runner.cjs'),'utf8');
runner=runner.replace("'http://127.0.0.1:21910/.qa-crops/'+name","'http://127.0.0.1:21910/dist/index.html'");
runner=runner.replace("const result=await send('Runtime.evaluate',{expression:'window.ready',awaitPromise:true,returnByValue:true});",`const checks=[];
 const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
 const assert=async(expression,label)=>{if(!await evaluate(expression))throw Error(label);checks.push(label)};
 const key=async(code,modifiers=0)=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:code,code,modifiers});await send('Input.dispatchKeyEvent',{type:'keyUp',key:code,code,modifiers});};
  await assert('!!window.casaReview && !!document.getElementById("coming-soon-gate") && !casaReview.active','starts at coming soon');
  await assert('!document.getElementById("review-navigation")','no visible review controls');
  await evaluate('document.getElementById("coming-soon-gate").contentWindow.focus()');
  await key('ArrowRight');await assert('casaReview.index===0 && !document.getElementById("coming-soon-gate")','right arrow from focused teaser');
  await key('ArrowRight');await assert('casaReview.index===1','real right arrow advances');
  await key('ArrowLeft');await assert('casaReview.index===0','real left arrow returns');
  await evaluate('window.testField=document.createElement("input");document.body.append(testField);testField.focus()');await key('ArrowRight');await assert('casaReview.index===0','text input keeps native arrows');
 await evaluate('document.activeElement.blur()');
 for(const id of ['lluvia','dibujo','landing','oscuridad','cocina']){await evaluate('casaReview.go('+JSON.stringify(id)+')');await new Promise(r=>setTimeout(r,120));await assert(id==='landing'?'document.body.classList.contains("closing-outside")':'Math.abs(current-casaReview.stops[casaReview.index].phase)<.05','jump '+id);}
   await evaluate('casaReview.go("dibujo")');await assert('!location.search.includes("pantalla=")','no persisted stop in URL');await send('Page.reload',{ignoreCache:true});await new Promise(r=>setTimeout(r,4000));await assert('!!document.getElementById("coming-soon-gate") && !window.casaReview?.active','reload returns to coming soon');
 const result={status:'PASS',checks};`);
fs.writeFileSync(path.join(__dirname,'review-real-keys-runner.cjs'),runner);