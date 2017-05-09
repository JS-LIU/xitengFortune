/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_PRODUCT_LIST } from '../actions/productListActionKeys';

export const productList = function (state={},action){
    switch (action.type) {

        case 'GET_PRODUCT_LIST':
            //  todo 没有写分页
            return Object.assign({},state,{
                list:action.productList,
                last:action.last,
                pageNo:action.pageNo
            });

        default:
            return state
    }

};