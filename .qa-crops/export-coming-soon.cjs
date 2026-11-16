const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'CAPTURAS-COMING-SOON-4K');fs.mkdirSync(output,{recursive:true});
const prepare=`(async()=>{
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const style=document.createElement('style');style.textContent='.interfaz,#entrar{display:none!important}';document.head.append(style);
 const bg=new Image();bg.src='media/fondo-negro.webp';await bg.decode();
 const day=Number(new URLSearchParams(location.search).get('dia'));
 // Freeze only the narrative clock, not the grain/background animation.
 progreso=()=>day/7;
 const ready=async video=>{if(video.readyState<1)await new Promise((resolve,reject)=>{video.addEventListener('loadedmetadata',resolve,{once:true});video.addEventListener('error',()=>reject(Error(video.src)),{once:true})})};
 await ready(base);actualizarBase=()=>{};base.pause();base.currentTime=day/7*(50-1/24);actualizarLoops(day);
 const stage=etapas.find(e=>day>=e.desde&&day<e.hasta);if(!stage)throw Error('No active stage');
 await ready(stage.bucle);stage.entrada.pause();stage.entrada.classList.remove('visible');stage.enBucle=true;
 stage.bucle.pause();stage.bucle.currentTime=Number.isFinite(stage.bucle.duration)?Math.min(2.5,stage.bucle.duration*.45):2.5;stage.bucle.classList.add('visible');
 const deadline=performance.now()+18000;
 while(base.readyState<2||stage.bucle.readyState<2||base.seeking||stage.bucle.seeking){if(performance.now()>deadline)throw Error('Media decode timeout: '+base.readyState+'/'+stage.bucle.readyState);await wait(100)}
 await wait(1400);await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
 const grain=document.querySelector('#living-grain'),scene=document.querySelector('.escena');
 if(getComputedStyle(document.querySelector('.interfaz')).display!=='none')throw Error('Counter visible');
 if(base.readyState<2||stage.bucle.readyState<2||base.currentTime<day*6)throw Error('Undecoded/wrong media frame '+base.currentTime);
 return JSON.stringify({status:'PASS',day,viewport:[innerWidth,innerHeight],baseTime:base.currentTime,stage:stage.bucle.getAttribute('src'),stageTime:stage.bucle.currentTime,counterHidden:true,background:getComputedStyle(document.querySelector('.fondo')).backgroundImage,grain:[grain.width,grain.height],edgeFilter:getComputedStyle(scene).filter,overlay:getComputedStyle(document.body,':after').opacity});
})()`;
let runner=fs.readFileSync(path.join(__dirname,'chrome-check.cjs'),'utf8');
runner=runner.replace("url:'http://127.0.0.1:21871/.qa-crops/'","url:'http://127.0.0.1:21873/.qa-crops/'").replaceAll("'.mp4':'video/mp4'","'.webm':'video/webm','.mp4':'video/mp4'");
runner=runner.replace("expression:'window.ready'",'expression:'+JSON.stringify(prepare));
runner=runner.replace('setTimeout(r,1200)','setTimeout(r,2200)');
const script=path.join(__dirname,'coming-soon-capture-chrome.cjs');fs.writeFileSync(script,runner);
const stages=[['01-casa-humo',.7],['02-casa-fuego',2.8],['03-casa-incendio',4.5],['04-casa-derrumbe',5.8],['05-casa-ruinas',6.95]];
for(const [name,day] of stages){
 const result=spawnSync(process.execPath,[script,'../dist/assets/coming-soon/index.html?reiniciar&dia='+day,'../CAPTURAS-COMING-SOON-4K/'+name,'3840','2160'],{encoding:'utf8',timeout:45000});
 fs.appendFileSync(path.join(output,'export.log'),name+': '+result.status+' '+(result.stderr||'')+'\n');
 const json=JSON.parse(fs.readFileSync(path.join(output,name+'.json'),'utf8'));const value=json.result?.result?.value;
 if(result.status!==0||typeof value!=='string'||!value.includes('PASS')||json.errors.length)throw Error(name+': '+JSON.stringify(json));
 const png=fs.readFileSync(path.join(output,name+'.png'));if(png.readUInt32BE(16)!==3840||png.readUInt32BE(20)!==2160)throw Error('Wrong PNG dimensions');
}
fs.writeFileSync(path.join(output,'LEEME.txt'),'La Casa — Coming soon\n5 capturas PNG sin perdida, 3840 x 2160.\nSe conserva el fondo negro original, la textura SVG, el grano vivo y el filtro de bordes de la web.\nSolo se ocultan la interfaz/contador y el enlace Entrar durante la captura. La web no fue modificada.\nLos nombres ordenan cinco momentos de la secuencia (dias 0.7, 2.8, 4.5, 5.8 y 6.95).\n');