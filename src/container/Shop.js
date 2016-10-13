/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/shopStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';

var PruductItems = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Shop');
        this.props.storageActionKeys.getProductList()
    },
    setProductId:function(item){
        return ()=>{
            this.props.setProductId(item.productId);
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
            <div>

                <ul>
                    {productNodes}
                </ul>
            </div>

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
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        shop:state.shop,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){
    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shopActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);