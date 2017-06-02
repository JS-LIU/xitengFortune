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

import {productInfoActions} from '../redux/actions/productInfoActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {productActions} from '../redux/actions/productActions';
import {orderActions} from '../redux/actions/orderActions';


import _h from '../Util/HB';

const ProductDetails = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/ProductDetails');
        this.props.productInfoActionKeys.getProductInfo();
    },
    render: function () {
        var productInfo = this.props.productInfo.productInfo;
        let window_w = document.body.clientWidth;
        let totalDistance = window_w * productInfo.pictures.length;
        var carouselStyle = {
            bigBox:{
                width:window_w+"px",
            },
            smBox:{
                width:totalDistance + "px"
            }
        };
        let imgNodes = productInfo.pictures.map((item,index)=>{
            return (
                <li className={productDetailStyle.carousel_item} key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div>
                <Carousel
                    // pictures={productInfo.pictures}
                    carouselStyle={carouselStyle}
                    direction="slideLeft"
                    auto={true}
                >
                    {imgNodes}
                </Carousel>
                <div className={productDetailStyle.detail_product_info}>
                    <p className={productDetailStyle.detail_product_info_name}>商品名称：{productInfo.productName}</p>
                    <p className={productDetailStyle.detail_product_info_detail}>{productInfo.detail}</p>
                    <div className="clearfix">
                        <p className={productDetailStyle.cred}>
                            <span>￥</span>
                            <span>{productInfo.price / 100}</span>
                        </p>
                    </div>
                </div>
                <div className={productDetailStyle.detail_delivery}>
                    <span className={productDetailStyle.red_checked} >快递：0.00</span>
                    <span className={productDetailStyle.red_checked}>已售：{productInfo.sales}</span>
                    <span className={productDetailStyle.red_checked}>库存：{productInfo.inventory}</span>
                </div>
                <ProductDetail
                    productInfo = {productInfo}
                />
                <ShopFooter
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys = {this.props.shoppingCartActionKeys}
                    productActionKeys = {this.props.productActionKeys}
                />
                {this.props.specification.isShowSpec?
                    <Specifications
                        product={this.props.product}
                        productActionKeys = {this.props.productActionKeys}
                        shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                        orderActionKeys={this.props.orderActionKeys}
                    />:""}
            </div>
        )
    }
});

const ProductDetail = React.createClass({
    render: function () {
        let imgNodes = this.props.productInfo.detailPictures.map((item,index)=>{
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
        this.props.productActionKeys.increaseNum('ShopProduct',this.props.product.info);
    },
    reduceNum:function(){
        this.props.productActionKeys.reduceNum('ShopProduct',this.props.product.info);
    },
    cancel:function(){
        this.props.shoppingCartActionKeys.cancel();
    },
    buyProduct:function(){
        if(this.props.product.belong === 'shoppingCart'){
            this.props.shoppingCartActionKeys.addProduct(this.props.product.info);
        }else{
            this.props.orderActionKeys.createOrderListInfo(this.props.product.info);
        }
    },
    render: function () {
        let specNodes = this.props.product.info.specifications.map((item,index)=>{
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
                        <span className={productDetailStyle.shop_choose_num_ctrl_item_num}>{this.props.product.info.totalCount}</span>
                        <span className={productDetailStyle.shop_choose_num_ctrl_item} onClick={this.increaseNum}>+</span>
                    </div>
                </div>
                {/*todo 跳转页面的方式还需要通过【规格是否全选】来判断*/}
                <Link to={this.props.product.belong === "shoppingCart"?'/ProductDetails':'/ConfirmOrder'} className={productDetailStyle.shop_choose_sure} onClick={this.buyProduct}>确定</Link>
            </div>
        )
    }
});


const ShopFooter = React.createClass({

    setProductBelong:function(belong){
        return ()=>{
            this.props.productActionKeys.setBelong(belong);
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
        productInfo:state.productInfo,
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls,
        specification:state.specification,
        product:state.product
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        productInfoActionKeys:bindActionCreators(productInfoActions,dispatch),
        productActionKeys:bindActionCreators(productActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        orderActionKeys:bindActionCreators(orderActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);