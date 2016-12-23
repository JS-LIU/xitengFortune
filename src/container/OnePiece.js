/**
 * Created by LDQ on 2016/12/22.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var { Header,BackBtn,Title } = require('../components/Header');
var _h = require('../Util/HB');
import ReactSwipe from 'react-swipe';

require('../css/onePieceStyle.css');

import {activityList} from '../Util/xitengBaseConfig';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {activityActions} from '../redux/actions/activityActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';



var OnePiece = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePiece');
    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.shop.last){
                this.props.shopActionKeys.getProductList(manner.mannerId,manner.index,pageNo);
            }
        });
    },
    render: function () {

        return (
            <div className="f5f5f5">
                <OnePieceHeader
                    activityActionKeys={this.props.activityActionKeys}
                    purchaseGameActionKeys={this.props.purchaseGameActionKeys}
                    purchaseGame={this.props.purchaseGame}
                />
            </div>
        )
    }
});


var OnePieceHeader = React.createClass({
    componentWillMount:function(){
        this.props.activityActionKeys.getActivityList({path:"list"},activityList.activityCategory.purchaseGame);
        this.props.purchaseGameActionKeys.getNewestWinList({win:"newestWin"});
    },
    timer:function(){
        setInterval(function(){

        },100);
    },
    componentDidMount:function(){
        // $('.purchase_broadcast_icon').addClass('roll_ready');

    },
    render: function () {
        let h = 0.88;
        let winNodes = this.props.purchaseGame.newestWin.map((item,index)=>{
            if(index > 1){
                var mt = -h + 'rem';
            }

            return (
                <div className="purchase_broadcast_icon" key={index} style={{marginTop:mt}}>
                    <span className="purchase_broadcast_name">{item.phoneNumber}</span>
                    <span>{item.productName}</span>
                </div>
            )
        });
        return (
            <div>
                <ul className="onePiece_header">
                    <li>
                        <Link to="/LotteryResults" >
                            <div className="onePiece_header_icon lottery_results_icon tc">揭晓</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/ShowPrize">
                            <div className="onePiece_header_icon show_prize_icon tc">晒单</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/OnePieceHelp">
                            <div className="onePiece_header_icon help_icon tc">帮助</div>
                        </Link>
                    </li>
                </ul>
                <div className="purchase_broadcast " >
                    {winNodes}
                </div>
            </div>
        )
    }
});




function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        activity:state.activity,
        purchaseGame:state.purchaseGame

    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        activityActionKeys:bindActionCreators(activityActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePiece);
