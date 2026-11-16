const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!/type=["'](?:importmap|module)/.test(m[1]))new vm.Script(m[2]);
const test=`<script>
window.ready=new Promise(resolve=>setTimeout(async()=>{try{
 const a=(v,m)=>{if(!v)throw Error(m)},wait=ms=>new Promise(r=>setTimeout(r,ms));await document.fonts.ready;
 const title=document.querySelector('#landing-title'),artist=document.querySelector('#landing-artist'),lines=[...artist.querySelectorAll(':scope>span')],letters=[...artist.querySelectorAll('.landing-letter')];
 a(letters.length===13,'artist letters');
 const positions=lines.map(el=>el.getBoundingClientRect().top);await wait(400);lines.forEach((el,i)=>a(Math.abs(el.getBoundingClientRect().top-positions[i])<.01,'horizontal-only drift'));
 const ctx=document.createElement('canvas').getContext('2d'),style=getComputedStyle(artist);ctx.font=style.fontSize+' '+style.fontFamily;
 const metrics=ctx.measureText('ALEXIS'),lineHeight=parseFloat(style.lineHeight),inkHeight=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;
 a(lineHeight>=inkHeight-.3&&lineHeight-inkHeight<2,'tight lines: '+lineHeight+' vs '+inkHeight);
 const r=letters[0].getBoundingClientRect();window.dispatchEvent(new PointerEvent('pointermove',{clientX:r.x+r.width/2,clientY:r.y+r.height/2,pointerType:'mouse'}));await wait(100);
 a(parseFloat(letters[0].style.getPropertyValue('--landing-blur'))>1,'near letter bleeds');a(parseFloat(letters[5].style.getPropertyValue('--landing-blur'))<parseFloat(letters[0].style.getPropertyValue('--landing-blur')),'distant letter sharper');
 a(getComputedStyle(artist).filter==='none','no whole artist blur');a(getComputedStyle(title.querySelector('img')).filter==='none','sharp original logo');
 const tr=title.getBoundingClientRect();window.dispatchEvent(new PointerEvent('pointermove',{clientX:tr.x+tr.width/2,clientY:tr.y+tr.height/2,pointerType:'mouse'}));await wait(100);
 a(title.querySelector('.landing-ink').style.opacity==='1','local logo overlay');a(getComputedStyle(title.querySelector('.landing-ink')).maskImage.includes('radial-gradient'),'radial mask');
 clearLandingInk();a(title.querySelector('.landing-ink').style.opacity==='0','clear ink');
 const snapshot=()=>[title.style.getPropertyValue('--landing-x'),artist.style.getPropertyValue('--landing-x'),title.style.getPropertyValue('--landing-y')].join();
 renderLandingDepth(.5);const mid=snapshot();a(title.style.getPropertyValue('--landing-x')!==artist.style.getPropertyValue('--landing-x'),'different depth offsets');renderLandingDepth(.8);renderLandingDepth(.5);a(snapshot()===mid,'exact reverse');renderLandingDepth(0);a(parseFloat(title.style.getPropertyValue('--landing-x'))===0,'depth resets');
 placeEntryInstruction();const box=document.querySelector('#enter').getBoundingClientRect();a(Math.abs(parseFloat(document.querySelector('#approach-hint').style.top)-Math.min(innerHeight-40,box.bottom+Math.max(85,innerHeight*.115)))<.1,'lower instruction');
 const report='PASS: horizontal drift; tight lines '+lineHeight.toFixed(2)+'px / ink '+inkHeight.toFixed(2)+'px; local ink proximity; masked logo; reversible depth; lower hint; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=report;resolve(report);
 }catch(e){resolve('FAIL: '+e.stack)}},1500));</script>`;
fs.writeFileSync(path.join(__dirname,'landing-depth-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));
fs.writeFileSync(path.join(__dirname,'landing-depth-result.txt'),'PASS: production inline JavaScript syntax; fixture generated.');