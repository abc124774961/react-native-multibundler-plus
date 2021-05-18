const pathSep = require('path').sep;
var fs = require("fs");
var path = require("path");
const plaformModules = require('./multibundler/platformNameMap.json');
const getModuleId = require('./multibundler/getModulelId').getModuleId;
const useIndex = require('./multibundler/getModulelId').useIndex;

let entry;

function postProcessModulesFilter(module) {
  const projectRootPath = __dirname;
  if (plaformModules == null || plaformModules.length == 0) {
    console.log('请先打基础包');
    process.exit(1);
    return false;
  }
  const path = module['path']
  if (path.indexOf("__prelude__") >= 0 ||
    path.indexOf("/node_modules/react-native/Libraries/polyfills") >= 0 ||
    path.indexOf("source-map") >= 0 ||
    path.indexOf("/node_modules/metro/src/lib/polyfills/") >= 0) {
    return false;
  }
  if (module['path'].indexOf(pathSep + 'node_modules' + pathSep) > 0) {
    if ('js' + pathSep + 'script' + pathSep + 'virtual' == module['output'][0]['type']) {
      return true;
    }
    // console.log("projectRootPath", projectRootPath);
    // if (path.indexOf('mpos') > -1)
    //   console.log("path", path);
    const name = getModuleId(projectRootPath, path);
    if (useIndex && name < 100000) {//这个模块在基础包已打好，过滤
      return false;
    } else if (useIndex !== true && plaformModules.includes(name)) {//使用模块名作为模块id的逻辑
      return false;
    }
  }
  return true;
}

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
  console.log("eee.mkdirs", dirname)
  fs.exists(dirname, function (exists) {
    console.log(dirname, exists);
    if (exists) {
      callback();
    } else {
      // console.log(path.dirname(dirname));  
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

function createModuleIdFactory() {
  const projectRootPath = __dirname;
  return path => {
    // console.log("11111", (path.substring(0, path.lastIndexOf("/"))));
    // console.log("path", projectRootPath, path, entry, true);
    let name = getModuleId(projectRootPath, path, entry, true);
    return name;
  };
}

function getModulesRunBeforeMainModule(entryFilePath) {
  console.log('entryFilePath', entryFilePath);
  entry = entryFilePath;
  return [];
}

module.exports = {

  serializer: {
    createModuleIdFactory: createModuleIdFactory,
    processModuleFilter: postProcessModulesFilter,
    getModulesRunBeforeMainModule: getModulesRunBeforeMainModule
    /* serializer options */
  }
};
