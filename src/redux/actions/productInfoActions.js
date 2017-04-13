/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_PRODUCTINFO} from './productInfoActionKeys';
import {CREATE_PRODUCT} from './productActionKeys';
import {HIDE_SPEC_PRO} from './specificationActionKeys';

import {productInfo} from '../actionModule/productInfoModule';
import _product from '../actionModule/productModule';

export const productInfoActions = {

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                let product = _product.createProduct(productInfo.productInfo);

                dispatch({type:'CREATE_PRODUCT',product});
                dispatch({type:'GET_PRODUCTINFO', productInfo});

            }).catch((error)=>{
                console.log("error",error);
            });

        }
    },
};
