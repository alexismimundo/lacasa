const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),code=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
try{
 new vm.Script(code);
 const start=code.indexOf('const renderWidth=p<2.62?'),end=code.indexOf('if(wiggleT>0)',start);assert(start>0&&end>start);
 const results=[];
 for(const width of [1280,390]){
  let resizes=0;const c={p:2.1,innerWidth:width,rect:{},Math,box3d:{lastW:0,lastH:0,renderer:{setSize(){resizes++}},camera:{aspect:1,updateProjectionMatrix(){}}}};
  vm.createContext(c);const script=new vm.Script('{'+code.slice(start,end)+'}');
  const full=Math.min(width*.84,1120),corner=Math.min(280,width*.55);
  for(let i=0;i<120;i++){
   const t=i/120;c.p=2.1+.52*t;c.rect={width:full+(corner-full)*t,height:full*.67+(corner*114/180-full*.67)*t};script.runInContext(c);
   assert(Math.abs(c.box3d.camera.aspect-c.rect.width/c.rect.height)<.00002);
  }
  assert.equal(resizes,1,'one buffer allocation during 120 shrinking frames');
  c.p=2.62;c.rect={width:corner,height:corner*114/180};script.runInContext(c);assert.equal(resizes,2,'one allocation at completed docking');
  for(let i=0;i<60;i++)script.runInContext(c);assert.equal(resizes,2,'no repeated corner allocation');
  c.p=2.5;script.runInContext(c);assert.equal(resizes,3,'reverse scroll restores full-resolution buffer once');
  results.push({viewportWidth:width,shrinkingFrames:120,allocationsDuringShrink:1,allocationsAfterDock:2,aspectPreserved:true});
 }
 fs.writeFileSync(path.join(__dirname,'box-buffer-result.json'),JSON.stringify({status:'PASS',results},null,2));
}catch(e){fs.writeFileSync(path.join(__dirname,'box-buffer-result.json'),JSON.stringify({status:'FAIL',error:e.stack},null,2));process.exitCode=1}