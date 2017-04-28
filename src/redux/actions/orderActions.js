/**
 * Created by LDQ on 2017/4/20.
 */

import { CREATE_ORDER_LIST_INFO,CREATE_ORDER } from './orderActionKeys';
import _order from '../actionModule/orderModule';

export const orderActions = {

    createOrderListInfo: (products)=>{
        return (dispatch,getState)=>{

            let orderListInfo = _order.orderListInfo(products);
            dispatch({type:'CREATE_ORDER_LIST_INFO', orderListInfo});
        }
    },
    createOrder:(path)=>{
        return (dispatch,getState)=>{

            _order.createOrder(path,getState()).then((dealInfo)=>{
                console.log("success-orderActions-createOrder-dealInfo======",dealInfo);

                dispatch({type:'CREATE_ORDER', dealInfo});
            });
        }
    }
};