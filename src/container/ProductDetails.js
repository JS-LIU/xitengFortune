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

import {productActions} from '../redux/actions/productInfoActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {settlementActions} from '../redux/actions/settlementActions';
import {specificationActions} from '../redux/actions/specificationActions'

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
                    addProductItem={this.props.shoppingCartActionKeys.addProductItem}
                    productInfo={productInfo}
                    shoppingCart={this.props.shoppingCart}
                    shoppingCartActionKeys={this.props.shoppingCartActionKeys}
                    settlementActionKeys={this.props.settlementActionKeys}
                />
                {this.props.specification.isShowSpec?
                    <Specifications
                        productInfo={this.props.productInfo}
                        specificationActionKeys={this.props.specificationActionKeys}
                    />:""}
            </div>
        )
    }
});


const Specifications  = React.createClass({
    increaseNum:function(item){
        return ()=>{

            this.props.specificationActionKeys.increaseNum(item);
        }
    },
    render: function () {
        let specNodes = this.props.productInfo.productInfo.specifications.map((item,index)=>{
            let contentNodes = _h.obj.isArray(item.content)?
                item.content.map((contentItem,index)=>{
                return (
                    <li key={index}>
                        <span>{contentItem}</span>}
                    </li>
                )
            }):(<div><div>减</div><div>{item.content}</div><div onClick={this.increaseNum(item)}>加</div></div>);
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
            </div>
        )
    }
});


var ShopFooter = React.createClass({

    addProductItem:function(){
        let productInfo = this.props.productInfo;
        this.props.addProductItem(productInfo);

    },
    settlement:function(product){
        return ()=>{
            this.props.settlementActionKeys.pushProducts(product);
        }
    },
    render:function(){

        return (
            <ul className="shop_footer w">
                <li className="shop_service_phone">
                    <a href="tel:18801233565" className="shop_service_phone_icon w tc">客服</a>
                </li>
                <li className="shop_product_cart">
                    <Link to="/ShoppingCart" className="shop_link_cart w">
                        <span className="shop_cart_icon">购物车</span>
                        <span className="shop_cart_total cfff tc">{this.props.shoppingCart.totalNum}</span>
                    </Link>
                </li>
                <li className="shop_put_cart tc f16 cfff" onClick={this.addProductItem} >
                    加入购物车
                </li>
                <li className="shop_buy tc f16 cfff" onClick={this.settlement(this.props.productInfo)}>
                    <Link to="/ConfirmOrder">立即兑换</Link>
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
        specification:state.specification
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        productInfoActionKeys:bindActionCreators(productActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch),
        settlementActionKeys : bindActionCreators(settlementActions,dispatch),
        specificationActionKeys:bindActionCreators(specificationActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);