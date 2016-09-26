/**
 * Created by LDQ on 2016/9/21.
 */
/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/betStyle.css');

import {storageActions} from '../redux/actions/storageActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betActions} from '../redux/actions/betActions';

var Bet = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Bet');
        console.log(this.props.storage);
    },
    bet:function(){
        return ()=>{
            console.log('---bet---');
            // this.props.betActionKeys.immediatelyBet

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
                    <BetHeader />
                    <BetCenter inputMoneyAction={this.props.betActionKeys}/>
                    <div className="betBtn po tc f16 w" onClick={this.bet()}>立即投注</div>
                </div>
            </div>
        )
    }
});

var BetHeader = React.createClass({
    render: function () {
        return (
            <ul className="bet_header pr">
                <li className="bet_header_item tc cfff f16">
                    <span>上证指数</span>
                    <span>1888期</span>
                </li>
                <li className="bet_header_item tc cfff f16">
                    <span>猜涨</span>
                    <span>投注</span>
                </li>
            </ul>
        )
    }
});

var BetCenter = React.createClass({
    inputMoney:function(){
        console.log($(this.refs.XTMoney).val());
    },

    render: function () {
        return (
            <div className="bet_center pr">
                <ul>
                    <li className="input_money_box">
                        <span className="cfff">金额：</span>
                        <input type="number"
                               placeholder="请选择/输入金额"
                               className="input_money pl10 mr5"
                               ref="XTMoney"
                               onChange={this.inputMoney}/>
                        <span className="cfff">XT币</span>
                    </li>
                    <li className="selected_box">
                        <div className="selected_money cfff tc">
                            <p className="f14">100</p>
                            <p>XT币</p>
                        </div>
                        <div className="selected_money cfff tc ml15">
                            <p className="f14">1000</p>
                            <p>XT币</p>
                        </div>
                        <div className="selected_money cfff tc ml15">
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
        bet:state.bet
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        betActionKeys: bindActionCreators(betActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Bet);