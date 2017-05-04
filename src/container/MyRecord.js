/**
 * Created by LDQ on 2016/10/27.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var _h = require('../Util/HB');

import MyStyle from '../css/MyStyle.css';


import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betRecordActions} from '../redux/actions/betRecordActions';
import {loginInfoActions} from '../redux/actions/loginInfoActions';

var MyRecord = React.createClass({
    componentWillMount:function(){
        this.props.loginInfoActionKeys.wxLogin();
        this.props.historyUrlsActionKeys.pushUrl('/MyRecord');
        setTimeout(()=>{
            this.props.betRecordActionKeys.getBetRecord();
            this.props.betRecordActionKeys.getBetList();
        },100);

    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.betRecord.last){
                let pageNo = this.props.betRecord.pageNo + 1;
                this.props.betRecordActionKeys.getBetList(pageNo);
            }
        });
    },
    render: function () {
        return (
            <div className="h po f5f5f5 w">
                <RecordOverView betRecord={this.props.betRecord}/>
                <BetRecordList betRecord={this.props.betRecord}/>
            </div>
        )
    }
});

var RecordOverView = React.createClass({
    render: function () {
        return (
            <div className={MyStyle.record_bet}>
                <ul>
                    <li className={MyStyle.record_bet_info_money}>
                        <ul className={MyStyle.record_bet_info_top}>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.cumulativeBetAmount}</span>
                                    <span>喜腾币</span>
                                </p>
                                <span>投注金额</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.addProfit}</span>
                                    <span>喜腾币</span>
                                </p>
                                <span>累计盈利</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.yields}</span>
                                </p>

                                <span>收益率</span>
                            </li>
                        </ul>
                    </li>
                    <li className={MyStyle.record_bet_info_num}>
                        <ul className={MyStyle.record_bet_info_bottom}>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.addGuessAmount}</span>
                                </p>

                                <span>投注次数</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.hitAmount}</span>
                                </p>
                                <span>猜中次数</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className={MyStyle.record_bet_info_detail}>{this.props.betRecord.overView.hitRate}</span>
                                </p>
                                <span>收益率</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
});


var BetRecordList = React.createClass({
    render: function () {
        let betRecordNodes = this.props.betRecord.detailList.map((item,index)=>{
            return (
                <li key={index} className={MyStyle.bet_record_list}>
                    <ul>
                        <li className={MyStyle.bet_record_time}>
                            <span className={myStyle.bet_record_box}>投注时间：{item.guessTime}</span>
                            <span className={MyStyle.record_praise_num}>{item.praiseAmount}人赞赏</span>
                        </li>
                    </ul>
                    <ul className={MyStyle.bet_record_detail}>
                        <li className={myStyle.bet_record_detail_info}>
                            <span>名称：{item.stockName}</span>
                        </li>
                        <li className={myStyle.bet_record_detail_stage}>
                            <span className={MyStyle.record_praise}>{item.stage}期</span>
                        </li>
                    </ul>
                    <ul className={MyStyle.bet_record_detail}>
                        <li className={myStyle.bet_record_box}>
                            <span>投注：{item.guessType}</span>
                        </li>
                        <li className={myStyle.bet_record_detail_stage}>
                            <span className={MyStyle.record_praise}>数额：{item.guessAmount}喜腾币</span>
                        </li>
                    </ul>
                    <ul className={MyStyle.bet_record_detail}>
                        <li className={myStyle.bet_record_box}>
                            <span>收盘：{item.stockResultType=="wrong"?"未收盘":"已收盘"}</span>
                        </li>
                        <li className={myStyle.bet_record_detail_stage}>
                            <span className={MyStyle.record_praise}>盈亏：{isNaN(item.guessResultAmount)?item.guessResultAmount:item.guessResultAmount+"喜腾币"}</span>
                        </li>
                    </ul>
                </li>
            )
        });

        return (
            <ul>
                {betRecordNodes}
            </ul>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        betRecord:state.betRecord,
        loginInfo:state.loginInfo,
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        betRecordActionKeys:bindActionCreators(betRecordActions,dispatch),
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(MyRecord);