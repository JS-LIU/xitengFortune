/**
 * Created by LDQ on 2016/10/14.
 */
import {GET_DIAMONDS} from './diamondsActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const diamondsActions= {

    getDiamonds:()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                }
            };
            console.log(postData);

            _h.ajax.resource('/diamond/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_DIAMONDS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};