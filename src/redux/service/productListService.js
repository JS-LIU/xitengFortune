/**
 * Created by LDQ on 2017/5/9.
 */


import _h from '../../Util/HB';
import _XBListEntity from '../domain/XBList';
import _PurchaseGameProductListEntity from '../domain/PurchaseGameProductList';
const productList = {
    getList:function(...args){
        let strategy = args.shift();
        return listStrategies[strategy].apply(this,args);
    },
};

let listStrategies = {
    'XBList':XBList,
    'purchaseGameProductList':purchaseGameProductList
};

let XBList = function(state,pageNo,dispatchAction){

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

let purchaseGameProductList = function(state,pageNo,sort,dispatchAction){

    _h.ajax.resource("/purchaseGame/list").save({},postData).then((listInfo)=>{
        let list = _PurchaseGameProductListEntity(listInfo,sort);
        dispatchAction(list)
    });


    let productList_purchaseGame = new _PurchaseGameProductListEntity(listInfo,sortInfo);
    dispatchAction(productList_purchaseGame);
    // return {
    //     commandList:[],
    //     add:function(command){
    //         this.commandList.push(command)
    //     },
    //     execute:function(){
    //         for(let i = 0,command;command = this.commandList[ i++ ];){
    //             command.execute();
    //         }
    //     }
    // };
    // if( !state.purchaseGameProductList.last ){
    //     let postData = {
    //         accessInfo:state.loginInfo.baseLoginData,
    //         pageNo:pageNo,
    //         size:10,
    //         popularity:1
    //     };
    //     _h.ajax.resource("/purchaseGame/list").save({},postData).then((listInfo)=>{
    //         let productList_purchaseGame = new _PurchaseGameProductListEntity(listInfo);
    //
    //         return dispatchAction(productList_purchaseGame);
    //     });
    // }
};

let selectedSortCommand = {
    execute:function(state,sort){
        let sortList = [...state.purchaseGameProductList.sort];
        for(let i = 0,stateSort; stateSort = sortList[ i++ ];){
            stateSort.selected = false;
            if(stateSort.key === sort.key){
                stateSort.selected = true;
                stateSort.sort = 1;
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
