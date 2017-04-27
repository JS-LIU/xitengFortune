/**
 * Created by LDQ on 2016/8/18.
 */

import {
    CHANGE_PRODUCT_LIST,
    EDIT
} from '../actions/shoppingCartActionKeys';

export const shoppingCart = function(state = {},action){

    switch (action.type) {

        case 'CHANGE_PRODUCT_LIST':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.shoppingCartInfo.isAllChecked
            });

        case 'EDIT':
            let edit = state.edit;
            return Object.assign({},state,{
                edit:!edit
            });

        default:
            return state;
    }
};