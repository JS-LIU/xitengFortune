/**
 * Created by LDQ on 2016/9/28.
 */


let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');

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
                        XBList = {this.props.productList}
                    />
                    <Link to={src} className={exchangeXTCoinsStyle.exchangeXTCoins}>立即兑换</Link>
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

const BuyXTCoins = React.createClass({
    render: function () {
        return (
            <div>
                <PurchaseQuantity
                    XBList = {this.props.XBList}/>
            </div>
        )
    }
});


const PurchaseQuantity = React.createClass({

    render: function () {
        let XTCoinNodes = this.props.XBList.list.map((item,index)=>{

            return (
                <li className={exchangeXTCoinsStyle.XTCoin} key={index}>
                    <p className={exchangeXTCoinsStyle.XTCoin_count}>{item.xtbCount}</p>
                    <p className={exchangeXTCoinsStyle.XTCoin_sort}>喜币</p>
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
                    <span>充值：</span>
                    <span className={exchangeXTCoinsStyle.cred}>喜币</span>
                </p>
                <p className={exchangeXTCoinsStyle.pay_diamonds}>
                    <span>应付：</span>
                    <span className={exchangeXTCoinsStyle.cred}>钻石</span>
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
        showDialog:state.showDialog,
        productList:state.productList,
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
