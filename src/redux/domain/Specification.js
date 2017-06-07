/**
 * Created by LDQ on 2017/6/1.
 */
class Specification{
    constructor(specifications){
        this.specifications = specifications;
        for(let i = 0,item; item = this.specifications[i++];){
            item.selected = item.selected || 'unselected';
        }
    }
    isAllSelected() {
        for (let i = 0, item; item = this.specifications[i++];) {
        }
    }
    selected(){

    }
}

module.exports = Specification;



// specifications:[{name:'颜色',id:'1',selected:'false',options:[{name:'红色',id:'1',selected:'false'},{name:'绿色',id:'2',selected:'false'}]},{}]