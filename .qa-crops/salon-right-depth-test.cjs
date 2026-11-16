const fs=require('fs'),path=require('path');
require('./salon-right-pair-test.cjs');
const html=fs.readFileSync(path.join(__dirname,'salon-right-pair-browser.html'),'utf8');
const marker="a(z(10)>z(1),";
if(!html.includes(marker))throw Error('Expected right pair checks missing');
const checks="a(z(5)>z(10),'cap boy above middle boy');a(z(12)>z(5),'outer foreground above cap boy');";
fs.writeFileSync(path.join(__dirname,'salon-right-depth-browser.html'),html.replace(marker,checks+marker));