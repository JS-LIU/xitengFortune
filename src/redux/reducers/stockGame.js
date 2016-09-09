/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN, COUNT_INIT,GET_GAMELIST} from '../actions/stockGameActionKeys'

export const stockGame = function (state = {},action){
    switch (action.type) {
        case 'GET_GAMELIST':
            var gameList = state.gameList.concat(action.data.content);
            console.log('GET_GAMELIST---',gameList);
            console.log('GET_GAMELIST---',action.data.last);
            return Object.assign({},state,{
                gameList:gameList,
                last:action.data.last
            });

        default:
            return state
    }

};