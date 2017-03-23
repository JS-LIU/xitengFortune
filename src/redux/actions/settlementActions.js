/**
 * Created by LDQ on 2017/3/21.
 */
import {PUSH_PRODUCTS,CLEAR_PRODUCTS} from './settlementActionKeys';
import getProductListInfo from '../actionModule/settlementModule';

// const checkedProducts = function(shopCartList){
//     let productList = [];
//     for(let i = 0 , product; product = shopCartList[ i++ ];){
//         if(product.checked){
//             productList.push(product);
//         }
//     }
//
//     return productList;
// };
//
// const checkedProduct = {
//     getProductList:{},
//     getCount:{},
//     getTotalPrice:{}
// };
//
// checkedProduct.getProductList = function(){
//
// };




export const settlementActions = {


    pushProducts: (product)=>{
        return (dispatch,getState)=>{
            let productListInfo,products;

            if(product != undefined){
                products = [product];
            }else{
                products = getState().shoppingCart.products;
            }

            productListInfo = getProductListInfo(products);

            dispatch({type:'PUSH_PRODUCTS', productListInfo});
        }
    },
    clearProducts: ()=>{
        return {
            type: CLEAR_PRODUCTS
        }
    }

};