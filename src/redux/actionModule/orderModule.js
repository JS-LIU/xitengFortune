/**
 * Created by LDQ on 2017/3/20.
 */
import _shoppingCart from '../actionModule/shoppingCardModule';
import _h from '../../Util/HB';

const order = {
    productList: [],

    createOrderList: {},
    totalPrice: "",
    totalProductCount: "",
    productType: "",
    createOrder:{}
};

const setOrderProductList = function(products) {
    if (Array.isArray(products)) {
        order.productList = _shoppingCart.getCheckedProducts(products);

    } else {

        //  todo 缺少判断：是否选择了规格
        order.productList = [products];
    }
    return order.productList;
};

const calcTotalMoney = function(item) {
    order.totalPrice += (item.num * item.price)
};
const calcTotalNum = function(item) {
    order.totalProductCount += item.num;
};
const buyDiamondsOrder = function(path,state){
    if(path === "/createTradeOrder"){
        let data = {
            accessInfo:state.loginInfo.loginData,
            productList:state.order.productList,
        }
    }else{
        return "nextSuccessor";
    }
};

const exchangeProductsOrder = function(path,state){
    if(path === "/exchange/product"){
        let postData = {
            accessInfo:state.loginInfo.loginData,
            productList:state.order.productList,
            addressId:state.address.currentAddress.id,
            count:state.order.totalProductCount,
            xtbPrice:state.order.totalPrice,
            tradeWay:2
        };
        console.log(postData);
        return _h.ajax.resource(path).save({},postData)
    }else{
        return "nextSuccessor";
    }
};

order.orderListInfo = function(products) {
    const calc = function() {
        order.totalPrice = 0;
        order.totalProductCount = 0;
        for (let i = 0, item; item = order.productList[i++];) {
            calcTotalNum(item);
            calcTotalMoney(item);
        }
        return {
            totalPrice:order.totalPrice,
            totalProductCount: order.totalProductCount
        }
    };

    return {
        productList: setOrderProductList(products),
        totalPrice: calc().totalPrice,
        totalProductCount: calc().totalProductCount
    }
};



order.createOrder = buyDiamondsOrder.after(exchangeProductsOrder);

module.exports = order;





