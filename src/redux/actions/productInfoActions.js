/**
 * Created by LDQ on 2016/8/18.
 */
import {GET_PRODUCTINFO} from './productInfoActionKeys';
import _h from '../../Util/HB';

export var productActions = {

    getProductInfo:(obj)=>{
        return (dispatch)=>{
            _h.ajax.resource('src/data/productDetails.json').query(obj)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTINFO', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};
