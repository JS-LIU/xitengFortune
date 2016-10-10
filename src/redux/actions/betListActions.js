/**
 * Created by LDQ on 2016/10/10.
 */

import { GET_BETLIST } from './betListActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const betListActions = {
    getBetList : (pageNo=0,size=3,sortProperties=["time"],direction="DESC")=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                pageNo:pageNo,
                size:size,
            };

            _h.ajax.resource('/getJustNowWithStockList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BETLIST', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }


};