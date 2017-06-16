/**
 * Created by LDQ on 2017/6/15.
 */
import ProductListInterface from './ProductListInterface';

class ProductList_shop extends ProductListInterface{
    constructor(info){
        super(info);
        this.pageNo = info.currentPage;
        this.list = info.datas;
    }
}

module.exports = ProductList_shop;