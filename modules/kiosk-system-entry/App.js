/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
// import { connect } from './modules/@bindo/rn-framework/react-redux';
import { GlobalStore, getActionCreators, NavigationPage, ModulePlaceHolder, bindModuleNavigation, Stack, AppModuleComponent, NavigationModule, AppModule } from '@bindo/rn-framework';
import { bindActionCreators } from '@bindo/rn-framework/redux';
import { Provider, connect } from '@bindo/rn-framework/react-redux';
import { createDrawerNavigator, createDrawerNavigatorBox } from '@bindo/rn-framework/react-navigation/drawer';
import { NavigationContainer } from '@bindo/rn-framework/react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import AppPage1 from './App-Page1';
// import desktopApp from '../mpos-desktop/App';
// import shoppingApp from '../mpos-shopping/App';


const instructions = '业务1设置了一个全局变量供业务2读取fffff';

const Drawer = createDrawerNavigatorBox();

// {framewrok.aa}
export default class App extends Component {

    componentWillMount() {
        debugger
        console.log("this.props", this.props);
        console.log(React);
        // this.Drawer = createDrawerNavigator(AppModule.getModuleRootNavigation());
    }

    componentDidMount() {
        global.buz1Param = '业务2你好，我是业务1，我们是在同一个js环境下aaaaa';
    }
    render() {
        // let Drawer = this.Drawer;
        debugger
        return (
            // <View>

            // </View>
            <Provider store={GlobalStore} >
                <Drawer.Navigator drawerType='slide' initialRouteName="kiosk-Home">
                    {/* <Drawer.Screen name="Home" component={(NavigationPage(AppPage1, this))} /> */}
                    <Drawer.Screen name="kiosk-Home" component={AppPage1} />
                    <Drawer.Screen name="kiosk-AppPage1" component={AppPage1} />
                    {/* <Drawer.Screen name="mpos-desktop" component={AppModuleComponent} />
                    <Drawer.Screen name="mpos-shopping" component={AppModuleComponent} /> */}
                </Drawer.Navigator>
            </Provider>
        );
    }
}
