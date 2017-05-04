/**
 * Created by LDQ on 2016/8/30.
 */
var React = require('react');
var $ = require('jquery');
var {Header,BackBtn,Title} = require('../components/Header');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var {Link} = require('react-router');
var { connect } = require('react-redux');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');


import registerStyle from '../css/registerStyle.css';

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {dialogActions} from '../redux/actions/dialogActions';

var CheckCode = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/CheckCode');
        this.props.showDialogActionKeys.hideDialog();
        let timer = parseInt(this.props.userInfo.timer);
        let initTime = 60;
        //  如果在倒计时 且等于初始值 则立即发送验证码 并开始倒计时
        if(timer == initTime){
            this.props.userInfoActionKeys.getCheckCode();
            this.props.userInfoActionKeys.startTimer(timer);
        }
    },
    getCheckCode:function(){
        if(isNaN(parseInt(this.props.userInfo.timer))){
            this.props.userInfoActionKeys.getCheckCode();
            this.props.userInfoActionKeys.startTimer(60);
        }
    },
    checkCheckCode:function(){
        if(this.refs.checkCode.value !== this.props.userInfo.checkCode){
            this.props.showDialogActionKeys.showDialog();
        }
    },
    render: function () {
        // var backUrl = this.props.historyUrls.last;

        return (
            <div>
                {/*<Header*/}
                    {/*historyUrls={this.props.historyUrls}*/}
                    {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}>*/}
                    {/*<BackBtn*/}
                        {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}*/}
                        {/*back={{text:'取消',src:'/nav_btn_back@2x.png',link:backUrl}}*/}
                    {/*/>*/}
                {/*</Header>*/}
                <div className={registerStyle.register_hint}>短信验证码已发送至你的手机</div>
                <div className={registerStyle.register_code}>请填写验证码</div>
                <ul className={registerStyle.register_detail}>
                    <li className={registerStyle.register_list}>
                        <span>手机号</span>
                        <span className={registerStyle.registe_num}>{this.props.userInfo.phoneNum}</span>
                    </li>
                    <li className={registerStyle.register_list}>
                        <span>验证码</span>
                        <input
                            className={registerStyle.J_myCheckCode}
                            type="text"
                            ref="checkCode"
                            onChange={this.inputCheckCode}/>
                        <div className={registerStyle.register_send_checkcode} onClick={this.getCheckCode}>
                            <span>{this.props.userInfo.timer}</span>
                        </div>
                    </li>
                </ul>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title={"验证码错误"}/>
                    <DialogBody content={"手机验证码错误"}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:"/Register",text:"取消"}}/>
                    </DialogFooter>
                </DialogiOS>:''}
                <Link to={this.props.showDialog.showDialog?"/CheckCode":"/SetPassword"} className={registerStyle.next_btn} onClick={this.checkCheckCode}>
                    <span className={registerStyle.cfff}>下一步</span>
                </Link>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(CheckCode);