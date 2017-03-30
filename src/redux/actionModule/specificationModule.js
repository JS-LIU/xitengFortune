/**
 * Created by LDQ on 2017/3/27.
 */
// const specOperator = {
//     syncSpecProperties:{},
//     selectedProperties:{},
//     isAllSelected:{}
// };
//
// specOperator.syncSpecProperties = function(state){
//     let specInfo = state.specification;
//     let nextSpecInfo = state.productInfo.productInfo.spec;
//
//     for(let prop in nextSpecInfo){
//         if(!specInfo[ prop ]){
//             specInfo[ prop ] = null;
//         }
//     }
//
//     return specInfo;
// };
//
// specOperator.selectedProperties = function(properties){
//
// };
// specOperator.isAllSelected = function(state){
//     let specInfo = state.specification;
//
//     for(let prop in specInfo){
//
//         if(specInfo[ prop ] === null){
//             return false;
//         }
//
//     }
//     return true;
//
// };

class SpecOperator{
    constructor(state,newProductInfo){

        this.selectedSpecInfo = state.specification.spec;
        if(newProductInfo){
            this.productSpecInfo = newProductInfo.productInfo.specifications
        }else{
            this.productSpecInfo = state.productInfo.productInfo.specifications;
        }

        this.allSelected = false;
    }

    syncSpecProperties(){

        for(let i = 0,productProp;productProp = this.productSpecInfo[ i++ ];){
            function findName(prop){
                return prop.name === productProp.name;
            }
            if(!this.selectedSpecInfo.find(findName)){
                this.selectedSpecInfo.push({name:productProp.name,key:productProp.key,content:null});
            }
        }
        return this.selectedSpecInfo;
    }

    selectedProperties(item){
        if(item.key === 'num'){
        }
    }

    resetProductSpecInfo(item){
        for(let i = 0,productSpecInfo;productSpecInfo = this.productSpecInfo[ i++ ];){
            if(productSpecInfo.key === item.key){
                if(item.key === 'num'){
                    //  赋值
                    productSpecInfo.content = item.content;
                }else{
                    for(let j = 0,content;content = productSpecInfo.content[ j++ ];){
                        if(content.id === item.content.id){
                            content.selected = true;
                        }
                    }
                }
            }
        }
        return this.productSpecInfo;
    }

    resetSelectedSpecProp(item,content){
        for(let i = 0,selectedSpecInfo;selectedSpecInfo = this.selectedSpecInfo[ i++ ];){
            if(selectedSpecInfo.key === item.key){
                selectedSpecInfo.content = content
            }
        }
    }
    increaseNum(item){
        let num = parseInt(item.content);
        num+=1;
        console.log(num);

        this.resetSelectedSpecProp(item,num);
        return this.selectedSpecInfo;
    }
    fillInNum(){

    }

    isAllSelected(){

        for(let i = 0,specInfoProp;specInfoProp = this.selectedSpecInfo[ i++ ];){
            if(!specInfoProp.content){
                this.allSelected = false;
                return this.allSelected;
            }
        }

        this.allSelected = true;

        return this.allSelected;
    }

}

const spec = function(state,newProductInfo){

    let specOperator = new SpecOperator(state,newProductInfo);
    let isAllSelected = specOperator.isAllSelected();
    let syncSpecProperties = specOperator.syncSpecProperties();

    let increaseNum = specOperator.increaseNum;
    let resetProductSpecInfo = specOperator.resetProductSpecInfo;
    let reduceNum = function(item){

        let num = parseInt(item.content);
        return num -= 1;
    };

    return {
        isAllSelected:isAllSelected,
        syncSpecProperties:syncSpecProperties,
        increaseNum:function(){
            return increaseNum.apply(specOperator,arguments);
        },
        resetProductSpecInfo:function(){
            return resetProductSpecInfo.apply(specOperator,arguments);
        },
        // reduceNum:reduceNum
    }
};





module.exports = spec;