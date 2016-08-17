/**
 * Created by LDQ on 2016/8/8.
 */
var {combineReducers} = require('redux');
import {openingTime} from './openingTime';
import {shop} from './shop';
import {storage} from './storage';
import { routerReducer as routing } from 'react-router-redux'


var rootReducer = combineReducers({
    routing,openingTime,shop,storage
});

module.exports = rootReducer;