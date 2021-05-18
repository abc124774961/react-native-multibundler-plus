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
class AppPage1 extends Component {

    componentWillMount() {
        // console.log("NativeModules", NativeModules)
        console.log(this.props.route, this.props);
    }

    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {
                    // this.props.navigation.navigate("AppPage4")

                    debugger
                    this.props.navigation.navigate("AppPage1");
                    // console.log(this.props.navigation);
                    // this.forceUpdate(); 
                    // this.props.navigation.modules[name].navigate("AppPage3");
                }} style={{ marginBottom: 20 }} title={"AppPage1"}>
                </Button>

                <Text style={styles.welcome}>欢迎来到系统system的世界！Page2</Text>
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



export default connect(
    mapStateToProps
)(AppPage1)

