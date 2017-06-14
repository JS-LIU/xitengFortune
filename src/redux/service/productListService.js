/**
 * Created by LDQ on 2017/5/9.
 */


import _h from '../../Util/HB';
import _XBListEntity from '../domain/XBList';
import _PurchaseGameProductListEntity from '../domain/PurchaseGameProductList';
import sortService from './sortService';


/**
 *
 * @param state
 * @param pageNo
 * @param dispatchAction
 * @constructor
 */

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


/**
 *
 * @param state
 * @param pageNo
 * @param dispatchAction
 */
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


/**
 *
 * @param state
 * @param pageNo
 * @param targetSort
 * @param dispatchAction
 */

let getShopProductList = function(state,pageNo,targetSort,dispatchAction){
    let sortList = state.sort_shopProductList.sortList;
    let currentSort = sortService(sortList).findCurrentSort();

    let sortType = targetSort.type;
    let postData = Object.assign({},sort,{
        accessInfo:state.loginInfo.baseLoginData,
        pageNo:pageNo,
    });

    _h.ajax.resource("/product/list").save({},postData).then((listInfo)=>{
        let stateProductList = [...state.purchaseGameProductList.list];
        let productList_purchaseGame = new _PurchaseGameProductListEntity(listInfo,stateProductList);
        dispatchAction(productList_purchaseGame);
    });

};

let differentSort = function(currentSort,targetSort){
    if(currentSort.key !== targetSort.key){
        getShopProductList();
    }else{
        return 'nextSuccessor';
    }
};
let lastPage = function(){
    if(last){
        return state.productList_shop;
    }else {
        return 'nextSuccessor';
    }
};
let newPage = function(){
    if(currentPage < targetPage){
        getShopProductList();
    }else{
        return 'nextSuccessor';
    }
};

let oldPage = function(){
    if(currentPage <= targetPage){
        return state.productList_shop;
    }else{
        return 'nextSuccessor';
    }
};

let getProductList = differentSort.after(lastPage).after(newPage).after(oldPage);



const diamondList = function(path,state,pageNo){

};



let productListStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList,
    'shopProductList':shopProductList
};

/**
 *
 * @param args
 */
let productList = function(...args){
    let strategy = args.shift();
    return {
        getList:productListStrategies[strategy].apply(this,args),
    }
};


module.exports = productList;
