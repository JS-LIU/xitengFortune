/**
 * Created by LDQ on 2017/3/27.
 */

import { SYNC_SPEC_PRO } from '../actions/specificationActionKeys';


export const specification = function(state = {},action){

    switch (action.type) {

        case 'SYNC_SPEC_PRO':
            return Object.assign({},state,action.specInfo);

        default:
            return state
    }
};