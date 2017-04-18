/**
 * Created by LDQ on 2017/4/13.
 */

const shoppingCart = {
    productList:[],
    totalNum:0,
    totalCount:0,

    setShoppingCart:{},

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

const addProduct = function(productList, product) {

    return function(item) {
        item.num += product.num;
        shoppingCart.productList = productList;
        return shoppingCart;
    }
};

const pushProduct = function(productList, product) {

    shoppingCart.productList.push(product);
    return shoppingCart.productList;

};
shoppingCart.addProduct = function(productList,product){
    product.checked = true;
    iterator(productList, compareId(product, addProduct(productList, product),false));
    if (goOn) {
        return pushProduct(productList, product)
    }
    return shoppingCart.productList;
};

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

shoppingCart.calcTotalNum = function(item){
    shoppingCart.totalNum += item.num;

};
shoppingCart.calcTotalCount = function(item){
    shoppingCart.totalCount += (item.num * item.price)

};

shoppingCart.setShoppingCart = function(obj){

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
