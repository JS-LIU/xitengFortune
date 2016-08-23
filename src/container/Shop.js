/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';

var PruductItems = React.createClass({

    setProductId:function(item){
        var self = this;
        return function(){
            self.props.setProductId(item.productId);
        }
    },
    render:function(){
        var productNodes = this.props.ProductList.map((item,index)=>{
            return (
                <li key={index} onClick={this.setProductId(item)}>
                    <Link to="/ProductDetails">
                        <span>{item.title}</span>
                    </Link>
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
        this.props.shopActionKeys.getProducts({productList:'productList.json'});
    },
    render: function () {

        return (
            <div >
                <PruductItems
                    ProductList={this.props.shop.productList}
                    setProductId={this.props.storageActionKeys.setProductId}
                />
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        shop:state.shop,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        shopActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);