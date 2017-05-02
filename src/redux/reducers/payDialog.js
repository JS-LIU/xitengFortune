/**
 * Created by LDQ on 2017/5/2.
 */

export const payDialog = function (state = {},action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            console.log(state);
            let data = action.data||state;

            return Object.assign({},state,{
                showDialog:true,
                title:data.title,
                body:data.body,
                cancel:data.cancel,
                certain:data.certain
            });

        case 'HIDE_DIALOG':
            return Object.assign({},state,{
                showDialog:false
            });
        default:
            return state
    }

};
