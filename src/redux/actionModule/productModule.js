/**
 * Created by LDQ on 2017/4/11.
 */


const product = {

    createProduct:{},
    increase:{},
    specification:{}
};


product.createProduct = function(productInfo){

    return Object.assign({},productInfo,{
        num:1
    });
};


product.increase = function(product){
    let num = product.num ++ ;

    return Object.assign({},product,{
        num:num
    });
};


product.specification = function(product){
    //  todo 暂时不需要这个方法 之后再重构
    const selected = function(specification,type){
        for(let i = 0,item;item = product.specifications[ i++ ]; ){
            if(item.id === specification.id){
                for(let j = 0,typeItem;typeItem = specification.type[j++];){
                    type.selected = false;
                    if(type.id === typeItem.id){
                        type.selected = !type.selected;
                    }
                }
            }
        }

    };

    const isAllSelected = function() {
        let specifications = product.specifications;
        for (let i = 0, typeList; typeList = specifications[i++];) {

            if (!isSelectedType(typeList)) {
                return false
            }
        }
        return true;
    };

    const isSelectedType = function(typeList) {
        for (let i = 0, item; item = typeList.type[i++];) {

            if (item.selected) {
                return true
            }
        }
        return false;
    };



    return {
        selected:selected,
        isAllSelected:isAllSelected()
    }
};

module.exports = product;


