/**
 * Created by LDQ on 2016/8/23.
 */
import {GET_PRODUCTS} from '../actions/shopActionKeys';

export const diamonds = function(state = {},action){

    switch (action.type) {
        case 'GET_PRODUCTS':

            return Object.assign({},state,{
                diamondList:action.data.productList
            });

        default:
            return state
    }
};
