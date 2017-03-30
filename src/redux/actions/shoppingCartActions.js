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

import { SHOW_SPEC_PRO,HIDE_SPEC_PRO } from '../actions/specificationActionKeys';
import spec from '../actionModule/specificationModule';

export const shoppingCartActions = {

    addProductItem:(item)=>{
        return (dispatch,getState)=>{

            let isAllSelected = spec(getState()).isAllSelected;

            if(isAllSelected){
                dispatch({type:'HIDE_SPEC_PRO'});
                dispatch({type:'ADD_PRODUCTITEM',item});
            }else{
                dispatch({type:'SHOW_SPEC_PRO'});
            }
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