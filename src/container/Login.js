/**
 * Created by LDQ on 2016/8/24.
 */
var React = require('react');
var {Header,BackBtn,Title} = require('../components/Header');
var ConfirmBtn = require('../components/ConfirmBtn');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

import {userInfoActions} from '../redux/actions/userInfoActions';


var LogIn = React.createClass({

    render: function () {
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'取消'}}/>
                </Header>
                <LogInBtn
                    logIn={this.props.userInfoActionKeys.logIn}
                    appKey={this.props.userInfo.appKey}
                    appSecret={this.props.userInfo.appSecret}
                    openId={this.props.userInfo.openId}
                >
                    <ConfirmBtn text={'使用微信授权登录'}/>
                </LogInBtn>

            </div>

        )
    }
});

var LogInBtn = React.createClass({
    logIn:function(){

        this.props.logIn({},{
            userName:this.props.openId,
            app_key:this.props.appKey,
            accessInfo:{
                app_key:this.props.appKey,
                access_token:"",
                phone_num:this.props.openId,
                signature:hex_md5(this.props.appSecret + this.props.openId),
                loginType:'weixin'
            }
        });
    },
    render: function () {
        return (
            <div onClick={this.logIn}>
                {this.props.children}
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(LogIn);
