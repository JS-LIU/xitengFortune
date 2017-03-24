/**
 * Created by LDQ on 2017/3/23.
 */

import _h from '../../Util/HB';

class Address{
    constructor(addressInfo,accessInfo){
        this.accessInfo = accessInfo;

        for(let prop in addressInfo){
            this[ prop ] = addressInfo[ prop ];
        }
    }
    edit(){
        addressDirector.receiveMessage('addressEdit',this);
    }
    create(){
        addressDirector.receiveMessage('addressCreate',this);
    }
    remove(){
        addressDirector.receiveMessage('addressRemove',this);
    }
    defaultSettings(state){            //   state:1 为默认 0为非默认
        this.isDefault = state;
        addressDirector.receiveMessage('addressRemove',this);
    }

}

const addressDirector = (function(){

    let operations = {},
        postAction = _h.ajax.resource('/deliveryAddress/:path');



    operations.addressEdit = function(address){
        return postAction.save({path:"edit"},address);
    };

    operations.addressCreate = function(address){
        return postAction.save({path:"create"},address);
    };

    // operations.addressRemove = function(address){
    //     return postAction.save({path:"create"},address);
    // };


    const receiveMessage = function(){
        let message = Array.prototype.shift.call( arguments );
        operations[ message ].apply( this, arguments );
    };
    return {
        receiveMessage: receiveMessage
    }
})();


module.exports = Address;