/**
 * Created by LDQ on 2016/9/26.
 */
import {BET_AMOUNT,IMMEDIATELY_BET} from './betActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var betActions = {
    betAmount: (money)=>{
        return {
            type : BET_AMOUNT,
            money
        }
    },
    immediatelyBet : (dispatch,getState)=>{
        let userInfo = getState().userInfo;
        let stockGameId = getState().stockGameId;
        let postData = {
            accessInfo:{
                app_key:userInfo.appKey,
                access_token:userInfo.access_token,
                phone_num:userInfo.openId,
                signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret),
            },
            stockId:stockGameId,
            guessType:guessType
        };

        _h.ajax.resource('/guessGame').save({},postData)
            .then((data)=>{
                dispatch({type:'IMMEDIATELY_BET', data})
            })
            .catch((error)=>{
                console.log("error",error);
            })
    }


};