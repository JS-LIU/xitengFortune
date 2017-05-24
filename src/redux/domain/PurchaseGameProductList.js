/**
 * Created by LDQ on 2017/5/22.
 */

import ProductListInterface from './ProductListInterface';

class PurchaseGameProductList extends ProductListInterface{
    constructor(info,statePurchaseGameProductList){
        super(info,statePurchaseGameProductList);
    }
}

module.exports = PurchaseGameProductList;