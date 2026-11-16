const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),code=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');new vm.Script(code);
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const test=`<script>window.ready=new Promise(resolve=>setTimeout(()=>{try{
const a=(v,m)=>{if(!v)throw Error(m)};
document.body.classList.add('inhabited');current=target=2.35;
const frame=()=>casaRender(performance.now(),.05),box=document.querySelector('#fh-model-box'),leaves=document.querySelector('#fh-box-leaves');frame();
a(leaves.hidden,'no leaves before opening');box.click();frame();
const r=box.getBoundingClientRect(),originY=parseFloat(leaves.children[0].style.transform.split(',')[1]);a(Math.abs(originY-(r.top+r.height*.60))<1,'lower interior origin');
for(let i=0;i<21;i++)frame();
a(!leaves.hidden,'opening emits leaves');a(leaves.children.length===32,'doubled bounded particle pool');a(getComputedStyle(leaves).pointerEvents==='none','pointer transparent');a(leaves.getAttribute('aria-hidden')==='true','decorative');
const visible=[...leaves.children].filter(el=>Number(el.style.opacity)>0);a(visible.length>=20,'denser staggered floating leaves');
for(const leaf of visible)a(parseFloat(leaf.style.width)>=12.9&&parseFloat(leaf.style.width)<=21.6,'petals 28 percent smaller');
const before=visible[0].style.transform;frame();a(before!==visible[0].style.transform,'flight advances');
const model=window.__qaBoxDepth?.();
a(model,'3D model loaded for depth validation');
if(model){
 const group=model.leaves.group;a(group.children.length===32,'32 depth-tested sprites');
 a(group.children.every(s=>s.material.depthTest&&!s.material.depthWrite),'occlusion enabled');
 a(visible.every(el=>el.style.visibility==='hidden'),'no foreground DOM overlay');
 const origin=model.leaves.point.clone();model.rig.rotation.y=Math.PI;frame();
 a(model.leaves.point.distanceTo(origin)<.00001,'interior emitter remains inside rotated box');
 a(group.children.some(s=>s.visible),'3D leaves present after rotation');model.rig.rotation.y=0;
 const THREE=window.__THREE,renderer=new THREE.WebGLRenderer({alpha:true,preserveDrawingBuffer:true});renderer.setSize(32,32);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,10);camera.position.z=3;
 const petal=new THREE.Sprite(new THREE.SpriteMaterial({color:0xff0000,depthTest:true,depthWrite:false}));scene.add(petal);
 const lid=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.MeshBasicMaterial({color:0x0000ff}));lid.position.z=.5;scene.add(lid);
 renderer.render(scene,camera);const gl=renderer.getContext(),pixel=new Uint8Array(4);gl.readPixels(16,16,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);a(pixel[2]>200&&pixel[0]<20,'lid hides petal behind it');
 lid.rotation.y=Math.PI/2;renderer.render(scene,camera);gl.readPixels(16,16,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);a(pixel[0]>200,'turning lid reveals petal');
 petal.material.dispose();lid.geometry.dispose();lid.material.dispose();renderer.dispose();
}
for(let i=0;i<130;i++)frame();a(leaves.hidden,'finite flight, not endless emission');box.click();frame();box.click();frame();a(!leaves.hidden,'reopening emits again');
current=target=2.65;frame();a(leaves.hidden,'scroll departure clears leaves');current=target=2.35;frame();document.body.classList.remove('inhabited');frame();a(leaves.hidden,'outside clears leaves');
document.body.classList.add('inhabited');current=target=2.35;frame();box.click();for(let i=0;i<22;i++)frame();
const result='PASS: 32 smaller wisteria petals; denser staggered flight; 3D lid occlusion; finite lifetime; reopening; scroll/outside cleanup; pointer transparent; '+innerWidth+'x'+innerHeight;document.querySelector('#info').textContent=result;resolve(result);
}catch(e){resolve('FAIL: '+e.stack)}},1800));</script>`;
const instrumented=code.replace('function renderBoxLeaves(inside,p,dt){','window.__qaBoxDepth=()=>box3d;\nfunction renderBoxLeaves(inside,p,dt){');
fs.writeFileSync(path.join(__dirname,'box-leaves-browser.html'),html.replace('<head>','<head><base href="../dist/">').replace(/<script src="continuous\/first-house.js[^" ]*"><\/script>/,'<script>'+instrumented+'</script>').replace('</body>',test+'</body>'));