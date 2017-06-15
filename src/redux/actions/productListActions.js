/**
 * Created by LDQ on 2017/5/9.
 */

import {
    GET_XB_LIST,
    GET_PURCHASE_GAME_PRODUCT_LIST,
    CHANGE_PURCHASE_PRODUCT_LIST_SORT,
    GET_PRODUCT_LIST_SHOP
} from './productListActionKeys';
import {SELECTED_SHOP_PRODUCT_LIST_SORT} from './sortActionKeys';
import _productList from '../service/productListService';
import _sortService from '../service/sortService';


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

    getProductList_Shop:(pageNo = 0,sortItem)=>{
        return (dispatch,getState)=>{
            _productList('shopProductList',getState(),pageNo,sortItem).then((productListInfo)=>{

                dispatch({type:'GET_PRODUCT_LIST_SHOP',productListInfo});
                let sortList = getState().sort_shopProductList.sort;
                let newSortList = _sortService(sortList).selected(sortItem);

                dispatch({type:'SELECTED_SHOP_PRODUCT_LIST_SORT',newSortList});
            });


        }
    }

};