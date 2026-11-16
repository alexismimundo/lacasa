const fs=require('fs'),path=require('path');
const file=path.resolve(__dirname,'../dist/index.html');let text=fs.readFileSync(file,'utf8');
text=text.replace('window.casaScrollFrame?.(dt,time);','').replace('<script src="continuous/scroll-flow.js"></script>','');
fs.writeFileSync(file,text);