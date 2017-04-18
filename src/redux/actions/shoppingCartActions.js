/**
 * Created by LDQ on 2016/8/18.
 */

import {
    ADD_PRODUCTITEM,
    CALC_TOTALMONEY,
    DELETE_PRODUCTS,
    CHECKED_ITEM,
    ALLCHECKED,
    INCREASE,
    REDUCE,
    EDIT
} from '../actions/shoppingCartActionKeys';
import { HIDE_SPEC_PRO } from '../actions/specificationActionKeys';

import _shoppingCart from '../actionModule/shoppingCardModule';


export const shoppingCartActions = {

    addProduct:(product)=>{
        return (dispatch,getState)=>{

            let products = getState().shoppingCart.products;
            let shoppingCartInfo = _shoppingCart.setShoppingCart({
                changeList:function(){
                    return _shoppingCart.addProduct(products,product)
                }
            });

            dispatch({type:'HIDE_SPEC_PRO'});
            dispatch({type:'ADD_PRODUCTITEM',shoppingCartInfo});

        }
    },
    calcTotalMoney:()=>{
        return {
            type:CALC_TOTALMONEY
        }
    },
    checkedItem:(index)=>{
        return {
            type:CHECKED_ITEM,
            index
        }
    },
    allCheck:(bool=true)=>{
        return {
            type:ALLCHECKED,
            bool
        }
    },
    increase:(index)=>{
        return{
            type:INCREASE,
            index
        }
    },
    reduce:(index)=>{
        return {
            type:REDUCE,
            index
        }
    },
    deleteProducts:()=>{
        return {
            type:DELETE_PRODUCTS
        }
    },
    edit:()=>{
        return {
            type:EDIT
        }
    }

};