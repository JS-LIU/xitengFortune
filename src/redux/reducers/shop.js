/**
 * Created by LDQ on 2016/8/15.
 */


import {GET_PRODUCTS} from '../actions/shopActionKeys';

export const shop = function(state = {},action){

    switch (action.type) {
        case 'GET_PRODUCTS':

            return Object.assign({},state,{
                productList:action.data.productList
            });

        default:
            return state
    }
};