/**
 * Created by LDQ on 2016/10/10.
 */

import {GET_AWARD} from './awardActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var awardActions = {
    getAward : (awardType=1)=>{

        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                awardType:awardType
            };
            console.log(postData);

            _h.ajax.resource('/award/list').save({},postData).then((data)=>{
                dispatch({type:'GET_AWARD',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
};