/**
 * Created by LDQ on 2016/9/13.
 */

import { GET_STOCKDETAIL} from '../actions/stockGameDetailActionKeys'


export const stockGameDetail = function (state = {},action){
    switch (action.type) {
        case 'GET_STOCKDETAIL':

            return Object.assign({},state,{
                detail:action.data
            });

        default:
            return state
    }

};