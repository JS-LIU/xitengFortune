/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_PRODUCTS} from './shopActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const shopActions= {

    getDiamonds:()=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let postData = {
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                }
            };
            console.log(postData);

            _h.ajax.resource('/diamond/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getProductList:(pageNo=10,size=10,orderObj={tagName:"推荐"})=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let postData = Object.assign({},{
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                pageNo:pageNo,
                size:size
            },orderObj);
            console.log(postData);

            _h.ajax.resource('/diamond/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_DIAMONDS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};