const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const file=path.resolve(__dirname,'../dist/continuous/teaser-gate.js'),code=fs.readFileSync(file,'utf8');
function gate(query,entered,blocked=false){
 let mounted=false,hidden=false;
 const context={URLSearchParams,location:{search:query},sessionStorage:{getItem(){if(blocked)throw Error('storage unavailable');return entered}},document:{documentElement:{classList:{add(){hidden=true}}},createElement(){return {}},head:{append(){}},readyState:'loading',addEventListener(name){if(name==='DOMContentLoaded')mounted=true}}};
 vm.runInNewContext(code,context);return {mounted,hidden};
}
assert.deepStrictEqual(gate('',null),{mounted:true,hidden:true});
assert.deepStrictEqual(gate('','1'),{mounted:true,hidden:true});
assert.deepStrictEqual(gate('?vista=landing',null),{mounted:false,hidden:false});
for(const query of ['?dia=4','?rapido=1','?reiniciar=1','?prueba=1','?vista=teaser'])assert.deepStrictEqual(gate(query,'1'),{mounted:true,hidden:true});
assert.deepStrictEqual(gate('',null,true),{mounted:true,hidden:true});
const teaser=fs.readFileSync(path.resolve(__dirname,'../dist/assets/coming-soon/coming-soon.js'),'utf8');
new vm.Script(teaser);
const timing=teaser.slice(teaser.indexOf('function leerInicio()'),teaser.indexOf('/* ---------- Video base'));
let now=1000000000;const clock={Date:{now:()=>now},params:new URLSearchParams(),AJUSTES:{duracionDias:7,segundosModoRapido:7},SEMANA_MS:7*86400000,localStorage:{getItem(){throw Error('must not restore old date')}}};
assert.strictEqual(vm.runInNewContext(timing+';progreso()',clock),0);
now+=3*86400000;
assert.strictEqual(vm.runInNewContext(timing+';progreso()',{...clock}),0);
fs.writeFileSync(path.join(__dirname,'teaser-reload-result.json'),JSON.stringify({result:'PASS',checks:['reload shows teaser even after entering house','fresh clock starts at zero elapsed: seven days remaining','later reload also starts at seven days','old stored date never read','landing and explicit day previews preserved','script syntax valid']},null,2));