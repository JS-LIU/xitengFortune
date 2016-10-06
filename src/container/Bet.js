/**
 * Created by LDQ on 2016/9/21.
 */
var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/betStyle.css');

import {storageActions} from '../redux/actions/storageActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betActions} from '../redux/actions/betActions';
import {dialogActions} from '../redux/actions/dialogActions';

var Bet = React.createClass({

    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
        this.props.historyUrlsActionKeys.pushUrl('/Bet');
    },
    bet:function(){
        return ()=>{
            let money = parseInt($('.J_betMoney').val());
            this.props.betActionKeys.immediatelyBet(money);
        }
    },
    render: function () {
        return (
            <div>
                <Header historyUrls={this.props.historyUrls}
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        back={{text:'取消',src:'/nav_btn_back@2x.png',link:'/StockDetails'}}
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}/>
                    <Title title={{text:'投注'}} />
                </Header>
                <div className="center po w">
                    <img src="/lg_light1@2x.png" alt="" className="bgLight po"/>
                    <BetHeader storage={this.props.storage}/>
                    <BetCenter inputMoneyAction={this.props.betActionKeys}/>
                    <div className="betBtn po tc f16 w" onClick={this.bet()}>立即投注</div>
                </div>

                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="喜腾币不足"/>
                    <DialogBody content={"请您去兑换喜腾币"}/>
                    <DialogFooter>
                        <DialogCancel showDialogActionKeys={this.props.showDialogActionKeys}/>
                        <DialogConfirm url={'/ExchangeXTCoins'} />
                    </DialogFooter>
                </DialogiOS>:''}
            </div>
        )
    }
});

var BetHeader = React.createClass({
    render: function () {
        let upOrDown = "猜涨";
        if(this.props.storage.guessType){
            upOrDown = "猜跌";
        }
        return (
            <ul className="bet_header pr">
                <li className="bet_header_item tc cfff f16">
                    <span>上证指数</span>
                    <span>1888期</span>
                </li>
                <li className="bet_header_item tc cfff f16">
                    <span>{upOrDown}</span>
                    <span>投注</span>
                </li>
            </ul>
        )
    }
});

var BetCenter = React.createClass({
    betQuickly:function(money){
        return ()=>{
            $('.J_betMoney').val(money);
        };

    },
    render: function () {
        return (
            <div className="bet_center pr">
                <ul>
                    <li className="input_money_box">
                        <span className="cfff">金额：</span>
                        <input type="number"
                               placeholder="请选择/输入金额"
                               className="J_betMoney input_money pl10 mr5"
                               ref="XTMoney"/>
                        <span className="cfff">XT币</span>
                    </li>
                    <li className="selected_box">
                        <div className="selected_money cfff tc" onClick={this.betQuickly(100)}>
                            <p className="f14">100</p>
                            <p>XT币</p>
                        </div>
                        <div className="selected_money cfff tc ml15" onClick={this.betQuickly(1000)}>
                            <p className="f14" >1000</p>
                            <p>XT币</p>
                        </div>
                        <div className="selected_money cfff tc ml15" onClick={this.betQuickly(10000)}>
                            <p className="f14">10000</p>
                            <p>XT币</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
});
module.exports = BetCenter;

function mapStatetoProps(state){
    return {
        storage:state.storage,
        historyUrls:state.historyUrls,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        betActionKeys: bindActionCreators(betActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Bet);