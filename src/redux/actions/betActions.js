/**
 * Created by LDQ on 2016/9/26.
 */
import { SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';
import { SHOW_PAY_DIALOG,HIDE_PAY_DIALOG } from './payDialogActionKeys';
import { GET_ODDS,SET_BET_MONEY } from './betActionKeys';
import _h from '../../Util/HB';
import _showDialog from '../service/dialogService';

export const betActions = {

    setBetMoney : (money)=>{
        return {
            type:"SET_BET_MONEY",
            money
        }
    },
    showBetDialog : ()=>{
        return (dispatch,getState)=>{
            _showDialog('betDialog',getState()).success((dialogInfo)=>{

                dispatch({type:'SHOW_PAY_DIALOG',dialogInfo})
            }).error((dialogInfo)=>{

                dispatch({type:'SHOW_DIALOG',dialogInfo});
            });

        }
    },
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