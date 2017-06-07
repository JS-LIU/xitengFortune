/**
 * Created by LDQ on 2016/8/18.
 */


import {
    GET_SHOP_PRODUCT_INFO,
    INCREASE_SHOP_PRODUCT_NUM,
    REDUCE_SHOP_PRODUCT_NUM,
    SET_SHOP_PRODUCT_BELONG} from '../actions/productInfoActionKeys'

export const shopProductInfo = function (state={},action){
    switch (action.type) {

        //  获取 商店商品 详情
        case 'GET_SHOP_PRODUCT_INFO':
            return Object.assign({},state,{
                info:action.shopProductInfo
            });

        //  增加 商店商品 选择的数量
        case 'INCREASE_SHOP_PRODUCT_NUM':
            return Object.assign({},state,{
                info:action.shopProductInfo
            });

        //  减少 商店商品 选择的数量
        case 'REDUCE_SHOP_PRODUCT_NUM':
            return Object.assign({},state,{
                info:action.shopProductInfo
            });

        //  设置 确认后 为【加入购物车】 还是 【生成订单】
        case 'SET_SHOP_PRODUCT_BELONG':
            return Object.assign({},state,{
                belong:action.belong
            });
        default:
            return state
    }

};