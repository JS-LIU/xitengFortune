/**
 * Created by LDQ on 2016/10/25.
 */
import { CREATE_SUCCESS,CREATE_FAIL,SET_TRADEORDER } from '../actions/createTradeOrderActionKeys'


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
                tradeOrder:action.tradeInfo
            });
        default:
            return state
    }

};