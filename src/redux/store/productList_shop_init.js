/**
 * Created by LDQ on 2017/6/12.
 */
export const productList_shop_init = {
    list:[],
    pageNo:0,
    last:false,
    sort:[
        {
            type:{
                'tagName':'推荐',
            },
            name:'推荐',
            select:true,
            key:'tagName'
        },
        {
            type:{
                'salesTag':1,
            },
            name:'销量',
            select:false,
            key:'salesTag',
            way:1
        },
        {
            type:{
                'priceTag':1,
            },
            name:'价格',
            select:false,
            key:'priceTag',
            way:1
        }

    ]
};