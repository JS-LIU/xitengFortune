/**
 * Created by LDQ on 2017/3/27.
 */
import { SHOW_SPEC_PRO } from '../actions/specificationActionKeys';


export const specificationActions = {

    showSpecPro:(isBuyNow)=>{
        return {
            type: "SHOW_SPEC_PRO",
            isBuyNow
        }
    }

};