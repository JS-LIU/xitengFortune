/**
 * Created by LDQ on 2016/8/17.
 */


import {SET_PRODUCTID,GET_PRODUCTID,SET_STOCKGAMEID,GET_STOCKGAMEID} from '../actions/storageActionKeys'

export const storage = function(state = {},action){

    switch (action.type) {
        case 'SET_PRODUCTID':
            return Object.assign({},state,{
                productId:action.id
            });

        case 'GET_PRODUCTID':
            return state.productId;

        case 'SET_STOCKGAMEID':
            return Object.assign({},state,{
                stockGameId:action.id
            });

        case 'GET_STOCKGAMEID':
            console.log(state.stockGameId);
            return state.stockGameId;
        // case ''


        default:
            return state
    }
};