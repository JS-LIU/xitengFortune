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

class ShoppingCartCtrl {
    constructor(state,item){

        this.shoppingCart = state;
    }

    pushOrAdd(item){
        var product = Object.assign({},item,{checked:true,num:1});
        var itemId = product.productId;

        this.shoppingCart.products.map((product,index)=>{
            if(product.productId == itemId){
                product.num += (product.num);
            }else{
                this.shoppingCart.products.push(product);
            }
        });

        if(this.shoppingCart.products.length == 0){
            this.shoppingCart.products.push(product);
        }
        this.shoppingCart.totalNum += (product.num);
    }



    calcTotalMoney(){
        this.shoppingCart.realCount = 0;
        this.shoppingCart.products.map((product,index)=>{
            if(product.checked){
                this.shoppingCart.realCount += (product.num * product.price);
            }
        });
    }

    checkedItem(item){
        item.checked = !item.checked;
        this.isAllChecked();
        this.calcTotalMoney();
    }

    isAllChecked(){
        this.shoppingCart.allChecked = true;
        this.shoppingCart.products.map((product,index)=>{
            if(!product.checked){
                this.shoppingCart.allChecked = false
            }
        });
    }
    allCheck(){
        this.shoppingCart.allChecked = !this.shoppingCart.allChecked;
        this.shoppingCart.products.map((product,index)=>{
            product.checked = this.shoppingCart.allChecked;
        });

        this.calcTotalMoney();
    }
    increase(item){
        item.num += 1;
        this.calcTotalMoney();
    }
    reduce(item){
        item.num -=1;
        this.calcTotalMoney();
    }
    deleteProducts(){
        this.shoppingCart.products.map((product,index)=>{
            if(product.checked){
                this.shoppingCart.products.splice(index,1);
            }
        });
        this.calcTotalMoney();
    }

}

export const shoppingCart = function(state = {},action){
    var shoppingCartCtrl = new ShoppingCartCtrl(state);

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            shoppingCartCtrl.pushOrAdd(action.item);
            return Object.assign({},state);

        case 'CALC_TOTALMONEY':
            shoppingCartCtrl.calcTotalMoney();
            return Object.assign({},state);

        case 'CHECKED_ITEM':
            shoppingCartCtrl.checkedItem(action.item);
            return Object.assign({},state);

        case 'ALLCHECKED':
            shoppingCartCtrl.allCheck();
            return Object.assign({},state);

        case 'INCREASE':
            shoppingCartCtrl.increase(action.item);
            return Object.assign({},state);

        case 'REDUCE':
            shoppingCartCtrl.reduce(action.item);
            return Object.assign({},state);

        case 'DELETE_PRODUCTS':
            shoppingCartCtrl.deleteProducts();
            return Object.assign({},state);

        default:
            return state;
    }
};