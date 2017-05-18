/**
 * Created by LDQ on 2017/3/27.
 */


import _h from '../../Util/HB';

export const productInfo = {
    getProductInfo:{},
};

productInfo.getProductInfo = function(state){
    let loginInfo = state.loginInfo;
    let productId = state.storage.productId;

    let postData = {
        accessInfo:loginInfo.baseLoginData,
        productId:productId
    };

    return _h.ajax.resource('/product/:path').save({path:"detail"},postData)
};