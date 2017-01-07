/**
 * Created by LDQ on 2016/12/26.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceProductDetailsStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {loginInfoActions} from '../redux/actions/loginInfoActions';


var OnePieceProductDetails = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceProductDetails');

        var purchaseGameId = _h.url.getSearchKey('purchaseGameId');
        if(!purchaseGameId){
            purchaseGameId = this.props.storage.purchaseGameId;
        }else{
            this.props.storageActionKeys.setPurchaseGameId(purchaseGameId);
        }


        //  todo 提交测试千万别忘了删这行 这里执行微信登录
        this.props.loginInfoActionKeys.phoneNumLogin('18801321546','123456');


        this.props.purchaseGameActionKeys.getDetail(
            {detail:"detail"},
            purchaseGameId
        );
        setTimeout(()=>{
            this.props.purchaseGameActionKeys.getBidDetail({bidDetail:"bidDetail"},purchaseGameId);
        },100);
    },
    render: function () {
        let window_w = document.body.clientWidth;
        img_box.width = window_w;
        let productPicNodes = this.props.purchaseGame.detail.pictures.map((item,index)=>{
            if(index > 1){
                img_box.marginLeft = "-"+window_w;
            }
            return (
                <li className="onePiece_pic" key={index} style={img_box}>
                    <img src={item.picUrl} alt="" className="h"/>
                </li>
            )
        });
        let bidRecordNodes = this.props.purchaseGame.bidDetail.bidRecords.map((bidRecord,i)=>{
            return (
                <span key={i} className="onePiece_detail_bidDetail_record_item">{bidRecord.bidRecordId}</span>
            )
        });
        return (
            <div className="f5f5f5">
                <ul className="onePiece_product_pic">
                    {productPicNodes}
                </ul>
                <ul className="onePiece_detail_text">
                    <li className="onePiece_detail_text_title">
                        <span className="onePiece_detail_purchaseGame_status">{this.props.purchaseGame.detail.purchaseGameStatus.text}</span>
                        <span>{this.props.purchaseGame.detail.productName}</span>
                    </li>
                    <li className="onePiece_detail_text_description">{this.props.purchaseGame.detail.purchaseGameDescription}</li>
                    <li className="onePiece_detail_text_priceOfOneBidInXtb">
                        <span className="onePiece_detail_text_priceOfOneBidInXtb_title">每份</span>
                        <span className="onePiece_detail_Xtb_one">{this.props.purchaseGame.detail.priceOfOneBidInXtb}</span>
                    </li>
                </ul>
                <ul className="onePiece_detail_purchaseGame_data">
                    <li className="onePiece_detail_purchaseGame_stage">
                        <span>期数：{this.props.purchaseGame.detail.stage}</span>
                    </li>
                    <li className="onePiece_detail_purchaseGame_line pr">
                        <div className="onePiece_detail_purchaseGame_line_rate po" style={{width:this.props.purchaseGame.detail.rateOfProgress}}></div>
                    </li>
                    <li className="onePiece_detail_purchaseGame_data_other">
                        <div>
                            <span>总需：{this.props.purchaseGame.detail.targetPurchaseCount}份</span>
                        </div>
                        <div>
                            <span>剩余：</span>
                            <span className="onePiece_detail_purchaseGame_data_other_red">{this.props.purchaseGame.detail.restPurchaseCount}份</span>
                        </div>
                    </li>
                    <li className="onePiece_detail_purchaseGame_isJoin">
                        {this.props.purchaseGame.bidDetail.bid?"":(
                            <p className="onePiece_detail_purchaseGame_isJoin_no tc">
                                <span>您还没有参与本期夺宝，</span>
                                <span className="onePiece_detail_purchaseGame_isJoin_btn">立即参与!</span></p>

                            )
                        }
                        {this.props.purchaseGame.bidDetail.purchaseGameStatus == "have_lottery"?(
                                <div>
                                    <div>
                                        <img src={this.props.purchaseGame.bidDetail.luckUserInfo.userIcon} alt=""/>
                                    </div>
                                    <ul>
                                        <li>
                                            （{this.props.purchaseGame.bidDetail.luckUserInfo.area}{this.props.purchaseGame.luckUserInfo.ip}）
                                        </li>
                                        <li>期数：{this.props.purchaseGame.bidDetail.stage}</li>
                                        <li>参与份数：{this.props.purchaseGame.bidDetail.luckUserInfo.bidCount}</li>
                                    </ul>
                                    <div>
                                        <p>揭晓时间：{this.props.purchaseGame.bidDetail.luckUserInfo.winTime}</p>
                                    </div>
                                    <div>
                                        <p>
                                            <span>幸运号码：{this.props.purchaseGame.bidDetail.luckUserInfo.luckCode}</span>
                                            <span>查看计算详情</span>
                                        </p>
                                    </div>
                                </div>
                            ):""
                        }
                        {this.props.purchaseGame.bidDetail.bidRecords.length == 0?"":(
                            <div className="onePiece_detail_bidDetail_time_box">
                                <div className="onePiece_detail_bidDetail_pruchaseGame_info">
                                    <div className="onePiece_detail_bidDetail_pruchaseGame_info_left">
                                        <span>期数：{this.props.purchaseGame.bidDetail.stage}</span>
                                        <span>揭晓倒计时：{this.props.purchaseGame.bidDetail.bidRecords[0].createTime}</span>
                                    </div>
                                </div>
                                <div className="onePiece_detail_bidDetail_join_info">
                                    <p>
                                        <span>您参与了：</span>
                                        <span className="onePiece_detail_bidDetail_join_info_red">{this.props.purchaseGame.bidDetail.bidRecords.length}</span>
                                        <span>份</span>
                                    </p>
                                    <div className="onePiece_detail_bidDetail_records">
                                        <p className="onePiece_detail_bidDetail_records_info">
                                            <span>夺宝号码：</span>{bidRecordNodes}
                                        </p>
                                        <span>查看全部</span>
                                    </div>
                                </div>
                            </div>)
                        }
                    </li>
                </ul>
                <ul className="onePiece_detail_other_function">
                    <li className="onePiece_detail_other_function_join_detail">
                        <Link to="/OnePieceJoinDetail" >参与详情</Link>
                    </li>
                    <li className="onePiece_detail_other_function_old_activities">
                        <Link to={{ pathname: "/OnePieceOldActivities", query: { productId: this.props.purchaseGame.detail.productId } }} >往期揭晓</Link>
                    </li>
                    <li className="onePiece_detail_other_function_show">
                        <Link to={{ pathname: "/OnePieceShow", query: { productId: this.props.purchaseGame.detail.productId } }} >晒单</Link>
                    </li>
                </ul>
                <div className="onePiece_detail_footer w">
                    <Link to="/OnePieceBuyNow" className="onePiece_join_footer_btn tc">
                        {this.props.purchaseGame.detail.purchaseGameStatus.key == "bidding"?"立即夺宝":"参与最新一期"}
                    </Link>
                </div>
            </div>
        )
    }
});
function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        purchaseGame:state.purchaseGame,
        storage:state.storage,
        loginInfo:state.loginInfo
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceProductDetails);

const img_box = {};