/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_PRODUCTINFO,INCREASE_NUM} from './productInfoActionKeys';
import {CREATE_PRODUCT} from './productActionKeys';
import {SYNC_SPEC_PRO,HIDE_SPEC_PRO} from './specificationActionKeys';
import {productInfo} from '../actionModule/productInfoModule';

import SpecOperator from '../actionModule/specificationModule';

import _product from '../actionModule/productModule';

import _h from '../../Util/HB';


export const productInfoActions = {

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                dispatch({type:'GET_PRODUCTINFO', productInfo});

                let product = _product.createProduct(productInfo.productInfo);
                dispatch({type:'CREATE_PRODUCT',product});

            }).catch((error)=>{
                console.log("error",error);
            });

        }
    },
    increaseNum:(item)=>{
        return (dispatch,getState)=>{

            let productSpec = new SpecOperator(getState()).increaseNum(item);
            dispatch({type:'INCREASE_NUM',productSpec});
        }
    }
};
