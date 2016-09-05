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
                >
                    <ConfirmBtn text={'使用微信授权登录'}/>
                </LogInBtn>

            </div>

        )
    }
});

var LogInBtn = React.createClass({
    logIn:function(){

        this.props.logIn({});
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
