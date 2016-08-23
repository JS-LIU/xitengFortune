/**
 * Created by LDQ on 2016/8/8.
 */
var {combineReducers} = require('redux');
import { routerReducer as routing } from 'react-router-redux'

import {openingTime} from './openingTime';
import {shop} from './shop';
import {storage} from './storage';
import {productInfo} from './productInfo';
import {shoppingCart} from './shoppingCart';
import {diamonds} from './diamonds';



var rootReducer = combineReducers({
    routing,openingTime,shop,diamonds,storage,productInfo,shoppingCart
});

module.exports = rootReducer;