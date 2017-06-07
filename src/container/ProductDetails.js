/**
 * Created by LDQ on 2016/8/16.
 */

let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');
let $ = require('jquery');
let { Header,BackBtn,Title } = require('../components/Header');
let Carousel = require('../components/Carousel');

import productDetailStyle from '../css/productDetailStyle.css';

import {shopProductInfoActions} from '../redux/actions/shopProductInfoActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {orderActions} from '../redux/actions/orderActions';


import _h from '../Util/HB';

const ProductDetails = React.createClass({
    componentWillMount:function(){

        this.props.historyUrlsActionKeys.pushUrl('/ProductDetails');
        let productId = this.props.location.query.productId;
        this.props.shopProductInfoActionKeys.getShopProductInfo(productId);
    },
    render: function () {
        let shopProduct = this.props.shopProduct;
        let window_w = document.body.clientWidth;
        let totalDistance = window_w * shopProduct.info.pictures.length;
        let carouselStyle = {
            bigBox:{
                width:window_w+"px",
            },
            smBox:{
                width:totalDistance + "px"
            }
        };
        let imgNodes = shopProduct.info.pictures.map((item,index)=>{
            return (
                <li className={productDetailStyle.carousel_item} key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div>
                <Carousel
                    carouselStyle={carouselStyle}
                    direction="slideLeft"
                    auto={true}
                >
                    {imgNodes}
                </Carousel>
                <div className={productDetailStyle.detail_product_info}>
                    <p className={productDetailStyle.detail_product_info_name}>商品名称：{shopProduct.info.productName}</p>
                    <p className={productDetailStyle.detail_product_info_detail}>{shopProduct.info.detail}</p>
                    <div className="clearfix">
                        <p className={productDetailStyle.cred}>
                            <span>￥</span>
                            <span>{shopProduct.info.price / 100}</span>
                        </p>
                    </div>
                </div>
                <div className={productDetailStyle.detail_delivery}>
                    <span className={productDetailStyle.red_checked}>快递：0.00</span>
                    <span className={productDetailStyle.red_checked}>已售：{shopProduct.info.sales}</span>
                    <span className={productDetailStyle.red_checked}>库存：{shopProduct.info.inventory}</span>
                </div>
                <ProductDetail
                    shopProduct = {shopProduct}
                />
                <ShopFooter
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys = {this.props.shoppingCartActionKeys}
                    shopProductInfoActionKeys = {this.props.shopProductInfoActionKeys}
                />
                {this.props.specification.isShowSpec?
                    <Specifications
                        shopProduct={shopProduct}
                        shopProductInfoActionKeys = {this.props.shopProductInfoActionKeys}
                        shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                        orderActionKeys={this.props.orderActionKeys}
                    />:""}
            </div>
        )
    }
});

const ProductDetail = React.createClass({
    render: function () {
        let imgNodes = this.props.shopProduct.info.detailPictures.map((item,index)=>{
            return (
                <img  src={item.picUrl} key={index} className="w"/>
            )
        });
        return (
            <div>
                <p className={productDetailStyle.detail_product_title}>详情：</p>
                <div className={productDetailStyle.detail_product_image}>
                    {imgNodes}
                </div>

            </div>
        )
    }
});
const Specifications  = React.createClass({
    increaseNum:function(){
        this.props.shopProductInfoActionKeys.increaseShopProductNum(this.props.shopProduct.info);
    },
    reduceNum:function(){
        this.props.shopProductInfoActionKeys.reduceShopProductNum(this.props.shopProduct.info);
    },
    cancel:function(){
        this.props.shoppingCartActionKeys.cancel();
    },
    buyProduct:function(){
        if(this.props.shopProduct.belong === 'shoppingCart'){
            this.props.shoppingCartActionKeys.addProduct(this.props.shopProduct.info);
        }else{
            this.props.orderActionKeys.createOrderListInfo(this.props.shopProduct.info);
        }
    },
    render: function () {
        let specNodes = this.props.shopProduct.info.specifications.map((item,index)=>{
            let contentNodes = _h.obj.isArray(item.type)?
                item.type.map((contentItem,index)=>{
                return (
                    <li key={index}>
                        <span>{contentItem.name}</span>}
                    </li>
                )
            }):"";
            return (

                <li key={index}>
                    <span>{item.name}</span>
                    <ul>
                        {contentNodes}
                    </ul>
                </li>
            )
        });
        return (
            <div className={productDetailStyle.shop_choose}>
                <ul>
                    {specNodes}
                </ul>
                <div className={productDetailStyle.shop_specifies_close_box}>
                    <span className={productDetailStyle.shop_specifies_close} onClick={this.cancel}>x</span>
                </div>
                <div className={productDetailStyle.shop_specifies_num}>
                    <span className={productDetailStyle.shop_choose_num}>选择数量</span>
                    <div className={productDetailStyle.shop_choose_num_ctrl}>
                        <span className={productDetailStyle.shop_choose_num_ctrl_item} onClick={this.reduceNum}>-</span>
                        <span className={productDetailStyle.shop_choose_num_ctrl_item_num}>{this.props.shopProduct.info.totalCount}</span>
                        <span className={productDetailStyle.shop_choose_num_ctrl_item} onClick={this.increaseNum}>+</span>
                    </div>
                </div>
                {/*todo 跳转页面的方式还需要通过【规格是否全选】来判断*/}
                <Link to={this.props.shopProduct.belong === "shoppingCart"?'/ProductDetails':'/ConfirmOrder'} className={productDetailStyle.shop_choose_sure} onClick={this.buyProduct}>确定</Link>
            </div>
        )
    }
});


const ShopFooter = React.createClass({

    setProductBelong:function(belong){
        return ()=>{
            this.props.shopProductInfoActionKeys.setShopProductBelong(belong);
        }
    },
    render:function(){

        return (
            <ul className={productDetailStyle.shop_footer}>
                <li className={productDetailStyle.shop_service_phone}>
                    <a href="tel:400-607-8300" className={productDetailStyle.shop_service_phone_icon}>客服</a>
                </li>
                <li className={productDetailStyle.shop_product_cart}>
                    <Link to="/ShoppingCart" className={productDetailStyle.shop_link_cart}>
                        <span className={productDetailStyle.shop_cart_icon}>购物车</span>
                        <span className={productDetailStyle.shop_cart_total}>{this.props.shoppingCart.totalNum}</span>
                    </Link>
                </li>
                <li className={productDetailStyle.shop_put_cart} onClick={this.setProductBelong('shoppingCart')} >
                    加入购物车
                </li>
                <li className={productDetailStyle.shop_buy} onClick={this.setProductBelong('order')}>
                    <div >立即兑换</div>
                </li>
            </ul>
        )

    }
});



function mapStatetoProps(state){
    return {
        shopProduct:state.shopProductInfo,
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        specification:state.specification,
        product:state.product
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shopProductInfoActionKeys:bindActionCreators(shopProductInfoActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        orderActionKeys:bindActionCreators(orderActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);