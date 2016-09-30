/**
 * Created by liudq on 16/9/29.
 */

let XTCoinsList = [120,600,1200,2400,6000,12000];

function getPrice(XTCoins){
    let rate = 1/12;
    return XTCoins * rate;
}


let myXTCoinsList = XTCoinsList.map((item,index)=>{
    return {
        count:item,
        selected:false,
        price:getPrice(item)
    }
});


export const XTCoinsInit = {
    XTCoinList:myXTCoinsList
};