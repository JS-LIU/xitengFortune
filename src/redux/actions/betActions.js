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
    immediatelyBet : ()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let stockGameId = getState().storage.stockGameId;
            let cathecticAmount = getState().bet.betAmount;
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
                cathecticAmount:cathecticAmount
            };
            console.log(postData);

            var hasEnoughMoney = true;
            _h.ajax.resource('/guessGame').save({},postData).then((data)=>{
                    console.log('success---',hasEnoughMoney);
                    dispatch({type:'IMMEDIATELY_BET', hasEnoughMoney})
                })
                .catch((error)=>{
                    hasEnoughMoney = false;
                    dispatch({type:'IMMEDIATELY_BET', hasEnoughMoney});
                })
        }
    }


};