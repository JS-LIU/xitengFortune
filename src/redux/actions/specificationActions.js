/**
 * Created by LDQ on 2017/3/27.
 */
import { SYNC_SPEC_PRO } from '../actions/specificationActionKeys';
import specOperator from '../actionModule/specificationModule';

//  不需要单独的规格action 在【加入购物车/立即购买】dispatch即可
export const specificationActions = {

    syncSpecProperties:()=>{
        return (dispatch,getState)=>{

            let specInfo = specOperator.syncSpecProperties(getState());
            dispatch({type:'SYNC_SPEC_PRO', specInfo})
        }
    },
    getStockKLine:(index)=>{
        return {
            type : GET_STOCKKLINE,
            index
        }

    }

};