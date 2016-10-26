/**
 * Created by LDQ on 2016/10/26.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,Title,BackBtn } = require('../components/Header');
var $ = require('jquery');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';

var My = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/MyAsset');
        this.props.accountActionKeys.getAccount();
    },
    render: function () {
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:"/My"}}
                    />
                    <Title title={{text:'资产'}}></Title>
                </Header>
                <Myaccount account={this.props.account} />


                <div className="discover_body po f5f5f5 w">
                    <EntranceList itemList={[{
                        name:'购买钻石',
                        url:"BuyDiamonds",
                        icon:'/me_icon_assets@2x.png'
                    },{
                        name:'兑换喜腾币',
                        url:'ExchangeXTCoins',
                        icon:'/me_icon-_record@2x.png'
                    }]}/>
                </div>
            </div>
        )
    }
});

var Myaccount = React.createClass({
    render: function () {
        return (
            <ul>
                <li>
                    <span>{this.props.account.diamondAmount}</span>
                </li>
                <li>
                    <span>{this.props.account.xtbTotalAmount}</span>
                </li>
            </ul>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        account:state.account,
        userInfo:state.userInfo
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys:bindActionCreators(accountActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(My);
