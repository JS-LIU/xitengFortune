/**
 * Created by LDQ on 2017/4/20.
 */

import _order from '../actionModule/orderModule';

export const orderActions = {

    createProductList: (products)=>{
        return (dispatch,getState)=>{

            let orderListInfo = _order.orderListInfo(products);
            dispatch({type:'PUSH_PRODUCTS', orderListInfo});
        }
    },
    clearProducts: ()=>{
        return {
            type: CLEAR_PRODUCTS
        }
    },
    createOrder:()=>{
        return (dispatch,getState)=>{

            _order.createOrder(getState()).then((orderInfo)=>{
                dispatch({type:'PUSH_PRODUCTS', orderInfo});
            });

        }
    }

};