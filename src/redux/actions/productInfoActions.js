/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_SHOP_PRODUCT_INFO} from './productInfoActionKeys';
import {HIDE_SPEC_PRO} from './specificationActionKeys';

import _productInfo from '../service/productInfoService';

export const productInfoActions = {

    //  获取 商店 商品详情
    getShopProductInfo:(productId)=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});
            _productInfo('shopProductInfo',getState(),productId).then((shopProduct)=>{

                dispatch({type:'GET_SHOP_PRODUCT_INFO', shopProduct});
            }).catch((error)=>{
                console.log("error",error);
            });
        }
    },

    getXBProductInfo:()=>{
    },

    getMemberProductInfo:()=>{
    },
    getPurchaseProductInfo:()=>{
    },

};
