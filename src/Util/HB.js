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

    class Resource{
        constructor(templateUrl,restfulHash){

            this.url = templateUrl;
            var templateArr = templateUrl.split('/');
            for(let prop in restfulHash){
                let i = templateArr.findIndex((ele,index,templateArr)=>{
                    if(ele[0] == ':'){
                        return ele.slice(1) == prop;
                    }
                });

                if(i != -1 && i != 0){
                    templateArr[i] = restfulHash[prop];
                }
            }
            this.templateArr = templateArr;
        }

        query(entity_obj){

            var t = this.templateArr;
            for(let prop in entity_obj){
                let i = t.findIndex((ele,index,t)=>{
                    if(ele[0] == '@'){
                        return ele.slice(1) == prop;
                    }

                });
                t[i] = entity_obj[prop];
            }
            var url = t.join('/');

            return new Promise((resolve,reject)=>{

                $.ajax({
                    type:'GET',
                    url:url,
                    dataType: "json",
                    contentType:'application/json; charset=utf-8'
                }).done(resolve).fail(reject);

            });

        }

        save(entity_obj){

            var t = this.templateArr;
            for(let prop in entity_obj){
                let i = t.findIndex((ele,index,t)=>{
                    return ele == prop;
                });
                t[i] = entity_obj[prop];
            }
            var url = '';
            for(let i = 0;i < t.length;i++){
                url += t[i];
            }

            return new Promise((resolve,reject)=>{

                $.ajax({
                    type:'POST',
                    url:url,
                    dataType: "json",
                    contentType:'application/json; charset=utf-8'
                }).done(resolve).fail(reject);

            });
        }

    }

    return {
        resource:function(url){
            return new Resource(url);
        }
    }
})();

module.exports = HB;