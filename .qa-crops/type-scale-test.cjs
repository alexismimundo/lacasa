const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const test=`<script>window.ready=(async()=>{try{await new Promise(r=>setTimeout(r,1600));await document.fonts.ready;const a=(v,m)=>{if(!v)throw Error(m)},props=['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing'];
 const selectors=['#fh-tooltip','#fh-box-lid-hint','#fh-box-scroll-hint','#house-cursor span','#approach-hint','.tv-tooltip','.fh-touch-label','.fh-flight-start','#fh-soldiers-prompt','.journey-object span','[role="tooltip"]'];
 const reference=getComputedStyle(document.querySelector('#fh-tooltip'));let count=0;
 for(const selector of selectors){const elements=document.querySelectorAll(selector);a(elements.length>0,'selector exists '+selector);for(const el of elements){const s=getComputedStyle(el);for(const prop of props)a(s[prop]===reference[prop],selector+' '+prop+': '+s[prop]+' != '+reference[prop]);count++}}
 a(reference.fontSize==='11px','shared tooltip size');const first=getComputedStyle(document.querySelector('#paper-house-title')),second=getComputedStyle(document.querySelector('#fh-next-house h2'));
 for(const prop of props)a(first[prop]===second[prop],'matching house names '+prop);a(second.color==='rgb(255, 255, 255)','second address white');
 document.body.classList.add('inhabited');document.body.classList.remove('closing-outside','reentering');target=current=7.6;window.casaRender(performance.now(),.016);
 a(!document.querySelector('#fh-next-house').hidden,'address scene visible');
 return 'PASS: '+count+' tooltip/hint checks share IBM Plex Mono 11px; house names match at '+second.fontSize+'; second address white; '+innerWidth+'x'+innerHeight;
 }catch(e){return 'FAIL: '+e.stack}})();</script>`;
fs.writeFileSync(path.join(__dirname,'type-scale-browser.html'),fs.readFileSync(path.join(root,'dist/index.html'),'utf8').replace('<head>','<head><base href="../dist/">').replace('</body>',test+'</body>'));