
import { combineReducers } from 'redux';
import PlayerActionCreators, { reducer as player } from './player'
import { bindActionCreators } from "redux";

var reducers;


export function setReducers(newReducers) {
    reducers = newReducers;
}

reducers = {
    player
}

export const ActionCreators = {
    ...PlayerActionCreators
}


// const actionCreators = (actionCreators, dispatch) => {
//     return bindActionCreators(actionCreators, dispatch);
// }


export const getActionCreators = (dispatch) => {
    let rActions = {};
    rActions[PlayerActionCreators.name] = bindActionCreators(PlayerActionCreators.Creators, dispatch);
    return rActions;
}

let ff = (reducers) => {
    return combineReducers(reducers);
}


export default ff(reducers)