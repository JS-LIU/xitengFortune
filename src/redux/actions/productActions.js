/**
 * Created by LDQ on 2017/4/12.
 */

import { SET_BELONG } from './productActionKeys';
import _product from '../actionModule/productModule';
import {SHOW_SPEC_PRO} from './specificationActionKeys';

import _h from '../../Util/HB';

export const productActions = {

    setBelong:(belong)=>{
        return (dispatch,getState)=>{
            dispatch({type:'SHOW_SPEC_PRO'});
            dispatch({type:'SET_BELONG',belong});

        }
    }

};
