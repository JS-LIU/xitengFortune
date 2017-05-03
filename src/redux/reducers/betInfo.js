/**
 * Created by LDQ on 2016/12/6.
 */
import { GET_ODDS,SET_BET_MONEY } from '../actions/betActionKeys';

export const betInfo = function(state = {},action){

    switch (action.type) {
        case 'GET_ODDS':
            return Object.assign({},state,{
                upOdds:action.data.upOdds,
                downOdds:action.data.downOdds
            });
        case 'SET_BET_MONEY':
            return Object.assign({},state,{
                betMoney:action.money
            });
        default:
            return state
    }
};

