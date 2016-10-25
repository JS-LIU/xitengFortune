/**
 * Created by LDQ on 2016/10/8.
 */
import { DELETE_PRODUCTS } from './shoppingCartActionKeys';
import { CREATE_SUCCESS,CREATE_FAIL,SET_TRADEORDER } from './createTradeOrderActionKeys';
import { SHOW_DIALOG } from './dialogActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

function checkedProducts(productList){
    let checkedProducts = [];
    for(let i = 0;i < productList.length;i++){
        if(productList[i].checked){
            checkedProducts.push({
                productId:productList[i].productId,
                totalCount:productList[i].num,
                price:productList[i].price,
                shopId:productList[i].shopId
            })
        }
    }
    return checkedProducts;
}


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
                .then((tradeInfo)=>{
                    dispatch({type:'SET_TRADEORDER', tradeInfo,item});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    exchangeProduct : (productArr)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let shoppingCart = getState().shoppingCart;
            let address = getState().address;
            let productList = productArr||checkedProducts(shoppingCart.products);
            console.log(productList);
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                productList:productList,
                count:shoppingCart.totalNum,
                xtbPrice:shoppingCart.realCount,
                addressId:address.currentAddress.id,
                orderType:2
            };
            console.log(postData);
            _h.ajax.resource('/exchange/product').save({},postData)
                .then((tradeInfo)=>{
                    dispatch({type:'DELETE_PRODUCTS'});
                    dispatch({type:'SET_TRADEORDER', tradeInfo});
                    dispatch({type:'CREATE_SUCCESS'});
                    dispatch({type:'SHOW_DIALOG'});
                })
                .catch((error)=>{
                    console.log(error);
                    dispatch({type:'CREATE_FAIL'});
                    dispatch({type:'SHOW_DIALOG'});

                })
        }
    },

    setTradeOrder : (tradeInfo)=>{
        return {
            type:SET_TRADEORDER,
            tradeInfo
        }
    }
};