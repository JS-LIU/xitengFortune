/**
 * Created by LDQ on 2017/6/15.
 */
import ProductListInterface from './ProductListInterface';

class ProductList_shop extends ProductListInterface{
    constructor(info,statePurchaseGameProductList){
        super(info,statePurchaseGameProductList);
    }
}

module.exports = ProductList_shop;