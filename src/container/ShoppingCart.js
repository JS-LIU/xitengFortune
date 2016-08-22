/**
 * Created by LDQ on 2016/8/22.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
import {shoppingCartActions} from '../redux/actions/shoppingCartActions';

var ShoppingCart = React.createClass({

    render:function(){
        console.log(this.props.shoppingCart);
        return(
            <div>

                <ProductList products={this.props.shoppingCart.products}/>
                <input type="checkbox"/>
                <span>总价：</span>
            </div>
        )
    }
});


var ProductList = React.createClass({

    render:function(){

        var productNodes = this.props.products.map((item,index)=>{

            return (
                <li key={index}>
                    <input type="checkbox"/>
                    <span>{item.title}</span>
                    <span>{item.num}</span>
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