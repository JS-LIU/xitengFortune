/**
 * Created by LDQ on 2016/10/19.
 */

import {CREATE_ADDRESS,GET_DEFAULT,GET_LIST} from './addressActionKeys';
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
    },
    getList:()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                size:10,
                pageNo:0
            };
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/list').save({},postData).then((data)=>{
                dispatch({type:'GET_LIST',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    createAddress:(otherInfo)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = Object.assign({},{
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                }
            },otherInfo);
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/create').save({},postData).then((data)=>{
                dispatch({type:'CREATE_ADDRESS',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

};
