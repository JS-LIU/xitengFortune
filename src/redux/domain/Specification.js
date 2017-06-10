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
        if(typeof item.selected === "undefined"){
            return Object.assign(item,prop);
        }
    }
};


let SpecificationsSelectedOperator = {

    findChanged:function(list,changedId){
        function isEqualId(item){
            if(item.id === changedId){
                return item;
            }
        }

        return list.find(isEqualId);
    },

    changeSelectedState:function(changedSpecification,changedOption){

        //  todo: StateFactory
        if(changedOption.selected === 'unselected'){
            //  将其他的选项变为未选择
            for(let i = 0,option; option = changedSpecification[i++];){
                option.selected = 'unselected';
            }
            changedOption.selected = 'selected';
            changedSpecification.selected = 'selected';
        }else if(changedOption.selected === 'selected'){
            changedOption.selected = 'unselected';
            changedSpecification.selected = 'unselected';
        }
    },
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
        let changedSpecification = SpecificationsSelectedOperator.findChanged(this.specifications,specificationId);
        let changedOption = SpecificationsSelectedOperator.findChanged(changedSpecification.options,optionId);

        SpecificationsSelectedOperator.changeSelectedState(changedSpecification,changedOption);

    }
}





module.exports = Specification;



// specifications:[{name:'颜色',id:'1',selected:'false',options:[{name:'红色',id:'1',selected:'false'},{name:'绿色',id:'2',selected:'false'}]},{}]