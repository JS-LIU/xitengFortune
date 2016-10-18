/**
 * Created by LDQ on 2016/10/19.
 */

import {GET_DEFAULT} from './addressActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var addressActions = {
    getDefault : ()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                }
            };
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/getDefault').save({},postData).then((data)=>{
                dispatch({type:'GET_DEFAULT',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
};
