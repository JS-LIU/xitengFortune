/**
 * Created by LDQ on 2017/3/27.
 */
const specOperator = {
    syncSpecProperties:{},
    selected:{}
};

specOperator.syncSpecProperties = function(state){
    let specInfo = state.specification;
    let nextSpecInfo = state.productInfo.productInfo.spec;

    for(let prop in nextSpecInfo){
        if(!specInfo[ prop ]){
            specInfo[ prop ] = null;
        }
    }

    return specInfo;
};


module.exports = specOperator;