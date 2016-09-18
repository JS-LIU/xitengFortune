/**
 * Created by LDQ on 2016/9/13.
 */
import { GET_STOCKDETAIL,GET_STOCKKLINE} from '../actions/stockGameDetailActionKeys'

import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var stockGameDetailActions = {

    getStockDetail:(id)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                stockGameId:id
            };
            _h.ajax.resource('/stockGameDetail').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_STOCKDETAIL', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getStockKLine:(kLine)=>{
        return {
            type : GET_STOCKKLINE,
            kLine
        }

    }

};