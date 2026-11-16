const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..'),source='C:\\Users\\alexismimundo\\Documents\\Fonts\\PULSO REVISTA\\IBM_Plex_Mono',dest=path.join(root,'dist/assets/fonts');
const variants=[['Thin',100],['ExtraLight',200],['Light',300],['Regular',400],['Medium',500],['SemiBold',600],['Bold',700]];
const faces=[];const copied=[];
for(const [name,weight] of variants)for(const italic of [false,true]){
 const file='IBMPlexMono-'+(italic?(name==='Regular'?'Italic':name+'Italic'):name)+'.ttf';
 assert(fs.existsSync(path.join(source,file)),'Missing '+file);
 fs.copyFileSync(path.join(source,file),path.join(dest,file));copied.push(file);
 faces.push(`@font-face{font-family:'IBM Plex Mono';src:url('assets/fonts/${file}') format('truetype');font-style:${italic?'italic':'normal'};font-weight:${weight};font-display:swap}`);
}
for(const file of fs.readdirSync(source))if(/^(OFL|LICENSE|LICENCE)/i.test(file)&&fs.statSync(path.join(source,file)).isFile()){fs.copyFileSync(path.join(source,file),path.join(dest,'IBM-Plex-Mono-'+file));copied.push(file)}
const files=['dist/continuous/casa.css','dist/continuous/casa2.css','dist/continuous/casa3.css','dist/continuous/casa3.js','dist/continuous/community.css','dist/continuous/first-house.css','dist/continuous/rooms.css','dist/index.html','source-materials/pre-continuous-v53.html'];
const changes=[];
for(const file of files){const p=path.join(root,file),before=fs.readFileSync(p,'utf8');let after=before.replace(/@font-face\{font-family:MonumentMono;[^}]+\}/g,'');
 if(file.endsWith('.html')){assert(before.includes('@font-face{font-family:MonumentMono;'),'font declaration expected');after=after.replace('<style>','<style>\n'+faces.join('\n')+'\n')}
 after=after.replace(/MonumentMono/g,file.endsWith('.js')?'"IBM Plex Mono"':"'IBM Plex Mono'");
 assert(!/MonumentMono|monument-mono/.test(after),'old reference '+file);
 fs.writeFileSync(p,after);changes.push(file);
}
fs.writeFileSync(path.join(__dirname,'font-replacement-result.json'),JSON.stringify({changes,copied,source,faces:faces.length},null,2));