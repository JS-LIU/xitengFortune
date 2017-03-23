/**
 * Created by LDQ on 2017/3/21.
 */
import { PUSH_PRODUCTS,CLEAR_PRODUCTS } from '../actions/settlementActionKeys';

export const settlement = function(state = {},action){

    switch (action.type) {

        case 'PUSH_PRODUCTS':



            return Object.assign({},state,{
                productList:action.productListInfo.productList,
                count:action.productListInfo.count,
                xtbPrice:action.productListInfo.xtbPrice
            });

        case 'CLEAR_PRODUCTS':

            return Object.assign({},state,{
                productList:[],
                count:0,
                xtbPrice:0
            });


        default:
            return state
    }
};