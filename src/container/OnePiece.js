/**
 * Created by LDQ on 2016/12/22.
 */
let React = require('react');
let { bindActionCreators } = require('redux');
let { connect } = require('react-redux');
let {Link} = require('react-router');
let $ = require('jquery');
let { Header,BackBtn,Title } = require('../components/Header');
let _h = require('../Util/HB');


import onePieceStyle from '../css/onePieceStyle.css';

import {activityList} from '../Util/xitengBaseConfig';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {activityActions} from '../redux/actions/activityActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {productListActions} from '../redux/actions/productListActions';

const OnePiece = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePiece');
        this.props.productListActionKeys.getList(
            '/purchaseGame/list',
            0,
            {popularity:1}
        )
    },
    scrollToTheBottom:function(){
        _h.ui.scrollToTheBottom(()=>{
            // if(!this.props.productList.last){
            //     function findQuery(ele){
            //         return ele.selected == true
            //     }
            //     let item = this.props.purchaseGame.productType.find(findQuery);
            //     let pageNo = this.props.purchaseGame.products.pageNo + 1;
            //     this.props.productActionKeys.getList(
            //         '/purchaseGame/list',
            //         pageNo,
            //         item.query
            //     );
            // }
        });
    },
    componentDidMount:function(){
        this.scrollToTheBottom();
    },
    componentWillUnmount:function(){
        $(window).unbind("scroll");
    },
    render: function () {

        return (
            <div className={onePieceStyle.f5f5f5}>
                <OnePieceHeader
                    activityActionKeys={this.props.activityActionKeys}
                    purchaseGameActionKeys={this.props.purchaseGameActionKeys}
                    purchaseGame={this.props.purchaseGame}
                />
                <OnePieceProductList
                    purchaseGameActionKeys={this.props.purchaseGameActionKeys}
                    productList = {this.props.productList}
                    storageActionKeys={this.props.storageActionKeys}
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
    render: function () {
        let winNodes = this.props.purchaseGame.newestWin.map((item,index)=>{

            return (
                <li className={onePieceStyle.purchase_broadcast_icon} key={index} >
                    <span className={onePieceStyle.purchase_broadcast_name}>{item.phoneNumber}</span>
                    <span>{item.productName}</span>
                </li>
            )
        });
        let totalDistance = 0.88 * this.props.purchaseGame.newestWin.length;
        let carouselStyle = {
            bigBox:{
                height:totalDistance + 'rem'
            },
            smBox:{
                height:'0.88rem'
            }
        };
        return (
            <div>
                {/*<ul className={onePieceStyle.onePiece_header}>*/}
                    {/*<li>*/}
                        {/*<Link to={{ pathname: "/OnePieceOldActivitiesHome", query: { status: "finish_bid" } }} >*/}
                            {/*<div className={onePieceStyle.lottery_results_icon}>揭晓</div>*/}
                        {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<Link to={{ pathname: "/OnePieceShow", query: { isAll: "yes" } }}>*/}
                            {/*<div className={onePieceStyle.show_prize_icon}>晒单</div>*/}
                        {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<Link to="/OnePieceHelp">*/}
                            {/*<div className={onePieceStyle.help_icon}>帮助</div>*/}
                        {/*</Link>*/}
                    {/*</li>*/}
                {/*</ul>*/}

                {/*<ul className={onePieceStyle.purchase_broadcast}>*/}
                    {/*{winNodes}*/}
                {/*</ul>*/}

            </div>
        )
    }
});

var OnePieceProductList = React.createClass({
    render: function () {
        return (
            <div className={onePieceStyle.onePiece_product_list}>
                {/*<OnePieceProductType*/}
                    {/*purchaseGame={this.props.purchaseGame}*/}
                    {/*purchaseGameActionKeys={this.props.purchaseGameActionKeys}*/}
                {/*/>*/}
                <OnePieceProducts
                    productList = {this.props.productList}
                    productListActionKeys = {this.props.productListActionKeys}
                    purchaseGameActionKeys={this.props.purchaseGameActionKeys}
                    storageActionKeys={this.props.storageActionKeys}
                />
            </div>
        )
    }
});

// var OnePieceProductType = React.createClass({
//     changeType:function(item){
//         return ()=>{
//             function turnQuery(query){
//                 query[Object.keys(query)[0]] = query[Object.keys(query)[0]]*-1;
//             }
//             turnQuery(item.query);
//             this.props.purchaseGameActionKeys.getProductList(
//                 {productList:"list"},
//                 item.query
//             );
//             this.props.purchaseGameActionKeys.cutType(item);
//         }
//     },
//
//     render: function () {
//         let typeNodes = this.props.purchaseGame.productType.map((item,index)=>{
//             return (
//                 <li
//                     key={index}
//                     onClick={this.changeType(item)}
//                     style={item.selected?selectedType:{}}
//                 >{item.name}</li>
//             )
//         });
//         return (
//             <ul className={onePieceStyle.onePiece_product_type}>
//                 {typeNodes}
//             </ul>
//         )
//     }
// });


const OnePieceProducts = React.createClass({
    setPurchaseGameId:function(item){
        return ()=>{
            this.props.storageActionKeys.setPurchaseGameId(item.purchaseGameId);
        }
    },
    render: function () {
        let productNodes = this.props.productList.list.map((item,index)=>{
            return (
                <li className={onePieceStyle.onePiece_product_item} key={index}>
                    <Link to="/OnePieceProductDetails" className={onePieceStyle.onePiece_product_item_pic_box} onClick={this.setPurchaseGameId(item)}>
                        <img src={item.pictures[0].picUrl} alt={item.productName} className={onePieceStyle.onePiece_product_item_pic}/>
                    </Link>
                    <p className={onePieceStyle.onePiece_product_name}>{item.productName}</p>
                    <div className={onePieceStyle.onePiece_rate_box}>
                        <ul className={onePieceStyle.onePiece_rate}>
                            <li className={onePieceStyle.onePiece_rate_text}>
                                <span className={onePieceStyle.onePiece_rate_text_title}>揭晓进度</span>
                                <span className={onePieceStyle.onePiece_rate_text_title_red}>{item.rateOfProgress}</span>
                            </li>
                            <li className={onePieceStyle.onePiece_rate_line}>
                                <div className={onePieceStyle.onePiece_rate_line_red} style={{width:item.rateOfProgress}}></div>
                            </li>
                            <li className={onePieceStyle.onePiece_rate_total}>
                                <div>
                                    <span>总需：</span>
                                    <span>{item.targetPurchaseCount}份</span>
                                </div>
                                <div>
                                    <span>剩余：</span>
                                    <span className={onePieceStyle.onePiece_rate_total_red}>{item.targetPurchaseCount-item.currentPurchaseCount}</span>
                                    <span>份</span>
                                </div>
                            </li>
                        </ul>
                        <Link to="/OnePieceBuyNow" className={onePieceStyle.onePiece_join_btn} onClick={this.setPurchaseGameId(item)}>立即参与</Link>
                    </div>
                </li>
            )
        });
        return (
            <ul>
                {productNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        activity:state.activity,
        purchaseGame:state.purchaseGame,
        storage:state.storage,
        productList:state.productList
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        activityActionKeys:bindActionCreators(activityActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
        productListActionKeys:bindActionCreators(productListActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePiece);


const selectedType = {
    color:"#F23030",
    borderBottom:"1px solid #F23030"
};