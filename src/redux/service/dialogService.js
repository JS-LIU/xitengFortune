/**
 * Created by LDQ on 2017/5/4.
 */

import _betDialog from './betService';


const dialogStrategies = {
    'betDialog':function(state){
        let dialogInfo = _betDialog(state);
        let self = this;
        return {
            success:(fn)=>{
                if(dialogInfo.key === "success"){
                    fn(dialogInfo);
                }
                return self['betDialog'](state);
            },
            error:(fn)=>{
                if(dialogInfo.key === "fail"){
                    fn(dialogInfo);
                }
                return self['betDialog'](state);
            }
        }
    }

};

const showDialog = function(type,state){
    return dialogStrategies[type](state)
};

module.exports = showDialog;


