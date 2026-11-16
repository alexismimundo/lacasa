const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),root=path.resolve(__dirname,'..');
try{
const js=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');new vm.Script(js);
assert(js.includes("paper.src='assets/tooltips/recuerdos-papel.png'"));assert(js.includes("document.fonts.load('150px SisterSpray','RECUERDOS')"));assert(js.includes('tapa.add(label)'));assert(js.includes('bounds.max.y+.0015'));assert(js.includes('label.rotation.x=-Math.PI/2'));assert(!js.includes('base.add(label)'));
const png=fs.readFileSync(path.join(root,'dist/assets/tooltips/recuerdos-papel.png'));assert.equal(png.readUInt32BE(16),530);assert.equal(png.readUInt32BE(20),140);
fs.writeFileSync(path.join(__dirname,'box-lid-label-result.txt'),'PASS: JS syntax; single 530x140 PNG crop; graffiti font retained; label attached to outer lid and inherits opening/rotation.');
}catch(e){fs.writeFileSync(path.join(__dirname,'box-lid-label-result.txt'),'FAIL '+e.stack);process.exitCode=1}