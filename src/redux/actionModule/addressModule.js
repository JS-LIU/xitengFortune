/**
 * Created by LDQ on 2017/3/23.
 */

class Address{
    constructor(){

    }
    edit(){

    }
    create(){

    }
    remove(){

    }
    defaultSettings(){

    }

}

const addressDirector = (function(){

    var address = {},
        operations = {};

    const receiveMessage = function(){
        let message = Array.prototype.shift.call( arguments );
        operations[ message ].apply( this, arguments );
    };
    return {
        receiveMessage: receiveMessage
    }
})();