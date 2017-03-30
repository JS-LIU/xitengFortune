/**
 * Created by LDQ on 2017/3/27.
 */

import {
    SHOW_SPEC_PRO,
    HIDE_SPEC_PRO,
    SYNC_SPEC_PRO,
    SELECTED_SPEC_PRO,
    INCREASE_NUM,
    REDUCE_NUM
} from '../actions/specificationActionKeys';


export const specification = function(state = {},action){

    switch (action.type) {
        case 'SYNC_SPEC_PRO':
            return Object.assign({},state,{
                spec:action.specProperties
            });

        case 'SHOW_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:true
            });

        case 'HIDE_SPEC_PRO':

            return Object.assign({},state,{
                isShowSpec:false
            });

        case 'INCREASE_NUM':
            return Object.assign({},state,{
                spec:action.specProperties
            });

        default:
            return state
    }
};