/**
 * Created by LDQ on 2016/8/29.
 */
import {SET_PHONENUM} from './userInfoActionKeys';

export const userInfoActions = {

    setPhoneNum: (num)=>{
        return {
            type : SET_PHONENUM,
            num
        }
    }
};