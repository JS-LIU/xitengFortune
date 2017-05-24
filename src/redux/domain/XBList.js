/**
 * Created by LDQ on 2017/5/19.
 */
import ProductListInterface from './ProductListInterface';


class XBList extends ProductListInterface{
    constructor(info,stateXBProductList){
        super(info,stateXBProductList);
    }
}

module.exports = XBList;