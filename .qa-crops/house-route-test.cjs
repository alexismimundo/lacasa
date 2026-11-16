const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),root=path.resolve(__dirname,'..');
try{
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8'),context={window:{},innerWidth:1280,innerHeight:900};
 for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(m[1]))new vm.Script(m[2]);
 for(const file of ['house-route','casa','first-house']){const code=fs.readFileSync(path.join(root,'dist/continuous/'+file+'.js'),'utf8');new vm.Script(code);if(file==='house-route')vm.runInNewContext(code,context)}
 const r=context.window.houseRoute,rooms=[{s:7.6,h:1},{s:8.6,h:4,pin:true},{s:12.6,h:1},{s:13.6,h:1},{s:14.6,h:1},{s:15.6,h:1},{s:16.6,h:1},{s:17.6,h:4.4,pin:true},{s:22,h:1}];
 const offset=(s,p)=>s.pin?p<s.s?s.s-p:p<=s.s+s.h-1?0:s.s+s.h-1-p:s.s-p;
 for(let i=0;i<rooms.length-1;i++){
  const a=rooms[i],b=rooms[i+1],start=b.s-1;
  for(let k=1;k<100;k++){const p=start+k/100,A=r.section(a,offset(a,p)),B=r.section(b,offset(b,p)),dir=r.heading(b.s);assert(Math.abs(B.x-A.x-dir.x)<1e-9);assert(Math.abs(B.y-A.y-dir.y)<1e-9)}
 }
 for(const s of rooms){let last;const samples=[];for(let k=0;k<=200;k++){const p=s.s-1+k/100,v=r.section(s,offset(s,p));if(last)assert(Math.hypot(v.x-last.x,v.y-last.y)<.011);last=v;samples.push(JSON.stringify(v));const red=r.section(s,offset(s,p),true);assert.equal(red.x,0);assert.equal(red.y,offset(s,p))}for(let k=200;k>=0;k--)assert.equal(JSON.stringify(r.section(s,offset(s,s.s-1+k/100))),samples[k])}
 assert.equal(new Set(r.passages.map(p=>p.x+','+p.y)).size,4);
 assert(html.includes('continuous/house-route.js'));assert(!html.includes('continuous/scroll-flow.js'));assert(html.includes('delta*=current<1.2?.32:.35'));assert(html.includes('cameraTarget+delta/1600'));
 const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
 const a=(x,m)=>{if(!x)throw Error(m)};const rows=[];
 const sample=p=>{document.body.classList.remove('inhabited');current=target=p;casaRender(performance.now(),.016);document.body.classList.add('inhabited');current=target=p;casaRender(performance.now(),.016);return [...document.querySelectorAll('#casa-screens .pantalla')].map(el=>[el.id,el.style.transform,el.style.visibility])};
 for(const p of [8.1,12.1,13.1,14.1,15.1,16.1,17.1]){const before=JSON.stringify(sample(p));sample(p+.2);a(before===JSON.stringify(sample(p)),'reverse '+p);rows.push({phase:p,sections:JSON.parse(before)})}
 sample(8.1);let m=new DOMMatrix(getComputedStyle(document.querySelector('#p9')).transform);a(Math.abs(m.m41+innerWidth*.5)<1,'left passage');a(Math.abs(m.m42)<1,'no vertical drift');
 sample(12.1);m=new DOMMatrix(getComputedStyle(document.querySelector('#p10')).transform);a(Math.abs(m.m42+innerHeight*.5)<1,'up passage');
 sample(13.1);m=new DOMMatrix(getComputedStyle(document.querySelector('#p11')).transform);a(Math.abs(m.m41-innerWidth*.5)<1,'right passage');
 const oldTarget=target;const dialog=document.querySelector('#box-inventory');dialog.showModal();navigateScroll(120);a(target===oldTarget,'inventory blocks navigation');dialog.close();
 window.routeSamples=rows;const text='PASS: production scene transforms left/up/right; exact reverse; inventory blocks navigation; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=text;resolve(text);
 }catch(e){const text='FAIL '+e.stack;document.querySelector('#info').textContent=text;resolve(text)}},1800));</script>`;
 fs.writeFileSync(path.join(__dirname,'house-route-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));
 fs.writeFileSync(path.join(__dirname,'house-route-result.txt'),'PASS: production JS syntax; all four headings; paired passages stay exactly one viewport apart; dense continuity and reverse samples; reduced-motion vertical fallback; previous sensitivity and manual navigation retained.');
}catch(e){fs.writeFileSync(path.join(__dirname,'house-route-result.txt'),'FAIL '+e.stack);process.exitCode=1}