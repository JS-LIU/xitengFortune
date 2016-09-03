/**
 * Created by LDQ on 2016/8/29.
 */
import {SET_PHONENUM,GET_CHECKCODE,LOGIN} from './userInfoActionKeys';
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
                    dispatch({type:'GET_CHECKCODE', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    logIn: (obj1,obj2)=>{
        return (dispatch)=>{
            _h.ajax.resource('/login').save(obj1,obj2)
                .then((data)=>{
                    dispatch({type:'LOGIN', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};