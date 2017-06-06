/**
 * Created by LDQ on 2017/4/12.
 */

import { SET_BELONG,INCREASE_NUM,REDUCE_NUM } from './productActionKeys';
import {SHOW_SPEC_PRO} from './specificationActionKeys';
import _product from '../service/productService';

export const productActions = {

    setBelong:(belong)=>{
        return (dispatch,getState)=>{
            dispatch({type:'SHOW_SPEC_PRO'});
            dispatch({type:'SET_BELONG',belong});

        }
    },
    increaseNum:(type,product)=>{
        return (dispatch,getState)=>{
            let productInfo = _product(type,product).increaseNum().info;
            dispatch({type:'INCREASE_NUM',productInfo});

        }
    },
    reduceNum:(type,product)=>{
        return (dispatch,getState)=>{

            let productInfo = _product(type,product).reduceNum().info;
            dispatch({type:'REDUCE_NUM',productInfo});

        }
    }

};
