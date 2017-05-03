 /**
 * Created by LDQ on 2017/2/3.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var CountDown = require('../components/CountDown');

import guessStyle from "../css/guessStyle.css";

import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import _h from '../Util/HB';


var StockMarketList = React.createClass({
    timer:function(){
        const time = 60000;

        setInterval(()=>{
            this.props.stockGame.gameList.map((stockItem,index)=>{
                this.props.stockGameActionKeys.refresh(stockItem.stockGameId);
            });
        },time);
    },
    componentWillMount:function(){
        this.props.stockGameActionKeys.getGameList();
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        var stockMarketNodes = this.props.stockGame.gameList.map((gameItem,index)=>{
            return (
                <GameItem storageActionKeys={this.props.storageActionKeys} gameItem={gameItem} key={index}/>
            )
        });
        return (
            <div>
                <GameTime
                    gameTime={this.props.stockGame.gameTime}
                    stockGameActionKeys={this.props.stockGameActionKeys}
                    countDown={this.props.stockGame.countDown}
                    gameList={this.props.stockGame.gameList}
                />
                <ul className={guessStyle.guess_stock}>
                    {stockMarketNodes}
                </ul>
            </div>
        )
    }
});

var GameTime = React.createClass({
    componentWillMount:function(){
        // this.gameTimer();
    },
    render: function () {
        const startTime = new Date().getTime();
        const countTime = this.props.gameTime.endTime - startTime;
        return (
            <ul className={guessStyle.time_bg}>
                <li className={guessStyle.guess_next_stage_time} >
                    <span className={guessStyle.guess_next_stage}>{this.props.gameList.length==0?"":this.props.gameList[0].stage}期</span>
                    <span>{this.props.gameTime.endMonth + 1}月{this.props.gameTime.endDate}日（周{_h.valid.parseDay(this.props.gameTime.endDay)}）</span>
                </li>
                <div className={guessStyle.count_down}>
                    <span className={guessStyle.count_down_icon}>截止投注：</span>
                    <CountDown
                        step={-1000}
                        countTime={countTime}
                        end={0}
                        displayMode={{day:{text:'天'},hour:{text:'时'},min:{text:'分'},sec:{text:'秒'}}}
                    />
                </div>
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
            <li className={guessStyle.game_item}>
                <div className="tc">
                    <img src={gameItem.picUrl} className={guessStyle.stock_game_name_pic}></img>
                </div>
                <p className={guessStyle.guess_stock_fund}>
                    <span className={guessStyle.guess_fund} style={(gameItem.stockModel.chg>0)?upStyle:downStyle}>{gameItem.stockModel.currentPoint}</span>
                    <span className={guessStyle.guess_fund_details} style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.chg}</span>
                    <span className={guessStyle.guess_fund_details_rate} style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.changeRate}%</span>
                </p>

                <Link to="/StockDetails" onClick={this.setStockId(gameItem.stockGameId)}>

                    <ul className={guessStyle.guessUpDown} >
                        <li className="fl tc">
                            <p className={guessStyle.guess_icon_cow}>
                                <span className={guessStyle.guess_total_money}>
                                    <img src="src/images/Home-red-flag@2x.png" alt="" className={guessStyle.guess_money_flag}/>
                                    <span className={guessStyle.guess_xt_money}>{gameItem.guessUpXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                        <li className="fr tc">
                            <p className={guessStyle.guess_icon_bear}>
                                <span className={guessStyle.guess_total_money}>
                                    <img src="src/images/Home-green-flag@2x.png" alt="" className={guessStyle.guess_money_flag}/>
                                    <span className={guessStyle.guess_xt_money}>{gameItem.guessDownXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                    </ul>
                </Link>
                <div className={guessStyle.guess_btn} onClick={this.setStockId(gameItem.stockGameId)}>
                    <Link to="/Bet" className={guessStyle.guess_guess_up_btn} onClick={this.setGuessType(0)}/>
                    <Link to="/Bet" className={guessStyle.guess_guess_down_btn} onClick={this.setGuessType(1)}/>
                </div>
            </li>
        )


    }
});


function mapStatetoProps(state){
    return {
        stockGame:state.stockGame,
        storage:state.storage,
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockMarketList);

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