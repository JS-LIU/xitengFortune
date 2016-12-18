/**
 * Created by LDQ on 2016/8/24.
 */



var React = require('react');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

require('../css/registerStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';


var Register = React.createClass({
    componentWillMount:function(){
        localStorage.clear();
        this.props.showDialogActionKeys.hideDialog();
        this.props.historyUrlsActionKeys.pushUrl('/Register');
        console.log(this.props.userInfo);
    },

    inputNum:function(){
        let num = _h.valid.trimAllBlank(this.refs.num.value + "");
        this.props.userInfoActionKeys.setPhoneNum(num);
    },

    render: function () {
        return (
            <div>
                {/*<Header*/}
                    {/*historyUrls={this.props.historyUrls}*/}
                    {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}>*/}
                    {/*<BackBtn*/}
                        {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}*/}
                        {/*back={{text:'取消',src:'/nav_btn_back@2x.png',link:'/Login'}}*/}
                    {/*/>*/}
                {/*</Header>*/}
                {this.props.userInfo.findPassword?<div className="tc f16 mt10">请输入注册的手机号</div>:
                <div className="register_user_header tc">
                    <img src={this.props.userInfo.icon} alt="" className="h"/>
                </div>}

                <div className="tc mt10">{this.props.userInfo.userName}</div>
                <ul className="mt30">
                    <li className="register_list">
                        <span>国家/地区</span>
                        <span className="pl15">中国</span>
                    </li>
                    <li className="register_list">
                        <span>+86 |</span>
                        <input
                            type="text"
                            placeholder="请输入电话号码"
                            className="register_input_none h pl15"
                            ref="num"
                            onChange={this.inputNum}
                            value={this.props.userInfo.phoneNum}
                        />
                    </li>
                </ul>
                <RegisterBtn showDialogActionKeys={this.props.showDialogActionKeys} />
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title={"确认手机号码"}/>
                    <DialogBody content={"我们将发送验证码到这个手机号："}/>
                    <DialogBody content={this.props.userInfo.phoneNum}/>
                    <DialogFooter>
                        <DialogConfirm certain={{url:"/CheckCode",text:"确认"}} />
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:"/Register",text:"取消"}}/>
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
            <div className="login_btn cfff tc f20" onClick={this.showDialog}>
                <span>下一步</span>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        showDialog:state.showDialog,
        historyUrls:state.historyUrls,
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Register);
