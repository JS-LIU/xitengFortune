/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_PRODUCT_LIST_SHOP } from '../actions/productListActionKeys';

export const productList_shop = function (state={}, action){
    switch (action.type) {

        case 'GET_PRODUCT_LIST_SHOP':
            return Object.assign({},state,action.productListInfo);

        default:
            return state
    }

};