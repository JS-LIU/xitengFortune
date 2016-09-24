/**
 * Created by LDQ on 2016/8/29.
 */
/**
 * Created by LDQ on 2016/8/17.
 */


import {SET_PHONENUM,LOGIN} from '../actions/userInfoActionKeys';
var _h = require('../../../src/Util/HB');

export const userInfo = function(state = {},action){

    switch (action.type) {
        case 'SET_PHONENUM':

            return Object.assign({},state,{
                phoneNum:_h.valid.validNum(action.num,[3,4,4]," ")
            });

        case 'LOGIN':
            console.log(action.data);
            return Object.assign({},state,{
                access_token:action.data.access_token,
                access_token_secret:action.data.access_token
            });
        default:
            return state
    }
};