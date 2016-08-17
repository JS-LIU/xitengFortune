/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var ReactDom = require('react-dom');
var { Router, Route, hashHistory,IndexRedirect} = require('react-router');
var HomePage = require('../src/components/HomePage');
var Guess = require('../src/container/Guess');
var Shop = require('../src/container/Shop');
var ProductDetails = require('../src/container/ProductDetails');
var AskBar = require('../src/components/AskBar');
var Discover = require('../src/components/Discover');
var Store = require('../src/redux/store/store');
var {Provider} = require('react-redux');
var op = require('../src/redux/store/openingTimeInit');

import {DevTools} from 'Util/3rd/DevTools'
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
        </Route>
        <Route path="/Shop" component={Shop}></Route>
        <Route path="/ProductDetails" components={ProductDetails}></Route>

    </Router>
    )};



function initState(){
    return {
        openingTime:op,
        shop:{productList:[]},
        storage:{productId:''}
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