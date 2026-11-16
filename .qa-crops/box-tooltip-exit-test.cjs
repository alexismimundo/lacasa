const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(path.resolve(__dirname,'../dist/continuous/first-house.js'),'utf8');new vm.Script(source);
const helper=source.match(/function boxHintsVisible\(p=current\)\{[^\n]+\}/)[0];
const ctx={current:1.85,target:1.85,document:{hidden:false},adentro:()=>true};vm.createContext(ctx);vm.runInContext(helper,ctx);
assert(vm.runInContext('boxHintsVisible()',ctx));ctx.target=1.86;assert(!vm.runInContext('boxHintsVisible()',ctx));ctx.current=1.9;assert(!vm.runInContext('boxHintsVisible()',ctx));ctx.current=ctx.target=3;assert(!vm.runInContext('boxHintsVisible()',ctx));ctx.current=ctx.target=1.85;assert(vm.runInContext('boxHintsVisible()',ctx));
assert(source.includes('const showBoxHints=boxHintsVisible(p)'));assert(source.includes('!boxHintsVisible())return'));
fs.writeFileSync(path.join(__dirname,'box-tooltip-exit-result.json'),JSON.stringify({status:'PASS',checks:'Visible in box scene; hidden as soon as target leaves, throughout minimization and widget; restored on return; hover guarded; syntax valid'},null,2));