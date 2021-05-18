import { AppModule } from "../..";





export function ModuleNavigate(_navigate, name, params) {
    let routeName = name
    debugger
    if (params && params.screen) {
        AppModule.loadModule(routeName).then(mi => {
            _navigate(name, params);
        }).catch(e => {
        });
    } else {
        _navigate(name, params);
    }
}


export function getModuleNavigate(_navigate) {
    let resultFun = (name, params) => {
        ModuleNavigate(_navigate, name, params);
    }
    resultFun.type = ModuleNavigate;
    return resultFun;
}



export function ModuleReset(_reset, options) {
    let routeName = options.routes[options.index]?.name;
    if (routeName) {
        AppModule.loadModule(routeName).then(mi => {
            _reset(options);
        }).catch(e => {
        });
    } else {
        _reset(options);
    }
}

export function getModuleReset(_reset) {
    let resultFun = (options) => {
        ModuleReset(_reset, options);
    }
    resultFun.type = ModuleReset;
    return resultFun;
}



// navigation.reset = (options) => {
    //     let routeName = options.routes[options.index]?.name;
    //     if (routeName) {
    //         AppModule.loadModule(routeName).then(mi => {
    //             _reset(options);
    //         }).catch(e => {
    //         });
    //     } else {
    //         _reset(options);
    //     }
    // }
