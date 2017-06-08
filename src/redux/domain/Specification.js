/**
 * Created by LDQ on 2017/6/1.
 */

//  转换规格
let converseSpecifications ={

    iterator:function(list,func){
        for(let i = 0;i < list.length;i++){
            func(list[i],i);
        }
    },
    addProp:function(item,prop){
        return Object.assign(item,prop);
    }
};


let SpecificationSelectedOperator = {
    findSpecification:function(){

    },
    findOption:function(){

    },
    changeOptionSelected:function(){

    },
    changeSpecificationSelected:function(){

    }
};


class Specification{
    constructor(specifications){
        this.specifications = specifications;
        let self = this;

        converseSpecifications.iterator(self.specifications,function(specification,i){
            converseSpecifications.addProp(specification,{selected:'unselected'});

            converseSpecifications.iterator(self.specifications[i].options,function(option,j){
                converseSpecifications.addProp(option,{selected:'unselected'});
            });
        });

    }
    isAllSelected() {
        for (let i = 0, item; item = this.specifications[i++];) {
            if(item.selected === 'unselected'){
                return false;
            }
        }
        return true;
    }
    selected(specificationId,optionId){

        let findSpecification = function(specification){
            if(specification.id === specificationId){
                return specification;
            }
        };
        let findOption = function(option){
            if(option.id === optionId){
                return option;
            }
        };

        let changeOptionSelected = function(){

        };

        let changeSpecificationSelected = function(){

        };

        let changedSpecification = this.specifications.find(findSpecification);
        let changedOption = changedSpecification.option.find(findOption);



        if(changedOption.selected === 'unselected'){

        }

    }
}





module.exports = Specification;



// specifications:[{name:'颜色',id:'1',selected:'false',options:[{name:'红色',id:'1',selected:'false'},{name:'绿色',id:'2',selected:'false'}]},{}]