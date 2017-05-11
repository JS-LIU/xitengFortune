/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_PRODUCT_LIST } from './productListActionKeys';
import _productList from '../actionModule/productListModule';

export const productListActions = {
    getList:(path,pageNo=0,sort = {})=>{
        return (dispatch,getState)=>{
            _productList.getList(path,getState(),pageNo,sort).then((info)=>{
                dispatch({type:'GET_PRODUCT_LIST', info})
            });

        }
    }
};