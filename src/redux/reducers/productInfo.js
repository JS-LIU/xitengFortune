/**
 * Created by LDQ on 2016/8/18.
 */


import { GET_SHOP_PRODUCT_INFO } from '../actions/productInfoActionKeys'


export const productInfo = function (state={},action){
    switch (action.type) {

        //  获取 商店 商品详情
        case 'GET_SHOP_PRODUCT_INFO':

            return Object.assign({},state,{
                shopProductInfo:action.shopProductInfo
            });


        default:
            return state
    }

};