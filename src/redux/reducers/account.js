/**
 * Created by LDQ on 2016/9/29.
 */

import { GET_ACCOUNT } from '../actions/accountActionKeys';

export const account = function(state = {},action){

    switch (action.type) {
        case 'GET_ACCOUNT':
            console.log(action.data);

            return Object.assign({},state,action.data);

        default:
            return state
    }
};

