/**
 * Created by LDQ on 2017/5/18.
 */
import {GET_XB_LIST} from '../actions/productListActionKeys';

export const XBList = function(state = {},action){

    switch (action.type) {
        case 'GET_XB_LIST':

            return Object.assign({},state,action.info);

        default:
            return state
    }
};