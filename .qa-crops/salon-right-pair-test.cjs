const fs=require('fs'),path=require('path');
require('./salon-layer-order-test.cjs');
const html=fs.readFileSync(path.join(__dirname,'salon-layer-order-browser.html'),'utf8');
const assertion="a(z(10)>z(1),'back-facing boy above extended-arm boy');a(z(10)===20&&z(1)===13,'only the requested right pair swapped');";
if(!html.includes("a(z(2)>z(1),"))throw Error('Expected layer fixture missing');
fs.writeFileSync(path.join(__dirname,'salon-right-pair-browser.html'),html.replace("a(z(2)>z(1),",assertion+"a(z(2)>z(1),"));