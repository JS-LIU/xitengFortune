/**
 * Created by LDQ on 2016/8/16.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

import {storageActions} from '../redux/actions/storageActions';
var ProductDetails = React.createClass({
    componentWillMount:function(){
        this.props.storageActionKeys.getProductId();
        let productId = this.props.storage.productId;
        console.log(productId);
    },
    render: function () {

        return (
            <div>
                我是详情
                <Footer />
            </div>
        )
    }
});

var Footer = React.createClass({

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
                <li className="fl">
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
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(ProductDetails);