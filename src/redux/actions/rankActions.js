/**
 * Created by LDQ on 2016/10/10.
 */
/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_RANK,SELECTED} from './rankActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const rankActions= {

    getRank:(pageNo=0,type="currentWeek",size=3)=>{
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
                type:type
            };
            console.log(postData);

            _h.ajax.resource('/rakingList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_RANK', data,pageNo})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    selected:(id)=>{
        return {
            type:"SELECTED",
            id
        }
    }

};