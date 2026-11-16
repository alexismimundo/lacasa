const fs=require('fs'),path=require('path');
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'flying-kites-export.json'),'utf8'));
const value=report.result?.result?.value;
if(report.errors.length||!value?.png||value.bottomHalf!=='fully transparent')throw Error(JSON.stringify(report));
const output=path.join(__dirname,'../barriletes-volando-transparente.png');
const png=Buffer.from(value.png.split(',')[1],'base64');
if(png.readUInt32BE(16)!==2048||png.readUInt32BE(20)!==2048||png[25]!==6)throw Error('Expected square RGBA PNG');
fs.writeFileSync(output,png);
delete value.png;fs.writeFileSync(path.join(__dirname,'flying-kites-validation.json'),JSON.stringify({result:'PASS',output,bytes:png.length,...value},null,2));