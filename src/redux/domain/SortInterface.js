/**
 * Created by LDQ on 2017/6/13.
 */

let sortSelectedOperator = {
    findSelectedSort:function(sortList,selectedKey){

        let isEqualSort = function(item){
            if(item.key === selectedKey ){
                return item;
            }
        };
        return sortList.find(isEqualSort);
    },
    findCurrentSort:function(sortList){
        for(let i = 0,item;item = sortList[i++];){
            if(item.selected){
                return item;
            }
        }
    },
    changeSortWay:{
        reverse:function(selectedItem){
            if(typeof selectedItem.way !== 'undefined'){
                selectedItem.way = selectedItem.way * -1;
            }
        },
        initialize:function(selectedItem,initWay){
            if(typeof selectedItem.way !== 'undefined'){
                selectedItem.way = initWay;
            }
        }
    },
    changeSelectedState:function(sortList,selectedItem,currentSelectedItem){
        if(selectedItem.key === currentSelectedItem.key){
            this.changeSortWay.reverse(selectedItem);
        }else{
            for(let i = 0,item;item = sortList[i++];){
                item[i].selected = false;
                this.changeSortWay.initialize(item,1);
            }
            selectedItem.selected = true;
        }
    },

};


class SortInterface{
    constructor(info){
        this.info = info;
    }

    selected(selectedItem){
        let targetSortItem = sortSelectedOperator.findSelectedSort(this.info);
        let currentSort = sortSelectedOperator.findCurrentSort(this.info);
        sortSelectedOperator.changeSelectedState(this.info,targetSortItem,currentSort);
    }
}

module.exports = SortInterface;