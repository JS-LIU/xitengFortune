/**
 * Created by LDQ on 2017/3/27.
 */


import _h from '../../Util/HB';

export const productInfo = {
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

    let spec = productInfo.productInfo.specifications || [];
    spec.push({name:'数量',content:'1',key:'num'});
    productInfo.productInfo.specifications = spec;
    return productInfo;

};



// module.exports = productInfo;