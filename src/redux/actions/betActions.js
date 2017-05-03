/**
 * Created by LDQ on 2016/9/26.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';
import { GET_ODDS,SET_BET_MONEY } from './betActionKeys';
import _h from '../../Util/HB';
import _order from '../actionModule/orderModule';


export const betActions = {

    setBetMoney : (money)=>{
        return {
            type:"SET_BET_MONEY",
            money
        }
    },

    // immediatelyBet : (money)=>{
    //
    //     return (dispatch,getState)=>{
    //
    //         let loginInfo = getState().loginInfo;
    //         let stockGameId = getState().storage.stockGameId;
    //         let guessType = getState().storage.guessType;
    //         let accountMoney = getState().account.xtbTotalAmount;
    //         isCanBet(money,accountMoney);
    //
    //         let isCanBet = isCanBet(money,accountMoney);
    //
    //
    //         if(isCanBet){
    //             // postBetInfo().then(()=>{
    //             //    确认投注弹出窗口信息data = {}
    //             //    dispatch({type:'SHOW_DIALOG',data});
    //             // })
    //             console.log('投注成功');
    //         }else{
    //             console.log('投注失败-------',isCanBet)
    //             // let failDialog = isCanBet;
    //             // dispatch({type:'SHOW_DIALOG',failDialog});
    //         }
    //
    //         if(money >= 10){
    //             let postData = {
    //                 accessInfo:loginInfo.loginData,
    //                 stockId:stockGameId,
    //                 guessType:guessType,
    //                 cathecticAmount:money
    //             };
    //
    //             // var hasEnoughMoney = true;
    //             _h.ajax.resource('/guessGame').save({},postData).then(()=>{
    //                 var data = {
    //                     title:"投注成功",
    //                     body:"下载客户端可以体验更多功能",
    //                     certain:{
    //                         text:"投注记录",
    //                         url:"/MyRecord"
    //                     },
    //                     cancel:{
    //                         text:"继续投注",
    //                         url:"/Bet"
    //                     }
    //                 };
    //                 dispatch({type:'SHOW_DIALOG',data});
    //             })
    //                 .catch((error)=>{
    //                     console.log(error);
    //                     var data = {
    //                         title:"投注失败",
    //                         body:"喜币余额不足请去购买钻石",
    //                         certain:{
    //                             text:"确定",
    //                             url:"/BuyDiamonds"
    //                         },
    //                         cancel:{
    //                             text:"取消",
    //                             url:"/Bet"
    //                         }
    //                     };
    //                     dispatch({type:'SHOW_DIALOG',data});
    //                 })
    //         }else{
    //             var data = {
    //                 title:"投注失败",
    //                 body:"不能少于10喜币",
    //                 certain:{
    //                     text:"确定",
    //                     url:"/Bet"
    //                 },
    //                 cancel:{
    //                     text:"取消",
    //                     url:"/Bet"
    //                 }
    //             };
    //             dispatch({type:'SHOW_DIALOG',data});
    //         }
    //
    //     }
    // },
    getOdds : ()=>{

        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let stockGameId = getState().storage.stockGameId;
            let postData = {
                accessInfo:loginInfo.loginData,
                stockGameId:stockGameId
            };

            // var hasEnoughMoney = true;
            _h.ajax.resource('/stockGameBaseInfo').save({},postData).then((data)=>{
                dispatch({type:'GET_ODDS',data});
            })
                .catch((error)=>{
                    console.log(error);
                })

        }
    }

};