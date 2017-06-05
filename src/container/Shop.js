/**
 * Created by LDQ on 2016/8/13.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var { Header,BackBtn,Title } = require('../components/Header');
var _h = require('../Util/HB');

import shopStyle from '../css/shopStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';

//  todo 测试使用 提交时删除
import {loginInfoActions} from '../redux/actions/loginInfoActions';

var Shop = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Shop');
        //  todo 测试使用 提交时删除
        this.props.loginInfoActionKeys.phoneNumLogin('18801321546','123456');
    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.shop.last){
                let pageNo = this.props.shop.pageNo + 1;
                let type = this.props.shop.type;
                let manner = {};
                for(let i = 0;i < type.length;i++){
                    if(type[i].selected){
                        manner = {mannerId:type[i].mannerId,index:i};
                        break;
                    }
                }
                this.props.shopActionKeys.getProductList(manner.mannerId,manner.index,pageNo);
            }
        });
    },
    render: function () {

        return (
            <div className={shopStyle.f5f5f5}>
                <PruductList
                    shop={this.props.shop}
                    shopActionKeys={this.props.shopActionKeys}
                    storageActionKeys={this.props.storageActionKeys}
                />
            </div>
        )
    }
});

var PruductList = React.createClass({
    componentWillMount:function(){
        this.props.shopActionKeys.getProductList();
    },
    // setProductId:function(item){
    //     return ()=>{
    //         this.props.storageActionKeys.setProductId(item.productId);
    //     }
    // },
    render:function(){
        let productNodes = this.props.shop.productList.map((item,index)=>{
            return (
                <li className={shopStyle.shop_product_item} key={index} >
                    <Link to= {{ pathname: "/ProductDetails", query: { productId: item.productId } }} className="w">
                        <div className={shopStyle.shop_product_pic}>
                            <img src={item.picUrl} alt="商品图片" className="h"/>
                        </div>
                        <div className={shopStyle.shop_product_footer}>
                            <p className={shopStyle.shop_product_name}>{item.productName}</p>
                            <p className={shopStyle.shop_product_price}>
                                <span>￥</span>
                                <span>{item.price / 100}</span>
                            </p>
                        </div>
                    </Link>
                </li>
            )
        });

        return (
            <div>
                <ProductType
                    shopActionKeys={this.props.shopActionKeys}
                    shop={this.props.shop}
                />
                <ul className={shopStyle.shop_product_list}>
                    {productNodes}
                </ul>
            </div>
        )
    }

});
var ProductType = React.createClass({
    cutType:function(mannerId,index){
        return ()=>{
            this.props.shopActionKeys.getProductList(mannerId,index);
        }
    },
    render: function () {
        let typeNodes = this.props.shop.type.map((item,index)=>{
            return (
                <li
                    key={index}
                    className={shopStyle.shop_type_item}
                    onClick={this.cutType(item.mannerId,index)}
                >
                    <span style={item.selected?cBlueStyle:{}}>
                        {item.title}</span>
                </li>
            )
        });
        return (
            <ul className={shopStyle.shop_type_list}>
                {typeNodes}
            </ul>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        shop:state.shop,
        storage:state.storage,
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        shopActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),

        //  todo 测试使用 提交时删除
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);

const cBlueStyle = {
    color:"#0A89FE"
};