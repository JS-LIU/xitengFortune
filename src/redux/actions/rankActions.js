/**
 * Created by LDQ on 2016/10/10.
 */
/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_RANK,SELECTED} from './rankActionKeys';
import _h from '../../Util/HB';

export const rankActions= {

    getRank:(pageNo=0,type="currentYear",size=3)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                pageNo:pageNo,
                size:size,
                type:type
            };

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