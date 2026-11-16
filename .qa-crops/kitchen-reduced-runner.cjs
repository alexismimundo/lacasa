const fs=require('fs'),path=require('path'),Module=require('module');
const filename=path.join(__dirname,'chrome-check.cjs');
const source=fs.readFileSync(filename,'utf8').replace("await send('Emulation.setDeviceMetricsOverride',viewport);","await send('Emulation.setDeviceMetricsOverride',viewport);await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});");
const runner=new Module(filename,module);runner.filename=filename;runner.paths=module.paths;runner._compile(source,filename);