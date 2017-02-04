/**
 * Created by LDQ on 2017/2/4.
 */
var React = require('react');
var $ = require('jquery');
import _h from '../Util/HB';

var CountDown = React.createClass({

    timer:function(){
    },
    getInitialState:function(){
        return {
            start:this.props.start,
            end:this.props.end,
            step:this.props.step
        }
    },
    componentWillReceiveProps:function(nextProps){
    },
    componentDidMount:function () {
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        console.log(this.state.start)
    }
});


module.exports = CountDown;