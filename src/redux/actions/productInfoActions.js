/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_PRODUCTINFO,INCREASE_NUM} from './productInfoActionKeys';
import {SYNC_SPEC_PRO,HIDE_SPEC_PRO} from './specificationActionKeys';
import {productInfo} from '../actionModule/productInfoModule';
import SpecOperator from '../actionModule/specificationModule';

import _h from '../../Util/HB';


export const productActions = {

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((data)=>{
                let newProductInfo = productInfo.addSpec(data);
                let productSpecifications = newProductInfo.productInfo.specifications;
                let specProperties = new SpecOperator(getState()).syncSpecProperties(productSpecifications);

                dispatch({type:'GET_PRODUCTINFO', newProductInfo});
                dispatch({type:'SYNC_SPEC_PRO', specProperties});

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
