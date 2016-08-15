/**
 * Created by LDQ on 2016/8/8.
 */
var {combineReducers} = require('redux');
import {openingTime} from './openingTime';
import {shop} from './shop';
import { routerReducer as routing } from 'react-router-redux'


var rootReducer = combineReducers({
    routing,openingTime,shop
});

module.exports = rootReducer;