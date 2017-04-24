/**
 * Created by LDQ on 2016/10/25.
 */
import { CREATE_SUCCESS,CREATE_FAIL,SET_TRADEORDER,CREATE_PRODUCTLIST } from '../actions/createTradeOrderActionKeys'
import { CREATE_ORDER_LIST_INFO,CREATE_ORDER } from '../actions/orderActionKeys';


let diamondsAmount = function (price){
    return price;
};

export const order = function (state={},action){
    switch (action.type) {
        case CREATE_SUCCESS:
            return Object.assign({},state,{
                isSuccess:true
            });
        case CREATE_FAIL:
            return Object.assign({},state,{
                isSuccess:false
            });
        case SET_TRADEORDER:
            return Object.assign({},state,{
                tradeOrder:action.tradeInfo,
                amount:diamondsAmount(action.price)
            });
        case CREATE_ORDER_LIST_INFO:
            return Object.assign({},state,{
                productList:action.orderListInfo.productList,
                totalPrice:action.orderListInfo.totalPrice,
                totalProductCount:action.orderListInfo.totalProductCount
            });
        default:
            return state
    }

};