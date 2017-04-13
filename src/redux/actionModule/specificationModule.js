/**
 * Created by LDQ on 2017/3/27.
 */

class SpecOperator{
    constructor(state){

        this.selectedSpecInfo = state.specification.spec;
        this.productSpecInfo = state.productInfo.productInfo.specifications;

        this.allSelected = false;
    }

    syncSpecProperties(specifications){
        specifications.map((productProp,i)=>{
            //  这里 将【下标统一】作为索引
            this.selectedSpecInfo[i] = {name:productProp.name,key:productProp.key,content:null}
        });

        return this.selectedSpecInfo;
    }

    resetProductSpecInfo(item,func){
        for(let i = 0,productSpecInfo;productSpecInfo = this.productSpecInfo[ i++ ];){
            if(productSpecInfo.key === item.key){
                func(productSpecInfo);
            }
        }
    }
    increaseNum(item){
        let num = parseInt(item.content);
        num += 1;

        this.resetProductSpecInfo(item,function(productSpecInfo){
            productSpecInfo.content = num;
        });
        return this.productSpecInfo;
    }
    reduceNum(item){
        let num = parseInt(item.content);
        num -= 1;

        this.resetProductSpecInfo(item,function(productSpecInfo){
            productSpecInfo.content = num;
        });
        return this.productSpecInfo;
    }


    syncCustomerSelectedSpec(){

        this.productSpecInfo.map((productSpecProp,i)=>{
            if(productSpecProp.key === 'num'){
                this.selectedSpecInfo[i].content = productSpecProp.content;
            }else{
                productSpecProp.content.map((contentProp,j)=>{
                    if(contentProp.selected){
                        this.selectedSpecInfo[i].content = contentProp[j];
                    }
                });
            }
        });
        return this.selectedSpecInfo;
    }
    isAllSelected(selectedSpecInfo){

        for(let i = 0,specInfoProp;specInfoProp = selectedSpecInfo[ i++ ];){
            if(!specInfoProp.content){
                this.allSelected = false;
                return this.allSelected;
            }
        }

        this.allSelected = true;

        return this.allSelected;
    }
    connect(productInfo,specifications){

        specifications.map((prop,index)=>{
            if(prop.key === 'num'){
                productInfo.productInfo.num = prop.content;
            }
        });
        return Object.assign({},productInfo.productInfo,{
            specifications:specifications
        })

    }

}

const specOperator = {

};


module.exports = specOperator;