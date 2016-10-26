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

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';

var My = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/My');
    },
    render: function () {
        return (
            <div>
                <Header>
                    <Title title={{text:'我'}}></Title>
                </Header>
                <div className="discover_body po f5f5f5 w">
                    <EntranceList itemList={[{
                        name:'我的资产',
                        url:this.props.userInfo.logIn?'/MyAsset':'/Login',
                        icon:'/me_icon_assets@2x.png'
                    },{
                        name:'投注记录',
                        url:this.props.userInfo.logIn?'/MyRecord':'/Login',
                        icon:'/me_icon-_record@2x.png'
                    }]}/>
                    <EntranceList itemList={[{
                        name:'购物车',
                        url:this.props.userInfo.logIn?'/ShoppingCart':'/Login',
                        icon:'/me_icon-_cart@2x.png'
                    },{
                        name:'订单',
                        url:this.props.userInfo.logIn?'/OrderDetails':'/Login',
                        icon:'/me_icon-_order@2x.png'
                    }]}/>
                    <EntranceList itemList={[{
                        name:'消息',
                        url:this.props.userInfo.logIn?'/News':'/Login',
                        icon:'/me_icon-_news@2x.png'
                    },{
                        name:'通用',
                        url:this.props.userInfo.logIn?'/Common':'/Login',
                        icon:'/me_icon_common@2x.png'
                    }]}/>
                </div>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls

    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),

    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(My);