/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import {openingTimeActions} from '../redux/actions/openingTimeActions'


var GuessTitle = React.createClass({
    timer:{},
    componentWillMount(){
        this.props.countInit();
        var self = this;
        self.props.countDown();
        this.timer = setInterval(function(){
            var date = new Date();
            self.props.countDown(date);
        },1000);
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        return (
            <div>
                <p>猜涨跌赢喜腾币</p>
                <p>猜{this.props.openingTime.initTime.month}月{this.props.openingTime.initTime.day}日大盘涨跌</p>
                <p>还剩：{this.props.openingTime.countDown.hour}:{this.props.openingTime.countDown.min}:{this.props.openingTime.countDown.sec}</p>

            </div>
        )
    }
});

var Guess = React.createClass({
    render: function () {
        var op = {
            initTime:this.props.initTime,
            countDown:this.props.countDown
        };
        return (
            <div>
                <GuessTitle countInit={this.props.openingTimeActionKeys.countInit} countDown={this.props.openingTimeActionKeys.countDown} openingTime={op}/>
                <div>我是猜猜</div>
            </div>
        )
    }
});



function mapStatetoProps(state){
    console.log(state.openingTime);
    return state.openingTime;
}
function mapDispatchToProps(dispatch){

    return{
        openingTimeActionKeys : bindActionCreators(openingTimeActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);