/**
 * Created by LDQ on 2016/8/18.
 */

import {ADD_PRODUCTITEM,CALC_TOTALMONEY,CHECKED_ITEM,ALLCHECKED} from '../actions/shoppingCartActionKeys';

export const shoppingCartActions = {

    addProductItem:(item)=>{
        return {
            type:ADD_PRODUCTITEM,
            item
        }
    },
    calcTotalMoney:()=>{
        return {
            type:CALC_TOTALMONEY
        }
    },
    checkedItem:(item)=>{
        return {
            type:CHECKED_ITEM,
            item
        }
    },
    allCheck:()=>{
        return {
            type:ALLCHECKED
        }
    }

};