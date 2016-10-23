/**
 * Created by LDQ on 2016/10/18.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');

require('../css/confirmOrderStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {addressActions} from '../redux/actions/addressActions';

var ConfirmOrder = React.createClass({

    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/SubmitOrder');
        this.props.addressActionKeys.getDefault();
    },
    render:function(){
        return(
            <div className="cart_body f5f5f5 po w">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:'/ShoppingCart'}}
                    />
                    <Title title={{text:'确认订单'}}></Title>
                </Header>
                {this.props.address.hasCurrentAddress?(
                    <CurrentList address={this.props.address} />
                ):(<div className="address_list pl15 f16">
                    <Link to="/SelectAddress">请选择地址</Link>
                </div>)}


                <div className="cart_footer f16 w">
                    <span className="ml15">合计：{this.props.shoppingCart.realCount / 100}</span>
                    <Link to="/Pay" className="cart_payment_btn fr cfff f20 tc">提交订单</Link>
                </div>
            </div>
        )
    }
});

var CurrentList = React.createClass({
    render: function () {
        return (
            <ul className="order_def_address pl15 fff">
                <li className="order_user_info">
                    <p className="order_user_name ">
                        <span className="f14 pl15">收货人：</span>
                        <p className="order_user_n_m pr15">
                            <span>{this.props.address.currentAddress.recievName}</span>
                            <span>{this.props.address.currentAddress.phoneNum}</span>
                        </p>
                    </p>
                </li>
                <li className="order_user_address">
                    <span className="f14">送货地址：</span>
                    <span>{this.props.address.currentAddress.fullAddress}</span>
                </li>
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        address:state.address
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ConfirmOrder);