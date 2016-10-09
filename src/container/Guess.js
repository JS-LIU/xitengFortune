/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,Title} = require('../components/Header');

require("../css/guessStyle.css");

import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';


var Guess = React.createClass({
    timer:{},
    componentWillMount:function(){
        if(this.props.stockGame.gameList.length == 0){
            this.props.stockGameActionKeys.getGameList({});
        }
        this.props.historyUrlsActionKeys.pushUrl('/Guess');

    },
    componentDidMount:function(){
        var time = 60000;
        if(this.props.stockGame.gameList.length <= 3){
            time = 5000;
        }

        this.timer = setInterval(()=>{
            this.props.stockGame.gameList.map((stockItem,index)=>{
                this.props.stockGameActionKeys.refresh(stockItem.stockGameId);
            });
        },time);
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        var stockGame = this.props.stockGame;
        return (
            <div>
                <Header>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <StockMarketList
                    gameList={stockGame.gameList}
                    gameTime={stockGame.gameTime}
                    countDown={stockGame.countDown}
                    countDownAction={this.props.stockGameActionKeys.countDown}
                    setStockGameIdAction={this.props.storageActionKeys.setStockGameId}
                />
            </div>
        )
    }
});


var StockMarketList = React.createClass({

    render: function () {
        var stockMarketNodes = this.props.gameList.map((gameItem,index)=>{
            return (
                <GameItem setStockGameIdAction={this.props.setStockGameIdAction} gameItem={gameItem} key={index}/>
            )
        });
        return (
            <ul className="stockMarketListStyle" >
                <GameTime
                    gameTime={this.props.gameTime}
                    countDownAction={this.props.countDownAction}
                    countDown={this.props.countDown}
                />
                {stockMarketNodes}
            </ul>
        )
    }
});

var GameTime = React.createClass({
    timer:{},
    componentDidMount:function(){
        this.timer = setInterval(()=>{
            this.props.countDownAction(
                new Date(),
                this.props.gameTime.startTime,
                this.props.gameTime.endTime
            );
        },1000);
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
            <ul>
                <li className="tc f14 pt10" style={countDownStyle}>猜股市收盘涨跌</li>
                <li className="tc f20 pt5" style={nowTimeStyle}>{month}月{ri}日（周{day}）</li>
                <li className="tc f16 pt5" style={countDownStyle}>距离{this.props.countDown.startOrEnd}还剩:{this.props.countDown.countDownTime}</li>
            </ul>
        )
    }
});


var GameItem = React.createClass({
    setStockId:function(stockGameId){
        return ()=>{
            this.props.setStockGameIdAction(stockGameId);
        }
    },
    render: function () {
        var gameItem = this.props.gameItem;
        return (
            <li className="gameItemStyle pb30">
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

const guessItemLeft = {
    width:"37%"
};
const guessItemRight = {
    width:"40%"
};
const stockMarketCenterFooter = {
    margin:"0 auto",
    width:"80px",
    height:"50px",
    background:"url('/item_game_go.png') no-repeat center",
    backgroundSize:"contain"
};
const nowTimeStyle = {
    color:"#FF3B18"
};
const countDownStyle = {
    color:"#FFF"
};


function mapStatetoProps(state){
    return {
        stockGame:state.stockGame,
        storage:state.storage,
        historyUrls:state.historyUrls
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);