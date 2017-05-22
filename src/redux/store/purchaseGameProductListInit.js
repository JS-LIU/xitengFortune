/**
 * Created by LDQ on 2017/5/18.
 */
export const purchaseGameProductListInit = {
    list:[],
    pageNo:0,
    last:false,
    sort:[
        {
            key:'popularity',
            sort:1,
            name:'人气',
            select:true
        },
        {
            key:'rateOfProgress',
            sort:'',
            name:'进度',
            select:false
        },
        {
            price:'price',
            sort:'',
            name:'价格',
            select:false
        }

    ]
};