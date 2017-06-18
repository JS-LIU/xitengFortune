/**
 * Created by LDQ on 2017/6/14.
 */
export const sort_shopProductList_init = {
    sortList:[
        {
            type:{
                tagName:'推荐',
            },
            name:'推荐',
            selected:true,
            key:'tagName'
        },
        {
            type:{
                'salesTag':1,
            },
            name:'销量',
            selected:false,
            key:'salesTag',
        },
        {
            type:{
                'priceTag':1,
            },
            name:'价格',
            selected:false,
            key:'priceTag',
            way:1
        }

    ]
};