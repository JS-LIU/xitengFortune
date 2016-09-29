/**
 * Created by LDQ on 2016/8/8.
 */
var {combineReducers} = require('redux');
import { routerReducer as routing } from 'react-router-redux'

import {stockGame} from './stockGame';
import {shop} from './shop';
import {storage} from './storage';
import {productInfo} from './productInfo';
import {shoppingCart} from './shoppingCart';
import {diamonds} from './diamonds';
import {userInfo} from './userInfo';
import {showDialog} from './showDialog';
import {stockGameDetail} from './stockGameDetail';
import {historyUrls} from './historyUrls'
import {bet} from './bet';
import {account} from './account';

var rootReducer = combineReducers({
    routing,
    stockGame,
    stockGameDetail,
    shop,
    diamonds,
    storage,
    productInfo,
    shoppingCart,
    userInfo,
    showDialog,
    historyUrls,
    bet,
    account
});

module.exports = rootReducer;