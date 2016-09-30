/**
 * Created by LDQ on 2016/9/28.
 */


var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/exchangeXTCoinsStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';

var ExchangeXTCoins = React.createClass({
    render: function () {
        var urls = this.props.historyUrls;
        var backUrl = urls[urls.length-2];
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:backUrl}}
                    />
                    <Title title={{text:'兑换喜腾币'}}></Title>
                </Header>
                <BuyXTCoins
                    accountActionKeys={this.props.accountActionKeys}
                    account={this.props.account}
                />
            </div>
        )
    }
});

var BuyXTCoins = React.createClass({
    render: function () {
        return (
            <div>
                <MyDiamonds
                    accountActionKeys={this.props.accountActionKeys}
                    account={this.props.account}
                />
                <PurchaseQuantity />
            </div>
        )
    }
});

var MyDiamonds = React.createClass({
    componentWillMount:function(){
        this.props.accountActionKeys.getAccount();
    },
    render: function () {
        return (
            <div className="my_diamonds f14">
                <span className="c000 pl15">钻石余量：</span>
                <span className="cred">{this.props.account.diamondAmount}</span>
                <span className="c000">颗</span>
                <span>（钻石兑换喜腾币为1:12）</span>
            </div>
        )
    }
});

var  PurchaseQuantity = React.createClass({
    render: function () {
        return (
            <div>
                <p>选择套餐</p>
                <ul>
                    <li>120喜腾币</li>
                </ul>
                <p>应付钻石：50颗</p>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        account:state.account
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys:bindActionCreators(accountActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(ExchangeXTCoins);
