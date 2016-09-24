/**
 * Created by LDQ on 2016/8/24.
 */
var React = require('react');
var {Header,BackBtn,Title} = require('../components/Header');
var ConfirmBtn = require('../components/ConfirmBtn');
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
        var urls = this.props.historyUrls;
        var backUrl = urls[urls.length-2];
        var confirmUrl = '/StockDetails';
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
                <LoginBtn
                    logIn={this.props.userInfoActionKeys.logIn}>
                    <ConfirmBtn
                        confirm={{link:confirmUrl,text:'使用微信授权登录'}}/>
                </LoginBtn>

            </div>

        )
    }
});

var LoginBtn = React.createClass({
    logIn:function(){

        this.props.logIn();
    },
    render: function () {
        return (
            <div className="login_btn cfff f20" onClick={this.logIn}>
                {this.props.children}
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
