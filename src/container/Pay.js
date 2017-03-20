/**
 * Created by liudq on 2016/10/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require("../css/pay.css");

import _h from '../Util/HB';
import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {payActions} from '../redux/actions/payActions';

var Pay = React.createClass({
    componentWillMount:function(){
        if(this.props.pay.prePay){
            this.props.payActionKeys.WXPay();
        }
    },
    toPay:function(){
        this.props.payActionKeys.WXPay();
    },
    render: function () {
        return (
            <div className="po w h f5f5f5">
                <ProductItem order={this.props.order}/>
                <PayWay />
                <div className="pay_btn cfff tc f16" onClick={this.toPay}>确认支付</div>
            </div>

        )
    }
});

var ProductItem = React.createClass({
    render:function(){
        return(
            <div>
                <div className="product_info clearfix fff tc">
                    {/*<img src="src/images/diamonds_photo_3@2x.png" alt="" className="product_pic fl"/>*/}
                    {/*<div className="fl">*/}
                    {/*<p className="product_name f16 c000 pt10 clearfix">*/}
                    {/*<span className="fl">钻石</span>*/}
                    {/*<span className="fl">{this.props.order.amount}</span>*/}
                    {/*<span className="fl">颗</span>*/}
                    {/*</p>*/}
                    {/*<p className="f14 cred">*/}
                    {/*<span>￥{this.props.order.tradeOrder.realTotalFee / 100}</span>*/}
                    {/*</p>*/}
                    {/*</div>*/}
                    <img src="src/images/diamond_unit_icon@2x.png" alt="" className="product_pic"/>
                    <p className="product_name">{this.props.order.amount}颗</p>
                </div>
                <p className="fr cred realPay">实付金额：￥{this.props.order.tradeOrder.realTotalFee / 100}</p>
            </div>

        )
    }
});

var PayWay = React.createClass({
    render: function () {
        return (
            <div className="fff" style={{marginTop:"0.8rem"}}>
                <p className="payWay_title pl15 f16 c000">选择支付方式</p>
                <ul className="payWay_box">
                    <li className="pr clearfix selected">
                        <div className="payWay_pic fl">
                            <img src="src/images/weixin.png" alt="" className="w"/>
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
        order:state.order,
        pay:state.pay
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        payActionKeys : bindActionCreators(payActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Pay);