/**
 * Created by LDQ on 2016/8/8.
 */

import {COUNT_INIT,COUNT_DOWN,} from './gameListActionKeys';

import _h from '../../Util/HB';

export var openingTimeActions = {
    countDown: (date,step = 1)=>{
        return {
            type : COUNT_DOWN,
            step:step,
            time:date
        }
    },

    countInit: (time)=>{
        return {
            type: COUNT_INIT,
            init:time
        }
    },

    getGameList:(obj1,obj2)=>{
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
                }
            };

            _h.ajax.resource('/login').save(obj,postData)
                .then((data)=>{
                    dispatch({type:'LOGIN', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};

