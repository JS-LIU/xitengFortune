/**
 * Created by LDQ on 2017/5/26.
 */
import Product from './Product';
import Specification from './Specification';

class ShopProduct extends Product{
    constructor(productInfo){

        productInfo.specifications = new Specification(productInfo.specifications).specifications;
        super(productInfo);
    }
}

module.exports = ShopProduct;