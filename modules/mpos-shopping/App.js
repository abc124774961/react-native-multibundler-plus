/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
// import { connect } from './modules/@bindo/rn-framework/react-redux';
import { GlobalStore, getActionCreators, NavigationPage, bindModuleNavigation } from '@bindo/rn-framework';
import { bindActionCreators } from '@bindo/rn-framework/redux';
import { Provider, connect } from '@bindo/rn-framework/react-redux';
import { createStackNavigator, TransitionPresets } from '@bindo/rn-framework/react-navigation/stack';
import AppPage1 from './App-Page1';
import AppPage2 from './App-Page2';
import { AppModuleComponent } from '@bindo/rn-framework/navigation';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

const instructions = '业务1设置了一个全局变量供业务2读取fffff';


const Stack = createStackNavigator();
// {framewrok.aa}
export default class App extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={GlobalStore} >
        <Stack.Navigator headerMode={"none"} initialRouteName={"shop-AppPage3"} screenOptions={{
          //这三个点是，解构赋值Es6的新写法
          ...TransitionPresets.SlideFromRightIOS,
        }}>
          {/* <Stack.Screen name="shopping-AppPage3" component={(AppPage1)} /> */}
          <Stack.Screen name="shop-AppPage3" component={AppPage1} />
          <Stack.Screen name="shop-AppPage4" component={AppPage2} />
          {/* <Stack.Screen name="settings" component={AppModuleComponent} /> */}
        </Stack.Navigator>
      </Provider>
    );
  }
}


let aa = "111"
export { aa }