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

var DialogFooter = React.createClass({
    render:function() {
        return (
            <div style={dialogFooterStyle}>
                {this.props.children}
            </div>
        )
    }
});
var DialogConfirm = React.createClass({
    render:function() {
        return (
            <div style={dialogBtnSytle}>
                <Link to={this.props.url} className="tc f14">
                    确定
                </Link>
            </div>

        )
    }
});
var DialogCancel = React.createClass({
    hideDialog:function(){
        this.props.showDialogActionKeys.hideDialog();
    },
    render:function() {
        return (
            <div style={dialogBtnSytle} className="tc f14" onClick={this.hideDialog}>
                取消
            </div>
        )
    }
});
var  dialogiOSStyle = {
    width:"calc(100% - 100px)",
    margin:'0 auto'
};

const dialogFooterStyle = {
    display:"flex"
};
const dialogBtnSytle = {
    flexGrow:'1'
};
module.exports = {
    DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel
};