/**
 * Created by LDQ on 2017/6/14.
 */

import Sort from '../domain/sort';

let sortService = function(sortInfo){
    let sort = new Sort(sortInfo);
    return {
        selected:function(targetItem){
            sort.selected(targetItem);
            return sort.info;
        },
        findCurrentSort:function(){
            return sort.findCurrentSort();
        },
    }

};


module.exports = sortService;