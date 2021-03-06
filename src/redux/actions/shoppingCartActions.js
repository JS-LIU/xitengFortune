/**
 * Created by LDQ on 2016/8/18.
 */

import {
    CHANGE_PRODUCT_LIST,
    EDIT,
    CLOSE
} from '../actions/shoppingCartActionKeys';
import { HIDE_SPEC_PRO } from '../actions/specificationActionKeys';
import _shoppingCart from '../service/shoppingCardService';
import _product from '../service/productService';

export const shoppingCartActions = {

    addProduct:(product)=>{
        return (dispatch,getState)=>{

            let products = getState().shoppingCart.products;
            let shopProductInfo = getState().shopProductInfo.info;

            if(_product('shopProduct',shopProductInfo).specifications.isAllSelected){
                let shoppingCartInfo = _shoppingCart.getListInfo({
                    changeList:function(){
                        return _shoppingCart.addProduct(products,product)
                    }
                });

                dispatch({type:'HIDE_SPEC_PRO'});
                dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
            }
        }
    },
    increaseNum:(product)=>{
        return (dispatch,getState)=>{
            let products = getState().shoppingCart.products;
            let shoppingCartInfo = _shoppingCart.getListInfo({
                changeList:function(){
                    return _shoppingCart.increaseNum(products,product)
                }
            });

            dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
        }
    },
    reduceNum:(product)=>{
        return (dispatch,getState)=>{
            let products = getState().shoppingCart.products;
            let shoppingCartInfo = _shoppingCart.getListInfo({
                changeList:function(){
                    return _shoppingCart.reduceNum(products,product)
                }
            });

            dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
        }
    },
    checkProduct:(product)=>{
        return (dispatch,getState)=>{
            let products = getState().shoppingCart.products;
            let shoppingCartInfo = _shoppingCart.getListInfo({
                changeList:function(){
                    return _shoppingCart.checkProduct(products,product)
                }
            });

            dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
        }
    },
    allCheck:()=>{
        return (dispatch,getState)=>{
            let products = getState().shoppingCart.products;
            let isAllChecked = getState().shoppingCart.allChecked;
            let shoppingCartInfo = _shoppingCart.getListInfo({
                changeList:function(){
                    return _shoppingCart.allCheck(products,isAllChecked)
                }
            });
            dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
        }
    },
    deleteProducts:()=>{
        return (dispatch,getState)=>{
            let products = getState().shoppingCart.products;
            let shoppingCartInfo = _shoppingCart.getListInfo({
                changeList:function(){
                    return _shoppingCart.deleteProducts(products)
                }
            });

            dispatch({type:'CHANGE_PRODUCT_LIST',shoppingCartInfo});
        }
    },
    edit:()=>{
        return {
            type:EDIT
        }
    },
    cancel:()=>{
        return (dispatch,getState)=>{
            dispatch({type:'HIDE_SPEC_PRO'})
        }
    }
};