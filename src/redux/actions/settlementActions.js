/**
 * Created by LDQ on 2017/3/21.
 */
import {PUSH_PRODUCTS,CLEAR_PRODUCTS} from './settlementActionKeys';
import getProductListInfo from '../actionModule/settlementModule';
import SpecOperator from '../actionModule/specificationModule';

export const settlementActions = {


    pushProducts: (product)=>{
        return (dispatch,getState)=>{
            let productListInfo,products;
            if(product !== undefined){

                let specOperator = new SpecOperator(getState());
                let newSpecifications = specOperator.syncCustomerSelectedSpec();
                let isAllSelected = specOperator.isAllSelected(newSpecifications);
                let newProductItem = specOperator.connect(product,newSpecifications);
                newProductItem.checked = true;
                products = [newProductItem];
                productListInfo = getProductListInfo(products);
                if(isAllSelected) {
                    dispatch({type: 'HIDE_SPEC_PRO'});
                    dispatch({type: 'SYNC_CUSTOMER_SPECIFICATIONS', newSpecifications});
                    dispatch({type:'PUSH_PRODUCTS', productListInfo});
                    window.location.hash = "#/ConfirmOrder";
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