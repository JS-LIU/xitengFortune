/**
 * Created by LDQ on 2016/9/26.
 */
import {BET_AMOUNT,IMMEDIATELY_BET} from '../actions/betActionKeys';

export const bet = function(state = {},action){

    switch (action.type) {
        case 'BET_AMOUNT':

            return Object.assign({},state,{
                betAmount:action.money
            });

        default:
            return state
    }
};