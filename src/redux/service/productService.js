/**
 * Created by LDQ on 2017/4/11.
 */

import ShopProduct from '../domain/ShopProduct';
import XBProduct from '../domain/XBProduct';
import specificationService from './specificationService';


let ProductTypes = {
    // 'XBProduct':XBProduct,
    'shopProduct':ShopProduct,
    // 'memberProduct':MemberProduct,
    // 'purchaseProduct':PurchaseProduct


};


let productService = function(type,productInfo){
    let product = new ProductTypes[type](productInfo);
    return {
        increaseNum:function(){
            product.increaseNum();
            return product
        },
        reduceNum:function(){
            product.reduceNum();
            return product
        },
        setBelong:function(belong){
            product.setBelong(belong);
            return product
        },
        specifications:specificationService(product.info.specifications)
    }
};


module.exports = productService;