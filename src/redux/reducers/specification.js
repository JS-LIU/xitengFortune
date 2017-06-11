/**
 * Created by LDQ on 2017/3/27.
 */

import {
    SHOW_SPEC_PRO,
    HIDE_SPEC_PRO,
} from '../actions/specificationActionKeys';


export const specification = function(state = {},action){

    switch (action.type) {

        case 'SHOW_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:true,
                isBuyNow:action.isBuyNow
            });

        case 'HIDE_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:false
            });

        default:
            return state
    }
};