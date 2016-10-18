/**
 * Created by LDQ on 2016/10/19.
 */

import { GET_DEFAULT } from '../actions/addressActionKeys';

function hasCurrentAddress(currentAddress){
    return (currentAddress.mobile === "")?false:true;
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

export const address = function(state = {},action){

    switch (action.type) {
        case 'GET_DEFAULT':
            console.log(action.data);
            // let isSelected = state.address.defaultAddress.selected;
            let defaultAddress = Object.assign({},state.defaultAddress,action.data);
            console.log(defaultAddress);
            return Object.assign({},state,{
                defaultAddress:defaultAddress,
                currentAddress:getCurrentAddress(state.listAddress),
                hasCurrentAddress:hasCurrentAddress(state.currentAddress)
            });

        default:
            return state
    }
};