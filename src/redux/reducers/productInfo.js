/**
 * Created by LDQ on 2016/8/18.
 */


import { GET_PRODUCTINFO,INCREASE_NUM } from '../actions/productInfoActionKeys'


export const productInfo = function (state={},action){
    switch (action.type) {
        case 'GET_PRODUCTINFO':

            return Object.assign({},state,action.newProductInfo);

        case 'INCREASE_NUM':

            let productInfo = state.productInfo;
            productInfo.specifications = action.productSpec;
            return Object.assign({},state,{
                productInfo:productInfo
            });

        default:
            return state
    }

};