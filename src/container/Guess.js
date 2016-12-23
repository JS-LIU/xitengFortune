/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var $ = require('jquery');
require("../css/guessStyle.css");

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {betListActions} from '../redux/actions/betListActions';
import {awardActions} from '../redux/actions/awardActions';
import {rankActions} from '../redux/actions/rankActions';
import {activityActions} from '../redux/actions/activityActions';
import _h from '../Util/HB';



var Guess = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Guess');
        this.props.stockGameActionKeys.getGameList();
        this.props.activityActionKeys.getActivityList({path:"list"});
    },
    timer:function(){
        if($('.header_carouser_img_box').length > 1){
            var i = 1;
            setInterval(function(){
                $('.header_carouser_img_box').removeClass('opacity_show o_show');
                $('.header_carouser_img_box').eq(i).addClass('opacity_show o_show');
                i++;
                if(i == $('.guess_header_carouser_box').length + 1){
                    i = 0;
                }
            },10000);
        }
    },
    componentDidMount:function(){
        $('.header_carouser_img_box').eq(0).addClass('o_show');
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer)
    },
    render: function () {
        const stockGame = this.props.stockGame;
        return (
            <div className="common_bg">
                <ul className="guess_header_carouser_box pr">
                    <li className="w po header_carouser_img_box o_hide">
                        <img src="src/images/banner@2x.png" alt="" className="w h"/>
                    </li>
                    <li className="w po header_carouser_img_box o_hide">
                        <img src="src/images/home-Prize banner@2x (2).png" alt="" className="w h"/>
                    </li>
                </ul>
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
        )
    }
});


var StockMarketList = React.createClass({
    timer:function(){
        var time = 60000;
        if(this.props.gameList.length <= 3){
            time = 30000;
        }

        setInterval(()=>{
            this.props.gameList.map((stockItem,index)=>{
                this.props.stockGameActionKeys.refresh(stockItem.stockGameId);
            });
        },time);
    },
    componentWillMount:function(){
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
                    gameList={this.props.gameList}
                />
                <ul className="guess_stock">
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
    componentWillMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {

        return (
            <ul className="time_bg">
                <li className="tc pt10 cfff guess_next_stage_time" >
                    <span className="guess_next_stage">{this.props.gameList.length==0?"":this.props.gameList[0].stage}期</span>
                    <span>{this.props.gameTime.endMonth + 1}月{this.props.gameTime.endDate}日（周{_h.valid.parseDay(this.props.gameTime.endDay)}）</span>
                </li>
                <li className="cfff tc pt5">
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
    setGuessType:function(guessType){
        return ()=>{
            this.props.storageActionKeys.setGuessType(guessType);
        }
    },
    render: function () {
        const gameItem = this.props.gameItem;
        return (
            <li className="game_item">
                <div className="tc">
                    <img src={gameItem.picUrl} className="tc stock_game_name_pic"></img>
                </div>
                <p className="guess_stock_fund tc">
                    <span className="f20 guess_fund" style={(gameItem.stockModel.chg>0)?upStyle:downStyle}>{gameItem.stockModel.currentPoint}</span>
                    <span className="guess_fund_details" style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.chg}</span>
                    <span className="guess_fund_details_rate" style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.changeRate}%</span>
                </p>

                <Link to="/StockDetails" onClick={this.setStockId(gameItem.stockGameId)}>

                    <ul className="clearfix guessUpDown" >
                        <li className="fl tc ">
                            <p className="guess_icon_cow guess_bet_money tc">
                                <span className="guess_total_money">
                                    <img src="src/images/Home-red-flag@2x.png" alt="" className="guess_money_flag"/>
                                    <span className="guess_xt_money">{gameItem.guessUpXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                        <li className="fr tc">
                            <p className="guess_icon_bear guess_bet_money tc">
                                <span className="guess_total_money">
                                    <img src="src/images/Home-green-flag@2x.png" alt="" className="guess_money_flag"/>
                                    <span className="guess_xt_money">{gameItem.guessDownXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                    </ul>
                </Link>
                <div className="guess_btn clearfix" onClick={this.setStockId(gameItem.stockGameId)}>
                    <Link to="/Bet" className="guess_guess_up_btn fl" onClick={this.setGuessType(0)}/>
                    <Link to="/Bet" className="guess_guess_down_btn fl" onClick={this.setGuessType(1)}/>
                </div>
            </li>
        )


    }
});

var BetList = React.createClass({
    componentWillMount:function(){
        this.props.betListActionKeys.getBetList();
    },
    timer:function(){
        let time = 140000;
        setInterval(()=>{
            this.props.betListActionKeys.getBetList();
        },time);
    },
    componentDidMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        let betNodes = this.props.betList.betList.map((item,index)=>{
            return (
                <li className="bet_user clearfix f14" key={index}>
                    <div className="bet_user_header fl">
                        <img src={item.userIconUrl} alt="" className="w h"/>
                    </div>
                    <div className="bet_user_name fl cfff">
                        <span>{item.userName}</span>
                    </div>
                    <div className="fl ">
                        <span className="bet_time">刚刚</span>
                    </div>
                    <div className="fr">
                        <span className="guess_bet_current_money">投注</span>
                        <span className="guess_xt_money cfff">{item.guessXitbAmount}</span>
                    </div>
                </li>
            )
        });

        return (
            <div className="bet_user_box">
                <ul className="roll_up">
                    {betNodes}
                </ul>
            </div>
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
                <li className="rank_user clearfix f14" key={index}>
                    <span className="cfff fl pl5 pr5">{index+1}</span>
                    <div className="rank_user_header cfff fl">
                        <img src={item.iconUrl} alt="" className="w"/>
                    </div>
                    <div className="rank_user_name pl10 fl cfff">
                        <span>{item.userName}</span>
                    </div>
                    <span className="fr rank_user_bet cfff guess_xt_money">
                        {item.bonusXtbAmount}
                    </span>
                </li>
            )
        });

        return (
            <div className="pk_box">
                <div className="cfff clearfix guess_stock_god">
                    <p className="fl guess_stock_god_title">股神争霸</p>
                    <ul className="fr clearfix guess_stock_god_classify">
                        {rankTypeNodes}
                    </ul>
                </div>
                <ul className="guess_rank_list">
                    {rankUserNodes}
                </ul>
                <div className="pk_pic ml15">
                    <img src={pic_src} alt="" className="prize_pic w"/>
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
        rank:state.rank,
        activity:state.activity
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        betListActionKeys:bindActionCreators(betListActions,dispatch),
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch),
        activityActionKeys:bindActionCreators(activityActions,dispatch)

    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);

const upStyle={
    color:"#FF4242",
    background:'url("src/images/icon_arrow_up-@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const downStyle={
    color:"#02C56B",
    background:'url("src/images/icon_arrow_down@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const cred={
    color:"#FF4242"
};
const cgreen={
    color:"#02C56B"
};