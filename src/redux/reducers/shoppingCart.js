/**
 * Created by LDQ on 2016/8/18.
 */

import {
    CHANGE_PRODUCT_LIST,
    ADD_PRODUCTITEM,
    CALC_TOTALMONEY,
    INCREASENUM,
    REDUCENUM,
    CHECKED_ITEM,
    DELETE_PRODUCTS,
    ALLCHECKED,
    EDIT
} from '../actions/shoppingCartActionKeys';

function calcTotalMoney(products){
    let realCount = 0;
    products.map((goods,index)=>{
        if(goods.checked){
            realCount += (goods.num * goods.price);
        }
    });
    return realCount;
}
function checkedItem(products,index){
    products[index].checked = !products[index].checked;
    return products;
}

function isAllChecked(products){
    var allChecked = true;
    products.map((product,index)=>{
        if(!product.checked){
            allChecked = false
        }
    });
    return allChecked;
}
function allCheck(state,bool){
    var allChecked = !state.allChecked;
    if(!bool){
        allChecked = false;
    }

    var productList = [...state.products];
    productList.map((goods,index)=>{
        goods.checked = allChecked;
    });
    return {
        productList:productList,
        allChecked:allChecked
    }
}
function increase(products,index){
    products[index].num += 1;
    return products;
}
function reduce(products,index){
    if(products[index].num > 0){
        products[index].num -= 1;
    }
    return products;
}
function deleteProducts(products){
    var productList = [];
    for(let i = 0;i < products.length;i++){
        if(!products[i].checked){
            productList.push(products[i]);
        }
    }
    return productList
}
function calcTotleNum(products){
    var totalNum = 0;
    products.map((goods,index)=>{
        totalNum += goods.num
    });
    return totalNum;
}

export const shoppingCart = function(state = {},action){

    switch (action.type) {

        case 'CHANGE_PRODUCT_LIST':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });

        case 'ADD_PRODUCTITEM':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });
        case 'INCREASENUM':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });

        case 'REDUCENUM':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });
        case 'DELETE_PRODUCTS':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });
        case 'CHECKED_ITEM':
            return Object.assign({},state,{
                products:action.shoppingCartInfo.productList,
                realCount:action.shoppingCartInfo.totalCount,
                totalNum:action.shoppingCartInfo.totalNum,
                allChecked:action.setProductInfo.isAllChecked
            });
        case 'EDIT':
            let edit = state.edit;
            return Object.assign({},state,{
                edit:!edit
            });

        case 'CALC_TOTALMONEY':
            return Object.assign({},state,{
                realCount:calcTotalMoney(state.products)
            });



        case 'ALLCHECKED':
            let newState = allCheck(state,action.bool);
            return Object.assign({},state,{
                products:newState.productList,
                allChecked:newState.allChecked,
                realCount:calcTotalMoney(newState.productList)
            });



        default:
            return state;
    }
};