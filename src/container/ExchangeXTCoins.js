/**
 * Created by LDQ on 2016/9/28.
 */


let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');
let { Header,BackBtn,Title } = require('../components/Header');

let {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

import exchangeXTCoinsStyle from '../css/exchangeXTCoinsStyle.css';

import {loginInfoActions} from '../redux/actions/loginInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';
import {XTCoinsActions} from '../redux/actions/XTCoinsActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {productListActions} from '../redux/actions/productListActions';

const ExchangeXTCoins = React.createClass({
    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
        this.props.historyUrlsActionKeys.pushUrl('/ExchangeXTCoins');
        this.props.productListActionKeys.getList('/xtb/list');
    },
    exchangeXTCoins:function(tradeWay){
        return ()=>{
            this.props.XTCoinsActionKeys.exchangeXTCoins(tradeWay);
        }
    },

    render: function () {
        var backUrl = this.props.historyUrls.last;
        let src = "/ExchangeXTCoins";
        if(!this.props.loginInfo.login){
            src = "/Login";
        }else if(!this.props.showDialog.showDialog){
            src = "/PaySuccess";
        }

        return (
            <div>
                <div className={exchangeXTCoinsStyle.buy_XTCoins}>
                    <BuyXTCoins
                        accountActionKeys={this.props.accountActionKeys}
                        account={this.props.account}
                        XTCoins={this.props.XTCoins}
                        XTCoinsActionKeys={this.props.XTCoinsActionKeys}
                    />
                    <Link to={src} className={exchangeXTCoinsStyle.exchangeXTCoins} onClick={this.exchangeXTCoins(3)}>立即兑换</Link>
                </div>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="钻石不足"/>
                    <DialogBody content={"您的钻石余额不足，赶快去购买钻石吧！"}/>
                    <DialogFooter>
                        <DialogCancel showDialogActionKeys={this.props.showDialogActionKeys}/>
                        <DialogConfirm url={'/BuyDiamonds'} />
                    </DialogFooter>
                </DialogiOS>:''}
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
            <div className={exchangeXTCoinsStyle.my_diamonds}>
                <span className={exchangeXTCoinsStyle.my_diamonds_remain}>钻石余量：</span>
                <span className={exchangeXTCoinsStyle.cred}>{this.props.account.diamondAmount}</span>
                <span className={exchangeXTCoinsStyle.c000}>颗</span>
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
        var XTCoinNodes = this.props.XTCoins.XTCoinList.map((item,index)=>{

            return (
                <li className={exchangeXTCoinsStyle.XTCoin} style={item.selected?{border:"1px solid #FF4242",color:"#FF4242"}:{}} key={index} onClick={this.selectedBuyXTCoin(index)}>
                    <p className={exchangeXTCoinsStyle.XTCoin_count}>{item.count}</p>
                    <p className={exchangeXTCoinsStyle.XTCoin_sort}>喜腾币</p>
                </li>
            )
        });

        return (
            <div className={exchangeXTCoinsStyle.purchase_quantity}>
                <p className={exchangeXTCoinsStyle.selected_title}>选择套餐</p>
                <ul className={exchangeXTCoinsStyle.XICoin_box}>
                    {XTCoinNodes}
                </ul>
                <p className={exchangeXTCoinsStyle.pay_diamonds}>
                    <span>应付钻石：</span>
                    <span className={exchangeXTCoinsStyle.cred}>{this.props.XTCoins.price}颗</span>
                </p>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        loginInfo:state.loginInfo,
        historyUrls:state.historyUrls,
        account:state.account,
        XTCoins:state.XTCoins,
        showDialog:state.showDialog,
        productList:state.productList
    }
}
function mapDispatchToProps(dispatch){

    return{
        loginInfoActionKeys : bindActionCreators(loginInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        XTCoinsActionKeys : bindActionCreators(XTCoinsActions,dispatch),
        showDialogActionKeys : bindActionCreators(dialogActions,dispatch),
        productListActionKeys : bindActionCreators(productListActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(ExchangeXTCoins);
