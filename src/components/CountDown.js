/**
 * Created by LDQ on 2017/2/4.
 */
var React = require('react');
var $ = require('jquery');
import _h from '../Util/HB';

var CountDown = React.createClass({

    timer:function(){
        setInterval(()=>{
            this.setState({
                countTime:this.state.countTime += this.state.step
            })
        },Math.abs(this.state.step));

    },
    getInitialState:function(){
        var countTime = isNaN(this.props.countTime)?0:this.props.countTime;
        return {
            countTime:countTime,
            end:this.props.end,
            step:this.props.step
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            countTime:nextProps.countTime
        });
    },
    componentDidMount:function () {
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        return (
            <div>
                {trimTime(this.state.countTime)}
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

function trimTime(time){
    var day = parseInt(time / 86400000);

    var y = time % 86400000;

    var h = parseInt(y / 3600000);
    h = paddingZero(h);

    y = time % 3600000;
    var min = parseInt( y / 60000);
    min = paddingZero(min);

    y = y % 60000;
    var sec = parseInt(y / 1000);
    sec = paddingZero(sec);

    return day+"天"+h + "时" + min + "分" + sec + "秒";

}

module.exports = CountDown;