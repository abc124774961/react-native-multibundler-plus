/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from 'react';
import { Image, StyleSheet, Text, View, Button, NativeModules, StatusBar } from 'react-native';
// import { connect } from './modules/@bindo/rn-framework/react-redux';
import { GlobalStore, getActionCreators, NavigationPage, ModulePlaceHolder, bindModuleNavigation, Stack, AppModuleComponent, NavigationModule, AppModule } from '@bindo/rn-framework';
import { bindActionCreators } from '@bindo/rn-framework/redux';
import { Provider, connect } from '@bindo/rn-framework/react-redux';
import { createDrawerNavigator, createDrawerNavigatorBox } from '@bindo/rn-framework/react-navigation/drawer';
import { TransitionPresets } from '@bindo/rn-framework/react-navigation/stack';
import { NavigationContainer } from '@bindo/rn-framework/react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import AppPage1 from './App-Page1';
import AppPage2 from './App-Page2';
// import desktopApp from '../mpos-desktop/App';
// import shoppingApp from '../mpos-shopping/App';


const instructions = '业务1设置了一个全局变量供业务2读取fffff';

const Drawer = createDrawerNavigatorBox();

// {framewrok.aa}
export default class App extends Component {

    componentWillMount() {

        TransitionPresets.SlideFromRightIOS.transitionSpec.open.config.stiffness = 2000;
        TransitionPresets.SlideFromRightIOS.transitionSpec.open.config.damping = 1000;
        TransitionPresets.SlideFromRightIOS.transitionSpec.open.config.overshootClamping = true;
        TransitionPresets.SlideFromRightIOS.transitionSpec.open.config.restSpeedThreshold = 20;
        TransitionPresets.SlideFromRightIOS.transitionSpec.open.config.restDisplacementThreshold = 20;
        console.log("this.props", this.props);
        console.log(React);
        // this.Drawer = createDrawerNavigator(AppModule.getModuleRootNavigation());
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 100)
        global.buz1Param = '业务2你好，我是业务1，我们是在同一个js环境下aaaaa';
    }
    render() {
        // let Drawer = this.Drawer;
        return (
            <Provider store={GlobalStore} >
                <View style={{ height: StatusBar.currentHeight }}></View>
                <Button onPress={() => {
                    NativeModules.DebugModuleUtil.openRNDebugMenu();
                }} style={{ marginBottom: 20 }} title={"Debug"}>
                </Button>
                <Drawer.Navigator drawerType='slide' initialRouteName="mpos-shopping">
                    {/* <Drawer.Screen name="Page1" component={AppPage1} />
                    <Drawer.Screen name="Page2" component={AppPage2} /> */}
                    {/* <Drawer.Screen name="Home" component={AppPage1} /> */}
                    {/* <Drawer.Screen name="mpos-desktop" component={AppModuleComponent} /> */}
                    {/* <Drawer.Screen name="mpos-shopping" component={AppModuleComponent} /> */}
                    <Drawer.Screen name="mpos-shopping" preLoad={true} component={AppModuleComponent} />
                    <Drawer.Screen name="settings" preLoad={true} component={AppModuleComponent} />
                </Drawer.Navigator>

            </Provider>
        );
    }
}
