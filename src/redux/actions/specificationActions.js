/**
 * Created by LDQ on 2017/3/27.
 */
import { INCREASE_NUM,REDUCE_NUM } from '../actions/specificationActionKeys';
import spec from '../actionModule/specificationModule';

export const specificationActions = {

    increaseNum:(item)=>{

        return (dispatch,getState)=>{

            let specProperties = spec(getState()).increaseNum(item);
            dispatch({type:'INCREASE_NUM',specProperties});
        };
    }

};