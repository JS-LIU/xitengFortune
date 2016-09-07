/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Header,Title} = require('../components/Header');
import {gameListActions} from '../redux/actions/gameListActions'

var GuessTitle = React.createClass({
    timer:{},
    componentWillMount(){
        // this.props.countInit();
        // var self = this;
        // self.props.countDown();
        // this.timer = setInterval(function(){
        //     var date = new Date();
        //     self.props.countDown(date);
        // },1000);
    },
    componentWillUnmount:function(){
        // clearInterval(this.timer);
    },
    render: function () {
        return (
            <div>
                <p className="tc">猜股市收盘涨跌</p>
                <p>8月1日</p>
                <p>1:1:1</p>

            </div>
        )
    }
});

var Guess = React.createClass({
    render: function () {
        return (
            <div>
                <Header>
                    <Title title={{text:'喜腾'}}></Title>
                </Header>
                <img src="/caicai_ad.png" className="fl" style={headerPic}/>
                <StockMarketList />
            </div>
        )
    }
});
var StockMarketList = React.createClass({
    render: function () {
        var op = {
            initTime:this.props.initTime,
            countDown:this.props.countDown
        };
        return (
            <div style={stockMarketListStyle}>
                <GuessTitle />
            </div>
        )
    }
});



const headerPic = {
    height:"140px",
};

const stockMarketListStyle = {
    background:"url('/caicai_bg.png') no-repeat center",
    backgroundSize:"content"
};

function mapStatetoProps(state){
    // console.log(state.openingTime);
    return state.gameList;
}
function mapDispatchToProps(dispatch){

    return{
        gameListActionKeys : bindActionCreators(gameListActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);