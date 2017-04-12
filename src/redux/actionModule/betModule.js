/**
 * Created by LDQ on 2017/4/10.
 */


/*  isCanBet
*   1.投注金额必须大于10
*   2.账户中的金额 大于 投注金额
 */

const isMoreThan10 = function(betMoney){
    if(betMoney > 10){
        return true;
    }else{
        return {
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
        };
    }
};

const isMoreThanAccount = function(betMoney,accountMoney){
    if(betMoney <= accountMoney){
        return true;
    }else{
        return {
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
        };
    }
};


Function.prototype.after = function( fn ){
    let self = this;
    return function(){
        let ret = self.apply( this, arguments );
        if ( ret === true ){
            return fn.apply( this, arguments );
        }
        return ret;
    }
};


const isCanBet = isMoreThan10.after(isMoreThanAccount);

module.exports = isCanBet;