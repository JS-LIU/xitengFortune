/**
 * Created by LDQ on 2016/8/30.
 */
var React = require('react');
var {Header,BackBtn,Title} = require('../components/Header');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {dialogActions} from '../redux/actions/dialogActions'



var CheckCode = React.createClass({

    componentWillMount:function(){

    },

    render: function () {
        return (
            <div>
                <Header >
                    <BackBtn back={{text:'返回',src:'../src/images/nav_btn_back@2x.png'}}/>
                </Header>
                <div className="tc f16">短信验证码已发送至你的手机</div>
                <ul className="mt30">
                    <li style={listStyle}>
                        <span>手机号</span>
                        <span style={inputStyle}>{this.props.userInfo.phoneNum}</span>
                    </li>
                    <li style={listStyle}>
                        <span>验证码</span>
                        <input style={inputStyle} type="text"/>
                    </li>
                </ul>
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

module.exports = connect(mapStatetoProps,mapDispatchToProps)(CheckCode);