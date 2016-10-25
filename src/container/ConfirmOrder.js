/**
 * Created by LDQ on 2016/10/18.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/confirmOrderStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {addressActions} from '../redux/actions/addressActions';
import {createTradeOrderActions} from '../redux/actions/createTradeOrderActions';
import {dialogActions} from '../redux/actions/dialogActions';


var ConfirmOrder = React.createClass({

    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/ConfirmOrder');
        this.props.addressActionKeys.getDefault();
        this.props.showDialogActionKeys.hideDialog();
    },
    exchangeProduct:function(){
        this.props.createTradeOrderActionKeys.exchangeProduct();
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
                    <CurrentAddress address={this.props.address} />
                ):(<div className="address_list pl15 f16">
                    <Link to="/SelectAddress">请选择地址</Link>
                </div>)}
                <ProductList />

                <div className="cart_footer f16 w">
                    <span className="ml15">合计：{this.props.shoppingCart.realCount / 100}</span>
                    <div className="cart_payment_btn fr cfff f20 tc" onClick={this.exchangeProduct}>提交订单</div>
                </div>

                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title={this.props.order.isSuccess?"兑换确认":"喜腾币不足"}/>
                    <DialogBody content={this.props.order.isSuccess?"确认兑换以上商品吗":"你在账户的喜腾币不足，是否立即兑换喜腾币"}/>
                    <DialogFooter>
                        <DialogCancel showDialogActionKeys={this.props.showDialogActionKeys}/>
                        <DialogConfirm url={this.props.order.isSuccess?"/PaySuccess":"/ExchangeXTCoins"} />
                    </DialogFooter>
                </DialogiOS>:""}
            </div>
        )
    }
});

var CurrentAddress = React.createClass({
    render: function () {
        return (
            <Link to="/SelectAddress" className="order_def_address pl15 fff">
                <div className="order_user_info">
                    <div className="order_user_name ">
                        <span className="f14 pl15">收货人：</span>
                        <p className="order_user_n_m pr15">
                            <span>{this.props.address.currentAddress.recievName}</span>
                            <span>{this.props.address.currentAddress.phoneNum}</span>
                        </p>
                    </div>
                </div>
                <div className="order_user_address">
                    <span className="f14">送货地址：</span>
                    <span>{this.props.address.currentAddress.fullAddress}</span>
                </div>
            </Link>
        )
    }
});

var ProductList = React.createClass({
    render: function () {

        return (
            <ul>

            </ul>
        )
    }
});



function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        address:state.address,
        order:state.order,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        createTradeOrderActionKeys:bindActionCreators(createTradeOrderActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ConfirmOrder);