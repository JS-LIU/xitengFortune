/**
 * Created by LDQ on 2017/4/10.
 */


/**
 * 投注金额少于10喜币
 * @param state
 * @returns {*}
 */
const lessThan10 = function(state){
    if(state.betInfo.betMoney < 10){
        return {
            key:"fail",
            describe:"少于10喜币",
            title:"投注失败",
            body:"不能少于10喜币",
            certain:{
                text:"确定",
                url:"/Bet"
            },
            cancel:{
                text:"取消",
                url:"/Bet"
            }
        }
    }else{
        return "nextSuccessor";
    }
};

/**
 * 投注金额大于账户里的金额
 * @param state
 * @returns {*}
 */

const moreThanAccount = function(state){
    if(state.betInfo.betMoney > state.account.xtbTotalAmount){
        return {
            key:"fail",
            describe:"喜币不足",
            title:"投注失败",
            body:"你的喜币账户余额不足，请充值",
            certain:{
                text:"立即充值",
                url:"/ExchangeXTCoins"
            },
            cancel:{
                text:"取消",
                url:"/Bet"
            }
        }
    }else{
        return "nextSuccessor";
    }
};

/**
 * 满足投注条件，弹出确认投注提示
 * @param state
 * @returns {{key: string, describe: string}}
 */
const payConfirm = function(state){
    return {
        key:"success",
        describe:"确认投注"
    }
};


let betDialogInfo = lessThan10.after(moreThanAccount).after(payConfirm);


module.exports = betDialogInfo;
