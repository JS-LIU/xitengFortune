/**
 * Created by LDQ on 2017/5/18.
 */
export const purchaseGameProductListInit = {
    list:[],
    pageNo:0,
    last:false,
    sort:[
        {
            type:{
                popularity:1,
            },
            name:'人气',
            select:true
        },
        {
            type:{
                rateOfProgress:'',
            },
            name:'进度',
            select:false
        },
        {
            type:{
                price:'',
            },
            name:'价格',
            select:false
        }

    ]
};