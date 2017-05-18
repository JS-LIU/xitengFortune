/**
 * Created by LDQ on 2017/5/9.
 */

import { GET_XB_LIST } from './productListActionKeys';
import _productList from '../service/productListService';
import baseConsole from '../../Util/xitengBaseConfig';
export const productListActions = {

    getXBList:(pageNo = 0)=>{
        return (dispatch,getState)=>{

            _productList.getList('XBList',getState()).needUpdate((info)=>{
                console.log('productListActions==getXBList==========',info);
                dispatch({type:'GET_XB_LIST',info})
            }).notUpdate(()=>{
                baseConsole.notUpdate;
            });

        }
    },
    getPurchaseGameProductList:(pageNo = 0,sort = {popularity:1})=>{
        return (dispatch,getState)=>{
            _productList.getList('purchaseGameProductList',getState(),pageNo,sort).needUpdate((info)=>{
                dispatch({type:'GET_PRODUCT_LIST', info})
            }).notUpdate(()=>{
                baseConsole.notUpdate;
            });

        }
    },
    getList:(path,pageNo=0,sort = {})=>{
        return (dispatch,getState)=>{
            _productList.getList(path,getState(),pageNo,sort)

        }
    }
};