/**
 * Created by LDQ on 2016/9/29.
 */
import { GET_ACCOUNT } from './accountActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var accountActions = {
    getAccount : ()=>{
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

            _h.ajax.resource('/account/:info').save({info:'info'},postData)
                .then((data)=>{
                    dispatch({type:'GET_ACCOUNT', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }


};