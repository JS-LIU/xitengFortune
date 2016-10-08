/**
 * Created by LDQ on 2016/10/8.
 */
import { CREATE_TRADEORDER } from './createTradeOrderActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';
//  暂时不需要 在商品的时候才需要 接口为数组 我以为和购买商品用的是同一个借口呢
// function fixedItem(items){
//     if(Object.prototype.toString.call(items) === '[object Array]'){
//         return items;
//     }else{
//         return [items];
//     }
// }
// function getProductItem(productList){
//     let newProductList = [];
//     productList.map((item,index)=>{
//         newProductList.push({
//             productId:item.productId,
//             totalCount:item.diamondCount,
//             price:item.price,
//             shopId:item.shopId
//         });
//         return newProductList;
//     });
// }


export var createTradeOrderActions = {
    createTradeOrder : (item,productType=2,orderType=1)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                productList:[
                    {
                        productId:item.productId,
                        totalCount:item.diamondCount,
                        price:item.price,
                        shopId:item.shopId
                    }
                ],
                totalPrice:item.price,
                totalProductCount:(item.diamondCount+item.giveDiamondCount),
                productType:productType,
                orderType:orderType
            };

            _h.ajax.resource('/createTradeOrder').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_ACCOUNT', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }


};