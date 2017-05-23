/**
 * Created by LDQ on 2017/5/18.
 */
import {GET_PURCHASE_GAME_PRODUCT_LIST,CHANGE_PURCHASE_PRODUCT_LIST_SORT} from '../actions/productListActionKeys';

export const purchaseGameProductList = function(state = {},action){

    switch (action.type) {
        case 'GET_PURCHASE_GAME_PRODUCT_LIST':
            return Object.assign({},state,{
                last:action.info.last,
                list:action.info.list,
                pageNo:action.info.pageNo
            });

        case 'CHANGE_PURCHASE_PRODUCT_LIST_SORT':
            return Object.assign({},state,{
                sort:action.sortInfo
            });
        default:
            return state
    }
};