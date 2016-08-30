/**
 * Created by LDQ on 2016/8/29.
 */
import {SET_PHONENUM,GET_CHECKCODE} from './userInfoActionKeys';
import _h from '../../Util/HB';

export const userInfoActions = {

    setPhoneNum: (num)=>{
        return {
            type : SET_PHONENUM,
            num
        }
    },
    getCheckCode: (obj)=>{
        return (dispatch)=>{
            _h.ajax.resource('/reqcheckCode/register?phoneNum=13436836055').query(obj)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};