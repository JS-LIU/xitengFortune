/**
 * Created by LDQ on 2017/5/24.
 */
let diamondsLess = function(state,diamonds){
    if(state.account.diamondAmount < diamonds ){
        return {

        }
    }else{
        return "nextSuccessor";
    }
};

let payConfirm = function(state){
    return {
        key:"success",
        describe:"确认投注"
    }
};

let exchangeXB = diamondsLess.after(payConfirm);


module.exports = exchangeXB;






