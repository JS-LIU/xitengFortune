/**
 * Created by LDQ on 2017/3/22.
 */

const checkedProduct = {
    getProductList:[],
    getCount:0,
    getXtbPrice:0
};



const getProductListInfo = function(shopCartList){

    let productListInfo = {
        productList:[],
        count:0,
        xtbPrice:0
    };

    for(let i = 0 , product; product = shopCartList[ i++ ];){

        productListInfo.productList = checkedProduct.getProductList(product,productListInfo.productList);
        productListInfo.count = checkedProduct.getCount(product,productListInfo.count);
        productListInfo.xtbPrice = checkedProduct.getXtbPrice(product,productListInfo.xtbPrice);

    }

    return productListInfo;
};

checkedProduct.getProductList = function(product,productList){
    if(product.checked){
        productList.push(product);
    }
    return productList;
};


checkedProduct.getCount = function(product,count){
    count += product.num;
    return count;
};

checkedProduct.getXtbPrice = function(product,xtbPrice){
    xtbPrice += product.xtbPrice;
    return xtbPrice;
};



module.exports = getProductListInfo;