/**
 * Created by LDQ on 2016/12/22.
 */

import {GET_NEWEST_WIN_LIST} from './purchaseGameActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var purchaseGameActions = {

    getNewestWinList:(path)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.baseLoginData
            };

            _h.ajax.resource('/purchaseGame/:win').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_NEWEST_WIN_LIST', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};
