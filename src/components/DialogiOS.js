/**
 * Created by LDQ on 2016/8/29.
 */
var React = require('react');
var {Link} = require('react-router');
import dialogiOSStyle from '../css/dialogiOSStyle.css';

var DialogiOS = React.createClass({

    render: function () {

        return (
            <div className={dialogiOSStyle.dialog_big_box}>
                <div className={dialogiOSStyle.dialog_body}>
                    {this.props.children}
                </div>
                <div className={dialogiOSStyle.dialog_mask}></div>
            </div>

        )
    }
});
var DialogHeader = React.createClass({
    render:function() {
        return (
            <div className={dialogiOSStyle.dialog_header}>
                {this.props.title}
            </div>
        )
    }
});

var DialogBody = React.createClass({
    render:function() {
        return (
            <div className={dialogiOSStyle.dailog_content}>
                {this.props.content}
            </div>
        )
    }
});

var DialogFooter = React.createClass({
    render:function() {
        return (
            <div className={dialogiOSStyle.dialog_footer}>
                {this.props.children}
            </div>
        )
    }
});
var DialogConfirm = React.createClass({
    hideDialog:function(){
        this.props.showDialogActionKeys.hideDialog();
    },
    render:function() {
        return (
            <div className={dialogiOSStyle.dialog_btn} onClick={this.hideDialog}>
                <Link to={this.props.certain.url} className={dialogiOSStyle.dialog_btn_color}>
                    <span>{this.props.certain.text}</span>
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
            <div className={dialogiOSStyle.dialog_btn} onClick={this.hideDialog}>
                <Link to={this.props.cancel.url}>
                    <span className={dialogiOSStyle.dialog_btn_color}>{this.props.cancel.text}</span>
                </Link>

            </div>
        )
    }
});

module.exports = {
    DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel
};