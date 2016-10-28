/**
 * Created by LDQ on 2016/10/27.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,Title,BackBtn } = require('../components/Header');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/MyStyle.css');


import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betRecordActions} from '../redux/actions/betRecordActions';

var MyRecord = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/MyAsset');
        this.props.betRecordActionKeys.getBetRecord();
        this.props.betRecordActionKeys.getBetList();
    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.betRecord.last){
                let pageNo = this.props.betRecord.pageNo + 1;
                this.props.betRecordActionKeys.getBetList(['time'],pageNo);
            }
        });
    },
    render: function () {
        return (
            <div className="h po f5f5f5 w">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:"/My"}}
                    />
                    <Title title={{text:'投注记录'}}></Title>
                </Header>
                <RecordOverView betRecord={this.props.betRecord}/>
                <BetRecordList betRecord={this.props.betRecord}/>
            </div>
        )
    }
});

var RecordOverView = React.createClass({
    render: function () {
        return (
            <div className="record_bet">
                <ul>
                    <li className="record_bet_info_money cgold">
                        <ul className="record_bet_info_top w pb15 f14">
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.cumulativeBetAmount}</span>
                                    <span>喜腾币</span>
                                </p>
                                <span>投注金额</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.addProfit}</span>
                                    <span>喜腾币</span>
                                </p>
                                <span>累计盈利</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.yields}</span>
                                </p>

                                <span>收益率</span>
                            </li>
                        </ul>
                    </li>
                    <li className="record_bet_info_num cgold">
                        <ul className="record_bet_info_bottom w pb15 f14">
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.addGuessAmount}</span>
                                </p>

                                <span>投注次数</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.hitAmount}</span>
                                </p>
                                <span>猜中次数</span>
                            </li>
                            <li>
                                <p className="tc">
                                    <span className="f20">{this.props.betRecord.overView.hitRate}</span>
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
                <li key={index}>
                    <ul>
                        <li>
                            <span>投注时间：{item.guessTime}</span>
                        </li>
                        <li>
                            <span className="record_praise">{item.praiseAmount}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>名称：{item.stockName}</span>
                        </li>
                        <li>
                            <span className="record_praise">{item.stockNumber}期</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>投注：{item.guessType}</span>
                        </li>
                        <li>
                            <span className="record_praise">数额：{item.guessAmount}喜腾币</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>收盘：{item.stockResultType}</span>
                        </li>
                        <li>
                            <span className="record_praise">盈亏：{item.guessResultAmount}喜腾币</span>
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
        userInfo:state.userInfo
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        betRecordActionKeys:bindActionCreators(betRecordActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(MyRecord);