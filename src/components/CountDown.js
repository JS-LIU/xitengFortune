/**
 * Created by LDQ on 2017/2/4.
 */
var React = require('react');
var $ = require('jquery');
import _h from '../Util/HB';

var CountDown = React.createClass({

    getInitialState:function(){
        var countTime = isNaN(this.props.countTime)?0:this.props.countTime;
        return {
            countTime:countTime,
            end:this.props.end,
            step:this.props.step,
            displayMode:this.props.displayMode,
            style:this.props.style||{},
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            countTime:nextProps.countTime
        });
    },
    componentDidMount:function () {

        this.timer = setInterval(()=>{
            this.setState({
                countTime:this.state.countTime += this.state.step
            })
        },Math.abs(this.state.step));
    },
    componentWillUnmount:function(){
        this.timer && clearInterval(this.timer);
    },
    render: function () {
        return (
            <div style={this.state.style}>
                {trimTime(this.state.countTime,this.state.displayMode)}
            </div>
        )
    }
});
function paddingZero(i){
    if(i < 10){
        return "0" + i;
    }else{
        return i;
    }
}


function trimTime(time,timeMode){
    var myTime = "";
    if(timeMode.year){

    }
    if(timeMode.month){

    }
    if(timeMode.day){
        var day = parseInt(time / 86400000);
        var y = time % 86400000;
        myTime += (day + timeMode.day.text);
    }
    if(timeMode.hour){
        var h = parseInt(y / 3600000);
        y = time % 3600000;
        paddingZero(h);
        myTime += (h + timeMode.hour.text);
    }
    if(timeMode.min){
        var min = parseInt( y / 60000);
        paddingZero(min);
        y = y % 60000;
        myTime += (min + timeMode.min.text);
    }
    if(timeMode.sec){
        var sec = parseInt(y / 1000);
        sec = paddingZero(sec);
        myTime += (sec + timeMode.sec.text);
    }
    if(timeMode.ms){

    }
    return myTime;

}

module.exports = CountDown;