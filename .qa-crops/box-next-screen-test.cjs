const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..');
const house=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
const floor=fs.readFileSync(path.join(root,'dist/continuous/floor-plan.js'),'utf8');
try{
 new vm.Script(house);new vm.Script(floor);
 assert(!house.includes('boxAnchor'));assert(!house.includes('mvDockedRect'));
 assert(!floor.includes('tableAt'));assert(!floor.includes('tableTrace'));
 const code=house.slice(house.indexOf('function positionModelBox(p,dt){'),house.indexOf('// Los clics conservan'));
 const ease=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
 for(const [width,height] of [[1280,900],[390,844]]){
  const c={boxCanvas:{style:{}},boxScrollHint:{style:{}},boxLidHint:{},document:{hidden:false},window:{},innerWidth:width,innerHeight:height,ease,boxDropHover:false,boxOpen:false,openAnim:0,mvRotatable:false,dragging:false,box3d:null,Math};
  vm.createContext(c);vm.runInContext(code,c);
  for(const phase of [1,1.4,1.6,1.85,2,2.1]){c.positionModelBox(phase,.016);assert.equal(c.boxCanvas.style.visibility,'hidden');assert.equal(c.boxCanvas.style.pointerEvents,'none')}
  c.positionModelBox(2.2,.016);assert.equal(c.boxCanvas.style.visibility,'visible');assert(Math.abs(Number(c.boxCanvas.style.opacity)-.5)<.001);
  const left=c.boxCanvas.style.left;
  c.positionModelBox(2.35,.016);assert.equal(c.boxCanvas.style.opacity,'1.000');assert.equal(c.boxCanvas.style.left,left);assert(c.mvRotatable);assert.equal(c.boxScrollHint.hidden,false);
  c.positionModelBox(2.7,.016);assert.equal(c.boxCanvas.style.width,Math.min(280,width*.55)+'px');assert(!c.mvRotatable);
  c.boxOpen=true;c.openAnim=1;c.dragging=true;c.positionModelBox(1.6,.016);assert(!c.boxOpen);assert(!c.dragging);assert.equal(c.openAnim,0);
 }
 fs.writeFileSync(path.join(__dirname,'box-next-screen-result.txt'),'PASS: production syntax; no cupboard anchor or table drawing; box hidden through kitchen transition; centered appearance; rotation and corner shortcut preserved; reverse-scroll cleanup; desktop 1280x900 and mobile 390x844.');
}catch(e){fs.writeFileSync(path.join(__dirname,'box-next-screen-result.txt'),'FAIL: '+e.stack);process.exitCode=1}