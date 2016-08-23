/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_PRODUCTS} from './shopActionKeys';
import fetcher1 from '../../Util/fetcher/fetcher';
import _h from '../../Util/HB';


export const shopActions= {

    getProducts:(obj)=>{
        return (dispatch)=>{
            _h.ajax.resource('src/data/:productList',{productList:'@productList'}).query(obj)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTS', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};