/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native';
// import { connect } from './modules/@bindo/rn-framework/react-redux';
import { GlobalStore, getActionCreators } from '@bindo/rn-framework';
import { bindActionCreators } from '@bindo/rn-framework/redux';
import { Provider, connect } from '@bindo/rn-framework/react-redux';



const instructions = '业务1设置了一个全局变量供业务2读取';

// {framewrok.aa}
type Props = {};
class AppPage2 extends Component<Props> {

    componentWillMount() {
        console.log("NativeModules", NativeModules)
    }

    componentDidMount() {
        global.buz1Param = '业务2你好，我是业务1，我们是在同一个js环境下';
    }
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {

                    debugger
                    let name = "mpos-desktop";
                    // this.props.navigation.navigate("settings", { screen: "settings-AppPage3" });
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'settings' }],
                    });
                    // this.props.navigation.push("AppPage3");
                    // this.props.navigation.modules[name].navigate("AppPage2");
                    // this.props.navigation.push("AppPage1");
                }} title={"AppPage3"}>
                </Button>
                <Text style={styles.welcome}>欢迎来到shopping的世界！page2</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});



const mapStateToProps = state => {
    return {
        player: state.player
    }
}

const mapDispatchToProps = dispatch => {
    let dispatchProps = getActionCreators(dispatch);
    return {
        ...dispatchProps
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppPage2)

