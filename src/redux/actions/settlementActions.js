/**
 * Created by LDQ on 2017/3/21.
 */
import {PUSH_PRODUCTS,CLEAR_PRODUCTS} from './settlementActionKeys';

export const settlementActions = {


    pushProducts: (product)=>{
        return (dispatch,getState)=>{
            let productListInfo,products;
            if(product !== undefined){

                let isAllSelected = specOperator.isAllSelected(newSpecifications);

                productListInfo = getProductListInfo(products);
                if(isAllSelected) {
                    dispatch({type: 'HIDE_SPEC_PRO'});
                    dispatch({type:'PUSH_PRODUCTS', productListInfo});
                }
            }else{
                products = getState().shoppingCart.products;
                productListInfo = getProductListInfo(products);

                dispatch({type:'PUSH_PRODUCTS', productListInfo});
            }


        }
    },
    clearProducts: ()=>{
        return {
            type: CLEAR_PRODUCTS
        }
    }

};