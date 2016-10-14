/**
 * Created by LDQ on 2016/8/23.
 */
import {GET_DIAMONDS} from '../actions/diamondsActions';

export const diamonds = function(state = {},action){

    switch (action.type) {
        case 'GET_DIAMONDS':

            return Object.assign({},state,{
                diamondList:action.data.productList
            });

        default:
            return state
    }
};
