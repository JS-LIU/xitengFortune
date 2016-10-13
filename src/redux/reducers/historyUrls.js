/**
 * Created by LDQ on 2016/9/24.
 */

import {PUSH_URL,POP_URL} from '../actions/historyUrlsActionKeys';

class HistoryUrls{
    pushUrl(url,urls){
        if(urls[urls.length-1] != url){
            return [...urls,url]
        }else{
            return [...urls]
        }
    }
    popUrl(index,urls){
        var urls = [...urls];
        urls.splice(index,1);
        return urls;
    }
}


export const historyUrls = function(state = {},action){
    var historyUrls = new HistoryUrls();

    switch (action.type) {
        case 'PUSH_URL':

            let urlList = historyUrls.pushUrl(action.url,state.urlList);
            let previousUrl = urlList[urlList.length-2]||action.url;
            return Object.assign({},state,{
                urlList:urlList,
                last:previousUrl
            });

        case 'POP_URL':
            return Object.assign({},state,{
                urlList:historyUrls.popUrl(action.index,state.urlList)
            });

        default:
            return state
    }
};