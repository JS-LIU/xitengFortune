/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,Title} = require('../components/Header');
var $ = require('jquery');

require("../css/guessStyle.css");

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {betListActions} from '../redux/actions/betListActions';
import {awardActions} from '../redux/actions/awardActions';
import {rankActions} from '../redux/actions/rankActions';
import _h from '../Util/HB';



var Guess = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Guess');
    },
    render: function () {
        var stockGame = this.props.stockGame;
        return (
            <div>
                <Header>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <div>
                    <StockMarketList
                        gameList={stockGame.gameList}
                        gameTime={stockGame.gameTime}
                        countDown={stockGame.countDown}
                        stockGameActionKeys={this.props.stockGameActionKeys}
                        storageActionKeys={this.props.storageActionKeys}
                    />
                    <BetList
                        betListActionKeys={this.props.betListActionKeys}
                        betList={this.props.betList}
                    />
                    <Rank
                        awardList={this.props.award.awardList}
                        awardActionKeys={this.props.awardActionKeys}
                        rank={this.props.rank}
                        rankActionKeys={this.props.rankActionKeys}
                    />
                </div>

            </div>
        )
    }
});


var StockMarketList = React.createClass({
    timer:function(){
        var time = 60000;
        if(this.props.gameList.length <= 3){
            time = 5000;
        }

        this.timer = setInterval(()=>{
            this.props.gameList.map((stockItem,index)=>{
                this.props.stockGameActionKeys.refresh(stockItem.stockGameId);
            });
        },time);
    },
    componentWillMount:function(){
        if(this.props.gameList.length == 0){
            this.props.stockGameActionKeys.getGameList();
        }
    },
    componentDidMount:function(){
        this.timer();


    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        var stockMarketNodes = this.props.gameList.map((gameItem,index)=>{
            return (
                <GameItem storageActionKeys={this.props.storageActionKeys} gameItem={gameItem} key={index}/>
            )
        });
        return (
            <div>
                <GameTime
                    gameTime={this.props.gameTime}
                    stockGameActionKeys={this.props.stockGameActionKeys}
                    countDown={this.props.countDown}
                />
                <ul className="common_bg">
                    {stockMarketNodes}
                </ul>
            </div>
        )
    }
});

var GameTime = React.createClass({
    timer:function(){
        setInterval(()=>{
            this.props.stockGameActionKeys.countDown(
                new Date(),
                this.props.gameTime.startTime,
                this.props.gameTime.endTime
            );
        },1000);
    },
    componentDidMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        var date = new Date();
        var month = date.getMonth()+1;
        var ri = date.getDate();
        var day = date.getDay();
        return (
            <ul className="time_bg">
                <li className="count_down_title fb tc f14 pt10 cfff">猜股市涨跌</li>
                <li className="tc f18 pt10 cfff" >{month}月{ri}日（周{_h.valid.parseDay(day)}）</li>
                <li className="cfff tc f16 pt5 pb15">
                    <span className="count_down_icon">截止投注:{this.props.countDown.countDownTime}</span>
                </li>
            </ul>
        )
    }
});


var GameItem = React.createClass({
    setStockId:function(stockGameId){
        return ()=>{
            this.props.storageActionKeys.setStockGameId(stockGameId);
        }
    },
    render: function () {
        var gameItem = this.props.gameItem;
        return (
            <li className="game_item pb30">
                <p className="tc f20 cfff pt20">{gameItem.stockGameName}</p>
                <p className="up_down f16 tc cred">
                    <span className="pr5">{gameItem.stockModel.currentPoint}</span>
                    <span className="pr5">{gameItem.stockModel.chg}</span>
                    <span className="pr5">{gameItem.stockModel.changeRate}%</span>
                </p>
                <Link to="/StockDetails" onClick={this.setStockId(gameItem.stockGameId)}>
                    <img src="/btn_go@2x.png" alt="" className="stockMarketPic pt5"/>
                    <ul className="clearfix guessUpDown" >
                        <li className="fl tc f16 cfff">
                            <p className="f16">
                                <span className="xt_money">猜涨:</span>
                                <span className="pl5">{gameItem.guessUpXtBAmount}</span>
                            </p>
                        </li>
                        <li className="fr tc f16 cfff">
                            <p className="f16">
                                <span className="xt_money">猜跌:</span>
                                <span className="pl5">{gameItem.guessDownXtBAmount}</span>
                            </p>
                        </li>
                    </ul>
                </Link>
            </li>
        )
    }
});

var BetList = React.createClass({
    componentWillMount:function(){
        this.props.betListActionKeys.getBetList();
    },

    render: function () {
        let betNodes = this.props.betList.betList.map((item,index)=>{
            return (
                <li className="bet_user clearfix f14" key={index}>
                    <div className="bet_user_header fl">
                        <img src={item.userIconUrl} alt="" className="w"/>
                    </div>
                    <div className="bet_user_name pl10 fl cfff">
                        <span>{item.userName}</span>
                    </div>
                    <div className="fl">
                        <span>刚刚投注</span>
                    </div>
                    <div className="fr">
                        <span className="bet_user_bet cfff">{item.guessXitbAmount}</span>
                    </div>
                </li>
            )
        });

        return (
            <ul className="bet_user_box common_bg">
                {betNodes}
            </ul>
        )
    }
});

var Rank = React.createClass({
    componentWillMount:function(){
        this.props.awardActionKeys.getAward(3);
        this.props.rankActionKeys.getRank();
    },
    cutRank:function(id,type){
        return ()=>{
            this.props.awardActionKeys.getAward(id);
            this.props.rankActionKeys.selected(id);
            this.props.rankActionKeys.getRank(0,type,3);
        }
    },
    render: function () {
        let pic_src = this.props.awardList[0].productInfo.picUrl;
        let rankTypeNodes = this.props.rank.rankType.map((item,index)=>{
            return (
                <li className="J_ranktype fl cfff pl5 pr5"
                    style={item.selected?{color:"#FF4242"}:{}}
                    key={index}
                    onClick={this.cutRank(item.id,item.type)}>
                    <span>{item.title}排行</span>
                </li>
            )
        });
        let rankUserNodes = this.props.rank.rankList.map((item,index)=>{
            return (
                <li className="rank_user clearfix">
                    <span className="cfff fl">{index}</span>
                    <div className="rank_user_header cfff fl">
                        <img src={item.iconUrl} alt="" className="w"/>
                    </div>
                    <span className="fr rank_user_bet cfff">

                    </span>
                </li>
            )
        });

        return (
            <div className="common_bg pk_box">
                <div className="pk_title cfff pl15 clearfix">
                    <p className="f20 fl">股神争霸</p>
                    <ul className="fr clearfix f14 pr10">
                        {rankTypeNodes}
                    </ul>
                </div>
                <div className="pk_pic ml15">
                    <img src={pic_src} alt="" className="w"/>
                </div>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        stockGame:state.stockGame,
        storage:state.storage,
        betList:state.betList,
        award:state.award,
        rank:state.rank
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        betListActionKeys:bindActionCreators(betListActions,dispatch),
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch)

    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);