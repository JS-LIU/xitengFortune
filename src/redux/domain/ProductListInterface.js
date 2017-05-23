/**
 * Created by LDQ on 2017/5/18.
 */
class ProductListInterface{
    constructor(info){
        this.list = info.content;
        this.pageNo = info.number || 0;
        if(typeof info.last === 'undefined'){
            this.last = true;
        }else{
            this.last = info.last;
        }
    }
}

module.exports = ProductListInterface;