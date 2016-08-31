/**
 * Created by LDQ on 2016/8/24.
 */



var React = require('react');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');
var ConfirmBtn = require('../components/ConfirmBtn');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {dialogActions} from '../redux/actions/dialogActions'

var Register = React.createClass({
    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
    },

    inputNum:function(){
        let num = _h.valid.trimAllBlank(this.refs.num.value + "");
        this.props.userInfoActionKeys.setPhoneNum(num);
    },

    render: function () {
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'取消'}}/>
                </Header>
                <div className="tc f16">请输入你的手机号</div>
                <ul className="mt30">
                    <li style={listStyle}>
                        <span>国家/地区</span>
                        <input style={inputStyle} className="h" type="text"/>
                    </li>
                    <li style={listStyle}>
                        <span>+86 |</span>
                        <input
                            type="text"
                            placeholder="请输入电话号码"
                            style={inputStyle}
                            className="h"
                            ref="num"
                            onChange={this.inputNum}
                            value={this.props.userInfo.phoneNum}
                        />
                    </li>
                </ul>
                <RegisterBtn showDialogActionKeys={this.props.showDialogActionKeys}>
                    <ConfirmBtn text={'确定'}/>
                </RegisterBtn>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="确认手机号码"/>
                    <DialogBody content={"我们将发送验证码到这个手机号："+this.props.userInfo.phoneNum}/>
                    <DialogFooter>
                        <DialogConfirm url={'/CheckCode'} />
                        <DialogCancel showDialogActionKeys={this.props.showDialogActionKeys}/>
                    </DialogFooter>
                </DialogiOS>:''}

            </div>
        )
    }
});
var RegisterBtn = React.createClass({
    showDialog:function(){
        this.props.showDialogActionKeys.showDialog();
    },
    render: function () {
        return (
            <div onClick={this.showDialog}>
                {this.props.children}
            </div>
        )
    }
});

const listStyle = {
    height:'44px',
    lineHeight:'44px',
    borderBottom:'1px solid #E2E2E2',
    margin:"0px 15px"
};
const inputStyle = {
    paddingLeft:"15px",
    outline:"none"
};


function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Register);
