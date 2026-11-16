const fs=require('fs'),path=require('path'),vm=require('vm');
const source=fs.readFileSync(path.join(__dirname,'../dist/continuous/first-house.js'),'utf8');
new vm.Script(source);
const helper=source.match(/function nextLightMotion\(seconds,still\)\{[\s\S]*?\n  \}/);
if(!helper)throw Error('Missing flashlight motion helper');
const motion=vm.runInNewContext('('+helper[0]+')');
let previous=null,minimum=1,maximum=0;
for(let i=0;i<6000;i++){
 const state=motion(i/60,false);minimum=Math.min(minimum,state.strength);maximum=Math.max(maximum,state.strength);
 if(state.strength<.209||state.strength>.991||state.x!==0||state.y!==0||state.scale!==1)throw Error('Light must strongly flutter without moving');
 if(previous&&Math.abs(state.strength-previous.strength)>.055)throw Error('Abrupt light change');
 previous=state;
 if(JSON.stringify(motion(i/60,true))!==JSON.stringify({strength:1,scale:1,x:0,y:0}))throw Error('Reduced motion must remain stable');
}
if(maximum-minimum<.7)throw Error('Missing strong continuous intensity variation');
for(let start=0;start<30;start++){const samples=Array.from({length:60},(_,i)=>motion(start+i/60,false).strength);if(Math.max(...samples)-Math.min(...samples)<.03)throw Error('Flutter stopped');}
require('./textured-flashlight-test.cjs');
const file=path.join(__dirname,'textured-flashlight-browser.html'),html=fs.readFileSync(file,'utf8');
const marker="assert(light.dataset.mask==='linterna','PNG mask loaded');";
const checks=`const snapshot=()=>light.getContext('2d').getImageData(0,0,light.width,light.height).data;const before=snapshot().slice();performance.now=()=>500;step(8.1);const dim=snapshot().slice();let darkened=0;for(let i=3;i<before.length;i+=4)if(dim[i]>before[i]+3)darkened++;assert(darkened>100,'continuous gentle intensity change without movement');performance.now=()=>0;step(8.1);const recovered=snapshot();assert(before.every((v,i)=>v===recovered[i]),'same mask geometry and intensity restored');const originalMedia=window.matchMedia;window.matchMedia=q=>q.replaceAll(' ','')==='(prefers-reduced-motion:reduce)'?{matches:true}:originalMedia(q);step(8.1);const stable=snapshot().slice();performance.now=()=>1700;step(8.1);const after=snapshot();assert(stable.every((v,i)=>v===after[i]),'reduced motion disables blinking');window.matchMedia=originalMedia;performance.now=()=>0;step(8.1);`;
// Keep pixel snapshots outside the comparison loops to avoid repeated readbacks.
const optimized=checks.replace("assert(before.some((v,i)=>v!==snapshot()[i])","const animated=snapshot();assert(before.some((v,i)=>v!==animated[i])");
if(!html.includes(marker))throw Error('Missing browser test marker');
fs.writeFileSync(path.join(__dirname,'flashlight-flutter-browser.html'),html.replace('try{const wait=', 'try{performance.now=()=>0;const wait=').replace(marker,marker+optimized).replace('PNG luminance mask, grain, pointer tracking and reverse scroll','PNG mask continuous gentle flicker without motion, reduced motion, pointer tracking and reverse scroll'));
fs.writeFileSync(path.join(__dirname,'flashlight-flutter-unit.json'),JSON.stringify({result:'PASS',minimum,maximum,reducedMotion:'stable',samples:6000}));