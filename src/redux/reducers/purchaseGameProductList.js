/**
 * Created by LDQ on 2017/5/18.
 */
import {GET_PURCHASE_GAME_PRODUCT_LIST} from '../actions/productListActionKeys';

export const purchaseGameProductList = function(state = {},action){

    switch (action.type) {
        case 'GET_PURCHASE_GAME_PRODUCT_LIST':

            return Object.assign({},state,action.info);

        default:
            return state
    }
};