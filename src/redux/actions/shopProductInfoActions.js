/**
 * Created by LDQ on 2016/8/18.
 */


import {
    GET_SHOP_PRODUCT_INFO,
    INCREASE_SHOP_PRODUCT_NUM,
    REDUCE_SHOP_PRODUCT_NUM,
    SET_SHOP_PRODUCT_BELONG
} from './productInfoActionKeys';
import {HIDE_SPEC_PRO} from './specificationActionKeys';

import _productInfo from '../service/productInfoService';
import _product from '../service/productService';

export const shopProductInfoActions = {

    //  获取 商店 商品详情
    getShopProductInfo:(productId)=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'});

            _productInfo('shopProductInfo',getState(),productId).then((shopProductInfo)=>{
                dispatch({type:'GET_SHOP_PRODUCT_INFO', shopProductInfo});
            }).catch((error)=>{
                console.log("error",error);
            });
        }
    },
    setShopProductBelong:(belong)=>{
        return (dispatch,getState)=>{
            dispatch({type:'SHOW_SPEC_PRO'});
            dispatch({type:'SET_SHOP_PRODUCT_BELONG',belong});
        }
    },
    increaseShopProductNum:(product)=>{
        return (dispatch,getState)=>{
            let shopProductInfo = _product('shopProduct',product).increaseNum().info;
            dispatch({type:'INCREASE_SHOP_PRODUCT_NUM',shopProductInfo});
        }
    },
    reduceShopProductNum:(product)=>{
        return (dispatch,getState)=>{
            let shopProductInfo = _product('shopProduct',product).reduceNum().info;
            dispatch({type:'REDUCE_SHOP_PRODUCT_NUM',shopProductInfo});
        }
    },

};
