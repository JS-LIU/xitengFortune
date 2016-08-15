/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN, COUNT_INIT} from '../actions/openingTimeActionKeys'
var op = require('./../store/openingTimeInit');

function secTurnHours(sec){
    var myHour = parseInt(sec / 3600);
    var remainder = sec % 3600;
    var myMin = parseInt(remainder / 60);
    var mySec = remainder % 60;
    return {
        hour:myHour,
        min:myMin,
        sec:mySec
    }
}

export const openingTime = function (state = {},action){
    switch (action.type) {
        case COUNT_INIT:
            return Object.assign({},state,{
                initTime:op.initTime,
            });
        case COUNT_DOWN:
            return Object.assign({},state,{
                countDown:secTurnHours(op.countDown(action.time) - action.step)
            });
        case 'fromserver':
            console.log("fromserver",action.data);
            return state;

        default:
            return state
    }

};