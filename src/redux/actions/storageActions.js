/**
 * Created by LDQ on 2016/8/17.
 */

import {SET_PRODUCTID,GET_PRODUCTID} from './storageActionKeys';

export const storageActions = {

    setProductId: (id)=>{
        return {
            type : SET_PRODUCTID,
            id
        }
    },

    getProductId: () =>{
        return {
            type : GET_PRODUCTID,
        }
    }

};