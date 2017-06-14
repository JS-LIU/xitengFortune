/**
 * Created by LDQ on 2017/6/14.
 */

import {SELECTED_SHOP_PRODUCT_LIST_SORT} from './sortActionKeys';
import _sortService from '../service/sortService';

export const sort_shopProductListActions = {

    //  获取 商店 商品详情
    selected:(selectedSortItem)=>{
        return (dispatch,getState)=>{

            let sortList = getState().sort_shopProductList.sort;
            let newSortList = _sortService(sortList).selected(selectedSortItem);

            dispatch({type:'SELECTED_SHOP_PRODUCT_LIST_SORT',newSortList});

        }
    },
};
