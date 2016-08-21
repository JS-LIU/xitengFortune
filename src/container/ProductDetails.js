/**
 * Created by LDQ on 2016/8/16.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

import {storageActions} from '../redux/actions/storageActions';
import {productActions} from '../redux/actions/productInfoActions';
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';

var ProductDetails = React.createClass({
    componentWillMount:function(){
        this.props.storageActionKeys.getProductId();
        let productId = this.props.storage.productId;
        console.log('getProductId->',productId);

        this.props.productInfoActionKeys.getProductInfo({});
    },
    render: function () {
        console.log('productInfo->render->',this.props.productInfo);
        var productInfo = this.props.productInfo;
        return (
            <div>

                <div>商品名称：{productInfo.title}</div>
                <div>商品价格：{productInfo.price}</div>
                <Footer addProductItem={this.props.shoppingCartActionKeys.addProductItem} productInfo={productInfo}/>
            </div>
        )
    }
});

var Footer = React.createClass({

    addProductItem:function(){
        console.log('---click add',this.props.productInfo);
        let productInfo = this.props.productInfo;
        this.props.addProductItem(productInfo);

    },
    render:function(){

        return (
            <ul className="clearfix">
                <li className="fl">
                    <a href="tel:18801233565">客服</a>
                </li>
                <li className="fl">
                    <Link to="/ShoppingCart" className="fl">
                        购物车
                    </Link>
                </li>
                <li className="fl" onClick={this.addProductItem} >
                    加入购物车
                </li>
                <li className="fl">
                    立即兑换
                </li>
            </ul>
        )

    }
});



function mapStatetoProps(state){
    return {
        storage:state.storage,
        productInfo:state.productInfo,
        shoppingCart:state.shoppingCart
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        productInfoActionKeys:bindActionCreators(productActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);