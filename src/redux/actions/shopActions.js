/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_SHOPITEMS} from './shopActionKeys';
import fetcher1 from '../../Util/fetcher/fetcher';
import _h from '../../Util/HB';


export const shopActions= {

    getShopItems:(obj)=>{
        return (dispatch)=>{
            _h.ajax.resource('src/data/productList.json').query(obj)
                .then((data)=>{
                    dispatch({type:'GET_SHOPITEMS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};