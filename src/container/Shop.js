/**
 * Created by LDQ on 2016/8/13.
 */
let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');
let $ = require('jquery');
let { Header,BackBtn,Title } = require('../components/Header');
let _h = require('../Util/HB');

import shopStyle from '../css/shopStyle.css';

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {productListActions} from '../redux/actions/productListActions';

//  todo 测试使用 提交时删除
import {loginInfoActions} from '../redux/actions/loginInfoActions';

let Shop = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Shop');
        //  todo 测试使用 提交时删除
        this.props.loginInfoActionKeys.phoneNumLogin('18801321546','123456');

        this.props.productListActionKeys.getProductList_Shop(0,{
            type:{
                tagName:'推荐',
            },
            name:'推荐',
            selected:true,
            key:'tagName'
        })
    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            let pageNo = this.props.productList_shop.pageNo + 1;
            this.props.productListActionKeys.getProductList_Shop(pageNo);
        });
    },
    render: function () {

        return (
            <div className={shopStyle.f5f5f5}>
                <ProductList
                    productList={this.props.productList_shop}
                    sortList = {this.props.sort_shopProductList.sortList}
                    productListActionKeys={this.props.productListActionKeys}
                />
            </div>
        )
    }
});

let ProductList = React.createClass({
    render:function(){
        let productNodes = this.props.productList.list.map((item,index)=>{
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
                    productListActionKeys = {this.props.productListActionKeys}
                    sortList = {this.props.sortList}
                />
                <ul className={shopStyle.shop_product_list}>
                    {productNodes}
                </ul>
            </div>
        )
    }

});
let ProductType = React.createClass({
    cutType:function(sortItem){
        return ()=>{
            this.props.productListActionKeys.getProductList_Shop(0,sortItem)
        }
    },
    render: function () {
        let typeNodes = this.props.sortList.map((item,index)=>{
            return (
                <li
                    key={index}
                    className={shopStyle.shop_type_item}
                    onClick={this.cutType(item)}
                >
                    <span style={item.selected?cBlueStyle:{}}>
                        {item.name}</span>
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
        productList_shop:state.productList_shop,
        sort_shopProductList:state.sort_shopProductList,
        storage:state.storage,
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        productListActionKeys : bindActionCreators(productListActions,dispatch),

        //  todo 测试使用 提交时删除
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);

const cBlueStyle = {
    color:"#0A89FE"
};