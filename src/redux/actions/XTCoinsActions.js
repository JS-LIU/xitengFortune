/**
 * Created by LDQ on 2016/9/30.
 */
import {SELECTED_BUY_XTCOIN} from '../actions/XTCoinsActionKeys';

export const XTCoinsActions = {

    selectedBuyXTCoin: (index)=>{
        return {
            type : SELECTED_BUY_XTCOIN,
            index
        }
    }
};