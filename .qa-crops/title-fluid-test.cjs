const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'dist/continuous/first-house.js'),'utf8');
new vm.Script(source);
const fn=source.match(/function renderNextHouse\(inside,p\)\{[\s\S]*?\n\}/)[0];
const heading={style:{}},nextHouse={hidden:true,style:{},classList:{toggle(){}},querySelector(){return heading}};
const context={nextHouse,nextDark:{style:{setProperty(){}}},nextLight:{x:.5,y:.5},clamp:v=>Math.max(0,Math.min(1,v)),ease:(a,b,v)=>Math.max(0,Math.min(1,(v-a)/(b-a)))};
vm.createContext(context);vm.runInContext(fn,context);
const samples=[];for(let i=0;i<=74;i++){const p=7.28+i*.01;context.renderNextHouse(true,p);const y=Number(heading.style.transform.match(/\+ ([-\d.]+)vh/)[1]);samples.push({p,y,opacity:Number(heading.style.opacity)});if(i)assert(y<samples[i-1].y,'title must keep rising at '+p);assert(y>=-5.001&&y<=5.001,'central travel');}
assert(Math.abs(samples[37].opacity-1)<1e-10);assert(samples[36].opacity<samples[37].opacity&&samples[38].opacity<samples[37].opacity,'no opacity plateau');
context.renderNextHouse(true,8.02);assert.strictEqual(heading.style.visibility,'hidden');
fs.writeFileSync(path.join(__dirname,'title-fluid-result.json'),JSON.stringify({result:'PASS: 75 samples; continuous rise, no center pause, opacity fades in/out without a plateau; syntax valid',samples},null,2));