/**
 * Created by liudq on 2016/10/21.
 */
import { GET_AREA } from '../actions/areaAcitonKeys';


export const areas = function(state = {},action){

    switch (action.type) {
        case 'GET_AREA':
            console.log(action.data.areas);
            return Object.assign({},state,{
                list:action.data.areas
            });

        default:
            return state
    }
};
