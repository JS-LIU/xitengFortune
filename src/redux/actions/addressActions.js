/**
 * Created by LDQ on 2016/10/19.
 */

import {
    CREATE_ADDRESS,
    GET_DEFAULT,
    GET_LIST,
    SET_PROVINCE,
    SET_CITY,
    SET_AREA,
    SET_NAME,
    SET_PHONE_NUM,
    SET_DETAIL_ADDRESS
} from './addressActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var addressActions = {
    getDefault : ()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                }
            };
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/getDefault').save({},postData).then((data)=>{
                dispatch({type:'GET_DEFAULT',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    getList:()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                size:10,
                pageNo:0
            };
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/list').save({},postData).then((data)=>{
                dispatch({type:'GET_LIST',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    createAddress:(otherInfo)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;
            let newAddressInfo = getState().address.newAddressInfo;
            let districtAddress = newAddressInfo.province.label+newAddressInfo.city.label+newAddressInfo.area.label;
            let postData = Object.assign({},{
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:userInfo.access_token,
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret + '&' +  userInfo.access_token_secret)
                },
                provinceId:newAddressInfo.province.id,
                cityId:newAddressInfo.city.id,
                fullAddress:districtAddress+otherInfo.detailAddress,
                districtAddress:districtAddress,
                positionX:"0",
                positionY:"0",
                isDefault:0

            },otherInfo);
            console.log(postData);

            _h.ajax.resource('/deliveryAddress/create').save({},postData).then((data)=>{
                dispatch({type:'CREATE_ADDRESS',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    setProvince: (item) =>{
        return {
            type : SET_PROVINCE,
            item
        }
    },
    setCity: (item) =>{
        return {
            type : SET_CITY,
            item
        }
    },
    setArea: (item) =>{
        return {
            type : SET_AREA,
            item
        }
    },
    setName: (item) =>{
        return {
            type : SET_NAME,
            item
        }
    },
    setPhoneNum: (item) =>{
        return {
            type : SET_PHONE_NUM,
            item
        }
    },
    setDetailAddress: (item) =>{
        return {
            type : SET_DETAIL_ADDRESS,
            item
        }
    },

};
