/**
 * Created by LDQ on 2017/4/12.
 */

import { SET_BELONG,INCREASE_NUM,REDUCE_NUM } from './productActionKeys';
import {SHOW_SPEC_PRO} from './specificationActionKeys';
import _product from '../actionModule/productModule';

export const productActions = {

    setBelong:(belong)=>{
        return (dispatch,getState)=>{
            dispatch({type:'SHOW_SPEC_PRO'});
            dispatch({type:'SET_BELONG',belong});

        }
    },
    increaseNum:(product)=>{
        return (dispatch,getState)=>{

            let productInfo = _product.increaseNum(product);
            dispatch({type:'INCREASE_NUM',productInfo});

        }
    },
    reduceNum:(product)=>{
        return (dispatch,getState)=>{

            let productInfo = _product.reduceNum(product);
            dispatch({type:'REDUCE_NUM',productInfo});

        }
    }

};
