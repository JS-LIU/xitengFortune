/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_PRODUCTINFO} from './productInfoActionKeys';
import {SYNC_SPEC_PRO,HIDE_SPEC_PRO} from './specificationActionKeys';
import {productInfo} from '../actionModule/productInfoModule';
import spec from '../actionModule/specificationModule';

import _h from '../../Util/HB';

export const productActions = {

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((data)=>{
                let newProductInfo = productInfo.addSpec(data);
                let specProperties = spec(getState(),newProductInfo).syncSpecProperties;

                dispatch({type:'GET_PRODUCTINFO', newProductInfo});
                dispatch({type:'SYNC_SPEC_PRO', specProperties});

            }).catch((error)=>{
                console.log("error",error);
            });

            // let loginInfo = getState().loginInfo;
            // let productId = getState().storage.productId;
            // let postData = {
            //     accessInfo:loginInfo.baseLoginData,
            //     productId:productId
            // };
            //
            // _h.ajax.resource('/product/detail').save({},postData)
            //     .then((data)=>{
            //         dispatch({type:'GET_PRODUCTINFO', data})
            //     })
            //     .catch((error)=>{
            //         console.log("error",error);
            //     })
        }
    }
};
