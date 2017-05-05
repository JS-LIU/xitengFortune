/**
 * Created by LDQ on 2017/5/2.
 */

export const payDialog = function (state = {},action) {
    switch (action.type) {
        case 'SHOW_PAY_DIALOG':
            let data = action.dialogInfo||state;

            return Object.assign({},state,{
                isShowDialog:true,
                title:data.title,
                body:data.body,
                cancel:data.cancel,
                certain:data.certain
            });

        case 'HIDE_DIALOG':
            return Object.assign({},state,{
                isShowDialog:false
            });
        default:
            return state
    }

};
