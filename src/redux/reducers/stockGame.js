/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN,GET_GAMELIST,REFRESH} from '../actions/stockGameActionKeys'

export const stockGame = function (state = {},action){
    switch (action.type) {
        case 'GET_GAMELIST':

            var gameList = state.gameList.concat(action.data.content);
            var startTime = gameList[0].gameStartTime;
            var endTime = gameList[0].gameEndTime;
            startTime = new Date(startTime.replace(new RegExp("-","gm"),"/")).getTime();
            endTime = new Date(endTime.replace(new RegExp("-","gm"),"/")).getTime();
            return Object.assign({},state,{
                gameTime:{
                    startTime:startTime,
                    endTime:endTime
                },
                gameList:gameList,
                last:action.data.last
            });
        case 'COUNT_DOWN':
            var nowTime = action.nowTime.getTime();
            var startTime = action.startTime;
            var countDownTime = startTime - nowTime;
            var startOrEnd = "开始";

            if(countDownTime < 0){
                startOrEnd = "结束";
                countDownTime = action.endTime - nowTime;
            }

            return Object.assign({},state,{
               countDown:{
                   countDownTime:trimTime(countDownTime - action.step,":"),
                   startOrEnd:startOrEnd
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