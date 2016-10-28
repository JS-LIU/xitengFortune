/**
 * Created by LDQ on 2016/8/29.
 */

import {hex_md5} from '../../Util/md5';

let appKey = "b5958b665e0b4d8cae77d28e1ad3f521";
let appSecret = "71838ae252714085bc0fb2fc3f420110";


export const userInfoInit = {
    phoneNum:"",
    appKey:"b5958b665e0b4d8cae77d28e1ad3f521",
    appSecret:"71838ae252714085bc0fb2fc3f420110",
    access_token:'',
    access_token_secret:'',
    openId:"123",
    logIn:false,
    sex:1,
    loginData:{},
    unLoginData:{
        app_key:appKey,
        access_token:"",
        phone_num:"",
        signature:hex_md5(appSecret)
    }
};