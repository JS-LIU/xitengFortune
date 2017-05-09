/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_PRODUCT_LIST } from './productListActionKeys';
import _productList from '../actionModule/productListModule';

export const productListActions = {
    getList:(path,pageNo=0)=>{
        return (dispatch,getState)=>{
            _productList.getList(path,getState(),pageNo).then((list)=>{
                let productList = list.content;
                let pageNo = list.pageNo || 0;
                let last = list.last || true;
                dispatch({type:'GET_PRODUCT_LIST', productList,pageNo,last})
            });

        }
    }
};