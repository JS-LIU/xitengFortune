/**
 * Created by LDQ on 2017/3/20.
 */
import _shoppingCart from '../actionModule/shoppingCardModule';
const order = {
    productList: [],

    createOrderList: {},
    totalPrice: "",
    totalProductCount: "",
    productType: ""
};

const setOrderProductList = function(products) {
    if (Array.isArray(products)) {
        order.productList = _shoppingCart.checkedProduct(products);
    } else {
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

order.orderListInfo = function(products) {
    const calc = function() {
        order.totalPrice = 0;
        order.totalProductCount = 0;
        for (let i = 0, item; item = products[i++];) {
            calcTotalNum(item);
            calcTotalMoney(item);
        }
        return {
            totalPrice:order.totalPrice,
            totalProductCount: order.totalProductCount
        }
    };

    return {
        productList: setOrderProductList(),
        totalPrice: calc().totalPrice,
        totalProductCount: calc().totalPrice
    }
};

const buyDiamondsOrder = function(accessInfo){
    if(path === "/createTradeOrder"){
        let data = {
            accessInfo:accessInfo,
            productList:{},

        }
    }
};

order.createOrder = buyDiamondsOrder.after();


Function.prototype.after = function(fn) {
    let self = this;
    return function() {
        let ret = self.apply(this, arguments);
        if (ret === "nextSuccessor") {
            return fn.apply(this.arguments);
        }
        return ret;
    }

};
module.exports = order;





