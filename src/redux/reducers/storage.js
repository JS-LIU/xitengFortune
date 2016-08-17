/**
 * Created by LDQ on 2016/8/17.
 */


import {SET_PRODUCTID,GET_PRODUCTID} from '../actions/storageActionKeys'

export const storage = function(state = {},action){

    switch (action.type) {
        case 'SET_PRODUCTID':
            return Object.assign({},state,{
                productId:action.id
            });
        case 'GET_PRODUCTID':
            console.log('storageActions->store->storage->productId->',state.productId);
            return state.productId;
        default:
            return state
    }
};