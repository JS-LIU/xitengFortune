/**
 * Created by LDQ on 2016/8/6.
 */
const React = require('react');
const ReactDom = require('react-dom');
const { Router, Route, hashHistory,IndexRedirect} = require('react-router');
const Store = require('../src/redux/store/store');
const {Provider} = require('react-redux');


const PreLoading = require('../src/container/PreLoading');
const HomePage = require('../src/components/HomePage');
const AskBar = require('../src/components/AskBar');

const Guess = require('../src/container/Guess');
const Discover = require('../src/container/Discover');
const My = require('../src/container/My');
const Shop = require('../src/container/Shop');
const ShoppingCart = require('../src/container/ShoppingCart');
const ProductDetails = require('../src/container/ProductDetails');
const BuyDiamonds = require('../src/container/BuyDiamonds');
const Register = require('../src/container/Register');
const CheckCode = require('../src/container/CheckCode');
const Login = require('../src/container/Login');
const StockDetails = require('../src/container/StockDetails');
const Bet = require('../src/container/Bet');
const ExchangeXTCoins = require('../src/container/ExchangeXTCoins');
const Pay = require('../src/container/Pay');
const PaySuccess = require('../src/container/PaySuccess');
const ConfirmOrder = require('../src/container/ConfirmOrder');
const SelectAddress = require('../src/container/SelectAddress');
const CreateAddress = require('../src/container/CreateAddress');
const Provinces = require('../src/container/Provinces');
const Cities = require('../src/container/Cities');
const Areas = require('../src/container/Areas');
const MyAsset = require('../src/container/MyAsset');
const MyRecord = require('../src/container/MyRecord');
const SetPassword = require('../src/container/SetPassword');
const PayFail = require('../src/container/PayFail');
const OnePiece = require('../src/container/OnePiece');
const OnePieceProductDetails = require('../src/container/OnePieceProductDetails');
const OnePieceJoinDetail = require('../src/container/OnePieceJoinDetail');
const OnePieceOldActivities = require('../src/container/OnePieceOldActivities');
const OnePieceShow = require('../src/container/OnePieceShow');
const OnePieceBuyNow = require('../src/container/OnePieceBuyNow');
const OnePieceConfirmOrder = require('../src/container/OnePieceConfirmOrder');
const OnePieceJoinResult = require('../src/container/OnePieceJoinResult');
const OnePieceOldActivitiesHome = require('../src/container/OnePieceOldActivitiesHome');
const OrderDetails = require('../src/container/OrderDetails');
const OrderList = require('../src/container/OrderList');
const AcceptPrize = require('../src/container/AcceptPrize');


import {stockGameInit} from  '../src/redux/store/stockGameInit';
import {shoppingCartInit} from '../src/redux/store/shoppingCartInit';
import {loginInfoInit} from  '../src/redux/store/loginInfoInit';
import {stockGameDetail} from '../src/redux/store/stockGameDetailInit';
import {storageInit} from '../src/redux/store/storageInit';
import {accountInit} from '../src/redux/store/accountInit'
import {XBListInit} from '../src/redux/store/XBListInit';
import {rankInit} from '../src/redux/store/rankInit.js';
import {betListInit} from '../src/redux/store/betListInit';
import {awardInit} from '../src/redux/store/awardInit';
import {historyUrlsInit} from '../src/redux/store/historyUrlsInit';
import {shopInit} from '../src/redux/store/shopInit';
import {shopProductInfoInit} from '../src/redux/store/shopProductInfoInit';
import {addressInit} from '../src/redux/store/addressInit';
import {provincesInit} from '../src/redux/store/provincesInit';
import {citiesInit} from '../src/redux/store/citiesInit';
import {areasInit} from '../src/redux/store/areasInit';
import {orderInit} from '../src/redux/store/orderInit';
import {betRecordInit} from '../src/redux/store/betRecordInit';
import {WXInfoInit} from '../src/redux/store/WXInfoInit';
import {diamondListInit} from '../src/redux/store/diamondListInit';
import {payInit} from '../src/redux/store/payInit';
import {dialogInit} from '../src/redux/store/dialogInit';
import {betInfoInit} from '../src/redux/store/betInfoInit';
import {userInfoInit} from '../src/redux/store/userInfoInit';
import {activityInit} from '../src/redux/store/activityInit';
import {purchaseGameInit} from '../src/redux/store/purchaseGameInit';
import {bidOrderInit} from '../src/redux/store/bidOrderInit';
import {settlementInit} from '../src/redux/store/settlementInit';
import {specificationInit} from '../src/redux/store/specificationInit';
import {payDialogInit} from '../src/redux/store/payDialogInit';
import {purchaseGameProductListInit} from '../src/redux/store/purchaseGameProductListInit';

import _h from '../src/Util/HB';
const {syncHistoryWithStore} = require('react-router-redux');

const store = Store(initState());
const history = syncHistoryWithStore(hashHistory, store);


const getRoutes = ()=>{
    return (
        <Router history={history}>
            <Route path="/" component={PreLoading}></Route>

            <Route path="/HomePage" component={HomePage}>
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
            <Route path="/MyAsset" component={MyAsset}></Route>
            <Route path="/MyRecord" component={MyRecord}></Route>
            <Route path='/SetPassword' component={SetPassword}></Route>
            <Route path='/PayFail' component={PayFail}></Route>
            <Route path='/OnePiece' component={OnePiece}></Route>
            <Route path='/OnePieceProductDetails' component={OnePieceProductDetails}></Route>
            <Route path='/OnePieceJoinDetail' component={OnePieceJoinDetail}></Route>
            <Route path='/OnePieceOldActivities' component={OnePieceOldActivities}></Route>
            <Route path='/OnePieceShow' component={OnePieceShow}></Route>
            <Route path='/OnePieceBuyNow' component={OnePieceBuyNow}></Route>
            <Route path='/OnePieceConfirmOrder' component={OnePieceConfirmOrder}></Route>
            <Route path='/OnePieceJoinResult' component={OnePieceJoinResult}></Route>
            <Route path='/OnePieceOldActivitiesHome' component={OnePieceOldActivitiesHome}></Route>
            <Route path='/OrderDetails' component={OrderDetails}></Route>
            <Route path='/OrderList' component={OrderList}></Route>
            <Route path='/AcceptPrize' component={AcceptPrize}></Route>
        </Router>
)};

_h.ui.setBaseFontSize(750,100);


function initState(){
    return {
        stockGame:stockGameInit,
        stockGameDetail:stockGameDetail,
        shop:shopInit,
        diamonds:diamondListInit,
        storage:localStorage.storageInit?JSON.parse(localStorage.storageInit):storageInit,
        shopProductInfo:shopProductInfoInit,
        shoppingCart:shoppingCartInit,
        loginInfo:localStorage.loginInfoInit?JSON.parse(localStorage.loginInfoInit):loginInfoInit,
        showDialog:dialogInit,
        historyUrls:localStorage.historyUrlsInit?JSON.parse(localStorage.historyUrlsInit):historyUrlsInit,
        account:accountInit,
        XBList:XBListInit,
        rank:rankInit,
        betList:betListInit,
        award:awardInit,
        address:addressInit,
        provinces:provincesInit,
        cities:citiesInit,
        areas:areasInit,
        order:localStorage.orderInit?JSON.parse(localStorage.orderInit):orderInit,
        betRecord:betRecordInit,
        WXInfo:WXInfoInit,
        pay:localStorage.payInit?JSON.parse(localStorage.payInit):payInit,
        betInfo:betInfoInit,
        userInfo:localStorage.userInfoInit?JSON.parse(localStorage.userInfoInit):userInfoInit,
        activity:activityInit,
        purchaseGame:purchaseGameInit,
        bidOrder:bidOrderInit,
        settlement:settlementInit,
        specification:specificationInit,
        payDialog:payDialogInit,
        purchaseGameProductList:purchaseGameProductListInit
    }
}




ReactDom.render(
    <Provider store={store}>
        <div>
            {getRoutes()}
        </div>

    </Provider>,

    document.getElementById('root')
);