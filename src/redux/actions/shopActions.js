/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_PRODUCTS} from './shopActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const shopActions = {

    getProductList:(mannerId={tagName:"推荐"},index=0,pageNo=0,size=10)=>{
        return (dispatch,getState)=>{
            let userInfo = getState().userInfo;

            let myManner = mannerId;
            for(let prop in mannerId){
                if(-(mannerId[prop]*-1)==mannerId[prop]){
                    myManner[prop] = mannerId[prop]*-1;
                }
            }


            let postData = Object.assign({},{
                accessInfo:{
                    app_key:userInfo.appKey,
                    access_token:"",
                    phone_num:userInfo.openId,
                    signature:hex_md5(userInfo.appSecret),
                },
                pageNo:pageNo,
                size:size
            },myManner);
            console.log(postData);
            console.log(index)
            _h.ajax.resource('/product/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTS', data,index})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },

};