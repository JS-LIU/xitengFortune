/**
 * Created by LDQ on 2017/4/13.
 */
const shoppingCart = {
    //  static
    productList:[],
    totalNum:0,
    totalPrice:0,
    isAllChecked:true,
    //  模板
    getListInfo:{},
    //  action(会生成新的productList)
    addProduct:{},
    checkProduct:{},
    deleteProducts:{},
    allCheck:{},
    getCheckedProducts:{},

    //  没用上
    changeNum:{},
};
let goOn = true;

const iterator = function(productList, condition) {
    goOn = true;
    for (let i = 0, item; item = productList[i++];) {

        if (goOn) {
            condition(item);
        } else {
            break;
        }
    }
};

const compareId = function(product, dosometh, go = true) {

    return function(item) {
        if (item.productId === product.productId) {

            if (!go) {
                goOn = false
            }
            return dosometh(item);
        }

    }

};
const isChecked = function(dosometh){
    return function(item){
        if(item.checked){
            return dosometh(item);
        }
    }
};

const isUnChecked = function(dosometh){
    return function(item){
        if(!item.checked){
            return dosometh(item);
        }
    }
};

const addProduct = function(productList, product) {

    return function(item) {
        item.totalCount += product.totalCount;
    }
};
const pushProduct = function(productList, product) {
    productList.push(product);
};
const calcTotalNum = function(item){
    shoppingCart.totalNum += item.totalCount;
};
const calcTotalPrice = function(item){
    shoppingCart.totalPrice += (item.totalCount * item.price)
};

shoppingCart.increaseNum = function(productList,product){
    shoppingCart.productList = productList;

    iterator(shoppingCart.productList, compareId(product, function(item){
        item.totalCount ++;
    }));
    return shoppingCart.productList;

};
shoppingCart.reduceNum = function(productList,product){
    shoppingCart.productList = productList;

    iterator(shoppingCart.productList, compareId(product, function(item){
        item.totalCount --;
    }));
    return shoppingCart.productList;
};
shoppingCart.setNum = function(productList,product,num){
    shoppingCart.productList = productList;

    iterator(shoppingCart.productList, compareId(product, function(item,num){
        item.totalCount = num;
    }));
    return shoppingCart.productList;
};

shoppingCart.addProduct = function(productList,product){
    product.checked = true;
    shoppingCart.productList = productList;

    //  todo 是否选择了规格

    iterator(shoppingCart.productList, compareId(product, addProduct(shoppingCart.productList, product),false));
    if (goOn) {
        pushProduct(shoppingCart.productList, product)
    }
    return shoppingCart.productList;

};

shoppingCart.checkProduct = function(productList,product){
    shoppingCart.productList = productList;

    iterator(shoppingCart.productList, compareId(product, function(item){
        item.checked = !item.checked;
    }));
    return shoppingCart.productList;

};


//  获取 未选中 商品列表
shoppingCart.deleteProducts = function(productList){
    shoppingCart.productList = [];
    iterator(productList, isUnChecked(function(item){
        shoppingCart.productList.push(item);
    }));
    return shoppingCart.productList;
};
//  获取 选中 商品列表
shoppingCart.getCheckedProducts = function(productList){
    shoppingCart.productList = [];
    iterator(productList, isChecked(function(item){
        shoppingCart.productList.push(item);
    }));
    return shoppingCart.productList;
};

shoppingCart.allCheck = function(productList,isAllChecked){
    shoppingCart.productList = productList;
    if(isAllChecked){
        for(let i = 0,item;item = shoppingCart.productList[i++];){
            item.checked = false;
        }
    }else{
        for(let i = 0,item;item = shoppingCart.productList[i++];){
            item.checked = true;
        }
    }
    return shoppingCart.productList;
};

shoppingCart.getListInfo = function(obj){

    const changeList = obj.changeList || function(){
            throw new Error('必须传changeList方法');
        };
    const calc = function(){
        shoppingCart.totalNum = 0;
        shoppingCart.totalPrice = 0;
        shoppingCart.isAllChecked = true;

        for(let i = 0,item;item = shoppingCart.productList[i++];){
            if(item.checked){
                calcTotalNum(item);
                calcTotalPrice(item);
            }else{
                shoppingCart.isAllChecked = false;
            }
        }
        return {
            totalNum:shoppingCart.totalNum,
            totalPrice:shoppingCart.totalPrice,
            isAllChecked:shoppingCart.isAllChecked
        }
    };


    return {
        productList:changeList(),
        totalNum:calc().totalNum,
        totalPrice:calc().totalPrice,
        isAllChecked:calc().isAllChecked
    }

};



module.exports = shoppingCart;


