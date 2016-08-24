/**
 * Created by LDQ on 2016/8/18.
 */

import {
    ADD_PRODUCTITEM,
    CALC_TOTALMONEY,
    DELETE_PRODUCTS,
    CHECKED_ITEM,
    ALLCHECKED,
    INCREASE,
    REDUCE
} from '../actions/shoppingCartActionKeys';

// class ShoppingCartCtrl {
//     constructor(state,item){
//
//         this.shoppingCart = state;
//     }
//
//     pushOrAdd(item){
//         var product = Object.assign({},item,{checked:true,num:1});
//         var itemId = product.productId;
//
//         this.shoppingCart.products.map((product,index)=>{
//             if(product.productId == itemId){
//                 product.num += (product.num);
//             }else{
//                 this.shoppingCart.products.push(product);
//             }
//         });
//
//         if(this.shoppingCart.products.length == 0){
//             this.shoppingCart.products.push(product);
//         }
//         this.shoppingCart.totalNum += (product.num);
//     }
//
//
//
//     calcTotalMoney(){
//         this.shoppingCart.realCount = 0;
//         this.shoppingCart.products.map((product,index)=>{
//             if(product.checked){
//                 this.shoppingCart.realCount += (product.num * product.price);
//             }
//         });
//     }
//
//     checkedItem(item){
//         item.checked = !item.checked;
//         this.isAllChecked();
//         this.calcTotalMoney();
//     }
//
//     isAllChecked(){
//         this.shoppingCart.allChecked = true;
//         this.shoppingCart.products.map((product,index)=>{
//             if(!product.checked){
//                 this.shoppingCart.allChecked = false
//             }
//         });
//     }
//     allCheck(){
//         this.shoppingCart.allChecked = !this.shoppingCart.allChecked;
//         this.shoppingCart.products.map((product,index)=>{
//             product.checked = this.shoppingCart.allChecked;
//         });
//
//         this.calcTotalMoney();
//     }
//     increase(item){
//         item.num += 1;
//         this.calcTotalMoney();
//     }
//     reduce(item){
//         item.num -=1;
//         this.calcTotalMoney();
//     }
//     deleteProducts(){
//         this.shoppingCart.products.map((product,index)=>{
//             if(product.checked){
//                 this.shoppingCart.products.splice(index,1);
//             }
//         });
//         this.calcTotalMoney();
//     }
//
// }


function pushOrAdd(products,item){
    let productList;
    let product = Object.assign({},item,{checked:true,num:1});
    let productId= product.productId;

    products.map((goods,index)=>{
        if(goods.productId == productId){
            productList = [...products];
            productList[index].num += (product.num);

        }else{
            productList=[...products,product];
        }
    });
    if(products.length == 0){
        productList=[product];
    }
    return productList;
}
function calcTotalMoney(products){
    let realCount = 0;
    products.map((goods,index)=>{
        if(goods.checked){
            realCount += (goods.num * goods.price);
        }
    });
    return realCount;
}
function checkItem(products,index){
    var productList = [...products];
    productList[index].checked = !productList[index].checked;
    return productList;
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
function allCheck(state){
    var allChecked = !state.allChecked;
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
    var productList = [...products];
    productList[index].num += 1;
    return productList;
}
function reduce(products,index){
    var productList = [...products];
    productList[index].num -= 1;
    return productList;
}
function deleteProducts(products){
    var productList = [...products];

    productList.map((goods,index)=>{
        if(goods.checked){
            productList.splice(index,1);
        }
    });
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
    // var shoppingCartCtrl = new ShoppingCartCtrl(state);

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            //
            var productList = pushOrAdd(state.products,action.item);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'CALC_TOTALMONEY':
            // shoppingCartCtrl.calcTotalMoney();
            return Object.assign({},state,{
                realCount:calcTotalMoney(state.products)
            });

        case 'CHECKED_ITEM':
            // shoppingCartCtrl.checkedItem(action.index);
            let productList = checkItem(state.products,action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                allChecked:isAllChecked(productList)
            });

        case 'ALLCHECKED':
            // shoppingCartCtrl.allCheck();
            var newState = allCheck(state);
            return Object.assign({},state,{
                products:newState.productList,
                allChecked:newState.allChecked,
                realCount:calcTotalMoney(newState.productList)
            });

        case 'INCREASE':
            // shoppingCartCtrl.increase(action.index);
            var productList = increase(state.products,action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'REDUCE':
            // shoppingCartCtrl.reduce(action.item);
            var productList = reduce(state.products,action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'DELETE_PRODUCTS':
            // shoppingCartCtrl.deleteProducts();
            var productList = deleteProducts(state.products);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                allChecked:isAllChecked(productList),
                totalNum:calcTotleNum(productList)
            });

        default:
            return state;
    }
};