/**
 * Created by LDQ on 2017/4/11.
 */


import _specification from './specificationModule';


const product = {

    createProduct:{},
    increase:{},
    specification:_specification
};


product.createProduct = function(productInfo){

    return Object.assign({},productInfo,{
        num:1
    });
};


product.increase = function(product){
    let num = product.num ++ ;

    return Object.assign({},product,{
        num:num
    });
};


product.isAllSelected = function(){

};

module.exports = product;


