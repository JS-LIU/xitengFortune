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

var ShoppingCart = React.createClass({

    componentWillMount:function () {
        this.props.historyUrlsActionKeys.pushUrl('/ShoppingCart');
        this.props.shoppingCartActionKeys.calcTotalMoney();
    },
    allCheck:function(){
        this.props.shoppingCartActionKeys.allCheck();
    },
    deleteProducts:function(){
        this.props.shoppingCartActionKeys.deleteProducts();
    },
    render:function(){
        return(
            <div className="f5f5f5">
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:this.props.historyUrls.last}}
                    />
                    <Title title={{text:'购物车'}}></Title>
                </Header>
                <ProductList
                    products={this.props.shoppingCart.products}
                    checekedProduct={this.props.shoppingCartActionKeys.checkedItem}
                    increase={this.props.shoppingCartActionKeys.increase}
                    reduce={this.props.shoppingCartActionKeys.reduce}
                />
                <input type="checkbox"
                       checked={this.props.shoppingCart.allChecked}
                       onChange={this.allCheck}
                />
                <span>总价：{this.props.shoppingCart.realCount / 100}</span>
                <span onClick={this.deleteProducts}>删除</span>
            </div>
        )
    }
});


var ProductList = React.createClass({
    checkedProduct:function(index){
        return ()=>{
            this.props.checekedProduct(index);
        }
    },
    increase:function(index){
        return ()=>{
            this.props.increase(index)
        }
    },
    reduce:function(index){
        return ()=>{
            this.props.reduce(index)
        }
    },
    render:function(){
        let productNodes = this.props.products.map((item,index)=>{
            return (
                <li key={index} className="cart_product pl15 pr">
                    <div className="cart_product_check">
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={this.checkedProduct(index)}/>
                    </div>

                    <div className="cart_product_pic m10 tc">
                        <img src={item.smallPicture} alt="" className="w"/>
                    </div>
                    <div className="cart_product_info">
                        <p className="f16">{item.productName}</p>
                        <p className="f16 mt10">
                            <span className="cred red_XT_icon pl15">{item.price / 100}</span>
                            <span>*{item.num}</span>
                        </p>
                    </div>
                    <div className="cart_ctrl po">
                        <span onClick={this.reduce(index)} className="cart_ctrl_reduce">-</span>
                        <span className="cart_ctrl_num">{item.num}</span>
                        <span onClick={this.increase(index)} className="cart_ctrl_increase">+</span>
                    </div>


                </li>
            )
        });
        return (
            <ul className="fff  mt10">
                <li className="cart_shop_name pl15">
                    <input type="checkbox"/>
                    <span className="cart_shop_name_icon pl15">礼品商城</span>
                </li>
                {productNodes}
            </ul>
        )
    }

});




function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart,
        historyUrls:state.historyUrls
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ShoppingCart);