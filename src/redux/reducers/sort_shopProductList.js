/**
 * Created by LDQ on 2017/6/14.
 */

import {SELECTED_SHOP_PRODUCT_LIST_SORT} from '../actions/sortActionKeys';

export const sort_shopProductList = function(state = {},action){

    switch (action.type) {
        case 'SELECTED_SHOP_PRODUCT_LIST_SORT':
            return Object.assign({},state,{
                sortList:action.newSortList
            });
        default:
            return state
    }
};