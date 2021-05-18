import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SCREEN from '@react-navigation/core/src/Screen';
import React, { Component, PureComponent, useEffect, useReducer, useState } from 'react';
import { Button, View } from 'react-native';
import AppModule, { } from '../AppModule';


export const NavigationPage = (Com, app = null) => {
    return (...args) => {

        debugger
        console.log("app", app, args);
        let moduleName = app.props.navigation.moduleInfo.name;
        let params = args[0];
        // AppModule.ModulesInfo[mi.name].navigation = params.navigation;
        // params.getModule = app.getModule;

        Object.defineProperty(params.navigation, "modules", {
            enumerable: false,
            configurable: true,
            get: (name) => {
                let modulesProxy = new Proxy({}, {
                    get: (target, key) => {
                        debugger
                        let navigation = app.props.navigation.getModule(key);
                        console.log("nav", navigation);
                        return navigation;
                    }
                });

                return modulesProxy;
            }
        })

        params.navigation.goModule = (name, path) => {
            AppModule.loadModule(name).then(moduleInfo => {
                AppModule.switchModule(moduleInfo.name);
                if (moduleInfo["moduleType"] == "module") {
                    // this.component = (moduleInfo.component);

                }
            }).catch(e => {
                alert("error");
            });
        }

        Object.defineProperty(params.navigation, "module", {
            enumerable: false,
            configurable: true,
            get: () => {
                if (!app) return null;
                let navigation = app.navigation || app.props.navigation;
                // console.log("navigator", navigation);
                return navigation;
            }
        })

        // params.navigation.modules = (moduleName) => {
        //     debugger;
        // }
        // Object.defineProperties(params.navigation, {
        //     enumerable: false,
        //     configurable: true,
        //     "module": {
        //         get: () => {
        //             debugger
        //         }
        //     }
        // });
        // params.navigation.module
        // debugger

        useEffect(() => {
            debugger
            console.log("moduleName", moduleName, params);
            AppModule.ModulesInfo[moduleName].navigation = params.navigation;
            // 需要在 componentDidMount 执行的内容
            return function cleanup() {
                console.log(moduleName + ".page", "===》》释放");
            }
        }, [])
        return <Com  {...params}></Com>;
    };
}


const loadModuleInit = (moduleName) => {
    // if (this.isInit) return;
    let that = this;
    AppModule.loadModule(moduleName).then(e => {
        console.log("加载....ok", e);
        let App = e.component;
        // this.appComponent = <App {...this.props}></App>
        // this.isInit = true;
        // that.forceUpdate();
    }).catch(e => {

    })
}



function ModuleComponent(...args) {
    let AppModuleComponent = args[0];
    let props = args[1];
    debugger
    // args[0].route.moduleName = moduleName;
    return <AppModuleComponent {...props}></AppModuleComponent>
};


export class AppModuleComponent extends PureComponent {

    static ComponentType = "AppModuleComponent"
    static ModuleName = ""

    constructor(props) {
        super(props);
        this.state = {
            updateIndex: 0
        }
        console.log("AppModuleComponent.props", props);
        debugger
        this.moduleName = this.props.route.params.moduleName;
        // this.moduleName = AppModuleComponent.ModuleName;// this.props.route.name;
        // AppModuleComponetInit(this.moduleName, props.navigation);
    }

    componentWillMount() {
        this.loading = (<></>);
        this.appComponent = this.loading;
        this.init();
        // const forceUpdate = useCallback(() => updateState({ }), []);
    }

    init() {
        let that = this;
        AppModule.loadModule(this.moduleName).then(e => {
            let App = e.component;
            that.appComponent = <App {...that.props} moduleName={e.name}></App>;
            console.log("AppModuleComponent", that);
            that.forceUpdate();
        }).catch(e => {

        })
    }

    render() {
        return this.appComponent;
    }
}



class AppModulePageComponent extends AppModuleComponent {
    constructor(moduleName, ...args) {
        super(moduleName, ...args);
    }

    render() {
        return super.render();
    }

}



export function AppModuleComponetInit(moduleName, navigationModule) {
    let navigationParent = {
        getModule: (moduleName) => {
            return AppModule.ModulesInfo[moduleName];
        },
        getModuleNavigation: () => {
            return AppModule.ModulesInfo[moduleName].moduleNavigation;
        },
        getAllRoutes: () => {
            debugger
            // console.log(AppModule.getModuleRootNavigation().dangerouslyGetState());
            // console.log(AppModule.getModuleRootNavigation().getRootState());
            return getAllRoutes(AppModule.getModuleRootNavigation().getRootState());
        }
    }
    navigationModule.moduleInfo = AppModule.ModulesInfo[moduleName];
    navigationModule.initialRouteName = AppModule.ModulesInfo[moduleName]?.initialRouteName ?? undefined;
    AppModule.ModulesInfo[moduleName].moduleNavigation = navigationModule;
    navigationModule.getModule = (moduleName) => {
        let module = navigationParent.getModule(moduleName);
        let isLoadModuleSuccess = undefined;
        let navigation = new Proxy({ moduleName }, {
            get(target, key, value) {
                return (pathName) => {
                    if (typeof pathName != "string" && pathName != undefined) return;
                    let _fun = () => {
                        let moduleNav = navigationParent.getModuleNavigation();
                        if (moduleName == moduleNav.moduleInfo.name) {
                            moduleNav[key](pathName);
                        } else {
                            let routes = navigationParent.getAllRoutes();
                            let routeModule = routes[moduleName];
                            if (routeModule) {
                                debugger
                                let routePage = routes[moduleName + "-" + pathName];
                                if (module.navigation) {
                                    module.navigation[key](pathName);
                                } else {
                                    moduleNav[key](pathName);
                                }
                                if (key == "push") {
                                    setTimeout(() => {
                                        moduleNav.navigate(moduleName);
                                    }, 100)
                                }
                            } else {
                                if (pathName)
                                    AppModule.ModulesInfo[target.moduleName].initialRouteName = pathName;
                                navigationParent.getModuleNavigation()[key](moduleName);
                            }
                        }
                    }
                    let awaitLoad = () => {
                        if (isLoadModuleSuccess == undefined) {
                            setTimeout(() => {
                                awaitLoad();
                            }, 50)
                        } else {
                            if (isLoadModuleSuccess)
                                _fun();
                            else {
                                console.log("module加载失败！", moduleName);
                            }
                        }
                    }
                    awaitLoad();
                }
            }
        });

        if (!module) {
            AppModule.loadModule(moduleName).then(mi => {
                isLoadModuleSuccess = true;
                debugger
            }).catch(e => {
                isLoadModuleSuccess = false;
            });
        } else {
            isLoadModuleSuccess = true;
            return navigation;
        }
    }

}



export const NavigationModule = (moduleName, AppModuleComponent, ComponentType) => {
    // console.log("NavigationModule1", AppModuleComponent, moduleName);
    if (AppModuleComponent.ComponentType == "AppModuleComponent") {
        // {
        //     getModule: (moduleName) => {
        //         return AppModule.ModulesInfo[moduleName];
        //     },
        //     getModuleNavigation: () => {
        //         return AppModule.ModulesInfo[mi.name].moduleNavigation;
        //     },
        //     getRootNavigation: () => {
        //         return this.navigation;
        //     },
        //     getAllRoutes: () => { return this.getAllRoutes(this.currentRootState); }
        // }

        AppModule.loadModule(moduleName).then(mi => { }).catch(e => { });
        // AppModuleComponent.ModuleName = moduleName;

        // console.log("AppModuleComponent", AppModuleComponent.bind, Object.keys(AppModuleComponent), typeof AppModuleComponent);
        // function afaf(params) {
        //     return <AppModuleComponent></AppModuleComponent>;
        // }
        // return (...args) => {
        //     // let aa = React.createElement.bind({
        //     //     forceUpdate: () => {
        //     //         alert('ffff');
        //     //     }
        //     // }, AppModuleComponent, { moduleName, ...args[0] })();
        //     return aa;
        // }
        debugger
        return { moduleName: moduleName, AppModuleComponent };
        // return AppModuleComponent
    }
    return NavigationModuleComponent.bind(this, moduleName, AppModuleComponent);

    return (...args) => {
        debugger
        const [, forceUpdate] = useReducer(v => v + 1, 0)
        // let moduleName = mi.name;
        // let AppModuleComponent = mi.component;
        // debugger
        let params = args[0];
        let moduleInfo = AppModule.ModulesInfo[moduleName];


        useEffect(() => {
            debugger
            AppModuleComponetInit(moduleName, params.navigation);
            AppModule.ModulesInfo[moduleName].moduleNavigation = params.navigation;
            // 需要在 componentDidMount 执行的内容
            return function cleanup() {
                console.log("modules", moduleName + "===》》释放");
                AppModule.ModulesInfo[moduleName].navigation = undefined;
            }
        }, [])

        return (
            // ResultComponent ? ResultComponent :
            <AppModuleComponent key={moduleName} moduleName={moduleName} initialRouteName={moduleInfo?.initialRouteName} {...params}>
            </AppModuleComponent>
        );
    };
}


class NavigationModuleComponent extends Component {
    constructor(moduleName, AppModuleComponent, props) {
        super(props);
        debugger
        this.AppModuleComponent = AppModuleComponent;
        this.moduleName = moduleName;
        AppModuleComponetInit(moduleName, props.navigation);
    }

    componentDidMount() {
        // console.log("componentDidMount");
        // setTimeout(() => {
        //     this.forceUpdate();

        // }, 2000)
    }

    render() {
        const AppModuleComponent = this.AppModuleComponent;
        const moduleName = this.moduleName;
        const moduleInfo = AppModule.ModulesInfo[moduleName];
        return (
            <AppModuleComponent key={moduleName} moduleName={moduleName} initialRouteName={moduleInfo?.initialRouteName} {...this.props}>
            </AppModuleComponent>
        );
    }
}

export const AppModuleNavigationInit = (AppComponent, props) => {
    return (
        // <App></App>
        <ModulePlaceHolder moduleName={props.moduleName} appComponent={AppComponent}>
        </ModulePlaceHolder>
    )
}

export const bindModuleNavigation = (name, navigation) => {
    AppModule.ModulesInfo[name].navigation = navigation;
}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



// const Drawer = createDrawerNavigatorBox();

// export { Drawer };




export const getAllRoutes = (state, routes = [], index = 0, rootName = "") => {
    if (state?.routes) {
        state?.routes?.forEach(e => {
            e.index = index;
            let key = rootName + (rootName ? "-" : "") + e.name;
            routes[key] = e;
            if (e.state)
                getAllRoutes(e.state, routes, index + 1, key);
        })
        return routes;
    } else {
        return routes;
    }
}



export const getAllRouteNames = (state, routes = [], index = 0, rootName = "") => {
    if (state?.routes) {
        state?.routes?.forEach(e => {
            e.index = index;
            // let key = rootName + (rootName ? "-" : "") + e.name;
            // routes[key] = e;
            if (e.state) {
                if (e.state.routeNames)
                    e.state.routeNames.forEach(n => { routes[n] = 1 });
                getAllRouteNames(e.state, routes, index + 1);
            }
        })
        return routes;
    } else {
        return routes;
    }
}

export function getTopNavigationAllRoutes(navigation, routes = []) {
    let parent = navigation.dangerouslyGetParent();
    let state = navigation.dangerouslyGetState();
    if (parent) {
        if (state.routeNames)
            state.routeNames.forEach(n => { routes[n] = 1 });
        return getTopNavigationAllRoutes(parent, routes);
    } else {
        // let state = navigation.dangerouslyGetState();
        return getAllRouteNames(state, routes)
    }
}




export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export class ModulePlaceHolder extends Component {

    static appComponents = [];

    screens = [];

    constructor(props) {
        super(props);
        let moduleName = this.props.moduleName;
        // ModulePlaceHolder.appComponents[moduleName] = this.props.children;
        AppModule.currentShowModuleName = moduleName;
        let mi = AppModule.ModulesInfo[moduleName];
        mi.component = this.props.appComponent;//this.props.appComponent;//this.props.children;// <View style={{ backgroundColor: "red", flex: 1 }}></View>;// () => () => this.props.children;
        this.state = {
            navigation: () => {

            }
        }
        this.currentRootState = {};
        AppModule.moduleAddUpdateCallBack(() => {
            this.forceUpdate();
        })
        console.log("入口模块：", this.props.moduleName);
    }



    render() {
        return (
            <>
                <NavigationContainer ref={(ref) => {
                    this.navigation = ref;
                    AppModule.setModuleRootNavigation(this.navigation);
                }}
                    onReady={(...args) => {
                        this.currentRootState = this.navigation.getRootState();
                        // console.log("state", this.currentRootState, getAllRoutes(this.currentRootState));

                    }} onStateChange={(...args) => {
                        this.currentRootState = args[0];
                        // console.log("state", this.currentRootState);
                    }}>
                    <Stack.Navigator ref={(ref) => {
                    }} initialRouteName={this.props.moduleName} headerMode={"none"} mode={"card"} detachInactiveScreens={false}
                        screenOptions={{
                            //这三个点是，解构赋值Es6的新写法
                            ...TransitionPresets.SlideFromRightIOS
                        }}>
                        <Stack.Screen name={this.props.moduleName} component={this.props.appComponent} />
                        {/* {
                            Object.keys(AppModule.ModulesInfo).filter(e => e != "1mpos-system-entry").map(name => {
                                console.log("模块渲染", name)
                                let mi = AppModule.ModulesInfo[name];
                                // if (name = "mpos-shopping") return <View></View>;
                                return <Stack.Screen key="modules" name={mi.name} component={mi.component} />;
                                // return <Stack.Screen key="modules" name={mi.name} component={NavigationModule(mi.name, mi.component)} />;
                            })
                        } */}
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }

    // <Stack.Navigator ref={(ref) => {
    // }} initialRouteName={this.props.moduleName} headerMode={"none"} mode={"card"} detachInactiveScreens={false}>
    //     {/* <Stack.Screen name={this.props.moduleName} component={DeskTopApp} /> */}
    //     {
    //         Object.keys(AppModule.ModulesInfo).filter(e => e != "1mpos-system-entry").map(name => {
    //             console.log("模块渲染", name)
    //             let mi = AppModule.ModulesInfo[name];
    //             debugger
    //             // if (name = "mpos-shopping") return <View></View>;
    //             return <Stack.Screen key="modules" name={mi.name} component={NavigationModule(mi.name, mi.component)} />;
    //         })
    //     }
    // </Stack.Navigator>
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}