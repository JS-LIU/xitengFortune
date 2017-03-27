/**
 * Created by LDQ on 2017/3/27.
 */


import _h from '../../Util/HB';

const productInfo = {
    getProductInfo:{},
    addSpec:{}
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


productInfo.addSpec = function(productInfo){
    let spec = productInfo.spec || {};
    spec.num = null;
    return Object.assign({},productInfo,spec)

};



module.exports = productInfo;