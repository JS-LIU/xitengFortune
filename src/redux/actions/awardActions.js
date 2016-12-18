/**
 * Created by LDQ on 2016/10/10.
 */

import {GET_AWARD} from './awardActionKeys';
import _h from '../../Util/HB';
import {award} from '../../Util/xitengBaseConfig';


export var awardActions = {
    getAward : (awardType=award.list.week)=>{

        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.baseLoginData,
                awardType:awardType
            };

            _h.ajax.resource('/award/list').save({},postData).then((data)=>{
                dispatch({type:'GET_AWARD',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
};