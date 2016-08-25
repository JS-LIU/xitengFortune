/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.addProp
 *      HB.obj.isEmpty
 *
 *  HB.arrObj
 *      HB.arrObj.findObjs
 *      HB.arrObj.findIndex
 *      HB.arrObj.deleteObjs
 *
 *  HB.ajax
 *      HB.get  内部只使用了new XMLHttpRequest(); 所以可能不兼容部分IE浏览器
 *      HB.post
 *      HB.ajax
 */

var $ = require('jquery');

window.HB = window.HB || {};

HB.obj = (function(){


    //  判断obj1 中的属性 是否和obj2中的所有属性相等
    var toEquals = function(obj1,obj2){

        var flag = true;

        for(var prop in obj2){

            if(obj1[prop] != obj2[prop]){

                flag = false;

                break;

            }

        }

        return flag;

    };

    var addProp = function(obj,addedProp,bool = "fasle"){

        if(bool){

            for(var prop in addedProp){

                obj[prop] = addedProp[prop];

            }

        }else{

            for(var prop in addedProp){

                if(!obj[prop]){

                    obj[prop] = addedProp[prop];

                }

            }

        }

        return obj;

    };

    var isEmpty = function(obj){

        var proparr = [];

        for(var prop in obj){

            proparr.push(prop);

        }

        if(proparr.length == 0){

            return true;

        }else{

            return false;

        }

    };

    return {

        toEquals:toEquals,

        addProp:addProp,

        isEmpty:isEmpty
    }

})();


HB.arrObj = (function(){


    var findObjs = function(findedList,condition){

        var fitsList = [];

        for(var i = 0,len = findedList.length; i < len;i++){

            if(HB.obj.toEquals(findedList[i],condition)){

                fitsList.push(findedList[i]);

            }

        }

        return fitsList;

    };

    var findIndex = function(findedList,condition){

        var fitsIndex = [];

        for(var i = 0,len = findedList.length; i < len;i++){

            if(HB.obj.toEquals(findedList[i],condition)){

                fitsIndex.push(i);

            }

        }

        return fitsIndex;

    };

    var deleteObjs = function(deletedList,condition){

        var newList = [];

        for(var i = 0,len = deletedList.length; i < len;i++){

            if(!HB.obj.toEquals(deletedList[i],condition)){

                newList.push(deletedList[i]);

            }

        }

        return newList;

    };

    var isEmpty = function(arr){


        if(arr.length == 0){

            return true;

        }else{

            return false

        }

    };

    return {

        findObjs:findObjs,

        findIndex:findIndex,

        deleteObjs:deleteObjs,

        isEmpty:isEmpty

    }

})();

HB.ajax = (function(){
    /*
    *   第一个参数:url模板字符串类型，其中可以出现占位符，占位符要以“:”为前缀
    *   比如：'/productList/:type';
    *
    *
    *
    *
    * */
    class Resource{
        constructor(templateUrl){

            //  分割字符串
            this.templateUrlArr = templateUrl.split('/');
        }

        getRealUrl(entity_obj){
            this.templateUrlArr.map((item,i)=>{
                if(item[0] === ":"){
                    this.replaceItem(entity_obj,item,i)
                }
            });
            return this.templateUrlArr.join('/');
        }

        replaceItem(entity_obj,item,index){
            for(let prop in entity_obj){
                if(prop === item.slice(1)){
                    this.templateUrlArr[index] = entity_obj[prop];
                }else{
                    entity_obj = "";
                }
            }
        }
        ajax(type,url,data){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    type:type,
                    url:url,
                    dataType: "json",
                    data:data,
                    contentType:'application/json; charset=utf-8',
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    }
                }).done(resolve).fail(reject);

            });
        }

        query(entity_obj){

            let url = this.getRealUrl(entity_obj);
            console.log(url);
            let type = 'GET';
            var data = "";
            this.ajax(type,url,data);
        }


        save(entity_obj,data={}){
            let url = this.getRealUrl(entity_obj);
            let type = 'POST';
            this.ajax(type,url,data);
        }

    }

    return {
        resource:function(templateUrl){
            return new Resource(templateUrl);
        }
    }
})();

module.exports = HB;