/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,Title} = require('../components/Header');


import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';

var Guess = React.createClass({
    timer:{},
    componentWillMount:function(){
        if(this.props.stockGame.gameList.length == 0){
            this.props.stockGameActionKeys.getGameList({});
        }
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
                <div className="clearfix">
                    <img src="/caicai_ad.png" className="fl w"/>
                </div>
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
            <ul style={stockMarketListStyle}>
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
    setStockId:function(stockCode){
        var stockCode = stockCode;
        var self = this;
        return function(){
            self.props.setStockGameIdAction(stockCode);
        }
    },
    render: function () {
        var gameItem = this.props.gameItem;
        return (
            <li style={gameItemStyle}>
                <div className="tc f20" style={stockMarketHead}>
                    {gameItem.stockGameName}
                </div>
                <div>
                    <div className="f16 tc" style={stockMarketCenterTop}>
                        <span className="pr5">{gameItem.stockModel.currentPoint}</span>
                        <span className="pr5">{gameItem.stockModel.chg}</span>
                        <span className="pr5">{gameItem.stockModel.changeRate}%</span>
                    </div>

                    <div style={stockMarketCenterBody}>
                        <img src="/lg_1@3x.png" alt="" className="pt20" style={stockMarketPic}/>
                        <ul className="clearfix" style={guessUpDown}>
                            <li className="fl tc f16" style={guessItemLeft}>
                                <p className="f16">猜涨总额</p>
                                {gameItem.guessUpXtBAmount}XT币
                            </li>
                            <li className="fr tc f16" style={guessItemRight}>
                                <p className="f16">猜跌总额</p>
                                {gameItem.guessDownXtBAmount}XT币
                            </li>
                        </ul>
                        <Link to="/stockDetails" onClick={this.setStockId(gameItem.stockCode)}>
                            <div style={stockMarketCenterFooter}></div>
                        </Link>

                    </div>
                </div>
            </li>
        )
    }
});



const gameItemStyle = {
    paddingBottom:"20px",
};


const stockMarketListStyle = {
    marginBottom:"44px",
    background:"url('/caicai_bg.png') no-repeat center",
    backgroundSize:"content"
};

const stockMarketHead = {
    position:"relative",
    margin:"0 auto",
    width:"186px",
    height:"60px",
    lineHeight:"70px",
    background:"url('/head@2x.png') no-repeat center",
    backgroundSize:'cover',
    color:"#FF3B18",
    zIndex:"1"
};
const stockMarketCenterTop = {
    margin:"-14px 14px 0px",
    paddingBottom:"20px",
    height:"40px",
    lineHeight:"70px",
    background:"#C7E7FE",
    borderTopLeftRadius:"6px",
    borderTopRightRadius:"6px",
    color:"#FF3B18"
};
const stockMarketCenterBody = {
    margin:"0px 14px",
    background:"#FFF",
    borderBottomLeftRadius:"6px",
    borderBottomRightRadius:"6px"
};
const stockMarketPic = {
    display:'block',
    margin:'auto',
    width:'calc(100% - 100px)'
};
const guessUpDown = {
    margin:"0px 30px",
    lineHeight:"25px"
};
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
    // console.log(state.openingTime);
    return {
        stockGame:state.stockGame,
        storage:state.storage
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);