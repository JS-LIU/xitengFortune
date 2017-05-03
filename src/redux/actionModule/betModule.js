/**
 * Created by LDQ on 2017/4/10.
 */

import _h from '../../Util/HB';

const isMoreThan10 = function(path,state){
    if(state.betInfo.betMoney < 10){
        return console.log('小于10喜币')
        // {
        //     title:"投注失败",
        //     body:"不能少于10喜币",
        //     certain:{
        //         text:"确定",
        //         url:"/Bet"
        //     },
        //     cancel:{
        //         text:"取消",
        //         url:"/Bet"
        //     }
        // };
    }else{
        return "nextSuccessor";
    }
};

const isMoreThanAccount = function(path,state){
    if(state.betInfo.betMoney > state.account.xtbTotalAmount){
        return console.log('喜币不足购买钻石')
        // {
        //     title:"投注失败",
        //     body:"喜币余额不足请去购买钻石",
        //     certain:{
        //         text:"确定",
        //         url:"/BuyDiamonds"
        //     },
        //     cancel:{
        //         text:"取消",
        //         url:"/Bet"
        //     }
        // };
    }else{
        return "nextSuccessor";
    }
};

const bet = function(path,state){
    if(path === "/guessGame"){
        let postData = {
            accessInfo:state.loginInfo.loginData,
            stockId:state.storage.stockGameId,
            guessType:state.storage.guessType,
            cathecticAmount:state.betInfo.betMoney
        };
        return _h.ajax.resource(path).save({},postData)
    }else{
        return "nextSuccessor";
    }
};


const betOrder = isMoreThan10.after(isMoreThanAccount).after(bet);

module.exports = betOrder;