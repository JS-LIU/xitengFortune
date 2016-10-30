/**
 * Created by LDQ on 2016/8/24.
 */
var React = require('react');
var {Header,BackBtn,Title} = require('../components/Header');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

require('../css/loginStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';

var Login = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Login');
    },
    render: function () {
        var backUrl = this.props.historyUrls.last;
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'取消',src:'/nav_btn_back@2x.png',link:backUrl}}
                    />
                </Header>
                <div className="login_logo tc"></div>

                <LoginInput />
                <LoginBtn userInfoActionKeys={this.props.userInfoActionKeys}/>

                <WxBtn userInfoActionKeys={this.props.userInfoActionKeys} />

            </div>

        )
    }
});

var LoginInput = React.createClass({
    render: function () {
        return (
            <ul className="login_input ml15 mr15 f16">
                <li>
                    <span className="pr30">帐号</span>
                    <input type="text" placeholder="请输入绑定的手机号" className="login_phone_num f16"/>
                </li>
                <li>
                    <span className="pr30">密码</span>
                    <input type="password" placeholder="请输入密码" className="login_password f16"/>
                </li>
            </ul>
        )
    }
});

var LoginBtn = React.createClass({
    login:function(){
        // this.props.userInfoActionKeys.testLogin();
        this.props.userInfoActionKeys.phoneNumLogin();
    },
    render: function () {
        return (
            <div className="login_btn cfff tc f20" onClick={this.login}>
                <span>登录</span>
            </div>
        )
    }
});


var WxBtn = React.createClass({
    logIn:function(){

        this.props.userInfoActionKeys.login();
    },
    render: function () {
        return (
            <div className="cblue f16 tc login_wx w" onClick={this.logIn}>
                <span className="login_wx_btn">使用微信注册/登录</span>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Login);
