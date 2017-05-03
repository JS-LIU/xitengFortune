/**
 * Created by LDQ on 2016/8/22.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

import shoppingCartStyle from '../css/shoppingCartStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {orderActions} from '../redux/actions/orderActions';


const ShoppingCart = React.createClass({
    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/ShoppingCart');
        this.props.historyUrlsActionKeys.mark('/ShoppingCart');
    },
    allCheck:function(){
        this.props.shoppingCartActionKeys.allCheck();
    },
    deleteProducts:function(){
        this.props.shoppingCartActionKeys.deleteProducts();
    },
    createOrderListInfo:function(){
        this.props.orderActionKeys.createOrderListInfo(this.props.shoppingCart.products);
    },
    render:function(){
        return(
            <div className={shoppingCartStyle.cart_body}>
                <ProductList
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                />
                <div className={shoppingCartStyle.cart_footer}>
                    <input type="checkbox"
                           checked={this.props.shoppingCart.allChecked}
                           onChange={this.allCheck}
                           className="ml15"
                    />
                    <span className={shoppingCartStyle.cart_allCheck}>全选</span>
                    <span className={shoppingCartStyle.cart_total}>
                        <span>合计：</span>
                        <span className={shoppingCartStyle.red_XT_icon}>{this.props.shoppingCart.totalPrice / 100}</span>
                    </span>
                    {this.props.shoppingCart.edit?(
                        <span onClick={this.deleteProducts} className={shoppingCartStyle.cart_delete_all}>删除</span>
                    ):(
                        <Link to="/ConfirmOrder" onClick={this.createOrderListInfo} className={shoppingCartStyle.cart_payment_btn}>去结算</Link>
                    )}

                </div>
            </div>
        )
    }
});


const ProductList = React.createClass({
    increaseNum:function(product){
        return ()=>{
            this.props.shoppingCartActionKeys.increaseNum(product)
        }
    },
    reduceNum:function(product){
        return ()=>{
            this.props.shoppingCartActionKeys.reduceNum(product)
        }
    },
    checkProduct:function(product){
        return ()=>{
            this.props.shoppingCartActionKeys.checkProduct(product);
        }
    },
    edit:function(){
        this.props.shoppingCartActionKeys.edit();
    },
    allCheck:function(){
        this.props.shoppingCartActionKeys.allCheck();
    },
    render:function(){
        let productNodes = this.props.shoppingCart.products.map((item,index)=>{
            return (
                <li key={index} className={shoppingCartStyle.cart_product}>
                    <div className={shoppingCartStyle.cart_product_check}>
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={this.checkProduct(item)}/>
                    </div>

                    <div className={shoppingCartStyle.cart_product_pic}>
                        <img src={item.smallPicture} alt="" className="w"/>
                    </div>
                    <div className={shoppingCartStyle.cart_product_info}>
                        <p>{item.productName}</p>
                        <p className={shoppingCartStyle.cart_product_info_price}>
                            <span className={shoppingCartStyle.red_XT_icon}>{item.price / 100}</span>
                            <span>*{item.totalCount}</span>
                        </p>
                    </div>
                    <div className={shoppingCartStyle.cart_ctrl}>
                        <span onClick={this.reduceNum(item)} className={shoppingCartStyle.cart_ctrl_reduce}>-</span>
                        <span className={shoppingCartStyle.cart_ctrl_num}>{item.totalCount}</span>
                        <span onClick={this.increaseNum(item)} className={shoppingCartStyle.cart_ctrl_increase}>+</span>
                    </div>
                </li>
            )
        });
        return (
            <ul className={shoppingCartStyle.fff}>
                <li className={shoppingCartStyle.cart_shop_name}>
                    <input
                        type="checkbox"
                        checked={this.props.shoppingCart.allChecked}
                        onChange={this.allCheck}
                    />
                    <span className={shoppingCartStyle.cart_shop_name_icon}>礼品商城</span>
                    <p className={shoppingCartStyle.cart_shop_edit} onClick={this.edit}>{this.props.shoppingCart.edit?"完成":"编辑"}</p>
                </li>
                <li className="mt50"></li>
                {productNodes}
            </ul>
        )
    }

});




function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        settlement:state.settlement
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys : bindActionCreators(shoppingCartActions,dispatch),
        orderActionKeys: bindActionCreators(orderActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ShoppingCart);