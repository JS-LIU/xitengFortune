/**
 * Created by LDQ on 2017/5/9.
 */


import _h from '../../Util/HB';
import _XBList from '../domain/XBList';
import _ProductList_purchase from '../domain/ProductList_purchase';
import _ProductList_shop from '../domain/ProductList_shop';
import sortService from './sortService';


let productListParam = {
    'shopProductList':function(state){
        return {
            sortList:state.sort_shopProductList.sortList,
            last:state.productList_shop.last,
            currentPage:state.productList_shop.pageNo,
            productList_shop:state.productList_shop,
            list:state.productList_shop.list,
        }
    }
};

/**
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
            let productList_XB = new _XBList(listInfo,stateProductList);
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
            let productList_purchaseGame = new _ProductList_purchase(listInfo,stateProductList);
            dispatchAction(productList_purchaseGame);
        });
    }
};


/**
 * @param state
 * @param pageNo
 * @param targetSort
 */
let getShopProductList = function(state,pageNo,targetSort){

    let sortType = targetSort.type;
    let postData = Object.assign({},sortType,{
        accessInfo:state.loginInfo.baseLoginData,
        pageNo:pageNo,
        size:6
    });
    return _h.ajax.resource("/product/list").save({},postData)

};


let firstPost = function(type,state,pageNo,targetSort){
    let list = productListParam[type](state).list;
    if(list.length === 0){

        return getShopProductList(state,pageNo,targetSort).then((listInfo)=>{
            let productListInfo = new _ProductList_shop(listInfo);
            return new Promise((resolve,reject)=>{
                resolve(productListInfo);
            })
        });
    }else{
        return 'nextSuccessor';
    }
};


/**
 * @param type
 * @param state
 * @param pageNo
 * @param targetSort
 * @returns {string}
 */
let differentSort = function(type,state,pageNo,targetSort){
    let sortList = productListParam[type](state).sortList;
    let currentSort = sortService(sortList).findCurrentSort();
    if(currentSort.key !== targetSort.key){
        return getShopProductList(state,pageNo,targetSort).then((listInfo)=>{
            let productListInfo = new _ProductList_shop(listInfo);
            return new Promise((resolve,reject)=>{
                resolve(productListInfo);
            })
        });
    }else{
        return 'nextSuccessor';
    }
};

let differentWay = function(type,state,pageNo,targetSort){

    if(typeof targetSort.way !== 'undefined'){
        targetSort.type[targetSort.key] = targetSort.way * -1;
        return getShopProductList(state,pageNo,targetSort).then((listInfo)=>{
            let productListInfo = new _ProductList_shop(listInfo);
            return new Promise((resolve,reject)=>{
                resolve(productListInfo);
            })
        });
    }else{
        return 'nextSuccessor';
    }
};

/**
 *
 * @param type
 * @param state
 * @param pageNo
 * @param targetSort
 * @returns {*}
 */
let lastPage = function(type,state,pageNo,targetSort){
    if(productListParam[type].last){
        return new Promise((resolve,reject)=>{
            resolve(productListParam[type](state).productList_shop);
        })
    }else {
        return 'nextSuccessor';
    }
};

/**
 * @param type
 * @param state
 * @param pageNo
 * @param targetSort
 * @returns {string}
 */
let newPage = function(type,state,pageNo,targetSort){
    let currentPage = productListParam[type](state).pageNo;
    let existingList = productListParam[type](state).list;
    if(currentPage < pageNo){
        return getShopProductList(state,pageNo,targetSort).then((listInfo)=>{
            let productListInfo = new _ProductList_shop(listInfo);
            productListInfo.list = existingList.concat(productListInfo.list);
            return new Promise((resolve,reject)=>{
                resolve(productListInfo);
            })
        });

    }else{
        return 'nextSuccessor';
    }
};

/**
 * @param type
 * @param state
 * @param pageNo
 * @param targetSort
 * @returns {*}
 */
let oldPage = function(type,state,pageNo,targetSort){

    let currentPage = productListParam[type](state).currentPage;
    if(currentPage <= pageNo){
        return new Promise((resolve,reject)=>{
            resolve(productListParam[type](state).productList_shop);
        })
    }else{
        return 'nextSuccessor';
    }
};

let getProductList = firstPost.after(differentSort).after(differentWay).after(lastPage).after(newPage).after(oldPage);

let productListStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList,
    'shopProductList':getProductList
};

/**
 * @param type
 * @param state
 * @param pageNo
 * @param targetSort
 */
let productList = function(type,state,pageNo,targetSort){
    return productListStrategies[type](type,state,pageNo,targetSort);
};


module.exports = productList;
