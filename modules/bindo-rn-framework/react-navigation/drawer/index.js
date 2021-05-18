import { createDrawerNavigator as createDrawerNavigatorOld } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { } from 'react';
import { AppModule, AppModuleComponent } from "../..";
import { ModuleNavigationInit, NavigatorInit } from "../native";



// reactRedux.default

export * from "@react-navigation/stack";





function createDrawerNavigatorBox(Navigator) {
    const Drawer = createDrawerNavigatorOld(Navigator);
    // let isNavigatorInit = false;
    let navigatorArgs;
    let navigator;
    return {
        Navigator: NavigatorInit(Drawer),
        Navigator1: (...args) => {
            if (!navigatorArgs) {
                let props = { ...args[0] };
                let inChildren = props.children;
                let children = [];
                let childFun = (child) => {
                    let com;
                    if (child.props.component === AppModuleComponent) {
                        if (child.props.preLoad) {
                            AppModule.loadModule(child.props.name);
                        }
                        com = <Drawer.Screen key={child.props.name} {...child.props} component={undefined} getComponent={() => {
                            let navigation = useNavigation();
                            ModuleNavigationInit(navigation);
                            return child.props.component;
                        }} initialParams={{ moduleName: child.props.moduleName ?? child.props.name, ...child.props.initialParams }}  >{child.props.children}</Drawer.Screen>
                    } else {
                        com = <Drawer.Screen key={child.props.name}  {...child.props} component={undefined} getComponent={() => {
                            let navigation = useNavigation();
                            ModuleNavigationInit(navigation);
                            return child.props.component;
                        }} >{child.props.children}</Drawer.Screen>
                    }
                    return com;
                }
                if (inChildren?.forEach) {
                    inChildren?.forEach((child, i) => {
                        children[i] = childFun(child);
                    })
                    props.children = children;
                } else {
                    props.children = childFun(props.children);
                }
                navigatorArgs = props;
            }
            args[0] = navigatorArgs;
            navigator = Drawer.Navigator(...args);
            return navigator;
        },
        Screen: Drawer.Screen
    }
}

export { createDrawerNavigatorOld as createDrawerNavigator, createDrawerNavigatorBox }