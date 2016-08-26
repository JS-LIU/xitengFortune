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

var op = require('../src/redux/store/openingTimeInit');
import {shoppingCartInit} from '../src/redux/store/shoppingCartInit'
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
        <Route path="/ProductDetails" components={ProductDetails}></Route>
        <Route path="/BuyDiamonds" components={BuyDiamonds}></Route>
        <Route path="/ShoppingCart" components={ShoppingCart}></Route>
        <Route path="/Register" components={Register}></Route>


    </Router>
    )};



function initState(){
    return {
        openingTime:op,
        shop:{productList:[]},
        diamonds:{diamondList:[]},
        storage:{productId:''},
        productInfo:{},
        shoppingCart:shoppingCartInit
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