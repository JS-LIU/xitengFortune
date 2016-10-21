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
import {account} from './account';
import {XTCoins} from './XTCoins';
import {rank} from './rank'
import {betList} from './betList';
import {award} from './award';
import {address} from './address';
import {provinces} from './provinces';
import {cities} from './cities';
import {areas} from './areas';


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
    account,
    XTCoins,
    rank,
    betList,
    award,
    address,
    provinces,
    cities,
    areas
});

module.exports = rootReducer;