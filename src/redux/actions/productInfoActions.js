/**
 * Created by LDQ on 2016/8/18.
 */


import {GET_PRODUCTINFO} from './productInfoActionKeys';
import {CREATE_PRODUCT} from './productActionKeys';
import {HIDE_SPEC_PRO} from './specificationActionKeys';

import {productInfo} from '../service/productInfoService';
import _product from '../service/productService';

export const productInfoActions = {

    getShopProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo('ShopProduct',getState()).then((info)=>{
                let productInfo = info.productInfo;
                dispatch({type:'GET_PRODUCTINFO', productInfo});
            }).catch((error)=>{
                console.log("error",error);
            });

            // productInfo.getProductInfo(getState())
            //     .then((productInfo)=>{
            //
            //         let product = _product.createProduct(productInfo.productInfo);
            //
            //         // dispatch({type:'CREATE_PRODUCT',product});
            //         dispatch({type:'GET_PRODUCTINFO', productInfo});
            //
            //     }).catch((error)=>{
            //     console.log("error",error);
            // });

        }
    },

    getXBProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                    let product = _product.createProduct(productInfo.productInfo);

                    // dispatch({type:'CREATE_PRODUCT',product});
                    dispatch({type:'GET_PRODUCTINFO', productInfo});

                }).catch((error)=>{
                console.log("error",error);
            });

        }
    },

    getMemberProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                    let product = _product.createProduct(productInfo.productInfo);

                    // dispatch({type:'CREATE_PRODUCT',product});
                    dispatch({type:'GET_PRODUCTINFO', productInfo});

                }).catch((error)=>{
                console.log("error",error);
            });

        }
    },
    getPurchaseProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                    let product = _product.createProduct(productInfo.productInfo);

                    // dispatch({type:'CREATE_PRODUCT',product});
                    dispatch({type:'GET_PRODUCTINFO', productInfo});

                }).catch((error)=>{
                console.log("error",error);
            });

        }
    },

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            productInfo.getProductInfo(getState())
                .then((productInfo)=>{

                let product = _product.createProduct(productInfo.productInfo);

                // dispatch({type:'CREATE_PRODUCT',product});
                dispatch({type:'GET_PRODUCTINFO', productInfo});

            }).catch((error)=>{
                console.log("error",error);
            });

        }
    },
};
