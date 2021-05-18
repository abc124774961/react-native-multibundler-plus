import { connect as reduxConnect } from "react-redux";
import { getActionCreators } from "..";

export * from "react-redux";


let connect = (...args) => {
    // if (!args[0]) args[0] = () => { return {} };
    let paramMapStateToProps = args[0];
    let paramMapDispatchToProps = args[1];
    let mapDispatchToProps = dispatch => {
        let dispatchProps = getActionCreators(dispatch);
        let rProps = (paramMapDispatchToProps && paramMapDispatchToProps(dispatch)) ?? {};
        return Object.assign(rProps, dispatchProps);
    }
    let mapStateToProps = state => {
        let rStates = paramMapStateToProps(state);
        return rStates;
    }
    args[0] = mapStateToProps;
    args[1] = mapDispatchToProps;
    // let dispatchProps = getActionCreators(dispatch);

    return reduxConnect(...args);
};

// reactRedux.default

export { connect }

// export * from 'react-redux'

// export const connect = () => {

// }
// let ss = reactRedux;
// export { reactRedux }

// export default reactRedux;