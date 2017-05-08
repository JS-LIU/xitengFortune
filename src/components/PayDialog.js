/**
 * Created by LDQ on 2017/4/6.
 */

const React = require('react');
const {Link} = require('react-router');

import payDialogStyle from '../css/payDialogStyle.css';

const PayDialog = React.createClass({
    render: function (){
        return (
            <div>
                <div className={payDialogStyle.shade}></div>
                <div className = {payDialogStyle.payDialog}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})

const PayDialogHeader  = React.createClass({

    render: function () {
        return (
            <div className = {payDialogStyle.payDialog_head}>
                <div className ={payDialogStyle.payDialog_head_close} onClick={this.props.hideDialog}>x</div>
                <p>{this.props.title}</p>
            </div>
        )
    }
});

const PayDialogBody = React.createClass({


    render: function () {
        return (
            <div className = {payDialogStyle.payDialog_body}>
                {this.props.children}
            </div>
        )
    }
});

const PayMoney = React.createClass({

    render: function () {
        return (
            <div>
                <p className ={payDialogStyle.payDialog_body_title}>{this.props.money.text}</p>
                <p className ={payDialogStyle.payDialog_body_money}>
                    <img src={this.props.money.icon} alt=""/>
                    <span>{this.props.money.total}</span>
                </p>
            </div>
        )
    }
});

const PayWay = React.createClass({

    render: function () {
        return (
            <div className = {payDialogStyle.payDialog_payWay}>
                <Link to={this.props.link.url}>
                    <p>
                        <img src={this.props.link.icon} className={payDialogStyle.payDialog_payWay_icon} alt=""/>
                        <span className={payDialogStyle.payDialog_payWay_way}>{this.props.link.text}</span>
                    </p>
                </Link>
            </div>
        )
    }
});

module.exports = {
    PayDialogHeader,PayDialogBody,PayMoney,PayWay,PayDialog
};