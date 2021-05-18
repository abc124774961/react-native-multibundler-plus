import { AppRegistry, DeviceEventEmitter, View, Platform, YellowBox } from 'react-native';
import 'react';
import 'react-native';
import React, { Component } from "react";
import app from './app.json'

import { SmartAssets } from "react-native-smartassets";
SmartAssets.initSmartAssets();
DeviceEventEmitter.addListener('sm-bundle-changed',
	(bundlePath) => {
		SmartAssets.setBundlePath(bundlePath);
	});

import { NativeEventEmitter, NativeModules } from 'react-native';
if (Platform.OS != 'android') {//ios
	const { BundleloadEventEmiter } = NativeModules;

	const bundleLoadEmitter = new NativeEventEmitter(BundleloadEventEmiter);

	const subscription = bundleLoadEmitter.addListener(
		'BundleLoad',
		(bundleInfo) => {
			console.log('BundleLoad==' + bundleInfo.path);
			SmartAssets.setBundlePath(bundleInfo.path);
		}
	);
}
// if (__DEV__) {
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
YellowBox.ignoreWarnings(['Require cycle: ', 'Setting a timer', 'RFC2822', "Remote debugger"])
console.disableYellowBox = true
// }


require('react-native/Libraries/Core/checkNativeVersion');
