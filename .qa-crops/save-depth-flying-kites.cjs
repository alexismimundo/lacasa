const fs=require('fs'),path=require('path'),crypto=require('crypto');
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'depth-flying-kites-export.json'),'utf8')),value=report.result?.result?.value;
if(report.errors.length||!value?.png||!value.transparentBackground||value.kites!==8)throw Error('Invalid export: '+JSON.stringify(report.result));
const hashes=JSON.parse(fs.readFileSync(path.join(__dirname,'depth-kites-original-hashes.json'),'utf8'));
for(const [name,hash] of Object.entries(hashes))if(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',name))).digest('hex')!==hash)throw Error('Previous file changed: '+name);
const output=path.join(__dirname,'../barriletes-volando-rosa-protagonista-transparente.png'),png=Buffer.from(value.png.split(',')[1],'base64');
if(png.readUInt32BE(16)!==2048||png.readUInt32BE(20)!==2048||png[25]!==6)throw Error('Expected square RGBA PNG');
fs.writeFileSync(output,png);delete value.png;
fs.writeFileSync(path.join(__dirname,'depth-flying-kites-validation.json'),JSON.stringify({result:'PASS',output,previousFilesUnchanged:true,bytes:png.length,...value},null,2));