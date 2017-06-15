/**
 * Created by LDQ on 2017/5/22.
 */

import ProductListInterface from './ProductListInterface';

class ProductList_purchase extends ProductListInterface{
    constructor(info,statePurchaseGameProductList){
        super(info,statePurchaseGameProductList);
    }
}

module.exports = ProductList_purchase;