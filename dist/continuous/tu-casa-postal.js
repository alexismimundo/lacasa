// One shared textured renderer for the drawing surface, the postcard and its cover.
(()=>{'use strict';
 const api=window.communityPrototype,editor=document.getElementById('tu-casa-editor'),pad=document.getElementById('community-pad'),memory=document.getElementById('tu-memory'),title=document.getElementById('tu-title'),status=document.getElementById('tu-status'),preview=editor.querySelector('.tu-cover canvas'),red=matchMedia('(prefers-reduced-motion:reduce)');
 const BLUE='#2c4877',LILAC='#b9a3de',PAPER='#f4f4f1',template=new Image();
 let layout=null,loadError=false,dirty=true,lastPaint=0,lastPreview=0,frame=0;
 const heading=editor.querySelector('.community-draw-title'),headingText='Dibujá tu casa y escribí algo que te recuerde a ella.',headingWords=[];
 heading.classList.add('memory-phrase');heading.setAttribute('aria-label',headingText);heading.replaceChildren();
 headingText.split(' ').forEach(word=>{const group=document.createElement('span');group.className='ink-word';for(const char of word){const letter=document.createElement('span');letter.className='ink-letter';letter.textContent=char;letter.setAttribute('aria-hidden','true');group.append(letter);inkLetters.push(letter)}heading.append(group,document.createTextNode(' '));headingWords.push(group)});
 editor.querySelector('.community-help').hidden=true;
 const form=editor.querySelector('form');form.querySelector('small').hidden=true;title.closest('label').firstChild.textContent='Tu nombre';title.setAttribute('aria-label','Tu nombre');title.placeholder='¿Cómo te llamás?';title.autocomplete='name';title.value='';memory.value='';
 const memoryLabel=memory.closest('label');memoryLabel.firstChild.textContent='Algo que te recuerde a tu casa';memory.setAttribute('aria-label','Escribí algo que te recuerde a tu casa');memory.placeholder='Un olor, una voz, un rincón…';memory.maxLength=280;form.prepend(memoryLabel);form.onsubmit=e=>e.preventDefault();
 const oldPreview=form.querySelector('.tu-memory-preview');oldPreview.classList.remove('tu-memory-preview');oldPreview.hidden=true;
 document.getElementById('tu-story').hidden=true;document.getElementById('tu-save').hidden=true;
 document.getElementById('tu-download').textContent='Descargar mi postal';document.getElementById('tu-order').textContent='Personalizar mi disco';
 const quickDownload=document.createElement('button');quickDownload.type='button';quickDownload.id='tu-download-now';quickDownload.textContent='Ya está · descargar mi dibujo';editor.querySelector('.community-tools').append(quickDownload);quickDownload.onclick=()=>download().catch(()=>{status.textContent='No se pudo descargar. Tu dibujo sigue acá.'});
 const send=document.createElement('button');send.id='tu-send';send.type='button';send.textContent='Enviar mi casa';document.getElementById('tu-order').before(send);
 document.getElementById('tu-skip').textContent='Seguí scrolleando para salir de la casa ↓';
 let exitTouch=null;
 editor.addEventListener('touchstart',e=>{exitTouch=e.touches.length===1&&!e.target.closest('input,textarea,#community-pad')?{y:e.touches[0].clientY}:null},{passive:true});
 editor.addEventListener('touchmove',e=>{if(!exitTouch||e.touches.length!==1||current<15.8)return;const y=e.touches[0].clientY,dy=exitTouch.y-y,edge=dy>0?editor.scrollTop+editor.clientHeight>=editor.scrollHeight-2:editor.scrollTop<=2;exitTouch.y=y;if(edge){e.preventDefault();e.stopPropagation();if(form.contains(document.activeElement))document.activeElement.blur();navigateScroll(dy*2)}else e.stopPropagation()},{passive:false});
 editor.addEventListener('touchend',()=>{exitTouch=null},{passive:true});
 editor.querySelector('.tu-cover figcaption').textContent='Así se ve tu dibujo a través de la portada. El texto queda debajo, oculto por la tapa.';
 const surface=document.createElement('canvas');surface.className='tu-textured-pad';surface.setAttribute('aria-hidden','true');pad.after(surface);
 const padWrap=document.createElement('div');padWrap.className='tu-pad-wrap';pad.before(padWrap);padWrap.append(pad,surface);
 // Fresh canvas for each page visit, without deleting the saved community archive.
 document.getElementById('community-clear').click();
 const texture=document.createElement('canvas');texture.width=texture.height=256;
 const tc=texture.getContext('2d'),grain=tc.createImageData(256,256);let seed=731;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 for(let i=0;i<grain.data.length;i+=4){const v=random();grain.data[i+3]=v>.83?Math.round(70+random()*150):v>.5?Math.round(random()*45):0}tc.putImageData(grain,0,0);
 const pigment=document.createElement('canvas');pigment.width=800;pigment.height=500;
 function drawPigment(time=0,live=false){
  const c=pigment.getContext('2d');c.clearRect(0,0,800,500);c.fillStyle=c.strokeStyle=LILAC;c.lineWidth=3.6;c.lineJoin=c.lineCap='round';
  const shapes=new Path2D(),paths=api.active?[...api.strokes,{closed:false,points:api.active}]:api.strokes;
  const point=(p,j,i)=>live&&!red.matches?[p[0]+Math.sin(j*4+i+time)*.28,p[1]+Math.cos(j*3+i+time)*.28]:p;
  paths.forEach((stroke,i)=>{if(!stroke.closed)return;stroke.points.forEach((p,j)=>{const q=point(p,j,i);j?shapes.lineTo(...q):shapes.moveTo(...q)});shapes.closePath()});c.fill(shapes,'evenodd');
  paths.forEach((stroke,i)=>{if(stroke.closed)return;c.beginPath();stroke.points.forEach((p,j)=>{const q=point(p,j,i);j?c.lineTo(...q):c.moveTo(...q)});c.stroke()});
  c.globalCompositeOperation='destination-out';c.fillStyle=c.createPattern(texture,'repeat');c.fillRect(0,0,800,500);c.globalCompositeOperation='source-over';return pigment;
 }
 // Largest axis-aligned rectangle fully inside the alpha hole, not its unsafe bounds.
 function measureTemplate(image){
  const size=300,canvas=document.createElement('canvas');canvas.width=canvas.height=size;const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0,size,size);const d=c.getImageData(0,0,size,size).data;
  const seen=new Uint8Array(size*size);let hole=null;
  for(let start=0;start<seen.length;start++){
   if(seen[start]||d[start*4+3]>24)continue;const queue=[start];seen[start]=1;let border=false,maxY=0;
   for(let head=0;head<queue.length;head++){const n=queue[head],x=n%size,y=Math.floor(n/size);if(x===0||y===0||x===size-1||y===size-1)border=true;maxY=Math.max(maxY,y);for(const next of [x?n-1:-1,x<size-1?n+1:-1,y?n-size:-1,y<size-1?n+size:-1])if(next>=0&&!seen[next]&&d[next*4+3]<=24){seen[next]=1;queue.push(next)}}
   if(!border&&(!hole||queue.length>hole.pixels.length))hole={pixels:queue,maxY};
  }
  if(!hole||hole.pixels.length<1000)throw Error('No se encontró el calado transparente de la portada.');
  const mask=new Uint8Array(size*size);hole.pixels.forEach(n=>mask[n]=1);const heights=new Int32Array(size);let best={area:0};
  for(let y=0;y<size;y++){
   for(let x=0;x<size;x++)heights[x]=mask[y*size+x]?heights[x]+1:0;
   const stack=[];for(let x=0;x<=size;x++){const height=x<size?heights[x]:0;while(stack.length&&heights[stack.at(-1)]>height){const top=stack.pop(),h=heights[top],left=stack.length?stack.at(-1)+1:0,w=x-left;if(w*h>best.area)best={area:w*h,x:left,y:y-h+1,w,h}}stack.push(x)}
  }
  const width=3000,height=3000,scale=width/size,inset=30;
  return {width,height,sourceWidth:image.naturalWidth,sourceHeight:image.naturalHeight,drawing:[best.x*scale+inset,best.y*scale+inset,best.w*scale-inset*2,best.h*scale-inset*2],text:[width*.14,(hole.maxY+1)*scale+100,width*.72,height-((hole.maxY+1)*scale+100)-120],holeBottom:(hole.maxY+1)*scale};
 }
 function textLines(c,text,width){const lines=[];for(const paragraph of text.split('\n')){let line='';for(const word of paragraph.split(/\s+/)){for(const char of (line?' ':'')+word){if(c.measureText(line+char).width>width&&line){lines.push(line);line=''}line+=char}}lines.push(line)}return lines}
 function render(canvas,kind='postal'){
  if(!layout)return canvas;canvas.width=layout.width;canvas.height=layout.height;const c=canvas.getContext('2d');c.fillStyle=BLUE;c.fillRect(0,0,canvas.width,canvas.height);
  const [x,y,w,h]=layout.drawing,side=Math.min(w,h);c.drawImage(drawPigment(),x+(w-side)/2,y+(h-side)/2,side,side);
  const [tx,ty,tw,th]=layout.text;let fontSize=58,lines;
  const caption=memory.value+(title.value.trim()?'\n— '+title.value.trim():'');
  do{c.font=fontSize+'px "IBM Plex Mono",monospace';lines=textLines(c,caption,tw);if(lines.length*fontSize*1.5<=th)break;fontSize-=2}while(fontSize>22);
  c.save();c.beginPath();c.rect(tx,ty,tw,th);c.clip();c.fillStyle=PAPER;c.textAlign='center';c.textBaseline='top';lines.forEach((line,i)=>c.fillText(line,tx+tw/2,ty+i*fontSize*1.5));c.restore();
  if(kind==='cover')c.drawImage(template,0,0,canvas.width,canvas.height);return canvas;
 }
 function update(){dirty=true;if(layout){render(preview,'cover');lastPreview=performance.now()}}
 function paint(now){
  frame=0;if(editor.hidden||document.hidden)return;
  if(dirty||api.active||!red.matches&&now-lastPaint>110){
   const r=pad.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2),w=Math.round(r.width*ratio),h=Math.round(r.height*ratio);if(surface.width!==w||surface.height!==h){surface.width=w;surface.height=h}
   const c=surface.getContext('2d');c.clearRect(0,0,w,h);c.drawImage(drawPigment(Math.floor(now/110),true),0,0,w,h);lastPaint=now;dirty=false;
  }
  if(api.active&&now-lastPreview>180&&layout){render(preview,'cover');lastPreview=now}
  frame=requestAnimationFrame(paint);
 }
 const previous=window.casaRender;window.casaRender=function(now,dt){previous(now,dt);heading.style.visibility=editor.hidden?'hidden':'visible';if(!editor.hidden){headingWords.forEach((word,i)=>{const phase=now/1000/(12+i%5*2)*Math.PI*2+i*1.7;word.style.transform=red.matches?'none':'translate('+Math.sin(phase)*7+'px,'+Math.sin(phase*.7)*3+'px)'});if(!frame)frame=requestAnimationFrame(paint)}};
 window.addEventListener('community-drawing-change',()=>{dirty=true;if(!api.active)update()});memory.addEventListener('input',update);title.addEventListener('input',update);window.addEventListener('resize',()=>{dirty=true});
 function withDpi(blob){return blob.arrayBuffer().then(buffer=>{
  const input=new Uint8Array(buffer),chunk=new Uint8Array(21),view=new DataView(chunk.buffer);view.setUint32(0,9);chunk.set([112,72,89,115],4);view.setUint32(8,11811);view.setUint32(12,11811);chunk[16]=1;
  let crc=0xffffffff;for(let i=4;i<17;i++){crc^=chunk[i];for(let b=0;b<8;b++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}view.setUint32(17,(crc^0xffffffff)>>>0);
  return new Blob([input.slice(0,33),chunk,input.slice(33)],{type:'image/png'});
 })}
 async function download(kind='postal'){
  if(!layout){status.textContent=loadError?'No se pudo cargar la plantilla. Recargá para reintentar.':'La plantilla todavía está cargando.';return null}
  if(!api.strokes.length){status.textContent='Dibujá tu casa antes de descargar la postal.';return null}
  await document.fonts.ready;const canvas=render(document.createElement('canvas'),kind),blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('No se pudo generar el PNG.');const final=await withDpi(blob),url=URL.createObjectURL(final),link=document.createElement('a');link.href=url;link.download=kind==='cover'?'la-casa-portada-personalizada-3000.png':'la-casa-postal-3000-300ppp.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);status.textContent='Tu '+(kind==='cover'?'vista de portada':'postal')+' está lista: 3000 × 3000 px, 300 ppp.';return {width:canvas.width,height:canvas.height,bytes:final.size};
 }
 document.getElementById('tu-download').onclick=()=>download().catch(()=>{status.textContent='No se pudo descargar. Tu dibujo sigue en pantalla.'});
 send.onclick=async()=>{
  if(!title.value.trim()){status.textContent='Escribí tu nombre antes de enviar tu casa.';title.focus();return}
  if(!layout||!api.strokes.length){status.textContent='Dibujá tu casa antes de enviarla.';return}
  try{await document.fonts.ready;const canvas=render(document.createElement('canvas')),blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('PNG no disponible');const file=new File([await withDpi(blob)],'la-casa-postal.png',{type:'image/png'});
   if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({files:[file],title:'La casa de '+title.value.trim(),text:memory.value});status.textContent='Postal compartida desde tu dispositivo.'}
   else{await download();status.textContent='Tu navegador no permite enviar archivos directamente. Descargamos la postal para que la adjuntes donde quieras. No se envió a la comunidad.'}
  }catch(error){status.textContent=error.name==='AbortError'?'Envío cancelado. Tu dibujo sigue acá.':'No se pudo compartir la postal. Podés descargarla.'}
 };
 const order=document.getElementById('tu-order-dialog');order.innerHTML='<form hidden></form><h2>Personalizá tu disco</h2><canvas class="tu-order-preview" aria-label="Tu dibujo en el calado de la portada"></canvas><p>Tu dibujo queda dentro del calado. Tu recuerdo va debajo, en la postal interior.</p><button type="button" class="tu-order-postal">Descargar postal para mi disco</button><button type="button" class="tu-order-cover">Descargar vista de portada</button><p role="status">El encargo todavía no está conectado a una tienda. No se envían datos ni se realiza un pedido o pago.</p><button type="button" class="tu-order-close">Volver a mi dibujo</button>';
 document.getElementById('tu-order').onclick=()=>{if(!layout||!api.strokes.length){status.textContent='Dibujá tu casa para personalizar el disco.';return}render(order.querySelector('canvas'),'cover');order.showModal()};order.querySelector('.tu-order-close').onclick=()=>order.close();order.querySelector('.tu-order-postal').onclick=()=>download().catch(()=>{});order.querySelector('.tu-order-cover').onclick=()=>download('cover').catch(()=>{});
 template.onload=()=>{try{layout=measureTemplate(template);padWrap.style.aspectRatio='1';update()}catch(error){loadError=true;status.textContent=error.message}};
 template.onerror=()=>{loadError=true;status.textContent='No se pudo cargar la plantilla de la portada.'};template.src='assets/portada%20final.png';
 window.tuCasaPostal=Object.freeze({render,download,update,get layout(){return layout},colors:{blue:BLUE,lilac:LILAC}});
})();