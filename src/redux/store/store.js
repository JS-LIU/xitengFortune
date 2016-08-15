/**
 * Created by LDQ on 2016/8/9.
 */
import {applyMiddleware, compose, createStore } from 'redux';
var rootReducer = require('./../reducers/index');

import thunk from 'redux-thunk'
import {DevTools} from '../../Util/3rd/DevTools';

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(thunk),
    //必须的！启用带有monitors（监视显示）的DevTools
    window.devToolsExtension && window.devToolsExtension()
 );

function createStoreWithMiddleware(initialState){
    return createStore(
        rootReducer,
        initialState,
        enhancer
    )
}

module.exports = createStoreWithMiddleware;
