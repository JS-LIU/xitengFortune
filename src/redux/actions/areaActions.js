/**
 * Created by LDQ on 2016/10/19.
 */
import { GET_PROVINCES ,GET_CITIES, GET_AREA} from './areaAcitonKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var areaActions = {
    getArea : (path,key,parentArea={})=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = Object.assign({},{
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret)
                },
                size:50,
                pageNo:0
            },parentArea);


            _h.ajax.resource('/area/:area').save(path,postData)
                .then((data)=>{
                    console.log('key---',key);
                    if(key==0){
                        dispatch({type:'GET_PROVINCES', data});
                    }
                    if(key==1){
                        dispatch({type:'GET_CITIES', data});
                    }
                    if(key==2){
                        dispatch({type:'GET_AREA', data});
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};