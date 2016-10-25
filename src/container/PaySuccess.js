/**
 * Created by LDQ on 2016/10/12.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/paySuccessStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';
import {XTCoinsActions} from '../redux/actions/XTCoinsActions';
import {dialogActions} from '../redux/actions/dialogActions';


var PaySuccess = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/PaySuccess');
    },
    render: function () {
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:'/'}}
                    />
                    <Title title={{text:'支付结果'}}></Title>
                </Header>
                <div className="pay_success cblue tc">
                    兑换成功
                </div>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(PaySuccess);