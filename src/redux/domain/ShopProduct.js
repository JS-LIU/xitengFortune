/**
 * Created by LDQ on 2017/5/26.
 */
import Product from './Product';

class ShopProduct extends Product{
    constructor(productInfo){
        super(productInfo);
        let specification = new Specification(this.productInfo.specifications);
        this.productInfo.specifications = specification.specifications;
    }
}

module.exports = ShopProduct;