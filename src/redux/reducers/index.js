/**
 * Created by LDQ on 2016/8/8.
 */
var {combineReducers} = require('redux');
import { routerReducer as routing } from 'react-router-redux'

import {gameList} from './gameList';
import {shop} from './shop';
import {storage} from './storage';
import {productInfo} from './productInfo';
import {shoppingCart} from './shoppingCart';
import {diamonds} from './diamonds';
import {userInfo} from './userInfo';
import {showDialog} from './showDialog';


var rootReducer = combineReducers({
    routing,gameList,shop,diamonds,storage,productInfo,shoppingCart,userInfo,showDialog
});

module.exports = rootReducer;