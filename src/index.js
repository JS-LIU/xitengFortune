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
var My = require('../src/components/My');
var AskBar = require('../src/components/AskBar');
var Discover = require('../src/components/Discover');

var Guess = require('../src/container/Guess');
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

import {gameListInit} from  '../src/redux/store/gameListInit';
import {shoppingCartInit} from '../src/redux/store/shoppingCartInit';
import {userInfoInit} from  '../src/redux/store/userInfoInit';
import {stockGameDetail} from '../src/redux/store/stockGameDetailInit';
import {storageInit} from '../src/redux/store/storageInit';
import {betInit} from '../src/redux/store/betInit';

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
    </Router>
    )};



function initState(){
    return {
        stockGame:gameListInit,
        stockGameDetail:stockGameDetail,
        shop:{productList:[]},
        diamonds:{diamondList:[]},
        storage:storageInit,
        productInfo:{},
        shoppingCart:shoppingCartInit,
        userInfo:userInfoInit,
        showDialog:{},
        historyUrls:[],
        bet:betInit
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