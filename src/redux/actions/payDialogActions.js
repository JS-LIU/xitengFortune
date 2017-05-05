/**
 * Created by LDQ on 2017/5/5.
 */
import { SHOW_PAY_DIALOG,HIDE_PAY_DIALOG } from './payDialogActionKeys';

export const payDialogActions = {
    showPayDialog:(dialogInfo)=>{
        return {
            type:SHOW_PAY_DIALOG,
            dialogInfo
        }
    },
    hidePayDialog:()=>{
        return {
            type:HIDE_PAY_DIALOG
        }
    }

};