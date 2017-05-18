/**
 * Created by LDQ on 2016/10/8.
 */
//  todo 删 文件用不上了
import { DELETE_PRODUCTS } from './shoppingCartActionKeys';
import { CREATE_SUCCESS,CREATE_FAIL,SET_TRADEORDER } from './createTradeOrderActionKeys';
import { SHOW_DIALOG } from './dialogActionKeys';
import _h from '../../Util/HB';
import {chainOrderDiamonds} from '../service/orderService';


function checkedProducts(list){
    var newList = [];
    for(let i = 0;i < list.length;i++){
        if(list[i].checked){

            newList.push({
                productId:list[i].productId,
                totalCount:list[i].num,
                price:list[i].price,
                shopId:list[i].shopId
            });
        }
    }
    return newList;
}

// const orderDiamonds = function(path,state){
//     if(path == '/createTradeOrder'){
//         let loginInfo = state.loginInfo;
//
//         let postData = {
//             accessInfo:loginInfo.loginData,
//             totalPrice:state.diamonds.amount,
//             totalProductCount:state.diamonds.amount,
//             productType:2,
//             orderType:1
//         };
//         console.log('createTradeOrderActions-tradeInfo---',postData);
//         return _h.ajax.resource('/createTradeOrder').save({},postData);
//     }else{
//         return 'nextSuccessor'
//     }
// };
//
// const orderProducts = function(path){
//     if(path == '/exchange/product'){
//
//     }else{
//         return 'nextSuccessor'
//     }
// };
// const chainOrderDiamonds = new _h.design.Chain(orderDiamonds);
// const chainOrderProducts = new _h.design.Chain(orderProducts);
// chainOrderDiamonds.setNextSuccessor(chainOrderProducts);


export const createTradeOrderActions = {
    createTradeOrder : (
        // price,
        // productType=createTradeOrder.productType.diamonds,
        // orderType=createTradeOrder.orderType.commonOrder
        path
    )=>{
        return (dispatch,getState)=>{
            // let loginInfo = getState().loginInfo;

            // let postData = {
            //     accessInfo:loginInfo.loginData,
            //     totalPrice:price,
            //     totalProductCount:price,
            //     productType:productType,
            //     orderType:orderType
            // };

            chainOrderDiamonds.passRequest(path,getState())
                .then((tradeInfo)=>{
                    dispatch({type:'SET_TRADEORDER', tradeInfo});
                })
                .catch((error)=>{
                    console.log(error);
                });
            // _h.ajax.resource('/createTradeOrder').save({},postData)
            //     .then((tradeInfo)=>{
            //         dispatch({type:'SET_TRADEORDER', tradeInfo,price});
            //     })
            //     .catch((error)=>{
            //         console.log(error);
            //     })


        }
    },
    exchangeProduct : (productArr)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let shoppingCart = getState().shoppingCart;
            let address = getState().address;
            let productList = productArr||checkedProducts(shoppingCart.products);
            let postData = {
                accessInfo:loginInfo.loginData,
                productList:productList,
                count:shoppingCart.totalNum,
                xtbPrice:shoppingCart.realCount,
                addressId:address.currentAddress.id,
                orderType:2
            };
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
    setTradeOrder : (tradeInfo,amount)=>{
        return {
            type:SET_TRADEORDER,
            tradeInfo,
            amount
        }
    }
};