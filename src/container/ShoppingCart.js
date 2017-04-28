/**
 * Created by LDQ on 2016/8/22.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/shoppingCartStyle.css');

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
            <div className="cart_body f5f5f5 po w">
                <ProductList
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                />
                <div className="cart_footer f16 w">
                    <input type="checkbox"
                           checked={this.props.shoppingCart.allChecked}
                           onChange={this.allCheck}
                           className="ml15"
                    />
                    <span className="f14 ml5">全选</span>
                    <span className="ml15">
                        <span>合计：</span>
                        <span className="cred red_XT_icon pl15">{this.props.shoppingCart.totalPrice / 100}</span>
                    </span>
                    {this.props.shoppingCart.edit?(
                        <span onClick={this.deleteProducts} className="cart_delete_all fr cfff f20 tc">删除</span>
                    ):(
                        <Link to="/ConfirmOrder" onClick={this.createOrderListInfo} className="cart_payment_btn fr cfff f20 tc">去结算</Link>
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
                <li key={index} className="cart_product pl15 pr">
                    <div className="cart_product_check">
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={this.checkProduct(item)}/>
                    </div>

                    <div className="cart_product_pic m10 tc">
                        <img src={item.smallPicture} alt="" className="w"/>
                    </div>
                    <div className="cart_product_info">
                        <p className="f16">{item.productName}</p>
                        <p className="f16 mt10">
                            <span className="cred red_XT_icon pl15">{item.price / 100}</span>
                            <span>*{item.totalCount}</span>
                        </p>
                    </div>
                    <div className="cart_ctrl po">
                        <span onClick={this.reduceNum(item)} className="cart_ctrl_reduce">-</span>
                        <span className="cart_ctrl_num">{item.totalCount}</span>
                        <span onClick={this.increaseNum(item)} className="cart_ctrl_increase">+</span>
                    </div>
                </li>
            )
        });
        return (
            <ul className="fff">
                <li className="cart_shop_name pl15 w">
                    <input
                        type="checkbox"
                        checked={this.props.shoppingCart.allChecked}
                        onChange={this.allCheck}
                    />
                    <span className="cart_shop_name_icon pl15">礼品商城</span>
                    <p className="fr pr15 cart_shop_edit tc" onClick={this.edit}>{this.props.shoppingCart.edit?"完成":"编辑"}</p>
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