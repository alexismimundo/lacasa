const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
new vm.Script(fs.readFileSync(path.join(root,'dist/continuous/visual-interaction.js'),'utf8'));
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms)),a=(v,m)=>{if(!v)throw Error(m)};try{
await wait(2000);const gate=document.querySelector('#coming-soon-gate');a(gate,'teaser present');gate.contentDocument.body.click();gate.contentDocument.body.click();gate.contentDocument.body.click();await wait(250);
a(!document.querySelector('#coming-soon-gate'),'landing revealed');const enter=document.querySelector('#enter');a(document.activeElement!==enter,'no automatic entry focus');a(!enter.matches(':focus-visible'),'no automatic dotted outline');a(!document.body.classList.contains('cursor-enter'),'no premature hover tooltip');
for(const selector of ['#landing-title','#landing-artist','#sequence','#landing-legal']){const node=document.querySelector(selector);a(getComputedStyle(node).userSelect==='none','scenery selection disabled');a(!node.dispatchEvent(new Event('selectstart',{bubbles:true,cancelable:true})),'selection prevented')}
a(!document.querySelector('#sequence').dispatchEvent(new Event('dragstart',{bubbles:true,cancelable:true})),'image drag prevented');
for(const kind of ['input','textarea','div']){const field=document.createElement(kind);if(kind==='div')field.contentEditable='true';document.body.append(field);a(getComputedStyle(field).userSelect==='text','editing CSS preserved');a(field.dispatchEvent(new Event('selectstart',{bubbles:true,cancelable:true})),'editing selection allowed');field.remove()}
if(matchMedia('(pointer:fine)').matches){enter.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:innerWidth/2,clientY:innerHeight/2}));a(document.body.classList.contains('cursor-enter'),'hover still shows tooltip');enter.dispatchEvent(new PointerEvent('pointerleave',{pointerType:'mouse'}));a(!document.body.classList.contains('cursor-enter'),'tooltip clears after hover')}
enter.focus();a(document.activeElement===enter,'keyboard focus retained');enter.blur();
return document.querySelector('#info').textContent='PASS: no automatic outline/tooltip; scenery not selectable or draggable; fields editable; hover and keyboard focus preserved; '+innerWidth+'x'+innerHeight;
}catch(e){return document.querySelector('#info').textContent='FAIL: '+e.stack}})();</script>`;
const reset='<script>localStorage.removeItem("laCasaInicio");</script>';
fs.writeFileSync(path.join(__dirname,'visual-interaction-browser.html'),html.replace('<head>','<head><base href="../dist/">'+reset).replace('</body>',test+'</body>'));