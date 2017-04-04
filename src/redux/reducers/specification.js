/**
 * Created by LDQ on 2017/3/27.
 */

import {
    SHOW_SPEC_PRO,
    HIDE_SPEC_PRO,
    SYNC_SPEC_PRO,
    SYNC_CUSTOMER_SPECIFICATIONS
} from '../actions/specificationActionKeys';


export const specification = function(state = {},action){

    switch (action.type) {
        case 'SYNC_SPEC_PRO':
            return Object.assign({},state,{
                spec:action.specProperties
            });

        case 'SHOW_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:true,
                isBuyNow:action.isBuyNow
            });

        case 'HIDE_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:false
            });

        case 'SYNC_CUSTOMER_SPECIFICATIONS':
            return Object.assign({},state,{
                spec:action.newSpecifications
            });
        default:
            return state
    }
};