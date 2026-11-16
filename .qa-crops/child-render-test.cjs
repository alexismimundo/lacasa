const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8'));
// Exercise the production dirty-frame guard without requiring the remote Three CDN.
const source=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
const guard=source.slice(source.indexOf(' if(inside&&box3d){'),source.indexOf("root.style.visibility=active?"));
const context={inside:true,leafFlight:null,lastBoxFrame:'',calls:0};
context.box3d={lastW:280,lastH:177,camera:{aspect:1.58},rig:{rotation:{x:0,y:0,z:0}},tapa:{quaternion:{x:0,y:0,z:0,w:1}},labelTexture:{version:1},renderer:{render(){context.calls++}}};vm.createContext(context);
const draw=()=>vm.runInContext(guard,context),check=(v,m)=>{if(!v)throw Error(m)};
draw();draw();check(context.calls===1,'static box skips redundant draws');context.box3d.tapa.quaternion.x=.2;draw();check(context.calls===2,'lid redraw');context.box3d.labelTexture.version++;draw();check(context.calls===3,'async label redraw');context.leafFlight={};draw();draw();check(context.calls===5,'leaf animation redraw');context.leafFlight=null;draw();check(context.calls===6,'clear completed leaves');context.box3d.lastW=200;draw();check(context.calls===7,'resize redraw');
fs.writeFileSync(path.join(__dirname,'child-box-dirty-result.json'),JSON.stringify({status:'PASS',checks:'static buffer retained; lid; async label; animated leaves; cleared leaves; resize'}));
const test=`<script>window.ready=(async()=>{try{
 await new Promise(r=>setTimeout(r,2200));document.body.classList.add('inhabited');
 const a=(v,m)=>{if(!v)throw Error(m)},frames=[],costs=[],longTasks=[];let observer;
 if(window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes.includes('longtask')){observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>e.duration)));observer.observe({type:'longtask'})}
 const imageReady=[...document.querySelectorAll('#first-house .fh-sp')].map(el=>{const url=getComputedStyle(el).backgroundImage.match(/url\\(["']?(.*?)["']?\\)/);if(!url)return Promise.resolve();const img=new Image();img.src=url[1];return img.decode().catch(()=>{})});await Promise.all(imageReady);
 let previous;for(let i=0;i<180;i++){
 const now=await new Promise(requestAnimationFrame);if(previous!==undefined)frames.push(now-previous);previous=now;
 current=target=3.95+1.33*i/179;const start=performance.now();casaRender(now,1/60);costs.push(performance.now()-start);
 }
 const zoom=()=>new DOMMatrix(document.querySelector('.fh-shutter').style.transform).a;
 a(Math.abs(zoom()-3.8)<.001,'final framing');current=target=3.5;casaRender(performance.now(),0);a(Math.abs(zoom()-1)<.001,'reverse framing');
 current=target=5.29;casaRender(performance.now(),0);const skyY=new DOMMatrix(document.querySelector('.fh-sky').style.transform).m42,salonY=new DOMMatrix(document.querySelector('.fh-salon-viewport').style.transform).m42;a(Math.abs(salonY-skyY-innerHeight)<.1,'joined sky');
 const accelerated=getComputedStyle(document.querySelector('.fh-party')).willChange==='transform';
 observer?.disconnect();const stats=values=>{const sorted=[...values].sort((a,b)=>a-b);return {mean:values.reduce((a,b)=>a+b,0)/values.length,p95:sorted[Math.floor(sorted.length*.95)],max:sorted.at(-1)}};
 return JSON.stringify({status:'PASS',viewport:innerWidth+'x'+innerHeight,accelerated,frames:stats(frames),render:stats(costs),longTasks,checks:'180 zoom steps; original endpoints; reverse; joined sky'});
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'child-render-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));
// Keep the regular runner unchanged. This variant allows browser GPU compositing.
fs.writeFileSync(path.join(__dirname,'child-render-chrome.cjs'),fs.readFileSync(path.join(__dirname,'chrome-check.cjs'),'utf8').replace("'--disable-gpu',",''));