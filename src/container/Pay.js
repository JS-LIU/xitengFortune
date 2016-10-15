/**
 * Created by liudq on 2016/10/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require("../css/pay.css");

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';

var Pay = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Pay');
    },
    render: function () {
        var backUrl = this.props.historyUrls.last;
        console.log(this.props.storage);
        return (
            <div className="po w h f5f5f5">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:backUrl}}
                    />
                    <Title title={{text:'确认购买'}}></Title>
                </Header>
                <ProductItem productInfo={this.props.storage.productInfo}/>
                <PayWay />
                <div className="pay_btn cfff tc f16">立即支付</div>
            </div>

        )
    }
});

var ProductItem = React.createClass({
    render:function(){
        console.log(this.props.productInfo);
        let productImg = this.props.productInfo.picture;
        return(
            <div className="product_info mt10 clearfix fff">
                <div className="product_pic tc fl">
                    <img src={productImg} alt="" className="h"/>
                </div>
                <div className="fl">
                    <p className="product_name f16 c000 pt10">
                        <span>钻石</span>
                        <span>{this.props.productInfo.diamondCount + this.props.productInfo.giveDiamondCount}</span>
                        <span>颗</span>
                    </p>
                    <p className="f14 cred">
                        <span>￥{this.props.productInfo.price / 100}</span>
                    </p>
                </div>
            </div>
        )
    }
});

var PayWay = React.createClass({
    render: function () {
        return (
            <div className="mt10 fff">
                <p className="payWay_title pl15 f16 c000">选择支付方式</p>
                <ul className="payWay_box">
                    <li className="pr clearfix selected">
                        <div className="payWay_pic fl">
                            <img src="/weixin.png" alt="" className="w"/>
                        </div>
                        <div className="fl">
                            <p className="f14 c000 pt10">微信支付</p>
                            <p>推荐开通微信支付的用户使用</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Pay);