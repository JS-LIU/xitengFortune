/**
 * Created by LDQ on 2016/8/12.
 */


var React = require('react');
var EntranceList = require('./EntranceList');


var Discover = React.createClass({
    render: function () {
        return (
            <div>
                <EntranceList itemList={[{
                    name:'邀请奖励',
                    url:'/inviteReward',
                    icon:''
                }, {
                    name:'朋友圈',
                    url:'/friendsCircle',
                    icon:''
                }]}/>
                <EntranceList itemList={[{
                    name:'升级会员',
                    url:'/upMember',
                    icon:''
                }, {
                    name:'购买钻石',
                    url:'BuyDiamonds',
                    icon:''
                }]}/>
                <EntranceList itemList={[{
                    name:'兑换礼品',
                    url:'/Shop',
                    icon:''
                }]}/>
            </div>
        )
    }
});


module.exports = Discover;
