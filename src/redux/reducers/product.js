/**
 * Created by LDQ on 2017/4/12.
 */

import { CREATE_PRODUCT,SET_BELONG,INCREASE_NUM,REDUCE_NUM } from '../actions/productActionKeys'


export const product = function (state={},action){
    switch (action.type) {

        case 'CREATE_PRODUCT':

            return Object.assign({},state,{
                info:action.product,
                belong:null
            });
        case 'SET_BELONG':

            return Object.assign({},state,{
                belong:action.belong
            });
        case 'INCREASE_NUM':

            return Object.assign({},state,{
                info:action.productInfo
            });
        case 'REDUCE_NUM':

            return Object.assign({},state,{
                info:action.productInfo
            });
        default:
            return state
    }

};