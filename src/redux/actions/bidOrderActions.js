/**
 * Created by LDQ on 2016/12/27.
 */

import { GET_RECORD,GET_ORDERLIST } from './bidOrderActionKeys';
import _h from '../../Util/HB';


export const bidOrderActions = {
    getRecord : (path,purchaseGameId,pageNo=0,size=10)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                purchaseGameId:purchaseGameId,
                pageNo:pageNo,
                size:size
            };

            _h.ajax.resource('/bidOrder/:record').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_RECORD', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    getOrderList: (path,bidOrderStatus,pageNo=0,size=5)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.loginData,
                bidOrderStatus:bidOrderStatus,
                pageNo:pageNo,
                size:size
            };

            _h.ajax.resource('/bidOrder/:list').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_ORDERLIST', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
};