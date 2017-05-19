/**
 * Created by LDQ on 2017/5/18.
 */
class ProductListInterface{
    constructor(info){
        this.list = info.content;
        this.last = info.last || true;
        this.pageNo = info.number || 0;
    }
}

module.exports = ProductListInterface;