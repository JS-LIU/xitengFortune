/**
 * Created by liudq on 16/9/29.
 */
import {SELECTED_BUY_XTCOIN} from '../actions/XTCoinsActionKeys';

export const XTCoins = function(state = {},action){

    switch (action.type) {
        case 'SELECTED_BUY_XTCOIN':
            let XTCoinList = [...state.XTCoinList];
            XTCoinList[action.index].selected = true;
            return Object.assign({},state,{
                XTCoinList:XTCoinList
            });

        default:
            return state
    }
};