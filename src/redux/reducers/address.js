/**
 * Created by LDQ on 2016/10/19.
 */

import { GET_DEFAULT ,GET_LIST} from '../actions/addressActionKeys';

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
        case 'CREATE_ADDRESS':

        default:
            return state
    }
};