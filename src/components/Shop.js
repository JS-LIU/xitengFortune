/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import {shopActions} from '../redux/actions/shopActions';

var PruductItems = React.createClass({


    render:function(){
        var productNodes = this.props.ProductList.map((items,index)=>{
            return (
                <li key={index}>
                    {items.title}
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

var Shop = React.createClass({

    componentWillMount:function(){
        this.props.shopActions.getShopItems({});
    },
    render: function () {

        return (
            <div >
                <PruductItems ProductList={this.props.productList}/>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return state.shop;
}
function mapDispatchToProps(dispatch){

    return{
        shopActions : bindActionCreators(shopActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);