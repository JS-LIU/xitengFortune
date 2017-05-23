/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_XB_LIST,GET_PURCHASE_GAME_PRODUCT_LIST,CHANGE_PURCHASE_PRODUCT_LIST_SORT } from './productListActionKeys';
import _productList from '../service/productListService';

export const productListActions = {

    getXBList:(pageNo = 0)=>{
        return (dispatch,getState)=>{

            _productList.getList('XBList',getState(),pageNo,function(info){
                dispatch({type:'GET_XB_LIST',info})
            })
        }
    },
    getPurchaseGameProductList:(pageNo = 0,sort = {
        type:{
            popularity:1,
        },
        name:'人气',
        select:true,
        key:'popularity',
        way:1
    })=>{
        return (dispatch,getState)=>{
            _productList.getList('purchaseGameProductList',getState(),pageNo,function(info){
                dispatch({type:'GET_PURCHASE_GAME_PRODUCT_LIST',info})
            });
        }
    },
    changePurchaseProductListSort:(sort)=>{
        return (dispatch,getState)=>{
            let stateSort = getState().purchaseGameProductList.sort;
            let sortInfo = _productList.changeListSort(stateSort,sort);
            dispatch({type:'CHANGE_PURCHASE_PRODUCT_LIST_SORT',sortInfo});
        }
    }


};