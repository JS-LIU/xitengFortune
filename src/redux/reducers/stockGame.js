/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN,GET_GAMELIST,REFRESH} from '../actions/stockGameActionKeys'

export const stockGame = function (state = {},action){
    switch (action.type) {
        case 'GET_GAMELIST':

            let myGameList = state.gameList.concat(action.data.content);
            let startTime = myGameList[0].gameStartTime;
            let endTime = myGameList[0].gameEndTime;
            startTime = new Date(startTime.replace(new RegExp("-","gm"),"/")).getTime();
            endTime = new Date(endTime.replace(new RegExp("-","gm"),"/")).getTime();


            return Object.assign({},state,{
                gameTime:{
                    startTime:startTime,
                    endTime:endTime
                },
                gameList:myGameList,
                last:action.data.last,
            });
        case 'COUNT_DOWN':
            let nowTime = action.nowTime.getTime();
            let countDownTime = action.endTime - nowTime;

            return Object.assign({},state,{
               countDown:{
                   countDownTime:trimTime(countDownTime - action.step,":")
               }

            });
        case 'REFRESH':

            let index = state.gameList.findIndex((gameItem)=>{
                return gameItem.stockGameId == action.id;
            });
            var gameList = [...state.gameList];
            gameList[index] = action.data;
            return Object.assign({},state,{
                gameList:gameList
            });

        default:
            return state
    }

};

function paddingZero(i){
    if(i < 10){
        return "0" + i;
    }else{
        return i;
    }
}

function trimTime(time,str){
    var h = parseInt(time / 3600000);
    h = paddingZero(h);

    var y = time % 360000;
    var min = parseInt( y / 60000);
    min = paddingZero(min);

    y = y % 60000;
    var sec = parseInt(y / 1000);
    sec = paddingZero(sec);

    return h + str + min + str + sec;

}