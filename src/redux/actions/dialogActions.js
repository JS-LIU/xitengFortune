/**
 * Created by LDQ on 2016/8/30.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';

export var dialogActions = {
    showDialog: (dialogInfo)=>{
        return {
            type : SHOW_DIALOG,
            dialogInfo
        }
    },

    hideDialog: ()=>{
        return {
            type: HIDE_DIALOG

        }
    },
};