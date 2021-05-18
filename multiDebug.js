const pathSep = require('path').sep;
const fs = require("fs");
const buzEntrys = require("./multibundler/DegbugBuzEntrys.json");

let buzDebugCode = 'import {AppRegistry} from \'react-native\';\n';
buzDebugCode += 'import { AppModule } from \'@bindo/rn-framework\';\n';


buzEntrys.forEach((entryItem) => {
  let buzItemStr = fs.readFileSync(entryItem, 'utf-8');
  let buzAfter = buzItemStr.replace(/(AppRegistry,|AppRegistry ,|AppRegistry)([^\.])/g, ' $2');
  buzAfter = buzAfter.replace(/\{.*AppModule[^}]*/gi, "{ ");
  buzAfter = buzAfter.replace(/from \'.\//g, "from './" + entryItem.substring(0, entryItem.lastIndexOf("/")) + "/");
  buzDebugCode += buzAfter;
});

fs.writeFileSync('./MultiDenugEntry.js', buzDebugCode);//拼接需要测试的buz模块


return;




const { exec, spawn } = require('child_process');
let cmdStr = 'node ./node_modules/react-native/local-cli/cli.js start';//执行start



// let free = spawn(cmdStr, { cwd: __dirname });
// // 捕获标准输出并将其打印到控制台
// free.stdout.on('data', function (data) {
//   console.log('standard output:\n' + data);
// });

// // 捕获标准错误输出并将其打印到控制台
// free.stderr.on('data', function (data) {
//   console.log('standard error output:\n' + data);
// });

let packageProcess = exec(cmdStr, { cwd: __dirname }, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  console.log(`${stderr}`);
});
packageProcess.stdout.on('data', (data) => {
  console.log(`${data}`);
});
