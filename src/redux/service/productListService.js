/**
 * Created by LDQ on 2017/5/9.
 */

/**
 *  productList_shop
 *      getList         //  获取商品列表
 *      changeListSort  //  改变排序方式
 *      witchSort       //  当前的排序方式
 */

import _h from '../../Util/HB';
import _XBListEntity from '../domain/XBList';
import _PurchaseGameProductListEntity from '../domain/PurchaseGameProductList';



let XBList = function(state,pageNo,dispatchAction){

    if( !state.XBList.last){
        let postData = {
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10
        };

        _h.ajax.resource("/xtb/list").save({},postData).then((listInfo)=>{
            let stateProductList = [...state.XBList.list];
            let productList_XB = new _XBListEntity(listInfo,stateProductList);
            dispatchAction(productList_XB);
        });
    }
};

let purchaseGameProductList = function(state,pageNo,dispatchAction){
    let sort = state.purchaseGameProductList.sort.find(productList.witchSort);

    if(!state.purchaseGameProductList.last){
        let postData = Object.assign({},{
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10,
        },sort.type);

        _h.ajax.resource("/purchaseGame/list").save({},postData).then((listInfo)=>{
            let stateProductList = [...state.purchaseGameProductList.list];
            let productList_purchaseGame = new _PurchaseGameProductListEntity(listInfo,stateProductList);
            dispatchAction(productList_purchaseGame);
        });
    }
};

const diamondList = function(path,state,pageNo){

};



let productListStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList
};

const productList = {
    getList:function(...args){
        let strategy = args.shift();
        return productListStrategies[strategy].apply(this,args);
    },

    changeListSort:{},
    witchSort:function(sort){
        return sort.select === true;
    }
};
productList.changeListSort = function(stateSort,sort){
    for(let i = 0,sortNode;sortNode = stateSort[ i++ ];){

        if(sortNode.key === sort.key){
            sortNode.select = true;

            //  更改排序方式
            sortNode.way = -sortNode.way;
            sortNode.type[sort.key] = sortNode.way;
        }else{
            sortNode.select = false;
            sortNode.way = 1;
        }
    }
    return stateSort;
};



module.exports = productList;
