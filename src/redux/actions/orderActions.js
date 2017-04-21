/**
 * Created by LDQ on 2017/4/20.
 */

import _order from '../actionModule/orderModule';
import _shoppingCart from '../actionModule/shoppingCardModule';

export const orderActions = {

    createProductList: (products)=>{
        return (dispatch,getState)=>{
            let orderListInfo;
            if(!Array.isArray(products)){
                let productList = Object.assign({},)
            }else{
                orderListInfo =
            }


            let productListInfo = _order.orderListInfo(products,_shoppingCart.checkedProduct);

            dispatch({type:'PUSH_PRODUCTS', productListInfo});
        }
    },
    clearProducts: ()=>{
        return {
            type: CLEAR_PRODUCTS
        }
    }

};