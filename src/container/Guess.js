/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,Title} = require('../components/Header');
import {stockGameActions} from '../redux/actions/stockGameActions'


var Guess = React.createClass({
    componentWillMount:function(){
        this.props.stockGameActionsKeys.getGameList({});
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
                <StockMarketList gameList={stockGame.gameList}/>
            </div>
        )
    }
});




var StockMarketList = React.createClass({

    render: function () {
        var stockMarketNodes = this.props.gameList.map((gameItem,index)=>{
            return (
                <li key={index}>
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
                            <div style={stockMarketCenterFooter}>
                                {/*<Link to="/"/>*/}
                            </div>
                        </div>
                    </div>
                </li>
            )
        });


        return (
            <ul style={stockMarketListStyle}>
                {stockMarketNodes}
            </ul>
        )
    }
});



const stockMarketListStyle = {
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
    height:"60px",
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


function mapStatetoProps(state){
    // console.log(state.openingTime);
    return {stockGame:state.stockGame};
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionsKeys : bindActionCreators(stockGameActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);