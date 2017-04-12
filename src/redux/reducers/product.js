/**
 * Created by LDQ on 2017/4/12.
 */

import { INCREASE_NUM } from '../actions/productActionKeys'


export const product = function (state={},action){
    switch (action.type) {

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