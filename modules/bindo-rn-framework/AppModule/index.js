import { AppRegistry, Platform, NativeModules, View, Text } from 'react-native'
import React, { Component, PureComponent, useCallback, useEffect, useReducer, useState } from 'react';
import { AppModuleComponetInit, AppModuleNavigationInit, getAllRoutes, ModulePlaceHolder } from '../navigation';
// import App from '../../mpos-shopping/App';


class AppModule {

    static ModulesInfo = [];
    static ModulesInfoLoading = [];
    static moduleRootNavigation;
    static currentShowModuleName = "";

    static registerAppModule(appKey, component, appConfig = {}) {
        let app = global.appConfig || {};
        if (app.entryModule == appKey && Platform.OS == "ios") {
            appKey = "platform-ui";
        }
        appConfig.component = component;
        AppModule.ModulesInfo[appKey] = appConfig;
        return AppRegistry.registerComponent(appKey, () => props => {
            let App = component(props);
            return AppModuleNavigationInit(App, { moduleName: appKey, ...props });
            // return <App moduleName={appKey} {...props}></App>
        });
    }


    static registerModule(appKey, component, appConfig = {}) {
        console.log("注册模块", ...arguments);
        let app = global.appConfig || {};
        if (app.entryModule == appKey && Platform.OS == "ios") {
            appKey = "platform-ui";
        }
        appConfig.component = component({ moduleName: appKey });
        AppModule.ModulesInfo[appKey] = appConfig;
        // alert(JSON.stringify(AppModule.ModulesInfo[appKey]));
    }

    static openModulePath(moduleName, path) {

    }

    static getModuleRootNavigation() {
        return AppModule.moduleRootNavigation;
    }


    static setModuleRootNavigation(navigation) {
        AppModule.moduleRootNavigation = navigation;
    }


    static hasLoadedModule(name) {
        if (AppModule.ModulesInfo[name]?.component || AppModule.ModulesInfoLoading[name]?.status == "loaded") {
            return true;
        }
        return false;
    }


    static getModule(moduleName) {
        return AppModule.ModulesInfo[moduleName];
    }

    static loadModule(name) {
        return new Promise((resolve, reject) => {
            let moduleInfo = AppModule.ModulesInfo[name];
            let modulesInfoLoading = AppModule.ModulesInfoLoading[name];
            if (modulesInfoLoading?.status == "loading") {
                console.log("module：", name, "正在加载。。。")
                modulesInfoLoading.resolve = (arg) => {
                    modulesInfoLoading.resolve = undefined;
                    resolve(arg);
                };
                modulesInfoLoading.reject = (arg) => {
                    modulesInfoLoading.reject = undefined;
                    reject(arg);
                };
            } else if (!moduleInfo) {
                if (modulesInfoLoading)
                    modulesInfoLoading.status = "loading";
                else {
                    modulesInfoLoading = { status: "loading" };
                    AppModule.ModulesInfoLoading[name] = modulesInfoLoading;
                }
                console.log("加载新的module", name)
                NativeModules.AppModuleUtil.loadAssetModule(name).then(e => {
                    console.log("加载成功===》", name, 2)
                    moduleInfo = AppModule.ModulesInfo[name];
                    debugger
                    if (moduleInfo) {
                        console.log("注册成功===》", name, 4)
                        modulesInfoLoading.status = "loaded"
                        AppModule.callback.forEach(_back => {
                            console.log("回调===》", _back)
                            _back();
                        })
                        debugger
                        // ModulePlaceHolder.appComponents[appComponent.props.moduleName];
                        resolve(moduleInfo);
                        modulesInfoLoading.resolve && modulesInfoLoading.resolve(moduleInfo);
                    }
                    else {
                        modulesInfoLoading.status = "load-error"
                        console.log("加载错误===》", name, 5)
                        reject();
                        modulesInfoLoading.reject && modulesInfoLoading.reject();
                    }
                }).catch(e => {
                    modulesInfoLoading.status = "load-error"
                    console.log("加载错误", name)
                    reject();
                    modulesInfoLoading.reject && modulesInfoLoading.reject();
                });
            } else {
                console.log("返回已存在的module", name)
                resolve(moduleInfo);
                modulesInfoLoading.reject && modulesInfoLoading.reject();
            }
        })
    }

    // static AppModuleComponent(moduleName) {
    //     return (<View style={{ backgroundColor: "#333", flex: 1 }}><Text>sss</Text> </View>);
    // }

    static AppModuleComponent(moduleName) {
        return () => {

            return <AppModuleComponent moduleName={moduleName}></AppModuleComponent>
        }
    }


    static callback = [];
    static moduleAddUpdateCallBack(callback) {
        callback && AppModule.callback.push(callback);
    }

    static switchModule(name) {
        let oldName = AppModule.currentShowModuleName;
        AppModule.currentShowModuleName = name;
        debugger
        // ModulePlaceHolder.appComponents[oldName].forceUpdate();
        let com = AppModule.ModulesInfo[AppModule.currentShowModuleName];
        // if (com) {
        //     com.forceUpdate();
        // }
    }

}


// export const AppModuleComponent = (props) => {
//     let resultComponent = (<View style={{ backgroundColor: "black", flex: 1 }}>
//     </View>);
//     // const [appComponent, setAppComponent] = useState(resultComponent);
//     // const [, forceUpdate] = useReducer(v => v + 1, 0)


//     // useEffect(() => {
//     //     let moduleName = "mpos-shopping"
//     //     let moduleInfo = AppModule.ModulesInfo[moduleName];
//     //     AppModule.loadModule(moduleName).then(e => {
//     //         console.log("加载....成功，动态模块", e);
//     //         let App = e.component;
//     //         let mComponent = <App moduleName={moduleName} ></App>
//     //         // this.isInit = true;
//     //         // that.appComponent = App;
//     //         // ResultComponent = AppM;
//     //         // forceUpdate();
//     //         setAppComponent(mComponent);
//     //     }).catch(e => {

//     //     })
//     //     return function cleanup() {
//     //         console.log("AppModuleComponent.modules", moduleName + "===》》释放");
//     //     }
//     // }, []);
//     // console.log("render.加载", appComponent);
//     // return appComponent;
//     debugger
//     return <LoadModuleComponent  {...props}></LoadModuleComponent>;
// }
// AppModuleComponent.ComponentType = "AppModuleComponent";





// function ModulePlaceHolder({appComponent}) {
//     console.log("appComponent", appComponent);
//     appComponents[appComponent.props.moduleName] = appComponent;
//     return (<>
//         {
//             Object.keys(AppModule.ModulesInfo).map(key => {
//                 let mi = AppModule.ModulesInfo[key];
//                 return mi.component ? <mi.component></mi.component> : null;
//             })
//         }
//     </>);
// }


export default AppModule;