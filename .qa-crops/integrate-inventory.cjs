const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),file=path.join(root,'dist/index.html');
let text=fs.readFileSync(file,'utf8');
text=text.replace('journeyLength=33.05','journeyLength=29.05');
if(!text.includes('src="continuous/inventory.js"'))text=text.replace('<script src="continuous/community.js"></script>','<script src="continuous/community.js"></script><script src="continuous/inventory.js"></script>');
fs.writeFileSync(file,text);