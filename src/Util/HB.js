/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.isEmpty
 *  HB.resource
 *      HB.resource.query()
 *      HB.resource.save()
 *  HB.valid
 *      HB.valid.toPhoneNum
 *  HB.ui
 *      HB.ui.scrollToTheBottom
 *
 */

var $ = require('jquery');

window.HB = window.HB || {};

HB.obj = (function(){

    //  判断obj1中是否有obj2中的所有属性
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

    //  用途：是否为空对象
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

        //  实际上这个方法并不想暴露出来
        getRealUrl(entity_obj){
            this.templateUrlArr.map((item,i)=>{
                if(item[0] === ":"){
                    this.replaceItem(entity_obj,item,i)
                }
            });
            return this.templateUrlArr.join('/');
        }
        //  实际上这个方法并不想暴露出来
        replaceItem(entity_obj,item,index){
            for(let prop in entity_obj){
                if(prop === item.slice(1)){
                    this.templateUrlArr[index] = entity_obj[prop];
                }else{
                    entity_obj = "";
                }
            }
        }
        //  实际上这个方法并不想暴露出来
        ajax(type,url,data){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    type:type,
                    url:url,
                    data:data,
                    contentType:'application/json; charset=utf-8',
                }).done(resolve).fail(reject);

            });
        }

        query(entity_obj){

            let url = this.getRealUrl(entity_obj);
            console.log(url);
            let type = 'GET';
            var data = "";
            return this.ajax(type,url,data);
        }


        save(entity_obj,data){
            let url = this.getRealUrl(entity_obj);
            let type = 'POST';
            return this.ajax(type,url,JSON.stringify(data));
        }
    }

    return {
        resource:function(templateUrl){
            return new Resource(templateUrl);
        }
    }
})();
HB.valid = (function(){
    /*
    *   用途：按一定规则分割字符串
    *   第1个参数是分割哪个电话号码 比如：18801233565
    *   第2个参数是每隔多少个字符分割 比如：18801233565 分成 188 0123 3565 就传[3,4,4]
    *   第3个参数是用什么来分割 比如：18801233565 分成 188-0123-3565 就传'-'
    * */

    function validNum(num,arr,str){
        var newPhoneNum = [];
        arr.map((item,i)=>{
            var newNum = num.slice(0,item);
            num = num.substr(item);
            newPhoneNum.push(newNum);
        });
        return newPhoneNum.join(str).trim();
    }

    //  用途：将字符串中所有空格删除
    function trimAllBlank(str){
        return str.replace(/\s/g, "");
    }

    //  用途：将数字转换成字符串
    function parseString(i){
        return i+"";
    }

    //  用途：将字符串转换为数组
    function parseArr(str){
        return str.split('');
    }

    //  用途：将阿拉伯数子转换为汉字
    function parseChinese(number){
        let chinese = ['零','一','二','三','四','五','六','七','八','九'];
        let arrNumber = parseArr(parseString(number));
        let chineseNumber = "";

        return arrNumber.map((item,index)=>{
            chineseNumber += chinese[item];
            return chineseNumber;
        });
    }

    //  将星期几转换成汉字的
    function parseDay(day){
        let myDay = day;
        if(day == 0){
            myDay = 7;
        }
        return parseChinese(myDay);

    }
    return {
        validNum:validNum,
        trimAllBlank:trimAllBlank,
        parseString:parseString,
        parseArr:parseArr,
        parseChinese:parseChinese,
        parseDay:parseDay
    }

})();

HB.ui = (function(){

    var scrollToTheBottom = function(func){
        $(window).scroll(function(){
            var $_scrollTop = $(this).scrollTop();
            var $_scrollHeight = $(document).height();
            var $_windowHeight = $(this).height();
            if($_scrollTop + $_windowHeight == $_scrollHeight){
                func();
            }
        });
    };


    return {
        scrollToTheBottom:scrollToTheBottom
    }
})();



module.exports = HB;