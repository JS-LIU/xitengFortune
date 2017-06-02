/**
 * Created by LDQ on 2017/5/26.
 */
class Product{
    constructor(info){
        this.info = info;
        this.info.totalCount = 1;
    }
    increaseNum(){
        this.totalCount += 1;
    }
    reduceNum(){
        this.totalCount -= 1;
    }
}
module.exports = Product;