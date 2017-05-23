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
                'popularity':1,
            },
            name:'人气',
            select:true,
            key:'popularity',
            way:1
        },
        {
            type:{
                'rateOfProgress':1,
            },
            name:'进度',
            select:false,
            key:'rateOfProgress',
            way:1
        },
        {
            type:{
                'price':1,
            },
            name:'价格',
            select:false,
            key:'price',
            way:1
        }

    ]
};