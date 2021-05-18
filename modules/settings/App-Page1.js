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
class AppPage1 extends Component<Props> {

    componentWillMount() {
        // console.log("NativeModules", NativeModules)
        // console.log("key", this.props.route);
    }

    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => {
                    this.props.navigation.navigate("settings-AppPage4")
                    // let name = "mpos-desktop";
                    // this.props.navigation.navigate(name, {
                    //     screen: 'AppPage1'
                    // });
                }} title={"APP1"}>
                </Button>
                <Text style={styles.welcome}>欢迎来到settings的世界</Text>
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
)(AppPage1)

