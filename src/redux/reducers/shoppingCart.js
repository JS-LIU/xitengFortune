/**
 * Created by LDQ on 2016/8/18.
 */

import {ADD_PRODUCTITEM} from '../actions/shoppingCartActionKeys';

class ShoppingCartCtrl {
    constructor(state,item){
        this.item = Object.assign({},item,{checked:true,num:1});
        this.shoppingCart = state;
    }

    pushOrAdd(){

        var itemId = this.item.productId;

        this.shoppingCart.products.map((product,index)=>{
            if(product.productId == itemId){
                product.num += (this.item.num);
            }else{
                this.shoppingCart.products.push(this.item);
            }
        });

        if(this.shoppingCart.products.length == 0){
            this.shoppingCart.products.push(this.item);
        }
        this.shoppingCart.totalNum += (this.item.num);
    }
}

export const shoppingCart = function(state = {},action){

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            var shoppingCartCtrl = new ShoppingCartCtrl(state,action.item);
            shoppingCartCtrl.pushOrAdd();

            return Object.assign({},state);
        default:
            return state
    }
};