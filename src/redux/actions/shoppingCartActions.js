/**
 * Created by LDQ on 2016/8/18.
 */

import {ADD_PRODUCTITEM} from '../actions/shoppingCartActionKeys';

export const shoppingCartActions = {

    addProductItem:(item)=>{
        return {
            type:ADD_PRODUCTITEM,
            item
        }
    }

};