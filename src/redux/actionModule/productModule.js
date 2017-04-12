/**
 * Created by LDQ on 2017/4/11.
 */


import Specification from './specificationModule';


const product = {

    createProduct:{},
    increase:{},

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


