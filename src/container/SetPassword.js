/**
 * Created by LDQ on 2016/11/10.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/registerStyle.css');

import _h from '../Util/HB';
import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {dialogActions} from '../redux/actions/dialogActions';


var SetPassword = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/SetPassword');

    },
    inputPassWord:function(){

        let $_password = $('.J_password').val();

        if($_password.length > 5){
            let markUrl = this.props.historyUrls.mark;

            if(this.props.userInfo.findPassword){

                this.props.userInfoActionKeys.resetPassword($_password);
            }else{

                this.props.userInfoActionKeys.setPassword($_password);
                this.props.historyUrlsActionKeys.recall(markUrl);
                // _h.url.setBrowserHistoryFromBefore([...this.props.historyUrls.urlList],'/Login');

                console.log('page-urllist---',this.props.historyUrls.urlList);
            }

        }else{
            this.props.showDialogActionKeys.showDialog();
        }
    },
    render: function () {
        // var backUrl = this.props.historyUrls.last;
        let markUrl = this.props.historyUrls.mark;
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
                <div className="tc f16 mt10">设置密码</div>
                <div className="register_list">
                    <span>密码</span>
                    <input type="password" placeholder="请填写6位以上密码" className="register_input_none pl15 J_password"/>
                </div>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="验证码错误"/>
                    <DialogBody content={"手机验证码错误"}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{text:"重新输入",url:"/SetPassword"}}
                        />
                    </DialogFooter>
                </DialogiOS>:''}
                <div className="next_btn tc cfff f16" onClick={this.inputPassWord}>
                    <Link to={this.props.userInfo.findPassword?"/Login":markUrl}>
                        <span className="cfff">确定</span>
                    </Link>
                </div>
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

module.exports = connect(mapStatetoProps,mapDispatchToProps)(SetPassword);