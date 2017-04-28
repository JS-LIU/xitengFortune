/**
 * Created by LDQ on 2017/4/11.
 */


const product = {

    createProduct:{},
    increaseNum:{},
    reduceNum:{},
    specification:{}
};


product.createProduct = function(productInfo){

    return Object.assign({},productInfo,{
        totalCount:1
    });
};


product.increaseNum = function(product,max = 99999){
    let num = product.totalCount + 1;
    if(num < max){
        return Object.assign({},product,{
            totalCount: num
        });
    }
    return product;

};

product.reduceNum = function(product,min = 0){
    let num = product.totalCount - 1;
    if(num > min){
        return Object.assign({},product,{
            totalCount: num
        });
    }
    return product;
};

product.specification = function(product){
    //  todo 选择 缺少判断：isAllSelected  需要返回值 是否全选
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


