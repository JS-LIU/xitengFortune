/**
 * Created by LDQ on 2016/8/8.
 */
let {combineReducers} = require('redux');
import { routerReducer as routing } from 'react-router-redux'

import {stockGame} from './stockGame';
import {shop} from './shop';
import {storage} from './storage';
import {productInfo} from './productInfo';
import {shoppingCart} from './shoppingCart';
import {diamonds} from './diamonds';
import {loginInfo} from './loginInfo';
import {showDialog} from './showDialog';
import {stockGameDetail} from './stockGameDetail';
import {historyUrls} from './historyUrls'
import {account} from './account';
import {XBList} from './XBList';
import {rank} from './rank'
import {betList} from './betList';
import {award} from './award';
import {address} from './address';
import {provinces} from './provinces';
import {cities} from './cities';
import {areas} from './areas';
import {order} from './order';
import {betRecord} from './betRecord';
import {WXInfo} from './WXInfo';
import {pay} from './pay';
import {betInfo} from './betInfo';
import {userInfo} from './userInfo';
import {activity} from './activity';
import {purchaseGame} from './purchaseGame';
import {bidOrder} from './bidOrder';
import {settlement} from './settlement';
import {specification} from './specification';
import {product} from './product';
import {payDialog} from './payDialog';
import {productList} from './productList';
import {purchaseGameProductList} from './purchaseGameProductList';

const rootReducer = combineReducers({
    account,
    address,
    areas,
    activity,
    award,
    betInfo,
    betList,
    betRecord,
    bidOrder,
    cities,
    diamonds,
    historyUrls,
    loginInfo,
    order,
    pay,
    product,
    productInfo,
    productList,
    provinces,
    purchaseGame,
    rank,
    routing,
    settlement,
    specification,
    shop,
    shoppingCart,
    showDialog,
    storage,
    stockGame,
    stockGameDetail,
    userInfo,
    XBList,
    WXInfo,
    payDialog,
    purchaseGameProductList
});

module.exports = rootReducer;