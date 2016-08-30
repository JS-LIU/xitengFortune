/**
 * Created by LDQ on 2016/8/29.
 */
/**
 * Created by LDQ on 2016/8/17.
 */


import {SET_PHONENUM} from '../actions/userInfoActionKeys';
var _h = require('../../../src/Util/HB');

export const userInfo = function(state = {},action){

    switch (action.type) {
        case 'SET_PHONENUM':

            return Object.assign({},state,{
                phoneNum:_h.valid.validNum(action.num,[3,4,4]," ")
            });

        default:
            return state
    }
};