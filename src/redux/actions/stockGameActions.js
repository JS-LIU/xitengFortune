/**
 * Created by LDQ on 2016/8/8.
 */

import {COUNT_INIT,COUNT_DOWN,GET_GAMELIST,REFRESH} from './stockGameActionKeys';

import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var stockGameActions = {
    countDown: (nowTime,startTime,endTime,step = 1000)=>{
        return {
            type : COUNT_DOWN,
            step,
            nowTime,
            startTime,
            endTime
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
            let stockGameInfo = getState().stockGame;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                pageNo:stockGameInfo.pageNo,
                size:stockGameInfo.size
            };
            _h.ajax.resource('/stockGameList').save(obj1,postData)
                .then((data)=>{
                    dispatch({type:'GET_GAMELIST', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },

    refresh:(id)=>{
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
                    dispatch({type:'REFRESH', data,id})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};

