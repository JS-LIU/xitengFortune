/**
 * Created by LDQ on 2016/8/18.
 */


import { GET_PRODUCTINFO } from '../actions/productInfoActionKeys'


export const productInfo = function (state={},action){
    switch (action.type) {

        case 'GET_PRODUCTINFO':
            return Object.assign({},state,action.productInfo);

        default:
            return state
    }

};