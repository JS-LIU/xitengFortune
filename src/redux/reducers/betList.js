/**
 * Created by LDQ on 2016/10/10.
 */
import { GET_BETLIST } from '../actions/betListActionKeys';

export const betList = function(state = {},action){

    switch (action.type) {
        case 'GET_BETLIST':
            console.log(action.data);
            if(!action.data.last){
                action.pageNo += 1;
            }

            return Object.assign({},state,{
                betList:action.data.content,
                last:action.data.last,
                pageNo:action.pageNo
            });

        default:
            return state
    }
};