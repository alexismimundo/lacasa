const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),root=path.resolve(__dirname,'..');
try{
const js=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');new vm.Script(js);
assert(js.includes("paper.src='assets/tooltips/tooltips-blanco.png'"));assert(js.includes("document.fonts.load('150px SisterSpray','RECUERDOS')"));assert(js.includes('bounds.min.z-.0015'));assert(js.includes('label.rotation.y=Math.PI;'));
for(const file of ['dist/assets/tooltips/tooltips-blanco.png','dist/assets/fonts/sister_spray/Sister Spray.ttf'])assert(fs.existsSync(path.join(root,file)));
const code=js.slice(js.indexOf('if(p<=2.4)box3d.homeRotation=null;'),js.indexOf('const w=Math.max(1,Math.round(rect.width))'));
const ease=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
for(const angle of [-12,-Math.PI,-1,.4,Math.PI,14]){const c={box3d:{rig:{rotation:{y:angle}},homeRotation:null},p:2.4,ease,Math};vm.createContext(c);vm.runInContext(code,c);assert.equal(c.box3d.rig.rotation.y,angle);let prev=Infinity;for(let i=1;i<=22;i++){c.p=2.4+i*.01;vm.runInContext(code,c);const magnitude=Math.abs(c.box3d.rig.rotation.y);assert(magnitude<=prev+1e-9);prev=magnitude}c.p=9;vm.runInContext(code,c);assert.equal(c.box3d.rig.rotation.y,0)}
fs.writeFileSync(path.join(__dirname,'box-back-label-result.txt'),'PASS: JS syntax; rear-facing label; existing tooltip paper and graffiti font assets; six arbitrary rotations converge monotonically to identical frontal widget pose.');
}catch(e){fs.writeFileSync(path.join(__dirname,'box-back-label-result.txt'),'FAIL '+e.stack);process.exitCode=1}