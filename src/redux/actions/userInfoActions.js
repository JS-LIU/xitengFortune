/**
 * Created by LDQ on 2016/8/29.
 */
import {SET_PHONENUM,GET_CHECKCODE,LOGIN} from './userInfoActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';
export const userInfoActions = {

    setPhoneNum: (num)=>{
        return {
            type : SET_PHONENUM,
            num
        }
    },
    getCheckCode: (obj)=>{
        return (dispatch)=>{
            _h.ajax.resource('/reqcheckCode/register?phoneNum=13436836055').query(obj)
                .then((data)=>{
                    dispatch({type:'GET_CHECKCODE', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    logIn: ()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                userName:userInfo.openId,
                app_key:userInfo.appKey,
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + userInfo.openId),
                    loginType:'weixin'
                },
                sex:1
            };

            _h.ajax.resource('/login').save({},postData)
                .then((data)=>{
                    dispatch({type:'LOGIN', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};