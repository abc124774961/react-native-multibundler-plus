import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import getReducers from '../reducers'

const isDev = process.env.NODE_ENV === 'development'
const middlewares = isDev ? [thunkMiddleware] : [thunkMiddleware]

const store = createStore(getReducers, applyMiddleware(...middlewares))

store._id = parseInt(Math.random() * 1000000);
console.log("create", store);

export default store
