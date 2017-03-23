/**
 * Created by LDQ on 2017/3/20.
 */

import _h from '../../Util/HB';

const orderDiamonds = function(path,state){
    if(path == '/createTradeOrder'){
        let loginInfo = state.loginInfo;

        let postData = {
            accessInfo:loginInfo.loginData,
            totalPrice:state.diamonds.amount,
            totalProductCount:state.diamonds.amount,
            productType:2,
            orderType:1
        };
        return _h.ajax.resource('/createTradeOrder').save({},postData);
    }else{
        return 'nextSuccessor'
    }
};

const orderProducts = function(path,state){
    if(path == '/exchange/product'){
        let loginInfo = state.loginInfo;

        let postData = {
            accessInfo:loginInfo.loginData,
            productList:state.settlement.productList,
            addressId:state.address.currentAddress.id,
            count:state.settlement.count,
            xtbPrice:state.settlement.xtbPrice,
            tradeWay:2
        };
        return _h.ajax.resource('/exchange/product').save({},postData);
    }else{
        return 'nextSuccessor'
    }
};
export const chainOrderDiamonds = new _h.design.Chain(orderDiamonds);
const chainOrderProducts = new _h.design.Chain(orderProducts);
chainOrderDiamonds.setNextSuccessor(chainOrderProducts);
