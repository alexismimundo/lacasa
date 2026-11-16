const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');let checked=0;
function scan(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())scan(p);else if(/\.(css|js|html)$/.test(p)){const text=fs.readFileSync(p,'utf8');assert(!/MonumentMono|monument-mono|ABC.?Monument/i.test(text),'old family '+p);if(p.endsWith('.js')&&!/^(import|export) /m.test(text))new vm.Script(text,{filename:p});checked++}}}scan(dist);
const test=`<script>window.ready=(async()=>{try{const a=(v,m)=>{if(!v)throw Error(m)};await new Promise(r=>setTimeout(r,1600));let loaded=0;
 for(const style of ['normal','italic'])for(const weight of [100,200,300,400,500,600,700]){const faces=await document.fonts.load(style+' '+weight+' 16px "IBM Plex Mono"','Árbol, niño, ¿qué?');a(faces.length===1,'face '+style+' '+weight);a(faces[0].status==='loaded','loaded');loaded++}
 a(getComputedStyle(document.querySelector('#landing-artist')).fontFamily.includes('IBM Plex Mono'),'landing family');
 a(getComputedStyle(document.querySelector('#landing-artist')).fontWeight==='400','regular retained');a(getComputedStyle(document.querySelector('#threshold-menu')).fontWeight==='300','light retained');
 document.body.classList.add('closing-outside');openMenuSection('others');await new Promise(r=>setTimeout(r,100));
 const atlas=document.querySelector('#community-atlas');a(atlas.open,'atlas opens');a(getComputedStyle(atlas.querySelector('.atlas-close')).fontFamily.includes('IBM Plex Mono'),'atlas font');
 a(![...document.fonts].some(f=>/Monument/i.test(f.family)),'no legacy faces');
 return 'PASS: 14 local IBM Plex Mono faces loaded (100–700 normal/italic), Spanish glyphs, landing/atlas families, original 300/400 weights; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'ibm-mono-browser.html'),fs.readFileSync(path.join(dist,'index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));
fs.writeFileSync(path.join(__dirname,'ibm-mono-static.json'),JSON.stringify({status:'PASS',checked,legacyReferences:0},null,2));