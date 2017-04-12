/**
 * Created by LDQ on 2017/4/12.
 */

import {INCREASE_NUM} from './productActionKeys';

import _h from '../../Util/HB';


export const productActions = {

    increaseNum:(item)=>{
        return (dispatch,getState)=>{


            dispatch({type:'INCREASE_NUM',productSpec});
        }
    }
};
