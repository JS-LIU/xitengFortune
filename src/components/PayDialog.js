/**
 * Created by LDQ on 2017/4/6.
 */

const React = require('react');
const {Link} = require('react-router');

const PayDialogHeader  = React.createClass({

    render: function () {
        return (
            <div>
                <div onClick={this.props.hideDialog}>x</div>
                <p>{this.props.title}</p>
            </div>
        )
    }
});

const PayDialogBody = React.createClass({


    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

const PayMoney = React.createClass({

    render: function () {
        return (
            <div>
                {this.props.money.text}
                {/*{this.props.money.icon}*/}
                {this.props.money.total}
            </div>
        )
    }
});

const PayWay = React.createClass({

    render: function () {
        return (
            <div>
                <Link to={this.props.link.url}>
                    <p>{this.props.link.text}</p>
                </Link>
            </div>
        )
    }
});

module.exports = {
    PayDialogHeader,PayDialogBody,PayMoney,PayWay
};