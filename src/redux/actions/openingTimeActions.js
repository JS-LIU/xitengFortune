/**
 * Created by LDQ on 2016/8/8.
 */

import {COUNT_INIT,COUNT_DOWN} from './openingTimeActionKeys';

import fetcher1 from '../../Util/fetcher/fetcher'

export var openingTimeActions = {
    countDown: (date,step = 1)=>{
        return {
            type : COUNT_DOWN,
            step:step,
            time:date
        }
    },

    countInit: (time)=>{
        return {
            type: COUNT_INIT,
            init:time
        }
    },

    fetchFromServer:(url)=>{
        return (dispatch)=>{
            fetcher1(url)
                .then((data)=>{
                    console.log("data",data);
                    dispatch({type:'fromserver', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};

