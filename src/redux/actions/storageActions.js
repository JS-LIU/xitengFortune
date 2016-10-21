/**
 * Created by LDQ on 2016/8/17.
 */

import {
    SET_PRODUCTID,
    GET_PRODUCTID,
    SET_STOCKGAMEID,
    GET_STOCKGAMEID,
    SET_GUESSTYPE,
    GET_GUESSTYPE,
    SET_PROVINCE,
    SET_CITY,
    SET_AREA
} from './storageActionKeys';

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
    },
    setStockGameId: (id)=>{
        return {
            type : SET_STOCKGAMEID,
            id
        }
    },
    getStockGameId: () =>{
        return {
            type : GET_STOCKGAMEID,
        }
    },
    setGuessType: (id)=>{
        return {
            type : SET_GUESSTYPE,
            id
        }
    },
    getGuessType: () =>{
        return {
            type : GET_GUESSTYPE,
        }
    },
    setProvince: (item) =>{
        return {
            type : SET_PROVINCE,
            item
        }
    },
    setCity: (item) =>{
        return {
            type : SET_CITY,
            item
        }
    },
    setArea: (item) =>{
        return {
            type : SET_AREA,
            item
        }
    }

};