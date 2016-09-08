/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN, COUNT_INIT,GET_GAMELIST} from '../actions/gameListActionKeys'

export const gameList = function (state = {},action){
    switch (action.type) {
        case 'GET_GAMELIST':
            console.log("GET_GAMELIST",action.data);
            return Object.assign({},state,{
                gameList:[...state.gameList,action.data.content],
                last:action.data.last
            });

        default:
            return state
    }

};