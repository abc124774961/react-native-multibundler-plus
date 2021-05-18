import { createStackNavigator as createStackNavigatorOld } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { ModuleNavigationInit, NavigatorInit } from "../native";
import { AppModuleComponent, getTopNavigationAllRoutes } from "../../navigation";
import { AppModule } from "../..";




// reactRedux.default


function createStackNavigatorBox(Navigator) {
    const Stack = createStackNavigatorOld(Navigator);
    // let isNavigatorInit = false;
    let navigatorArgs;
    let moduleScreen = [];
    let navigator;
    let forceScreenUpdateResolve;
    let forceScreenUpdateReject;
    return {
        Navigator: NavigatorInit(Stack),
        Navigator1: (...args) => {
            const [forceScreenCount, forceScreenUpdate] = useState(0);
            let curNavigation = useRoute();
            // console.log('Navigator', 'render', curNavigation);
            if (!navigatorArgs) {
                let props = { ...args[0] };
                let inChildren = props.children;
                let children = [];

                let childFun = (child) => {
                    let com;
                    if (child.props.component === AppModuleComponent) {
                        let moduleName = child.props.name;
                        let component;
                        debugger
                        if (AppModule.hasLoadedModule(moduleName)) {
                            let moduleInfo = AppModule.getModule(moduleName);
                            component = moduleInfo?.component ?? child.props.component;
                        } else {
                            if (child.props.preLoad) {
                                AppModule.loadModule(child.props.name);
                            }
                            component = child.props.component;
                        }
                        com = <Stack.Screen key={child.props.name} {...child.props} component={undefined} getComponent={() => {
                            let navigation = useNavigation();
                            ModuleNavigationInit(navigation, moduleNavigationScreenInit);
                            return component;
                        }} initialParams={{ moduleName: child.props.moduleName ?? child.props.name, ...child.props.initialParams }}  >{child.props.children}</Stack.Screen>
                    } else {
                        com = <Stack.Screen key={child.props.name}  {...child.props} component={undefined} getComponent={() => {
                            let navigation = useNavigation();
                            ModuleNavigationInit(navigation, moduleNavigationScreenInit);
                            return child.props.component;
                        }} >{child.props.children}</Stack.Screen>
                    }
                    return com;
                }

                function moduleNavigationScreenInit(moduleName) {
                    return new Promise((resolve, reject) => {
                        let navigation = this;
                        let routes = getTopNavigationAllRoutes(navigation);
                        if (routes[moduleName] == undefined) {
                            moduleScreen[moduleName] = childFun(<Stack.Screen name={moduleName} component={AppModuleComponent}></Stack.Screen>)
                            navigatorArgs.children.push(moduleScreen[moduleName]);
                            forceScreenUpdateResolve = resolve;
                            forceScreenUpdateReject = reject;
                            forceScreenUpdate(forceScreenCount + 1);
                        } else {
                            resolve();
                        }
                        debugger
                    });
                }
                inChildren?.forEach((child, i) => {
                    children[i] = childFun(child);
                })
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
            navigator = Stack.Navigator(...args);
            return navigator;

        },
        Screen: Stack.Screen
    }
}


export * from "@react-navigation/stack";
export { createStackNavigatorBox as createStackNavigator }
