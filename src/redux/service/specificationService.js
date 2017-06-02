/**
 * Created by LDQ on 2017/6/2.
 */

import Specification from '../domain/Specification';


let specificationService = function(specificationInfo){
    let specification = new Specification(specificationInfo);
    return {
        isAllSelected:specification.isAllSelected,
        selected:specification.selected
    }
};

module.exports = specificationService;