/**
 * Created by LDQ on 2016/8/8.
 */
let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');
let Carousel = require('../components/Carousel');
let StockMarketList = require('./StockMarketList');

import guessStyle from "../css/guessStyle.css";

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {betListActions} from '../redux/actions/betListActions';
import {awardActions} from '../redux/actions/awardActions';
import {rankActions} from '../redux/actions/rankActions';
import {activityActions} from '../redux/actions/activityActions';


//  todo 测试使用 提交时删除
import {loginInfoActions} from '../redux/actions/loginInfoActions';
import _h from '../Util/HB';



var Guess = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Guess');
        this.props.activityActionKeys.getActivityList({path:"list"});

        //  todo 测试使用 提交时删除
        this.props.loginInfoActionKeys.phoneNumLogin('18801321546','123456');

    },
    render: function () {
        let imgNodes = this.props.activity.list.map((item,index)=>{
            return (
                <li className={guessStyle.carousel_item} key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        let window_w = document.body.clientWidth;
        let totalDistance = window_w * this.props.activity.list.length;
        let carouselStyle = {
            bigBox:{
                width:window_w+"px",
                height:'2.8rem'
            },
            smBox:{
                width:totalDistance + "px"
            }
        };
        return (
            <div className={guessStyle.common_bg}>
                <Carousel
                    carouselStyle={carouselStyle}
                    direction="slideLeft"
                    auto={true}
                >
                    {imgNodes}
                </Carousel>
                <StockMarketList />
                <BetList
                    betListActionKeys={this.props.betListActionKeys}
                    betList={this.props.betList}
                />
                <Rank
                    awardList={this.props.award.awardList}
                    awardActionKeys={this.props.awardActionKeys}
                    rank={this.props.rank}
                    rankActionKeys={this.props.rankActionKeys}
                />
            </div>
        )
    }
});


var BetList = React.createClass({
    componentWillMount:function(){
        this.props.betListActionKeys.getBetList();
    },
    timer:function(){
        let time = 140000;
        setInterval(()=>{
            this.props.betListActionKeys.getBetList();
        },time);
    },
    componentDidMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        let betNodes = this.props.betList.betList.map((item,index)=>{
            return (
                <li className={guessStyle.bet_user} key={index}>
                    <div className={guessStyle.bet_user_header}>
                        <img src={item.userIconUrl} alt="" className="w h"/>
                    </div>
                    <div className={guessStyle.bet_user_name}>
                        <span>{item.userName}</span>
                    </div>
                    <div className="fl ">
                        <span className={guessStyle.bet_time}>刚刚</span>
                    </div>
                    <div className="fr">
                        <span className={guessStyle.guess_bet_current_money}>投注</span>
                        <span className={guessStyle.guess_xt_money}>{item.guessXitbAmount}</span>
                    </div>
                </li>
            )
        });

        return (
            <div className={guessStyle.bet_user_box}>
                <ul className={guessStyle.roll_up}>
                    {betNodes}
                </ul>
            </div>
        )
    }
});

var Rank = React.createClass({
    componentWillMount:function(){
        this.props.awardActionKeys.getAward(3);
        this.props.rankActionKeys.getRank();
    },
    cutRank:function(id,type){
        return ()=>{
            this.props.awardActionKeys.getAward(id);
            this.props.rankActionKeys.selected(id);
            this.props.rankActionKeys.getRank(0,type,3);
        }
    },
    render: function () {
        let pic_src = this.props.awardList[0].productInfo.picUrl;
        let rankTypeNodes = this.props.rank.rankType.map((item,index)=>{
            return (
                <li className="J_ranktype fl cfff pl5 pr5"
                    style={item.selected?{color:"#FF4242"}:{}}
                    key={index}
                    onClick={this.cutRank(item.id,item.type)}>
                    <span>{item.title}排行</span>
                </li>
            )
        });
        let rankUserNodes = this.props.rank.rankList.map((item,index)=>{
            return (
                <li className={guessStyle.rank_user} key={index}>
                    <span className="cfff fl pl5 pr5">{index+1}</span>
                    <div className={guessStyle.rank_user_header}>
                        <img src={item.iconUrl} alt="" className="w"/>
                    </div>
                    <div className={ guessStyle.rank_user_name}>
                        <span>{item.userName}</span>
                    </div>
                    <span className={guessStyle.rank_user_bet}>
                        {item.bonusXtbAmount}
                    </span>
                </li>
            )
        });

        return (
            <div className={guessStyle.pk_box}>
                <div className={guessStyle.guess_stock_god}>
                    <p className={guessStyle.guess_stock_god_title}>股神争霸</p>
                    <ul className={guessStyle.guess_stock_god_classify}>
                        {rankTypeNodes}
                    </ul>
                </div>
                <ul className={guessStyle.guess_rank_list}>
                    {rankUserNodes}
                </ul>
                <div className={guessStyle.pk_pic}>
                    <img src={pic_src} alt="" className="prize_pic w"/>
                </div>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        storage:state.storage,
        betList:state.betList,
        award:state.award,
        rank:state.rank,
        activity:state.activity
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        betListActionKeys:bindActionCreators(betListActions,dispatch),
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch),
        activityActionKeys:bindActionCreators(activityActions,dispatch),
        //  todo 测试使用 提交时删除
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);

const upStyle={
    color:"#FF4242",
    background:'url("src/images/icon_arrow_up-@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const downStyle={
    color:"#02C56B",
    background:'url("src/images/icon_arrow_down@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const cred={
    color:"#FF4242"
};
const cgreen={
    color:"#02C56B"
};