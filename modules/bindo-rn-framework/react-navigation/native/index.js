



// reactRedux.default

import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { AppModule } from "../..";
import { AppModuleComponent, getTopNavigationAllRoutes } from "../../navigation";
import { getModuleNavigate, getModuleReset, ModuleNavigate, ModuleReset } from "./ModuleNavigationInit";

export * from "@react-navigation/native";







export function ModuleNavigationInit(navigation, moduleNavigationScreenInit) {
    let _navigate = navigation.navigate;
    let _reset = navigation.reset;
    if (navigation.navigate.type != ModuleNavigate) {
        navigation.navigate = getModuleNavigate((name, params) => {
            if (params && params.screen) {
                debugger
                moduleNavigationScreenInit.bind(navigation)(name, params).then(e => {
                    _navigate(name, params);
                });
            } else {
                _navigate(name, params);
            }
        });
    }

    if (navigation.reset.type != ModuleReset) {
        navigation.reset = getModuleReset((options) => {
            let routeName = options.routes[options.index]?.name;
            if (routeName) {
                moduleNavigationScreenInit.bind(navigation)(routeName).then(e => {
                    _reset(options);
                });
            } else {
                _reset(options);
            }
        });
    }
}


export function NavigatorInit(NavigatorType) {

    let navigatorArgs;
    let moduleScreen = [];
    let forceScreenUpdateResolve;
    let forceScreenUpdateReject;
    return (...args) => {
        const [forceScreenCount, forceScreenUpdate] = useState(0);
        let use = useRoute();
        // console.log('aaaa', use, navigatorArgs)
        if (!navigatorArgs) {
            let props = { ...args[0] };
            let inChildren = Array.isArray(props.children) ? props.children : undefined;
            let children = [];

            let childFun = (child) => {
                let com;
                if (child.props.component === AppModuleComponent) {
                    let moduleName = child.props.name;
                    let component;
                    if (AppModule.hasLoadedModule(moduleName)) {
                        let moduleInfo = AppModule.getModule(moduleName);
                        component = moduleInfo?.component ?? child.props.component;
                    } else {
                        if (child.props.preLoad) {
                            AppModule.loadModule(child.props.name);
                        }
                        component = child.props.component;
                    }
                    com = <NavigatorType.Screen key={child.props.name} {...child.props} component={undefined} getComponent={() => {
                        let navigation = useNavigation();
                        ModuleNavigationInit(navigation, moduleNavigationScreenInit);
                        return component;
                    }} initialParams={{ moduleName: child.props.moduleName ?? child.props.name, ...child.props.initialParams }}  >{child.props.children}</NavigatorType.Screen>
                } else {
                    com = <NavigatorType.Screen key={child.props.name}  {...child.props} component={undefined} getComponent={() => {
                        let navigation = useNavigation();
                        ModuleNavigationInit(navigation, moduleNavigationScreenInit);
                        return child.props.component;
                    }} >{child.props.children}</NavigatorType.Screen>
                }
                return com;
            }

            function moduleNavigationScreenInit(moduleName) {
                return new Promise((resolve, reject) => {
                    let navigation = this;
                    let routes = getTopNavigationAllRoutes(navigation);
                    console.log("是否已加载此模块：", moduleName, routes[moduleName])
                    if (routes[moduleName] == undefined) {
                        moduleScreen[moduleName] = childFun(<NavigatorType.Screen name={moduleName} component={AppModuleComponent}></NavigatorType.Screen>)
                        navigatorArgs.children.push(moduleScreen[moduleName]);
                        forceScreenUpdateResolve = resolve;
                        forceScreenUpdateReject = reject;
                        forceScreenUpdate(forceScreenCount + 1);
                    } else {
                        resolve();
                    }
                });
            }
            if (inChildren) {
                inChildren?.forEach((child, i) => {
                    children[i] = childFun(child);
                })
            } else {
                children = childFun(props.children);
            }
            props.children = children;
            navigatorArgs = props;
        }

        useEffect(() => {
            if (forceScreenCount != 0) {
                console.log(`forceScreenUpdateResolve`);
                forceScreenUpdateResolve && forceScreenUpdateResolve();
                forceScreenUpdateResolve = undefined;
            }
            return () => { }
        }, [forceScreenCount]);

        args[0] = navigatorArgs;
        return NavigatorType.Navigator(...args);

    }
}