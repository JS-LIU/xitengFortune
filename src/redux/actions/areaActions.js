/**
 * Created by LDQ on 2016/10/19.
 */
import { GET_PROVINCES } from './areaAcitonKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var areaActions = {
    getArea : (path)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret)
                },
                size:50,
                pageNo:0
            };

            _h.ajax.resource('/area/:area').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_PROVINCES', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};