/**
 * Created by LDQ on 2016/8/29.
 */
var React = require('react');
var {Link} = require('react-router');

var DialogiOS = React.createClass({
    render: function () {
        return (
            <div style={dialogiOSStyle}>
                {this.props.children}
            </div>
        )
    }
});
var DialogHeader = React.createClass({
    render:function() {
        return (
            <div className="tc f14">
                {this.props.title}
            </div>
        )
    }
});

var DialogBody = React.createClass({
    render:function() {
        return (
            <div className="tc f14">
                {this.props.content}
            </div>
        )
    }
});
var DialogConfirm = React.createClass({
    render:function() {
        return (
            <div>
                <Link to={this.props.url} className="tc f14">
                    确定
                </Link>
            </div>

        )
    }
});
var DialogCancel = React.createClass({
    render:function() {
        return (
            <div className="tc f14">
                {this.props.content}
            </div>
        )
    }
});
const dialogiOSStyle = {
    width:"calc(100% - 100px)",
    margin:'0 auto'
};



module.exports = {
    DialogiOS,DialogHeader,DialogBody,DialogConfirm,DialogCancel
};