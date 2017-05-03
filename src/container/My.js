/**
 * Created by liudq on 16/8/25.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,Title } = require('../components/Header');
var $ = require('jquery');

import MyStyle from '../css/MyStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {userInfoActions} from '../redux/actions/userInfoActions';


var My = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/My');
        this.props.historyUrlsActionKeys.mark('/My');
        this.props.userInfoActionKeys.getUserInfo();
    },
    render: function () {
        return (
            <div>
                <div className={MyStyle.discover_body}>
                    <div className="w">
                        <div className={MyStyle.my_header}>
                            <div className={MyStyle.my_header_icon}>
                                <img src={this.props.userInfo.icon} alt="" className="w h"/>
                            </div>
                            <div className={MyStyle.my_info}>
                                <p className={MyStyle.my_info_name}>{this.props.userInfo.cnName}</p>
                                <p className="f14">喜腾号：{this.props.userInfo.xtNumber}</p>
                            </div>
                        </div>
                    </div>
                    <EntranceList itemList={[{
                        name:'我的资产',
                        url:'/MyAsset',
                        icon:'src/images/me_icon_assets@2x.png'
                    },{
                        name:'投注记录',
                        url:'/MyRecord',
                        icon:'src/images/me_icon-_record@2x.png'
                    }]}/>
                    <EntranceList itemList={[{
                        name:'购物车',
                        url:'/ShoppingCart',
                        icon:'src/images/me_icon-_cart@2x.png'
                    },{
                        name:'订单',
                        url:'/OrderDetails',
                        icon:'src/images/me_icon-_order@2x.png'
                    }]}/>

                </div>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        userInfo:state.userInfo

    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        userInfoActionKeys: bindActionCreators(userInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(My);