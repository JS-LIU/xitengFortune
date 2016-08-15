/**
 * Created by LDQ on 2016/8/9.
 */
var op = {
    initTime:{},
    countDown:{}
};

op.initTime = (function(){
    var time = {
        month:"",
        day:"",
    };
    var date = new Date();
    var hours = date.getHours();
    time.month = date.getMonth()+1;
    time.day = date.getDate();

    if(hours >= 15){
        date.setDate(date.getDate()+1);
        time.month = date.getMonth()+1;
        time.day = date.getDate();
    }
    return time;
}());

op.countDown = function(date=(new Date())){
    var hours = date.getHours();
    var initTime = {
        hour:'',
        min:'',
        sec:''
    };
    if(hours >= 15){
        initTime.hour = 15 + 23 - date.getHours();
    }else{
        initTime.hour =  14 - date.getHours();
    }
    initTime.min = 59 - date.getMinutes();
    initTime.sec = 59 - date.getSeconds();
    return initTime.hour * 3600 + initTime.min * 60 + initTime.sec
};

module.exports = op;