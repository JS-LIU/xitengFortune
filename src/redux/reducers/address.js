/**
 * Created by LDQ on 2016/10/19.
 */

import {
    GET_DEFAULT ,
    GET_LIST ,
    SET_PROVINCE,
    SET_CITY,
    SET_AREA,
    SET_NAME,
    SET_PHONE_NUM,
    SET_DEFAULT,
    SET_DETAIL_ADDRESS
} from '../actions/addressActionKeys';

function hasCurrentAddress(currentAddress){
    if(currentAddress.mobile){
        return true;
    }else{
        return false;
    }
}
function getCurrentAddress(defaultAddress,listAddress){
    if(defaultAddress.selected){
        return defaultAddress;
    }else{
        getSelectedAddress(listAddress);
    }
}
function getSelectedAddress(listAddress){
    for(let i = 0;i < listAddress.length;i++){
        if(listAddress[i].selected){
            return listAddress[i];
        }
    }
}
function getListAddress(addressList){
    return [];
}

export const address = function(state = {},action){
    var newState = Object.assign({},state);

    switch (action.type) {
        case 'GET_DEFAULT':
            console.log(action.data);
            let defaultAddress = Object.assign({},state.defaultAddress,action.data);
            console.log(defaultAddress);
            return Object.assign({},state,{
                defaultAddress:defaultAddress,
                currentAddress:getCurrentAddress(defaultAddress,state.listAddress),
                hasCurrentAddress:hasCurrentAddress(state.currentAddress)
            });
        case 'GET_LIST':
            //  TODO 翻页
            return Object.assign({},state,{
                listAddress:getListAddress(action.data.content)
            });
        case 'SET_PROVINCE':

            newState.newAddressInfo.province = action.item;
            return Object.assign({},state,newState);
        case 'SET_CITY':

            newState.newAddressInfo.city = action.item;
            return Object.assign({},state,newState);

        case 'SET_AREA':

            newState.newAddressInfo.area = action.item;
            return Object.assign({},state,newState);
        case 'SET_NAME':

            newState.newAddressInfo.name = action.item;
            return Object.assign({},state,newState);
        case 'SET_PHONE_NUM':

            newState.newAddressInfo.phoneNum = action.item;
            return Object.assign({},state,newState);
        case 'SET_DEFAULT':

            newState.newAddressInfo.default = action.item;
            return Object.assign({},state,newState);
        case 'SET_DETAIL_ADDRESS':

            newState.newAddressInfo.detailAddress = action.item;
            return Object.assign({},state,newState);
        default:
            return state
    }
};