/**
 * Created by LDQ on 2016/8/18.
 */

import {shoppingCartInit} from '../store/shoppingCartInit';
import {ADD_PRODUCTITEM} from '../actions/shoppingCartActionKeys';

class ShoppingCartCtrl {
    constructor(items,totalCount,totalNum){
        this.productItems = items;
        items.checked = false;
        items.num = 1;
        this.totalCount = totalCount;
        this.totalNum = totalNum;
    }

    calcTotalCount() {
        this.productItems.map((item,index)=>{
           this.totalCount += item.price
        });
    }



}


export const shoppingCart = function(state = {},action){

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            console.log(state);
            Object.assign({},state,{
                totalCount:state.totalCount+=action.item.price,
                totalNum:state.shoppingCartInit+=1,

            });
            console.log(shoppingCartInit);
            console.log(state);
            console.log(state.totalCount);
            console.log(action.item);


            return state;
        default:
            return state
    }
};