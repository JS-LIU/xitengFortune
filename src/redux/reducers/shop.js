/**
 * Created by LDQ on 2016/8/15.
 */


import {GET_PRODUCTS} from '../actions/shopActionKeys';

export const shop = function(state = {},action){

    switch (action.type) {

        case 'GET_PRODUCTS':
            let type = [...state.type];
            type.map((item,index)=>{
                item.selected = false;
            });

            type[action.index].selected = true;
            console.log(type);
            return Object.assign({},state,{
                productList:action.data.datas,
                type:type
            });
        default:
            return state
    }
};