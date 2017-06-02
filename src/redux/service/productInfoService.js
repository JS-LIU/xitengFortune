/**
 * Created by LDQ on 2017/3/27.
 */


import _h from '../../Util/HB';

// export const productInfo = {
//     getProductInfo:{},
// };
//
// productInfo.getProductInfo = function(state){
//     let loginInfo = state.loginInfo;
//     let productId = state.storage.productId;
//
//     let postData = {
//         accessInfo:loginInfo.baseLoginData,
//         productId:productId
//     };
//
//     return _h.ajax.resource('/product/:path').save({path:"detail"},postData)
// };




/**
 * 获取 商店商品 详情
 * @param state
 * @returns {*}
 */
let getShopProductInfo = function(state){
    let loginInfo = state.loginInfo;
    let productId = state.storage.productId;

    let postData = {
        accessInfo:loginInfo.baseLoginData,
        productId:productId
    };

    return _h.ajax.resource('/product/:path').save({path:"detail"},postData)
};

/**
 * 获取 喜币 详情
 * @param XBInfo
 * @returns {*}
 * @constructor
 */
let getXBProductInfo = function(XBInfo){
    return XBInfo;
};

/**
 * 商品类型
 * @type {{shopProductInfo: getShopProductInfo, XBProductInfo: getXBProductInfo}}
 */
let productInfoTypes = {
    'shopProductInfo':getShopProductInfo,
    'XBProductInfo':getXBProductInfo
};


/**
 * 获取商品列表接口
 * @param 商品类型
 * @param 获取该种商品所需的其他参数
 */
let productInfoService = function(...args){
    let type = args.shift();
    return productInfoTypes[type].apply(this,args);
};
module.exports = productInfoService;

