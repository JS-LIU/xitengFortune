/**
 * Created by LDQ on 2016/9/28.
 */


var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

var ExchangeXTCoins = React.createClass({
    render: function () {
        return (
            <div>我是购买钻石</div>
        )
    }
});
module.exports = ExchangeXTCoins;
