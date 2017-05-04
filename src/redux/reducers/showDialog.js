/**
 * Created by LDQ on 2016/8/30.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from '../actions/dialogActionKeys';

export const showDialog = function (state = {},action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            let dialogInfo = action.dialogInfo||{};
            return Object.assign({},state,{
                showDialog:true,
                title:dialogInfo.title,
                body:dialogInfo.body,
                cancel:dialogInfo.cancel,
                certain:dialogInfo.certain
            });

        case 'HIDE_DIALOG':
            return Object.assign({},state,{
                showDialog:false
            });
        default:
            return state
    }

};
