/**
 * Created by LDQ on 2016/8/18.
 */

import {ADD_PRODUCTITEM,CALC_TOTALMONEY,DELETE_PRODUCTS,CHECKED_ITEM,ALLCHECKED,INCREASE,REDUCE} from '../actions/shoppingCartActionKeys';

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
    },
    increase:(item)=>{
        return{
            type:INCREASE,
            item
        }
    },
    reduce:(item)=>{
        return {
            type:REDUCE,
            item
        }
    },
    deleteProducts:()=>{
        return {
            type:DELETE_PRODUCTS
        }
    }

};