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

import { SHOW_SPEC_PRO,HIDE_SPEC_PRO,SYNC_CUSTOMER_SPECIFICATIONS } from '../actions/specificationActionKeys';
import SpecOperator from '../actionModule/specificationModule';

export const shoppingCartActions = {

    addProductItem:(item)=>{
        return (dispatch,getState)=>{
            let specOperator = new SpecOperator(getState());
            let newSpecifications = specOperator.syncCustomerSelectedSpec();

            let isAllSelected = specOperator.isAllSelected(newSpecifications);
            let newProductItem = specOperator.connect(item,newSpecifications);
            if(isAllSelected){
                dispatch({type:'HIDE_SPEC_PRO'});
                dispatch({type:'SYNC_CUSTOMER_SPECIFICATIONS',newSpecifications});
                dispatch({type:'ADD_PRODUCTITEM',newProductItem});
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