/**
 * Created by LDQ on 2016/10/8.
 */
import {CREATE_TRADEORDER} from '../actions/createTradeOrderActionKeys';
export const storage = function(state = {},action){

    switch (action.type) {
        case 'CREATE_TRADEORDER':
            return Object.assign({},state,{
                tradeOrder:action.data
            });

        default:
            return state
    }
};