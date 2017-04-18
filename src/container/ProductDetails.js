/**
 * Created by LDQ on 2016/8/16.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var { Header,BackBtn,Title } = require('../components/Header');
var Carousel = require('../components/Carousel');

require('../css/productDetailStyle.css');

import {productInfoActions} from '../redux/actions/productInfoActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {settlementActions} from '../redux/actions/settlementActions';
import {specificationActions} from '../redux/actions/specificationActions'
import {productActions} from '../redux/actions/productActions';

import _h from '../Util/HB';

var ProductDetails = React.createClass({
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
                height:'7.5rem'
            },
            smBox:{
                width:totalDistance + "px"
            }
        };
        return (
            <div>
                <Carousel
                    pictures={productInfo.pictures}
                    carouselStyle={carouselStyle}
                    direction="slideLeft"
                    auto={true}
                />
                <div className="detail_product_info pl15">
                    <p className="f16 c000">商品名称：{productInfo.productName}</p>
                    <p>{productInfo.detail}</p>
                    <div className="clearfix">
                        <p className="f16 fl cred">
                            <span>￥</span>
                            <span>{productInfo.price / 100}</span>
                        </p>
                        <p className="fr pr15 f14">库存：{productInfo.inventory}</p>
                    </div>
                </div>
                <div className="detail_delivery pl15 f14">
                    <span className="red_checked mr50" >快递：0.00</span>
                    <span className="red_checked">已售：{productInfo.sales}</span>
                </div>

                <ShopFooter
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys = {this.props.shoppingCartActionKeys}
                    productActionKeys = {this.props.productActionKeys}
                />
                {this.props.specification.isShowSpec?
                    <Specifications
                        product={this.props.product}
                        shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                        settlementActionKeys={this.props.settlementActionKeys}
                    />:""}
            </div>
        )
    }
});


const Specifications  = React.createClass({
    increaseNum:function(item){
        this.props.productActionKeys.increaseNum(item);
    },
    selectedSpecification:function(item,contentItem){
        return ()=>{
            this.props.productActionKeys.selectedSpecification(item,contentItem);
        }
    },
    buyProduct:function(){
        // if(this.props.specification.isBuyNow){
        //     this.props.settlementActionKeys.pushProducts(this.props.productInfo);
        // }else{
        // this.props.shoppingCartActionKeys.addProductItem(this.props.productInfo);
        // }
        if(this.props.product.belong == 'shoppingCart'){
            this.props.shoppingCartActionKeys.addProduct(this.props.product.info);
        }

    },
    render: function () {
        //  todo 暂时用不到这个节点
        let specNodes = this.props.product.info.specifications.map((item,index)=>{
            let contentNodes = _h.obj.isArray(item.type)?
                item.type.map((contentItem,index)=>{
                return (
                    <li key={index} onClick={selectedSpecification(item,contentItem)}>
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
            <div>
                <ul>
                    {specNodes}
                </ul>

                <div>
                    <span>数量</span>
                    <div>
                        <span onClick={this.reduceNum}>-</span>
                        <input type="text"/>
                        <span onClick={this.increaseNum}>+</span>
                    </div>
                </div>

                <div onClick={this.buyProduct}>确定</div>
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
            <ul className="shop_footer w">
                <li className="shop_service_phone">
                    <a href="tel:400-607-8300" className="shop_service_phone_icon w tc">客服</a>
                </li>
                <li className="shop_product_cart">
                    <Link to="/ShoppingCart" className="shop_link_cart w">
                        <span className="shop_cart_icon">购物车</span>
                        <span className="shop_cart_total cfff tc">{this.props.shoppingCart.totalNum}</span>
                    </Link>
                </li>
                <li className="shop_put_cart tc f16 cfff" onClick={this.setProductBelong('shoppingCart')} >
                    加入购物车
                </li>
                <li className="shop_buy tc f16 cfff" onClick={this.setProductBelong('order')}>
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
        settlementActionKeys : bindActionCreators(settlementActions,dispatch),
        specificationActionKeys:bindActionCreators(specificationActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);