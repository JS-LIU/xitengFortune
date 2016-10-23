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
    SET_DETAIL_ADDRESS,
    CHECKED_ADDRESS,
    SAVE_CURRENT
} from '../actions/addressActionKeys';

function hasCurrentAddress(currentAddress){
    if(currentAddress.addressId !== ""){
        return true;
    }else{
        return false;
    }
}
function hasDefaultAddress(defaultAddress){
    if(defaultAddress.recievName !== ""){
        return true;
    }else{
        return false;
    }
}
function getCurrentAddress(currentAddress,defaultAddress){
    if(hasCurrentAddress(currentAddress)){
        return currentAddress;
    }else if(hasDefaultAddress(defaultAddress)){
        return defaultAddress;
    }
}
function getCheckedAddress(listAddress){
    for(let i = 0;i < listAddress.length;i++){
        if(listAddress[i].checked){
            return listAddress[i];
        }
    }
}
function getListAddress(newState){
    for(let i = 0;i < newState.listAddress.length;i++){
        newState.listAddress[i].checked = false;

        if(newState.hasCurrentAddress){
            if(newState.listAddress[i].addressId == newState.currentAddress.addressId){
                newState.listAddress[i].checked = true;
            }
        }
    }
    return newState.listAddress;
}
function checkedAddress(listAddress,item) {
    for(let i = 0;i < listAddress.length;i++){
        listAddress[i].checked = false;
        if(listAddress[i].addressId === item.addressId){
            listAddress[i].checked = true;
        }
    }
    return listAddress;
}


export const address = function(state = {},action){
    var newState = Object.assign({},state);

    switch (action.type) {
        case 'GET_DEFAULT':
            return Object.assign({},state,{
                defaultAddress:{
                    recievName:action.data.userName,
                    phoneNum:action.data.mobile,
                    fullAddress:action.data.fullAddress
                },
                currentAddress:getCurrentAddress(state.currentAddress,action.data),
                hasCurrentAddress:hasCurrentAddress(state.currentAddress)
            });
        case 'GET_LIST':
            var copyState = Object.assign({},state,{
                listAddress:action.data.content
            });
            console.log('copyState---',copyState);
            return Object.assign({},state,{
                listAddress:getListAddress(copyState)
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
        case 'CHECKED_ADDRESS':

            return Object.assign({},state,{
                listAddress:checkedAddress([...state.listAddress],action.item)
            });
        case 'SAVE_CURRENT':
            console.log(getCheckedAddress([...state.listAddress]));
            return Object.assign({},state,{
                currentAddress:getCheckedAddress([...state.listAddress]),
                hasCurrentAddress:true
            });
        default:
            return state
    }
};