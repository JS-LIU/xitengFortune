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
const {PayDialogHeader,PayDialogBody} = require('../components/PayDialog');

require('../css/betStyle.css');

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
    bet:function(){
        this.props.orderActionKeys.createOrder('/guessGame');
    },
    render: function () {
        return (
            <div>
                <div className="bet_body po w">
                    <img src="src/images/cai3-light-@2x.png" alt="" className="bgLight po"/>
                    <BetHeader
                        storage={this.props.storage}
                        stockGameDetail={this.props.stockGameDetail}
                    />
                    <BetCenter
                        betActionKeys = {this.props.betActionKeys}
                        account={this.props.account}
                        betInfo = {this.props.betInfo}
                    />
                    <div className="betBtn po tc f16 w"/>
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
                        <PayDialogBody body = {
                            {
                                title:"投注",
                                money:{icon:"",much:"100"},
                                payWay:"喜币账户余额支付",
                                url:""
                            }
                        }/>
                        <div onClick={this.bet}>确认</div>
                    </DialogiOS>:""}


                <div className="bet_footer tc w">
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
            <div className="bet_header pr f14 cfff mt50">
                <span>{this.props.stockGameDetail.detail.stockGameName}</span>
                <span className="pl15 pr15">{this.props.stockGameDetail.detail.stage}期</span>
                <span className={this.props.storage.guessType?"cgreen":"cred"}>{this.props.storage.guessType?"猜跌":"猜涨"}</span>
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
            <ul className="bet_center pr">
                <li className="input_money_box">
                    <p className="cfff">金额：</p>
                    <input type="number"
                           className="J_betMoney input_money pl10 mr5"
                           placeholder="请输入投注金额"
                           onChange = {this.setMoney()}
                           value={this.props.betInfo.betMoney}
                           ref="xbMoney"
                    />
                    <p className="cfff">喜币</p>
                </li>
                <li className="selected_box">
                    <div className="selected_money cfff tc" onClick={this.setMoney('100')}>
                        <p className="f14">100</p>
                        <p>喜币</p>
                    </div>
                    <div className="selected_money cfff tc ml15" onClick={this.setMoney('1000')}>
                        <p className="f14" >1000</p>
                        <p>喜币</p>
                    </div>
                    <div className="selected_money cfff tc ml15" onClick={this.setMoney('10000')}>
                        <p className="f14">10000</p>
                        <p>喜币</p>
                    </div>
                </li>
                <li className="balance_box cfff ">
                    <span>余额：</span>
                    <span className="xt_money">{this.props.account.xtbTotalAmount}</span>
                    <Link to="/BuyDiamonds" className="fr cfff">获取喜币</Link>
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