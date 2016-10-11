/**
 * Created by LDQ on 2016/9/24.
 */
import {PUSH_URL,POP_URL} from './historyUrlsActionKeys';

export const historyUrlsActions = {
    pushUrl: (url)=>{
        return {
            type : PUSH_URL,
            url
        }
    },

    popUrl: (index = -1)=>{
        return {
            type: POP_URL,
            index
        }
    }

};
