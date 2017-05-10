/**
 * Created by LDQ on 2017/5/9.
 */

import _h from '../../Util/HB';

const productList = {
    getList:{},
    sort:{
        popularity:1,
        productName:"",
        price:-1,
        rateOfProgress:1
    }
};

const productListOperator = function(productListInfo,newListInfo){

    newListInfo.pageNo = newListInfo.pageNo || 0;
    newListInfo.last = newListInfo.last || true;
    if(newListInfo.pageNo === 0){
        productListInfo.list = newListInfo.content;
    }else{
        productListInfo.list.concat(newListInfo.content);
    }

    productListInfo.last = newListInfo.last;
    productListInfo.pageNo = newListInfo.pageNo;
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
        console.log(postData);
        let productListInfo = Object.assign({},state.productList);
        return _h.ajax.resource(path).save({},postData)
    }else{
        return "nextSuccessor";
    }
};


const diamondList = function(path,state,pageNo){

};

productList.getList = XBList.after(purchaseGameProductList);

module.exports = productList;
