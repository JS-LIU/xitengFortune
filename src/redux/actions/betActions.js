/**
 * Created by LDQ on 2016/9/26.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var betActions = {
    immediatelyBet : (money)=>{

        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let stockGameId = getState().storage.stockGameId;
            let guessType = getState().storage.guessType;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                stockId:stockGameId,
                guessType:guessType,
                cathecticAmount:money
            };
            console.log(postData);

            // var hasEnoughMoney = true;
            _h.ajax.resource('/guessGame').save({},postData).then((data)=>{
                    dispatch({type:'HIDE_DIALOG'})
                })
                .catch((error)=>{
                    console.log(error);
                    dispatch({type:'SHOW_DIALOG'});
                })
        }
    }
};