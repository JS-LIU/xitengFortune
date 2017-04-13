/**
 * Created by LDQ on 2017/4/13.
 */

const shoppingCart = {

    addProductItem:{},
    calcTotalMoney:{},
    calcTotalNum:{},
    realCount:0,
    totalNum:0,
};


shoppingCart.calcTotalMoney = function(product){
    if(product.checked){
        return this.realCount += (product.num * product.price)
    }
    return this.realCount;

};
shoppingCart.calcTotalNum = function(product){
    if(product.checked){
        return this.totalNum += product.num
    }
    return this.totalNum;
};
shoppingCart.addProductItem = function(shoppingCartProduct,productList,addProduct){

    if(shoppingCartProduct.productId === addProduct.productId){
        shoppingCartProduct.num += addProduct.num;

        return "hadProduct";
    }

    return "pushProduct";
};

shoppingCart.iterator = function(productList,obj){


    for(let i = 0, item; item = productList[ i++ ];){
        for(let prop in obj){
            obj[prop](item,productList,arguments)
        }
    }
    return obj;
};
exports.module = shoppingCart;
