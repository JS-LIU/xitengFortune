/**
 * Created by LDQ on 2017/4/10.
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

const moreThanAccount = function(state){
    if(state.betInfo.betMoney > state.account.xtbTotalAmount){
        return {
            key:"fail",
            describe:"喜币不足",
            title:"投注失败",
            body:"喜币余额不足请去购买钻石",
            certain:{
                text:"确定",
                url:"/BuyDiamonds"
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

const payConfirm = function(state){
    return {
        key:"success",
        describe:"确认投注"
    }
};


let betDialogInfo = lessThan10.after(moreThanAccount).after(payConfirm);


module.exports = betDialogInfo;
