const fs=require('fs'),path=require('path'),crypto=require('crypto');
const files=['barriletes-volando-transparente.png','barriletes-volando-imagen-completa-transparente.png'];
const hashes=Object.fromEntries(files.map(name=>[name,crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',name))).digest('hex')]));
fs.writeFileSync(path.join(__dirname,'depth-kites-original-hashes.json'),JSON.stringify(hashes));
const designs=[['azul',240,390,145,-.37,'azul'],['negro',650,80,70,.27,'negro'],['usuario',1100,480,470,.20,'rosa'],['azul-rombo',1740,180,125,-.21,'azul'],['azul-rombo',365,1160,290,-.18,'azul'],['negro',1620,1170,165,.38,'negro'],['azul',990,1600,145,-.17,'azul'],['negro',1800,1550,95,.22,'negro']];
let html=fs.readFileSync(path.join(__dirname,'full-flying-kites-export.html'),'utf8');
html=html.replace(/const designs=\[[^\n]+;/,'const designs='+JSON.stringify(designs)+';');
html=html.replace("layout:'scattered across full square, varied sizes and heights'","layout:'dominant pink kite 470px, secondary blue diamond 290px, remaining kites 70–165px'");
fs.writeFileSync(path.join(__dirname,'depth-flying-kites-export.html'),html);