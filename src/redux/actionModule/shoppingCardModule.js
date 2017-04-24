/**
 * Created by LDQ on 2017/4/13.
 */

import _product from './productModule';

const shoppingCart = {
    productList:[],
    totalNum:0,
    totalCount:0,

    getListInfo:{},

    addProduct:{},
    checkProduct:{},
    deleteProducts:{},
    increase:{},
    calcTotalNum:{},
    calcTotalMoney:{}
};
let goOn = true;

const iterator = function(productList, condition) {
    goOn = true;
    for (let i = 0, item; item = productList[i++];) {

        if (goOn) {
            condition(item);
        } else {
            break;
        }
    }
};

const compareId = function(product, dosometh, go = true) {

    return function(item) {
        if (item.productId === product.productId) {

            if (!go) {
                goOn = false
            }
            return dosometh(item);
        }

    }

};

const isChecked = function(dosometh){
    return function(item){
        if(item.checked){
            return dosometh(item);
        }
    }
};

const isUnChecked = function(dosometh){
    return function(item){
        if(!item.checked){
            return dosometh(item);
        }
    }
};

const addProduct = function(productList, product) {

    return function(item) {
        item.num += product.num;
    }
};

const pushProduct = function(productList, product) {
    productList.push(product);

};

shoppingCart.addProduct = function(productList,product){
    product.checked = true;
    shoppingCart.productList = productList;

    //  todo 是否选择了规格

    iterator(shoppingCart.productList, compareId(product, addProduct(shoppingCart.productList, product),false));
    if (goOn) {
        pushProduct(shoppingCart.productList, product)
    }
    return shoppingCart.productList;

};

shoppingCart.calcTotalNum = function(item){
    shoppingCart.totalNum += item.num;

};
shoppingCart.calcTotalCount = function(item){
    shoppingCart.totalCount += (item.num * item.price)

};

//  获取 未选中 商品列表
shoppingCart.deleteProducts = function(productList){
    shoppingCart.productList = [];
    iterator(productList, isUnChecked(function(item){
        shoppingCart.productList.push(item);
    }));
};
shoppingCart.checkedProduct = function(productList){
    shoppingCart.productList = [];
    iterator(productList, isChecked(function(item){
        shoppingCart.productList.push(item);
    }));
};
shoppingCart.getListInfo = function(obj){

    const changeList = obj.changeList || function(){
            throw new Error('必须传changeList方法');
        };
    const calc = function(){
        shoppingCart.totalNum = 0;
        shoppingCart.totalCount = 0;

        iterator(shoppingCart.productList,isChecked(function(item){
            shoppingCart.calcTotalNum(item);
            shoppingCart.calcTotalCount(item);
        }));
        return {
            totalNum:shoppingCart.totalNum,
            totalCount:shoppingCart.totalCount
        }
    };


    return {
        productList:changeList(),
        totalNum:calc().totalNum,
        totalCount:calc().totalCount
    }

};



module.exports = shoppingCart;



shoppingCart.increase = function(productList,product){

    for(let i = 0,item;item = productList[ i++ ];){
        if(item.productId === product.productId){
            item.num ++;
            shoppingCart.productList = productList;
            return shoppingCart.productList;
        }
    }
};
shoppingCart.reduce = function(productList,product){
    for(let i = 0,item;item = productList[ i++ ];){
        if(item.productId === product.productId){
            if(item.num > 1){
                item.num --;
                shoppingCart.productList = productList;
                return shoppingCart.productList;
            }
        }
    }
    shoppingCart.productList = productList;
    return shoppingCart.productList;
};
shoppingCart.checkProduct = function(productList,product){
    for(let i = 0,item;item = productList[ i++ ];){
        if(item.productId === product.productId){
            item.checked = !item.checked;
            shoppingCart.productList = productList;
            return shoppingCart.productList;
        }
    }
};

shoppingCart.deleteProducts = function(productList){
    shoppingCart.productList = [];
    for(let i = 0,item;item = productList[ i++ ];){
        if(!item.checked){
            shoppingCart.productList.push(item);
        }
    }
    return shoppingCart.productList;
};