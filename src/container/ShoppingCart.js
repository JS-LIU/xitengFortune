/**
 * Created by LDQ on 2016/8/22.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';

var ShoppingCart = React.createClass({

    componentWillMount:function () {
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
            <div>

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
                <span>总价：{this.props.shoppingCart.realCount}</span>
                <span onClick={this.deleteProducts}>删除</span>
            </div>
        )
    }
});


var ProductList = React.createClass({
    checkedProduct:function(product){
        var self = this;
        return function(){
            self.props.checekedProduct(product);
        }
    },
    increase:function(product){
        var self = this;
        return function(){
            self.props.increase(product)
        }
    },
    reduce:function(product){
        var self = this;
        return function(){
            self.props.reduce(product)
        }
    },
    render:function(){

        var productNodes = this.props.products.map((item,index)=>{

            return (
                <li key={index}>
                    <input type="checkbox" checked={item.checked} onChange={this.checkedProduct(item)}/>
                    <span>{item.title}</span>
                    <span onClick={this.increase(item)}>+</span>
                    <span>{item.num}</span>
                    <span onClick={this.reduce(item)}>-</span>

                </li>
            )
        });


        return (
            <ul>
                {productNodes}
            </ul>
        )
    }

});




function mapStatetoProps(state){
    return {
        shoppingCart:state.shoppingCart
    }
}
function mapDispatchToProps(dispatch){

    return{
        shoppingCartActionKeys:bindActionCreators(shoppingCartActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ShoppingCart);