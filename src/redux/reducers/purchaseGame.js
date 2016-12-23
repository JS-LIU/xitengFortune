/**
 * Created by LDQ on 2016/12/22.
 */
import { GET_NEWEST_WIN_LIST } from '../actions/purchaseGameActionKeys';


export const purchaseGame = function(state = {},action){

    switch (action.type) {
        case 'GET_NEWEST_WIN_LIST':
            return Object.assign({},state,{
                newestWin:action.data.content
            });

        default:
            return state
    }
};