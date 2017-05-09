/**
 * Created by LDQ on 2017/5/9.
 */

import _h from '../../Util/HB';

const productList = {
    getList:{}
};
const getXBList = function(path,state,pageNo){
    if(path === "/xtb/list"){
        let postData = {
            accessInfo:state.loginInfo.baseLoginData,
            pageNo:pageNo,
            size:10
        };
        return _h.ajax.resource(path).save({},postData);
    }else{
        return "nextSuccessor";
    }
};

const getDiamondList = function(path,state,pageNo){

};

productList.getList = getXBList.after(getDiamondList);

module.exports = productList;
