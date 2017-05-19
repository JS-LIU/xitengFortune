/**
 * Created by LDQ on 2017/5/9.
 */


import _h from '../../Util/HB';
import _XBListEntity from '../domain/XBList';

const productList = {
    getList:function(...args){
        let strategy = args.shift();
        return listStrategies[strategy].apply(this,args);

    },
    purchaseGameProductList:{},
    XBList:{}
};

const XBList = function(state,pageNo,dispatchAction){

    if( !state.XBList.last){
        let postData = {
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10
        };
        _h.ajax.resource("/xtb/list").save({},postData).then((listInfo)=>{
            let productList_XB = new _XBListEntity(listInfo);
            dispatchAction(productList_XB);
        });
    }
};

const purchaseGameProductList = function(state,pageNo,sort,dispatchAction){

    if( !state.purchaseGameProductList.last ){
        let postData = {
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10,
            popularity:1
        };
        _h.ajax.resource("/purchaseGame/list").save({},postData).then((listInfo)=>{
            dispatchAction(listInfo);
            return purchaseGameProductList(state,pageNo);
        });
    }

};
const diamondList = function(path,state,pageNo){

};

const productListOperator = function(productListInfo,newListInfo){

    //  当前页数
    productListInfo.pageNo = newListInfo.number || 0;

    //  是否是最后一页
    if(typeof newListInfo.last === "undefined"){
        productListInfo.last = true;
    }else{
        productListInfo.last = newListInfo.last;
    }

    if(productListInfo.pageNo === 0){
        productListInfo.list = newListInfo.content;
    }else{
        productListInfo.list.concat(newListInfo.content);
    }

    return productListInfo;
};



let listStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList
};



module.exports = productList;
