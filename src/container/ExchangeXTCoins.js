/**
 * Created by LDQ on 2016/9/28.
 */


var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/exchangeXTCoinsStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';
import {XTCoinsActions} from '../redux/actions/XTCoinsActions';

var ExchangeXTCoins = React.createClass({
    render: function () {
        var urls = this.props.historyUrls;
        var backUrl = urls[urls.length-2];
        return (
            <div className="buy_XTCoins po w h">
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
                    XTCoins={this.props.XTCoins}
                    XTCoinsActionKeys={this.props.XTCoinsActionKeys}
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
                <PurchaseQuantity
                    XTCoins={this.props.XTCoins}
                    XTCoinsActionKeys={this.props.XTCoinsActionKeys}/>
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
    selectedBuyXTCoin:function(index){
        return ()=>{
            this.props.XTCoinsActionKeys.selectedBuyXTCoin(index);
        }
    },

    render: function () {
        var red = {color:"red"},diamonds = 0;
        var XTCoinNodes = this.props.XTCoins.XTCoinList.map((item,index)=>{

            return (
                <li className="XTCoin mt10 tc cblue" style={item.selected?red:""} key={index} onClick={this.selectedBuyXTCoin(index)}>
                    <p className="f16 pt10">{item.count}</p>
                    <p className="pb10">喜腾币</p>
                </li>
            )
        });

        return (
            <div className="purchase_quantity">
                <p className="selected_title f16">选择套餐</p>
                <ul className="XICoin_box">
                    {XTCoinNodes}
                </ul>
                <p className="pay_diamonds f16">
                    <span>应付钻石：</span>
                    <span>{diamonds}颗</span></p>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        account:state.account,
        XTCoins:state.XTCoins
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        XTCoinsActionKeys : bindActionCreators(XTCoinsActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(ExchangeXTCoins);
