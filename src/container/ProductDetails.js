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

var ProductDetails = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/ProductDetails');
        this.props.productInfoActionKeys.getProductInfo();
    },
    render: function () {
        var productInfo = this.props.productInfo.productInfo;
        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:this.props.historyUrls.last}}
                    />
                    <Title title={{text:'商品详情'}}></Title>
                </Header>
                <Carousel pictures={productInfo.pictures}/>
                <div className="detail_product_info pl15">
                    <p className="f16 c000">商品名称：{productInfo.productName}</p>
                    <p>{productInfo.detail}</p>
                    <div className="clearfix">
                        <p className="f16 fl cred red_XT_icon pl15">{productInfo.price / 100}</p>
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
                />
            </div>
        )
    }
});

var ShopFooter = React.createClass({

    addProductItem:function(){
        let productInfo = this.props.productInfo;
        this.props.addProductItem(productInfo);

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
                <li className="shop_buy tc f16 cfff">
                    立即兑换
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
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        productInfoActionKeys:bindActionCreators(productActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);