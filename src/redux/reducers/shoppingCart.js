/**
 * Created by LDQ on 2016/8/18.
 */

import {shoppingCartInit} from '../store/shoppingCartInit';
import {ADD_PRODUCTITEM} from '../actions/shoppingCartActionKeys';
var _h = require('../../Util/HB');

class ShoppingCartCtrl {
    constructor(shoppingCartInit,item){

        this.item = _h.obj.addProp(item,{checked:true,num:1});
        this.shoppingCart = shoppingCartInit;
    }

    calcTotalNum(){

        this.shoppingCart.products.map((item,index)=>{
            this.shoppingCart.totalNum += item.num;
        });

    }

    addItem(){
        this.shoppingCart.totalNum += (this.item.num || 1);
    }

    pushOrAdd(){

        var itemId = this.item.productId;

        this.shoppingCart.products.map((item,index)=>{
            if(item.productId == itemId){
                console.log('有相同物品');
                item.num += (this.item.num || 1);
            }else{
                console.log('没有相同的物品');
                this.shoppingCart.products.push(this.item);
            }
        });

        if(this.shoppingCart.products.length == 0){
            this.shoppingCart.products.push(this.item);
        }

    }
}


export const shoppingCart = function(state = {},action){

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            var shoppingCartCtrl = new ShoppingCartCtrl(shoppingCartInit,action.item);
            console.log(shoppingCartCtrl);
            shoppingCartCtrl.pushOrAdd();
            shoppingCartCtrl.addItem();
            console.log(state);

            return Object.assign({},state);
        default:
            return state
    }
};