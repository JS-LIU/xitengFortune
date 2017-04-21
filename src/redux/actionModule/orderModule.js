/**
 * Created by LDQ on 2017/3/20.
 */

// import _h from '../../Util/HB';
//
// const orderDiamonds = function(path,state){
//     if(path === '/createTradeOrder'){
//         let loginInfo = state.loginInfo;
//
//         let postData = {
//             accessInfo:loginInfo.loginData,
//             totalPrice:state.diamonds.amount,
//             totalProductCount:state.diamonds.amount,
//             productType:2,
//             orderType:1
//         };
//         return _h.ajax.resource('/createTradeOrder').save({},postData);
//     }else{
//         return 'nextSuccessor'
//     }
// };
//
// const orderProducts = function(path,state){
//     if(path === '/exchange/product'){
//         let loginInfo = state.loginInfo;
//
//         let postData = {
//             accessInfo:loginInfo.loginData,
//             productList:state.settlement.productList,
//             addressId:state.address.currentAddress.id,
//             count:state.settlement.count,
//             xtbPrice:state.settlement.xtbPrice,
//             tradeWay:2
//         };
//         return _h.ajax.resource('/exchange/product').save({},postData);
//     }else{
//         return 'nextSuccessor'
//     }
// };
//
// export const chainOrderDiamonds = new _h.design.Chain(orderDiamonds);
// const chainOrderProducts = new _h.design.Chain(orderProducts);
// chainOrderDiamonds.setNextSuccessor(chainOrderProducts);

const order = {
    productList: [],

    createOrderList: {},
    totalPrice: "",
    totalProductCount: "",
    productType: ""
};

const setOrderProductList = function(products,fn) {
    if (Array.isArray(products)) {
        order.productList = fn;
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

order.orderListInfo = function(products,fn) {
    const calc = function() {
        order.totalPrice = 0;
        order.totalProductCount = 0;
        for (let i = 0, item; item < products[i++];) {
            calcTotalNum(item);
            calcTotalMoney(item);
        }
    };

    return {
        productList: setOrderProductList(),
        totalPrice: order.totalPrice,
        totalProductCount: order.totalProductCount
    }
};

order.createOrder = function(path) {


};
const buyDiamonds = function(accessInfo){
    if(path === "/createTradeOrder"){
        let data = {
            accessInfo:accessInfo,
            productList:{},

        }
    }
};



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





