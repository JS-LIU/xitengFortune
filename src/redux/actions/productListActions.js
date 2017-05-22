/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_XB_LIST,GET_PURCHASE_GAME_PRODUCT_LIST } from './productListActionKeys';
import _productList from '../service/productListService';
import baseConsole from '../../Util/xitengBaseConfig';
export const productListActions = {

    getXBList:(pageNo = 0)=>{
        return (dispatch,getState)=>{

            _productList.getList('XBList',getState(),pageNo,function(info){
                console.log(info);
                dispatch({type:'GET_XB_LIST',info})
            })

        }
    },
    getPurchaseGameProductList:(pageNo = 0,sort = {popularity:1})=>{
        return (dispatch,getState)=>{



            _productList.getList('purchaseGameProductList',getState(),pageNo,sort,function(info){
                dispatch({type:'GET_PURCHASE_GAME_PRODUCT_LIST',info})
            });

        }
    },
    getList:(path,pageNo=0,sort = {})=>{
        return (dispatch,getState)=>{
            _productList.getList(path,getState(),pageNo,sort)

        }
    }
};