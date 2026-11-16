const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'bricks-export-result.json'),'utf8')),data=report.result.result.value;
if(!data?.png)throw Error(JSON.stringify(report.result));
const out=path.join(root,'ladrillos-cayendo-abajo-4000x5000-transparente.png');fs.writeFileSync(out,Buffer.from(data.png.split(',')[1],'base64'));
delete data.png;fs.writeFileSync(path.join(__dirname,'bricks-export-validation.json'),JSON.stringify({...data,file:out,bytes:fs.statSync(out).size,errors:report.errors},null,2));