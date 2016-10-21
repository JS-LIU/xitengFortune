/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var ReactDom = require('react-dom');
var { Router, Route, hashHistory,IndexRedirect} = require('react-router');
var Store = require('../src/redux/store/store');
var {Provider} = require('react-redux');
import {DevTools} from 'Util/3rd/DevTools'

var HomePage = require('../src/components/HomePage');
var AskBar = require('../src/components/AskBar');

var Guess = require('../src/container/Guess');
var Discover = require('../src/container/Discover');
var My = require('../src/container/My');
var Shop = require('../src/container/Shop');
var ShoppingCart = require('../src/container/ShoppingCart');
var ProductDetails = require('../src/container/ProductDetails');
var BuyDiamonds = require('../src/container/BuyDiamonds');
var Register = require('../src/container/Register');
var CheckCode = require('../src/container/CheckCode');
var Login = require('../src/container/Login');
var StockDetails = require('../src/container/StockDetails');
var Bet = require('../src/container/Bet');
var ExchangeXTCoins = require('../src/container/ExchangeXTCoins');
var Pay = require('../src/container/Pay');
var PaySuccess = require('../src/container/PaySuccess');
var ConfirmOrder = require('../src/container/ConfirmOrder');
var SelectAddress = require('../src/container/SelectAddress');
var CreateAddress = require('../src/container/CreateAddress');
var Provinces = require('../src/container/Provinces');
var Cities = require('../src/container/Cities');
var Areas = require('../src/container/Areas');

import {gameListInit} from  '../src/redux/store/gameListInit';
import {shoppingCartInit} from '../src/redux/store/shoppingCartInit';
import {userInfoInit} from  '../src/redux/store/userInfoInit';
import {stockGameDetail} from '../src/redux/store/stockGameDetailInit';
import {storageInit} from '../src/redux/store/storageInit';
import {accountInit} from '../src/redux/store/accountInit'
import {XTCoinsInit} from '../src/redux/store/XTCoinsInit';
import {rankInit} from '../src/redux/store/rankInit.js';
import {betListInit} from '../src/redux/store/betListInit';
import {awardInit} from '../src/redux/store/awardInit';
import {historyUrlsInit} from '../src/redux/store/historyUrlsInit';
import {shopInit} from '../src/redux/store/shopInit';
import {productInfoInit} from '../src/redux/store/productInfoInit';
import {addressInit} from '../src/redux/store/addressInit';
import {provincesInit} from '../src/redux/store/provincesInit';
import {citiesInit} from '../src/redux/store/citiesInit';
import {areasInit} from '../src/redux/store/areasInit';

var {syncHistoryWithStore} = require('react-router-redux');

const store = Store(initState());
const history = syncHistoryWithStore(hashHistory, store);


var getRoutes = ()=>{
    return (<Router history={history}>
        <Route path="/" component={HomePage}>
            <IndexRedirect to="/Guess"/>
            <Route path="/Guess" component={Guess}></Route>
            <Route path="/AskBar" component={AskBar}></Route>
            <Route path="/Discover" component={Discover}></Route>
            <Route path="/My" component={My}></Route>
        </Route>
        <Route path="/Shop" component={Shop}></Route>
        <Route path="/ProductDetails" component={ProductDetails}></Route>
        <Route path="/BuyDiamonds" component={BuyDiamonds}></Route>
        <Route path="/ShoppingCart" component={ShoppingCart}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/CheckCode" component={CheckCode}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/StockDetails" component={StockDetails}></Route>
        <Route path="/Bet" component={Bet}></Route>
        <Route path="/ExchangeXTCoins" component={ExchangeXTCoins}></Route>
        <Route path="/Pay" component={Pay}></Route>
        <Route path="/PaySuccess" component={PaySuccess}></Route>
        <Route path="/ConfirmOrder" component={ConfirmOrder}></Route>
        <Route path="/SelectAddress" component={SelectAddress}></Route>
        <Route path="/CreateAddress" component={CreateAddress}></Route>
        <Route path="/Provinces" component={Provinces}></Route>
        <Route path="/Cities" component={Cities}></Route>
        <Route path="/Areas" component={Areas}></Route>
    </Router>
    )};



function initState(){
    return {
        stockGame:gameListInit,
        stockGameDetail:stockGameDetail,
        shop:shopInit,
        diamonds:{diamondList:[]},
        storage:storageInit,
        productInfo:productInfoInit,
        shoppingCart:shoppingCartInit,
        userInfo:userInfoInit,
        showDialog:{},
        historyUrls:historyUrlsInit,
        account:accountInit,
        XTCoins:XTCoinsInit,
        rank:rankInit,
        betList:betListInit,
        award:awardInit,
        address:addressInit,
        provinces:provincesInit,
        cities:citiesInit,
        areas:areasInit,
    }
}




ReactDom.render(
    <Provider store={store}>
        <div>
            {/*<DevTools />*/}
            {getRoutes()}
        </div>

    </Provider>,

    document.getElementById('root')
);