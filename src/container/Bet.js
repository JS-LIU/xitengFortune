/**
 * Created by LDQ on 2016/9/21.
 */
var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');
const {PayDialogHeader,PayDialogBody,PayMoney,PayWay} = require('../components/PayDialog');

import betStyle from '../css/betStyle.css';

import {storageActions} from '../redux/actions/storageActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betActions} from '../redux/actions/betActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {accountActions} from '../redux/actions/accountActions';
import {stockGameDetailActions} from '../redux/actions/stockGameDetailActions'
import {orderActions} from '../redux/actions/orderActions';

var Bet = React.createClass({

    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
        this.props.accountActionKeys.getAccount();
        this.props.historyUrlsActionKeys.pushUrl('/Bet');
        this.props.betActionKeys.getOdds();
        this.props.stockGameDetailActionKeys.getStockDetail(this.props.storage.stockGameId);
    },
    showBetDialog:function(){
        this.props.betActionKeys.showBetDialog();
    },
    render: function () {
        return (
            <div>
                <div className={betStyle.bet_body}>
                    <img src="src/images/cai3-light-@2x.png" alt="" className={betStyle.bgLight}/>
                    <BetHeader
                        storage={this.props.storage}
                        stockGameDetail={this.props.stockGameDetail}
                    />
                    <BetCenter
                        betActionKeys = {this.props.betActionKeys}
                        account={this.props.account}
                        betInfo = {this.props.betInfo}
                    />
                    <div className={betStyle.betBtn} onClick={this.showBetDialog}/>
                </div>

                {/* 投注失败弹出窗口 */}
                {this.props.showDialog.showDialog?<DialogiOS showDialog={this.props.showDialog}>
                    <DialogHeader title={this.props.showDialog.title}/>
                    <DialogBody content={this.props.showDialog.body}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={this.props.showDialog.cancel}/>
                        <DialogConfirm
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            certain={this.props.showDialog.certain}/>
                    </DialogFooter>
                </DialogiOS>:''}

                {/* 支付弹出窗口 */}
                {this.props.payDialog.isShowDialog?
                    <DialogiOS>
                        <PayDialogHeader title = {'支付'}/>

                        <PayDialogBody >
                            <PayMoney money = {{text:'投注',total:this.props.betInfo.betMoney}}/>
                            <PayWay link = {{url:'/Bet',text:'喜币账户余额支付'}}/>
                        </PayDialogBody>

                        <div onClick={this.bet}>确认</div>
                    </DialogiOS>:""}


                <div className={betStyle.bet_footer}>
                    <span>【当前参考】猜涨赔率：</span>
                    <span>{this.props.betInfo.upOdds}</span>
                    <span>猜跌赔率：</span>
                    <span>{this.props.betInfo.downOdds}</span>
                </div>
            </div>
        )
    }
});

const BetHeader = React.createClass({
    render: function () {
        return (
            <div className={betStyle.bet_header}>
                <span>{this.props.stockGameDetail.detail.stockGameName}</span>
                <span className={betStyle.bet_header_stage}>{this.props.stockGameDetail.detail.stage}期</span>
                <span className={this.props.storage.guessType?betStyle.cgreen:betStyle.cred}>{this.props.storage.guessType?"猜跌":"猜涨"}</span>
            </div>
        )
    }
});

const BetCenter = React.createClass({
    setMoney:function(money){
        return ()=>{
            let betMoney = money||this.refs.xbMoney.value;
            this.props.betActionKeys.setBetMoney(betMoney);
        };
    },
    render: function () {
        return (
            <ul className={betStyle.bet_center}>
                <li className={betStyle.input_money_box}>
                    <p className={betStyle.cfff}>金额：</p>
                    <input type="number"
                           className={betStyle.input_money}
                           placeholder="请输入投注金额"
                           onChange = {this.setMoney()}
                           value={this.props.betInfo.betMoney}
                           ref="xbMoney"
                    />
                    <p className={betStyle.cfff}>喜币</p>
                </li>
                <li className={betStyle.selected_box}>
                    <div className={betStyle.selected_money} onClick={this.setMoney('100')}>
                        <p>100</p>
                        <p>喜币</p>
                    </div>
                    <div className={betStyle.selected_money} onClick={this.setMoney('1000')}>
                        <p>1000</p>
                        <p>喜币</p>
                    </div>
                    <div className={betStyle.selected_money_last} onClick={this.setMoney('10000')}>
                        <p>10000</p>
                        <p>喜币</p>
                    </div>
                </li>
                <li className={betStyle.balance_box}>
                    <span>余额：</span>
                    <span className={betStyle.xt_money}>{this.props.account.xtbTotalAmount}</span>
                    <Link to="/BuyDiamonds" className={betStyle.xt_get}>获取喜币</Link>
                </li>
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        storage:state.storage,
        historyUrls:state.historyUrls,
        showDialog:state.showDialog,
        stockGameDetail:state.stockGameDetail,
        account:state.account,
        betInfo:state.betInfo,
        payDialog:state.payDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        betActionKeys: bindActionCreators(betActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch),
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        stockGameDetailActionKeys:bindActionCreators(stockGameDetailActions,dispatch),
        orderActionKeys:bindActionCreators(orderActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Bet);