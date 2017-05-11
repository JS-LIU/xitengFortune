/**
 * Created by LDQ on 2017/5/9.
 */

import _h from '../../Util/HB';

const productList = {
    getList:{},
    sort:{
        popularity:"",
        productName:"",
        price:"",
        rateOfProgress:""
    }
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

    console.log("productListInfo============",productListInfo);
    return productListInfo;
};

const XBList = function(path,state,pageNo){
    if(path === "/xtb/list"){
        let postData = {
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10
        };
        let productListInfo = Object.assign({},state.productList);
        return _h.ajax.resource(path)
            .save({},postData)
            .then((listInfo)=>{
                let info = productListOperator(productListInfo,listInfo);
                return new Promise((resolve,reject)=>{
                    resolve(info)
                })
            });
    }else{
        return "nextSuccessor";
    }
};

const purchaseGameProductList = function(path,state,pageNo,sort = {}){
    if(path === "/purchaseGame/list"){

        let newSort = Object.assign({},productList.sort,sort);

        let postData = Object.assign({},newSort,{
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10,
        });

        let productListInfo = Object.assign({},state.productList);
        return _h.ajax.resource(path).save({},postData).then((listInfo)=>{
            let info = productListOperator(productListInfo,listInfo);
            return new Promise((resolve,reject)=>{
                resolve(info)
            })
        });
    }else{
        return "nextSuccessor";
    }
};


const diamondList = function(path,state,pageNo){

};

productList.getList = XBList.after(purchaseGameProductList);

module.exports = productList;
