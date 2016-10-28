/**
 * Created by LDQ on 2016/10/27.
 */
import { GET_BET_RECORD,GET_BET_LIST,PREVENT_MULTIPLE_POST } from './betRecordActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';



export var betRecordActions = {
    getBetRecord : ()=>{
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
            _h.ajax.resource('/getGuessWithStockStatistics').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BET_RECORD', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    getBetList : (size=5,sortProperties=["time"],pageNo=0)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                pageNo:pageNo,
                sortProperties:sortProperties,
                direction:"DESC",
                size:size
            };
            dispatch({type:"PREVENT_MULTIPLE_POST"});
            _h.ajax.resource('/getWithStockList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BET_LIST', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }

};