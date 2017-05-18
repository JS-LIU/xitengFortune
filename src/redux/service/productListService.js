/**
 * Created by LDQ on 2017/5/9.
 */

import _h from '../../Util/HB';

const productList = {
    getList:function(strategy){
        let argument = arguments.shift.call(arguments);
        return listStrategies[strategy].apply(null,argument);
    },
    purchaseGameProductList:{},
    XBList:{}
};

let listStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList
};

const XBList = function(path,state,pageNo){

    let self = arguments.callee;
    console.log('XBList========',self);
    return {
        needUpdate:(dispatchAction)=>{
            let postData = {
                accessInfo:state.loginInfo.baseLoginData,
                pageNo:pageNo,
                size:10
            };
            return _h.ajax.resource("/xtb/list").save({},postData).then((listInfo)=>{
                let XBList = new XBList(listInfo);

                dispatchAction(listInfo);
                return self(path,state,pageNo);
            });
        },
        notUpdate:(notUpdateInfo)=>{
            if(state.XBList.list.length > 0 && state.XBList.pageNo > pageNo){
                notUpdateInfo();
                return self(path,state,pageNo)
            }
        }
    }

};

const purchaseGameProductList = function(path,state,pageNo,sort){
    let self = arguments.callee;
    console.log('purchaseGameProductList========',self);
    return {
        needUpdate:(dispatchAction)=>{

            let postData = {
                accessInfo:state.loginInfo.baseLoginData,
                pageNo:pageNo,
                size:10,
                popularity:1
            };
            return _h.ajax.resource("/purchaseGame/list").save({},postData).then((listInfo)=>{


                dispatchAction(listInfo);
                return self(path,state,pageNo);
            });
        },
        notUpdate:(notUpdateInfo)=>{
            let productList = state.purchaseGameProductList;
            if(productList.list.length > 0 && productList.pageNo > pageNo){
                notUpdateInfo();
                return self(path,state,pageNo)
            }
        }
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



module.exports = productList;
