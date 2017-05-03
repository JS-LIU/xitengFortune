/**
 * Created by LDQ on 2016/10/18.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

import confirmOrderStyle from '../css/confirmOrderStyle.css';
import shoppingCartStyle from '../css/shoppingCartStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {addressActions} from '../redux/actions/addressActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {orderActions} from '../redux/actions/orderActions';

const ConfirmOrder = React.createClass({

    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/ConfirmOrder');
        if(this.props.address.listAddress === 0){
            this.props.addressActionKeys.getList();
        }
        this.props.showDialogActionKeys.hideDialog();
    },
    exchangeProduct:function(){
        this.props.createTradeOrderActionKeys.exchangeProduct();
    },
    createOrder:function(){
        this.props.orderActionKeys.createOrder("/exchange/product");
    },
    render:function(){
        return(
            <div className={confirmOrderStyle.cart_body}>
                {this.props.address.hasCurrentAddress?(
                    <CurrentAddress address={this.props.address} />
                ):(<div className={confirmOrderStyle.address_list}>
                    <Link to="/SelectAddress">请选择地址</Link>
                </div>)}
                <ProductList order={this.props.order}/>
                <div className={confirmOrderStyle.cart_footer}>
                    <span className="ml15">合计：{this.props.order.totalPrice / 100}</span>
                    <div className={shoppingCartStyle.cart_payment_btn} onClick={this.createOrder}>提交订单</div>
                </div>

                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title={this.props.order.isSuccess?"兑换确认":"喜腾币不足"}/>
                    <DialogBody content={this.props.order.isSuccess?"确认兑换以上商品吗":"喜腾币不足，是否立即购买钻石"}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:'/ConfirmOrder',text:"取消"}}
                        />
                        <DialogConfirm certain={{url:this.props.order.isSuccess?"/PaySuccess":"/BuyDiamonds",text:"确定"}} />
                    </DialogFooter>
                </DialogiOS>:""}
            </div>
        )
    }
});

var CurrentAddress = React.createClass({
    render: function () {
        return (
            <Link to="/SelectAddress" className={confirmOrderStyle.order_def_address}>
                <div className={confirmOrderStyle.order_user_info}>
                    <div className={confirmOrderStyle.order_user_name}>
                        <span className="f14 pl15">收货人：</span>
                        <p className={confirmOrderStyle.order_user_n_m}>
                            <span>{this.props.address.currentAddress.recievName}</span>
                            <span>{this.props.address.currentAddress.phoneNum}</span>
                        </p>
                    </div>
                </div>
                <div className={confirmOrderStyle.order_user_address}>
                    <span className="f14">送货地址：</span>
                    <span>{this.props.address.currentAddress.fullAddress}</span>
                </div>
            </Link>
        )
    }
});

var ProductList = React.createClass({
    render: function () {
        console.log(this.props.order);
        let productNodes = this.props.order.productList.map((item,index)=>{
            return (
                <li key={index} className={shoppingCartStyle.cart_product}>
                    <div className={shoppingCartStyle.cart_product_pic}>
                        <img src={item.smallPicture} alt="" className="w"/>
                    </div>
                    <div className={shoppingCartStyle.cart_product_info}>
                        <p >{item.productName}</p>
                        <p className={shoppingCartStyle.cart_product_info_price}>
                            <span className={shoppingCartStyle.red_XT_icon}>{item.price / 100}</span>
                            <span >x{item.totalCount}</span>
                        </p>
                    </div>
                </li>
            )
        });
        return (
            <ul className={shoppingCartStyle.cart_product_list}>
                {productNodes}
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
        showDialog:state.showDialog,
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch),
        orderActionKeys:bindActionCreators(orderActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ConfirmOrder);