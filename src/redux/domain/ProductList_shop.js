/**
 * Created by LDQ on 2017/6/15.
 */
import ProductListInterface from './ProductListInterface';

class ProductList_shop extends ProductListInterface{
    constructor(info){
        super(info);
        //  后台数据从1开始
        this.pageNo = info.currentPage - 1;
        this.list = info.datas;
    }
}

module.exports = ProductList_shop;